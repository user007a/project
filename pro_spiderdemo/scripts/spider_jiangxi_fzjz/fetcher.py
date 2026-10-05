# -*- coding: utf-8 -*-
"""HTTP 客户端：POST /queryList + 自动重试。"""
import http.client
import json
import time

import config


def _post(body, timeout):
    conn = http.client.HTTPSConnection(config.HOST, timeout=timeout)
    headers = {
        "User-Agent": config.USER_AGENT,
        "Referer": config.REFERER,
        "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
        "X-Requested-With": "XMLHttpRequest",
        "Accept-Language": "zh-CN,zh;q=0.9",
        "Accept": "application/json, text/javascript, */*; q=0.01",
    }
    conn.request("POST", config.LIST_PATH, body=body, headers=headers)
    resp = conn.getresponse()
    raw = resp.read()
    conn.close()
    return resp.status, raw


def fetch_list_page(page):
    body = config.LIST_BODY_BASE.format(page=page)
    last_err = None
    for attempt in range(1, config.RETRY_TIMES + 1):
        try:
            status, raw = _post(body, config.TIMEOUT)
            if status != 200:
                last_err = "HTTP %d" % status
            else:
                text = raw.decode("utf-8")
                obj = json.loads(text)
                return obj, obj["data"]["total"]
        except Exception as e:
            last_err = repr(e)
        time.sleep(config.RETRY_BACKOFF ** attempt)
    raise RuntimeError("fetch page %d failed: %s" % (page, last_err))


def fetch_detail(url):
    """备用：抓详情页（如列表无 content.content 时回退）。"""
    import urllib.parse
    p = urllib.parse.urlparse(url)
    conn = http.client.HTTPSConnection(p.netloc, timeout=config.TIMEOUT)
    headers = {
        "User-Agent": config.USER_AGENT,
        "Referer": config.REFERER,
        "Accept-Language": "zh-CN,zh;q=0.9",
    }
    conn.request("GET", p.path, headers=headers)
    resp = conn.getresponse()
    raw = resp.read()
    conn.close()
    return resp.status, raw