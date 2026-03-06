/* ============================================================
   main.js — Scroll behavior, IntersectionObserver, Navbar,
              About code snippet animation
   ============================================================ */
(function () {
    'use strict';

    /* ---- Navbar scroll state ---- */
    const navbar = document.getElementById('navbar');
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section[id]');
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-links');

    // Add "scrolled" class to navbar
    window.addEventListener('scroll', function () {
        if (navbar) {
            navbar.classList.toggle('scrolled', window.scrollY > 20);
        }
        updateActiveLink();
    }, { passive: true });

    // Highlight active nav link based on scroll position
    function updateActiveLink() {
        let currentId = '';
        sections.forEach(function (sec) {
            const top = sec.offsetTop - 80;
            if (window.scrollY >= top) {
                currentId = sec.getAttribute('id');
            }
        });
        navLinks.forEach(function (link) {
            link.classList.toggle('active',
                link.getAttribute('href') === '#' + currentId
            );
        });
    }

    // Call once on load
    updateActiveLink();

    /* ---- Hamburger toggle ---- */
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function () {
            const isOpen = hamburger.classList.toggle('open');
            navMenu.classList.toggle('open', isOpen);
            hamburger.setAttribute('aria-expanded', String(isOpen));
        });

        // Close on nav link click (mobile)
        navMenu.querySelectorAll('.nav-link').forEach(function (link) {
            link.addEventListener('click', function () {
                hamburger.classList.remove('open');
                navMenu.classList.remove('open');
                hamburger.setAttribute('aria-expanded', 'false');
            });
        });

        // Close on outside click
        document.addEventListener('click', function (e) {
            if (!navbar.contains(e.target) && navMenu.classList.contains('open')) {
                hamburger.classList.remove('open');
                navMenu.classList.remove('open');
                hamburger.setAttribute('aria-expanded', 'false');
            }
        });
    }

    /* ---- IntersectionObserver — scroll reveal ---- */
    const revealEls = document.querySelectorAll('.reveal');
    if (revealEls.length && 'IntersectionObserver' in window) {
        const revealObserver = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    revealObserver.unobserve(entry.target); // fire once
                }
            });
        }, {
            threshold: 0.12,
            rootMargin: '0px 0px -48px 0px'
        });

        revealEls.forEach(function (el) {
            revealObserver.observe(el);
        });
    } else {
        // Fallback — show all immediately
        revealEls.forEach(function (el) { el.classList.add('is-visible'); });
    }

    /* ---- About code panel: animated JSON render ---- */
    const codeEl = document.querySelector('#about-code-snippet code');
    if (codeEl) {
        const profile = {
            name: 'Ziyanali Saiyed',
            role: 'BCA Student',
            location: 'Anand, Gujarat, India',
            focus: ['Fintech', 'IT Systems', 'Backend Development'],
            skills: ['JavaScript', 'SQL', 'HTML5', 'CSS3', 'C/C++'],
            interests: ['Financial Markets', 'System Architecture', 'Clean Code'],
            status: 'Open to Opportunities',
            github: 'iamziyan',
        };

        const json = JSON.stringify(profile, null, 2);

        // Syntax highlight
        function highlight(text) {
            return text
                // strings (values)
                .replace(/"([^"]+)"(?=\s*[,}\]])/g, '<span class="json-str">"$1"</span>')
                // keys
                .replace(/"([^"]+)"(?=\s*:)/g, '<span class="json-key">"$1"</span>')
                // numbers
                .replace(/\b(\d+\.?\d*)\b/g, '<span class="json-num">$1</span>')
                // booleans
                .replace(/\b(true|false)\b/g, '<span class="json-bool">$1</span>')
                // null
                .replace(/\bnull\b/g, '<span class="json-null">null</span>');
        }

        // Reveal code only when about section is visible
        const aboutPanel = document.querySelector('.about-code-panel');
        if (aboutPanel && 'IntersectionObserver' in window) {
            const panelObserver = new IntersectionObserver(function (entries) {
                if (entries[0].isIntersecting) {
                    codeEl.innerHTML = highlight(json);
                    panelObserver.disconnect();
                }
            }, { threshold: 0.2 });
            panelObserver.observe(aboutPanel);
        } else {
            codeEl.innerHTML = highlight(json);
        }
    }
})();
