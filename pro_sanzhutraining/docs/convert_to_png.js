/**
 * 使用 sharp 将 SVG 转换为 PNG
 */
const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const chartDir = path.join(__dirname, 'chart_images');
const svgFiles = fs.readdirSync(chartDir).filter(f => f.endsWith('.svg'));

async function main() {
  for (const svgFile of svgFiles) {
    const svgPath = path.join(chartDir, svgFile);
    const pngPath = svgPath.replace('.svg', '.png');
    const svgBuffer = fs.readFileSync(svgPath);
    await sharp(svgBuffer).png().toFile(pngPath);
    const stat = fs.statSync(pngPath);
    console.log(`✅ PNG: ${path.basename(pngPath)} (${Math.round(stat.size/1024)}KB)`);
  }
  console.log('完成');
}

main().catch(e => { console.error(e); process.exit(1); });
