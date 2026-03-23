import { readFileSync, existsSync } from 'fs';
import { join } from 'path';

const DIST_DIR = 'dist';
const REQUIRED_FILES = [
  '_headers',
  '_redirects',
  'index.html',
  'robots.txt',
  'sitemap.xml',
];

const REQUIRED_HEADERS = [
  { key: '/pix-admin', desc: 'Admin route protection' },
  { key: 'X-Robots-Tag', desc: 'Noindex directive' },
  { key: 'Cache-Control', desc: 'Cache policy' },
  { key: 'X-Frame-Options', desc: 'Clickjacking protection' },
  { key: 'X-Content-Type-Options', desc: 'MIME sniffing protection' },
];

let hasErrors = false;

console.log('Validating Cloudflare Pages build output...\n');

console.log('Checking required files:');
for (const file of REQUIRED_FILES) {
  const filePath = join(DIST_DIR, file);
  if (!existsSync(filePath)) {
    console.error(`  Missing: ${file}`);
    hasErrors = true;
  } else {
    console.log(`  Found: ${file}`);
  }
}

console.log('\nValidating security headers:');
const headersPath = join(DIST_DIR, '_headers');
if (existsSync(headersPath)) {
  const headersContent = readFileSync(headersPath, 'utf-8');
  for (const { key, desc } of REQUIRED_HEADERS) {
    if (!headersContent.includes(key)) {
      console.error(`  Missing "${key}" (${desc})`);
      hasErrors = true;
    } else {
      console.log(`  Found "${key}" (${desc})`);
    }
  }
} else {
  console.error('  Cannot validate: _headers file missing');
  hasErrors = true;
}

console.log('\nValidating redirects:');
const redirectsPath = join(DIST_DIR, '_redirects');
if (existsSync(redirectsPath)) {
  const redirectsContent = readFileSync(redirectsPath, 'utf-8');
  if (!redirectsContent.includes('/* /index.html 200')) {
    console.error('  Missing SPA fallback: /* /index.html 200');
    hasErrors = true;
  } else {
    console.log('  SPA fallback configured');
  }

  if (!redirectsContent.includes('https://www.pixtool.in')) {
    console.warn('  Warning: no HTTPS/WWW canonical redirect found (optional but recommended)');
  } else {
    console.log('  Domain canonicalization configured');
  }
} else {
  console.error('  Cannot validate: _redirects file missing');
  hasErrors = true;
}

console.log('\nValidating robots.txt:');
const robotsPath = join(DIST_DIR, 'robots.txt');
if (existsSync(robotsPath)) {
  const robotsContent = readFileSync(robotsPath, 'utf-8');
  const requiredRobots = [
    { key: 'Disallow: /pix-admin', desc: 'Admin blocking' },
    { key: 'Sitemap:', desc: 'Sitemap reference' },
  ];

  for (const { key, desc } of requiredRobots) {
    if (!robotsContent.includes(key)) {
      console.error(`  Missing "${key}" (${desc})`);
      hasErrors = true;
    } else {
      console.log(`  Found "${key}" (${desc})`);
    }
  }
} else {
  console.error('  Cannot validate: robots.txt file missing');
  hasErrors = true;
}

console.log(`\n${'='.repeat(50)}`);
if (hasErrors) {
  console.error('Build validation FAILED - fix errors above');
  process.exit(1);
}

console.log('Build validation PASSED - ready for deployment!');
console.log('\nNext steps:');
console.log('  - Deploy to Cloudflare Pages');
console.log('  - Run npm run check-live');
console.log('  - Verify curl -I https://www.pixtool.in/pix-admin');
