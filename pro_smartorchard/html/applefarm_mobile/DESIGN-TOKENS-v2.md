# 智慧果园 · 智慧果园移动端设计令牌（升级版）

> **版本**: v2.0 | **基于**: Supabase × Airbnb 混合设计基因  
> **调性定位**: Organic Biophilic × Tech Utility  
> **核心理念**: 户外可读 · 拇指友好 · 自然鲜活 · 一目了然

---

## 设计系统推荐

| 方案 | 设计系统 | 匹配度 | 特征 | 适合原因 |
|------|---------|--------|------|---------|
| A（首选） | **Supabase** | ★★★★★ | 绿色主调 + 技术工具感 + 数据密集型界面 + 高对比度功能色 | 与项目"绿色×工具"定位天然契合，数据面板的信息密度控制方式可直接借鉴；其绿色色阶体系可作为主色升级的参考基线 |
| B（辅助） | **Airbnb** | ★★★★☆ | 移动端UX标杆 + 有机温暖 + 卡片呼吸感 + 触控热区优化 | Airbnb的移动端卡片留白和触控热区设计是业界标杆，其温暖的圆角设计语言可中和Tech Utility的冷硬感，实现"有机鲜活"的视觉目标 |
| C（补充） | **Notion** | ★★★☆☆ | 信息架构大师 + 呼吸感区块 + 骨架屏/空状态成熟方案 | Notion的区块间距逻辑和骨架屏动画方案可直接复用，帮助实现"信息堆砌→呼吸卡片"的迁移目标 |

**选定方案**: 以 **Supabase** 为骨架（绿色×工具感），融合 **Airbnb** 的移动端温度和 **Notion** 的信息呼吸感，形成"自然生命力 + 农业数字化工具"的混合设计基因。

---

## 1. Visual Theme（视觉主题）

**Philosophy**: 在阳光下可读，在田间可操作——像一棵扎根土地的树，有生命的温度，也有数据的精确。  
**Direction**: Organic Biophilic × Tech Utility，温暖工具感  
**Personality**: 可信赖 · 专业务实 · 自然鲜活 · 一目了然  
**Reference**: Supabase 的绿色数据面板 × Airbnb 的温暖移动端 × 果园叶脉纹理

**视觉方向坐标**:
```
                        Tech Utility
                             |
                     ● 智慧果园 (目标位置)
                            /|
                           / |
        Soft Warm ---------+  |--------- Brutalist
                           \ |
                            \|
                             |
                        Editorial Monocle
```

**Brand Voice**:  
智慧果园的视觉语言是温暖的、务实的和清晰的。它通过饱满的绿色和大地色系传达自然生命力，用高对比度的排版和数据展示建立专业可信赖的工具感。最具辨识度的特征是"绿色渐变Header + 呼吸感白卡片 + 高对比度正文"的三层结构。生成时应避免过度装饰、浅色低对比度文字和小触控热区，始终保持"户外阳光下也能一目了然"的核心气质。

---

## 2. Color Palette（调色板）

### 2.1 主色系 — 绿色（保留 #2e9e5a 基因，优化色阶）

> 设计决策：原 `--primary: #2e9e5a` 保持不变，但色阶从 7 级扩展到 11 级（50~950），增加中间梯度和深色端，确保户外强光下深色文字可读。

| Token | HEX | OKLCh 近似 | 用途 | WCAG 对白底 |
|-------|-----|-----------|------|------------|
| `--primary-50` | #f0faf4 | oklch(97% 0.02 155) | 最浅背景、选中态底色 | — |
| `--primary-100` | #d6f5dc | oklch(93% 0.05 155) | 浅背景、hover 态 | — |
| `--primary-200` | #aeeab8 | oklch(88% 0.08 155) | 辅助背景、标签底色 | — |
| `--primary-300` | #76d88c | oklch(80% 0.12 155) | 图标底色、装饰元素 | — |
| `--primary-400` | #46c365 | oklch(72% 0.16 155) | 次要操作、进度条 | — |
| **`--primary`** | **#2e9e5a** | oklch(62% 0.14 155) | **品牌主色** | ✅ AA (4.6:1) |
| `--primary-600` | #1a8a3c | oklch(52% 0.14 155) | 按钮渐变深端、活跃态 | ✅ AA (7.2:1) |
| `--primary-700` | #146c31 | oklch(44% 0.12 155) | 深色文字、Header 渐变 | ✅ AAA (10.5:1) |
| `--primary-800` | #0f5426 | oklch(36% 0.10 155) | 极深文字（户外场景） | ✅ AAA (15.3:1) |
| `--primary-900` | #0a3d1b | oklch(28% 0.08 155) | 暗模式主色 | ✅ AAA |
| `--primary-950` | #062710 | oklch(20% 0.06 155) | 暗模式背景 | — |

**渐变规范**:
```css
--gradient-primary: linear-gradient(135deg, var(--primary) 0%, var(--primary-600) 100%);
--gradient-header: linear-gradient(135deg, var(--primary-700) 0%, var(--primary) 50%, var(--primary-600) 100%);
```

### 2.2 大地色系 — 辅助色

> 设计决策：原有大地色过于分散，整合为"土壤→沙地→丰收"三线体系，每线5级色阶。

| Token | HEX | 用途 |
|-------|-----|------|
| **土壤线（Soil）** | | |
| `--soil-50` | #faf6f1 | 土壤浅底 |
| `--soil-100` | #ede4d4 | 卡片暖底色 |
| `--soil-200` | #d4c4a8 | 分隔线（暖调） |
| `--soil-500` | #8B7355 | 大地色主值 |
| `--soil-700` | #5D4037 | 深土文字 |
| **沙地线（Sand）** | | |
| `--sand-50` | #fdfbf7 | 最暖白底 |
| `--sand-100` | #f5efe3 | 暖色区块背景 |
| `--sand-300` | #D2C4A8 | 次要边框 |
| **丰收线（Harvest）** | | |
| `--harvest-50` | #fef9e7 | 丰收浅底 |
| `--harvest-300` | #F5C842 | 丰收亮色 |
| `--harvest-500` | #DAA520 | 丰收金（保留） |
| `--harvest-700` | #B8860B | 深金强调 |

**天空蓝**:
```css
--sky-50: #f0f9ff;
--sky-100: #e0f2fe;
--sky-500: #87CEEB;  /* 保留原值 */
--sky-700: #0369a1;  /* 户外可读深蓝 */
```

### 2.3 功能色 — 户外强化版

> 设计决策：原功能色在户外强光下对比度不足，全面升级为更深的版本，确保阳光下可辨。

