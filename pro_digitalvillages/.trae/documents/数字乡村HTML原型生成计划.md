# 数字乡村 HTML 原型生成计划

## 概述

根据 `docs/需求说明书.md` 中定义的"数字乡村（村级版）"系统需求，为四大端生成完整的 HTML 页面原型。原型用于需求确认和前端开发参考，不包含实际后端交互，使用模拟数据填充。

## 文件夹组织结构

```
html/
├── dashboard/                    # 大屏端（1920x1080 横屏）
│   ├── index.html                 # 大屏主页（一页五维度 + 村情总览）
│   ├── css/
│   │   └── dashboard.css          # 大屏专属样式
│   └── js/
│       └── dashboard.js           # Tab 切换、轮播、图表模拟交互
│
├── admin/                         # 后台管理端（PC Web，推荐 1920x1080）
│   ├── login.html                 # 登录页
│   ├── index.html                 # 后台主页框架（左侧导航 + 顶部栏 + 内容区）
│   ├── dashboard.html             # 工作台概览
│   ├── user/
│   │   ├── villager-list.html     # 村民管理列表
│   │   ├── villager-edit.html     # 村民新增/编辑弹窗
│   │   ├── cadre-list.html        # 村干部管理列表
│   │   ├── cadre-edit.html        # 村干部编辑弹窗
│   │   ├── org-tree.html          # 组织架构管理
│   │   └── role-permission.html   # 角色权限管理
│   ├── affairs/
│   │   ├── affairs-list.html      # 村务公开管理列表
│   │   └── affairs-edit.html      # 公开内容编辑弹窗
│   ├── industry/
│   │   └── industry-list.html     # 产业信息管理
│   ├── points/
│   │   ├── rules.html             # 积分规则配置
│   │   ├── audit.html             # 积分审核
│   │   └── exchange.html          # 积分兑换管理
│   ├── event/
│   │   ├── event-list.html        # 事件/工单管理列表
│   │   └── event-detail.html      # 事件详情
│   ├── notice/
│   │   └── notice-list.html       # 通知公告管理
│   ├── stats/
│   │   └── report.html            # 数据统计与报表
│   ├── system/
│   │   ├── dict.html              # 数据字典管理
│   │   ├── log.html               # 操作日志
│   │   └── config.html            # 系统参数配置
│   ├── css/
│   │   └── admin.css              # 后台管理端全局样式
│   └── js/
│       └── admin.js               # 导航折叠、Tab切换、弹窗模拟交互
│
├── villager/                      # 小程序村民端（375px 宽度 H5 原型）
│   ├── index.html                 # 首页（通知滚动 + 宫格入口 + Banner）
│   ├── login.html                 # 微信授权登录页
│   ├── auth.html                  # 实名认证页
│   ├── affairs/
│   │   ├── affairs-list.html      # 村务公开列表（三务 Tab）
│   │   └── affairs-detail.html    # 公开内容详情
│   ├── service/
│   │   ├── service-home.html      # 办事服务主页
│   │   ├── guide-list.html        # 办事指南列表
│   │   ├── guide-detail.html      # 办事指南详情
│   │   ├── apply-form.html        # 线上申请表单
│   │   ├── apply-success.html     # 提交成功页
│   │   └── my-records.html        # 我的办事记录
│   ├── points/
│   │   ├── points-home.html       # 积分中心主页
│   │   ├── points-detail.html     # 积分明细流水
│   │   ├── points-mall.html       # 积分兑换商城
│   │   ├── points-exchange.html   # 兑换确认页
│   │   └── exchange-log.html      # 兑换记录
│   ├── discuss/
│   │   ├── topic-list.html        # 村民说事列表
│   │   ├── topic-new.html         # 发起议题
│   │   └── topic-detail.html      # 议题详情 + 评论
│   ├── report/
│   │   ├── report-home.html       # 随手拍主页
│   │   ├── report-form.html       # 事件上报页
│   │   ├── report-success.html    # 上报成功页
│   │   ├── my-reports.html        # 我的上报列表
│   │   └── report-detail.html     # 上报处理详情
│   ├── profile/
│   │   ├── profile.html           # 个人中心
│   │   ├── profile-edit.html      # 基本信息编辑
│   │   ├── feedback.html          # 意见反馈
│   │   └── about.html             # 关于我们
│   ├── notice/
│   │   ├── notice-list.html        # 通知公告列表
│   │   └── notice-detail.html      # 通知公告详情
│   ├── css/
│   │   └── villager.css            # 村民端全局样式（WeUI 风格）
│   └── js/
│       └── villager.js             # TabBar 切换、轮播、下拉刷新模拟
│
└── cadre/                         # 小程序村干部端（375px 宽度 H5 原型）
    ├── index.html                 # 工作台首页
    ├── patrol/
    │   ├── patrol-plan.html       # 巡查计划列表
    │   ├── patrol-checkin.html    # 巡查打卡页
    │   ├── patrol-records.html    # 巡查记录列表
    │   ├── patrol-stats.html      # 巡查统计
    │   └── patrol-detail.html     # 巡查记录详情
    ├── task/
    │   ├── task-list.html          # 任务管理列表
    │   ├── task-detail.html        # 任务详情
    │   └── task-execute.html       # 执行任务表单
    ├── notice/
    │   ├── notice-send.html        # 通知编辑发布
    │   └── notice-sent.html        # 已发通知列表
    ├── points/
    │   ├── audit-list.html         # 积分审核列表
    │   ├── audit-detail.html       # 审核详情
    │   └── audit-history.html      # 审核历史
    ├── appeal/
    │   ├── appeal-list.html        # 村民诉求列表
    │   └── appeal-detail.html      # 诉求详情 + 回复
    ├── journal/
    │   ├── journal-write.html      # 工作日志填写
    │   ├── journal-list.html       # 日志列表
    │   └── journal-detail.html     # 日志详情
    ├── data/
    │   └── data-overview.html      # 数据查看概览
    ├── profile/
    │   ├── profile.html            # 个人中心
    │   └── profile-edit.html       # 个人信息编辑
    ├── css/
    │   └── cadre.css               # 村干部端全局样式
    └── js/
        └── cadre.js                # TabBar 切换、功能交互
```

