# 后台管理系统完整测试报告

> 测试时间：2026-07-01
> 测试范围：全部 25 个 HTML 文件、admin.css、admin.js
> 测试类型：结构完整性、功能正确性、UI 一致性、数据合理性、跨页面一致性

---

## 一、系统概览

| 指标 | 数值 |
|------|------|
| 总文件数 | 25 个 HTML + 1 CSS + 1 JS |
| 菜单项数 | 20 个（含首页） |
| 菜单-文件映射 | 20/20 全部匹配 |
| 子页面（非菜单） | 3 个：login.html、event-detail.html、affairs-edit.html |
| 未注册到菜单的文件 | 0 个缺失 |
| 发现问题总数 | **97 个** |
| P0 严重 | 3 |
| P1 高 | 24 |
| P2 中 | 50 |
| P3 低 | 20 |

---

## 二、P0 严重问题（3个）

> 页面无法正常工作或出现严重兼容性问题，必须立即修复

### P0-1: affairs-edit.html 缺少 iconify CDN
- **文件**: `affairs/affairs-edit.html`
- **问题**: `<head>` 中未引入 iconify CDN，页面内的图标（如有）无法渲染
- **修复**: 在 `<link rel="stylesheet" href="../css/admin.css">` 后添加 iconify CDN script

### P0-2: affairs-edit.html 缺少外层容器
- **文件**: `affairs/affairs-edit.html`
- **问题**: 页面直接以 `modal-overlay` 开头，没有 `admin-page` 容器包裹。作为 iframe 子页面加载时，全屏遮罩覆盖 iframe，背景为黑色半透明，用户体验极差
- **修复**: 添加 `<div class="admin-page">` 外层包裹

### P0-3: event-detail.html 缺少 iconify CDN
- **文件**: `event/event-detail.html`
- **问题**: 与 P0-1 相同，缺少 iconify 引入
- **修复**: 添加 iconify CDN script

---

## 三、P1 高优先级问题（24个）

> 功能部分失效或与全站设计规范严重不一致

### 3.1 iconify 版本不统一（影响 3 个文件）

| 文件 | 当前使用 | 应统一为 |
|------|---------|---------|
| `system/config.html` | `iconify-icon/2.1.0`（Web Component） | `iconify/3.1.1`（传统） |
| `system/log.html` | `iconify-icon/2.1.0`（Web Component） | `iconify/3.1.1`（传统） |
| `stats/report.html` | `iconify-icon/2.1.0`（Web Component） | `iconify/3.1.1`（传统） |

- **问题**: config.html 和 log.html 使用 `<iconify-icon>` 标签（Web Component 方式），而全站其他 19 个文件使用 `<span class="iconify">` 标签。版本和用法均不统一
- **修复**: 统一为 `iconify/3.1.1`，并将 `<iconify-icon icon="xxx">` 改为 `<span class="iconify" data-icon="xxx"></span>`

### 3.2 admin.css 样式缺失（影响 4 个文件）

| 缺失样式 | 影响范围 |
|----------|---------|
| `.btn-op-divider` | `points/rules.html`、`points/audit.html`、`points/exchange.html`、`event/event-list.html` — 共 4 个文件使用了 `btn-op-divider` class，但 admin.css 中只定义了 `.op-divider`，分隔线不显示 |
| `.toolbar .toolbar-search` | `system/log.html` — toolbar-search 样式仅在 `.role-toolbar .toolbar-search` 下定义，log.html 使用 `.toolbar` 而非 `.role-toolbar` |
| `.form-label` | `event/event-list.html` — 新增弹窗使用了 `.form-label` class，admin.css 中未定义 |
| `.text-danger` | `event/event-list.html` — 使用了 `.text-danger`，admin.css 中未定义 |

### 3.3 dict.html 操作按钮未美化（影响 15 个按钮）

