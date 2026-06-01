/**
 * 将 SVG 转换为 PNG（使用 sharp 库）
 * 如果 sharp 不可用，直接读取 SVG 作为 ImageRun 数据
 */
const fs = require('fs');
const path = require('path');

const chartDir = path.join(__dirname, 'chart_images');
const svgFiles = fs.readdirSync(chartDir).filter(f => f.endsWith('.svg'));

// 尝试使用 sharp 转 PNG
async function convertSvgToPng(svgFile) {
  const svgPath = path.join(chartDir, svgFile);
  const pngPath = svgPath.replace('.svg', '.png');
  
  try {
    const sharp = require('sharp');
    const svgBuffer = fs.readFileSync(svgPath);
    await sharp(svgBuffer).resize(800).png().toFile(pngPath);
    console.log(`✅ PNG: ${path.basename(pngPath)}`);
    return pngPath;
  } catch (e) {
    // sharp 不可用，直接返回 SVG 路径（docx 支持 SVG）
    console.log(`⚠️  sharp 不可用，使用 SVG: ${svgFile}`);
    return svgPath;
  }
}

async function main() {
  for (const svgFile of svgFiles) {
    await convertSvgToPng(svgFile);
  }
  console.log('完成');
}

main().catch(console.error);