## 各端设计风格与样式

### 1. 大屏端（dashboard）

| 项目 | 规范 |
|------|------|
| 分辨率 | 1920x1080 横屏固定布局，不响应式 |
| 整体风格 | 深色科技感大屏风格，深蓝色背景 |
| 背景色 | `#0a1628`（深蓝底色） |
| 面板背景 | `rgba(6, 30, 93, 0.8)` 半透明卡片，边框 `1px solid rgba(45, 140, 240, 0.3)` |
| 主色调 | 科技蓝 `#2d8cf0` |
| 辅助色 | 绿色 `#19be6b`（产业兴旺）、青色 `#2db7f5`（生态宜居）、橙色 `#ff9900`（乡风文明）、蓝色 `#2d8cf0`（治理有效）、紫色 `#9b59b6`（生活富裕） |
| 文字色 | 白色 `#ffffff` 主文字，`rgba(255,255,255,0.7)` 辅助文字 |
| 标题栏 | 高度 80px，左侧村名 + 右侧日期时间 + Tab 导航 |
| Tab 导航 | 6 个维度 Tab：村情总览、产业兴旺、生态宜居、乡风文明、治理有效、生活富裕 |
| 内容区布局 | 五列结构：左15% + 左20% + 中30% + 右20% + 右15% |
| 图表 | 用 CSS/SVG 模拟柱状图、环形图、折线图、漏斗图、仪表盘等（无需 ECharts 等库） |
| 交互 | Tab 切换、悬停 tooltip、点击浮层、全屏按钮、自动轮播 |
| 字体 | `'PingFang SC', 'Microsoft YaHei', sans-serif`，标题 28px，数据数字 36px，正文 14px |

### 2. 后台管理端（admin）

