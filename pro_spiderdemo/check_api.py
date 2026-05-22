import requests

def check_offset_info():
    url = 'https://i.news.qq.com/getSubNewsMixedList?offset_info=&guestSuid=8QIf3nxZ7Y0ZsDjY7gc=&tabId=om_index&caller=1&from_scene=103'
    headers = {'User-Agent': 'Mozilla/5.0'}
    
    response = requests.get(url, headers=headers)
    data = response.json()
    
    print("offsetInfo:", repr(data.get('offsetInfo')))
    print("\nhasNext:", data.get('hasNext'))
    print("\ntotal:", data.get('total'))
    print("\ntotalDesc:", data.get('totalDesc'))
    
    # 尝试使用 offsetInfo 作为下一页参数
    offset_info = data.get('offsetInfo')
    if offset_info:
        print(f"\n尝试使用 offsetInfo '{offset_info}' 获取下一页...")
        next_url = f'https://i.news.qq.com/getSubNewsMixedList?offset_info={offset_info}&guestSuid=8QIf3nxZ7Y0ZsDjY7gc=&tabId=om_index&caller=1&from_scene=103'
        next_response = requests.get(next_url, headers=headers)
        next_data = next_response.json()
        
        print(f"下一页文章数量: {len(next_data.get('newslist', []))}")
        if next_data.get('newslist'):
            print(f"下一页第一篇时间: {next_data['newslist'][0].get('time')}")
            print(f"下一页最后一篇时间: {next_data['newslist'][-1].get('time')}")

if __name__ == "__main__":
    check_offset_info()