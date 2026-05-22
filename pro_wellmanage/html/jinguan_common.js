/* =====================================================
   豫农田机井管护系统 - 公共脚本
   统一登录检测、Toast、弹窗焦点管理、导航、页面过渡
   ===================================================== */

// ===== 页面过渡动画 =====
document.addEventListener('DOMContentLoaded', function() {
  // 页面淡入已由 CSS animation: pageIn 处理
  // 为所有内部导航链接添加淡出效果
  document.addEventListener('click', function(e) {
    var link = e.target.closest('a[href], [data-navigate]');
    if (!link) return;
    var href = link.getAttribute('href') || link.getAttribute('data-navigate');
    if (!href || href === '#' || href.startsWith('javascript:')) return;
    if (href.startsWith('http') || href.startsWith('//')) return;
    
    e.preventDefault();
    document.body.style.transition = 'opacity 0.2s ease';
    document.body.style.opacity = '0';
    setTimeout(function() {
      window.location.href = href;
    }, 200);
  });
});

// ===== 统一 Logo SVG 生成 =====
function getLogoSVG(size) {
  size = size || 38;
  return '<svg width="' + size + '" height="' + size + '" viewBox="0 0 38 38" class="logo-svg">' +
    '<rect width="38" height="38" fill="#fff" rx="4"/>' +
    '<polygon points="19,4 10,20 28,20" fill="#22a84a"/>' +
    '<circle cx="19" cy="13" r="3" fill="#fff" opacity="0.9"/>' +
    '<rect x="8" y="22" width="22" height="3" rx="1.5" fill="#f5a623"/>' +
    '<rect x="11" y="27" width="16" height="6" rx="1" fill="#22a84a" opacity="0.6"/>' +
    '</svg>';
}

// ===== 登录状态检测 =====
(function checkLogin() {
  if (!sessionStorage.getItem('jg_logged_in')) {
    window.location.href = 'jinguan_login.html';
    return;
  }
  var user = sessionStorage.getItem('jg_user') || '用户';
  // 更新用户名显示
  var nameEls = document.querySelectorAll('#displayName, .jg-user-name');
  nameEls.forEach(function(el) { el.textContent = user; });
  // 更新头像首字
  var avatarEls = document.querySelectorAll('.jg-user-info-avatar');
  avatarEls.forEach(function(el) { el.textContent = user.charAt(0); });
})();

// ===== 统一用户菜单 =====
function toggleUserMenu() {
  var menu = document.getElementById('userMenu');
  if (!menu) return;
  menu.classList.toggle('show');
}

function handleLogout() {
  sessionStorage.removeItem('jg_logged_in');
  sessionStorage.removeItem('jg_user');
  window.location.href = 'jinguan_login.html';
}

// 点击外部关闭菜单
document.addEventListener('click', function(e) {
  var menu = document.getElementById('userMenu');
  var btn = document.getElementById('userBtn');
  if (menu && !menu.contains(e.target) && (!btn || !btn.contains(e.target))) {
    menu.classList.remove('show');
  }
  // 更多导航下拉
  var moreDropdown = document.querySelector('.jg-nav-dropdown');
  var moreBtn = document.querySelector('.jg-nav-more-btn');
  if (moreDropdown && !moreDropdown.contains(e.target) && (!moreBtn || !moreBtn.contains(e.target))) {
    moreDropdown.classList.remove('show');
  }
  // 汉堡菜单
  var mobileMenu = document.querySelector('.jg-nav-mobile');
  var hamburger = document.querySelector('.jg-hamburger');
  if (mobileMenu && !mobileMenu.contains(e.target) && (!hamburger || !hamburger.contains(e.target))) {
    mobileMenu.classList.remove('show');
  }
});

// 更多导航下拉
function toggleNavMore() {
  var dd = document.querySelector('.jg-nav-dropdown');
  if (dd) dd.classList.toggle('show');
}

// 汉堡菜单
function toggleMobileMenu() {
  var m = document.querySelector('.jg-nav-mobile');
  if (m) m.classList.toggle('show');
}

