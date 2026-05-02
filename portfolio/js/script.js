// portfolio/js/script.js

document.addEventListener('DOMContentLoaded', () => {
    // --- Theme Toggle Logic ---
    const themeToggleBtn = document.getElementById('theme-toggle');
    const htmlElement = document.documentElement;
    const themeIconPath = document.getElementById('theme-icon-path');

    // SVGs for icons
    const sunIcon = "M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z";
    const moonIcon = "M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z";

    // Check local storage for theme
    const currentTheme = localStorage.getItem('theme') ? localStorage.getItem('theme') : null;

    if (currentTheme) {
        htmlElement.setAttribute('data-theme', currentTheme);
        if (themeIconPath) {
            themeIconPath.setAttribute('d', currentTheme === 'light' ? moonIcon : sunIcon);
        }
    } else {
        // Default to dark if no setting
        if (themeIconPath) {
             themeIconPath.setAttribute('d', sunIcon);
        }
    }

    if (themeToggleBtn) {
        themeToggleBtn.addEventListener('click', () => {
            let theme = htmlElement.getAttribute('data-theme');

            if (theme === 'light') {
                htmlElement.removeAttribute('data-theme');
                localStorage.setItem('theme', 'dark');
                if (themeIconPath) themeIconPath.setAttribute('d', sunIcon);
            } else {
                htmlElement.setAttribute('data-theme', 'light');
                localStorage.setItem('theme', 'light');
                if (themeIconPath) themeIconPath.setAttribute('d', moonIcon);
            }
        });
    }

    // --- Mobile Menu Logic ---
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const navLinks = document.getElementById('nav-links');

    if (mobileMenuBtn && navLinks) {
        mobileMenuBtn.addEventListener('click', () => {
            navLinks.classList.toggle('active');

            // Toggle icon (hamburger vs close) could go here
        });
    }

    // --- Active Link Logic ---
    const currentPath = window.location.pathname;
    const navItems = document.querySelectorAll('.nav-links a');

    navItems.forEach(link => {
        const linkPath = link.getAttribute('href');

        // Root path handling
        if (linkPath === '/' || linkPath === '/index.html' || linkPath === '../index.html') {
            if (currentPath.endsWith('/') || currentPath.endsWith('/index.html') && !currentPath.includes('/about/') && !currentPath.includes('/skills/') && !currentPath.includes('/projects/') && !currentPath.includes('/contact/')) {
                link.classList.add('active');
            }
        } else {
            // Check if current path contains the link's directory
            const cleanLinkPath = linkPath.replace(/\.\.\//g, '').split('/')[0];
            if (currentPath.includes(`/${cleanLinkPath}/`)) {
                link.classList.add('active');
            }
        }
    });

    // --- Form Submission Prevention (for demo) ---
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            alert('Thank you for your message! This is a demo so the form does not actually send an email.');
            contactForm.reset();
        });
    }
});