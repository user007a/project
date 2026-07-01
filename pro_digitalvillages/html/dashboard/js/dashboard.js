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
