// embed.js - 当页面在 iframe 中嵌入时，自动隐藏侧边栏和顶部导航
(function() {
    'use strict';

    // 检测是否在 iframe 中
    if (window.self === window.top) {
        // 不在 iframe 中，直接退出
        return;
    }

    // 在 iframe 中，执行布局调整
    document.addEventListener('DOMContentLoaded', function() {
        // 隐藏侧边栏
        var aside = document.querySelector('aside');
        if (aside) {
            aside.style.display = 'none';
        }

        // 隐藏顶部导航栏
        var header = document.querySelector('body > div > header');
        if (!header) {
            // 尝试其他选择器
            header = document.querySelector('header');
        }
        if (header) {
            header.style.display = 'none';
        }

        // 调整 body 布局：移除 flex，允许滚动
        var body = document.body;
        body.classList.remove('h-screen', 'flex', 'overflow-hidden');
        body.style.height = 'auto';
        body.style.overflow = 'auto';

        // 调整主内容容器
        var mainWrapper = document.querySelector('body > div.flex-1');
        if (mainWrapper) {
            mainWrapper.style.minHeight = '100vh';
        }

        // 调整 main 区域
        var main = document.querySelector('main');
        if (main) {
            main.classList.remove('overflow-y-auto');
            main.style.overflow = 'visible';
        }

        // 修复返回链接：在 iframe 中点击返回，通知父页面关闭当前 tab
        document.querySelectorAll('a[href]').forEach(function(link) {
            var href = link.getAttribute('href');
            if (!href || href.startsWith('#') || href.startsWith('javascript')) return;

            link.addEventListener('click', function(e) {
                // 如果是返回列表类的链接，通知父页面
                if (href.includes('-list.html') || href === 'dashboard.html') {
                    // 让父页面来处理 tab 切换
                    try {
                        if (window.parent && window.parent !== window) {
                            window.parent.postMessage({
                                type: 'navigate',
                                url: href
                            }, '*');
                        }
                    } catch (err) {}
                }
            });
        });
    });
})();
