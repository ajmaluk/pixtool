import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { IMAGE_TOOLS, PDF_TOOLS, UTILITY_TOOLS, AI_TOOLS, MATH_TOOLS, PRODUCTIVITY_TOOLS } from '../src/data/tools.js';
import { posts } from '../src/data/posts.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.join(__dirname, '..');
const PUBLIC_DIR = path.join(ROOT_DIR, 'public');
const SITEMAP_PATH = path.join(PUBLIC_DIR, 'sitemap.xml');
const SITE_URL = process.env.VITE_SITE_URL || 'https://www.pixtool.in';

const requiredCoreRoutes = [
  '/',
  '/image-tools',
  '/pdf-tools',
  '/utility-tools',
  '/ai-tools',
  '/math-tools',
  '/productivity-tools',
  '/blog',
];

const requiredToolRoutes = [
  ...IMAGE_TOOLS.map((t) => t.path),
  ...PDF_TOOLS.map((t) => t.path),
  ...UTILITY_TOOLS.map((t) => t.path),
  ...AI_TOOLS.map((t) => t.path),
  ...MATH_TOOLS.map((t) => t.path),
  ...PRODUCTIVITY_TOOLS.map((t) => t.path),
];

const requiredBlogRoutes = posts.map((post) => `/blog/${post.slug}`);
const requiredRoutes = [...new Set([...requiredCoreRoutes, ...requiredToolRoutes, ...requiredBlogRoutes])];
const requiredAiDiscoveryRoutes = [...new Set([...requiredToolRoutes, ...requiredBlogRoutes])];

function fail(message) {
  console.error(`ERROR: ${message}`);
  process.exit(1);
}

function getMatches(xml, regex) {
  return [...xml.matchAll(regex)].map((m) => m[1]);
}

if (!fs.existsSync(SITEMAP_PATH)) {
  fail('public/sitemap.xml not found. Run `npm run generate:sitemap` first.');
}

const xml = fs.readFileSync(SITEMAP_PATH, 'utf-8');
if (!xml.includes('<urlset') || !xml.includes('</urlset>')) {
  fail('sitemap.xml is not a valid urlset document.');
}

const locs = getMatches(xml, /<loc>(.*?)<\/loc>/g);
const imageLocs = getMatches(xml, /<image:loc>(.*?)<\/image:loc>/g);

if (locs.length === 0) {
  fail('No <loc> entries found in sitemap.xml');
}

const duplicates = [];
const seen = new Set();
for (const loc of locs) {
  if (seen.has(loc)) duplicates.push(loc);
  seen.add(loc);
}
if (duplicates.length > 0) {
  fail(`Duplicate <loc> entries found (${duplicates.length}).`);
}

const missingRoutes = requiredRoutes
  .map((route) => `${SITE_URL}${route}`)
  .filter((url) => !seen.has(url));
if (missingRoutes.length > 0) {
  const preview = missingRoutes.slice(0, 10).join(', ');
  fail(`Missing required URLs in sitemap (${missingRoutes.length}). Examples: ${preview}`);
}

const badImageUrls = imageLocs.filter((url) => !url.startsWith(`${SITE_URL}/`));
if (badImageUrls.length > 0) {
  const preview = badImageUrls.slice(0, 5).join(', ');
  fail(`Found non-canonical image URLs in sitemap. Examples: ${preview}`);
}

const missingImageFiles = [];
for (const imageUrl of imageLocs) {
  const relPath = imageUrl.replace(`${SITE_URL}/`, '');
  const absolutePath = path.join(PUBLIC_DIR, relPath);
  if (!fs.existsSync(absolutePath)) {
    missingImageFiles.push(relPath);
  }
}
if (missingImageFiles.length > 0) {
  const preview = missingImageFiles.slice(0, 10).join(', ');
  fail(`Sitemap references missing image files (${missingImageFiles.length}). Examples: ${preview}`);
}

console.log('Sitemap integrity passed.');
console.log(`Checked ${locs.length} URLs and ${imageLocs.length} image URLs.`);
