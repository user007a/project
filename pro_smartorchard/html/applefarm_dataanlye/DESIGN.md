# 数农智果 · 数据大屏端设计令牌文档 (DESIGN.md)

> 版本：v1.0 | 适用范围：applefarm_dataanlye（da_dashboard.html + vr_panorama.html）
> 基于PC端设计系统（design-system.css v2.0）的"大屏增强"版本

---

## 1. Visual Theme（视觉主题）

**Philosophy**: 清新自然 × 数据驱动 — 让每一帧数据都有呼吸感，让每一个指标都直击决策
**Direction**: Fresh Data, Light Professional, Nature-Tech Fusion
**Personality**: 专业可信、清新活力、一目了然
**Reference**: Stripe Dashboard（数据可视化专业感）+ Notion（浅色信息层级）+ Supabase（绿色品牌调性）

### 设计系统推荐

| 方案 | 设计系统 | 匹配度 | 特征 | 适合原因 |
|------|---------|--------|------|---------|
| A | **Supabase** | ★★★★★ | 绿色品牌调性、数据密集浅色主题、现代工具感 | 品牌色天然契合（绿色系），数据面板信息密度高，浅色基调完美匹配 |
| B | **Stripe** | ★★★★☆ | 金融级数据可视化、专业商务感、精致渐变 | 企业驾驶舱专业感强，图表/数据展示有标杆级处理 |
| C | **Notion** | ★★★★☆ | 极致信息层级、浅色留白、内容优先 | 浅色清新风标杆，信息架构清晰，适合大屏远距离阅读 |

**最终选择**：以 **Supabase** 为主基调（绿色品牌天然契合），融合 **Stripe** 的数据可视化专业感和 **Notion** 的信息层级处理。

### 5大视觉方向定位

**融合方向**：Soft Warm（柔和温暖）× Modern Minimal（现代极简）

- 继承 Soft Warm 的亲和力（圆润形状、温暖绿色调、让人放松的视觉节奏）
- 融合 Modern Minimal 的专业感（严格栅格、清晰层级、数据优先）
- **不采用** Tech Utility 的深色基调（需浅色清新风）
- **不采用** Editorial Monocle 的装饰感（数据大屏需高效传达）

---

## 2. Color Palette（调色板）

### 2.1 主色系 — 苹果绿（大屏增强版）

> 在PC端 primary 梯度基础上，增加更多浅色梯度用于大屏背景层级区分

| Token | HEX | 用途 | 备注 |
|-------|-----|------|------|
| `--ds-primary-25` | #f7fdf9 | 极浅背景 | 大屏新增：KPI卡片hover态、选中行背景 |
| `--ds-primary-50` | #f0faf3 | 浅色背景 | 复用PC端 |
| `--ds-primary-100` | #d6f5dc | 浅色填充 | 复用PC端 |
| `--ds-primary-200` | #aeeab8 | 图表辅助色 | 复用PC端 |
| `--ds-primary-300` | #76d88c | 图表辅助色 | 复用PC端 |
| `--ds-primary-400` | #46c365 | 图表主色 | 复用PC端 |
| `--ds-primary-500` | #22a84a | 品牌主色 | 复用PC端 |
| `--ds-primary-600` | #1a8a3c | 深色强调 | 复用PC端 |
| `--ds-primary-700` | #146c31 | 标题/深文字 | 复用PC端 |
| `--ds-primary-800` | #0f5628 | 深色文字 | 复用PC端 |
| `--ds-primary-900` | #0a4622 | 极深强调 | 复用PC端 |

### 2.2 辅助色 — 苹果暖橙

| Token | HEX | 用途 |
|-------|-----|------|
| `--ds-accent-50` | #fff5f0 | 浅色背景 |
| `--ds-accent-100` | #ffe6d9 | 浅色填充 |
| `--ds-accent-200` | #ffd0b3 | 图表辅助 |
| `--ds-accent-300` | #ffb08c | 图表辅助 |
| `--ds-accent-400` | #ff8c5a | 图表主色 |
| `--ds-accent-500` | #ff6b35 | 强调色 |
| `--ds-accent-600` | #e55a2b | 深色强调 |
| `--ds-accent-700` | #bf4a24 | 深色文字 |

### 2.3 大屏专属色彩 — 数据可视化色板

> 大屏图表专用的7色色板，确保色盲友好和远距离可辨识

