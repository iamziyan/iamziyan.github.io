/* ============================================================
   parallax.js — Subtle Scroll Parallax on Hero Grid/Glass Layer
   ============================================================ */
(function () {
    'use strict';

    const heroGrid = document.querySelector('.hero-grid');
    const heroGlass = document.querySelector('.hero-glass-layer');
    const hero = document.querySelector('.hero');
    if (!heroGrid && !heroGlass) return;

    // Only run when hero is in view
    let heroHeight = hero ? hero.offsetHeight : window.innerHeight;
    let ticking = false;

    function onScroll() {
        if (!ticking) {
            window.requestAnimationFrame(updateParallax);
            ticking = true;
        }
    }

    function updateParallax() {
        const scrollY = window.scrollY;
        // Only apply within hero zone
        if (scrollY <= heroHeight) {
            // Grid moves at 20% scroll speed (slower than foreground = parallax illusion)
            if (heroGrid) {
                heroGrid.style.transform = `translateY(${scrollY * 0.20}px)`;
            }
            // Glass layer moves at 12% (even slower, deeper)
            if (heroGlass) {
                heroGlass.style.transform = `translateX(-50%) translateY(${scrollY * 0.12}px)`;
            }
        }
        ticking = false;
    }

    window.addEventListener('scroll', onScroll, { passive: true });

    // Recalculate on resize
    window.addEventListener('resize', function () {
        heroHeight = hero ? hero.offsetHeight : window.innerHeight;
    });

    // Respect reduced motion
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        window.removeEventListener('scroll', onScroll);
    }
})();
