# Tasks

- [ ] Task 1: 探测 fzjz 频道 ID 与列表接口
  - [ ] SubTask 1.1: 抓取首页 HTML，从 `columnlist` 模板中读取 `channelCode=fzjz` 对应的 `unitid`
  - [ ] SubTask 1.2: 用探测到的 `unitid` + `channelCode=fzjz` 调 `/queryList`，确认返回字段与 `total=3698`
  - [ ] SubTask 1.3: 抽样确认 `source.content.content` 字段已含完整正文 HTML

- [ ] Task 2: 搭建脚本骨架（沿用 bcyb-spider 设计）
  - [ ] SubTask 2.1: 新建 `scripts/spider_jiangxi_fzjz/` 目录
  - [ ] SubTask 2.2: 实现 `config.py`（fzjz 频道参数、UA、延时、输出目录）
  - [ ] SubTask 2.3: 实现 `fetcher.py`（POST /queryList + 重试）
  - [ ] SubTask 2.4: 实现 `myparser.py`（列表项解析 + HTML→markdown）
  - [ ] SubTask 2.5: 实现 `pipeline.py`（命名清洗 + 统一 markdown 模板）
  - [ ] SubTask 2.6: 实现 `main.py`（分页 → 解析 → 落盘；`--limit` / `--retry` / `--reset` 参数）
  - [ ] SubTask 2.7: 实现 `failed.json` 失败重名入口

- [ ] Task 3: 命名与格式验证
  - [ ] SubTask 3.1: 用 10 条样本验证命名格式 `<YYYY-MM-DD>-<title>.md`
  - [ ] SubTask 3.2: 验证统一模板（标题 + 元信息表 + 正文）
  - [ ] SubTask 3.3: 处理重名、特殊字符、超长标题回退

- [ ] Task 4: 小批量试跑
  - [ ] SubTask 4.1: `--limit 50` 跑通，记录成功率、平均耗时、失败原因
  - [ ] SubTask 4.2: 调整节奏与重试参数，确保长时间运行稳定

- [ ] Task 5: 全量抓取
  - [ ] SubTask 5.1: 运行全量任务（目标 3698 条）
  - [ ] SubTask 5.2: 使用 `--retry` 重跑所有失败项
  - [ ] SubTask 5.3: 输出最终抓取统计：成功数、失败数、缺字段数

- [ ] Task 6: 交付
  - [ ] SubTask 6.1: 生成 `output/jxsnynct-fzjz/` 全量 markdown
  - [ ] SubTask 6.2: 撰写简短 README（运行命令、参数说明、目录结构）

# Task Dependencies
- Task 2 依赖 Task 1
- Task 3 依赖 Task 2
- Task 4 依赖 Task 3
- Task 5 依赖 Task 4
- Task 6 依赖 Task 5