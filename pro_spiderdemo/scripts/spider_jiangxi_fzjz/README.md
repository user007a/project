# 江西农业农村厅防灾减灾抓取脚本

抓取 `https://nync.jiangxi.gov.cn/jxsnynct/fzjz/index.html`（江西省农业农村厅"防灾减灾"栏目）下全量内容，保存到本地为统一的 markdown 文件。

## 数据源

列表数据由站方内部的 `jpage` 插件通过 AJAX 请求（与病虫情报同一接口）：

```
POST https://nync.jiangxi.gov.cn/queryList
Content-Type: application/x-www-form-urlencoded; charset=UTF-8
X-Requested-With: XMLHttpRequest

current=<page>&perPage=15&pageSize=15&searchstart=1
&showMode=full&unitid=1821717000426962944&webSiteCode=jxsnynct
&channelCode=fzjz&sort=sortNum&order=desc
```

- `unitid=1821717000426962944` 取自首页 `columnlist` 模板
- 响应 `data.total = 3698`，分247页，每页15条
- `source.content.content` 已含完整正文 HTML，无需抓详情页

## 目录结构

```
scripts/spider_jiangxi_fzjz/
├── main.py        # 主流程
├── config.py      # 配置（URL、UA、延时、输出目录）
├── fetcher.py     # POST /queryList + 自动重试
├── myparser.py    # JSON 解析 + HTML→markdown
├── pipeline.py    # 命名清洗 + markdown 模板
├── requirements.txt
└── README.md
```

输出：

```
output/jxsnynct-fzjz/
├── <YYYY-MM-DD>-<标题>.md   # 共 3698 个
├── failed.json      # 失败清单（本任务为空）
└── spider.log       # 抓取日志
```

## 运行

```powershell
# 全量抓取（247 页 / 3698 条，约 10 分钟）
python scripts/spider_jiangxi_fzjz/main.py --start-page 1 --end-page 247

# 仅前 N 条
python scripts/spider_jiangxi_fzjz/main.py --limit 50

# 指定页码区间
python scripts/spider_jiangxi_fzjz/main.py --start-page 1 --end-page 5

# 清空失败清单
python scripts/spider_jiangxi_fzjz/main.py --reset
```

## 命令行参数

| 参数 | 默认 | 说明 |
| --- | --- | --- |
| `--limit N` | 0（全部） | 仅抓取前 N 条 |
| `--start-page` | 1 | 起始页 |
| `--end-page` | 0（末页） | 结束页 |
| `--reset` | False | 清空 failed.json |

## Markdown 模板

每个文件统一结构：

```markdown
# <title>

| 字段 | 值 |
| --- | --- |
| 发布日期 | <YYYY-MM-DD> |
| 来源 | <source> |
| 原文链接 | <source_url> |

---

## 正文

<markdown 正文>
```

## 文件命名规则

```
<YYYY-MM-DD>-<标题>.md
```

- Windows 非法字符 `\ / : * ? " < > |` 全部去除
- 连续空白压缩为单空格
- 文件名总长 ≤ 120 字符
- 重名时附加 `_2` `_3` 后缀
- 标题或日期缺失时回退为 `<item_id>-<原标题>.md` 或 `<原标题>.md`

## 抓取节奏与容错

- 每页间隔 1.0–2.5 秒随机延时
- 网络异常自动指数退避重试最多 3 次
- 单条解析或写盘失败不中断，记入 `failed.json`
- 本任务全量跑完 **3698 / 3698 成功，零失败**

## 抓取结果统计（2026-09-03 实测）

- 总记录数：**3698**
- 抓取成功率：**100%**
- 抓取耗时：**约 9 分钟**（247 页）
- 时间范围：2002 年 — 2026 年