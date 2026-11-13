const fs = require('node:fs');
const path = require('node:path');
const output = path.join(__dirname, 'dist');
fs.mkdirSync(output, { recursive: true });
const publicFiles = [
  'index.html', 'app.js', 'style.css', 'AeroShards.css', 'assets',
  'about/index.html', 'treatments/index.html', 'results/index.html', 'contact/index.html'
];
for (const file of publicFiles) {
  const destination = path.join(output, file);
  fs.mkdirSync(path.dirname(destination), { recursive: true });
  fs.cpSync(path.join(__dirname, file), destination, { recursive: true });
}
