import fs from 'node:fs/promises'
import path from 'node:path'
import sharp from 'sharp'

const ROOT = process.cwd()
const SCREENSHOTS_DIR = path.join(ROOT, 'public', 'screenshots')

async function main() {
  const entries = await fs.readdir(SCREENSHOTS_DIR, { withFileTypes: true })
  const pngFiles = entries
    .filter((entry) => entry.isFile() && entry.name.toLowerCase().endsWith('.png'))
    .map((entry) => entry.name)

  let converted = 0

  for (const pngName of pngFiles) {
    const inputPath = path.join(SCREENSHOTS_DIR, pngName)
    const outputName = pngName.replace(/\.png$/i, '.webp')
    const outputPath = path.join(SCREENSHOTS_DIR, outputName)

    await sharp(inputPath)
      .webp({ quality: 78, effort: 6 })
      .toFile(outputPath)

    converted += 1
  }

  console.log(`Converted ${converted} screenshot PNG files to WebP.`)
}

main().catch((error) => {
  console.error('WebP conversion failed:', error)
  process.exit(1)
})