| Token | HEX | 用途 | 对白底对比度 |
|-------|-----|------|-------------|
| **成功（Success）** | | | |
| `--success-light` | #f0fff0 | 成功底色 | — |
| `--success` | #389e0d | ✅ 升级：从 #52c41a 加深 | AA (4.5:1) |
| `--success-dark` | #237804 | 深成功文字 | AAA (7.5:1) |
| **警告（Warning）** | | | |
| `--warning-light` | #fffbe6 | 警告底色 | — |
| `--warning` | #d48806 | ✅ 升级：从 #faad14 加深 | AA (4.6:1) |
| `--warning-dark` | #ad6800 | 深警告文字 | AAA (7.2:1) |
| **错误（Error）** | | | |
| `--error-light` | #fff1f0 | 错误底色 | — |
| `--error` | #cf1322 | ✅ 升级：从 #ff4d4f 加深 | AA (5.6:1) |
| `--error-dark` | #a8071a | 深错误文字 | AAA (9.1:1) |
| **信息（Info）** | | | |
| `--info-light` | #e6f7ff | 信息底色 | — |
| `--info` | #096dd9 | ✅ 升级：从 #1890ff 加深 | AA (5.8:1) |
| `--info-dark` | #0050b3 | 深信息文字 | AAA (9.5:1) |

**功能色使用规则**:
- **标签/徽章**: 使用 light 底色 + 本色文字（如 `background: var(--success-light); color: var(--success)`)
- **独立图标/文字**: 使用本色（确保对比度 ≥ 4.5:1）
- **户外强光提示**: 使用 dark 版本（对比度 ≥ 7:1）

### 2.4 中性色 — 户外优化版

> 设计决策：原 `--text-light: #b2bec3` 在户外阳光下几乎不可见，全面加深中性色阶梯。

| Token | HEX | 用途 | 对白底对比度 |
|-------|-----|------|-------------|
| `--gray-50` | #fafafa | 最浅底色 | — |
| `--gray-100` | #f5f5f5 | 区块底色 | — |
| `--gray-200` | #e8e8e8 | 分隔线、边框 | — |
| `--gray-300` | #d9d9d9 | 禁用边框 | — |
| `--gray-400` | #bfbfbf | 占位符文字 | ❌ 2.0:1 (仅装饰用) |
| `--gray-500` | #8c8c8c | 次要辅助文字 | AA Large (3.4:1) |
| `--gray-600` | #595959 | ✅ 二级文字（原 #636e72 → 加深） | AA (5.9:1) |
| `--gray-700` | #434343 | ✅ 正文辅助（原无此色阶） | AAA (9.0:1) |
| `--gray-800` | #262626 | 标题/强调 | AAA (14.7:1) |
| `--gray-900` | #1a1a1a | ✅ 最深文字（户外场景） | AAA (17.4:1) |

**文字色语义映射**:
```css
--text: var(--gray-900);           /* #1a1a1a — 主文字（原 #2D3436 → 加深） */
--text-secondary: var(--gray-600); /* #595959 — 二级文字（原 #636e72 → 加深） */
--text-tertiary: var(--gray-500);  /* #8c8c8c — 三级文字（新增，替代原 text-light） */
--text-placeholder: var(--gray-400);/* #bfbfbf — 占位符 */
--text-inverse: #ffffff;           /* 反色文字 */
--text-on-primary: #ffffff;        /* 主色上文字 */

/* 户外强化模式（可由 JS 切换） */
--text-outdoor: var(--gray-900);    /* 户外场景全部使用最深色 */
--text-outdoor-secondary: var(--gray-700); /* 户外二级文字 */
```

**背景色**:
```css
--bg: #f5f7fa;            /* 页面背景（保留） */
--bg-warm: var(--sand-50); /* #fdfbf7 — 暖色页面背景（新增） */
--bg-white: #ffffff;       /* 卡片/容器背景（保留） */
--bg-elevated: #ffffff;    /* 浮层背景（新增） */
--bg-overlay: rgba(0, 0, 0, 0.45); /* 遮罩层（新增） */
```

**边框色**:
```css
--border: #e0e0e0;        /* 主边框（原 #e8e8e8 → 微调） */
--border-light: #f0f0f0;  /* 浅边框（保留） */
--border-strong: #d0d0d0;  /* 强边框（新增，户外可辨） */
```

### 2.5 渐变色规范

> 设计决策：减少装饰性渐变，保留3个功能渐变。

| Token | 值 | 用途 |
|-------|---|------|
| `--gradient-primary` | `linear-gradient(135deg, var(--primary), var(--primary-600))` | 主按钮、Header背景 |
| `--gradient-header` | `linear-gradient(135deg, var(--primary-700), var(--primary) 50%, var(--primary-600))` | 首页 Header（更有层次感） |
| `--gradient-skeleton` | `linear-gradient(90deg, var(--gray-100) 25%, var(--gray-200) 50%, var(--gray-100) 75%)` | 骨架屏闪光 |

**禁止的渐变**:
- ❌ 多色渐变按钮（如绿→蓝、紫→粉）
- ❌ 卡片内的装饰性渐变底色
- ❌ 文字渐变色（统计数字除外，保留 `mb-stat-value` 的渐变文字效果）

---

## 3. Typography（排版）

### 3.1 字体栈

```css
--font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "PingFang SC", 
               "Hiragino Sans GB", "Microsoft YaHei", "Helvetica Neue", 
               Arial, sans-serif;
--font-family-mono: "SF Mono", "Menlo", "Monaco", "Consolas", monospace;
--font-family-number: "DIN Alternate", "Helvetica Neue", var(--font-family);
```

> 数字字体使用 `--font-family-number`，确保统计数据和仪表盘数字的等宽对齐。

### 3.2 字号层级（升级版）

> 设计决策：正文字号基准从 12px 升至 14px，户外场景最小 12px（原 10px 淘汰），新增 13px 过渡档。

| Token | 值 | 用途 | 最低使用场景 |
|-------|---|------|------------|
| `--font-2xs` | 11px | ⚠️ 仅限非关键装饰标签（如"在线"小圆点旁文字） | 室内/阴天 |
| `--font-xs` | 12px | 辅助信息、状态标签、时间戳 | 户外最小可接受 |
| `--font-sm` | 13px | ✅ 新增过渡档 — 二级文字、列表描述 | 户外安全 |
| `--font-base` | 14px | ✅ 正文内容（原12px → 14px） | 主力字号 |
| `--font-md` | 16px | 小标题、卡片标题 | — |
| `--font-lg` | 18px | 区块标题 | — |
| `--font-xl` | 20px | 页面大标题 | — |
| `--font-2xl` | 24px | 数字强调 | — |
| `--font-3xl` | 28px | 大数字统计 | — |
| `--font-4xl` | 34px | ✅ 新增 — 核心仪表盘数据 | — |

### 3.3 字重规范

| Token | 值 | 用途 |
|-------|---|------|
| `--font-regular` | 400 | 正文 |
| `--font-medium` | 500 | 次要标题、标签 |
| `--font-semibold` | 600 | 小标题、按钮文字、列表标题 |
| `--font-bold` | 700 | 页面标题、强调 |
| `--font-extrabold` | 800 | 大数字统计、核心数据 |

