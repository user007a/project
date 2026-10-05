# Tasks

- [ ] Task 1: 探测列表数据源
  - [ ] SubTask 1.1: 用浏览器开发者工具 / 抓包识别分页参数与真实接口地址，记录请求头与负载
  - [ ] SubTask 1.2: 验证接口的返回结构（JSON 字段名、分页字段 `total` / `pageIndex` / `pageSize`）
  - [ ] SubTask 1.3: 确认单页记录数与"4093 条"是否一致

- [ ] Task 2: 搭建脚本骨架
  - [ ] SubTask 2.1: 新建 `scripts/spider_jiangxi_bcyb/` 目录与 `requirements.txt`
  - [ ] SubTask 2.2: 实现 `config.py`（基础 URL、分页参数、UA、延时区间、输出目录）
  - [ ] SubTask 2.3: 实现 `fetcher.py`（带重试的 HTTP 客户端）
  - [ ] SubTask 2.4: 实现 `parser.py`（列表解析 + 详情页解析 + HTML→markdown）
  - [ ] SubTask 2.5: 实现 `pipeline.py`（命名清洗、统一 markdown 模板、落盘）
  - [ ] SubTask 2.6: 实现 `main.py`（串起列表→详情→落盘；`--limit` / `--retry` 参数）
  - [ ] SubTask 2.7: 实现 `failed.json` 失败重试入口

- [ ] Task 3: 命名与格式验证
  - [ ] SubTask 3.1: 用 5 条样本验证命名规则、字段完整性、markdown 模板
  - [ ] SubTask 3.2: 处理重名、特殊字符、超长标题回退

- [ ] Task 4: 小批量试跑
  - [ ] SubTask 4.1: `--limit 50` 跑通，记录成功率、平均耗时、失败原因
  - [ ] SubTask 4.2: 调整节奏与重试参数，确保长时间运行稳定

- [ ] Task 5: 全量抓取
  - [ ] SubTask 5.1: 运行全量任务（默认 4093 条目标）
  - [ ] SubTask 5.2: 使用 `--retry failed.json` 重跑所有失败项
  - [ ] SubTask 5.3: 输出最终抓取统计：成功数、失败数、缺字段数

- [ ] Task 6: 交付
  - [ ] SubTask 6.1: 生成 `output/jxsnynct-bcyb/` 全量 markdown
  - [ ] SubTask 6.2: 撰写简短 README（运行命令、参数说明、目录结构）

# Task Dependencies
- Task 2 依赖 Task 1
- Task 3 依赖 Task 2
- Task 4 依赖 Task 3
- Task 5 依赖 Task 4
- Task 6 依赖 Task 5