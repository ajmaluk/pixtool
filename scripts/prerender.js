import puppeteer from 'puppeteer';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import http from 'http';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = 5174;
const DIST_DIR = path.join(process.cwd(), 'dist');

// List of routes to prerender - Should match sitemap.xml
const routes = [
  '/',
  '/image-tools',
  '/pdf-tools',
  '/utility-tools',
  '/image-tools/resize',
  '/image-tools/crop',
  '/image-tools/rotate',
  '/image-tools/compress',
  '/image-tools/convert',
  '/image-tools/watermark',
  '/image-tools/flip',
  '/image-tools/grayscale',
  '/pdf-tools/merge',
  '/pdf-tools/split',
  '/pdf-tools/compress',
  '/pdf-tools/convert',
  '/pdf-tools/protect',
  '/pdf-tools/watermark',
  '/pdf-tools/reorder',
  '/temp-mail',
  '/temp-mail/10-minute-mail',
  '/temp-mail/change-email',
  '/qr-scanner',
  '/qr-generator',
  '/typing-test',
  '/about',
  '/contact',
  '/privacy-policy',
  '/terms-of-service',
  '/sitemap',
  '/showcase'
];

async function prerender() {
  console.log('🚀 Starting Prerender...');

  // 1. Start a simple static file server
  const server = http.createServer((req, res) => {
    let filePath = path.join(DIST_DIR, req.url === '/' ? 'index.html' : req.url);
    
    // If path is a directory or doesn't have an extension, serve index.html (SPA routing)
    if (!path.extname(filePath)) {
      filePath = path.join(DIST_DIR, 'index.html');
    }

    fs.readFile(filePath, (err, content) => {
      if (err) {
        // Fallback to index.html for SPA routing
        fs.readFile(path.join(DIST_DIR, 'index.html'), (err2, content2) => {
          if (err2) {
            res.writeHead(500);
            res.end(`Error: ${err2.code}`);
          } else {
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.end(content2, 'utf-8');
          }
        });
      } else {
        const ext = path.extname(filePath);
        let contentType = 'text/html';
        if (ext === '.js') contentType = 'text/javascript';
        if (ext === '.css') contentType = 'text/css';
        if (ext === '.json') contentType = 'application/json';
        if (ext === '.png') contentType = 'image/png';
        if (ext === '.jpg') contentType = 'image/jpg';
        if (ext === '.svg') contentType = 'image/svg+xml';

        res.writeHead(200, { 'Content-Type': contentType });
        res.end(content, 'utf-8');
      }
    });
  });

  server.listen(PORT, async () => {
    console.log(`📡 Temporary server running at http://localhost:${PORT}`);

    const browser = await puppeteer.launch({
      headless: 'new',
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });

    const page = await browser.newPage();

    for (const route of routes) {
      const url = `http://localhost:${PORT}${route}`;
      console.log(`🧶 Prerendering: ${route}`);

      try {
        await page.goto(url, { waitUntil: 'networkidle2', timeout: 30000 });
        
        // Wait for React to execute and SEO meta tags to be injected
        await new Promise(r => setTimeout(r, 2000));

        const content = await page.content();

        // Save as pretty URL (route/index.html)
        const outputDir = path.join(DIST_DIR, route === '/' ? '' : route);
        if (!fs.existsSync(outputDir)) {
          fs.mkdirSync(outputDir, { recursive: true });
        }

        const outputPath = path.join(outputDir, 'index.html');
        fs.writeFileSync(outputPath, content);
        console.log(`✅ Saved: ${outputPath}`);
      } catch (err) {
        console.error(`❌ Failed route ${route}:`, err.message);
      }
    }

    await browser.close();
    server.close();
    console.log('✨ Prerendering complete!');
    process.exit(0);
  });
}

prerender().catch(err => {
  console.error('❌ Prerendering failed:', err);
  process.exit(1);
});
