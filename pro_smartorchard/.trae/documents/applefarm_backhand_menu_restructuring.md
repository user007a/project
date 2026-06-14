# 数农智果 - 后台菜单结构重组任务计划

> 创建时间：2026-06-14
> 状态：待执行
> 负责人：待定

---

## 一、背景分析

### 1.1 现有系统架构（已优化）

项目已具备完善的侧边栏布局系统：

| 组件 | 文件 | 职责 |
|------|------|------|
| **侧边栏管理器** | `sidebar-layout.js` | 菜单渲染、折叠/展开、移动端汉堡菜单 |
| **Tab管理器** | `sidebar-layout.js` | 标签页管理、切换、右键菜单 |
| **样式系统** | `sidebar-layout.css` | 响应式布局、主题配色、动画效果 |
| **框架页** | `layout-frame.html` | iframe模式页面框架 |

### 1.2 当前菜单结构问题

| 问题类型 | 具体描述 | 影响 |
|---------|---------|------|
| 分类不统一 | 按业务、按对象、按类型混用 | 用户难以快速定位功能 |
| 零散菜单 | 无人机只有1个子菜单却独立一级 | 菜单层级不合理 |
| 业务断裂 | 采收管理与认养管理分离 | 不符合业务闭环 |
| 名称不一致 | 部分叫"农资"、部分叫"农资管理" | 命名不规范 |

### 1.3 重组目标

- 简化一级菜单数量：从 18 个减少到 12 个
- 按业务闭环分类：计划 → 执行 → 监控 → 分析 → 收益
- 统一命名规范
- **保持原有导航方式和Tab切换逻辑不变**

---

## 二、最终重组方案

### 2.1 重组后菜单结构（共 12 个一级菜单）

| 序号 | 一级菜单 | 图标 | 子菜单数量 | 子菜单列表 |
|------|----------|------|-----------|-----------|
| 1 | 首页 | home | 0 | 无子菜单 |
| 2 | 生产管理 | sprout | 8 | 农事计划、农事记录、巡园管理、无人机巡检、采收计划、采收记录、采收发货、农事标准 |
| 3 | 物资管理 | package | 6 | 农资信息、农资库存、农资出入库、农资退货、农资供应商、农资使用 |
| 4 | 设备管理 | cpu | 4 | 设备监控、设备信息、设备日志、设备维护 |
| 5 | 预警管理 | alert-triangle | 4 | 设备预警、农事预警、内部报告、预警设置 |
| 6 | 产品溯源 | shield | 5 | 溯源编码、溯源查询、溯源区块链、溯源配置、VR全景 |
| 7 | 销售运营 | trending-up | 7 | 认养树木、认养农事、认养采收、认养订单、销售订单、客户管理、销售统计 |
| 8 | AI模型 | brain | 7 | 模型配置、生长模型、病虫害模型、物候模型、价格模型、气象模型、产量模型 |
| 9 | 报表统计 | bar-chart | 6 | 报表总览、成本报表、营收报表、利润报表、绩效看板、绩效详情 |
| 10 | 企业管理 | building | 5 | 企业基本信息、地块管理、证书管理、证书查询、证书签发 |
| 11 | 系统运维 | settings | 4 | 系统设置、用户设置、任务调度、任务分配 |
| 12 | 农事工具 | book-open | 1 | 农事计算器 |

### 2.2 模块合并说明

| 新模块 | 合并来源 | 合并理由 |
|--------|---------|---------|
| 生产管理 | 农事管理 + 无人机 + 采收管理 + 农事指南 | 完整的生产业务闭环 |
| 物资管理 | 农资管理 | 更通用的命名 |
| 预警管理 | 原预警管理 | 保持独立 |
| 产品溯源 | 原产品追溯 | 独立溯源业务线，新增VR全景 |
| 销售运营 | 认养管理 + 销售管理 | 完整的销售营收链 |
| AI模型 | 原模型预测 | 突出AI能力 |
| 报表统计 | 报表中心 + 绩效看板 | 数据分析统一入口 |
| 企业管理 | 企业管理 + 证书管理 | 企业基础信息统一管理 |
| 系统运维 | 系统设置 + 任务调度 | 运维功能统一 |
| 农事工具 | 农事计算器 | 独立工具入口 |

---

## 三、关键技术要点（不破坏原有导航）

### 3.1 导航方式保持不变

现有导航机制：
```javascript
// 框架页模式：iframe加载 + Tab同步
onMenuSelect = (id, menuData) => {
  const iframe = document.getElementById('mainFrame');
  if (iframe && menuData.path) {
    iframe.src = menuData.path;
  }
  if (typeof window.syncTab === 'function') {
    window.syncTab(menuData.path || '', menuData.label || '');
  }
};

// 普通页模式：Tab管理 + 页面导航
onMenuSelect = (id, menuData) => {
  if (tabManager) {
    tabManager.addTab(id, label, path);
  }
  if (menuData.path) {
    window.location.href = menuData.path;
  }
};
```

