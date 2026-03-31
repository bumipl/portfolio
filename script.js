/* ============================================================
   script.js · Matrix BG + Typewriter + Scroll Animations
   ============================================================ */

// ── Matrix rain background ──────────────────────────────────
(function () {
  const canvas = document.getElementById('matrix-bg');
  const ctx = canvas.getContext('2d');
  const chars = '01アイウエオカキクケコサシスセソタチツテトABCDEF0123456789:/\\[]{}#$%@!';
  let drops = [];

  function resize() {
    canvas.width  = window.innerWidth;
    canvas.height = window.innerHeight;
    const cols = Math.floor(canvas.width / 16);
    drops = Array.from({ length: cols }, () => Math.random() * -100);
  }

  function draw() {
    ctx.fillStyle = 'rgba(13,17,23,0.05)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = '#39d353';
    ctx.font = '14px JetBrains Mono, monospace';
    drops.forEach((y, i) => {
      const ch = chars[Math.floor(Math.random() * chars.length)];
      ctx.fillText(ch, i * 16, y * 16);
      if (y * 16 > canvas.height && Math.random() > 0.975) drops[i] = 0;
      drops[i]++;
    });
  }

  resize();
  window.addEventListener('resize', resize);
  setInterval(draw, 55);
})();

// ── Hamburger nav ────────────────────────────────────────────
document.getElementById('hamburger').addEventListener('click', () => {
  document.querySelector('.nav-links').classList.toggle('open');
});

// ── Typewriter hero terminal ─────────────────────────────────
(function () {
  const out = document.getElementById('typewriter-output');
  const blinkLine = document.getElementById('blink-prompt');

  const lines = [
    '<span class="brkt">{</span>',
    '  <span class="key">"name"</span>:  <span class="str">"Bartłomiej Szala"</span>,',
    '  <span class="key">"role"</span>:  <span class="str">"Linux System Engineer"</span>,',
    '  <span class="key">"cert"</span>:  <span class="str">"RHCSA"</span>,',
    '  <span class="key">"stack"</span>: <span class="brkt">[</span>',
    '    <span class="str">"Linux"</span>, <span class="str">"Docker"</span>,',
    '    <span class="str">"Kubernetes"</span>, <span class="str">"Ansible"</span>,',
    '    <span class="str">"Puppet"</span>, <span class="str">"AWX"</span>',
    '  <span class="brkt">]</span>,',
    '  <span class="key">"available"</span>: <span class="val">true</span>',
    '<span class="brkt">}</span>',
  ];

  let lineIdx = 0;
  blinkLine.style.display = 'none';

  function typeLine() {
    if (lineIdx >= lines.length) {
      blinkLine.style.display = 'block';
      return;
    }
    const span = document.createElement('div');
    span.innerHTML = lines[lineIdx++];
    out.appendChild(span);
    // small delay between lines
    setTimeout(typeLine, 120);
  }

  // start after 800ms
  setTimeout(typeLine, 800);
})();

// ── Scroll-reveal ────────────────────────────────────────────
(function () {
  const targets = document.querySelectorAll(
    '.stat-card, .skill-category, .timeline-card, .edu-card, .lang-card, .contact-card, .about-text, .about-stats'
  );
  targets.forEach(el => el.classList.add('reveal'));

  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.12 });

  targets.forEach(el => io.observe(el));
})();

// ── Active nav link highlight ────────────────────────────────
(function () {
  const sections = document.querySelectorAll('section[id]');
  const links    = document.querySelectorAll('.nav-links a');

  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        links.forEach(l => l.classList.remove('active'));
        const active = document.querySelector(`.nav-links a[href="#${e.target.id}"]`);
        if (active) active.classList.add('active');
      }
    });
  }, { threshold: 0.4 });

  sections.forEach(s => io.observe(s));
})();
