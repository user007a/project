import requests
import re

def analyze_images():
    url = 'https://view.inews.qq.com/a/20260513A02PRU00'
    headers = {'User-Agent': 'Mozilla/5.0'}
    
    response = requests.get(url, headers=headers)
    html = response.text
    
    img_pattern = re.compile(r'<img[^>]+src=["\']([^"\']+)["\'][^>]*>', re.IGNORECASE)
    imgs = img_pattern.findall(html)
    
    print("文章中的所有图片URL:")
    for i, img_url in enumerate(imgs):
        if 'http' not in img_url:
            img_url = 'https://news.qq.com' + img_url
        print(f"{i+1}. {img_url}")
        print(f"   文件名: {img_url.split('/')[-1]}")
        print(f"   路径: {img_url.split('/')[-2]}")
        print()

if __name__ == "__main__":
    analyze_images()