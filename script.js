function updateYear() {
  const el = document.getElementById('year');
  if (el) el.textContent = new Date().getFullYear();
}
updateYear();

/* ---------------- theme toggle ---------------- */
const themeToggle = document.getElementById('themeToggle');
const systemTheme = () => (window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark');
const storedTheme = localStorage.getItem('theme');
if (storedTheme) document.documentElement.setAttribute('data-theme', storedTheme);
themeToggle.addEventListener('click', () => {
  const current = document.documentElement.getAttribute('data-theme') || systemTheme();
  const next = current === 'light' ? 'dark' : 'light';
  document.documentElement.setAttribute('data-theme', next);
  localStorage.setItem('theme', next);
});

// navbar background on scroll
const navbar = document.getElementById('navbar');
const onScroll = () => navbar.classList.toggle('scrolled', window.scrollY > 12);
onScroll();
window.addEventListener('scroll', onScroll, { passive: true });

// mobile nav toggle
const navToggle = document.getElementById('navToggle');
const navLinks = document.querySelector('.nav-links');
navToggle.addEventListener('click', () => navLinks.classList.toggle('open'));
navLinks.querySelectorAll('a').forEach((a) =>
  a.addEventListener('click', () => navLinks.classList.remove('open'))
);

// scroll-reveal
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
if (reduceMotion) {
  document.querySelectorAll('.reveal').forEach((el) => el.classList.add('in-view'));
} else {
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          io.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15, rootMargin: '0px 0px -40px 0px' }
  );
  document.querySelectorAll('.reveal').forEach((el) => io.observe(el));
}

