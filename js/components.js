/**
 * components.js — Loads shared header & footer into every page,
 * then initialises theme toggle + hamburger menu.
 * Ziyanali Saiyed Portfolio
 */
(async function () {
  'use strict';

  /* ── Detect current page for active nav link ── */
  function getActivePage() {
    const p = window.location.pathname;
    if (p === '/' || p === '/index.html') return 'home';
    if (p.startsWith('/about'))    return 'about';
    if (p.startsWith('/skills'))   return 'skills';
    if (p.startsWith('/projects')) return 'projects';
    if (p.startsWith('/contact'))  return 'contact';
    return '';
  }

  /* ── Fetch an HTML file and replace a placeholder element ── */
  async function loadComponent(url, placeholderId) {
    try {
      const res = await fetch(url);
      if (!res.ok) return;
      const html = await res.text();
      const placeholder = document.getElementById(placeholderId);
      if (!placeholder) return;
      const tmp = document.createElement('div');
      tmp.innerHTML = html;
      placeholder.replaceWith(...tmp.childNodes);
    } catch (err) {
      console.warn(`[components.js] Could not load ${url}:`, err);
    }
  }

  /* ── Load header and footer in parallel ── */
  await Promise.all([
    loadComponent('/components/header.html', 'header-placeholder'),
    loadComponent('/components/footer.html', 'footer-placeholder'),
  ]);

  /* ── Mark active nav link ── */
  const activePage = getActivePage();
  document.querySelectorAll('[data-page]').forEach(link => {
    if (link.dataset.page === activePage) {
      link.classList.add('active');
      link.setAttribute('aria-current', 'page');
    }
  });

  /* ────────────────────────
     THEME TOGGLE
  ──────────────────────── */
  const html     = document.documentElement;
  const themeBtn = document.getElementById('themeToggle');

  function applyTheme(t) {
    html.setAttribute('data-theme', t);
    if (themeBtn) themeBtn.textContent = t === 'dark' ? '☀️' : '🌙';
  }

  applyTheme(localStorage.getItem('zs-theme') || 'dark');

  themeBtn && themeBtn.addEventListener('click', () => {
    const next = html.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    localStorage.setItem('zs-theme', next);
    applyTheme(next);
  });

  /* ────────────────────────
     NAVBAR SCROLL RAISE
  ──────────────────────── */
  const navbar = document.querySelector('.navbar');
  function checkScroll() {
    navbar && navbar.classList.toggle('raised', window.scrollY > 10);
  }
  window.addEventListener('scroll', checkScroll, { passive: true });
  checkScroll();

  /* ────────────────────────
     HAMBURGER MENU
  ──────────────────────── */
  const ham    = document.getElementById('hamburger');
  const mobNav = document.getElementById('mobNav');

  ham && ham.addEventListener('click', () => {
    ham.classList.toggle('open');
    mobNav && mobNav.classList.toggle('open');
    ham.setAttribute('aria-expanded', mobNav.classList.contains('open'));
  });

  mobNav && mobNav.querySelectorAll('.mob-link').forEach(l => {
    l.addEventListener('click', () => {
      ham.classList.remove('open');
      mobNav.classList.remove('open');
      ham.setAttribute('aria-expanded', 'false');
    });
  });

})();
