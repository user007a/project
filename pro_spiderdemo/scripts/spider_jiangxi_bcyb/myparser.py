# -*- coding: utf-8 -*-
"""解析：列表项 → 结构化字典；HTML → markdown。"""
import re
import json


def parse_url_field(s):
    """'{"pc":"/x.html"}' → '/x.html' 或全 URL。"""
    if not s:
        return ""
    try:
        obj = json.loads(s)
        if isinstance(obj, dict):
            for k in ("pc", "wap", "app"):
                if obj.get(k):
                    return obj[k]
        return ""
    except Exception:
        return ""


def parse_list_result(item):
    """从单条 result 抽取记录字段。"""
    src = item.get("source", {})
    title = (src.get("title") or "").strip()
    pub_date = (src.get("pubDate") or "").strip()
    source = (src.get("contentSource") or "").strip()
    item_id = item.get("id") or src.get("id") or ""
    rel_url = parse_url_field(src.get("urls"))
    # 关系 URL（如有）转 pc URL
    if not rel_url:
        rel_url = src.get("relationUrl") or ""
    # 若是站内相对路径，补 host
    full_url = rel_url
    if rel_url.startswith("/"):
        full_url = "https://nync.jiangxi.gov.cn" + rel_url
    html = (src.get("content") or {}).get("content") or ""
    return {
        "title": title,
        "publish_date": pub_date,
        "source": source,
        "item_id": str(item_id),
        "source_url": full_url,
        "html": html,
    }


# ---------- HTML → markdown  -----------------------------

_TAG_RE = re.compile(r"<[^>]+>")
_BR_RE = re.compile(r"<\s*br\s*/?\s*>", re.I)
_P_END_RE = re.compile(r"</</s*p\s*>", re.I)
_LI_RE = re.compile(r"<\s*li[^>]*>", re.I)
_END_LI_RE = re.compile(r"</</s*li\s*>", re.I)
_UL_RE = re.compile(r"<\s*/?\s*ul[^>]*>", re.I)
_OL_RE = re.compile(r"<\s*/?\s*ol[^>]*>", re.I)
_TR_RE = re.compile(r"<\s*/?\s*tr[^>]*>", re.I)
_TD_RE = re.compile(r"<\s*/?\s*t[dh][^>]*>", re.I)
_IMG_RE = re.compile(
    r'<img\b([^>]*?)\s*/?>', re.I | re.S
)
_HREF_RE = re.compile(r'<a\b([^>]*?)>(.*?)</a>', re.I | re.S)
_STYLE_RE = re.compile(r'\sstyle\s*=\s*"[^"]*"', re.I)
_ATTR_RE = re.compile(r"([a-zA-Z\-:]+)\s*=\s*(\"[^\"]*\"|'[^']*')")


def _strip_attrs(tag, keep):
    """移除 HTML 标签上除 keep 列表外的属性。"""
    m = _ATTR_RE.findall(tag)
    parts = []
    for name, val in m:
        if name.lower() in keep:
            parts.append("%s=%s" % (name, val))
    return " ".join(parts)


def _attrs_text(tag):
    return _ATTR_RE.findall(tag)


def html_to_markdown(html):
    """将正文 HTML 转为 markdown。"""
    if not html:
        return ""
    text = html
    # 移除 <script>、<style>
    text = re.sub(r"<script\b.*?</script>", "", text, flags=re.I | re.S)
    text = re.sub(r"<style\b.*?</style>", "", text, flags=re.I | re.S)
    text = re.sub(r"<!--.*?-->", "", text, flags=re.S)
    # <br> → 换行
    text = _BR_RE.sub("\n", text)
    # 图片：![alt](src)
    def img_repl(m):
        attrs = dict(_attrs_text(m.group(1)))
        src = attrs.get("src", "").strip('"').strip("'")
        alt = attrs.get("alt", "").strip('"').strip("'") or "图片"
        if not src:
            return ""
        return "![%s](%s)" % (alt, src)
    text = _IMG_RE.sub(img_repl, text)
    # 链接：保留文本 + URL
    text = _HREF_RE.sub(
        lambda m: _link_repl(m.group(1), m.group(2)), text
    )
    # 段落：</p> → 双换行
    text = _P_END_RE.sub("\n\n", text)
    # 列表
    text = _LI_RE.sub("\n- ", text)
    text = _END_LI_RE.sub("", text)
    text = _UL_RE.sub("\n", text)
    text = _OL_RE.sub("\n", text)
    # 表格：粗略处理
    text = _TR_RE.sub("\n", text)
    text = _TD_RE.sub(" | ", text)
    # 去掉所有剩余标签
    text = _TAG_RE.sub("", text)
    # 多余空行压缩
    text = re.sub(r"\n{3,}", "\n\n", text)
    text = re.sub(r"[ \t]+", " ", text)
    return text.strip()


def _link_repl(attrs_text, inner):
    attrs = dict(_attrs_text(attrs_text))
    href = attrs.get("href", "").strip('"').strip("'")
    inner = re.sub(r"<[^>]+>", "", inner)
    if not href:
        return inner
    if href.startswith("/"):
        href = "https://nync.jiangxi.gov.cn" + href
    return "[%s](%s)" % (inner, href)