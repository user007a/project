# 数字乡村大屏端 Dashboard 优化方案

## 概述

当前 dashboard 为深色科技风（#0a1628 背景、蓝色系、小圆角 6px、SVG 内联图标），需要全面迁移至数农智果苹果绿浅色设计系统（#f0f4f2 背景、绿色系、大圆角 12-24px、FontAwesome 图标）。保留现有 6 个 Tab 内容结构与数据逻辑。

## 涉及文件

| 文件 | 改动类型 |
|------|----------|
| `css/dashboard.css` | **全面重写** - CSS 变量体系、色彩、布局、圆角、阴影、字体 |
| `index.html` | **中等修改** - 引入 CDN、替换图标、重构 Header、增加 KPI 网格 |
| `js/dashboard.js` | **小幅修改** - 适配新 HTML 选择器、新增筛选面板逻辑 |

---

## P0: CSS 变量体系与色彩替换

**文件**: `css/dashboard.css`

### 1. 建立新 `:root` 变量体系

替换第 24-39 行的旧变量为新设计系统变量：

```css
:root {
  --color-primary: #2b6e3c;
  --color-primary-light: #22a84a;
  --color-primary-dark: #146c31;
  --bg-page: #f0f4f2;
  --bg-panel: #ffffff;
  --bg-panel-hover: #f8faf9;
  --border-default: #d4ddd8;
  --border-light: #e8ede9;
  --border-panel: rgba(43, 110, 60, 0.15);
  --text-primary: #1a2e22;
  --text-secondary: #5a6e60;
  --text-muted: #8a9b8f;
  --color-success: #22a84a;
  --color-warning: #e8a317;
  --color-danger: #d63031;
  --color-info: #2b8a6e;
  --radius-sm: 12px;
  --radius-md: 16px;
  --radius-lg: 24px;
  --radius-full: 9999px;
  --shadow-sm: 0 2px 8px rgba(43, 110, 60, 0.06);
  --shadow-md: 0 4px 16px rgba(43, 110, 60, 0.10);
  --shadow-lg: 0 8px 32px rgba(43, 110, 60, 0.14);
  --shadow-card: 0 2px 12px rgba(43, 110, 60, 0.08);
  --space-xs: 6px;
  --space-sm: 12px;
  --space-md: 16px;
  --space-lg: 24px;
  --space-xl: 32px;
  --font-family: 'Noto Sans SC', 'Microsoft YaHei', 'PingFang SC', sans-serif;
  --font-family-mono: 'DIN Alternate', 'JetBrains Mono', 'Courier New', monospace;
}
```

### 2. 全量级联替换

- `html, body`: 去除固定 1920x1080，改为 `min-height:100vh; background:var(--bg-page); color:var(--text-primary);`
- `.dashboard`: 去除固定宽高，改为 `max-width:1600px; margin:0 auto; min-height:100vh; padding:0 var(--space-lg);`
- `.panel`: 白色背景 + 浅绿边框 + `radius-md`(16px) + `shadow-card`；**删除** `::before`/`::after` 角标装饰
- `.panel-title`: 绿色左边框 + 绿色文字
- `.data-card`: 白色背景 + 左侧强调线改为绿色系
- `.village-name`: 蓝色渐变文字改为纯绿色
- `.tab-nav li.active::after`: 底部指示条改为绿色，去除蓝色光晕
- 所有 `rgba(45,140,240,...)` 批量替换为绿色系（约 40+ 处）
- `.tooltip`: 深蓝背景改为白底 + 绿色边框
- `.header::after`: 删除蓝色光带
- `.dashboard::before`: 辐射背景从蓝色改为极淡绿色或删除
- 所有图表色系：蓝色渐变 -> 绿色渐变，辅助色保持语义色（橙/金/青）

---

## P0: 布局从固定尺寸到响应式

**文件**: `css/dashboard.css`, `index.html`

- `index.html` 第 5 行: `width=1920` -> `width=device-width, initial-scale=1.0`
- `.dashboard`: 固定 1920x1080 -> `max-width:1600px; min-height:100vh`
- `.main-content`: `overflow:hidden` -> `overflow-y:auto`
- 三列布局: 固定百分比宽度 -> `flex:3 / 4 / 3` 弹性比例
- 增加响应式断点:
  ```css
  @media (max-width: 1200px) {
    .kpi-grid { grid-template-columns: repeat(4, 1fr); }
    .layout-three { flex-direction: column; }
    .layout-three > div { width: 100% !important; }
  }
  ```

