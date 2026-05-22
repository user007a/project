import requests
import re

def test_different_urls():
    # 测试不同格式的URL
    test_urls = [
        'https://view.inews.qq.com/a/20260111A03S0N00',
        'https://news.qq.com/omn/20260111A03S0N00',
        'https://new.qq.com/omn/20260111A03S0N00',
        'https://view.inews.qq.com/a/20260511A03S0N00',
    ]
    
    headers = {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/142.0.7444.235 Safari/537.36'
    }
    
    for url in test_urls:
        try:
            response = requests.get(url, headers=headers, timeout=10)
            print(f"URL: {url}")
            print(f"  状态码: {response.status_code}")
            print(f"  内容长度: {len(response.text)}")
            
            # 检查是否包含图片
            img_pattern = re.compile(r'inews\.gtimg\.com[^\s"\']+news_bt[^\s"\']+', re.I)
            matches = img_pattern.findall(response.text)
            if matches:
                print(f"  找到 {len(matches)} 个图片URL")
                print(f"  示例: {matches[0][:80]}...")
            else:
                print(f"  未找到信息图")
            print()
        except Exception as e:
            print(f"URL: {url}")
            print(f"  错误: {e}\n")

if __name__ == "__main__":
    test_different_urls()