import csv

with open('agricultural_enterprises.csv', 'r', encoding='utf-8', errors='ignore') as f:
    lines = f.readlines()

with open('enterprises_final.csv', 'w', newline='', encoding='utf-8-sig') as f:
    writer = csv.writer(f)
    writer.writerow(['城市名称', '区县名称', '街道名称', '企业名称', '地址', '联系人', '联系电话', '经度', '纬度'])
    
    for line in lines[1:]:
        line = line.strip()
        if line:
            parts = line.split(',', 8)
            while len(parts) < 9:
                parts.append('')
            writer.writerow(parts)

print("CSV file created successfully: enterprises_final.csv")