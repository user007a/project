# 智慧果园后台管理端 - 侧边栏框架应用指南

> **文档版本**: v1.0  
> **适用系统**: 智慧果园后台管理系统（数农智果）  
> **框架版本**: Sidebar Layout v2.0  
> **更新日期**: 2025-01-18

---

## 一、新框架结构说明

### 1.1 框架升级对比

| 项目 | 旧框架（顶部导航） | 新框架（侧边栏布局） |
|------|-------------------|---------------------|
| 导航位置 | 顶部横向导航栏 | 左侧纵向侧边栏 |
| 顶部区域 | 绿色横栏（56px） | 白色顶栏（48px）+ Tab栏（36px） |
| 菜单组织形式 | 一级菜单横向排列 | 多级树形菜单，支持折叠/展开 |
| 页面切换 | 整页刷新 | Tab标签页切换（类浏览器标签） |
| 响应式 | 移动端汉堡菜单 | 侧边栏可收缩，移动端Overlay模式 |
| 品牌色 | 绿色渐变 `#22a84a` | 侧边栏深蓝 `#1b2a41`，品牌色保留 |

### 1.2 新框架HTML结构

```html
<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>页面标题 - 数农智果</title>
  <!-- 设计系统样式 -->
  <link rel="stylesheet" href="css/design-system.css">
  <!-- 侧边栏布局样式 -->
  <link rel="stylesheet" href="css/sidebar-layout.css">
</head>
<body>
  <!-- 整体布局容器 -->
  <div class="app-layout">
    
    <!-- ===== 左侧边栏 ===== -->
    <nav class="sidebar" aria-label="主导航">
      <!-- 品牌区 -->
      <div class="sidebar-header">
        <div class="sidebar-logo">
          <!-- SVG Logo -->
        </div>
        <span class="sidebar-brand-text">数农智果</span>
      </div>
      
      <!-- 菜单主体（JS动态渲染） -->
      <div class="sidebar-body"></div>
      
      <!-- 底部功能区 -->
      <div class="sidebar-footer">
        <button class="sidebar-footer-btn sidebar-collapse-btn" title="折叠侧边栏">
          <!-- 折叠图标 -->
          <span class="btn-text">折叠</span>
        </button>
        <button class="sidebar-footer-btn" title="系统设置" id="btn-settings">
          <!-- 设置图标 -->
          <span class="btn-text">设置</span>
        </button>
      </div>
    </nav>

    <!-- 移动端遮罩层 -->
    <div class="sidebar-overlay"></div>

    <!-- ===== 右侧主内容区 ===== -->
    <div class="main-wrapper">
      
      <!-- 顶栏 -->
      <header class="topbar">
        <!-- 移动端汉堡菜单 -->
        <button class="topbar-hamburger" aria-label="打开导航菜单">
          <!-- 汉堡图标 -->
        </button>
        
        <!-- 面包屑导航 -->
        <div class="breadcrumb">
          <span class="breadcrumb-item">
            <a class="breadcrumb-link">首页</a>
          </span>
        </div>
        
        <!-- 右侧功能区 -->
        <div class="topbar-right">
          <!-- 通知铃铛 -->
          <button class="topbar-notification">
            <!-- 铃铛图标 -->
          </button>
          
          <!-- 用户信息 -->
          <div class="topbar-user">
            <div class="topbar-user-avatar">张</div>
            <span class="topbar-user-name">张三</span>
          </div>
        </div>
      </header>

      <!-- Tab 标签栏 -->
      <div class="tab-bar">
        <!-- Tab标签由JS动态渲染 -->
        <div class="tab-bar-actions">
          <button class="tab-close-all" title="关闭全部标签">×</button>
        </div>
      </div>

      <!-- 主内容区 -->
      <main class="main-content">
        <!-- 原有业务内容放在这里 -->
        <div class="page-header">
          <h1 class="page-title">页面标题</h1>
          <p class="page-desc">页面描述</p>
        </div>
        
        <!-- 业务内容区 -->
        ...
      </main>
    </div>
  </div>

  <!-- 侧边栏交互脚本 -->
  <script src="js/sidebar-layout.js"></script>
</body>
</html>
```

### 1.3 核心CSS类说明

