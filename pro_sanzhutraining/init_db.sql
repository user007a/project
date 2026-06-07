-- =============================================
-- 叁竹培训系统 - 数据库初始化脚本
-- 数据库: MySQL 5.7+ / 8.0+
-- 字符集: utf8mb4
-- 排序规则: utf8mb4_unicode_ci
-- 版本: 1.0.0
-- =============================================

-- ----------------------------
-- 1. 创建数据库
-- ----------------------------
CREATE DATABASE IF NOT EXISTS sanzhutraining 
DEFAULT CHARACTER SET utf8mb4 
DEFAULT COLLATE utf8mb4_unicode_ci;

USE sanzhutraining;

-- ----------------------------
-- 2. 创建表结构
-- ----------------------------

-- =============================================
-- 表结构目录
-- =============================================
-- 【后台管理相关表（admin_ 前缀）】
-- 序号 | 表名 | 描述
-- 1 | admin_user | 后台管理员表
-- 2 | admin_role | 角色表
-- 3 | admin_permission | 权限表
-- 4 | admin_role_permission | 角色权限关联表
-- 5 | admin_department | 部门表
-- 
-- 【学员管理相关表（user_ 前缀）】
-- 序号 | 表名 | 描述
-- 6 | user_student | 学员表
-- 7 | user_profile | 学员资料表
-- 8 | user_education | 教育经历表
-- 9 | user_training | 培训经历表
-- 10 | user_material | 材料表
-- 
-- 【课程管理相关表（course_ 前缀）】
-- 序号 | 表名 | 描述
-- 11 | course_category | 课程分类表
-- 12 | course_info | 课程信息表
-- 13 | course_chapter | 章节表
-- 14 | course_section | 课时表
-- 15 | course_collect | 收藏表
-- 
-- 【讲师管理相关表（teacher_ 前缀）】
-- 序号 | 表名 | 描述
-- 16 | teacher_info | 讲师信息表
-- 
-- 【订单管理相关表（order_ 前缀）】
-- 序号 | 表名 | 描述
-- 17 | order_main | 订单主表
-- 18 | order_refund | 退款表
-- 19 | order_invoice | 发票表
-- 
-- 【题库管理相关表（question_ 前缀）】
-- 序号 | 表名 | 描述
-- 20 | question_topic | 专题表
-- 21 | question_info | 题目表
-- 22 | question_record | 答题记录表
-- 23 | question_mistake | 错题表
-- 
-- 【证书管理相关表（certificate_ 前缀）】
-- 序号 | 表名 | 描述
-- 24 | certificate_info | 证书表
-- 
-- 【学习管理相关表（study_ 前缀）】
-- 序号 | 表名 | 描述
-- 25 | study_record | 学习记录表
-- 26 | study_note | 学习笔记表
-- 
-- 【资讯管理相关表（news_ 前缀）】
-- 序号 | 表名 | 描述
-- 27 | news_info | 资讯表
-- 28 | news_category | 资讯分类表
-- 
-- 【机构管理相关表（institution_ 前缀）】
-- 序号 | 表名 | 描述
-- 29 | institution_info | 子机构表
-- 
-- 【分享管理相关表（share_ 前缀）】
-- 序号 | 表名 | 描述
-- 30 | share_record | 分享记录表
-- 
-- 【Banner管理相关表（banner_ 前缀）】
-- 序号 | 表名 | 描述
-- 31 | banner_info | Banner表
-- 
-- 【系统设置相关表（system_ 前缀）】
-- 序号 | 表名 | 描述
-- 32 | system_setting | 系统设置表
-- 33 | system_message | 消息表
-- 34 | system_sms_setting | 短信设置表
-- 35 | system_payment_setting | 支付设置表
-- 36 | system_user_message | 用户消息阅读表
-- 37 | db_version | 数据库版本记录表
-- =============================================

-- ====================
-- 后台管理相关表（admin_ 前缀）
-- ====================