// ===== 统一 Toast =====
var jgToastTimer = null;
function showToast(msg, type) {
  type = type || '';
  // 查找或创建 Toast 容器
  var toast = document.querySelector('.jg-toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.className = 'jg-toast';
    document.body.appendChild(toast);
  }
  // 设置图标
  var iconMap = { success: '✓', warning: '⚠', error: '✕', info: 'ℹ' };
  var icon = iconMap[type] || '';
  toast.innerHTML = (icon ? '<span class="jg-toast-icon">' + icon + '</span>' : '') + msg;
  toast.className = 'jg-toast' + (type ? ' ' + type : '');
  
  // 清除旧定时器
  if (jgToastTimer) clearTimeout(jgToastTimer);
  
  // 显示
  requestAnimationFrame(function() {
    toast.classList.add('show');
  });
  
  // 自动隐藏
  jgToastTimer = setTimeout(function() {
    toast.classList.remove('show');
  }, 3000);
}

// ===== 统一弹窗控制(含焦点管理) =====
var jgLastFocusedElement = null;

function openModal(id) {
  var overlay = document.getElementById(id);
  if (!overlay) return;
  
  // 记录当前焦点元素
  jgLastFocusedElement = document.activeElement;
  
  overlay.classList.add('show');
  overlay.setAttribute('aria-modal', 'true');
  overlay.setAttribute('role', 'dialog');
  
  // 焦点管理: 移到弹窗内第一个可交互元素
  setTimeout(function() {
    var firstFocusable = overlay.querySelector(
      'input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), [tabindex="0"], a[href]'
    );
    if (firstFocusable) firstFocusable.focus();
    else {
      var closeBtn = overlay.querySelector('.jg-modal-close, .modal-close');
      if (closeBtn) closeBtn.focus();
    }
  }, 100);
  
  // 焦点陷阱
  overlay.addEventListener('keydown', jgTrapFocus);
}

function closeModal(id) {
  var overlay = document.getElementById(id);
  if (!overlay) return;
  
  overlay.classList.remove('show');
  overlay.removeAttribute('aria-modal');
  overlay.removeAttribute('role');
  overlay.removeEventListener('keydown', jgTrapFocus);
  
  // 焦点回到触发元素
  if (jgLastFocusedElement) {
    jgLastFocusedElement.focus();
    jgLastFocusedElement = null;
  }
}

function jgTrapFocus(e) {
  if (e.key !== 'Tab') return;
  var overlay = e.currentTarget;
  var focusable = overlay.querySelectorAll(
    'input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), [tabindex="0"], a[href]'
  );
  if (focusable.length === 0) return;
  var first = focusable[0];
  var last = focusable[focusable.length - 1];
  
  if (e.shiftKey && document.activeElement === first) {
    e.preventDefault();
    last.focus();
  } else if (!e.shiftKey && document.activeElement === last) {
    e.preventDefault();
    first.focus();
  }
}

// ESC 关闭弹窗
document.addEventListener('keydown', function(e) {
  if (e.key === 'Escape') {
    var openModalEl = document.querySelector('.jg-modal-overlay.show, .modal-overlay.show');
    if (openModalEl) {
      openModalEl.classList.remove('show');
      if (jgLastFocusedElement) {
        jgLastFocusedElement.focus();
        jgLastFocusedElement = null;
      }
    }
  }
});

// 点击遮罩关闭弹窗
document.addEventListener('click', function(e) {
  if (e.target.classList.contains('jg-modal-overlay') || e.target.classList.contains('modal-overlay')) {
    e.target.classList.remove('show');
    if (jgLastFocusedElement) {
      jgLastFocusedElement.focus();
      jgLastFocusedElement = null;
    }
  }
});

