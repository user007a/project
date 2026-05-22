import json
import csv
import re

def parse_address(address):
    if not address:
        return "", "", ""
    
    city_patterns = [r'(.+市)', r'(.+州)', r'(.+地区)']
    district_patterns = [r'.+市(.+区)', r'.+市(.+县)', r'.+州(.+县)', r'.+地区(.+县)', r'(.+县)']
    street_patterns = [r'.+县(.+镇)', r'.+区(.+街道)', r'.+县(.+乡)', r'.+区(.+镇)']
    
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

with open('enterprises.json', 'r', encoding='utf-8') as f:
    data = json.load(f)

with open('agricultural_enterprises.csv', 'w', newline='', encoding='utf-8-sig') as f:
    writer = csv.writer(f)
    writer.writerow(['城市名称', '区县名称', '街道名称', '企业名称', '地址', '联系人', '联系电话', '经度', '纬度'])
    
    for item in data:
        address = item.get('address', '')
        city, district, street = parse_address(address)
        
        writer.writerow([
            city,
            district,
            street,
            item.get('name', ''),
            address,
            item.get('contract', ''),
            item.get('contractPhone', ''),
            item.get('lng', ''),
            item.get('lat', '')
        ])

print(f"CSV file created successfully with {len(data)} records: agricultural_enterprises.csv")