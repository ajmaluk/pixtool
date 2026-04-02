import { Calculator, Zap, Lock, Compass } from 'lucide-react'
import ToolCard from '../components/ToolCard'
import SEO from '../components/SEO'
import ToolContent from '../components/ToolContent'
import AdSpace from '../components/AdSpace'
import { MATH_TOOLS } from '../data/tools'

const tools = MATH_TOOLS.filter(t => !t.status);

export default function MathTools() {
    return (
        <>
            <SEO 
                title="Premium Mathematical Suite - Advanced Visualization & Logic | PixTool"
                description="Access a world-class suite of 10 specialized mathematical tools. From Scientific Calculation to Graph Visualization and Matrix Solving, engineered for elite performance."
                path="/math-tools"
                breadcrumbs={[
                    { name: 'Math Tools', item: '/math-tools' }
                ]}
            />
            <div className="landing-layout">
                <div className="landing-center">
                    <div className="page-hero">
                        <div className="page-hero-content">
                            <h1 className="page-title" style={{ fontFamily: '"Manrope", sans-serif', fontWeight: 900, letterSpacing: '-0.04em', lineHeight: 1.1 }}>
                              Advanced <br/>
                              <span style={{ 
                                background: 'linear-gradient(135deg, #3b82f6 0%, #10b981 100%)',
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent',
                                backgroundSize: '200% auto',
                                animation: 'gradient-flow 6s linear infinite',
                                display: 'inline-block',
                                padding: '0.1em 0'
                              }}>Mathematics</span>
                            </h1>
                            <p className="page-subtitle" style={{ fontFamily: '"Inter", sans-serif', fontSize: '1.25rem', opacity: 0.9, marginTop: '1rem', lineHeight: 1.6 }}>
                                A high-authority suite of 10 specialized intelligence tools engineered for scientific precision, interactive visualization, and topological analysis.
                            </p>
                        </div>
                    </div>

                    <div className="tools-grid" style={{ marginBottom: '4rem' }}>
                        {tools.map((tool) => (
                            <ToolCard key={tool.id} tool={tool} />
                        ))}
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '2rem', marginTop: '3rem' }}>
                        {[
                            { icon: Zap, title: 'Zero Latency', desc: 'Lightning-fast native computation powered by WebAssembly and local logic.' },
                            { icon: Lock, title: 'Total Privacy', desc: 'All equations and data matrices are processed strictly within your local browser sandbox.' },
                            { icon: Compass, title: 'Precision Analysis', desc: 'Built for enterprise-grade dimensional plotting and algebraic exactness.' }
                        ].map((feat, i) => (
                            <div key={i} style={{ textAlign: 'center' }}>
                                <div style={{ color: 'var(--accent-blue)', marginBottom: '1.5rem', display: 'flex', justifyContent: 'center' }}>
                                    <feat.icon size={36} />
                                </div>
                                <h2 style={{ fontWeight: 900, marginBottom: '0.75rem', fontSize: '1.25rem' }}>{feat.title}</h2>
                                <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.6, margin: 0 }}>{feat.desc}</p>
                            </div>
                        ))}
                    </div>

                    <div style={{ marginTop: '5rem' }}>
                        <ToolContent
                            title="Mathematical Visualization Hub"
                            description="Transform absolute raw inputs into architectural intelligence. Our suite offers real-time graph plotting, complex linear algebra resolution, and financial projections integrated flawlessly into your browser without server handoffs."
                            benefits={[
                                "Local-First Computation Architecture",
                                "OLED-grade interactive component layout",
                                "High-precision standard/scientific modes",
                                "Instant algebraic simplification"
                            ]}
                            howTo={[
                                "Choose a numeric or visual processor",
                                "Provide your initial variables or dataset",
                                "Configure your dimensional visualization settings",
                                "Export or analyze the computed results"
                            ]}
                            tips={[
                                "Use the 'Graph Visualizer' with multiple concurrent functions to instantly spot intersections.",
                                "Leverage 'Matrix Solver' to verify hand-calculated eigen-vectors or complex algebraic transformations."
                            ]}
                            useCases={[
                                { title: "Academic Research", description: "Validate experimental hypotheses with flawless rapid-calculation cycles." },
                                { title: "Financial Modeling", description: "Use the Finance Architect to map out complex loan amortizations and ROI trajectories." }
                            ]}
                            readNext={[]}
                        />
                    </div>
                </div>
            </div>
        </>
    )
}