/* ---------------- i18n ---------------- */
const translations = {
  en: {
    'nav.about': 'about', 'nav.skills': 'skills', 'nav.projects': 'projects',
    'nav.experience': 'experience', 'nav.contact': 'contact',
    'hero.eyebrow': '<span class="dot"></span> available for werkstudent roles · dortmund, de',
    'hero.heading': 'Hi, I\'m <span class="gradient-text">Hossein Mirzagol</span>.',
    'hero.desc': 'M.Sc. Data Science student at <strong>TU Dortmund University</strong>, building machine learning systems, transformer models, and full-stack web applications. I turn messy data and rough ideas into things that ship.',
    'hero.btnProjects': 'View projects', 'hero.btnContact': 'Get in touch',
    'about.title': 'From production floors to production code.',
    'about.p1': 'I\'m a Data Science M.Sc. student at <strong>TU Dortmund University</strong>, with a B.Sc. in Computer Science from Iran University of Science and Technology. My work spans the full stack of "data to product": training transformer and neural-network models from scratch, running reproducible statistical studies, designing relational databases with real business logic, and shipping responsive React/TypeScript applications used by real users.',
    'about.p2': 'Before grad school, I spent a year as a business-process &amp; data advisor inside a furniture manufacturer — reading warehouse and production data, walking the floor, and turning both into layout and routing changes leadership actually adopted. I\'ve also administered secure company storage infrastructure and taught software design, computer vision, and data mining as a university TA.',
    'about.p3': 'I like problems that don\'t stay in one layer — the kind that need a model, an API, a schema, and an interface that a non-technical person can actually use.',
    'about.stat1': 'public repos', 'about.stat2': 'TA roles taught',
    'about.stat3': 'languages spoken', 'about.stat4': 'English proficiency',
    'skills.title': 'Tools I reach for.',
    'skills.h1': 'ML &amp; Deep Learning', 'skills.h2': 'Data &amp; Statistics',
    'skills.h3': 'Frontend &amp; Web', 'skills.h4': 'Databases &amp; Backend',
    'skills.h5': 'DevOps &amp; Systems', 'skills.h6': 'Design &amp; Media',
    'projects.title': 'Selected work.',
    'projects.sub': 'Pulled from <a href="https://github.com/mirzagol" target="_blank" rel="noopener">github.com/mirzagol</a> — code you can actually go read.',
    'projects.kind1': 'web · private repo', 'projects.kind2': 'web · live',
    'projects.kind3': 'ml · nlp', 'projects.kind4': 'web · full-stack',
    'projects.kind5': 'stats · research', 'projects.kind6': 'database',
    'projects.code': 'code', 'projects.live': 'live ↗',
    'projects.desc1': 'Persian-first political/news SPA with public, member, and admin experiences: OTP login, protected routes, a rich-text editor that round-trips to Markdown, media uploads, and a full registration-review workflow — Dockerized behind Nginx.',
    'projects.desc2': 'Responsive e-commerce storefront for a premium furniture retailer: advanced filtering, detailed product pages, and RTL support, architected from scratch and shipped to production.',
    'projects.desc3': 'A GPT-style transformer built from scratch — multi-head attention, feed-forward blocks, training loop — trained character-by-character on Ferdowsi\'s <em>Shahnameh</em> to generate original Persian verse.',
    'projects.desc4': 'Mobile-first workshop reservation system for a school event: automatic capacity management, an admin dashboard, and reporting, built on Node.js and SQLite.',
    'projects.desc5': 'Reproducible statistical analysis of UCI World Tour rider performance across stage profiles — ANOVA, mixed-effects models, bootstrap CIs — written up as a LaTeX report with programmatically generated figures.',
    'projects.desc6': 'An entire election modeled as a PostgreSQL schema — tables, views, triggers, and stored functions enforcing voting rules and computing results, not just CRUD.',
    'projects.moreTitle': 'More on GitHub',
    'projects.more1': 'Decision Tree from scratch →', 'projects.more2': 'SVM &amp; plate recognition →',
    'projects.more3': 'FashionMNIST classifier →', 'projects.more4': 'Genetic programming →',
    'projects.more5': 'Housing price regression →', 'projects.more6': 'All repositories →',
    'exp.title': 'Where I\'ve worked &amp; taught.',
    'exp.role1': 'M.Sc. Data Science',
    'exp.role2': 'Teaching Assistant, Software Design Principles',
    'exp.desc2': 'Weekly tutorials on design patterns and software architecture, translating theory into applied exercises.',
    'exp.role3': 'Business Process &amp; Data Advisor',
    'exp.desc3': 'Analyzed production and warehouse data to identify bottlenecks; recommendations on layout and routing were adopted by plant leadership.',
    'exp.role4': 'Teaching Assistant, Data Mining &amp; Computer Workshop',
    'exp.desc4': 'Reviewed clustering/classification implementations; ran Linux, Git, and dev-tooling labs.',
    'exp.role5': 'IT Administrator',
    'exp.desc5': 'Deployed NAS + FTPS for secure company storage; built an internal office-automation system to digitize paperwork.',
    'exp.role6': 'Teaching Assistant, Computer Vision',
    'exp.role7': 'B.Sc. Computer Science',
    'contact.title': 'Let\'s talk.',
    'contact.sub': 'Looking for English-language / internationally-oriented Werkstudent roles in data science, ML, or software engineering around Dortmund &amp; the Ruhr area — open to remote-friendly teams too.',
    'contact.email': 'Email', 'contact.github': 'GitHub', 'contact.location': 'Location',
    'contact.locationValue': 'Dortmund, Germany',
    'footer.copy': '&copy; <span id="year"></span> Hossein Mirzagol. Built with HTML, CSS &amp; JS — no framework, on purpose.',
    'footer.top': 'back to top ↑',
  },
  de: {
    'nav.about': 'profil', 'nav.skills': 'skills', 'nav.projects': 'projekte',
    'nav.experience': 'werdegang', 'nav.contact': 'kontakt',
    'hero.eyebrow': '<span class="dot"></span> offen für Werkstudent:innen-Stellen · Dortmund, DE',
    'hero.heading': 'Hallo, ich bin <span class="gradient-text">Hossein Mirzagol</span>.',
    'hero.desc': 'M.Sc.-Student Data Science an der <strong>TU Dortmund</strong>. Ich baue Machine-Learning-Systeme, Transformer-Modelle und Full-Stack-Webanwendungen — aus unordentlichen Daten und groben Ideen mache ich fertige Produkte.',
    'hero.btnProjects': 'Projekte ansehen', 'hero.btnContact': 'Kontakt aufnehmen',
    'about.title': 'Von der Werkshalle zum Produktivcode.',
    'about.p1': 'Ich studiere Data Science (M.Sc.) an der <strong>TU Dortmund</strong> und habe einen B.Sc. in Informatik von der Iran University of Science and Technology. Meine Arbeit deckt den gesamten Weg von Daten zu Produkt ab: Transformer- und neuronale Netze von Grund auf trainieren, reproduzierbare statistische Studien durchführen, relationale Datenbanken mit echter Geschäftslogik entwerfen und responsive React/TypeScript-Anwendungen für echte Nutzer:innen ausliefern.',
    'about.p2': 'Vor dem Masterstudium war ich ein Jahr lang als Prozess- und Datenberater bei einem Möbelhersteller tätig — habe Lager- und Produktionsdaten ausgewertet, bin durch die Werkshalle gegangen und habe beides in Layout- und Routing-Änderungen übersetzt, die die Werksleitung tatsächlich umgesetzt hat. Außerdem habe ich sichere Firmenspeicher-Infrastruktur administriert und als Hochschul-Tutor Softwaredesign, Computer Vision und Data Mining unterrichtet.',
    'about.p3': 'Mich reizen Probleme, die sich nicht auf eine Schicht beschränken — die ein Modell, eine API, ein Schema und eine Oberfläche brauchen, die auch fachfremde Personen wirklich nutzen können.',
    'about.stat1': 'öffentliche Repos', 'about.stat2': 'betreute Tutorien',
    'about.stat3': 'gesprochene Sprachen', 'about.stat4': 'Englischniveau',
    'skills.title': 'Werkzeuge, die ich nutze.',
    'skills.h1': 'ML &amp; Deep Learning', 'skills.h2': 'Daten &amp; Statistik',
    'skills.h3': 'Frontend &amp; Web', 'skills.h4': 'Datenbanken &amp; Backend',
    'skills.h5': 'DevOps &amp; Systeme', 'skills.h6': 'Design &amp; Medien',
    'projects.title': 'Ausgewählte Projekte.',
    'projects.sub': 'Direkt von <a href="https://github.com/mirzagol" target="_blank" rel="noopener">github.com/mirzagol</a> — Code, den man wirklich lesen kann.',
    'projects.kind1': 'web · privates repo', 'projects.kind2': 'web · live',
    'projects.kind3': 'ml · nlp', 'projects.kind4': 'web · full-stack',
    'projects.kind5': 'statistik · forschung', 'projects.kind6': 'datenbank',
    'projects.code': 'code', 'projects.live': 'live ↗',
    'projects.desc1': 'Persisch-first Politik-/News-SPA mit öffentlichem, Mitglieder- und Admin-Bereich: OTP-Login, geschützte Routen, ein Rich-Text-Editor mit Markdown-Round-Trip, Medien-Uploads und ein vollständiger Registrierungs-Review-Workflow — dockerisiert hinter Nginx.',
    'projects.desc2': 'Responsiver E-Commerce-Shop für einen Premium-Möbelhändler: erweiterte Filter, detaillierte Produktseiten und RTL-Unterstützung, von Grund auf konzipiert und in Produktion gebracht.',
    'projects.desc3': 'Ein GPT-artiger Transformer komplett selbst gebaut — Multi-Head-Attention, Feed-Forward-Blöcke, Trainingsschleife — zeichenweise auf Ferdowsis <em>Shahnameh</em> trainiert, um originale persische Verse zu erzeugen.',
    'projects.desc4': 'Mobile-first Reservierungssystem für einen Schul-Workshop: automatische Kapazitätsverwaltung, Admin-Dashboard und Reporting, gebaut mit Node.js und SQLite.',
    'projects.desc5': 'Reproduzierbare statistische Analyse der Fahrerleistung bei der UCI World Tour über verschiedene Etappenprofile — ANOVA, Mixed-Effects-Modelle, Bootstrap-Konfidenzintervalle — als LaTeX-Bericht mit programmatisch erzeugten Abbildungen.',
    'projects.desc6': 'Eine komplette Wahl als PostgreSQL-Schema modelliert — Tabellen, Views, Trigger und gespeicherte Funktionen, die Wahlregeln durchsetzen und Ergebnisse berechnen, nicht nur CRUD.',
    'projects.moreTitle': 'Weitere Projekte auf GitHub',
    'projects.more1': 'Decision Tree from Scratch →', 'projects.more2': 'SVM &amp; Kennzeichenerkennung →',
    'projects.more3': 'FashionMNIST-Klassifikator →', 'projects.more4': 'Genetisches Programmieren →',
    'projects.more5': 'Hauspreis-Regression →', 'projects.more6': 'Alle Repositories →',
    'exp.title': 'Wo ich gearbeitet &amp; unterrichtet habe.',
    'exp.role1': 'M.Sc. Data Science',
    'exp.role2': 'Wissenschaftliche Hilfskraft, Softwaredesign-Prinzipien',
    'exp.desc2': 'Wöchentliche Übungen zu Design Patterns und Softwarearchitektur — Theorie in angewandte Übungen übersetzt.',
    'exp.role3': 'Prozess- &amp; Datenberater',
    'exp.desc3': 'Analyse von Produktions- und Lagerdaten zur Identifikation von Engpässen; Empfehlungen zu Layout und Routing wurden von der Werksleitung umgesetzt.',
    'exp.role4': 'Wissenschaftliche Hilfskraft, Data Mining &amp; Computer-Workshop',
    'exp.desc4': 'Review von Clustering-/Klassifikationsimplementierungen; Leitung von Linux-, Git- und Tooling-Labs.',
    'exp.role5': 'IT-Administrator',
    'exp.desc5': 'NAS + FTPS für sicheren Firmenspeicher aufgesetzt; internes Office-Automation-System zur Digitalisierung von Papierprozessen gebaut.',
    'exp.role6': 'Wissenschaftliche Hilfskraft, Computer Vision',
    'exp.role7': 'B.Sc. Informatik',
    'contact.title': 'Lass uns reden.',
    'contact.sub': 'Auf der Suche nach englischsprachigen / international ausgerichteten Werkstudent:innen-Stellen in Data Science, ML oder Softwareentwicklung im Raum Dortmund &amp; Ruhrgebiet — auch offen für remote-freundliche Teams.',
    'contact.email': 'E-Mail', 'contact.github': 'GitHub', 'contact.location': 'Standort',
    'contact.locationValue': 'Dortmund, Deutschland',
    'footer.copy': '&copy; <span id="year"></span> Hossein Mirzagol. Gebaut mit HTML, CSS &amp; JS — bewusst ohne Framework.',
    'footer.top': 'nach oben ↑',
  },
};

