import json
import csv

def json_to_csv(json_file, csv_file):
    with open(json_file, 'r', encoding='utf-8') as f:
        data = json.load(f)
    
    if not data:
        print("JSON文件为空")
        return
    
    headers = data[0].keys()
    
    with open(csv_file, 'w', encoding='utf-8-sig', newline='') as f:
        writer = csv.DictWriter(f, fieldnames=headers)
        writer.writeheader()
        writer.writerows(data)
    
    print(f"成功将 {len(data)} 条记录转换为CSV格式")

if __name__ == "__main__":
    json_to_csv('enterprises.json', 'enterprises.csv')