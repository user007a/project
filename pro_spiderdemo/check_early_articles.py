import requests
import re
import os
from urllib.parse import urljoin
from datetime import datetime
from collections import defaultdict

BASE_URL = "https://news.qq.com/omn/author/8QIf3nxZ7Y0ZsDjY7gc="
AUTHOR_ID = "8QIf3nxZ7Y0ZsDjY7gc="
SAVE_DIR = r"d:\dev\Pro_info\AI可可AI生活_一图总结"
HEADERS = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/142.0.7444.235 Safari/537.36',
    'Referer': BASE_URL,
    'Origin': 'https://news.qq.com'
}

def get_author_articles(offset_info=""):
    api_url = f"https://i.news.qq.com/getSubNewsMixedList?offset_info={offset_info}&guestSuid={AUTHOR_ID}&tabId=om_index&caller=1&from_scene=103"
    try:
        response = requests.get(api_url, headers=HEADERS)
        response.raise_for_status()
        data = response.json()
        return data
    except Exception as e:
        print(f"获取文章列表失败: {e}")
        return None

def get_article_content(article_url):
    if 'view.inews.qq.com/a/' in article_url:
        article_id = article_url.split('/')[-1]
        article_url = f'https://news.qq.com/omn/{article_id}'
    
    try:
        response = requests.get(article_url, headers=HEADERS, timeout=10)
        response.raise_for_status()
        return response.text
    except Exception as e:
        return ""

def extract_images(html_content):
    images = []
    img_pattern = re.compile(r'<img[^>]+src=["\']([^"\']+)["\'][^>]*>', re.IGNORECASE)
    matches = img_pattern.findall(html_content)
    
    for img_url in matches:
        if 'http' not in img_url:
            img_url = urljoin("https://news.qq.com", img_url)
        
        if 'inews.gtimg.com' in img_url and 'news_bt/' in img_url:
            images.append(img_url)
    
    return images

def download_image(img_url, save_path):
    try:
        response = requests.get(img_url, headers=HEADERS, stream=True, timeout=30)
        response.raise_for_status()
        
        with open(save_path, 'wb') as f:
            for chunk in response.iter_content(chunk_size=8192):
                f.write(chunk)
        print(f"  [OK] {save_path}")
        return True
    except Exception as e:
        print(f"  [FAIL] {e}")
        return False

def main():
    print("=" * 60)
    print("检查2026年1-3月文章是否包含信息图")
    print("=" * 60)
    
    offset_info = ""
    page = 1
    target_start = datetime(2026, 1, 1)
    target_end = datetime(2026, 3, 10)
    
    found_articles = []
    
    while True:
        print(f"\n正在获取第 {page} 页...")
        
        data = get_author_articles(offset_info)
        if not data:
            break
        
        articles = data.get('newslist', [])
        if not articles:
            break
        
        for article in articles:
            title = article.get('title', '')
            publish_time = article.get('time', '')
            url = article.get('url', '')
            
            try:
                if isinstance(publish_time, int):
                    dt = datetime.fromtimestamp(publish_time)
                elif isinstance(publish_time, str):
                    dt = datetime.strptime(publish_time, "%Y-%m-%d %H:%M:%S")
                else:
                    continue
                
                if target_start <= dt < target_end:
                    found_articles.append({
                        'title': title,
                        'time': dt,
                        'url': url
                    })
                    print(f"找到: {dt.strftime('%Y-%m-%d')} - {title[:40]}")
            except:
                pass
        
        has_next = data.get('hasNext', 0)
        next_offset = data.get('offsetInfo', '')
        
        if not has_next or not next_offset:
            break
        
        offset_info = next_offset
        page += 1
        
        if page > 100:
            break
        
        if len(found_articles) >= 5:
            break
    
    print(f"\n{'='*60}")
    print(f"找到 {len(found_articles)} 篇2026年1-3月的文章")
    print("=" * 60)
    
    if found_articles:
        print("\n检查这些文章是否包含信息图...")
        
        for i, article in enumerate(found_articles[:3], 1):
            print(f"\n文章 {i}: {article['title'][:40]}")
            print(f"  URL: {article['url']}")
            
            html = get_article_content(article['url'])
            print(f"  HTML长度: {len(html)}")
            
            images = extract_images(html)
            print(f"  信息图数量: {len(images)}")
            
            if images:
                print(f"  示例图片: {images[0]}")

if __name__ == "__main__":
    main()