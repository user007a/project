#!/usr/bin/env python
# -*- coding: utf-8 -*-
"""
将 .docx 完整转换为 Markdown，尽可能不丢失任何文字内容。
仅依赖标准库 (zipfile + xml.etree)。
覆盖：正文段落/标题、项目符号与编号列表、表格、文本框内容、
页眉/页脚、脚注/尾注、超链接文本、图片占位说明。
"""
import zipfile
import re
import os
import xml.etree.ElementTree as ET

W = 'http://schemas.openxmlformats.org/wordprocessingml/2006/main'
REL = 'http://schemas.openxmlformats.org/package/2006/relationships'
NS = {'w': W, 'r': REL}

docx_path = r'D:/dev/GitHub/project/pro_pptwrite/商业计划书.docx'
out_path = r'D:/dev/GitHub/project/pro_pptwrite/商业计划书.md'


def local(tag):
    """从 {uri}local 形式取本地名。"""
    if '}' in tag:
        return tag.split('}', 1)[1]
    return tag


def q(name):
    return '{%s}%s' % (W, name)


def text_of(elem):
    """递归收集 elem 下所有 w:t 的文字（保留文档顺序）。"""
    parts = []
    if elem is None:
        return ''
    for e in elem.iter():
        if local(e.tag) == 't':
            parts.append(e.text or '')
        elif local(e.tag) == 'tab':
            parts.append('\t')
        elif local(e.tag) == 'br':
            parts.append('\n')
    return ''.join(parts)


def run_text(r):
    """处理单个 w:r（含加粗/斜体包裹），并提取其文字。"""
    rpr = r.find(q('rPr'))
    bold = False
    italic = False
    if rpr is not None:
        if rpr.find(q('b')) is not None:
            bold = True
        if rpr.find(q('i')) is not None:
            italic = True
    t = text_of(r)
    if not t:
        return ''
    if bold and italic:
        return '***%s***' % t
    if bold:
        return '**%s**' % t
    if italic:
        return '*%s*' % t
    return t


def para_text_md(p):
    """生成段落的 Markdown 文字（含超链接、顶层 run 的粗斜体）。"""
    out = []
    # 顶层 w:hyperlink 与 w:r 按文档顺序处理
    for child in list(p):
        tag = local(child.tag)
        if tag == 'r':
            out.append(run_text(child))
        elif tag == 'hyperlink':
            inner = ''.join(run_text(r) for r in child.iter(q('r')))
            out.append(inner)
        elif tag == 'bookmarkStart' or tag == 'bookmarkEnd':
            continue
        # 其他（如 pPr）忽略
    # 文本框内容（w:drawing/w:txbxContent）作为补充，保证不丢字
    txbox = []
    for draw in p.iter(q('txbxContent')):
        txbox.append(text_of(draw))
    if txbox:
        out.append('\n\n[文本框] ' + '\n\n'.join(txbox))
    return ''.join(out).strip()


def style_level(p):
    """根据样式名或 outlineLvl 推断标题级别（1-6），无则返回 0。"""
    ppr = p.find(q('pPr'))
    if ppr is None:
        return 0, None
    pstyle = ppr.find(q('pStyle'))
    style_val = pstyle.get(q('val')) if pstyle is not None else None
    if style_val:
        s = style_val.lower()
        m = re.search(r'(\d+)', style_val)
        if 'heading' in s or '标题' in s or 'head' in s:
            if m:
                return min(int(m.group(1)), 6), style_val
        if 'title' in s:
            return 1, style_val
        if 'subtitle' in s:
            return 2, style_val
        # 纯数字样式名（如 "1".."9"）
        if m and style_val.isdigit():
            return min(int(style_val), 6), style_val
    outline = ppr.find(q('outlineLvl'))
    if outline is not None:
        try:
            return min(int(outline.get(q('val'))) + 1, 6), style_val
        except (TypeError, ValueError):
            pass
    return 0, style_val


def load_numbering(zf):
    """解析 numbering.xml，返回 numId -> {ilvl: numFmt}。"""
    fmt = {}
    try:
        data = zf.read('word/numbering.xml')
    except KeyError:
        return fmt
    root = ET.fromstring(data)
    # abstractNumId -> {ilvl: numFmt}
    abs_map = {}
    for an in root.iter(q('abstractNum')):
        aid = an.get(q('abstractNumId'))
        levels = {}
        for lvl in an.iter(q('lvl')):
            ilvl = lvl.get(q('ilvl'))
            nf = lvl.find(q('numFmt'))
            if nf is not None:
                levels[ilvl] = nf.get(q('val'))
        abs_map[aid] = levels
    for num in root.iter(q('num')):
        nid = num.get(q('numId'))
        anid_el = num.find(q('abstractNumId'))
        if anid_el is None:
            continue
        levels = abs_map.get(anid_el.get(q('val')), {})
        # lvlOverride 可覆盖 numFmt
        for ov in num.iter(q('lvlOverride')):
            ilvl = ov.get(q('ilvl'))
            lvl = ov.find(q('lvl'))
            if lvl is not None:
                nf = lvl.find(q('numFmt'))
                if nf is not None:
                    levels = dict(levels)
                    levels[ilvl] = nf.get(q('val'))
        fmt[nid] = levels
    return fmt


