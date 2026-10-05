# -*- coding: utf-8 -*-
"""fzjz 抓取配置。"""
import os
import random

HOST = "nync.jiangxi.gov.cn"
LIST_PATH = "/queryList"
INDEX_URL = "https://nync.jiangxi.gov.cn/jxsnynct/fzjz/index.html"
DETAIL_BASE = "https://nync.jiangxi.gov.cn"

# 从首页 columnlist 模板中读取并验证
UNITID = "1821717000426962944"
CHANNEL_CODE = "fzjz"

LIST_BODY_BASE = (
    "perPage=15&pageSize=15&searchstart=1&showMode=full"
    "&unitid=" + UNITID + "&webSiteCode=jxsnynct&channelCode=" + CHANNEL_CODE
    + "&sort=sortNum&order=desc&current={page}"
)

PER_PAGE = 15
TOTAL_HINT = 3698
DELAY_MIN = 1.0
DELAY_MAX = 2.5
RETRY_TIMES = 3
RETRY_BACKOFF = 1.6
TIMEOUT = 25
USER_AGENT = (
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 "
    "(KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36"
)
REFERER = INDEX_URL

OUTPUT_DIR = os.path.abspath(
    os.path.join(os.path.dirname(__file__), "..", "..", "output", "jxsnynct-fzjz")
)
FAILED_FILE = os.path.join(OUTPUT_DIR, "failed.json")
LOG_FILE = os.path.join(OUTPUT_DIR, "spider.log")


def random_delay():
    return random.uniform(DELAY_MIN, DELAY_MAX)