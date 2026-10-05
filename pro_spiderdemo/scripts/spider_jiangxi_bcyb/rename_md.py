# -*- coding: utf-8 -*-
"""把 output/jxsnynct-bcyb/*.md 改为 YYYY-MM-DD-标题.md 的命名。

旧: 【<title>_<YYYY-MM-DD>】.md
新: <YYYY-MM-DD>-<title>.md  （保留【】）
"""
import os
import re
import sys

DIR = os.path.abspath(
    os.path.join(os.path.dirname(__file__), "..", "..", "output", "jxsnynct-bcyb")
)

# 匹配文件名中的 "..." _YYYY-MM-DD "...}.md"
# 例: 【资溪县病虫情报2023年第12期：打好中稻保穗药_2023-08-07】.md
NAME_RE = re.compile(
    r"^(?P<inner>【)(?P<body>.*?)(?P<date>_\d{4}-\d{2}-\d{2})?(?P<close>】)\\.md$",
    re.S,
)
# 实际结构：<【>body<title>_YYYY-MM-DD<】>.md，date 在 close 前
NAME_RE = re.compile(
    r"^【(?P<body>.+?)(?P<date>\d{4}-\d{2}-\d{2})】\.md$",
    re.S,
)


def split_region_topic(body: str):
    """把 body 按日期切分为标题段 + 日期段。

    body 形如: "资溪县病虫情报2023年第12期：打好中稻保穗药" 或 "12月节气及病虫防治"
    """
    # 已包含 YYYY 年第 NN 期：或无日期
    return body


def new_name(old: str):
    m = NAME_RE.match(old)
    if not m:
        return None, None
    body = m.group("body")
    date = m.group("date")
    # body 已经是没有日期、没有【】的标题段
    new = "%s-%s.md" % (date, body)
    return new, body


def main():
    files = [f for f in os.listdir(DIR) if f.endswith(".md")]
    print("总文件:", len(files))
    # 先收集映射表，处理重名
    plan = {}
    skipped = []
    for f in files:
        n, body = new_name(f)
        if not n:
            skipped.append(f)
            continue
        plan[f] = n
    if skipped:
        print("跳过（不符合模式）:", len(skipped))
        for s in skipped[:20]:
            print("  ", s)

    # 处理重名
    name_count = {}
    rename_map = {}
    for old, new in plan.items():
        name_count[new] = name_count.get(new, 0) + 1

    dup_set = {n for n, c in name_count.items() if c > 1}
    if dup_set:
        print("检测到重名:", len(dup_set))
        # 同一日期+标题出现多次时附加 _2/_4
        seen = {}
        for old, new in plan.items():
            if new in dup_set:
                seen[old] = seen.get(old, 0)
                stem = new[:-3]  # 去掉 .md
                if seen[old] == 0:
                    rename_map[old] = new
                else:
                    rename_map[old] = "%s_%d.md" % (stem, seen[old] + 1)
                seen[old] += 1
            else:
                rename_map[old] = new
    else:
        rename_map = plan

    # 两阶段重命名，避免冲突
    # 第一步：全部改成临时名
    tmp_map = {}
    for old in rename_map:
        tmp_map[old] = "__tmp__%d__%s" % (id(old), old)
    for old, tmp in tmp_map.items():
        os.rename(os.path.join(DIR, old), os.path.join(DIR, tmp))
    # 第二步：临时名 → 新名
    for old in rename_map:
        tmp = tmp_map[old]
        new = rename_map[old]
        os.rename(os.path.join(DIR, tmp), os.path.join(DIR, new))

    # 验证
    new_files = sorted(os.listdir(DIR))
    new_files = [f for f in new_files if f.endswith(".md")]
    print("重命名后文件数:", len(new_files))
    # 抽样展示
    for f in new_files[:5]:
        print(" ", f)


if __name__ == "__main__":
    main()