/* ============================================
   数字乡村管理系统 - 后台交互逻辑
   ============================================ */

(function () {
  'use strict';

  /* ---- 侧边栏折叠/展开 ---- */
  function initSidebar() {
    var sidebar = document.querySelector('.sidebar');
    var contentArea = document.querySelector('.content-area');
    var collapseBtn = document.querySelector('.collapse-btn');
    if (!sidebar || !collapseBtn) return;

    collapseBtn.addEventListener('click', function () {
      sidebar.classList.toggle('collapsed');
      if (contentArea) {
        contentArea.classList.toggle('expanded', sidebar.classList.contains('collapsed'));
      }
    });
  }

  /* ---- 一级菜单展开/折叠 ---- */
  function initNavMenu() {
    var navItems = document.querySelectorAll('.sidebar .nav-item');
    navItems.forEach(function (item) {
      var title = item.querySelector('.nav-title');
      if (!title) return;

      title.addEventListener('click', function () {
        var subMenu = item.querySelector('.sub-menu');
        if (!subMenu) return;

        // 关闭其他已展开的菜单
        var siblings = item.parentElement.querySelectorAll('.nav-item.open');
        siblings.forEach(function (sibling) {
          if (sibling !== item) sibling.classList.remove('open');
        });

        item.classList.toggle('open');
      });
    });
  }

  /* ---- 当前菜单项高亮 ---- */
  function highlightMenuItem() {
    var currentUrl = window.location.href;
    var subItems = document.querySelectorAll('.sidebar .sub-item');
    subItems.forEach(function (item) {
      var link = item.querySelector('a');
      if (link && currentUrl.indexOf(link.getAttribute('href')) !== -1) {
        item.classList.add('active');
        // 展开父级菜单
        var parentNav = item.closest('.nav-item');
        if (parentNav) parentNav.classList.add('open');
      }
    });

    // 如果没有匹配的子菜单，检查一级菜单（如首页）
    var navItems = document.querySelectorAll('.sidebar .nav-item');
    navItems.forEach(function (item) {
      var title = item.querySelector('.nav-title');
      var link = title ? title.querySelector('a') : null;
      if (link && currentUrl.indexOf(link.getAttribute('href')) !== -1) {
        item.classList.add('active');
      }
    });
  }

  /* ---- 弹窗打开/关闭 ---- */
  window.openModal = function (id) {
    var overlay = document.getElementById(id);
    if (overlay) overlay.classList.add('show');
  };

  window.closeModal = function (id) {
    var overlay = document.getElementById(id);
    if (overlay) overlay.classList.remove('show');
  };

  // 点击遮罩关闭弹窗
  function initModals() {
    document.querySelectorAll('.modal-overlay').forEach(function (overlay) {
      overlay.addEventListener('click', function (e) {
        if (e.target === overlay) {
          overlay.classList.remove('show');
        }
      });
    });
  }

  /* ---- 确认弹窗 ---- */
  window.showConfirm = function (options) {
    var title = options.title || '提示';
    var message = options.message || '确定执行此操作吗？';
    var onConfirm = options.onConfirm || function () {};
    var onCancel = options.onCancel || function () {};

    var overlay = document.createElement('div');
    overlay.className = 'modal-overlay confirm-modal show';
    overlay.id = 'confirm-modal-' + Date.now();
    overlay.innerHTML =
      '<div class="modal">' +
      '  <div class="modal-body">' +
      '    <div class="confirm-icon">&#9888;</div>' +
      '    <div class="confirm-title">' + title + '</div>' +
      '    <div class="confirm-message">' + message + '</div>' +
      '  </div>' +
      '  <div class="modal-footer">' +
      '    <button class="btn cancel-btn">取消</button>' +
      '    <button class="btn btn-primary confirm-btn">确定</button>' +
      '  </div>' +
      '</div>';

    document.body.appendChild(overlay);

    overlay.querySelector('.cancel-btn').addEventListener('click', function () {
      document.body.removeChild(overlay);
      onCancel();
    });

    overlay.querySelector('.confirm-btn').addEventListener('click', function () {
      document.body.removeChild(overlay);
      onConfirm();
    });

    overlay.addEventListener('click', function (e) {
      if (e.target === overlay) {
        document.body.removeChild(overlay);
        onCancel();
      }
    });
  };

  /* ---- Toast消息 ---- */
  function initToastContainer() {
    if (!document.querySelector('.toast-container')) {
      var container = document.createElement('div');
      container.className = 'toast-container';
      document.body.appendChild(container);
    }
  }

  window.showToast = function (message, type, duration) {
    type = type || 'success';
    duration = duration || 3000;

    initToastContainer();
    var container = document.querySelector('.toast-container');

    var icons = {
      success: '&#10004;',
      error: '&#10008;',
      warning: '&#9888;',
      info: '&#8505;'
    };

    var toast = document.createElement('div');
    toast.className = 'toast toast-' + type;
    toast.innerHTML = '<span>' + (icons[type] || '') + '</span><span>' + message + '</span>';
    container.appendChild(toast);

    setTimeout(function () {
      toast.classList.add('hiding');
      setTimeout(function () {
        if (toast.parentNode) toast.parentNode.removeChild(toast);
      }, 300);
    }, duration);
  };

  /* ---- Tab切换 ---- */
  window.initTabs = function (containerSelector) {
    var container = document.querySelector(containerSelector);
    if (!container) return;

    var tabs = container.querySelectorAll('[data-tab]');
    var panels = container.querySelectorAll('[data-tab-panel]');

    tabs.forEach(function (tab) {
      tab.addEventListener('click', function () {
        var targetId = tab.getAttribute('data-tab');

        tabs.forEach(function (t) { t.classList.remove('active'); });
        panels.forEach(function (p) { p.style.display = 'none'; });

        tab.classList.add('active');
        var target = container.querySelector('[data-tab-panel="' + targetId + '"]');
        if (target) target.style.display = 'block';
      });
    });
  };

  /* ---- 表格全选/取消全选 ---- */
  function initTableCheckboxes() {
    var headerCheckboxes = document.querySelectorAll('th .select-all');
    headerCheckboxes.forEach(function (headerCheckbox) {
      headerCheckbox.addEventListener('change', function () {
        var table = headerCheckbox.closest('table');
        if (!table) return;
        var checkboxes = table.querySelectorAll('tbody input[type="checkbox"]');
        checkboxes.forEach(function (cb) {
          cb.checked = headerCheckbox.checked;
        });
      });
    });
  }

  /* ---- 下拉菜单 ---- */
  function initDropdowns() {
    document.querySelectorAll('.user-menu').forEach(function (menu) {
      menu.addEventListener('click', function (e) {
        e.stopPropagation();
        var dropdown = menu.querySelector('.dropdown-menu');
        if (!dropdown) return;
        var isOpen = dropdown.classList.contains('show');
        // 先关闭所有下拉
        document.querySelectorAll('.dropdown-menu.show').forEach(function (d) {
          d.classList.remove('show');
        });
        menu.classList.remove('open');
        if (!isOpen) {
          dropdown.classList.add('show');
          menu.classList.add('open');
        }
      });
    });

    // 点击其他区域关闭下拉
    document.addEventListener('click', function () {
      document.querySelectorAll('.dropdown-menu.show').forEach(function (d) {
        d.classList.remove('show');
      });
      document.querySelectorAll('.user-menu.open').forEach(function (m) {
        m.classList.remove('open');
      });
    });
  }

  /* ---- 导航iframe加载 ---- */
  window.loadPage = function (url, navItem, subItem) {
    var iframe = document.querySelector('.content-area iframe');
    if (!iframe) return;

    // 添加淡入过渡动画
    iframe.style.opacity = '0';
    iframe.style.transition = 'opacity 0.25s ease-in-out';

    iframe.src = url;

    // 页面加载完成后淡入显示
    var onLoaded = function () {
      iframe.style.opacity = '1';
      iframe.removeEventListener('load', onLoaded);
    };
    iframe.addEventListener('load', onLoaded);

    // 兜底：如果 load 事件未触发（如 about:blank），300ms 后强制淡入
    setTimeout(function () {
      iframe.style.opacity = '1';
    }, 300);

    // 更新菜单高亮
    document.querySelectorAll('.sidebar .nav-item.active').forEach(function (el) {
      el.classList.remove('active');
    });
    document.querySelectorAll('.sidebar .sub-item.active').forEach(function (el) {
      el.classList.remove('active');
    });

    if (navItem) {
      navItem.classList.add('active');
      var subMenu = navItem.querySelector('.sub-menu');
      if (subMenu) navItem.classList.add('open');
    }
    if (subItem) {
      subItem.classList.add('active');
    }
  };

  /* ---- 树节点展开/折叠 ---- */
  window.toggleTreeNode = function (toggleEl) {
    var nodeLi = toggleEl.closest('li');
    if (!nodeLi) return;
    var children = nodeLi.querySelector('.tree-children');
    if (!children) return;

    toggleEl.classList.toggle('expanded');
    children.classList.toggle('collapsed');
  };

  window.expandAllTree = function () {
    document.querySelectorAll('.tree-children.collapsed').forEach(function (el) {
      el.classList.remove('collapsed');
    });
    document.querySelectorAll('.toggle-icon:not(.expanded)').forEach(function (el) {
      el.classList.add('expanded');
    });
  };

  window.collapseAllTree = function () {
    document.querySelectorAll('.tree-children').forEach(function (el) {
      el.classList.add('collapsed');
    });
    document.querySelectorAll('.toggle-icon.expanded').forEach(function (el) {
      el.classList.remove('expanded');
    });
  };

  window.selectTreeNode = function (el) {
    document.querySelectorAll('.node-content.active').forEach(function (n) {
      n.classList.remove('active');
    });
    el.classList.add('active');
  };

  /* ---- 折叠面板（collapse-panel） ---- */
  function initCollapsePanels() {
    document.querySelectorAll('.collapse-panel > .collapse-header').forEach(function (header) {
      header.style.cursor = 'pointer';
      header.addEventListener('click', function () {
        var panel = header.parentElement;
        var body = panel.querySelector('.collapse-body');
        if (!body) return;

        var isCollapsed = panel.classList.contains('collapsed');

        if (isCollapsed) {
          // 展开：先设置高度为 auto 获取实际高度，再从 0 过渡到 auto
          panel.classList.remove('collapsed');
          body.style.display = 'block';
          var fullHeight = body.scrollHeight + 'px';
          body.style.height = '0';
          body.style.overflow = 'hidden';
          body.style.transition = 'height 0.3s ease';

          // 触发重绘后设置目标高度
          body.offsetHeight; // force reflow
          body.style.height = fullHeight;

          // 过渡结束后清除内联样式，让内容自适应
          var onEnd = function () {
            body.style.height = '';
            body.style.overflow = '';
            body.style.transition = '';
            body.removeEventListener('transitionend', onEnd);
          };
          body.addEventListener('transitionend', onEnd);
        } else {
          // 折叠：从当前高度过渡到 0
          body.style.height = body.scrollHeight + 'px';
          body.style.overflow = 'hidden';
          body.style.transition = 'height 0.3s ease';

          // 触发重绘后设置高度为 0
          body.offsetHeight; // force reflow
          body.style.height = '0';

          var onEnd = function () {
            if (panel.classList.contains('collapsed')) {
              body.style.display = 'none';
            }
            body.style.height = '';
            body.style.overflow = '';
            body.style.transition = '';
            body.removeEventListener('transitionend', onEnd);
          };
          body.addEventListener('transitionend', onEnd);

          panel.classList.add('collapsed');
        }
      });
    });
  }

  /* ---- 可折叠记录区域（collapsible-section） ---- */
  function initCollapsibleSections() {
    document.querySelectorAll('.collapsible-section > .collapsible-header').forEach(function (header) {
      header.style.cursor = 'pointer';
      header.addEventListener('click', function () {
        var section = header.parentElement;
        var body = section.querySelector('.collapsible-body');
        if (!body) return;

        var isCollapsed = section.classList.contains('collapsed');

        if (isCollapsed) {
          section.classList.remove('collapsed');
          body.style.display = 'block';
          var fullHeight = body.scrollHeight + 'px';
          body.style.height = '0';
          body.style.overflow = 'hidden';
          body.style.transition = 'height 0.3s ease';

          body.offsetHeight; // force reflow
          body.style.height = fullHeight;

          var onEnd = function () {
            body.style.height = '';
            body.style.overflow = '';
            body.style.transition = '';
            body.removeEventListener('transitionend', onEnd);
          };
          body.addEventListener('transitionend', onEnd);
        } else {
          body.style.height = body.scrollHeight + 'px';
          body.style.overflow = 'hidden';
          body.style.transition = 'height 0.3s ease';

          body.offsetHeight; // force reflow
          body.style.height = '0';

          var onEnd = function () {
            if (section.classList.contains('collapsed')) {
              body.style.display = 'none';
            }
            body.style.height = '';
            body.style.overflow = '';
            body.style.transition = '';
            body.removeEventListener('transitionend', onEnd);
          };
          body.addEventListener('transitionend', onEnd);

          section.classList.add('collapsed');
        }
      });
    });
  }

  /* ---- Tab栏点击切换（tab-bar） ---- */
  function initTabBars() {
    document.querySelectorAll('.tab-bar').forEach(function (tabBar) {
      tabBar.querySelectorAll('.tab-item').forEach(function (tabItem) {
        tabItem.addEventListener('click', function () {
          tabBar.querySelectorAll('.tab-item').forEach(function (t) {
            t.classList.remove('active');
          });
          tabItem.classList.add('active');
        });
      });
    });
  }

  /* ---- 分栏布局字典项选择（dict-item） ---- */
  function initDictItems() {
    document.querySelectorAll('.dict-item').forEach(function (dictItem) {
      dictItem.style.cursor = 'pointer';
      dictItem.addEventListener('click', function () {
        var container = dictItem.parentElement;
        container.querySelectorAll('.dict-item').forEach(function (item) {
          item.classList.remove('active');
        });
        dictItem.classList.add('active');
      });
    });
  }

  /* ---- 表格搜索过滤 ---- */
  function initTableSearch() {
    // Find search forms: look for .search-filter or .filter-bar that contain a "查询" or search button
    var searchAreas = document.querySelectorAll('.search-filter, .filter-bar');
    searchAreas.forEach(function(area) {
      var searchBtn = area.querySelector('.filter-actions .btn-primary, .filter-actions .btn-success');
      var resetBtn = area.querySelector('.filter-actions .btn:not(.btn-primary):not(.btn-success)');
      var tableWrap = area.nextElementSibling;
      // Sometimes there's a card wrapper between filter and table
      if (tableWrap && !tableWrap.querySelector('table')) {
        tableWrap = tableWrap.nextElementSibling;
      }
      var table = tableWrap ? tableWrap.querySelector('table') : null;
      if (!table || !searchBtn) return;

      searchBtn.addEventListener('click', function(e) {
        e.preventDefault();
        var inputs = area.querySelectorAll('input[type="text"], input[type="date"], select');
        var rows = table.querySelectorAll('tbody tr');
        var hasFilter = false;
        
        rows.forEach(function(row) {
          var show = true;
          inputs.forEach(function(input) {
            var val = input.value.trim().toLowerCase();
            if (!val) return;
            hasFilter = true;
            // Search all cells in this row
            var cells = row.querySelectorAll('td');
            var found = false;
            cells.forEach(function(cell) {
              if (cell.textContent.toLowerCase().indexOf(val) !== -1) found = true;
            });
            if (!found) show = false;
          });
          row.style.display = show ? '' : 'none';
        });
        
        if (!hasFilter) {
          // No filter applied, show all
          rows.forEach(function(row) { row.style.display = ''; });
        }
        
        var visibleCount = table.querySelectorAll('tbody tr:not([style*="display: none"])').length;
        window.showToast && window.showToast('查询完成，共 ' + visibleCount + ' 条记录', 'success');
      });

      if (resetBtn) {
        resetBtn.addEventListener('click', function() {
          area.querySelectorAll('input[type="text"]').forEach(function(i) { i.value = ''; });
          area.querySelectorAll('select').forEach(function(s) { s.selectedIndex = 0; });
          area.querySelectorAll('input[type="date"]').forEach(function(d) { d.value = ''; });
          area.querySelectorAll('.form-switch input[type="checkbox"]').forEach(function(c) { c.checked = false; });
          table.querySelectorAll('tbody tr').forEach(function(row) { row.style.display = ''; });
          window.showToast && window.showToast('已重置筛选条件', 'info');
        });
      }
    });
  }

  /* ---- 分页点击 ---- */
  function initPagination() {
    document.querySelectorAll('.pagination').forEach(function(pager) {
      var pageBtns = pager.querySelectorAll('.page-btn:not(.disabled):not(.active)');
      pageBtns.forEach(function(btn) {
        btn.style.cursor = 'pointer';
        btn.addEventListener('click', function() {
          // Toggle active state
          pager.querySelectorAll('.page-btn').forEach(function(b) { b.classList.remove('active'); });
          btn.classList.add('active');
          // Update page info text if exists
          var info = pager.querySelector('.page-info');
          if (info) {
            var pageNum = btn.textContent.replace(/[^\d]/g, '');
            if (pageNum) info.textContent = '第 ' + pageNum + ' 页 / 共 15 页';
          }
        });
      });
      // Also handle .page-btns a elements
      var pageLinks = pager.querySelectorAll('.page-btns .page-btn:not(.disabled)');
      pageLinks.forEach(function(link) {
        link.addEventListener('click', function(e) {
          e.preventDefault();
          pager.querySelectorAll('.page-btns .page-btn').forEach(function(b) { b.classList.remove('active'); });
          link.classList.add('active');
        });
      });
    });
  }

  /* ---- 文件上传区点击选择 ---- */
  function initFileUpload() {
    document.querySelectorAll('.upload-area').forEach(function(area) {
      // Create hidden file input
      var fileInput = document.createElement('input');
      fileInput.type = 'file';
      fileInput.style.display = 'none';
      fileInput.multiple = true;
      area.appendChild(fileInput);

      area.style.cursor = 'pointer';
      area.addEventListener('click', function() {
        fileInput.click();
      });

      fileInput.addEventListener('change', function() {
        if (fileInput.files.length > 0) {
          var names = [];
          for (var i = 0; i < fileInput.files.length; i++) {
            names.push(fileInput.files[i].name);
          }
          area.innerHTML = '<div class="upload-icon" style="color:var(--primary);">&#10004;</div><div class="upload-text" style="color:var(--primary);">' + names.join(', ') + '</div><div class="upload-hint">点击重新选择</div>';
          area.appendChild(fileInput);
        }
      });

      // Drag events
      area.addEventListener('dragover', function(e) { e.preventDefault(); area.style.borderColor = 'var(--primary)'; area.style.background = 'var(--primary-light, #e8f5ec)'; });
      area.addEventListener('dragleave', function() { area.style.borderColor = ''; area.style.background = ''; });
      area.addEventListener('drop', function(e) { e.preventDefault(); area.style.borderColor = ''; area.style.background = ''; });
    });
  }

  /* ---- 富文本编辑器 ---- */
  function initRichTextEditor() {
    document.querySelectorAll('.editor-toolbar').forEach(function(toolbar) {
      var editorArea = toolbar.nextElementSibling;
      if (!editorArea || !editorArea.classList.contains('editor-area')) return;
      
      toolbar.querySelectorAll('.toolbar-btn').forEach(function(btn) {
        btn.addEventListener('click', function(e) {
          e.preventDefault();
          var cmd = btn.getAttribute('data-cmd') || '';
          if (!cmd) return;
          editorArea.focus();
          document.execCommand(cmd, false, null);
        });
      });
    });
  }

  /* ---- Tab栏切换过滤表格 ---- */
  function initTabBarFilter() {
    document.querySelectorAll('.tab-bar').forEach(function(tabBar) {
      var tabItems = tabBar.querySelectorAll('.tab-item');
      if (tabItems.length === 0) return;
      
      // Find the next table
      var parent = tabBar.parentElement;
      var tableWrap = parent ? parent.querySelector('.table-wrap') : null;
      var table = tableWrap ? tableWrap.querySelector('table') : null;
      if (!table) return;

      tabItems.forEach(function(tabItem) {
        tabItem.addEventListener('click', function() {
          tabItems.forEach(function(t) { t.classList.remove('active'); });
          tabItem.classList.add('active');
          
          var tabText = tabItem.textContent.trim().replace(/\d+/g, '').trim();
          var rows = table.querySelectorAll('tbody tr');
          var hasMatch = false;
          
          rows.forEach(function(row) {
            if (tabText === '全部' || tabText === '全部记录') {
              row.style.display = '';
              hasMatch = true;
            } else {
              // Check if any cell contains the tab text (e.g., "待审核", "已通过")
              var cells = row.querySelectorAll('td');
              var found = false;
              cells.forEach(function(cell) {
                if (cell.textContent.indexOf(tabText) !== -1) found = true;
              });
              row.style.display = found ? '' : 'none';
              if (found) hasMatch = true;
            }
          });
        });
      });
    });
  }

  /* ---- 统计卡片点击跳转 ---- */
  function initStatCardClick() {
    var cards = document.querySelectorAll('.stat-card');
    var cardMap = {
      '村民': { url: 'user/villager-list.html', title: '村民管理' },
      '事件': { url: 'event/event-list.html', title: '事件管理' },
      '待处理': { url: 'event/event-list.html', title: '事件管理' },
      '积分': { url: 'points/audit.html', title: '积分审核' },
      '审核': { url: 'points/audit.html', title: '积分审核' }
    };
    
    cards.forEach(function(card) {
      card.style.cursor = 'pointer';
      card.addEventListener('click', function() {
        var label = card.querySelector('.stat-label');
        if (!label) return;
        var text = label.textContent;
        for (var key in cardMap) {
          if (text.indexOf(key) !== -1) {
            if (window.parent && window.parent.openPage) {
              window.parent.openPage(cardMap[key].url, cardMap[key].title);
            }
            return;
          }
        }
      });
    });
  }

  /* ---- 权限保存 ---- */
  function initPermissionSave() {
    var permModal = document.getElementById('permModal');
    if (!permModal) return;
    var footer = permModal.querySelector('.modal-footer');
    if (!footer) return;
    // Add save button if not exists
    if (!footer.querySelector('.perm-save-btn')) {
      var saveBtn = document.createElement('button');
      saveBtn.className = 'btn btn-primary perm-save-btn';
      saveBtn.textContent = '保存权限';
      saveBtn.addEventListener('click', function() {
        window.closeModal('permModal');
        window.showToast('权限已保存', 'success');
      });
      footer.insertBefore(saveBtn, footer.firstChild);
    }
  }

  /* ---- 初始化 ---- */
  function init() {
    initSidebar();
    initNavMenu();
    highlightMenuItem();
    initModals();
    initTableCheckboxes();
    initDropdowns();
    initCollapsePanels();
    initCollapsibleSections();
    initTabBars();
    initDictItems();
    initTableSearch();
    initPagination();
    initFileUpload();
    initRichTextEditor();
    initTabBarFilter();
    initStatCardClick();
    initPermissionSave();
  }

  // DOM加载后执行初始化
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
