$headers = @{
    "Accept" = "application/json, text/javascript, */*; q=0.01"
    "Accept-Language" = "zh-CN,zh;q=0.9,en;q=0.8"
    "User-Agent" = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
    "Referer" = "https://www.hnncpsfz.com.cn:8011/produceEnterprise.html"
}

$totalPages = 618
$allData = @()

for ($pageNum = 1; $pageNum -le $totalPages; $pageNum++) {
    Write-Host "Fetching page $pageNum/$totalPages..."
    
    try {
        $url = "https://platform.hnncpsfz.com.cn:8011/idinfo-cs/portal/selectEntpByCId?pageNumber=$pageNum&pageSize=50&approvalStatus=2&businessType=1&entpName="
        $response = Invoke-WebRequest -Uri $url -Headers $headers -UseBasicParsing
        $json = $response.Content | ConvertFrom-Json
        
        if ($json.data -and $json.data.list) {
            foreach ($item in $json.data.list) {
                $address = $item.address
                $city = ""
                $district = ""
                $street = ""
                
                if ($address) {
                    if ($address -match '(.+市)') { $city = $matches[1] }
                    elseif ($address -match '(.+州)') { $city = $matches[1] }
                    
                    if ($address -match '.+市(.+区)') { $district = $matches[1] }
                    elseif ($address -match '.+市(.+县)') { $district = $matches[1] }
                    elseif ($address -match '.+州(.+县)') { $district = $matches[1] }
                    elseif ($address -match '(.+县)') { $district = $matches[1] }
                    
                    if ($address -match '.+县(.+镇)') { $street = $matches[1] }
                    elseif ($address -match '.+区(.+街道)') { $street = $matches[1] }
                    elseif ($address -match '.+区(.+镇)') { $street = $matches[1] }
                }
                
                $row = [PSCustomObject]@{
                    City = $city
                    District = $district
                    Street = $street
                    CompanyName = $item.entpName
                    Address = $address
                    ContactPerson = ""
                    ContactPhone = $item.telephone
                    Longitude = ""
                    Latitude = ""
                }
                $allData += $row
            }
        }
    } catch {
        Write-Host "Error fetching page $pageNum : $_"
        break
    }
    
    Start-Sleep -Milliseconds 200
}

Write-Host "Fetched $($allData.Count) records"

$output = New-Object System.Text.StringBuilder
$null = $output.AppendLine("城市名称,区县名称,街道名称,企业名称,地址,联系人,联系电话,经度,纬度")

foreach ($item in $allData) {
    $line = "$($item.City),$($item.District),$($item.Street),$($item.CompanyName),$($item.Address),$($item.ContactPerson),$($item.ContactPhone),$($item.Longitude),$($item.Latitude)"
    $null = $output.AppendLine($line)
}

[System.IO.File]::WriteAllText("agricultural_enterprises.csv", $output.ToString(), [System.Text.Encoding]::UTF8)

Write-Host "CSV file created successfully: agricultural_enterprises.csv"