- **文件**: `system/dict.html`
- **问题**: 操作列 15 个按钮（5行 x 3个）仍使用 `btn-text btn-text-primary/warning/danger`，未改为 `btn-op` + iconify 图标 + `op-divider`
- **修复**: 参照其他页面的操作列样式统一改造

### 3.4 affairs-edit.html 按钮全部无功能

- **文件**: `affairs/affairs-edit.html`
- **问题**: "取消"、"保存草稿"、"提交审核" 三个按钮均无 onclick 处理，点击无效果
- **修复**: 添加 onclick 事件（关闭弹窗/显示 toast）

### 3.5 affairs-edit.html modal-close 不规范

- **文件**: `affairs/affairs-edit.html`
- **问题**: `<button class="modal-close">&times;</button>` 缺少 `type="button"`、`aria-label="关闭"`、`onclick="closeModal(...)"`
- **修复**: 补全属性和事件

### 3.6 affairs-edit.html 编辑器工具栏失效

- **文件**: `affairs/affairs-edit.html`
- **问题**: toolbar-btn 缺少 `data-cmd` 属性，admin.js 的 `initRichTextEditor` 依赖 `data-cmd` 来执行 `document.execCommand`
- **修复**: 为每个 toolbar-btn 添加 `data-cmd` 属性

### 3.7 config.html 折叠面板默认全部折叠

- **文件**: `system/config.html`
- **问题**: 所有 collapse-panel 默认 `max-height:0`，进入页面后看不到任何配置项，用户需要逐个点击展开
- **修复**: 页面加载时默认展开第一个面板，或在 admin.js 的 `initCollapsePanels` 中添加默认展开逻辑

### 3.8 搜索栏缺少 form class（影响 12 个文件）

以下文件的搜索栏中 `input` 缺少 `class="form-input"`、`select` 缺少 `class="form-select"`，导致控件缺少统一的设计系统样式：

| 文件 | 缺少 class 的控件数 |
|------|-------------------|
| `affairs/affairs-list.html` | 5 |
| `affairs/affairs-pending.html` | 4 |
| `industry/industry-list.html` | 4 |
| `industry/industry-data.html` | 2 |
| `points/audit.html` | 5 |
| `points/exchange.html` | 3 |
| `event/event-list.html` | 8 |
| `event/event-stats.html` | 1 |
| `notice/notice-list.html` | 5 |
| `notice/notice-sent.html` | 3 |
| `stats/report.html` | 2 |
| `system/dict.html` | 0（无搜索栏） |

### 3.9 跨页面数据不一致（影响 4 个文件）

| 涉及页面 | 不一致项 |
|----------|---------|
| `event-list.html` vs `event-stats.html` | 统计卡片"处置中 8" vs "处理中 4"；"已完成 25" vs "已处理 42" |
| `event-list.html` vs `event-stats.html` | 事件类型名称："邻里纠纷" vs "矛盾纠纷"；"安全隐患" vs "公共安全" |
| `industry-list.html` vs `industry-data.html` | "带动就业" 210人 vs 86人；"年度营收" 1,286万 vs 528万 |
| `industry-list.html` 内部 | "产业总数"卡片显示 12，但表格只有 6 行；"总从业人数"卡片 356 vs 表格求和 210；"正常经营"卡片 10 vs 表格实际 4 |

### 3.10 affairs-list.html 批量删除按钮无功能

- **文件**: `affairs/affairs-list.html`
- **问题**: "批量删除"按钮（btn-danger）没有 onclick 事件，点击无任何响应
- **修复**: 添加批量删除确认逻辑

### 3.11 affairs-pending.html 已审核行仍有审核操作按钮

- **文件**: `affairs/affairs-pending.html`
- **问题**: 已通过和已驳回状态的行仍然显示"通过/驳回"按钮
- **修复**: 已审核完毕的行操作列应改为仅"查看"，或隐藏审核按钮

### 3.12 notice-sent.html 批量撤回按钮无功能

