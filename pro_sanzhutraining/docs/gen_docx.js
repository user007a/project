/**
 * gen_docx.js - 将需求规格说明书.md转换为Word文档
 * 使用docx npm包生成结构化.docx文件
 */
const fs = require('fs');
const path = require('path');
const { Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell,
        WidthType, AlignmentType, HeadingLevel, BorderStyle, ImageRun,
        PageBreak, ShadingType, TableBorders, VerticalAlign,
        LevelFormat, NumberFormat, convertInchesToTwip } = require('docx');

// ========== 配置 ==========
const BASE_DIR = path.resolve(__dirname);
const MD_FILE = path.join(BASE_DIR, '需求规格说明书.md');
const OUTPUT_FILE = path.join(BASE_DIR, '需求分析规格说明书.docx');
const CHART_DIR = path.join(BASE_DIR, 'chart_images');

// 图表映射：章节关键词 → PNG文件
const CHART_MAP = {
  '1.6': 'chart1_business_loop.png',   // 核心业务闭环图 → 第1.6节
  '9.1': 'chart2_tech_arch.png',       // 技术架构图 → 第9.1节
  '10.1.1': 'chart3_page_layout.png',  // 页面布局图 → 第10.1.1节
  '11': 'chart4_business_flow.png',    // 业务流程图 → 第11章
  '13': 'chart5_deploy_arch.png',      // 部署架构图 → 第13章
};

// ========== 字体配置 ==========
const FONT_CN = '微软雅黑';
const FONT_EN = 'Calibri';
const FONT_MONO = 'Consolas';

// ========== 颜色配置 ==========
const COLOR_PRIMARY = '1F4E79';    // 深蓝
const COLOR_HEADING = '1890FF';    // 主题蓝
const COLOR_TEXT = '333333';       // 正文黑
const COLOR_LIGHT = '666666';      // 辅助灰
const COLOR_TABLE_HEADER = 'E8F4FD'; // 表头背景
const COLOR_BORDER = 'B0C4DE';    // 边框色
const COLOR_CODE_BG = 'F5F5F5';   // 代码背景

// ========== 工具函数 ==========

// 创建文本运行（支持加粗、斜体、代码样式）
function makeTextRun(text, opts = {}) {
  const { bold, italic, code, color, size, font } = opts;
  const runOpts = {
    text: text,
    color: color || COLOR_TEXT,
    size: size || 21, // 10.5pt = 21半磅
    font: { name: font || FONT_CN, eastAsia: font || FONT_CN },
  };
  if (bold) runOpts.bold = true;
  if (italic) runOpts.italics = true;
  if (code) {
    runOpts.font = { name: FONT_MONO };
    runOpts.color = 'C7254E';
    runOpts.size = 20;
  }
  return new TextRun(runOpts);
}

// 解析行内格式（**bold**, *italic*, `code`）
function parseInlineText(text, baseOpts = {}) {
  const runs = [];
  // 匹配 **bold**, *italic*, `code`, [link](url)
  const regex = /(\*\*(.+?)\*\*|\*(.+?)\*|`(.+?)`|\[(.+?)\]\((.+?)\))/g;
  let lastIndex = 0;
  let match;

  while ((match = regex.exec(text)) !== null) {
    // 添加匹配前的普通文本
    if (match.index > lastIndex) {
      const plainText = text.slice(lastIndex, match.index);
      if (plainText) runs.push(makeTextRun(plainText, baseOpts));
    }

    if (match[2]) {
      // **bold**
      runs.push(makeTextRun(match[2], { ...baseOpts, bold: true }));
    } else if (match[3]) {
      // *italic*
      runs.push(makeTextRun(match[3], { ...baseOpts, italic: true }));
    } else if (match[4]) {
      // `code`
      runs.push(makeTextRun(match[4], { ...baseOpts, code: true }));
    } else if (match[5] && match[6]) {
      // [text](url) - 在Word中显示为 text (url)
      runs.push(makeTextRun(match[5], { ...baseOpts, color: COLOR_HEADING }));
      runs.push(makeTextRun(` (${match[6]})`, { ...baseOpts, color: COLOR_LIGHT, size: 18 }));
    }

    lastIndex = regex.lastIndex;
  }

  // 添加剩余文本
  if (lastIndex < text.length) {
    runs.push(makeTextRun(text.slice(lastIndex), baseOpts));
  }

  return runs.length > 0 ? runs : [makeTextRun(text, baseOpts)];
}

