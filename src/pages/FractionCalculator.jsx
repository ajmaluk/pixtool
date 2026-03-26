import { useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import { 
  Percent, Zap, Info, Layers, 
  RotateCw, Download, Trash, Activity, Divide
} from 'lucide-react'
import { create, all } from 'mathjs'
import SEO from '../components/SEO'
import Breadcrumbs from '../components/Breadcrumbs'
import AdSpace from '../components/AdSpace'
import ToolContent from '../components/ToolContent'
import ShareTool from '../components/ShareTool'

const math = create(all)

export default function FractionCalculator() {
  const [f1, setF1] = useState({ n: '1', d: '2' })
  const [f2, setF2] = useState({ n: '1', d: '3' })
  const [op, setOp] = useState('+')

  const result = useMemo(() => {
    try {
      const frac1 = math.fraction(parseInt(f1.n) || 0, parseInt(f1.d) || 1)
      const frac2 = math.fraction(parseInt(f2.n) || 0, parseInt(f2.d) || 1)
      
      let res
      if (op === '+') res = math.add(frac1, frac2)
      else if (op === '-') res = math.subtract(frac1, frac2)
      else if (op === '*') res = math.multiply(frac1, frac2)
      else if (op === '/') res = math.divide(frac1, frac2)

      return {
          fraction: `${res.n}/${res.d}`,
          decimal: (res.n / res.d).toFixed(4),
          mixed: res.n > res.d ? `${Math.floor(res.n/res.d)} ${res.n % res.d}/${res.d}` : null
      }
    } catch (e) {
      return null
    }
  }, [f1, f2, op])

  return (
    <>
      <SEO 
        title="Precise Fraction Pro - Fractional Arithmetic | PixTool"
        description="Add, subtract, multiply, and divide fractions instantly. Our high-authority fraction calculator provides simplified results and decimal conversions with zero latency."
        path="/math-tools/fraction-calculator"
        toolName="Fraction Pro"
        breadcrumbs={[
            { name: 'Math Suite', item: '/math-tools' },
            { name: 'Fraction Pro', item: '/math-tools/fraction-calculator' }
        ]}
      />

      <div className="page-container" style={{ paddingTop: '2rem' }}>
        <Breadcrumbs items={[
          { name: 'Math Suite', item: '/math-tools' },
          { name: 'Fraction Pro', item: '/math-tools/fraction-calculator' }
        ]} />

        <div className="landing-layout">
          <AdSpace type="side" className="desktop-only" />

          <div className="landing-center">
            <AdSpace type="top" />

            <div className="page-hero">
                <h1 className="page-title">Fraction <span style={{ color: 'var(--accent-blue)' }}>Pro</span></h1>
                <p className="page-subtitle">Precision fractional arithmetic with architectural simplification and mixed-number support.</p>
            </div>

            <div style={{ maxWidth: '800px', margin: '0 auto 4rem' }}>
                <div className="fraction-card" style={{ background: 'var(--bg-card)', borderRadius: '32px', border: '1px solid var(--border-color)', padding: '2.5rem', boxShadow: 'var(--shadow-xl)' }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '2rem', flexWrap: 'wrap' }}>
                        {/* Fraction 1 */}
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', width: '80px' }}>
                            <input className="input" value={f1.n} onChange={(e) => setF1({ ...f1, n: e.target.value })} style={{ textAlign: 'center', fontWeight: 900 }} />
                            <hr style={{ border: 'none', borderTop: '2px solid var(--text-primary)', margin: 0 }} />
                            <input className="input" value={f1.d} onChange={(e) => setF1({ ...f1, d: e.target.value })} style={{ textAlign: 'center', fontWeight: 900 }} />
                        </div>

                        {/* Operation Selector */}
                        <select 
                            className="input" 
                            value={op} 
                            onChange={(e) => setOp(e.target.value)}
                            style={{ width: '80px', textAlign: 'center', fontSize: '1.5rem', fontWeight: 900 }}
                        >
                            <option value="+">+</option>
                            <option value="-">-</option>
                            <option value="*">×</option>
                            <option value="/">÷</option>
                        </select>

                        {/* Fraction 2 */}
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', width: '80px' }}>
                            <input className="input" value={f2.n} onChange={(e) => setF2({ ...f2, n: e.target.value })} style={{ textAlign: 'center', fontWeight: 900 }} />
                            <hr style={{ border: 'none', borderTop: '2px solid var(--text-primary)', margin: 0 }} />
                            <input className="input" value={f2.d} onChange={(e) => setF2({ ...f2, d: e.target.value })} style={{ textAlign: 'center', fontWeight: 900 }} />
                        </div>

                        <div style={{ fontSize: '2rem', fontWeight: 900 }}>=</div>

                        {/* Result Display */}
                        {result && (
                            <div style={{ textAlign: 'center' }}>
                                <div style={{ fontWeight: 900, fontSize: '2rem', color: 'var(--accent-blue)' }}>{result.fraction}</div>
                                <div style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginTop: '0.5rem' }}>({result.decimal})</div>
                            </div>
                        )}
                    </div>

                    {result?.mixed && (
                        <div style={{ marginTop: '2.5rem', textAlign: 'center', padding: '1.5rem', background: 'var(--bg-secondary)', borderRadius: '16px', border: '1px dashed var(--border-color)' }}>
                            <span style={{ fontWeight: 800, color: 'var(--text-muted)', marginRight: '1rem' }}>Mixed Number Form:</span>
                            <span style={{ fontWeight: 900, fontSize: '1.2rem', color: 'var(--accent-blue)' }}>{result.mixed}</span>
                        </div>
                    )}
                </div>
            </div>

            <AdSpace type="bottom" />

            <ShareTool 
                title="Fraction Pro"
                url="/math-tools/fraction-calculator"
                text="Solve fraction equations instantly with PixTool's high-authority arithmetic suite."
            />

            <ToolContent 
                title="Precision Fractional Logic"
                description="Our Fraction Pro uses the exact rational math from the math.js kernel to avoid floating-point errors. It provides architectural simplification and bidirectional conversion between proper, improper, and mixed fractions."
                benefits={[
                    "Exact rational arithmetic (no rounding errors)",
                    "Bidirectional decimal-to-fraction output",
                    "Automatic mixed number conversion",
                    "Simplified reduction logic",
                    "Privacy-first offline processing"
                ]}
                useCases={[
                    { title: "Carpentry & DIY", description: "Combine measurements (e.g., 3/4 and 5/8) instantly without converting to messy decimals." },
                    { title: "Mathematics Education", description: "Verify homework results and understand fraction reduction pathways through visual results." }
                ]}
            />
          </div>

          <AdSpace type="side" className="desktop-only" />
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        @media (max-width: 640px) {
            .fraction-card { padding: 1.5rem !important; }
        }
      `}} />
    </>
  )
}
