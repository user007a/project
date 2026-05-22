import requests
import re

def try_different_apis():
    article_id = '20260309A076DE00'
    
    apis = [
        f'https://article.inews.qq.com/article?articleId={article_id}',
        f'https://new.qq.com/omn/{article_id}',
        f'https://view.inews.qq.com/a/{article_id}',
    ]
    
    headers = {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/142.0.7444.235 Safari/537.36'
    }
    
    for url in apis:
        print(f"\n尝试: {url}")
        print("-" * 60)
        try:
            response = requests.get(url, headers=headers, timeout=10)
            print(f"状态码: {response.status_code}")
            print(f"内容长度: {len(response.text)}")
            
            # 检查是否有文章内容
            if 'article' in response.text.lower() or 'content' in response.text.lower():
                print("找到文章内容相关字段")
                
                # 查找图片
                img_pattern = re.compile(r'inews\.gtimg\.com[^\s"\'<>]+', re.I)
                images = img_pattern.findall(response.text)
                if images:
                    print(f"找到 {len(images)} 个图片")
                    for img in images[:3]:
                        print(f"  {img}")
            
        except Exception as e:
            print(f"错误: {e}")

if __name__ == "__main__":
    try_different_apis()