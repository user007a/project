"""
医疗护理员初级题库数据抓取脚本
从湖南育婴师小程序抓取【练习】->【题库练习】->【医疗护理员初级】下的所有题库内容

使用方式:
1. 启动mitmproxy: python scrape_medical_nursing.py --proxy
2. 直接抓取API: python scrape_medical_nursing.py --scrape
3. 处理已捕获数据: python scrape_medical_nursing.py --process
"""

import json
import os
import re
import sys
import time
import argparse
from datetime import datetime
from collections import defaultdict

import requests
import openpyxl
from openpyxl.styles import Font, Alignment, PatternFill

# ============ 配置 ============
OUTPUT_DIR = "output_data"
CAPTURED_DIR = "captured_data"
EXCEL_TEMPLATE = "老年人能力评估师三级题库-导入.xlsx"
OUTPUT_FILE = "医疗护理员初级题库-导入.xlsx"

# 试题分类
CATEGORY = "医疗护理员初级"

# 答案映射: A=1, B=2, C=3, D=4, E=5, F=6, G=7, H=8
ANSWER_MAP = {'A': '1', 'B': '2', 'C': '3', 'D': '4', 'E': '5', 'F': '6', 'G': '7', 'H': '8'}

# 题型映射
TYPE_MAP = {
    'single': '单选题',
    'multi': '多选题',
    'judge': '判断题',
    'fill': '填空题',
    'short': '问答题',
    'essay': '问答题',
    'choice': '单选题',
    'checkbox': '多选题',
    'truefalse': '判断题',
}

# 难度映射
DIFFICULTY_MAP = {
    'easy': '简单',
    'medium': '中等',
    'hard': '难',
    'very_hard': '特别难',
    'simple': '简单',
    'normal': '中等',
    'difficult': '难',
}


def ensure_dirs():
    """确保输出目录存在"""
    os.makedirs(OUTPUT_DIR, exist_ok=True)
    os.makedirs(CAPTURED_DIR, exist_ok=True)


def convert_answer(answer_str, question_type):
    """
    根据题型转换答案格式
    - 单选题: A->1, B->2
    - 多选题: ABC->1,2,3
    - 判断题: 正确->1, 错误->0
    - 填空题: 保持原文
    """
    if not answer_str:
        return '', ''

    answer_str = str(answer_str).strip()

    # 判断题
    if question_type == '判断题':
        if answer_str in ['1', '对', '正确', 'true', 'True', 'T', '√', '✓', '正确的']:
            return '1', '判断题'
        elif answer_str in ['0', '错', '错误', 'false', 'False', 'F', '×', '✗', '不正确']:
            return '0', '判断题'
        # 尝试从文字中提取
        if '正确' in answer_str or '对' in answer_str:
            return '1', '判断题'
        if '错误' in answer_str or '错' in answer_str:
            return '0', '判断题'
        return answer_str, '判断题'

    # 单选题
    if question_type == '单选题':
        if answer_str.upper() in ANSWER_MAP:
            return ANSWER_MAP[answer_str.upper()], '单选题'
        # 如果已经是数字
        if answer_str in ['1', '2', '3', '4', '5', '6', '7', '8']:
            return answer_str, '单选题'
        # 尝试提取字母
        match = re.search(r'[A-Ha-h]', answer_str)
        if match:
            letter = match.group(0).upper()
            return ANSWER_MAP.get(letter, answer_str), '单选题'
        return answer_str, '单选题'

    # 多选题
    if question_type == '多选题':
        # 提取所有字母
        letters = re.findall(r'[A-Ha-h]', answer_str)
        if letters:
            numbers = [ANSWER_MAP.get(l.upper(), l) for l in letters]
            return ','.join(numbers), '多选题'
        # 如果已经是数字逗号分隔
        if re.match(r'^[\d,]+$', answer_str):
            return answer_str, '多选题'
        return answer_str, '多选题'

    # 填空题和问答题保持原样
    return answer_str, question_type


def detect_question_type(data):
    """
    从数据中检测题型
    """
    # 先看明确的type字段
    type_fields = ['type', 'questionType', 'qType', 'typeName', '题型']
    for field in type_fields:
        if field in data and data[field]:
            val = str(data[field]).lower()
            if val in TYPE_MAP:
                return TYPE_MAP[val]
            if val in ['单选题', '多选题', '判断题', '填空题', '问答题']:
                return val

    # 根据特征判断
    if '正确' in str(data).lower() or '错误' in str(data).lower():
        if '选项' not in str(data):
            return '判断题'

    options = extract_options(data)
    if len(options) == 2:
        return '判断题'
    elif len(options) > 0:
        # 检查是否是多选
        if data.get('multi') or data.get('isMulti') or data.get('multiple'):
            return '多选题'
        return '单选题'

    # 检查填空
    content = str(data.get('content', data.get('question', '')))
    if '____' in content or '填空' in content or '（' in content and '）' in content:
        return '填空题'

    return '单选题'  # 默认