// 创建段落
function makeParagraph(runs, opts = {}) {
  const paraOpts = {
    children: Array.isArray(runs) ? runs : [runs],
    spacing: { after: 120, line: 276 }, // 1.15倍行距
  };
  if (opts.alignment) paraOpts.alignment = opts.alignment;
  if (opts.heading) paraOpts.heading = opts.heading;
  if (opts.indent) paraOpts.indent = opts.indent;
  if (opts.spacing) paraOpts.spacing = { ...paraOpts.spacing, ...opts.spacing };
  if (opts.bullet) {
    paraOpts.bullet = { level: opts.bullet.level || 0 };
  }
  return new Paragraph(paraOpts);
}

// 创建标题
function makeHeading(text, level) {
  const headingMap = {
    1: HeadingLevel.HEADING_1,
    2: HeadingLevel.HEADING_2,
    3: HeadingLevel.HEADING_3,
    4: HeadingLevel.HEADING_4,
    5: HeadingLevel.HEADING_5,
    6: HeadingLevel.HEADING_6,
  };

  const sizeMap = { 1: 36, 2: 32, 3: 28, 4: 24, 5: 22, 6: 21 };
  const colorMap = { 1: COLOR_PRIMARY, 2: '2E75B6', 3: '3A8FD6', 4: COLOR_HEADING, 5: COLOR_HEADING, 6: COLOR_HEADING };

  const runs = parseInlineText(text, { bold: true, color: colorMap[level] || COLOR_TEXT, size: sizeMap[level] || 21 });

  return new Paragraph({
    children: runs,
    heading: headingMap[level],
    spacing: { before: level <= 2 ? 360 : 240, after: 120, line: 276 },
  });
}

// 创建分隔线
function makeHorizontalRule() {
  return new Paragraph({
    children: [makeTextRun('─'.repeat(60), { color: COLOR_BORDER, size: 16 })],
    spacing: { before: 200, after: 200 },
    alignment: AlignmentType.CENTER,
  });
}

// 创建引用块
function makeBlockquote(text) {
  const runs = parseInlineText(text, { italic: true, color: COLOR_LIGHT });
  return new Paragraph({
    children: [
      makeTextRun('▎ ', { color: COLOR_HEADING, size: 24, bold: true }),
      ...runs,
    ],
    indent: { left: 400 },
    spacing: { before: 120, after: 120, line: 276 },
    border: {
      left: { style: BorderStyle.SINGLE, size: 6, color: COLOR_HEADING, space: 10 },
    },
  });
}

// 创建代码块
function makeCodeBlock(lines) {
  const paragraphs = [];
  for (const line of lines) {
    paragraphs.push(new Paragraph({
      children: [makeTextRun(line || ' ', { code: true, color: '333333', size: 18 })],
      spacing: { after: 0, line: 240 },
      shading: { type: ShadingType.SOLID, color: COLOR_CODE_BG },
      indent: { left: 300 },
    }));
  }
  return paragraphs;
}

// 创建列表项
function makeBulletItem(text, level = 0) {
  const runs = parseInlineText(text);
  return new Paragraph({
    children: runs,
    bullet: { level },
    spacing: { after: 60, line: 276 },
  });
}

// 创建表格
function makeTable(headers, rows) {
  const colCount = headers.length;
  // 计算列宽
  const pageWidth = 9600; // A4可用宽度(DXA)
  const colWidth = Math.floor(pageWidth / colCount);

  const tableRows = [];

  // 表头行
  const headerCells = headers.map(h => new TableCell({
    children: [new Paragraph({
      children: [makeTextRun(h.trim(), { bold: true, color: 'FFFFFF', size: 20 })],
      alignment: AlignmentType.CENTER,
      spacing: { before: 60, after: 60 },
    })],
    width: { size: colWidth, type: WidthType.DXA },
    shading: { type: ShadingType.SOLID, color: COLOR_PRIMARY },
    verticalAlign: VerticalAlign.CENTER,
  }));
  tableRows.push(new TableRow({ children: headerCells, tableHeader: true }));

  // 数据行
  for (let i = 0; i < rows.length; i++) {
    const row = rows[i];
    const cells = [];
    for (let j = 0; j < colCount; j++) {
      const cellText = (j < row.length) ? row[j].trim() : '';
      const runs = parseInlineText(cellText, { size: 19 });
      cells.push(new TableCell({
        children: [new Paragraph({
          children: runs,
          spacing: { before: 40, after: 40 },
        })],
        width: { size: colWidth, type: WidthType.DXA },
        shading: i % 2 === 0 ? { type: ShadingType.SOLID, color: 'FAFAFA' } : undefined,
        verticalAlign: VerticalAlign.CENTER,
      }));
    }
    tableRows.push(new TableRow({ children: cells }));
  }

  return new Table({
    rows: tableRows,
    width: { size: pageWidth, type: WidthType.DXA },
  });
}

