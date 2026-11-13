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
<body><div id="root" data-page="${escape(page)}">${markup}</div></body>
</html>
`;
  fs.mkdirSync(directory, {recursive:true});
  fs.writeFileSync(path.join(directory, 'index.html'), html);
}
console.log('Generated ' + Object.keys(pages).length + ' React pages.');

