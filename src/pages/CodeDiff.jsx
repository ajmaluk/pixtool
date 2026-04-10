import { useMemo, useState } from 'react'
import { ArrowLeftRight, Copy, RefreshCw, Wand2, Plus, Minus, Hash } from 'lucide-react'
import SEO from '../components/SEO'
import Breadcrumbs from '../components/Breadcrumbs'
import ShareTool from '../components/ShareTool'
import ToolContent from '../components/ToolContent'
import AdSpace from '../components/AdSpace'
import { useRatePopup } from '../hooks/useRatePopup'
import { ALL_TOOLS_MAP } from '../data/tools'

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
  const { triggerRating } = useRatePopup()
  const toolData = ALL_TOOLS_MAP['code-diff']

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
    triggerRating('code-diff')
  }

  let leftNo = 0
  let rightNo = 0

  return (
    <>
      <SEO
        {...toolData.seo}
        path={toolData.path}
        breadcrumbs={[{ name: 'Utility Tools', item: '/utility-tools' }, { name: toolData.title, item: toolData.path }]}
      />

      <div className="page-container">
        <Breadcrumbs items={[
          { name: 'Utility Tools', item: '/utility-tools' },
          { name: toolData.title, item: toolData.path }
        ]} />

        <div className="landing-layout">
          <AdSpace type="side" className="desktop-only" />

          <div className="landing-center">
            <AdSpace type="top" />

            <div className="page-hero">
              <div className="page-hero-content">
                <h1 className="page-title">{toolData.title}</h1>
                <p className="page-subtitle">
                  {toolData.description}
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

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '1rem', marginBottom: '1.5rem' }}>
              <div className="tool-panel">
                <h3 style={{ marginTop: 0, fontSize: '1rem', fontWeight: 800 }}>Old Version</h3>
                <textarea
                  className="input"
                  value={leftText}
                  onChange={(e) => setLeftText(e.target.value)}
                  placeholder="Paste original code here"
                  style={{ minHeight: '300px', fontFamily: 'var(--font-mono)', fontSize: '0.85rem' }}
                />
              </div>

              <div className="tool-panel">
                <h3 style={{ marginTop: 0, fontSize: '1rem', fontWeight: 800 }}>New Version</h3>
                <textarea
                  className="input"
                  value={rightText}
                  onChange={(e) => setRightText(e.target.value)}
                  placeholder="Paste updated code here"
                  style={{ minHeight: '300px', fontFamily: 'var(--font-mono)', fontSize: '0.85rem' }}
                />
              </div>
            </div>

            <div className="tool-panel" style={{ marginBottom: '2rem' }}>
              <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap', marginBottom: '1.5rem', fontWeight: 800, fontSize: '0.9rem' }}>
                <span style={{ color: 'var(--accent-emerald)', display: 'flex', alignItems: 'center', gap: '0.4rem' }}><Plus size={16}/> Added: {stats.added}</span>
                <span style={{ color: 'var(--accent-red)', display: 'flex', alignItems: 'center', gap: '0.4rem' }}><Minus size={16}/> Removed: {stats.removed}</span>
                <span style={{ color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '0.4rem' }}><Hash size={16}/> Unchanged: {stats.unchanged}</span>
              </div>

              <div style={{ border: '1px solid var(--border-color)', borderRadius: '16px', overflow: 'hidden', background: 'var(--bg-secondary)' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', background: 'var(--bg-tertiary)', padding: '0.75rem 1rem', fontWeight: 800, fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  <div>Original Code</div>
                  <div>Modified Code</div>
                </div>
                <div style={{ maxHeight: '500px', overflow: 'auto' }}>
                  {rows.map((row, idx) => {
                    const leftDisplayNo = row.type !== 'add' ? ++leftNo : ''
                    const rightDisplayNo = row.type !== 'remove' ? ++rightNo : ''
                    const bg = row.type === 'add' ? 'rgba(16, 185, 129, 0.08)' : row.type === 'remove' ? 'rgba(239, 68, 68, 0.08)' : 'transparent'

                    return (
                      <div key={`${row.type}-${idx}`} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', borderTop: '1px solid var(--border-color)', background: bg }}>
                        <div style={{ display: 'grid', gridTemplateColumns: '48px 1fr', fontFamily: 'var(--font-mono)', fontSize: '0.8rem' }}>
                          <div style={{ padding: '0.35rem 0.65rem', color: 'var(--text-muted)', borderRight: '1px solid var(--border-color)', textAlign: 'right', userSelect: 'none' }}>{leftDisplayNo}</div>
                          <div style={{ padding: '0.35rem 0.65rem', whiteSpace: 'pre-wrap', wordBreak: 'break-word', color: row.type === 'remove' ? 'var(--accent-red)' : 'inherit' }}>{row.leftLine}</div>
                        </div>
                        <div style={{ display: 'grid', gridTemplateColumns: '48px 1fr', fontFamily: 'var(--font-mono)', fontSize: '0.8rem' }}>
                          <div style={{ padding: '0.35rem 0.65rem', color: 'var(--text-muted)', borderLeft: '1px solid var(--border-color)', borderRight: '1px solid var(--border-color)', textAlign: 'right', userSelect: 'none' }}>{rightDisplayNo}</div>
                          <div style={{ padding: '0.35rem 0.65rem', whiteSpace: 'pre-wrap', wordBreak: 'break-word', color: row.type === 'add' ? 'var(--accent-emerald)' : 'inherit' }}>{row.rightLine}</div>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>

            <div className="tool-panel" style={{ marginBottom: '3rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                <h3 style={{ margin: 0, fontSize: '1.2rem', fontWeight: 900 }}>Unified Patch Preview</h3>
                <button className="btn btn-secondary" onClick={copyPatch} style={{ padding: '0.4rem 0.8rem', fontSize: '0.8rem' }}>
                  <Copy size={14} /> Copy Patch
                </button>
              </div>
              <pre style={{ 
                margin: 0, 
                maxHeight: '300px', 
                overflow: 'auto', 
                whiteSpace: 'pre-wrap', 
                wordBreak: 'break-word',
                padding: '1.5rem',
                background: 'var(--bg-tertiary)',
                borderRadius: '12px',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.85rem',
                border: '1px solid var(--border-color)'
              }}>{unified}</pre>
            </div>

            <AdSpace type="bottom" />

            <ShareTool title={`${toolData.title} - PixTool`} />

            <div style={{ marginTop: '5rem' }}>
              <ToolContent {...toolData} />
            </div>
          </div>

          <AdSpace type="side" className="desktop-only" />
        </div>
      </div>
    </>
  )
}
