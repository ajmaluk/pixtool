import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { IMAGE_TOOLS, PDF_TOOLS, UTILITY_TOOLS, AI_TOOLS, MATH_TOOLS, PRODUCTIVITY_TOOLS } from '../src/data/tools.js';
import { posts } from '../src/data/posts.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.join(__dirname, '..');
const PUBLIC_DIR = path.join(ROOT_DIR, 'public');
const LLMS_PATH = path.join(PUBLIC_DIR, 'llms.txt');
const LLMS_FULL_PATH = path.join(PUBLIC_DIR, 'llms-full.txt');
const SITE_URL = process.env.VITE_SITE_URL || 'https://www.pixtool.in';

const requiredToolRoutes = [
  ...IMAGE_TOOLS.map((t) => t.path),
  ...PDF_TOOLS.map((t) => t.path),
  ...UTILITY_TOOLS.map((t) => t.path),
  ...AI_TOOLS.map((t) => t.path),
  ...MATH_TOOLS.map((t) => t.path),
  ...PRODUCTIVITY_TOOLS.map((t) => t.path),
];

const requiredBlogRoutes = posts.map((post) => `/blog/${post.slug}`);
const requiredAiDiscoveryRoutes = [...new Set([...requiredToolRoutes, ...requiredBlogRoutes])];

function fail(message) {
  console.error(`ERROR: ${message}`);
  process.exit(1);
}

if (!fs.existsSync(LLMS_PATH)) {
  fail('public/llms.txt not found. Run `npm run generate:llms` first.');
}

if (!fs.existsSync(LLMS_FULL_PATH)) {
  fail('public/llms-full.txt not found. Run `npm run generate:llms` first.');
}

const llmsContent = fs.readFileSync(LLMS_PATH, 'utf-8');
const llmsFullContent = fs.readFileSync(LLMS_FULL_PATH, 'utf-8');

if (!llmsContent.includes(`${SITE_URL}/llms-full.txt`)) {
  fail('public/llms.txt must reference the full manifest URL.');
}

const missingAiDiscoveryUrls = requiredAiDiscoveryRoutes
  .map((route) => `${SITE_URL}${route}`)
  .filter((url) => !llmsFullContent.includes(url));

if (missingAiDiscoveryUrls.length > 0) {
  const preview = missingAiDiscoveryUrls.slice(0, 10).join(', ');
  fail(`LLM full manifest is missing required URLs (${missingAiDiscoveryUrls.length}). Examples: ${preview}`);
}

console.log('LLM manifest integrity passed.');
console.log(`Checked ${requiredAiDiscoveryRoutes.length} required tool/blog URLs.`);
