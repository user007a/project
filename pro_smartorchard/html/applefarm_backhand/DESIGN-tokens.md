# 智慧果园后台管理端 — 设计令牌文档 (DESIGN.md)

> 基于 Linear 设计系统定制，融合 HashiCorp 企业级专业感，保持数农智果品牌基因

---

## 1. Visual Theme（视觉主题）

**Philosophy**: 专业、沉稳、高效——藏青深色侧边栏承载导航结构，苹果绿作为精准的视觉锚点引导操作焦点

**Direction**: Tech Utility × Modern Minimal 混合——侧边栏采用高对比深色系体现工具感，内容区延续现代极简的干净布局

**Personality**: confident（自信）, precise（精确）, approachable（亲和）

**Reference**: Linear（暗色侧边栏结构）× HashiCorp（企业级信息层级）× 数农智果品牌色系

**视觉方向坐标**:
```
Tech Utility ████████░░ 80%
Modern Minimal ████████░░ 80%
Editorial Monocle ██░░░░░░░░░ 20%
Brutalist ░░░░░░░░░░ 0%
Soft Warm ████░░░░░░ 20%  ← 仅体现在苹果绿的亲和力上
```

---

## 2. Color Palette（调色板）

### 2.1 侧边栏色系（新增）

> 侧边栏采用藏青深色调，与苹果绿品牌色形成互补搭配。藏青色（Navy）在色轮上位于绿色的对角方向，产生沉稳而不压抑的对比效果。

| Token | HEX | OKLCh | Usage |
|-------|-----|-------|-------|
| `--sidebar-bg` | #1b2a41 | oklch(28% 0.03 250) | 侧边栏主背景 |
| `--sidebar-bg-elevated` | #223349 | oklch(32% 0.03 250) | 侧边栏展开子菜单背景 |
| `--sidebar-bg-hover` | rgba(255,255,255,0.06) | — | 菜单项 hover 背景叠加 |
| `--sidebar-bg-active` | rgba(255,255,255,0.10) | — | 菜单项 active 背景叠加 |
| `--sidebar-border` | rgba(255,255,255,0.08) | — | 侧边栏内分隔线 |
| `--sidebar-text` | rgba(255,255,255,0.85) | — | 菜单项文字主色 |
| `--sidebar-text-secondary` | rgba(255,255,255,0.50) | — | 二级菜单文字/图标色 |
| `--sidebar-text-hover` | #ffffff | — | 菜单项 hover 文字色 |
| `--sidebar-text-active` | #ffffff | — | 菜单项 active 文字色 |
| `--sidebar-icon` | rgba(255,255,255,0.55) | — | 菜单项图标默认色 |
| `--sidebar-icon-hover` | rgba(255,255,255,0.85) | — | 菜单项图标 hover 色 |
| `--sidebar-icon-active` | var(--primary-400) | — | 菜单项图标 active 色（苹果绿） |
| `--sidebar-accent` | var(--primary-500) | — | 侧边栏苹果绿强调色（active 指示条等） |
| `--sidebar-accent-glow` | rgba(34,168,74,0.25) | — | 苹果绿发光效果（subtle） |
| `--sidebar-group-title` | rgba(255,255,255,0.35) | — | 菜单分组标题色 |
| `--sidebar-scrollbar-track` | rgba(255,255,255,0.04) | — | 侧边栏滚动条轨道 |
| `--sidebar-scrollbar-thumb` | rgba(255,255,255,0.12) | — | 侧边栏滚动条滑块 |
| `--sidebar-scrollbar-thumb-hover` | rgba(255,255,255,0.20) | — | 侧边栏滚动条滑块 hover |

### 2.2 顶栏/Tab栏色系（新增）

| Token | HEX | OKLCh | Usage |
|-------|-----|-------|-------|
| `--topbar-bg` | #ffffff | oklch(100% 0 0) | 顶栏主背景 |
| `--topbar-border` | var(--gray-200) | — | 顶栏底部边框 |
| `--topbar-height` | 48px | — | 顶栏高度 |
| `--tab-bg` | transparent | — | Tab 标签默认背景 |
| `--tab-bg-hover` | var(--gray-100) | — | Tab 标签 hover 背景 |
| `--tab-bg-active` | var(--primary-50) | — | Tab 标签 active 背景 |
| `--tab-text` | var(--text-secondary) | — | Tab 标签默认文字色 |
| `--tab-text-hover` | var(--text-primary) | — | Tab 标签 hover 文字色 |
| `--tab-text-active` | var(--primary-600) | — | Tab 标签 active 文字色 |
| `--tab-indicator` | var(--primary-500) | — | Tab active 底部指示条色 |
| `--tab-close` | var(--text-disabled) | — | Tab 关闭按钮色 |
| `--tab-close-hover` | var(--error) | — | Tab 关闭按钮 hover 色 |
| `--tab-border` | var(--border-light) | — | Tab 之间分隔线 |

### 2.3 品牌色保持（不变，引用现有变量）