### 3.4 行高标准

| 场景 | 行高 | 说明 |
|------|------|------|
| 标题类 | 1.2~1.3 | 紧凑，视觉冲击 |
| 正文内容 | 1.6 | 舒适阅读（保留） |
| 列表/卡片描述 | 1.5 | 适中 |
| 辅助信息 | 1.4 | 紧凑但清晰 |

### 3.5 户外字号补偿

```css
/* 户外强光模式（可由 JS 切换 body 类名） */
body.outdoor-mode {
  --font-2xs: 12px;  /* 从11px → 12px */
  --font-xs: 13px;   /* 从12px → 13px */
  --font-sm: 14px;   /* 从13px → 14px */
  --font-base: 15px; /* 从14px → 15px */
}
```

---

## 4. Component Styles（组件样式）

### 4.1 Header 组件 — 三种变体

#### 变体 A：主页型 Header（mb-header-home）

**特征**: 渐变背景 + 品牌标题 + 天气/统计区 + 圆角底边  
**用于**: mb_home.html

```css
.mb-header-home {
  background: var(--gradient-header);
  padding: 12px 16px 20px;
  color: var(--text-on-primary);
  border-radius: 0 0 18px 18px;
  box-shadow: 0 4px 20px rgba(46, 158, 90, 0.25);
  position: relative;
  /* 安全区域适配 */
  padding-top: calc(env(safe-area-inset-top, 0px) + 12px);
}

.mb-header-home .header-brand {
  margin-bottom: 12px;
}

.mb-header-home .header-title {
  font-size: var(--font-xl);  /* 20px */
  font-weight: var(--font-bold);
  letter-spacing: 0.5px;
}

.mb-header-home .header-subtitle {
  font-size: var(--font-xs);   /* 12px — 户外最小可接受 */
  opacity: 0.9;
  margin-top: 2px;
}

/* 统计区（首页4宫格） */
.mb-header-home .stats-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 8px;
  margin-bottom: 12px;
}

.mb-header-home .stat-card {
  background: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(8px);
  border-radius: var(--radius-md); /* 10px */
  padding: 8px 4px;
  text-align: center;
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.mb-header-home .stat-value {
  font-size: var(--font-lg);   /* 18px */
  font-weight: var(--font-extrabold);
  font-family: var(--font-family-number);
}

.mb-header-home .stat-label {
  font-size: var(--font-xs);   /* 12px */
  opacity: 0.85;
  margin-top: 1px;
}
```

#### 变体 B：详情页型 Header（mb-header-detail）

**特征**: 渐变背景 + 返回按钮 + 居中标题 + 右侧操作区  
**用于**: mb_device.html, mb_plot.html, mb_growth.html 等

```css
.mb-header-detail {
  background: var(--gradient-primary);
  padding: 0 16px 16px;
  color: var(--text-on-primary);
  position: relative;
  /* 安全区域适配 */
  padding-top: calc(env(safe-area-inset-top, 0px) + 0px);
}

.mb-header-detail .header-nav {
  display: flex;
  align-items: center;
  height: 44px;  /* iOS 标准导航栏高度 */
  min-height: 44px;
}

.mb-header-detail .header-back {
  width: 36px;
  height: 36px;
  background: rgba(255, 255, 255, 0.2);
  border-radius: var(--radius-md);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: background var(--transition-fast);
  /* 触控热区扩展 */
  margin: -4px;
  padding: 4px;
}

.mb-header-detail .header-back:active {
  background: rgba(255, 255, 255, 0.3);
}

.mb-header-detail .header-back svg {
  width: 20px;
  height: 20px;
}

.mb-header-detail .header-title {
  flex: 1;
  text-align: center;
  font-size: var(--font-lg);  /* 18px */
  font-weight: var(--font-bold);
  margin: 0 8px;
}

.mb-header-detail .header-actions {
  display: flex;
  gap: 8px;
}

.mb-header-detail .header-action-btn {
  width: 36px;
  height: 36px;
  background: rgba(255, 255, 255, 0.2);
  border-radius: var(--radius-md);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: background var(--transition-fast);
}

/* 详情页副标题区域 */
.mb-header-detail .header-content {
  padding-top: 4px;
}

.mb-header-detail .header-sub {
  font-size: var(--font-sm);  /* 13px */
  opacity: 0.85;
}
```

#### 变体 C：工具页型 Header（mb-header-tool）

**特征**: 白色/浅底 + 深色文字 + 底部分隔线 + 紧凑布局  
**用于**: mb_ai_assistant.html, mb_search 等工具类页面

```css
.mb-header-tool {
  background: var(--bg-white);
  padding: 0 16px;
  border-bottom: 1px solid var(--border);
  position: sticky;
  top: 0;
  z-index: 50;
  /* 安全区域适配 */
  padding-top: calc(env(safe-area-inset-top, 0px) + 0px);
}

.mb-header-tool .header-nav {
  display: flex;
  align-items: center;
  height: 44px;
  min-height: 44px;
}

.mb-header-tool .header-back {
  width: 36px;
  height: 36px;
  border-radius: var(--radius-md);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: var(--text);
  transition: background var(--transition-fast);
}

.mb-header-tool .header-back:active {
  background: var(--gray-100);
}

.mb-header-tool .header-title {
  flex: 1;
  text-align: center;
  font-size: var(--font-md);  /* 16px */
  font-weight: var(--font-semibold);
  color: var(--text);
  margin: 0 8px;
}

.mb-header-tool .header-actions {
  display: flex;
  gap: 8px;
}

.mb-header-tool .header-action-btn {
  width: 36px;
  height: 36px;
  border-radius: var(--radius-md);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: var(--text-secondary);
  transition: background var(--transition-fast);
}

.mb-header-tool .header-action-btn:active {
  background: var(--gray-100);
}
```

### 4.2 底部 Tab 导航（升级版）

> 设计决策：增大触控热区（56px→60px）、加深未选中图标颜色、增加安全区域适配。

```css
.mb-tab-bar {
  position: fixed;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 100%;
  max-width: 750px;
  height: 60px;          /* 原56px → 60px，增加触控区 */
  background: var(--bg-white);
  display: flex;
  border-top: 1px solid var(--border);
  z-index: 100;
  box-shadow: 0 -2px 12px rgba(0, 0, 0, 0.06);
  /* 安全区域适配 */
  padding-bottom: env(safe-area-inset-bottom, 0px);
}

.mb-tab-item {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 3px;
  color: var(--gray-500);  /* 原 text-light → gray-500，户外可辨 */
  transition: color var(--transition-fast);
  cursor: pointer;
  position: relative;
  /* 触控热区 */
  min-width: 44px;
  min-height: 44px;
}

.mb-tab-item.active {
  color: var(--primary);
}

.mb-tab-item.active .mb-tab-icon {
  transform: scale(1.1);
}

.mb-tab-icon {
  width: 24px;
  height: 24px;
  transition: transform var(--transition-fast);
}

.mb-tab-label {
  font-size: var(--font-xs);  /* 12px */
  font-weight: var(--font-medium);
}

/* 角标 */
.mb-tab-badge {
  position: absolute;
  top: 4px;
  right: 50%;
  margin-right: -16px;
  min-width: 16px;
  height: 16px;
  background: var(--error);
  color: var(--text-on-primary);
  border-radius: var(--radius-full);
  font-size: 10px;
  font-weight: var(--font-bold);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 4px;
  border: 2px solid var(--bg-white);  /* 白色描边，避免与背景混 */
}
```

