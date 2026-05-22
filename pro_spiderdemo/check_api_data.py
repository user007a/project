import requests
import json

def check_article_data():
    url = 'https://i.news.qq.com/getSubNewsMixedList?offset_info=&guestSuid=8QIf3nxZ7Y0ZsDjY7gc=&tabId=om_index&caller=1&from_scene=103'
    headers = {'User-Agent': 'Mozilla/5.0'}
    
    response = requests.get(url, headers=headers)
    data = response.json()
    
    articles = data.get('newslist', [])
    
    print("文章数据结构：")
    print("=" * 60)
    
    # 查看第一篇文章的所有字段
    if articles:
        article = articles[0]
        print("\n文章的所有字段:")
        for key, value in article.items():
            if isinstance(value, str) and len(value) > 100:
                print(f"{key}: {value[:100]}...")
            else:
                print(f"{key}: {value}")
    
    print("\n" + "=" * 60)
    
    # 对比有图片和无图片的文章
    success_article = None
    fail_article = None
    
    for article in articles:
        if '2026-05' in str(article.get('time', '')):
            success_article = article
        if '2026-01' in str(article.get('time', '')):
            fail_article = article
    
    if success_article:
        print(f"\n成功下载的文章（5月）:")
        print(f"标题: {success_article.get('title')}")
        print(f"URL: {success_article.get('url')}")
        print(f"图片URL字段: {success_article.get('img')}")
        print(f"缩略图: {success_article.get('thumb')}")
        
    if fail_article:
        print(f"\n未找到图片的文章（1月）:")
        print(f"标题: {fail_article.get('title')}")
        print(f"URL: {fail_article.get('url')}")
        print(f"图片URL字段: {fail_article.get('img')}")
        print(f"缩略图: {fail_article.get('thumb')}")

if __name__ == "__main__":
    check_article_data()