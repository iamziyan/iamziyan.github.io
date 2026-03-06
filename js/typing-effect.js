/* ============================================================
   typing-effect.js — Hero Terminal Typing Animation
   ============================================================ */
(function () {
    'use strict';

    const commandEl = document.getElementById('typed-command');
    const outputEl = document.getElementById('terminal-output');
    if (!commandEl || !outputEl) return;

    const COMMAND = 'whoami';
    const OUTPUT_LINES = [
        '<span style="color:#3b82f6">›</span> BCA Student',
        '<span style="color:#06b6d4">›</span> Aspiring Fintech &amp; Systems Engineer',
        '<span style="color:#facc15">›</span> Anand, Gujarat, India 🇮🇳',
    ];

    let charIndex = 0;
    let phase = 'typing'; // 'typing' | 'pause' | 'output'
    let outputIndex = 0;

    // Cursor element (injected inline in command)
    const cursor = document.createElement('span');
    cursor.className = 'cursor';
    cursor.setAttribute('aria-hidden', 'true');

    function typeChar() {
        if (charIndex < COMMAND.length) {
            commandEl.textContent = COMMAND.slice(0, charIndex + 1);
            commandEl.appendChild(cursor);
            charIndex++;
            setTimeout(typeChar, 90 + Math.random() * 60);
        } else {
            phase = 'pause';
            commandEl.appendChild(cursor);
            setTimeout(showOutput, 700);
        }
    }

    function showOutput() {
        cursor.remove();
        appendOutputLine(outputIndex);
    }

    function appendOutputLine(idx) {
        if (idx >= OUTPUT_LINES.length) return;
        const line = document.createElement('span');
        line.className = 'out-line';
        line.innerHTML = OUTPUT_LINES[idx];
        line.style.animationDelay = (idx * 0.18) + 's';
        outputEl.appendChild(line);

        if (idx + 1 < OUTPUT_LINES.length) {
            setTimeout(() => appendOutputLine(idx + 1), 280);
        }
    }

    // Start after a small delay (let hero fade in)
    const DELAY = 1200;
    setTimeout(function () {
        commandEl.appendChild(cursor);
        setTimeout(typeChar, 400);
    }, DELAY);
})();