def extract_options(data):
    """
    从数据中提取选项
    """
    options = {}
    option_labels = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H']

    # 方式1: options字段
    if 'options' in data and isinstance(data['options'], list):
        for i, opt in enumerate(data['options']):
            if isinstance(opt, dict):
                label = opt.get('label', opt.get('key', option_labels[i]))
                text = opt.get('text', opt.get('content', opt.get('value', '')))
                if text:
                    options[option_labels[i]] = text
            elif isinstance(opt, str):
                options[option_labels[i]] = opt

    # 方式2: optionA, optionB等字段
    for label in option_labels:
        for field in [f'option{label}', f'option_{label.lower()}', f'opt{label}']:
            if field in data and data[field]:
                options[label] = str(data[field])
                break

    # 方式3: options字典
    if 'options' in data and isinstance(data['options'], dict):
        for key, val in data['options'].items():
            label = str(key).upper()
            if label in option_labels:
                options[label] = str(val)

    return options


def extract_question_content(data):
    """
    提取题目内容
    """
    content_fields = ['content', 'question', 'title', 'stem', '题干', '题目', 'qContent']
    for field in content_fields:
        if field in data and data[field]:
            return str(data[field]).strip()
    return ''


def extract_answer(data):
    """
    提取答案
    """
    answer_fields = ['answer', 'correctAnswer', 'answerKey', '答案', 'correct', 'rightAnswer']
    for field in answer_fields:
        if field in data and data[field]:
            val = str(data[field]).strip()
            if val:
                return val
    return ''


def extract_analysis(data):
    """
    提取解析
    """
    analysis_fields = ['analysis', 'explanation', '解析', 'explain', 'comment', 'analysisText']
    for field in analysis_fields:
        if field in data and data[field]:
            return str(data[field]).strip()
    return ''


def extract_difficulty(data):
    """
    提取难度
    """
    difficulty_fields = ['difficulty', 'level', '难度', 'difficultyLevel']
    for field in difficulty_fields:
        if field in data and data[field]:
            val = str(data[field]).lower()
            if val in DIFFICULTY_MAP:
                return DIFFICULTY_MAP[val]
            if val in ['简单', '中等', '难', '特别难']:
                return val
            # 数字映射
            if val == '1':
                return '简单'
            if val == '2':
                return '中等'
            if val == '3':
                return '难'
            if val == '4':
                return '特别难'
    return '中等'  # 默认难度


def extract_score(data):
    """
    提取分值
    """
    score_fields = ['score', '分值', 'points', 'value']
    for field in score_fields:
        if field in data and data[field]:
            try:
                return int(data[field])
            except (ValueError, TypeError):
                pass
    return 5  # 默认分值


def parse_question_data(raw_data):
    """
    解析单个题目数据，返回标准化的题目字典
    """
    if not isinstance(raw_data, dict):
        return None

    # 尝试从嵌套结构中提取
    data = raw_data
    if 'data' in raw_data and isinstance(raw_data['data'], dict):
        data = raw_data['data']
    if 'question' in data and isinstance(data['question'], dict):
        data = data['question']

    # 检测题型
    question_type = detect_question_type(data)

    # 提取题目内容
    content = extract_question_content(data)
    if not content:
        return None

    # 提取选项
    options = extract_options(data)

    # 提取答案
    raw_answer = extract_answer(data)

    # 转换答案格式
    converted_answer, final_type = convert_answer(raw_answer, question_type)

    # 提取解析
    analysis = extract_analysis(data)

    # 提取难度
    difficulty = extract_difficulty(data)

    # 提取分值
    score = extract_score(data)

    # 构建标准化题目
    question = {
        'category': CATEGORY,
        'type': final_type,
        'difficulty': difficulty,
        'content': content,
        'answer': converted_answer,
        'analysis': analysis,
        'score': score,
        'options': {},
    }

    # 对于填空题，答案可能需要特殊处理
    if final_type == '填空题' and raw_answer:
        question['answer'] = raw_answer

    # 添加选项
    option_labels = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H']
    for i, label in enumerate(option_labels):
        question['options'][label] = options.get(label, '')

    return question


