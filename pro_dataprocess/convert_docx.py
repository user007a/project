﻿import docx
import pandas as pd
import re

def parse_docx(file_path):
    doc = docx.Document(file_path)
    all_lines = []
    for p in doc.paragraphs:
        text = p.text.strip()
        if text:
            lines = text.split('\n')
            for line in lines:
                line = line.strip()
                if line:
                    all_lines.append(line)
    return all_lines

def analyze_questions(lines):
    questions = []
    i = 0
    
    while i < len(lines):
        line = lines[i]
        
        is_question = False
        question_text = line
        
        if line and line[0].isdigit():
            is_question = True
            if '、' in question_text:
                question_text = question_text.split('、', 1)[1]
        else:
            j = i + 1
            has_options = False
            has_answer = False
            temp_j = j
            while temp_j < min(i + 8, len(lines)):
                l = lines[temp_j]
                if l.startswith('A.') or l.startswith('B.') or l.startswith('C.') or l.startswith('D.'):
                    has_options = True
                elif l.startswith('正确答案：') or l.startswith('答案：'):
                    has_answer = True
                    break
                temp_j += 1
            if has_options and has_answer:
                is_question = True
        
        if is_question:
            match = re.search(r'（([A-D])）$', question_text)
            answer_in_question = ''
            if match:
                answer_in_question = match.group(1)
                question_text = question_text[:-3]
            
            options = {'A': '', 'B': '', 'C': '', 'D': '', 'E': '', 'F': '', 'G': '', 'H': ''}
            answer = answer_in_question
            question_type = '单选题'
            j = i + 1
            
            while j < len(lines):
                l = lines[j]
                if l.startswith('A.'):
                    options['A'] = l[2:].strip()
                elif l.startswith('B.'):
                    options['B'] = l[2:].strip()
                elif l.startswith('C.'):
                    options['C'] = l[2:].strip()
                elif l.startswith('D.'):
                    options['D'] = l[2:].strip()
                elif l.startswith('E.'):
                    options['E'] = l[2:].strip()
                elif l.startswith('F.'):
                    options['F'] = l[2:].strip()
                elif l.startswith('G.'):
                    options['G'] = l[2:].strip()
                elif l.startswith('H.'):
                    options['H'] = l[2:].strip()
                elif l.startswith('正确答案：'):
                    answer = l.split('：')[1].strip()
                    break
                elif l.startswith('答案：'):
                    answer = l.split('：')[1].strip()
                    break
                elif l and l[0].isdigit() and '、' in l:
                    break
                j += 1
            
            if answer:
                if answer in ['正确', '对', '是']:
                    question_type = '判断题'
                    answer = '1'
                elif answer in ['错误', '错', '否']:
                    question_type = '判断题'
                    answer = '0'
                else:
                    answer_chars = [c for c in answer if c in 'ABCDEFGH']
                    if len(answer_chars) > 1:
                        question_type = '多选题'
                        num_map = {'A': '1', 'B': '2', 'C': '3', 'D': '4', 'E': '5', 'F': '6', 'G': '7', 'H': '8'}
                        answer_nums = [num_map[c] for c in answer_chars]
                        answer = ','.join(answer_nums)
                
                questions.append({
                    '题目': question_text,
                    '选项A': options['A'],
                    '选项B': options['B'],
                    '选项C': options['C'],
                    '选项D': options['D'],
                    '选项E': options['E'],
                    '选项F': options['F'],
                    '选项G': options['G'],
                    '选项H': options['H'],
                    '答案': answer,
                    '题型': question_type
                })
            
            if not answer:
                i += 1
            else:
                i = j + 1
        else:
            i += 1
    
    return questions

def main():
    lines = parse_docx('老年人能力评估师三级题库.docx')
    print(f'总行数: {len(lines)}')
    
    questions = analyze_questions(lines)
    print(f'解析到题目数量: {len(questions)}')
    
    result = pd.DataFrame(index=range(len(questions)))
    result['试题分类'] = '老年人能力评估师三级'
    result['试题类型'] = [q['题型'] for q in questions]
    result['试题难度'] = '中等'
    result['试题内容'] = [q['题目'] for q in questions]
    result['答案'] = [q['答案'] for q in questions]
    result['分值'] = 5
    result['解析'] = ''
    result['选项1'] = [q['选项A'] for q in questions]
    result['选项2'] = [q['选项B'] for q in questions]
    result['选项3'] = [q['选项C'] for q in questions]
    result['选项4'] = [q['选项D'] for q in questions]
    result['选项5'] = [q['选项E'] for q in questions]
    result['选项6'] = [q['选项F'] for q in questions]
    result['选项7'] = [q['选项G'] for q in questions]
    result['选项8'] = [q['选项H'] for q in questions]
    
    output_file = '老年人能力评估师三级题库-导入.xlsx'
    result.to_excel(output_file, index=False)
    print(f'转换完成！输出文件: {output_file}')
    
    print('题型分布:')
    print(result['试题类型'].value_counts())
    
    judge_df = result[result['试题类型'] == '判断题']
    if len(judge_df) > 0:
        print(f'判断题样例（前3条）:')
        print(judge_df[['试题内容', '答案']].head(3))

if __name__ == '__main__':
    main()
