# Ziyanali Saiyed — Portfolio 2.0

A clean, professional single-page portfolio built with **vanilla HTML, CSS, and JavaScript** — no frameworks, no build tools required.

## 🚀 Features

- **Dark / Light mode** — toggle in navbar, persists via `localStorage`
- **tsParticles** — subtle fintech network graph background in hero
- **Scroll parallax** — hero grid moves at 20% scroll speed
- **Typing terminal** — animated `whoami` command in hero
- **Vanilla Tilt** — subtle 3D card tilt on skill and project cards
- **IntersectionObserver** — fade + slide-up reveal on all sections
- **Animated JSON panel** — `profile.json` code viewer in About
- **Responsive** — mobile hamburger nav, fluid typography, adaptive grids
- **Accessible** — ARIA labels, roles, reduced-motion support

## 📁 Structure

```
portfolio/
├── index.html
├── css/
│   ├── theme.css          ← CSS custom properties (dark/light)
│   ├── main.css           ← reset, typography, layout utils
│   ├── navbar.css         ← sticky nav + hamburger
│   ├── hero.css           ← hero section
│   ├── sections.css       ← about, skills, projects, stats, connect
│   └── animations.css     ← keyframes + scroll reveals
├── js/
│   ├── theme-toggle.js    ← dark/light toggle with localStorage
│   ├── particles-config.js← tsParticles init
│   ├── typing-effect.js   ← hero terminal animation
│   ├── parallax.js        ← hero scroll parallax
│   ├── tilt-init.js       ← vanilla-tilt card init
│   └── main.js            ← scroll, observer, navbar, about panel
├── assets/
│   └── favicon.svg        ← Z monogram SVG
└── README.md
```

## 🛠 Run Locally

No build step required. Just open `index.html` in a browser — or use a local server for best results:

```bash
# Using Python 3
python3 -m http.server 3000

# Or using VS Code Live Server extension
# Or: npx serve .
```

Then visit `http://localhost:3000`

## 🌐 Deploy

GitHub Pages or Netlify drag-and-drop — works as a static site directly.

## 📦 External Libraries (CDN)

| Library            | Version | Purpose                    |
|--------------------|---------|----------------------------|
| tsParticles Slim   | v3      | Hero particle background   |
| Vanilla Tilt       | v1.8.1  | 3D card tilt effect        |
| Font Awesome       | v6.5.1  | Icons                      |
| Google Fonts       | —       | JetBrains Mono + Inter     |

## 🎨 Color Palette

| Token           | Dark Mode     | Light Mode     |
|-----------------|---------------|----------------|
| Background      | `#0a0e17`     | `#f8fafc`      |
| Accent Blue     | `#3b82f6`     | `#1d4ed8`      |
| Accent Cyan     | `#06b6d4`     | `#0891b2`      |
| Accent Gold     | `#facc15`     | `#d97706`      |
| Text Primary    | `#e2e8f0`     | `#0f172a`      |

---

© 2025–2026 Ziyanali Saiyed — Building reliable systems step by step 🚀