def write_excel(questions, output_path):
    """
    将题目数据写入Excel文件
    """
    if not questions:
        print("[!] 没有题目数据可写入")
        return

    wb = openpyxl.Workbook()
    ws = wb.active
    ws.title = "Sheet1"

    # 表头
    headers = [
        '试题分类', '试题类型', '试题难度', '试题内容', '答案',
        '解析', '分值', '选项1', '选项2', '选项3', '选项4',
        '选项5', '选项6', '选项7', '选项8'
    ]

    # 写入表头
    header_font = Font(bold=True)
    for col_idx, header in enumerate(headers, 1):
        cell = ws.cell(row=1, column=col_idx, value=header)
        cell.font = header_font
        cell.alignment = Alignment(horizontal='center', vertical='center')

    # 写入数据
    for row_idx, q in enumerate(questions, 2):
        ws.cell(row=row_idx, column=1, value=q['category'])
        ws.cell(row=row_idx, column=2, value=q['type'])
        ws.cell(row=row_idx, column=3, value=q['difficulty'])
        ws.cell(row=row_idx, column=4, value=q['content'])
        ws.cell(row=row_idx, column=5, value=q['answer'])
        ws.cell(row=row_idx, column=6, value=q['analysis'])
        ws.cell(row=row_idx, column=7, value=q['score'])

        # 选项 (A-H 对应 选项1-8)
        option_labels = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H']
        for i, label in enumerate(option_labels):
            ws.cell(row=row_idx, column=8 + i, value=q['options'].get(label, ''))

    # 调整列宽
    column_widths = [15, 10, 10, 60, 15, 30, 8, 40, 40, 40, 40, 30, 30, 30, 30]
    for col_idx, width in enumerate(column_widths, 1):
        ws.column_dimensions[openpyxl.utils.get_column_letter(col_idx)].width = width

    # 保存
    wb.save(output_path)
    print(f"[+] 已保存 {len(questions)} 道题目到: {output_path}")


def process_captured_data():
    """
    处理已捕获的数据文件
    """
    ensure_dirs()

    questions = []

    # 查找所有已保存的JSON响应文件
    json_files = []
    for dirpath, dirnames, filenames in os.walk(CAPTURED_DIR):
        for f in filenames:
            if f.endswith('.json') and f.startswith('response_'):
                json_files.append(os.path.join(dirpath, f))

    if not json_files:
        print(f"[!] 在 {CAPTURED_DIR} 目录下没有找到已捕获的数据文件")
        print("[*] 请先启动mitmproxy并在小程序中操作以捕获数据")
        return questions

    print(f"[*] 找到 {len(json_files)} 个已捕获的数据文件")

    for json_file in json_files:
        try:
            with open(json_file, 'r', encoding='utf-8') as f:
                data = json.load(f)

            # 如果是包装的响应
            if 'data' in data and 'url' in data:
                raw_data = data['data']
            else:
                raw_data = data

            # 尝试从数据中提取题目
            extracted = extract_all_questions(raw_data)
            questions.extend(extracted)

        except Exception as e:
            print(f"[-] 处理文件出错 {json_file}: {e}")

    # 去重
    seen = set()
    unique_questions = []
    for q in questions:
        key = q['content'][:50]  # 用题目前50字符作为去重键
        if key not in seen:
            seen.add(key)
            unique_questions.append(q)

    print(f"[*] 共提取 {len(questions)} 道题目，去重后 {len(unique_questions)} 道")

    # 保存为Excel
    if unique_questions:
        output_path = os.path.join(OUTPUT_DIR, OUTPUT_FILE)
        write_excel(unique_questions, output_path)

        # 同时保存一份JSON备份
        backup_path = os.path.join(OUTPUT_DIR, 'medical_nursing_questions.json')
        with open(backup_path, 'w', encoding='utf-8') as f:
            json.dump(unique_questions, f, ensure_ascii=False, indent=2)
        print(f"[+] JSON备份已保存到: {backup_path}")

    return unique_questions


def extract_all_questions(data):
    """
    从任意数据结构中递归提取所有题目
    """
    questions = []

    if isinstance(data, dict):
        # 检查是否是题目
        q = parse_question_data(data)
        if q and q['content']:
            questions.append(q)
        else:
            # 递归查找
            for key, val in data.items():
                if isinstance(val, (dict, list)):
                    questions.extend(extract_all_questions(val))

    elif isinstance(data, list):
        for item in data:
            if isinstance(item, (dict, list)):
                questions.extend(extract_all_questions(item))

    return questions


