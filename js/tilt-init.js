/* ============================================================
   tilt-init.js — Vanilla Tilt Init (subtle 3D card tilt)
   ============================================================ */
(function () {
    'use strict';

    function initTilt() {
        if (typeof VanillaTilt === 'undefined') {
            console.warn('VanillaTilt not loaded');
            return;
        }

        // Respect reduced motion
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

        // Skill cards — max 8°
        VanillaTilt.init(document.querySelectorAll('.skill-card[data-tilt]'), {
            max: 8,
            speed: 400,
            glare: false,
            scale: 1.02,
            perspective: 800
        });

        // Project card — max 5°
        VanillaTilt.init(document.querySelectorAll('.project-card[data-tilt]'), {
            max: 5,
            speed: 500,
            glare: false,
            scale: 1.01,
            perspective: 1000
        });
    }

    // VanillaTilt is loaded synchronously, so can init immediately
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initTilt);
    } else {
        initTilt();
    }
})();
