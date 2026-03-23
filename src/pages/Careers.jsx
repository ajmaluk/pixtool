import { Link } from 'react-router-dom';
import SEO from '../components/SEO';
import { motion } from 'framer-motion';
import { Heart, Coffee, Globe, ArrowRight, Mail } from 'lucide-react';

export default function Careers() {
    return (
        <div className="careers-page">
            <SEO
                title="Careers - Join the PixTool Journey | PixTool"
                description="Explore career opportunities at PixTool. We build high-performance, privacy-focused digital utilities. Check our status and reach out for queries."
                path="/careers"
            />

            <section className="hero" style={{ padding: 'clamp(5rem, 15vh, 8rem) 1.5rem 5rem', background: 'var(--bg-secondary)', marginBottom: '4rem' }}>
                <div style={{ maxWidth: '100%', margin: '0 auto', textAlign: 'center' }}>
                    <div className="status-badge" style={{ margin: '0 auto 1.5rem', width: 'fit-content', background: 'rgba(239, 68, 68, 0.1)', color: '#ef4444', fontWeight: 800, border: '1px solid rgba(239, 68, 68, 0.2)' }}>
                        NOT CURRENTLY HIRING
                    </div>
                    <h1 className="hero-title" style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontWeight: 950, marginBottom: '1.5rem', letterSpacing: '-0.02em' }}>Careers at PixTool</h1>
                    <p className="hero-subtitle" style={{ fontSize: '1.25rem', color: 'var(--text-secondary)', maxWidth: '600px', margin: '0 auto', lineHeight: 1.6 }}>
                        We're taking a short break from expanding our team, but we're always excited to hear from talented builders and dreamers.
                    </p>
                </div>
            </section>

            <section style={{ padding: '0 1.5rem 10rem', width: '100%', overflowX: 'hidden' }}>
                <div style={{ width: '100%' }}>
                    <div className="careers-perks-grid" style={{ marginBottom: '8rem' }}>
                        <div className="info-card" style={{ padding: '2.5rem', textAlign: 'center' }}>
                            <div style={{ width: '52px', height: '52px', borderRadius: '14px', background: 'rgba(59, 130, 246, 0.1)', color: 'var(--accent-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem' }}>
                                <Globe size={26} />
                            </div>
                            <h3 style={{ fontWeight: 900, marginBottom: '0.75rem', fontSize: '1.25rem' }}>Remote First</h3>
                            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: 1.5 }}>Work from anywhere in the world. We value output over office hours.</p>
                        </div>
                        <div className="info-card" style={{ padding: '2.5rem', textAlign: 'center' }}>
                            <div style={{ width: '52px', height: '52px', borderRadius: '14px', background: 'rgba(239, 68, 68, 0.1)', color: '#ef4444', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem' }}>
                                <Heart size={26} />
                            </div>
                            <h3 style={{ fontWeight: 900, marginBottom: '0.75rem', fontSize: '1.25rem' }}>Impact matters</h3>
                            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: 1.5 }}>Your code and designs will be used by thousands of people every day.</p>
                        </div>
                        <div className="info-card" style={{ padding: '2.5rem', textAlign: 'center' }}>
                            <div style={{ width: '52px', height: '52px', borderRadius: '14px', background: 'rgba(245, 158, 11, 0.1)', color: '#f59e0b', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem' }}>
                                <Coffee size={26} />
                            </div>
                            <h3 style={{ fontWeight: 900, marginBottom: '0.75rem', fontSize: '1.25rem' }}>Growth Mindset</h3>
                            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: 1.5 }}>Continuous learning is part of our DNA. We grow together.</p>
                        </div>
                    </div>

                    <style>{`
                        .careers-perks-grid { 
                            display: grid; 
                            grid-template-columns: repeat(3, 1fr); 
                            gap: 1.5rem; 
                        }
                        @media (max-width: 992px) {
                            .careers-perks-grid { grid-template-columns: repeat(2, 1fr); }
                        }
                        @media (max-width: 640px) {
                            .careers-perks-grid { grid-template-columns: 1fr; }
                        }
                    `}</style>

                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}
                    >
                        <div className="info-card" style={{ padding: '4rem 2rem', background: 'var(--bg-secondary)', border: '1px dashed var(--border-color)', borderRadius: '48px', position: 'relative', overflow: 'hidden' }}>
                            <div style={{ 
                                width: '80px', 
                                height: '80px', 
                                background: 'rgba(239, 68, 68, 0.05)', 
                                color: '#ef4444', 
                                borderRadius: '24px', 
                                display: 'flex', 
                                alignItems: 'center', 
                                justifyContent: 'center', 
                                margin: '0 auto 2rem' 
                            }}>
                                <Mail size={36} />
                            </div>
                            <h2 style={{ fontSize: '2.25rem', fontWeight: 950, marginBottom: '1.25rem', letterSpacing: '-0.03em', color: 'var(--text-primary)' }}>No Open Positions</h2>
                            <p style={{ color: 'var(--text-secondary)', fontSize: '1.15rem', lineHeight: 1.7, marginBottom: '3rem', maxWidth: '500px', margin: '0 auto 3rem' }}>
                                We don't have any active openings at the moment. However, if you have any queries or want to stay on our radar, please reach out.
                            </p>
                            
                            <div style={{ display: 'flex', gap: '1.5rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                                <Link to="/contact" className="btn btn-primary" style={{ padding: '1.25rem 3rem', borderRadius: '100px', fontWeight: 800, fontSize: '1.1rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
                                    Contact Us <ArrowRight size={20} />
                                </Link>
                                <a href="mailto:careers@pixtool.in" className="btn btn-secondary" style={{ padding: '1.25rem 3rem', borderRadius: '100px', fontWeight: 700, fontSize: '1.1rem' }}>
                                    Send Resume
                                </a>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>
        </div>
    );
}