| Token | HEX | 用途 | 色彩角色 |
|-------|-----|------|---------|
| `--ds-chart-green` | #2b6e3c | 品牌绿·主数据 | 核心数据线/柱 |
| `--ds-chart-green-light` | #4ade80 | 浅绿·辅助数据 | 辅助数据/饼图切片 |
| `--ds-chart-green-pale` | #86efac | 极浅绿·背景填充 | 面积图底色 |
| `--ds-chart-blue` | #3b82f6 | 蓝色·第二维度 | 对比数据/趋势线 |
| `--ds-chart-blue-light` | #93c5fd | 浅蓝·辅助 | 辅助蓝色 |
| `--ds-chart-amber` | #f59e0b | 琥珀·预警 | 警告数据/异常标注 |
| `--ds-chart-amber-light` | #fcd34d | 浅琥珀·辅助 | 辅助琥珀 |
| `--ds-chart-red` | #ef4444 | 红色·危险 | 危险数据/告警 |
| `--ds-chart-red-light` | #fca5a5 | 浅红·辅助 | 辅助红色 |
| `--ds-chart-violet` | #8b5cf6 | 紫色·特殊 | 特殊数据/异常 |
| `--ds-chart-cyan` | #06b6d4 | 青色·信息 | 信息类数据 |
| `--ds-chart-slate` | #64748b | 石板灰·中性 | 无特殊含义的数据 |

### 2.4 大屏专属色彩 — KPI卡片色彩方案

> 8色KPI卡片色彩方案，每个KPI有独立的视觉标识

| Token | HEX | 图标背景 | 图标色 | 数值渐变 | 顶部条纹渐变 |
|-------|-----|---------|--------|---------|------------|
| `--ds-kpi-green` | #2b6e3c | #eef6ef | #2b6e3c | →#1a8a3c | →#22a84a |
| `--ds-kpi-blue` | #3b82f6 | #e0f2fe | #0284c7 | →#2563eb | →#3b82f6 |
| `--ds-kpi-amber` | #f59e0b | #fff7ed | #d97706 | →#f59e0b | →#fbbf24 |
| `--ds-kpi-red` | #ef4444 | #fef2f2 | #dc2626 | →#ef4444 | →#f87171 |
| `--ds-kpi-violet` | #8b5cf6 | #f5f3ff | #7c3aed | →#8b5cf6 | →#a78bfa |
| `--ds-kpi-cyan` | #06b6d4 | #ecfeff | #0891b2 | →#06b6d4 | →#22d3ee |
| `--ds-kpi-emerald` | #10b981 | #ecfdf5 | #059669 | →#10b981 | →#34d399 |
| `--ds-kpi-orange` | #f97316 | #fff7ed | #ea580c | →#f97316 | →#fb923c |

### 2.5 功能色

| Token | HEX | 用途 |
|-------|-----|------|
| `--ds-success` | #52c41a | 成功/正常/在线 |
| `--ds-success-bg` | #f6ffed | 成功背景 |
| `--ds-success-border` | #b7eb8f | 成功边框 |
| `--ds-warning` | #faad14 | 警告/进行中 |
| `--ds-warning-bg` | #fffbe6 | 警告背景 |
| `--ds-warning-border` | #ffe58f | 警告边框 |
| `--ds-error` | #ff4d4f | 错误/离线/危险 |
| `--ds-error-bg` | #fff2f0 | 错误背景 |
| `--ds-error-border` | #ffccc7 | 错误边框 |
| `--ds-info` | #1890ff | 信息/提示 |
| `--ds-info-bg` | #e6f7ff | 信息背景 |
| `--ds-info-border` | #91d5ff | 信息边框 |

### 2.6 中性色

| Token | HEX | 用途 |
|-------|-----|------|
| `--ds-gray-25` | #fcfcfd | 极浅背景（大屏新增） |
| `--ds-gray-50` | #fafafa | 浅色背景 |
| `--ds-gray-100` | #f5f5f5 | 填充背景 |
| `--ds-gray-200` | #e8e8e8 | 分隔线 |
| `--ds-gray-300` | #d9d9d9 | 边框 |
| `--ds-gray-400` | #bfbfbf | 禁用色 |
| `--ds-gray-500` | #8c8c8c | 次要文字 |
| `--ds-gray-600` | #595959 | 正文 |
| `--ds-gray-700` | #434343 | 标题文字 |
| `--ds-gray-800` | #262626 | 主标题 |
| `--ds-gray-900` | #1f1f1f | 极深文字 |

### 2.7 背景色系统（大屏增强）

| Token | HEX | 用途 | 对比PC端 |
|-------|-----|------|---------|
| `--ds-bg-base` | #f0f4f2 | 大屏整体背景 | PC端#f5f7fa → 更偏绿，自然感 |
| `--ds-bg-card` | #ffffff | 卡片背景 | 同PC端 |
| `--ds-bg-card-hover` | #f7fdf9 | 卡片hover态 | 大屏新增 |
| `--ds-bg-section` | #f5f8f6 | 区域段背景 | 大屏新增：用于区分不同数据区域 |
| `--ds-bg-overlay` | rgba(43,110,60,0.45) | 地图遮罩层 | 大屏专属 |
| `--ds-bg-glass` | rgba(255,255,255,0.85) | 毛玻璃背景 | VR页专属 |
| `--ds-bg-glass-dark` | rgba(43,110,60,0.08) | 淡绿色毛玻璃 | 大屏新增 |

### 2.8 渐变色（大屏增强）