| Token | HEX | Usage |
|-------|-----|-------|
| `--primary-500` | #22a84a | 苹果绿主色 → 从"背景色"转为"强调色"角色 |
| `--primary-400` | #46c365 | 苹果绿亮色 → 侧边栏图标 active 色 |
| `--primary-600` | #1a8a3c | 苹果绿深色 → Tab active 文字色 |
| `--primary-50` | #f0faf3 | 苹果绿浅色 → Tab active 背景 |
| `--accent-500` | #ff6b35 | 苹果暖橙 → 保持辅助角色 |

### 2.4 色彩和谐性说明

藏青色 `#1b2a41` 与苹果绿 `#22a84a` 的搭配分析：
- **色相对比**：藏青色（H≈210°）与苹果绿（H≈145°）在色轮上相距约65°，属于"邻近互补"关系，既有对比又不冲突
- **明度对比**：藏青色明度低（L≈28%）与苹果绿中等明度（L≈48%）形成良好的层次感
- **温度对比**：冷色调藏青 + 中性偏暖的绿色，形成专业而不冰冷的氛围
- **可读性**：`rgba(255,255,255,0.85)` 在 `#1b2a41` 上对比度 ≈ 10.5:1（远超 WCAG AAA 标准 7:1）
- **苹果绿指示条**：`#22a84a` 在 `#1b2a41` 上对比度 ≈ 5.2:1（满足 WCAG AA 标准 4.5:1）

---

## 3. Typography（排版）

### 3.1 字体栈（继承现有系统）

```css
--font-family: 'Noto Sans SC', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, 'Noto Sans', 'PingFang SC', 'Microsoft YaHei', sans-serif;
```

### 3.2 侧边栏专属排版层级

| Level | Size | Weight | Line-height | Letter-spacing | Usage |
|-------|------|--------|-------------|---------------|-------|
| 侧边栏-品牌名 | 18px / 1.125rem | 700 | 1.2 | 0.5px | Logo 旁系统名称 |
| 侧边栏-一级菜单 | 14px / 0.875rem | 500 | 1.5 | 0 | 一级菜单项文字 |
| 侧边栏-二级菜单 | 13px / 0.8125rem | 400 | 1.5 | 0 | 二级子菜单项文字 |
| 侧边栏-分组标题 | 11px / 0.6875rem | 600 | 1.4 | 0.8px | 菜单分组标题（全大写） |

### 3.3 顶栏/Tab栏排版层级

| Level | Size | Weight | Line-height | Usage |
|-------|------|--------|-------------|-------|
| Tab标签文字 | 13px / 0.8125rem | 500 | 1.5 | Tab 标签页名称 |
| Tab标签-icon | 14px | 400 | 1 | Tab 标签页图标 |
| 顶栏用户名 | 14px / 0.875rem | 500 | 1.5 | 右上角用户名 |
| 顶栏-breadcrumb | 13px / 0.8125rem | 400 | 1.5 | 面包屑导航 |

---

## 4. Component Styles（组件样式）

### 4.1 侧边栏（Sidebar）

**结构**:
```
┌─────────────────────────┐
│  [Logo] 数农智果          │ ← sidebar-header (64px)
│  ─────────────────────── │
│  🏠 系统首页              │ ← menu-item (40px)
│  🏢 企业管理         ▸   │ ← menu-item with submenu
│    ├ 企业基本信息          │ ← submenu-item (36px)
│    └ 地块管理              │
│  🌱 农事管理         ▸   │
│    ├ 农事计划              │
│    ├ 农事记录              │
│    └ 巡园管理              │
│  ...                     │
│                          │
│  ─────────────────────── │ ← 底部区域
│  [折叠] [设置]            │ ← sidebar-footer
└─────────────────────────┘
```

**尺寸规范**:
| Token | Value | Usage |
|-------|-------|-------|
| `--sidebar-width` | 240px | 侧边栏展开宽度 |
| `--sidebar-width-collapsed` | 64px | 侧边栏折叠宽度 |
| `--sidebar-header-height` | 64px | 侧边栏顶部品牌区高度 |
| `--sidebar-footer-height` | 48px | 侧边栏底部功能区高度 |
| `--sidebar-item-height` | 40px | 一级菜单项高度 |
| `--sidebar-subitem-height` | 36px | 二级子菜单项高度 |
| `--sidebar-item-gap` | 2px | 菜单项间距 |
| `--sidebar-item-px` | 16px | 菜单项水平内边距 |
| `--sidebar-subitem-px` | 48px | 二级菜单项左偏移（含图标空间） |
| `--sidebar-icon-size` | 18px | 菜单项图标尺寸 |
| `--sidebar-icon-gap` | 10px | 图标与文字间距 |
| `--sidebar-active-bar-width` | 3px | active 左侧指示条宽度 |
| `--sidebar-active-bar-radius` | 0 3px 3px 0 | active 指示条圆角 |
| `--sidebar-transition` | 0.25s cubic-bezier(0.4, 0, 0.2, 1) | 侧边栏动画时间 |

**菜单项状态定义**:

