/**
 * 生成需求规格说明书所需的图表图片（PNG）
 * 使用纯 Canvas/SVG 方式，无需 Puppeteer
 */
const fs = require('fs');
const path = require('path');

const outDir = path.join(__dirname, 'chart_images');
if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

/**
 * 将 SVG 字符串写成 .svg 文件
 */
function writeSVG(name, svgContent) {
  const filePath = path.join(outDir, name);
  fs.writeFileSync(filePath, svgContent, 'utf-8');
  console.log(`✅ 已生成: ${filePath}`);
  return filePath;
}

// ─────────────────────────────────────────────────────────
// 图1: 核心业务闭环图
// ─────────────────────────────────────────────────────────
const chart1 = `<svg xmlns="http://www.w3.org/2000/svg" width="800" height="520" viewBox="0 0 800 520">
  <defs>
    <linearGradient id="headerGrad" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" style="stop-color:#2e7d32;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#66bb6a;stop-opacity:1" />
    </linearGradient>
    <marker id="arrow" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
      <polygon points="0 0, 10 3.5, 0 7" fill="#388e3c"/>
    </marker>
    <marker id="arrow2" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
      <polygon points="0 0, 10 3.5, 0 7" fill="#1565c0"/>
    </marker>
  </defs>

  <!-- 背景 -->
  <rect width="800" height="520" fill="#f9fbe7" rx="12"/>

  <!-- 标题 -->
  <rect x="0" y="0" width="800" height="50" rx="12" fill="url(#headerGrad)"/>
  <rect x="0" y="38" width="800" height="12" fill="url(#headerGrad)"/>
  <text x="400" y="32" font-family="Microsoft YaHei,Arial" font-size="18" font-weight="bold" fill="white" text-anchor="middle">叁竹培训系统 — 核心业务闭环图</text>

  <!-- 左侧：学员流程 -->
  <text x="130" y="88" font-family="Microsoft YaHei,Arial" font-size="13" font-weight="bold" fill="#2e7d32" text-anchor="middle">学员业务流程</text>

  <!-- 节点定义：学员流程（上→下，8个） -->
  <!-- A: 学员注册/登录 -->
  <rect x="55" y="100" width="150" height="38" rx="8" fill="#c8e6c9" stroke="#2e7d32" stroke-width="1.5"/>
  <text x="130" y="124" font-family="Microsoft YaHei,Arial" font-size="13" fill="#1b5e20" text-anchor="middle">学员注册/登录</text>

  <!-- B: 浏览课程 -->
  <rect x="55" y="168" width="150" height="38" rx="8" fill="#c8e6c9" stroke="#2e7d32" stroke-width="1.5"/>
  <text x="130" y="192" font-family="Microsoft YaHei,Arial" font-size="13" fill="#1b5e20" text-anchor="middle">浏览课程</text>

  <!-- C: 购买/报名 -->
  <rect x="55" y="236" width="150" height="38" rx="8" fill="#c8e6c9" stroke="#2e7d32" stroke-width="1.5"/>
  <text x="130" y="260" font-family="Microsoft YaHei,Arial" font-size="13" fill="#1b5e20" text-anchor="middle">购买/报名</text>

  <!-- D: 视频学习 -->
  <rect x="55" y="304" width="150" height="38" rx="8" fill="#a5d6a7" stroke="#2e7d32" stroke-width="1.5"/>
  <text x="130" y="328" font-family="Microsoft YaHei,Arial" font-size="13" fill="#1b5e20" text-anchor="middle">视频学习</text>

  <!-- E: 题库刷题 -->
  <rect x="55" y="372" width="150" height="38" rx="8" fill="#a5d6a7" stroke="#2e7d32" stroke-width="1.5"/>
  <text x="130" y="396" font-family="Microsoft YaHei,Arial" font-size="13" fill="#1b5e20" text-anchor="middle">题库刷题</text>

  <!-- F: 考试评测 -->
  <rect x="55" y="440" width="150" height="38" rx="8" fill="#81c784" stroke="#2e7d32" stroke-width="1.5"/>
  <text x="130" y="464" font-family="Microsoft YaHei,Arial" font-size="13" fill="#1b5e20" text-anchor="middle">考试评测</text>

  <!-- G: 获得证书（右移） -->
  <rect x="265" y="440" width="150" height="38" rx="8" fill="#4caf50" stroke="#2e7d32" stroke-width="1.5"/>
  <text x="340" y="464" font-family="Microsoft YaHei,Arial" font-size="13" fill="white" font-weight="bold" text-anchor="middle">获得证书</text>

  <!-- H: 分享推广 -->
  <rect x="265" y="372" width="150" height="38" rx="8" fill="#66bb6a" stroke="#2e7d32" stroke-width="1.5"/>
  <text x="340" y="396" font-family="Microsoft YaHei,Arial" font-size="13" fill="white" text-anchor="middle">分享推广</text>

  <!-- 学员流程箭头 -->
  <line x1="130" y1="138" x2="130" y2="165" stroke="#388e3c" stroke-width="2" marker-end="url(#arrow)"/>
  <line x1="130" y1="206" x2="130" y2="233" stroke="#388e3c" stroke-width="2" marker-end="url(#arrow)"/>
  <line x1="130" y1="274" x2="130" y2="301" stroke="#388e3c" stroke-width="2" marker-end="url(#arrow)"/>
  <line x1="130" y1="342" x2="130" y2="369" stroke="#388e3c" stroke-width="2" marker-end="url(#arrow)"/>
  <line x1="130" y1="410" x2="130" y2="437" stroke="#388e3c" stroke-width="2" marker-end="url(#arrow)"/>
  <!-- F→G -->
  <line x1="205" y1="459" x2="262" y2="459" stroke="#388e3c" stroke-width="2" marker-end="url(#arrow)"/>
  <!-- G→H -->
  <line x1="340" y1="440" x2="340" y2="413" stroke="#388e3c" stroke-width="2" marker-end="url(#arrow)"/>

  <!-- 右侧：管理员流程 -->
  <text x="620" y="88" font-family="Microsoft YaHei,Arial" font-size="13" font-weight="bold" fill="#1565c0" text-anchor="middle">管理员业务流程</text>

  <!-- I: 管理员 -->
  <rect x="545" y="100" width="150" height="38" rx="8" fill="#bbdefb" stroke="#1565c0" stroke-width="2"/>
  <text x="620" y="124" font-family="Microsoft YaHei,Arial" font-size="13" font-weight="bold" fill="#0d47a1" text-anchor="middle">管理员</text>

  <!-- 管理员子节点 -->
  <rect x="480" y="168" width="120" height="34" rx="6" fill="#e3f2fd" stroke="#1565c0" stroke-width="1.2"/>
  <text x="540" y="190" font-family="Microsoft YaHei,Arial" font-size="12" fill="#0d47a1" text-anchor="middle">用户管理</text>

  <rect x="620" y="168" width="120" height="34" rx="6" fill="#e3f2fd" stroke="#1565c0" stroke-width="1.2"/>
  <text x="680" y="190" font-family="Microsoft YaHei,Arial" font-size="12" fill="#0d47a1" text-anchor="middle">课程管理</text>

  <rect x="480" y="226" width="120" height="34" rx="6" fill="#e3f2fd" stroke="#1565c0" stroke-width="1.2"/>
  <text x="540" y="248" font-family="Microsoft YaHei,Arial" font-size="12" fill="#0d47a1" text-anchor="middle">订单管理</text>

  <rect x="620" y="226" width="120" height="34" rx="6" fill="#e3f2fd" stroke="#1565c0" stroke-width="1.2"/>
  <text x="680" y="248" font-family="Microsoft YaHei,Arial" font-size="12" fill="#0d47a1" text-anchor="middle">证书管理</text>

  <rect x="480" y="284" width="120" height="34" rx="6" fill="#e3f2fd" stroke="#1565c0" stroke-width="1.2"/>
  <text x="540" y="306" font-family="Microsoft YaHei,Arial" font-size="12" fill="#0d47a1" text-anchor="middle">讲师管理</text>

  <rect x="620" y="284" width="120" height="34" rx="6" fill="#e3f2fd" stroke="#1565c0" stroke-width="1.2"/>
  <text x="680" y="306" font-family="Microsoft YaHei,Arial" font-size="12" fill="#0d47a1" text-anchor="middle">资讯管理</text>

  <rect x="545" y="342" width="150" height="34" rx="6" fill="#bbdefb" stroke="#1565c0" stroke-width="1.5"/>
  <text x="620" y="364" font-family="Microsoft YaHei,Arial" font-size="12" fill="#0d47a1" text-anchor="middle">数据分析</text>

  <!-- 管理员箭头 -->
  <line x1="620" y1="138" x2="540" y2="165" stroke="#1565c0" stroke-width="1.5" marker-end="url(#arrow2)"/>
  <line x1="620" y1="138" x2="680" y2="165" stroke="#1565c0" stroke-width="1.5" marker-end="url(#arrow2)"/>
  <line x1="620" y1="138" x2="540" y2="223" stroke="#1565c0" stroke-width="1.5" marker-end="url(#arrow2)"/>
  <line x1="620" y1="138" x2="680" y2="223" stroke="#1565c0" stroke-width="1.5" marker-end="url(#arrow2)"/>
  <line x1="620" y1="138" x2="540" y2="281" stroke="#1565c0" stroke-width="1.5" marker-end="url(#arrow2)"/>
  <line x1="620" y1="138" x2="680" y2="281" stroke="#1565c0" stroke-width="1.5" marker-end="url(#arrow2)"/>
  <line x1="620" y1="138" x2="620" y2="339" stroke="#1565c0" stroke-width="1.5" marker-end="url(#arrow2)"/>

  <!-- 分割线 -->
  <line x1="460" y1="60" x2="460" y2="500" stroke="#bdbdbd" stroke-width="1" stroke-dasharray="6,4"/>

  <!-- 图例 -->
  <rect x="30" y="492" width="14" height="14" fill="#a5d6a7" rx="3"/>
  <text x="50" y="504" font-family="Microsoft YaHei,Arial" font-size="11" fill="#555">学员核心流程</text>
  <rect x="180" y="492" width="14" height="14" fill="#bbdefb" rx="3"/>
  <text x="200" y="504" font-family="Microsoft YaHei,Arial" font-size="11" fill="#555">管理员操作流程</text>
</svg>`;