-- 表1: admin_user - 后台管理员表
CREATE TABLE IF NOT EXISTS admin_user (
    id BIGINT AUTO_INCREMENT PRIMARY KEY COMMENT '管理员ID',
    username VARCHAR(50) NOT NULL UNIQUE COMMENT '登录用户名',
    password VARCHAR(60) NOT NULL COMMENT '密码（BCrypt加密，固定约60字符）',
    nickname VARCHAR(50) NOT NULL COMMENT '昵称/真实姓名',
    avatar VARCHAR(500) COMMENT '头像URL',
    phone VARCHAR(20) UNIQUE COMMENT '手机号',
    email VARCHAR(100) UNIQUE COMMENT '邮箱',
    role_id BIGINT NOT NULL COMMENT '角色ID',
    department_id BIGINT COMMENT '部门ID',
    status TINYINT DEFAULT 1 COMMENT '状态：0禁用/1启用',
    last_login_at DATETIME COMMENT '最后登录时间',
    last_login_ip VARCHAR(50) COMMENT '最后登录IP',
    is_del TINYINT DEFAULT 0 COMMENT '软删除标记',
    create_time DATETIME DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    update_time DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
    INDEX IX_admin_user_username (username),
    INDEX IX_admin_user_phone (phone),
    INDEX IX_admin_user_role_id (role_id),
    INDEX IX_admin_user_department_id (department_id),
    INDEX IX_admin_user_status_create_time (status, create_time),
    CONSTRAINT FK_admin_user_role FOREIGN KEY (role_id) REFERENCES admin_role(id) ON DELETE RESTRICT,
    CONSTRAINT FK_admin_user_department FOREIGN KEY (department_id) REFERENCES admin_department(id) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='后台管理员表';

-- 表2: admin_role - 角色表
CREATE TABLE IF NOT EXISTS admin_role (
    id BIGINT AUTO_INCREMENT PRIMARY KEY COMMENT '角色ID',
    name VARCHAR(50) NOT NULL UNIQUE COMMENT '角色名称',
    code VARCHAR(50) NOT NULL UNIQUE COMMENT '角色代码',
    description VARCHAR(200) COMMENT '角色描述',
    is_system TINYINT DEFAULT 0 COMMENT '是否系统预置：0否/1是',
    is_del TINYINT DEFAULT 0 COMMENT '软删除标记',
    create_time DATETIME DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    update_time DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
    INDEX IX_admin_role_code (code)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='角色表';

-- 表3: admin_permission - 权限表
CREATE TABLE IF NOT EXISTS admin_permission (
    id BIGINT AUTO_INCREMENT PRIMARY KEY COMMENT '权限ID',
    name VARCHAR(50) NOT NULL COMMENT '权限名称',
    code VARCHAR(50) NOT NULL UNIQUE COMMENT '权限代码',
    parent_id BIGINT DEFAULT 0 COMMENT '父级权限ID',
    module VARCHAR(50) NOT NULL COMMENT '所属模块',
    sort_order INT DEFAULT 0 COMMENT '排序号',
    is_del TINYINT DEFAULT 0 COMMENT '软删除标记',
    create_time DATETIME DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    update_time DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
    INDEX IX_admin_permission_code (code),
    INDEX IX_admin_permission_parent_id (parent_id),
    INDEX IX_admin_permission_module (module)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='权限表';

-- 表4: admin_role_permission - 角色权限关联表
CREATE TABLE IF NOT EXISTS admin_role_permission (
    id BIGINT AUTO_INCREMENT PRIMARY KEY COMMENT '关联ID',
    role_id BIGINT NOT NULL COMMENT '角色ID',
    permission_id BIGINT NOT NULL COMMENT '权限ID',
    is_del TINYINT DEFAULT 0 COMMENT '软删除标记',
    create_time DATETIME DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    INDEX IX_admin_role_permission_role_id (role_id),
    INDEX IX_admin_role_permission_permission_id (permission_id),
    UNIQUE INDEX UK_admin_role_permission (role_id, permission_id),
    CONSTRAINT FK_admin_role_permission_role FOREIGN KEY (role_id) REFERENCES admin_role(id) ON DELETE CASCADE,
    CONSTRAINT FK_admin_role_permission_permission FOREIGN KEY (permission_id) REFERENCES admin_permission(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='角色权限关联表';

-- 表5: admin_department - 部门表
CREATE TABLE IF NOT EXISTS admin_department (
    id BIGINT AUTO_INCREMENT PRIMARY KEY COMMENT '部门ID',
    parent_id BIGINT DEFAULT 0 COMMENT '上级部门ID',
    name VARCHAR(100) NOT NULL COMMENT '部门名称',
    manager VARCHAR(50) COMMENT '部门负责人',
    phone VARCHAR(20) COMMENT '联系电话',
    description VARCHAR(500) COMMENT '部门描述',
    sort_order INT DEFAULT 0 COMMENT '排序号',
    status TINYINT DEFAULT 1 COMMENT '状态：0禁用/1启用',
    is_del TINYINT DEFAULT 0 COMMENT '软删除标记',
    create_time DATETIME DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    update_time DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
    INDEX IX_admin_department_parent_id (parent_id),
    INDEX IX_admin_department_name (name)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='部门表';

-- ====================
-- 学员管理相关表（user_ 前缀）
-- ====================

-- 表6: user_student - 学员表
CREATE TABLE IF NOT EXISTS user_student (
    id BIGINT AUTO_INCREMENT PRIMARY KEY COMMENT '学员ID',
    nickname VARCHAR(50) NOT NULL COMMENT '昵称/姓名',
    phone VARCHAR(20) NOT NULL UNIQUE COMMENT '手机号',
    password VARCHAR(60) NOT NULL COMMENT '密码（BCrypt加密，固定约60字符）',
    avatar VARCHAR(500) COMMENT '头像URL',
    gender TINYINT DEFAULT 0 COMMENT '性别：0未知/1男/2女',
    institution_id BIGINT COMMENT '所属机构ID',
    status TINYINT DEFAULT 1 COMMENT '状态：0禁用/1正常',
    total_study_hours DECIMAL(10,1) DEFAULT 0 COMMENT '累计学时（分钟）',
    course_count INT DEFAULT 0 COMMENT '已购课程数',
    certificate_count INT DEFAULT 0 COMMENT '获取证书数',
    last_login_at DATETIME COMMENT '最后登录时间',
    is_del TINYINT DEFAULT 0 COMMENT '软删除标记',
    create_time DATETIME DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    update_time DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
    INDEX IX_user_student_phone (phone),
    INDEX IX_user_student_institution_id (institution_id),
    INDEX IX_user_student_status (status),
    INDEX IX_user_student_status_create_time (status, create_time),
    CONSTRAINT FK_user_student_institution FOREIGN KEY (institution_id) REFERENCES institution_info(id) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='学员表';

-- 表7: user_profile - 学员资料表
CREATE TABLE IF NOT EXISTS user_profile (
    id BIGINT AUTO_INCREMENT PRIMARY KEY COMMENT '资料ID',
    user_id BIGINT NOT NULL UNIQUE COMMENT '学员ID',
    real_name VARCHAR(50) NOT NULL COMMENT '真实姓名',
    id_card_type TINYINT DEFAULT 1 COMMENT '证件类型：1身份证/2护照/3其他',
    id_card_number VARCHAR(18) NOT NULL COMMENT '证件号码（身份证固定18位）',
    birth_date DATE NOT NULL COMMENT '出生日期',
    gender TINYINT NOT NULL COMMENT '性别：1男/2女',
    exam_source VARCHAR(100) COMMENT '考生来源',
    education_level VARCHAR(50) COMMENT '文化程度',
    province VARCHAR(50) COMMENT '居住省',
    city VARCHAR(50) COMMENT '居住市',
    district VARCHAR(50) COMMENT '居住区县',
    nationality VARCHAR(20) COMMENT '民族',
    political_status VARCHAR(20) COMMENT '政治面貌',
    email VARCHAR(100) COMMENT '电子邮箱',
    work_unit VARCHAR(200) COMMENT '工作单位',
    job_title VARCHAR(100) COMMENT '职务/职称',
    profession_years INT DEFAULT 0 COMMENT '从事本职业年限',
    work_start_date DATE COMMENT '参加工作时间',
    work_years INT DEFAULT 0 COMMENT '工作年限',
    exam_category_code VARCHAR(50) COMMENT '报考职业分类代码',
    exam_category_name VARCHAR(100) COMMENT '报考职业分类名称',
    appraisal_type VARCHAR(50) COMMENT '鉴定分类',
    original_profession VARCHAR(50) COMMENT '原职业',
    original_level VARCHAR(20) COMMENT '原等级',
    original_cert_no VARCHAR(50) COMMENT '原证书号',
    original_issue_date DATE COMMENT '原发证日期',
    apply_condition VARCHAR(20) COMMENT '申报条件',
    address VARCHAR(200) COMMENT '身份证地址',
    detail_address VARCHAR(200) COMMENT '详细通讯地址',
    postal_code VARCHAR(20) COMMENT '邮政编码',
    audit_status TINYINT DEFAULT 1 COMMENT '审核状态：1待提交/2审核中/3已通过/4已驳回',
    audit_remark VARCHAR(500) COMMENT '审核备注',
    submitted_at DATETIME COMMENT '提交时间',
    audited_at DATETIME COMMENT '审核时间',
    is_del TINYINT DEFAULT 0 COMMENT '软删除标记',
    create_time DATETIME DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    update_time DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
    INDEX IX_user_profile_user_id (user_id),
    INDEX IX_user_profile_audit_status (audit_status),
    INDEX IX_user_profile_id_card_number (id_card_number),
    CONSTRAINT FK_user_profile_user FOREIGN KEY (user_id) REFERENCES user_student(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='学员资料表';

-- 表8: user_education - 教育经历表
CREATE TABLE IF NOT EXISTS user_education (
    id BIGINT AUTO_INCREMENT PRIMARY KEY COMMENT '教育经历ID',
    user_id BIGINT NOT NULL COMMENT '学员ID',
    school_name VARCHAR(200) NOT NULL COMMENT '学校名称',
    major VARCHAR(100) NOT NULL COMMENT '专业',
    education VARCHAR(50) NOT NULL COMMENT '学历',
    start_date DATE NOT NULL COMMENT '开始时间',
    end_date DATE NOT NULL COMMENT '结束时间',
    is_del TINYINT DEFAULT 0 COMMENT '软删除标记',
    create_time DATETIME DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    update_time DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
    INDEX IX_user_education_user_id (user_id),
    CONSTRAINT FK_user_education_user FOREIGN KEY (user_id) REFERENCES user_student(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='教育经历表';

-- 表9: user_training - 培训经历表
CREATE TABLE IF NOT EXISTS user_training (
    id BIGINT AUTO_INCREMENT PRIMARY KEY COMMENT '培训经历ID',
    user_id BIGINT NOT NULL COMMENT '学员ID',
    training_institution VARCHAR(200) NOT NULL COMMENT '培训机构',
    training_content VARCHAR(500) NOT NULL COMMENT '培训内容',
    start_date DATE NOT NULL COMMENT '开始时间',
    end_date DATE NOT NULL COMMENT '结束时间',
    is_del TINYINT DEFAULT 0 COMMENT '软删除标记',
    create_time DATETIME DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    update_time DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
    INDEX IX_user_training_user_id (user_id),
    CONSTRAINT FK_user_training_user FOREIGN KEY (user_id) REFERENCES user_student(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='培训经历表';

-- 表10: user_material - 材料表
CREATE TABLE IF NOT EXISTS user_material (
    id BIGINT AUTO_INCREMENT PRIMARY KEY COMMENT '材料ID',
    user_id BIGINT NOT NULL COMMENT '学员ID',
    id_card_front VARCHAR(500) COMMENT '身份证正面照片URL',
    id_card_back VARCHAR(500) COMMENT '身份证背面照片URL',
    education_certificate VARCHAR(500) COMMENT '学历证书照片URL',
    work_certificate VARCHAR(500) COMMENT '工作证明照片URL',
    experience_certificate VARCHAR(500) COMMENT '从业经历证明URL',
    qualification_certificate VARCHAR(500) COMMENT '资格证书URL',
    photo_1inch JSON COMMENT '一寸照片列表（JSON格式）',
    other_materials JSON COMMENT '其他材料列表（JSON格式）',
    is_del TINYINT DEFAULT 0 COMMENT '软删除标记',
    create_time DATETIME DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    update_time DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
    INDEX IX_user_material_user_id (user_id),
    CONSTRAINT FK_user_material_user FOREIGN KEY (user_id) REFERENCES user_student(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='材料表';

-- ====================
-- 课程管理相关表（course_ 前缀）
-- ====================

-- 表11: course_category - 课程分类表
CREATE TABLE IF NOT EXISTS course_category (
    id BIGINT AUTO_INCREMENT PRIMARY KEY COMMENT '分类ID',
    parent_id BIGINT DEFAULT 0 COMMENT '父级分类ID',
    name VARCHAR(50) NOT NULL COMMENT '分类名称',
    icon VARCHAR(50) COMMENT '分类图标',
    sort_order INT DEFAULT 0 COMMENT '排序号',
    status TINYINT DEFAULT 1 COMMENT '状态：0禁用/1启用',
    course_count INT DEFAULT 0 COMMENT '课程数量（只读）',
    is_del TINYINT DEFAULT 0 COMMENT '软删除标记',
    create_time DATETIME DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    update_time DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
    INDEX IX_course_category_parent_id (parent_id),
    INDEX IX_course_category_name (name)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='课程分类表';

-- 表12: course_info - 课程信息表
CREATE TABLE IF NOT EXISTS course_info (
    id BIGINT AUTO_INCREMENT PRIMARY KEY COMMENT '课程ID',
    name VARCHAR(200) NOT NULL COMMENT '课程名称',
    category_id BIGINT NOT NULL COMMENT '分类ID',
    cover_image VARCHAR(500) COMMENT '封面图URL',
    price DECIMAL(10,2) NOT NULL COMMENT '课程价格',
    original_price DECIMAL(10,2) NOT NULL COMMENT '原价',
    duration INT DEFAULT 0 COMMENT '总课时数',
    duration_minutes MEDIUMINT DEFAULT 0 COMMENT '总时长（分钟）',
    buyer_count INT DEFAULT 0 COMMENT '购买人数',
    teacher_id BIGINT COMMENT '讲师ID',
    description TEXT COMMENT '课程简介（富文本）',
    highlights VARCHAR(1000) COMMENT '课程亮点，逗号分隔',
    status TINYINT DEFAULT 0 COMMENT '状态：0草稿/1已上架/2已下架',
    is_free TINYINT DEFAULT 0 COMMENT '是否免费：0否/1是',
    tags VARCHAR(500) COMMENT '标签（逗号分隔）',
    is_subsidy TINYINT DEFAULT 0 COMMENT '是否政府补贴课程：0否/1是',
    certificate_type VARCHAR(50) COMMENT '证书类型名称',
    is_del TINYINT DEFAULT 0 COMMENT '软删除标记',
    create_time DATETIME DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    update_time DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
    INDEX IX_course_info_category_id (category_id),
    INDEX IX_course_info_teacher_id (teacher_id),
    INDEX IX_course_info_status (status),
    INDEX IX_course_info_is_free (is_free),
    INDEX IX_course_info_category_status (category_id, status),
    FULLTEXT INDEX ft_course_info_name_description (name, description),
    CONSTRAINT FK_course_info_category FOREIGN KEY (category_id) REFERENCES course_category(id) ON DELETE RESTRICT,
    CONSTRAINT FK_course_info_teacher FOREIGN KEY (teacher_id) REFERENCES teacher_info(id) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='课程信息表';

-- 表13: course_chapter - 章节表
CREATE TABLE IF NOT EXISTS course_chapter (
    id BIGINT AUTO_INCREMENT PRIMARY KEY COMMENT '章节ID',
    course_id BIGINT NOT NULL COMMENT '课程ID',
    title VARCHAR(200) NOT NULL COMMENT '章节标题',
    sort_order INT DEFAULT 0 COMMENT '排序号',
    is_del TINYINT DEFAULT 0 COMMENT '软删除标记',
    create_time DATETIME DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    update_time DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
    INDEX IX_course_chapter_course_id (course_id),
    INDEX IX_course_chapter_sort_order (sort_order),
    CONSTRAINT FK_course_chapter_course FOREIGN KEY (course_id) REFERENCES course_info(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='章节表';

-- 表14: course_section - 课时表
CREATE TABLE IF NOT EXISTS course_section (
    id BIGINT AUTO_INCREMENT PRIMARY KEY COMMENT '课时ID',
    chapter_id BIGINT NOT NULL COMMENT '章节ID',
    title VARCHAR(200) NOT NULL COMMENT '课时标题',
    video_url VARCHAR(500) NOT NULL COMMENT '视频URL',
    duration INT NOT NULL COMMENT '视频时长（秒）',
    file_size BIGINT COMMENT '文件大小（字节）',
    is_trial TINYINT DEFAULT 0 COMMENT '是否试看：0否/1是',
    sort_order INT DEFAULT 0 COMMENT '排序号',
    is_del TINYINT DEFAULT 0 COMMENT '软删除标记',
    create_time DATETIME DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    update_time DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
    INDEX IX_course_section_chapter_id (chapter_id),
    INDEX IX_course_section_sort_order (sort_order),
    CONSTRAINT FK_course_section_chapter FOREIGN KEY (chapter_id) REFERENCES course_chapter(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='课时表';

-- 表15: course_collect - 收藏表
CREATE TABLE IF NOT EXISTS course_collect (
    id BIGINT AUTO_INCREMENT PRIMARY KEY COMMENT '收藏ID',
    user_id BIGINT NOT NULL COMMENT '用户ID',
    course_id BIGINT NOT NULL COMMENT '课程ID',
    is_del TINYINT DEFAULT 0 COMMENT '软删除标记',
    create_time DATETIME DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    INDEX IX_course_collect_user_id (user_id),
    INDEX IX_course_collect_course_id (course_id),
    UNIQUE INDEX UK_course_collect_user_course (user_id, course_id),
    CONSTRAINT FK_course_collect_user FOREIGN KEY (user_id) REFERENCES user_student(id) ON DELETE CASCADE,
    CONSTRAINT FK_course_collect_course FOREIGN KEY (course_id) REFERENCES course_info(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='收藏表';

-- ====================
-- 讲师管理相关表（teacher_ 前缀）
-- ====================

-- 表16: teacher_info - 讲师信息表
CREATE TABLE IF NOT EXISTS teacher_info (
    id BIGINT AUTO_INCREMENT PRIMARY KEY COMMENT '讲师ID',
    name VARCHAR(50) NOT NULL COMMENT '讲师姓名',
    avatar VARCHAR(500) COMMENT '头像URL',
    phone VARCHAR(20) NOT NULL UNIQUE COMMENT '手机号',
    gender TINYINT DEFAULT 0 COMMENT '性别：0未知/1男/2女',
    title VARCHAR(100) NOT NULL COMMENT '职称/头衔',
    expertise VARCHAR(500) COMMENT '专业领域',
    introduction TEXT COMMENT '个人简介',
    credentials JSON COMMENT '资质证书列表',
    course_count INT DEFAULT 0 COMMENT '授课课程数',
    student_count INT DEFAULT 0 COMMENT '累计学员数',
    rating DECIMAL(3,2) DEFAULT 0 COMMENT '平均评分',
    auth_status TINYINT DEFAULT 0 COMMENT '认证状态：0未认证/1审核中/2已认证',
    status TINYINT DEFAULT 1 COMMENT '状态：0禁用/1启用',
    linked_user_id BIGINT UNIQUE COMMENT '关联后台用户ID',
    is_del TINYINT DEFAULT 0 COMMENT '软删除标记',
    create_time DATETIME DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    update_time DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
    INDEX IX_teacher_info_phone (phone),
    INDEX IX_teacher_info_auth_status (auth_status),
    INDEX IX_teacher_info_status (status),
    CONSTRAINT FK_teacher_info_user FOREIGN KEY (linked_user_id) REFERENCES admin_user(id) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='讲师信息表';

-- ====================
-- 订单管理相关表（order_ 前缀）
-- ====================

-- 表17: order_main - 订单主表
CREATE TABLE IF NOT EXISTS order_main (
    id BIGINT AUTO_INCREMENT PRIMARY KEY COMMENT '订单ID',
    order_no VARCHAR(50) NOT NULL UNIQUE COMMENT '订单号',
    user_id BIGINT NOT NULL COMMENT '用户ID',
    user_nickname VARCHAR(50) NOT NULL COMMENT '用户昵称',
    user_phone VARCHAR(20) NOT NULL COMMENT '用户手机号',
    course_id BIGINT NOT NULL COMMENT '课程ID',
    course_name VARCHAR(200) NOT NULL COMMENT '课程名称',
    original_price DECIMAL(10,2) NOT NULL COMMENT '原价',
    discount_amount DECIMAL(10,2) DEFAULT 0 COMMENT '优惠金额',
    pay_amount DECIMAL(10,2) NOT NULL COMMENT '实付金额',
    pay_status TINYINT DEFAULT 0 COMMENT '支付状态：0待付款/1已支付/2已退款',
    pay_time DATETIME COMMENT '支付时间',
    pay_method VARCHAR(20) COMMENT '支付方式：微信/支付宝',
    pay_trade_no VARCHAR(100) COMMENT '支付流水号',
    expire_time DATETIME COMMENT '过期时间',
    is_del TINYINT DEFAULT 0 COMMENT '软删除标记',
    create_time DATETIME DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    update_time DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
    INDEX IX_order_main_order_no (order_no),
    INDEX IX_order_main_user_id (user_id),
    INDEX IX_order_main_pay_status (pay_status),
    INDEX IX_order_main_create_time (create_time),
    INDEX IX_order_main_user_paystatus (user_id, pay_status),
    CONSTRAINT FK_order_main_user FOREIGN KEY (user_id) REFERENCES user_student(id) ON DELETE RESTRICT,
    CONSTRAINT FK_order_main_course FOREIGN KEY (course_id) REFERENCES course_info(id) ON DELETE RESTRICT
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='订单主表';

-- 表18: order_refund - 退款表
CREATE TABLE IF NOT EXISTS order_refund (
    id BIGINT AUTO_INCREMENT PRIMARY KEY COMMENT '退款ID',
    refund_no VARCHAR(50) NOT NULL UNIQUE COMMENT '退款单号',
    order_id BIGINT NOT NULL COMMENT '订单ID',
    order_no VARCHAR(50) NOT NULL COMMENT '订单号',
    user_id BIGINT NOT NULL COMMENT '用户ID',
    user_nickname VARCHAR(50) NOT NULL COMMENT '用户昵称',
    course_name VARCHAR(200) NOT NULL COMMENT '课程名称',
    refund_amount DECIMAL(10,2) NOT NULL COMMENT '退款金额',
    refund_reason TEXT NOT NULL COMMENT '退款原因',
    status TINYINT DEFAULT 0 COMMENT '状态：0待审核/1已通过/2已拒绝/3已退款',
    reviewer_id BIGINT COMMENT '审核员ID',
    review_remark VARCHAR(500) COMMENT '审核备注',
    review_time DATETIME COMMENT '审核时间',
    refund_time DATETIME COMMENT '退款完成时间',
    refund_trade_no VARCHAR(100) COMMENT '退款流水号',
    is_del TINYINT DEFAULT 0 COMMENT '软删除标记',
    create_time DATETIME DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    update_time DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
    INDEX IX_order_refund_refund_no (refund_no),
    INDEX IX_order_refund_order_id (order_id),
    INDEX IX_order_refund_status (status),
    INDEX IX_order_refund_user_status (user_id, status),
    CONSTRAINT FK_order_refund_order FOREIGN KEY (order_id) REFERENCES order_main(id) ON DELETE CASCADE,
    CONSTRAINT FK_order_refund_user FOREIGN KEY (user_id) REFERENCES user_student(id) ON DELETE RESTRICT,
    CONSTRAINT FK_order_refund_reviewer FOREIGN KEY (reviewer_id) REFERENCES admin_user(id) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='退款表';

-- 表19: order_invoice - 发票表
CREATE TABLE IF NOT EXISTS order_invoice (
    id BIGINT AUTO_INCREMENT PRIMARY KEY COMMENT '发票ID',
    invoice_no VARCHAR(50) NOT NULL UNIQUE COMMENT '发票号',
    user_id BIGINT NOT NULL COMMENT '用户ID',
    order_id BIGINT NOT NULL COMMENT '订单ID',
    order_no VARCHAR(50) NOT NULL COMMENT '订单号',
    invoice_title VARCHAR(200) NOT NULL COMMENT '发票抬头',
    invoice_type TINYINT DEFAULT 1 COMMENT '发票类型：1个人/2企业',
    taxpayer_id VARCHAR(50) COMMENT '纳税人识别号',
    invoice_content VARCHAR(200) NOT NULL COMMENT '发票内容',
    invoice_amount DECIMAL(10,2) NOT NULL COMMENT '发票金额',
    invoice_email VARCHAR(100) NOT NULL COMMENT '接收邮箱',
    receiving_address TEXT COMMENT '邮寄地址',
    status TINYINT DEFAULT 0 COMMENT '状态：0待开具/1已开具/2已邮寄/3已收票',
    invoice_pdf VARCHAR(500) COMMENT '电子发票PDF地址',
    express_company VARCHAR(50) COMMENT '快递公司',
    express_no VARCHAR(50) COMMENT '快递单号',
    is_del TINYINT DEFAULT 0 COMMENT '软删除标记',
    create_time DATETIME DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    update_time DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
    INDEX IX_order_invoice_invoice_no (invoice_no),
    INDEX IX_order_invoice_user_id (user_id),
    INDEX IX_order_invoice_order_id (order_id),
    INDEX IX_order_invoice_status (status),
    CONSTRAINT FK_order_invoice_user FOREIGN KEY (user_id) REFERENCES user_student(id) ON DELETE RESTRICT,
    CONSTRAINT FK_order_invoice_order FOREIGN KEY (order_id) REFERENCES order_main(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='发票表';

-- ====================
-- 题库管理相关表（question_ 前缀）
-- ====================

-- 表20: question_topic - 专题表
CREATE TABLE IF NOT EXISTS question_topic (
    id BIGINT AUTO_INCREMENT PRIMARY KEY COMMENT '专题ID',
    name VARCHAR(100) NOT NULL COMMENT '专题名称',
    category_id BIGINT COMMENT '课程分类ID',
    course_id BIGINT COMMENT '所属课程ID',
    total_questions INT DEFAULT 0 COMMENT '总题数',
    is_del TINYINT DEFAULT 0 COMMENT '软删除标记',
    create_time DATETIME DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    update_time DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
    INDEX IX_question_topic_category_id (category_id),
    INDEX IX_question_topic_course_id (course_id),
    INDEX IX_question_topic_name (name),
    CONSTRAINT FK_question_topic_category FOREIGN KEY (category_id) REFERENCES course_category(id) ON DELETE SET NULL,
    CONSTRAINT FK_question_topic_course FOREIGN KEY (course_id) REFERENCES course_info(id) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='专题表';

-- 表21: question_info - 题目表
CREATE TABLE IF NOT EXISTS question_info (
    id BIGINT AUTO_INCREMENT PRIMARY KEY COMMENT '题目ID',
    topic_id BIGINT NOT NULL COMMENT '专题ID',
    course_id BIGINT COMMENT '所属课程ID',
    type TINYINT NOT NULL COMMENT '题型：1单选/2多选/3判断/4简答',
    difficulty TINYINT DEFAULT 1 COMMENT '难度：1简单/2中等/3困难',
    content TEXT NOT NULL COMMENT '题目内容',
    options JSON COMMENT '选项列表（单选/多选）',
    answer_text TEXT COMMENT '答案（简答/判断）',
    explanation TEXT COMMENT '题目解析',
    score INT DEFAULT 10 COMMENT '分值',
    is_del TINYINT DEFAULT 0 COMMENT '软删除标记',
    create_time DATETIME DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    update_time DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
    INDEX IX_question_info_topic_id (topic_id),
    INDEX IX_question_info_course_id (course_id),
    INDEX IX_question_info_type (type),
    CONSTRAINT FK_question_info_topic FOREIGN KEY (topic_id) REFERENCES question_topic(id) ON DELETE CASCADE,
    CONSTRAINT FK_question_info_course FOREIGN KEY (course_id) REFERENCES course_info(id) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='题目表';

-- 表22: question_record - 答题记录表
CREATE TABLE IF NOT EXISTS question_record (
    id BIGINT AUTO_INCREMENT PRIMARY KEY COMMENT '记录ID',
    user_id BIGINT NOT NULL COMMENT '用户ID',
    topic_id BIGINT NOT NULL COMMENT '专题ID',
    question_id BIGINT NOT NULL COMMENT '题目ID',
    user_answer JSON NOT NULL COMMENT '用户答案',
    is_correct TINYINT NOT NULL COMMENT '是否正确：0否/1是',
    practice_time DATETIME NOT NULL COMMENT '练习时间',
    duration INT DEFAULT 0 COMMENT '答题时长（秒）',
    is_del TINYINT DEFAULT 0 COMMENT '软删除标记',
    create_time DATETIME DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    INDEX IX_question_record_user_id (user_id),
    INDEX IX_question_record_topic_id (topic_id),
    INDEX IX_question_record_practice_time (practice_time),
    INDEX IX_question_record_user_topic (user_id, topic_id),
    INDEX IX_question_record_topic_correct (topic_id, is_correct),
    CONSTRAINT FK_question_record_user FOREIGN KEY (user_id) REFERENCES user_student(id) ON DELETE CASCADE,
    CONSTRAINT FK_question_record_topic FOREIGN KEY (topic_id) REFERENCES question_topic(id) ON DELETE CASCADE,
    CONSTRAINT FK_question_record_question FOREIGN KEY (question_id) REFERENCES question_info(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='答题记录表';

-- 表23: question_mistake - 错题表
CREATE TABLE IF NOT EXISTS question_mistake (
    id BIGINT AUTO_INCREMENT PRIMARY KEY COMMENT '错题ID',
    user_id BIGINT NOT NULL COMMENT '用户ID',
    question_id BIGINT NOT NULL COMMENT '题目ID',
    wrong_count INT DEFAULT 1 COMMENT '错误次数',
    last_wrong_time DATETIME NOT NULL COMMENT '最后错误时间',
    mastered TINYINT DEFAULT 0 COMMENT '是否已掌握：0否/1是',
    is_del TINYINT DEFAULT 0 COMMENT '软删除标记',
    create_time DATETIME DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    update_time DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
    INDEX IX_question_mistake_user_id (user_id),
    INDEX IX_question_mistake_question_id (question_id),
    INDEX IX_question_mistake_mastered (mastered),
    UNIQUE INDEX UK_question_mistake_user_question (user_id, question_id),
    CONSTRAINT FK_question_mistake_user FOREIGN KEY (user_id) REFERENCES user_student(id) ON DELETE CASCADE,
    CONSTRAINT FK_question_mistake_question FOREIGN KEY (question_id) REFERENCES question_info(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='错题表';

-- ====================
-- 证书管理相关表（certificate_ 前缀）
-- ====================

-- 表24: certificate_info - 证书表
CREATE TABLE IF NOT EXISTS certificate_info (
    id BIGINT AUTO_INCREMENT PRIMARY KEY COMMENT '证书ID',
    certificate_no VARCHAR(50) NOT NULL UNIQUE COMMENT '证书编号',
    user_id BIGINT NOT NULL COMMENT '用户ID',
    user_name VARCHAR(50) NOT NULL COMMENT '用户姓名',
    user_idcard VARCHAR(18) NOT NULL COMMENT '用户身份证号（脱敏）',
    course_id BIGINT NOT NULL COMMENT '课程ID',
    course_name VARCHAR(200) NOT NULL COMMENT '课程名称',
    certificate_type VARCHAR(50) NOT NULL COMMENT '证书类型名称',
    issue_date DATE COMMENT '发证日期',
    expiry_date DATE COMMENT '有效期至（NULL表示永久有效）',
    status TINYINT DEFAULT 0 COMMENT '状态：0待审核/1已通过/2已拒绝/3已发放',
    review_user_id BIGINT COMMENT '审核员ID',
    review_remark VARCHAR(500) COMMENT '审核备注',
    review_time DATETIME COMMENT '审核时间',
    pdf_url VARCHAR(500) COMMENT '电子证书PDF地址',
    is_del TINYINT DEFAULT 0 COMMENT '软删除标记',
    create_time DATETIME DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    update_time DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
    INDEX IX_certificate_info_certificate_no (certificate_no),
    INDEX IX_certificate_info_user_id (user_id),
    INDEX IX_certificate_info_status (status),
    INDEX IX_certificate_info_user_status (user_id, status),
    CONSTRAINT FK_certificate_info_user FOREIGN KEY (user_id) REFERENCES user_student(id) ON DELETE RESTRICT,
    CONSTRAINT FK_certificate_info_course FOREIGN KEY (course_id) REFERENCES course_info(id) ON DELETE RESTRICT,
    CONSTRAINT FK_certificate_info_reviewer FOREIGN KEY (review_user_id) REFERENCES admin_user(id) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='证书表';

-- ====================
-- 学习管理相关表（study_ 前缀）
-- ====================

-- 表25: study_record - 学习记录表
CREATE TABLE IF NOT EXISTS study_record (
    id BIGINT AUTO_INCREMENT PRIMARY KEY COMMENT '记录ID',
    user_id BIGINT NOT NULL COMMENT '用户ID',
    course_id BIGINT NOT NULL COMMENT '课程ID',
    course_name VARCHAR(200) NOT NULL COMMENT '课程名称',
    chapter_id BIGINT COMMENT '章节ID',
    chapter_name VARCHAR(200) COMMENT '章节名称',
    section_id BIGINT COMMENT '课时ID',
    section_name VARCHAR(200) COMMENT '课时名称',
    study_duration INT NOT NULL COMMENT '学习时长（分钟）',
    study_time DATETIME NOT NULL COMMENT '学习时间',
    video_progress DECIMAL(5,2) DEFAULT 0 COMMENT '视频进度百分比',
    is_complete TINYINT DEFAULT 0 COMMENT '是否已完成：0否/1是',
    is_del TINYINT DEFAULT 0 COMMENT '软删除标记',
    create_time DATETIME DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    INDEX IX_study_record_user_id (user_id),
    INDEX IX_study_record_course_id (course_id),
    INDEX IX_study_record_study_time (study_time),
    INDEX IX_study_record_user_course (user_id, course_id),
    CONSTRAINT FK_study_record_user FOREIGN KEY (user_id) REFERENCES user_student(id) ON DELETE CASCADE,
    CONSTRAINT FK_study_record_course FOREIGN KEY (course_id) REFERENCES course_info(id) ON DELETE CASCADE,
    CONSTRAINT FK_study_record_chapter FOREIGN KEY (chapter_id) REFERENCES course_chapter(id) ON DELETE SET NULL,
    CONSTRAINT FK_study_record_section FOREIGN KEY (section_id) REFERENCES course_section(id) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='学习记录表';

-- 表26: study_note - 学习笔记表
CREATE TABLE IF NOT EXISTS study_note (
    id BIGINT AUTO_INCREMENT PRIMARY KEY COMMENT '笔记ID',
    user_id BIGINT NOT NULL COMMENT '用户ID',
    course_id BIGINT NOT NULL COMMENT '课程ID',
    chapter_id BIGINT COMMENT '章节ID',
    section_id BIGINT COMMENT '课时ID',
    content TEXT NOT NULL COMMENT '笔记内容',
    note_time DATETIME NOT NULL COMMENT '笔记时间',
    is_del TINYINT DEFAULT 0 COMMENT '软删除标记',
    create_time DATETIME DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    update_time DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
    INDEX IX_study_note_user_id (user_id),
    INDEX IX_study_note_course_id (course_id),
    CONSTRAINT FK_study_note_user FOREIGN KEY (user_id) REFERENCES user_student(id) ON DELETE CASCADE,
    CONSTRAINT FK_study_note_course FOREIGN KEY (course_id) REFERENCES course_info(id) ON DELETE CASCADE,
    CONSTRAINT FK_study_note_chapter FOREIGN KEY (chapter_id) REFERENCES course_chapter(id) ON DELETE SET NULL,
    CONSTRAINT FK_study_note_section FOREIGN KEY (section_id) REFERENCES course_section(id) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='学习笔记表';

-- ====================
-- 资讯管理相关表（news_ 前缀）
-- ====================

-- 表27: news_info - 资讯表
CREATE TABLE IF NOT EXISTS news_info (
    id BIGINT AUTO_INCREMENT PRIMARY KEY COMMENT '资讯ID',
    title VARCHAR(200) NOT NULL COMMENT '资讯标题',
    cover_image VARCHAR(500) COMMENT '封面图URL',
    category_id BIGINT NOT NULL COMMENT '分类ID',
    summary VARCHAR(500) COMMENT '摘要简介',
    content TEXT NOT NULL COMMENT '资讯正文',
    author VARCHAR(50) NOT NULL COMMENT '作者',
    source VARCHAR(100) COMMENT '来源',
    view_count INT DEFAULT 0 COMMENT '阅读量',
    is_top TINYINT DEFAULT 0 COMMENT '是否置顶：0否/1是',
    is_recommend TINYINT DEFAULT 0 COMMENT '是否推荐：0否/1是',
    status TINYINT DEFAULT 0 COMMENT '状态：0草稿/1已发布/2已下架',
    published_at DATETIME COMMENT '发布时间',
    tag_type TINYINT DEFAULT 1 COMMENT '标签类型：1政策解读/2备考指南/3平台公告/4行业动态/5功能更新',
    is_del TINYINT DEFAULT 0 COMMENT '软删除标记',
    create_time DATETIME DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    update_time DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
    INDEX IX_news_info_category_id (category_id),
    INDEX IX_news_info_status (status),
    INDEX IX_news_info_is_top (is_top),
    INDEX IX_news_info_tag_type (tag_type),
    FULLTEXT INDEX ft_news_info_title_content (title, content),
    CONSTRAINT FK_news_info_category FOREIGN KEY (category_id) REFERENCES news_category(id) ON DELETE RESTRICT
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='资讯表';

-- 表28: news_category - 资讯分类表
CREATE TABLE IF NOT EXISTS news_category (
    id BIGINT AUTO_INCREMENT PRIMARY KEY COMMENT '分类ID',
    name VARCHAR(50) NOT NULL COMMENT '分类名称',
    parent_id BIGINT DEFAULT 0 COMMENT '父级分类ID',
    icon VARCHAR(50) COMMENT '分类图标',
    sort_order INT DEFAULT 0 COMMENT '排序号',
    article_count INT DEFAULT 0 COMMENT '资讯数量',
    status TINYINT DEFAULT 1 COMMENT '状态：0禁用/1启用',
    is_del TINYINT DEFAULT 0 COMMENT '软删除标记',
    create_time DATETIME DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    update_time DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
    INDEX IX_news_category_parent_id (parent_id),
    INDEX IX_news_category_name (name)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='资讯分类表';

-- ====================
-- 机构管理相关表（institution_ 前缀）
-- ====================

-- 表29: institution_info - 子机构表
CREATE TABLE IF NOT EXISTS institution_info (
    id BIGINT AUTO_INCREMENT PRIMARY KEY COMMENT '机构ID',
    name VARCHAR(200) NOT NULL UNIQUE COMMENT '机构名称',
    manager VARCHAR(50) NOT NULL COMMENT '负责人',
    phone VARCHAR(20) NOT NULL COMMENT '联系电话',
    address VARCHAR(500) NOT NULL COMMENT '机构地址',
    province VARCHAR(50) COMMENT '省份',
    city VARCHAR(50) COMMENT '城市',
    student_count INT DEFAULT 0 COMMENT '学员总数',
    order_count INT DEFAULT 0 COMMENT '订单总数',
    cooperation_start DATE NOT NULL COMMENT '合作开始时间',
    cooperation_end DATE COMMENT '合作结束时间',
    status TINYINT DEFAULT 1 COMMENT '状态：0停运/1正常运营',
    remark TEXT COMMENT '备注说明',
    is_del TINYINT DEFAULT 0 COMMENT '软删除标记',
    create_time DATETIME DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    update_time DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
    INDEX IX_institution_info_name (name),
    INDEX IX_institution_info_province (province),
    INDEX IX_institution_info_status (status)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='子机构表';

-- ====================
-- 分享管理相关表（share_ 前缀）
-- ====================

-- 表30: share_record - 分享记录表
CREATE TABLE IF NOT EXISTS share_record (
    id BIGINT AUTO_INCREMENT PRIMARY KEY COMMENT '分享ID',
    user_id BIGINT COMMENT '用户ID',
    course_id BIGINT NOT NULL COMMENT '课程ID',
    share_url VARCHAR(500) NOT NULL COMMENT '分享链接URL',
    share_code VARCHAR(50) NOT NULL COMMENT '分享码',
    share_count INT DEFAULT 1 COMMENT '分享次数',
    new_student_count INT DEFAULT 0 COMMENT '新学员数',
    conversion_rate DECIMAL(5,2) DEFAULT 0 COMMENT '转化率',
    is_del TINYINT DEFAULT 0 COMMENT '软删除标记',
    create_time DATETIME DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    INDEX IX_share_record_user_id (user_id),
    INDEX IX_share_record_course_id (course_id),
    INDEX IX_share_record_share_code (share_code),
    CONSTRAINT FK_share_record_user FOREIGN KEY (user_id) REFERENCES user_student(id) ON DELETE CASCADE,
    CONSTRAINT FK_share_record_course FOREIGN KEY (course_id) REFERENCES course_info(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='分享记录表';

-- ====================
-- Banner管理相关表（banner_ 前缀）
-- ====================

-- 表31: banner_info - Banner表
CREATE TABLE IF NOT EXISTS banner_info (
    id BIGINT AUTO_INCREMENT PRIMARY KEY COMMENT 'BannerID',
    title VARCHAR(200) NOT NULL COMMENT 'Banner标题',
    image_url VARCHAR(500) NOT NULL COMMENT 'Banner图片URL',
    link_url VARCHAR(500) COMMENT '跳转链接地址',
    sort_order INT DEFAULT 0 COMMENT '排序号',
    platform TINYINT DEFAULT 1 COMMENT '展示平台：1PC网站/2小程序/3全部',
    status TINYINT DEFAULT 1 COMMENT '状态：0禁用/1启用',
    is_del TINYINT DEFAULT 0 COMMENT '软删除标记',
    create_time DATETIME DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    update_time DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
    INDEX IX_banner_info_sort_order (sort_order),
    INDEX IX_banner_info_status (status),
    INDEX IX_banner_info_platform (platform)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='Banner表';

-- ====================
-- 系统设置相关表（system_ 前缀）
-- ====================

-- 表32: system_setting - 系统设置表
CREATE TABLE IF NOT EXISTS system_setting (
    id BIGINT AUTO_INCREMENT PRIMARY KEY COMMENT '设置ID',
    `key` VARCHAR(100) NOT NULL UNIQUE COMMENT '设置键名',
    `value` TEXT NOT NULL COMMENT '设置值',
    description VARCHAR(200) COMMENT '设置描述',
    category VARCHAR(50) COMMENT '设置分类',
    is_del TINYINT DEFAULT 0 COMMENT '软删除标记',
    create_time DATETIME DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    update_time DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
    INDEX IX_system_setting_key (`key`),
    INDEX IX_system_setting_category (category)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='系统设置表';

-- 表33: system_message - 消息表
CREATE TABLE IF NOT EXISTS system_message (
    id BIGINT AUTO_INCREMENT PRIMARY KEY COMMENT '消息ID',
    title VARCHAR(200) NOT NULL COMMENT '消息标题',
    content TEXT NOT NULL COMMENT '消息内容',
    type TINYINT DEFAULT 1 COMMENT '类型：1系统通知/2课程通知/3订单通知/4考试通知',
    target_type TINYINT DEFAULT 1 COMMENT '发送对象：1全体用户/2指定角色/3指定用户',
    target_roles JSON COMMENT '指定角色ID列表',
    target_users JSON COMMENT '指定用户ID列表',
    send_method TINYINT DEFAULT 1 COMMENT '发送方式：1站内信/2短信/3邮件',
    send_status TINYINT DEFAULT 0 COMMENT '发送状态：0待发送/1发送中/2已发送/3发送失败',
    read_count INT DEFAULT 0 COMMENT '已读人数',
    send_time DATETIME COMMENT '发送时间',
    is_del TINYINT DEFAULT 0 COMMENT '软删除标记',
    create_time DATETIME DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    INDEX IX_system_message_type (type),
    INDEX IX_system_message_send_status (send_status),
    INDEX IX_system_message_send_time (send_time)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='消息表';

-- 表34: system_sms_setting - 短信设置表
CREATE TABLE IF NOT EXISTS system_sms_setting (
    id BIGINT AUTO_INCREMENT PRIMARY KEY COMMENT '设置ID',
    provider VARCHAR(50) NOT NULL COMMENT '短信服务商',
    api_key VARCHAR(200) NOT NULL COMMENT 'API Key',
    api_secret VARCHAR(200) NOT NULL COMMENT 'API Secret',
    sign_name VARCHAR(50) NOT NULL COMMENT '短信签名',
    template_register VARCHAR(50) COMMENT '注册验证码模板ID',
    template_login VARCHAR(50) COMMENT '登录验证码模板ID',
    template_payment VARCHAR(50) COMMENT '支付通知模板ID',
    template_refund VARCHAR(50) COMMENT '退款通知模板ID',
    template_certificate VARCHAR(50) COMMENT '证书通知模板ID',
    status TINYINT DEFAULT 1 COMMENT '状态：0禁用/1启用',
    is_del TINYINT DEFAULT 0 COMMENT '软删除标记',
    create_time DATETIME DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    update_time DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='短信设置表';

-- 表35: system_payment_setting - 支付设置表
CREATE TABLE IF NOT EXISTS system_payment_setting (
    id BIGINT AUTO_INCREMENT PRIMARY KEY COMMENT '设置ID',
    payment_type TINYINT NOT NULL COMMENT '支付类型：1微信支付/2支付宝',
    app_id VARCHAR(100) NOT NULL COMMENT 'AppID',
    mch_id VARCHAR(50) NOT NULL COMMENT '商户ID',
    api_key VARCHAR(200) NOT NULL COMMENT 'API密钥',
    private_key TEXT COMMENT '私钥（PEM格式）',
    public_key TEXT COMMENT '公钥（PEM格式）',
    notify_url VARCHAR(500) NOT NULL COMMENT '回调通知URL',
    status TINYINT DEFAULT 1 COMMENT '状态：0禁用/1启用',
    is_del TINYINT DEFAULT 0 COMMENT '软删除标记',
    create_time DATETIME DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    update_time DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='支付设置表';

-- 表36: system_user_message - 用户消息阅读表
CREATE TABLE IF NOT EXISTS system_user_message (
    id BIGINT AUTO_INCREMENT PRIMARY KEY COMMENT '记录ID',
    message_id BIGINT NOT NULL COMMENT '消息ID',
    user_id BIGINT NOT NULL COMMENT '用户ID',
    is_read TINYINT DEFAULT 0 COMMENT '是否已读：0否/1是',
    read_time DATETIME COMMENT '阅读时间',
    is_del TINYINT DEFAULT 0 COMMENT '软删除标记',
    create_time DATETIME DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    INDEX IX_system_user_message_message_id (message_id),
    INDEX IX_system_user_message_user_id (user_id),
    INDEX IX_system_user_message_is_read (is_read),
    UNIQUE INDEX UK_system_user_message (message_id, user_id),
    CONSTRAINT FK_system_user_message_message FOREIGN KEY (message_id) REFERENCES system_message(id) ON DELETE CASCADE,
    CONSTRAINT FK_system_user_message_user FOREIGN KEY (user_id) REFERENCES user_student(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='用户消息阅读表';

-- 表37: db_version - 数据库版本记录表
CREATE TABLE IF NOT EXISTS db_version (
    id BIGINT AUTO_INCREMENT PRIMARY KEY COMMENT '版本ID',
    version VARCHAR(20) NOT NULL COMMENT '版本号',
    description VARCHAR(500) COMMENT '版本描述',
    applied_at DATETIME DEFAULT CURRENT_TIMESTAMP COMMENT '应用时间',
    applied_by VARCHAR(50) COMMENT '应用人'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='数据库版本记录表';

-- ----------------------------
-- 3. 创建视图
-- ----------------------------

-- 学员学习统计视图
CREATE VIEW v_student_study_stats AS
SELECT 
    u.id AS user_id,
    u.nickname,
    u.phone,
    COUNT(DISTINCT r.course_id) AS course_count,
    SUM(r.study_duration) AS total_study_minutes,
    MAX(r.study_time) AS last_study_time,
    AVG(r.video_progress) AS avg_progress
FROM user_student u
LEFT JOIN study_record r ON u.id = r.user_id AND r.is_del = 0
WHERE u.is_del = 0
GROUP BY u.id, u.nickname, u.phone;

-- 课程销售统计视图
CREATE VIEW v_course_sales_stats AS
SELECT 
    c.id AS course_id,
    c.name AS course_name,
    COUNT(DISTINCT o.user_id) AS buyer_count,
    SUM(o.pay_amount) AS total_revenue,
    AVG(o.pay_amount) AS avg_order_amount
FROM course_info c
LEFT JOIN order_main o ON c.id = o.course_id AND o.pay_status = 1 AND o.is_del = 0
WHERE c.is_del = 0
GROUP BY c.id, c.name;

-- 题库答题统计视图
CREATE VIEW v_question_stats AS
SELECT 
    t.id AS topic_id,
    t.name AS topic_name,
    COUNT(q.id) AS total_questions,
    COUNT(r.id) AS total_answers,
    SUM(CASE WHEN r.is_correct = 1 THEN 1 ELSE 0 END) AS correct_count,
    CASE WHEN COUNT(r.id) > 0 THEN SUM(CASE WHEN r.is_correct = 1 THEN 1 ELSE 0 END) / COUNT(r.id) * 100 ELSE 0 END AS correct_rate
FROM question_topic t
LEFT JOIN question_info q ON t.id = q.topic_id AND q.is_del = 0
LEFT JOIN question_record r ON q.id = r.question_id AND r.is_del = 0
WHERE t.is_del = 0
GROUP BY t.id, t.name;

-- 学员证书统计视图
CREATE VIEW v_student_certificate_stats AS
SELECT 
    u.id AS user_id,
    u.nickname,
    COUNT(c.id) AS certificate_count,
    GROUP_CONCAT(c.certificate_type SEPARATOR ', ') AS certificate_types
FROM user_student u
LEFT JOIN certificate_info c ON u.id = c.user_id AND c.is_del = 0 AND c.status = 3
WHERE u.is_del = 0
GROUP BY u.id, u.nickname;

-- 课程章节课时统计视图
CREATE VIEW v_course_chapter_section AS
SELECT 
    c.id AS course_id,
    c.name AS course_name,
    COUNT(ch.id) AS chapter_count,
    COUNT(s.id) AS section_count,
    SUM(s.duration) AS total_duration_seconds
FROM course_info c
LEFT JOIN course_chapter ch ON c.id = ch.course_id AND ch.is_del = 0
LEFT JOIN course_section s ON ch.id = s.chapter_id AND s.is_del = 0
WHERE c.is_del = 0
GROUP BY c.id, c.name;

-- ----------------------------
-- 4. 创建触发器
-- ----------------------------

-- 自动更新课程购买人数
DELIMITER //
CREATE TRIGGER trg_order_after_insert 
AFTER INSERT ON order_main
FOR EACH ROW
BEGIN
    UPDATE course_info 
    SET buyer_count = buyer_count + 1 
    WHERE id = NEW.course_id;
END //

-- 自动更新学员学习时长
CREATE TRIGGER trg_study_after_insert 
AFTER INSERT ON study_record
FOR EACH ROW
BEGIN
    UPDATE user_student 
    SET total_study_hours = total_study_hours + NEW.study_duration 
    WHERE id = NEW.user_id;
END //

-- 自动更新机构学员数
CREATE TRIGGER trg_student_after_insert 
AFTER INSERT ON user_student
FOR EACH ROW
BEGIN
    IF NEW.institution_id IS NOT NULL THEN
        UPDATE institution_info 
        SET student_count = student_count + 1 
        WHERE id = NEW.institution_id;
    END IF;
END //

-- 自动更新机构订单数
CREATE TRIGGER trg_order_institution_update 
AFTER INSERT ON order_main
FOR EACH ROW
BEGIN
    UPDATE user_student u
    JOIN institution_info i ON u.institution_id = i.id
    SET i.order_count = i.order_count + 1
    WHERE u.id = NEW.user_id AND u.institution_id IS NOT NULL;
END //

-- 更新用户消息阅读状态时更新消息已读人数
CREATE TRIGGER trg_user_message_read_update 
AFTER UPDATE ON system_user_message
FOR EACH ROW
BEGIN
    IF OLD.is_read = 0 AND NEW.is_read = 1 THEN
        UPDATE system_message 
        SET read_count = read_count + 1 
        WHERE id = NEW.message_id;
    END IF;
END //
DELIMITER ;

-- ----------------------------
-- 5. 插入初始数据
-- ----------------------------

-- 记录当前数据库版本
INSERT INTO db_version (version, description) VALUES ('1.0.0', '初始版本，包含37张业务表、5个统计视图、5个触发器');

-- 插入默认角色
INSERT INTO admin_role (name, code, description, is_system) VALUES
('超级管理员', 'admin', '系统最高权限角色', 1),
('运营数据员', 'operator', '负责日常运营和数据管理', 1);

-- 插入默认权限
INSERT INTO admin_permission (name, code, parent_id, module, sort_order) VALUES
-- 工作台
('工作台', 'dashboard', 0, '工作台', 1),
-- 学员中心
('学员中心', 'student_center', 0, '学员中心', 2),
('学员管理', 'student_manage', 2, '学员中心', 21),
('学习记录', 'study_record', 2, '学员中心', 22),
-- 课程中心
('课程中心', 'course_center', 0, '课程中心', 3),
('课程管理', 'course_manage', 3, '课程中心', 31),
('题库管理', 'question_manage', 3, '课程中心', 32),
('课程分类', 'category_manage', 3, '课程中心', 33),
('课程分享', 'share_manage', 3, '课程中心', 34),
-- 订单中心
('订单中心', 'order_center', 0, '订单中心', 4),
('订单管理', 'order_manage', 4, '订单中心', 41),
('退款管理', 'refund_manage', 4, '订单中心', 42),
('发票管理', 'invoice_manage', 4, '订单中心', 43),
-- 讲师中心
('讲师中心', 'teacher_center', 0, '讲师中心', 5),
('讲师管理', 'teacher_manage', 5, '讲师中心', 51),
-- 证书中心
('证书中心', 'certificate_center', 0, '证书中心', 6),
('证书管理', 'certificate_manage', 6, '证书中心', 61),
('证书查询', 'certificate_query', 6, '证书中心', 62),
-- 内容中心
('内容中心', 'content_center', 0, '内容中心', 7),
('资讯管理', 'article_manage', 7, '内容中心', 71),
('资讯分类', 'article_category', 7, '内容中心', 72),
-- 系统设置
('系统设置', 'system_center', 0, '系统设置', 8),
('用户管理', 'user_manage', 8, '系统设置', 81),
('角色权限', 'role_permission', 8, '系统设置', 82),
('消息管理', 'message_manage', 8, '系统设置', 83),
('基础设置', 'basic_setting', 8, '系统设置', 84),
('支付配置', 'payment_setting', 8, '系统设置', 85),
('短信配置', 'sms_setting', 8, '系统设置', 86);

-- 插入角色权限关联（超级管理员拥有所有权限）
INSERT INTO admin_role_permission (role_id, permission_id)
SELECT 1, id FROM admin_permission;

-- 插入运营数据员权限
INSERT INTO admin_role_permission (role_id, permission_id)
SELECT 2, id FROM admin_permission WHERE code IN (
    'dashboard',
    'student_center', 'student_manage', 'study_record',
    'course_center', 'course_manage', 'question_manage',
    'order_center', 'order_manage', 'invoice_manage',
    'teacher_center',
    'certificate_center', 'certificate_manage', 'certificate_query',
    'content_center', 'article_manage', 'article_category'
);

-- 插入部门数据
INSERT INTO admin_department (name, manager, sort_order, status) VALUES
('技术部', '张三', 1, 1),
('运营部', '李四', 2, 1),
('内容部', '王五', 3, 1),
('教务部', '赵六', 4, 1),
('客服部', '钱七', 5, 1),
('财务部', '孙八', 6, 1),
('教研部', '周九', 7, 1);

-- 创建超级管理员账号（密码：admin123，已通过BCrypt加密）
INSERT INTO admin_user (username, password, nickname, phone, email, role_id, department_id, status) VALUES
('admin', '$2a$10$EixZaYbB.rK4fl8x2q7Meu6Q6D2V5fF5Q5Q5Q5Q5Q5Q5Q5Q5Q5Q', '系统管理员', '13800138000', 'admin@sanzhutraining.com', 1, 1, 1);

-- 插入基础配置数据
INSERT INTO system_setting (`key`, `value`, description, category) VALUES
('site_name', '叁竹培训系统', '站点名称', '基础设置'),
('site_title', '叁竹培训 - 专业养老培训平台', '站点标题', '基础设置'),
('site_description', '专业养老行业职业培训与技能认证平台', '站点描述', '基础设置'),
('site_logo', '', '站点Logo地址', '基础设置'),
('site_favicon', '', '站点图标地址', '基础设置'),
('copyright', '2026 叁竹培训. All rights reserved.', '版权信息', '基础设置'),
('contact_phone', '400-888-8888', '客服电话', '联系信息'),
('contact_email', 'support@sanzhutraining.com', '客服邮箱', '联系信息'),
('contact_address', '湖南省长沙市岳麓区', '联系地址', '联系信息'),
('login_expire_days', '7', '登录有效期（天）', '安全设置'),
('password_min_length', '6', '密码最小长度', '安全设置'),
('password_max_length', '20', '密码最大长度', '安全设置'),
('sms_code_expire_minutes', '5', '短信验证码有效期（分钟）', '安全设置'),
('course_free_trial_duration', '30', '课程免费试看时长（分钟）', '课程设置'),
('certificate_valid_years', '3', '证书有效期（年），0表示永久有效', '证书设置'),
('certificate_audit_days', '3', '证书审核周期（工作日）', '证书设置');

-- 插入课程分类数据
INSERT INTO course_category (name, parent_id, sort_order, status) VALUES
('养老护理员', 0, 1, 1),
('老年人能力评估师', 0, 2, 1),
('健康照护师', 0, 3, 1),
('营养配餐员', 0, 4, 1),
('其他培训', 0, 5, 1);

-- 插入资讯分类数据
INSERT INTO news_category (name, parent_id, sort_order, status) VALUES
('政策解读', 0, 1, 1),
('备考指南', 0, 2, 1),
('平台公告', 0, 3, 1),
('行业动态', 0, 4, 1),
('功能更新', 0, 5, 1);

-- ----------------------------
-- 5.1 插入机构数据
-- ----------------------------
INSERT INTO institution_info (name, manager, phone, address, province, city, student_count, order_count, cooperation_start, cooperation_end, status, remark) VALUES
('叁竹养老培训中心（长沙总部）', '陈建华', '0731-88888888', '湖南省长沙市岳麓区麓谷科技园', '湖南省', '长沙市', 0, 0, '2024-01-01', NULL, 1, '总部直属机构'),
('叁竹养老培训中心（株洲分部）', '刘志强', '0731-87777777', '湖南省株洲市天元区长江北路', '湖南省', '株洲市', 0, 0, '2024-03-15', NULL, 1, '株洲市合作机构'),
('叁竹养老培训中心（湘潭分部）', '周美华', '0731-86666666', '湖南省湘潭市岳塘区建设中路', '湖南省', '湘潭市', 0, 0, '2024-06-20', NULL, 1, '湘潭市合作机构'),
('叁竹养老培训中心（衡阳分部）', '吴建国', '0731-85555555', '湖南省衡阳市蒸湘区解放西路', '湖南省', '衡阳市', 0, 0, '2024-09-10', NULL, 1, '衡阳市合作机构'),
('叁竹养老培训中心（岳阳分部）', '郑文明', '0731-84444444', '湖南省岳阳市岳阳楼区南湖大道', '湖南省', '岳阳市', 0, 0, '2025-01-05', NULL, 1, '岳阳市合作机构');

-- ----------------------------
-- 5.2 插入讲师数据
-- ----------------------------
INSERT INTO teacher_info (name, avatar, phone, gender, title, expertise, introduction, credentials, course_count, student_count, rating, auth_status, status, linked_user_id) VALUES
('张慧敏', 'https://sanzhu-training.oss-cn-hangzhou.aliyuncs.com/teachers/teacher-01.jpg', '13900139001', 2, '高级讲师/副主任护师', '养老护理、老年康复、慢病管理', '从事养老护理工作20余年，曾任三甲医院老年科护士长，国家级养老护理员考评员。擅长老年慢性病护理、康复训练和心理疏导。', '["高级养老护理员","老年护理专科护士","国家级考评员"]', 0, 0, 4.85, 2, 1, NULL),
('李明远', 'https://sanzhu-training.oss-cn-hangzhou.aliyuncs.com/teachers/teacher-02.jpg', '13900139002', 1, '教授/主任医师', '老年人能力评估、健康管理、康复医学', '医学博士，康复医学专业教授，从事临床和教学工作25年。主持多项国家级科研项目，发表SCI论文30余篇。', '["主任医师","教授","博士生导师"]', 0, 0, 4.92, 2, 1, NULL),
('王雅琴', 'https://sanzhu-training.oss-cn-hangzhou.aliyuncs.com/teachers/teacher-03.jpg', '13900139003', 2, '高级营养师/健康管理师', '营养配餐、膳食管理、老年营养学', '注册营养师，专注老年营养学研究15年，擅长糖尿病、高血压等慢性病人群的膳食管理和营养干预。', '["注册营养师","高级健康管理师","营养学会会员"]', 0, 0, 4.78, 2, 1, NULL),
('赵文博', 'https://sanzhu-training.oss-cn-hangzhou.aliyuncs.com/teachers/teacher-04.jpg', '13900139004', 1, '高级技师/高级讲师', '养老护理技能培训、实操教学', '高级技师职称，养老护理行业资深培训师，拥有丰富的一线护理经验和教学经验，学员评价优秀。', '["高级技师","高级讲师","技能等级考评员"]', 0, 0, 4.88, 2, 1, NULL),
('陈淑芬', 'https://sanzhu-training.oss-cn-hangzhou.aliyuncs.com/teachers/teacher-05.jpg', '13900139005', 2, '中级讲师/主管护师', '基础护理、生活照料、心理支持', '主管护师，从事养老护理教学工作10年，教学风格亲切细致，深受学员喜爱。', '["主管护师","中级讲师","心理咨询师"]', 0, 0, 4.82, 2, 1, NULL);

-- ----------------------------
-- 5.3 插入课程数据
-- ----------------------------
INSERT INTO course_info (name, category_id, cover_image, price, original_price, duration, duration_minutes, buyer_count, teacher_id, description, highlights, status, is_free, tags, is_subsidy, certificate_type) VALUES
('养老护理员（初级）职业技能培训课程', 1, 'https://sanzhu-training.oss-cn-hangzhou.aliyuncs.com/courses/course-01-cover.jpg', 1280.00, 1980.00, 24, 1440, 0, 1, '本课程依据国家养老护理员职业技能标准，系统讲解养老护理基础知识和基本技能，包括生活照料、基础护理、心理支持等核心内容。课程理论与实操相结合，配备真人演示视频和考核题库，帮助学员全面掌握养老护理技能。', '国家职业标准,真人实操演示,考核题库配套,终身学习', 1, 0, '养老护理,初级,职业技能', 1, '养老护理员（初级）'),
('养老护理员（中级）职业技能培训课程', 1, 'https://sanzhu-training.oss-cn-hangzhou.aliyuncs.com/courses/course-02-cover.jpg', 1680.00, 2580.00, 32, 1920, 0, 1, '中级养老护理员培训课程，深入讲解老年人常见疾病护理、康复护理、急救处置等专业技能，结合丰富案例分析，帮助学员提升综合护理能力。', '疾病护理专题,康复训练指导,急救技能实操,案例分析', 1, 0, '养老护理,中级,职业技能', 1, '养老护理员（中级）'),
('养老护理员（高级）职业技能培训课程', 1, 'https://sanzhu-training.oss-cn-hangzhou.aliyuncs.com/courses/course-03-cover.jpg', 2280.00, 3280.00, 48, 2880, 0, 2, '高级养老护理员培训课程，涵盖老年常见病综合护理、营养膳食管理、护理计划制定、护理质量管理等高阶技能，培养专业型养老护理人才。', '综合护理方案,膳食营养规划,护理质量管理,职业发展指导', 1, 0, '养老护理,高级,职业技能', 1, '养老护理员（高级）'),
('老年人能力评估师职业技能培训', 2, 'https://sanzhu-training.oss-cn-hangzhou.aliyuncs.com/courses/course-04-cover.jpg', 1980.00, 2980.00, 36, 2160, 0, 2, '本课程系统讲解老年人能力评估的标准流程和方法，包括日常生活活动能力评估、精神状态评估、感知觉与沟通评估、社会参与评估等核心内容，配备评估实操演示和案例分析。', '评估标准解读,实操演示视频,评估工具包,案例精讲', 1, 0, '能力评估,职业技能,养老服务', 1, '老年人能力评估师'),
('健康照护师职业技能培训课程', 3, 'https://sanzhu-training.oss-cn-hangzhou.aliyuncs.com/courses/course-05-cover.jpg', 1580.00, 2380.00, 28, 1680, 0, 3, '健康照护师培训课程，全面讲解健康照护基础知识、常见健康问题照护、康复照护、心理照护等内容，培养专业健康照护人才。', '健康管理方法,康复照护技术,心理照护技巧,实操训练', 1, 0, '健康照护,康复护理,职业技能', 1, '健康照护师'),
('营养配餐员职业技能培训', 4, 'https://sanzhu-training.oss-cn-hangzhou.aliyuncs.com/courses/course-06-cover.jpg', 1380.00, 1980.00, 20, 1200, 0, 3, '营养配餐员培训课程，讲解营养学基础、膳食搭配原则、老年人营养配餐、常见慢病膳食管理等知识，帮助学员掌握科学配餐技能。', '营养知识系统,配餐方案设计,慢病膳食指导,食谱库', 1, 0, '营养配餐,膳食管理,职业技能', 1, '营养配餐员'),
('老年痴呆症照护专题课程', 1, 'https://sanzhu-training.oss-cn-hangzhou.aliyuncs.com/courses/course-07-cover.jpg', 880.00, 1280.00, 12, 720, 0, 1, '专题讲解老年痴呆症（阿尔茨海默症）的照护方法，包括疾病认知、行为症状应对、沟通技巧、生活照护、家属心理支持等内容。', '疾病认知科普,行为应对方法,沟通技巧训练,家属指导', 1, 0, '痴呆照护,专题课程,老年护理', 0, '老年痴呆照护培训证书'),
('养老护理员免费公开课', 1, 'https://sanzhu-training.oss-cn-hangzhou.aliyuncs.com/courses/course-08-cover.jpg', 0.00, 0.00, 4, 240, 0, 5, '养老护理员免费公开课程，介绍养老护理行业发展前景、职业技能要求、学习方法等内容，帮助想要进入养老行业的学员了解基本情况。', '免费学习,行业介绍,职业规划,学习指导', 1, 1, '公开课,免费,养老护理', 0, '公开课学习证明');

-- ----------------------------
-- 5.4 插入课程章节数据
-- ----------------------------
INSERT INTO course_chapter (course_id, title, sort_order) VALUES
-- 课程1：养老护理员（初级）
(1, '第一章 养老护理职业认知', 1),
(1, '第二章 老年人生活照料', 2),
(1, '第三章 老年人基础护理', 3),
(1, '第四章 老年人心理支持', 4),
(1, '第五章 综合实操考核', 5),
-- 课程2：养老护理员（中级）
(2, '第一章 中级护理员职业要求', 1),
(2, '第二章 老年常见疾病护理', 2),
(2, '第三章 康复护理与训练', 3),
(2, '第四章 急救处置技能', 4),
(2, '第五章 案例分析与考核', 5),
-- 课程4：老年人能力评估师
(4, '第一章 能力评估概述', 1),
(4, '第二章 日常生活活动能力评估', 2),
(4, '第三章 精神状态与认知评估', 3),
(4, '第四章 感知觉与沟通评估', 4),
(4, '第五章 社会参与评估', 5),
(4, '第六章 综合评估实操', 6);

-- ----------------------------
-- 5.5 插入课程课时数据
-- ----------------------------
INSERT INTO course_section (chapter_id, title, video_url, duration, file_size, is_trial, sort_order) VALUES
-- 课程1 章节1
(1, '1.1 养老护理行业概述', 'https://sanzhu-training.oss-cn-hangzhou.aliyuncs.com/courses/c01/c01-ch01-sec01.mp4', 1800, 85000000, 1, 1),
(1, '1.2 养老护理员职业素养', 'https://sanzhu-training.oss-cn-hangzhou.aliyuncs.com/courses/c01/c01-ch01-sec02.mp4', 2100, 98000000, 0, 2),
(1, '1.3 职业道德与法律法规', 'https://sanzhu-training.oss-cn-hangzhou.aliyuncs.com/courses/c01/c01-ch01-sec03.mp4', 1500, 72000000, 0, 3),
-- 课程1 章节2
(2, '2.1 清洁卫生照料', 'https://sanzhu-training.oss-cn-hangzhou.aliyuncs.com/courses/c01/c01-ch02-sec01.mp4', 2400, 112000000, 1, 1),
(2, '2.2 穿脱衣物照料', 'https://sanzhu-training.oss-cn-hangzhou.aliyuncs.com/courses/c01/c01-ch02-sec02.mp4', 1800, 85000000, 0, 2),
(2, '2.3 饮食照料', 'https://sanzhu-training.oss-cn-hangzhou.aliyuncs.com/courses/c01/c01-ch02-sec03.mp4', 2100, 98000000, 0, 3),
(2, '2.4 排泄照料', 'https://sanzhu-training.oss-cn-hangzhou.aliyuncs.com/courses/c01/c01-ch02-sec04.mp4', 1800, 85000000, 0, 4),
-- 课程1 章节3
(3, '3.1 生命体征测量', 'https://sanzhu-training.oss-cn-hangzhou.aliyuncs.com/courses/c01/c01-ch03-sec01.mp4', 2400, 112000000, 1, 1),
(3, '3.2 常见症状观察', 'https://sanzhu-training.oss-cn-hangzhou.aliyuncs.com/courses/c01/c01-ch03-sec02.mp4', 1800, 85000000, 0, 2),
(3, '3.3 用药护理', 'https://sanzhu-training.oss-cn-hangzhou.aliyuncs.com/courses/c01/c01-ch03-sec03.mp4', 2100, 98000000, 0, 3),
-- 课程1 章节4
(4, '4.1 老年人心理特点', 'https://sanzhu-training.oss-cn-hangzhou.aliyuncs.com/courses/c01/c01-ch04-sec01.mp4', 1800, 85000000, 0, 1),
(4, '4.2 心理支持方法', 'https://sanzhu-training.oss-cn-hangzhou.aliyuncs.com/courses/c01/c01-ch04-sec02.mp4', 2100, 98000000, 0, 2),
-- 课程1 章节5
(5, '5.1 综合实操演示', 'https://sanzhu-training.oss-cn-hangzhou.aliyuncs.com/courses/c01/c01-ch05-sec01.mp4', 3000, 140000000, 0, 1),
(5, '5.2 考核要点讲解', 'https://sanzhu-training.oss-cn-hangzhou.aliyuncs.com/courses/c01/c01-ch05-sec02.mp4', 1800, 85000000, 0, 2);

-- ----------------------------
-- 5.6 插入学员数据
-- ----------------------------
INSERT INTO user_student (nickname, phone, password, avatar, gender, institution_id, status, total_study_hours, course_count, certificate_count, last_login_at) VALUES
('王晓红', '13810001001', '$2a$10$EixZaYbB.rK4fl8x2q7Meu6Q6D2V5fF5Q5Q5Q5Q5Q5Q5Q5Q5Q5Q', 'https://sanzhu-training.oss-cn-hangzhou.aliyuncs.com/students/student-01.jpg', 2, 1, 1, 0.0, 0, 0, '2026-06-01 09:30:00'),
('刘建国', '13810001002', '$2a$10$EixZaYbB.rK4fl8x2q7Meu6Q6D2V5fF5Q5Q5Q5Q5Q5Q5Q5Q5Q5Q', 'https://sanzhu-training.oss-cn-hangzhou.aliyuncs.com/students/student-02.jpg', 1, 1, 1, 0.0, 0, 0, '2026-06-02 14:20:00'),
('李秀兰', '13810001003', '$2a$10$EixZaYbB.rK4fl8x2q7Meu6Q6D2V5fF5Q5Q5Q5Q5Q5Q5Q5Q5Q5Q', 'https://sanzhu-training.oss-cn-hangzhou.aliyuncs.com/students/student-03.jpg', 2, 2, 1, 0.0, 0, 0, '2026-06-03 10:15:00'),
('张志强', '13810001004', '$2a$10$EixZaYbB.rK4fl8x2q7Meu6Q6D2V5fF5Q5Q5Q5Q5Q5Q5Q5Q5Q5Q', 'https://sanzhu-training.oss-cn-hangzhou.aliyuncs.com/students/student-04.jpg', 1, 2, 1, 0.0, 0, 0, '2026-06-02 16:45:00'),
('陈美玲', '13810001005', '$2a$10$EixZaYbB.rK4fl8x2q7Meu6Q6D2V5fF5Q5Q5Q5Q5Q5Q5Q5Q5Q5Q', 'https://sanzhu-training.oss-cn-hangzhou.aliyuncs.com/students/student-05.jpg', 2, 3, 1, 0.0, 0, 0, '2026-06-04 08:50:00'),
('黄志伟', '13810001006', '$2a$10$EixZaYbB.rK4fl8x2q7Meu6Q6D2V5fF5Q5Q5Q5Q5Q5Q5Q5Q5Q5Q', 'https://sanzhu-training.oss-cn-hangzhou.aliyuncs.com/students/student-06.jpg', 1, 3, 1, 0.0, 0, 0, '2026-06-01 20:30:00'),
('周翠萍', '13810001007', '$2a$10$EixZaYbB.rK4fl8x2q7Meu6Q6D2V5fF5Q5Q5Q5Q5Q5Q5Q5Q5Q5Q', 'https://sanzhu-training.oss-cn-hangzhou.aliyuncs.com/students/student-07.jpg', 2, 4, 1, 0.0, 0, 0, '2026-06-03 11:25:00'),
('吴国栋', '13810001008', '$2a$10$EixZaYbB.rK4fl8x2q7Meu6Q6D2V5fF5Q5Q5Q5Q5Q5Q5Q5Q5Q5Q', 'https://sanzhu-training.oss-cn-hangzhou.aliyuncs.com/students/student-08.jpg', 1, 4, 1, 0.0, 0, 0, '2026-06-04 15:40:00'),
('郑丽华', '13810001009', '$2a$10$EixZaYbB.rK4fl8x2q7Meu6Q6D2V5fF5Q5Q5Q5Q5Q5Q5Q5Q5Q5Q', 'https://sanzhu-training.oss-cn-hangzhou.aliyuncs.com/students/student-09.jpg', 2, 5, 1, 0.0, 0, 0, '2026-06-02 09:10:00'),
('孙明辉', '13810001010', '$2a$10$EixZaYbB.rK4fl8x2q7Meu6Q6D2V5fF5Q5Q5Q5Q5Q5Q5Q5Q5Q5Q', 'https://sanzhu-training.oss-cn-hangzhou.aliyuncs.com/students/student-10.jpg', 1, 1, 1, 0.0, 0, 0, '2026-06-05 10:00:00'),
('朱丽娟', '13810001011', '$2a$10$EixZaYbB.rK4fl8x2q7Meu6Q6D2V5fF5Q5Q5Q5Q5Q5Q5Q5Q5Q5Q', 'https://sanzhu-training.oss-cn-hangzhou.aliyuncs.com/students/student-11.jpg', 2, 2, 1, 0.0, 0, 0, '2026-06-04 19:30:00'),
('胡建军', '13810001012', '$2a$10$EixZaYbB.rK4fl8x2q7Meu6Q6D2V5fF5Q5Q5Q5Q5Q5Q5Q5Q5Q5Q', 'https://sanzhu-training.oss-cn-hangzhou.aliyuncs.com/students/student-12.jpg', 1, 3, 1, 0.0, 0, 0, '2026-06-03 14:50:00'),
('林静怡', '13810001013', '$2a$10$EixZaYbB.rK4fl8x2q7Meu6Q6D2V5fF5Q5Q5Q5Q5Q5Q5Q5Q5Q5Q', 'https://sanzhu-training.oss-cn-hangzhou.aliyuncs.com/students/student-13.jpg', 2, NULL, 1, 0.0, 0, 0, '2026-06-05 08:20:00'),
('高永强', '13810001014', '$2a$10$EixZaYbB.rK4fl8x2q7Meu6Q6D2V5fF5Q5Q5Q5Q5Q5Q5Q5Q5Q5Q', 'https://sanzhu-training.oss-cn-hangzhou.aliyuncs.com/students/student-14.jpg', 1, NULL, 1, 0.0, 0, 0, '2026-06-01 17:40:00'),
('马春燕', '13810001015', '$2a$10$EixZaYbB.rK4fl8x2q7Meu6Q6D2V5fF5Q5Q5Q5Q5Q5Q5Q5Q5Q5Q', 'https://sanzhu-training.oss-cn-hangzhou.aliyuncs.com/students/student-15.jpg', 2, 1, 1, 0.0, 0, 0, '2026-06-05 16:15:00');

-- ----------------------------
-- 5.7 插入学员资料数据
-- ----------------------------
INSERT INTO user_profile (user_id, real_name, id_card_type, id_card_number, birth_date, gender, exam_source, education_level, province, city, district, nationality, political_status, email, work_unit, job_title, profession_years, work_start_date, work_years, exam_category_code, exam_category_name, appraisal_type, original_profession, original_level, original_cert_no, original_issue_date, apply_condition, address, detail_address, postal_code, audit_status, audit_remark, submitted_at, audited_at) VALUES
(1, '王晓红', 1, '430102198505123456', '1985-05-12', 2, 'institution', '大专', '湖南省', '长沙市', '岳麓区', '汉族', '群众', 'wangxiaohong@example.com', '长沙市夕阳红养老院', '护理员', 8, '2018-03-01', 8, 'YL-001', '养老护理员', '初级', NULL, NULL, NULL, NULL, 'condition_1', '湖南省长沙市岳麓区银盆岭路123号', '湖南省长沙市岳麓区银盆岭小区5栋302室', '410013', 3, '资料齐全，审核通过', '2026-05-20 10:30:00', '2026-05-22 14:20:00'),
(2, '刘建国', 1, '430103197811234567', '1978-11-23', 1, 'institution', '本科', '湖南省', '长沙市', '芙蓉区', '汉族', '中共党员', 'lijianguo@example.com', '长沙康泰养老服务中心', '部门主管', 15, '2011-06-15', 15, 'YL-002', '养老护理员', '中级', '护理员', '初级', 'YL201800123', '2018-08-20', 'condition_2', '湖南省长沙市芙蓉区解放路456号', '湖南省长沙市芙蓉区解放公寓3栋501室', '410011', 3, '资料齐全，审核通过', '2026-05-15 09:15:00', '2026-05-18 11:30:00'),
(3, '李秀兰', 1, '430201199003154567', '1990-03-15', 2, 'institution', '中专', '湖南省', '株洲市', '天元区', '汉族', '群众', 'lixl@example.com', '株洲爱心养老院', '护理员', 5, '2021-07-20', 5, 'YL-001', '养老护理员', '初级', NULL, NULL, NULL, NULL, 'condition_1', '湖南省株洲市天元区长江路789号', '湖南省株洲市天元区长江花园2栋201室', '412000', 3, '资料齐全，审核通过', '2026-05-25 14:45:00', '2026-05-27 10:00:00'),
(4, '张志强', 1, '430202198212087890', '1982-12-08', 1, 'institution', '大专', '湖南省', '株洲市', '荷塘区', '汉族', '群众', 'zhangzq@example.com', '株洲市社会福利中心', '护理主管', 12, '2014-02-10', 12, 'PG-001', '老年人能力评估师', '初级', '护理员', '中级', 'YL202000456', '2020-06-15', 'condition_2', '湖南省株洲市荷塘区红旗路321号', '湖南省株洲市荷塘区红旗小区8栋102室', '412000', 2, '资料审核中', '2026-06-01 08:50:00', NULL),
(5, '陈美玲', 1, '430301198707191234', '1987-07-19', 2, 'institution', '大专', '湖南省', '湘潭市', '岳塘区', '汉族', '群众', 'chenml@example.com', '湘潭康寿养老服务有限公司', '护理员', 6, '2020-05-18', 6, 'JK-001', '健康照护师', '初级', NULL, NULL, NULL, NULL, 'condition_1', '湖南省湘潭市岳塘区建设路567号', '湖南省湘潭市岳塘区建设小区6栋403室', '411100', 1, '待提交资料', NULL, NULL, NULL, NULL),
(6, '黄志伟', 1, '430302197509255678', '1975-09-25', 1, 'institution', '大专', '湖南省', '湘潭市', '雨湖区', '汉族', '中共党员', 'hzw@example.com', '湘潭市养老院', '副院长', 20, '2006-04-12', 20, 'YL-003', '养老护理员', '高级', '护理员', '中级', 'YL201500789', '2015-10-25', 'condition_3', '湖南省湘潭市雨湖区中山路890号', '湖南省湘潭市雨湖区中山公寓12栋1001室', '411100', 3, '资料齐全，审核通过', '2026-05-10 11:20:00', '2026-05-12 16:40:00'),
(7, '周翠萍', 1, '430401198811308901', '1988-11-30', 2, 'institution', '大专', '湖南省', '衡阳市', '蒸湘区', '汉族', '群众', 'zhoucp@example.com', '衡阳市夕阳之家', '护理员', 7, '2019-08-25', 7, 'YY-001', '营养配餐员', '初级', NULL, NULL, NULL, NULL, 'condition_1', '湖南省衡阳市蒸湘区解放路234号', '湖南省衡阳市蒸湘区解放小区4栋305室', '421000', 3, '资料齐全，审核通过', '2026-05-28 15:30:00', '2026-05-30 09:45:00'),
(8, '吴国栋', 1, '430402198004122345', '1980-04-12', 1, 'institution', '本科', '湖南省', '衡阳市', '雁峰区', '汉族', '群众', 'wgd@example.com', '衡阳仁爱老年公寓', '护理主管', 10, '2016-11-08', 10, 'PG-001', '老年人能力评估师', '初级', '护理员', '中级', 'YL201900234', '2019-05-18', 'condition_2', '湖南省衡阳市雁峰区中山路567号', '湖南省衡阳市雁峰区中山花园9栋602室', '421000', 3, '资料齐全，审核通过', '2026-05-22 13:10:00', '2026-05-25 10:25:00'),
(9, '郑丽华', 1, '430501199202186789', '1992-02-18', 2, 'institution', '大专', '湖南省', '岳阳市', '岳阳楼区', '汉族', '共青团员', 'zhenglh@example.com', '岳阳市幸福之家养老中心', '护理员', 4, '2022-03-15', 4, 'JK-001', '健康照护师', '初级', NULL, NULL, NULL, NULL, 'condition_1', '湖南省岳阳市岳阳楼区南湖大道890号', '湖南省岳阳市岳阳楼区南湖花园3栋201室', '414000', 2, '资料审核中', '2026-06-02 11:15:00', NULL),
(10, '孙明辉', 1, '430104197611233456', '1976-11-23', 1, 'self', '大专', '湖南省', '长沙市', '开福区', '汉族', '群众', 'sunmh@example.com', '自由职业', '护理员', 18, '2008-09-01', 18, 'YL-002', '养老护理员', '中级', '护理员', '初级', 'YL201700567', '2017-07-12', 'condition_2', '湖南省长沙市开福区芙蓉中路1234号', '湖南省长沙市开福区芙蓉公寓15栋801室', '410008', 3, '资料齐全，审核通过', '2026-05-18 09:00:00', '2026-05-20 14:30:00');

-- ----------------------------
-- 5.8 插入订单数据
-- ----------------------------
INSERT INTO order_main (order_no, user_id, user_nickname, user_phone, course_id, course_name, original_price, discount_amount, pay_amount, pay_status, pay_time, pay_method, pay_trade_no, expire_time) VALUES
('SZ202605200001', 1, '王晓红', '13810001001', 1, '养老护理员（初级）职业技能培训课程', 1980.00, 700.00, 1280.00, 1, '2026-05-20 11:45:00', '微信支付', 'wx2026052000001', '2026-05-21 11:45:00'),
('SZ202605220002', 1, '王晓红', '13810001001', 8, '养老护理员免费公开课', 0.00, 0.00, 0.00, 1, '2026-05-22 09:30:00', '免费', 'FREE2026052200001', '2026-05-23 09:30:00'),
('SZ202605150003', 2, '刘建国', '13810001002', 2, '养老护理员（中级）职业技能培训课程', 2580.00, 900.00, 1680.00, 1, '2026-05-15 15:20:00', '支付宝', 'ali2026051500002', '2026-05-16 15:20:00'),
('SZ202605250004', 3, '李秀兰', '13810001003', 1, '养老护理员（初级）职业技能培训课程', 1980.00, 700.00, 1280.00, 1, '2026-05-25 16:50:00', '微信支付', 'wx2026052500003', '2026-05-26 16:50:00'),
('SZ202606010005', 4, '张志强', '13810001004', 4, '老年人能力评估师职业技能培训', 2980.00, 1000.00, 1980.00, 1, '2026-06-01 10:15:00', '微信支付', 'wx2026060100004', '2026-06-02 10:15:00'),
('SZ202606020006', 4, '张志强', '13810001004', 7, '老年痴呆症照护专题课程', 1280.00, 400.00, 880.00, 1, '2026-06-02 19:30:00', '微信支付', 'wx2026060200005', '2026-06-03 19:30:00'),
('SZ202606050007', 5, '陈美玲', '13810001005', 5, '健康照护师职业技能培训课程', 2380.00, 800.00, 1580.00, 0, NULL, '微信支付', NULL, '2026-06-06 09:30:00'),
('SZ202605100008', 6, '黄志伟', '13810001006', 3, '养老护理员（高级）职业技能培训课程', 3280.00, 1000.00, 2280.00, 1, '2026-05-10 13:50:00', '支付宝', 'ali2026051000006', '2026-05-11 13:50:00'),
('SZ202605280009', 7, '周翠萍', '13810001007', 6, '营养配餐员职业技能培训', 1980.00, 600.00, 1380.00, 1, '2026-05-28 17:20:00', '微信支付', 'wx2026052800007', '2026-05-29 17:20:00'),
('SZ202605220010', 8, '吴国栋', '13810001008', 4, '老年人能力评估师职业技能培训', 2980.00, 1000.00, 1980.00, 1, '2026-05-22 14:40:00', '支付宝', 'ali2026052200008', '2026-05-23 14:40:00'),
('SZ202605180011', 10, '孙明辉', '13810001010', 2, '养老护理员（中级）职业技能培训课程', 2580.00, 900.00, 1680.00, 1, '2026-05-18 11:10:00', '微信支付', 'wx2026051800009', '2026-05-19 11:10:00'),
('SZ202605300012', 2, '刘建国', '13810001002', 3, '养老护理员（高级）职业技能培训课程', 3280.00, 1000.00, 2280.00, 2, '2026-05-30 10:00:00', '微信支付', 'wx2026053000010', '2026-05-31 10:00:00'),
('SZ202606030013', 11, '朱丽娟', '13810001011', 1, '养老护理员（初级）职业技能培训课程', 1980.00, 700.00, 1280.00, 1, '2026-06-03 20:15:00', '微信支付', 'wx2026060300011', '2026-06-04 20:15:00'),
('SZ202606040014', 12, '胡建军', '13810001012', 5, '健康照护师职业技能培训课程', 2380.00, 800.00, 1580.00, 1, '2026-06-04 16:30:00', '支付宝', 'ali2026060400012', '2026-06-05 16:30:00'),
('SZ202606050015', 15, '马春燕', '13810001015', 8, '养老护理员免费公开课', 0.00, 0.00, 0.00, 1, '2026-06-05 17:45:00', '免费', 'FREE2026060500002', '2026-06-06 17:45:00');

-- ----------------------------
-- 5.9 插入退款数据
-- ----------------------------
INSERT INTO order_refund (refund_no, order_id, order_no, user_id, user_nickname, course_name, refund_amount, refund_reason, status, reviewer_id, review_remark, review_time, refund_time, refund_trade_no) VALUES
('RF202606010001', 12, 'SZ202605300012', 2, '刘建国', '养老护理员（高级）职业技能培训课程', 2280.00, '因个人原因无法继续学习，申请全额退款', 3, 1, '退款申请已审核通过，已完成退款', '2026-06-01 14:30:00', '2026-06-01 15:00:00', 'refund_wx2026060100001'),
('RF202606040002', 14, 'SZ202606040014', 12, '胡建军', '健康照护师职业技能培训课程', 1580.00, '报名错误，申请退款', 1, 1, '退款申请已审核通过，等待退款处理', '2026-06-05 10:20:00', NULL, NULL),
('RF202606050003', 7, 'SZ202606050007', 5, '陈美玲', '健康照护师职业技能培训课程', 1580.00, '重复下单，申请退款', 0, NULL, NULL, NULL, NULL, NULL);

-- ----------------------------
-- 5.10 插入发票数据
-- ----------------------------
INSERT INTO order_invoice (invoice_no, user_id, order_id, order_no, invoice_title, invoice_type, taxpayer_id, invoice_content, invoice_amount, invoice_email, receiving_address, status, invoice_pdf, express_company, express_no) VALUES
('FP202605210001', 1, 1, 'SZ202605200001', '王晓红', 1, NULL, '培训费', 1280.00, 'wangxiaohong@example.com', '', 1, 'https://sanzhu-training.oss-cn-hangzhou.aliyuncs.com/invoices/FP202605210001.pdf', NULL, NULL),
('FP202605160002', 2, 3, 'SZ202605150003', '长沙康泰养老服务中心', 2, '91430100MA4L123456', '培训费', 1680.00, 'finance@kangtai.com', '湖南省长沙市芙蓉区解放东路123号康泰大厦财务部', 2, 'https://sanzhu-training.oss-cn-hangzhou.aliyuncs.com/invoices/FP202605160002.pdf', '顺丰速运', 'SF1234567890'),
('FP202605260003', 3, 4, 'SZ202605250004', '李秀兰', 1, NULL, '培训费', 1280.00, 'lixl@example.com', '', 1, 'https://sanzhu-training.oss-cn-hangzhou.aliyuncs.com/invoices/FP202605260003.pdf', NULL, NULL),
('FP202606050004', 4, 5, 'SZ202606010005', '株洲市社会福利中心', 2, '91430200MA4L654321', '培训费', 1980.00, 'accounting@zhoulifu.com', '湖南省株洲市荷塘区红旗路88号福利中心办公室', 0, NULL, NULL, NULL),
('FP202605110005', 6, 8, 'SZ202605100008', '湘潭市养老院', 2, '91430300MA4L987654', '培训费', 2280.00, 'caiku@xiangtanlaoyang.com', '湖南省湘潭市雨湖区中山路123号养老院办公楼', 1, 'https://sanzhu-training.oss-cn-hangzhou.aliyuncs.com/invoices/FP202605110005.pdf', NULL, NULL);

-- ----------------------------
-- 5.11 插入学习记录数据
-- ----------------------------
INSERT INTO study_record (user_id, course_id, course_name, chapter_id, chapter_name, section_id, section_name, study_duration, study_time, video_progress, is_complete) VALUES
-- 王晓红的学习记录
(1, 1, '养老护理员（初级）职业技能培训课程', 1, '第一章 养老护理职业认知', 1, '1.1 养老护理行业概述', 30, '2026-05-21 09:00:00', 100.00, 1),
(1, 1, '养老护理员（初级）职业技能培训课程', 1, '第一章 养老护理职业认知', 2, '1.2 养老护理员职业素养', 35, '2026-05-21 10:00:00', 100.00, 1),
(1, 1, '养老护理员（初级）职业技能培训课程', 2, '第二章 老年人生活照料', 4, '2.1 清洁卫生照料', 40, '2026-05-22 09:30:00', 100.00, 1),
(1, 1, '养老护理员（初级）职业技能培训课程', 2, '第二章 老年人生活照料', 5, '2.2 穿脱衣物照料', 30, '2026-05-23 14:00:00', 85.00, 0),
(1, 8, '养老护理员免费公开课', NULL, NULL, NULL, NULL, 45, '2026-05-22 15:00:00', 100.00, 1),
-- 刘建国的学习记录
(2, 2, '养老护理员（中级）职业技能培训课程', 6, '第一章 中级护理员职业要求', NULL, NULL, 60, '2026-05-16 10:00:00', 100.00, 1),
(2, 2, '养老护理员（中级）职业技能培训课程', 7, '第二章 老年常见疾病护理', NULL, NULL, 90, '2026-05-17 14:00:00', 100.00, 1),
(2, 2, '养老护理员（中级）职业技能培训课程', 8, '第三章 康复护理与训练', NULL, NULL, 45, '2026-05-18 09:00:00', 60.00, 0),
-- 李秀兰的学习记录
(3, 1, '养老护理员（初级）职业技能培训课程', 1, '第一章 养老护理职业认知', 1, '1.1 养老护理行业概述', 30, '2026-05-26 10:00:00', 100.00, 1),
(3, 1, '养老护理员（初级）职业技能培训课程', 1, '第一章 养老护理职业认知', 2, '1.2 养老护理员职业素养', 35, '2026-05-27 15:00:00', 100.00, 1),
(3, 1, '养老护理员（初级）职业技能培训课程', 1, '第一章 养老护理职业认知', 3, '1.3 职业道德与法律法规', 25, '2026-05-28 09:30:00', 100.00, 1),
-- 张志强的学习记录
(4, 4, '老年人能力评估师职业技能培训', 11, '第一章 能力评估概述', NULL, NULL, 45, '2026-06-02 10:00:00', 100.00, 1),
(4, 4, '老年人能力评估师职业技能培训', 12, '第二章 日常生活活动能力评估', NULL, NULL, 60, '2026-06-03 14:00:00', 100.00, 1),
(4, 4, '老年人能力评估师职业技能培训', 13, '第三章 精神状态与认知评估', NULL, NULL, 30, '2026-06-04 09:00:00', 70.00, 0),
-- 黄志伟的学习记录
(6, 3, '养老护理员（高级）职业技能培训课程', NULL, NULL, NULL, NULL, 120, '2026-05-12 09:00:00', 25.00, 0),
-- 周翠萍的学习记录
(7, 6, '营养配餐员职业技能培训', NULL, NULL, NULL, NULL, 45, '2026-05-29 10:00:00', 50.00, 0),
-- 吴国栋的学习记录
(8, 4, '老年人能力评估师职业技能培训', 11, '第一章 能力评估概述', NULL, NULL, 45, '2026-05-23 10:00:00', 100.00, 1),
(8, 4, '老年人能力评估师职业技能培训', 12, '第二章 日常生活活动能力评估', NULL, NULL, 60, '2026-05-24 14:00:00', 100.00, 1),
(8, 4, '老年人能力评估师职业技能培训', 13, '第三章 精神状态与认知评估', NULL, NULL, 45, '2026-05-25 09:00:00', 100.00, 1),
(8, 4, '老年人能力评估师职业技能培训', 14, '第四章 感知觉与沟通评估', NULL, NULL, 30, '2026-05-26 15:00:00', 80.00, 0),
-- 孙明辉的学习记录
(10, 2, '养老护理员（中级）职业技能培训课程', 6, '第一章 中级护理员职业要求', NULL, NULL, 60, '2026-05-19 10:00:00', 100.00, 1),
(10, 2, '养老护理员（中级）职业技能培训课程', 7, '第二章 老年常见疾病护理', NULL, NULL, 90, '2026-05-20 14:00:00', 100.00, 1),
(10, 2, '养老护理员（中级）职业技能培训课程', 8, '第三章 康复护理与训练', NULL, NULL, 60, '2026-05-21 09:00:00', 100.00, 1),
(10, 2, '养老护理员（中级）职业技能培训课程', 9, '第四章 急救处置技能', NULL, NULL, 45, '2026-05-22 15:00:00', 75.00, 0);

-- ----------------------------
-- 5.12 插入题库专题数据
-- ----------------------------
INSERT INTO question_topic (name, category_id, course_id, total_questions) VALUES
('养老护理员（初级）模拟题库', 1, 1, 100),
('养老护理员（中级）模拟题库', 1, 2, 120),
('养老护理员（高级）模拟题库', 1, 3, 150),
('老年人能力评估师模拟题库', 2, 4, 100),
('健康照护师模拟题库', 3, 5, 80),
('营养配餐员模拟题库', 4, 6, 80),
('养老护理基础知识', 1, 1, 50),
('老年常见疾病护理', 1, 2, 60);

-- ----------------------------
-- 5.13 插入题目数据
-- ----------------------------
INSERT INTO question_info (topic_id, course_id, type, difficulty, content, options, answer_text, explanation, score) VALUES
-- 养老护理员（初级）题库
(1, 1, 1, 1, '老年人的睡眠特点不包括以下哪一项？', '["睡眠时间较短","睡眠质量下降","入睡困难","睡眠深沉"]', 'D', '老年人睡眠特点包括：睡眠时间较短、睡眠质量下降、入睡困难、易惊醒等。睡眠深沉是年轻人的睡眠特点。', 10),
(1, 1, 1, 1, '以下哪种食物适合老年人食用？', '["油炸食品","辛辣食品","软烂易消化的食物","生冷食物"]', 'C', '老年人消化功能减弱，应食用软烂易消化的食物，避免油炸、辛辣、生冷食物。', 10),
(1, 1, 2, 2, '老年人常见的心理问题包括（多选）？', '["孤独感","焦虑情绪","记忆力下降","抑郁情绪"]', '[\"A\",\"B\",\"D\"]', '老年人常见心理问题包括孤独感、焦虑、抑郁等。记忆力下降属于生理变化，不属于心理问题。', 15),
(1, 1, 3, 1, '为老年人测量体温时，腋温测量时间应为5-10分钟。', NULL, '正确', '腋温测量标准时间为5-10分钟，确保测量结果准确。', 10),
(1, 1, 4, 2, '简述老年人饮食护理的注意事项。', NULL, '1.食物要软烂易消化；2.营养均衡，蛋白质、维生素要充足；3.少食多餐；4.饮食温度适宜；5.注意饮食卫生；6.鼓励适量饮水；7.尊重老人饮食习惯。', '本题考查老年人饮食护理的基本要点，需要从食物选择、进食方式、饮食卫生等方面回答。', 20),
-- 养老护理员（中级）题库
(2, 2, 1, 2, '老年人高血压患者的护理措施不包括？', '["定期监测血压","低盐饮食","剧烈运动","遵医嘱用药"]', 'C', '高血压患者应避免剧烈运动，适当进行散步、太极拳等温和运动。', 10),
(2, 2, 1, 2, '老年糖尿病患者出现低血糖症状时，应立即给予？', '["糖水或饼干","胰岛素","降压药","镇静剂"]', 'A', '低血糖时应立即补充糖分，如糖水、饼干等快速升糖食物。', 10),
(2, 2, 2, 3, '老年心力衰竭患者的护理要点包括（多选）？', '["控制液体摄入","半卧位休息","吸氧护理","鼓励下床活动"]', '[\"A\",\"B\",\"C\"]', '心衰患者应减少活动，避免劳累，不宜鼓励下床活动。', 15),
(2, 2, 3, 2, '老年慢性阻塞性肺疾病患者应持续低流量吸氧。', NULL, '正确', 'COPD患者缺氧时应给予低流量吸氧，避免高流量吸氧导致二氧化碳潴留。', 10),
-- 老年人能力评估师题库
(4, 4, 1, 2, '老年人能力评估的评估周期一般为？', '["每月一次","每季度一次","每半年一次","每年一次"]', 'D', '老年人能力评估通常每年进行一次，特殊情况可适当增加评估频率。', 10),
(4, 4, 1, 2, '日常生活活动能力评估不包括以下哪项？', '["进食","穿衣","认知功能","如厕"]', 'C', '日常生活活动能力评估包括进食、穿衣、如厕等基本生活能力，认知功能属于精神状态评估范畴。', 10),
(4, 4, 2, 3, '老年人能力评估的内容包括（多选）？', '["日常生活活动能力","精神状态","感知觉与沟通","社会参与"]', '[\"A\",\"B\",\"C\",\"D\"]', '老年人能力评估包括以上四个维度。', 15),
(4, 4, 3, 2, '评估报告应在评估结束后7个工作日内完成。', NULL, '正确', '根据相关规定，评估报告应在评估结束后7个工作日内完成并反馈。', 10),
-- 健康照护师题库
(5, 5, 1, 2, '以下哪种情况不属于老年人常见的健康问题？', '["骨质疏松","视力下降","皮肤弹性增加","听力减退"]', 'C', '老年人皮肤弹性会下降，而不是增加。', 10),
(5, 5, 1, 2, '老年人康复护理的目标不包括？', '["恢复独立生活能力","提高生活质量","加速疾病进展","促进身心健康"]', 'C', '康复护理的目标是促进健康，而不是加速疾病进展。', 10),
(5, 5, 2, 2, '老年人健康照护的基本原则包括（多选）？', '["尊重老人意愿","个性化服务","预防为主","被动护理"]', '[\"A\",\"B\",\"C\"]', '健康照护应注重主动性和预防性，而不是被动护理。', 15),
-- 营养配餐员题库
(6, 6, 1, 2, '老年人每日蛋白质摄入量应为？', '["0.5-0.8g/kg体重","0.8-1.0g/kg体重","1.0-1.2g/kg体重","1.2-1.5g/kg体重"]', 'C', '老年人蛋白质需求量略高于成年人，一般为1.0-1.2g/kg体重。', 10),
(6, 6, 1, 2, '以下哪种营养素对老年人骨骼健康最重要？', '["维生素A","维生素C","钙和维生素D","铁"]', 'C', '钙和维生素D是维持骨骼健康最重要的营养素。', 10),
(6, 6, 3, 1, '老年人饮食应遵循"三高"原则：高蛋白、高维生素、高膳食纤维。', NULL, '正确', '老年人饮食应保证蛋白质、维生素和膳食纤维的充足摄入。', 10);

-- ----------------------------
-- 5.14 插入答题记录数据
-- ----------------------------
INSERT INTO question_record (user_id, topic_id, question_id, user_answer, is_correct, practice_time, duration) VALUES
-- 王晓红的答题记录
(1, 1, 1, 'D', 1, '2026-05-24 10:00:00', 30),
(1, 1, 2, 'C', 1, '2026-05-24 10:01:00', 25),
(1, 1, 3, '["A","B","D"]', 1, '2026-05-24 10:03:00', 45),
(1, 1, 4, '正确', 1, '2026-05-24 10:04:00', 20),
(1, 1, 5, '食物要软烂，营养均衡，少食多餐', 0, '2026-05-24 10:10:00', 300),
-- 刘建国的答题记录
(2, 2, 6, 'C', 1, '2026-05-19 14:00:00', 35),
(2, 2, 7, 'A', 1, '2026-05-19 14:01:00', 28),
(2, 2, 8, '["A","B","C"]', 1, '2026-05-19 14:03:00', 50),
(2, 2, 9, '正确', 1, '2026-05-19 14:04:00', 22),
-- 李秀兰的答题记录
(3, 1, 1, 'D', 1, '2026-05-29 10:00:00', 32),
(3, 1, 2, 'B', 0, '2026-05-29 10:01:00', 20),
(3, 1, 3, '["A","B","C"]', 0, '2026-05-29 10:03:00', 40),
(3, 1, 4, '正确', 1, '2026-05-29 10:04:00', 18),
-- 张志强的答题记录
(4, 4, 10, 'D', 1, '2026-06-03 15:00:00', 30),
(4, 4, 11, 'C', 1, '2026-06-03 15:01:00', 25),
(4, 4, 12, '["A","B","C","D"]', 1, '2026-06-03 15:03:00', 45),
(4, 4, 13, '正确', 1, '2026-06-03 15:04:00', 22),
-- 周翠萍的答题记录
(7, 6, 18, 'C', 1, '2026-05-30 11:00:00', 30),
(7, 6, 19, 'C', 1, '2026-05-30 11:01:00', 25),
(7, 6, 20, '正确', 1, '2026-05-30 11:02:00', 20),
-- 吴国栋的答题记录
(8, 4, 10, 'C', 0, '2026-05-27 10:00:00', 35),
(8, 4, 11, 'C', 1, '2026-05-27 10:01:00', 28),
(8, 4, 12, '["A","B","C"]', 0, '2026-05-27 10:03:00', 48),
(8, 4, 13, '正确', 1, '2026-05-27 10:04:00', 20),
-- 孙明辉的答题记录
(10, 2, 6, 'C', 1, '2026-05-23 15:00:00', 32),
(10, 2, 7, 'A', 1, '2026-05-23 15:01:00', 26),
(10, 2, 8, '["A","B","C"]', 1, '2026-05-23 15:03:00', 42),
(10, 2, 9, '正确', 1, '2026-05-23 15:04:00', 18);

-- ----------------------------
-- 5.15 插入错题记录数据
-- ----------------------------
INSERT INTO question_mistake (user_id, question_id, wrong_count, last_wrong_time, mastered) VALUES
(3, 2, 1, '2026-05-29 10:01:00', 0),
(3, 3, 1, '2026-05-29 10:03:00', 0),
(1, 5, 1, '2026-05-24 10:10:00', 0),
(8, 10, 1, '2026-05-27 10:00:00', 0),
(8, 12, 1, '2026-05-27 10:03:00', 0);

-- ----------------------------
-- 5.16 插入证书数据
-- ----------------------------
INSERT INTO certificate_info (certificate_no, user_id, user_name, user_idcard, course_id, course_name, certificate_type, issue_date, expiry_date, status, review_user_id, review_remark, review_time, pdf_url) VALUES
('SZ2026050001', 2, '刘建国', '430103197811****23', 2, '养老护理员（中级）职业技能培训课程', '养老护理员（中级）', '2026-05-20', '2029-05-19', 3, 1, '考核通过，准予发证', '2026-05-18 16:00:00', 'https://sanzhu-training.oss-cn-hangzhou.aliyuncs.com/certificates/SZ2026050001.pdf'),
('SZ2026050002', 6, '黄志伟', '430302197509****25', 3, '养老护理员（高级）职业技能培训课程', '养老护理员（高级）', '2026-05-15', '2029-05-14', 3, 1, '考核通过，准予发证', '2026-05-13 14:30:00', 'https://sanzhu-training.oss-cn-hangzhou.aliyuncs.com/certificates/SZ2026050002.pdf'),
('SZ2026060003', 8, '吴国栋', '430402198004****12', 4, '老年人能力评估师职业技能培训', '老年人能力评估师', '2026-06-01', '2029-05-31', 3, 1, '考核通过，准予发证', '2026-05-30 11:00:00', 'https://sanzhu-training.oss-cn-hangzhou.aliyuncs.com/certificates/SZ2026060003.pdf'),
('SZ2026060004', 10, '孙明辉', '430104197611****23', 2, '养老护理员（中级）职业技能培训课程', '养老护理员（中级）', '2026-06-05', '2029-06-04', 2, 1, '审核中', '2026-06-04 16:00:00', NULL),
('SZ2026060005', 1, '王晓红', '430102198505****12', 1, '养老护理员（初级）职业技能培训课程', '养老护理员（初级）', NULL, NULL, 1, NULL, '待提交审核', NULL, NULL),
('SZ2026050006', 7, '周翠萍', '430401198811****30', 6, '营养配餐员职业技能培训', '营养配餐员', '2026-05-30', '2029-05-29', 3, 1, '考核通过，准予发证', '2026-05-28 15:00:00', 'https://sanzhu-training.oss-cn-hangzhou.aliyuncs.com/certificates/SZ2026050006.pdf');

-- ----------------------------
-- 5.17 插入资讯数据
-- ----------------------------
INSERT INTO news_info (title, cover_image, category_id, summary, content, author, source, view_count, is_top, is_recommend, status, published_at, tag_type) VALUES
('湖南省发布养老护理员职业技能提升行动计划（2026-2028年）', 'https://sanzhu-training.oss-cn-hangzhou.aliyuncs.com/news/news-01-cover.jpg', 1, '湖南省人社厅、民政厅联合发布《湖南省养老护理员职业技能提升行动计划（2026-2028年）》，计划三年培养10万名养老护理人才。', '<p>湖南省人力资源和社会保障厅、湖南省民政厅于近日联合发布《湖南省养老护理员职业技能提升行动计划（2026-2028年）》。根据计划，我省将在未来三年内培养10万名养老护理专业人才，以应对人口老龄化带来的养老服务需求。</p><p>行动计划明确提出，到2028年底，全省养老护理员持证上岗率将达到80%以上，其中中高级职称护理员占比不低于30%。同时，将建立养老护理员岗位补贴制度，提高一线护理人员待遇。</p><p>叁竹培训作为省内领先的养老护理培训机构，将积极响应政府号召，加大培训投入，为社会培养更多高素质的养老护理专业人才。</p>', '张慧敏', '湖南省人社厅官网', 2580, 1, 1, 1, '2026-06-01 10:00:00', 1),
('养老护理员职业资格考试常见问题解答', 'https://sanzhu-training.oss-cn-hangzhou.aliyuncs.com/news/news-02-cover.jpg', 2, '本文针对养老护理员职业资格考试的常见问题进行解答，帮助考生顺利备考。', '<p>随着养老护理行业的快速发展，越来越多的人选择报考养老护理员职业资格考试。为帮助考生更好地备考，我们整理了以下常见问题：</p><p><strong>Q1：报考条件是什么？</strong></p><p>A：年满18周岁，身体健康，具有初中及以上学历，即可报考初级养老护理员。报考中高级职称需具备相应的工作年限和学历要求。</p><p><strong>Q2：考试内容包括哪些？</strong></p><p>A：考试分为理论知识考试和技能操作考核两部分。理论知识涵盖养老护理基础知识、法律法规、职业道德等内容；技能操作考核包括生活照料、基础护理等实际操作技能。</p><p><strong>Q3：如何备考更高效？</strong></p><p>A：建议考生系统学习教材，结合在线课程进行复习，多做模拟练习题，参加实操培训提高技能水平。</p>', '李明远', '叁竹培训', 1856, 0, 1, 1, '2026-05-28 14:30:00', 2),
('叁竹培训平台全新升级公告', 'https://sanzhu-training.oss-cn-hangzhou.aliyuncs.com/news/news-03-cover.jpg', 3, '叁竹培训平台将于近期进行全面升级，升级后将提供更优质的学习体验。', '<p>尊敬的学员：</p><p>为了给您提供更好的学习体验，叁竹培训平台将于2026年6月10日至6月12日进行系统升级维护。升级期间，平台各项服务将暂停使用。</p><p>本次升级主要包括以下内容：</p><ul><li>优化在线学习体验，支持多端同步学习进度</li><li>新增智能题库功能，提供个性化学习建议</li><li>改进证书查询系统，支持电子证书下载</li><li>完善学员社区功能，方便学员交流互动</li></ul><p>感谢您的理解与支持！如有疑问，请联系客服热线：400-888-8888。</p>', '系统管理员', '叁竹培训', 3240, 1, 1, 1, '2026-06-03 09:00:00', 3),
('2026年养老行业发展趋势分析', 'https://sanzhu-training.oss-cn-hangzhou.aliyuncs.com/news/news-04-cover.jpg', 4, '随着人口老龄化加剧，养老行业迎来快速发展期，本文分析2026年养老行业发展趋势。', '<p>2026年，我国养老行业将迎来新的发展机遇。以下是今年养老行业的几大发展趋势：</p><p><strong>1. 智慧养老加速发展</strong></p><p>人工智能、物联网等技术将广泛应用于养老服务领域，智慧养老平台、智能健康监测设备等将得到普及。</p><p><strong>2. 居家养老服务升级</strong></p><p>居家养老仍是主流养老模式，上门护理、居家照护等服务将更加专业化、规范化。</p><p><strong>3. 养老人才需求旺盛</strong></p><p>随着养老服务需求的增长，养老护理员、康复治疗师等专业人才将持续紧缺。</p><p><strong>4. 医养结合深度融合</strong></p><p>医疗与养老服务将进一步融合，医疗机构与养老机构的合作将更加紧密。</p>', '王雅琴', '中国养老网', 1568, 0, 0, 1, '2026-05-30 16:00:00', 4),
('平台新增老年人能力评估师培训课程', 'https://sanzhu-training.oss-cn-hangzhou.aliyuncs.com/news/news-05-cover.jpg', 5, '为满足市场需求，叁竹培训平台新增老年人能力评估师职业技能培训课程。', '<p>为满足养老服务行业对专业评估人才的需求，叁竹培训平台正式推出老年人能力评估师职业技能培训课程。</p><p>本课程由资深评估专家授课，内容涵盖评估标准解读、评估工具使用、评估报告撰写等核心内容。学员完成培训并通过考核后，将获得相应的职业技能证书。</p><p>课程特色：</p><ul><li>权威认证：颁发国家认可的职业技能证书</li><li>实战教学：结合真实案例进行实操训练</li><li>就业推荐：优秀学员可获得就业推荐服务</li></ul><p>欢迎广大有志于从事养老评估工作的学员报名学习！</p>', '赵文博', '叁竹培训', 986, 0, 1, 1, '2026-06-04 11:00:00', 5),
('养老护理员职业发展路径规划', 'https://sanzhu-training.oss-cn-hangzhou.aliyuncs.com/news/news-06-cover.jpg', 2, '本文为养老护理员规划职业发展路径，帮助从业者实现职业成长。', '<p>养老护理员是一个充满发展潜力的职业。以下是养老护理员的职业发展路径规划：</p><p><strong>初级阶段（0-2年）</strong></p><p>掌握基础护理技能，熟悉养老机构日常工作流程，通过初级职业资格考试。</p><p><strong>中级阶段（2-5年）</strong></p><p>积累丰富的护理经验，提升专业技能，考取中级职业资格证书，可晋升为护理组长。</p><p><strong>高级阶段（5-10年）</strong></p><p>成为资深护理专家，考取高级职业资格证书，可担任护理部主管、培训师等职位。</p><p><strong>管理阶段（10年以上）</strong></p><p>具备丰富的管理经验，可担任养老院院长、区域运营总监等管理岗位。</p>', '陈淑芬', '叁竹培训', 1245, 0, 0, 1, '2026-05-25 10:30:00', 2),
('关于开展2026年度养老护理员技能大赛的通知', 'https://sanzhu-training.oss-cn-hangzhou.aliyuncs.com/news/news-07-cover.jpg', 3, '湖南省总工会、人社厅联合举办2026年度养老护理员技能大赛，欢迎广大护理员报名参赛。', '<p>为进一步提升养老护理员的专业技能水平，激发行业活力，湖南省总工会、湖南省人力资源和社会保障厅决定联合举办2026年度养老护理员技能大赛。</p><p><strong>比赛时间：</strong>2026年7月15日-7月20日</p><p><strong>比赛地点：</strong>湖南省民政职业技术学院</p><p><strong>参赛对象：</strong>全省各养老机构在职养老护理员</p><p><strong>报名时间：</strong>2026年6月10日-6月30日</p><p>本次大赛设一、二、三等奖及优秀奖，获奖选手将获得荣誉证书和奖金，并可直接晋升职业技能等级。</p>', '系统管理员', '湖南省总工会', 2156, 1, 1, 1, '2026-06-02 15:00:00', 3),
('老年心理健康照护知识科普', 'https://sanzhu-training.oss-cn-hangzhou.aliyuncs.com/news/news-08-cover.jpg', 4, '老年人心理健康问题日益受到关注，本文介绍老年心理健康照护的基本知识和方法。', '<p>随着年龄增长，老年人面临着各种心理挑战。关注老年人心理健康，是养老护理工作的重要组成部分。</p><p><strong>老年人常见的心理问题：</strong></p><ul><li>孤独感和失落感</li><li>焦虑和抑郁情绪</li><li>记忆力下降带来的困扰</li><li>对死亡的恐惧</li></ul><p><strong>如何进行心理照护：</strong></p><ul><li>多与老人沟通交流，倾听他们的心声</li><li>鼓励老人参与社交活动，保持社交联系</li><li>帮助老人培养兴趣爱好，丰富精神生活</li><li>关注老人的情绪变化，及时发现问题</li></ul>', '张慧敏', '叁竹培训', 1876, 0, 0, 1, '2026-05-27 09:30:00', 4);

-- ----------------------------
-- 5.18 插入Banner数据
-- ----------------------------
INSERT INTO banner_info (title, image_url, link_url, sort_order, platform, status) VALUES
('养老护理员职业技能培训', 'https://sanzhu-training.oss-cn-hangzhou.aliyuncs.com/banners/banner-01.jpg', '/courses/1', 1, 1, 1),
('老年人能力评估师培训', 'https://sanzhu-training.oss-cn-hangzhou.aliyuncs.com/banners/banner-02.jpg', '/courses/4', 2, 1, 1),
('健康照护师职业培训', 'https://sanzhu-training.oss-cn-hangzhou.aliyuncs.com/banners/banner-03.jpg', '/courses/5', 3, 1, 1),
('政府补贴课程报名中', 'https://sanzhu-training.oss-cn-hangzhou.aliyuncs.com/banners/banner-04.jpg', '/courses/subsidy', 4, 1, 1),
('免费公开课体验', 'https://sanzhu-training.oss-cn-hangzhou.aliyuncs.com/banners/banner-05.jpg', '/courses/free', 5, 1, 1),
('小程序首页Banner', 'https://sanzhu-training.oss-cn-hangzhou.aliyuncs.com/banners/banner-mini-01.jpg', '/pages/course/index', 1, 2, 1),
('小程序课程推荐', 'https://sanzhu-training.oss-cn-hangzhou.aliyuncs.com/banners/banner-mini-02.jpg', '/pages/course/list', 2, 2, 1);

-- ----------------------------
-- 5.19 插入收藏数据
-- ----------------------------
INSERT INTO course_collect (user_id, course_id) VALUES
(1, 1),
(1, 2),
(2, 2),
(2, 3),
(3, 1),
(4, 4),
(4, 7),
(6, 3),
(7, 6),
(8, 4),
(10, 2),
(11, 1),
(15, 8);

-- ----------------------------
-- 5.20 更新统计字段
-- ----------------------------
UPDATE user_student u 
SET course_count = (SELECT COUNT(*) FROM order_main o WHERE o.user_id = u.id AND o.pay_status = 1 AND o.is_del = 0),
    certificate_count = (SELECT COUNT(*) FROM certificate_info c WHERE c.user_id = u.id AND c.status = 3 AND c.is_del = 0)
WHERE u.is_del = 0;

UPDATE course_info c 
SET buyer_count = (SELECT COUNT(DISTINCT user_id) FROM order_main o WHERE o.course_id = c.id AND o.pay_status = 1 AND o.is_del = 0)
WHERE c.is_del = 0;

UPDATE teacher_info t 
SET course_count = (SELECT COUNT(*) FROM course_info c WHERE c.teacher_id = t.id AND c.is_del = 0)
WHERE t.is_del = 0;

UPDATE institution_info i 
SET student_count = (SELECT COUNT(*) FROM user_student u WHERE u.institution_id = i.id AND u.is_del = 0),
    order_count = (SELECT COUNT(*) FROM order_main o JOIN user_student u ON o.user_id = u.id WHERE u.institution_id = i.id AND o.is_del = 0)
WHERE i.is_del = 0;

-- ----------------------------
-- 5.21 插入学员教育经历数据
-- ----------------------------
INSERT INTO user_education (user_id, school_name, major, education, start_date, end_date) VALUES
(1, '湖南中医药大学', '护理学', '大专', '2008-09-01', '2011-06-30'),
(2, '中南大学', '护理学', '本科', '2002-09-01', '2006-06-30'),
(3, '湖南铁路科技职业技术学院', '护理', '中专', '2008-09-01', '2011-06-30'),
(4, '湖南中医药大学', '护理学', '大专', '2004-09-01', '2007-06-30'),
(6, '湖南中医药大学', '护理学', '大专', '1998-09-01', '2001-06-30'),
(7, '湖南中医药大学', '护理学', '大专', '2010-09-01', '2013-06-30'),
(8, '中南大学', '护理学', '本科', '2001-09-01', '2005-06-30'),
(10, '湖南中医药大学', '护理学', '大专', '2000-09-01', '2003-06-30');

-- ----------------------------
-- 5.22 插入学员培训经历数据
-- ----------------------------
INSERT INTO user_training (user_id, training_institution, training_content, start_date, end_date) VALUES
(1, '湖南省民政厅', '养老护理员岗位培训', '2020-03-01', '2020-05-30'),
(1, '长沙市老龄委', '老年康复护理技能提升班', '2022-06-15', '2022-08-20'),
(2, '湖南省人社厅', '养老护理师资培训', '2018-09-01', '2018-11-30'),
(2, '国家民政部', '养老机构管理人员培训', '2020-11-01', '2020-12-31'),
(3, '株洲市民政局', '初级养老护理员培训', '2021-09-01', '2021-11-30'),
(4, '湖南省人社厅', '老年人能力评估师培训', '2022-03-01', '2022-05-31'),
(6, '国家民政部', '养老护理高级人才培训', '2015-06-01', '2015-08-31'),
(6, '湖南省人社厅', '养老护理考评员培训', '2018-03-01', '2018-05-31'),
(7, '衡阳市人社局', '营养配餐员技能培训', '2019-10-01', '2019-12-31'),
(8, '湖南省人社厅', '老年人能力评估师培训', '2019-04-01', '2019-06-30'),
(10, '湖南省人社厅', '养老护理员技能提升培训', '2017-06-01', '2017-08-31');

-- ----------------------------
-- 5.23 插入学员材料数据
-- ----------------------------
INSERT INTO user_material (user_id, id_card_front, id_card_back, education_certificate, work_certificate, experience_certificate, qualification_certificate, photo_1inch, other_materials) VALUES
(1, 'https://sanzhu-training.oss-cn-hangzhou.aliyuncs.com/materials/user1-idcard-front.jpg', 'https://sanzhu-training.oss-cn-hangzhou.aliyuncs.com/materials/user1-idcard-back.jpg', 'https://sanzhu-training.oss-cn-hangzhou.aliyuncs.com/materials/user1-diploma.jpg', 'https://sanzhu-training.oss-cn-hangzhou.aliyuncs.com/materials/user1-work-cert.jpg', 'https://sanzhu-training.oss-cn-hangzhou.aliyuncs.com/materials/user1-exp-cert.jpg', 'https://sanzhu-training.oss-cn-hangzhou.aliyuncs.com/materials/user1-qual-cert.jpg', '["https://sanzhu-training.oss-cn-hangzhou.aliyuncs.com/materials/user1-photo1.jpg"]', '[]'),
(2, 'https://sanzhu-training.oss-cn-hangzhou.aliyuncs.com/materials/user2-idcard-front.jpg', 'https://sanzhu-training.oss-cn-hangzhou.aliyuncs.com/materials/user2-idcard-back.jpg', 'https://sanzhu-training.oss-cn-hangzhou.aliyuncs.com/materials/user2-diploma.jpg', 'https://sanzhu-training.oss-cn-hangzhou.aliyuncs.com/materials/user2-work-cert.jpg', 'https://sanzhu-training.oss-cn-hangzhou.aliyuncs.com/materials/user2-exp-cert.jpg', '[]', '["https://sanzhu-training.oss-cn-hangzhou.aliyuncs.com/materials/user2-photo1.jpg","https://sanzhu-training.oss-cn-hangzhou.aliyuncs.com/materials/user2-photo2.jpg"]', '[]'),
(3, 'https://sanzhu-training.oss-cn-hangzhou.aliyuncs.com/materials/user3-idcard-front.jpg', 'https://sanzhu-training.oss-cn-hangzhou.aliyuncs.com/materials/user3-idcard-back.jpg', 'https://sanzhu-training.oss-cn-hangzhou.aliyuncs.com/materials/user3-diploma.jpg', 'https://sanzhu-training.oss-cn-hangzhou.aliyuncs.com/materials/user3-work-cert.jpg', NULL, NULL, '["https://sanzhu-training.oss-cn-hangzhou.aliyuncs.com/materials/user3-photo1.jpg"]', '[]'),
(6, 'https://sanzhu-training.oss-cn-hangzhou.aliyuncs.com/materials/user6-idcard-front.jpg', 'https://sanzhu-training.oss-cn-hangzhou.aliyuncs.com/materials/user6-idcard-back.jpg', 'https://sanzhu-training.oss-cn-hangzhou.aliyuncs.com/materials/user6-diploma.jpg', 'https://sanzhu-training.oss-cn-hangzhou.aliyuncs.com/materials/user6-work-cert.jpg', 'https://sanzhu-training.oss-cn-hangzhou.aliyuncs.com/materials/user6-exp-cert.jpg', 'https://sanzhu-training.oss-cn-hangzhou.aliyuncs.com/materials/user6-qual-cert.jpg', '["https://sanzhu-training.oss-cn-hangzhou.aliyuncs.com/materials/user6-photo1.jpg"]', '[]'),
(7, 'https://sanzhu-training.oss-cn-hangzhou.aliyuncs.com/materials/user7-idcard-front.jpg', 'https://sanzhu-training.oss-cn-hangzhou.aliyuncs.com/materials/user7-idcard-back.jpg', 'https://sanzhu-training.oss-cn-hangzhou.aliyuncs.com/materials/user7-diploma.jpg', 'https://sanzhu-training.oss-cn-hangzhou.aliyuncs.com/materials/user7-work-cert.jpg', NULL, 'https://sanzhu-training.oss-cn-hangzhou.aliyuncs.com/materials/user7-qual-cert.jpg', '["https://sanzhu-training.oss-cn-hangzhou.aliyuncs.com/materials/user7-photo1.jpg"]', '[]'),
(8, 'https://sanzhu-training.oss-cn-hangzhou.aliyuncs.com/materials/user8-idcard-front.jpg', 'https://sanzhu-training.oss-cn-hangzhou.aliyuncs.com/materials/user8-idcard-back.jpg', 'https://sanzhu-training.oss-cn-hangzhou.aliyuncs.com/materials/user8-diploma.jpg', 'https://sanzhu-training.oss-cn-hangzhou.aliyuncs.com/materials/user8-work-cert.jpg', 'https://sanzhu-training.oss-cn-hangzhou.aliyuncs.com/materials/user8-exp-cert.jpg', 'https://sanzhu-training.oss-cn-hangzhou.aliyuncs.com/materials/user8-qual-cert.jpg', '["https://sanzhu-training.oss-cn-hangzhou.aliyuncs.com/materials/user8-photo1.jpg"]', '[]');

-- ----------------------------
-- 5.24 插入学习笔记数据
-- ----------------------------
INSERT INTO study_note (user_id, course_id, chapter_id, section_id, content, note_time) VALUES
(1, 1, 1, 1, '养老护理行业前景广阔，国家政策支持力度大。老龄化社会对专业护理人才需求旺盛。', '2026-05-21 09:30:00'),
(1, 1, 1, 2, '养老护理员应具备的职业道德：尊重老人、热情服务、诚实守信、保守隐私。', '2026-05-21 10:30:00'),
(1, 1, 2, 4, '老年人清洁卫生照料注意事项：水温适中、动作轻柔、注意保暖、防止跌倒。', '2026-05-22 10:00:00'),
(2, 2, 6, NULL, '中级养老护理员需要掌握更专业的护理技能，包括常见疾病护理和康复训练。', '2026-05-16 11:00:00'),
(2, 2, 7, NULL, '老年人高血压护理要点：按时服药、低盐饮食、适度运动、定期监测血压。', '2026-05-17 15:00:00'),
(3, 1, 1, 1, '通过本节课的学习，了解了养老护理行业的基本情况和发展趋势。', '2026-05-26 11:00:00'),
(4, 4, 11, NULL, '老年人能力评估是制定个性化照护计划的重要依据，评估结果直接影响服务质量。', '2026-06-02 11:00:00'),
(8, 4, 11, NULL, '能力评估需要遵循标准化流程，确保评估结果的客观性和准确性。', '2026-05-23 11:00:00'),
(10, 2, 6, NULL, '中级护理员需要具备一定的管理能力，可以指导初级护理员工作。', '2026-05-19 11:30:00');

-- ----------------------------
-- 5.25 插入分享记录数据
-- ----------------------------
INSERT INTO share_record (user_id, course_id, share_url, share_code, share_count, new_student_count, conversion_rate) VALUES
(1, 1, 'https://sanzhutraining.com/share/course/1?code=abc123', 'abc123', 5, 2, 40.00),
(2, 2, 'https://sanzhutraining.com/share/course/2?code=def456', 'def456', 3, 1, 33.33),
(4, 4, 'https://sanzhutraining.com/share/course/4?code=ghi789', 'ghi789', 8, 3, 37.50),
(6, 3, 'https://sanzhutraining.com/share/course/3?code=jkl012', 'jkl012', 6, 2, 33.33),
(8, 4, 'https://sanzhutraining.com/share/course/4?code=mno345', 'mno345', 4, 1, 25.00),
(10, 2, 'https://sanzhutraining.com/share/course/2?code=pqr678', 'pqr678', 7, 2, 28.57);

-- ----------------------------
-- 5.26 插入系统消息数据
-- ----------------------------
INSERT INTO system_message (title, content, type, target_type, target_roles, target_users, send_method, send_status, read_count, send_time) VALUES
('系统升级维护通知', '尊敬的用户，叁竹培训平台将于2026年6月10日-12日进行系统升级维护，届时服务将暂停使用。给您带来的不便，敬请谅解！', 1, 1, NULL, NULL, 1, 2, 128, '2026-06-03 10:00:00'),
('新课程上线通知', '好消息！平台新增《老年人能力评估师》培训课程，由资深专家授课，欢迎广大学员报名学习！', 2, 1, NULL, NULL, 1, 2, 256, '2026-06-04 09:00:00'),
('学习提醒', '您报名的《养老护理员（初级）》课程还有3个课时未完成，请合理安排时间，抓紧学习！', 2, 3, NULL, '[1,2,3]', 1, 2, 3, '2026-06-05 08:00:00'),
('订单支付成功通知', '恭喜！您购买的《养老护理员（初级）》课程已支付成功，快去学习吧！', 3, 3, NULL, '[11]', 1, 2, 1, '2026-06-04 20:20:00'),
('证书领取通知', '您已完成《养老护理员（中级）》课程学习，证书已制作完成，请前往证书中心领取！', 4, 3, NULL, '[10]', 1, 2, 1, '2026-06-05 11:00:00'),
('题库功能上线', '平台新增智能题库功能，支持错题本、练习记录等功能，帮助您更好地备考！', 1, 1, NULL, NULL, 1, 2, 345, '2026-06-01 14:00:00'),
('技能大赛报名通知', '2026年度湖南省养老护理员技能大赛正在报名中，表现优秀者可获职业技能等级晋升，欢迎踊跃报名！', 1, 1, NULL, NULL, 1, 2, 189, '2026-06-02 16:00:00');

-- ----------------------------
-- 5.27 插入用户消息阅读数据
-- ----------------------------
INSERT INTO system_user_message (message_id, user_id, is_read, read_time) VALUES
(1, 1, 1, '2026-06-03 10:30:00'),
(1, 2, 1, '2026-06-03 11:00:00'),
(1, 3, 1, '2026-06-03 12:00:00'),
(1, 4, 1, '2026-06-03 10:45:00'),
(1, 5, 0, NULL),
(2, 1, 1, '2026-06-04 09:30:00'),
(2, 2, 1, '2026-06-04 10:00:00'),
(2, 3, 1, '2026-06-04 09:15:00'),
(2, 4, 1, '2026-06-04 09:45:00'),
(2, 5, 1, '2026-06-04 10:20:00'),
(3, 1, 1, '2026-06-05 08:30:00'),
(4, 11, 1, '2026-06-04 20:25:00'),
(5, 10, 1, '2026-06-05 11:30:00'),
(6, 1, 1, '2026-06-01 15:00:00'),
(6, 2, 1, '2026-06-01 16:00:00'),
(6, 3, 1, '2026-06-01 14:30:00'),
(6, 4, 0, NULL),
(6, 5, 1, '2026-06-01 15:45:00'),
(7, 1, 1, '2026-06-02 17:00:00'),
(7, 2, 1, '2026-06-02 16:30:00'),
(7, 3, 1, '2026-06-02 17:30:00'),
(7, 4, 1, '2026-06-02 18:00:00'),
(7, 5, 0, NULL);

-- ----------------------------
-- 5.28 插入短信配置数据
-- ----------------------------
INSERT INTO system_sms_setting (provider, api_key, api_secret, sign_name, template_register, template_login, template_payment, template_refund, template_certificate, status) VALUES
('阿里云短信', 'LTAI5tXXXXXXXXXXXXXXXXXXXXXXXXX', 'XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX', '叁竹培训', 'SMS_123456789', 'SMS_234567890', 'SMS_345678901', 'SMS_456789012', 'SMS_567890123', 1);

-- ----------------------------
-- 5.29 插入支付配置数据
-- ----------------------------
INSERT INTO system_payment_setting (payment_type, app_id, mch_id, api_key, private_key, public_key, notify_url, status) VALUES
(1, 'wx1234567890abcdef', '1234567890', 'abcdef1234567890abcdef1234567890', '-----BEGIN RSA PRIVATE KEY-----\nMIIEowIBAAKCAQEA...\n-----END RSA PRIVATE KEY-----', '-----BEGIN PUBLIC KEY-----\nMIIBIjANBgkqhkiG9w0BAQEF...\n-----END PUBLIC KEY-----', 'https://sanzhutraining.com/api/payment/wx/notify', 1),
(2, NULL, '9876543210', '1234567890abcdef1234567890abcdef', '-----BEGIN RSA PRIVATE KEY-----\nMIIEowIBAAKCAQEA...\n-----END RSA PRIVATE KEY-----', '-----BEGIN PUBLIC KEY-----\nMIIBIjANBgkqhkiG9w0BAQEF...\n-----END PUBLIC KEY-----', 'https://sanzhutraining.com/api/payment/ali/notify', 1);

-- ----------------------------
-- 5.30 更新学员累计学时
-- ----------------------------
UPDATE user_student u 
SET total_study_hours = (
    SELECT COALESCE(SUM(study_duration), 0) 
    FROM study_record 
    WHERE user_id = u.id AND is_del = 0
)
WHERE u.is_del = 0;