// ===== 侧边栏搜索 =====
function setupSidebarSearch() {
  var input = document.querySelector('.jg-sidebar-search input');
  if (!input) return;
  input.addEventListener('input', function() {
    var keyword = this.value.trim().toLowerCase();
    var nodes = document.querySelectorAll('.jg-sidebar .jg-tree-node.child');
    nodes.forEach(function(node) {
      var text = node.textContent.toLowerCase();
      if (keyword && text.indexOf(keyword) === -1) {
        node.style.display = 'none';
      } else {
        node.style.display = '';
      }
    });
  });
}
document.addEventListener('DOMContentLoaded', setupSidebarSearch);

// ===== 树形折叠 =====
function toggleTree(id, el) {
  var tree = document.getElementById('tree-' + id);
  var arrow = document.getElementById('arrow-' + id);
  if (!tree) return;
  var isOpen = tree.classList.contains('open');
  tree.classList.toggle('open', !isOpen);
  if (arrow) arrow.classList.toggle('open', !isOpen);
}

// ===== 数字滚动动画(IntersectionObserver) =====
function setupNumberAnimation() {
  var nums = document.querySelectorAll('.animate-num');
  if (nums.length === 0) return;
  
  if ('IntersectionObserver' in window) {
    var observer = new IntersectionObserver(function(entries) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          animateNumber(entry.target);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.3 });
    nums.forEach(function(el) { observer.observe(el); });
  } else {
    // Fallback: 直接触发
    nums.forEach(function(el) { animateNumber(el); });
  }
}

function animateNumber(el) {
  var target = parseInt(el.getAttribute('data-target'));
  if (isNaN(target)) return;
  var duration = 1200;
  var startTime = performance.now();
  
  function tick(currentTime) {
    var elapsed = currentTime - startTime;
    var progress = Math.min(elapsed / duration, 1);
    var eased = 1 - Math.pow(1 - progress, 3);
    var current = Math.floor(eased * target);
    el.textContent = current.toLocaleString();
    if (progress < 1) requestAnimationFrame(tick);
    else el.textContent = target.toLocaleString();
  }
  requestAnimationFrame(tick);
}

document.addEventListener('DOMContentLoaded', setupNumberAnimation);

// ===== 骨架屏工具 =====
function showSkeleton(container, type) {
  type = type || 'table';
  var html = '';
  if (type === 'table') {
    for (var i = 0; i < 5; i++) {
      html += '<div class="jg-skeleton jg-skeleton-row"></div>';
    }
  } else if (type === 'cards') {
    html = '<div style="display:grid;grid-template-columns:repeat(4,1fr);gap:12px;">';
    for (var i = 0; i < 4; i++) {
      html += '<div class="jg-skeleton jg-skeleton-card"></div>';
    }
    html += '</div>';
  }
  container.innerHTML = html;
}

function hideSkeleton(container) {
  // 骨架屏会被实际内容替换，无需额外操作
}

// ===== 空状态组件 =====
function renderEmpty(title, desc, actionText, actionFn) {
  var html = '<div class="jg-empty">' +
    '<div class="jg-empty-icon">📭</div>' +
    '<div class="jg-empty-title">' + (title || '暂无数据') + '</div>' +
    '<div class="jg-empty-desc">' + (desc || '当前筛选条件下没有找到匹配的数据') + '</div>';
  if (actionText) {
    html += '<button class="jg-btn jg-btn-primary" onclick="' + (actionFn || '') + '">' + actionText + '</button>';
  }
  html += '</div>';
  return html;
}

// ===== 筛选标签管理 =====
var jgFilterTags = [];

function addFilterTag(key, label, onRemove) {
  // 避免重复
  jgFilterTags = jgFilterTags.filter(function(t) { return t.key !== key; });
  jgFilterTags.push({ key: key, label: label, onRemove: onRemove });
  renderFilterTags();
  updateBreadcrumb();
}

function removeFilterTag(key) {
  var tag = jgFilterTags.find(function(t) { return t.key === key; });
  jgFilterTags = jgFilterTags.filter(function(t) { return t.key !== key; });
  if (tag && tag.onRemove) tag.onRemove();
  renderFilterTags();
  updateBreadcrumb();
}