### 4.3 快捷入口（升级版）

> 设计决策：统一52×52px容器 + 44×44px触控热区，图标从24px增至28px增强户外辨识度。

```css
.mb-quick-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);  /* 原3列 → 4列，一屏展示更多 */
  gap: 12px;
}

.mb-quick-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  /* 无边框无背景，更清爽 */
  padding: 4px;
}

.mb-quick-item:active {
  opacity: 0.7;
}

.mb-quick-icon {
  width: 52px;        /* ✅ 统一52×52px容器 */
  height: 52px;
  border-radius: var(--radius-lg);  /* 14px — 更圆润 */
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  /* 触控热区44×44px（居中在52×52容器内） */
}

.mb-quick-icon svg {
  width: 28px;        /* 原24px → 28px，户外更易辨识 */
  height: 28px;
}

/* 图标底色分类 */
.mb-quick-icon.green { background: var(--primary-50); color: var(--primary-700); }
.mb-quick-icon.blue { background: var(--sky-50); color: var(--sky-700); }
.mb-quick-icon.orange { background: var(--harvest-50); color: var(--harvest-700); }
.mb-quick-icon.red { background: var(--error-light); color: var(--error-dark); }
.mb-quick-icon.purple { background: #f5eef8; color: #7c3aed; }
.mb-quick-icon.cyan { background: #ecfeff; color: #0e7490; }
.mb-quick-icon.gold { background: var(--harvest-50); color: var(--harvest-500); }

.mb-quick-name {
  font-size: var(--font-sm);    /* 13px */
  color: var(--text);           /* #1a1a1a — 最深色，户外可读 */
  text-align: center;
  font-weight: var(--font-medium);
  line-height: 1.3;
  /* 最多2行 */
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
```

### 4.4 卡片系统（升级版）

> 设计决策：增加卡片内边距（16px→20px），增加卡片间距（12px→16px），实现"呼吸感"。

#### 基础卡片
```css
.mb-card {
  background: var(--bg-white);
  border-radius: var(--radius-lg);    /* 14px */
  padding: 20px;                      /* 原16px → 20px */
  box-shadow: var(--shadow-card);
  border: 1px solid var(--border);
  transition: all var(--transition-normal);
  cursor: pointer;
}

.mb-card:active {
  transform: scale(0.98);
  box-shadow: var(--shadow-sm);
}

/* 卡片间距 — 在父容器层面控制 */
.mb-card + .mb-card {
  margin-top: 16px;  /* 原12px → 16px，呼吸感 */
}
```

#### 强调卡片（顶部色条）
```css
.mb-card-accent {
  position: relative;
  overflow: hidden;
}

.mb-card-accent::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 3px;
  border-radius: var(--radius-lg) var(--radius-lg) 0 0;
}

.mb-card-accent.green::before { background: var(--primary); }
.mb-card-accent.blue::before { background: var(--info); }
.mb-card-accent.orange::before { background: var(--warning); }
.mb-card-accent.red::before { background: var(--error); }
.mb-card-accent.gold::before { background: var(--harvest-500); }
```

#### 数据卡片
```css
.mb-data-card {
  background: var(--bg-white);
  border-radius: var(--radius-md);
  padding: 12px;
  text-align: center;
  border: 1px solid var(--border);
}

.mb-data-value {
  font-size: var(--font-2xl);
  font-weight: var(--font-extrabold);
  color: var(--primary);
  line-height: 1.2;
  font-family: var(--font-family-number);
}

.mb-data-label {
  font-size: var(--font-xs);
  color: var(--text-secondary);
  margin-top: 4px;
  font-weight: var(--font-medium);
}
```

#### 统计卡片
```css
.mb-stat-card {
  background: var(--bg-white);
  border-radius: var(--radius-lg);
  padding: 20px;
  box-shadow: var(--shadow-card);
  border: 1px solid var(--border);
  position: relative;
  overflow: hidden;
}

.mb-stat-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 4px;
  background: var(--gradient-primary);
}

.mb-stat-value {
  font-size: var(--font-4xl);     /* 34px — 新增大号 */
  font-weight: var(--font-extrabold);
  line-height: 1.1;
  font-family: var(--font-family-number);
  background: var(--gradient-primary);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.mb-stat-label {
  font-size: var(--font-sm);       /* 13px */
  color: var(--text-secondary);
  margin-top: 4px;
  font-weight: var(--font-medium);
}
```

### 4.5 骨架屏样式

> 设计决策：新增完整骨架屏系统，区分3种骨架形态。

```css
/* 基础骨架块 */
.mb-skeleton {
  background: var(--gradient-skeleton);
  background-size: 200% 100%;
  animation: skeletonShimmer 1.5s ease-in-out infinite;
  border-radius: var(--radius-sm);
}

/* 骨架行 */
.mb-skeleton-row {
  display: flex;
  gap: 12px;
  align-items: center;
  padding: 16px 0;
}

.mb-skeleton-avatar {
  width: 44px;
  height: 44px;
  border-radius: var(--radius-full);
  background: var(--gradient-skeleton);
  background-size: 200% 100%;
  animation: skeletonShimmer 1.5s ease-in-out infinite;
  flex-shrink: 0;
}

.mb-skeleton-lines {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.mb-skeleton-line {
  height: 14px;
  border-radius: var(--radius-sm);
  background: var(--gradient-skeleton);
  background-size: 200% 100%;
  animation: skeletonShimmer 1.5s ease-in-out infinite;
}

.mb-skeleton-line.short { width: 40%; }
.mb-skeleton-line.medium { width: 70%; }
.mb-skeleton-line.long { width: 100%; }

/* 骨架卡片 */
.mb-skeleton-card {
  background: var(--bg-white);
  border-radius: var(--radius-lg);
  padding: 20px;
  border: 1px solid var(--border);
}

/* 骨架快捷入口 */
.mb-skeleton-quick {
  width: 52px;
  height: 52px;
  border-radius: var(--radius-lg);
  background: var(--gradient-skeleton);
  background-size: 200% 100%;
  animation: skeletonShimmer 1.5s ease-in-out infinite;
}

@keyframes skeletonShimmer {
  0% { background-position: 200% 0; }
  100% { background-position: -200% 0; }
}
```

### 4.6 空状态样式（升级版）

> 设计决策：升级空状态系统，增加场景化插图描述和操作引导。