```css
/* === 一级菜单项 === */

/* Default */
.sidebar-menu-item {
  height: var(--sidebar-item-height);
  padding: 0 var(--sidebar-item-px);
  display: flex;
  align-items: center;
  gap: var(--sidebar-icon-gap);
  color: var(--sidebar-text);
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-medium);
  cursor: pointer;
  border-radius: 0;
  transition: all var(--sidebar-transition);
  position: relative;
  text-decoration: none;
}

.sidebar-menu-item .menu-icon {
  width: var(--sidebar-icon-size);
  height: var(--sidebar-icon-size);
  color: var(--sidebar-icon);
  transition: color var(--sidebar-transition);
  flex-shrink: 0;
}

.sidebar-menu-item .menu-arrow {
  margin-left: auto;
  color: var(--sidebar-icon);
  transition: transform var(--sidebar-transition), color var(--sidebar-transition);
  font-size: 12px;
}

/* Hover */
.sidebar-menu-item:hover {
  background: var(--sidebar-bg-hover);
  color: var(--sidebar-text-hover);
}
.sidebar-menu-item:hover .menu-icon {
  color: var(--sidebar-icon-hover);
}

/* Active (当前选中) */
.sidebar-menu-item.active {
  background: var(--sidebar-bg-active);
  color: var(--sidebar-text-active);
}
.sidebar-menu-item.active::before {
  content: '';
  position: absolute;
  left: 0;
  top: 8px;
  bottom: 8px;
  width: var(--sidebar-active-bar-width);
  background: var(--sidebar-accent);
  border-radius: var(--sidebar-active-bar-radius);
  box-shadow: 0 0 8px var(--sidebar-accent-glow);
}
.sidebar-menu-item.active .menu-icon {
  color: var(--sidebar-icon-active);
}

/* Expanded (展开子菜单) */
.sidebar-menu-item.expanded .menu-arrow {
  transform: rotate(90deg);
}

/* Disabled */
.sidebar-menu-item.disabled {
  opacity: 0.4;
  cursor: not-allowed;
  pointer-events: none;
}

/* === 二级子菜单项 === */
.sidebar-submenu {
  overflow: hidden;
  max-height: 0;
  transition: max-height 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}
.sidebar-submenu.open {
  max-height: 600px; /* 足够容纳子菜单 */
}

.sidebar-submenu-item {
  height: var(--sidebar-subitem-height);
  padding-left: var(--sidebar-subitem-px);
  display: flex;
  align-items: center;
  color: var(--sidebar-text-secondary);
  font-size: 13px;
  font-weight: var(--font-weight-normal);
  cursor: pointer;
  transition: all var(--sidebar-transition);
  position: relative;
}

/* 二级菜单圆点指示器 */
.sidebar-submenu-item::before {
  content: '';
  width: 4px;
  height: 4px;
  border-radius: 50%;
  background: var(--sidebar-text-secondary);
  margin-right: 10px;
  flex-shrink: 0;
  transition: all var(--sidebar-transition);
}

.sidebar-submenu-item:hover {
  color: var(--sidebar-text-hover);
  background: var(--sidebar-bg-hover);
}
.sidebar-submenu-item:hover::before {
  background: var(--sidebar-text-hover);
}

.sidebar-submenu-item.active {
  color: var(--sidebar-accent);
  background: var(--sidebar-bg-active);
}
.sidebar-submenu-item.active::before {
  background: var(--sidebar-accent);
  box-shadow: 0 0 6px var(--sidebar-accent-glow);
}

.sidebar-submenu-item.disabled {
  opacity: 0.4;
  cursor: not-allowed;
  pointer-events: none;
}
```

**折叠状态**:
```css
.sidebar.collapsed {
  width: var(--sidebar-width-collapsed);
}
.sidebar.collapsed .menu-text,
.sidebar.collapsed .menu-arrow,
.sidebar.collapsed .sidebar-brand-text {
  display: none;
}
.sidebar.collapsed .sidebar-menu-item {
  justify-content: center;
  padding: 0;
}
.sidebar.collapsed .sidebar-menu-item .menu-icon {
  width: 20px;
  height: 20px;
}
/* 折叠状态 hover 显示 tooltip */
.sidebar.collapsed .sidebar-menu-item:hover .sidebar-tooltip {
  display: block;
}
.sidebar-tooltip {
  display: none;
  position: absolute;
  left: calc(var(--sidebar-width-collapsed) + 8px);
  top: 50%;
  transform: translateY(-50%);
  background: var(--gray-800);
  color: #fff;
  padding: 4px 12px;
  border-radius: var(--radius-sm);
  font-size: 12px;
  white-space: nowrap;
  z-index: var(--z-tooltip);
  box-shadow: var(--shadow-md);
}
```

### 4.2 顶栏（Topbar）

**结构**:
```
┌─────────────────────────────────────────────────────────────────────┐
│  🏠首页 / 企业管理 / 企业基本信息     🔔  张三 ▾  │ ← 48px
├─────────────────────────────────────────────────────────────────────┤
│  [首页×] [企业信息×] [地块管理×]                         │ ← Tab栏
└─────────────────────────────────────────────────────────────────────┘
```

**尺寸规范**:
| Token | Value | Usage |
|-------|-------|-------|
| `--topbar-height` | 48px | 顶栏主区域高度 |
| `--topbar-tab-height` | 36px | Tab 标签栏高度 |
| `--topbar-total-height` | 84px | 顶栏总高度（48+36） |
| `--topbar-px` | 16px | 顶栏水平内边距 |
| `--topbar-breadcrumb-gap` | 6px | 面包屑项间距 |

