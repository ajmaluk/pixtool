import { readdirSync, statSync, readFileSync } from 'fs';
import { join } from 'path';

const DIST_DIR = 'dist';
const MAX_TOTAL_JS_BYTES = Number(process.env.MAX_TOTAL_JS_BYTES || 4_000_000);
const MAX_INITIAL_JS_BYTES = Number(process.env.MAX_INITIAL_JS_BYTES || 1_500_000);
const MAX_SINGLE_JS_BYTES = Number(process.env.MAX_SINGLE_JS_BYTES || 900_000);

const walk = (dir, list = []) => {
  for (const entry of readdirSync(dir)) {
    const filePath = join(dir, entry);
    const stat = statSync(filePath);
    if (stat.isDirectory()) {
      walk(filePath, list);
    } else {
      list.push({ filePath, size: stat.size });
    }
  }
  return list;
};

const files = walk(DIST_DIR);
const jsFiles = files.filter((f) => f.filePath.endsWith('.js'));

const getInitialJsFiles = () => {
  const indexPath = join(DIST_DIR, 'index.html');
  const html = readFileSync(indexPath, 'utf8');
  const refs = new Set();

  const scriptSrcPattern = /<script[^>]+src="([^\"]+\.js)"/g;
  const preloadPattern = /<link[^>]+rel="modulepreload"[^>]+href="([^\"]+\.js)"/g;

  for (const pattern of [scriptSrcPattern, preloadPattern]) {
    let match;
    while ((match = pattern.exec(html)) !== null) {
      const raw = match[1];
      if (!raw) continue;
      refs.add(raw.replace(/^\//, ''));
    }
  }

  return [...refs]
    .map((relPath) => join(DIST_DIR, relPath))
    .filter((filePath) => {
      try {
        return statSync(filePath).isFile();
      } catch {
        return false;
      }
    });
};

let hasErrors = false;
let totalJs = 0;
let initialJs = 0;

console.log('Checking bundle size...\n');

for (const file of jsFiles) {
  totalJs += file.size;
  const kb = (file.size / 1024).toFixed(2);
  const rel = file.filePath.replace(`${DIST_DIR}/`, '');
  if (file.size > MAX_SINGLE_JS_BYTES) {
    console.error(`MISS single JS limit: ${rel} -> ${kb}KB`);
    hasErrors = true;
  } else {
    console.log(`OK   ${rel} -> ${kb}KB`);
  }
}

for (const filePath of getInitialJsFiles()) {
  initialJs += statSync(filePath).size;
}

console.log(`\nTotal JS: ${(totalJs / 1024).toFixed(2)}KB`);
if (totalJs > MAX_TOTAL_JS_BYTES) {
  console.error(`MISS total JS limit: ${(MAX_TOTAL_JS_BYTES / 1024).toFixed(2)}KB`);
  hasErrors = true;
}

console.log(`Initial route JS: ${(initialJs / 1024).toFixed(2)}KB`);
if (initialJs > MAX_INITIAL_JS_BYTES) {
  console.error(`MISS initial JS limit: ${(MAX_INITIAL_JS_BYTES / 1024).toFixed(2)}KB`);
  hasErrors = true;
}

if (hasErrors) {
  console.error('\nBundle size check failed.');
  process.exit(1);
}

console.log('\nBundle size check passed.');
