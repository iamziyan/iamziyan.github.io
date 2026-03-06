/* ============================================================
   particles-config.js — tsParticles Slim (Fintech Network)
   ============================================================ */
(async function () {
    'use strict';

    // Wait for tsParticles bundle
    if (typeof tsParticles === 'undefined') {
        console.warn('tsParticles not loaded');
        return;
    }

    // Detect theme for color
    function getParticleColor() {
        const theme = document.documentElement.getAttribute('data-theme') || 'dark';
        return theme === 'light' ? '#1d4ed8' : '#3b82f6';
    }

    const config = {
        background: { color: { value: 'transparent' } },
        fullScreen: { enable: false },
        fpsLimit: 60,
        particles: {
            number: {
                value: 55,
                density: { enable: true, area: 1000 }
            },
            color: { value: getParticleColor() },
            opacity: {
                value: { min: 0.15, max: 0.45 },
                animation: {
                    enable: true,
                    speed: 0.6,
                    minimumValue: 0.1,
                    sync: false
                }
            },
            size: {
                value: { min: 1, max: 2.5 },
                animation: { enable: false }
            },
            links: {
                enable: true,
                distance: 140,
                color: getParticleColor(),
                opacity: 0.18,
                width: 1
            },
            move: {
                enable: true,
                speed: 0.6,
                direction: 'none',
                random: true,
                straight: false,
                outModes: { default: 'bounce' },
                bounce: false,
                attract: { enable: false }
            },
            shape: { type: 'circle' }
        },
        interactivity: {
            detectsOn: 'window',
            events: {
                onHover: { enable: true, mode: 'grab' },
                onClick: { enable: false },
                resize: { enable: true }
            },
            modes: {
                grab: {
                    distance: 160,
                    links: { opacity: 0.4 }
                }
            }
        },
        detectRetina: true,
        pauseOnBlur: true
    };

    try {
        await tsParticles.load({ id: 'tsparticles', options: config });
    } catch (e) {
        console.warn('tsParticles load error:', e);
    }

    // Re-color particles if theme changes
    const observer = new MutationObserver(function () {
        // Lightweight: just update link + particle color via config update
        const container = tsParticles.domItem(0);
        if (!container) return;
        const newColor = getParticleColor();
        try {
            container.options.particles.color.value = newColor;
            container.options.particles.links.color = newColor;
            container.refresh();
        } catch (_) { }
    });

    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
})();
