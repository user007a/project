# 数字乡村大屏 CSS 美化优化计划

## 概述

参考"叁竹培训管理驾驶舱"截图风格，对现有数字乡村大屏（幸福村）进行纯CSS层面的美化优化。目标：更大圆角、更轻盈边框、更丰富阴影层次、更突出数据层次、更精致细节。

**修改范围**: 仅 `html/dashboard/css/dashboard.css`，不修改HTML结构和JS逻辑。
**约束**: 固定 1920x1080 布局不变，所有内容不溢出。

---

## 第一批：CSS变量层（:root）-- 10项，影响20+组件

| # | 变量 | 修改前 | 修改后 | 说明 |
|---|------|--------|--------|------|
| V-01 | `--border-light` | `#e8ede9` | `#eef2f6` | 浅蓝灰边框，更轻盈 |
| V-02 | `--border-default` | `#d4ddd8` | `#dce4e0` | 默认边框同步调浅 |
| V-03 | `--radius-sm` | `12px` | `16px` | 小圆角升级，现代感 |
| V-04 | `--shadow-sm` | `0 2px 8px rgba(43,110,60,0.06)` | `0 1px 3px rgba(43,110,60,0.04)` | 基础阴影更轻柔 |
| V-05 | `--shadow-card` | `0 2px 12px rgba(43,110,60,0.08)` | `0 1px 4px rgba(43,110,60,0.05), 0 4px 12px rgba(43,110,60,0.04)` | 双层阴影，层次更好 |
| V-06 | `--shadow-card-hover` | `0 8px 24px rgba(43,110,60,0.15)` | `0 8px 16px rgba(43,110,60,0.08), 0 12px 32px rgba(43,110,60,0.06)` | hover阴影更分散柔和 |
| V-07 | `--shadow-md` | `0 4px 16px rgba(43,110,60,0.10)` | `0 4px 8px rgba(43,110,60,0.06), 0 8px 24px rgba(43,110,60,0.05)` | 双层中等阴影 |
| V-08 | `--space-sm` | `12px` | `14px` | 微增间距 |
| V-09 | `--font-size-lg` | `20px` | `22px` | 略增大字号 |
| V-10 | `--font-size-hero` | `40px` | `42px` | 略增大hero字号 |

---

## 第二批：布局间距平衡 -- 10项

为后续组件增大腾出空间，先收紧布局间距。

| # | 选择器 | 属性 | 修改前 | 修改后 |
|---|--------|------|--------|--------|
| L-01 | `.layout-three` | `gap` | `12px` | `10px` |
| L-02 | `.layout-three .col-left` | `gap` | `10px` | `8px` |
| L-03 | `.layout-three .col-center` | `gap` | `10px` | `8px` |
| L-04 | `.layout-three .col-right` | `gap` | `10px` | `8px` |
| L-05 | `.layout-two .col-left` | `gap` | `10px` | `8px` |
| L-06 | `.layout-two .col-right` | `gap` | `10px` | `8px` |
| L-07 | `.inner-col` | `gap` | `10px` | `8px` |
| L-08 | `.kpi-grid` | `margin-bottom` | `14px` | `10px` |
| L-09 | `.filter-bar` | `margin-bottom` | `8px` | `6px` |
| L-10 | `.panel-title` | `margin-bottom` | `10px` | `8px` |

---

## 第三批：核心组件 -- KPI卡片 + Panel面板

### KPI卡片 -- 13项

| # | 选择器 | 属性 | 修改前 | 修改后 |
|---|--------|------|--------|--------|
| K-01 | `.kpi-grid` | `gap` | `10px` | `12px` |
| K-02 | `.kpi-card` | `padding` | `10px` | `12px 14px` |
| K-03 | `.kpi-card` | `border-radius` | `var(--radius-sm)` | `var(--radius-md)` |
| K-04 | `.kpi-card` | `gap` | `8px` | `10px` |
| K-05 | `.kpi-icon` | `width/height` | `36px` | `42px` |
| K-06 | `.kpi-icon i` | `font-size` | `15px` | `17px` |
| K-07 | `.kpi-value` | `font-size` | `var(--font-size-md)` | `var(--font-size-lg)` |
| K-08 | `.kpi-label` | `color` | `var(--text-muted)` | `#8a9b8f` |
| K-09 | `.kpi-trend` | `padding` | 无 | `2px 8px` |
| K-10 | `.kpi-trend` | `border-radius` | 无 | `var(--radius-full)` |
| K-11 | `.kpi-trend.up` | `background` | 无 | `rgba(34,168,74,0.08)` |
| K-12 | `.kpi-trend.down` | `background` | 无 | `rgba(214,48,49,0.06)` |