| 项目 | 规范 |
|------|------|
| 分辨率 | 最低 1366x768，推荐 1920x1080 |
| 整体风格 | 经典管理后台风格，白色/浅灰背景 |
| 布局 | 三栏：顶部工具栏 56px + 左侧导航（220px 可折叠至 64px）+ 右侧内容区 |
| 顶部工具栏背景 | `#ffffff`，底部 1px `#e8e8e8` 阴影 |
| 左侧导航背景 | `#304156`（深灰色） |
| 导航文字 | 白色 `#bfcbd9`，选中项 `#409eff` 蓝色高亮 |
| 内容区背景 | `#f0f2f5`（浅灰） |
| 卡片/面板背景 | `#ffffff`，圆角 4px，阴影 `0 2px 12px rgba(0,0,0,0.06)` |
| 主色调 | `#409eff`（蓝色） |
| 成功色 | `#67c23a`、警告色 `#e6a23c`、危险色 `#f56c6c`、信息色 `#909399` |
| 表格 | `#ffffff` 背景，表头 `#f5f7fa`，行 hover `#ecf5ff`，边框 `#ebeef5` |
| 按钮样式 | 主按钮蓝色填充、次按钮白色边框、危险按钮红色填充 |
| 状态标签 | 圆角药丸形，4px padding，12px 字号 |
| 分页 | 底部分页组件，每页默认 20 条 |
| 弹窗 | 居中弹窗，遮罩 `rgba(0,0,0,0.5)`，圆角 8px |
| 面包屑 | 内容区顶部，灰色文字，可点击 |
| 字体 | `'PingFang SC', 'Microsoft YaHei', sans-serif`，正文 14px，标题 18px，数据 24px |
| 图标 | 使用 Unicode/emoji 模拟图标，或内联 SVG |

### 3. 村民小程序端（villager）

| 项目 | 规范 |
|------|------|
| 视口宽度 | 375px（iPhone 标准），页面最大宽度 375px 居中展示 |
| 整体风格 | WeUI 微信小程序风格，简洁清新 |
| 主色调 | `#07c160`（微信绿），与乡村振兴主题呼应 |
| 页面背景 | `#f5f5f5` |
| 卡片背景 | `#ffffff`，圆角 8px |
| 文字颜色 | 主文字 `#333333`，辅助文字 `#999999`，提示文字 `#cccccc` |
| TabBar | 底部固定 4 个 Tab：首页 / 服务 / 积分 / 我的，高 50px，背景白，选中绿 |
| 导航栏 | 顶部固定，高度 44px，左侧返回箭头，居中标题 |
| 列表项 | 白色背景卡片，右侧箭头，底部 1px 分割线 |
| 按钮 | 主按钮绿色填充圆角（8px），次要按钮白色边框 |
| 输入框 | 白色背景，圆角 8px，边框 `#e5e5e5`，高度 44px |
| 状态标签 | 圆角药丸形，10px padding，字号 12px |
| 宫格图标 | 48x48px 彩色图标，图标下方 12px 文字 |
| 间距 | 页面左右 padding 16px，卡片间距 12px，列表项高度 80-100px |
| Toast | 顶部 3 秒自动消失，成功绿/失败红 |
| 空状态 | 居中插图 + 灰色提示文字 |
| 字体 | 系统默认字体栈 `-apple-system, 'PingFang SC', 'Microsoft YaHei', sans-serif` |
| 字号 | 标题 17px，正文 14px，辅助 12px，大数字 32px |

### 4. 村干部小程序端（cadre）

| 项目 | 规范 |
|------|------|
| 视口宽度 | 375px，与村民端一致 |
| 整体风格 | WeUI 微信小程序风格，以蓝灰色调为主，体现办公感 |
| 主色调 | `#409eff`（蓝色，区别于村民端绿色） |
| 页面背景 | `#f5f5f5` |
| 卡片背景 | `#ffffff`，圆角 8px |
| 文字颜色 | 主文字 `#333333`，辅助文字 `#999999` |
| TabBar | 底部固定 4 个 Tab：工作台 / 巡查 / 通知 / 我的，高 50px，选中蓝 |
| 导航栏 | 同村民端规格 |
| 待办角标 | 红色圆形 `#f56c6c`，12px 圆角，白色数字 |
| 工作数据区 | 3 列等分卡片，数字蓝色大号，文字灰色小号 |
| 功能宫格 | 4x2 布局，蓝色系图标，48x48px |
| 其余规范 | 与村民端保持一致的间距、字号、圆角、Toast 等规范 |
| 字体 | 同村民端系统默认字体栈 |
| 字号 | 标题 17px，正文 14px，辅助 12px，大数字 28px |

