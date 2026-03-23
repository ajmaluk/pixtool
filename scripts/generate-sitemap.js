import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { IMAGE_TOOLS, PDF_TOOLS, UTILITY_TOOLS } from '../src/data/tools.js';
import { posts } from '../src/data/posts.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const SITE_URL = process.env.VITE_SITE_URL || 'https://www.pixtool.in';
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
      <image:title>PixTool - All-in-one Free Online Productivity Suite</image:title>
    </image:image>
  </url>`;

  const addUrl = (relPath, priority = '0.8', freq = 'weekly', imagePath = null, imageTitle = null, imageCaption = null) => {
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
      <image:title>${imageTitle || 'PixTool Interface'}</image:title>`;
      
      if (imageCaption) {
        xml += `
      <image:caption>${imageCaption}</image:caption>`;
      }
      
      xml += `
    </image:image>`;
    }
    
    xml += `
  </url>`;
  };


  // Main Hubs
  addUrl('/image-tools', '0.9', 'weekly', '/screenshots/image-tools-hub.png', 'PixTool Image Studio Hub');
  addUrl('/pdf-tools', '0.9', 'weekly', '/screenshots/pdf-tools-hub.png', 'PixTool PDF Expert Suite');
  addUrl('/utility-tools', '0.9', 'weekly', '/screenshots/utility-tools-hub.png', 'PixTool Utility Suite');
  addUrl('/showcase', '0.9', 'weekly', '/screenshots/home.png', 'PixTool Visual Showcase');

  // Image Tools
  IMAGE_TOOLS.forEach(tool => {
    addUrl(tool.path, '0.8', 'weekly', `/screenshots/${tool.screenshot}`, tool.imageAlt || `${tool.title} | Free Online PixTool`, tool.description);
  });

  // PDF Tools
  PDF_TOOLS.forEach(tool => {
    addUrl(tool.path, '0.8', 'weekly', `/screenshots/${tool.screenshot}`, tool.imageAlt || `${tool.title} | Professional PDF PixTool`, tool.description);
  });

  // Utility Tools
  UTILITY_TOOLS.forEach(tool => {
    addUrl(tool.path, '0.8', 'weekly', `/screenshots/${tool.screenshot}`, tool.imageAlt || `${tool.title} | Anonymous Tool PixTool`, tool.description);
  });


  // Blog Posts
  posts.forEach(post => {
    addUrl(`/blog/${post.slug}`, '0.7', 'monthly', post.image, post.title);
  });

  // Company & Legal
  const otherPages = [
    '/about', '/founder', '/developer', '/services', '/products', 
    '/privacy-policy', '/terms-of-service', '/contact', '/faq', 
    '/refund-policy', '/cookie-policy', '/blog', '/testimonials', 
    '/documentation', '/sitemap', '/news', '/careers', '/case-studies',
    '/sponsor', '/promotions', '/hire-me'
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
