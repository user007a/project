import requests
import csv
import time

headers = {
    "Accept": "application/json, text/javascript, */*; q=0.01",
    "Accept-Language": "zh-CN,zh;q=0.9,en;q=0.8",
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
    "Referer": "https://www.hnncpsfz.com.cn:8011/produceEnterprise.html"
}

def fetch_page(page_num, page_size=50):
    url = f"https://platform.hnncpsfz.com.cn:8011/idinfo-cs/portal/selectEntpByCId?pageNumber={page_num}&pageSize={page_size}&approvalStatus=2&businessType=1&entpName="
    try:
        response = requests.get(url, headers=headers, timeout=30)
        response.raise_for_status()
        return response.json()
    except Exception as e:
        print(f"Error fetching page {page_num}: {e}")
        return None

def main():
    all_data = []
    page_num = 1
    page_size = 50
    total_pages = 10
    
    print(f"Testing with {total_pages} pages...")
    
    while page_num <= total_pages:
        print(f"Fetching page {page_num}/{total_pages}...")
        data = fetch_page(page_num, page_size)
        
        if data and "data" in data and "list" in data["data"]:
            items = data["data"]["list"]
            if not items:
                break
                
            for item in items:
                row = {
                    "城市名称": "",
                    "区县名称": "", 
                    "街道名称": "",
                    "企业名称": item.get("entpName", ""),
                    "地址": item.get("address", ""),
                    "联系人": "",
                    "联系电话": item.get("telephone", ""),
                    "经度": "",
                    "纬度": ""
                }
                all_data.append(row)
            
            if len(items) < page_size:
                break
        else:
            print(f"Empty or invalid response for page {page_num}")
            break
            
        page_num += 1
        time.sleep(0.2)
    
    print(f"Fetched {len(all_data)} records")
    
    with open('test_output.csv', 'w', newline='', encoding='utf-8-sig') as f:
        writer = csv.DictWriter(f, fieldnames=["城市名称", "区县名称", "街道名称", "企业名称", "地址", "联系人", "联系电话", "经度", "纬度"])
        writer.writeheader()
        writer.writerows(all_data)
    
    print("CSV file created: test_output.csv")

if __name__ == "__main__":
    main()