---

## P0: 圆角全面升级

**文件**: `css/dashboard.css`

| 组件 | 当前 | 改为 |
|------|------|------|
| `.panel` | 6px | 16px (`--radius-md`) |
| `.data-card` | 6px | 16px |
| `.monitor-card` | 6px | 16px |
| `.industry-icon-item` | 6px | 24px (`--radius-lg`) |
| `.facility-item` | 4px | 12px (`--radius-sm`) |
| `.bar` | 3px | 12px 12px 0 0 |
| `.funnel-bar` | 4px | 12px |
| `.btn-fullscreen` | 4px | 12px |
| `.calendar-day` | 3px | 12px |
| `.tooltip` | 4px | 12px |
| `.rank-item:hover` | 4px | 12px |

---

## P1: Header 结构重构

**文件**: `index.html` + `css/dashboard.css`

当前: `[SVG+村名] [6个Tab] [日期+全屏SVG]`

改为设计系统标准结构:
- **左侧**: FA seedling 图标 + 平台标题 + 副标题 + 管理后台入口按钮
- **中间**: 6 个 Tab（每个带 FA 图标）
- **右侧**: 日期徽章（FA 日历图标 + 日期 + 星期）+ 实时时钟 + 全屏按钮

新增 CSS: `.header-logo`、`.platform-name`、`.platform-subtitle`、`.btn-platform-entry`、`.date-badge`、`.time-display`

删除旧 CSS: `.village-icon`、`.village-name`、旧 `.header-left` 200px 固定宽度

---

## P1: FontAwesome 引入与图标替换

**文件**: `index.html`

1. `<head>` 中引入 FontAwesome 6 CDN（同时提供本地引入方案）
2. 替换所有 SVG 内联图标:
   - Header logo -> `<i class="fa-solid fa-seedling">`
   - 全屏按钮 -> `<i class="fa-solid fa-expand">`
3. 替换所有 Emoji:
   - 种植业 -> `<i class="fa-solid fa-wheat-awn">`
   - 养殖业 -> `<i class="fa-solid fa-cow">`
   - 加工业 -> `<i class="fa-solid fa-warehouse">`
   - 乡村旅游 -> `<i class="fa-solid fa-mountain-sun">`
   - 电商服务 -> `<i class="fa-solid fa-cart-shopping">`
   - 手工艺品 -> `<i class="fa-solid fa-palette">`
   - 已建成 -> `<i class="fa-solid fa-circle-check">`
   - 待建设 -> `<i class="fa-solid fa-circle-xmark">`
   - 漏斗箭头 -> `<i class="fa-solid fa-chevron-down">`

---

## P1: 村情总览增加 KPI 网格

**文件**: `index.html` + `css/dashboard.css`

在村情总览 section 顶部新增 8 列 KPI 网格（8 个数据卡片横向排列）:
1. 总人口 2,856 人
2. 总户数 892 户
3. 党员人数 67 人
4. 耕地面积 4,560 亩
5. 村集体年收入 386 万元
6. 产业总产值 1,280 万元
7. 事件处置率 91%
8. 积分参与率 72%

每个 KPI 卡片包含: FA 图标圆圈 + 标签 + 数值 + 单位 + 趋势箭头

原有左侧 5 个数据卡片可移除（数据已合并到 KPI 网格），右侧扩展为全宽。

---

## P2: 阴影系统替换

**文件**: `css/dashboard.css`

所有蓝色辉光阴影 `rgba(45,140,240,...)` -> 绿色调柔和阴影 `var(--shadow-card/md/lg)`

---

## P2: 字体系统替换

**文件**: `index.html` + `css/dashboard.css`

1. `<head>` 引入 Noto Sans SC（Google Fonts）
2. CSS: `font-family` 指向 `var(--font-family)`
3. 字号按 1.33 倍放大:
   - panel-title: 15px -> 20px
   - card-value: 24px -> 32px
   - tab-nav: 15px -> 20px
   - stat-num: 36px -> 48px
   - data-label: 12px -> 16px