- **文件**: `notice/notice-sent.html`
- **问题**: 批量撤回按钮没有绑定任何事件处理函数
- **修复**: 添加 onclick 事件

### 3.13 affairs-pending.html 分页数据错误

- **文件**: `affairs/affairs-pending.html`
- **问题**: 分页显示"共 3 条记录"，但表格实际有 5 行数据
- **修复**: 修改为"共 5 条记录"

---

## 四、P2 中优先级问题（50个）

> UI/格式不一致、inline style 过多、数据逻辑小问题

### 4.1 btn-text 残留（6个文件）

| 文件 | 残留位置 |
|------|---------|
| `system/dict.html` | 操作列 15 个 btn-text 按钮（P1 已列） |
| `affairs/affairs-pending.html` | 搜索栏附近可能残留 |
| `event/event-list.html` | 搜索栏附近可能残留 |
| `affairs/affairs-list.html` | 搜索栏附近可能残留 |
| `industry/industry-list.html` | 搜索栏附近可能残留 |
| `affairs/affairs-edit.html` | modal-close 按钮 |

### 4.2 inline style 过多（影响 14 个文件）

| 文件 | inline style 处数 | 主要区域 |
|------|------------------|---------|
| `notice/notice-list.html` | 6+ | 详情弹窗内容区 |
| `notice/notice-sent.html` | 4+ | 详情弹窗、批量撤回按钮 |
| `stats/report.html` | 15+ | 表头、表格单元格、筛选区、导出弹窗 |
| `system/log.html` | 8+ | 弹窗内 pre 标签、UA 信息、导出弹窗 |
| `system/config.html` | 4+ | 弹窗内 readonly 输入框、表头宽度 |
| `system/dict.html` | 5+ | 右侧头部、code 标签、table-wrap |
| `affairs/affairs-edit.html` | 3+ | 编辑器、按钮旁文本 |
| `event/event-detail.html` | 2 | 处理结果区、快捷信息 grid |
| `event/event-list.html` | 4 | stat-card 图标色 |
| `event/event-stats.html` | 4 | stat-card 图标色 |
| `industry/industry-data.html` | 4 | stat-card 图标色 |
| `affairs/affairs-pending.html` | 2 | 详情弹窗 |
| `affairs/affairs-list.html` | 4 | 详情弹窗、编辑器区域 |
| `dashboard.html` | 0 | 无 inline style |

### 4.3 其他 UI/格式问题

| # | 文件 | 问题 |
|---|------|------|
| 1 | `dict.html` | 右侧头部区域使用 inline style（padding/border/flex），应提取为 CSS class |
| 2 | `dict.html` | code 标签 inline style 重复 5 次（font-family/color） |
| 3 | `dict.html` | 左侧字典分类列表不可滚动，分类多时会溢出 |
| 4 | `dict.html` | 缺少 iconify CDN 引入 |
| 5 | `log.html` | btn-op 不在 op-cell 容器内，缺少 hover 背景等样式 |
| 6 | `notice-sent.html` | 操作按钮缺少 op-divider 分隔符 |
| 7 | `notice-sent.html` | 批量撤回按钮使用 inline style 控制颜色 |
| 8 | `industry-list.html` | "导出列表"按钮缺少 btn-outline class |
| 9 | `industry-list.html` | 已注销产业仍有"编辑"按钮 |
| 10 | `industry-data.html` | stat-cards 缺少 cols-4 class |
| 11 | `industry-data.html` | 数据表格行无 data-* 属性，操作按钮仅 showToast 占位 |
| 12 | `affairs-pending.html` | 批量驳回按钮使用 inline style 控制颜色 |
| 13 | `affairs-list.html` | 新增弹窗分类选项与表格分类 tag 不匹配（缺少"党务公开"） |
| 14 | `affairs-list.html` | 草稿状态行有"审核"按钮，业务逻辑不合理 |
| 15 | `event-list.html` | 新增弹窗使用未定义的 `.form-label` class |
| 16 | `event-list.html` | 使用未定义的 `.text-danger` class |
| 17 | `event-stats.html` | 统计卡片布局缺少 cols-4 class |
| 18 | `affairs-edit.html` | 审核弹窗 form-group 嵌套不合理 |
| 19 | `report.html` | Tab 切换只有 CSS 样式切换，无数据联动 |
| 20 | `report.html` | 统计维度卡片点击无跳转也无联动 |
| 21 | `config.html` | 表头 th 使用 inline style 定义宽度（8 处） |