### Panel面板 -- 4项

| # | 选择器 | 属性 | 修改前 | 修改后 |
|---|--------|------|--------|--------|
| P-01 | `.panel` | `border-radius` | `var(--radius-sm)` | `var(--radius-lg)` |
| P-02 | `.panel` | `padding` | `12px 14px` | `14px 16px` |
| P-03 | `.panel-title` | `border-left-width` | `3px` | `4px` |
| P-04 | `.panel-title` | `padding-left` | `10px` | `12px` |

---

## 第四批：辅助组件

### Header -- 2项

| # | 选择器 | 属性 | 修改前 | 修改后 |
|---|--------|------|--------|--------|
| H-01 | `.header-logo` | `border-radius` | `var(--radius-sm)` | `var(--radius-md)` |
| H-02 | `.btn-fullscreen` | `border-radius` | `var(--radius-sm)` | `var(--radius-md)` |

### 按钮组件 -- 3项

| # | 选择器 | 属性 | 修改前 | 修改后 |
|---|--------|------|--------|--------|
| B-01 | `.btn-platform-entry` | `padding` | `6px 14px` | `8px 18px` |
| B-02 | `.btn-platform-entry` | `font-size` | `var(--font-size-2xs)` | `var(--font-size-sm)` |
| B-03 | `.btn-filter-reset` | `padding` | `6px 14px` | `8px 16px` |

### 日期徽章 -- 2项

| # | 选择器 | 属性 | 修改前 | 修改后 |
|---|--------|------|--------|--------|
| D-01 | `.date-badge` | `padding` | `6px var(--space-md)` | `10px var(--space-lg)` |
| D-02 | `.date-badge` | `font-size` | `var(--font-size-sm)` | `15px` |

### Tab导航 -- 3项

| # | 选择器 | 属性 | 修改前 | 修改后 |
|---|--------|------|--------|--------|
| T-01 | `.tab-btn` | `padding` | `0 var(--space-lg)` | `0 20px` |
| T-02 | `.tab-btn.active::after` | `width` | `40px` | `32px` |
| T-03 | `.tab-btn.active::after` | `height` | `3px` | `2.5px` |

### 图表组件 -- 8项

| # | 选择器 | 属性 | 修改前 | 修改后 |
|---|--------|------|--------|--------|
| CH-01 | `.ring-chart` | `width/height` | `90px` | `100px` |
| CH-02 | `.ring-chart .ring-bg` | `stroke-width` | `10` | `12` |
| CH-03 | `.ring-chart .ring-fill` | `stroke-width` | `10` | `12` |
| CH-04 | `.ring-center .ring-value` | `font-size` | `var(--font-size-md)` | `var(--font-size-lg)` |
| CH-05 | `.gauge-chart` | `width/height` | `120px/80px` | `130px/90px` |
| CH-06 | `.line-chart svg` | `height` | `140px` | `150px` |
| CH-07 | `.bar-wrapper` | `width` | `36px` | `32px` |
| CH-08 | `.bar` | `border-radius` | `var(--radius-sm) var(--radius-sm) 0 0` | `8px 8px 0 0` |

---

## 第五批：收尾微调

### 进度条 -- 4项

| # | 选择器 | 属性 | 修改前 | 修改后 |
|---|--------|------|--------|--------|
| PR-01 | `.progress-bar` | `height` | `8px` | `6px` |
| PR-02 | `.progress-bar` | `border-radius` | `4px` | `3px` |
| PR-03 | `.h-bar-track` | `height` | `18px` | `16px` |
| PR-04 | `.h-bar-fill` | `border-radius` | `11px` | `8px` |

