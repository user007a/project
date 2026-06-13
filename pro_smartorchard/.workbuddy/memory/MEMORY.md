# Project Memory - 数农智果·智慧果园管理系统

## 项目概况
- **项目名**: 数农智果·智慧果园管理系统 (pro_smartorchard)
- **4个端**: PC管理后台(applefarm_backhand)、移动工作端(applefarm_mobile)、数据大屏端(applefarm_dataanlye)、H5溯源端(applefarm_h5)
- **公共资源**: html/ 下有 shared css 和 js

## 设计令牌体系
- PC端: `html/applefarm_backhand/css/design-system.css` — `--primary-*`/`--bg-*`前缀
- 大屏端: 内联于各HTML `:root` — `--da-*`前缀，27个变量
- 两套体系兼容但不直接引用

## 大屏端优化记录 (2026-06-13)
- 视觉风格: 深色科技风 → 浅色清新风
- 背景色: `#f0f4f3` (微绿调)
- 品牌色: `#22a84a` (深绿) → `#4ade80` (浅绿)
- 卡片规范: 20px圆角, rgba(34,168,74,0.08)边框, rgba(34,168,74,0.06)阴影
- ECharts: 统一tooltip/axis/渐变填充/动画
- VR全景页: 深色面板全部迁移为浅色
- 备份文件: da_dashboard_backup.html, vr_panorama_backup.html
