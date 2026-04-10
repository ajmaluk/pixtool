import puppeteer from 'puppeteer';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import http from 'http';
import { IMAGE_TOOLS, PDF_TOOLS, UTILITY_TOOLS, AI_TOOLS, MATH_TOOLS, PRODUCTIVITY_TOOLS } from '../src/data/tools.js';
import { posts } from '../src/data/posts.js';

const __filename = fileURLToPath(import.meta.url);
void __filename;

const PORT = 5174;
const DIST_DIR = path.join(process.cwd(), 'dist');

const staticRoutes = [
  '/',
  '/image-tools',
  '/pdf-tools',
  '/utility-tools',
  '/code-diff',
  '/about',
  '/founder',
  '/developer',
  '/services',
  '/products',
  '/privacy-policy',
  '/terms-of-service',
  '/contact',
  '/faq',
  '/refund-policy',
  '/cookie-policy',
  '/blog',
  '/news',
  '/testimonials',
  '/documentation',
  '/careers',
  '/case-studies',
  '/support-us',
  '/promotions',
  '/hire-me',
  '/thank-you',
  '/status',
  '/ai-tools',
  '/math-tools',
  '/productivity-tools',
  '/sitemap',
  '/showcase'
];

const toolRoutes = [
  ...IMAGE_TOOLS.filter(t => t.status !== 'coming-soon').map((t) => t.path),
  ...PDF_TOOLS.filter(t => t.status !== 'coming-soon').map((t) => t.path),
  ...UTILITY_TOOLS.filter(t => t.status !== 'coming-soon').map((t) => t.path),
  ...AI_TOOLS.filter(t => t.status !== 'coming-soon').map((t) => t.path),
  ...MATH_TOOLS.filter(t => t.status !== 'coming-soon').map((t) => t.path),
  ...PRODUCTIVITY_TOOLS.filter(t => t.status !== 'coming-soon').map((t) => t.path)
];

const blogRoutes = posts.map((post) => `/blog/${post.slug}`);

const routes = [...new Set([...staticRoutes, ...toolRoutes, ...blogRoutes])];

async function prerender() {
  console.log('🚀 Starting Prerender...');

  // Skip early in CI-like environments where Chromium may not be available.
  if (process.env.SKIP_PRERENDER || process.env.CF_PAGES || process.env.NETLIFY) {
    console.log('⏩ Skipping prerender (CI/Environment detected inside script)');
    return;
  }

  // 1. Start a simple static file server
  const server = http.createServer((req, res) => {
    const rawPath = req.url || '/';
    const reqPath = rawPath.split('?')[0].split('#')[0];
    let filePath = path.join(DIST_DIR, reqPath === '/' ? 'index.html' : reqPath);
    
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
        if (ext === '.xml') contentType = 'application/xml';
        if (ext === '.txt') contentType = 'text/plain';
        if (ext === '.ico') contentType = 'image/x-icon';
        if (ext === '.png') contentType = 'image/png';
        if (ext === '.jpg') contentType = 'image/jpg';
        if (ext === '.jpeg') contentType = 'image/jpeg';
        if (ext === '.webp') contentType = 'image/webp';
        if (ext === '.svg') contentType = 'image/svg+xml';
        if (ext === '.webmanifest') contentType = 'application/manifest+json';

        res.writeHead(200, { 'Content-Type': contentType });
        res.end(content, 'utf-8');
      }
    });
  });

  server.listen(PORT, async () => {
    console.log(`📡 Temporary server running at http://localhost:${PORT}`);

    let browser;
    try {
      browser = await puppeteer.launch({
        headless: 'new',
        args: ['--no-sandbox', '--disable-setuid-sandbox']
      });
    } catch (e) {
      console.warn('⚠️  Could not launch Puppeteer. Prerendering will be skipped.');
      console.warn('Error details:', e.message);
      server.close();
      process.exit(0); // Exit successfully so build doesn't fail
    }

    const failedRoutes = [];

    for (const route of routes) {
      const url = `http://localhost:${PORT}${route}`;
      console.log(`🧶 Prerendering: ${route}`);
      let page;

      try {
        page = await browser.newPage();
        await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 60000 });
        await page.waitForSelector('#root', { timeout: 10000 });
        
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
        failedRoutes.push(route);
        console.error(`❌ Failed route ${route}:`, err.message);
      } finally {
        if (page) {
          try {
            await page.close();
          } catch {
            // Ignore page-close errors to keep prerender progressing.
          }
        }
      }
    }

    await browser.close();
    server.close();

    if (failedRoutes.length > 0) {
      console.error(`❌ Prerendering finished with ${failedRoutes.length} failed routes.`);
      console.error(`Failed routes: ${failedRoutes.join(', ')}`);
      process.exit(1);
    }

    console.log('✨ Prerendering complete!');
    process.exit(0);
  });
}

prerender().catch(err => {
  console.error('❌ Prerendering failed:', err);
  process.exit(1);
});
