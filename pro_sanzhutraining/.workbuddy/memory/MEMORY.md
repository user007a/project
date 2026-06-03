# 项目记忆 - 叁竹培训系统

## 项目结构
- 后台管理端: `html/backhand/eldercare/`
- 移动端: `html/mobile/eldercare/`
- 前台网站端: `html/website/eldercare/`
- 技术栈: HTML + Tailwind CSS + Iconify + 原生JS

## 关键约定
- 删除数据列时用Python逐行匹配特征字符串，避免批量替换乱码
- 弹窗交互: 点击遮罩关闭、body overflow控制、toast提示
- 二维码生成: 使用 api.qrserver.com API
- 表格数据行可能是单行格式（如share-list.html），需用re.sub而非逐行处理

## 已完成迭代
- 2026-06-03: 后台管理5项修改（课程分类去课程数量、课程分享去提成金额、证书管理加新增证书、资讯分类去文章数量、部门管理去部门人数）
- 2026-06-03: 讲师管理序号列恢复
