import { readdirSync, statSync } from 'fs';
import { join } from 'path';

const DIST_DIR = 'dist';
const MAX_TOTAL_JS_BYTES = Number(process.env.MAX_TOTAL_JS_BYTES || 2_500_000);
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

let hasErrors = false;
let totalJs = 0;

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

console.log(`\nTotal JS: ${(totalJs / 1024).toFixed(2)}KB`);
if (totalJs > MAX_TOTAL_JS_BYTES) {
  console.error(`MISS total JS limit: ${(MAX_TOTAL_JS_BYTES / 1024).toFixed(2)}KB`);
  hasErrors = true;
}

if (hasErrors) {
  console.error('\nBundle size check failed.');
  process.exit(1);
}

console.log('\nBundle size check passed.');
