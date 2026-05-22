import requests

def compare_articles():
    # 成功下载的文章
    success_url = 'https://view.inews.qq.com/a/20260513A02PRU00'
    # 失败的早期文章
    fail_url = 'https://news.qq.com/omn/20260111A03S0N00'
    
    headers = {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/142.0.7444.235 Safari/537.36'
    }
    
    print("=" * 60)
    print("对比成功与失败的的文章页面结构")
    print("=" * 60)
    
    print(f"\n1. 成功文章（5月13日）:")
    print(f"URL: {success_url}")
    try:
        response = requests.get(success_url, headers=headers, timeout=10)
        print(f"状态码: {response.status_code}")
        print(f"内容长度: {len(response.text)}")
        
        # 检查是否是SPA
        if 'window.__INITIAL_STATE__' in response.text or '__NUXT__' in response.text:
            print("检测到: Vue/Nuxt SSR页面")
        if 'window.__INIT_PROPS__' in response.text or 'window.__PRELOADED_STATE__' in response.text:
            print("检测到: React SSR页面")
        if 'id="app"' in response.text or 'id="root"' in response.text:
            print("检测到: SPA单页应用")
    except Exception as e:
        print(f"错误: {e}")
    
    print(f"\n2. 失败文章（1月11日）:")
    print(f"URL: {fail_url}")
    try:
        response = requests.get(fail_url, headers=headers, timeout=10)
        print(f"状态码: {response.status_code}")
        print(f"内容长度: {len(response.text)}")
        
        # 检查是否是SPA
        if 'window.__INITIAL_STATE__' in response.text or '__NUXT__' in response.text:
            print("检测到: Vue/Nuxt SSR页面")
        if 'window.__INIT_PROPS__' in response.text or 'window.__PRELOADED_STATE__' in response.text:
            print("检测到: React SSR页面")
        if 'id="app"' in response.text or 'id="root"' in response.text:
            print("检测到: SPA单页应用")
    except Exception as e:
        print(f"错误: {e}")
    
    print("\n" + "=" * 60)
    print("结论：早期文章可能是纯文字文章，没有一图总结")
    print("=" * 60)

if __name__ == "__main__":
    compare_articles()