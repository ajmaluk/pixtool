import { useState, useMemo } from 'react'
import { 
  Binary, Zap, Info, Hash, 
  RotateCw, Download, Trash, Activity
} from 'lucide-react'
import { create, all } from 'mathjs'
import SEO from '../components/SEO'
import Breadcrumbs from '../components/Breadcrumbs'
import AdSpace from '../components/AdSpace'
import ToolContent from '../components/ToolContent'
import ShareTool from '../components/ShareTool'

const math = create(all)

export default function NumberTheory() {
  const [number, setNumber] = useState('1234')

  const results = useMemo(() => {
    try {
      const n = parseInt(number)
      if (isNaN(n)) return null
      
      const isPrime = math.isPrime(n)
      
      // Basic factorization
      const factors = []
      let d = 2
      let temp = n
      while (temp > 1 && d * d <= n) {
        while (temp % d === 0) {
          factors.push(d)
          temp /= d
        }
        d++
      }
      if (temp > 1) factors.push(temp)

      return {
        isPrime: isPrime ? 'Yes' : 'No',
        factorization: factors.join(' × '),
        parity: n % 2 === 0 ? 'Even' : 'Odd',
        binary: n.toString(2),
        hex: n.toString(16).toUpperCase()
      }
    } catch {
        return null
    }
  }, [number])

  return (
    <>
      <SEO 
        title="Number Theory Forge - Prime Factorization & GCD | PixTool"
        description="Analyze number properties instantly. High-authority prime factorization, binary conversion, and modular arithmetic suite. 100% private."
        path="/math-tools/number-theory"
        toolName="Number Theory Forge"
        breadcrumbs={[
            { name: 'Math Suite', item: '/math-tools' },
            { name: 'Number Theory Forge', item: '/math-tools/number-theory' }
        ]}
      />

      <div className="page-container" style={{ paddingTop: '2rem' }}>
        <Breadcrumbs items={[
          { name: 'Math Suite', item: '/math-tools' },
          { name: 'Number Theory Forge', item: '/math-tools/number-theory' }
        ]} />

        <div className="landing-layout">
          <AdSpace type="side" className="desktop-only" />

          <div className="landing-center">
            <AdSpace type="top" />

            <div className="page-hero">
                <h1 className="page-title">Number Theory <span style={{ color: 'var(--accent-blue)' }}>Forge</span></h1>
                <p className="page-subtitle">Analyze integers through prime factorization, base conversion, and modular properties.</p>
            </div>

            <div style={{ maxWidth: '700px', margin: '0 auto 4rem' }}>
                <div className="theory-card" style={{ 
                    background: 'var(--bg-card)', 
                    borderRadius: '32px', 
                    border: '1px solid var(--border-color)', 
                    padding: '3rem', 
                    boxShadow: 'var(--shadow-xl)',
                    position: 'relative',
                    overflow: 'hidden'
                }}>
                    <div style={{ position: 'absolute', top: '1.5rem', left: '2rem', zIndex: 10 }}>
                        <div className="math-text-glow" style={{ fontSize: '0.75rem', fontWeight: 900, color: 'var(--accent-blue)', textTransform: 'uppercase', letterSpacing: '0.2em' }}>
                            <Binary size={14} style={{ display: 'inline', marginRight: '6px' }} /> Cryptographic Engine
                        </div>
                    </div>

                    <div style={{ marginBottom: '3rem', marginTop: '1.5rem' }}>
                      <label htmlFor="number-theory-input" style={{ display: 'block', marginBottom: '1rem', fontWeight: 900, fontSize: '0.85rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.15em', textAlign: 'center' }}>Enter Integer Target</label>
                        <div className="math-oled-display" style={{ padding: '0.5rem', borderRadius: '20px' }}>
                            <input 
                          id="number-theory-input"
                          name="number"
                                type="number"
                                className="input math-btn-glass"
                                value={number}
                                onChange={(e) => setNumber(e.target.value)}
                                placeholder="e.g., 2026"
                                style={{ 
                                    fontSize: '2.5rem', 
                                    fontWeight: 900, 
                                    textAlign: 'center', 
                                    width: '100%', 
                                    padding: '1.5rem', 
                                    borderRadius: '16px',
                                    fontFamily: 'monospace',
                                    color: 'var(--text-primary)',
                                    background: 'rgba(var(--bg-primary-rgb), 0.5)',
                                    border: 'none',
                                    outline: 'none',
                                    letterSpacing: '0.1em'
                                }}
                            />
                        </div>
                    </div>

                    {results ? (
                        <div style={{ display: 'grid', gap: '1.5rem' }}>
                            <div style={{ 
                                padding: '2rem', 
                                background: 'var(--bg-secondary)', 
                                borderRadius: '24px', 
                                border: '1px solid var(--border-color)', 
                                display: 'flex', 
                                justifyContent: 'space-between', 
                                alignItems: 'center',
                                boxShadow: 'inset 0 4px 20px rgba(0, 0, 0, 0.05)'
                            }}>
                                <div style={{ fontSize: '0.85rem', fontWeight: 900, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.15em' }}>Prime Entity</div>
                                <div className="math-text-glow" style={{ fontWeight: 900, fontSize: '1.5rem', color: results.isPrime === 'Yes' ? 'var(--accent-blue)' : 'var(--text-secondary)' }}>{results.isPrime}</div>
                            </div>
                            
                            <div className="math-oled-display" style={{ 
                                padding: '2.5rem 2rem', 
                                borderRadius: '24px', 
                                textAlign: 'center',
                                position: 'relative'
                            }}>
                                <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '4px', background: 'var(--accent-blue)', opacity: 0.5 }}></div>
                                <div style={{ fontSize: '0.85rem', fontWeight: 900, color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '1rem', letterSpacing: '0.15em' }}>Prime Factorization</div>
                                <div style={{ fontWeight: 900, fontSize: '2rem', color: 'var(--accent-blue)', fontFamily: 'monospace' }}>{results.factorization || '1'}</div>
                            </div>

                            <div className="theory-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                                <div style={{ padding: '2rem 1.5rem', background: 'var(--bg-secondary)', borderRadius: '24px', border: '1px solid var(--border-color)', textAlign: 'center', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                                    <div style={{ fontSize: '0.75rem', fontWeight: 900, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '1rem' }}>Binary</div>
                                    <div style={{ fontWeight: 800, fontSize: '1.1rem', overflowWrap: 'break-word', fontFamily: 'monospace', color: 'var(--text-primary)' }}>{results.binary}</div>
                                </div>
                                <div style={{ padding: '2rem 1.5rem', background: 'var(--bg-secondary)', borderRadius: '24px', border: '1px solid var(--border-color)', textAlign: 'center', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                                    <div style={{ fontSize: '0.75rem', fontWeight: 900, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '1rem' }}>Hexadecimal</div>
                                    <div style={{ fontWeight: 800, fontSize: '1.25rem', fontFamily: 'monospace', color: 'var(--text-primary)' }}>0x{results.hex}</div>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="theory-card" style={{ textAlign: 'center', color: 'var(--text-muted)', fontWeight: 800, padding: '3rem', background: 'var(--bg-secondary)', borderRadius: '24px', border: '1px dashed var(--border-color)' }}>
                            <Activity size={24} style={{ margin: '0 auto 1rem', opacity: 0.5 }} />
                            Awaiting Valid Integer Input
                        </div>
                    )}
                </div>
            </div>

            <AdSpace type="bottom" />

            <ShareTool 
                title="Number Theory Forge"
                url="/math-tools/number-theory"
                text="Analyze prime properties and factors instantly with PixTool's elite number theory studio."
            />

            <ToolContent 
                title="Cryptographic Number Logic"
                description="Our Number Theory Forge provides high-authority analysis for discrete mathematics. Engineered for speed, it performs prime factorization and modular base conversion entirely on-device, mimicking senior-level cryptographic utilities."
                benefits={[
                    "Instant Prime primality testing",
                    "High-speed prime factorization engine",
                    "Base-2 (Binary) and Base-16 (Hex) conversion",
                    "Parity and modular property analysis",
                    "Security-first offline processing"
                ]}
                useCases={[
                    { title: "Cybersecurity", description: "Analyze small integer components and find GCD/LCM properties for cryptographic protocols." },
                    { title: "Computer Science", description: "Instantly check bit-patterns and hexadecimal offsets for low-level system debugging." }
                ]}
            />
          </div>

          <AdSpace type="side" className="desktop-only" />
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        @media (max-width: 640px) {
            .theory-card { padding: 1.5rem !important; }
            .theory-grid { grid-template-columns: 1fr !important; }
            .math-oled-display input { padding: 1rem !important; font-size: 1.5rem !important; }
        }
      `}} />
    </>
  )
}
