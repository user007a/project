$sidebarCode = @'
    <aside class="w-64 bg-[#001529] flex flex-col flex-shrink-0 h-screen">
        <div class="h-16 flex items-center px-6 gap-3 border-b border-white/10">
            <div class="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center"><span class="iconify text-white text-lg" data-icon="ri:plant-line"></span></div>
            <span class="text-white font-bold text-base">叁竹培训系统</span>
        </div>
        <nav class="flex-1 overflow-y-auto py-4 px-3 space-y-1">
            <a href="dashboard.html" class="flex items-center px-4 py-3 bg-[#1890FF] text-white rounded-md"><span class="iconify mr-3 text-lg" data-icon="ri:home-4-line"></span><span class="text-sm">工作台</span></a>
            
            <div class="menu-group">
                <button class="menu-toggle w-full flex items-center justify-between px-4 py-3 text-gray-300 hover:bg-white/10 rounded-md transition-all">
                    <div class="flex items-center">
                        <span class="iconify mr-3 text-lg text-gray-300" data-icon="ri:team-line"></span>
                        <span class="text-sm">学员管理</span>
                    </div>
                    <span class="menu-arrow text-gray-400 text-xs transition-transform duration-300">›</span>
                </button>
                <div class="menu-items pl-6">
                    <a href="student-list.html" class="flex items-center px-4 py-3 text-gray-300 hover:bg-white/10 rounded-md transition-all"><span class="iconify mr-3 text-lg" data-icon="ri:team-line"></span><span class="text-sm">学员列表</span></a>
                    <a href="certificate-list.html" class="flex items-center px-4 py-3 text-gray-300 hover:bg-white/10 rounded-md transition-all"><span class="iconify mr-3 text-lg" data-icon="ri:award-line"></span><span class="text-sm">证书管理</span></a>
                    <a href="study-record.html" class="flex items-center px-4 py-3 text-gray-300 hover:bg-white/10 rounded-md transition-all"><span class="iconify mr-3 text-lg" data-icon="ri:time-line"></span><span class="text-sm">学习记录</span></a>
                </div>
            </div>
            
            <div class="menu-group">
                <button class="menu-toggle w-full flex items-center justify-between px-4 py-3 text-gray-300 hover:bg-white/10 rounded-md transition-all">
                    <div class="flex items-center">
                        <span class="iconify mr-3 text-lg text-gray-300" data-icon="ri:book-open-line"></span>
                        <span class="text-sm">课程中心</span>
                    </div>
                    <span class="menu-arrow text-gray-400 text-xs transition-transform duration-300">›</span>
                </button>
                <div class="menu-items pl-6">
                    <a href="course-list.html" class="flex items-center px-4 py-3 text-gray-300 hover:bg-white/10 rounded-md transition-all"><span class="iconify mr-3 text-lg" data-icon="ri:book-open-line"></span><span class="text-sm">课程管理</span></a>
                    <a href="category-list.html" class="flex items-center px-4 py-3 text-gray-300 hover:bg-white/10 rounded-md transition-all"><span class="iconify mr-3 text-lg" data-icon="ri:folder-line"></span><span class="text-sm">分类管理</span></a>
                    <a href="teacher-list.html" class="flex items-center px-4 py-3 text-gray-300 hover:bg-white/10 rounded-md transition-all"><span class="iconify mr-3 text-lg" data-icon="ri:user-star-line"></span><span class="text-sm">讲师管理</span></a>
                    <a href="share-list.html" class="flex items-center px-4 py-3 text-gray-300 hover:bg-white/10 rounded-md transition-all"><span class="iconify mr-3 text-lg" data-icon="ri:share-line"></span><span class="text-sm">课程分享</span></a>
                </div>
            </div>
            
            <div class="menu-group">
                <button class="menu-toggle w-full flex items-center justify-between px-4 py-3 text-gray-300 hover:bg-white/10 rounded-md transition-all">
                    <div class="flex items-center">
                        <span class="iconify mr-3 text-lg text-gray-300" data-icon="ri:shopping-cart-line"></span>
                        <span class="text-sm">订单中心</span>
                    </div>
                    <span class="menu-arrow text-gray-400 text-xs transition-transform duration-300">›</span>
                </button>
                <div class="menu-items pl-6">
                    <a href="order-list.html" class="flex items-center px-4 py-3 text-gray-300 hover:bg-white/10 rounded-md transition-all"><span class="iconify mr-3 text-lg" data-icon="ri:shopping-cart-line"></span><span class="text-sm">订单管理</span></a>
                    <a href="refund-list.html" class="flex items-center px-4 py-3 text-gray-300 hover:bg-white/10 rounded-md transition-all"><span class="iconify mr-3 text-lg" data-icon="ri:refund-line"></span><span class="text-sm">退款管理</span></a>
                    <a href="invoice-list.html" class="flex items-center px-4 py-3 text-gray-300 hover:bg-white/10 rounded-md transition-all"><span class="iconify mr-3 text-lg" data-icon="ri:receipt-line"></span><span class="text-sm">发票管理</span></a>
                </div>
            </div>
            
            <div class="menu-group">
                <button class="menu-toggle w-full flex items-center justify-between px-4 py-3 text-gray-300 hover:bg-white/10 rounded-md transition-all">
                    <div class="flex items-center">
                        <span class="iconify mr-3 text-lg text-gray-300" data-icon="ri:questionnaire-line"></span>
                        <span class="text-sm">题库中心</span>
                    </div>
                    <span class="menu-arrow text-gray-400 text-xs transition-transform duration-300">›</span>
                </button>
                <div class="menu-items pl-6">
                    <a href="question-bank.html" class="flex items-center px-4 py-3 text-gray-300 hover:bg-white/10 rounded-md transition-all"><span class="iconify mr-3 text-lg" data-icon="ri:questionnaire-line"></span><span class="text-sm">题库管理</span></a>
                </div>
            </div>
            
            <div class="menu-group">
                <button class="menu-toggle w-full flex items-center justify-between px-4 py-3 text-gray-300 hover:bg-white/10 rounded-md transition-all">
                    <div class="flex items-center">
                        <span class="iconify mr-3 text-lg text-gray-300" data-icon="ri:article-line"></span>
                        <span class="text-sm">内容管理</span>
                    </div>
                    <span class="menu-arrow text-gray-400 text-xs transition-transform duration-300">›</span>
                </button>
                <div class="menu-items pl-6">
                    <a href="article-list.html" class="flex items-center px-4 py-3 text-gray-300 hover:bg-white/10 rounded-md transition-all"><span class="iconify mr-3 text-lg" data-icon="ri:article-line"></span><span class="text-sm">资讯管理</span></a>
                    <a href="article-category.html" class="flex items-center px-4 py-3 text-gray-300 hover:bg-white/10 rounded-md transition-all"><span class="iconify mr-3 text-lg" data-icon="ri:folder-line"></span><span class="text-sm">资讯分类</span></a>
                </div>
            </div>
            
            <div class="menu-group">
                <button class="menu-toggle w-full flex items-center justify-between px-4 py-3 text-gray-300 hover:bg-white/10 rounded-md transition-all">
                    <div class="flex items-center">
                        <span class="iconify mr-3 text-lg text-gray-300" data-icon="ri:settings-3-line"></span>
                        <span class="text-sm">系统设置</span>
                    </div>
                    <span class="menu-arrow text-gray-400 text-xs transition-transform duration-300">›</span>
                </button>
                <div class="menu-items pl-6">
                    <a href="user-management.html" class="flex items-center px-4 py-3 text-gray-300 hover:bg-white/10 rounded-md transition-all"><span class="iconify mr-3 text-lg" data-icon="ri:user-settings-line"></span><span class="text-sm">用户管理</span></a>
                    <a href="message-center.html" class="flex items-center px-4 py-3 text-gray-300 hover:bg-white/10 rounded-md transition-all"><span class="iconify mr-3 text-lg" data-icon="ri:notification-3-line"></span><span class="text-sm">消息中心</span></a>
                    <a href="system-settings.html" class="flex items-center px-4 py-3 text-gray-300 hover:bg-white/10 rounded-md transition-all"><span class="iconify mr-3 text-lg" data-icon="ri:settings-3-line"></span><span class="text-sm">基础设置</span></a>
                    <a href="payment-settings.html" class="flex items-center px-4 py-3 text-gray-300 hover:bg-white/10 rounded-md transition-all"><span class="iconify mr-3 text-lg" data-icon="ri:bank-card-line"></span><span class="text-sm">支付配置</span></a>
                    <a href="sms-settings.html" class="flex items-center px-4 py-3 text-gray-300 hover:bg-white/10 rounded-md transition-all"><span class="iconify mr-3 text-lg" data-icon="ri:message-3-line"></span><span class="text-sm">短信配置</span></a>
                    <a href="role-permission.html" class="flex items-center px-4 py-3 text-gray-300 hover:bg-white/10 rounded-md transition-all"><span class="iconify mr-3 text-lg" data-icon="ri:shield-keyhole-line"></span><span class="text-sm">角色权限</span></a>
                </div>
            </div>
        </nav>
    </aside>