const heroRoles = {
  en: [
    'Data Science M.Sc. student',
    'ML / transformer engineer',
    'React & TypeScript developer',
    'former warehouse-floor analyst',
  ],
  de: [
    'Data-Science-M.Sc.-Student',
    'ML-/Transformer-Ingenieur',
    'React- &amp; TypeScript-Entwickler',
    'ehemaliger Lageranalyst',
  ],
};

let currentLang = localStorage.getItem('lang') === 'de' ? 'de' : 'en';

function applyLanguage(lang) {
  currentLang = lang;
  document.documentElement.lang = lang;
  document.querySelectorAll('[data-i18n]').forEach((el) => {
    const key = el.getAttribute('data-i18n');
    const value = translations[lang][key];
    if (value !== undefined) el.innerHTML = value;
  });
  updateYear();
  document.getElementById('langEn').classList.toggle('is-active', lang === 'en');
  document.getElementById('langDe').classList.toggle('is-active', lang === 'de');
  localStorage.setItem('lang', lang);
  restartTypedRoles();
}

document.getElementById('langEn').addEventListener('click', () => applyLanguage('en'));
document.getElementById('langDe').addEventListener('click', () => applyLanguage('de'));

/* ---------------- typed hero role line ---------------- */
const typedEl = document.getElementById('typed');
let typedTimeoutId = null;
let roleIndex = 0;
let charIndex = 0;
let deleting = false;

function typeTick() {
  const roles = heroRoles[currentLang];
  const current = roles[roleIndex % roles.length].replace(/&amp;/g, '&');
  if (!deleting) {
    charIndex++;
    typedEl.textContent = current.slice(0, charIndex);
    if (charIndex === current.length) {
      deleting = true;
      typedTimeoutId = setTimeout(typeTick, 1600);
      return;
    }
  } else {
    charIndex--;
    typedEl.textContent = current.slice(0, charIndex);
    if (charIndex === 0) {
      deleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
    }
  }
  typedTimeoutId = setTimeout(typeTick, deleting ? 35 : 55);
}

function restartTypedRoles() {
  if (reduceMotion) {
    typedEl.textContent = heroRoles[currentLang][0].replace(/&amp;/g, '&');
    return;
  }
  clearTimeout(typedTimeoutId);
  roleIndex = 0;
  charIndex = 0;
  deleting = false;
  typedEl.textContent = '';
  typeTick();
}

applyLanguage(currentLang);
