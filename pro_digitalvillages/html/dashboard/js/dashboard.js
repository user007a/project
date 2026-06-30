/**
 * Digital Village Dashboard - Interactive Logic
 * Real-time datetime, tab switching, fullscreen, auto-carousel, tooltips, filter bar
 */

(function () {
  'use strict';

  /* ---- Real-time DateTime ---- */
  var dateTextEl = document.querySelector('.date-badge .date-text');
  var weekTextEl = document.querySelector('.date-badge .week-text');
  var timeTextEl = document.querySelector('.time-display .time-text');

  function updateDateTime() {
    var now = new Date();
    var y = now.getFullYear();
    var m = String(now.getMonth() + 1).padStart(2, '0');
    var d = String(now.getDate()).padStart(2, '0');
    var weekNames = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'];
    var week = weekNames[now.getDay()];

    var hh = String(now.getHours()).padStart(2, '0');
    var mm = String(now.getMinutes()).padStart(2, '0');
    var ss = String(now.getSeconds()).padStart(2, '0');

    if (dateTextEl) dateTextEl.textContent = y + '年' + m + '月' + d + '日';
    if (weekTextEl) weekTextEl.textContent = week;
    if (timeTextEl) timeTextEl.textContent = hh + ':' + mm + ':' + ss;
  }

  updateDateTime();
  setInterval(updateDateTime, 1000);

  /* ---- Tab Switching ---- */
  var tabs = document.querySelectorAll('.tab-nav li');
  var sections = document.querySelectorAll('.section');
  var currentTabIndex = 0;

  function switchTab(index) {
    if (index < 0 || index >= tabs.length) return;
    currentTabIndex = index;

    tabs.forEach(function (tab, i) {
      tab.classList.toggle('active', i === index);
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
    });
  });

  document.querySelectorAll('.btn-filter-reset').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var bar = this.closest('.filter-bar');
      if (!bar) return;
      bar.querySelectorAll('.filter-select').forEach(function (s) { s.selectedIndex = 0; });
      bar.querySelectorAll('.filter-group').forEach(function (g) { g.classList.remove('filter-changed'); });
    });
  });

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