**Tab 标签页组件样式**:

```css
/* === Tab 栏容器 === */
.tab-bar {
  height: var(--topbar-tab-height);
  display: flex;
  align-items: stretch;
  gap: 2px;
  padding: 0 var(--topbar-px);
  background: var(--topbar-bg);
  border-bottom: 1px solid var(--topbar-border);
  overflow-x: auto;
  scrollbar-width: none;
}
.tab-bar::-webkit-scrollbar { display: none; }

/* === Tab 标签项 === */
.tab-tag {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 0 14px;
  height: 100%;
  font-size: 13px;
  font-weight: var(--font-weight-medium);
  color: var(--tab-text);
  cursor: pointer;
  border-bottom: 2px solid transparent;
  transition: all var(--transition-normal);
  white-space: nowrap;
  position: relative;
  user-select: none;
}

/* Tab Hover */
.tab-tag:hover {
  color: var(--tab-text-hover);
  background: var(--tab-bg-hover);
}

/* Tab Active */
.tab-tag.active {
  color: var(--tab-text-active);
  border-bottom-color: var(--tab-indicator);
  background: var(--tab-bg-active);
}

/* Tab 关闭按钮 */
.tab-tag-close {
  width: 16px;
  height: 16px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: var(--radius-sm);
  color: var(--tab-close);
  font-size: 12px;
  transition: all var(--transition-fast);
  margin-left: 2px;
}
.tab-tag-close:hover {
  background: var(--error-bg);
  color: var(--tab-close-hover);
}

/* Tab 禁止关闭（首页固定标签） */
.tab-tag.pinned .tab-tag-close {
  display: none;
}

/* Tab 右侧操作区 */
.tab-bar-actions {
  margin-left: auto;
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 0 8px;
}
.tab-bar-actions button {
  width: 28px;
  height: 28px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: var(--radius-sm);
  border: none;
  background: transparent;
  color: var(--text-tertiary);
  cursor: pointer;
  transition: all var(--transition-fast);
}
.tab-bar-actions button:hover {
  background: var(--gray-100);
  color: var(--text-primary);
}
```

### 4.3 顶栏右侧功能区

```css
.topbar-right {
  display: flex;
  align-items: center;
  gap: var(--space-md);
  margin-left: auto;
}

/* 通知铃铛 */
.topbar-notification {
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  cursor: pointer;
  color: var(--text-tertiary);
  transition: all var(--transition-fast);
  position: relative;
}
.topbar-notification:hover {
  background: var(--gray-100);
  color: var(--text-primary);
}
.topbar-notification .badge {
  position: absolute;
  top: 4px;
  right: 4px;
  min-width: 16px;
  height: 16px;
  padding: 0 4px;
  font-size: 10px;
}

/* 用户头像 */
.topbar-user {
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  padding: 4px 8px;
  border-radius: var(--radius-md);
  transition: background var(--transition-fast);
}
.topbar-user:hover {
  background: var(--gray-100);
}
.topbar-user-avatar {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: var(--gradient-primary);
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  font-weight: var(--font-weight-semibold);
}
.topbar-user-name {
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-medium);
  color: var(--text-primary);
}
```

---

## 5. Layout（布局）

### 5.1 双栏布局框架

```css
/* === 整体布局 === */
.app-layout {
  display: flex;
  min-height: 100vh;
}

/* === 侧边栏 === */
.sidebar {
  width: var(--sidebar-width);
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  z-index: var(--z-fixed);
  background: var(--sidebar-bg);
  display: flex;
  flex-direction: column;
  transition: width var(--sidebar-transition);
  overflow: hidden;
}

.sidebar-header {
  height: var(--sidebar-header-height);
  padding: 0 var(--sidebar-item-px);
  display: flex;
  align-items: center;
  gap: 10px;
  border-bottom: 1px solid var(--sidebar-border);
  flex-shrink: 0;
}

.sidebar-body {
  flex: 1;
  overflow-y: auto;
  overflow-x: hidden;
  padding: var(--space-sm) 0;
}

.sidebar-footer {
  height: var(--sidebar-footer-height);
  padding: 0 var(--sidebar-item-px);
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-top: 1px solid var(--sidebar-border);
  flex-shrink: 0;
}

/* === 主内容区 === */
.main-wrapper {
  margin-left: var(--sidebar-width);
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  transition: margin-left var(--sidebar-transition);
}

/* === 顶栏 === */
.topbar {
  height: var(--topbar-height);
  background: var(--topbar-bg);
  border-bottom: 1px solid var(--topbar-border);
  display: flex;
  align-items: center;
  padding: 0 var(--topbar-px);
  position: sticky;
  top: 0;
  z-index: var(--z-sticky);
}

/* === 内容区 === */
.main-content {
  flex: 1;
  padding: var(--space-lg) var(--space-xl) var(--space-3xl);
  background: var(--bg-base);
}
```

### 5.2 侧边栏滚动条定制

```css
.sidebar-body::-webkit-scrollbar {
  width: 4px;
}
.sidebar-body::-webkit-scrollbar-track {
  background: var(--sidebar-scrollbar-track);
}
.sidebar-body::-webkit-scrollbar-thumb {
  background: var(--sidebar-scrollbar-thumb);
  border-radius: 2px;
}
.sidebar-body::-webkit-scrollbar-thumb:hover {
  background: var(--sidebar-scrollbar-thumb-hover);
}
```

