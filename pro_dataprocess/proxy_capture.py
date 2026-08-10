"""
mitmproxy 脚本 - 捕获湖南育婴师小程序的题库API数据
使用方法: mitmdump -s proxy_capture.py --set block_global=false
"""
import json
import os
from datetime import datetime

# 保存数据的目录
OUTPUT_DIR = "captured_data"
os.makedirs(OUTPUT_DIR, exist_ok=True)

# 存储捕获到的题目数据
captured_questions = []

def response(flow):
    """处理响应，捕获题库相关数据"""
    global captured_questions
    
    try:
        # 获取请求URL
        url = flow.request.url
        
        # 过滤题库相关的API请求
        keywords = ["question", "topic", "item", "bank", "practice", "exam", "quiz", "answer"]
        
        if any(kw in url.lower() for kw in keywords):
            # 尝试解析响应内容
            response_text = flow.response.text
            
            if response_text:
                try:
                    data = json.loads(response_text)
                    
                    # 保存原始响应
                    timestamp = datetime.now().strftime("%Y%m%d_%H%M%S_%f")
                    filename = f"{OUTPUT_DIR}/response_{timestamp}.json"
                    
                    with open(filename, "w", encoding="utf-8") as f:
                        json.dump({
                            "url": url,
                            "data": data
                        }, f, ensure_ascii=False, indent=2)
                    
                    print(f"[+] 捕获到API响应: {url}")
                    print(f"    保存到: {filename}")
                    
                    # 尝试提取题目数据
                    extract_questions(data, url)
                    
                except json.JSONDecodeError:
                    # 非JSON响应，保存文本
                    timestamp = datetime.now().strftime("%Y%m%d_%H%M%S_%f")
                    filename = f"{OUTPUT_DIR}/response_{timestamp}.txt"
                    
                    with open(filename, "w", encoding="utf-8") as f:
                        f.write(f"URL: {url}\n\n{response_text}")
                    
                    print(f"[+] 捕获到非JSON响应: {url}")
                    print(f"    保存到: {filename}")
    
    except Exception as e:
        print(f"[-] 处理响应出错: {e}")

def extract_questions(data, url):
    """尝试从响应数据中提取题目"""
    global captured_questions
    
    # 递归查找可能的题目数据
    if isinstance(data, dict):
        # 检查是否包含题目列表
        if "data" in data:
            extract_questions(data["data"], url)
        elif "list" in data:
            extract_questions(data["list"], url)
        elif "questions" in data:
            extract_questions(data["questions"], url)
        elif "items" in data:
            extract_questions(data["items"], url)
        else:
            # 检查是否是单个题目
            question = extract_single_question(data)
            if question:
                captured_questions.append(question)
    
    elif isinstance(data, list):
        for item in data:
            if isinstance(item, dict):
                question = extract_single_question(item)
                if question:
                    captured_questions.append(question)
                else:
                    extract_questions(item, url)

def extract_single_question(item):
    """尝试从字典中提取单个题目"""
    # 检查是否包含题目内容的关键字段
    question_fields = ["content", "question", "title", "stem", "题干", "题目"]
    option_fields = ["options", "optionList", "choices", "选项"]
    answer_fields = ["answer", "correctAnswer", "正确答案"]
    type_fields = ["type", "questionType", "题型"]
    difficulty_fields = ["difficulty", "level", "难度"]
    
    has_question = any(field in str(item).lower() for field in question_fields)
    
    if has_question:
        return {
            "raw_data": item,
            "extracted_at": datetime.now().isoformat(),
            "source_url": url
        }
    
    return None

def done():
    """脚本结束时保存所有捕获的数据"""
    global captured_questions
    
    if captured_questions:
        output_file = f"{OUTPUT_DIR}/all_captured_questions.json"
        with open(output_file, "w", encoding="utf-8") as f:
            json.dump(captured_questions, f, ensure_ascii=False, indent=2)
        print(f"\n[+] 共捕获 {len(captured_questions)} 个题目")
        print(f"[+] 数据已保存到: {output_file}")
    else:
        print("\n[-] 未捕获到任何题目数据")
        print("[*] 请确认您已在微信中打开小程序并进入题库页面")
