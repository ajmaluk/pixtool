import React from 'react';
import SEO from '../components/SEO';
import { Tag, Gift, Zap, ArrowRight } from 'lucide-react';

const offers = [
    {
        title: "Startup Launch Discount",
        discount: "20% OFF",
        description: "Get a special discount on custom web development services for new startups and small businesses.",
        code: "LAUNCH2026"
    },
    {
        title: "AI Integration Bundle",
        discount: "FREE Audit",
        description: "Book an AI automation project and get a full digital workflow audit completely free of charge.",
        code: "AIAUDIT"
    },
    {
        title: "Student Ambassador Program",
        discount: "Special Perks",
        description: "Are you a student? Join our ambassador program for exclusive access to beta tools and UTHAKKAN swag.",
        code: "STUDENT"
    }
];

export default function Promotions() {
    const promoSchema = [
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
                    "name": "Promotions",
                    "item": "https://pixtool.toolpix.in/promotions"
                }
            ]
        }
    ];

    return (
        <div className="promotions-page">
            <SEO
                title="Promotions & Exclusive Offers | PixTool"
                description="Save big on premium digital services and custom development. Explore the latest exclusive offers and discount codes from PixTool."
                path="/promotions"
                schema={promoSchema}
            />

            <section className="hero" style={{ padding: '6rem 2rem 4rem' }}>
                <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
                    <div style={{ display: 'inline-flex', padding: '12px', background: 'rgba(168, 85, 247, 0.1)', color: '#a855f7', borderRadius: '50%', marginBottom: '1.5rem' }}>
                        <Tag size={32} />
                    </div>
                    <h1 className="hero-title" style={{ fontSize: '3.5rem', fontWeight: 900, marginBottom: '1.5rem' }}>Exclusive Offers</h1>
                    <p className="hero-subtitle" style={{ fontSize: '1.25rem', color: 'var(--text-secondary)' }}>
                        Special deals and promotions for our community and clients.
                    </p>
                </div>
            </section>

            <section style={{ padding: '0 2rem 8rem' }}>
                <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem' }}>
                        {offers.map((offer, i) => (
                            <div key={i} className="tool-card" style={{ padding: '3rem', position: 'relative', overflow: 'hidden', border: '2px solid var(--border-color)' }}>
                                <div style={{ position: 'absolute', top: '20px', right: '20px' }}>
                                    <Gift size={32} style={{ color: 'var(--accent-primary)', opacity: 0.2 }} />
                                </div>

                                <div style={{ display: 'inline-flex', padding: '6px 16px', background: 'var(--accent-primary)', color: 'white', borderRadius: '100px', fontSize: '1.25rem', fontWeight: 900, marginBottom: '1.5rem' }}>
                                    {offer.discount}
                                </div>

                                <h2 style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: '1rem' }}>{offer.title}</h2>
                                <p style={{ color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '2rem' }}>{offer.description}</p>

                                <div style={{ background: 'var(--bg-secondary)', padding: '1rem', borderRadius: '12px', border: '1px dashed var(--border-color)', textAlign: 'center', marginBottom: '1.5rem' }}>
                                    <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.1em', display: 'block', marginBottom: '5px' }}>Use Code</span>
                                    <span style={{ fontSize: '1.5rem', fontWeight: 900, color: 'var(--text-primary)', letterSpacing: '0.2em' }}>{offer.code}</span>
                                </div>

                                <a href="/contact" style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--accent-primary)', fontWeight: 700, textDecoration: 'none' }}>
                                    Claim Offer <ArrowRight size={18} />
                                </a>
                            </div>
                        ))}
                    </div>

                    <div style={{ marginTop: '6rem', textAlign: 'center', background: 'var(--bg-secondary)', padding: '5rem 2rem', borderRadius: '32px' }}>
                        <Zap size={48} style={{ color: '#fbbf24', marginBottom: '1.5rem', margin: '0 auto 1.5rem' }} />
                        <h2 style={{ fontSize: '2.5rem', fontWeight: 900, marginBottom: '1.5rem' }}>Want a custom solution?</h2>
                        <p style={{ fontSize: '1.2rem', color: 'var(--text-secondary)', marginBottom: '3rem' }}>We offer tailored pricing for long-term partnerships and enterprise needs.</p>
                        <a href="/contact" className="btn btn-primary" style={{ padding: '1.25rem 3rem' }}>Get a Custom Quote</a>
                    </div>
                </div>
            </section>
        </div>
    );
}