### 5.3 间距体系（继承现有 + 新增）

| Token | Value | Usage |
|-------|-------|-------|
| `--space-xs` | 4px | 内联间距（继承） |
| `--space-sm` | 8px | 紧凑间距（继承） |
| `--space-md` | 12px | 默认间距（继承） |
| `--space-lg` | 16px | 区块间距（继承） |
| `--space-xl` | 20px | 大间距（继承） |
| `--space-2xl` | 24px | 分区间距（继承） |
| `--space-3xl` | 32px | 大分区间距（继承） |
| `--space-4xl` | 48px | 特大间距（继承） |

---

## 6. Depth & Elevation（深度与层级）

### 6.1 Z-index 层级体系（扩展）

| Level | Value | Usage |
|-------|-------|-------|
| Base | 0 | 默认内容 |
| Sidebar | 300 | 侧边栏（使用 `--z-fixed`） |
| Topbar-sticky | 200 | 顶栏粘性定位（使用 `--z-sticky`） |
| Dropdown | 100 | 下拉菜单（继承） |
| Modal-backdrop | 400 | 模态遮罩（继承） |
| Modal | 500 | 模态框（继承） |
| Popover | 600 | 弹出层（继承） |
| Tooltip | 700 | 工具提示（继承） |
| Toast | 800 | 消息提示（继承） |
| Sidebar-overlay | 350 | 移动端侧边栏遮罩 |

### 6.2 阴影体系（侧边栏新增）

| Level | Shadow | Usage |
|-------|--------|-------|
| Sidebar-right | 2px 0 8px rgba(0,0,0,0.15) | 侧边栏右侧投影 |
| Sidebar-right-collapsed | 1px 0 4px rgba(0,0,0,0.08) | 折叠态侧边栏右侧投影 |

---

## 7. Cautions（注意事项）

### Never Do（禁止）

1. **禁止在侧边栏使用苹果绿作为大面积背景色**——苹果绿仅作为强调色（指示条、图标高亮），不再作为背景色
2. **禁止侧边栏文字使用纯黑或深灰色**——在深色背景上必须使用白色系文字 `rgba(255,255,255,*)`
3. **禁止在侧边栏使用 `--gradient-header`（绿色渐变）**——这是旧系统的顶栏渐变，已不适用
4. **禁止 Tab 标签页超过 15 个**——超过后应自动关闭最早未 active 的标签
5. **禁止二级子菜单永远展开**——当切换一级菜单时，应自动折叠非活跃的子菜单
6. **禁止在移动端侧边栏始终显示**——768px 以下应变为 overlay 模式
7. **禁止修改现有 `--primary-*` / `--accent-*` / `--gray-*` 色阶变量**——仅新增布局相关变量

### Prefer（推荐）

1. 侧边栏菜单项间距保持紧凑（2px），确保18个一级菜单在 1080px 高度屏幕上可无需滚动浏览
2. Tab 标签页使用右键菜单提供「关闭其他」「关闭全部」「关闭右侧」等批量操作
3. 侧边栏折叠时，保留图标可识别性，hover 时显示 tooltip
4. 面包屑导航与 Tab 标签页联动：切换 Tab 时面包屑同步更新
5. 当菜单项超过可视区域时，侧边栏自动滚动到 active 项位置

---

## 8. Responsive Behavior（响应式行为）

### 8.1 断点定义

| Name | Width | 侧边栏行为 | 顶栏行为 | Tab栏行为 |
|------|-------|------------|---------|----------|
| Desktop XL | ≥1440px | 展开态 240px | 完整顶栏 | 完整Tab栏 |
| Desktop | ≥1024px | 展开态 240px | 完整顶栏 | 完整Tab栏 |
| Tablet | 768-1023px | 折叠态 64px + hover展开 | 简化顶栏 | Tab栏滚动 |
| Mobile | <768px | 隐藏 + overlay唤出 | 简化顶栏+汉堡菜单 | Tab栏隐藏/下拉 |

### 8.2 响应式CSS

```css
/* === Tablet (768-1023px) === */
@media (max-width: 1023px) {
  :root {
    --sidebar-width: var(--sidebar-width-collapsed); /* 64px */
  }
  .sidebar {
    width: var(--sidebar-width-collapsed);
  }
  .sidebar .menu-text,
  .sidebar .menu-arrow,
  .sidebar .sidebar-brand-text {
    display: none;
  }
  .sidebar .sidebar-menu-item {
    justify-content: center;
    padding: 0;
  }
  .sidebar .sidebar-menu-item .menu-icon {
    width: 20px;
    height: 20px;
  }
  .main-wrapper {
    margin-left: var(--sidebar-width-collapsed);
  }
}

/* === Mobile (<768px) === */
@media (max-width: 767px) {
  .sidebar {
    transform: translateX(-100%);
    width: var(--sidebar-width); /* 展开宽度 */
    z-index: var(--z-fixed);
  }
  .sidebar.mobile-open {
    transform: translateX(0);
  }
  .sidebar .menu-text,
  .sidebar .menu-arrow,
  .sidebar .sidebar-brand-text {
    display: initial; /* 手机上展开态显示文字 */
  }
  .sidebar-overlay {
    display: none;
    position: fixed;
    inset: 0;
    background: rgba(0,0,0,0.4);
    z-index: 350;
  }
  .sidebar.mobile-open ~ .sidebar-overlay {
    display: block;
  }
  .main-wrapper {
    margin-left: 0;
  }
  .tab-bar {
    display: none; /* 手机端隐藏Tab栏 */
  }
  .topbar-hamburger {
    display: flex; /* 显示汉堡菜单 */
  }
}
```

