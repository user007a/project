/**
 * Digital Village Dashboard - Interactive Logic
 * Real-time datetime, tab switching, fullscreen, auto-carousel, tooltips, filter bar
 */

(function () {
  'use strict';

  /* ---- Accessibility: batch add aria-hidden to decorative icons ---- */
  document.querySelectorAll('.kpi-icon i, .industry-icon-item .icon-circle i, .panel-title i, .weather-item i, .alert-banner i, .notice-icon i, .funnel-arrow i, .facility-item i, .h-bar-fill i, .btn-platform-entry i').forEach(function(icon) {
    icon.setAttribute('aria-hidden', 'true');
  });

  /* ---- Real-time DateTime ---- */
  var dateTextEl = document.querySelector('.date-badge .date-text');
  var weekTextEl = document.querySelector('.date-badge .week-text');
  var timeTextEl = document.querySelector('.time-display .time-text');

  function updateDateTime() {
    var now = new Date();
    var dateFormatted = new Intl.DateTimeFormat('zh-CN', {year:'numeric',month:'2-digit',day:'2-digit'}).format(now);
    if (dateTextEl) dateTextEl.textContent = dateFormatted.replace('/', '年').replace('/', '月') + '日';
    var weekDay = new Intl.DateTimeFormat('zh-CN', {weekday:'long'}).format(now);
    if (weekTextEl) weekTextEl.textContent = weekDay;

    var hh = String(now.getHours()).padStart(2, '0');
    var mm = String(now.getMinutes()).padStart(2, '0');
    var ss = String(now.getSeconds()).padStart(2, '0');

    if (timeTextEl) timeTextEl.textContent = hh + ':' + mm + ':' + ss;
  }

  updateDateTime();
  setInterval(updateDateTime, 1000);

  /* ---- Tab Switching ---- */
  var tabs = document.querySelectorAll('.tab-btn');
  var sections = document.querySelectorAll('.section');
  var currentTabIndex = 0;

  function switchTab(index) {
    if (index < 0 || index >= tabs.length) return;
    currentTabIndex = index;

    tabs.forEach(function (tab, i) {
      tab.classList.toggle('active', i === index);
      tab.setAttribute('aria-selected', i === index ? 'true' : 'false');
    });

    sections.forEach(function (section, i) {
      section.classList.toggle('active', i === index);
    });
  }

  tabs.forEach(function (tab, i) {
    tab.addEventListener('click', function () {
      switchTab(i);
      pauseCarousel();
    });
  });

  // Initialize first tab
  switchTab(0);

  /* ---- Fullscreen ---- */
  var btnFullscreen = document.querySelector('.btn-fullscreen');
  if (btnFullscreen) {
    btnFullscreen.addEventListener('click', function () {
      var el = document.documentElement;
      if (!document.fullscreenElement) {
        if (el.requestFullscreen) {
          el.requestFullscreen();
        } else if (el.webkitRequestFullscreen) {
          el.webkitRequestFullscreen();
        } else if (el.msRequestFullscreen) {
          el.msRequestFullscreen();
        }
      } else {
        if (document.exitFullscreen) {
          document.exitFullscreen();
        } else if (document.webkitExitFullscreen) {
          document.webkitExitFullscreen();
        } else if (document.msExitFullscreen) {
          document.msExitFullscreen();
        }
      }
    });
  }

  /* ---- Auto-Carousel (30s interval, 30s pause on manual) ---- */
  var carouselInterval = null;
  var pauseTimer = null;
  var CAROUSEL_MS = 30000;
  var PAUSE_MS = 30000;

  function startCarousel() {
    stopCarousel();
    carouselInterval = setInterval(function () {
      var next = (currentTabIndex + 1) % tabs.length;
      switchTab(next);
    }, CAROUSEL_MS);
  }

  function stopCarousel() {
    if (carouselInterval) {
      clearInterval(carouselInterval);
      carouselInterval = null;
    }
  }

  function pauseCarousel() {
    stopCarousel();
    if (pauseTimer) clearTimeout(pauseTimer);
    pauseTimer = setTimeout(function () {
      startCarousel();
      pauseTimer = null;
    }, PAUSE_MS);
  }

  startCarousel();

  /* ---- Tooltip (hover show) ---- */
  var tooltipEl = document.querySelector('.tooltip');

  function showTooltip(e, text) {
    if (!tooltipEl) return;
    tooltipEl.textContent = text;
    tooltipEl.classList.add('visible');
    positionTooltip(e);
  }

  function positionTooltip(e) {
    if (!tooltipEl) return;
    var x = e.clientX + 12;
    var y = e.clientY - 10;
    var tw = tooltipEl.offsetWidth;
    var th = tooltipEl.offsetHeight;
    if (x + tw > window.innerWidth) x = e.clientX - tw - 8;
    if (y + th > window.innerHeight) y = e.clientY - th - 8;
    if (y < 0) y = 8;
    tooltipEl.style.left = x + 'px';
    tooltipEl.style.top = y + 'px';
  }

  function hideTooltip() {
    if (!tooltipEl) return;
    tooltipEl.classList.remove('visible');
  }

  var tipElements = document.querySelectorAll('[data-tip]');
  tipElements.forEach(function (el) {
    el.addEventListener('mouseenter', function (e) {
      showTooltip(e, el.getAttribute('data-tip'));
    });
    el.addEventListener('mousemove', function (e) {
      positionTooltip(e);
    });
    el.addEventListener('mouseleave', hideTooltip);
  });

  /* ---- Filter Bar Interaction ---- */
  document.querySelectorAll('.filter-select').forEach(function (select) {
    select.addEventListener('change', function () {
      this.closest('.filter-group').classList.add('filter-changed');
      // Visual feedback: briefly flash the active section content
      var sec = document.querySelector('.section.active');
      if (sec) {
        sec.style.opacity = '0.6';
        setTimeout(function () { sec.style.opacity = '1'; }, 300);
      }
    });
  });

  document.querySelectorAll('.btn-filter-reset').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var bar = this.closest('.filter-bar');
      if (!bar) return;
      bar.querySelectorAll('.filter-select').forEach(function (s) { s.selectedIndex = 0; });
      bar.querySelectorAll('.filter-group').forEach(function (g) { g.classList.remove('filter-changed'); });
      // Visual feedback: flash the section
      var sec = document.querySelector('.section.active');
      if (sec) {
        sec.style.opacity = '0.6';
        setTimeout(function () { sec.style.opacity = '1'; }, 300);
      }
    });
  });

  /* ---- Auto-Scaling for Fixed 1920x1080 Layout ---- */
  var dashboard = document.querySelector('.dashboard');
  function scaleDashboard() {
    if (!dashboard) return;
    var w = window.innerWidth;
    var h = window.innerHeight;
    if (w < 1200) return; // let responsive CSS handle it
    var scaleX = w / 1920;
    var scaleY = h / 1080;
    var scale = Math.min(scaleX, scaleY, 1); // never scale up beyond 1
    dashboard.style.setProperty('--dash-scale', scale);
    dashboard.style.transform = 'scale(' + scale + ')';
    dashboard.style.transformOrigin = 'top left';
    // Center if scaled down
    if (scale < 1) {
      var marginLeft = (w - 1920 * scale) / 2;
      var marginTop = (h - 1080 * scale) / 2;
      dashboard.style.marginLeft = marginLeft + 'px';
      dashboard.style.marginTop = marginTop + 'px';
    } else {
      dashboard.style.marginLeft = '0px';
      dashboard.style.marginTop = '0px';
    }
  }
  scaleDashboard();
  window.addEventListener('resize', scaleDashboard);

  /* ---- Calendar: highlight today + dynamic month ---- */
  (function () {
    var calDays = document.querySelectorAll('.calendar-day');
    if (calDays.length > 0) {
      var now = new Date();
      var todayDate = now.getDate();
      // Check each calendar-day: if its text matches today's date, add .today class
      calDays.forEach(function (dayEl) {
        var dayNum = parseInt(dayEl.textContent.trim(), 10);
        if (dayNum === todayDate) {
          dayEl.classList.add('today');
        }
      });
      // Update calendar panel-title month if it exists
      var calPanel = calDays[0] ? calDays[0].closest('.panel') : null;
      if (calPanel) {
        var calTitle = calPanel.querySelector('.panel-title');
        if (calTitle) {
          var calMonthText = calTitle.textContent; // e.g., "文化活动日历（2026年6月）"
          var monthNames = ['1月','2月','3月','4月','5月','6月','7月','8月','9月','10月','11月','12月'];
          var newMonth = monthNames[now.getMonth()];
          var newYear = now.getFullYear() + '年';
          // Replace the month/year part in parentheses
          if (calMonthText) {
            var updated = calMonthText.replace(/（[^）]+）/, '（' + newYear + newMonth + '）');
            calTitle.innerHTML = calTitle.innerHTML.replace(calMonthText, updated);
          }
        }
      }
    }
  })();

  /* ---- Keyboard Navigation ---- */
  document.addEventListener('keydown', function (e) {
    if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
      e.preventDefault();
      var prev = (currentTabIndex - 1 + tabs.length) % tabs.length;
      switchTab(prev);
      pauseCarousel();
    } else if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
      e.preventDefault();
      var next = (currentTabIndex + 1) % tabs.length;
      switchTab(next);
      pauseCarousel();
    } else if (e.key === 'F11') {
      // Let browser handle F11 natively
    }
  });

})();

