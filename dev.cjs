const http = require('node:http');
const fs = require('node:fs/promises');
const path = require('node:path');

const port = Number(process.env.PORT || 3000);
const types = {
  '.html': 'text/html', '.css': 'text/css', '.js': 'text/javascript',
  '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.png': 'image/png',
  '.webp': 'image/webp', '.svg': 'image/svg+xml', '.pdf': 'application/pdf',
  '.woff2': 'font/woff2'
};
const root = __dirname;
http.createServer(async (request, response) => {
  try {
    let pathname = decodeURIComponent(new URL(request.url, 'http://localhost').pathname);
    if (pathname.endsWith('/')) pathname += 'index.html';
    const file = path.resolve(root, '.' + pathname);
    const relative = path.relative(root, file);
    const type = types[path.extname(file)];
    if (relative.startsWith('..') || path.isAbsolute(relative) || !type) {
      response.writeHead(404).end('Not found');
      return;
    }
    const body = await fs.readFile(file);
    response.writeHead(200, {'Content-Type': type, 'Cache-Control': 'no-store'}).end(body);
  } catch {
    response.writeHead(404).end('Not found');
  }
}).listen(port, '127.0.0.1', () => console.log('Preview: http://127.0.0.1:' + port));
