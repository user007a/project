# 考试中心模块 - 产品需求文档

## Overview
- **Summary**: 在后台管理系统中添加考试中心模块，包含题库管理（从课程中心迁移）、试卷管理、模拟考试和考题练习四个功能模块。
- **Purpose**: 提供完整的在线考试管理功能，支持试题管理、试卷编排、模拟考试和专项练习。
- **Target Users**: 系统管理员、教学管理人员

## Goals
- 在课程中心下方新增考试中心模块
- 将题库管理从课程中心迁移到考试中心
- 题库管理增加分数字段
- 创建试卷管理页面（含分类管理、试卷编辑、试题管理）
- 创建模拟考试页面
- 创建考题练习页面

## Non-Goals (Out of Scope)
- 学员在线答题功能（仅后台管理）
- 考试成绩统计分析
- 在线监考功能

## Background & Context
- 系统采用HTML+JavaScript+TailwindCSS技术栈
- 所有页面共享相同的侧边栏菜单结构
- 已有题库管理页面需要修改

## Functional Requirements
- **FR-1**: 侧边栏菜单增加考试中心模块，位于课程中心下方
- **FR-2**: 题库管理页面增加分数字段（新增/编辑表单、列表显示、导出）
- **FR-3**: 创建试卷管理页面，支持新建试卷、分类管理、编辑试卷
- **FR-4**: 创建模拟考试页面，支持新建模拟卷、分类管理
- **FR-5**: 创建考题练习页面，支持按分类练习

## Non-Functional Requirements
- **NFR-1**: 页面风格与现有系统保持一致
- **NFR-2**: 所有页面支持搜索和分页
- **NFR-3**: 导出功能支持中文无乱码

## Constraints
- **Technical**: HTML5、JavaScript、TailwindCSS 3.x、Iconify图标库
- **Business**: 需保持与现有系统的视觉一致性

## Assumptions
- 所有页面共享相同的侧边栏模板
- 已有题库管理页面结构可复用

## Acceptance Criteria

### AC-1: 侧边栏菜单更新
- **Given**: 系统管理员登录后台
- **When**: 查看侧边栏菜单
- **Then**: 课程中心下方显示考试中心模块，包含题库管理、试卷管理、模拟考试、考题练习
- **Verification**: `human-judgment`

### AC-2: 题库管理增加分数字段
- **Given**: 进入题库管理页面
- **When**: 查看列表或编辑试题
- **Then**: 显示分数字段（默认10分）
- **Verification**: `human-judgment`

### AC-3: 试卷管理页面
- **Given**: 进入试卷管理页面
- **When**: 点击新建试卷
- **Then**: 显示试卷编辑表单（试卷名、分类、总分、及格分、时长等）
- **Verification**: `human-judgment`

### AC-4: 模拟考试页面
- **Given**: 进入模拟考试页面
- **When**: 查看列表
- **Then**: 显示模拟卷列表，支持筛选和分页
- **Verification**: `human-judgment`

### AC-5: 考题练习页面
- **Given**: 进入考题练习页面
- **When**: 选择分类
- **Then**: 显示该分类下的试题列表
- **Verification**: `human-judgment`

## Open Questions
- [ ] 是否需要导入/导出试卷功能？
- [ ] 是否需要批量添加试题到试卷的功能？