/* === KPI Modal Functions === */
var kpiModalData = {
  'total-pop': {
    title: '人口数据详情',
    chart: '<svg viewBox="0 0 600 200" class="kpi-modal-chart"><defs><linearGradient id="popGrad" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#2b6e3c" stop-opacity="0.3"/><stop offset="100%" stop-color="#2b6e3c" stop-opacity="0.05"/></linearGradient></defs><path d="M0,180 C50,160 100,140 150,130 C200,120 250,100 300,90 C350,80 400,70 450,60 C500,50 550,40 600,30 L600,200 L0,200 Z" fill="url(#popGrad)"/><polyline points="0,180 150,130 300,90 450,60 600,30" fill="none" stroke="#2b6e3c" stroke-width="2.5"/><circle cx="0" cy="180" r="3" fill="#2b6e3c"/><circle cx="150" cy="130" r="3" fill="#2b6e3c"/><circle cx="300" cy="90" r="3" fill="#2b6e3c"/><circle cx="450" cy="60" r="3" fill="#2b6e3c"/><circle cx="600" cy="30" r="3" fill="#2b6e3c"/></svg>',
    months: ['2021', '2022', '2023', '2024', '2025', '2026'],
    stats: [
      { val: '2,856', label: '总人口' },
      { val: '986', label: '总户数' },
      { val: '1,514', label: '男性人口' },
      { val: '1,342', label: '女性人口' }
    ]
  },
  'households': {
    title: '户数数据详情',
    chart: '<svg viewBox="0 0 600 200" class="kpi-modal-chart"><defs><linearGradient id="hhGrad" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#3b82f6" stop-opacity="0.3"/><stop offset="100%" stop-color="#3b82f6" stop-opacity="0.05"/></linearGradient></defs><path d="M0,190 C100,185 200,175 300,160 C400,145 500,130 600,110 L600,200 L0,200 Z" fill="url(#hhGrad)"/><polyline points="0,190 200,175 400,145 600,110" fill="none" stroke="#3b82f6" stroke-width="2.5"/><circle cx="0" cy="190" r="3" fill="#3b82f6"/><circle cx="200" cy="175" r="3" fill="#3b82f6"/><circle cx="400" cy="145" r="3" fill="#3b82f6"/><circle cx="600" cy="110" r="3" fill="#3b82f6"/></svg>',
    months: ['2021', '2022', '2023', '2024', '2025', '2026'],
    stats: [
      { val: '986', label: '总户数' },
      { val: '412', label: '常住户' },
      { val: '574', label: '外出务工户' },
      { val: '2.8', label: '户均人口' }
    ]
  },
  'income': {
    title: '村集体收入详情',
    chart: '<svg viewBox="0 0 600 200" class="kpi-modal-chart"><defs><linearGradient id="incGrad" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#f59e0b" stop-opacity="0.3"/><stop offset="100%" stop-color="#f59e0b" stop-opacity="0.05"/></linearGradient></defs><path d="M0,180 C100,160 200,140 300,110 C400,80 500,50 600,20 L600,200 L0,200 Z" fill="url(#incGrad)"/><polyline points="0,180 200,140 400,80 600,20" fill="none" stroke="#f59e0b" stroke-width="2.5"/><circle cx="0" cy="180" r="3" fill="#f59e0b"/><circle cx="200" cy="140" r="3" fill="#f59e0b"/><circle cx="400" cy="80" r="3" fill="#f59e0b"/><circle cx="600" cy="20" r="3" fill="#f59e0b"/></svg>',
    months: ['2021', '2022', '2023', '2024', '2025', '2026'],
    stats: [
      { val: '386万', label: '村集体收入' },
      { val: '312万', label: '村集体支出' },
      { val: '74万', label: '年度结余' },
      { val: '+19.2%', label: '同比增长' }
    ]
  },
  'per-income': {
    title: '人均收入详情',
    chart: '<svg viewBox="0 0 600 200" class="kpi-modal-chart"><defs><linearGradient id="piGrad" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#8b5cf6" stop-opacity="0.3"/><stop offset="100%" stop-color="#8b5cf6" stop-opacity="0.05"/></linearGradient></defs><path d="M0,170 C100,155 200,135 300,120 C400,105 500,90 600,70 L600,200 L0,200 Z" fill="url(#piGrad)"/><polyline points="0,170 200,135 400,105 600,70" fill="none" stroke="#8b5cf6" stroke-width="2.5"/><circle cx="0" cy="170" r="3" fill="#8b5cf6"/><circle cx="200" cy="135" r="3" fill="#8b5cf6"/><circle cx="400" cy="105" r="3" fill="#8b5cf6"/><circle cx="600" cy="70" r="3" fill="#8b5cf6"/></svg>',
    months: ['2021', '2022', '2023', '2024', '2025', '2026'],
    stats: [
      { val: '3.2万', label: '人均收入' },
      { val: '1.8万', label: '经营性收入' },
      { val: '0.9万', label: '工资性收入' },
      { val: '0.5万', label: '转移性收入' }
    ]
  },
  'party': {
    title: '党员数据详情',
    chart: '<div class="kpi-modal-bar-chart"><div class="kpi-modal-bar"><div class="bar fill-primary" style="height:120px;"></div><div class="bar-value">45</div><div class="bar-label">60岁以上</div></div><div class="kpi-modal-bar"><div class="bar fill-info" style="height:100px;"></div><div class="bar-value">38</div><div class="bar-label">40-60岁</div></div><div class="kpi-modal-bar"><div class="bar fill-success" style="height:90px;"></div><div class="bar-value">35</div><div class="bar-label">30-40岁</div></div><div class="kpi-modal-bar"><div class="bar fill-lime" style="height:50px;"></div><div class="bar-value">10</div><div class="bar-label">30岁以下</div></div></div>',
    months: [],
    stats: [
      { val: '128', label: '党员总数' },
      { val: '5', label: '支部委员' },
      { val: '8', label: '后备干部' },
      { val: '6', label: '入党积极分子' }
    ]
  },
  'industry': {
    title: '特色产业数据详情',
    chart: '<div class="kpi-modal-bar-chart"><div class="kpi-modal-bar"><div class="bar fill-primary" style="height:140px;"></div><div class="bar-value">680万</div><div class="bar-label">种植业</div></div><div class="kpi-modal-bar"><div class="bar fill-info" style="height:110px;"></div><div class="bar-value">520万</div><div class="bar-label">养殖业</div></div><div class="kpi-modal-bar"><div class="bar fill-warning" style="height:80px;"></div><div class="bar-value">380万</div><div class="bar-label">加工业</div></div><div class="kpi-modal-bar"><div class="bar fill-success" style="height:60px;"></div><div class="bar-value">260万</div><div class="bar-label">乡村旅游</div></div><div class="kpi-modal-bar"><div class="bar fill-purple" style="height:45px;"></div><div class="bar-value">180万</div><div class="bar-label">电商服务</div></div><div class="kpi-modal-bar"><div class="bar fill-danger" style="height:30px;"></div><div class="bar-value">95万</div><div class="bar-label">手工艺品</div></div></div>',
    months: [],
    stats: [
      { val: '6项', label: '特色产业' },
      { val: '2,115万', label: '产业总产值' },
      { val: '860人', label: '从业人数' },
      { val: '+15.3%', label: '产值增长' }
    ]
  },
  'poverty': {
    title: '脱贫数据详情',
    chart: '<svg viewBox="0 0 600 200" class="kpi-modal-chart"><defs><linearGradient id="povGrad" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#22a84a" stop-opacity="0.3"/><stop offset="100%" stop-color="#22a84a" stop-opacity="0.05"/></linearGradient></defs><path d="M0,40 C100,50 200,70 300,100 C400,130 500,160 600,180 L600,200 L0,200 Z" fill="url(#povGrad)"/><polyline points="0,40 200,70 400,130 600,180" fill="none" stroke="#22a84a" stroke-width="2.5"/><circle cx="0" cy="40" r="3" fill="#22a84a"/><circle cx="200" cy="70" r="3" fill="#22a84a"/><circle cx="400" cy="130" r="3" fill="#22a84a"/><circle cx="600" cy="180" r="3" fill="#22a84a"/></svg>',
    months: ['2020', '2021', '2022', '2023', '2024', '2025'],
    stats: [
      { val: '42户', label: '已脱贫户' },
      { val: '156人', label: '已脱贫人口' },
      { val: '0户', label: '未脱贫户' },
      { val: '100%', label: '脱贫完成率' }
    ]
  },
  'projects': {
    title: '在建项目详情',
    chart: '<div class="kpi-modal-bar-chart"><div class="kpi-modal-bar"><div class="bar fill-primary" style="height:130px;"></div><div class="bar-value">68%</div><div class="bar-label">蔬菜大棚</div></div><div class="kpi-modal-bar"><div class="bar fill-success" style="height:150px;"></div><div class="bar-value">92%</div><div class="bar-label">路灯安装</div></div><div class="kpi-modal-bar"><div class="bar fill-info" style="height:75px;"></div><div class="bar-value">45%</div><div class="bar-label">智慧农业</div></div><div class="kpi-modal-bar"><div class="bar fill-warning" style="height:100px;"></div><div class="bar-value">60%</div><div class="bar-label">道路拓宽</div></div><div class="kpi-modal-bar"><div class="bar fill-purple" style="height:50px;"></div><div class="bar-value">30%</div><div class="bar-label">污水处理</div></div></div>',
    months: [],
    stats: [
      { val: '5个', label: '在建项目' },
      { val: '8个', label: '已完成项目' },
      { val: '2,860万', label: '总投资额' },
      { val: '59%', label: '总体进度' }
    ]
  }
};

function openKpiModal(type) {
  var modal = document.getElementById('kpiModal');
  var body = document.getElementById('kpiModalBody');
  var data = kpiModalData[type];
  if (!data || !modal || !body) return;

  var html = '<div class="kpi-modal-title">' + data.title + '</div>';
  html += data.chart;
  if (data.months && data.months.length > 0) {
    html += '<div style="display:flex;justify-content:space-between;padding:0 10px;margin-top:4px;">';
    data.months.forEach(function(m) {
      html += '<span style="font-size:var(--font-size-3xs);color:var(--text-muted);">' + m + '</span>';
    });
    html += '</div>';
  }
  html += '<div class="kpi-modal-stats">';
  data.stats.forEach(function(s) {
    html += '<div class="kpi-modal-stat"><div class="val">' + s.val + '</div><div class="label">' + s.label + '</div></div>';
  });
  html += '</div>';

  body.innerHTML = html;
  modal.classList.add('active');
}

function closeKpiModal() {
  var modal = document.getElementById('kpiModal');
  if (modal) modal.classList.remove('active');
}