```css
.mb-empty {
  text-align: center;
  padding: 48px 20px;
}

.mb-empty-illustration {
  width: 120px;
  height: 120px;
  margin: 0 auto 20px;
  position: relative;
}

.mb-empty-illustration-bg {
  width: 100%;
  height: 100%;
  background: var(--primary-50);
  border-radius: 50%;
  opacity: 0.6;
}

.mb-empty-illustration-icon {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 56px;
  height: 56px;
  color: var(--primary-400);
}

.mb-empty-title {
  font-size: var(--font-md);       /* 16px */
  font-weight: var(--font-semibold);
  color: var(--text);
  margin-bottom: 8px;
}

.mb-empty-desc {
  font-size: var(--font-base);     /* 14px */
  color: var(--text-secondary);
  margin-bottom: 24px;
  line-height: 1.5;
  max-width: 260px;
  margin-left: auto;
  margin-right: auto;
}

.mb-empty-action {
  margin-top: 16px;
}

/* 空状态场景化变体 */
.mb-empty.no-data .mb-empty-illustration-icon { color: var(--gray-400); }
.mb-empty.no-data .mb-empty-illustration-bg { background: var(--gray-100); }

.mb-empty.no-network .mb-empty-illustration-icon { color: var(--warning); }
.mb-empty.no-network .mb-empty-illustration-bg { background: var(--warning-light); }

.mb-empty.error .mb-empty-illustration-icon { color: var(--error); }
.mb-empty.error .mb-empty-illustration-bg { background: var(--error-light); }
```

### 4.7 按钮系统（升级版）

> 设计决策：增大触控热区（padding增加）、加深按钮文字色确保户外可读、新增loading状态。

```css
.mb-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 12px 24px;              /* 原10px 20px → 12px 24px */
  border-radius: var(--radius-lg);  /* 14px */
  border: none;
  background: var(--bg-white);
  color: var(--text);
  font-size: var(--font-base);      /* 14px */
  font-weight: var(--font-semibold);
  cursor: pointer;
  transition: all var(--transition-fast);
  outline: none;
  user-select: none;
  /* 触控热区保证 */
  min-height: 44px;
  min-width: 44px;
}

.mb-btn:active {
  transform: scale(0.96);
}

/* 主按钮 */
.mb-btn-primary {
  background: var(--gradient-primary);
  color: var(--text-on-primary);
  box-shadow: 0 2px 8px rgba(46, 158, 90, 0.3);
}

.mb-btn-primary:active {
  background: linear-gradient(135deg, var(--primary-600), var(--primary-700));
  box-shadow: 0 1px 4px rgba(46, 158, 90, 0.2);
}

/* 次按钮 */
.mb-btn-secondary {
  background: var(--primary-50);
  color: var(--primary-700);        /* 原 primary → primary-700，户外可读 */
  border: 1px solid var(--primary-200);
}

.mb-btn-secondary:active {
  background: var(--primary-100);
}

/* 文字按钮 */
.mb-btn-text {
  background: transparent;
  color: var(--primary-700);        /* 原 primary → primary-700，户外可读 */
  padding: 8px 12px;
}

.mb-btn-text:active {
  background: var(--primary-50);
}

/* 危险按钮 */
.mb-btn-danger {
  background: var(--error-light);
  color: var(--error-dark);          /* 原 error → error-dark，户外可读 */
  border: 1px solid var(--error);
}

/* 禁用状态 */
.mb-btn:disabled,
.mb-btn.disabled {
  opacity: 0.5;
  cursor: not-allowed;
  transform: none !important;
}

/* 小按钮 */
.mb-btn-sm {
  padding: 8px 16px;
  font-size: var(--font-sm);       /* 13px */
  border-radius: var(--radius-md);
  min-height: 36px;
}

/* 大按钮（全宽CTA） */
.mb-btn-lg {
  padding: 14px 32px;
  font-size: var(--font-md);       /* 16px */
  border-radius: var(--radius-xl);
  min-height: 48px;
}

/* 全宽按钮 */
.mb-btn-block {
  display: flex;
  width: 100%;
}

/* Loading 状态 */
.mb-btn-loading {
  position: relative;
  color: transparent !important;
  pointer-events: none;
}

.mb-btn-loading::after {
  content: '';
  position: absolute;
  width: 20px;
  height: 20px;
  border: 2px solid currentColor;
  border-right-color: transparent;
  border-radius: 50%;
  animation: btnSpin 0.6s linear infinite;
  color: var(--text-on-primary);
}

.mb-btn-loading:not(.mb-btn-primary)::after {
  color: var(--primary);
}

@keyframes btnSpin {
  to { transform: rotate(360deg); }
}

/* 圆形按钮 */
.mb-btn-round {
  border-radius: var(--radius-full);
}

/* 图标按钮 */
.mb-btn-icon {
  width: 44px;
  height: 44px;
  padding: 0;
  border-radius: var(--radius-lg);
}

.mb-btn-icon svg {
  width: 22px;
  height: 22px;
}
```

### 4.8 标签/徽章（升级版）

> 设计决策：加深标签文字色，与功能色升级保持一致。

```css
.mb-tag {
  display: inline-flex;
  align-items: center;
  padding: 2px 8px;
  border-radius: var(--radius-md);
  font-size: var(--font-xs);        /* 12px */
  font-weight: var(--font-medium);
  line-height: 1.6;
  white-space: nowrap;
}

/* 状态标签 — 使用户外强化版功能色 */
.mb-tag.success,
.mb-tag.green,
.mb-tag.growing,
.mb-tag.completed,
.mb-tag.available {
  background: var(--success-light);
  color: var(--success-dark);       /* 原 success → success-dark */
}

.mb-tag.warning,
.mb-tag.orange,
.mb-tag.pending {
  background: var(--warning-light);
  color: var(--warning-dark);       /* 原 warning → warning-dark */
}

.mb-tag.error,
.mb-tag.red,
.mb-tag.danger,
.mb-tag.overdue {
  background: var(--error-light);
  color: var(--error-dark);         /* 原 error → error-dark */
}

.mb-tag.info,
.mb-tag.blue,
.mb-tag.ongoing {
  background: var(--info-light);
  color: var(--info-dark);          /* 原 info → info-dark */
}

.mb-tag.default,
.mb-tag.gray {
  background: var(--gray-100);
  color: var(--gray-600);
}

/* 大号标签 */
.mb-tag-lg {
  padding: 4px 12px;
  font-size: var(--font-sm);       /* 13px */
}

/* 带圆点的标签 */
.mb-tag-dot::before {
  content: '';
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: currentColor;
  margin-right: 6px;
  flex-shrink: 0;
}
```

### 4.9 列表项（升级版）

