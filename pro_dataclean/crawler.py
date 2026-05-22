import requests
import csv
import time
import re

API_URL = "https://platform.hnncpsfz.com.cn:8011/idinfo-cs/portal/selectEntpByCId"

headers = {
    "Accept": "application/json, text/javascript, */*; q=0.01",
    "Accept-Language": "zh-CN,zh;q=0.9,en;q=0.8",
    "Connection": "keep-alive",
    "Host": "platform.hnncpsfz.com.cn:8011",
    "Referer": "https://www.hnncpsfz.com.cn:8011/produceEnterprise.html",
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
}

def fetch_page(page_num, page_size=50):
    params = {
        "pageNumber": page_num,
        "pageSize": page_size,
        "approvalStatus": 2,
        "businessType": 1,
        "entpName": ""
    }
    try:
        response = requests.get(API_URL, params=params, headers=headers, timeout=30)
        response.raise_for_status()
        return response.json()
    except Exception as e:
        print(f"Error fetching page {page_num}: {e}")
        return None

def parse_address(address):
    if not address:
        return "", "", ""
    
    city_patterns = [
        r'(.+市)',
        r'(.+州)',
        r'(.+地区)'
    ]
    
    district_patterns = [
        r'.+市(.+区)',
        r'.+市(.+县)',
        r'.+州(.+县)',
        r'.+地区(.+县)',
        r'(.+县)'
    ]
    
    street_patterns = [
        r'.+县(.+镇)',
        r'.+区(.+街道)',
        r'.+县(.+乡)',
        r'.+区(.+镇)'
    ]
    
    city = ""
    district = ""
    street = ""
    
    for pattern in city_patterns:
        match = re.search(pattern, address)
        if match:
            city = match.group(1)
            break
    
    for pattern in district_patterns:
        match = re.search(pattern, address)
        if match:
            district = match.group(1)
            break
    
    for pattern in street_patterns:
        match = re.search(pattern, address)
        if match:
            street = match.group(1)
            break
    
    return city, district, street

def main():
    all_data = []
    page_num = 1
    page_size = 50
    total_pages = 124
    
    print(f"Starting to fetch {total_pages} pages...")
    
    while page_num <= total_pages:
        print(f"Fetching page {page_num}/{total_pages}...")
        data = fetch_page(page_num, page_size)
        
        if data and "data" in data and "list" in data["data"]:
            items = data["data"]["list"]
            if not items:
                break
                
            for item in items:
                address = item.get("address", "")
                city, district, street = parse_address(address)
                
                row = {
                    "城市名称": city,
                    "区县名称": district,
                    "街道名称": street,
                    "企业名称": item.get("entpName", ""),
                    "地址": address,
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
    
    with open("agricultural_enterprises.csv", "w", newline="", encoding="utf-8-sig") as f:
        writer = csv.DictWriter(f, fieldnames=["城市名称", "区县名称", "街道名称", "企业名称", "地址", "联系人", "联系电话", "经度", "纬度"])
        writer.writeheader()
        writer.writerows(all_data)
    
    print("CSV file created successfully: agricultural_enterprises.csv")

if __name__ == "__main__":
    main()