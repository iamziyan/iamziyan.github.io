# Ziyanali Saiyed — Personal Portfolio

[![GitHub Pages](https://img.shields.io/badge/Deployed%20on-GitHub%20Pages-blue?style=for-the-badge&logo=github)](https://iamziyan.github.io/)
[![Tech Stack](https://img.shields.io/badge/Stack-HTML5%20%7C%20CSS3%20%7C%20JS%20(Vanilla)-orange?style=for-the-badge)](https://iamziyan.github.io/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](LICENSE)

Welcome to the repository for my personal portfolio website. This website serves as a digital resume, showcase of my projects, and a hub for recruiters or collaborators to get in touch with me.

🔗 **Live Link:** [https://iamziyan.github.io/](https://iamziyan.github.io/)

---

## 👤 About Me
I am a **Bachelor of Computer Applications (BCA)** student at SEMCOM, Gujarat (Graduating 2027), and an aspiring **IT & FinTech Professional**. I have a strong interest in transaction workflows, reliable systems, and database design.

- **Programming:** PHP, JavaScript, SQL
- **Web Technologies:** HTML5, CSS3, ES6 Javascript
- **Database:** MySQL
- **Tools:** Git, GitHub, File Handling, Console Programming

---

## 🌟 Key Features of the Portfolio

- **Modern Glassmorphic Design:** Sleek dark-mode first design using modern CSS variables, harmonious color palettes, fluid gradients, and dynamic layout systems.
- **Dynamic Theme Switcher:** Fully functional dark and light theme toggle with persistent configuration using browser `localStorage`.
- **Interactive Canvas Particles:** Custom lightweight particle animation background on the landing page that reacts to mouse hover and movement.
- **Typed Hero Subtitles:** Automated dynamic typing effect in the landing header highlighting key focus areas (web apps, FinTech, database systems, backends).
- **Asynchronous Component Injection:** Modular component loader (`components.js`) that dynamically loads shared UI elements (Header & Footer) across different subpages to keep codebase clean and DRY (Don't Repeat Yourself).
- **Fully Responsive Navigation:** Accessible navigation layout containing dynamic mobile menu toggling (hamburger button) with state-tracking ARIA attributes.
- **Interactive Skill Progress Bars:** Micro-animations that animate progress bars when they scroll into view (using `IntersectionObserver`).
- **Interactive Contact Form:** Simulated message submission form with state change indicators.

---

## 📁 Repository Structure

```text
iamziyan.github.io/
├── index.html            # Main home/landing page
├── about/
│   └── index.html        # "About Me" page detailing my background
├── skills/
│   └── index.html        # Interactive skills breakdown and ratings
├── projects/
│   └── index.html        # Catalog of active software projects
├── contact/
│   └── index.html        # Interactive contact form
├── cv/
│   └── resume.html       # Web-based printable resume / CV
├── components/           # Shared HTML page chunks loaded asynchronously
│   ├── header.html       # Global navigation bar & theme toggle
│   └── footer.html       # Global footer containing social links
├── css/
│   ├── main.css          # Main styling sheet with glassmorphic layout
│   └── theme.css         # Theme specific CSS variables (light/dark colors)
├── js/
│   ├── components.js     # Shared header/footer loader, hamburger, theme toggler
│   └── script.js         # Canvas particles, typing animation, skill progress, forms
└── assets/               # Local static assets
    ├── favicon.svg       # Brand icon
    └── resume.pdf        # Downloadable offline resume
```

---

## 🛠️ Local Development & Running

Because the website utilizes `fetch()` inside `components.js` to load the common header and footer blocks, opening the files directly in a web browser using the `file://` protocol will cause CORS policy errors. 

To run the site locally, you must serve it over HTTP:

### Option 1: Live Server (VS Code)
If using VS Code, install the **Live Server** extension, right-click `index.html` and select **Open with Live Server**.

### Option 2: Python HTTP Server (Command Line)
Navigate to the project root directory and run:
```bash
# For Python 3.x
python -m http-server 8000

# For Python 2.x
python -m SimpleHTTPServer 8000
```
Then visit `http://localhost:8000` in your web browser.

### Option 3: Node.js static server
If you have Node.js and `npm` installed:
```bash
npx http-server -p 8000
```
Then visit `http://localhost:8000` in your web browser.

---

## 🚀 Showcased Projects

### [Nestify — Hostel Management System](https://github.com/iamziyan/Nestify)
*   **Tech Stack:** PHP + MySQL
*   **Description:** Features robust database design, transaction safety, and role-based views for managing hostel registration, allocations, and user workflows.

### [SportDeck — Sports Tournament Management](https://github.com/iamziyan/SportDeck)
*   **Tech Stack:** Console + File Handling (C++ / Python)
*   **Description:** An application for scheduling matches, tracking scores, and generating team standings using standard data persistence patterns.

---

## 📬 Contact
- **Email:** [ziyanalivsaiyed22104@gmail.com](mailto:ziyanalivsaiyed22104@gmail.com)
- **LinkedIn:** [linkedin.com/in/ziyanalisaiyed](https://www.linkedin.com/in/ziyanalisaiyed/)
- **Phone:** +91 9316825425
- **Location:** Anand, Gujarat, India
