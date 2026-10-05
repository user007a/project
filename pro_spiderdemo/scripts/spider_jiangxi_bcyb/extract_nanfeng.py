# -*- coding: utf-8 -*-
"""把 jxsnynct-bcyb/ 下文件名含"南丰"的全部移动到 南丰县/ 子目录。"""
import os
import shutil

BASE = os.path.abspath(
    os.path.join(os.path.dirname(__file__), "..", "..", "output", "jxsnynct-bcyb")
)
TARGET = os.path.join(BASE, "南丰县")
KEY = "南丰"


def main():
    os.makedirs(TARGET, exist_ok=True)
    moved = 0
    skipped = 0
    for f in os.listdir(BASE):
        if not f.endswith(".md"):
            continue
        if not (KEY in f):
            continue
        src = os.path.join(BASE, f)
        if os.path.isdir(src):
            continue
        dst = os.path.join(TARGET, f)
        if os.path.exists(dst):
            skipped += 1
            print("exists skip:", f)
            continue
        shutil.move(src, dst)
        moved += 1
    print("moved:", moved, "skipped:", skipped, "target:", TARGET)


if __name__ == "__main__":
    main()