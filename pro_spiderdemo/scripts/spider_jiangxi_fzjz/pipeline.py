# -*- coding: utf-8 -*-
"""落盘：命名清洗 + 统一 markdown 模板。"""
import os
import re

import myparser as _parser


_BAD_CHARS = re.compile(r'[\\/:\*\?"<>\|\r\n\t]')
_MULTI_SPACE = re.compile(r"\s+")
_DATE_RE = re.compile(r"(\d{4})-(\d{2})-(\d{2})")


def clean_filename(name):
    name = _BAD_CHARS.sub("", name or "")
    name = _MULTI_SPACE.sub(" ", name).strip()
    return name[:120]


def parse_date(pub_date):
    """'2026-08-27 17:51' → '2026-08-27'。"""
    if not pub_date:
        return ""
    m = _DATE_RE.match(pub_date)
    if m:
        return "%s-%s-%s" % m.groups()
    return ""


def make_filename(rec):
    """<YYYY-MM-DD>-<title>.md。"""
    title = (rec.get("title") or "").strip()
    pub = parse_date(rec.get("publish_date"))
    item_id = rec.get("item_id") or "未命名"
    if pub and title:
        body = "%s-%s" % (pub, clean_filename(title))
    elif title:
        body = clean_filename(title)
    else:
        body = clean_filename(item_id)
    return body + ".md"


def render_markdown(rec):
    title = rec.get("title") or ""
    pub = parse_date(rec.get("publish_date"))
    body_md = _parser.html_to_markdown(rec.get("html") or "")
    return (
        f"# {title}\n\n"
        f"| 字段 | 值 |\n"
        f"| --- | --- |\n"
        f"| 发布日期 | {pub} |\n"
        f"| 来源 | {rec.get('source','')} |\n"
        f"| 原文链接 | {rec.get('source_url','')} |\n\n"
        f"---\n\n"
        f"## 正文\n\n"
        f"{body_md}\n"
    )


def write_record(rec, output_dir):
    os.makedirs(output_dir, exist_ok=True)
    name = make_filename(rec)
    path = os.path.join(output_dir, name)
    base = path[:-3]
    i = 2
    while os.path.exists(path):
        path = "%s_%d.md" % (base, i)
        i += 1
    with open(path, "w", encoding="utf-8") as f:
        f.write(render_markdown(rec))
    return path