'@

$scriptCode = @'

    <script>
        document.querySelectorAll('.menu-toggle').forEach(toggle => {
            toggle.addEventListener('click', function() {
                const menuGroup = this.closest('.menu-group');
                const menuItems = menuGroup.querySelector('.menu-items');
                const arrow = this.querySelector('.menu-arrow');
                
                const isExpanded = menuItems.style.display !== 'none';
                
                if (isExpanded) {
                    menuItems.style.display = 'none';
                    arrow.textContent = '›';
                } else {
                    menuItems.style.display = 'block';
                    arrow.textContent = '‹';
                }
            });
        });
    </script>
</body>
</html>
'@

$files = Get-ChildItem -Path "d:\dev\GitHub\project\pro_sanzhutraining\html\backhand\eldercare" -Filter "*.html" | Where-Object { $_.Name -notin @('login.html') }

foreach ($file in $files) {
    $content = Get-Content $file.FullName -Raw
    
    $content = $content -replace '<aside[^>]*>[\s\S]*?</aside>', $sidebarCode
    
    $content = $content -replace '</body>\s*</html>\s*$', $scriptCode
    
    Set-Content -Path $file.FullName -Value $content -NoNewline
    Write-Host "Updated: $($file.Name)"
}

Write-Host "`nAll files updated successfully!"