---

## 9. Agent Prompt Guide（Agent 生成指南）

### Key Instructions

1. **侧边栏结构必须使用 `<nav>` 语义标签**，菜单项使用 `<a>` 标签确保可访问性
2. **侧边栏菜单数据必须使用 JS 对象配置**，不要硬编码到 HTML 中，方便后续维护
3. **Tab 标签页的切换/关闭逻辑必须使用原生 JS**（无框架依赖），实现 `TabManager` 类
4. **苹果绿品牌色从"背景色"转为"强调色"**——所有新增组件中苹果绿仅用于：active指示条、图标高亮、按钮CTA，不作为大面积背景
5. **侧边栏与顶栏必须独立于页面内容**——抽取为公共模板片段，各页面通过 JS 动态加载
6. **所有新增CSS变量必须在 `:root` 中声明**，不使用 `--snzg-` 前缀（保持与现有 design-system.css 一致的无前缀变量命名风格）
7. **侧边栏品牌区 Logo**：白色圆角方块底 + 苹果绿图标，与现有 `.snzg-logo-icon` 样式保持一致但适配深色背景
8. **菜单项图标**：优先使用 SVG 内联图标（参照现有 `.nav-icon` 样式），确保在深色背景上清晰可辨
9. **页面改造顺序**：先创建 `sidebar.html` + `topbar.html` 公共模板，再逐页替换内联 `<style>` 中的 header/nav 样式
10. **面包屑数据**：从侧边栏菜单结构自动推导，不需要手动配置

### Quick CSS Snippet

```css
:root {
  /* ===== 侧边栏色系（新增） ===== */
  --sidebar-bg: #1b2a41;
  --sidebar-bg-elevated: #223349;
  --sidebar-bg-hover: rgba(255,255,255,0.06);
  --sidebar-bg-active: rgba(255,255,255,0.10);
  --sidebar-border: rgba(255,255,255,0.08);
  --sidebar-text: rgba(255,255,255,0.85);
  --sidebar-text-secondary: rgba(255,255,255,0.50);
  --sidebar-text-hover: #ffffff;
  --sidebar-text-active: #ffffff;
  --sidebar-icon: rgba(255,255,255,0.55);
  --sidebar-icon-hover: rgba(255,255,255,0.85);
  --sidebar-icon-active: var(--primary-400);
  --sidebar-accent: var(--primary-500);
  --sidebar-accent-glow: rgba(34,168,74,0.25);
  --sidebar-group-title: rgba(255,255,255,0.35);
  --sidebar-scrollbar-track: rgba(255,255,255,0.04);
  --sidebar-scrollbar-thumb: rgba(255,255,255,0.12);
  --sidebar-scrollbar-thumb-hover: rgba(255,255,255,0.20);

  /* ===== 顶栏/Tab栏色系（新增） ===== */
  --topbar-bg: #ffffff;
  --topbar-border: var(--gray-200);
  --topbar-height: 48px;
  --tab-bg: transparent;
  --tab-bg-hover: var(--gray-100);
  --tab-bg-active: var(--primary-50);
  --tab-text: var(--text-secondary);
  --tab-text-hover: var(--text-primary);
  --tab-text-active: var(--primary-600);
  --tab-indicator: var(--primary-500);
  --tab-close: var(--text-disabled);
  --tab-close-hover: var(--error);
  --tab-border: var(--border-light);

  /* ===== 侧边栏尺寸（新增） ===== */
  --sidebar-width: 240px;
  --sidebar-width-collapsed: 64px;
  --sidebar-header-height: 64px;
  --sidebar-footer-height: 48px;
  --sidebar-item-height: 40px;
  --sidebar-subitem-height: 36px;
  --sidebar-item-gap: 2px;
  --sidebar-item-px: 16px;
  --sidebar-subitem-px: 48px;
  --sidebar-icon-size: 18px;
  --sidebar-icon-gap: 10px;
  --sidebar-active-bar-width: 3px;
  --sidebar-active-bar-radius: 0 3px 3px 0;
  --sidebar-transition: 0.25s cubic-bezier(0.4, 0, 0.2, 1);

  /* ===== 顶栏尺寸（新增） ===== */
  --topbar-tab-height: 36px;
  --topbar-total-height: 84px;
  --topbar-px: 16px;

  /* ===== 覆盖现有变量（框架升级） ===== */
  --bg-sidebar: #1b2a41; /* 从 #ffffff 覆盖为藏青色 */
  --gradient-header: none; /* 废弃绿色渐变顶栏 */
}
```

---

## 附录A：设计系统候选方案对比

