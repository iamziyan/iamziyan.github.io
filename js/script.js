/**
 * script.js — Shared JS for all pages
 * Ziyanali Saiyed Portfolio
 */
(function () {
  'use strict';

  /* ────────────────────────
     THEME
  ──────────────────────── */
  const html = document.documentElement;
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
  const ham   = document.getElementById('hamburger');
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
    });
  });

  /* ────────────────────────
     PARTICLE CANVAS (Home)
  ──────────────────────── */
  const canvas = document.getElementById('particleCanvas');
  if (canvas) {
    const ctx = canvas.getContext('2d');
    let pts = [], raf;

    function resize() {
      canvas.width  = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    }
    resize();
    window.addEventListener('resize', () => { resize(); buildPts(); });

    function Pt() {
      this.x  = Math.random() * canvas.width;
      this.y  = Math.random() * canvas.height;
      this.vx = (Math.random() - .5) * .35;
      this.vy = (Math.random() - .5) * .35;
      this.r  = Math.random() * 1.4 + .4;
      this.a  = Math.random() * .45 + .08;
    }

    function buildPts() {
      pts = Array.from({ length: Math.min(Math.floor(canvas.width * canvas.height / 12000), 80) }, () => new Pt());
    }
    buildPts();

    let mx = -999, my = -999;
    document.addEventListener('mousemove', e => { mx = e.clientX; my = e.clientY; });

    function draw() {
      const light = html.getAttribute('data-theme') === 'light';
      const nc = light ? '0,120,200' : '96,165,250';
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      pts.forEach(p => {
        p.x = ((p.x + p.vx) + canvas.width)  % canvas.width;
        p.y = ((p.y + p.vy) + canvas.height) % canvas.height;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${nc},${p.a})`;
        ctx.fill();
      });

      for (let i = 0; i < pts.length; i++) {
        for (let j = i + 1; j < pts.length; j++) {
          const d = Math.hypot(pts[i].x - pts[j].x, pts[i].y - pts[j].y);
          if (d < 130) {
            ctx.beginPath();
            ctx.moveTo(pts[i].x, pts[i].y);
            ctx.lineTo(pts[j].x, pts[j].y);
            ctx.strokeStyle = `rgba(${nc},${.12 * (1 - d / 130)})`;
            ctx.lineWidth = .5;
            ctx.stroke();
          }
        }
        const dm = Math.hypot(pts[i].x - mx, pts[i].y - my);
        if (dm < 160) {
          ctx.beginPath();
          ctx.moveTo(pts[i].x, pts[i].y);
          ctx.lineTo(mx, my);
          ctx.strokeStyle = `rgba(34,211,238,${.28 * (1 - dm / 160)})`;
          ctx.lineWidth = .6;
          ctx.stroke();
        }
      }
      raf = requestAnimationFrame(draw);
    }

    // Pause when off-screen
    const obs = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting) { if (!raf) draw(); }
      else { cancelAnimationFrame(raf); raf = null; }
    });
    obs.observe(canvas);
    draw();
  }

  /* ────────────────────────
     TYPING EFFECT (Home)
  ──────────────────────── */
  const typingEl = document.getElementById('typingText');
  if (typingEl) {
    const phrases = [
      'web applications.',
      'FinTech solutions.',
      'database systems.',
      'clean interfaces.',
      'powerful backends.'
    ];
    let pi = 0, ci = 0, del = false;
    function type() {
      const ph = phrases[pi];
      typingEl.textContent = del ? ph.slice(0, --ci) : ph.slice(0, ++ci);
      if (!del && ci === ph.length) { del = true; setTimeout(type, 2200); return; }
      if (del && ci === 0)          { del = false; pi = (pi + 1) % phrases.length; }
      setTimeout(type, del ? 45 : 85);
    }
    type();
  }

  /* ────────────────────────
     SKILL BARS (Skills page)
  ──────────────────────── */
  const bars = document.querySelectorAll('.bar-f[data-w]');
  if (bars.length) {
    const barObs = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.style.width = e.target.dataset.w + '%';
          barObs.unobserve(e.target);
        }
      });
    }, { threshold: .3 });
    bars.forEach(b => barObs.observe(b));
  }

  /* ────────────────────────
     SCROLL REVEAL
  ──────────────────────── */
  const reveals = document.querySelectorAll('.reveal');
  if (reveals.length) {
    const revObs = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) { e.target.classList.add('in'); revObs.unobserve(e.target); }
      });
    }, { threshold: .1 });
    reveals.forEach(el => revObs.observe(el));
  }

  /* ────────────────────────
     CONTACT FORM
  ──────────────────────── */
  const form = document.getElementById('contactForm');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      const btn = document.getElementById('submitBtn');
      const msg = document.getElementById('formOk');
      btn.disabled = true;
      btn.textContent = 'Sending…';
      setTimeout(() => {
        form.reset();
        btn.disabled = false;
        btn.innerHTML = 'Send Message <span class="btn-icon">→</span>';
        if (msg) { msg.style.display = 'block'; setTimeout(() => msg.style.display = 'none', 5000); }
      }, 1500);
    });
  }

  /* ────────────────────────
     RESUME BUTTON
  ──────────────────────── */
  const resumeBtn = document.getElementById('resumeBtn');
  resumeBtn && resumeBtn.addEventListener('click', e => {
    e.preventDefault();
    alert('Resume download coming soon!');
  });

})();
