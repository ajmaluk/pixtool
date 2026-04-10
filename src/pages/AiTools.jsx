import { Zap, ShieldCheck, Globe, Star, Sparkles, TrendingUp } from 'lucide-react'
import ToolCard from '../components/ToolCard'
import SEO from '../components/SEO'
import ToolContent from '../components/ToolContent'
import { AI_TOOLS, ALL_TOOLS_MAP } from '../data/tools'

const tools = AI_TOOLS.filter(t => !t.status);
const featuredTool = tools.find(t => t.id === 'ai-chat') || tools[0];
const subTools = tools.filter(t => t.id !== featuredTool.id);
const categoryMetadata = ALL_TOOLS_MAP['/ai-tools'];

export default function AiTools() {
    return (
        <>
            <SEO 
                title={categoryMetadata.seo.title}
                description={categoryMetadata.seo.description}
                keywords={categoryMetadata.seo.keywords}
                path="/ai-tools"
                breadcrumbs={[
                    { name: 'AI Tools', item: '/ai-tools' }
                ]}
            />
            <div className="landing-layout">
                <div className="landing-center">
                    <div className="page-hero" style={{ marginBottom: '4rem' }}>
                        <div className="page-hero-content">
                            <div className="badge-premium" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', mb: '1rem', background: 'var(--bg-glass)', padding: '0.5rem 1rem', borderRadius: '100px', border: '1px solid var(--border-color)', fontSize: '0.75rem', fontWeight: 900, color: 'var(--accent-purple)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                                <Sparkles size={14} /> Neural Framework 2026
                            </div>
                            <h1 className="page-title" style={{ fontFamily: '"Manrope", sans-serif', fontWeight: 900, letterSpacing: '-0.04em', lineHeight: 1.1, marginTop: '1.5rem' }}>
                              Next-Gen <br/>
                              <span style={{ 
                                background: 'linear-gradient(135deg, #a855f7 0%, #ec4899 100%)',
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent',
                                backgroundSize: '200% auto',
                                animation: 'gradient-flow 6s linear infinite',
                                display: 'inline-block',
                                padding: '0.1em 0'
                              }}>Artificial Intelligence</span>
                            </h1>
                            <p className="page-subtitle" style={{ fontFamily: '"Inter", sans-serif', fontSize: '1.25rem', opacity: 0.9, marginTop: '1.5rem', lineHeight: 1.6, maxWidth: '700px', margin: '1.5rem auto' }}>
                                A suite of precision-engineered AI models architected for high-authority reasoning, linguistic perfection, and technical synthesis.
                            </p>
                        </div>
                    </div>

                    {/* Featured Tool Spotlight */}
                    {featuredTool && (
                        <div className="featured-intel-section" style={{ marginBottom: '5rem' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '2rem' }}>
                                <Star size={20} color="var(--accent-yellow)" />
                                <h2 style={{ fontSize: '1rem', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--text-muted)' }}>Flagship Intelligence</h2>
                            </div>
                            <div style={{ transform: 'scale(1.02)' }}>
                                <ToolCard tool={featuredTool} variant="featured" />
                            </div>
                        </div>
                    )}

                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '2rem' }}>
                        <TrendingUp size={20} color="var(--accent-emerald)" />
                        <h2 style={{ fontSize: '1rem', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--text-muted)' }}>Specialized Models</h2>
                    </div>

                    <div className="tools-grid" style={{ marginBottom: '5rem' }}>
                        {subTools.map((tool) => (
                            <ToolCard key={tool.id} tool={tool} />
                        ))}
                    </div>

                    <div style={{ 
                        display: 'grid', 
                        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', 
                        gap: '2.5rem', 
                        marginTop: '4rem',
                        padding: '3rem',
                        background: 'var(--bg-glass)',
                        borderRadius: '32px',
                        border: '1px solid var(--border-color)',
                        backdropFilter: 'blur(20px)'
                    }}>
                        {[
                            { icon: Zap, title: 'Zero Latency', desc: 'Native streaming generation built for instant high-authority responses and real-time interaction.' },
                            { icon: ShieldCheck, title: 'Privacy First', desc: 'Secure, context-aware processing without permanent server-side data retention or telemetry.' },
                            { icon: Globe, title: 'Global Context', desc: 'Engineered to understand over 50+ linguistic nuances, cultural frameworks, and technical dialects.' }
                        ].map((feat, i) => (
                            <div key={i} style={{ textAlign: 'left' }}>
                                <div style={{ color: 'var(--accent-purple)', marginBottom: '1.5rem', display: 'flex' }}>
                                    <feat.icon size={32} />
                                </div>
                                <h3 style={{ fontWeight: 900, marginBottom: '0.75rem', fontSize: '1.25rem', color: 'var(--text-primary)' }}>{feat.title}</h3>
                                <p style={{ fontSize: '0.95rem', color: 'var(--text-secondary)', lineHeight: 1.6, margin: 0 }}>{feat.desc}</p>
                            </div>
                        ))}
                    </div>

                    <div style={{ marginTop: '6rem' }}>
                        <ToolContent {...categoryMetadata.editorial} />
                    </div>
                </div>
            </div>
        </>
    )
}

