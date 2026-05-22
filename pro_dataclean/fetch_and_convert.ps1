$headers = @{
    "Accept" = "application/json, text/javascript, */*; q=0.01"
    "Accept-Language" = "zh-CN,zh;q=0.9,en;q=0.8"
    "User-Agent" = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
    "Referer" = "https://www.hnncpsfz.com.cn:8011/produceEnterprise.html"
}

$totalPages = 618
$allItems = @()

for ($pageNum = 1; $pageNum -le $totalPages; $pageNum++) {
    Write-Host "Fetching page $pageNum/$totalPages..."
    
    try {
        $url = "https://platform.hnncpsfz.com.cn:8011/idinfo-cs/portal/selectEntpByCId?pageNumber=$pageNum&pageSize=50&approvalStatus=2&businessType=1&entpName="
        $response = Invoke-WebRequest -Uri $url -Headers $headers -UseBasicParsing
        $json = $response.Content | ConvertFrom-Json
        
        if ($json.data -and $json.data.list) {
            $allItems += $json.data.list
        }
    } catch {
        Write-Host "Error fetching page $pageNum : $_"
        break
    }
    
    Start-Sleep -Milliseconds 200
}

$allItems | ConvertTo-Json -Depth 10 | Out-File -FilePath "enterprises_raw.json" -Encoding UTF8
Write-Host "Raw data saved to enterprises_raw.json"
Write-Host "Total records: $($allItems.Count)"

python convert_to_csv.py