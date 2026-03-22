/* global process */
import puppeteer from 'puppeteer';
import fs from 'fs';
import path from 'path';

const BASE_URL = 'http://localhost:5173';
const SCREENSHOT_DIR = path.join(process.cwd(), 'public', 'screenshots');

const tools = [
  { path: '/', slug: 'home' },
  { path: '/image-tools', slug: 'image-tools-hub' },
  { path: '/pdf-tools', slug: 'pdf-tools-hub' },
  { path: '/utility-tools', slug: 'utility-tools-hub' },
  // Image Tools
  { path: '/image-tools/resize', slug: 'image-tools-resize' },
  { path: '/image-tools/crop', slug: 'image-tools-crop' },
  { path: '/image-tools/rotate', slug: 'image-tools-rotate' },
  { path: '/image-tools/compress', slug: 'image-tools-compress' },
  { path: '/image-tools/convert', slug: 'image-tools-convert' },
  { path: '/image-tools/watermark', slug: 'image-tools-watermark' },
  { path: '/image-tools/flip', slug: 'image-tools-flip' },
  { path: '/image-tools/grayscale', slug: 'image-tools-grayscale' },
  // PDF Tools
  { path: '/pdf-tools/merge', slug: 'pdf-tools-merge' },
  { path: '/pdf-tools/split', slug: 'pdf-tools-split' },
  { path: '/pdf-tools/compress', slug: 'pdf-tools-compress' },
  { path: '/pdf-tools/convert', slug: 'pdf-tools-convert' },
  { path: '/pdf-tools/protect', slug: 'pdf-tools-protect' },
  { path: '/pdf-tools/watermark', slug: 'pdf-tools-watermark' },
  { path: '/pdf-tools/reorder', slug: 'pdf-tools-reorder' },
  // Utility Tools
  { path: '/temp-mail', slug: 'temp-mail' },
  { path: '/qr-scanner', slug: 'qr-scanner' },
  { path: '/qr-generator', slug: 'qr-generator' },
  { path: '/typing-test', slug: 'typing-test' }
];

async function generateScreenshots() {
  if (!fs.existsSync(SCREENSHOT_DIR)) {
    fs.mkdirSync(SCREENSHOT_DIR, { recursive: true });
  }

  const browser = await puppeteer.launch({
    headless: "new",
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1200, height: 630, deviceScaleFactor: 2 });

  console.log('🚀 Starting screenshot generation...');

  for (const tool of tools) {
    const url = `${BASE_URL}${tool.path}`;
    const filePath = path.join(SCREENSHOT_DIR, `${tool.slug}.png`);

    try {
      console.log(`📸 Capturing: ${tool.slug} (${url})`);
      await page.goto(url, { waitUntil: 'networkidle2', timeout: 30000 });
      
      // Wait a bit for animations
      await new Promise(r => setTimeout(r, 1000));
      
      await page.screenshot({ path: filePath });
      
      // Special case for home page to also save as og-image.png
      if (tool.slug === 'home') {
        fs.copyFileSync(filePath, path.join(process.cwd(), 'public', 'og-image.png'));
      }
    } catch (err) {
      console.error(`❌ Failed to capture ${tool.slug}:`, err.message);
    }
  }

  await browser.close();
  console.log('✅ Screenshot generation complete!');
}

generateScreenshots().catch(console.error);