**保持不变**：只需修改 `MENU_CONFIG` 数据结构，不改动导航逻辑。

### 3.2 Tab切换逻辑保持不变

```javascript
// Tab切换回调（保持不变）
onTabSwitch: (id, tab) => {
  if (sidebarManager) {
    sidebarManager._setActive(id);  // 同步侧边栏高亮
  }
  if (tab && tab.path) {
    window.location.href = tab.path;  // 页面跳转
  }
}
```

---

## 四、需要修改的文件清单

| 序号 | 文件路径 | 修改内容 | 优先级 |
|------|---------|---------|--------|
| 1 | `html/applefarm_backhand/js/sidebar-layout.js` | 更新 MENU_CONFIG（第760-852行） | P0 |
| 2 | `html/applefarm_backhand/home.html` | 调整首页模块快捷入口顺序（第717-788行） | P0 |
| 3 | `html/applefarm_backhand/layout-frame.html` | 同步更新（可选） | P1 |

---

## 五、具体修改步骤

### 步骤 1：更新 sidebar-layout.js 的 MENU_CONFIG

**文件路径**: `d:\dev\GitHub\project\pro_smartorchard\html\applefarm_backhand\js\sidebar-layout.js`

**修改内容**: 替换第 760-852 行的 MENU_CONFIG

```javascript
/* 菜单配置数据 */
const MENU_CONFIG = [
  { id: 'home', icon: 'home', label: '首页', path: 'home.html' },

  { id: 'production', icon: 'sprout', label: '生产管理', children: [
    { id: 'farming-plan', label: '农事计划', path: 'farming_plan.html' },
    { id: 'farming-record', label: '农事记录', path: 'farming_record.html' },
    { id: 'farming-patrol', label: '巡园管理', path: 'farming_patrol.html' },
    { id: 'drone-patrol', label: '无人机巡检', path: 'drone_patrol.html' },
    { id: 'harvest-plan', label: '采收计划', path: 'harvest_plan.html' },
    { id: 'harvest-record', label: '采收记录', path: 'harvest_record.html' },
    { id: 'harvest-post', label: '采收发货', path: 'harvest_post.html' },
    { id: 'guide-standard', label: '农事标准', path: 'guide_standard.html' },
  ]},

  { id: 'material', icon: 'package', label: '物资管理', children: [
    { id: 'material-info', label: '农资信息', path: 'material_info.html' },
    { id: 'material-inventory', label: '农资库存', path: 'material_inventory.html' },
    { id: 'material-io', label: '农资出入库', path: 'material_io.html' },
    { id: 'material-return', label: '农资退货', path: 'material_return.html' },
    { id: 'material-supplier', label: '农资供应商', path: 'material_supplier.html' },
    { id: 'material-usage', label: '农资使用', path: 'material_usage.html' },
  ]},

  { id: 'device', icon: 'cpu', label: '设备管理', children: [
    { id: 'device-monitor', label: '设备监控', path: 'device_monitor.html' },
    { id: 'device-info', label: '设备信息', path: 'device_info.html' },
    { id: 'device-log', label: '设备日志', path: 'device_log.html' },
    { id: 'device-maintain', label: '设备维护', path: 'device_maintain.html' },
  ]},

  { id: 'alert', icon: 'alert-triangle', label: '预警管理', children: [
    { id: 'alert-device', label: '设备预警', path: 'alert_device.html' },
    { id: 'alert-farming', label: '农事预警', path: 'alert_farming.html' },
    { id: 'alert-internal', label: '内部报告', path: 'alert_internal_report.html' },
    { id: 'alert-settings', label: '预警设置', path: 'alert_settings.html' },
  ]},

  { id: 'trace', icon: 'shield', label: '产品溯源', children: [
    { id: 'trace-code', label: '溯源编码', path: 'trace_code.html' },
    { id: 'trace-query', label: '溯源查询', path: 'trace_query.html' },
    { id: 'trace-blockchain', label: '溯源区块链', path: 'trace_blockchain.html' },
    { id: 'trace-config', label: '溯源配置', path: 'trace_config.html' },
    { id: 'vr-panorama', label: 'VR全景', path: 'vr_panorama.html' },
  ]},

  { id: 'sales', icon: 'trending-up', label: '销售运营', children: [
    { id: 'adoption-tree', label: '认养树木', path: 'adoption_tree.html' },
    { id: 'adoption-farming', label: '认养农事', path: 'adoption_farming.html' },
    { id: 'adoption-harvest', label: '认养采收', path: 'adoption_harvest.html' },
    { id: 'adoption-order', label: '认养订单', path: 'adoption_order.html' },
    { id: 'sales-order', label: '销售订单', path: 'sales_order.html' },
    { id: 'sales-customer', label: '客户管理', path: 'sales_customer.html' },
    { id: 'sales-statistics', label: '销售统计', path: 'sales_statistics.html' },
  ]},

  { id: 'model', icon: 'brain', label: 'AI模型', children: [
    { id: 'model-config', label: '模型配置', path: 'model_config.html' },
    { id: 'model-growth', label: '生长模型', path: 'model_growth.html' },
    { id: 'model-pest', label: '病虫害模型', path: 'model_pest.html' },
    { id: 'model-phenology', label: '物候模型', path: 'model_phenology.html' },
    { id: 'model-price', label: '价格模型', path: 'model_price.html' },
    { id: 'model-weather', label: '气象模型', path: 'model_weather.html' },
    { id: 'model-yield', label: '产量模型', path: 'model_yield.html' },
  ]},

  { id: 'report', icon: 'bar-chart', label: '报表统计', children: [
    { id: 'report-overview', label: '报表总览', path: 'report_overview.html' },
    { id: 'report-cost', label: '成本报表', path: 'report_cost.html' },
    { id: 'report-revenue', label: '营收报表', path: 'report_revenue.html' },
    { id: 'report-profit', label: '利润报表', path: 'report_profit.html' },
    { id: 'performance-dashboard', label: '绩效看板', path: 'performance_dashboard.html' },
    { id: 'performance-detail', label: '绩效详情', path: 'performance_detail.html' },
  ]},

  { id: 'enterprise', icon: 'building', label: '企业管理', children: [
    { id: 'enterprise-base', label: '企业基本信息', path: 'enterprise_base.html' },
    { id: 'enterprise-plot', label: '地块管理', path: 'enterprise_plot.html' },
    { id: 'cert-manage', label: '证书管理', path: 'cert_manage.html' },
    { id: 'cert-query', label: '证书查询', path: 'cert_query.html' },
    { id: 'cert-issue', label: '证书签发', path: 'cert_issue.html' },
  ]},

  { id: 'system', icon: 'settings', label: '系统运维', children: [
    { id: 'system-settings', label: '系统设置', path: 'system_settings.html' },
    { id: 'user-settings', label: '用户设置', path: 'user_settings.html' },
    { id: 'task-schedule', label: '任务调度', path: 'task_schedule.html' },
    { id: 'task-assign', label: '任务分配', path: 'task_assign.html' },
  ]},

  { id: 'tools', icon: 'book-open', label: '农事工具', children: [
    { id: 'guide-calculator', label: '农事计算器', path: 'guide_calculator.html' },
  ]},
];
```

