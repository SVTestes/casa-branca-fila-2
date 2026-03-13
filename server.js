const http  = require('http');
const https = require('https');
const fs    = require('fs');
const path  = require('path');

const PORT     = process.env.PORT || 3000;
const API_URL  = 'https://api.fastget.com.br/api/v1/public/display/d55420f6-b1b2-11ef-9f40-029e72b0772d/QUEUE';

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.js':   'application/javascript',
  '.css':  'text/css',
  '.otf':  'font/otf',
  '.woff2':'font/woff2',
  '.ico':  'image/x-icon',
};

function fetchQueue() {
  return new Promise((resolve, reject) => {
    https.get(API_URL, { headers: { 'Accept': 'application/json' } }, (res) => {
      let body = '';
      res.on('data', chunk => body += chunk);
      res.on('end', () => {
        try { resolve({ status: res.statusCode, data: JSON.parse(body) }); }
        catch (e) { reject(e); }
      });
    }).on('error', reject);
  });
}

const server = http.createServer(async (req, res) => {
  // --- proxy endpoint ---
  if (req.url === '/api/queue') {
    try {
      const { status, data } = await fetchQueue();
      res.writeHead(status, {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Cache-Control': 'no-store',
      });
      res.end(JSON.stringify(data));
    } catch (err) {
      console.error('[proxy]', err.message);
      res.writeHead(502, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: err.message }));
    }
    return;
  }

  // --- static files ---
  let filePath = req.url === '/' ? '/index.html' : req.url;
  filePath = path.join(__dirname, filePath);

  fs.readFile(filePath, (err, content) => {
    if (err) {
      res.writeHead(404);
      res.end('Not found');
      return;
    }
    const ext = path.extname(filePath);
    res.writeHead(200, { 'Content-Type': MIME[ext] || 'application/octet-stream' });
    res.end(content);
  });
});

server.listen(PORT, () => console.log(`Casa Branca — fila rodando na porta ${PORT}`));
