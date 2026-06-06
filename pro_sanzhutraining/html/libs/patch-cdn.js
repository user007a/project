/**
 * patch-cdn.js
 * 批量将所有 HTML 文件的 CDN 引用替换为本地 libs/ 路径
 * 
 * 处理内容：
 * 1. cdn.tailwindcss.com  → ../../libs/tailwindcss-browser.js (v4)
 * 2. tailwind.config = {} → 删除，改为 <style type="text/tailwindcss"> 注入自定义颜色
 * 3. code.iconify.design  → ../../libs/iconify.min.js
 * 4. cdn.jsdelivr.net/npm/echarts → ../../libs/echarts.min.js
 * 5. cdn.jsdelivr.net/npm/echarts/map/js/china.js → (保留或本地化)
 */

const fs = require('fs');
const path = require('path');

const HTML_ROOT = path.resolve(__dirname, '..');
const LIBS_DIR = __dirname;

// Tailwind v4 自定义颜色注入 CSS（对应原 tailwind.config 中的颜色）
const TW_CUSTOM_STYLE = `<style type="text/tailwindcss">
@theme {
  --color-brand: #2e9e5a;
  --color-brand-dark: #1e7e42;
  --color-brand-light: #e8f5ec;
  --color-brand-50: #f0faf4;
  --color-accent-orange: #f39c12;
  --color-accent-blue: #3498db;
  --color-accent-red: #e74c3c;
  --color-accent-purple: #9b59b6;
  --color-accent-cyan: #1abc9c;
}
</style>`;

// 收集所有 HTML 文件
function getAllHtmlFiles(dir) {
  const results = [];
  const items = fs.readdirSync(dir);
  for (const item of items) {
    const fullPath = path.join(dir, item);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      results.push(...getAllHtmlFiles(fullPath));
    } else if (item.endsWith('.html')) {
      results.push(fullPath);
    }
  }
  return results;
}

// 计算相对路径（正斜杠）
function relPath(from, to) {
  return path.relative(path.dirname(from), to).replace(/\\/g, '/');
}

let totalModified = 0;
let totalSkipped = 0;

const htmlFiles = getAllHtmlFiles(HTML_ROOT);
console.log(`Found ${htmlFiles.length} HTML files`);

for (const filePath of htmlFiles) {
  let content = fs.readFileSync(filePath, 'utf8');
  let original = content;

  const libsRelPath = relPath(filePath, LIBS_DIR);
  const twLocalPath = `${libsRelPath}/tailwindcss-browser.js`;
  const iconifyLocalPath = `${libsRelPath}/iconify.min.js`;
  const echartsLocalPath = `${libsRelPath}/echarts.min.js`;

  // ── 1. 替换 Tailwind CDN ──
  if (content.includes('cdn.tailwindcss.com')) {
    // 替换 script 标签
    content = content.replace(
      /<script src="https:\/\/cdn\.tailwindcss\.com"><\/script>/g,
      `<script src="${twLocalPath}"></script>`
    );

    // ── 2. 处理 tailwind.config 配置块 ──
    // 找到 <script> 块中的 tailwind.config = { ... }，提取后删除整个 <script> 块（如果只含 tailwind.config）
    // 或者删除 tailwind.config 赋值语句（如果 <script> 块还有其他内容）
    const twConfigBlockRegex = /<script>\s*tailwind\.config\s*=\s*\{[\s\S]*?\}\s*<\/script>/g;
    if (twConfigBlockRegex.test(content)) {
      // 整个 <script> 只含 tailwind.config，直接替换为自定义样式
      content = content.replace(twConfigBlockRegex, TW_CUSTOM_STYLE);
    } else {
      // tailwind.config 在更大的 <script> 块中，只删除赋值语句
      content = content.replace(
        /\s*tailwind\.config\s*=\s*\{[\s\S]*?\};\s*/g,
        '\n'
      );
      // 在 </head> 前插入自定义颜色样式
      if (!content.includes('type="text/tailwindcss"')) {
        content = content.replace('</head>', `  ${TW_CUSTOM_STYLE}\n</head>`);
      }
    }
  }

  // ── 3. 替换 Iconify CDN ──
  content = content.replace(
    /<script src="https:\/\/code\.iconify\.design\/3\/3\.1\.1\/iconify\.min\.js"><\/script>/g,
    `<script src="${iconifyLocalPath}"></script>`
  );

  // ── 4. 替换 ECharts CDN ──
  content = content.replace(
    /<script src="https:\/\/cdn\.jsdelivr\.net\/npm\/echarts@5\.5\.0\/dist\/echarts\.min\.js"><\/script>/g,
    `<script src="${echartsLocalPath}"></script>`
  );
  // echarts china map（保留原CDN，或者不做处理）
  // content = content.replace(...); // 暂不处理 china.js

  if (content !== original) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`✅ Patched: ${path.relative(HTML_ROOT, filePath)}`);
    totalModified++;
  } else {
    totalSkipped++;
  }
}

console.log(`\nDone! Modified: ${totalModified}, Skipped (no CDN): ${totalSkipped}`);
