import { HelpCircle, Info, CheckCircle2, ArrowRight, Shield, Zap, Lock, ShieldCheck, Cpu, HardDrive, Sparkles } from 'lucide-react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

export default function ToolContent({
    title,
    description,
    benefits = [],
    howTo = [],
    faq,
    relatedArticles = [],
    relatedTools = [],
    readNext = [],
    alternativeTo = [],
    tips = [],
    useCases = []
}) {
    const currentPath = typeof window !== 'undefined' ? window.location.pathname : ''

    const defaultRelatedArticles = (() => {
        if (currentPath.startsWith('/qr-') || currentPath.startsWith('/utility-tools') || currentPath.startsWith('/temp-mail')) {
            return [
                { title: '📲 Static vs Dynamic QR Codes 2026: Which One Should You Use?', path: '/blog/qr-static-vs-dynamic-2026', description: 'Understand which QR strategy fits long-term printing, privacy, and tracking.' },
                { title: '📊 Advanced QR Code Marketing 2026: 3x Conversion Rates with Smart Offline-to-Online Strategy', path: '/blog/advanced-qr-code-marketing-2026', description: 'Turn QR scans into measurable conversions with better landing page strategy.' },
                { title: '📧 Secure Temporary Email Strategy: Stop Spam, Phishing & Data Scraping', path: '/blog/secure-temp-mail-business-privacy-2026', description: 'Use disposable inboxes to protect your identity and keep signups clean.' }
            ]
        }

        if (currentPath.startsWith('/pdf-tools')) {
            return [
                { title: '🔓 Best Free PDF Tools 2026 - Merge, Split, Compress WITHOUT Cloud Upload', path: '/blog/best-free-pdf-tools-online-2026', description: 'Compare the safest local PDF workflows and cloud-free document utilities.' },
                { title: '📦 Ultimate PDF Toolkit 2026: Merge, Split & Compress Like a Pro', path: '/blog/ultimate-pdf-toolkit-merge-split-compress', description: 'Learn the best practical workflow for large PDFs and document management.' },
                { title: '🔐 PDF Security 101: Passwords, Encryption & Safe Sharing for 2026', path: '/blog/pdf-security-101-passwords-encryption-sharing', description: 'Secure PDFs with encryption, watermarking, and safe distribution practices.' }
            ]
        }

        if (currentPath.startsWith('/image-tools')) {
            return [
                { title: '📱 Perfect Social Media Image Sizes 2026: Exact Dimensions', path: '/blog/resize-images-social-media-2026', description: 'Use the right image dimensions for Instagram, Facebook, X, LinkedIn, and TikTok.' },
                { title: '🎯 WebP vs AVIF vs JPEG 2026: Best Image Format for Web Performance & SEO', path: '/blog/best-image-format-webp-avif-jpeg-2026', description: 'Choose the best format for compression, browser support, and page speed.' },
                { title: '🗜️ Image Compression 101: Lossless vs Lossy - Reduce Size 80% Without Quality Loss', path: '/blog/image-compression-lossless-vs-lossy-2026', description: 'Reduce file sizes without breaking quality or user experience.' }
            ]
        }

        if (currentPath.startsWith('/productivity-tools')) {
            return [
                { title: '🔐 Browser-Based Tools = Zero Privacy Risk [2026 Security Guide]', path: '/blog/browser-based-privacy', description: 'Why local-first productivity tools are safer than cloud apps.' },
                { title: '⚡ 80% Productivity Boost: Master PixTool AI Workflow [Pro Guide]', path: '/blog/maximizing-productivity-pixtool-ai', description: 'Build a faster workflow with the right productivity habits and tools.' },
                { title: '🚀 Future of AI Productivity 2026: Edge AI Guide - Privacy Without Compromise', path: '/blog/future-of-ai-productivity', description: 'See how private on-device workflows are changing productivity in 2026.' }
            ]
        }

        if (currentPath.startsWith('/ai-tools')) {
            return [
                { title: '🚀 Future of AI Productivity 2026: Edge AI Guide - Privacy Without Compromise', path: '/blog/future-of-ai-productivity', description: 'On-device AI and practical workflows are redefining daily productivity.' },
                { title: '🤖 Top 5 AI Trends Reshaping Productivity in 2026', path: '/blog/top-ai-trends-2026-productivity-tools', description: 'Track the biggest shifts in multimodal and agentic AI tools.' },
                { title: '⚔️ GPT-5 vs Gemini 3 vs Claude 4.5: Best AI Model for 2026?', path: '/blog/gpt-5-gemini-3-claude-4-5-model-comparison-2026', description: 'Choose the best model for writing, coding, and context-heavy tasks.' }
            ]
        }

        if (currentPath.startsWith('/math-tools')) {
            return [
                { title: '🚀 Future of AI Productivity 2026: Edge AI Guide - Privacy Without Compromise', path: '/blog/future-of-ai-productivity', description: 'The same browser-first approach powers private calculations and workflows.' },
                { title: '🧠 From Assistants to Agents: The Rise of Agentic AI in Software Development', path: '/blog/rise-of-agentic-ai-in-software-development-2026', description: 'See how AI systems are evolving from suggestions to execution.' },
                { title: '⚔️ GPT-5 vs Gemini 3 vs Claude 4.5: Best AI Model for 2026?', path: '/blog/gpt-5-gemini-3-claude-4-5-model-comparison-2026', description: 'Useful context for computational workflows and AI-assisted analysis.' }
            ]
        }

        return []
    })()

    const resolvedRelatedArticles = relatedArticles.length > 0 ? relatedArticles : defaultRelatedArticles

    return (
        <article className="tool-content-section" style={{ marginTop: '5rem', borderTop: '1px solid var(--border-color)', paddingTop: '4rem' }}>
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

            <div className="content-grid-tool" itemScope itemType="https://schema.org/SoftwareApplication">
                <meta itemProp="name" content={title} />
                <meta itemProp="applicationCategory" content="UtilitiesApplication" />
                <meta itemProp="operatingSystem" content="Web Browser" />
                <meta itemProp="isAccessibleForFree" content="true" />
                <div className="content-main">
                    <header style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem', color: 'var(--accent-primary)' }}>
                        <Info size={24} />
                        <h2 id="about-tool" style={{ fontSize: '1.8rem', fontWeight: 900, margin: 0, letterSpacing: '-0.02em' }}>
                            About Our {title} Tool
                        </h2>
                    </header>

                    {/* AEO / AI Direct Answer Box */}
                    <div className="aeo-direct-answer" style={{
                        marginBottom: '2rem',
                        padding: '1.25rem 1.5rem',
                        background: 'var(--bg-secondary)',
                        borderRadius: '16px',
                        border: '1px solid var(--border-color)',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '0.5rem'
                    }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--accent-primary)', fontWeight: 800, fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                            <Sparkles size={16} />
                            <span>Quick Answer & Key Takeaways</span>
                        </div>
                        <p itemProp="description" style={{ color: 'var(--text-primary)', margin: 0, fontSize: '1.02rem', lineHeight: 1.6, fontWeight: 500 }}>
                            {description}
                        </p>
                    </div>
                    
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

                    <section id="tool-features" className="content-section-premium">
                        <h3 style={{ fontSize: '1.4rem', fontWeight: 800, marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                            <CheckCircle2 size={24} style={{ color: 'var(--accent-primary)' }} />
                            {title} Features & Capabilities
                        </h3>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 220px), 1fr))', gap: '1.25rem' }}>
                            {benefits.map((benefit, i) => (
                                <div key={i} itemProp="featureList" style={{ color: 'var(--text-secondary)', display: 'flex', alignItems: 'start', gap: '0.75rem', fontSize: '0.95rem' }}>
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

                    <section id="privacy-architecture" style={{
                        marginTop: '2.5rem',
                        padding: '1.75rem',
                        background: 'var(--bg-secondary)',
                        borderRadius: '20px',
                        border: '1px solid var(--border-color)',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '1.25rem'
                    }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                            <div style={{
                                width: '36px',
                                height: '36px',
                                borderRadius: '10px',
                                background: 'rgba(99, 102, 241, 0.12)',
                                color: 'var(--accent-primary)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                flexShrink: 0
                            }}>
                                <ShieldCheck size={20} />
                            </div>
                            <div>
                                <h3 style={{ fontSize: '1.15rem', fontWeight: 800, margin: 0, color: 'var(--text-primary)' }}>
                                    Privacy & Security Architecture
                                </h3>
                                <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', margin: 0 }}>
                                    100% Client-side sandbox isolation
                                </p>
                            </div>
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 200px), 1fr))', gap: '1rem' }}>
                            <div style={{ padding: '1rem', background: 'var(--bg-primary)', borderRadius: '14px', border: '1px solid var(--border-color)', display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'var(--accent-primary)', fontWeight: 800, fontSize: '0.88rem' }}>
                                    <HardDrive size={15} />
                                    <span>Zero Uploads</span>
                                </div>
                                <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', margin: 0, lineHeight: 1.4 }}>
                                    Files & payloads execute directly in your local browser memory without remote storage.
                                </p>
                            </div>

                            <div style={{ padding: '1rem', background: 'var(--bg-primary)', borderRadius: '14px', border: '1px solid var(--border-color)', display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#10b981', fontWeight: 800, fontSize: '0.88rem' }}>
                                    <Cpu size={15} />
                                    <span>WASM Processing</span>
                                </div>
                                <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', margin: 0, lineHeight: 1.4 }}>
                                    High-performance WebAssembly engines deliver instant desktop-grade execution.
                                </p>
                            </div>

                            <div style={{ padding: '1rem', background: 'var(--bg-primary)', borderRadius: '14px', border: '1px solid var(--border-color)', display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#ec4899', fontWeight: 800, fontSize: '0.88rem' }}>
                                    <Shield size={15} />
                                    <span>Zero Tracking</span>
                                </div>
                                <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', margin: 0, lineHeight: 1.4 }}>
                                    Zero behavioral profiling, session monitoring, or persistent cookies.
                                </p>
                            </div>

                            <div style={{ padding: '1rem', background: 'var(--bg-primary)', borderRadius: '14px', border: '1px solid var(--border-color)', display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#f59e0b', fontWeight: 800, fontSize: '0.88rem' }}>
                                    <Sparkles size={15} />
                                    <span>100% Free Forever</span>
                                </div>
                                <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', margin: 0, lineHeight: 1.4 }}>
                                    Full premium access with no subscriptions, export watermarks, or daily quotas.
                                </p>
                            </div>
                        </div>
                    </section>
                </div>

                <aside className="content-sidebar">
                    <section id="how-to-guide" style={{ marginBottom: '3rem' }}>
                        <h3 style={{ fontSize: '1.4rem', fontWeight: 800, marginBottom: '1.5rem' }}>How to use {title}</h3>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                            {howTo.map((step, i) => (
                                <div key={i} style={{ display: 'flex', gap: '1rem', background: 'var(--bg-secondary)', padding: '1rem 1.25rem', borderRadius: '16px', border: '1px solid var(--border-color)' }}>
                                    <div style={{
                                        minWidth: '28px',
                                        height: '28px',
                                        background: 'var(--accent-primary)',
                                        color: 'white',
                                        borderRadius: '8px',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        fontSize: '0.85rem',
                                        fontWeight: 800,
                                        flexShrink: 0
                                    }}>
                                        {i + 1}
                                    </div>
                                    <p style={{ color: 'var(--text-secondary)', margin: 0, fontSize: '0.95rem', lineHeight: 1.5, fontWeight: 500 }}>{step}</p>
                                </div>
                            ))}
                        </div>
                    </section>

                    {useCases && useCases.length > 0 && (
                        <section id="use-cases" style={{ marginBottom: '3rem' }}>
                            <h3 style={{ fontSize: '1.4rem', fontWeight: 800, marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                                <CheckCircle2 size={22} style={{ color: 'var(--accent-primary)' }} />
                                Best Practices
                            </h3>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                {useCases.map((useCase, i) => (
                                    <div key={i} style={{ padding: '1.25rem', background: 'var(--bg-secondary)', borderRadius: '18px', border: '1px solid var(--border-color)' }}>
                                        <h4 style={{ fontSize: '1rem', fontWeight: 800, marginBottom: '0.5rem', color: 'var(--text-primary)' }}>{useCase.title}</h4>
                                        <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', margin: 0, lineHeight: 1.5 }}>{useCase.description}</p>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}

                    {relatedTools && relatedTools.length > 0 && (
                        <nav id="related-tools" style={{ padding: '1.5rem', background: 'var(--bg-glass)', border: '1px solid var(--border-color)', borderRadius: '20px' }}>
                            <h3 style={{ fontSize: '1.15rem', fontWeight: 800, marginBottom: '1.25rem' }}>Discover More Tools</h3>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                                {relatedTools.map((tool, i) => (
                                    <Link key={i} to={tool.path} style={{ textDecoration: 'none', color: 'inherit' }} title={`Try our ${tool.name} tool`}>
                                        <div 
                                            style={{ 
                                                borderBottom: '1px solid var(--border-color)', 
                                                paddingBottom: '0.65rem', 
                                                display: 'flex', 
                                                alignItems: 'center', 
                                                justifyContent: 'space-between',
                                                fontWeight: 600,
                                                fontSize: '0.92rem',
                                                color: 'var(--text-secondary)'
                                            }}
                                        >
                                            <span>{tool.name}</span>
                                            <ArrowRight size={15} style={{ color: 'var(--accent-primary)' }} />
                                        </div>
                                    </Link>
                                ))}
                            </div>
                            
                            {/* Category Hub Link for PageRank distribution */}
                            <div style={{ marginTop: '1.5rem', paddingTop: '1rem', borderTop: '1px solid var(--border-color)' }}>
                                <Link 
                                    to={currentPath.includes('pdf') ? '/pdf-tools' : currentPath.includes('image') ? '/image-tools' : currentPath.includes('ai') ? '/ai-tools' : currentPath.includes('math') ? '/math-tools' : currentPath.includes('productivity') ? '/productivity-tools' : '/utility-tools'}
                                    style={{ 
                                        display: 'flex', 
                                        alignItems: 'center', 
                                        gap: '0.5rem', 
                                        fontSize: '0.82rem', 
                                        fontWeight: 800, 
                                        color: 'var(--accent-primary)', 
                                        textDecoration: 'none', 
                                        textTransform: 'uppercase', 
                                        letterSpacing: '0.05em' 
                                    }}
                                >
                                    Browse Full Category Suite
                                    <ArrowRight size={13} />
                                </Link>
                            </div>
                        </nav>
                    )}
                </aside>
            </div>

            {/* Full Width FAQ Section */}
            {faq && faq.length > 0 && (
                <section id="faq-section" style={{ marginTop: '3.5rem', paddingTop: '3rem', borderTop: '1px solid var(--border-color)' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '2.5rem' }}>
                        <div style={{ padding: '10px', background: 'rgba(99, 102, 241, 0.1)', borderRadius: '14px', color: 'var(--accent-primary)', display: 'flex' }}>
                            <HelpCircle size={24} />
                        </div>
                        <div>
                            <h3 style={{ fontSize: '1.75rem', fontWeight: 900, letterSpacing: '-0.02em', margin: 0, color: 'var(--text-primary)' }}>
                                Frequently Asked Questions
                            </h3>
                            <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', margin: '0.25rem 0 0' }}>
                                Instant answers to common questions regarding security, performance, and usage.
                            </p>
                        </div>
                    </div>

                    <div style={{ 
                        display: 'grid', 
                        gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))', 
                        gap: '1.5rem' 
                    }}>
                        {faq.map((item, i) => (
                            <div 
                                key={i} 
                                style={{
                                    background: 'var(--bg-card)',
                                    border: '1px solid var(--border-color)',
                                    borderRadius: '20px',
                                    padding: '1.75rem',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    justifyContent: 'space-between',
                                    boxShadow: 'var(--shadow-sm)'
                                }}
                            >
                                <div>
                                    <h4 style={{ 
                                        fontSize: '1.05rem', 
                                        fontWeight: 800, 
                                        lineHeight: 1.45, 
                                        marginBottom: '0.85rem',
                                        color: 'var(--text-primary)' 
                                    }}>
                                        {item.q}
                                    </h4>
                                    <p style={{ 
                                        fontSize: '0.92rem', 
                                        color: 'var(--text-secondary)', 
                                        lineHeight: 1.65, 
                                        margin: 0 
                                    }}>
                                        {item.a}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            )}

            {/* Full Width Related Guides Section */}
            {((resolvedRelatedArticles && resolvedRelatedArticles.length > 0) || (readNext && readNext.length > 0)) && (
                <section id="related-guides" style={{ marginTop: '5rem', paddingTop: '4rem', borderTop: '1px solid var(--border-color)' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '2.5rem' }}>
                        <div style={{ padding: '10px', background: 'rgba(99, 102, 241, 0.1)', borderRadius: '14px', color: 'var(--accent-primary)', display: 'flex' }}>
                            <Info size={24} />
                        </div>
                        <div>
                            <h3 style={{ fontSize: '1.75rem', fontWeight: 900, letterSpacing: '-0.02em', margin: 0, color: 'var(--text-primary)' }}>
                                Expert Guides & Insights
                            </h3>
                            <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', margin: '0.25rem 0 0' }}>
                                Deep-dive tutorials, benchmarks, and privacy-first engineering breakdowns.
                            </p>
                        </div>
                    </div>

                    <div style={{ 
                        display: 'grid', 
                        gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 260px), 1fr))', 
                        gap: '1.5rem' 
                    }}>
                        {[
                            ...(readNext || []),
                            ...(resolvedRelatedArticles || []).filter(a => !(readNext || []).some(r => r.path === a.path))
                        ].map((guide, i) => (
                            <Link 
                                key={i} 
                                to={guide.path} 
                                style={{ textDecoration: 'none', color: 'inherit' }}
                            >
                                <motion.div
                                    whileHover={{ y: -4, borderColor: 'var(--accent-primary)' }}
                                    style={{
                                        background: 'var(--bg-card)',
                                        border: '1px solid var(--border-color)',
                                        borderRadius: '24px',
                                        padding: '1.75rem',
                                        height: '100%',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        justifyContent: 'space-between',
                                        boxShadow: 'var(--shadow-sm)',
                                        transition: 'all 0.25s ease'
                                    }}
                                >
                                    <div>
                                        <div style={{ 
                                            fontSize: '0.72rem', 
                                            fontWeight: 900, 
                                            color: 'var(--accent-primary)', 
                                            textTransform: 'uppercase', 
                                            letterSpacing: '0.08em', 
                                            marginBottom: '0.75rem' 
                                        }}>
                                            Tutorial & Insights
                                        </div>
                                        <h4 style={{ 
                                            fontSize: '1.05rem', 
                                            fontWeight: 800, 
                                            lineHeight: 1.45, 
                                            margin: 0,
                                            color: 'var(--text-primary)' 
                                        }}>
                                            {guide.title}
                                        </h4>
                                        {guide.description && (
                                            <p style={{ 
                                                margin: '0.75rem 0 0', 
                                                color: 'var(--text-secondary)', 
                                                fontSize: '0.9rem', 
                                                lineHeight: 1.6 
                                            }}>
                                                {guide.description}
                                            </p>
                                        )}
                                    </div>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: '1.5rem', color: 'var(--accent-primary)', fontWeight: 700, fontSize: '0.85rem' }}>
                                        <span>Read Full Guide</span>
                                        <ArrowRight size={15} />
                                    </div>
                                </motion.div>
                            </Link>
                        ))}
                    </div>
                </section>
            )}
        </article>
    )
}
