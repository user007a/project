#!/usr/bin/env python3
"""
批量为所有管理后台 HTML 页面注入 embed.js
排除 login.html（无侧边栏布局）和 index.html（主框架本身）
"""

import os
import re
import glob

# 项目目录
BASE_DIR = os.path.dirname(os.path.abspath(__file__))

# 需要跳过的文件
SKIP_FILES = {'login.html', 'index.html', '_pagination_helper.js'}

# 要注入的脚本标签
EMBED_SCRIPT = '<script src="embed.js"></script>\n'

def inject_embed(file_path):
    """在 </body> 前注入 embed.js"""
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()

    # 已注入则跳过
    if 'embed.js' in content:
        print(f'  [SKIP] 已注入: {os.path.basename(file_path)}')
        return False

    # 查找 </body> 标签（支持前导空格）
    # 尝试多种可能的 body 闭合标签格式
    patterns = [
        r'(</body>)',
        r'(</body\s*>)',
    ]

    injected = False
    for pattern in patterns:
        match = re.search(pattern, content, re.IGNORECASE)
        if match:
            insert_pos = match.start()
            new_content = content[:insert_pos] + EMBED_SCRIPT + content[insert_pos:]
            with open(file_path, 'w', encoding='utf-8') as f:
                f.write(new_content)
            print(f'  [OK] 已注入: {os.path.basename(file_path)}')
            injected = True
            break

    if not injected:
        # 如果找不到 </body>，尝试在文件末尾追加
        if '<body' in content.lower():
            new_content = content.rstrip() + '\n' + EMBED_SCRIPT
            with open(file_path, 'w', encoding='utf-8') as f:
                f.write(new_content)
            print(f'  [OK] 已追加到末尾: {os.path.basename(file_path)}')
            injected = True
        else:
            print(f'  [ERR] 未找到 body 标签: {os.path.basename(file_path)}')

    return injected

def main():
    html_files = glob.glob(os.path.join(BASE_DIR, '*.html'))
    processed = 0
    skipped = 0

    print(f'扫描到 {len(html_files)} 个 HTML 文件\n')

    for file_path in sorted(html_files):
        filename = os.path.basename(file_path)
        if filename in SKIP_FILES:
            print(f'  [SKIP] 跳过: {filename}')
            skipped += 1
            continue

        if inject_embed(file_path):
            processed += 1

    print(f'\n完成: 处理 {processed} 个文件, 跳过 {skipped} 个文件')

if __name__ == '__main__':
    main()
