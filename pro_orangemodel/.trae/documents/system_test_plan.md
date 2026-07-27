# 南丰蜜桔模型管理系统 - 完整测试计划

## 一、项目概述

南丰蜜桔模型管理系统是一个基于 Web 的综合管理平台，包含：
- **后台管理系统**（backhand/）：模型管理、数据管理、预警管理、运行监控、系统管理、微信后台
- **数据分析页面**（dataanlye/）：生长模型仪表盘、病虫害仪表盘
- **移动端页面**（mobile/）：面向移动端用户的 H5 页面

## 二、测试范围

### 2.1 后台管理系统（35个页面）

| 模块 | 页面 | 文件路径 |
|------|------|----------|
| 系统首页 | 系统首页 | backhand/home.html |
| 模型管理 | 生长模型 | backhand/model/growth_model.html |
| 模型管理 | 病虫害模型 | backhand/model/pest_model.html |
| 模型管理 | 气象灾害模型 | backhand/model/weather_disaster.html |
| 数据管理 | 病害数据库 | backhand/model/disease_db.html |
| 数据管理 | 虫害数据库 | backhand/model/insect_db.html |
| 数据管理 | 灾害数据库 | backhand/model/disaster_db.html |
| 数据管理 | 品种数据库 | backhand/data/variety_db.html |
| 数据管理 | 气象数据库 | backhand/monitor/weather_monitor.html |
| 数据管理 | 墒情数据库 | backhand/monitor/soil_moisture_db.html |
| 数据管理 | 视频监测库 | backhand/monitor/video_monitor_db.html |
| 数据管理 | 价格数据库 | backhand/wechat/price_index.html |
| 数据管理 | 人工上报 | backhand/data/manual_collect.html |
| 数据管理 | 数据对接 | backhand/data/data_connect.html |
| 数据管理 | 外部抓取 | backhand/data/external_fetch.html |
| 数据管理 | 数据表管理 | backhand/data/table_manage.html |
| 预警管理 | 预警管理 | backhand/alert/alert_manage.html |
| 预警管理 | 处置记录 | backhand/alert/dispose_record.html |
| 预警管理 | 预警规则 | backhand/rule/alert_rule.html |
| 预警管理 | 发送模板 | backhand/rule/send_template.html |
| 预警管理 | 风险提示 | backhand/alert/risk_hint.html |
| 预警管理 | 预测提示 | backhand/alert/predict_hint.html |
| 运行监控 | 长势研判 | backhand/monitor/growth_judge.html |
| 运行监控 | 品质预测 | backhand/monitor/quality_predict.html |
| 运行监控 | 产量预测 | backhand/monitor/yield_predict.html |
| 系统管理 | 用户管理 | backhand/system/user_manage.html |
| 系统管理 | 角色管理 | backhand/system/role_manage.html |
| 微信后台 | 微信用户 | backhand/wechat/user_manage.html |
| 微信后台 | 果园管理 | backhand/wechat/orchard_manage.html |
| 微信后台 | 资讯管理 | backhand/wechat/news_manage.html |
| 微信后台 | 用户提问 | backhand/wechat/question_manage.html |
| 微信后台 | 识别日志 | backhand/alert/recognize_log.html |
| 模型说明 | 生长模型说明 | backhand/model/growth_model_memo.html |
| 模型说明 | 病虫害模型说明 | backhand/model/pest_model_memo.html |
| 系统日志 | 系统日志 | backhand/monitor/system_log.html |

### 2.2 数据分析页面（2个页面）

| 页面 | 文件路径 |
|------|----------|
| 生长模型仪表盘 | dataanlye/growth_dashboard.html |
| 病虫害仪表盘 | dataanlye/pest_dashboard.html |

### 2.3 移动端页面（17个页面）

| 页面 | 文件路径 |
|------|----------|
| 首页 | mobile/mb_home.html |
| AI助手 | mobile/mb_ai.html |
| 数据 | mobile/mb_data.html |
| 数据录入 | mobile/mb_data_input.html |
| 数据监测 | mobile/mb_data_monitor.html |
| 果园管理 | mobile/mb_data_orchard.html |
| 建议 | mobile/mb_data_suggestion.html |
| 病害识别 | mobile/mb_disease.html |
| AI识别 | mobile/mb_disease_ai.html |
| 病害知识库 | mobile/mb_disease_knowledge.html |
| 病害报告 | mobile/mb_disease_report.html |
| 市场行情 | mobile/mb_market.html |
| 资讯首页 | mobile/mb_news.html |
| 资讯详情 | mobile/mb_news_detail.html |
| 学习中心 | mobile/mb_news_learning.html |
| 资讯列表 | mobile/mb_news_list.html |
| 个人中心 | mobile/mb_profile.html |
| 个人中心(设置) | mobile/mb_profile_center.html |
| 个人记录 | mobile/mb_profile_records.html |
| 个人设置 | mobile/mb_profile_settings.html |

## 三、测试内容

### 3.1 页面加载测试

- [ ] 页面能否正常加载（无404错误）
- [ ] 页面样式是否正常渲染
- [ ] 图表是否正常显示（Chart.js）
- [ ] 图片资源是否正常加载
- [ ] 页面加载时间是否合理

### 3.2 导航功能测试

- [ ] 侧边栏菜单展开/收起功能
- [ ] 一级菜单点击展开二级菜单
- [ ] 二级菜单点击跳转到对应页面
- [ ] 页面标题是否正确显示
- [ ] 面包屑导航是否正常

### 3.3 数据展示测试

- [ ] Mock数据是否正确显示
- [ ] 表格数据是否完整
- [ ] 统计卡片数据是否正确
- [ ] 图表数据是否正确
- [ ] 日期是否符合当前时间（2026年7月）

### 3.4 交互功能测试

- [ ] 按钮点击事件是否触发
- [ ] 弹窗是否正常显示/关闭
- [ ] 搜索功能是否正常
- [ ] 筛选功能是否正常
- [ ] 分页功能是否正常
- [ ] 表单验证是否正常
- [ ] 提示消息（Toast）是否正常显示

### 3.5 CRUD功能测试

- [ ] 新增功能（弹窗+表单）
- [ ] 编辑功能（弹窗+表单）
- [ ] 查看详情功能
- [ ] 删除功能（含确认弹窗）
- [ ] 导入/导出功能

### 3.6 响应式布局测试

- [ ] PC端布局是否正常
- [ ] 平板端布局是否正常
- [ ] 移动端布局是否正常

### 3.7 特殊功能测试

- [ ] 通知弹窗（消息通知）
- [ ] 用户菜单（个人设置、修改密码、退出登录）
- [ ] 全屏切换
- [ ] 侧边栏折叠

## 四、测试方法

1. **静态分析**：检查HTML结构、CSS样式、JavaScript逻辑
2. **浏览器测试**：通过浏览器访问每个页面，验证功能
3. **自动化测试**：使用浏览器自动化工具进行批量测试

## 五、测试报告输出

测试完成后，生成包含以下内容的测试报告：
- 测试概述
- 测试结果统计（通过/失败/警告）
- 详细测试结果
- 问题汇总与修复建议

## 六、测试执行步骤

1. 启动本地服务器
2. 测试后台管理系统首页和框架
3. 按模块测试后台管理系统各页面
4. 测试数据分析页面
5. 测试移动端页面
6. 生成测试报告
