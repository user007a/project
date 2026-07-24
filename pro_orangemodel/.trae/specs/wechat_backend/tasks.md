# 南丰蜜桔模型管理系统 - 微信后台功能实现计划

## [ ] Task 1: 创建微信后台目录结构
- **Priority**: high
- **Depends On**: None
- **Description**: 
  - 在html/backhand目录下创建wechat文件夹
  - 创建四个二级菜单对应的HTML文件：user_manage.html、orchard_manage.html、news_manage.html、price_index.html
- **Acceptance Criteria Addressed**: AC-1
- **Test Requirements**:
  - `human-judgement` TR-1.1: 目录结构创建正确，包含四个HTML文件

## [ ] Task 2: 更新导航菜单，添加微信后台一级菜单
- **Priority**: high
- **Depends On**: Task 1
- **Description**: 
  - 在index.html的系统管理菜单后面添加微信后台一级菜单
  - 添加四个二级菜单：用户管理、果园管理、资讯管理、价格指数
  - 参考现有菜单样式和图标设计
- **Acceptance Criteria Addressed**: AC-1
- **Test Requirements**:
  - `human-judgement` TR-2.1: 微信后台菜单在系统管理后面显示
  - `human-judgement` TR-2.2: 点击菜单可展开/收起二级菜单
  - `human-judgement` TR-2.3: 点击二级菜单可打开对应页面

## [ ] Task 3: 实现用户管理页面
- **Priority**: high
- **Depends On**: Task 1, Task 2
- **Description**: 
  - 创建用户管理页面，包含搜索框和新增按钮
  - 显示用户列表：姓名、地区、种植主体类型、手机号、注册时间、状态
  - 操作区域：查看、编辑、删除文字按钮
  - 添加查看、编辑、删除弹窗
  - 使用Mock数据（20条用户数据）
- **Acceptance Criteria Addressed**: AC-2
- **Test Requirements**:
  - `human-judgement` TR-3.1: 页面风格与现有系统一致
  - `human-judgement` TR-3.2: 用户列表显示完整信息
  - `human-judgement` TR-3.3: 搜索、分页功能正常
  - `human-judgement` TR-3.4: 查看、编辑、删除弹窗功能完整

## [ ] Task 4: 实现果园管理页面
- **Priority**: high
- **Depends On**: Task 1, Task 2
- **Description**: 
  - 创建果园管理页面，包含搜索框和新增按钮
  - 显示地块列表：地块名称、所属用户、面积、品种、土壤类型、PH值、有机质含量、树龄、状态
  - 操作区域：查看、编辑、删除文字按钮
  - 添加查看、编辑、删除弹窗
  - 使用Mock数据（15条地块数据）
- **Acceptance Criteria Addressed**: AC-3
- **Test Requirements**:
  - `human-judgement` TR-4.1: 页面风格与现有系统一致
  - `human-judgement` TR-4.2: 地块列表显示完整信息
  - `human-judgement` TR-4.3: 搜索、分页功能正常
  - `human-judgement` TR-4.4: 查看、编辑、删除弹窗功能完整

## [ ] Task 5: 实现资讯管理页面
- **Priority**: high
- **Depends On**: Task 1, Task 2
- **Description**: 
  - 创建资讯管理页面，包含搜索框、分类筛选和新增按钮
  - 显示资讯列表：标题、分类（资讯、学习、视频、法规）、发布时间、阅读量、状态
  - 操作区域：查看、编辑、发布、删除文字按钮
  - 添加查看、编辑、发布、删除弹窗
  - 使用Mock数据（20条资讯数据）
- **Acceptance Criteria Addressed**: AC-4
- **Test Requirements**:
  - `human-judgement` TR-5.1: 页面风格与现有系统一致
  - `human-judgement` TR-5.2: 资讯列表显示完整信息
  - `human-judgement` TR-5.3: 搜索、分类筛选、分页功能正常
  - `human-judgement` TR-5.4: 查看、编辑、发布、删除弹窗功能完整

## [ ] Task 6: 实现价格指数页面
- **Priority**: high
- **Depends On**: Task 1, Task 2
- **Description**: 
  - 创建价格指数页面，包含搜索框和新增按钮
  - 显示价格指数数据列表：日期、产地价格、批发市场价格、零售价格、备注
  - 操作区域：查看、编辑、删除文字按钮
  - 添加查看、编辑、删除弹窗
  - 使用Mock数据（30条价格数据，按日期倒序排列）
- **Acceptance Criteria Addressed**: AC-5
- **Test Requirements**:
  - `human-judgement` TR-6.1: 页面风格与现有系统一致
  - `human-judgement` TR-6.2: 价格指数列表显示完整信息
  - `human-judgement` TR-6.3: 搜索、分页功能正常
  - `human-judgement` TR-6.4: 查看、编辑、删除弹窗功能完整