### 步骤 2：更新 home.html 首页模块快捷入口

**文件路径**: `d:\dev\GitHub\project\pro_smartorchard\html\applefarm_backhand\home.html`

**修改内容**: 替换第 717-788 行的模块入口区域

```html
<!-- ===== E区 模块快速入口 ===== -->
<div class="module-row">
  <div class="module-card production" onclick="location.href='farming_plan.html'">
    <div class="module-icon">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="width:28px;height:28px;">
        <path d="M2,22 16,8"></path>
        <path d="M20,2h2v20h-2"></path>
      </svg>
    </div>
    <div class="module-name">生产管理</div>
    <div class="module-desc">农事计划、采收管理、巡园管理</div>
    <div class="module-stats">本月 <b>128</b> 项计划 | <b>3</b> 项待执行</div>
    <div class="module-enter">进入管理</div>
  </div>
  <div class="module-card sales" onclick="location.href='adoption_tree.html'">
    <div class="module-icon">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="width:28px;height:28px;">
        <path d="M12,22s8,-4 8,-10V5l-8,-3 -8,3v7c0,6 8,10 8,10z"></path>
      </svg>
    </div>
    <div class="module-name">销售运营</div>
    <div class="module-desc">认养管理、销售订单、客户管理</div>
    <div class="module-stats"><b>86</b> 个认养订单 | <b>128</b> 棵认养果树</div>
    <div class="module-enter">进入管理</div>
  </div>
  <div class="module-card device" onclick="location.href='device_monitor.html'">
    <div class="module-icon">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="width:28px;height:28px;">
        <rect width="20" height="4" x="2" y="18" rx="2"></rect>
      </svg>
    </div>
    <div class="module-name">设备管理</div>
    <div class="module-desc">设备监控、维护管理</div>
    <div class="module-stats"><b>28/29</b> 在线 | <b>1</b> 台离线</div>
    <div class="module-enter">进入管理</div>
  </div>
  <div class="module-card alert" onclick="location.href='alert_device.html'">
    <div class="module-icon">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="width:28px;height:28px;">
        <path d="M6,8a6,6 0,0,1 12,0c0,7 3,9 3,9H3s3,-2 3,-9"></path>
      </svg>
    </div>
    <div class="module-name">预警管理</div>
    <div class="module-desc">设备预警、农事预警</div>
    <div class="module-stats"><b>5</b> 条活跃预警 | <b>1</b> 条紧急</div>
    <div class="module-enter">进入管理</div>
  </div>
  <div class="module-card material" onclick="location.href='material_info.html'">
    <div class="module-icon">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="width:28px;height:28px;">
        <path d="m7.5,4.27 9,5.15"></path>
        <rect width="18" height="16" x="3" y="4" rx="2"></rect>
      </svg>
    </div>
    <div class="module-name">物资管理</div>
    <div class="module-desc">库存管理、出入库</div>
    <div class="module-stats">共 <b>156</b> 种农资 | <b>3</b> 项低库存</div>
    <div class="module-enter">进入管理</div>
  </div>
  <div class="module-card trace" onclick="location.href='trace_code.html'">
    <div class="module-icon">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="width:28px;height:28px;">
        <path d="M12,22s8,-4 8,-10V5l-8,-3 -8,3v7c0,6 8,10 8,10z"></path>
        <path d="M9 12l2 2 4-4"></path>
      </svg>
    </div>
    <div class="module-name">产品溯源</div>
    <div class="module-desc">溯源编码、区块链存证</div>
    <div class="module-stats">已生成 <b>12,680</b> 个追溯码</div>
    <div class="module-enter">进入管理</div>
  </div>
  <div class="module-card model" onclick="location.href='model_growth.html'">
    <div class="module-icon">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="width:28px;height:28px;">
        <path d="M12,5a3,3 0,1,0 -5.997,0.125 4,4 0,0,0 -2.526,5.77 4,4 0,0,0 1.156,6.526 4.5,4.5 0,0,0 5.39,-2.02l0.022,-0.033 0.022,0.033a4.5,4.5 0,0,0 5.39,2.02 4,4 0,0,0 1.155,-6.526 4,4 0,0,0 -2.526,-5.77A3,3 0,1,0 12,5"></path>
      </svg>
    </div>
    <div class="module-name">AI模型</div>
    <div class="module-desc">生长模型、病虫害预测</div>
    <div class="module-stats"><b>7</b> 个预测模型 | 运行中</div>
    <div class="module-enter">进入管理</div>
  </div>
  <div class="module-card report" onclick="location.href='report_overview.html'">
    <div class="module-icon">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="width:28px;height:28px;">
        <path d="M18,8A6,6 0,0,0 6,8c0,7 -3,9 3,9s9,-2 9,-9"></path>
        <path d="M13.73,21a2,2 0,0,1 -3.46,0"></path>
      </svg>
    </div>
    <div class="module-name">报表统计</div>
    <div class="module-desc">营收报表、成本报表、绩效看板</div>
    <div class="module-stats">本月营收 <b>128.6</b> 万元</div>
    <div class="module-enter">进入管理</div>
  </div>
</div>
```

