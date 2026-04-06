import { useState } from 'react'
 
import { 
  Grid, RefreshCw, Trash2, Maximize2, 
  Settings, Info, Download, Trash, Layers
} from 'lucide-react'
import SEO from '../components/SEO'
import Breadcrumbs from '../components/Breadcrumbs'
import AdSpace from '../components/AdSpace'
import ToolContent from '../components/ToolContent'
import ShareTool from '../components/ShareTool'
// mathjs will be loaded dynamically for performance
let mathPromise = null;
const getMath = () => {
  if (!mathPromise) {
    mathPromise = import('mathjs').then(module => {
      return module.create(module.all)
    });
  }
  return mathPromise;
};

export default function MatrixSolver() {
  const [size, setSize] = useState(3)
  const [matrix, setMatrix] = useState(() => Array(3).fill().map(() => Array(3).fill('')))
  const [result, setResult] = useState(null)
  const [error, setError] = useState(null)

  const handleSizeChange = (newSize) => {
    const s = Math.max(2, Math.min(5, newSize))
    setSize(s)
    setMatrix(Array(s).fill().map(() => Array(s).fill('')))
    setResult(null)
    setError(null)
  }

  const updateCell = (r, c, val) => {
    const newMatrix = [...matrix]
    newMatrix[r][c] = val
    setMatrix(newMatrix)
    setError(null)
  }

  const solve = (op) => {
    getMath().then(math => {
      try {
        const numericMatrix = matrix.map(row => row.map(cell => {
          const val = math.evaluate(cell || '0')
          if (typeof val !== 'number') throw new Error()
          return val
        }))

        let res
        if (op === 'det') {
          res = `Determinant: ${math.det(numericMatrix)}`
        } else if (op === 'inv') {
          res = math.inv(numericMatrix)
        } else if (op === 'transpose') {
          res = math.transpose(numericMatrix)
        }
        setResult({ type: op, data: res })
      } catch {
        setError('Invalid Matrix or Operation (e.g., non-invertible)')
      }
    })
  }

  return (
    <>
      <SEO 
        title="Professional Matrix Solver - Linear Algebra Studio | PixTool"
        description="Solve complex matrix operations instantly. Calculate determinants, inverses, and transposes with our high-authority linear algebra workspace. 100% private."
        path="/math-tools/matrix-solver"
        toolName="Matrix Solver"
        breadcrumbs={[
            { name: 'Math Suite', item: '/math-tools' },
            { name: 'Matrix Solver', item: '/math-tools/matrix-solver' }
        ]}
      />

      <div className="page-container" style={{ paddingTop: '2rem' }}>
        <Breadcrumbs items={[
          { name: 'Math Suite', item: '/math-tools' },
          { name: 'Matrix Solver', item: '/math-tools/matrix-solver' }
        ]} />

        <div className="landing-layout">
          <AdSpace type="side" className="desktop-only" />

          <div className="landing-center">
            <AdSpace type="top" />

            <div className="page-hero">
                <h1 className="page-title">Matrix <span style={{ color: 'var(--accent-blue)' }}>Solver</span></h1>
                <p className="page-subtitle">Expert linear algebra studio for professional-grade matrix computation.</p>
            </div>

            <div style={{ maxWidth: '900px', margin: '0 auto 4rem' }}>
                <div className="matrix-card" style={{ 
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
                            <Layers size={14} style={{ display: 'inline', marginRight: '6px' }} /> Linear Algebra Engine
                        </div>
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2.5rem', marginTop: '1.5rem' }}>
                        <div style={{ fontWeight: 800, fontSize: '0.9rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Dimension Scope: {size}x{size}</div>
                        <div style={{ display: 'flex', gap: '0.5rem', background: 'var(--bg-secondary)', padding: '0.5rem', borderRadius: '16px', border: '1px solid var(--border-color)' }}>
                            {[2, 3, 4, 5].map(s => (
                                <button 
                                    key={s} 
                                    onClick={() => handleSizeChange(s)}
                                    className={`math-btn-glass ${size === s ? 'active' : ''}`}
                                    style={{ 
                                        padding: '0.5rem 1.25rem', 
                                        borderRadius: '12px', 
                                        fontSize: '0.85rem', 
                                        fontWeight: 800,
                                        color: size === s ? 'var(--accent-blue)' : 'var(--text-secondary)',
                                        border: size === s ? '1px solid var(--accent-blue)' : '1px solid transparent'
                                    }}
                                >
                                    {s}x{s}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div style={{ 
                        display: 'flex',
                        justifyContent: 'center',
                        marginBottom: '3rem'
                    }}>
                        <div className="math-oled-display" style={{ 
                            display: 'grid', 
                            gridTemplateColumns: `repeat(${size}, 1fr)`, 
                            gap: '0.75rem', 
                            padding: '2.5rem',
                            borderRadius: '24px',
                            minWidth: '50%'
                        }}>
                            {matrix.map((row, r) => row.map((cell, c) => (
                                <input 
                                    key={`${r}-${c}`}
                                    className="input math-btn-glass"
                                    value={cell}
                                    onChange={(e) => updateCell(r, c, e.target.value)}
                                    placeholder="0"
                                    style={{ 
                                        textAlign: 'center', 
                                        fontWeight: 800, 
                                        fontSize: '1.25rem', 
                                        padding: '1rem', 
                                        borderRadius: '12px',
                                        background: 'rgba(var(--bg-primary-rgb), 0.8)',
                                        color: 'var(--text-primary)',
                                        fontFamily: 'monospace'
                                    }}
                                />
                            )))}
                        </div>
                    </div>

                    {error && (
                        <div style={{ color: 'var(--accent-red)', textAlign: 'center', marginBottom: '1.5rem', fontWeight: 800, fontSize: '0.9rem', padding: '1rem', background: 'rgba(239, 68, 68, 0.1)', borderRadius: '12px', border: '1px solid rgba(239, 68, 68, 0.3)' }}>
                            {error}
                        </div>
                    )}

                    <div className="matrix-btn-group" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '1rem' }}>
                        <button className="math-btn-eval" style={{ padding: '1.25rem', borderRadius: '16px', fontWeight: 800, fontSize: '1rem', textTransform: 'uppercase', letterSpacing: '0.1em' }} onClick={() => solve('det')}>Determinant</button>
                        <button className="math-btn-eval" style={{ padding: '1.25rem', borderRadius: '16px', fontWeight: 800, fontSize: '1rem', textTransform: 'uppercase', letterSpacing: '0.1em' }} onClick={() => solve('inv')}>Inverse</button>
                        <button className="math-btn-eval" style={{ padding: '1.25rem', borderRadius: '16px', fontWeight: 800, fontSize: '1rem', textTransform: 'uppercase', letterSpacing: '0.1em' }} onClick={() => solve('transpose')}>Transpose</button>
                    </div>
                </div>

                {/* Result Section */}
                {result && (
                    <div 
                        style={{ 
                            marginTop: '2.5rem', 
                            padding: '3rem', 
                            background: 'var(--bg-card)', 
                            borderRadius: '32px',
                            border: '1px solid var(--accent-blue)',
                            boxShadow: '0 20px 40px rgba(59, 130, 246, 0.1)',
                            textAlign: 'center',
                            position: 'relative'
                        }}
                    >
                            <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '4px', background: 'var(--accent-blue)', opacity: 0.5 }}></div>
                            <h2 style={{ fontWeight: 900, marginBottom: '2rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.2em', fontSize: '0.8rem' }}>Operation: <span style={{ color: 'var(--accent-blue)' }}>{result.type}</span></h2>
                            
                            {typeof result.data === 'string' ? (
                                <div className="math-text-glow" style={{ fontSize: '2.5rem', fontWeight: 900, fontFamily: 'monospace', color: 'var(--text-primary)' }}>{result.data}</div>
                            ) : (
                                <div className="math-oled-display" style={{ 
                                    display: 'inline-grid', 
                                    gridTemplateColumns: `repeat(${result.data[0].length}, 1fr)`, 
                                    gap: '1rem',
                                    padding: '2.5rem',
                                    borderRadius: '24px'
                                }}>
                                    {result.data.map((row, r) => row.map((cell, c) => {
                                        // We need to define math format locally or pass it
                                        // Since we are inside the component, we can use a small formatter
                                        const formatNum = (n) => Number(n).toFixed(4).replace(/\.?0+$/, "");
                                        return (
                                            <div key={`${r}-${c}`} style={{ 
                                                padding: '1.25rem', 
                                                background: 'rgba(var(--bg-secondary-rgb), 0.5)', 
                                                borderRadius: '12px', 
                                                fontWeight: 800,
                                                border: '1px solid rgba(255, 255, 255, 0.1)',
                                                fontSize: '1.1rem',
                                                fontFamily: 'monospace',
                                                color: 'var(--text-primary)',
                                                minWidth: '80px',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center'
                                            }}>
                                                {formatNum(cell)}
                                            </div>
                                        );
                                    }))}
                                </div>
                            )}
                        </div>
                    )}
            </div>

            <AdSpace type="bottom" />

            <ShareTool 
                title="Matrix Solver"
                url="/math-tools/matrix-solver"
                text="Solve complex matrix operations instantly with PixTool's professional linear algebra studio."
            />

            <ToolContent 
                title="Advanced Linear Architecture"
                description="Our Matrix Solver is designed for high-authority scientific analysis. By leveraging the math.js computational kernel, we provide exact solutions for complex linear transformations across multiple dimensions."
                benefits={[
                    "Support for up to 5x5 dimensions",
                    "Inverse, Transpose, and Determinant calculation",
                    "Fractions and complex numeric input support",
                    "On-device visual grid interface",
                    "Zero server-side data processing"
                ]}
                useCases={[
                    { title: "Computer Graphics", description: "Calculate transformation matrices and viewport transposes for render optimization." },
                    { title: "Physics Modeling", description: "Solve systems of linear equations and find determinants for equilibrium analysis." }
                ]}
            />
          </div>

          <AdSpace type="side" className="desktop-only" />
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        @media (max-width: 640px) {
            .math-oled-display {
                padding: 1rem !important;
                gap: 0.5rem !important;
                min-width: 100% !important;
                overflow-x: auto;
            }
            .math-oled-display input, .math-oled-display div {
                padding: 0.75rem !important;
                font-size: 1rem !important;
                min-width: 40px !important;
            }
            .matrix-card {
                padding: 1.5rem !important;
            }
            .matrix-btn-group {
               grid-template-columns: 1fr !important;
            }
        }
      `}} />
    </>
  )
}
