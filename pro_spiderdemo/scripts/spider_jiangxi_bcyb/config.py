# -*- coding: utf-8 -*-
"""抓取配置：基础 URL、分页、UA、延时、输出目录。"""
import os
import random

HOST = "nync.jiangxi.gov.cn"
LIST_PATH = "/queryList"
INDEX_URL = "https://nync.jiangxi.gov.cn/jxsnynct/bcyb/index.html"
DETAIL_BASE = "https://nync.jiangxi.gov.cn"

# 经前端 jpage 调用实测得到的真实列表参数（见 _tmp/jquery.jpage.js）
LIST_BODY_BASE = (
    "perPage=15&pageSize=15&searchstart=1&showMode=full"
    "&unitid=368486&webSiteCode=jxsnynct&channelCode=bcyb"
    "&sort=sortNum&order=desc&current={page}"
)

PER_PAGE = 15
TOTAL_HINT = 4093  # 用于计算最大页数（向上取整）
DELAY_MIN = 1.0
DELAY_MAX = 2.5
RETRY_TIMES = 3
RETRY_BACKOFF = 1.6  # 指数退避基数
TIMEOUT = 25
USER_AGENT = (
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 "
    "(KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36"
)
REFERER = INDEX_URL

OUTPUT_DIR = os.path.abspath(
    os.path.join(os.path.dirname(__file__), "..", "..", "output", "jxsnynct-bcyb")
)
FAILED_FILE = os.path.join(OUTPUT_DIR, "failed.json")
LOG_FILE = os.path.join(OUTPUT_DIR, "spider.log")


def random_delay():
    """随机延时（秒）。"""
    return random.uniform(DELAY_MIN, DELAY_MAX)