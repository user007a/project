# 考试中心模块 - 实现计划

## [ ] Task 1: 更新所有页面的侧边栏菜单
- **Priority**: P0
- **Depends On**: None
- **Description**: 
  - 在所有页面的侧边栏中，在课程中心下方添加考试中心模块
  - 将题库管理从课程中心移除，移到考试中心下
  - 添加试卷管理、模拟考试、考题练习菜单项
- **Acceptance Criteria Addressed**: AC-1
- **Test Requirements**:
  - `human-judgment` TR-1.1: 所有页面侧边栏显示考试中心模块
  - `human-judgment` TR-1.2: 题库管理从课程中心移除，移到考试中心

## [ ] Task 2: 更新题库管理页面增加分数字段
- **Priority**: P0
- **Depends On**: Task 1
- **Description**: 
  - 在题库管理页面的列表中增加分数列
  - 在新建/编辑试题表单中增加分数字段（默认10分）
  - 更新导出功能包含分数字段
- **Acceptance Criteria Addressed**: AC-2
- **Test Requirements**:
  - `human-judgment` TR-2.1: 列表显示分数字段
  - `human-judgment` TR-2.2: 新建/编辑表单包含分数字段
  - `human-judgment` TR-2.3: 导出CSV包含分数

## [ ] Task 3: 创建试卷管理页面 (paper-management.html)
- **Priority**: P0
- **Depends On**: Task 1
- **Description**: 
  - 创建试卷管理页面，包含列表、新建、编辑功能
  - 试卷管理包含：试卷名、分类、总分、及格分、时长、考试次数、阅卷时间等字段
  - 支持分类管理功能
  - 支持添加试题到试卷
- **Acceptance Criteria Addressed**: AC-3
- **Test Requirements**:
  - `human-judgment` TR-3.1: 试卷列表页面显示完整
  - `human-judgment` TR-3.2: 新建/编辑试卷表单完整
  - `human-judgment` TR-3.3: 分类管理功能可用

## [ ] Task 4: 创建模拟考试页面 (mock-exam.html)
- **Priority**: P1
- **Depends On**: Task 1
- **Description**: 
  - 创建模拟考试页面
  - 模拟考试包含：标题、分类、及格分、时长等字段
  - 支持试卷随机出题配置
- **Acceptance Criteria Addressed**: AC-4
- **Test Requirements**:
  - `human-judgment` TR-4.1: 模拟考试列表页面显示完整
  - `human-judgment` TR-4.2: 新建/编辑模拟卷表单完整

## [ ] Task 5: 创建考题练习页面 (practice-exam.html)
- **Priority**: P1
- **Depends On**: Task 1
- **Description**: 
  - 创建考题练习页面
  - 支持按分类筛选试题
  - 显示试题列表和操作功能
- **Acceptance Criteria Addressed**: AC-5
- **Test Requirements**:
  - `human-judgment` TR-5.1: 考题练习页面显示完整
  - `human-judgment` TR-5.2: 分类筛选功能可用

## [ ] Task 6: 更新题库管理页面导航路径
- **Priority**: P2
- **Depends On**: Task 1
- **Description**: 
  - 更新题库管理页面的面包屑导航，从"课程中心/题库管理"改为"考试中心/题库管理"
- **Test Requirements**:
  - `human-judgment` TR-6.1: 面包屑导航正确显示为"考试中心/题库管理"