writeSVG('chart1_business_loop.svg', chart1);

// ─────────────────────────────────────────────────────────
// 图2: 技术架构图
// ─────────────────────────────────────────────────────────
const chart2 = `<svg xmlns="http://www.w3.org/2000/svg" width="800" height="500" viewBox="0 0 800 500">
  <defs>
    <linearGradient id="g1" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" style="stop-color:#1565c0"/>
      <stop offset="100%" style="stop-color:#42a5f5"/>
    </linearGradient>
    <linearGradient id="g2" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" style="stop-color:#2e7d32"/>
      <stop offset="100%" style="stop-color:#66bb6a"/>
    </linearGradient>
    <linearGradient id="g3" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" style="stop-color:#e65100"/>
      <stop offset="100%" style="stop-color:#ffa726"/>
    </linearGradient>
    <linearGradient id="g4" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" style="stop-color:#4a148c"/>
      <stop offset="100%" style="stop-color:#ab47bc"/>
    </linearGradient>
    <marker id="arr" markerWidth="8" markerHeight="6" refX="7" refY="3" orient="auto">
      <polygon points="0 0, 8 3, 0 6" fill="#546e7a"/>
    </marker>
  </defs>

  <rect width="800" height="500" fill="#eceff1" rx="12"/>

  <!-- 标题 -->
  <rect x="0" y="0" width="800" height="44" rx="12" fill="url(#g1)"/>
  <rect x="0" y="32" width="800" height="12" fill="url(#g1)"/>
  <text x="400" y="28" font-family="Microsoft YaHei,Arial" font-size="17" font-weight="bold" fill="white" text-anchor="middle">叁竹培训系统 — 技术架构图</text>

  <!-- 层1: 前端展示层 -->
  <rect x="30" y="60" width="740" height="90" rx="8" fill="url(#g1)" opacity="0.12" stroke="#1565c0" stroke-width="1.5"/>
  <text x="50" y="80" font-family="Microsoft YaHei,Arial" font-size="12" font-weight="bold" fill="#1565c0">前端展示层</text>
  <rect x="50" y="88" width="155" height="50" rx="6" fill="#1565c0" opacity="0.85"/>
  <text x="127" y="110" font-family="Microsoft YaHei,Arial" font-size="12" fill="white" text-anchor="middle">数据驾驶舱</text>
  <text x="127" y="128" font-family="Microsoft YaHei,Arial" font-size="10" fill="#bbdefb" text-anchor="middle">ECharts + HTML5</text>
  <rect x="220" y="88" width="155" height="50" rx="6" fill="#1976d2" opacity="0.85"/>
  <text x="297" y="110" font-family="Microsoft YaHei,Arial" font-size="12" fill="white" text-anchor="middle">学员网站端</text>
  <text x="297" y="128" font-family="Microsoft YaHei,Arial" font-size="10" fill="#bbdefb" text-anchor="middle">Vue.js 3.x</text>
  <rect x="390" y="88" width="155" height="50" rx="6" fill="#2196f3" opacity="0.85"/>
  <text x="467" y="110" font-family="Microsoft YaHei,Arial" font-size="12" fill="white" text-anchor="middle">学员小程序端</text>
  <text x="467" y="128" font-family="Microsoft YaHei,Arial" font-size="10" fill="#bbdefb" text-anchor="middle">UniApp</text>
  <rect x="560" y="88" width="195" height="50" rx="6" fill="#0d47a1" opacity="0.85"/>
  <text x="657" y="110" font-family="Microsoft YaHei,Arial" font-size="12" fill="white" text-anchor="middle">后台管理系统</text>
  <text x="657" y="128" font-family="Microsoft YaHei,Arial" font-size="10" fill="#bbdefb" text-anchor="middle">Vue.js + Element Plus</text>

  <!-- 箭头 -->
  <line x1="400" y1="150" x2="400" y2="168" stroke="#546e7a" stroke-width="2" marker-end="url(#arr)"/>

  <!-- 层2: API网关层 -->
  <rect x="30" y="170" width="740" height="60" rx="8" fill="url(#g2)" opacity="0.12" stroke="#2e7d32" stroke-width="1.5"/>
  <text x="50" y="192" font-family="Microsoft YaHei,Arial" font-size="12" font-weight="bold" fill="#2e7d32">API 网关层</text>
  <text x="400" y="196" font-family="Microsoft YaHei,Arial" font-size="12" fill="#1b5e20" text-anchor="middle">统一认证（JWT）| 限流保护 | 日志监控 | 路由转发</text>
  <text x="400" y="218" font-family="Microsoft YaHei,Arial" font-size="11" fill="#388e3c" text-anchor="middle">Spring Cloud Gateway</text>

  <!-- 箭头 -->
  <line x1="400" y1="230" x2="400" y2="250" stroke="#546e7a" stroke-width="2" marker-end="url(#arr)"/>

  <!-- 层3: 业务逻辑层 -->
  <rect x="30" y="252" width="740" height="90" rx="8" fill="url(#g3)" opacity="0.12" stroke="#e65100" stroke-width="1.5"/>
  <text x="50" y="274" font-family="Microsoft YaHei,Arial" font-size="12" font-weight="bold" fill="#e65100">业务逻辑层</text>
  <rect x="50" y="280" width="118" height="50" rx="6" fill="#ef6c00" opacity="0.85"/>
  <text x="109" y="310" font-family="Microsoft YaHei,Arial" font-size="12" fill="white" text-anchor="middle">课程服务</text>
  <rect x="184" y="280" width="118" height="50" rx="6" fill="#f57c00" opacity="0.85"/>
  <text x="243" y="310" font-family="Microsoft YaHei,Arial" font-size="12" fill="white" text-anchor="middle">用户服务</text>
  <rect x="318" y="280" width="118" height="50" rx="6" fill="#fb8c00" opacity="0.85"/>
  <text x="377" y="310" font-family="Microsoft YaHei,Arial" font-size="12" fill="white" text-anchor="middle">订单服务</text>
  <rect x="452" y="280" width="118" height="50" rx="6" fill="#ffa726" opacity="0.85"/>
  <text x="511" y="310" font-family="Microsoft YaHei,Arial" font-size="12" fill="white" text-anchor="middle">题库服务</text>
  <rect x="586" y="280" width="154" height="50" rx="6" fill="#ffb74d" opacity="0.85"/>
  <text x="663" y="310" font-family="Microsoft YaHei,Arial" font-size="12" fill="white" text-anchor="middle">证书服务</text>

  <!-- 箭头 -->
  <line x1="400" y1="342" x2="400" y2="362" stroke="#546e7a" stroke-width="2" marker-end="url(#arr)"/>

  <!-- 层4: 数据持久层 -->
  <rect x="30" y="364" width="740" height="115" rx="8" fill="url(#g4)" opacity="0.12" stroke="#4a148c" stroke-width="1.5"/>
  <text x="50" y="386" font-family="Microsoft YaHei,Arial" font-size="12" font-weight="bold" fill="#4a148c">数据持久层</text>
  <rect x="50" y="394" width="160" height="70" rx="6" fill="#6a1b9a" opacity="0.85"/>
  <text x="130" y="420" font-family="Microsoft YaHei,Arial" font-size="12" fill="white" text-anchor="middle">MySQL 8.x</text>
  <text x="130" y="438" font-family="Microsoft YaHei,Arial" font-size="10" fill="#e1bee7" text-anchor="middle">关系型主数据库</text>
  <text x="130" y="455" font-family="Microsoft YaHei,Arial" font-size="10" fill="#e1bee7" text-anchor="middle">读写分离</text>
  <rect x="230" y="394" width="160" height="70" rx="6" fill="#7b1fa2" opacity="0.85"/>
  <text x="310" y="420" font-family="Microsoft YaHei,Arial" font-size="12" fill="white" text-anchor="middle">Redis 7.x</text>
  <text x="310" y="438" font-family="Microsoft YaHei,Arial" font-size="10" fill="#e1bee7" text-anchor="middle">缓存 / 会话管理</text>
  <text x="310" y="455" font-family="Microsoft YaHei,Arial" font-size="10" fill="#e1bee7" text-anchor="middle">热点数据加速</text>
  <rect x="410" y="394" width="160" height="70" rx="6" fill="#8e24aa" opacity="0.85"/>
  <text x="490" y="420" font-family="Microsoft YaHei,Arial" font-size="12" fill="white" text-anchor="middle">RabbitMQ 3.x</text>
  <text x="490" y="438" font-family="Microsoft YaHei,Arial" font-size="10" fill="#e1bee7" text-anchor="middle">消息队列</text>
  <text x="490" y="455" font-family="Microsoft YaHei,Arial" font-size="10" fill="#e1bee7" text-anchor="middle">异步任务处理</text>
  <rect x="590" y="394" width="160" height="70" rx="6" fill="#9c27b0" opacity="0.85"/>
  <text x="670" y="420" font-family="Microsoft YaHei,Arial" font-size="12" fill="white" text-anchor="middle">MinIO</text>
  <text x="670" y="438" font-family="Microsoft YaHei,Arial" font-size="10" fill="#e1bee7" text-anchor="middle">对象文件存储</text>
  <text x="670" y="455" font-family="Microsoft YaHei,Arial" font-size="10" fill="#e1bee7" text-anchor="middle">视频/图片资源</text>
</svg>`;

