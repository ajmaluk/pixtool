import fs from 'node:fs/promises'
import path from 'node:path'

const ROOT = process.cwd()
const SRC_DIR = path.join(ROOT, 'src')

async function walk(dir) {
  const entries = await fs.readdir(dir, { withFileTypes: true })
  const files = []
  for (const entry of entries) {
    const full = path.join(dir, entry.name)
    if (entry.isDirectory()) {
      files.push(...(await walk(full)))
      continue
    }
    if (/\.(js|jsx|ts|tsx|json|md|xml)$/i.test(entry.name)) {
      files.push(full)
    }
  }
  return files
}

async function main() {
  const files = await walk(SRC_DIR)
  let updated = 0

  for (const file of files) {
    const original = await fs.readFile(file, 'utf8')
    const next = original.replace(/(\/screenshots\/[^"'\s<>]+)\.png/g, '$1.webp')
    if (next !== original) {
      await fs.writeFile(file, next, 'utf8')
      updated += 1
    }
  }

  console.log(`Updated screenshot extensions in ${updated} files.`)
}

main().catch((error) => {
  console.error('Replacement failed:', error)
  process.exit(1)
})