def try_direct_api_access():
    """
    尝试直接访问小程序的API
    """
    # 可能的API基础URL列表
    api_bases = [
        "https://api.hunanyingshi.com",
        "https://api.jzmama.com",
        "https://jzmama.com",
        "https://api.yuyingshi.com",
        "https://api.hunanyingshi.cn",
    ]

    # 可能的API路径
    api_paths = [
        "/api/question/list",
        "/api/questionBank/list",
        "/api/exam/questions",
        "/api/practice/questions",
        "/api/subject/questions",
        "/api/category/questions",
        "/api/medical/questions",
    ]

    # 可能的请求参数
    params_sets = [
        {"category": "医疗护理员初级", "type": "practice"},
        {"subject": "medical_nursing_junior", "page": 1},
        {"catId": "medical_nursing_junior", "pageSize": 100},
        {"module": "practice", "categoryId": "medical_care_junior"},
    ]

    headers = {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
        "Accept": "application/json",
        "Accept-Language": "zh-CN,zh;q=0.9",
    }

    found_questions = []

    print("[*] 尝试直接访问API...")

    for base_url in api_bases:
        for path in api_paths:
            url = f"{base_url}{path}"
            for params in params_sets:
                try:
                    print(f"  尝试: {url} params={params}")
                    resp = requests.get(url, params=params, headers=headers, timeout=10)

                    if resp.status_code == 200:
                        try:
                            data = resp.json()
                            questions = extract_all_questions(data)
                            if questions:
                                print(f"  [+] 从 {url} 获取到 {len(questions)} 道题目")
                                found_questions.extend(questions)
                        except json.JSONDecodeError:
                            pass
                    else:
                        print(f"  [-] {url} 返回状态码: {resp.status_code}")

                except requests.exceptions.ConnectionError:
                    print(f"  [-] 无法连接到 {base_url}")
                    break  # 同一base URL的其他路径也可能无法连接
                except requests.exceptions.Timeout:
                    print(f"  [-] 连接超时: {url}")
                except Exception as e:
                    print(f"  [-] 请求出错: {e}")

                time.sleep(0.5)  # 避免请求过快

    return found_questions


def start_mitmproxy():
    """
    启动mitmproxy代理服务器
    """
    print("[*] 启动mitmproxy代理服务器...")

    # mitmdump命令（使用本地配置目录）
    mitmdump_path = r"C:\Users\Administrator\AppData\Roaming\Python\Python314\Scripts\mitmdump.exe"
    script_path = os.path.join(os.path.dirname(os.path.abspath(__file__)), "proxy_capture.py")
    conf_dir = os.path.join(os.path.dirname(os.path.abspath(__file__)), ".mitmproxy_local")

    cmd = f'"{mitmdump_path}" -s "{script_path}" --set block_global=false --set confdir="{conf_dir}" --listen-port 8080'

    print(f"[*] 命令: {cmd}")
    print("[*] 请在另一终端运行此命令，然后：")
    print("    1. 配置手机/PC系统代理为: 127.0.0.1:8080")
    print("    2. 在微信中打开小程序")
    print("    3. 进入【练习】->【题库练习】->【医疗护理员初级】")
    print("    4. 系统将自动捕获API数据")
    print()
    print("[*] 或直接运行: python proxy_capture.py")

    return False  # 不直接启动


def main():
    parser = argparse.ArgumentParser(description='医疗护理员初级题库数据抓取工具')
    parser.add_argument('--proxy', action='store_true', help='启动mitmproxy代理')
    parser.add_argument('--scrape', action='store_true', help='尝试直接抓取API')
    parser.add_argument('--process', action='store_true', help='处理已捕获的数据')
    parser.add_argument('--all', action='store_true', help='执行所有步骤')
    parser.add_argument('--output', type=str, help='输出文件名')

    args = parser.parse_args()

    ensure_dirs()

    if args.proxy or args.all:
        start_mitmproxy()

    if args.scrape or args.all:
        questions = try_direct_api_access()
        if questions:
            output_path = os.path.join(OUTPUT_DIR, args.output or OUTPUT_FILE)
            write_excel(questions, output_path)

    if args.process or args.all:
        process_captured_data()

    # 如果没有指定参数，显示帮助
    if not any([args.proxy, args.scrape, args.process, args.all]):
        parser.print_help()
        print()
        print("=" * 60)
        print("医疗护理员初级题库数据抓取工具")
        print("=" * 60)
        print()
        print("使用步骤:")
        print("  1. 启动代理: python scrape_medical_nursing.py --proxy")
        print("  2. 在微信中打开小程序并操作")
        print("  3. 处理数据: python scrape_medical_nursing.py --process")
        print()
        print("或尝试直接抓取: python scrape_medical_nursing.py --scrape")


if __name__ == '__main__':
    main()