function clearFilterTags() {
  jgFilterTags.forEach(function(t) { if (t.onRemove) t.onRemove(); });
  jgFilterTags = [];
  renderFilterTags();
  updateBreadcrumb();
}

function renderFilterTags() {
  var container = document.querySelector('.jg-filter-tags');
  if (!container) return;
  if (jgFilterTags.length === 0) {
    container.innerHTML = '';
    return;
  }
  var html = jgFilterTags.map(function(t) {
    return '<span class="jg-filter-tag">' + t.label +
      '<span class="jg-filter-tag-close" onclick="removeFilterTag(\'' + t.key + '\')">×</span></span>';
  }).join('');
  html += '<span class="jg-filter-clear" onclick="clearFilterTags()">清除全部</span>';
  container.innerHTML = html;
}

function updateBreadcrumb() {
  var bc = document.querySelector('.jg-breadcrumb-current');
  if (!bc) return;
  var base = bc.getAttribute('data-base') || bc.textContent;
  bc.setAttribute('data-base', bc.getAttribute('data-base') || base);
  if (jgFilterTags.length > 0) {
    var extras = jgFilterTags.map(function(t) { return t.label; }).join(' > ');
    bc.textContent = base + ' > ' + extras;
  } else {
    bc.textContent = base;
  }
}

// ===== SVG 地图替代文本 =====
function setupMapAccessibility() {
  var svg = document.querySelector('.map-svg');
  if (!svg) return;
  // 添加 title 和 desc
  var titleEl = document.createElementNS('http://www.w3.org/2000/svg', 'title');
  titleEl.textContent = '河南省机井分布概览';
  var descEl = document.createElementNS('http://www.w3.org/2000/svg', 'desc');
  descEl.textContent = '河南省18个地级市的机井数量及正常运行状态概览地图，不同颜色代表不同的运行状态';
  svg.insertBefore(descEl, svg.firstChild);
  svg.insertBefore(titleEl, svg.firstChild);
  svg.setAttribute('role', 'img');
  
  // 为城市圆点添加 aria-label
  var dots = svg.querySelectorAll('.city-dot');
  dots.forEach(function(dot) {
    var city = dot.getAttribute('data-city') || '';
    var count = dot.getAttribute('data-count') || '';
    var normal = dot.getAttribute('data-normal') || '';
    dot.setAttribute('aria-label', city + ': ' + count + '口机井, 正常率' + normal + '%');
    dot.setAttribute('tabindex', '0');
    dot.setAttribute('role', 'button');
  });
}
document.addEventListener('DOMContentLoaded', setupMapAccessibility);

// ===== 初始化 SVG Logo =====
document.addEventListener('DOMContentLoaded', function() {
  document.querySelectorAll('.jg-logo-icon').forEach(function(el) {
    if (!el.querySelector('svg')) {
      el.innerHTML = getLogoSVG(38);
    }
  });
});

// ===== 个人设置页面工具函数 =====

/**
 * 验证密码强度
 * @param {string} password - 密码
 * @returns {object} - 包含强度级别和建议的对象
 */
