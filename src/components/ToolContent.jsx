import { HelpCircle, Info, CheckCircle2, ArrowRight, Shield, Zap, Lock } from 'lucide-react'
import { Link } from 'react-router-dom'
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion'

export default function ToolContent({
    title,
    description,
    benefits = [],
    howTo = [],
    faq,
    relatedTools = [],
    readNext = [],
    alternativeTo = [],
    tips = [],
    useCases = []
}) {
    return (
        <article className="tool-content-section" style={{ marginTop: '10rem', borderTop: '1px solid var(--border-color)', paddingTop: '6rem' }}>
            {/* SEO Trust Bar */}
            <div className="trust-badges-bar">
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', fontSize: '0.9rem', fontWeight: 600, color: 'var(--text-primary)' }}>
                    <Shield size={20} style={{ color: '#10b981' }} />
                    <span>100% Private & Secure</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', fontSize: '0.9rem', fontWeight: 600, color: 'var(--text-primary)' }}>
                    <Zap size={20} style={{ color: '#fbbf24' }} />
                    <span>Instant Browser Processing</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', fontSize: '0.9rem', fontWeight: 600, color: 'var(--text-primary)' }}>
                    <Lock size={20} style={{ color: '#a855f7' }} />
                    <span>Zero Server Uploads</span>
                </div>
            </div>

            <div className="content-grid-tool">
                <div className="content-main">
                    <header style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem', color: 'var(--accent-primary)' }}>
                        <Info size={24} />
                        <h2 id="about-tool" style={{ fontSize: '1.8rem', fontWeight: 900, margin: 0, letterSpacing: '-0.02em' }}>
                            Advanced Online {title}
                        </h2>
                    </header>
                    
                    {alternativeTo.length > 0 && (
                        <div style={{
                            marginBottom: '2rem',
                            padding: '1rem 1.5rem',
                            background: 'var(--accent-glow)',
                            borderRadius: '16px',
                            borderLeft: '4px solid var(--accent-primary)',
                            fontSize: '1rem',
                            fontWeight: 600,
                            color: 'var(--text-primary)',
                            lineHeight: 1.5
                        }}>
                             PixTool provides a professional-grade browser-based alternative to <b>{alternativeTo.join(', ')}</b>.
                        </div>
                    )}
                    
                    <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8, fontSize: '1.1rem', marginBottom: '2.5rem' }}>
                        {description}
                    </p>

                    <section id="tool-features" className="content-section-premium">
                        <h3 style={{ fontSize: '1.4rem', fontWeight: 800, marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                            <CheckCircle2 size={24} style={{ color: 'var(--accent-primary)' }} />
                            Built for Performance & Privacy
                        </h3>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.25rem' }}>
                            {benefits.map((benefit, i) => (
                                <div key={i} style={{ color: 'var(--text-secondary)', display: 'flex', alignItems: 'start', gap: '0.75rem', fontSize: '0.95rem' }}>
                                    <span style={{ color: 'var(--accent-primary)', fontWeight: 900, marginTop: '-2px' }}>✓</span>
                                    <span>{benefit}</span>
                                </div>
                            ))}
                        </div>
                    </section>

                    {tips && tips.length > 0 && (
                        <section id="pro-tips" className="pro-tip-box">
                            <h3 style={{ fontSize: '1.4rem', fontWeight: 800, marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.75rem', color: '#d97706' }}>
                                <Zap size={24} />
                                Professional Workflow Tips
                            </h3>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                                {tips.map((tip, i) => (
                                    <div key={i} style={{ color: 'var(--text-secondary)', fontSize: '1rem', lineHeight: 1.6, display: 'flex', alignItems: 'start', gap: '1rem' }}>
                                        <div style={{ minWidth: '8px', height: '8px', background: '#d97706', borderRadius: '50%', marginTop: '0.6rem' }}></div>
                                        <p style={{ margin: 0 }}>{tip}</p>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}

                    {readNext && readNext.length > 0 && (
                        <nav id="expert-guides" style={{ marginTop: '5rem' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '2rem' }}>
                                <div style={{ padding: '8px', background: 'var(--accent-glow)', borderRadius: '12px', color: 'var(--accent-primary)' }}>
                                    <HelpCircle size={24} />
                                </div>
                                <h3 style={{ fontSize: '1.5rem', fontWeight: 900, letterSpacing: '-0.02em', margin: 0 }}>Expert Tutorials</h3>
                            </div>
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
                                {readNext.map((item, i) => (
                                    <Link key={i} to={item.path} style={{ textDecoration: 'none', color: 'inherit' }}>
                                        <motion.div
                                            whileHover={{ y: -5, borderColor: 'var(--accent-primary)', boxShadow: '0 20px 40px var(--accent-glow)' }}
                                            style={{
                                                background: 'var(--bg-glass)',
                                                border: '1px solid var(--border-color)',
                                                borderRadius: '24px',
                                                padding: '1.75rem',
                                                height: '100%',
                                                display: 'flex',
                                                flexDirection: 'column',
                                                transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)'
                                            }}
                                        >
                                            <div style={{ fontSize: '0.7rem', fontWeight: 900, color: 'var(--accent-primary)', textTransform: 'uppercase', marginBottom: '1rem', letterSpacing: '0.1em' }}>
                                                TUTORIAL & INSIGHTS
                                            </div>
                                            <div style={{ display: 'flex', alignItems: 'start', justifyContent: 'space-between', gap: '1rem' }}>
                                                <h4 style={{ fontWeight: 800, fontSize: '1.15rem', margin: 0, lineHeight: 1.4 }}>{item.title}</h4>
                                                <div style={{ minWidth: '36px', height: '36px', background: 'var(--bg-primary)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                                    <ArrowRight size={20} style={{ color: 'var(--accent-primary)' }} />
                                                </div>
                                            </div>
                                        </motion.div>
                                    </Link>
                                ))}
                            </div>
                        </nav>
                    )}
                </div>

                <aside className="content-sidebar">
                    <section id="how-to-guide" style={{ marginBottom: '4rem' }}>
                        <h3 style={{ fontSize: '1.4rem', fontWeight: 800, marginBottom: '2rem' }}>How to use {title}</h3>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                            {howTo.map((step, i) => (
                                <div key={i} style={{ display: 'flex', gap: '1.25rem' }}>
                                    <div style={{
                                        minWidth: '32px',
                                        height: '32px',
                                        background: 'var(--accent-primary)',
                                        color: 'white',
                                        borderRadius: '10px',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        fontSize: '0.95rem',
                                        fontWeight: 800
                                    }}>
                                        {i + 1}
                                    </div>
                                    <p style={{ color: 'var(--text-secondary)', margin: 0, fontSize: '1rem', lineHeight: 1.6, fontWeight: 500 }}>{step}</p>
                                </div>
                            ))}
                        </div>
                    </section>

                    {useCases && useCases.length > 0 && (
                        <section id="use-cases" style={{ marginBottom: '4rem' }}>
                            <h3 style={{ fontSize: '1.4rem', fontWeight: 800, marginBottom: '2rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                                <CheckCircle2 size={24} style={{ color: 'var(--accent-primary)' }} />
                                Best Practices
                            </h3>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                                {useCases.map((useCase, i) => (
                                    <div key={i} style={{ padding: '1.5rem', background: 'var(--bg-secondary)', borderRadius: '20px', border: '1px solid var(--border-color)', transition: 'transform 0.2s ease' }}>
                                        <h4 style={{ fontSize: '1.05rem', fontWeight: 800, marginBottom: '0.75rem', color: 'var(--text-primary)' }}>{useCase.title}</h4>
                                        <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', margin: 0, lineHeight: 1.6 }}>{useCase.description}</p>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}

                    {faq && faq.length > 0 && (
                        <section id="faq-section" style={{ marginBottom: '4rem' }}>
                            <h3 style={{ fontSize: '1.4rem', fontWeight: 800, marginBottom: '2rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                                <HelpCircle size={24} />
                                Frequently Asked
                            </h3>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                                {faq.map((item, i) => (
                                    <div key={i} className="faq-item">
                                        <h4 className="faq-question">{item.q}</h4>
                                        <p className="faq-answer">{item.a}</p>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}

                    {relatedTools && relatedTools.length > 0 && (
                        <nav id="related-tools" style={{ padding: '2rem', background: 'var(--bg-glass)', border: '1px solid var(--border-color)', borderRadius: '24px' }}>
                            <h3 style={{ fontSize: '1.2rem', fontWeight: 800, marginBottom: '1.5rem' }}>Discover More Tools</h3>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                {relatedTools.map((tool, i) => (
                                    <Link key={i} to={tool.path} style={{ textDecoration: 'none', color: 'inherit' }} title={`Try our ${tool.name} tool`}>
                                        <motion.div 
                                            whileHover={{ x: 5, color: 'var(--accent-primary)' }}
                                            style={{ 
                                                borderBottom: '1px solid var(--border-color)', 
                                                paddingBottom: '0.75rem', 
                                                display: 'flex', 
                                                alignItems: 'center', 
                                                justifyContent: 'space-between',
                                                fontWeight: 600,
                                                fontSize: '0.95rem'
                                            }}
                                        >
                                            <span>{tool.name}</span>
                                            <ArrowRight size={16} style={{ color: 'var(--accent-primary)', opacity: 0.6 }} />
                                        </motion.div>
                                    </Link>
                                ))}
                            </div>
                            
                            {/* Category Hub Link for PageRank distribution */}
                            <div style={{ marginTop: '2.5rem', paddingTop: '1.5rem', borderTop: '2px solid var(--accent-glow)' }}>
                                <Link 
                                    to={window.location.pathname.includes('pdf') ? '/pdf-tools' : window.location.pathname.includes('image') ? '/image-tools' : '/utility-tools'}
                                    style={{ 
                                        display: 'flex', 
                                        alignItems: 'center', 
                                        gap: '0.5rem', 
                                        fontSize: '0.85rem', 
                                        fontWeight: 800, 
                                        color: 'var(--accent-primary)', 
                                        textDecoration: 'none', 
                                        textTransform: 'uppercase', 
                                        letterSpacing: '0.05em' 
                                    }}
                                >
                                    Browse All {window.location.pathname.includes('pdf') ? 'PDF' : window.location.pathname.includes('image') ? 'Image' : 'Utility'} Tools
                                    <ArrowRight size={14} />
                                </Link>
                            </div>
                        </nav>
                    )}
                </aside>
            </div>
        </article>
    )
}