| CSS类 | 作用 | 位置 |
|-------|------|------|
| `.app-layout` | 整体布局容器，使用flex布局 | 最外层 |
| `.sidebar` | 左侧边栏，固定宽度240px | 左侧 |
| `.sidebar-header` | 侧边栏顶部品牌区 | 侧边栏内 |
| `.sidebar-body` | 侧边栏菜单主体，可滚动 | 侧边栏内 |
| `.sidebar-footer` | 侧边栏底部功能按钮 | 侧边栏内 |
| `.main-wrapper` | 右侧主内容区容器 | 右侧 |
| `.topbar` | 顶部白色顶栏 | main-wrapper内 |
| `.breadcrumb` | 面包屑导航 | topbar内 |
| `.tab-bar` | Tab标签栏 | topbar下方 |
| `.main-content` | 主内容区，实际业务内容所在 | tab-bar下方 |
| `.sidebar-menu-item` | 一级菜单项 | 侧边栏菜单 |
| `.sidebar-submenu-item` | 二级子菜单项 | 侧边栏菜单 |
| `.tab-tag` | Tab标签项 | Tab栏 |
| `.collapsed` | 侧边栏折叠状态 | 侧边栏 |

---

## 二、应用步骤（逐步指南）

### 步骤1：备份现有文件

在修改前，请先备份所有需要修改的HTML文件：

```bash
# 在项目根目录执行
cp -r applefarm_backhand applefarm_backhand_backup_20250118
```

### 步骤2：复制新框架资源文件

确保以下文件已存在于项目中：

```
applefarm_backhand/
├── css/
│   ├── design-system.css      # 原有设计系统（保留）
│   └── sidebar-layout.css    # 新侧边栏布局样式
├── js/
│   └── sidebar-layout.js     # 新侧边栏交互脚本
└── layout-frame.html          # 框架模板参考文件
```

### 步骤3：修改单个HTML文件

以 `home.html` 为例，按以下顺序修改：

#### 3.1 替换 `<head>` 中的样式引用

**删除：**
```html
<!-- 删除旧顶部导航的内联样式 -->
<style>
/* ===== 顶部导航增强 ===== */
.header { ... }
.nav-menu { ... }
...
</style>
```

**添加：**
```html
<!-- 保留原有设计系统 -->
<link rel="stylesheet" href="css/design-system.css">
<!-- 引入新侧边栏布局样式 -->
<link rel="stylesheet" href="css/sidebar-layout.css">
```

#### 3.2 删除旧的顶部导航HTML

**删除以下HTML结构：**
```html
<!-- 删除整个顶部导航 -->
<header class="header">
  <div class="logo">...</div>
  <nav class="nav-menu" id="navMenu">...</nav>
  <button class="jg-hamburger" id="hamburgerBtn">...</button>
  <div class="header-right">...</div>
</header>

<!-- 删除移动端导航 -->
<div class="jg-mobile-nav" id="mobileNav">...</div>
```

#### 3.3 添加新框架HTML结构

在 `<body>` 标签后，添加完整的新框架结构（参考本文档"1.2 新框架HTML结构"）。

**关键点：**
- 保留原有的 `.main-wrap` 中的业务内容
- 将业务内容移动到 `.main-content` 内部
- 删除原有的 `.main-wrap` 包裹层

#### 3.4 引入侧边栏交互脚本

在 `</body>` 标签前添加：

```html
<script src="js/sidebar-layout.js"></script>
```

#### 3.5 配置菜单高亮

在 `sidebar-layout.js` 中，找到以下代码段：

```javascript
sidebarManager = new SidebarManager({
  menuConfig: MENU_CONFIG,
  activeMenuId: 'home',  // ← 修改这里！每个页面设置为对应的菜单ID
  ...
});
```

**各页面菜单ID对照表：**

| 页面文件 | activeMenuId | 菜单名称 |
|---------|--------------|---------|
| home.html | `home` | 系统首页 |
| enterprice_base.html | `enterprice-base` | 企业基本信息 |
| farming_plan.html | `farming-plan` | 农事计划 |
| material_info.html | `material-info` | 农资信息 |
| device_monitor.html | `device-monitor` | 设备监控 |
| alert_device.html | `alert-device` | 设备预警 |
| trace_code.html | `trace-code` | 溯源编码 |
| harvest_plan.html | `harvest-plan` | 采收计划 |
| adoption_tree.html | `adoption-tree` | 认养树木 |
| model_growth.html | `model-growth` | 生长模型 |
| sales_order.html | `sales-order` | 销售订单 |
| system_settings.html | `system-settings` | 系统设置 |

> **注意**：每个页面的 `activeMenuId` 需要手动设置，或使用JS自动匹配（推荐）。

### 步骤4：批量修改其他61个页面

**方法一：手动修改（推荐用于前几个页面，熟悉流程）**

重复步骤3，逐个修改每个页面。

**方法二：使用正则表达式批量替换（适用于VS Code等编辑器）**

#### 4.1 删除旧顶部导航CSS（正则表达式）

**查找：**
```regex
/<style>[\s\S]*?\/\* ===== 顶部导航增强 ===== \*\/[\s\S]*?<\/style>/
```

**替换为：**
```html
<link rel="stylesheet" href="css/sidebar-layout.css">
```

#### 4.2 删除旧顶部导航HTML

