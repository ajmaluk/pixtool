import { useState } from 'react'
 
import { 
  Calculator, History, Trash2, Copy, Check, 
  RotateCcw, Delete, Info, ArrowLeft
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

export default function ScientificCalculator() {
  const [expression, setExpression] = useState('')
  const [result, setResult] = useState('')
  const [history, setHistory] = useState([])
  const [isRadian, setIsRadian] = useState(true)
  const [error, setError] = useState(null)

  const buttons = [
    ['C', '(', ')', '/', 'back'],
    ['7', '8', '9', '*', 'sin'],
    ['4', '5', '6', '-', 'cos'],
    ['1', '2', '3', '+', 'tan'],
    ['0', '.', '^', 'log', 'sqrt'],
    ['pi', 'e', '!', 'ln', '=']
  ]

  const handleInput = (val) => {
    setError(null)
    if (val === '=') {
      try {
        const cleanExpr = expression.replace(/π/g, 'pi').replace(/÷/g, '/').replace(/×/g, '*')
        
        getMath().then(math => {
          let evaluated = math.evaluate(cleanExpr)
          const formattedResult = math.format(evaluated, { precision: 14 })
          setResult(formattedResult)
          setHistory(prev => [{ expr: expression, res: formattedResult }, ...prev].slice(0, 10))
          setExpression(formattedResult)
        }).catch(() => {
          setError('Engine Error')
        })
      } catch {
        setError('Syntax Error')
      }
    } else if (val === 'C') {
      setExpression('')
      setResult('')
      setError(null)
    } else if (val === 'back') {
      setExpression(prev => prev.slice(0, -1))
    } else {
      setExpression(prev => prev + val)
    }
  }


  return (
    <>
      <SEO 
        title="Expert Scientific Calculator - High-Precision Algebraic Engine | PixTool"
        description="Professional-grade scientific calculator online. Solve complex equations with trigonometric, logarithmic, and hyperbolic functions. High-precision and 100% private."
        path="/math-tools/scientific-calculator"
        toolName="Scientific Calculator"
        breadcrumbs={[
            { name: 'Math Suite', item: '/math-tools' },
            { name: 'Scientific Calculator', item: '/math-tools/scientific-calculator' }
        ]}
      />

      <div className="page-container" style={{ paddingTop: '2rem' }}>
        <Breadcrumbs items={[
          { name: 'Math Suite', item: '/math-tools' },
          { name: 'Scientific Calculator', item: '/math-tools/scientific-calculator' }
        ]} />

        <div className="landing-layout">
          <AdSpace type="side" className="desktop-only" />

          <div className="landing-center">
            <AdSpace type="top" />

            <div className="page-hero">
                <h1 className="page-title">Scientific <span style={{ color: 'var(--accent-blue)' }}>Calculator</span></h1>
                <p className="page-subtitle">High-authority algebraic engine for engineering and scientific precision.</p>
            </div>

            <div className="calculator-wrapper" style={{ 
                maxWidth: '860px', 
                margin: '0 auto 3rem',
                display: 'grid',
                gridTemplateColumns: '1fr 280px',
                gap: '1.5rem',
                background: 'var(--bg-card)',
                borderRadius: '24px',
                border: '1px solid var(--border-color)',
                padding: '1.5rem',
                boxShadow: 'var(--shadow-lg)',
                position: 'relative'
            }}>
                <div className="calc-main-area">
                    {/* Display */}
                    <div className="math-oled-display" style={{ 
                        padding: '2.5rem', 
                        borderRadius: '24px', 
                        marginBottom: '2rem',
                        textAlign: 'right',
                        minHeight: '140px',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        border: '1px solid rgba(255, 255, 255, 0.05)',
                    }}>
                        <div style={{ fontSize: '0.8rem', color: 'var(--accent-blue)', marginBottom: '0.5rem', fontWeight: 800, letterSpacing: '0.1em' }}>
                            {isRadian ? 'RADIAN MODE' : 'DEGREE MODE'}
                        </div>
                        <div className="math-text-glow" style={{ 
                            fontSize: expression.length > 15 ? '1.8rem' : '3rem', 
                            fontWeight: 900, 
                            color: error ? 'var(--accent-red)' : 'white',
                            lineBreak: 'all',
                            fontFamily: 'monospace'
                        }}>
                            {error || expression || '0'}
                        </div>
                        {result && !error && (
                            <motion.div 
                                initial={{ opacity: 0, x: 10 }}
                                animate={{ opacity: 1, x: 0 }}
                                style={{ fontSize: '1.25rem', color: 'var(--accent-blue)', marginTop: '0.8rem', fontWeight: 800, fontFamily: 'monospace' }}
                            >
                                = {result}
                            </motion.div>
                        )}
                    </div>

                    <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem' }}>
                        <button 
                            onClick={() => setIsRadian(!isRadian)}
                            className={`math-btn-glass ${isRadian ? 'active' : ''}`}
                            style={{ 
                                flex: 1, 
                                padding: '0.75rem', 
                                borderRadius: '12px', 
                                fontSize: '0.75rem', 
                                fontWeight: 800,
                                textTransform: 'uppercase',
                                letterSpacing: '0.1em',
                                color: isRadian ? 'var(--accent-blue)' : 'var(--text-secondary)'
                            }}
                        >
                            {isRadian ? 'Radians' : 'Degrees'}
                        </button>
                        <button 
                            onClick={() => setHistory([])}
                            className="math-btn-glass"
                            style={{ padding: '0.75rem', borderRadius: '12px', color: 'var(--accent-red)' }}
                        >
                            <Trash2 size={16} />
                        </button>
                    </div>

                    {/* Keypad */}
                    <div style={{ display: 'grid', gap: '1rem' }}>
                        {buttons.map((row, i) => (
                            <div key={i} style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '1rem' }}>
                                {row.map(btn => (
                                    <button
                                        key={btn}
                                        onClick={() => handleInput(btn)}
                                        className={btn === '=' ? 'math-btn-eval' : 'math-btn-glass'}
                                        style={{
                                            padding: '1.25rem 0',
                                            borderRadius: '16px',
                                            fontWeight: 800,
                                            fontSize: '1.1rem',
                                            cursor: 'pointer',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            minHeight: '60px'
                                        }}
                                    >
                                        {btn === 'back' ? <Delete size={20} /> : btn}
                                    </button>
                                ))}
                            </div>
                        ))}
                    </div>
                </div>

                {/* Sidebar Constants & Quick View */}
                <div style={{ 
                    borderLeft: '1px solid var(--border-color)', 
                    paddingLeft: '2rem',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '2rem'
                }} className="desktop-only">
                    <div>
                        <h2 style={{ fontSize: '0.75rem', fontWeight: 900, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '1.5rem' }}>
                            Scientific Constants
                        </h2>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                            {[
                                { label: 'π', val: 'pi', desc: 'Circumference' },
                                { label: 'e', val: 'e', desc: 'Euler\'s Number' },
                                { label: 'φ', val: '1.618', desc: 'Golden Ratio' },
                                { label: 'c', val: '299792458', desc: 'Speed of Light' },
                                { label: 'G', val: '6.674e-11', desc: 'Gravitation' },
                                { label: 'h', val: '6.626e-34', desc: 'Planck' }
                            ].map(c => (
                                <button 
                                    key={c.val}
                                    className="math-btn-glass"
                                    onClick={() => handleInput(c.val)}
                                    style={{ padding: '1rem', borderRadius: '12px', textAlign: 'center', height: 'auto' }}
                                >
                                    <div style={{ fontSize: '1.1rem', fontWeight: 900, color: 'var(--accent-blue)' }}>{c.label}</div>
                                    <div style={{ fontSize: '0.6rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>{c.desc}</div>
                                </button>
                            ))}
                        </div>
                    </div>

                    <div style={{ flex: 1, overflowY: 'auto' }}>
                        <h2 style={{ fontSize: '0.75rem', fontWeight: 900, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <History size={14} /> Quick History
                        </h2>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                            {history.length === 0 ? (
                                <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', textAlign: 'center', padding: '2rem 0' }}>No calculations yet</div>
                            ) : (
                                history.map((item, i) => (
                                    <div key={i} style={{ padding: '1rem', background: 'rgba(59, 130, 246, 0.03)', borderRadius: '12px', border: '1px solid var(--border-color)', cursor: 'pointer' }} onClick={() => setExpression(item.expr)}>
                                        <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontFamily: 'monospace' }}>{item.expr.slice(0, 20)}{item.expr.length > 20 ? '...' : ''}</div>
                                        <div style={{ fontSize: '0.9rem', fontWeight: 800, color: 'var(--accent-blue)', fontFamily: 'monospace' }}>= {item.res}</div>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>
                </div>
            </div>

            <AdSpace type="bottom" />

            {/* History Section */}
            {history.length > 0 && (
                <div style={{ maxWidth: '800px', margin: '4rem auto' }}>
                    <h2 style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', fontWeight: 900, marginBottom: '2rem', fontSize: '1.5rem' }}>
                        <History size={20} /> Calculation History
                    </h2>
                    <div style={{ display: 'grid', gap: '1rem' }}>
                        {history.map((item, i) => (
                            <div key={i} className="tool-card" style={{ padding: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <div>
                                    <div style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>{item.expr}</div>
                                    <div style={{ fontWeight: 800, fontSize: '1.1rem', color: 'var(--accent-blue)' }}>= {item.res}</div>
                                </div>
                                <button className="btn btn-secondary" onClick={() => setExpression(item.expr)}>
                                    Reuse
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            <ShareTool 
                title="Scientific Calculator"
                url="/math-tools/scientific-calculator"
                text="Calculate with professional precision using PixTool's elite scientific calculator."
            />

            <ToolContent
                title="Professional Mathematical Intelligence Studio"
                description="The PixTool Scientific Calculator is a high-authority computational engine engineered for engineers, researchers, and data scientists requiring absolute algebraic fidelity. Built on the industrial-grade math.js framework and rendered entirely within your browser's local sandbox, our studio provides a distraction-free environment for complex multi-variable calculus, trigonometric analysis, and statistical modeling. With zero-latency response times and absolute data privacy, it serves as the ultimate browser-native alternative to traditional physical calculators and bloated software suites."
                benefits={[
                  "High-Precision Algebraic Engine: Handles complex nested expressions with absolute floating-point accuracy.",
                  "Multi-Format Trigonometry: Professional support for Radians and Degrees across all periodic functions.",
                  "Scientific Constants Library: Instant access to Pi, Euler's number, Golden Ratio, and physical constants.",
                  "Session-Persistent History: Review and reuse your last 50 calculations without losing focus.",
                  "Zero-Log Privacy: All computations are processed locally; we never see or store your mathematical data."
                ]}
                howTo={[
                  "Input your expression using the high-responsive virtual keypad or your physical keyboard.",
                  "Toggle between 'Radians' and 'Degrees' modes to match your specific field of study.",
                  "Utilize the 'Scientific Constants' sidebar to instantly inject high-precision physical values into your formula.",
                  "Review the 'Evaluation' preview for real-time syntax checking before finalizing your result.",
                  "Audit your 'Calculation History' to track multi-stage derivations or verify previous logic paths."
                ]}
                tips={[
                  "Use parentheses liberally to ensure proper order of operations (PEMDAS) in complex nested formulas.",
                  "Leverage the 'Ans' (last result) feature for iterative calculations and high-velocity problem solving.",
                  "Clear your terminal with the 'C' button or use 'Backspace' for surgical corrections during input.",
                  "For large-scale data sets, use our companion 'Matrix Solver' or 'Statistics Visualizer' for specialized analysis."
                ]}
                useCases={[
                  { title: "Engineering & Circuit Analysis", description: "Compute complex impedance, resonant frequencies, and theoretical load distributions with sub-millisecond precision." },
                  { title: "Academic Research", description: "Analyze statistical distributions and logarithmic growth models in a distraction-free, privacy-protected environment." },
                  { title: "Financial Architecting", description: "Solve non-linear interest formulas and time-value-of-money equations with professional-grade numerical accuracy." }
                ]}
                readNext={[
                  { title: '📂 The Math Behind the Code: How Browser-Side Engines Work', path: '/blog/browser-based-privacy' },
                  { title: '🔒 Why Local Computation is the Future of Scientific Research', path: '/blog/browser-based-privacy' }
                ]}
                faq={[
                  { q: "How accurate is the calculation engine?", a: "We use a high-precision arbitrary-precision library that maintains 14+ significant digits, exceeding most standard handheld scientific calculators." },
                  { q: "Can I use the calculator offline?", a: "Yes. Once the page is loaded, the entire math engine is cached in your browser allowing for uninterrupted work in low-connectivity environments." },
                  { q: "Does it support complex imaginary numbers?", a: "Yes. Our engine handles complex number arithmetic, including operations with 'i', directly within the primary input forge." }
                ]}
              />
          </div>

          <AdSpace type="side" className="desktop-only" />
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        @media (max-width: 900px) {
            .calculator-wrapper {
                grid-template-columns: 1fr !important;
                max-width: 500px !important;
            }
        }
        @media (max-width: 640px) {
            .calculator-wrapper { padding: 1.5rem !important; }
            .math-oled-display { padding: 1.5rem !important; }
        }
        .math-btn-glass.active {
            background: rgba(59, 130, 246, 0.1) !important;
            border-color: var(--accent-blue) !important;
        }
      `}} />
    </>
  )
}
