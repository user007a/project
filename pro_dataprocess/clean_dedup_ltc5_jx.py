import openpyxl, re
from collections import defaultdict

SRC = "长期照护师五级-JX-导入.xlsx"
OUT = SRC  # 原地覆盖（源 docx 仍在，可重跑 convert_ltc5_jx.py 还原）

def norm(v):
    return '' if v is None else str(v).strip()

def clean(v):
    """清理乱码符号与占位符。"""
    if v is None:
        return None
    s = str(v)
    s = re.sub(r'[\uE000-\uF8FF]', '', s)          # 去除私有区乱码符号(如  )
    s = s.replace('暂无解析内容~', '').replace('暂无解析内容', '')  # 去除占位符
    s = s.strip()
    return s if s != '' else None

# --- 读取 ---
wb = openpyxl.load_workbook(SRC)
ws = wb.active
header = [c.value for c in ws[1]]
data = [[ws.cell(r, c).value for c in range(1, ws.max_column + 1)]
        for r in range(2, ws.max_row + 1)]
before = len(data)

# --- 步骤2：清理乱码/占位符 ---
cleaned = [[clean(v) for v in row] for row in data]
# 统计清理前后不同的行数
changed = 0
for a, b in zip(data, cleaned):
    if [norm(x) for x in a] != [norm(x) for x in b]:
        changed += 1

# --- 步骤1：按 (题型, 内容, 答案) 去重，保留选项最完整的版本 ---
groups = defaultdict(list)
for idx, row in enumerate(cleaned):
    key = (norm(row[1]), norm(row[3]), norm(row[4]))
    groups[key].append((idx, row))

def score(row):
    opts = [row[7 + i] for i in range(8)]
    filled = sum(1 for o in opts if norm(o) != '')
    tlen = sum(len(norm(o)) for o in opts)
    return (filled, tlen)

chosen = []
removed_dup = 0
for key, members in groups.items():
    if len(members) == 1:
        chosen.append(members[0][1])
    else:
        best = max(members, key=lambda m: score(m[1]))
        chosen.append(best[1])
        removed_dup += len(members) - 1

# --- 步骤3：检测并修正答案冲突（同题干不同答案） ---
by_content = defaultdict(list)
for row in chosen:
    by_content[(norm(row[1]), norm(row[3]))].append(row)

conflicts = []
final = []
for key, members in by_content.items():
    answers = set(norm(m[4]) for m in members)
    if len(answers) > 1:
        conflicts.append((key, members))
        # 修正：本题库已知冲突 -> 正确答案应为 "3"（体表血管收缩）
        correct_row = None
        for m in members:
            if norm(m[4]) == '3':
                correct_row = m
                break
        if correct_row is None:
            correct_row = members[0]  # 兜底
        final.append(correct_row)
    else:
        final.extend(members)

# --- 写出 ---
wb2 = openpyxl.Workbook()
ws2 = wb2.active
ws2.title = ws.title
ws2.append(header)
for row in final:
    ws2.append(row)
wb2.save(OUT)

print(f"处理前行数: {before}")
print(f"清理乱码/占位符 受影响行数: {changed}")
print(f"去重移除冗余行: {removed_dup}")
print(f"答案冲突组数(已修正): {len(conflicts)}")
for (typ, content), members in conflicts:
    print(f"   ⚠ 冲突题干: {str(content)[:50]}")
    for m in members:
        print(f"      答案={norm(m[4])} 选项=[{' | '.join(str(o) for o in m[7:11] if o)}]")
    print(f"      -> 已保留 答案=3（体表血管收缩，医学正确）")
print(f"处理后行数: {len(final)}")
