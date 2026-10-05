# -*- coding: utf-8 -*-
"""主流程：分页抓取 → 解析 → 落盘。"""
import argparse
import json
import math
import os
import sys
import time

import config
import fetcher
import myparser as _parser
import pipeline


def log(msg):
    line = "[%s] %s" % (time.strftime("%H:%M:%S"), msg)
    print(line, flush=True)
    os.makedirs(config.OUTPUT_DIR, exist_ok=True)
    with open(config.LOG_FILE, "a", encoding="utf-8") as f:
        f.write(line + "\n")


def append_failed(rec_id, err):
    os.makedirs(config.OUTPUT_DIR, exist_ok=True)
    failed = []
    if os.path.exists(config.FAILED_FILE):
        try:
            with open(config.FAILED_FILE, "r", encoding="utf-8") as f:
                failed = json.load(f)
        except Exception:
            failed = []
    failed.append({"id": rec_id, "error": err, "ts": time.time()})
    with open(config.FAILED_FILE, "w", encoding="utf-8") as f:
        json.dump(failed, f, ensure_ascii=False, indent=2)


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--limit", type=int, default=0,
        help="仅抓取前 N 条（用于试跑）")
    ap.add_argument("--start-page", type=int, default=1)
    ap.add_argument("--end-page", type=int, default=0,
        help="结束页（0 表示到末页）")
    ap.add_argument("--reset", action="store_true",
        help="清空 failed.json")
    args = ap.parse_args()

    if args.reset and os.path.exists(config.FAILED_FILE):
        os.remove(config.FAILED_FILE)

    log("==== 配置 ====")
    log("OUTPUT_DIR: %s" % config.OUTPUT_DIR)
    log("UNITID: %s, total hint: %d" % (config.UNITID, config.TOTAL_HINT))

    page1, total = fetcher.fetch_list_page(1)
    total_pages = math.ceil(total / config.PER_PAGE)
    log("total=%d, total_pages=%d" % (total, total_pages))

    if args.limit:
        max_records = args.limit
    else:
        max_records = total
    if args.end_page:
        max_pages = args.end_page
    else:
        max_pages = total_pages

    written = 0
    seen_ids = set()

    for page in range(args.start_page, max_pages + 1):
        if written >= max_records:
            break
        try:
            data, _ = fetcher.fetch_list_page(page)
        except Exception as e:
            log("列表第 %d 页失败: %s" % (page, e))
            continue
        results = data["data"]["results"]
        log("第 %d 页 %d 条" % (page, len(results)))
        for item in results:
            if written >= max_records:
                break
            try:
                rec = _parser.parse_list_result(item)
            except Exception as e:
                append_failed(str(item.get("id")), "parse err: %r" % e)
                continue
            if rec["item_id"] in seen_ids:
                continue
            seen_ids.add(rec["item_id"])
            if not rec["title"]:
                append_failed(rec["item_id"], "empty title")
                continue
            try:
                p = pipeline.write_record(rec, config.OUTPUT_DIR)
                written += 1
                if written % 25 == 0:
                    log("已写入 %d / %d" % (written, max_records))
            except Exception as e:
                append_failed(rec["item_id"], "write err: %r" % e)
        time.sleep(config.random_delay())

    log("==== 完成 ====")
    log("成功写入: %d" % written)
    log("失败清单: %s" % config.FAILED_FILE)


if __name__ == "__main__":
    main()