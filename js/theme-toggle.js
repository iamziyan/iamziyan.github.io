/* ============================================================
   theme-toggle.js — Dark / Light Mode with localStorage
   ============================================================ */
(function () {
    'use strict';

    const STORAGE_KEY = 'portfolio-theme';
    const html = document.documentElement;
    const themeBtn = document.getElementById('theme-toggle');
    const themeIcon = document.getElementById('theme-icon');

    // Determine initial theme: stored > OS preference > dark
    function getPreferredTheme() {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored === 'light' || stored === 'dark') return stored;
        return window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
    }

    function applyTheme(theme) {
        html.setAttribute('data-theme', theme);
        if (themeIcon) {
            themeIcon.className = theme === 'dark' ? 'fa-solid fa-moon' : 'fa-solid fa-sun';
        }
        localStorage.setItem(STORAGE_KEY, theme);
    }

    // Apply on load
    applyTheme(getPreferredTheme());

    // Toggle on button click
    if (themeBtn) {
        themeBtn.addEventListener('click', function () {
            const current = html.getAttribute('data-theme') || 'dark';
            const next = current === 'dark' ? 'light' : 'dark';

            // Spin animation
            if (themeIcon) {
                themeIcon.classList.add('spin');
                themeIcon.addEventListener('animationend', function () {
                    themeIcon.classList.remove('spin');
                }, { once: true });
            }

            applyTheme(next);
        });
    }

    // Sync across tabs
    window.addEventListener('storage', function (e) {
        if (e.key === STORAGE_KEY && (e.newValue === 'dark' || e.newValue === 'light')) {
            applyTheme(e.newValue);
        }
    });
})();