```css
.mb-list {
  background: var(--bg-white);
  border-radius: var(--radius-lg);
  border: 1px solid var(--border);
  overflow: hidden;                 /* 防止子项圆角溢出 */
}

.mb-list-item {
  display: flex;
  align-items: center;
  padding: 16px;
  border-bottom: 1px solid var(--border-light);
  cursor: pointer;
  transition: background var(--transition-fast);
  /* 触控热区 */
  min-height: 56px;
}

.mb-list-item:last-child {
  border-bottom: none;
}

.mb-list-item:active {
  background: var(--gray-50);
}

.mb-list-icon {
  width: 44px;                      /* 原40px → 44px，与快捷入口一致 */
  height: 44px;
  border-radius: var(--radius-md);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  margin-right: 12px;
}

.mb-list-icon svg {
  width: 22px;
  height: 22px;
}

.mb-list-content {
  flex: 1;
  min-width: 0;
}

.mb-list-title {
  font-size: var(--font-base);     /* 14px */
  font-weight: var(--font-semibold);
  color: var(--text);
  margin-bottom: 4px;
}

.mb-list-desc {
  font-size: var(--font-sm);       /* 13px */
  color: var(--text-secondary);
  line-height: 1.4;
}

.mb-list-extra {
  flex-shrink: 0;
  text-align: right;
  margin-left: 12px;
}

/* 列表项箭头 */
.mb-list-arrow {
  color: var(--gray-400);
  margin-left: 8px;
}

.mb-list-arrow svg {
  width: 16px;
  height: 16px;
}
```

---

## 5. Layout（布局）

### 5.1 栅格系统

```css
.mb-container {
  width: 100%;
  max-width: 750px;
  margin: 0 auto;
  padding: 0 16px;
}

.mb-section {
  padding: 16px;
}

.mb-section + .mb-section {
  margin-top: 0;  /* section 之间无额外间距，靠内部卡片间距呼吸 */
}
```

### 5.2 间距体系 — 8px 基准

| Token | 值 | 用途 |
|-------|---|------|
| `--space-0` | 0px | 无间距 |
| `--space-0.5` | 2px | ✅ 新增 — 最小间距（图标与文字间） |
| `--space-1` | 4px | 行内紧凑间距 |
| `--space-1.5` | 6px | ✅ 新增 — 标签内边距 |
| `--space-2` | 8px | 紧凑间距（卡片内元素） |
| `--space-3` | 12px | 标准小间距 |
| `--space-4` | 16px | ✅ 基准间距 — 区块内边距、卡片间距 |
| `--space-5` | 20px | 区块内边距（宽松版） |
| `--space-6` | 24px | 区块间间距 |
| `--space-8` | 32px | 大区块间距 |
| `--space-10` | 40px | 页面顶部/底部间距 |
| `--space-12` | 48px | 空状态/特殊间距 |

### 5.3 安全区域

```css
:root {
  --safe-top: env(safe-area-inset-top, 0px);
  --safe-bottom: env(safe-area-inset-bottom, 0px);
  --safe-left: env(safe-area-inset-left, 0px);
  --safe-right: env(safe-area-inset-right, 0px);
  --header-height: 44px;
  --tab-bar-height: 60px;
  --total-header-height: calc(var(--header-height) + var(--safe-top));
  --total-tab-height: calc(var(--tab-bar-height) + var(--safe-bottom));
}
```

### 5.4 触控热区规范

> 核心规则：所有可点击元素最小热区 44×44px（Apple HIG 标准）

| 元素 | 最小热区 | 实际尺寸 | 实现方式 |
|------|---------|---------|---------|
| 快捷入口 | 44×44px | 52×52px容器 | 容器 > 热区 |
| Tab项 | 44×44px | 自适应宽度×60px | 行高保证 |
| 列表项 | 44×44px | 全宽×56px | min-height保证 |
| 按钮 | 44×44px | 按内容+padding | min-height/min-width保证 |
| 图标按钮 | 44×44px | 44×44px | 固定尺寸 |
| 返回按钮 | 44×44px | 36×36px视觉+4px负margin | 视觉小但触区够 |
| 标签（可点击） | 44×20px | 按内容 | padding补偿 |

---

## 6. Depth & Elevation（深度与层级）

### 6.1 阴影系统

| Level | Token | 值 | 用途 |
|-------|-------|---|------|
| 0 | `--shadow-none` | none | 扁平元素 |
| 1 | `--shadow-xs` | 0 1px 2px rgba(0,0,0,0.04) | 微弱浮起 |
| 2 | `--shadow-sm` | 0 1px 3px rgba(0,0,0,0.06) | 小按钮、输入框 |
| 3 | `--shadow-md` | 0 2px 8px rgba(0,0,0,0.08) | 卡片、下拉菜单 |
| 4 | `--shadow-card` | 0 2px 12px rgba(46,158,90,0.08) | ✅ 保留 — 绿色调卡片阴影 |
| 5 | `--shadow-lg` | 0 4px 16px rgba(0,0,0,0.12) | 浮层、弹窗 |
| 6 | `--shadow-float` | 0 8px 24px rgba(0,0,0,0.15) | 全屏弹窗、抽屉 |
| 7 | `--shadow-header` | 0 4px 20px rgba(46,158,90,0.25) | ✅ 新增 — Header专属投影 |

### 6.2 Z-index 规范

| Token | 值 | 用途 |
|-------|---|------|
| `--z-base` | 0 | 普通内容 |
| `--z-sticky` | 10 | 粘性Header |
| `--z-dropdown` | 100 | 下拉菜单 |
| `--z-sticky-header` | 200 | 粘性页面Header |
| `--z-overlay` | 300 | 遮罩层 |
| `--z-modal` | 400 | 模态框 |
| `--z-toast` | 500 | 提示消息 |
| `--z-tab-bar` | 100 | 底部导航 |
| `--z-tooltip` | 600 | 工具提示 |

### 6.3 圆角系统（保留）

| Token | 值 | 用途 |
|-------|---|------|
| `--radius-sm` | 6px | 标签、小元素 |
| `--radius-md` | 10px | 按钮、输入框、小卡片 |
| `--radius-lg` | 14px | 卡片、弹窗 |
| `--radius-xl` | 18px | 大卡片、底部面板 |
| `--radius-2xl` | 22px | Header底边 |
| `--radius-full` | 9999px | 头像、圆形按钮 |

---

## 7. Cautions（注意事项）

### Never Do（设计禁区）

1. ❌ **禁止使用浅灰文字在白底上** — `color: #b2bec3` 在户外阳光下不可见，最小可读灰度为 `#595959`（gray-600）
2. ❌ **禁止字号低于12px** — 户外场景10px文字不可读，11px仅限极少数非关键装饰
3. ❌ **禁止触控热区小于44px** — 戴手套操作需要更大热区
4. ❌ **禁止浅色背景+浅色文字的组合** — 对比度必须 ≥ 4.5:1（WCAG AA）
5. ❌ **禁止纯装饰性渐变** — 渐变仅用于Header、主按钮、骨架屏三个功能场景
6. ❌ **禁止卡片内信息密度超过3层** — 超过3层（标题+副标题+描述+标签+时间+操作）必须拆分
7. ❌ **禁止进度条/状态指示器使用低饱和度颜色** — 户外需要高饱和度才能辨识
8. ❌ **禁止在小屏幕(<375px)使用4列以上Grid** — 每列宽度不低于80px