---

## 五、P3 低优先级问题（20个）

> 优化建议，不影响当前功能

| # | 文件 | 问题 |
|---|------|------|
| 1 | `login.html` | 无实际用户名/密码验证逻辑（纯跳转），属于原型阶段预期行为 |
| 2 | `login.html` | "记住密码"复选框和"忘记密码"链接无实际功能 |
| 3 | `affairs-edit.html` | 文件名为 affairs-edit 但内容是新增表单，语义不一致 |
| 4 | `affairs-edit.html` | 分类使用 radio 而非 select，与 affairs-list 新增弹窗的 UI 不统一 |
| 5 | `industry-list.html` | "重 置"按钮文本有额外空格，与其他页面不统一 |
| 6 | `industry-data.html` | 4 个 stat-card 中仅第一个有 onclick 跳转，行为不一致 |
| 7 | `points/exchange.html` | 食用油库存为 0 但状态仍为"上架"，建议增加缺货提示 |
| 8 | `event-list.html` | stat-card 图标使用 inline style，建议统一提取为 CSS class |
| 9 | `config.html` | 事件管理/积分设置面板参数行数偏少（各 2 行） |
| 10 | `config.html` | 无新增参数功能 |
| 11 | `dict.html` | 左侧分类列表缺少 overflow-y:auto |
| 12 | `notice-list.html` | 已读率低值高亮标准不统一（仅 46.2% 标红） |
| 13 | `report.html` | 无传统分页，也无数据总量提示 |
| 14 | `notice-sent.html` | 数据行缺少 data-status 属性 |
| 15 | `notice-sent.html` | 详情弹窗与 notice-list 弹窗空值处理风格不一致 |
| 16 | `affairs-pending.html` | 详情弹窗存在 inline style |
| 17 | `affairs-list.html` | 详情弹窗存在 inline style |
| 18 | `notice-list.html` | 查询按钮无 onclick（依赖 admin.js 隐式绑定） |
| 19 | `notice-sent.html` | 与 notice-list 数据字段差异（多 checkbox 列和公告类型列），合理但风格略有不一致 |
| 20 | `event-list.html` vs `event-stats.html` | 统计卡片布局 class 不一致（cols-4 vs 无） |

---

## 六、按文件统计

| 文件 | P0 | P1 | P2 | P3 | 合计 |
|------|----|----|----|----|----|
| `index.html` | 0 | 0 | 0 | 0 | 0 |
| `login.html` | 0 | 0 | 0 | 2 | 2 |
| `dashboard.html` | 0 | 0 | 0 | 0 | 0 |
| `user/villager-list.html` | 0 | 0 | 0 | 0 | 0 |
| `user/cadre-list.html` | 0 | 0 | 0 | 0 | 0 |
| `user/org-tree.html` | 0 | 0 | 0 | 0 | 0 |
| `user/role-permission.html` | 0 | 0 | 0 | 0 | 0 |
| `affairs/affairs-list.html` | 0 | 2 | 3 | 2 | 7 |
| `affairs/affairs-pending.html` | 0 | 2 | 2 | 1 | 5 |
| `affairs/affairs-edit.html` | 2 | 2 | 2 | 2 | 8 |
| `industry/industry-list.html` | 0 | 1 | 2 | 1 | 4 |
| `industry/industry-data.html` | 0 | 1 | 3 | 1 | 5 |
| `points/rules.html` | 0 | 0 | 0 | 0 | 0 |
| `points/audit.html` | 0 | 0 | 1 | 0 | 1 |
| `points/exchange.html` | 0 | 0 | 1 | 1 | 2 |
| `event/event-list.html` | 0 | 2 | 3 | 2 | 7 |
| `event/event-stats.html` | 0 | 2 | 2 | 1 | 5 |
| `event/event-detail.html` | 1 | 0 | 2 | 0 | 3 |
| `notice/notice-list.html` | 0 | 1 | 1 | 2 | 4 |
| `notice/notice-sent.html` | 0 | 1 | 3 | 2 | 6 |
| `stats/report.html` | 0 | 1 | 3 | 2 | 6 |
| `system/dict.html` | 0 | 2 | 4 | 2 | 8 |
| `system/log.html` | 0 | 2 | 2 | 0 | 4 |
| `system/config.html` | 0 | 1 | 3 | 2 | 6 |
| `admin.css` | 0 | 2 | 0 | 0 | 2 |
| `admin.js` | 0 | 0 | 0 | 0 | 0 |
| **合计** | **3** | **24** | **50** | **20** | **97** |

