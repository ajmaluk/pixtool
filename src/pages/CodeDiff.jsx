import { useMemo, useState } from 'react'
import { ArrowLeftRight, Copy, RefreshCw, Wand2 } from 'lucide-react'
import SEO from '../components/SEO'
import Breadcrumbs from '../components/Breadcrumbs'
import ShareTool from '../components/ShareTool'
import ToolContent from '../components/ToolContent'

const EXAMPLE_OLD = `function sum(a, b) {
  return a + b;
}

console.log(sum(1, 2));`

const EXAMPLE_NEW = `function sum(a, b) {
  const total = a + b;
  return total;
}

console.log(sum(1, 2));
console.log('done');`

function buildDiffRows(leftText, rightText) {
  const left = leftText.split('\n')
  const right = rightText.split('\n')
  const rows = []

  let i = 0
  let j = 0

  while (i < left.length || j < right.length) {
    const leftLine = left[i]
    const rightLine = right[j]

    if (leftLine === rightLine) {
      rows.push({ type: 'same', leftLine, rightLine })
      i += 1
      j += 1
      continue
    }

    if (j + 1 < right.length && leftLine === right[j + 1]) {
      rows.push({ type: 'add', leftLine: '', rightLine })
      j += 1
      continue
    }

    if (i + 1 < left.length && left[i + 1] === rightLine) {
      rows.push({ type: 'remove', leftLine, rightLine: '' })
      i += 1
      continue
    }

    rows.push({ type: 'remove', leftLine, rightLine: '' })
    rows.push({ type: 'add', leftLine: '', rightLine })
    i += 1
    j += 1
  }

  return rows
}

function toUnifiedDiff(rows) {
  const output = ['--- old', '+++ new']

  rows.forEach((row) => {
    if (row.type === 'same') {
      output.push(` ${row.leftLine}`)
      return
    }

    if (row.type === 'remove') {
      output.push(`-${row.leftLine}`)
      return
    }

    output.push(`+${row.rightLine}`)
  })

  return output.join('\n')
}

