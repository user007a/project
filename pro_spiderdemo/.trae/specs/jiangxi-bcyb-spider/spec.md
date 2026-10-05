# 江西农业农村厅病虫情报抓取 Spec

## Why
用户需要将江西省农业农村厅门户（jxsnynct）"病虫预报"栏目下全部历史病虫情报（约 4093 条）系统化、结构化地离线保存为本地 markdown，便于研究与参考。

## What Changes
- 新增一个本地抓取脚本（Python），从 `https://nync.jiangxi.gov.cn/jxsnynct/bcyb/index.html` 入口遍历列表页（按需处理分页、POST/JS 加载），抓取每条记录的详情页。
- 解析详情页：标题、发布日期、来源单位、正文内容（清洗 HTML、转 markdown）、原始 URL。
- 将每条记录另存为一个 markdown 文件，文件名格式：`【<地区>病虫情报<YYYY>年第<NN>期：<主题><YYYY-MM-DD>】.md`，并清洗文件名中非法字符。
- 生成统一内容格式（见 ADDED Requirements）。
- 生成抓取日志与失败重试清单 `failed.json`。

## Impact
- Affected specs: 无（新增能力）
- Affected code: 新增 `scripts/spider_jiangxi_bcyb/` 目录及其脚本；新增 `output/jxsnynct-bcyb/` 输出目录。

## ADDED Requirements

### Requirement: 列表页全量枚举
系统 SHALL 从 `https://nync.jiangxi.gov.cn/jxsnynct/bcyb/index.html` 出发，分页（pageIndex 递增）枚举全部病虫情报记录，直到列表为空或超过用户指定目标条数（默认 4093）。
- 列表为空时正确终止，不抛异常。
- 支持常见的列表分页协议（URL `pageIndex=N` 或 POST `page` 参数），通过抓取首页源码探测。
- 如列表页返回 JS 渲染或接口 JSON，应直接调用后端接口而非渲染 DOM。

#### Scenario: 标准分页
- **WHEN** 列表分页参数为 `pageIndex=N`，每页返回 N 条记录
- **THEN** 系统按 1, 2, 3... 翻页，直到返回空页或达到目标条数

#### Scenario: 接口式分页
- **WHEN** 列表由内部接口 `xxxList.api` 返回 JSON 提供数据
- **THEN** 系统直接调用该接口，跳过 HTML 渲染

### Requirement: 详情页抓取与解析
系统 SHALL 抓取每条记录详情页并提取：
- `title`：记录标题（如 "南昌县病虫情报2026年第13期：稻飞虱防治警报"）
- `publish_date`：发布日期（YYYY-MM-DD）
- `region`：地区/单位（如"南昌县"）
- `issue_no`：期号（如"2026年第13期"）
- `topic`：本期主题/副标题
- `source`：来源单位/发布机构
- `body_markdown`：清洗后的正文 markdown
- `source_url`：详情页 URL

#### Scenario: 正常详情页
- **WHEN** 详情页为标准政府站模板（含标题、发布日期、来源、正文 `<div>`）
- **THEN** 全部字段均能解析成功

#### Scenario: 字段缺失
- **WHEN** 详情页缺少发布日期或来源
- **THEN** 系统记为空字符串并继续，不抛异常；写入 `failed.json` 中标记为 warning

### Requirement: 正文转 markdown
系统 SHALL 将详情页正文 HTML 转为干净 markdown：
- 保留段落、列表、表格（转为 markdown 表格）、图片（保留 `<img>` 标签或转换为相对路径占位）
- 去除脚本、样式、内联 JS、`<style>`、注释
- 去除多余空白与空行
- 处理内嵌附件链接（如 `.pdf`/`.doc`），保留原始 URL

#### Scenario: 含表格与图片
- **WHEN** 正文含 `<table>` 与 `<img src=...>`
- **THEN** 表格转为 markdown 表格，图片以 `![alt](src)` 形式保留

### Requirement: 文件命名规则
每条记录保存为一个 markdown 文件，文件名格式：
```
【<region>病虫情报<YYYY>年第<NN>期：<topic><YYYY-MM-DD>】.md
```
- 文件名清洗规则：去除 `\ / : * ? " < > |`，替换连续空白为单空格，限制总长度 ≤ 120 字符。
- 命名所需信息无法从详情页解析时，回退为 `【<title>_<publish_date>】.md`。
- 重名时附加序号 `_2`、`_3`...。

#### Scenario: 标题完整
- **WHEN** 详情页标题可解析为"地区+期号+主题+日期"
- **THEN** 文件名按完整格式生成

#### Scenario: 标题不完整
- **WHEN** 标题缺少期号或主题
- **THEN** 文件名按回退格式生成，仍保证唯一

### Requirement: 统一内容格式
每个 markdown 文件的内容 SHALL 按以下统一结构：
```markdown
# <title>

| 字段 | 值 |
| --- | --- |
| 地区 | <region> |
| 期号 | <issue_no> |
| 发布日期 | <publish_date> |
| 来源 | <source> |
| 原文链接 | <source_url> |

---

## 正文

<body_markdown>
```

### Requirement: 容错与重试
系统 SHALL：
- 单条记录失败不中断整个任务；记录到 `failed.json`（含 URL、错误信息、时间戳）。
- 对 5xx、超时、连接重置自动重试最多 3 次（指数退避）。
- 提供 `--limit N` 参数用于限量验证。
- 提供 `--retry failed.json` 重跑失败项。

### Requirement: 抓取节奏
系统 SHALL 在请求之间加入随机延时（1.0–2.5 秒），并设置合理的请求头（User-Agent 模拟常规浏览器、`Referer` 同源、`Accept-Language: zh-CN`）。

### Requirement: 输出目录
- 抓取成功的 markdown 文件输出至 `output/jxsnynct-bcyb/`。
- 失败清单输出至 `output/jxsnynct-bcyb/failed.json`。
- 进度/日志输出至 `output/jxsnynct-bcyb/spider.log`。

## MODIFIED Requirements
无。

## REMOVED Requirements
无。

## 备注（实施前置需确认）
- 列表页当前显示"共 1 条记录"与用户口述"4093 条"存在矛盾：实际列表通常由站点后端接口提供分页数据，需先用浏览器开发者工具 / 抓包确认真实接口地址（很可能形如 `.../bcybList.api?...` 或带 `pageIndex` 参数的查询接口），再据此实现。
- 站方是否对高频访问有限制（如 IP 限流 / 验证码）：首次抓取建议先 `--limit 20` 验证流程与稳定性。