// 创建图片段落
function makeImageParagraph(imagePath, maxWidthCm = 15) {
  if (!fs.existsSync(imagePath)) {
    console.warn(`⚠️ 图片不存在: ${imagePath}`);
    return [makeParagraph([makeTextRun(`[图片缺失: ${path.basename(imagePath)}]`, { color: 'FF0000', italic: true })])];
  }

  const imageBuffer = fs.readFileSync(imagePath);
  const maxSize = maxWidthCm * 567; // cm转DXA (1cm ≈ 567 DXA)

  return [
    new Paragraph({
      children: [new ImageRun({
        data: imageBuffer,
        transformation: {
          width: maxWidthCm * 37.8, // cm转像素 (1cm ≈ 37.8px at 96dpi)
          height: maxWidthCm * 28,   // 保守高度，会自动调整
        },
        type: 'png',
      })],
      alignment: AlignmentType.CENTER,
      spacing: { before: 200, after: 200 },
    }),
    makeParagraph([makeTextRun('▲ 图表：详见上方图示', { color: COLOR_LIGHT, size: 18, italic: true })], { alignment: AlignmentType.CENTER, spacing: { after: 200 } }),
  ];
}

// ========== MD 解析器 ==========

function parseMD(filePath) {
  const content = fs.readFileSync(filePath, 'utf-8');
  const lines = content.split('\n');
  const elements = [];

  let i = 0;
  let inCodeBlock = false;
  let codeBlockLines = [];
  let inTable = false;
  let tableHeaders = [];
  let tableRows = [];
  let tableSeparatorSeen = false;

  // 检查当前行是否应该插入图表
  function checkChartInsertion(headingText, headingLevel) {
    const results = [];
    // 匹配章节号
    const sectionMatch = headingText.match(/^(\d+\.?\d*\.?\d*)/);
    if (sectionMatch) {
      const sectionNum = sectionMatch[1];
      // 精确匹配
      for (const [key, imgFile] of Object.entries(CHART_MAP)) {
        if (sectionNum === key || headingText.startsWith(key + ' ') || headingText.includes(key)) {
          const imgPath = path.join(CHART_DIR, imgFile);
          if (fs.existsSync(imgPath)) {
            results.push(...makeImageParagraph(imgPath));
          }
        }
      }
    }
    return results;
  }

  while (i < lines.length) {
    const line = lines[i];
    const trimmed = line.trim();

    // 跳过空行
    if (trimmed === '') {
      if (inTable) {
        // 表格结束
        elements.push(makeTable(tableHeaders, tableRows));
        inTable = false;
        tableHeaders = [];
        tableRows = [];
        tableSeparatorSeen = false;
      }
      i++;
      continue;
    }

    // 代码块处理
    if (trimmed.startsWith('```')) {
      if (inCodeBlock) {
        // 代码块结束
        const codeParas = makeCodeBlock(codeBlockLines);
        elements.push(...codeParas);
        inCodeBlock = false;
        codeBlockLines = [];
      } else {
        // 如果在表格中，先结束表格
        if (inTable) {
          elements.push(makeTable(tableHeaders, tableRows));
          inTable = false;
          tableHeaders = [];
          tableRows = [];
          tableSeparatorSeen = false;
        }
        inCodeBlock = true;
        codeBlockLines = [];
      }
      i++;
      continue;
    }

    if (inCodeBlock) {
      codeBlockLines.push(trimmed);
      i++;
      continue;
    }

    // 分隔线
    if (trimmed === '---' || trimmed === '***' || trimmed === '___') {
      if (inTable) {
        elements.push(makeTable(tableHeaders, tableRows));
        inTable = false;
        tableHeaders = [];
        tableRows = [];
        tableSeparatorSeen = false;
      }
      elements.push(makeHorizontalRule());
      i++;
      continue;
    }

    // 标题处理
    const headingMatch = trimmed.match(/^(#{1,6})\s+(.+)$/);
    if (headingMatch) {
      if (inTable) {
        elements.push(makeTable(tableHeaders, tableRows));
        inTable = false;
        tableHeaders = [];
        tableRows = [];
        tableSeparatorSeen = false;
      }
      const level = headingMatch[1].length;
      const text = headingMatch[2];
      elements.push(makeHeading(text, level));
      // 检查是否需要插入图表
      const chartParas = checkChartInsertion(text, level);
      if (chartParas.length > 0) {
        elements.push(...chartParas);
      }
      i++;
      continue;
    }

    // 表格处理
    if (trimmed.startsWith('|') && trimmed.endsWith('|')) {
      if (!inTable) {
        inTable = true;
        tableHeaders = [];
        tableRows = [];
        tableSeparatorSeen = false;
      }

      const cells = trimmed.slice(1, -1).split('|').map(c => c.trim());

      // 检查是否是分隔行
      if (cells.every(c => /^[-:]+$/.test(c))) {
        tableSeparatorSeen = true;
        i++;
        continue;
      }

      if (!tableSeparatorSeen && tableHeaders.length === 0) {
        tableHeaders = cells;
      } else {
        tableRows.push(cells);
      }
      i++;
      continue;
    } else if (inTable) {
      // 表格结束
      elements.push(makeTable(tableHeaders, tableRows));
      inTable = false;
      tableHeaders = [];
      tableRows = [];
      tableSeparatorSeen = false;
    }

    // 引用块
    if (trimmed.startsWith('>')) {
      const quoteText = trimmed.replace(/^>\s*/, '');
      elements.push(makeBlockquote(quoteText));
      i++;
      continue;
    }

    // 无序列表
    const ulMatch = trimmed.match(/^[-*]\s+(.+)$/);
    if (ulMatch) {
      const indent = line.search(/\S/);
      const level = Math.floor(indent / 2);
      elements.push(makeBulletItem(ulMatch[1], level));
      i++;
      continue;
    }

    // 有序列表
    const olMatch = trimmed.match(/^\d+\.\s+(.+)$/);
    if (olMatch) {
      elements.push(makeBulletItem(olMatch[1], 0));
      i++;
      continue;
    }

    // 普通段落（可能跨行）
    let paraText = trimmed;
    // 向前看，合并连续的文本行
    while (i + 1 < lines.length) {
      const nextLine = lines[i + 1].trim();
      if (nextLine === '' || nextLine.startsWith('#') || nextLine.startsWith('|') ||
          nextLine.startsWith('```') || nextLine.startsWith('>') || nextLine.startsWith('---') ||
          nextLine.match(/^[-*]\s/) || nextLine.match(/^\d+\.\s/)) {
        break;
      }
      i++;
      paraText += ' ' + nextLine;
    }

    const runs = parseInlineText(paraText);
    elements.push(makeParagraph(runs));
    i++;
  }

  // 处理末尾的表格
  if (inTable) {
    elements.push(makeTable(tableHeaders, tableRows));
  }

  return elements;
}

// ========== 特殊处理：在特定章节插入图表 ==========

function insertChartsAtSections(elements) {
  // 已经在解析时通过 checkChartInsertion 处理
  // 这里做补充：对第11章（业务流程）和第13章（部署结构）的特殊处理
  // 因为这些章节的代码块中包含ASCII架构图，也需要替换为PNG图片
  return elements;
}

// ========== 主函数 ==========

async function main() {
  console.log('📖 开始解析Markdown文件...');
  console.log(`   源文件: ${MD_FILE}`);

  let elements;
  try {
    elements = parseMD(MD_FILE);
  } catch (err) {
    console.error('❌ 解析Markdown失败:', err);
    process.exit(1);
  }

  console.log(`✅ 解析完成，共生成 ${elements.length} 个元素`);

  // 对第11章和第13章的代码块进行特殊替换
  // 查找包含"课程学习流程"或"部署架构"相关内容的代码块，在其前后插入对应图片
  const enhancedElements = [];
  let lastHeadingText = '';

  for (let idx = 0; idx < elements.length; idx++) {
    const el = elements[idx];

    // 追踪当前标题
    if (el instanceof Paragraph && el.root && el.root[0] && el.root[0].rootKey === 'paragraph') {
      try {
        const runs = el.root[0].root;
        if (runs && runs.length > 0) {
          // 尝试提取标题文本
          const textParts = [];
          for (const r of runs) {
            if (r && r.root) {
              for (const part of r.root) {
                if (typeof part === 'string') textParts.push(part);
                else if (part && typeof part === 'object' && part.root) {
                  for (const p of part.root) {
                    if (typeof p === 'string') textParts.push(p);
                  }
                }
              }
            }
          }
          if (textParts.length > 0) {
            lastHeadingText = textParts.join('');
          }
        }
      } catch (e) {
        // 忽略解析错误
      }
    }

    // 检查是否是第11章标题 - 插入业务流程图
    if (el.constructor.name === 'Paragraph') {
      try {
        const textContent = JSON.stringify(el.root);
        if (textContent.includes('业务流程') && !textContent.includes('流程图')) {
          // 在"业务流程"标题后插入图表
          enhancedElements.push(el);
          const imgPath = path.join(CHART_DIR, 'chart4_business_flow.png');
          if (fs.existsSync(imgPath) && !textContent.includes('chart4')) {
            enhancedElements.push(...makeImageParagraph(imgPath, 14));
          }
          continue;
        }
        if (textContent.includes('部署结构') || textContent.includes('部署架构')) {
          enhancedElements.push(el);
          const imgPath = path.join(CHART_DIR, 'chart5_deploy_arch.png');
          if (fs.existsSync(imgPath) && !textContent.includes('chart5')) {
            enhancedElements.push(...makeImageParagraph(imgPath, 14));
          }
          continue;
        }
      } catch (e) {
        // 忽略
      }
    }

    enhancedElements.push(el);
  }

  console.log(`✅ 增强后共 ${enhancedElements.length} 个元素`);

  // 创建文档
  const doc = new Document({
    styles: {
      default: {
        document: {
          run: {
            font: { name: FONT_CN, eastAsia: FONT_CN },
            size: 21,
            color: COLOR_TEXT,
          },
          paragraph: {
            spacing: { after: 120, line: 276 },
          },
        },
        heading1: {
          run: {
            font: { name: FONT_CN, eastAsia: FONT_CN },
            size: 36,
            bold: true,
            color: COLOR_PRIMARY,
          },
          paragraph: {
            spacing: { before: 480, after: 200 },
          },
        },
        heading2: {
          run: {
            font: { name: FONT_CN, eastAsia: FONT_CN },
            size: 32,
            bold: true,
            color: '2E75B6',
          },
          paragraph: {
            spacing: { before: 360, after: 160 },
          },
        },
        heading3: {
          run: {
            font: { name: FONT_CN, eastAsia: FONT_CN },
            size: 28,
            bold: true,
            color: '3A8FD6',
          },
          paragraph: {
            spacing: { before: 280, after: 120 },
          },
        },
      },
    },
    numbering: {
      config: [{
        reference: 'bullet-list',
        levels: [{
          level: 0,
          format: LevelFormat.BULLET,
          text: '\u2022',
          alignment: AlignmentType.LEFT,
          style: { paragraph: { indent: { left: 720, hanging: 360 } } },
        }, {
          level: 1,
          format: LevelFormat.BULLET,
          text: '\u25E6',
          alignment: AlignmentType.LEFT,
          style: { paragraph: { indent: { left: 1440, hanging: 360 } } },
        }],
      }],
    },
    sections: [{
      properties: {
        page: {
          size: {
            width: 11906, // A4
            height: 16838,
            orientation: 'portrait',
          },
          margin: {
            top: 1440,    // 1 inch
            right: 1080,  // 0.75 inch
            bottom: 1440,
            left: 1080,
          },
        },
      },
      children: enhancedElements,
    }],
  });

  // 生成文件
  console.log('📝 正在生成Word文档...');
  try {
    const buffer = await Packer.toBuffer(doc);
    fs.writeFileSync(OUTPUT_FILE, buffer);
    const fileSize = (buffer.length / 1024).toFixed(1);
    console.log(`✅ Word文档生成成功!`);
    console.log(`   文件: ${OUTPUT_FILE}`);
    console.log(`   大小: ${fileSize} KB`);
  } catch (err) {
    console.error('❌ 生成Word文档失败:', err);
    process.exit(1);
  }
}

main().catch(err => {
  console.error('❌ 程序异常:', err);
  process.exit(1);
});
