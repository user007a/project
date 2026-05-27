/**
 * 图片懒加载优化脚本
 * 使用 Intersection Observer API 实现高性能的图片懒加载
 */

(function(window, document) {
  'use strict';

  // 默认配置
  const defaults = {
    rootMargin: '50px 0px',
    threshold: 0.01,
    placeholder: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300"%3E%3Crect fill="%23f3f4f6" width="400" height="300"/%3E%3Ctext fill="%239ca3af" font-family="sans-serif" font-size="14" x="50%25" y="50%25" text-anchor="middle" dy=".3em"%3E加载中...%3C/text%3E%3C/svg%3E',
    errorPlaceholder: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300"%3E%3Crect fill="%23fee2e2" width="400" height="300"/%3E%3Ctext fill="%23dc2626" font-family="sans-serif" font-size="14" x="50%25" y="50%25" text-anchor="middle" dy=".3em"%3E图片加载失败%3C/text%3E%3C/svg%3E',
    loadingClass: 'lazy-loading',
    loadedClass: 'lazy-loaded',
    errorClass: 'lazy-error'
  };

  // 图片加载状态缓存
  const loadedImages = new Set();

  // Intersection Observer 实例
  let observer = null;

  /**
   * 初始化懒加载
   * @param {Object} options 自定义配置
   */
  function initLazyLoad(options = {}) {
    const config = Object.assign({}, defaults, options);

    // 创建 Intersection Observer
    observer = new IntersectionObserver(function(entries) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting && !loadedImages.has(entry.target.src)) {
          loadImage(entry.target, config);
        }
      });
    }, {
      root: null,
      rootMargin: config.rootMargin,
      threshold: config.threshold
    });

    // 观察所有带有 data-src 属性的图片
    document.querySelectorAll('img[data-src]').forEach(function(img) {
      setupPlaceholder(img, config);
      observer.observe(img);
    });

    // 监听 DOM 变化，动态添加新图片
    observeDOMChanges(config);

    // 页面加载完成后检查一次
    setTimeout(function() {
      checkVisibleImages(config);
    }, 100);
  }

  /**
   * 设置占位符
   */
  function setupPlaceholder(img, config) {
    if (!img.src || img.src === config.placeholder) {
      img.src = config.placeholder;
    }
    img.classList.add(config.loadingClass);
  }

  /**
   * 加载图片
   */
  function loadImage(img, config) {
    const src = img.getAttribute('data-src');
    const srcset = img.getAttribute('data-srcset');

    if (!src || loadedImages.has(src)) return;

    const imgLoad = new Image();
    
    imgLoad.onload = function() {
      img.src = src;
      if (srcset) {
        img.srcset = srcset;
      }
      img.classList.remove(config.loadingClass);
      img.classList.add(config.loadedClass);
      loadedImages.add(src);
      
      // 如果是背景图模式
      if (img.hasAttribute('data-background')) {
        const parent = img.parentNode;
        if (parent) {
          parent.style.backgroundImage = `url(${src})`;
          img.style.display = 'none';
        }
      }
    };

    imgLoad.onerror = function() {
      img.src = config.errorPlaceholder;
      img.classList.remove(config.loadingClass);
      img.classList.add(config.errorClass);
    };

    // 开始加载
    imgLoad.src = src;
    if (srcset) {
      imgLoad.srcset = srcset;
    }
  }

  /**
   * 检查可见图片
   */
  function checkVisibleImages(config) {
    document.querySelectorAll('img[data-src]').forEach(function(img) {
      const rect = img.getBoundingClientRect();
      const isVisible = (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) + 100 &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth) + 100
      );

      if (isVisible && !loadedImages.has(img.getAttribute('data-src'))) {
        loadImage(img, config);
      }
    });
  }

  /**
   * 监听 DOM 变化
   */
  function observeDOMChanges(config) {
    const observer = new MutationObserver(function(mutations) {
      mutations.forEach(function(mutation) {
        mutation.addedNodes.forEach(function(node) {
          if (node.nodeType === Node.ELEMENT_NODE) {
            const imgs = node.querySelectorAll ? node.querySelectorAll('img[data-src]') : [];
            imgs.forEach(function(img) {
              if (!loadedImages.has(img.getAttribute('data-src'))) {
                setupPlaceholder(img, config);
                observer.observe(img);
              }
            });
          }
        });
      });
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true
    });
  }

  /**
   * 手动触发加载指定图片
   */
  function loadImageManually(selector) {
    const imgs = document.querySelectorAll(selector);
    imgs.forEach(function(img) {
      if (img.hasAttribute('data-src')) {
        const src = img.getAttribute('data-src');
        if (!loadedImages.has(src)) {
          img.src = src;
          loadedImages.add(src);
        }
      }
    });
  }

  /**
   * 销毁懒加载
   */
  function destroyLazyLoad() {
    if (observer) {
      observer.disconnect();
      observer = null;
    }
    loadedImages.clear();
  }

  // 暴露全局方法
  window.LazyLoad = {
    init: initLazyLoad,
    load: loadImageManually,
    destroy: destroyLazyLoad
  };

  // 页面DOM加载完成后自动初始化
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function() {
      initLazyLoad();
    });
  } else {
    initLazyLoad();
  }

})(window, document);
