import requests
import json

def check_early_articles():
    url = 'https://i.news.qq.com/getSubNewsMixedList?offset_info=&guestSuid=8QIf3nxZ7Y0ZsDjY7gc=&tabId=om_index&caller=1&from_scene=103'
    headers = {'User-Agent': 'Mozilla/5.0'}
    
    response = requests.get(url, headers=headers)
    data = response.json()
    
    articles = data.get('newslist', [])
    
    print("对比有图片和无图片的文章:")
    print("=" * 60)
    
    # 收集所有2026年1-3月的文章
    early_articles = []
    may_articles = []
    
    for article in articles:
        time_str = str(article.get('time', ''))
        if '2026-01' in time_str or '2026-02' in time_str or '2026-03' in time_str:
            early_articles.append(article)
        if '2026-05' in time_str:
            may_articles.append(article)
    
    print(f"\n2026年1-3月文章数量: {len(early_articles)}")
    print(f"2026年5月文章数量: {len(may_articles)}")
    
    # 检查1-3月文章是否有图片字段
    print("\n" + "=" * 60)
    print("2026年1-3月文章的图片字段:")
    print("=" * 60)
    
    for i, article in enumerate(early_articles[:5]):
        print(f"\n文章 {i+1}:")
        print(f"  标题: {article.get('title', '')[:40]}")
        print(f"  日期: {article.get('time')}")
        print(f"  thumbnails: {article.get('thumbnails')}")
        print(f"  bigImage: {article.get('bigImage')}")
        print(f"  tmp3pic: {article.get('tmp3pic')}")
        print(f"  imagecount: {article.get('imagecount')}")
    
    print("\n" + "=" * 60)
    print("2026年5月文章的图片字段:")
    print("=" * 60)
    
    for i, article in enumerate(may_articles[:3]):
        print(f"\n文章 {i+1}:")
        print(f"  标题: {article.get('title', '')[:40]}")
        print(f"  日期: {article.get('time')}")
        print(f"  thumbnails: {article.get('thumbnails')}")
        print(f"  bigImage: {article.get('bigImage')}")
        print(f"  tmp3pic: {article.get('tmp3pic')}")
        print(f"  imagecount: {article.get('imagecount')}")

if __name__ == "__main__":
    check_early_articles()