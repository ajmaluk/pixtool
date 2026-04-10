import { Calculator, Zap, Lock, Compass } from 'lucide-react'
import ToolCard from '../components/ToolCard'
import SEO from '../components/SEO'
import ToolContent from '../components/ToolContent'
import { MATH_TOOLS, ALL_TOOLS_MAP } from '../data/tools'

const tools = MATH_TOOLS.filter(t => !t.status);
const categoryMetadata = ALL_TOOLS_MAP['/math-tools'];

export default function MathTools() {
    return (
        <>
            <SEO 
                title={categoryMetadata.seo.title}
                description={categoryMetadata.seo.description}
                keywords={categoryMetadata.seo.keywords}
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
                        <ToolContent {...categoryMetadata.editorial} />
                    </div>
                </div>
            </div>
        </>
    )
}

