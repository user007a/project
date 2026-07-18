# 数字乡村管理系统 - 代码实现计划

## 目录

1. [项目概述](#1-项目概述)
2. [技术栈选型](#2-技术栈选型)
3. [项目文件结构](#3-项目文件结构)
4. [数据库设计](#4-数据库设计)
5. [后端API规划](#5-后端api规划)
6. [前端实现方案](#6-前端实现方案)
7. [分模块实施计划](#7-分模块实施计划)
8. [部署方案（WSL Ubuntu）](#8-部署方案wsl-ubuntu)
9. [风险与注意事项](#9-风险与注意事项)

---

## 1 项目概述

### 1.1 项目背景

根据需求说明书和HTML原型，本项目是一个**数字乡村管理系统（村级版）**，采用"1+1+4+N"架构模式：

| 端 | 面向角色 | 核心定位 |
|---|---|---|
| 大屏端 | 村干部、来访领导 | 数据可视化展示（1920x1080） |
| 后台管理端 | 系统管理员、村委负责人 | PC端数据管理与系统配置 |
| 村民H5端 | 全体村民 | 日常服务与村务参与 |
| 村干部H5端 | 村干部 | 移动办公 |

### 1.2 核心业务模块

| 模块 | 优先级 | 说明 |
|---|---|---|
| 用户与组织管理 | P0 | 村民管理、村干部管理、组织架构、角色权限 |
| 村务公开管理 | P0 | 内容发布与审核 |
| 事件/工单管理 | P0 | 事件登记、分派、处置、归档 |
| 通知公告管理 | P0 | 公告发布与推送 |
| 村民说事 | P0 | 话题发布、评论互动 |
| 办事服务 | P0 | 办事指南、在线申请 |
| 随手拍上报 | P0 | 村民上报、村干部上报 |
| 网格巡查 | P0 | 巡查计划、巡查打卡、巡查记录 |
| 任务管理 | P0 | 任务分配、任务执行、任务统计 |
| 工作日志 | P0 | 日志撰写、日志查看 |
| 诉求处理 | P0 | 诉求登记、诉求处理、诉求反馈 |
| 积分管理 | P1 | 积分规则、审核、兑换 |
| 产业管理 | P1 | 产业信息维护、统计 |
| 数据统计与报表 | P1 | 数据汇总与导出 |
| 系统管理 | P0 | 数据字典、操作日志 |

---

## 2 技术栈选型

### 2.1 后端技术栈

| 技术 | 版本 | 说明 |
|---|---|---|
| Node.js | 20.x | LTS 版本，性能优秀 |
| Express | 4.x | 轻量灵活，社区庞大 |
| MySQL2 | 3.x | MySQL驱动，支持Promise |
| Sequelize | 6.x | ORM框架，简化数据库操作 |
| jsonwebtoken | 9.x | JWT无状态认证 |
| bcryptjs | 2.x | 密码加密 |
| cors | 2.x | 跨域处理 |
| dotenv | 16.x | 环境变量管理 |
| multer | 1.x | 文件上传处理 |
| express-validator | 7.x | 请求参数验证 |
| helmet | 7.x | 安全头设置 |
| express-rate-limit | 7.x | 请求频率限制 |
| sequelize-cli | 6.x | 数据库迁移工具 |

### 2.2 前端技术栈

| 技术 | 版本 | 说明 |
|---|---|---|
| HTML5 + CSS3 | - | 原型已完成，直接复用 |
| Tailwind CSS | 3.x | 原型已使用，保持一致 |
| JavaScript (ES6+) | - | 原型已使用，保持一致 |
| Iconify | 3.x | 图标库，原型已使用 |
| ECharts | 5.x | 数据可视化（大屏端） |

**前端策略**：直接基于现有HTML原型进行API对接，不引入复杂框架，保持技术栈简单，部署方便。

### 2.3 开发与部署工具

| 工具 | 说明 |
|---|---|
| npm | Node.js依赖管理 |
| Docker | 容器化部署 |
| Docker Compose | 一键编排部署 |
| PM2 | 进程管理（备用） |
| Git | 版本控制 |
| WSL (Ubuntu-26.04) | 开发与部署环境 |

---

## 3 项目文件结构

```
pro_digitalvillages/
├── .trae/                      # Trae配置目录
│   └── documents/              # 计划文档
├── backend/                    # 后端代码
│   ├── src/                    # 源代码目录
│   │   ├── config/             # 配置文件
│   │   │   ├── database.js     # 数据库配置
│   │   │   ├── jwt.js          # JWT配置
│   │   │   └── env.js          # 环境变量读取
│   │   ├── controllers/        # 控制器（业务逻辑）
│   │   │   ├── auth.js         # 认证控制器
│   │   │   ├── user.js         # 用户管理
│   │   │   ├── role.js         # 角色管理
│   │   │   ├── permission.js   # 权限管理
│   │   │   ├── org.js          # 组织架构
│   │   │   ├── affairs.js      # 村务公开
│   │   │   ├── event.js        # 事件管理
│   │   │   ├── notice.js       # 通知公告
│   │   │   ├── points.js       # 积分管理
│   │   │   ├── industry.js     # 产业管理
│   │   │   ├── dict.js         # 数据字典
│   │   │   ├── log.js          # 操作日志
│   │   │   ├── discuss.js      # 村民说事
│   │   │   ├── service.js      # 办事服务
│   │   │   ├── report.js       # 上报管理
│   │   │   ├── patrol.js       # 网格巡查
│   │   │   ├── task.js         # 任务管理
│   │   │   ├── journal.js      # 工作日志
│   │   │   └── appeal.js       # 诉求处理
│   │   ├── models/             # Sequelize模型
│   │   │   ├── index.js        # 模型导出入口
│   │   │   ├── SysUser.js      # 用户模型
│   │   │   ├── SysRole.js      # 角色模型
│   │   │   ├── SysPermission.js # 权限模型
│   │   │   ├── SysOrg.js       # 组织模型
│   │   │   ├── AffairsInfo.js  # 村务公开模型
│   │   │   ├── EventInfo.js    # 事件模型
│   │   │   ├── EventProcess.js # 事件处理记录模型
│   │   │   ├── NoticeInfo.js   # 通知公告模型
│   │   │   ├── NoticeRead.js   # 通知已读记录模型
│   │   │   ├── PointsRule.js   # 积分规则模型
│   │   │   ├── PointsRecord.js # 积分记录模型
│   │   │   ├── PointsMall.js   # 积分商城模型
│   │   │   ├── PointsExchange.js # 积分兑换模型
│   │   │   ├── IndustryInfo.js # 产业信息模型
│   │   │   ├── SysDict.js      # 数据字典模型
│   │   │   ├── SysLog.js       # 操作日志模型
│   │   │   ├── SysFile.js      # 文件附件模型
│   │   │   ├── DiscussTopic.js # 村民说事话题模型
│   │   │   ├── DiscussReply.js # 村民说事回复模型
│   │   │   ├── ServiceGuide.js # 办事指南模型
│   │   │   ├── ServiceApply.js # 办事申请模型
│   │   │   ├── ReportInfo.js   # 上报信息模型
│   │   │   ├── PatrolPlan.js   # 巡查计划模型
│   │   │   ├── PatrolRecord.js # 巡查记录模型
│   │   │   ├── PatrolCheckin.js # 巡查打卡模型
│   │   │   ├── TaskInfo.js     # 任务模型
│   │   │   ├── JournalInfo.js  # 工作日志模型
│   │   │   └── AppealInfo.js   # 诉求模型
│   │   ├── routes/             # 路由定义
│   │   │   ├── index.js        # 路由入口
│   │   │   ├── auth.js         # 认证路由
│   │   │   ├── users.js        # 用户路由
│   │   │   ├── roles.js        # 角色路由
│   │   │   ├── permissions.js  # 权限路由
│   │   │   ├── orgs.js         # 组织路由
│   │   │   ├── affairs.js      # 村务公开路由
│   │   │   ├── events.js       # 事件路由
│   │   │   ├── notices.js      # 通知公告路由
│   │   │   ├── points.js       # 积分路由
│   │   │   ├── industry.js     # 产业路由
│   │   │   ├── dict.js         # 数据字典路由
│   │   │   ├── logs.js         # 操作日志路由
│   │   │   ├── discuss.js      # 村民说事路由
│   │   │   ├── service.js      # 办事服务路由
│   │   │   ├── reports.js      # 上报管理路由
│   │   │   ├── patrol.js       # 网格巡查路由
│   │   │   ├── tasks.js        # 任务管理路由
│   │   │   ├── journals.js     # 工作日志路由
│   │   │   └── appeals.js      # 诉求处理路由
│   │   ├── middleware/         # 中间件
│   │   │   ├── auth.js         # JWT认证中间件
│   │   │   ├── permission.js   # 权限校验中间件
│   │   │   ├── errorHandler.js # 全局错误处理
│   │   │   ├── logger.js       # 日志记录中间件
│   │   │   ├── helmet.js       # 安全头设置
│   │   │   └── rateLimit.js    # 请求频率限制
│   │   ├── services/           # 业务服务层
│   │   │   ├── authService.js  # 认证服务
│   │   │   ├── userService.js  # 用户服务
│   │   │   ├── roleService.js  # 角色服务
│   │   │   ├── orgService.js   # 组织服务
│   │   │   ├── affairsService.js # 村务服务
│   │   │   ├── eventService.js # 事件服务
│   │   │   ├── noticeService.js # 通知服务
│   │   │   ├── pointsService.js # 积分服务
│   │   │   ├── industryService.js # 产业服务
│   │   │   ├── dictService.js  # 字典服务
│   │   │   ├── logService.js   # 日志服务
│   │   │   ├── discussService.js # 村民说事服务
│   │   │   ├── serviceService.js # 办事服务服务
│   │   │   ├── reportService.js # 上报管理服务
│   │   │   ├── patrolService.js # 网格巡查服务
│   │   │   ├── taskService.js  # 任务管理服务
│   │   │   ├── journalService.js # 工作日志服务
│   │   │   └── appealService.js # 诉求处理服务
│   │   ├── utils/              # 工具函数
│   │   │   ├── response.js     # 统一响应格式
│   │   │   ├── pagination.js   # 分页工具
│   │   │   ├── validator.js    # 验证工具
│   │   │   └── helper.js       # 通用辅助函数
│   │   ├── migrations/         # 数据库迁移脚本
│   │   ├── seeders/            # 数据库初始数据
│   │   └── app.js              # Express应用入口
│   ├── .env                    # 环境变量（开发）
│   ├── .env.production        # 环境变量（生产）
│   ├── .env.example           # 环境变量示例（无敏感值）
│   ├── package.json            # 依赖配置
│   ├── package-lock.json       # 依赖锁定
│   ├── server.js               # 服务启动入口
│   ├── sequelize.config.js     # Sequelize配置（迁移工具）
│   └── .gitignore              # Git忽略规则
├── html/                       # 前端HTML原型（保留）
│   ├── admin/                  # 后台管理端
│   │   ├── index.html          # 主框架（sidebar + iframe）
│   │   ├── dashboard.html      # 工作台
│   │   ├── login.html          # 登录页
│   │   ├── css/
│   │   │   └── admin.css       # 公共样式
│   │   ├── js/
│   │   │   ├── admin.js        # 公共脚本
│   │   │   ├── api.js          # API调用封装
│   │   │   └── utils.js        # 工具函数
│   │   ├── user/               # 用户管理页面
│   │   ├── affairs/            # 村务公开页面
│   │   ├── event/              # 事件管理页面
│   │   ├── notice/             # 通知公告页面
│   │   ├── points/             # 积分管理页面
│   │   ├── industry/           # 产业管理页面
│   │   ├── stats/              # 数据统计页面
│   │   └── system/             # 系统管理页面
│   ├── villager/               # 村民H5端
│   │   ├── index.html          # 首页
│   │   ├── css/villager.css    # 村民端样式
│   │   ├── js/
│   │   │   ├── villager.js     # 村民端脚本
│   │   │   ├── api.js          # API调用封装
│   │   │   └── utils.js        # 工具函数
│   │   ├── affairs/            # 村务公开
│   │   ├── service/            # 办事服务
│   │   ├── discuss/            # 村民说事
│   │   ├── report/             # 随手拍
│   │   ├── notice/             # 通知公告
│   │   ├── points/             # 积分中心
│   │   └── profile/            # 个人中心
│   ├── cadre/                  # 村干部H5端
│   │   ├── index.html          # 工作台
│   │   ├── css/cadre.css       # 村干部端样式
│   │   ├── js/
│   │   │   ├── cadre.js        # 村干部端脚本
│   │   │   ├── api.js          # API调用封装
│   │   │   └── utils.js        # 工具函数
│   │   ├── patrol/             # 网格巡查
│   │   ├── task/               # 任务管理
│   │   ├── journal/            # 工作日志
│   │   ├── notice/             # 通知发布
│   │   ├── points/             # 积分审核
│   │   ├── appeal/             # 诉求处理
│   │   ├── report/             # 上报
│   │   ├── data/               # 数据查看
│   │   └── profile/            # 个人中心
│   ├── dashboard/              # 大屏端
│   │   ├── index.html          # 大屏页面
│   │   ├── css/dashboard.css   # 大屏样式
│   │   └── js/
│   │       ├── dashboard.js    # 大屏脚本
│   │       ├── api.js          # API调用封装
│   │       └── utils.js        # 工具函数
│   └── images/                 # 公共图片资源
├── sql/                        # 数据库脚本
│   ├── init.sql                # 数据库初始化脚本
│   └── data.sql                # 初始数据脚本
├── nginx/                      # Nginx配置
│   └── nginx.conf              # Nginx配置文件
├── docker/                     # Docker配置
│   ├── backend/
│   │   └── Dockerfile          # 后端Dockerfile
│   └── nginx/
│       └── Dockerfile          # Nginx Dockerfile
├── docker-compose.yml          # Docker Compose配置
├── .gitignore                  # 全局Git忽略规则
└── README.md                   # 项目说明文档
```

---

## 4 数据库设计

### 4.1 核心表结构

#### 4.1.1 用户相关表

**sys_user（用户表）**
| 字段名 | 类型 | 说明 |
|---|---|---|
| id | BIGINT | 主键，自增 |
| username | VARCHAR(50) | 用户名（唯一） |
| password | VARCHAR(255) | 密码（bcrypt加密） |
| name | VARCHAR(50) | 姓名 |
| phone | VARCHAR(20) | 手机号 |
| id_card | VARCHAR(18) | 身份证号（唯一） |
| gender | TINYINT | 性别（0女/1男） |
| group_id | BIGINT | 所属组ID |
| grid_id | BIGINT | 所属网格ID |
| politics_status | VARCHAR(20) | 政治面貌 |
| education | VARCHAR(20) | 学历 |
| address | VARCHAR(200) | 家庭住址 |
| is_permanent | TINYINT | 是否常住人口 |
| points | INT | 当前积分 |
| role_id | BIGINT | 角色ID |
| status | TINYINT | 状态（0禁用/1启用） |
| created_at | DATETIME | 创建时间 |
| updated_at | DATETIME | 更新时间 |

**sys_role（角色表）**
| 字段名 | 类型 | 说明 |
|---|---|---|
| id | BIGINT | 主键，自增 |
| role_name | VARCHAR(50) | 角色名称 |
| role_code | VARCHAR(50) | 角色编码 |
| description | VARCHAR(200) | 描述 |
| data_scope | TINYINT | 数据范围（0全部/1本组/2本人） |
| is_default | TINYINT | 是否默认角色 |
| status | TINYINT | 状态 |
| created_at | DATETIME | 创建时间 |
| updated_at | DATETIME | 更新时间 |

**sys_permission（权限表）**
| 字段名 | 类型 | 说明 |
|---|---|---|
| id | BIGINT | 主键，自增 |
| parent_id | BIGINT | 父权限ID |
| name | VARCHAR(50) | 权限名称 |
| code | VARCHAR(100) | 权限编码 |
| type | TINYINT | 类型（1菜单/2按钮） |
| path | VARCHAR(200) | 路径 |
| icon | VARCHAR(100) | 图标 |
| sort_order | INT | 排序 |
| created_at | DATETIME | 创建时间 |

**sys_role_permission（角色权限关联表）**
| 字段名 | 类型 | 说明 |
|---|---|---|
| role_id | BIGINT | 角色ID |
| permission_id | BIGINT | 权限ID |

#### 4.1.2 组织架构表

**sys_org（组织架构表）**
| 字段名 | 类型 | 说明 |
|---|---|---|
| id | BIGINT | 主键，自增 |
| parent_id | BIGINT | 父节点ID |
| org_name | VARCHAR(100) | 节点名称 |
| org_code | VARCHAR(50) | 节点编码 |
| org_type | TINYINT | 类型（1村/2组/3网格） |
| leader_id | BIGINT | 负责人ID |
| description | VARCHAR(500) | 描述 |
| created_at | DATETIME | 创建时间 |
| updated_at | DATETIME | 更新时间 |

#### 4.1.3 村务公开表

**affairs_info（村务公开表）**
| 字段名 | 类型 | 说明 |
|---|---|---|
| id | BIGINT | 主键，自增 |
| title | VARCHAR(200) | 标题 |
| content | TEXT | 内容 |
| affairs_type | VARCHAR(50) | 类型（党务/村务/财务） |
| publish_status | TINYINT | 状态（0草稿/1待审核/2已发布/3已撤回） |
| publish_time | DATETIME | 发布时间 |
| author_id | BIGINT | 发布人ID |
| reviewer_id | BIGINT | 审核人ID |
| review_time | DATETIME | 审核时间 |
| review_comment | VARCHAR(500) | 审核意见 |
| created_at | DATETIME | 创建时间 |
| updated_at | DATETIME | 更新时间 |

#### 4.1.4 事件管理表

**event_info（事件表）**
| 字段名 | 类型 | 说明 |
|---|---|---|
| id | BIGINT | 主键，自增 |
| event_no | VARCHAR(50) | 事件编号（自动生成） |
| title | VARCHAR(200) | 事件标题 |
| event_type | VARCHAR(50) | 类型（环境卫生/基础设施/邻里纠纷/安全隐患） |
| priority | TINYINT | 优先级（1紧急/2高/3中/4低） |
| status | TINYINT | 状态（0待分派/1已分派/2处置中/3已完成/4已关闭） |
| description | TEXT | 事件描述 |
| reporter_id | BIGINT | 上报人ID |
| handler_id | BIGINT | 处理人ID |
| grid_id | BIGINT | 所属网格ID |
| report_time | DATETIME | 上报时间 |
| dispatch_time | DATETIME | 分派时间 |
| handle_time | DATETIME | 处理时间 |
| close_time | DATETIME | 关闭时间 |
| require_time | DATETIME | 截止时间 |
| created_at | DATETIME | 创建时间 |

**event_process（事件处理记录表）**
| 字段名 | 类型 | 说明 |
|---|---|---|
| id | BIGINT | 主键，自增 |
| event_id | BIGINT | 事件ID |
| process_type | VARCHAR(50) | 处理类型 |
| operator_id | BIGINT | 操作人ID |
| content | VARCHAR(500) | 处理内容 |
| created_at | DATETIME | 创建时间 |
| updated_at | DATETIME | 更新时间 |

#### 4.1.5 通知公告表

**notice_info（通知公告表）**
| 字段名 | 类型 | 说明 |
|---|---|---|
| id | BIGINT | 主键，自增 |
| title | VARCHAR(200) | 标题 |
| content | TEXT | 内容 |
| notice_type | VARCHAR(50) | 类型 |
| target_scope | VARCHAR(200) | 推送范围（全部/指定组/指定人） |
| publish_status | TINYINT | 状态（0草稿/1已发布） |
| publish_time | DATETIME | 发布时间 |
| author_id | BIGINT | 发布人ID |
| created_at | DATETIME | 创建时间 |
| updated_at | DATETIME | 更新时间 |

#### 4.1.6 积分管理表

**points_rule（积分规则表）**
| 字段名 | 类型 | 说明 |
|---|---|---|
| id | BIGINT | 主键，自增 |
| rule_name | VARCHAR(100) | 规则名称 |
| rule_type | TINYINT | 类型（1加分/2扣分） |
| points | INT | 分值 |
| description | VARCHAR(500) | 规则描述 |
| status | TINYINT | 状态 |
| created_at | DATETIME | 创建时间 |
| updated_at | DATETIME | 更新时间 |

**points_record（积分记录表）**
| 字段名 | 类型 | 说明 |
|---|---|---|
| id | BIGINT | 主键，自增 |
| user_id | BIGINT | 用户ID |
| rule_id | BIGINT | 规则ID |
| points | INT | 积分变动值 |
| balance | INT | 变动后余额 |
| reason | VARCHAR(500) | 变动原因 |
| status | TINYINT | 状态（0待审核/1已通过/2已驳回） |
| reviewer_id | BIGINT | 审核人ID |
| review_time | DATETIME | 审核时间 |
| created_at | DATETIME | 创建时间 |
| updated_at | DATETIME | 更新时间 |

**points_mall（积分商城表）**
| 字段名 | 类型 | 说明 |
|---|---|---|
| id | BIGINT | 主键，自增 |
| goods_name | VARCHAR(100) | 商品名称 |
| points | INT | 所需积分 |
| stock | INT | 库存 |
| description | VARCHAR(500) | 描述 |
| image_url | VARCHAR(500) | 图片URL |
| status | TINYINT | 状态 |
| created_at | DATETIME | 创建时间 |
| updated_at | DATETIME | 更新时间 |

**points_exchange（积分兑换记录表）**
| 字段名 | 类型 | 说明 |
|---|---|---|
| id | BIGINT | 主键，自增 |
| user_id | BIGINT | 用户ID |
| goods_id | BIGINT | 商品ID |
| exchange_no | VARCHAR(50) | 兑换单号 |
| points | INT | 消耗积分 |
| status | TINYINT | 状态（0待审核/1已通过/2已发放/3已驳回） |
| reviewer_id | BIGINT | 审核人ID |
| created_at | DATETIME | 创建时间 |
| updated_at | DATETIME | 更新时间 |

#### 4.1.7 产业管理表

**industry_info（产业信息表）**
| 字段名 | 类型 | 说明 |
|---|---|---|
| id | BIGINT | 主键，自增 |
| industry_name | VARCHAR(100) | 产业名称 |
| industry_type | VARCHAR(50) | 产业类型 |
| location | VARCHAR(200) | 位置 |
| annual_output | DECIMAL(12,2) | 年产值（万元） |
| employee_count | INT | 从业人数 |
| contact_person | VARCHAR(50) | 联系人 |
| contact_phone | VARCHAR(20) | 联系电话 |
| description | VARCHAR(500) | 描述 |
| status | TINYINT | 状态 |
| created_at | DATETIME | 创建时间 |
| updated_at | DATETIME | 更新时间 |

#### 4.1.8 系统管理表

**sys_dict（数据字典表）**
| 字段名 | 类型 | 说明 |
|---|---|---|
| id | BIGINT | 主键，自增 |
| dict_type | VARCHAR(100) | 字典类型 |
| dict_code | VARCHAR(100) | 字典编码 |
| dict_label | VARCHAR(100) | 字典标签 |
| dict_value | VARCHAR(200) | 字典值 |
| sort_order | INT | 排序 |
| created_at | DATETIME | 创建时间 |
| updated_at | DATETIME | 更新时间 |

**sys_log（操作日志表）**
| 字段名 | 类型 | 说明 |
|---|---|---|
| id | BIGINT | 主键，自增 |
| user_id | BIGINT | 用户ID |
| username | VARCHAR(50) | 用户名 |
| module | VARCHAR(100) | 操作模块 |
| action | VARCHAR(100) | 操作类型 |
| description | VARCHAR(500) | 操作描述 |
| ip | VARCHAR(50) | 操作IP |
| created_at | DATETIME | 创建时间 |

**sys_file（文件附件表）**
| 字段名 | 类型 | 说明 |
|---|---|---|
| id | BIGINT | 主键，自增 |
| file_name | VARCHAR(200) | 原始文件名 |
| file_path | VARCHAR(500) | 存储路径 |
| file_size | BIGINT | 文件大小（字节） |
| file_type | VARCHAR(50) | 文件类型 |
| file_ext | VARCHAR(20) | 文件扩展名 |
| module_type | VARCHAR(50) | 所属模块（event/affairs/mall等） |
| module_id | BIGINT | 关联业务ID |
| created_by | BIGINT | 创建人ID |
| created_at | DATETIME | 创建时间 |
| updated_at | DATETIME | 更新时间 |

**notice_read（通知已读记录表）**
| 字段名 | 类型 | 说明 |
|---|---|---|
| id | BIGINT | 主键，自增 |
| notice_id | BIGINT | 通知ID |
| user_id | BIGINT | 用户ID |
| read_time | DATETIME | 阅读时间 |
| created_at | DATETIME | 创建时间 |

#### 4.1.9 村民说事相关表

**discuss_topic（村民说事话题表）**
| 字段名 | 类型 | 说明 |
|---|---|---|
| id | BIGINT | 主键，自增 |
| title | VARCHAR(200) | 话题标题 |
| content | TEXT | 话题内容 |
| user_id | BIGINT | 发布人ID |
| org_id | BIGINT | 所属组织ID |
| grid_id | BIGINT | 所属网格ID |
| status | TINYINT | 状态（0待审核/1已通过/2已关闭） |
| reply_count | INT | 回复数 |
| view_count | INT | 浏览数 |
| is_top | TINYINT | 是否置顶 |
| reviewer_id | BIGINT | 审核人ID |
| review_time | DATETIME | 审核时间 |
| created_at | DATETIME | 创建时间 |
| updated_at | DATETIME | 更新时间 |

**discuss_reply（村民说事回复表）**
| 字段名 | 类型 | 说明 |
|---|---|---|
| id | BIGINT | 主键，自增 |
| topic_id | BIGINT | 话题ID |
| user_id | BIGINT | 回复人ID |
| content | VARCHAR(500) | 回复内容 |
| reply_to_id | BIGINT | 回复目标ID（0表示直接回复话题） |
| is_official | TINYINT | 是否官方回复 |
| created_at | DATETIME | 创建时间 |

#### 4.1.10 办事服务相关表

**service_guide（办事指南表）**
| 字段名 | 类型 | 说明 |
|---|---|---|
| id | BIGINT | 主键，自增 |
| title | VARCHAR(200) | 指南标题 |
| category | VARCHAR(50) | 分类 |
| description | TEXT | 服务说明 |
| materials | TEXT | 所需材料（JSON数组） |
| process | TEXT | 办理流程（JSON数组） |
| handling_time | VARCHAR(50) | 办理时限 |
| contact_phone | VARCHAR(20) | 联系电话 |
| is_online | TINYINT | 是否支持线上申请 |
| form_fields | TEXT | 表单字段定义（JSON） |
| sort_order | INT | 排序 |
| status | TINYINT | 状态 |
| created_at | DATETIME | 创建时间 |
| updated_at | DATETIME | 更新时间 |

**service_apply（办事申请表）**
| 字段名 | 类型 | 说明 |
|---|---|---|
| id | BIGINT | 主键，自增 |
| apply_no | VARCHAR(50) | 申请编号 |
| guide_id | BIGINT | 指南ID |
| user_id | BIGINT | 申请人ID |
| form_data | TEXT | 表单数据（JSON） |
| status | TINYINT | 状态（0待审核/1已通过/2办理中/3已完成/4已驳回） |
| reviewer_id | BIGINT | 审核人ID |
| review_time | DATETIME | 审核时间 |
| review_comment | VARCHAR(500) | 审核意见 |
| finish_time | DATETIME | 完成时间 |
| created_at | DATETIME | 创建时间 |
| updated_at | DATETIME | 更新时间 |

#### 4.1.11 上报相关表

**report_info（上报信息表）**
| 字段名 | 类型 | 说明 |
|---|---|---|
| id | BIGINT | 主键，自增 |
| report_no | VARCHAR(50) | 上报编号 |
| title | VARCHAR(200) | 上报标题 |
| content | TEXT | 上报内容 |
| report_type | VARCHAR(50) | 上报类型（环境卫生/基础设施/安全隐患等） |
| user_id | BIGINT | 上报人ID |
| user_type | TINYINT | 上报人类型（0村民/1村干部） |
| org_id | BIGINT | 所属组织ID |
| grid_id | BIGINT | 所属网格ID |
| status | TINYINT | 状态（0待处理/1处理中/2已完成/3已关闭） |
| handler_id | BIGINT | 处理人ID |
| handle_time | DATETIME | 处理时间 |
| handle_result | VARCHAR(500) | 处理结果 |
| location | VARCHAR(200) | 位置描述 |
| latitude | DECIMAL(10,7) | 纬度 |
| longitude | DECIMAL(10,7) | 经度 |
| created_at | DATETIME | 创建时间 |
| updated_at | DATETIME | 更新时间 |

#### 4.1.12 网格巡查相关表

**patrol_plan（巡查计划表）**
| 字段名 | 类型 | 说明 |
|---|---|---|
| id | BIGINT | 主键，自增 |
| plan_name | VARCHAR(100) | 计划名称 |
| grid_id | BIGINT | 网格ID |
| patrol_type | VARCHAR(50) | 巡查类型 |
| start_time | DATETIME | 开始时间 |
| end_time | DATETIME | 结束时间 |
| frequency | VARCHAR(20) | 巡查频率（每日/每周/每月） |
| assignee_ids | VARCHAR(500) | 责任人ID列表（逗号分隔） |
| status | TINYINT | 状态（0未开始/1进行中/2已完成） |
| created_by | BIGINT | 创建人ID |
| created_at | DATETIME | 创建时间 |
| updated_at | DATETIME | 更新时间 |

**patrol_record（巡查记录表）**
| 字段名 | 类型 | 说明 |
|---|---|---|
| id | BIGINT | 主键，自增 |
| record_no | VARCHAR(50) | 记录编号 |
| plan_id | BIGINT | 计划ID |
| user_id | BIGINT | 巡查人ID |
| grid_id | BIGINT | 网格ID |
| patrol_date | DATE | 巡查日期 |
| start_time | DATETIME | 开始时间 |
| end_time | DATETIME | 结束时间 |
| status | TINYINT | 状态（0进行中/1已完成/2异常） |
| content | TEXT | 巡查内容 |
| problem_count | INT | 发现问题数 |
| latitude | DECIMAL(10,7) | 纬度 |
| longitude | DECIMAL(10,7) | 经度 |
| created_at | DATETIME | 创建时间 |

**patrol_checkin（巡查打卡表）**
| 字段名 | 类型 | 说明 |
|---|---|---|
| id | BIGINT | 主键，自增 |
| record_id | BIGINT | 巡查记录ID |
| user_id | BIGINT | 打卡人ID |
| checkin_time | DATETIME | 打卡时间 |
| latitude | DECIMAL(10,7) | 打卡纬度 |
| longitude | DECIMAL(10,7) | 打卡经度 |
| type | TINYINT | 打卡类型（1开始/2结束/3中间） |
| created_at | DATETIME | 创建时间 |

#### 4.1.13 任务管理相关表

**task_info（任务表）**
| 字段名 | 类型 | 说明 |
|---|---|---|
| id | BIGINT | 主键，自增 |
| task_no | VARCHAR(50) | 任务编号 |
| title | VARCHAR(200) | 任务标题 |
| description | TEXT | 任务描述 |
| task_type | VARCHAR(50) | 任务类型 |
| priority | TINYINT | 优先级（1紧急/2高/3中/4低） |
| status | TINYINT | 状态（0待分配/1进行中/2已完成/3已关闭） |
| assignee_id | BIGINT | 执行人ID |
| creator_id | BIGINT | 创建人ID |
| start_time | DATETIME | 开始时间 |
| end_time | DATETIME | 截止时间 |
| completed_time | DATETIME | 完成时间 |
| org_id | BIGINT | 所属组织ID |
| grid_id | BIGINT | 所属网格ID |
| created_at | DATETIME | 创建时间 |
| updated_at | DATETIME | 更新时间 |

#### 4.1.14 工作日志相关表

**journal_info（工作日志表）**
| 字段名 | 类型 | 说明 |
|---|---|---|
| id | BIGINT | 主键，自增 |
| user_id | BIGINT | 日志作者ID |
| journal_date | DATE | 日志日期 |
| content | TEXT | 日志内容 |
| work_summary | VARCHAR(500) | 工作摘要 |
| plan_tomorrow | VARCHAR(500) | 明日计划 |
| status | TINYINT | 状态（0草稿/1已提交/2已审核） |
| reviewer_id | BIGINT | 审核人ID |
| review_time | DATETIME | 审核时间 |
| created_at | DATETIME | 创建时间 |
| updated_at | DATETIME | 更新时间 |

#### 4.1.15 诉求处理相关表

**appeal_info（诉求表）**
| 字段名 | 类型 | 说明 |
|---|---|---|
| id | BIGINT | 主键，自增 |
| appeal_no | VARCHAR(50) | 诉求编号 |
| title | VARCHAR(200) | 诉求标题 |
| content | TEXT | 诉求内容 |
| appeal_type | VARCHAR(50) | 诉求类型 |
| user_id | BIGINT | 诉求人ID |
| org_id | BIGINT | 所属组织ID |
| grid_id | BIGINT | 所属网格ID |
| status | TINYINT | 状态（0待受理/1受理中/2已解决/3已驳回） |
| handler_id | BIGINT | 处理人ID |
| handle_time | DATETIME | 处理时间 |
| handle_result | VARCHAR(500) | 处理结果 |
| feedback_required | TINYINT | 是否需要反馈 |
| feedback_content | VARCHAR(500) | 反馈内容 |
| feedback_time | DATETIME | 反馈时间 |
| created_at | DATETIME | 创建时间 |
| updated_at | DATETIME | 更新时间 |

#### 4.1.16 数据库索引策略

为优化查询性能，建议在以下字段上创建索引：

| 表名 | 字段名 | 索引类型 | 说明 |
|---|---|---|---|
| sys_user | username | UNIQUE | 用户名唯一索引，加速登录查询 |
| sys_user | phone | UNIQUE | 手机号唯一索引，加速用户查找 |
| sys_user | id_card | UNIQUE | 身份证号唯一索引 |
| sys_user | role_id | INDEX | 角色ID索引，加速按角色查询 |
| sys_user | status | INDEX | 状态索引，加速用户状态筛选 |
| sys_role | role_code | UNIQUE | 角色编码唯一索引 |
| sys_permission | parent_id | INDEX | 父权限ID索引，加速树形结构查询 |
| sys_org | parent_id | INDEX | 父节点ID索引，加速组织树查询 |
| sys_org | org_type | INDEX | 组织类型索引，加速类型筛选 |
| affairs_info | affairs_type | INDEX | 村务类型索引 |
| affairs_info | publish_status | INDEX | 发布状态索引，加速审核列表查询 |
| affairs_info | author_id | INDEX | 发布人ID索引 |
| event_info | event_no | UNIQUE | 事件编号唯一索引 |
| event_info | status | INDEX | 事件状态索引，加速状态筛选 |
| event_info | priority | INDEX | 优先级索引，加速紧急事件查询 |
| event_info | event_type | INDEX | 事件类型索引 |
| event_info | grid_id | INDEX | 网格ID索引，加速网格筛选 |
| event_info | reporter_id | INDEX | 上报人ID索引 |
| event_info | handler_id | INDEX | 处理人ID索引 |
| event_process | event_id | INDEX | 事件ID索引，加速处理记录查询 |
| notice_info | publish_status | INDEX | 发布状态索引 |
| notice_info | notice_type | INDEX | 通知类型索引 |
| notice_read | notice_id | INDEX | 通知ID索引 |
| notice_read | user_id | INDEX | 用户ID索引 |
| points_record | user_id | INDEX | 用户ID索引，加速积分记录查询 |
| points_record | status | INDEX | 状态索引，加速待审核列表查询 |
| points_exchange | user_id | INDEX | 用户ID索引 |
| points_exchange | status | INDEX | 状态索引，加速兑换审核查询 |
| points_mall | status | INDEX | 状态索引，加速商城商品筛选 |
| industry_info | industry_type | INDEX | 产业类型索引 |
| sys_dict | dict_type | INDEX | 字典类型索引，加速字典查询 |
| sys_file | module_type | INDEX | 模块类型索引 |
| sys_file | module_id | INDEX | 关联业务ID索引 |
| discuss_topic | user_id | INDEX | 用户ID索引 |
| discuss_topic | status | INDEX | 状态索引 |
| discuss_topic | is_top | INDEX | 置顶索引 |
| discuss_topic | org_id | INDEX | 组织ID索引 |
| discuss_reply | topic_id | INDEX | 话题ID索引 |
| discuss_reply | user_id | INDEX | 用户ID索引 |
| service_guide | category | INDEX | 分类索引 |
| service_guide | status | INDEX | 状态索引 |
| service_apply | guide_id | INDEX | 指南ID索引 |
| service_apply | user_id | INDEX | 用户ID索引 |
| service_apply | status | INDEX | 状态索引 |
| report_info | user_id | INDEX | 用户ID索引 |
| report_info | user_type | INDEX | 用户类型索引 |
| report_info | status | INDEX | 状态索引 |
| report_info | report_type | INDEX | 上报类型索引 |
| report_info | grid_id | INDEX | 网格ID索引 |
| patrol_plan | grid_id | INDEX | 网格ID索引 |
| patrol_plan | status | INDEX | 状态索引 |
| patrol_record | plan_id | INDEX | 计划ID索引 |
| patrol_record | user_id | INDEX | 用户ID索引 |
| patrol_record | patrol_date | INDEX | 日期索引 |
| patrol_checkin | record_id | INDEX | 记录ID索引 |
| task_info | assignee_id | INDEX | 执行人ID索引 |
| task_info | status | INDEX | 状态索引 |
| task_info | priority | INDEX | 优先级索引 |
| journal_info | user_id | INDEX | 用户ID索引 |
| journal_info | journal_date | INDEX | 日期索引 |
| journal_info | status | INDEX | 状态索引 |
| appeal_info | user_id | INDEX | 用户ID索引 |
| appeal_info | status | INDEX | 状态索引 |
| appeal_info | grid_id | INDEX | 网格ID索引 |

---

## 5 后端API规划

### 5.1 API统一规范

- **基础路径**：`/api/v1`
- **请求方式**：GET（查询）、POST（新增）、PUT（更新）、DELETE（删除）
- **响应格式**：
```json
{
  "code": 200,
  "message": "success",
  "data": {}
}
```

### 5.2 模块API路由

#### 5.2.1 用户管理

| API | 方法 | 说明 |
|---|---|---|
| `/api/v1/auth/login` | POST | 管理员登录 |
| `/api/v1/auth/villager-login` | POST | 村民登录（手机号+密码） |
| `/api/v1/auth/logout` | POST | 退出登录 |
| `/api/v1/users` | GET | 用户列表（分页） |
| `/api/v1/users/{id}` | GET | 用户详情 |
| `/api/v1/users` | POST | 新增用户 |
| `/api/v1/users/{id}` | PUT | 更新用户 |
| `/api/v1/users/{id}` | DELETE | 删除用户 |
| `/api/v1/users/import` | POST | 批量导入 |
| `/api/v1/users/export` | GET | 导出列表 |
| `/api/v1/users/{id}/reset-pwd` | PUT | 重置密码 |

#### 5.2.2 角色权限

| API | 方法 | 说明 |
|---|---|---|
| `/api/v1/roles` | GET | 角色列表 |
| `/api/v1/roles` | POST | 新增角色 |
| `/api/v1/roles/{id}` | PUT | 更新角色 |
| `/api/v1/roles/{id}/permissions` | GET | 角色权限 |
| `/api/v1/roles/{id}/permissions` | PUT | 设置角色权限 |
| `/api/v1/permissions` | GET | 权限树 |

#### 5.2.3 组织架构

| API | 方法 | 说明 |
|---|---|---|
| `/api/v1/orgs` | GET | 组织树 |
| `/api/v1/orgs` | POST | 新增节点 |
| `/api/v1/orgs/{id}` | PUT | 更新节点 |
| `/api/v1/orgs/{id}` | DELETE | 删除节点 |

#### 5.2.4 村务公开

| API | 方法 | 说明 |
|---|---|---|
| `/api/v1/affairs` | GET | 村务列表 |
| `/api/v1/affairs/{id}` | GET | 村务详情 |
| `/api/v1/affairs` | POST | 新增村务 |
| `/api/v1/affairs/{id}` | PUT | 更新村务 |
| `/api/v1/affairs/{id}/review` | POST | 审核村务 |
| `/api/v1/affairs/pending` | GET | 待审核列表 |

#### 5.2.5 事件管理

| API | 方法 | 说明 |
|---|---|---|
| `/api/v1/events` | GET | 事件列表 |
| `/api/v1/events/{id}` | GET | 事件详情 |
| `/api/v1/events` | POST | 新增事件 |
| `/api/v1/events/{id}/dispatch` | POST | 分派事件 |
| `/api/v1/events/{id}/process` | POST | 处理事件 |
| `/api/v1/events/{id}/close` | POST | 关闭事件 |
| `/api/v1/events/stats` | GET | 事件统计 |

#### 5.2.6 通知公告

| API | 方法 | 说明 |
|---|---|---|
| `/api/v1/notices` | GET | 公告列表 |
| `/api/v1/notices/{id}` | GET | 公告详情 |
| `/api/v1/notices` | POST | 发布公告 |
| `/api/v1/notices/{id}` | PUT | 更新公告 |

#### 5.2.7 积分管理

| API | 方法 | 说明 |
|---|---|---|
| `/api/v1/points/rules` | GET | 积分规则列表 |
| `/api/v1/points/rules` | POST | 新增规则 |
| `/api/v1/points/records` | GET | 积分记录列表 |
| `/api/v1/points/records/{id}/review` | POST | 审核积分 |
| `/api/v1/points/mall` | GET | 积分商城 |
| `/api/v1/points/exchange` | POST | 积分兑换 |
| `/api/v1/points/exchange/{id}/review` | POST | 审核兑换 |

#### 5.2.8 产业管理

| API | 方法 | 说明 |
|---|---|---|
| `/api/v1/industry` | GET | 产业列表 |
| `/api/v1/industry/{id}` | GET | 产业详情 |
| `/api/v1/industry` | POST | 新增产业 |
| `/api/v1/industry/{id}` | PUT | 更新产业 |
| `/api/v1/industry/stats` | GET | 产业数据统计 |

#### 5.2.9 系统管理

| API | 方法 | 说明 |
|---|---|---|
| `/api/v1/dict` | GET | 数据字典 |
| `/api/v1/dict/{type}` | GET | 指定类型字典 |
| `/api/v1/logs` | GET | 操作日志 |

#### 5.2.10 村民说事

| API | 方法 | 说明 |
|---|---|---|
| `/api/v1/discuss/topics` | GET | 话题列表 |
| `/api/v1/discuss/topics/{id}` | GET | 话题详情 |
| `/api/v1/discuss/topics` | POST | 发布话题 |
| `/api/v1/discuss/topics/{id}` | PUT | 更新话题 |
| `/api/v1/discuss/topics/{id}/review` | POST | 审核话题 |
| `/api/v1/discuss/topics/{id}/top` | PUT | 置顶/取消置顶 |
| `/api/v1/discuss/topics/{id}/close` | PUT | 关闭话题 |
| `/api/v1/discuss/replies` | POST | 发表回复 |
| `/api/v1/discuss/topics/{id}/replies` | GET | 话题回复列表 |

#### 5.2.11 办事服务

| API | 方法 | 说明 |
|---|---|---|
| `/api/v1/service/guides` | GET | 办事指南列表 |
| `/api/v1/service/guides/{id}` | GET | 指南详情 |
| `/api/v1/service/guides` | POST | 新增指南 |
| `/api/v1/service/guides/{id}` | PUT | 更新指南 |
| `/api/v1/service/applies` | GET | 申请列表 |
| `/api/v1/service/applies/{id}` | GET | 申请详情 |
| `/api/v1/service/applies` | POST | 提交申请 |
| `/api/v1/service/applies/{id}/review` | POST | 审核申请 |
| `/api/v1/service/applies/{id}/finish` | PUT | 完成申请 |

#### 5.2.12 上报管理

| API | 方法 | 说明 |
|---|---|---|
| `/api/v1/reports` | GET | 上报列表 |
| `/api/v1/reports/{id}` | GET | 上报详情 |
| `/api/v1/reports` | POST | 提交上报 |
| `/api/v1/reports/{id}/handle` | POST | 处理上报 |
| `/api/v1/reports/{id}/close` | PUT | 关闭上报 |
| `/api/v1/reports/stats` | GET | 上报统计 |

#### 5.2.13 网格巡查

| API | 方法 | 说明 |
|---|---|---|
| `/api/v1/patrol/plans` | GET | 巡查计划列表 |
| `/api/v1/patrol/plans/{id}` | GET | 计划详情 |
| `/api/v1/patrol/plans` | POST | 新增计划 |
| `/api/v1/patrol/plans/{id}` | PUT | 更新计划 |
| `/api/v1/patrol/records` | GET | 巡查记录列表 |
| `/api/v1/patrol/records/{id}` | GET | 记录详情 |
| `/api/v1/patrol/records` | POST | 开始巡查 |
| `/api/v1/patrol/records/{id}/finish` | PUT | 完成巡查 |
| `/api/v1/patrol/checkin` | POST | 巡查打卡 |
| `/api/v1/patrol/records/{id}/checkins` | GET | 打卡记录列表 |
| `/api/v1/patrol/stats` | GET | 巡查统计 |

#### 5.2.14 任务管理

| API | 方法 | 说明 |
|---|---|---|
| `/api/v1/tasks` | GET | 任务列表 |
| `/api/v1/tasks/{id}` | GET | 任务详情 |
| `/api/v1/tasks` | POST | 创建任务 |
| `/api/v1/tasks/{id}` | PUT | 更新任务 |
| `/api/v1/tasks/{id}/assign` | PUT | 分配任务 |
| `/api/v1/tasks/{id}/execute` | PUT | 执行任务 |
| `/api/v1/tasks/{id}/complete` | PUT | 完成任务 |
| `/api/v1/tasks/{id}/close` | PUT | 关闭任务 |
| `/api/v1/tasks/stats` | GET | 任务统计 |

#### 5.2.15 工作日志

| API | 方法 | 说明 |
|---|---|---|
| `/api/v1/journals` | GET | 日志列表 |
| `/api/v1/journals/{id}` | GET | 日志详情 |
| `/api/v1/journals` | POST | 创建日志 |
| `/api/v1/journals/{id}` | PUT | 更新日志 |
| `/api/v1/journals/{id}/submit` | PUT | 提交日志 |
| `/api/v1/journals/{id}/review` | POST | 审核日志 |

#### 5.2.16 诉求处理

| API | 方法 | 说明 |
|---|---|---|
| `/api/v1/appeals` | GET | 诉求列表 |
| `/api/v1/appeals/{id}` | GET | 诉求详情 |
| `/api/v1/appeals` | POST | 提交诉求 |
| `/api/v1/appeals/{id}/accept` | PUT | 受理诉求 |
| `/api/v1/appeals/{id}/handle` | POST | 处理诉求 |
| `/api/v1/appeals/{id}/resolve` | PUT | 解决诉求 |
| `/api/v1/appeals/{id}/feedback` | POST | 反馈诉求 |
| `/api/v1/appeals/stats` | GET | 诉求统计 |

---

## 6 前端实现方案

### 6.1 前端架构策略

**不引入复杂框架**，直接基于现有HTML原型进行API对接，保持技术栈简单：

1. **保留现有HTML结构**：直接使用原型中的HTML文件
2. **保留现有CSS样式**：保留Tailwind CSS配置和自定义样式
3. **封装API调用层**：创建统一的`api.js`封装HTTP请求
4. **封装工具函数**：创建`utils.js`封装通用功能

### 6.2 前端文件结构（详见第3章项目文件结构）

### 6.3 前端改造要点

1. **API调用封装**：使用`fetch`封装统一的请求函数，自动携带JWT token
2. **登录状态管理**：使用`localStorage`存储JWT token和用户信息
3. **权限控制**：前端根据用户角色控制菜单显示和按钮可用性
4. **数据渲染**：使用JavaScript动态渲染表格、表单和列表数据
5. **表单验证**：保留原型中的验证逻辑，对接API后改为服务端验证优先
6. **分页组件**：改为调用后端分页接口，支持分页参数传递
7. **日期格式化**：统一日期时间显示格式
8. **错误处理**：统一的错误提示和异常处理机制

---

## 7 分模块实施计划

### 7.1 第一阶段：基础框架搭建（P0）

| 任务 | 说明 |
|---|---|
| 后端项目初始化 | 创建Node.js项目，配置package.json和基础依赖 |
| 环境变量配置 | 创建.env文件，配置数据库连接、JWT密钥等 |
| 数据库连接配置 | 配置Sequelize连接MySQL，创建数据库连接池 |
| 全局异常处理 | 统一错误处理中间件，统一响应格式 |
| JWT认证实现 | 登录接口、token生成、认证中间件、权限拦截 |
| 前端API封装 | 创建api.js，封装HTTP请求和认证token管理 |
| 项目结构搭建 | 创建models、controllers、routes、services、middleware等目录 |

### 7.2 第二阶段：核心模块实现（P0）

| 任务 | 说明 |
|---|---|
| 用户管理 | 村民/村干部CRUD、批量导入导出、角色权限分配 |
| 组织架构 | 树形结构维护、网格管理、负责人设置 |
| 村务公开 | 内容发布、审核流程（草稿→待审核→已发布/已撤回） |
| 事件管理 | 事件登记、分派、处置、闭环（上报→待分派→已分派→处置中→已完成→已关闭） |
| 通知公告 | 公告发布、推送范围选择、状态管理 |

### 7.3 第三阶段：业务模块实现（P1）

| 任务 | 说明 |
|---|---|
| 积分管理 | 积分规则配置、积分记录审核、积分商城、兑换记录审核 |
| 产业管理 | 产业信息维护、数据统计、年产值计算 |
| 数据统计 | 报表生成、数据导出、大屏数据接口 |
| 系统管理 | 数据字典管理、操作日志记录 |

### 7.4 第四阶段：前端对接与优化

| 任务 | 说明 |
|---|---|
| 后台管理端对接 | 各页面API对接、数据渲染、表单提交 |
| 村民H5端对接 | 首页、村务公开、办事服务、积分中心等 |
| 村干部H5端对接 | 工作台、任务管理、巡查打卡、积分审核等 |
| 大屏端对接 | 数据可视化展示、图表渲染、实时数据更新 |

---

## 8 部署方案（WSL Ubuntu-26.04）

### 8.1 部署架构

```
┌─────────────────────────────────────────────────────┐
│                  WSL Ubuntu-26.04                   │
│                                                     │
│  ┌─────────────────────────────────────────────┐    │
│  │               Nginx (端口80)                 │    │
│  │  ┌───────────────────┬─────────────────────┐ │    │
│  │  │   静态资源         │     API反向代理      │ │    │
│  │  │   (HTML/CSS/JS)    │  (/api → localhost:3000)│ │    │
│  │  └───────────────────┴─────────────────────┘ │    │
│  └─────────────────────────────────────────────┘    │
│                         │                            │
│           ┌─────────────┴─────────────┐              │
│           ▼                           ▼              │
│  ┌─────────────────┐    ┌──────────────────────┐    │
│  │  Node.js/Express│    │       MySQL 8        │    │
│  │   (3000端口)     │    │     (3306端口)       │    │
│  └─────────────────┘    └──────────────────────┘    │
│                                                     │
└─────────────────────────────────────────────────────┘
```

### 8.2 WSL环境准备

#### 8.2.1 启用WSL（已完成，跳过此步骤）

```bash
# 若尚未启用WSL，执行以下命令（管理员PowerShell）
wsl --install -d Ubuntu-26.04
```

#### 8.2.2 更新Ubuntu系统

```bash
sudo apt update && sudo apt upgrade -y
```

#### 8.2.3 安装Node.js和npm

```bash
# 使用nvm安装（推荐）
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash
source ~/.bashrc
nvm install 20
nvm use 20

# 验证安装
node --version  # 应显示 v20.x.x
npm --version   # 应显示 10.x.x
```

#### 8.2.4 安装MySQL 8

```bash
# 安装MySQL Server
sudo apt install mysql-server-8.0 -y

# 启动MySQL服务
sudo systemctl start mysql
sudo systemctl enable mysql

# 配置MySQL
sudo mysql_secure_installation

# 创建数据库
mysql -u root -p
CREATE DATABASE digitalvillages CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```

#### 8.2.5 安装Docker和Docker Compose（推荐方式）

```bash
# 安装Docker
sudo apt install docker.io -y
sudo systemctl start docker
sudo systemctl enable docker

# 安装Docker Compose
sudo apt install docker-compose -y

# 添加用户到docker组（避免每次都用sudo）
sudo usermod -aG docker $USER
```

### 8.3 Docker Compose配置

**docker-compose.yml**

```yaml
version: '3.8'

services:
  mysql:
    image: mysql:8.0
    container_name: digitalvillages-mysql
    ports:
      - "3306:3306"
    environment:
      MYSQL_ROOT_PASSWORD: ${DB_PASSWORD:-root}
      MYSQL_DATABASE: digitalvillages
      MYSQL_CHARSET: utf8mb4
      MYSQL_COLLATION: utf8mb4_unicode_ci
    volumes:
      - mysql-data:/var/lib/mysql
      - ./sql/init.sql:/docker-entrypoint-initdb.d/init.sql
    healthcheck:
      test: ["CMD", "mysqladmin", "ping", "-h", "localhost"]
      interval: 30s
      timeout: 10s
      retries: 3
    restart: unless-stopped

  backend:
    build:
      context: ./backend
      dockerfile: ../docker/backend/Dockerfile
    container_name: digitalvillages-backend
    ports:
      - "3000:3000"
    environment:
      NODE_ENV: production
      DB_HOST: mysql
      DB_PORT: 3306
      DB_USER: root
      DB_PASSWORD: ${DB_PASSWORD:-root}
      DB_NAME: digitalvillages
      JWT_SECRET: ${JWT_SECRET:-your-secret-key}
      JWT_EXPIRES_IN: ${JWT_EXPIRES_IN:-7d}
    depends_on:
      mysql:
        condition: service_healthy
    volumes:
      - ./backend:/app
      - /app/node_modules
    restart: unless-stopped

  nginx:
    build: ./docker/nginx
    container_name: digitalvillages-nginx
    ports:
      - "80:80"
    volumes:
      - ./nginx/nginx.conf:/etc/nginx/nginx.conf
      - ./html:/usr/share/nginx/html
    depends_on:
      - backend
    restart: unless-stopped

volumes:
  mysql-data:
```

### 8.4 Dockerfile配置

**docker/backend/Dockerfile**

```dockerfile
FROM node:20-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci --only=production

COPY . .

EXPOSE 3000

CMD ["node", "server.js"]
```

**docker/nginx/Dockerfile**

```dockerfile
FROM nginx:alpine

COPY nginx.conf /etc/nginx/nginx.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
```

### 8.5 Nginx配置

**nginx/nginx.conf**

```nginx
worker_processes auto;

events {
    worker_connections 1024;
}

http {
    include /etc/nginx/mime.types;
    default_type application/octet-stream;

    server {
        listen 80;
        server_name localhost;

        # 后台管理端（iframe多页应用，精确匹配HTML文件）
        location /admin/ {
            root /usr/share/nginx/html;
            index index.html;
            try_files $uri $uri/ =404;
        }

        # 村民端（单页应用）
        location /villager/ {
            root /usr/share/nginx/html;
            index index.html;
            try_files $uri $uri/ /villager/index.html;
        }

        # 村干部端（单页应用）
        location /cadre/ {
            root /usr/share/nginx/html;
            index index.html;
            try_files $uri $uri/ /cadre/index.html;
        }

        # 大屏端（单页应用）
        location /dashboard/ {
            root /usr/share/nginx/html;
            index index.html;
            try_files $uri $uri/ /dashboard/index.html;
        }

        # 图片资源
        location /images/ {
            root /usr/share/nginx/html;
            expires 30d;
        }

        # API反向代理
        location /api/ {
            proxy_pass http://backend:3000/api/;
            proxy_set_header Host $host;
            proxy_set_header X-Real-IP $remote_addr;
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
            proxy_set_header X-Forwarded-Proto $scheme;
            proxy_connect_timeout 60s;
            proxy_read_timeout 60s;
        }

        # 默认首页重定向到后台管理端
        location = / {
            redirect 301 /admin/;
        }
    }
}
```

### 8.6 package.json脚本示例

**backend/package.json**

```json
{
  "name": "digitalvillages-backend",
  "version": "1.0.0",
  "description": "数字乡村管理系统后端服务",
  "main": "server.js",
  "scripts": {
    "start": "node server.js",
    "dev": "nodemon server.js",
    "test": "jest",
    "migrate": "sequelize-cli db:migrate",
    "migrate:undo": "sequelize-cli db:migrate:undo",
    "seed": "sequelize-cli db:seed:all",
    "seed:undo": "sequelize-cli db:seed:undo:all"
  },
  "dependencies": {
    "bcryptjs": "^2.4.3",
    "cors": "^2.8.5",
    "dotenv": "^16.4.5",
    "express": "^4.19.2",
    "express-rate-limit": "^7.2.0",
    "express-validator": "^7.0.1",
    "helmet": "^7.1.0",
    "jsonwebtoken": "^9.0.2",
    "morgan": "^1.10.0",
    "multer": "^1.4.5-lts.1",
    "mysql2": "^3.9.7",
    "sequelize": "^6.37.3"
  },
  "devDependencies": {
    "nodemon": "^3.1.0",
    "sequelize-cli": "^6.6.2",
    "jest": "^29.7.0"
  }
}
```

### 8.7 环境变量配置

**backend/.env**（开发环境）

```bash
PORT=3000
HOST=localhost

DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=root
DB_NAME=digitalvillages

JWT_SECRET=digitalvillages-secret-key-2026
JWT_EXPIRES_IN=7d

UPLOAD_DIR=uploads
MAX_FILE_SIZE=10485760

LOG_LEVEL=debug
```

**backend/.env.production**（生产环境）

```bash
PORT=3000
HOST=0.0.0.0

DB_HOST=mysql
DB_PORT=3306
DB_USER=root
DB_PASSWORD=your-production-password
DB_NAME=digitalvillages

JWT_SECRET=your-production-secret-key
JWT_EXPIRES_IN=7d

UPLOAD_DIR=uploads
MAX_FILE_SIZE=10485760

LOG_LEVEL=info
```

**backend/.env.example**（环境变量示例，提交到版本控制）

```bash
PORT=3000
HOST=localhost

DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=your-db-password
DB_NAME=digitalvillages

JWT_SECRET=your-secret-key
JWT_EXPIRES_IN=7d

UPLOAD_DIR=uploads
MAX_FILE_SIZE=10485760

LOG_LEVEL=debug
```

### 8.8 部署步骤

#### 8.8.1 开发环境运行

```bash
cd /mnt/d/dev/GitHub/project/pro_digitalvillages

cd backend
npm install

npm run dev

cd ..
npx serve html -l 8080
```

#### 8.8.2 生产环境部署（Docker方式）

```bash
cd /mnt/d/dev/GitHub/project/pro_digitalvillages

cp backend/.env.production backend/.env

docker-compose up -d

docker-compose ps

docker-compose logs -f

docker-compose down
```

#### 8.8.3 手动部署（备用方式）

```bash
cd backend
npm install --production

npm install pm2 -g
pm2 start server.js --name digitalvillages-backend

sudo systemctl restart nginx
```

### 8.9 访问地址

| 端 | 地址 |
|---|---|
| 后台管理端 | http://localhost/admin |
| 村民H5端 | http://localhost/villager |
| 村干部H5端 | http://localhost/cadre |
| 大屏端 | http://localhost/dashboard |
| API接口 | http://localhost/api/v1 |

### 8.10 .gitignore文件示例

**项目根目录 .gitignore**

```
node_modules/
*.log
.env
.env.production
uploads/
.DS_Store
.vscode/
.idea/
*.swp
*.swo
```

**backend/.gitignore**

```
node_modules/
.env
.env.production
uploads/
*.log
```

### 8.11 Sequelize配置文件

**backend/sequelize.config.js**

```javascript
require('dotenv').config();

module.exports = {
  development: {
    username: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'digitalvillages',
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || 3306,
    dialect: 'mysql',
    dialectOptions: {
      charset: 'utf8mb4',
      collate: 'utf8mb4_unicode_ci'
    },
    define: {
      timestamps: true,
      underscored: true,
      createdAt: 'created_at',
      updatedAt: 'updated_at'
    }
  },
  production: {
    username: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'digitalvillages',
    host: process.env.DB_HOST || 'mysql',
    port: process.env.DB_PORT || 3306,
    dialect: 'mysql',
    dialectOptions: {
      charset: 'utf8mb4',
      collate: 'utf8mb4_unicode_ci'
    },
    define: {
      timestamps: true,
      underscored: true,
      createdAt: 'created_at',
      updatedAt: 'updated_at'
    }
  }
};
```

---

## 9 风险与注意事项

### 9.1 需求说明书截断

**问题**：需求说明书.md 文件在读取时被截断（50KB限制），部分模块的详细字段定义和业务规则未完整获取。

**处理**：执行阶段开始前，需要完整读取需求说明书.md，获取所有模块的完整业务规则。

### 9.2 数据库设计细化

当前数据库设计为概要设计，执行阶段需根据需求说明书中的详细字段定义进行细化，包括：
- 村民管理的完整字段
- 村干部管理的完整字段
- 积分规则的详细配置
- 事件处理流程的完整状态定义

### 9.3 WSL环境注意事项

- WSL文件系统路径：Windows文件位于 `/mnt/c/`、`/mnt/d/` 等挂载点
- MySQL数据文件建议放在WSL本地路径，避免跨文件系统性能问题
- Docker在WSL中运行时，需确保Docker Desktop已启用WSL集成
- Windows防火墙需允许WSL网络访问（3000、80、3306端口）

### 9.4 前端兼容性

- 后台管理端需兼容 Chrome 90+、Edge 90+、Firefox 88+
- 村民/村干部H5端需兼容微信浏览器和主流手机浏览器
- 大屏端需支持1920x1080分辨率

### 9.5 数据安全

- 密码使用bcrypt加密存储
- 身份证号、手机号需脱敏显示（中间4位用*替代）
- JWT token设置合理过期时间（建议7天）
- 接口需进行权限验证，防止越权访问
- 敏感接口需记录操作日志
- 使用helmet设置安全HTTP头，防止XSS、CSRF等攻击
- 使用express-rate-limit限制API请求频率，防止暴力攻击
- 输入参数使用express-validator进行严格校验，防止SQL注入
- 配置CORS白名单，限制跨域请求来源

### 9.6 性能优化

- 数据库查询添加适当索引
- 分页查询使用LIMIT而非全表扫描
- 前端静态资源启用gzip压缩
- 图片资源启用缓存策略

---

## 附录

### 原型文件清单

| 端 | 文件路径 | 说明 |
|---|---|---|
| 后台管理端 | html/admin/ | 登录、工作台、用户管理、事件管理等 |
| 村民H5端 | html/villager/ | 首页、村务公开、办事服务、积分中心等 |
| 村干部H5端 | html/cadre/ | 工作台、任务管理、巡查打卡、积分审核等 |
| 大屏端 | html/dashboard/ | 数据可视化展示 |

### 核心业务流程图

**事件处理流程**：上报 → 待分派 → 已分派 → 处置中 → 已完成 → 已关闭

**村务审核流程**：草稿 → 待审核 → 已发布 / 已撤回

**积分审核流程**：申请 → 待审核 → 已通过 / 已驳回

**积分兑换流程**：兑换申请 → 待审核 → 已通过 → 已发放 / 已驳回

### 默认管理员账号

| 账号 | 密码 | 角色 |
|---|---|---|
| admin | admin123 | 系统管理员 |
