import React from 'react';
import SEO from '../components/SEO';
import { Briefcase, Code, Terminal, MessageSquare, Send, CheckCircle2 } from 'lucide-react';

export default function HireMe() {
    return (
        <div className="hire-me-page">
            <SEO
                title="Hire Ajmal U K - Senior Software Engineer | PixTool"
                description="Looking for a full-stack developer? Hire Ajmal U K, the creator of PixTool, for your next web, mobile, or AI project. Expertise in React, Node.js, and AI automation."
                path="/hire-me"
            />

            <section className="hero" style={{ padding: '6rem 2rem 4rem' }}>
                <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
                    <div className="status-badge" style={{ margin: '0 auto 1.5rem', width: 'fit-content' }}>
                        AVAILABLE FOR PROJECTS
                    </div>
                    <h1 className="hero-title" style={{ fontSize: '3.5rem', fontWeight: 900, marginBottom: '1.5rem' }}>Let's Build Something</h1>
                    <p className="hero-subtitle" style={{ fontSize: '1.25rem', color: 'var(--text-secondary)' }}>
                        Elevate your digital presence with custom development, AI solutions, and expert consulting.
                    </p>
                </div>
            </section>

            <section style={{ padding: '0 2rem 8rem' }}>
                <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
                    <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '4rem', alignItems: 'start' }}>
                        {/* Left Column: Services & Experience */}
                        <div>
                            <h2 style={{ fontSize: '2rem', fontWeight: 900, marginBottom: '2rem' }}>What I bring to the table</h2>

                            <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                                <div style={{ display: 'flex', gap: '1.5rem' }}>
                                    <div style={{ background: 'rgba(59, 130, 246, 0.1)', color: 'var(--accent-primary)', padding: '12px', borderRadius: '12px', height: 'fit-content' }}>
                                        <Code size={24} />
                                    </div>
                                    <div>
                                        <h3 style={{ fontWeight: 800, fontSize: '1.25rem', marginBottom: '0.5rem' }}>Full-Stack Development</h3>
                                        <p style={{ color: 'var(--text-secondary)', lineHeight: 1.6 }}>From sleek React frontends to robust Node.js backends. I build scalable, performance-optimized web applications tailored to your needs.</p>
                                    </div>
                                </div>

                                <div style={{ display: 'flex', gap: '1.5rem' }}>
                                    <div style={{ background: 'rgba(16, 185, 129, 0.1)', color: '#10b981', padding: '12px', borderRadius: '12px', height: 'fit-content' }}>
                                        <Terminal size={24} />
                                    </div>
                                    <div>
                                        <h3 style={{ fontWeight: 800, fontSize: '1.25rem', marginBottom: '0.5rem' }}>AI & Automation</h3>
                                        <p style={{ color: 'var(--text-secondary)', lineHeight: 1.6 }}>Integrating intelligent features into your products. Custom AI agents, automated workflows, and data processing solutions.</p>
                                    </div>
                                </div>

                                <div style={{ display: 'flex', gap: '1.5rem' }}>
                                    <div style={{ background: 'rgba(168, 85, 247, 0.1)', color: '#a855f7', padding: '12px', borderRadius: '12px', height: 'fit-content' }}>
                                        <Briefcase size={24} />
                                    </div>
                                    <div>
                                        <h3 style={{ fontWeight: 800, fontSize: '1.25rem', marginBottom: '0.5rem' }}>Product Consulting</h3>
                                        <p style={{ color: 'var(--text-secondary)', lineHeight: 1.6 }}>Strategy, tool selection, and optimization for creators and startups. I help you build the right systems from day one.</p>
                                    </div>
                                </div>
                            </div>

                            <div style={{ marginTop: '4rem', display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1rem' }}>
                                {['React / Next.js', 'Node.js / Python', 'AI / LLM Integration', 'WebAssembly (WASM)', 'Cloud Architecture', 'UI/UX Design Thinking'].map((skill, i) => (
                                    <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.9rem', fontWeight: 600, color: 'var(--text-primary)' }}>
                                        <CheckCircle2 size={16} style={{ color: '#10b981' }} /> {skill}
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Right Column: Contact/Hire Form */}
                        <div className="tool-card" style={{ padding: '3rem', border: '2px solid var(--accent-primary)', boxShadow: '0 20px 40px rgba(59, 130, 246, 0.1)' }}>
                            <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
                                <MessageSquare size={48} style={{ color: 'var(--accent-primary)', marginBottom: '1.5rem', margin: '0 auto 1.5rem' }} />
                                <h2 style={{ fontSize: '1.75rem', fontWeight: 900 }}>Start a Project</h2>
                                <p style={{ color: 'var(--text-secondary)' }}>Describe your vision and I'll get back to you within 24 hours.</p>
                            </div>

                            <form onSubmit={(e) => { e.preventDefault(); alert("Feature coming soon! Please use email."); }} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                                <div className="input-group">
                                    <label className="input-label">Project Name</label>
                                    <input type="text" className="input" placeholder="e.g. My Awesome SaaS" required />
                                </div>
                                <div className="input-group">
                                    <label className="input-label">Budget Range</label>
                                    <select className="select" required>
                                        <option value="">Select a range</option>
                                        <option value="100-500">$100 - $500</option>
                                        <option value="500-2000">$500 - $2,000</option>
                                        <option value="2000-5000">$2,000 - $5,000</option>
                                        <option value="5000+">$5,000+</option>
                                    </select>
                                </div>
                                <div className="input-group">
                                    <label className="input-label">Project Details</label>
                                    <textarea className="input" style={{ minHeight: '120px', resize: 'vertical' }} placeholder="What are we building?" required></textarea>
                                </div>
                                <button type="submit" className="btn btn-primary" style={{ width: '100%', gap: '10px', fontSize: '1.1rem', padding: '1.25rem' }}>
                                    Send Inquiry <Send size={20} />
                                </button>
                            </form>

                            <div style={{ marginTop: '2rem', textAlign: 'center' }}>
                                <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                                    Or email directly at <br />
                                    <a href="mailto:contact@uthakkan.com" style={{ color: 'var(--accent-primary)', fontWeight: 700, textDecoration: 'none' }}>contact@uthakkan.com</a>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
