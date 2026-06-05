/**
 * js/app.js
 * Main script handling theme switching, mobile menu behavior,
 * and asynchronous injection of global components (header/footer).
 * Ziyanali Saiyed Portfolio
 */

(function () {
  'use strict';

  // State
  let currentTheme = localStorage.getItem('zs-theme') || 'dark';

  // 1. Initial Theme Setup (Avoid FOUC by setting this immediately)
  document.documentElement.setAttribute('data-theme', currentTheme);

  // Helper: Detect current page for active nav link
  function getActivePage() {
    const path = window.location.pathname;
    if (path === '/' || path === '/index.html') return 'home';
    if (path.includes('/about/')) return 'about';
    if (path.includes('/skills/')) return 'skills';
    if (path.includes('/projects/')) return 'projects';
    if (path.includes('/contact/')) return 'contact';
    return '';
  }

  // 2. Fetch and Inject Shared Components
  async function loadComponent(url, placeholderId) {
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const html = await response.text();
      const placeholder = document.getElementById(placeholderId);
      if (placeholder) {
        placeholder.innerHTML = html;
        return true;
      }
    } catch (error) {
      console.error(`[app.js] Error loading component ${url}:`, error);
    }
    return false;
  }

  // 3. Initialize Theme UI & Button Listeners
  function initThemeToggle() {
    const themeBtn = document.getElementById('themeToggle');
    if (!themeBtn) return;

    const sunIcon = document.getElementById('theme-icon-sun');
    const moonIcon = document.getElementById('theme-icon-moon');

    // Update SVG icon visibility based on active theme
    function updateThemeIcons(theme) {
      if (theme === 'dark') {
        if (sunIcon) sunIcon.style.display = 'block';
        if (moonIcon) moonIcon.style.display = 'none';
      } else {
        if (sunIcon) sunIcon.style.display = 'none';
        if (moonIcon) moonIcon.style.display = 'block';
      }
    }

    // Initial setup for icons
    updateThemeIcons(currentTheme);

    // Toggle click event
    themeBtn.addEventListener('click', () => {
      const newTheme = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', newTheme);
      localStorage.setItem('zs-theme', newTheme);
      currentTheme = newTheme;
      updateThemeIcons(newTheme);
    });
  }

  // 4. Initialize Responsive Mobile Menu
  function initMobileMenu() {
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');

    if (!hamburger || !navMenu) return;

    hamburger.addEventListener('click', () => {
      const isOpen = navMenu.classList.toggle('open');
      hamburger.classList.toggle('open', isOpen);
      hamburger.setAttribute('aria-expanded', isOpen);
    });

    // Close menu when clicking outside or on a link
    document.addEventListener('click', (event) => {
      const isClickInsideMenu = navMenu.contains(event.target);
      const isClickOnHamburger = hamburger.contains(event.target);

      if (!isClickInsideMenu && !isClickOnHamburger && navMenu.classList.contains('open')) {
        navMenu.classList.remove('open');
        hamburger.classList.remove('open');
        hamburger.setAttribute('aria-expanded', 'false');
      }
    });
  }

  // 5. Highlight Active Link in Navbar
  function highlightActiveNav() {
    const activePage = getActivePage();
    const navLinks = document.querySelectorAll('.nav-links a');
    
    navLinks.forEach(link => {
      if (link.getAttribute('data-page') === activePage) {
        link.classList.add('active');
        link.setAttribute('aria-current', 'page');
      } else {
        link.classList.remove('active');
        link.removeAttribute('aria-current');
      }
    });
  }

  // 6. Initialize Footer Elements (dynamic year)
  function initFooter() {
    const yearEl = document.getElementById('year');
    if (yearEl) {
      yearEl.textContent = new Date().getFullYear();
    }
  }

  // Main Orchestrator
  document.addEventListener('DOMContentLoaded', async () => {
    // Load header and footer in parallel
    const [headerLoaded, footerLoaded] = await Promise.all([
      loadComponent('/components/header.html', 'header-placeholder'),
      loadComponent('/components/footer.html', 'footer-placeholder')
    ]);

    if (headerLoaded) {
      initThemeToggle();
      initMobileMenu();
      highlightActiveNav();
    }

    if (footerLoaded) {
      initFooter();
    }
  });

})();
