import React from 'react';
import SEO from '../components/SEO';
import { Megaphone, Bell, ArrowRight } from 'lucide-react';

const newsItems = [
    {
        title: "PixTool Reaches 1,000+ Active Daily Users",
        date: "Feb 22, 2026",
        content: "We are thrilled to announce that our productivity suite has hit a major milestone. Thank you for trusting us with your daily tasks!"
    },
    {
        title: "New AI Engine for ToolPix Launched",
        date: "Feb 10, 2026",
        content: "Our image processing tool now features a more powerful AI engine, offering 2x faster results and improved enhancement quality."
    },
    {
        title: "UTHAKKAN Expands Services to AI Consulting",
        date: "Jan 15, 2026",
        content: "Responding to growing demand, we've officially launched our AI integration and business automation consulting services."
    }
];

export default function News() {
    return (
        <div className="news-page">
            <SEO
                title="News & Announcements - Latest from PixTool"
                description="Stay up-to-date with the latest product launches, company milestones, and technology updates from the PixTool and UTHAKKAN team."
                path="/news"
            />

            <section className="hero" style={{ padding: 'clamp(5rem, 15vh, 8rem) 1.5rem 5rem', background: 'var(--bg-secondary)', marginBottom: '4rem' }}>
                <div style={{ maxWidth: '100%', margin: '0 auto', textAlign: 'center' }}>
                    <div style={{ display: 'inline-flex', padding: '12px', background: 'rgba(59, 130, 246, 0.1)', color: 'var(--accent-primary)', borderRadius: '50%', marginBottom: '1.5rem' }}>
                        <Megaphone size={32} />
                    </div>
                    <h1 className="hero-title" style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontWeight: 900, marginBottom: '1.5rem', letterSpacing: '-0.02em' }}>Latest News</h1>
                    <p className="hero-subtitle" style={{ fontSize: '1.25rem', color: 'var(--text-secondary)', maxWidth: '600px', margin: '0 auto' }}>
                        Stay informed about our latest innovations, partnerships, and milestones.
                    </p>
                </div>
            </section>

            <section style={{ padding: '0 1.5rem 10rem', width: '100%', overflowX: 'hidden' }}>
                <div style={{ width: '100%' }}>
                    <div className="news-grid">
                        {newsItems.map((item, index) => (
                            <div key={index} className="info-card" style={{ padding: '2rem', display: 'flex', flexDirection: 'column', height: '100%' }}>
                                <div style={{ background: 'var(--bg-secondary)', padding: '1.25rem', borderRadius: '16px', textAlign: 'center', marginBottom: '1.5rem', border: '1px solid var(--border-color)', display: 'flex', alignItems: 'center', gap: '0.75rem', justifyContent: 'center' }}>
                                    <Bell size={22} style={{ color: 'var(--accent-primary)' }} />
                                    <div style={{ fontSize: '0.8rem', fontWeight: 800, color: 'var(--text-primary)' }}>{item.date}</div>
                                </div>
                                <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                                    <h2 style={{ fontSize: '1.4rem', fontWeight: 900, marginBottom: '0.75rem', color: 'var(--text-primary)', letterSpacing: '-0.02em' }}>{item.title}</h2>
                                    <p style={{ color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '2rem', fontSize: '0.95rem', flex: 1 }}>{item.content}</p>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--accent-primary)', fontSize: '0.9rem', fontWeight: 800, cursor: 'pointer', marginTop: 'auto' }}>
                                        Read Full Story <ArrowRight size={18} />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <style>{`
                        .news-grid { 
                            display: grid; 
                            grid-template-columns: repeat(4, 1fr); 
                            gap: 1rem; 
                        }
                        @media (max-width: 1200px) {
                            .news-grid { grid-template-columns: repeat(3, 1fr); }
                        }
                        @media (max-width: 992px) {
                            .news-grid { grid-template-columns: repeat(2, 1fr); }
                        }
                        @media (max-width: 640px) {
                            .news-grid { grid-template-columns: 1fr; }
                        }
                    `}</style>

                    <div style={{ marginTop: '8rem', textAlign: 'center', background: 'var(--bg-secondary)', padding: '6rem 2rem', borderRadius: '48px', border: '1px solid var(--border-color)', maxWidth: '900px', margin: '8rem auto 0' }}>
                        <h2 style={{ fontSize: '2.5rem', fontWeight: 950, marginBottom: '1rem', letterSpacing: '-0.03em' }}>Never miss an update</h2>
                        <p style={{ color: 'var(--text-secondary)', marginBottom: '3rem', fontSize: '1.1rem' }}>Follow us on social media for real-time announcements.</p>
                        <div style={{ display: 'flex', gap: '1.5rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                            <a href="https://x.com/ajmal_uk_" target="_blank" rel="noopener noreferrer" className="btn btn-secondary" style={{ padding: '1rem 2.5rem', borderRadius: '100px', fontWeight: 700 }}>Twitter / X</a>
                            <a href="https://linkedin.com/company/uthakkan/" target="_blank" rel="noopener noreferrer" className="btn btn-secondary" style={{ padding: '1rem 2.5rem', borderRadius: '100px', fontWeight: 700 }}>LinkedIn</a>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
