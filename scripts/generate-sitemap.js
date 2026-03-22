import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { IMAGE_TOOLS, PDF_TOOLS, UTILITY_TOOLS } from '../src/data/tools.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const SITE_URL = 'https://dailytools.toolpix.in';
const PUBLIC_DIR = path.join(__dirname, '..', 'public');
const SITEMAP_PATH = path.join(PUBLIC_DIR, 'sitemap.xml');

const lastmod = new Date().toISOString().split('T')[0];

function generateSitemap() {
  console.log('🚀 Starting sitemap generation...');

  let xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
  <url>
    <loc>${SITE_URL}/</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
    <image:image>
      <image:loc>${SITE_URL}/og-image.png</image:loc>
      <image:title>DailyTools - All-in-one Free Online Productivity Suite</image:title>
    </image:image>
  </url>`;

  const addUrl = (relPath, priority = '0.8', freq = 'weekly', imagePath = null, imageTitle = null) => {
    xml += `
  <url>
    <loc>${SITE_URL}${relPath}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${freq}</changefreq>
    <priority>${priority}</priority>`;
    
    if (imagePath) {
      xml += `
    <image:image>
      <image:loc>${SITE_URL}${imagePath}</image:loc>
      <image:title>${imageTitle || 'DailyTools Interface'}</image:title>
    </image:image>`;
    }
    
    xml += `
  </url>`;
  };

  // Main Hubs
  addUrl('/image-tools', '0.9', 'weekly', '/screenshots/image-tools-hub.png', 'DailyTools Image Studio Hub');
  addUrl('/pdf-tools', '0.9', 'weekly', '/screenshots/pdf-tools-hub.png', 'DailyTools PDF Expert Suite');
  addUrl('/utility-tools', '0.9', 'weekly', '/screenshots/utility-tools-hub.png', 'DailyTools Utility Suite');
  addUrl('/showcase', '0.9', 'weekly', '/screenshots/home.png', 'DailyTools Visual Showcase');

  // Image Tools
  IMAGE_TOOLS.forEach(tool => {
    addUrl(tool.path, '0.8', 'weekly', `/screenshots/image-tools-${tool.id}.png`, `${tool.title} interface - Free DailyTools`);
  });

  // PDF Tools
  PDF_TOOLS.forEach(tool => {
    addUrl(tool.path, '0.8', 'weekly', `/screenshots/pdf-tools-${tool.id}.png`, `${tool.title} interface - Free DailyTools`);
  });

  // Utility Tools
  UTILITY_TOOLS.forEach(tool => {
    addUrl(tool.path, '0.8', 'weekly', `/screenshots/${tool.id}.png`, `${tool.title} interface - Free DailyTools`);
  });

  // Company & Legal
  const otherPages = [
    '/about', '/founder', '/developer', '/services', '/products', 
    '/privacy-policy', '/terms-of-service', '/contact', '/faq', 
    '/refund-policy', '/cookie-policy', '/blog', '/testimonials', 
    '/documentation', '/sitemap'
  ];

  otherPages.forEach(path => {
    addUrl(path, '0.6', 'monthly');
  });

  xml += '\n</urlset>';

  fs.writeFileSync(SITEMAP_PATH, xml);
  console.log(`✅ Sitemap generated at: ${SITEMAP_PATH}`);
  console.log(`📈 Total URLs: ${xml.match(/<url>/g).length}`);
}

try {
  generateSitemap();
} catch (error) {
  console.error('❌ Error generating sitemap:', error);
  process.exit(1);
}