### 数据列表 -- 3项

| # | 选择器 | 属性 | 修改前 | 修改后 |
|---|--------|------|--------|--------|
| DL-01 | `.data-list-header` | `padding` | `8px var(--space-md)` | `6px var(--space-md)` |
| DL-02 | `.data-list-row` | `padding` | `6px var(--space-md)` | `5px var(--space-md)` |
| DL-03 | `.data-list-row:hover` | `background` | `rgba(43,110,60,0.04)` | `rgba(43,110,60,0.03)` |

### 监测卡片 -- 2项

| # | 选择器 | 属性 | 修改前 | 修改后 |
|---|--------|------|--------|--------|
| M-01 | `.monitor-card` | `padding` | `8px` | `10px` |
| M-02 | `.monitor-cards` | `gap` | `6px` | `8px` |

### 其他组件 -- 15项

| # | 选择器 | 属性 | 修改前 | 修改后 |
|---|--------|------|--------|--------|
| O-01 | `.btn-fullscreen` | `width/height` | `36px` | `38px` |
| O-02 | `.mini-card` | `border-radius` | `var(--radius-sm)` | `var(--radius-md)` |
| O-03 | `.mini-card` | `padding` | `8px 6px` | `8px 8px` |
| O-04 | `.summary-stat-item` | `border-radius` | `var(--radius-sm)` | `var(--radius-md)` |
| O-05 | `.summary-stat-item` | `padding` | `8px 6px` | `10px 8px` |
| O-06 | `.facility-item` | `border-radius` | `var(--radius-sm)` | `var(--radius-md)` |
| O-07 | `.alert-banner` | `border-radius` | `var(--radius-sm)` | `var(--radius-md)` |
| O-08 | `.industry-icon-item .icon-circle` | `width/height` | `36px` | `38px` |
| O-09 | `.notice-item` | `border-radius` | `var(--radius-sm)` | `var(--radius-md)` |
| O-10 | `.rank-item` | `border-radius` | `var(--radius-sm)` | `var(--radius-md)` |
| O-11 | `.summary-text` | `border-radius` | `var(--radius-sm)` | `var(--radius-md)` |
| O-12 | `.map-placeholder` | `border-radius` | `var(--radius-md)` | `var(--radius-lg)` |
| O-13 | `.filter-select` | `border-radius` | `var(--radius-sm)` | `var(--radius-md)` |
| O-14 | `.tag` | `padding` | `3px 10px` | `3px 12px` |
| O-15 | `.bar-chart` | `min-height` | `120px` | `130px` |

---

## 高度预算验证

- Header: 72px（不变）
- main-content padding: 20px（不变）
- 可用高度: 1080 - 72 - 20 = **988px**

**村情总览（最复杂的tab）**:
- KPI网格: ~78px + margin-bottom 10px = 88px
- layout-three: 988 - 88 = 900px（3列面板通过 flex:1 自动分配，间距8px*2=16px）
- 每列面板可用: ~884px / 2~3 = 295~442px，充足

**生态宜居（含监测卡片+筛选栏）**:
- filter-bar: ~40px + margin-bottom 6px = 46px
- layout-three: 988 - 46 = 942px，充足

---

## 实施顺序

1. **第一批** 变量层 (V-01~V-10) → 浏览器预览全局效果
2. **第二批** 布局间距 (L-01~L-10) → 为组件增大腾出空间
3. **第三批** KPI+Panel (K-01~K-12, P-01~P-04) → 核心视觉提升
4. **第四批** 辅助组件 (H/B/D/T/CH) → 逐一调整
5. **第五批** 收尾微调 (PR/DL/M/O) → 最后打磨

每批修改后浏览器验证：6个tab内容不溢出、横向不截断、hover/focus正常。

---

## 风险与回退

- **V-03 (radius-sm 12px→16px)**: 影响广，小元素（calendar-day, rank-num）可能过大 → 可单独覆盖回12px
- **CH-06 (line-chart 140→150px)**: 3个面板各增10px → flex:1自动适配，必要时回退
- **B-01/B-02 (按钮增大)**: header水平空间 → 可回退字号保持11px

总计约 **90项CSS修改**，分5批执行。