writeSVG('chart2_tech_arch.svg', chart2);

// ─────────────────────────────────────────────────────────
// 图3: 页面布局结构图（数据驾驶舱）
// ─────────────────────────────────────────────────────────
const chart3 = `<svg xmlns="http://www.w3.org/2000/svg" width="800" height="480" viewBox="0 0 800 480">
  <defs>
    <linearGradient id="hd" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" style="stop-color:#2e7d32"/>
      <stop offset="100%" style="stop-color:#66bb6a"/>
    </linearGradient>
  </defs>

  <rect width="800" height="480" fill="#f1f8e9" rx="12"/>
  <rect x="0" y="0" width="800" height="44" rx="12" fill="url(#hd)"/>
  <rect x="0" y="32" width="800" height="12" fill="url(#hd)"/>
  <text x="400" y="28" font-family="Microsoft YaHei,Arial" font-size="17" font-weight="bold" fill="white" text-anchor="middle">数据驾驶舱 — 页面布局结构图</text>

  <!-- 页面框 -->
  <rect x="20" y="56" width="760" height="408" rx="6" fill="white" stroke="#81c784" stroke-width="2"/>

  <!-- 顶部导航区 -->
  <rect x="30" y="66" width="740" height="46" rx="4" fill="#e8f5e9" stroke="#66bb6a" stroke-width="1.5"/>
  <text x="400" y="86" font-family="Microsoft YaHei,Arial" font-size="12" font-weight="bold" fill="#2e7d32" text-anchor="middle">顶部导航区</text>
  <text x="400" y="103" font-family="Microsoft YaHei,Arial" font-size="10" fill="#555" text-anchor="middle">叁竹培训管理驾驶舱 | 平台入口按钮组 | 实时日期徽章</text>

  <!-- KPI卡片区 -->
  <rect x="30" y="122" width="740" height="56" rx="4" fill="#f3e5f5" stroke="#ab47bc" stroke-width="1.5"/>
  <text x="400" y="145" font-family="Microsoft YaHei,Arial" font-size="12" font-weight="bold" fill="#6a1b9a" text-anchor="middle">KPI 指标卡片区（9个数字卡片）</text>
  <text x="400" y="166" font-family="Microsoft YaHei,Arial" font-size="10" fill="#555" text-anchor="middle">机构人数 | 子机构 | 学员总数 | 讲师数 | 课程数 | 题库量 | 通过率 | 订单总数 | 订单金额</text>

  <!-- 三栏区 -->
  <!-- 左侧 -->
  <rect x="30" y="188" width="210" height="160" rx="4" fill="#e3f2fd" stroke="#42a5f5" stroke-width="1.5"/>
  <text x="135" y="210" font-family="Microsoft YaHei,Arial" font-size="11" font-weight="bold" fill="#1565c0" text-anchor="middle">左侧区域</text>
  <text x="135" y="234" font-family="Microsoft YaHei,Arial" font-size="10" fill="#555" text-anchor="middle">·机构人员分布图</text>
  <text x="135" y="254" font-family="Microsoft YaHei,Arial" font-size="10" fill="#555" text-anchor="middle">（环形饼图）</text>
  <text x="135" y="278" font-family="Microsoft YaHei,Arial" font-size="10" fill="#555" text-anchor="middle">·课程分布图</text>
  <text x="135" y="298" font-family="Microsoft YaHei,Arial" font-size="10" fill="#555" text-anchor="middle">（柱状图）</text>
  <text x="135" y="322" font-family="Microsoft YaHei,Arial" font-size="10" fill="#555" text-anchor="middle">·热销课程 Top 5</text>
  <text x="135" y="342" font-family="Microsoft YaHei,Arial" font-size="10" fill="#555" text-anchor="middle">（排行榜）</text>

  <!-- 中央 -->
  <rect x="252" y="188" width="290" height="160" rx="4" fill="#fff9c4" stroke="#f9a825" stroke-width="1.5"/>
  <text x="397" y="210" font-family="Microsoft YaHei,Arial" font-size="11" font-weight="bold" fill="#e65100" text-anchor="middle">中央区域</text>
  <text x="397" y="234" font-family="Microsoft YaHei,Arial" font-size="10" fill="#555" text-anchor="middle">·分支机构分布地图（ECharts Geo）</text>
  <text x="397" y="258" font-family="Microsoft YaHei,Arial" font-size="10" fill="#555" text-anchor="middle">12个分校散点标注 | 湖南总部红色特殊标记</text>
  <text x="397" y="286" font-family="Microsoft YaHei,Arial" font-size="10" fill="#555" text-anchor="middle">·学员报名动态列表</text>
  <text x="397" y="310" font-family="Microsoft YaHei,Arial" font-size="10" fill="#555" text-anchor="middle">（自动滚动，30秒循环）</text>

  <!-- 右侧 -->
  <rect x="554" y="188" width="216" height="160" rx="4" fill="#e8f5e9" stroke="#66bb6a" stroke-width="1.5"/>
  <text x="662" y="210" font-family="Microsoft YaHei,Arial" font-size="11" font-weight="bold" fill="#2e7d32" text-anchor="middle">右侧区域</text>
  <text x="662" y="234" font-family="Microsoft YaHei,Arial" font-size="10" fill="#555" text-anchor="middle">·学员数量趋势图</text>
  <text x="662" y="254" font-family="Microsoft YaHei,Arial" font-size="10" fill="#555" text-anchor="middle">（近6个月面积折线图）</text>
  <text x="662" y="278" font-family="Microsoft YaHei,Arial" font-size="10" fill="#555" text-anchor="middle">·通过率趋势图</text>
  <text x="662" y="298" font-family="Microsoft YaHei,Arial" font-size="10" fill="#555" text-anchor="middle">（近6个月折线图）</text>
  <text x="662" y="322" font-family="Microsoft YaHei,Arial" font-size="10" fill="#555" text-anchor="middle">·证书数据统计卡片</text>

  <!-- 底部区域 -->
  <rect x="30" y="358" width="740" height="74" rx="4" fill="#fce4ec" stroke="#f48fb1" stroke-width="1.5"/>
  <text x="400" y="380" font-family="Microsoft YaHei,Arial" font-size="11" font-weight="bold" fill="#880e4f" text-anchor="middle">底部区域</text>
  <rect x="40" y="390" width="360" height="32" rx="3" fill="#f8bbd0" opacity="0.7"/>
  <text x="220" y="412" font-family="Microsoft YaHei,Arial" font-size="10" fill="#555" text-anchor="middle">订单趋势图（双折线）+ 订单动态滚动列表（25秒循环）</text>
  <rect x="410" y="390" width="350" height="32" rx="3" fill="#f8bbd0" opacity="0.7"/>
  <text x="585" y="412" font-family="Microsoft YaHei,Arial" font-size="10" fill="#555" text-anchor="middle">最新资讯列表（政策解读/备考指南/平台公告等）</text>

  <!-- 页脚 -->
  <rect x="30" y="442" width="740" height="14" rx="3" fill="#e0e0e0"/>
  <text x="400" y="454" font-family="Microsoft YaHei,Arial" font-size="9" fill="#666" text-anchor="middle">页脚：数据更新时间 | 版权信息</text>
</svg>`;