## 字体规范（全局统一）

| 端 | 字体栈 | 标题字号 | 正文字号 | 辅助字号 | 数据字号 |
|----|--------|---------|---------|---------|---------|
| 大屏端 | `'PingFang SC', 'Microsoft YaHei', sans-serif` | 28px | 14px | 12px | 36px |
| 后台管理端 | `'PingFang SC', 'Microsoft YaHei', sans-serif` | 18px | 14px | 12px | 24px |
| 村民小程序端 | `-apple-system, 'PingFang SC', 'Microsoft YaHei', sans-serif` | 17px | 14px | 12px | 32px |
| 村干部小程序端 | `-apple-system, 'PingFang SC', 'Microsoft YaHei', sans-serif` | 17px | 14px | 12px | 28px |

## 各端页面内容与模拟数据说明

### 大屏端 — 1 个 HTML 文件

**index.html** 包含：
- 顶部标题栏：村名"幸福村"、实时日期时间（JS 模拟）、6 个维度 Tab
- 村情总览（默认页）：5 张数据卡片（总人口 2,856 人、总户数 892 户、党员 67 人、耕地 4,560 亩、村集体收入 386 万元）+ 村庄概要文字 + 特色产业图标
- 产业兴旺 Tab：地图占位 + 产值柱状图 + 产业详情列表
- 生态宜居 Tab：AQI/PM2.5/温度/湿度卡片 + 三个环形图 + 环保事件折线图
- 乡风文明 Tab：积分参与率/兑换率进度条 + 文明家庭榜单 + 文化活动日历/时间轴
- 治理有效 Tab：事件处置漏斗图 + 网格巡查地图 + 调解率仪表盘 + 信访趋势
- 生活富裕 Tab：收入趋势柱状图 + 社保环形进度条 + 电商数据 + 公共服务设施 + 培训统计

### 后台管理端 — 约 22 个 HTML 文件

各页面使用模拟数据填充，列表页展示 5-10 条示例数据。关键页面内容：

- **login.html**：系统名称 + 用户名密码输入框 + 登录按钮
- **index.html**：后台框架页，左侧 9 个一级菜单（首页、用户与组织、村务公开、产业管理、积分管理、事件管理、通知公告、数据统计、系统管理）+ 内容区 iframe/占位
- **villager-list.html**：搜索筛选区 + 10 条村民表格数据 + 分页
- **cadre-list.html**：搜索筛选 + 5 条村干部数据 + 分页
- **org-tree.html**：左侧树形结构 + 右侧详情编辑区
- **role-permission.html**：角色列表表格 + 权限配置弹窗模拟
- **affairs-list.html**：村务公开列表 + 筛选 Tab（全部/待审核/已发布/草稿）
- **industry-list.html**：4 个统计卡片 + 产业信息列表
- **rules.html / audit.html / exchange.html**：积分管理三个子页面
- **event-list.html**：4 个统计卡片 + 事件列表（8 条模拟数据，含不同状态）
- **notice-list.html**：通知公告列表 + 已读统计
- **report.html**：五维度统计卡片 + Tab 切换详细数据
- **dict.html**：左右分栏，分类列表 + 字典项列表
- **log.html**：操作日志列表 + 筛选条件
- **config.html**：分组折叠面板展示参数列表

### 村民小程序端 — 约 26 个 HTML 文件

各页面以手机尺寸（375px）展示，使用模拟数据：