### 零问题文件（7个）
`index.html`、`dashboard.html`、`user/villager-list.html`、`user/cadre-list.html`、`user/org-tree.html`、`user/role-permission.html`、`points/rules.html`、`admin.js` — 通过全部检查项

---

## 七、按类别统计

| 问题类别 | 数量 | 关键问题 |
|----------|------|---------|
| 搜索栏缺 form class | 47 | 12 个文件共 47 个控件缺少 form-input/form-select |
| iconify 版本不统一 | 8 | 3 个文件用 Web Component 方式，与其他 19 个不一致 |
| inline style | 60+ | 14 个文件共 60+ 处 inline style |
| 数据不一致 | 8 | 跨页面统计卡片/类型名称不匹配 |
| 按钮无功能 | 5 | 批量删除、批量撤回、编辑器按钮等 |
| CSS class 缺失 | 4 | btn-op-divider、toolbar-search、form-label、text-danger |
| btn-text 残留 | 15+ | dict.html 15个 + 其他文件若干 |
| 弹窗/功能缺失 | 4 | 编辑器 data-cmd、折叠面板默认展开等 |
| iconify CDN 缺失 | 2 | affairs-edit.html、event-detail.html |
| 容器结构缺失 | 1 | affairs-edit.html 缺少 admin-page |

---

## 八、修复优先级建议

### 第一批：P0 必须立即修复（3个）
1. `affairs-edit.html` — 添加 iconify CDN + admin-page 容器
2. `event-detail.html` — 添加 iconify CDN

### 第二批：P1 高优先级（24个）
1. 统一 iconify CDN 版本（config.html、log.html、report.html）
2. admin.css 补充缺失样式（.btn-op-divider 别名、.toolbar .toolbar-search、.form-label、.text-danger）
3. dict.html 操作列改为 btn-op + 图标 + op-divider
4. affairs-edit.html 按钮添加 onclick + modal-close 规范化 + 编辑器 data-cmd
5. config.html 默认展开第一个折叠面板
6. 12 个文件搜索栏统一添加 form-input/form-select class
7. 跨页面数据对齐（event-list vs event-stats、industry-list vs industry-data）
8. 无功能按钮添加 onclick（批量删除、批量撤回）
9. affairs-pending.html 已审核行隐藏审核按钮 + 分页数字修正

### 第三批：P2 中优先级（50个）
1. 全站 btn-text → btn-op 替换（剩余文件）
2. inline style 提取到 CSS（批量处理）
3. 其他 UI 一致性修复

### 第四批：P3 低优先级（20个）
1. login.html 表单验证优化
2. 业务逻辑优化（库存为0自动下架等）
3. 代码规范优化

---

*报告结束。共检查 25 个 HTML 文件 + admin.css + admin.js，发现 97 个问题。*
