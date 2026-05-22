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
    # 转换URL格式：view.inews.qq.com/a/ -> news.qq.com/omn/
    if 'view.inews.qq.com/a/' in article_url:
        article_id = article_url.split('/')[-1]
        article_url = f'https://news.qq.com/omn/{article_id}'
    
    try:
        response = requests.get(article_url, headers=HEADERS, timeout=10)
        response.raise_for_status()
        return response.text
    except Exception as e:
        print(f"获取文章内容失败 {article_url}: {e}")
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
    print("开始抓取博主'AI可可AI生活'的文章（2026年1月1日-3月9日）...")
    print("=" * 60)
    print("注意：只下载信息图（过滤徽章/图标）")
    print("=" * 60)
    
    os.makedirs(SAVE_DIR, exist_ok=True)
    
    print(f"\n图片将保存到: {SAVE_DIR}\n")
    
    # 获取已存在的文件列表（避免重复下载）
    existing_files = set()
    for f in os.listdir(SAVE_DIR):
        if f.endswith('.jpg'):
            existing_files.add(f)
    
    print(f"已有图片数量: {len(existing_files)}\n")
    
    offset_info = ""
    total_downloaded = 0
    total_articles = 0
    skipped_articles = 0
    page = 1
    
    start_date = datetime(2026, 1, 1)
    end_date = datetime(2026, 3, 10)  # 2026年1月1日到3月9日
    
    daily_count = defaultdict(int)
    
    while True:
        print(f"\n{'='*60}")
        print(f"正在获取第 {page} 页文章...")
        print(f"{'='*60}")
        
        data = get_author_articles(offset_info)
        
        if not data:
            print("获取数据失败，退出")
            break
        
        articles = data.get('newslist', [])
        
        if not articles:
            print("没有更多文章了")
            break
        
        has_next = data.get('hasNext', 0)
        next_offset = data.get('offsetInfo', '')
        
        reached_end = False
        
        for article in articles:
            total_articles += 1
            title = article.get('title', '')
            publish_time = article.get('time', '') or article.get('timestamp', '')
            url = article.get('url', '')
            
            try:
                if isinstance(publish_time, int):
                    dt = datetime.fromtimestamp(publish_time)
                elif isinstance(publish_time, str):
                    date_patterns = ["%Y-%m-%d %H:%M:%S", "%Y/%m/%d %H:%M", "%Y年%m月%d日 %H:%M", "%Y-%m-%d"]
                    dt = None
                    for pattern in date_patterns:
                        try:
                            dt = datetime.strptime(publish_time, pattern)
                            break
                        except:
                            continue
                    if dt is None:
                        dt = datetime.now()
                else:
                    dt = datetime.now()
                
                publish_date_str = dt.strftime("%Y%m%d")
                
                # 只处理2026年1月1日到3月9日的文章
                if dt < start_date:
                    reached_end = True
                    print(f"[跳过] {title[:40]}... (发布日期: {dt.strftime('%Y-%m-%d')} - 早于2026年)")
                    continue
                    
                if dt >= end_date:
                    skipped_articles += 1
                    print(f"[跳过] {title[:40]}... (发布日期: {dt.strftime('%Y-%m-%d')} - 3月10日后)")
                    continue
                    
            except Exception as e:
                print(f"日期解析错误: {e}")
                continue
            
            daily_count[publish_date_str] += 1
            article_num = daily_count[publish_date_str]
            
            print(f"\n文章: {title[:50]}")
            print(f"  日期: {dt.strftime('%Y-%m-%d %H:%M')}")
            print(f"  当日第 {article_num:02d} 篇")
            
            article_html = get_article_content(url)
            
            if not article_html:
                print("  [WARN] 无法获取文章内容")
                daily_count[publish_date_str] -= 1
                continue
            
            images = extract_images(article_html)
            
            if not images:
                print("  [WARN] 未找到信息图")
                daily_count[publish_date_str] -= 1
                continue
            
            print(f"  找到 {len(images)} 张信息图")
            
            for idx, img_url in enumerate(images, 1):
                clean_title = re.sub(r'[\\/*?:"<>|]', '', title[:30])
                filename = f"{publish_date_str}第{article_num:02d}篇{clean_title}_{idx}.jpg"
                save_path = os.path.join(SAVE_DIR, filename)
                
                if filename in existing_files:
                    print(f"  [跳过] {filename} (已存在)")
                    continue
                
                if download_image(img_url, save_path):
                    total_downloaded += 1
                    existing_files.add(filename)
        
        if reached_end:
            print("\n已到达2026年之前的文章，结束抓取")
            break
        
        if not has_next or not next_offset:
            print("\n没有更多文章了")
            break
        
        offset_info = next_offset
        page += 1
        
        if page > 100:
            print("\n已达到最大页数限制(100页)")
            break
    
    print(f"\n{'='*60}")
    print(f"抓取完成！")
    print(f"{'='*60}")
    print(f"处理文章数: {total_articles}")
    print(f"跳过文章数: {skipped_articles}")
    print(f"新增下载图片数: {total_downloaded}")
    print(f"保存目录: {SAVE_DIR}")
    print(f"日期范围: 2026-01-01 至 2026-03-09")
    print(f"{'='*60}")

if __name__ == "__main__":
    main()