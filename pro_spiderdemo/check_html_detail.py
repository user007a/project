import requests
import re

def check_early_html():
    url = 'https://news.qq.com/omn/20260309A076DE00'
    headers = {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/142.0.7444.235 Safari/537.36'
    }
    
    response = requests.get(url, headers=headers)
    html = response.text
    
    print("HTML内容预览（最后2000字符）:")
    print("=" * 60)
    print(html[-2000:])
    print("=" * 60)
    
    # 查找所有可能的图片URL
    print("\n所有图片URL模式:")
    patterns = [
        (r'https?://[^\s"\'<>]*\.jpg', 'JPG图片'),
        (r'https?://[^\s"\'<>]*\.png', 'PNG图片'),
        (r'https?://inews[^\s"\'<>]+', 'inews域名'),
        (r'data-src=["\']([^"\']+)["\']', '延迟加载图片'),
    ]
    
    for pattern, desc in patterns:
        matches = re.findall(pattern, html, re.I)
        if matches:
            print(f"\n{desc} ({len(matches)}个):")
            for m in matches[:5]:
                print(f"  {m[:100]}")

if __name__ == "__main__":
    check_early_html()