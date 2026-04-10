import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { IMAGE_TOOLS, PDF_TOOLS, UTILITY_TOOLS, AI_TOOLS, MATH_TOOLS, PRODUCTIVITY_TOOLS } from '../src/data/tools.js';
import { posts } from '../src/data/posts.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const SITE_URL = process.env.VITE_SITE_URL || 'https://www.pixtool.in';
const PUBLIC_DIR = path.join(__dirname, '..', 'public');
const SITEMAP_PATH = path.join(PUBLIC_DIR, 'sitemap.xml');
const DEFAULT_SITEMAP_IMAGE = '/screenshots/pixtool-all-in-one-productivity-suite.webp';
const IMAGE_EXTENSIONS = ['.webp', '.png', '.jpg', '.jpeg'];

const lastmod = new Date().toISOString().split('T')[0];
const escapeXml = (unsafe) => {
  return unsafe.replace(/[<>&'"]/g, (c) => {
    switch (c) {
      case '<': return '&lt;';
      case '>': return '&gt;';
      case '&': return '&amp;';
      case '\'': return '&apos;';
      case '"': return '&quot;';
    }
  });
};

const resolveImagePath = (rawPath, { allowDefault = true } = {}) => {
  if (!rawPath) {
    if (!allowDefault) return null;
    const defaultFsPath = path.join(PUBLIC_DIR, DEFAULT_SITEMAP_IMAGE.replace(/^\//, ''));
    return fs.existsSync(defaultFsPath) ? DEFAULT_SITEMAP_IMAGE : null;
  }

  const normalized = rawPath.startsWith('/') ? rawPath : `/${rawPath}`;

  const normalizedExt = path.extname(normalized);
  if (normalizedExt) {
    const preferredWebp = `${normalized.slice(0, -normalizedExt.length)}.webp`;
    const preferredWebpFsPath = path.join(PUBLIC_DIR, preferredWebp.replace(/^\//, ''));
    if (fs.existsSync(preferredWebpFsPath)) return preferredWebp;
  }

  const directFsPath = path.join(PUBLIC_DIR, normalized.replace(/^\//, ''));
  if (fs.existsSync(directFsPath)) return normalized;

  const ext = path.extname(normalized);
  if (ext) {
    const base = normalized.slice(0, -ext.length);
    for (const candidateExt of IMAGE_EXTENSIONS) {
      const candidate = `${base}${candidateExt}`;
      const candidateFsPath = path.join(PUBLIC_DIR, candidate.replace(/^\//, ''));
      if (fs.existsSync(candidateFsPath)) return candidate;
    }
  }

  if (!allowDefault) return null;
  const fallbackFsPath = path.join(PUBLIC_DIR, DEFAULT_SITEMAP_IMAGE.replace(/^\//, ''));
  return fs.existsSync(fallbackFsPath) ? DEFAULT_SITEMAP_IMAGE : null;
};

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
      <image:loc>${SITE_URL}/og-image.webp</image:loc>
      <image:title>PixTool - All-in-one Free Online Productivity Suite</image:title>
    </image:image>
  </url>`;

  const addUrl = (relPath, priority = '0.8', freq = 'weekly', imagePath = null, imageTitle = null, imageCaption = null) => {
    const resolvedImagePath = resolveImagePath(imagePath);

    xml += `
  <url>
    <loc>${SITE_URL}${relPath}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${freq}</changefreq>
    <priority>${priority}</priority>`;
    
    if (resolvedImagePath) {
      xml += `
    <image:image>
      <image:loc>${SITE_URL}${resolvedImagePath}</image:loc>
      <image:title>${escapeXml(imageTitle || 'PixTool Interface')}</image:title>`;
      
      if (imageCaption) {
        xml += `
      <image:caption>${escapeXml(imageCaption)}</image:caption>`;
      }
      
      xml += `
    </image:image>`;
    }
    
    xml += `
  </url>`;
  };


  // Main Hubs
  addUrl('/image-tools', '0.9', 'weekly', '/screenshots/professional-online-image-studio.webp', 'PixTool Image Studio Hub');
  addUrl('/pdf-tools', '0.9', 'weekly', '/screenshots/secure-pdf-management-suite.webp', 'PixTool PDF Expert Suite');
  addUrl('/utility-tools', '0.9', 'weekly', '/screenshots/utility-tools-hub.webp', 'PixTool Utility Suite');
  addUrl('/ai-tools', '0.9', 'weekly', '/screenshots/home.webp', 'PixTool AI Tools Hub');
  addUrl('/math-tools', '0.9', 'weekly', '/screenshots/pixtool-all-in-one-productivity-suite.webp', 'PixTool Math & Scientific Hub');
  addUrl('/productivity-tools', '0.9', 'weekly', '/screenshots/pixtool-all-in-one-productivity-suite.webp', 'PixTool Productivity Suite Hub');

  // MATH Tools
  MATH_TOOLS.filter(t => t.status !== 'coming-soon').forEach(tool => {
    addUrl(tool.path, '0.8', 'weekly', `/screenshots/${tool.screenshot}`, tool.imageAlt || `${tool.title} | Advance Math PixTool`, tool.description);
  });

  // Image Tools
  IMAGE_TOOLS.filter(t => t.status !== 'coming-soon').forEach(tool => {
    addUrl(tool.path, '0.8', 'weekly', `/screenshots/${tool.screenshot}`, tool.imageAlt || `${tool.title} | Free Online PixTool`, tool.description);
  });

  // PDF Tools
  PDF_TOOLS.filter(t => t.status !== 'coming-soon').forEach(tool => {
    addUrl(tool.path, '0.8', 'weekly', `/screenshots/${tool.screenshot}`, tool.imageAlt || `${tool.title} | Professional PDF PixTool`, tool.description);
  });

  // Utility Tools
  UTILITY_TOOLS.filter(t => t.status !== 'coming-soon').forEach(tool => {
    addUrl(tool.path, '0.8', 'weekly', `/screenshots/${tool.screenshot}`, tool.imageAlt || `${tool.title} | Anonymous Tool PixTool`, tool.description);
  });

  // AI Tools
  AI_TOOLS.filter(t => t.status !== 'coming-soon').forEach(tool => {
    addUrl(tool.path, '0.8', 'weekly', `/screenshots/${tool.screenshot}`, tool.imageAlt || `${tool.title} | AI Generated PixTool`, tool.description);
  });

  // Productivity Tools
  PRODUCTIVITY_TOOLS.filter(t => t.status !== 'coming-soon').forEach(tool => {
    addUrl(tool.path, '0.8', 'weekly', `/screenshots/${tool.screenshot}`, tool.imageAlt || `${tool.title} | Productivity PixTool`, tool.description);
  });


  // Blog Posts
  posts.forEach(post => {
    addUrl(`/blog/${post.slug}`, '0.7', 'monthly', post.imageWebp || post.image, post.title, post.excerpt);
  });

  // Company & Legal & Others
  const otherPages = [
    '/about', '/founder', '/developer', '/services', '/products', 
    '/privacy-policy', '/terms-of-service', '/contact', '/faq', 
    '/refund-policy', '/cookie-policy', '/blog', '/testimonials', 
    '/documentation', '/sitemap', '/status', '/news', '/careers', '/case-studies',
    '/support-us', '/promotions', '/hire-me', '/showcase', '/thank-you'
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
