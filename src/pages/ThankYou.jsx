import React from 'react';
import SEO from '../components/SEO';
import { Heart, PartyPopper, ArrowLeft, Share2 } from 'lucide-react';

export default function ThankYou() {
    const thanksSchema = [
        {
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": [
                {
                    "@type": "ListItem",
                    "position": 1,
                    "name": "Home",
                    "item": `${import.meta.env.VITE_SITE_URL || 'https://pixtool.in'}/`
                },
                {
                    "@type": "ListItem",
                    "position": 2,
                    "name": "Thank You",
                    "item": `${import.meta.env.VITE_SITE_URL || 'https://pixtool.in'}/thank-you`
                }
            ]
        }
    ];

    return (
        <div className="thank-you-page">
            <SEO
                title="Thank You for Your Support | PixTool"
                description="We appreciate your support and contribution to the PixTool mission. Together we're building better, private digital tools for the world."
                path="/thank-you"
                schema={thanksSchema}
            />

            <section className="hero" style={{ padding: '8rem 2rem', textAlign: 'center' }}>
                <div style={{ maxWidth: '800px', margin: '0 auto' }}>
                    <div style={{ display: 'inline-flex', padding: '16px', background: 'rgba(59, 130, 246, 0.1)', color: 'var(--accent-primary)', borderRadius: '50%', marginBottom: '2rem' }}>
                        <PartyPopper size={48} />
                    </div>

                    <h1 className="hero-title" style={{ fontSize: '4.5rem', fontWeight: 900, marginBottom: '1.5rem', background: 'var(--accent-gradient)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                        Thank You!
                    </h1>

                    <p className="hero-subtitle" style={{ fontSize: '1.5rem', color: 'var(--text-secondary)', marginBottom: '3.5rem', lineHeight: 1.6 }}>
                        Your support means the world to us. It's people like you who help us keep building clean, private, and efficient tools for everyone.
                    </p>

                    <div style={{ display: 'flex', gap: '1.5rem', justifyContent: 'center' }}>
                        <a href="/" className="btn btn-primary" style={{ gap: '10px', padding: '1.25rem 2.5rem' }}>
                            <ArrowLeft size={20} /> Back to Home
                        </a>
                        <button className="btn btn-secondary" style={{ gap: '10px', padding: '1.25rem 2.5rem' }} onClick={() => {
                            if (navigator.share) {
                                navigator.share({ title: 'PixTool', url: `${import.meta.env.VITE_SITE_URL || 'https://pixtool.in'}` });
                            } else {
                                navigator.clipboard.writeText(`${import.meta.env.VITE_SITE_URL || 'https://pixtool.in'}`);
                                alert('Link copied!');
                            }
                        }}>
                            <Share2 size={20} /> Share PixTool
                        </button>
                    </div>

                    <div style={{ marginTop: '6rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', color: 'var(--text-muted)', fontSize: '1.1rem', fontWeight: 600 }}>
                        Made with <Heart size={20} style={{ color: '#ef4444' }} /> by UTHAKKAN
                    </div>
                </div>
            </section>
        </div>
    );
}