export default function CodeDiff() {
  const [leftText, setLeftText] = useState('')
  const [rightText, setRightText] = useState('')
  const [toast, setToast] = useState('')

  const rows = useMemo(() => buildDiffRows(leftText, rightText), [leftText, rightText])

  const stats = useMemo(() => {
    const added = rows.filter((r) => r.type === 'add').length
    const removed = rows.filter((r) => r.type === 'remove').length
    const unchanged = rows.filter((r) => r.type === 'same').length
    return { added, removed, unchanged }
  }, [rows])

  const unified = useMemo(() => toUnifiedDiff(rows), [rows])

  const showToast = (message) => {
    setToast(message)
    window.setTimeout(() => setToast(''), 1800)
  }

  const loadExample = () => {
    setLeftText(EXAMPLE_OLD)
    setRightText(EXAMPLE_NEW)
  }

  const swapSides = () => {
    setLeftText(rightText)
    setRightText(leftText)
  }

  const clearAll = () => {
    setLeftText('')
    setRightText('')
  }

  const copyPatch = async () => {
    await navigator.clipboard.writeText(unified)
    showToast('Unified diff copied')
  }

  let leftNo = 0
  let rightNo = 0

  return (
    <>
      <SEO
        title="Free Code Diff Checker Online | Compare Code Side by Side"
        description="Compare old and new code line-by-line in your browser. View additions and deletions instantly and copy a ready-to-share unified patch."
        keywords="code diff online, compare code, unified diff generator, patch checker, text diff tool"
        path="/code-diff"
        toolName="Code Diff"
        toolSteps={[
          'Paste old code in the left panel.',
          'Paste updated code in the right panel.',
          'Review added and removed lines in the diff view.',
          'Copy the unified patch and share it anywhere.'
        ]}
        breadcrumbs={[
          { name: 'Utility Tools', item: '/utility-tools' },
          { name: 'Code Diff', item: '/code-diff' }
        ]}
      />

      <div className="page-container" style={{ maxWidth: '1280px', padding: '2rem' }}>
        <Breadcrumbs items={[
          { name: 'Utility Tools', item: '/utility-tools' },
          { name: 'Code Diff', item: '/code-diff' }
        ]} />

        <div className="page-hero">
          <div className="page-hero-content">
            <h1 className="page-title">Code <span style={{ color: 'var(--accent-emerald)' }}>Diff</span></h1>
            <p className="page-subtitle">
              Compare two code versions instantly, inspect additions and deletions, and copy a unified patch.
            </p>
          </div>
        </div>

        <div className="tool-panel" style={{ marginBottom: '1.5rem' }}>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem' }}>
            <button className="btn btn-secondary" onClick={loadExample}>
              <Wand2 size={16} /> Load Example
            </button>
            <button className="btn btn-secondary" onClick={swapSides}>
              <ArrowLeftRight size={16} /> Swap
            </button>
            <button className="btn btn-secondary" onClick={clearAll}>
              <RefreshCw size={16} /> Clear
            </button>
            <button className="btn btn-primary" onClick={copyPatch}>
              <Copy size={16} /> Copy Unified Diff
            </button>
          </div>
        </div>

        {toast && (
          <div style={{ marginBottom: '1rem', fontWeight: 700, color: 'var(--accent-emerald)' }}>{toast}</div>
        )}

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.5rem' }}>
          <div className="tool-panel">
            <h3 style={{ marginTop: 0 }}>Old Version</h3>
            <textarea
              className="input"
              value={leftText}
              onChange={(e) => setLeftText(e.target.value)}
              placeholder="Paste original code here"
              style={{ minHeight: '260px', fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace' }}
            />
          </div>

          <div className="tool-panel">
            <h3 style={{ marginTop: 0 }}>New Version</h3>
            <textarea
              className="input"
              value={rightText}
              onChange={(e) => setRightText(e.target.value)}
              placeholder="Paste updated code here"
              style={{ minHeight: '260px', fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace' }}
            />
          </div>
        </div>

        <div className="tool-panel" style={{ marginBottom: '2rem' }}>
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginBottom: '1rem' }}>
            <span><strong>Added:</strong> {stats.added}</span>
            <span><strong>Removed:</strong> {stats.removed}</span>
            <span><strong>Unchanged:</strong> {stats.unchanged}</span>
          </div>

          <div style={{ border: '1px solid var(--border-color)', borderRadius: '12px', overflow: 'hidden' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', background: 'var(--bg-secondary)', padding: '0.75rem 1rem', fontWeight: 700 }}>
              <div>Old</div>
              <div>New</div>
            </div>
            <div style={{ maxHeight: '420px', overflow: 'auto' }}>
              {rows.map((row, idx) => {
                const leftDisplayNo = row.type !== 'add' ? ++leftNo : ''
                const rightDisplayNo = row.type !== 'remove' ? ++rightNo : ''
                const bg = row.type === 'add' ? 'rgba(16, 185, 129, 0.12)' : row.type === 'remove' ? 'rgba(239, 68, 68, 0.12)' : 'transparent'

                return (
                  <div key={`${row.type}-${idx}`} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', borderTop: '1px solid var(--border-color)', background: bg }}>
                    <div style={{ display: 'grid', gridTemplateColumns: '48px 1fr', fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace', fontSize: '0.88rem' }}>
                      <div style={{ padding: '0.35rem 0.65rem', color: 'var(--text-muted)', borderRight: '1px solid var(--border-color)' }}>{leftDisplayNo}</div>
                      <div style={{ padding: '0.35rem 0.65rem', whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}>{row.leftLine}</div>
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: '48px 1fr', fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace', fontSize: '0.88rem' }}>
                      <div style={{ padding: '0.35rem 0.65rem', color: 'var(--text-muted)', borderLeft: '1px solid var(--border-color)', borderRight: '1px solid var(--border-color)' }}>{rightDisplayNo}</div>
                      <div style={{ padding: '0.35rem 0.65rem', whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}>{row.rightLine}</div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>

        <div className="tool-panel" style={{ marginBottom: '3rem' }}>
          <h3 style={{ marginTop: 0 }}>Unified Patch Preview</h3>
          <pre style={{ margin: 0, maxHeight: '240px', overflow: 'auto', whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}>{unified}</pre>
        </div>

        <ShareTool
          title="Code Diff"
          url="/code-diff"
          text="Compare code changes side-by-side and generate a unified diff instantly"
        />

        <div style={{ marginTop: '4rem' }}>
          <ToolContent
            title="Code Review Diff Helper"
            description="Use this tool to compare two versions of code, audit exact line-level changes, and create a clean patch for review."
            benefits={[
              'Fast side-by-side diff view in browser',
              'Clear added and removed line highlights',
              'One-click unified patch copy',
              'No login and no uploads required'
            ]}
            howTo={[
              'Paste your previous code on the left.',
              'Paste your updated code on the right.',
              'Scan added and removed rows in the diff viewer.',
              'Copy the unified patch for pull requests or chat reviews.'
            ]}
            relatedTools={[
              { name: 'Typing Test', path: '/typing-test' },
              { name: 'QR Generator', path: '/qr-generator' },
              { name: 'Utility Tools', path: '/utility-tools' }
            ]}
          />
        </div>
      </div>
    </>
  )
}
