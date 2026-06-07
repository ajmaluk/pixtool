import { describe, it, expect, beforeAll } from 'vitest'
import fs from 'fs'
import path from 'path'
import { execSync } from 'child_process'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const PUBLIC_DIR = path.join(__dirname, '..', '..', 'public')
const SITEMAP_PATH = path.join(PUBLIC_DIR, 'sitemap.xml')

// Helper to extract all <loc> values from sitemap XML
function extractLocs(xml) {
  return [...xml.matchAll(/<loc>(.*?)<\/loc>/g)].map((m) => m[1])
}

describe('Sitemap Generator', () => {
  beforeAll(() => {
    // Run the sitemap generator as a child process for reliable execution
    execSync('node ../generate-sitemap.js', { cwd: __dirname })
  })

  it('generates a valid sitemap.xml file', () => {
    expect(fs.existsSync(SITEMAP_PATH)).toBe(true)
    const xml = fs.readFileSync(SITEMAP_PATH, 'utf-8')
    expect(xml).toContain('<urlset')
    expect(xml).toContain('</urlset>')
  })

  it('produces no duplicate <loc> entries', () => {
    const xml = fs.readFileSync(SITEMAP_PATH, 'utf-8')
    const locs = extractLocs(xml)

    expect(locs.length).toBeGreaterThan(0)

    const seen = new Set()
    const duplicates = []
    for (const loc of locs) {
      if (seen.has(loc)) duplicates.push(loc)
      seen.add(loc)
    }

    expect(duplicates).toEqual([])
  })

  it('contains the home page as the first entry', () => {
    const xml = fs.readFileSync(SITEMAP_PATH, 'utf-8')
    const locs = extractLocs(xml)
    expect(locs[0]).toBe('https://www.pixtool.in/')
  })

  it('includes all required hub pages', () => {
    const xml = fs.readFileSync(SITEMAP_PATH, 'utf-8')
    const locs = extractLocs(xml)
    const locSet = new Set(locs)

    const requiredHubs = [
      'https://www.pixtool.in/',
      'https://www.pixtool.in/image-tools',
      'https://www.pixtool.in/pdf-tools',
      'https://www.pixtool.in/utility-tools',
      'https://www.pixtool.in/ai-tools',
      'https://www.pixtool.in/math-tools',
      'https://www.pixtool.in/productivity-tools',
    ]

    for (const hub of requiredHubs) {
      expect(locSet.has(hub)).toBe(true)
    }
  })

  it('includes all non-coming-soon tool pages', async () => {
    const xml = fs.readFileSync(SITEMAP_PATH, 'utf-8')
    const locs = extractLocs(xml)
    const locSet = new Set(locs)

    // Dynamically import tools to get actual paths
    const { IMAGE_TOOLS, PDF_TOOLS, UTILITY_TOOLS, AI_TOOLS, MATH_TOOLS, PRODUCTIVITY_TOOLS } =
      await import('../../src/data/tools.js')

    const allToolArrays = [
      IMAGE_TOOLS,
      PDF_TOOLS,
      UTILITY_TOOLS,
      AI_TOOLS,
      MATH_TOOLS,
      PRODUCTIVITY_TOOLS,
    ]

    for (const toolArray of allToolArrays) {
      for (const tool of toolArray) {
        if (tool.status === 'coming-soon') continue
        const fullUrl = `https://www.pixtool.in${tool.path}`
        expect(locSet.has(fullUrl)).toBe(true)
      }
    }
  })

  it('each <loc> has a matching <lastmod>', () => {
    const xml = fs.readFileSync(SITEMAP_PATH, 'utf-8')
    const urlBlocks = xml.split('<url>').slice(1) // skip before first <url>

    for (const block of urlBlocks) {
      const loc = block.match(/<loc>(.*?)<\/loc>/)?.[1]
      const lastmod = block.match(/<lastmod>(.*?)<\/lastmod>/)?.[1]
      expect(loc).toBeDefined()
      expect(lastmod).toBeDefined()
      // Validate date format YYYY-MM-DD
      expect(lastmod).toMatch(/^\d{4}-\d{2}-\d{2}$/)
    }
  })

  it('all image:loc URLs use the canonical site URL', () => {
    const xml = fs.readFileSync(SITEMAP_PATH, 'utf-8')
    const imageLocs = [...xml.matchAll(/<image:loc>(.*?)<\/image:loc>/g)].map((m) => m[1])

    for (const imageLoc of imageLocs) {
      expect(imageLoc).toMatch(/^https:\/\/www\.pixtool\.in\//)
    }
  })

  it('does not contain any redirect-only paths', () => {
    const xml = fs.readFileSync(SITEMAP_PATH, 'utf-8')
    const locs = extractLocs(xml)
    const locSet = new Set(locs)

    // These are legacy redirect paths that should NOT be in the sitemap
    const redirectPaths = [
      'https://www.pixtool.in/fake-email',
      'https://www.pixtool.in/disposable-email',
      'https://www.pixtool.in/throwaway-email',
      'https://www.pixtool.in/10-minute-mail',
      'https://www.pixtool.in/change-email',
    ]

    for (const redirectPath of redirectPaths) {
      expect(locSet.has(redirectPath)).toBe(false)
    }
  })
})