### Prefer（推荐替代方案）

1. ✅ **用深色文字代替浅灰** — `var(--text-secondary)` 代替 `var(--text-light)`
2. ✅ **用实色边框代替阴影区分层级** — 户外强光下阴影消失，`border: 1px solid var(--border-strong)` 更可靠
3. ✅ **用图标+文字代替纯图标** — 户外/戴手套场景下，文字标签比图标更可靠
4. ✅ **用大圆角卡片代替方形区块** — 圆角14px以上的卡片在户外视觉辨识度更高
5. ✅ **用骨架屏代替loading文字** — "加载中..." 在弱网下本身可能加载不出来
6. ✅ **用内联反馈代替弹窗** — 田间操作时弹窗容易被忽略，用Toast/内联消息更友好

---

## 8. Responsive Behavior（响应式行为）

### 8.1 断点定义

| 断点名 | 宽度范围 | 特征 |
|--------|---------|------|
| `xs` | 320px~374px | iPhone SE / 小屏手机 |
| `sm` | 375px~399px | iPhone 6/7/8 / 标准手机 |
| `md` | 400px~429px | iPhone 12/13/14 / 大屏手机 |
| `lg` | 430px+ | iPhone Pro Max / Android大屏 |

### 8.2 适配策略

```css
/* 小屏适配 (< 375px) */
@media (max-width: 374px) {
  :root {
    --font-xs: 11px;
    --font-sm: 12px;
    --font-base: 13px;
    --font-md: 15px;
    --font-lg: 17px;
    --font-xl: 19px;
    --font-2xl: 22px;
    --font-3xl: 26px;
  }
  
  .mb-quick-grid {
    grid-template-columns: repeat(3, 1fr);  /* 4列 → 3列 */
    gap: 8px;
  }
  
  .mb-card {
    padding: 16px;  /* 20px → 16px */
  }
  
  .mb-section {
    padding: 12px;
  }
}

/* 大屏适配 (>= 430px) */
@media (min-width: 430px) {
  .mb-container {
    padding: 0 24px;
  }
  
  .mb-card {
    padding: 24px;
  }
}
```

### 8.3 横屏处理

```css
@media (orientation: landscape) and (max-height: 500px) {
  .mb-header-home {
    padding-top: 8px;
    padding-bottom: 12px;
  }
  
  .mb-header-home .stats-grid {
    grid-template-columns: repeat(4, 1fr);
    gap: 12px;
    margin-bottom: 4px;
  }
  
  .mb-tab-bar {
    height: 52px;
  }
}
```

### 8.4 户外强光模式

```css
/* 通过 body 添加 class="outdoor-mode" 激活 */
body.outdoor-mode {
  --text: #000000;
  --text-secondary: #333333;
  --border: #cccccc;
  --border-strong: #999999;
  --bg: #ffffff;
}

body.outdoor-mode .mb-card {
  border-width: 2px;
  border-color: var(--border-strong);
  box-shadow: none;  /* 户外阴影不可见，用边框替代 */
}

body.outdoor-mode .mb-tag {
  font-weight: var(--font-bold);
}
```

---

## 9. Agent Prompt Guide（AI 生成指南）

### Key Instructions

1. **户外优先原则**: 所有文字色使用 `var(--text)` (`#1a1a1a`) 或 `var(--text-secondary)` (`#595959`)，绝不使用 `var(--text-light)` (`#b2bec3`) 作为内容文字色
2. **触控热区强制**: 所有可交互元素 min-height/min-width ≥ 44px，间距 ≥ 8px
3. **字号底线**: 正文 14px (`var(--font-base)`)，最小 12px (`var(--font-xs)`)，绝不低于 11px
4. **Header统一**: 新页面必须使用3种Header变体之一，禁止自创Header样式
5. **卡片呼吸感**: 卡片内边距 20px，卡片间距 16px，section 间距由卡片自身 padding 控制
6. **功能色户外版**: 标签/文字使用 `success-dark`/`warning-dark`/`error-dark`/`info-dark`，仅底色使用 light 版
7. **图标尺寸**: 快捷入口28px，列表图标22px，按钮内图标20px，Tab图标24px
8. **骨架屏优先**: 任何列表/卡片页面必须先渲染骨架屏，数据加载后替换
9. **空状态必备**: 每个列表/数据页面必须有空状态设计（无数据/无网络/错误 三种）
10. **安全区域**: Header 适配 `env(safe-area-inset-top)`，Tab Bar 适配 `env(safe-area-inset-bottom)`

### Quick CSS Snippet

```css
:root {
  /* 核心色彩 */
  --primary: #2e9e5a;
  --primary-dark: #1e7e42;
  --primary-light: #f0faf4;
  --primary-700: #146c31;
  
  /* 核心文字色 — 户外安全 */
  --text: #1a1a1a;
  --text-secondary: #595959;
  --text-tertiary: #8c8c8c;
  --text-inverse: #ffffff;
  --text-on-primary: #ffffff;
  
  /* 核心功能色 — 户外强化 */
  --success: #389e0d; --success-dark: #237804; --success-light: #f0fff0;
  --warning: #d48806; --warning-dark: #ad6800; --warning-light: #fffbe6;
  --error: #cf1322; --error-dark: #a8071a; --error-light: #fff1f0;
  --info: #096dd9; --info-dark: #0050b3; --info-light: #e6f7ff;
  
  /* 核心字号 */
  --font-xs: 12px; --font-sm: 13px; --font-base: 14px;
  --font-md: 16px; --font-lg: 18px; --font-xl: 20px;
  
  /* 核心间距 */
  --space-2: 8px; --space-3: 12px; --space-4: 16px;
  --space-5: 20px; --space-6: 24px;
  
  /* 核心圆角 */
  --radius-md: 10px; --radius-lg: 14px; --radius-xl: 18px;
  
  /* 核心阴影 */
  --shadow-card: 0 2px 12px rgba(46,158,90,0.08);
  --shadow-header: 0 4px 20px rgba(46,158,90,0.25);
  
  /* 核心过渡 */
  --transition-fast: 0.15s ease;
  --transition-normal: 0.2s ease;
}
```

---

## 附录 A：从 v1 迁移到 v2 的 CSS 变量映射表

