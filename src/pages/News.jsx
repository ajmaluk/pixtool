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
    const newsSchema = [
        {
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": [
                {
                    "@type": "ListItem",
                    "position": 1,
                    "name": "Home",
                    "item": "https://pixtool.toolpix.in/"
                },
                {
                    "@type": "ListItem",
                    "position": 2,
                    "name": "News",
                    "item": "https://pixtool.toolpix.in/news"
                }
            ]
        }
    ];

    return (
        <div className="news-page">
            <SEO
                title="News & Announcements - Latest from PixTool"
                description="Stay up-to-date with the latest product launches, company milestones, and technology updates from the PixTool and UTHAKKAN team."
                path="/news"
                schema={newsSchema}
            />

            <section className="hero" style={{ padding: '6rem 2rem 4rem' }}>
                <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
                    <div style={{ display: 'inline-flex', padding: '12px', background: 'rgba(59, 130, 246, 0.1)', color: 'var(--accent-primary)', borderRadius: '50%', marginBottom: '1.5rem' }}>
                        <Megaphone size={32} />
                    </div>
                    <h1 className="hero-title" style={{ fontSize: '3.5rem', fontWeight: 900, marginBottom: '1.5rem' }}>Latest News</h1>
                    <p className="hero-subtitle" style={{ fontSize: '1.25rem', color: 'var(--text-secondary)' }}>
                        Stay informed about our latest innovations, partnerships, and milestones.
                    </p>
                </div>
            </section>

            <section style={{ padding: '0 2rem 8rem' }}>
                <div style={{ maxWidth: '900px', margin: '0 auto' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                        {newsItems.map((item, index) => (
                            <div key={index} className="tool-card" style={{ padding: '2rem', display: 'flex', gap: '2rem', alignItems: 'flex-start' }}>
                                <div style={{ background: 'var(--bg-secondary)', padding: '15px', borderRadius: '12px', textAlign: 'center', minWidth: '100px' }}>
                                    <Bell size={24} style={{ color: 'var(--accent-primary)', marginBottom: '5px' }} />
                                    <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)' }}>{item.date}</div>
                                </div>
                                <div>
                                    <h2 style={{ fontSize: '1.4rem', fontWeight: 800, marginBottom: '0.75rem' }}>{item.title}</h2>
                                    <p style={{ color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '1rem' }}>{item.content}</p>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--accent-primary)', fontSize: '0.9rem', fontWeight: 700, cursor: 'pointer' }}>
                                        Read Full Story <ArrowRight size={16} />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div style={{ marginTop: '6rem', textAlign: 'center', background: 'var(--bg-secondary)', padding: '4rem', borderRadius: '32px' }}>
                        <h2 style={{ fontSize: '2rem', fontWeight: 900, marginBottom: '1rem' }}>Never miss an update</h2>
                        <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem' }}>Follow us on social media for real-time announcements.</p>
                        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
                            <a href="https://x.com/ajmal_uk_" target="_blank" rel="noopener noreferrer" className="btn btn-secondary">Twitter/X</a>
                            <a href="https://linkedin.com/company/uthakkan/" target="_blank" rel="noopener noreferrer" className="btn btn-secondary">LinkedIn</a>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