---

## P2: 增加筛选面板

**文件**: `index.html` + `css/dashboard.css` + `js/dashboard.js`

在各 section 内容区上方增加筛选条:
- 时间范围选择（select）
- 分类选择（select）
- 重置按钮

样式: 白底圆角条 + 浅绿标签图标 + 圆角下拉框

JS: 筛选切换的视觉反馈 + 重置逻辑

---

## P3: 各 Section 图表色系统一

**文件**: `index.html`（SVG 内联颜色）+ `css/dashboard.css`

### 柱状图色板

| 位置 | 当前 | 改为 |
|------|------|------|
| 种植业 | #19be6b | #2b6e3c |
| 养殖业 | #2db7f5 | #2b8a6e |
| 加工业 | #ff9900 | #22a84a |
| 乡村旅游 | #9b59b6 | #8fb339 |
| 电商服务 | #2d8cf0 | #146c31 |
| 手工艺品 | #ed4014 | #e8a317 |

### 环形图色板

| 指标 | 当前 | 改为 |
|------|------|------|
| 垃圾分类 | #19be6b | #2b6e3c |
| 厕所改造 | #2db7f5 | #22a84a |
| 绿化率 | #ff9900 | #8fb339 |
| 养老保险 | #2d8cf0 | #2b8a6e |
| 医疗保险 | #19be6b | #22a84a |

### 折线图
- 生态趋势: #2d8cf0 -> #2b6e3c
- 信访趋势: #9b59b6 -> #e8a317

### SVG 内部颜色
- `grid-line`: `rgba(255,255,255,0.06)` -> `rgba(43,110,60,0.06)`（浅色背景下可见）
- `axis-label`: `fill` 从白色半透明改为 `#8a9b8f`

---

## P3: 去除科技风装饰

**文件**: `css/dashboard.css`

- 删除 `.panel::before` / `.panel::after` 角标装饰
- 删除 `.header::after` 蓝色光带
- `.dashboard::before` 辐射光改为极淡绿色或删除
- `.map-placeholder::before` 蓝色光效改为绿色系
- `@keyframes pulse` 呼吸动画保留但降低幅度
- `@keyframes shimmer` 进度条流光改为绿色系

---

## P3: 组件微调

**文件**: `css/dashboard.css`

- 排名徽章 4 名以后: `rgba(255,255,255,0.08)` -> `rgba(43,110,60,0.06)`
- 日历 hover: 蓝色 -> 绿色系
- 时间线: 蓝色左边框/圆点 -> 绿色
- 设施列表: 蓝色背景/边框 -> 绿色系
- scrollbar: 蓝色 thumb -> 绿色

---

## JS 改动

**文件**: `js/dashboard.js`

1. 时间选择器: `.datetime .date` -> `.date-badge .date-text` / `.date-badge .week-text` / `.time-display .time-text`
2. 新增筛选面板交互逻辑（select change 视觉反馈 + reset）
3. 保留全部现有功能: 实时时间、Tab 切换、30s 自动轮播、Tooltip、键盘导航、全屏

---

## 注意事项

1. **SVG 内联颜色**: CSS 变量在 SVG `stroke`/`fill` 属性中不生效，需直接写十六进制值
2. **浅色背景对比度**: 从深色迁移到浅色后，所有白色半透明元素需改为深色半透明
3. **FontAwesome CDN**: 大屏内网环境建议下载到本地 `css/` 目录
4. **6 个 Tab 内容结构完全保留**: 只改视觉，不动数据/布局逻辑
5. **现有数据卡片与 KPI 网格的关系**: 村情总览的左侧 5 个数据卡片数据上移到 KPI 网格后，该区域可简化或改为其他内容

---

## 执行顺序

1. CSS 变量体系 + 色彩全量替换
2. 布局响应式改造 + viewport meta
3. 圆角全面升级
4. 引入 FontAwesome + 图标替换
5. Header 结构重构
6. 村情总览 KPI 网格
7. 阴影系统替换
8. 字体系统替换
9. 筛选面板
10. 图表色系统一
11. 去除科技风装饰
12. 组件微调
