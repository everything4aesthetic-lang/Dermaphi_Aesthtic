const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const {TextEncoder, TextDecoder} = require('node:util');

const context = vm.createContext({TextEncoder, TextDecoder, console});
context.self = context;
const read = file => fs.readFileSync(path.join(__dirname, file), 'utf8');
for (const file of ['assets/react.js', 'assets/react-dom-server.js', 'app.js']) {
  vm.runInContext(read(file), context, {filename: file});
}
const pages = vm.runInContext('pages', context);
const escape = value => value.replace(/[&<>"']/g, char =>
  ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'})[char]);

for (const [page, [title, description]] of Object.entries(pages)) {
  const base = page === 'home' ? './' : '../'.repeat(page.split('/').length);
  const directory = page === 'home' ? __dirname : path.join(__dirname, page);
  const markup = vm.runInContext(
    'ReactDOMServer.renderToString(h(App,{page:' + JSON.stringify(page) + '}))', context);
  const html = `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${escape(title)} | Dermaphi Aesthetics</title>
<meta name="description" content="${escape(description)}">
<base href="${base}">
<script>
  (function() {
    const html = document.documentElement;
    const started = performance.now();
    html.dataset.siteLoading = '';
    
    let progress = 0;
    const counterTimer = setInterval(() => {
      progress += Math.floor(Math.random() * 15) + 8;
      if (progress > 100) progress = 100;
      const el = document.getElementById('loader-percentage');
      if (el) el.textContent = progress + '%';
      if (progress >= 100) clearInterval(counterTimer);
    }, 45);

    const finish = () => {
      clearInterval(counterTimer);
      const el = document.getElementById('loader-percentage');
      if (el) el.textContent = '100%';
      setTimeout(() => {
        html.removeAttribute('data-site-loading');
        html.dataset.siteLoaded = '';
      }, 140);
    };

    window.addEventListener('load', () => {
      const minimum = matchMedia('(prefers-reduced-motion: reduce)').matches ? 0 : 850;
      setTimeout(finish, Math.max(0, minimum - (performance.now() - started)));
    }, { once: true });

    setTimeout(finish, 2200);
  })();
</script>
<link rel="stylesheet" href="style.css">
<script defer src="assets/react.js"></script>
<script defer src="assets/react-dom.js"></script>
<script defer src="assets/gsap.min.js"></script>
<script defer src="assets/ScrollTrigger.min.js"></script>
<script defer src="assets/motion.js"></script>
<script defer src="assets/lottie.min.js"></script>
<script defer src="assets/social-animations.js"></script>
<script defer src="app.js"></script>
</head>
<body>
<div class="site-loader" aria-hidden="true">
  <div class="site-loader-curtain site-loader-curtain--top"></div>
  <div class="site-loader-curtain site-loader-curtain--bottom"></div>
  <div class="site-loader-inner">
    <div class="loader-geometry">
      <svg class="loader-compass-svg" viewBox="0 0 200 200" fill="none">
        <circle cx="100" cy="100" r="92" class="compass-ring-outer" stroke="rgba(237, 203, 137, 0.45)" stroke-width="1" stroke-dasharray="3 6"/>
        <circle cx="100" cy="100" r="76" class="compass-ring-phi" stroke="rgba(214, 110, 142, 0.55)" stroke-width="1.2"/>
        <circle cx="100" cy="100" r="47" class="compass-ring-inner" stroke="rgba(237, 203, 137, 0.7)" stroke-width="1.2"/>
        <path class="loader-golden-spiral" d="M100 100 A2 2 0 0 1 102 98 A5 5 0 0 1 107 103 A10 10 0 0 1 97 113 A21 21 0 0 1 76 92 A42 42 0 0 1 118 50 A84 84 0 0 1 184 134" stroke="url(#goldGradient)" stroke-width="2" stroke-linecap="round" fill="none" pathLength="1"/>
        <line x1="100" y1="8" x2="100" y2="192" stroke="rgba(237, 203, 137, 0.35)" stroke-width="1" stroke-dasharray="2 4"/>
        <line x1="8" y1="100" x2="192" y2="100" stroke="rgba(237, 203, 137, 0.35)" stroke-width="1" stroke-dasharray="2 4"/>
        <circle cx="100" cy="100" r="4" fill="#edcb89" class="loader-pulse-core"/>
        <defs>
          <linearGradient id="goldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#fdf3d6"/>
            <stop offset="50%" stop-color="#edcb89"/>
            <stop offset="100%" stop-color="#c48a47"/>
          </linearGradient>
        </defs>
      </svg>
    </div>
    <div class="loader-brand-wrap">
      <img src="assets/dermaphi-burgundy-gold.png" alt="" width="866" height="288" class="loader-brand-img">
      <div class="loader-brand-shimmer"></div>
    </div>
    <div class="loader-meta">
      <span class="loader-formula">Φ = 1.618033</span>
      <div class="loader-counter-wrap">
        <span id="loader-percentage" class="loader-percentage">0%</span>
      </div>
      <span class="loader-caption">CALIBRATING GOLDEN RATIO · CHENNAI</span>
    </div>
  </div>
</div>
<div id="root" data-page="${escape(page)}">${markup}</div></body>
</html>
`;
  fs.mkdirSync(directory, {recursive:true});
  fs.writeFileSync(path.join(directory, 'index.html'), html);
}
console.log('Generated ' + Object.keys(pages).length + ' React pages.');

