import requests
import re

def check_article_images():
    url = 'https://news.qq.com/omn/20260111A03S0N00'
    headers = {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/142.0.7444.235 Safari/537.36'
    }
    
    response = requests.get(url, headers=headers)
    print(f"状态码: {response.status_code}")
    print(f"内容长度: {len(response.text)}")
    
    # 查找所有图片URL
    img_pattern = re.compile(r'https?://[^\s"\'<>]+\.(jpg|jpeg|png|gif|webp)', re.I)
    all_images = img_pattern.findall(response.text)
    print(f"\n所有图片类型: {set(all_images)}")
    
    # 查找inews.gtimg.com的图片
    inews_pattern = re.compile(r'inews\.gtimg\.com[^\s"\'<>]+', re.I)
    inews_images = inews_pattern.findall(response.text)
    print(f"\ninews.gtimg.com 图片数量: {len(inews_images)}")
    
    if inews_images:
        print("\n示例图片URL:")
        for img in inews_images[:10]:
            print(f"  {img}")
    
    # 查找所有img标签
    img_tag_pattern = re.compile(r'<img[^>]+>', re.I)
    img_tags = img_tag_pattern.findall(response.text)
    print(f"\n<img>标签数量: {len(img_tags)}")
    
    if img_tags:
        print("\n前5个img标签:")
        for i, tag in enumerate(img_tags[:5]):
            print(f"{i+1}. {tag[:200]}")

if __name__ == "__main__":
    check_article_images()