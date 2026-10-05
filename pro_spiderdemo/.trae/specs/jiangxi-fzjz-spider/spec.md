# 江西农业农村厅防灾减灾抓取 Spec

## Why
用户需要将江西省农业农村厅门户（jxsnynct）"防灾减灾"栏目下全部历史内容（约 3698 条）系统化、结构化地离线保存为本地 markdown，便于研究与参考。

## What Changes
- 新增一个本地抓取脚本（Python），从 `https://nync.jiangxi.gov.cn/jxsnynct/fzjz/index.html` 入口调用真实列表接口（沿用 `jiangxi-bcyb-spider` 探测到的 `POST /queryList` + jpage 参数形态，频道切换为 `channelCode=fzjz`），抓取每条记录的详情。
- 解析详情页/列表响应中的字段：标题、发布日期、来源单位、正文内容、原始 URL。
- 将每条记录另存为一个 markdown 文件，命名格式：`<YYYY-MM-DD>-<标题>.md`，并清洗文件名中非法字符。
- 生成统一内容格式（见 ADDED Requirements）。
- 输出至 `output/jxsnynct-fzjz/`。
- 生成抓取日志与失败重试清单 `failed.json`。

## Impact
- Affected specs: jiangxi-bcyb-spider（参考其实现的接口形态，但不修改其代码）
- Affected code: 新增 `scripts/spider_jiangxi_fzjz/` 目录及其脚本；新增 `output/jxsnynct-fzjz/` 输出目录。

## ADDED Requirements

### Requirement: 列表全量枚举
系统 SHALL 通过 `POST /queryList` 抓取 `channelCode=fzjz` 频道全量记录，分页参数 `current / perPage=15 / pageSize=15`，排序 `sort=sortNum&order=desc`，与病虫情报频道使用同一接口、相同参数模式，仅替换 `channelCode` 与 `unitid`。
- 列表为空或超过 3698 条目标时正确终止。
- 单页记录数与站方 `total` 字段一致（用户目标 3698）。

#### Scenario: 标准分页
- **WHEN** 接口返回 `data.total = 3698`，每页 15 条
- **THEN** 系统按 `current = 1..246` 翻页直到写满 3698 条

#### Scenario: 列表为空
- **WHEN** 翻页到 `current > total/15`
- **THEN** 系统不再继续，正确退出循环

### Requirement: 详情字段解析
系统 SHALL 从列表响应 `source` 节点提取：
- `title`：记录标题
- `pubDate`：发布日期（YYYY-MM-DD）
- `contentSource`：来源单位/发布机构
- `source.content.content`：正文 HTML
- `urls.pc`：详情页 URL（拼全 host）

正文 HTML 在 `source.content.content` 中已存在；如缺失，再回退抓详情页 `/jxsnynct/fzjz/content/content_<id>.html`。

#### Scenario: 列表已含正文
- **WHEN** `source.content.content` 长度 > 0
- **THEN** 直接使用该字段，不再额外请求详情页

#### Scenario: 正文缺失
- **WHEN** `source.content.content` 为空
- **THEN** 回退抓详情页并解析正文；失败记录到 `failed.json`

### Requirement: 正文转 markdown
系统 SHALL 将正文 HTML 转为干净 markdown：
- 保留段落、列表、表格（转 markdown 表格）、图片（`![alt](src)`）
- 去除脚本、样式、内联 JS、注释
- 去除多余空白与空行
- 处理内嵌附件链接（`.pdf`/`.doc`），保留原始 URL

### Requirement: 文件命名规则
每条记录保存为一个 markdown 文件，命名格式：
```
<YYYY-MM-DD>-<标题>.md
```
- 命名所需信息从 `pubDate` 提取 `YYYY-MM-DD`；标题从 `title` 提取
- Windows 非法字符 `\ / : * ? " < > |` 去除
- 连续空白压缩为单空格
- 文件名总长 ≤ 120 字符
- 重名时附加 `_2`、`_3`... 后缀
- 例：`2021-11-02-降水、降温、大风要来！.md`

#### Scenario: 完整命名
- **WHEN** 标题与日期均可解析
- **THEN** 文件名按 `<YYYY-MM-DD>-<title>.md` 格式生成

#### Scenario: 标题过短或日期缺失
- **WHEN** 标题或日期无法解析
- **THEN** 回退使用 `<item_id>-<原标题>.md` 或 `<title>.md`，仍保证唯一

### Requirement: 统一内容格式
每个 markdown 文件的内容 SHALL 按以下统一结构：
```markdown
# <title>

| 字段 | 值 |
| --- | --- |
| 发布日期 | <YYYY-MM-DD> |
| 来源 | <source> |
| 原文链接 | <source_url> |

---

## 正文

<body_markdown>
```

### Requirement: 容错与重试
系统 SHALL：
- 单条记录失败不中断整个任务；记录到 `failed.json`（含 id、错误信息、时间戳）
- 对 5xx、超时、连接重置自动重试最多 3 次（指数退避）
- 提供 `--limit N` 参数用于限量验证
- 提供 `--retry` 重跑失败项
- 提供 `--reset` 清空 `failed.json`

### Requirement: 抓取节奏
系统 SHALL 在请求之间加入随机延时（1.0–2.5 秒），并设置合理的请求头（User-Agent 模拟常规浏览器、`Referer` 同源、`Accept-Language: zh-CN`、`X-Requested-With: XMLHttpRequest`）。

### Requirement: 输出目录
- 抓取成功的 markdown 文件输出至 `output/jxsnynct-fzjz/`
- 失败清单输出至 `output/jxsnynct-fzjz/failed.json`
- 进度/日志输出至 `output/jxsnynct-fzjz/spider.log`

## MODIFIED Requirements
无。

## REMOVED Requirements
无。

## 备注（实施前置需确认）
- `fzjz` 频道 ID（`unitid`）需在首页 HTML 的 `columnlist` 模板中确认，已知为 `1821717000426962944`（需在实现阶段通过抓取首页验证）
- 与 `bcyb` 频道实现差异点：仅 `channelCode` 与 `unitid` 不同，其余参数（`perPage / pageSize / sort / order / showMode`）保持一致
- 站方对防灾减灾频道的总记录数为 3698（用户口述），实施阶段以接口返回的 `data.total` 为准