- **index.html**：通知滚动条 + 8 宫格入口 + Banner 轮播 + TabBar
- **login.html / auth.html**：微信授权登录 + 实名认证流程
- **affairs-list.html**：三务 Tab（党务/村务/财务）+ 列表
- **affairs-detail.html**：公开内容详情 + 附件区
- **service-home.html**：办事指南/线上申请/进度查询入口卡片
- **guide-list.html / guide-detail.html**：办事指南列表 + 详情
- **apply-form.html**：线上申请表单（申请事项下拉 + 个人信息自动填充 + 材料上传）
- **apply-success.html**：提交成功页（申请编号 + 状态）
- **my-records.html**：办事记录列表 + 状态 Tab 筛选
- **points-home.html**：积分卡片（总积分/本月获得/消费）+ 近期变动
- **points-mall.html**：2 列商品网格布局（图片 + 名称 + 积分 + 库存）
- **points-exchange.html**：兑换确认页
- **topic-list.html / topic-new.html / topic-detail.html**：村民说事全流程
- **report-home.html / report-form.html / my-reports.html / report-detail.html**：随手拍全流程
- **profile.html**：个人信息 + 功能入口列表
- **notice-list.html / notice-detail.html**：通知公告

### 村干部小程序端 — 约 16 个 HTML 文件

各页面以手机尺寸（375px）展示：

- **index.html**：工作台首页（待办卡片 4 个 + 今日数据 + 8 宫格入口）
- **patrol-plan.html**：巡查计划列表（含不同状态）
- **patrol-checkin.html**：巡查打卡页（GPS 定位 + 照片 + 记录）
- **patrol-records.html / patrol-stats.html / patrol-detail.html**：巡查记录与统计
- **task-list.html / task-detail.html / task-execute.html**：任务管理全流程
- **notice-send.html**：通知编辑发布（标题 + 内容 + 推送范围 + 模板）
- **notice-sent.html**：已发通知列表 + 已读进度条
- **audit-list.html / audit-detail.html / audit-history.html**：积分审核
- **appeal-list.html / appeal-detail.html**：村民诉求处理
- **journal-write.html / journal-list.html / journal-detail.html**：工作日志
- **data-overview.html**：数据概览（卡片式展示）
- **profile.html / profile-edit.html**：个人中心

## 生成步骤

按以下顺序分 4 批生成，每批对应一个端：

1. **大屏端**：生成 `html/dashboard/` 下全部文件（1 HTML + 1 CSS + 1 JS）
2. **后台管理端**：生成 `html/admin/` 下全部文件（约 22 HTML + 1 CSS + 1 JS）
3. **村民小程序端**：生成 `html/villager/` 下全部文件（约 26 HTML + 1 CSS + 1 JS）
4. **村干部小程序端**：生成 `html/cadre/` 下全部文件（约 16 HTML + 1 CSS + 1 JS）

每批生成时：
- 先创建对应文件夹目录
- 编写该端的全局 CSS 样式文件
- 逐页面编写 HTML（内联页面级样式 + 模拟数据）
- 编写该端的 JS 交互文件（Tab 切换、轮播、弹窗等模拟交互）

## 验证方式

- 每个端生成完毕后，用浏览器打开 `index.html` 验证：
  - 大屏端：检查五维度 Tab 切换、数据卡片展示、图表布局
  - 后台管理端：检查导航折叠/展开、菜单跳转、表格数据展示、弹窗交互
  - 村民端：检查 TabBar 切换、宫格入口、列表滚动、表单交互
  - 村干部端：检查 TabBar 切换、待办角标、工作数据展示、功能宫格

## 假设与决策

1. 图表使用纯 CSS/SVG 模拟，不引入第三方图表库（减少外部依赖，保证原型可离线查看）
2. 图标使用 Unicode 字符或内联 SVG，不引入图标库
3. 小程序端以 H5 页面模拟微信小程序样式，不做实际小程序开发
4. 所有数据为前端硬编码模拟数据，不做后端 API 调用
5. 各端之间通过相对路径互相引用 CSS/JS，保持独立性
6. 生成顺序为：大屏端 → 后台管理端 → 村民端 → 村干部端，按复杂度递减排列
