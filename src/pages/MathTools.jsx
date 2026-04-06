import { Calculator, Zap, Lock, Compass } from 'lucide-react'
import ToolCard from '../components/ToolCard'
import SEO from '../components/SEO'
import ToolContent from '../components/ToolContent'
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
                            title="Mathematics & Logic Studio"
                            description="The PixTool Mathematics Studio is designed as a browser-native computation environment for students, engineers, analysts, and educators. Instead of thin calculators, each tool targets a specific math workflow with practical outputs and clear interaction patterns. This improves trust, repeat usage, and content depth for users and crawlers alike."
                            benefits={[
                                "Browser-Native Scientific Computation: Low-latency solving without external processing queues.",
                                "Algebraic Fidelity: Deterministic numeric behavior and transparent formulas.",
                                "Visualization Best Practices: Clear charts, readable scales, and practical domain defaults.",
                                "Local Privacy by Default: Inputs remain in-browser for safer academic and business work.",
                                "Workflow Coverage: Graphing, matrix, finance, statistics, and equation solving in one hub."
                            ]}
                            howTo={[
                                "Choose a tool that matches your exact task (solver, graph, matrix, statistics, or finance).",
                                "Enter your equation or dataset and verify units/ranges before running computations.",
                                "Use visualization settings to improve readability for reports and presentations.",
                                "Validate output using alternate inputs or known reference values.",
                                "Export final charts or results for documentation and peer review."
                            ]}
                            tips={[
                                "Always label axis units in exported visuals to reduce interpretation errors.",
                                "Test edge values (0, negative, very large) to catch domain mistakes early.",
                                "Use simplified expressions first, then increase complexity step-by-step.",
                                "For finance outputs, run at least two scenarios to compare risk and sensitivity."
                            ]}
                            useCases={[
                                { title: "Engineering & Physics", description: "Perform rapid-cycle vector analysis and scientific calculations directly in the field without internet dependency." },
                                { title: "Data Science & Analytics", description: "Transform raw CSV/JSON datasets into high-authority statistical distributions and charts instantly." },
                                { title: "Financial Strategy", description: "Architect complex loan amortizations and ROI trajectories with professional-grade precision and absolute privacy." }
                            ]}
                            alternativeTo={["Wolfram Alpha", "Desmos", "Symbolab", "Calculator.net"]}
                            readNext={[
                                { title: '📊 Best Data Visualization Tools 2026: PixTool vs Industry Standards', path: '/blog/future-of-ai-productivity' },
                                { title: '🧮 Mastering Scientific Computing in the Browser with WASM', path: '/blog/browser-based-privacy' }
                            ]}
                            faq={[
                                { q: "How accurate are the scientific calculations?", a: "We use IEEE 754 double-precision floating-point arithmetic, ensuring the same level of accuracy as desktop engineering software." },
                                { q: "Can I use these tools offline?", a: "Yes. Once the page is loaded, the entire computation engine is resident in your browser's memory, allowing for full functionality without an active connection." },
                                { q: "Do you store my datasets?", a: "Absolutely not. PixTool is built on a zero-upload architecture. Your numbers and formulas stay strictly on your local device." }
                            ]}
                        />
                    </div>
                </div>
            </div>
        </>
    )
}