| Token | 值 | 用途 |
|-------|---|------|
| `--ds-gradient-primary` | linear-gradient(135deg, #2b6e3c, #22a84a) | 主渐变·标题/按钮 |
| `--ds-gradient-primary-soft` | linear-gradient(135deg, #f0fdf4, #dcfce7) | 浅色渐变·背景装饰 |
| `--ds-gradient-header` | linear-gradient(135deg, #1a7a3c, #22a84a) | 标题栏渐变 |
| `--ds-gradient-hero` | linear-gradient(180deg, rgba(43,110,60,0.30) 0%, rgba(43,110,60,0.50) 100%) | 地图/实景覆盖层 |
| `--ds-gradient-kpi-green` | linear-gradient(135deg, #2b6e3c, #1a8a3c) | KPI数值渐变 |
| `--ds-gradient-kpi-blue` | linear-gradient(135deg, #3b82f6, #2563eb) | KPI数值渐变·蓝 |
| `--ds-gradient-kpi-amber` | linear-gradient(135deg, #f59e0b, #d97706) | KPI数值渐变·琥珀 |
| `--ds-gradient-kpi-red` | linear-gradient(135deg, #ef4444, #dc2626) | KPI数值渐变·红 |
| `--ds-gradient-chart-area` | linear-gradient(180deg, rgba(43,110,60,0.25) 0%, rgba(43,110,60,0.02) 100%) | 面积图渐变 |
| `--ds-gradient-progress` | linear-gradient(90deg, #2b6e3c, #4ade80) | 进度条渐变 |

---

## 3. Typography（排版）

### 3.1 字体栈

```css
--ds-font-family: 'Noto Sans SC', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'PingFang SC', 'Microsoft YaHei', sans-serif;
--ds-font-family-mono: 'JetBrains Mono', 'Fira Code', 'SF Mono', 'Cascadia Code', Consolas, monospace;
--ds-font-family-number: 'DIN Alternate', 'Roboto Condensed', 'Oswald', var(--ds-font-family-mono);
```

> **数字字体说明**：KPI数值使用 `--ds-font-family-number`，确保数字等宽且更具视觉冲击力。
> 如无法加载 DIN Alternate，降级到 Roboto Condensed 或等宽字体。

### 3.2 大屏字号体系

> 对比PC端，所有字号放大 1.25~1.5 倍，确保大屏远距离可读

| Level | 大屏字号 | PC端字号 | Weight | Line-height | Usage |
|-------|---------|---------|--------|-------------|-------|
| Display | 40px / 2.5rem | 28px | 700 | 1.15 | 大屏主标题 |
| H1 | 32px / 2rem | 24px | 700 | 1.2 | 页面标题 |
| H2 | 24px / 1.5rem | 20px | 600 | 1.25 | 区块标题 |
| H3 | 20px / 1.25rem | 18px | 600 | 1.3 | 卡片标题 |
| Body | 16px / 1rem | 15px | 400 | 1.6 | 正文 |
| Body-sm | 14px / 0.875rem | 14px | 400 | 1.5 | 辅助文字 |
| Small | 13px / 0.8125rem | 13px | 400 | 1.5 | 标签、说明 |
| Micro | 12px / 0.75rem | 12px | 500 | 1.4 | 徽章、极小标注 |

### 3.3 KPI数值专属规范

| Token | Size | Weight | Font-family | 用途 |
|-------|------|--------|-------------|------|
| `--ds-kpi-xl` | 48px / 3rem | 800 | var(--ds-font-family-number) | 核心KPI大数字 |
| `--ds-kpi-lg` | 36px / 2.25rem | 700 | var(--ds-font-family-number) | 重要KPI数字 |
| `--ds-kpi-md` | 28px / 1.75rem | 700 | var(--ds-font-family-number) | 普通KPI数字 |
| `--ds-kpi-sm` | 22px / 1.375rem | 600 | var(--ds-font-family-number) | 小型指标数字 |
| `--ds-kpi-unit` | 16px / 1rem | 400 | var(--ds-font-family) | KPI单位文字 |

### 3.4 文字色

| Token | HEX | 用途 |
|-------|-----|------|
| `--ds-text-primary` | #1a2332 | 主文字（比PC端略深，大屏需要更强对比） |
| `--ds-text-secondary` | #434343 | 副标题/次要文字 |
| `--ds-text-tertiary` | #64748b | 说明/辅助文字 |
| `--ds-text-muted` | #94a3b8 | 极淡文字 |
| `--ds-text-inverse` | #ffffff | 反色文字 |
| `--ds-text-kpi` | #2b6e3c | KPI数值主色（品牌绿） |
| `--ds-text-link` | #22a84a | 链接色 |

---

## 4. Component Styles（组件样式）

### 4.1 卡片组件（Card）

大屏卡片比PC端更宽松、圆角更大、阴影更柔和。

```css
--ds-card-bg: #ffffff;
--ds-card-border: 1px solid rgba(43,110,60,0.06);
--ds-card-radius: 20px;       /* PC端12px → 大屏20px */
--ds-card-padding: 20px;      /* PC端16px → 大屏20px */
--ds-card-shadow: 0 4px 16px rgba(43,110,60,0.06), 0 1px 4px rgba(0,0,0,0.03);
--ds-card-shadow-hover: 0 12px 28px rgba(43,110,60,0.10), 0 4px 12px rgba(0,0,0,0.04);
--ds-card-header-border: 4px solid #2b6e3c;
--ds-card-header-padding: 0 0 16px 14px;
```

**卡片头部样式**：
- 左侧4px品牌绿竖线标识
- 标题字号 H3 (20px/600)
- 右侧附加信息 Small (13px/400) + text-tertiary

### 4.2 KPI指标卡（KPI Card）

大屏KPI卡片需要远距离可辨识，强化图标+数字的对比度。

```css
/* KPI卡片基础 */
--ds-kpi-card-bg: #ffffff;
--ds-kpi-card-radius: 20px;
--ds-kpi-card-padding: 16px 18px;
--ds-kpi-card-shadow: 0 2px 8px rgba(43,110,60,0.04);
--ds-kpi-card-border: 1px solid rgba(43,110,60,0.06);
--ds-kpi-card-shadow-hover: 0 8px 20px rgba(43,110,60,0.10);
--ds-kpi-card-border-hover: 1px solid #d1fae5;

/* KPI图标 */
--ds-kpi-icon-size: 52px;      /* PC端44px → 大屏52px */
--ds-kpi-icon-radius: 14px;    /* PC端8px → 大屏14px */
--ds-kpi-icon-font: 1.5rem;

/* KPI数值 */
--ds-kpi-value-font: var(--ds-font-family-number);
--ds-kpi-value-gradient: linear-gradient(135deg, #2b6e3c, #1a8a3c);
```

**KPI卡片8色方案**：

| 变体 | 图标背景 | 图标色 | 数值渐变 | 顶部条纹 |
|------|---------|--------|---------|---------|
| `.kpi-green` | #eef6ef | #2b6e3c | →#1a8a3c | →#22a84a |
| `.kpi-blue` | #e0f2fe | #0284c7 | →#2563eb | →#3b82f6 |
| `.kpi-amber` | #fff7ed | #d97706 | →#f59e0b | →#fbbf24 |
| `.kpi-red` | #fef2f2 | #dc2626 | →#ef4444 | →#f87171 |
| `.kpi-violet` | #f5f3ff | #7c3aed | →#8b5cf6 | →#a78bfa |
| `.kpi-cyan` | #ecfeff | #0891b2 | →#06b6d4 | →#22d3ee |
| `.kpi-emerald` | #ecfdf5 | #059669 | →#10b981 | →#34d399 |
| `.kpi-orange` | #fff7ed | #ea580c | →#f97316 | →#fb923c |

### 4.3 图表容器（Chart Container）

```css
--ds-chart-container-bg: #ffffff;
--ds-chart-container-radius: 20px;
--ds-chart-container-padding: 20px;
--ds-chart-container-border: 1px solid rgba(43,110,60,0.06);
--ds-chart-header-gap: 14px;
```

**ECharts 主题配置**：

```javascript
const dashboardTheme = {
  color: ['#2b6e3c', '#3b82f6', '#f59e0b', '#ef4444', '#8b5cf6', '#06b6d4', '#4ade80', '#86efac'],
  backgroundColor: 'transparent',
  textStyle: { color: '#434343', fontFamily: 'Noto Sans SC, sans-serif' },
  title: { textStyle: { color: '#1a2332', fontSize: 20, fontWeight: 600 } },
  legend: { textStyle: { color: '#64748b', fontSize: 13 } },
  tooltip: {
    backgroundColor: 'rgba(255,255,255,0.95)',
    borderColor: '#e8e8e8',
    textStyle: { color: '#1a2332', fontSize: 14 },
    extraCssText: 'box-shadow: 0 8px 24px rgba(0,0,0,0.12); border-radius: 12px; backdrop-filter: blur(8px);'
  },
  categoryAxis: { axisLine: { lineStyle: { color: '#e8e8e8' } }, axisLabel: { color: '#64748b' } },
  valueAxis: { axisLine: { show: false }, splitLine: { lineStyle: { color: '#f5f5f5' } }, axisLabel: { color: '#94a3b8' } }
};
```

### 4.4 预警/状态标识

```css
/* 状态点 */
--ds-status-dot-size: 12px;
--ds-status-dot-radius: 50%;
--ds-status-dot-pulse: 2s infinite;

/* 预警等级色彩 */
--ds-alert-critical-bg: #fef2f2;
--ds-alert-critical-border: 3px solid #ef4444;
--ds-alert-critical-text: #dc2626;
--ds-alert-warning-bg: #fffbeb;
--ds-alert-warning-border: 3px solid #f59e0b;
--ds-alert-warning-text: #d97706;
--ds-alert-info-bg: #eff6ff;
--ds-alert-info-border: 3px solid #3b82f6;
--ds-alert-info-text: #2563eb;

/* 预警脉冲动画 */
--ds-alert-pulse-critical: rgba(239,68,68,0.3);
--ds-alert-pulse-warning: rgba(245,158,11,0.3);
--ds-alert-pulse-info: rgba(59,130,246,0.3);
```

### 4.5 弹窗/模态框（大屏增强）

```css
--ds-modal-overlay: rgba(0,0,0,0.35);
--ds-modal-bg: #ffffff;
--ds-modal-radius: 24px;
--ds-modal-shadow: 0 20px 60px rgba(0,0,0,0.15);
--ds-modal-max-width: 720px;   /* PC端560px → 大屏720px */
--ds-modal-header-padding: 24px 28px;
--ds-modal-body-padding: 24px 28px;
--ds-modal-footer-padding: 20px 28px;
```

### 4.6 进度条

```css
--ds-progress-height: 8px;      /* PC端6px → 大屏8px */
--ds-progress-radius: 8px;
--ds-progress-bg: #e8e8e8;
--ds-progress-fill: linear-gradient(90deg, #2b6e3c, #4ade80);
--ds-progress-fill-success: linear-gradient(90deg, #22c55e, #4ade80);
--ds-progress-fill-warning: linear-gradient(90deg, #f59e0b, #fbbf24);
--ds-progress-fill-danger: linear-gradient(90deg, #ef4444, #f87171);
```

### 4.7 标签/徽章

```css
/* 状态标签 - 大屏略大 */
--ds-tag-padding: 5px 14px;
--ds-tag-radius: 20px;
--ds-tag-font-size: 12px;
--ds-tag-font-weight: 500;

/* 状态标签色彩 */
--ds-tag-completed-bg: #e0f2e9; --ds-tag-completed-color: #1f7840;
--ds-tag-progress-bg: #fff0db; --ds-tag-progress-color: #c47d2e;
--ds-tag-pending-bg: #fee9e6; --ds-tag-pending-color: #bc4e2c;
--ds-tag-online-bg: #eef6ef; --ds-tag-online-color: #2b6e3c;
--ds-tag-offline-bg: #fef2f2; --ds-tag-offline-color: #dc2626;
```

---

## 5. Layout（布局）

### 5.1 大屏间距放大规则

> 所有间距在PC端基础上 ×1.33

| Token | 大屏值 | PC端值 | 用途 |
|-------|--------|--------|------|
| `--ds-space-xs` | 6px | 4px | 极小间距 |
| `--ds-space-sm` | 10px | 8px | 紧凑间距 |
| `--ds-space-md` | 16px | 12px | 默认间距 |
| `--ds-space-lg` | 20px | 16px | 卡片内边距 |
| `--ds-space-xl` | 28px | 20px | 区块间距 |
| `--ds-space-2xl` | 32px | 24px | 大区块间距 |
| `--ds-space-3xl` | 40px | 32px | 段落间距 |
| `--ds-space-4xl` | 64px | 48px | 页面级间距 |

### 5.2 卡片间距规范

```css
--ds-card-gap: 24px;           /* 卡片之间间距 */
--ds-card-inner-padding: 20px; /* 卡片内边距 */
--ds-section-gap: 28px;        /* 区块之间间距 */
```

### 5.3 KPI网格规范

```css
/* 8列KPI网格 */
--ds-kpi-grid-columns: repeat(8, 1fr);
--ds-kpi-grid-gap: 20px;

/* 3列主内容网格（左1 + 中2.2 + 右1） */
--ds-main-grid-columns: 1fr 2.2fr 1fr;
--ds-main-grid-gap: 24px;
```

### 5.4 容器规范

```css
--ds-container-max-width: 1920px;  /* PC端1440px → 大屏1920px */
--ds-container-padding: 28px 24px;
```

---

## 6. Depth & Elevation（深度与层级）

### 6.1 阴影系统（大屏增强）

> 大屏阴影需更强以在投影环境中保持层次感

| Level | Shadow | Usage |
|-------|--------|-------|
| Flat | none | 默认表面 |
| Subtle | 0 1px 3px rgba(43,110,60,0.04) | 表格行hover |
| Raised | 0 4px 16px rgba(43,110,60,0.06), 0 1px 4px rgba(0,0,0,0.03) | 卡片默认 |
| Elevated | 0 8px 24px rgba(43,110,60,0.08), 0 2px 8px rgba(0,0,0,0.04) | 卡片hover |
| Floating | 0 16px 40px rgba(43,110,60,0.12), 0 4px 16px rgba(0,0,0,0.06) | 弹窗/下拉 |
| Overlay | 0 20px 60px rgba(0,0,0,0.15) | 模态框 |
| Glow | 0 0 20px rgba(43,110,60,0.15) | 品牌绿发光（特殊强调） |

### 6.2 Z-index 层级

| Token | Value | Usage |
|-------|-------|-------|
| `--ds-z-base` | 0 | 默认层级 |
| `--ds-z-card-hover` | 10 | 卡片hover提升 |
| `--ds-z-sticky` | 100 | 粘性头部 |
| `--ds-z-dropdown` | 200 | 下拉菜单 |
| `--ds-z-overlay` | 300 | 遮罩层 |
| `--ds-z-modal` | 400 | 模态框 |
| `--ds-z-toast` | 500 | 提示消息 |
| `--ds-z-tooltip` | 600 | 工具提示 |
| `--ds-z-max` | 9999 | 全屏覆盖 |

---

## 7. Cautions（注意事项）

### Never Do

- ❌ 在大屏页面中使用 `#0a1628` 深色背景 — 与项目浅色基调严重冲突
- ❌ 在KPI数值中使用过细字重（weight < 600）— 大屏远距离不可读
- ❌ 在图表中使用超过7种颜色 — 会导致视觉混乱和色盲辨识困难
- ❌ 硬编码颜色值（如 `color: #2b6e3c`）— 必须使用CSS变量
- ❌ 使用纯黑(#000)文字 — 大屏投影环境下纯黑过于生硬，使用 #1a2332
- ❌ 在VR页保留深色主题 — 必须改为浅色清新风与主大屏统一
- ❌ 在同一行KPI卡片中使用超过2种色系 — 8个KPI卡片最多使用4种颜色轮替
- ❌ 使用过小的圆角（<12px）— 大屏需要更圆润的视觉以增强亲和力

### Prefer

- ✅ KPI数值使用渐变色填充（`-webkit-background-clip: text`）增加视觉冲击力
- ✅ 图表配色使用 `--ds-chart-*` 变量，确保全局统一
- ✅ 大屏文字使用 `--ds-text-primary` (#1a2332) 而非纯黑
- ✅ VR页改为浅色后，信息面板使用 `--ds-bg-glass` 毛玻璃效果
- ✅ 预警信息使用左侧色条 + 浅色背景的组合，而非大面积红色
- ✅ 进度条使用渐变填充而非纯色，增加层次感
- ✅ 大屏字号至少比PC端大 1.25 倍

---

## 8. Responsive Behavior（响应式行为）

### 大屏场景特化

数据大屏主要运行在 1920×1080 及以上分辨率的大屏上，无需传统移动端适配，但需要以下场景处理：

### 断点

| Name | Width | Behavior |
|------|-------|----------|
| Standard HD | 1920px | 标准大屏，8列KPI，3列主布局 |
| Full HD+ | 2560px+ | KPI可扩展为10列，图表区域加宽 |
| Small Screen | 1366-1919px | KPI降为6列（双KPI卡合并），主布局不变 |

### 大屏适配规则

- KPI网格：`repeat(auto-fit, minmax(180px, 1fr))` 确保自适应
- 图表容器：设置 `min-height: 280px` 防止塌陷
- 文字不缩小：大屏场景下文字不随容器缩小，宁可截断
- VR全景页：固定全屏，无缩放适配需求

---

## 9. 动效规范（大屏增强）

### 9.1 过渡时间

| Token | Value | 用途 |
|-------|-------|------|
| `--ds-transition-instant` | 0.1s ease | 即时反馈 |
| `--ds-transition-fast` | 0.2s ease | hover/focus |
| `--ds-transition-normal` | 0.3s cubic-bezier(0.4, 0, 0.2, 1) | 状态切换 |
| `--ds-transition-slow` | 0.5s cubic-bezier(0.4, 0, 0.2, 1) | 页面进入 |
| `--ds-transition-bounce` | 0.4s cubic-bezier(0.34, 1.56, 0.64, 1) | 弹性动效 |

### 9.2 数据刷新动画

```css
/* 数值滚动更新 */
@keyframes dsNumberUpdate {
  0% { opacity: 0.6; transform: translateY(-4px); }
  100% { opacity: 1; transform: translateY(0); }
}
.ds-number-updated {
  animation: dsNumberUpdate 0.4s ease-out;
}
```

### 9.3 卡片进入动画

```css
/* 卡片从下方渐入 */
@keyframes dsCardEnter {
  from { opacity: 0; transform: translateY(16px); }
  to { opacity: 1; transform: translateY(0); }
}
.ds-card-enter {
  animation: dsCardEnter 0.5s cubic-bezier(0.4, 0, 0.2, 1) both;
}
/* 逐个延迟进入 */
.ds-card-enter:nth-child(1) { animation-delay: 0.05s; }
.ds-card-enter:nth-child(2) { animation-delay: 0.10s; }
.ds-card-enter:nth-child(3) { animation-delay: 0.15s; }
.ds-card-enter:nth-child(4) { animation-delay: 0.20s; }
.ds-card-enter:nth-child(5) { animation-delay: 0.25s; }
.ds-card-enter:nth-child(6) { animation-delay: 0.30s; }
.ds-card-enter:nth-child(7) { animation-delay: 0.35s; }
.ds-card-enter:nth-child(8) { animation-delay: 0.40s; }
```

### 9.4 KPI数字滚动动画

```css
/* 数字从0滚动到目标值 — JS控制 */
@keyframes dsCountUp {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}
```

**JS实现建议**：
```javascript
function animateNumber(element, target, duration = 1200) {
  let start = 0;
  const step = (timestamp) => {
    if (!start) start = timestamp;
    const progress = Math.min((timestamp - start) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3); // easeOutCubic
    element.textContent = Math.floor(eased * target);
    if (progress < 1) requestAnimationFrame(step);
  };
  requestAnimationFrame(step);
}
```

### 9.5 预警脉冲动画

```css
/* 预警圆点脉冲 */
@keyframes dsAlertPulse {
  0% { transform: translate(-50%, -50%) scale(0.5); opacity: 1; }
  100% { transform: translate(-50%, -50%) scale(2.5); opacity: 0; }
}
.ds-alert-pulse {
  position: absolute;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  animation: dsAlertPulse 2s ease-out infinite;
}
.ds-alert-pulse.critical { background: rgba(239,68,68,0.3); }
.ds-alert-pulse.warning { background: rgba(245,158,11,0.3); }
.ds-alert-pulse.info { background: rgba(59,130,246,0.3); }
```

### 9.6 图表数据刷新

```css
/* 图表容器刷新闪烁 */
@keyframes dsChartRefresh {
  0% { opacity: 1; }
  50% { opacity: 0.6; }
  100% { opacity: 1; }
}
.ds-chart-refreshing {
  animation: dsChartRefresh 0.6s ease-in-out;
}
```

---

## 10. VR全景页统一方案

> 将 vr_panorama.html 从深色主题(#0a1628)转为浅色清新风，与主大屏统一

### 10.1 VR页色彩替换映射

| 当前深色值 | 替换为浅色值 | CSS变量 |
|-----------|------------|---------|
| `#0a1628` (背景) | `#f0f4f2` | `--ds-bg-base` |
| `rgba(0,0,0,0.7)` (面板) | `rgba(255,255,255,0.85)` | `--ds-bg-glass` |
| `rgba(0,0,0,0.9)` (信息面板) | `rgba(255,255,255,0.95)` | — |
| `#ffffff` (主文字) | `#1a2332` | `--ds-text-primary` |
| `rgba(255,255,255,0.85)` (副文字) | `#434343` | `--ds-text-secondary` |
| `rgba(255,255,255,0.65)` (弱文字) | `#64748b` | `--ds-text-tertiary` |
| `rgba(255,255,255,0.1)` (边框) | `rgba(43,110,60,0.12)` | — |
| `rgba(0,0,0,0.5)` (阴影) | `0 4px 16px rgba(0,0,0,0.08)` | `--ds-card-shadow` |

### 10.2 VR页组件样式规范

**头部覆盖栏**：
```css
.vr-header-overlay {
  background: rgba(255,255,255,0.85);
  backdrop-filter: blur(12px);
  border: 1px solid rgba(43,110,60,0.12);
  border-radius: 16px;
  color: var(--ds-text-primary);
}
```

**搜索框**：
```css
.vr-search-box {
  background: rgba(255,255,255,0.9);
  backdrop-filter: blur(12px);
  border: 1px solid rgba(43,110,60,0.15);
  border-radius: 12px;
  color: var(--ds-text-primary);
}
.vr-search-box:focus-within {
  border-color: var(--ds-primary-500);
  box-shadow: 0 0 0 3px rgba(43,110,60,0.1);
}
```

**热点标记**：
```css
.vr-hotspot-dot {
  border: 3px solid #fff;
  box-shadow: 0 2px 8px rgba(0,0,0,0.15);
}
.vr-hotspot-dot.plot { background: #2b6e3c; }
.vr-hotspot-dot.device { background: #3b82f6; }
.vr-hotspot-dot.task { background: #f59e0b; }
.vr-hotspot-dot.building { background: #8b5cf6; }
.vr-hotspot-dot.scene { background: #06b6d4; }
```

**信息面板**：
```css
.vr-info-panel {
  background: rgba(255,255,255,0.95);
  backdrop-filter: blur(15px);
  border: 1px solid rgba(43,110,60,0.12);
  border-radius: 16px;
  box-shadow: 0 12px 32px rgba(0,0,0,0.08);
  color: var(--ds-text-primary);
}
```

**图例面板**：
```css
.vr-legend-panel {
  background: rgba(255,255,255,0.85);
  backdrop-filter: blur(12px);
  border: 1px solid rgba(43,110,60,0.12);
  border-radius: 16px;
}
```

**缩放控件**：
```css
.vr-zoom-btn {
  background: rgba(255,255,255,0.9);
  backdrop-filter: blur(12px);
  border: 1px solid rgba(43,110,60,0.12);
  border-radius: 12px;
  color: var(--ds-text-primary);
}
.vr-zoom-btn:hover {
  background: rgba(43,110,60,0.08);
  border-color: #2b6e3c;
  color: #2b6e3c;
}
```

**加载动画**：
```css
.vr-loading-spinner {
  border: 3px solid rgba(43,110,60,0.1);
  border-top-color: #2b6e3c;
}
```

---

## 11. Agent Prompt Guide（AI 生成指南）

### Key Instructions

1. **必须使用CSS变量**：所有颜色、间距、字号、圆角、阴影都通过 `--ds-*` 变量引用，禁止硬编码
2. **品牌色优先**：主色系必须是 `--ds-primary-*` 梯度，不要引入其他绿色变体
3. **KPI数字使用等宽字体**：`var(--ds-font-family-number)` 确保数字对齐
4. **图表使用ECharts主题**：引用 `dashboardTheme` 对象统一图表配色
5. **VR页必须浅色**：所有深色背景替换为 `--ds-bg-glass` 或 `--ds-bg-card`
6. **动效克制**：只使用本文档定义的5种动画，不要新增动画
7. **圆角≥16px**：大屏组件圆角不低于16px
8. **间距≥6px**：大屏间距最小6px，不使用0间距
9. **对比度**：所有文字与背景对比度≥4.5:1（WCAG AA）
10. **渐变文字**：KPI数值使用 `-webkit-background-clip: text` 渐变，增加视觉冲击力

### Quick CSS Snippet

```css
:root {
  /* === 大屏设计令牌 — 数农智果数据大屏端 === */

  /* 主色系 */
  --ds-primary-25: #f7fdf9;
  --ds-primary-50: #f0faf3;
  --ds-primary-100: #d6f5dc;
  --ds-primary-200: #aeeab8;
  --ds-primary-300: #76d88c;
  --ds-primary-400: #46c365;
  --ds-primary-500: #22a84a;
  --ds-primary-600: #1a8a3c;
  --ds-primary-700: #146c31;
  --ds-primary-800: #0f5628;
  --ds-primary-900: #0a4622;

  /* 辅助色 */
  --ds-accent-500: #ff6b35;
  --ds-accent-600: #e55a2b;

  /* 背景 */
  --ds-bg-base: #f0f4f2;
  --ds-bg-card: #ffffff;
  --ds-bg-card-hover: #f7fdf9;
  --ds-bg-section: #f5f8f6;
  --ds-bg-overlay: rgba(43,110,60,0.45);
  --ds-bg-glass: rgba(255,255,255,0.85);

  /* 文字 */
  --ds-text-primary: #1a2332;
  --ds-text-secondary: #434343;
  --ds-text-tertiary: #64748b;
  --ds-text-muted: #94a3b8;
  --ds-text-inverse: #ffffff;
  --ds-text-kpi: #2b6e3c;
  --ds-text-link: #22a84a;

  /* 字体 */
  --ds-font-family: 'Noto Sans SC', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'PingFang SC', 'Microsoft YaHei', sans-serif;
  --ds-font-family-mono: 'JetBrains Mono', 'Fira Code', Consolas, monospace;
  --ds-font-family-number: 'DIN Alternate', 'Roboto Condensed', 'Oswald', var(--ds-font-family-mono);

  /* 间距 */
  --ds-space-xs: 6px;
  --ds-space-sm: 10px;
  --ds-space-md: 16px;
  --ds-space-lg: 20px;
  --ds-space-xl: 28px;
  --ds-space-2xl: 32px;
  --ds-space-3xl: 40px;
  --ds-space-4xl: 64px;

  /* 圆角 */
  --ds-radius-sm: 8px;
  --ds-radius-md: 12px;
  --ds-radius-lg: 16px;
  --ds-radius-xl: 20px;
  --ds-radius-2xl: 24px;
  --ds-radius-full: 9999px;

  /* 阴影 */
  --ds-shadow-card: 0 4px 16px rgba(43,110,60,0.06), 0 1px 4px rgba(0,0,0,0.03);
  --ds-shadow-card-hover: 0 12px 28px rgba(43,110,60,0.10), 0 4px 12px rgba(0,0,0,0.04);
  --ds-shadow-modal: 0 20px 60px rgba(0,0,0,0.15);

  /* 渐变 */
  --ds-gradient-primary: linear-gradient(135deg, #2b6e3c, #22a84a);
  --ds-gradient-hero: linear-gradient(180deg, rgba(43,110,60,0.30) 0%, rgba(43,110,60,0.50) 100%);
  --ds-gradient-progress: linear-gradient(90deg, #2b6e3c, #4ade80);

  /* 图表色板 */
  --ds-chart-green: #2b6e3c;
  --ds-chart-green-light: #4ade80;
  --ds-chart-blue: #3b82f6;
  --ds-chart-amber: #f59e0b;
  --ds-chart-red: #ef4444;
  --ds-chart-violet: #8b5cf6;
  --ds-chart-cyan: #06b6d4;
}
```

---

*文档结束 · 数农智果数据大屏端设计令牌 v1.0*
*由设计系统专家彩格调(Cai)生成，基于 Supabase + Stripe + Notion 融合方案*