**查找：**
```regex
<!-- 顶部导航 -->[\s\S]*?<!-- 移动端导航 -->[\s\S]*?<\/div>[\s\S]*?<!-- 主体 -->[\s\S]*?<div class="main-wrap">/
```

**替换为：**
```html
<!-- 新框架结构 -->
<div class="app-layout">
  <!-- 侧边栏 -->
  <nav class="sidebar">...</nav>
  
  <!-- 主内容区 -->
  <div class="main-wrapper">
    <header class="topbar">...</header>
    <div class="tab-bar">...</div>
    <main class="main-content">
```

> **注意**：正则表达式仅作参考，实际HTML结构可能有差异，建议手动调整。

**方法三：使用脚本自动化（适用于大量页面）**

创建一个Node.js脚本：

```javascript
// convert-to-sidebar.js
const fs = require('fs');
const path = require('path');

const files = fs.readdirSync('./').filter(f => f.endsWith('.html'));

files.forEach(file => {
  let content = fs.readFileSync(file, 'utf-8');
  
  // 1. 添加CSS引用
  content = content.replace(
    '<link rel="stylesheet" href="css/design-system.css">',
    '<link rel="stylesheet" href="css/design-system.css">\n<link rel="stylesheet" href="css/sidebar-layout.css">'
  );
  
  // 2. 删除旧导航（需要根据实际HTML结构调整）
  // ...
  
  // 3. 添加新框架结构
  // ...
  
  fs.writeFileSync(file, content);
  console.log(`已转换: ${file}`);
});
```

---

## 三、菜单配置说明

### 3.1 菜单数据结构

在 `sidebar-layout.js` 中，`MENU_CONFIG` 定义了所有菜单项：

```javascript
const MENU_CONFIG = [
  { 
    id: 'home',                  // 菜单唯一ID
    icon: 'home',               // 图标名称（对应MENU_ICONS中的key）
    label: '系统首页',          // 显示文本
    path: 'home.html'           // 点击后跳转的路径
  },
  { 
    id: 'enterprise', 
    icon: 'building', 
    label: '企业管理',
    children: [                 // 子菜单（二级菜单）
      { id: 'enterprise-base', label: '企业基本信息', path: 'enterprise_base.html' },
      { id: 'enterprise-plot', label: '地块管理', path: 'enterprise_plot.html' },
    ]
  },
  // ... 更多菜单项
];
```

### 3.2 如何添加新菜单项

**添加一级菜单（无子菜单）：**

```javascript
{
  id: 'new-module',              // 唯一ID，使用kebab-case
  icon: 'icon-name',            // 图标名，需在MENU_ICONS中定义
  label: '新模块',              // 显示文本
  path: 'new_module.html'       // 页面路径
}
```

**添加带子菜单的一级菜单：**

```javascript
{
  id: 'new-parent',
  icon: 'icon-name',
  label: '新父菜单',
  children: [
    { id: 'new-child-1', label: '子菜单1', path: 'child1.html' },
    { id: 'new-child-2', label: '子菜单2', path: 'child2.html' },
  ]
}
```

### 3.3 图标库说明

`sidebar-layout.js` 顶部定义了 `MENU_ICONS` 对象，包含18×18px的SVG图标。

**现有图标列表：**
- `home` - 首页
- `building` - 企业管理
- `sprout` - 农事管理
- `package` - 农资管理
- `cpu` - 设备管理
- `plane` - 无人机
- `alert-triangle` - 预警管理
- `shield` - 产品追溯
- `shopping-bag` - 采收管理
- `heart` - 认养管理
- `brain` - 模型预测
- `trending-up` - 销售管理
- `bar-chart` - 绩效看板
- `file-text` - 报表中心
- `award` - 证书管理
- `clock` - 任务调度
- `book-open` - 农事指南
- `settings` - 系统设置

**添加自定义图标：**

在 `MENU_ICONS` 对象中添加：

```javascript
const MENU_ICONS = {
  // ... 现有图标
  'custom-icon': '<svg viewBox="0 0 18 18" fill="none" stroke="currentColor" stroke-width="1.5">...</svg>',
};
```

---

## 四、常见问题排查

### 问题1：侧边栏不显示或显示不完整

**可能原因：**
- `sidebar-layout.css` 文件路径错误
- JS脚本未正确加载
- `sidebar-body` 元素未找到

**解决方法：**
```javascript
// 在浏览器控制台执行
console.log(document.querySelector('.sidebar-body'));
// 如果输出null，说明HTML结构有问题

// 检查CSS是否加载
document.querySelector('link[href*="sidebar-layout.css"]');
```

### 问题2：菜单高亮不正确

**可能原因：**
- `activeMenuId` 配置错误
- URL路径匹配失败

**解决方法：**

在 `sidebar-layout.js` 中，确保 `activeMenuId` 正确：