writeSVG('chart3_page_layout.svg', chart3);

// ─────────────────────────────────────────────────────────
// 图4: 业务流程图
// ─────────────────────────────────────────────────────────
const chart4 = `<svg xmlns="http://www.w3.org/2000/svg" width="800" height="560" viewBox="0 0 800 560">
  <defs>
    <linearGradient id="bfhd" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" style="stop-color:#1565c0"/>
      <stop offset="100%" style="stop-color:#42a5f5"/>
    </linearGradient>
    <marker id="ba" markerWidth="9" markerHeight="7" refX="8" refY="3.5" orient="auto">
      <polygon points="0 0, 9 3.5, 0 7" fill="#455a64"/>
    </marker>
  </defs>

  <rect width="800" height="560" fill="#e8eaf6" rx="12"/>
  <rect x="0" y="0" width="800" height="44" rx="12" fill="url(#bfhd)"/>
  <rect x="0" y="32" width="800" height="12" fill="url(#bfhd)"/>
  <text x="400" y="28" font-family="Microsoft YaHei,Arial" font-size="17" font-weight="bold" fill="white" text-anchor="middle">叁竹培训系统 — 业务流程图</text>

  <!-- 流程1: 学员注册/登录 -->
  <text x="130" y="68" font-family="Microsoft YaHei,Arial" font-size="12" font-weight="bold" fill="#1565c0" text-anchor="middle">流程1: 注册登录</text>
  <ellipse cx="130" cy="90" rx="55" ry="18" fill="#bbdefb" stroke="#1565c0" stroke-width="1.5"/>
  <text x="130" y="95" font-family="Microsoft YaHei,Arial" font-size="11" fill="#0d47a1" text-anchor="middle">开始</text>
  <line x1="130" y1="108" x2="130" y2="124" stroke="#455a64" stroke-width="1.5" marker-end="url(#ba)"/>
  <rect x="80" y="124" width="100" height="34" rx="5" fill="#e3f2fd" stroke="#1565c0" stroke-width="1.2"/>
  <text x="130" y="146" font-family="Microsoft YaHei,Arial" font-size="11" fill="#0d47a1" text-anchor="middle">输入手机号</text>
  <line x1="130" y1="158" x2="130" y2="174" stroke="#455a64" stroke-width="1.5" marker-end="url(#ba)"/>
  <rect x="80" y="174" width="100" height="34" rx="5" fill="#e3f2fd" stroke="#1565c0" stroke-width="1.2"/>
  <text x="130" y="196" font-family="Microsoft YaHei,Arial" font-size="11" fill="#0d47a1" text-anchor="middle">获取验证码</text>
  <line x1="130" y1="208" x2="130" y2="224" stroke="#455a64" stroke-width="1.5" marker-end="url(#ba)"/>
  <!-- 判断菱形 -->
  <polygon points="130,224 170,250 130,276 90,250" fill="#fff9c4" stroke="#f9a825" stroke-width="1.5"/>
  <text x="130" y="254" font-family="Microsoft YaHei,Arial" font-size="10" fill="#e65100" text-anchor="middle">验证码</text>
  <text x="130" y="267" font-family="Microsoft YaHei,Arial" font-size="10" fill="#e65100" text-anchor="middle">正确?</text>
  <!-- 否 -->
  <line x1="170" y1="250" x2="215" y2="250" stroke="#f44336" stroke-width="1.5" marker-end="url(#ba)"/>
  <text x="188" y="245" font-family="Microsoft YaHei,Arial" font-size="9" fill="#f44336">否</text>
  <rect x="215" y="233" width="70" height="34" rx="5" fill="#ffebee" stroke="#f44336" stroke-width="1.2"/>
  <text x="250" y="255" font-family="Microsoft YaHei,Arial" font-size="10" fill="#b71c1c" text-anchor="middle">提示错误</text>
  <!-- 是 -->
  <text x="108" y="288" font-family="Microsoft YaHei,Arial" font-size="9" fill="#4caf50">是</text>
  <line x1="130" y1="276" x2="130" y2="293" stroke="#4caf50" stroke-width="1.5" marker-end="url(#ba)"/>
  <rect x="80" y="293" width="100" height="34" rx="5" fill="#c8e6c9" stroke="#2e7d32" stroke-width="1.2"/>
  <text x="130" y="315" font-family="Microsoft YaHei,Arial" font-size="11" fill="#1b5e20" text-anchor="middle">注册成功</text>
  <line x1="130" y1="327" x2="130" y2="343" stroke="#455a64" stroke-width="1.5" marker-end="url(#ba)"/>
  <ellipse cx="130" cy="358" rx="55" ry="18" fill="#a5d6a7" stroke="#2e7d32" stroke-width="1.5"/>
  <text x="130" y="363" font-family="Microsoft YaHei,Arial" font-size="11" fill="#1b5e20" text-anchor="middle">进入首页</text>

  <!-- 流程2: 课程购买 -->
  <text x="390" y="68" font-family="Microsoft YaHei,Arial" font-size="12" font-weight="bold" fill="#e65100" text-anchor="middle">流程2: 课程购买</text>
  <ellipse cx="390" cy="90" rx="55" ry="18" fill="#ffe0b2" stroke="#e65100" stroke-width="1.5"/>
  <text x="390" y="95" font-family="Microsoft YaHei,Arial" font-size="11" fill="#bf360c" text-anchor="middle">选择课程</text>
  <line x1="390" y1="108" x2="390" y2="124" stroke="#455a64" stroke-width="1.5" marker-end="url(#ba)"/>
  <rect x="340" y="124" width="100" height="34" rx="5" fill="#fff3e0" stroke="#e65100" stroke-width="1.2"/>
  <text x="390" y="146" font-family="Microsoft YaHei,Arial" font-size="11" fill="#bf360c" text-anchor="middle">查看详情</text>
  <line x1="390" y1="158" x2="390" y2="174" stroke="#455a64" stroke-width="1.5" marker-end="url(#ba)"/>
  <rect x="340" y="174" width="100" height="34" rx="5" fill="#fff3e0" stroke="#e65100" stroke-width="1.2"/>
  <text x="390" y="196" font-family="Microsoft YaHei,Arial" font-size="11" fill="#bf360c" text-anchor="middle">加入购物车</text>
  <line x1="390" y1="208" x2="390" y2="224" stroke="#455a64" stroke-width="1.5" marker-end="url(#ba)"/>
  <rect x="340" y="224" width="100" height="34" rx="5" fill="#fff3e0" stroke="#e65100" stroke-width="1.2"/>
  <text x="390" y="246" font-family="Microsoft YaHei,Arial" font-size="11" fill="#bf360c" text-anchor="middle">提交订单</text>
  <line x1="390" y1="258" x2="390" y2="274" stroke="#455a64" stroke-width="1.5" marker-end="url(#ba)"/>
  <rect x="340" y="274" width="100" height="34" rx="5" fill="#fff3e0" stroke="#e65100" stroke-width="1.2"/>
  <text x="390" y="296" font-family="Microsoft YaHei,Arial" font-size="11" fill="#bf360c" text-anchor="middle">在线支付</text>
  <line x1="390" y1="308" x2="390" y2="324" stroke="#455a64" stroke-width="1.5" marker-end="url(#ba)"/>
  <polygon points="390,324 430,350 390,376 350,350" fill="#fff9c4" stroke="#f9a825" stroke-width="1.5"/>
  <text x="390" y="354" font-family="Microsoft YaHei,Arial" font-size="10" fill="#e65100" text-anchor="middle">支付成功?</text>
  <text x="372" y="388" font-family="Microsoft YaHei,Arial" font-size="9" fill="#4caf50">是</text>
  <line x1="390" y1="376" x2="390" y2="393" stroke="#4caf50" stroke-width="1.5" marker-end="url(#ba)"/>
  <ellipse cx="390" cy="410" rx="55" ry="20" fill="#c8e6c9" stroke="#2e7d32" stroke-width="1.5"/>
  <text x="390" y="415" font-family="Microsoft YaHei,Arial" font-size="11" fill="#1b5e20" text-anchor="middle">开始学习</text>

  <!-- 流程3: 考试认证 -->
  <text x="640" y="68" font-family="Microsoft YaHei,Arial" font-size="12" font-weight="bold" fill="#4a148c" text-anchor="middle">流程3: 考试认证</text>
  <ellipse cx="640" cy="90" rx="55" ry="18" fill="#e1bee7" stroke="#4a148c" stroke-width="1.5"/>
  <text x="640" y="95" font-family="Microsoft YaHei,Arial" font-size="11" fill="#4a148c" text-anchor="middle">完成课程学习</text>
  <line x1="640" y1="108" x2="640" y2="124" stroke="#455a64" stroke-width="1.5" marker-end="url(#ba)"/>
  <rect x="590" y="124" width="100" height="34" rx="5" fill="#f3e5f5" stroke="#7b1fa2" stroke-width="1.2"/>
  <text x="640" y="146" font-family="Microsoft YaHei,Arial" font-size="11" fill="#4a148c" text-anchor="middle">申请参考</text>
  <line x1="640" y1="158" x2="640" y2="174" stroke="#455a64" stroke-width="1.5" marker-end="url(#ba)"/>
  <rect x="590" y="174" width="100" height="34" rx="5" fill="#f3e5f5" stroke="#7b1fa2" stroke-width="1.2"/>
  <text x="640" y="196" font-family="Microsoft YaHei,Arial" font-size="11" fill="#4a148c" text-anchor="middle">在线考试</text>
  <line x1="640" y1="208" x2="640" y2="224" stroke="#455a64" stroke-width="1.5" marker-end="url(#ba)"/>
  <polygon points="640,224 680,252 640,280 600,252" fill="#fff9c4" stroke="#f9a825" stroke-width="1.5"/>
  <text x="640" y="256" font-family="Microsoft YaHei,Arial" font-size="10" fill="#e65100" text-anchor="middle">成绩≥合格?</text>
  <text x="622" y="292" font-family="Microsoft YaHei,Arial" font-size="9" fill="#4caf50">是</text>
  <line x1="640" y1="280" x2="640" y2="295" stroke="#4caf50" stroke-width="1.5" marker-end="url(#ba)"/>
  <rect x="590" y="295" width="100" height="34" rx="5" fill="#f3e5f5" stroke="#7b1fa2" stroke-width="1.2"/>
  <text x="640" y="317" font-family="Microsoft YaHei,Arial" font-size="11" fill="#4a148c" text-anchor="middle">生成证书</text>
  <line x1="640" y1="329" x2="640" y2="345" stroke="#455a64" stroke-width="1.5" marker-end="url(#ba)"/>
  <rect x="590" y="345" width="100" height="34" rx="5" fill="#f3e5f5" stroke="#7b1fa2" stroke-width="1.2"/>
  <text x="640" y="367" font-family="Microsoft YaHei,Arial" font-size="11" fill="#4a148c" text-anchor="middle">下载/分享</text>
  <line x1="640" y1="379" x2="640" y2="393" stroke="#455a64" stroke-width="1.5" marker-end="url(#ba)"/>
  <ellipse cx="640" cy="410" rx="55" ry="20" fill="#ce93d8" stroke="#4a148c" stroke-width="1.5"/>
  <text x="640" y="415" font-family="Microsoft YaHei,Arial" font-size="11" fill="white" font-weight="bold" text-anchor="middle">职业认证完成</text>

  <!-- 底部说明 -->
  <rect x="30" y="450" width="740" height="90" rx="6" fill="white" fill-opacity="0.7" stroke="#9e9e9e" stroke-width="1"/>
  <text x="400" y="472" font-family="Microsoft YaHei,Arial" font-size="11" font-weight="bold" fill="#333" text-anchor="middle">其他业务流程说明</text>
  <text x="50" y="494" font-family="Microsoft YaHei,Arial" font-size="10" fill="#555">流程4: 证书管理 — 管理员审核→颁发→学员查询/下载证书，支持二维码扫码验证真伪</text>
  <text x="50" y="512" font-family="Microsoft YaHei,Arial" font-size="10" fill="#555">流程5: 退款管理 — 学员申请退款（7天内）→管理员审核→同意/拒绝→自动原路退款，状态实时通知</text>
  <text x="50" y="530" font-family="Microsoft YaHei,Arial" font-size="10" fill="#555">流程6: 管理员审核 — 超管分配权限→运营数据员处理日常事务→讲师负责内容更新→系统自动统计数据</text>
</svg>`;