def list_prefix(p, numbering, counters):
    """返回列表前缀（如 '- ' 或 '1. '），非列表返回 None。"""
    ppr = p.find(q('pPr'))
    if ppr is None:
        return None
    numpr = ppr.find(q('numPr'))
    if numpr is None:
        return None
    numid_el = numpr.find(q('numId'))
    ilvl_el = numpr.find(q('ilvl'))
    numid = numid_el.get(q('val')) if numid_el is not None else None
    ilvl = ilvl_el.get(q('val')) if ilvl_el is not None else '0'
    if numid in (None, '0'):
        return None
    levels = numbering.get(numid, {})
    numfmt = levels.get(ilvl, 'bullet')
    key = (numid, ilvl)
    if numfmt == 'bullet':
        return '- '
    # 其余（decimal/decimalEnclosedCircle 等）按有序处理
    counters[key] = counters.get(key, 0) + 1
    return '%d. ' % counters[key]


def table_to_md(tbl):
    rows = []
    for tr in tbl.findall(q('tr')):
        cells = []
        for tc in tr.findall(q('tc')):
            cell_text = text_of(tc).replace('\n', ' ').replace('|', '\\|').strip()
            cells.append(cell_text)
        rows.append(cells)
    if not rows:
        return ''
    maxcols = max(len(r) for r in rows)
    norm = []
    for r in rows:
        while len(r) < maxcols:
            r.append('')
        norm.append(r)
    lines = []
    header = norm[0]
    lines.append('| ' + ' | '.join(header) + ' |')
    lines.append('| ' + ' | '.join(['---'] * maxcols) + ' |')
    for r in norm[1:]:
        lines.append('| ' + ' | '.join(r) + ' |')
    return '\n'.join(lines)


def extract_part_text(zf, part_name):
    try:
        data = zf.read(part_name)
    except KeyError:
        return ''
    root = ET.fromstring(data)
    paras = []
    for p in root.iter(q('p')):
        # 跳过纯分隔符
        t = text_of(p).strip()
        if t:
            paras.append(t)
    return '\n'.join(paras)


def main():
    with zipfile.ZipFile(docx_path) as zf:
        names = zf.namelist()
        doc_data = zf.read('word/document.xml')
        numbering = load_numbering(zf)

        # 统计图片
        media = [n for n in names if n.startswith('word/media/')]
        # 页眉页脚
        headers = [n for n in names if re.match(r'word/header\d*\.xml$', n)]
        footers = [n for n in names if re.match(r'word/footer\d*\.xml$', n)]
        footnotes_text = ''
        endnotes_text = ''

        root = ET.fromstring(doc_data)
        body = root.find(q('body'))
        md = []
        counters = {}
        last_was_list = False

        for child in list(body):
            tag = local(child.tag)
            if tag == 'p':
                level, style_val = style_level(child)
                prefix = list_prefix(child, numbering, counters)
                txt = para_text_md(child)
                if not txt:
                    # 空段落，仍保留一个空行以保留段落分隔
                    md.append('')
                    last_was_list = False
                    continue
                if level > 0:
                    md.append('#' * level + ' ' + txt)
                    counters.clear()
                    last_was_list = False
                elif prefix is not None:
                    md.append(prefix + txt)
                    last_was_list = True
                else:
                    md.append(txt)
                    counters.clear()
                    last_was_list = False
            elif tag == 'tbl':
                md.append('')
                md.append(table_to_md(child))
                md.append('')
                last_was_list = False
            # 其他元素（sectPr 等）忽略

        # 附录：页眉页脚 / 脚注 / 尾注，确保不丢字
        extra = []
        for h in sorted(headers):
            t = extract_part_text(zf, h).strip()
            if t:
                extra.append('【页眉 %s】\n%s' % (os.path.basename(h), t))
        for f in sorted(footers):
            t = extract_part_text(zf, f).strip()
            if t:
                extra.append('【页脚 %s】\n%s' % (os.path.basename(f), t))
        if 'word/footnotes.xml' in names:
            fn = extract_part_text(zf, 'word/footnotes.xml').strip()
            if fn:
                extra.append('【脚注】\n' + fn)
        if 'word/endnotes.xml' in names:
            en = extract_part_text(zf, 'word/endnotes.xml').strip()
            if en:
                extra.append('【尾注】\n' + en)

        if extra:
            md.append('\n\n---\n\n## 附录：页眉/页脚与注释内容\n')
            md.append('\n\n'.join(extra))

        if media:
            md.append('\n\n---\n\n> 说明：原文档包含 %d 个图片文件（位于 word/media/），'
                      '以下为图片在文档中的占位引用，文字内容已完整提取：\n' % len(media))
            for m in media:
                md.append('> - 图片：`%s`' % m)

        content = '\n'.join(md).strip() + '\n'
        # 规整多余空行（最多连续两个换行）
        content = re.sub(r'\n{3,}', '\n\n', content)
        with open(out_path, 'w', encoding='utf-8') as f:
            f.write(content)

        print('OK 输出字节数:', len(content.encode('utf-8')))
        print('图片数量:', len(media))
        print('页眉数:', len(headers), '页脚数:', len(footers))


if __name__ == '__main__':
    main()