```javascript
sidebarManager = new SidebarManager({
  menuConfig: MENU_CONFIG,
  activeMenuId: 'home',  // ← 根据实际页面修改
  ...
});
```

或使用自动匹配（推荐）：

```javascript
// 在初始化后添加
const currentPath = window.location.pathname;
sidebarManager.setActiveByPath(currentPath);
```

### 问题3：Tab标签不工作

**可能原因：**
- `TabManager` 未初始化
- `.tab-bar` 元素未找到

**解决方法：**

检查 `sidebar-layout.js` 底部初始化代码是否完整：

```javascript
tabManager = new TabManager({
  maxTabs: 15,
  onTabSwitch: (id, tab) => {
    // Tab切换回调
  }
});
tabManager.init();
```

### 问题4：响应式布局在移动端不正常

**可能原因：**
- `viewport` meta标签缺失
- CSS媒体查询未生效

**解决方法：**

确保 `<head>` 中有：

```html
<meta name="viewport" content="width=device-width, initial-scale=1.0">
```

检查CSS中的媒体查询：

```css
@media (max-width: 767px) {
  .sidebar {
    transform: translateX(-100%);
  }
  /* ... */
}
```

### 问题5：原有业务功能失效

**可能原因：**
- 删除了必要的JS代码
- CSS样式冲突

**解决方法：**

1. **不要删除**原有的业务相关JS代码，只删除与旧导航相关的JS
2. 检查CSS冲突，使用浏览器开发者工具查看元素样式
3. 如果原有样式依赖 `.main-wrap`，在新框架中需要保留该类名或更新样式：

```css
/* 在 sidebar-layout.css 末尾添加 */
.main-wrap {
  /* 保留原有样式，或将其迁移到 .main-content */
}
```

### 问题6：侧边栏折叠后无法展开

**可能原因：**
- 折叠按钮事件未绑定
- `localStorage` 状态异常

**解决方法：**

清除 localStorage 状态：

```javascript
// 在浏览器控制台执行
localStorage.removeItem('sidebar-collapsed');
location.reload();
```

检查折叠按钮：

```javascript
const collapseBtn = document.querySelector('.sidebar-collapse-btn');
console.log(collapseBtn);  // 应该是button元素
collapseBtn.addEventListener('click', () => {
  console.log('折叠按钮被点击');
});
```

---

## 五、最佳实践建议

### 5.1 逐步迁移策略

不要一次性修改所有62个页面，建议按以下顺序：

1. **第1周**：修改 `home.html` 和另外2-3个常用页面，测试新框架
2. **第2周**：修改主要业务模块（农事、农资、设备）的页面
3. **第3周**：修改剩余页面
4. **第4周**：全面测试和优化

### 5.2 保留旧框架作为备用

在完全切换前，保留旧框架文件：

```
applefarm_backhand/
├── home.html                    # 新框架版本
├── home-legacy.html             # 旧框架备份
└── ...
```

### 5.3 使用模板文件快速创建新页面

基于 `layout-frame.html` 创建新页面时：

1. 复制 `layout-frame.html`
2. 重命名为新页面名称
3. 修改 `<title>` 和 `activeMenuId`
4. 在 `.main-content` 中添加业务内容

### 5.4 自定义样式隔离

如果某个页面需要特殊的自定义样式，在 `.main-content` 内添加 `<style>` 标签：

```html
<main class="main-content">
  <style>
    /* 页面专用样式 */
    .page-specific-class { ... }
  </style>
  
  <!-- 业务内容 -->
  ...
</main>
```

---

## 六、技术支持与反馈

### 6.1 相关文件清单

| 文件 | 路径 | 说明 |
|------|------|------|
| 侧边栏样式 | `css/sidebar-layout.css` | 新框架所有样式 |
| 侧边栏脚本 | `js/sidebar-layout.js` | 菜单渲染、Tab管理、交互逻辑 |
| 框架模板 | `layout-frame.html` | 完整的HTML结构参考 |
| 应用指南 | `FRAMEWORK-APPLY-GUIDE.md` | 本文档 |
| 改造示例 | `home-new.html` | home.html应用新框架后的版本 |
| 验证清单 | `VALIDATION-CHECKLIST.md` | 测试检查清单 |

### 6.2 质量审查记录

- **审查轮次**: 3轮
- **审查评分**: 18/25（5维）
- **审查结论**: 通过
- **审查日期**: 2025-01-18
- **审查人**: 严过审

### 6.3 版本历史

| 版本 | 日期 | 说明 |
|------|------|------|
| v1.0 | 2025-01-18 | 初始版本，基于设计系统v2.0 |

---

**文档结束**

> 如有问题，请参考 `VALIDATION-CHECKLIST.md` 进行逐项检查，或查看 `home-new.html` 示例代码。