| 方案 | 设计系统 | 匹配度 | 特征 | 适合原因 | 注意事项 |
|------|---------|--------|------|---------|---------|
| **A** | **Linear** | ★★★★★ | 深色侧边栏+浅色内容区的SaaS双栏布局标杆；侧边栏色值接近藏青色；subtle hover/active动画；左侧active指示条；Tab标签页系统 | 1. 布局结构几乎1:1匹配需求 2. 侧边栏色系天然接近#1e2a3a~#2c3e50目标 3. 18个一级菜单的导航密集度与Linear的多项目切换场景类似 4. active指示条模式（左侧3px彩色条）完全吻合 | Linear偏开发者美学，需通过苹果绿品牌色中和其冷感 |
| **B** | **HashiCorp** | ★★★★☆ | 企业级基础设施管理后台；深色侧边栏+专业信息层级；藏青色调；紧凑菜单布局 | 1. 企业级管理后台的专业调性最匹配农业管理场景 2. 藏青色侧边栏与苹果绿搭配和谐度高 3. 信息密集的菜单结构适合18+一级菜单 4. 稳重感更符合30-55岁非技术用户群 | HashiCorp偏基础设施运维，信息密度极高，需适当降低密度以适配农业场景 |
| **C** | **ClickHouse** | ★★★☆☆ | 数据分析平台；深色侧边栏+数据密集内容区；Tab标签页导航 | 1. Tab标签页导航模式可直接参考 2. 深色侧边栏与数据展示区的配色方案可借鉴 3. 企业级数据分析的视觉风格有参考价值 | ClickHouse更偏数据仪表盘，与管理后台场景有差异；侧边栏偏窄、更紧凑 |

**推荐方案**：**方案A（Linear）**作为主参考，融合方案B（HashiCorp）的企业级专业感和菜单分组模式。

---

## 附录B：与现有 design-system.css 对接方案

### 变量映射表

| 现有变量 | 当前值 | 新值/用法 | 变更类型 |
|---------|--------|----------|---------|
| `--bg-sidebar` | #ffffff | #1b2a41 | **覆盖** |
| `--gradient-header` | 绿色渐变 | none（废弃） | **废弃** |
| `--bg-hover` | rgba(34,168,74,0.04) | 保持（仅用于内容区） | 不变 |
| `--bg-active` | rgba(34,168,74,0.08) | 保持（仅用于内容区） | 不变 |

### 新增变量清单

所有以 `--sidebar-`、`--topbar-`、`--tab-` 为前缀的变量均为新增，不会覆盖或冲突现有变量。

### 需删除的旧组件样式

以下旧组件样式在改造后将被侧边栏/顶栏新组件替代，需从各页面内联 `<style>` 中移除：
- `.header`（旧绿色渐变顶栏）
- `.nav-menu`（旧水平导航）
- `.snzg-nav-item`（旧导航项）
- `.snzg-nav-sep`（旧导航分隔符）
- `.jg-hamburger`（旧汉堡菜单 → 替换为新的移动端方案）
- `.jg-mobile-nav`（旧移动端导航 → 替换为新的 overlay 侧边栏）

### 组件类名映射

| 旧类名 | 新类名 | 说明 |
|--------|--------|------|
| `.header` | `.topbar` | 顶栏从绿色渐变改为白色 |
| `.nav-menu` | `.sidebar-body` | 水平导航 → 垂直侧边栏 |
| `.snzg-nav-item` | `.sidebar-menu-item` | 导航项重新定义 |
| — | `.sidebar-submenu-item` | 新增二级菜单项 |
| — | `.tab-bar` / `.tab-tag` | 新增 Tab 标签页 |
| `.snzg-logo-icon` | `.sidebar-logo` | Logo 适配深色背景 |

---

## 附录C：侧边栏菜单结构数据