---

## 六、验证清单

### 6.1 功能验证

- [ ] 侧边栏菜单正确显示所有 12 个一级菜单
- [ ] 展开每个有子菜单的一级菜单，子菜单项正确显示
- [ ] 点击任意菜单项能正确跳转（保持原有逻辑）
- [ ] Tab 栏正确添加标签页（保持原有逻辑）
- [ ] Tab 切换时侧边栏高亮同步（保持原有逻辑）
- [ ] 首页模块快捷入口全部可点击跳转

### 6.2 兼容性验证

- [ ] 桌面端（1920px）菜单正常显示
- [ ] 平板端（768px-1024px）菜单正常显示
- [ ] 移动端（<768px）汉堡菜单正常弹出
- [ ] 侧边栏折叠/展开功能正常
- [ ] localStorage 记住折叠状态

### 6.3 回归测试

- [ ] 原有 HTML 文件（52个页面）链接仍然有效
- [ ] 登录页面正常访问
- [ ] 无 JS 报错
- [ ] 右键菜单关闭Tab功能正常

---

## 七、风险评估

| 风险项 | 影响程度 | 缓解措施 |
|--------|---------|---------|
| HTML 文件路径变更 | 高 | **保持 path 配置不变**，仅调整菜单层级 |
| 图标 ID 变更 | 低 | 复用已有图标 ID（home, sprout, package 等） |
| Tab 切换逻辑 | 低 | **不改动任何导航逻辑代码** |
| localStorage 状态 | 低 | 自动恢复，不影响功能 |

---

## 八、变更记录

| 版本 | 日期 | 修改人 | 修改内容 |
|------|------|--------|---------|
| v1.0 | 2026-06-14 | - | 初始方案 |
| v1.1 | 2026-06-14 | - | 产品溯源模块添加 VR全景 子菜单 |
| v1.2 | 2026-06-14 | - | 完善技术要点，确保不破坏原有导航方式 |
