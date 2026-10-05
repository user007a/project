# -*- coding: utf-8 -*-
"""落盘：命名清洗 + 统一 markdown 模板。"""
import os
import re
import datetime

import myparser as _parser


# Windows 非法字符
_BAD_CHARS = re.compile(r'[\\/:\*\?"<>\|\r\n\t]')
_MULTI_SPACE = re.compile(r"\s+")


def clean_filename(name):
    name = _BAD_CHARS.sub("", name or "")
    name = _MULTI_SPACE.sub(" ", name).strip()
    return name[:120]


def parse_issue(text):
    """从标题里提取期号。"""
    m = re.search(r"(\d{4})\s*年\s*第\s*([\d零一二三四五六七八九十百]+)\s*期", text or "")
    if not m:
        return None, None
    year, issue_raw = m.group(1), m.group(2)
    return year, _cn_to_int(issue_raw) or issue_raw


def _cn_to_int(s):
    if not s:
        return None
    if s.isdigit():
        return int(s)
    mapping = {"零": 0, "一": 1, "二": 2, "三": 3, "四": 4, "五": 5,
               "六": 6, "七": 7, "八": 8, "九": 9}
    if all(c in mapping for c in s):
        return int("".join(str(mapping[c]) for c in s))
    return None


def parse_region_and_topic(title):
    """从标题里解析地区和主题。"""
    if not title:
        return "", ""
    # 形如 "南昌县病虫情报2026年第13期：稻飞虱防治警报"
    m = re.match(
        r"^(?P<region>[^病]+?)(?:病虫(?:预报|情报)|植保)\s*"
        r"(?:\d{4}\s*年\s*第\s*[\d零一二三四五六七八九十百]+\s*期\s*[：:]?\s*)?"
        r"(?P<topic>.*)$",
        title,
    )
    if not m:
        return "", title
    region = m.group("region").strip()
    topic = m.group("topic").strip().lstrip("：:").strip()
    return region, topic


def parse_date(pub_date):
    """'2026-08-18 14:38' → '2026-08-18'。"""
    if not pub_date:
        return ""
    m = re.match(r"(\d{4})-(\d{2})-(\d{2})", pub_date)
    if m:
        return "%s-%s-%s" % m.groups()
    return pub_date[:10]


def make_filename(rec):
    """根据记录生成文件名（含【】）。"""
    title = rec.get("title") or ""
    region, topic = parse_region_and_topic(title)
    year, issue = parse_issue(title)
    pub = parse_date(rec.get("publish_date"))
    if region and year and issue is not None and pub:
        body = "%s病虫情报%s年第%s期：%s%s" % (region, year, issue, topic, pub)
    else:
        # 回退：原标题 + 日期
        body = (title or rec.get("item_id") or "未命名") + "_" + pub
    name = "【%s】.md" % clean_filename(body)
    return name


def render_markdown(rec):
    title = rec.get("title") or ""
    region, topic = parse_region_and_topic(title)
    year, issue = parse_issue(title)
    pub = parse_date(rec.get("publish_date"))
    body_md = _parser.html_to_markdown(rec.get("html") or "")
    return (
        f"# {title}\n\n"
        f"| 字段 | 值 |\n"
        f"| --- | --- |\n"
        f"| 地区 | {region} |\n"
        f"| 期号 | {year + '年第' + str(issue) + '期' if year and issue is not None else ''} |\n"
        f"| 主题 | {topic} |\n"
        f"| 发布日期 | {pub} |\n"
        f"| 来源 | {rec.get('source','')} |\n"
        f"| 原文链接 | {rec.get('source_url','')} |\n\n"
        f"---\n\n"
        f"## 正文\n\n"
        f"{body_md}\n"
    )


def write_record(rec, output_dir):
    """写入单条记录，返回最终文件路径。"""
    os.makedirs(output_dir, exist_ok=True)
    name = make_filename(rec)
    path = os.path.join(output_dir, name)
    # 重名兜底
    base = path[:-3]
    i = 2
    while os.path.exists(path):
        path = "%s_%d.md" % (base, i)
        i += 1
    with open(path, "w", encoding="utf-8") as f:
        f.write(render_markdown(rec))
    return path