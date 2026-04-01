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

// ── Language Switcher ────────────────────────────────────────
(function () {
  const translations = {
    en: {
      'nav-about': 'about',
      'nav-skills': 'skills',
      'nav-experience': 'experience',
      'nav-education': 'education',
      'nav-contact': 'contact',
      'hero-greeting': 'Hello, World. I\'m',
      'hero-role': 'Linux System Engineer',
      'hero-sub': 'Automating infrastructure. Containerizing workloads. Building reliability at scale.',
      'hero-btn-contact': 'Get In Touch',
      'hero-btn-experience': 'View Experience',
      'scroll-indicator': 'scroll',
      'section-about': 'about_me',
      'about-p1': 'I am an ambitious <strong>Linux System Engineer</strong> constantly looking for opportunities for personal and professional development. Committed and dedicated, I approach my work with unwavering passion and strive for excellence in every task.',
      'about-p2': 'With experience spanning <strong>Capgemini</strong>, <strong>Accenture</strong>, and <strong>Software Mind</strong>, I\'ve built and maintained large-scale enterprise Linux infrastructures — automating everything, containerizing workloads, and keeping systems running 24/7.',
      'about-p3': 'My stack spans the full DevOps toolchain: from <strong>Ansible & Puppet</strong> for configuration management, through <strong>Docker & Kubernetes</strong> for containerization, to <strong>OpenSearch & Icinga</strong> for observability.',
      'stat-exp': 'Years of Experience',
      'stat-clients': 'Enterprise Clients',
      'stat-cert': 'RedHat Certification',
      'stat-tech': 'Tools & Technologies',
      'section-skills': 'skills',
      'section-experience': 'experience',
      'exp1-title': 'Linux System Engineer',
      'exp1-company': 'Software Mind',
      'exp1-desc': 'Part of a project transition team responsible for modernizing and maintaining a large-scale Linux-based infrastructure for an enterprise client. Focused on identifying legacy components and designing optimized, scalable, secure solutions.',
      'exp2-title': 'Linux System Engineer',
      'exp2-company': 'Accenture · Katowice',
      'exp2-desc': 'Maintained and optimized enterprise Linux environments, focusing on system reliability, security, and performance. Managed patching, vulnerability remediation, VM deployment, software upgrades, and incident resolution.',
      'exp3-title': 'Junior Infrastructure Analyst Linux/Batch',
      'exp3-company': 'Capgemini · Katowice',
      'exp3-desc': 'Provided 24/7 support and monitoring of RedHat Linux infrastructure, handling incidents and alerts to ensure system reliability.',
      'section-education': 'education_&_certs',
      'section-contact': 'contact',
      'contact-h3': 'Let\'s work together',
      'contact-p': 'Looking for a Linux engineer who knows how to build, automate, and scale? Let\'s connect.',
      'contact-email': 'Email',
      'contact-linkedin': 'LinkedIn',
      'contact-location': 'Location',
      'exp-present': 'Present',
      'cert-verify': 'Verify Certificate',
      'edu-computer-science': 'Computer Science',
      'exp1-li1': 'Automated infrastructure provisioning using AWX, Puppet and GitLab CI/CD',
      'exp1-li2': 'Managed and containerized applications with Docker and Kubernetes',
      'exp1-li3': 'Oversaw lifecycle management via Spacewalk, RedHat Satellite and Uyuni',
      'exp1-li4': 'Monitored infrastructure health with Icinga, Thruk, OpenSearch and ServiceNow workflows',
      'exp1-li5': 'Integrated services: VMware, Harbor, MessageBird, CouchDB, Lemur',
      'exp1-li6': 'Provided on-call support and resolved incidents to ensure service continuity',
      'exp2-li1': 'Automated processes using Bash, Ansible and RedHat Automation Platform',
      'exp2-li2': 'Managed VMs with OLVM and vSphere',
      'exp2-li3': 'Handled patching and vulnerability remediation across large server fleets',
      'exp2-li4': 'Collaborated with app ops, dev teams and vendors for seamless integration',
      'exp2-li5': 'Provided on-call support in high-pressure enterprise environments',
      'exp3-li1': 'Executed health checks and generated reports on infrastructure status',
      'exp3-li2': 'Performed server configuration, troubleshooting and issue resolution',
      'exp3-li3': 'Managed Autosys/Control-M batch jobs — creation, modification and execution',
      'exp3-li4': 'Ensured 24/7 on-call coverage for critical infrastructure',
      'location-value': 'Poland',
    },
    pl: {
      'nav-about': 'o-mnie',
      'nav-skills': 'umiejętności',
      'nav-experience': 'doświadczenie',
      'nav-education': 'edukacja',
      'nav-contact': 'kontakt',
      'hero-greeting': 'Cześć, Świecie. Jestem',
      'hero-role': 'Inżynier Systemów Linux',
      'hero-sub': 'Automatyzuję infrastrukturę. Konteneryzuję obciążenia. Buduję niezawodność na skalę.',
      'hero-btn-contact': 'Skontaktuj się',
      'hero-btn-experience': 'Moje doświadczenie',
      'scroll-indicator': 'przewiń',
      'section-about': 'o_mnie',
      'about-p1': 'Jestem ambitnym <strong>Inżynierem Systemów Linux</strong> stale poszukującym okazji do rozwoju osobistego i zawodowego. Zaangażowany i oddany, podchodzę do pracy z pasją i dążę do doskonałości w każdym zadaniu.',
      'about-p2': 'Z doświadczeniem zdobytym w <strong>Capgemini</strong>, <strong>Accenture</strong> i <strong>Software Mind</strong>, budowałem i utrzymywałem zaawansowane infrastruktury Linux na dużą skalę — automatyzując wszystko, konteneryzując obciążenia i zapewniając dostępność 24/7.',
      'about-p3': 'Mój stos technologiczny obejmuje pełny toolchain DevOps: od <strong>Ansible i Puppet</strong> do zarządzania konfiguracją, przez <strong>Docker i Kubernetes</strong> do konteneryzacji, po <strong>OpenSearch i Icinga</strong> do obserwacji systemów.',
      'stat-exp': 'Lat doświadczenia',
      'stat-clients': 'Klientów korporacyjnych',
      'stat-cert': 'Certyfikat RedHat',
      'stat-tech': 'Narzędzi i technologii',
      'section-skills': 'umiejętności',
      'section-experience': 'doświadczenie',
      'exp1-title': 'Inżynier Systemów Linux',
      'exp1-company': 'Software Mind',
      'exp1-desc': 'Członek zespołu przejścia projektowego, odpowiedzialny za modernizację i utrzymywanie zaawansowanej infrastruktury Linux dla klienta korporacyjnego. Fokus na identyfikacji przestarzałych komponentów i projektowaniu zoptymalizowanych, skalowalnych i bezpiecznych rozwiązań.',
      'exp2-title': 'Inżynier Systemów Linux',
      'exp2-company': 'Accenture · Katowice',
      'exp2-desc': 'Utrzymywałem i optymalizowałem korporacyjne środowiska Linux, skupiając się na niezawodności, bezpieczeństwie i wydajności. Zarządzałem łatami, remediowaniem podatności, wdrażaniem maszyn wirtualnych, aktualizacjami oprogramowania i rozwiązywaniem incydentów.',
      'exp3-title': 'Młodszy Analityk Infrastruktury Linux/Batch',
      'exp3-company': 'Capgemini · Katowice',
      'exp3-desc': 'Zapewniałem wsparcie 24/7 i monitoring infrastruktury RedHat Linux, obsługując incydenty i alerty w celu zapewnienia niezawodności systemu.',
      'section-education': 'edukacja_&_certyfikaty',
      'section-contact': 'kontakt',
      'contact-h3': 'Pracujmy razem',
      'contact-p': 'Szukasz inżyniera Linux, który wie jak budować, automatyzować i skalować? Się skontaktujmy.',
      'contact-email': 'Email',
      'contact-linkedin': 'LinkedIn',
      'contact-location': 'Lokalizacja',
      'exp-present': 'Teraz',
      'cert-verify': 'Weryfikuj certyfikat',
      'edu-computer-science': 'Informatyka',
      'exp1-li1': 'Automatyzacja inicjowania infrastruktury za pomocą AWX, Puppet i GitLab CI/CD',
      'exp1-li2': 'Zarządzanie i konteneryzacja aplikacji za pomocą Docker i Kubernetes',
      'exp1-li3': 'Nadzór nad zarządzaniem cyklem życia poprzez Spacewalk, RedHat Satellite i Uyuni',
      'exp1-li4': 'Monitorowanie zdrowia infrastruktury za pomocą Icinga, Thruk, OpenSearch i przepływów ServiceNow',
      'exp1-li5': 'Integracja usług: VMware, Harbor, MessageBird, CouchDB, Lemur',
      'exp1-li6': 'Wsparcie on-call i rozwiązywanie incydentów w celu zapewnienia ciągłości usług',
      'exp2-li1': 'Automatyzacja procesów za pomocą Bash, Ansible i RedHat Automation Platform',
      'exp2-li2': 'Zarządzanie maszynami wirtualnymi za pomocą OLVM i vSphere',
      'exp2-li3': 'Obsługa łat i remediacji podatności na dużych flotach serwerów',
      'exp2-li4': 'Współpraca z zespołami app ops, dev i dostawcami dla bezproblemowej integracji',
      'exp2-li5': 'Wsparcie on-call w środowiskach wysokiego ciśnienia korporacyjnego',
      'exp3-li1': 'Wykonywanie kontroli zdrowia i generowanie raportów stanu infrastruktury',
      'exp3-li2': 'Konfiguracja serwerów, rozwiązywanie problemów i rozwiązywanie problemy',
      'exp3-li3': 'Zarządzanie zadaniami wsadowymi Autosys/Control-M — tworzenie, modyfikowanie i wykonanie',
      'exp3-li4': 'Zapewnienie dostępności on-call 24/7 dla infrastruktury krytycznej',
      'location-value': 'Polska',
    }
  };

  let currentLang = localStorage.getItem('language') || 'en';
  
  function setLanguage(lang) {
    currentLang = lang;
    localStorage.setItem('language', lang);
    
    // Update lang buttons
    document.getElementById('lang-en').classList.toggle('active', lang === 'en');
    document.getElementById('lang-pl').classList.toggle('active', lang === 'pl');
    
    // Update HTML lang attribute
    document.documentElement.lang = lang;
    
    // Update text content
    document.querySelectorAll('[data-translate]').forEach(el => {
      const key = el.getAttribute('data-translate');
      if (translations[lang][key]) {
        if (el.tagName === 'A' && el.dataset.en) {
          el.textContent = lang === 'en' ? el.dataset.en : el.dataset.pl;
        } else {
          el.innerHTML = translations[lang][key];
        }
      }
    });
  }

  document.getElementById('lang-en').addEventListener('click', () => setLanguage('en'));
  document.getElementById('lang-pl').addEventListener('click', () => setLanguage('pl'));
  
  setLanguage(currentLang);
})();