function checkPasswordStrength(password) {
  var strength = 0;
  
  // 长度检查
  if (password.length >= 8) strength++;
  if (password.length >= 12) strength++;
  
  // 包含小写字母
  if (/[a-z]/.test(password)) strength++;
  
  // 包含大写字母
  if (/[A-Z]/.test(password)) strength++;
  
  // 包含数字
  if (/\d/.test(password)) strength++;
  
  // 包含特殊字符
  if (/[!@#$%^&*(),.?":{}|<>]/.test(password)) strength++;
  
  var levels = ['弱', '较弱', '中等', '强', '很强'];
  var level = Math.min(strength, 4);
  
  return {
    level: level,
    text: levels[level],
    color: ['#ff4d4f', '#fa8c16', '#faad14', '#52c41a', '#52c41a'][level],
    suggestions: getPasswordSuggestions(password)
  };
}

/**
 * 获取密码建议
 * @param {string} password - 密码
 * @returns {string[]} - 建议列表
 */
function getPasswordSuggestions(password) {
  var suggestions = [];
  
  if (password.length < 8) {
    suggestions.push('密码长度建议至少8位');
  }
  if (!/[a-z]/.test(password)) {
    suggestions.push('建议包含小写字母');
  }
  if (!/[A-Z]/.test(password)) {
    suggestions.push('建议包含大写字母');
  }
  if (!/\d/.test(password)) {
    suggestions.push('建议包含数字');
  }
  if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
    suggestions.push('建议包含特殊字符');
  }
  
  return suggestions;
}

/**
 * 验证邮箱格式
 * @param {string} email - 邮箱地址
 * @returns {boolean} - 是否有效
 */
function validateEmail(email) {
  var re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}

/**
 * 验证手机号格式
 * @param {string} phone - 手机号
 * @returns {boolean} - 是否有效
 */
function validatePhone(phone) {
  var re = /^1[3-9]\d{9}$/;
  return re.test(phone);
}

/**
 * 格式化手机号显示（中间4位用*代替）
 * @param {string} phone - 手机号
 * @returns {string} - 格式化后的手机号
 */
function formatPhone(phone) {
  if (!phone || phone.length !== 11) return phone;
  return phone.replace(/(\d{3})(\d{4})(\d{4})/, '$1****$3');
}

/**
 * 模拟API请求 - 获取用户信息
 * @returns {Promise} - 用户信息Promise
 */
function getUserProfile() {
  return new Promise(function(resolve) {
    setTimeout(function() {
      resolve({
        code: 200,
        data: {
          userId: 'U001',
          username: '张三',
          realName: '张三',
          phone: '13800138000',
          email: 'zhangsan@example.com',
          region: '河南省-周口市-淮阳区',
          role: '县级管理员',
          avatar: '',
          createTime: '2026-01-15 10:30:00'
        }
      });
    }, 300);
  });
}

/**
 * 模拟API请求 - 更新用户信息
 * @param {object} data - 用户信息
 * @returns {Promise} - 更新结果Promise
 */
function updateUserProfile(data) {
  return new Promise(function(resolve) {
    setTimeout(function() {
      resolve({
        code: 200,
        message: '更新成功'
      });
    }, 500);
  });
}

/**
 * 模拟API请求 - 修改密码
 * @param {object} data - 密码数据
 * @returns {Promise} - 修改结果Promise
 */
function changePassword(data) {
  return new Promise(function(resolve) {
    setTimeout(function() {
      // 模拟旧密码验证
      if (data.oldPassword !== '123456') {
        resolve({
          code: 400,
          message: '旧密码不正确'
        });
      } else {
        resolve({
          code: 200,
          message: '密码修改成功'
        });
      }
    }, 500);
  });
}

/**
 * 模拟API请求 - 更新通知设置
 * @param {object} settings - 通知设置
 * @returns {Promise} - 更新结果Promise
 */
function updateNotificationSettings(settings) {
  return new Promise(function(resolve) {
    setTimeout(function() {
      resolve({
        code: 200,
        message: '设置保存成功'
      });
    }, 300);
  });
}

/**
 * 个人设置页面初始化
 */
function initProfilePage() {
  // 侧边菜单切换
  document.querySelectorAll('.profile-sidebar-item[data-tab]').forEach(function(item) {
    item.addEventListener('click', function() {
      var tab = this.getAttribute('data-tab');
      if (!tab) return;
      
      // 更新菜单高亮
      document.querySelectorAll('.profile-sidebar-item').forEach(function(i) {
        i.classList.remove('active');
      });
      this.classList.add('active');
      
      // 切换内容区域
      document.querySelectorAll('.tab-content').forEach(function(t) {
        t.style.display = 'none';
      });
      var targetTab = document.getElementById('tab-' + tab);
      if (targetTab) {
        targetTab.style.display = 'block';
      }
    });
  });
  
  // 退出登录处理
  document.querySelectorAll('.logout-item, #logoutLink').forEach(function(item) {
    item.addEventListener('click', function() {
      openModal('logoutModal');
    });
  });
  
  // 确认退出
  var confirmLogout = document.getElementById('confirmLogout');
  if (confirmLogout) {
    confirmLogout.addEventListener('click', function() {
      showToast('已退出登录，即将跳转到登录页...', 'info');
      setTimeout(function() {
        handleLogout();
      }, 1500);
    });
  }
  
  // 表单验证
  setupProfileFormValidation();
  setupPasswordFormValidation();
}

/**
 * 个人信息表单验证
 */
function setupProfileFormValidation() {
  var form = document.getElementById('profileForm');
  if (!form) return;
  
  var saveBtn = document.getElementById('saveProfile');
  if (saveBtn) {
    saveBtn.addEventListener('click', function() {
      var username = document.getElementById('username');
      var realName = document.getElementById('realName');
      var email = document.getElementById('email');
      
      // 验证必填项
      if (!username.value.trim()) {
        showToast('请输入用户名', 'warning');
        username.focus();
        return;
      }
      
      if (!realName.value.trim()) {
        showToast('请输入真实姓名', 'warning');
        realName.focus();
        return;
      }
      
      // 验证邮箱格式
      if (email.value && !validateEmail(email.value)) {
        showToast('请输入正确的邮箱格式', 'warning');
        email.focus();
        return;
      }
      
      // 提交更新
      updateUserProfile({
        username: username.value,
        realName: realName.value,
        email: email.value
      }).then(function(res) {
        if (res.code === 200) {
          showToast(res.message, 'success');
        } else {
          showToast(res.message || '更新失败', 'error');
        }
      });
    });
  }
}

/**
 * 密码修改表单验证
 */
function setupPasswordFormValidation() {
  var form = document.getElementById('passwordForm');
  if (!form) return;
  
  var saveBtn = document.getElementById('savePassword');
  if (saveBtn) {
    saveBtn.addEventListener('click', function() {
      var oldPassword = document.getElementById('oldPassword');
      var newPassword = document.getElementById('newPassword');
      var confirmPassword = document.getElementById('confirmPassword');
      
      // 清除之前的错误提示
      document.querySelectorAll('.form-error').forEach(function(el) {
        el.textContent = '';
      });
      
      // 验证旧密码
      if (!oldPassword.value) {
        document.getElementById('oldPasswordError').textContent = '请输入旧密码';
        oldPassword.focus();
        return;
      }
      
      // 验证新密码
      if (!newPassword.value) {
        document.getElementById('newPasswordError').textContent = '请输入新密码';
        newPassword.focus();
        return;
      }
      
      var passwordCheck = checkPasswordStrength(newPassword.value);
      if (passwordCheck.level < 2) {
        document.getElementById('newPasswordError').textContent = '密码强度不足，建议包含大小写字母和数字';
        newPassword.focus();
        return;
      }
      
      // 验证确认密码
      if (!confirmPassword.value) {
        document.getElementById('confirmPasswordError').textContent = '请确认新密码';
        confirmPassword.focus();
        return;
      }
      
      if (newPassword.value !== confirmPassword.value) {
        document.getElementById('confirmPasswordError').textContent = '两次输入的密码不一致';
        confirmPassword.focus();
        return;
      }
      
      // 提交修改
      changePassword({
        oldPassword: oldPassword.value,
        newPassword: newPassword.value,
        confirmPassword: confirmPassword.value
      }).then(function(res) {
        if (res.code === 200) {
          showToast(res.message, 'success');
          // 清空表单
          oldPassword.value = '';
          newPassword.value = '';
          confirmPassword.value = '';
        } else {
          document.getElementById('oldPasswordError').textContent = res.message;
          showToast(res.message, 'error');
        }
      });
    });
  }
}

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', function() {
  // 如果是个人设置页面，初始化相关功能
  if (window.location.pathname.includes('jinguan_profile.html')) {
    initProfilePage();
  }
});