writeSVG('chart4_business_flow.svg', chart4);

// ─────────────────────────────────────────────────────────
// 图5: 部署架构图
// ─────────────────────────────────────────────────────────
const chart5 = `<svg xmlns="http://www.w3.org/2000/svg" width="800" height="520" viewBox="0 0 800 520">
  <defs>
    <linearGradient id="dhd" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" style="stop-color:#004d40"/>
      <stop offset="100%" style="stop-color:#00897b"/>
    </linearGradient>
    <marker id="da" markerWidth="9" markerHeight="7" refX="8" refY="3.5" orient="auto">
      <polygon points="0 0, 9 3.5, 0 7" fill="#455a64"/>
    </marker>
  </defs>

  <rect width="800" height="520" fill="#e0f2f1" rx="12"/>
  <rect x="0" y="0" width="800" height="44" rx="12" fill="url(#dhd)"/>
  <rect x="0" y="32" width="800" height="12" fill="url(#dhd)"/>
  <text x="400" y="28" font-family="Microsoft YaHei,Arial" font-size="17" font-weight="bold" fill="white" text-anchor="middle">叁竹培训系统 — 部署架构图</text>

  <!-- 用户层 -->
  <rect x="30" y="58" width="740" height="60" rx="6" fill="#b2dfdb" stroke="#00897b" stroke-width="1.5"/>
  <text x="400" y="78" font-family="Microsoft YaHei,Arial" font-size="12" font-weight="bold" fill="#004d40" text-anchor="middle">用户接入层</text>
  <rect x="50" y="84" width="130" height="26" rx="5" fill="#00897b" opacity="0.8"/>
  <text x="115" y="102" font-family="Microsoft YaHei,Arial" font-size="11" fill="white" text-anchor="middle">学员 PC 浏览器</text>
  <rect x="195" y="84" width="130" height="26" rx="5" fill="#00897b" opacity="0.8"/>
  <text x="260" y="102" font-family="Microsoft YaHei,Arial" font-size="11" fill="white" text-anchor="middle">学员微信小程序</text>
  <rect x="340" y="84" width="130" height="26" rx="5" fill="#00897b" opacity="0.8"/>
  <text x="405" y="102" font-family="Microsoft YaHei,Arial" font-size="11" fill="white" text-anchor="middle">管理员浏览器</text>
  <rect x="485" y="84" width="130" height="26" rx="5" fill="#00897b" opacity="0.8"/>
  <text x="550" y="102" font-family="Microsoft YaHei,Arial" font-size="11" fill="white" text-anchor="middle">数据驾驶舱端</text>
  <rect x="630" y="84" width="120" height="26" rx="5" fill="#00695c" opacity="0.8"/>
  <text x="690" y="102" font-family="Microsoft YaHei,Arial" font-size="11" fill="white" text-anchor="middle">HTTPS</text>

  <!-- 箭头 -->
  <line x1="400" y1="118" x2="400" y2="138" stroke="#455a64" stroke-width="2" marker-end="url(#da)"/>

  <!-- CDN / 负载均衡层 -->
  <rect x="30" y="140" width="740" height="55" rx="6" fill="#c8e6c9" stroke="#43a047" stroke-width="1.5"/>
  <text x="95" y="162" font-family="Microsoft YaHei,Arial" font-size="12" font-weight="bold" fill="#1b5e20">CDN / 负载均衡层</text>
  <rect x="50" y="152" width="170" height="30" rx="5" fill="#43a047" opacity="0.85"/>
  <text x="135" y="172" font-family="Microsoft YaHei,Arial" font-size="11" fill="white" text-anchor="middle">阿里云 CDN（静态资源）</text>
  <rect x="235" y="152" width="155" height="30" rx="5" fill="#388e3c" opacity="0.85"/>
  <text x="312" y="172" font-family="Microsoft YaHei,Arial" font-size="11" fill="white" text-anchor="middle">Nginx 负载均衡</text>
  <rect x="405" y="152" width="155" height="30" rx="5" fill="#2e7d32" opacity="0.85"/>
  <text x="482" y="172" font-family="Microsoft YaHei,Arial" font-size="11" fill="white" text-anchor="middle">SSL 证书终止</text>
  <rect x="575" y="152" width="175" height="30" rx="5" fill="#1b5e20" opacity="0.85"/>
  <text x="662" y="172" font-family="Microsoft YaHei,Arial" font-size="11" fill="white" text-anchor="middle">DDoS 防护</text>

  <!-- 箭头 -->
  <line x1="400" y1="195" x2="400" y2="215" stroke="#455a64" stroke-width="2" marker-end="url(#da)"/>

  <!-- 应用服务层（阿里云ECS） -->
  <rect x="30" y="217" width="740" height="80" rx="6" fill="#bbdefb" stroke="#1565c0" stroke-width="1.5"/>
  <text x="95" y="238" font-family="Microsoft YaHei,Arial" font-size="12" font-weight="bold" fill="#0d47a1">应用服务层（阿里云 ECS 集群）</text>
  <rect x="50" y="246" width="128" height="40" rx="5" fill="#1565c0" opacity="0.85"/>
  <text x="114" y="262" font-family="Microsoft YaHei,Arial" font-size="11" fill="white" text-anchor="middle">Spring Boot</text>
  <text x="114" y="279" font-family="Microsoft YaHei,Arial" font-size="10" fill="#bbdefb" text-anchor="middle">业务服务集群</text>
  <rect x="192" y="246" width="128" height="40" rx="5" fill="#1976d2" opacity="0.85"/>
  <text x="256" y="262" font-family="Microsoft YaHei,Arial" font-size="11" fill="white" text-anchor="middle">前端静态资源</text>
  <text x="256" y="279" font-family="Microsoft YaHei,Arial" font-size="10" fill="#bbdefb" text-anchor="middle">Nginx 服务</text>
  <rect x="334" y="246" width="128" height="40" rx="5" fill="#2196f3" opacity="0.85"/>
  <text x="398" y="262" font-family="Microsoft YaHei,Arial" font-size="11" fill="white" text-anchor="middle">视频转码服务</text>
  <text x="398" y="279" font-family="Microsoft YaHei,Arial" font-size="10" fill="#bbdefb" text-anchor="middle">阿里云媒体处理</text>
  <rect x="476" y="246" width="128" height="40" rx="5" fill="#0d47a1" opacity="0.85"/>
  <text x="540" y="262" font-family="Microsoft YaHei,Arial" font-size="11" fill="white" text-anchor="middle">消息推送服务</text>
  <text x="540" y="279" font-family="Microsoft YaHei,Arial" font-size="10" fill="#bbdefb" text-anchor="middle">RabbitMQ</text>
  <rect x="618" y="246" width="132" height="40" rx="5" fill="#003c8f" opacity="0.85"/>
  <text x="684" y="262" font-family="Microsoft YaHei,Arial" font-size="11" fill="white" text-anchor="middle">短信/支付服务</text>
  <text x="684" y="279" font-family="Microsoft YaHei,Arial" font-size="10" fill="#bbdefb" text-anchor="middle">第三方接口对接</text>

  <!-- 箭头 -->
  <line x1="400" y1="297" x2="400" y2="317" stroke="#455a64" stroke-width="2" marker-end="url(#da)"/>

  <!-- 数据存储层 -->
  <rect x="30" y="319" width="740" height="70" rx="6" fill="#ede7f6" stroke="#673ab7" stroke-width="1.5"/>
  <text x="95" y="340" font-family="Microsoft YaHei,Arial" font-size="12" font-weight="bold" fill="#311b92">数据存储层</text>
  <rect x="50" y="348" width="155" height="32" rx="5" fill="#673ab7" opacity="0.85"/>
  <text x="127" y="369" font-family="Microsoft YaHei,Arial" font-size="11" fill="white" text-anchor="middle">阿里云 RDS (MySQL)</text>
  <rect x="218" y="348" width="155" height="32" rx="5" fill="#7b1fa2" opacity="0.85"/>
  <text x="295" y="369" font-family="Microsoft YaHei,Arial" font-size="11" fill="white" text-anchor="middle">Redis Cluster</text>
  <rect x="386" y="348" width="155" height="32" rx="5" fill="#8e24aa" opacity="0.85"/>
  <text x="463" y="369" font-family="Microsoft YaHei,Arial" font-size="11" fill="white" text-anchor="middle">阿里云 OSS（文件）</text>
  <rect x="554" y="348" width="196" height="32" rx="5" fill="#6a1b9a" opacity="0.85"/>
  <text x="652" y="369" font-family="Microsoft YaHei,Arial" font-size="11" fill="white" text-anchor="middle">阿里云视频点播（VOD）</text>

  <!-- 箭头 -->
  <line x1="400" y1="389" x2="400" y2="409" stroke="#455a64" stroke-width="2" marker-end="url(#da)"/>

  <!-- 运维监控层 -->
  <rect x="30" y="411" width="740" height="60" rx="6" fill="#fff3e0" stroke="#e65100" stroke-width="1.5"/>
  <text x="95" y="432" font-family="Microsoft YaHei,Arial" font-size="12" font-weight="bold" fill="#bf360c">运维 &amp; 监控层</text>
  <rect x="50" y="440" width="148" height="24" rx="4" fill="#ef6c00" opacity="0.8"/>
  <text x="124" y="457" font-family="Microsoft YaHei,Arial" font-size="10" fill="white" text-anchor="middle">Prometheus + Grafana</text>
  <rect x="212" y="440" width="148" height="24" rx="4" fill="#f57c00" opacity="0.8"/>
  <text x="286" y="457" font-family="Microsoft YaHei,Arial" font-size="10" fill="white" text-anchor="middle">ELK 日志分析</text>
  <rect x="374" y="440" width="148" height="24" rx="4" fill="#fb8c00" opacity="0.8"/>
  <text x="448" y="457" font-family="Microsoft YaHei,Arial" font-size="10" fill="white" text-anchor="middle">SkyWalking 链路追踪</text>
  <rect x="536" y="440" width="148" height="24" rx="4" fill="#ffa726" opacity="0.8"/>
  <text x="610" y="457" font-family="Microsoft YaHei,Arial" font-size="10" fill="white" text-anchor="middle">GitLab CI/CD 自动构建</text>
  <rect x="698" y="440" width="62" height="24" rx="4" fill="#ff6f00" opacity="0.8"/>
  <text x="729" y="457" font-family="Microsoft YaHei,Arial" font-size="10" fill="white" text-anchor="middle">告警通知</text>

  <!-- 底部备注 -->
  <text x="400" y="496" font-family="Microsoft YaHei,Arial" font-size="10" fill="#555" text-anchor="middle">※ 生产环境部署于阿里云（ECS + RDS + OSS + CDN），支持弹性伸缩；三套环境（开发/测试/预发/生产）相互隔离</text>
</svg>`;

writeSVG('chart5_deploy_arch.svg', chart5);

console.log('\n✅ 所有图表生成完成！');
console.log(`📁 输出目录: ${outDir}`);