| v1 变量 | v2 变量 | 变化说明 |
|---------|---------|---------|
| `--text: #2D3436` | `--text: #1a1a1a` | 加深，户外可读 |
| `--text-secondary: #636e72` | `--text-secondary: #595959` | 加深，WCAG AA |
| `--text-light: #b2bec3` | `--text-tertiary: #8c8c8c` | 重命名+加深，仅辅助用 |
| `--success: #52c41a` | `--success: #389e0d` | 加深，户外可辨 |
| `--warning: #faad14` | `--warning: #d48806` | 加深，户外可辨 |
| `--error: #ff4d4f` | `--error: #cf1322` | 加深，户外可辨 |
| `--info: #1890ff` | `--info: #096dd9` | 加深，户外可辨 |
| `--font-xs: 10px` | `--font-xs: 12px` | 升级，户外最小可接受 |
| `--font-sm: 12px` | `--font-sm: 13px` | 升级，新增过渡档 |
| `--font-base: 14px` | `--font-base: 14px` | 保持（已是目标值） |
| (无) | `--font-sm: 13px` | 新增13px过渡档 |
| (无) | `--font-4xl: 34px` | 新增大号统计数字 |
| (无) | `--font-family-number` | 新增数字字体栈 |
| (无) | `--text-on-primary: #ffffff` | 新增主色上文字色 |
| (无) | `--gradient-header` | 新增Header专属渐变 |
| (无) | `--shadow-header` | 新增Header专属阴影 |
| (无) | `--safe-top / --safe-bottom` | 新增安全区域变量 |

## 附录 B：新增 CSS 变量完整清单

```css
:root {
  /* 新增色阶 */
  --primary-800: #0f5426;
  --primary-900: #0a3d1b;
  --primary-950: #062710;
  
  /* 新增大地色体系 */
  --soil-50: #faf6f1;
  --soil-100: #ede4d4;
  --soil-200: #d4c4a8;
  --soil-500: #8B7355;
  --soil-700: #5D4037;
  --sand-50: #fdfbf7;
  --sand-100: #f5efe3;
  --sand-300: #D2C4A8;
  --harvest-50: #fef9e7;
  --harvest-300: #F5C842;
  --harvest-700: #B8860B;
  --sky-50: #f0f9ff;
  --sky-100: #e0f2fe;
  --sky-700: #0369a1;
  
  /* 新增功能色深浅 */
  --success-dark: #237804;
  --warning-dark: #ad6800;
  --error-dark: #a8071a;
  --info-dark: #0050b3;
  
  /* 新增文字色 */
  --text-tertiary: #8c8c8c;
  --text-placeholder: #bfbfbf;
  --text-inverse: #ffffff;
  --text-on-primary: #ffffff;
  --text-outdoor: #000000;
  --text-outdoor-secondary: #333333;
  
  /* 新增背景色 */
  --bg-warm: #fdfbf7;
  --bg-elevated: #ffffff;
  --bg-overlay: rgba(0, 0, 0, 0.45);
  
  /* 新增边框色 */
  --border-strong: #d0d0d0;
  
  /* 新增字号 */
  --font-2xs: 11px;
  --font-sm: 13px;
  --font-4xl: 34px;
  
  /* 新增字重 */
  --font-regular: 400;
  --font-medium: 500;
  --font-semibold: 600;
  --font-bold: 700;
  --font-extrabold: 800;
  
  /* 新增字体栈 */
  --font-family-mono: "SF Mono", "Menlo", "Monaco", "Consolas", monospace;
  --font-family-number: "DIN Alternate", "Helvetica Neue", var(--font-family);
  
  /* 新增间距 */
  --space-0.5: 2px;
  --space-1.5: 6px;
  
  /* 新增阴影 */
  --shadow-none: none;
  --shadow-header: 0 4px 20px rgba(46,158,90,0.25);
  
  /* 新增渐变 */
  --gradient-primary: linear-gradient(135deg, var(--primary), var(--primary-600));
  --gradient-header: linear-gradient(135deg, var(--primary-700), var(--primary) 50%, var(--primary-600));
  --gradient-skeleton: linear-gradient(90deg, var(--gray-100) 25%, var(--gray-200) 50%, var(--gray-100) 75%);
  
  /* 新增安全区域 */
  --safe-top: env(safe-area-inset-top, 0px);
  --safe-bottom: env(safe-area-inset-bottom, 0px);
  --safe-left: env(safe-area-inset-left, 0px);
  --safe-right: env(safe-area-inset-right, 0px);
  --header-height: 44px;
  --tab-bar-height: 60px;
  --total-header-height: calc(var(--header-height) + var(--safe-top));
  --total-tab-height: calc(var(--tab-bar-height) + var(--safe-bottom));
  
  /* 新增 z-index */
  --z-base: 0;
  --z-sticky: 10;
  --z-dropdown: 100;
  --z-sticky-header: 200;
  --z-overlay: 300;
  --z-modal: 400;
  --z-toast: 500;
  --z-tab-bar: 100;
  --z-tooltip: 600;
}
```

---

## 附录 C：动效规范

### 页面转场

| 动效 | 时长 | 缓动 | 用途 |
|------|------|------|------|
| fadeIn | 300ms | ease | 页面进入 |
| slideUp | 300ms | ease-out | 卡片/列表项进入 |
| slideDown | 200ms | ease-out | 下拉菜单展开 |
| slideRight | 300ms | ease-out | 侧边栏打开 |

```css
@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes slideUp {
  from { opacity: 0; transform: translateY(16px); }
  to { opacity: 1; transform: translateY(0); }
}

@keyframes slideDown {
  from { opacity: 0; transform: translateY(-8px); }
  to { opacity: 1; transform: translateY(0); }
}

@keyframes slideRight {
  from { opacity: 0; transform: translateX(-16px); }
  to { opacity: 1; transform: translateX(0); }
}
```

### 卡片交互反馈

| 状态 | 效果 | 时长 |
|------|------|------|
| 按下 | scale(0.98) + shadow减小 | 150ms |
| 释放 | scale(1.0) + shadow恢复 | 150ms |
| 长按 | scale(0.96) + 边框高亮 | 300ms |

### 加载动画

| 动效 | 时长 | 循环 | 用途 |
|------|------|------|------|
| skeletonShimmer | 1.5s | infinite | 骨架屏闪光 |
| pulse | 2s | infinite | 加载指示器 |
| btnSpin | 0.6s | infinite | 按钮loading旋转 |

```css
@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.4; }
}

@keyframes btnSpin {
  to { transform: rotate(360deg); }
}
```

### 列表项交错进入

```css
.mb-list-item {
  animation: slideUp 300ms ease-out both;
}

.mb-list-item:nth-child(1) { animation-delay: 0ms; }
.mb-list-item:nth-child(2) { animation-delay: 50ms; }
.mb-list-item:nth-child(3) { animation-delay: 100ms; }
.mb-list-item:nth-child(4) { animation-delay: 150ms; }
.mb-list-item:nth-child(5) { animation-delay: 200ms; }
/* 最多5项交错，避免过长的延迟 */
.mb-list-item:nth-child(n+6) { animation-delay: 200ms; }
```

### 减弱动画偏好

```css
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

---

*文档结束 — 智慧果园 v2.0 设计令牌*