```javascript
const MENU_CONFIG = [
  { id: 'home', icon: 'home', label: '系统首页', path: 'home.html' },
  {
    id: 'enterprise', icon: 'building', label: '企业管理',
    children: [
      { id: 'enterprise-base', label: '企业基本信息', path: 'enterprise_base.html' },
      { id: 'enterprise-plot', label: '地块管理', path: 'enterprise_plot.html' },
    ]
  },
  {
    id: 'farming', icon: 'sprout', label: '农事管理',
    children: [
      { id: 'farming-plan', label: '农事计划', path: 'farming_plan.html' },
      { id: 'farming-record', label: '农事记录', path: 'farming_record.html' },
      { id: 'farming-patrol', label: '巡园管理', path: 'farming_patrol.html' },
    ]
  },
  {
    id: 'material', icon: 'package', label: '农资管理',
    children: [
      { id: 'material-info', label: '农资信息', path: 'material_info.html' },
      { id: 'material-inventory', label: '农资库存', path: 'material_inventory.html' },
      { id: 'material-io', label: '农资出入库', path: 'material_io.html' },
      { id: 'material-return', label: '农资退货', path: 'material_return.html' },
      { id: 'material-supplier', label: '农资供应商', path: 'material_supplier.html' },
      { id: 'material-usage', label: '农资使用', path: 'material_usage.html' },
    ]
  },
  {
    id: 'device', icon: 'cpu', label: '设备管理',
    children: [
      { id: 'device-monitor', label: '设备监控', path: 'device_monitor.html' },
      { id: 'device-info', label: '设备信息', path: 'device_info.html' },
      { id: 'device-log', label: '设备日志', path: 'device_log.html' },
      { id: 'device-maintain', label: '设备维护', path: 'device_maintain.html' },
    ]
  },
  { id: 'drone', icon: 'plane', label: '无人机', path: 'drone_patrol.html',
    children: [
      { id: 'drone-patrol', label: '无人机巡检', path: 'drone_patrol.html' },
    ]
  },
  {
    id: 'alert', icon: 'alert-triangle', label: '预警管理',
    children: [
      { id: 'alert-device', label: '设备预警', path: 'alert_device.html' },
      { id: 'alert-farming', label: '农事预警', path: 'alert_farming.html' },
      { id: 'alert-internal', label: '内部报告', path: 'alert_internal_report.html' },
      { id: 'alert-settings', label: '预警设置', path: 'alert_settings.html' },
    ]
  },
  {
    id: 'trace', icon: 'shield', label: '产品追溯',
    children: [
      { id: 'trace-code', label: '溯源编码', path: 'trace_code.html' },
      { id: 'trace-query', label: '溯源查询', path: 'trace_query.html' },
      { id: 'trace-blockchain', label: '溯源区块链', path: 'trace_blockchain.html' },
      { id: 'trace-config', label: '溯源配置', path: 'trace_config.html' },
    ]
  },
  {
    id: 'harvest', icon: 'shopping-bag', label: '采收管理',
    children: [
      { id: 'harvest-plan', label: '采收计划', path: 'harvest_plan.html' },
      { id: 'harvest-record', label: '采收记录', path: 'harvest_record.html' },
      { id: 'harvest-post', label: '采收发货', path: 'harvest_post.html' },
    ]
  },
  {
    id: 'adoption', icon: 'heart', label: '认养管理',
    children: [
      { id: 'adoption-tree', label: '认养树木', path: 'adoption_tree.html' },
      { id: 'adoption-farming', label: '认养农事', path: 'adoption_farming.html' },
      { id: 'adoption-harvest', label: '认养采收', path: 'adoption_harvest.html' },
      { id: 'adoption-order', label: '认养订单', path: 'adoption_order.html' },
    ]
  },
  {
    id: 'model', icon: 'brain', label: '模型预测',
    children: [
      { id: 'model-config', label: '模型配置', path: 'model_config.html' },
      { id: 'model-growth', label: '生长模型', path: 'model_growth.html' },
      { id: 'model-pest', label: '病虫害模型', path: 'model_pest.html' },
      { id: 'model-phenology', label: '物候模型', path: 'model_phenology.html' },
      { id: 'model-price', label: '价格模型', path: 'model_price.html' },
      { id: 'model-weather', label: '气象模型', path: 'model_weather.html' },
      { id: 'model-yield', label: '产量模型', path: 'model_yield.html' },
    ]
  },
  {
    id: 'sales', icon: 'trending-up', label: '销售管理',
    children: [
      { id: 'sales-order', label: '销售订单', path: 'sales_order.html' },
      { id: 'sales-customer', label: '客户管理', path: 'sales_customer.html' },
      { id: 'sales-statistics', label: '销售统计', path: 'sales_statistics.html' },
    ]
  },
  {
    id: 'performance', icon: 'bar-chart', label: '绩效看板',
    children: [
      { id: 'performance-dashboard', label: '绩效看板', path: 'performance_dashboard.html' },
      { id: 'performance-detail', label: '绩效详情', path: 'performance_detail.html' },
    ]
  },
  {
    id: 'report', icon: 'file-text', label: '报表中心',
    children: [
      { id: 'report-overview', label: '报表总览', path: 'report_overview.html' },
      { id: 'report-cost', label: '成本报表', path: 'report_cost.html' },
      { id: 'report-revenue', label: '营收报表', path: 'report_revenue.html' },
      { id: 'report-profit', label: '利润报表', path: 'report_profit.html' },
    ]
  },
  {
    id: 'cert', icon: 'award', label: '证书管理',
    children: [
      { id: 'cert-manage', label: '证书管理', path: 'cert_manage.html' },
      { id: 'cert-query', label: '证书查询', path: 'cert_query.html' },
      { id: 'cert-issue', label: '证书签发', path: 'cert_issue.html' },
    ]
  },
  {
    id: 'task', icon: 'clock', label: '任务调度',
    children: [
      { id: 'task-schedule', label: '任务调度', path: 'task_schedule.html' },
      { id: 'task-assign', label: '任务分配', path: 'task_assign.html' },
    ]
  },
  {
    id: 'guide', icon: 'book-open', label: '农事指南',
    children: [
      { id: 'guide-standard', label: '农事标准', path: 'guide_standard.html' },
      { id: 'guide-calculator', label: '农事计算器', path: 'guide_calculator.html' },
    ]
  },
  {
    id: 'settings', icon: 'settings', label: '系统设置',
    children: [
      { id: 'system-settings', label: '系统设置', path: 'system_settings.html' },
      { id: 'user-settings', label: '用户设置', path: 'user_settings.html' },
    ]
  },
];
```
