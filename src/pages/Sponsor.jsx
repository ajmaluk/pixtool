import React from 'react';
import SEO from '../components/SEO';
import { Heart, Coffee, Star, ShieldCheck, Zap, Globe } from 'lucide-react';

export default function Sponsor() {
    const sponsorSchema = [
        {
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": [
                {
                    "@type": "ListItem",
                    "position": 1,
                    "name": "Home",
                    "item": "https://dailytools.toolpix.in/"
                },
                {
                    "@type": "ListItem",
                    "position": 2,
                    "name": "Sponsor",
                    "item": "https://dailytools.toolpix.in/sponsor"
                }
            ]
        }
    ];

    return (
        <div className="sponsor-page">
            <SEO
                title="Sponsor & Support Our Mission | DailyTools"
                description="Help us keep DailyTools free, private, and accessible for everyone. Support our mission through one-time donations or monthly sponsorships."
                path="/sponsor"
                schema={sponsorSchema}
            />

            <section className="hero" style={{ padding: '6rem 2rem 4rem' }}>
                <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
                    <div style={{ display: 'inline-flex', padding: '12px', background: 'rgba(244, 114, 182, 0.1)', color: '#f472b6', borderRadius: '50%', marginBottom: '1.5rem' }}>
                        <Heart size={32} />
                    </div>
                    <h1 className="hero-title" style={{ fontSize: '3.5rem', fontWeight: 900, marginBottom: '1.5rem' }}>Support Our Mission</h1>
                    <p className="hero-subtitle" style={{ fontSize: '1.25rem', color: 'var(--text-secondary)' }}>
                        Your support helps us keep DailyTools free, fast, and private for everyone.
                    </p>
                </div>
            </section>

            <section style={{ padding: '0 2rem 8rem' }}>
                <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem', marginBottom: '6rem' }}>
                        {/* One-time */}
                        <div className="tool-card" style={{ padding: '3rem', textAlign: 'center', border: '2px solid var(--border-color)' }}>
                            <Coffee size={40} style={{ color: '#FFDD00', marginBottom: '1.5rem', margin: '0 auto 1.5rem' }} />
                            <h3 style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: '1rem' }}>Buy Me a Coffee</h3>
                            <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem' }}>A quick and easy way to say thanks and keep the servers running.</p>
                            <a href="https://buymeacoffee.com/ajmal.uk" target="_blank" rel="noopener noreferrer" className="btn" style={{ background: '#FFDD00', color: 'black', width: '100%', fontWeight: 700 }}>Donate Now</a>
                        </div>

                        {/* Monthly */}
                        <div className="tool-card" style={{ padding: '3rem', textAlign: 'center', borderColor: 'var(--accent-primary)', position: 'relative' }}>
                            <div style={{ position: 'absolute', top: '-15px', left: '50%', transform: 'translateX(-50%)', background: 'var(--accent-primary)', color: 'white', padding: '4px 16px', borderRadius: '100px', fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase' }}>Most Impact</div>
                            <Star size={40} style={{ color: 'var(--accent-primary)', marginBottom: '1.5rem', margin: '0 auto 1.5rem' }} />
                            <h3 style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: '1rem' }}>GitHub Sponsor</h3>
                            <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem' }}>Join our community of monthly supporters and get exclusive updates.</p>
                            <a href="https://github.com/sponsors/ajmal-uk" target="_blank" rel="noopener noreferrer" className="btn btn-primary" style={{ width: '100%' }}>Become a Sponsor</a>
                        </div>

                        {/* Business */}
                        <div className="tool-card" style={{ padding: '3rem', textAlign: 'center', border: '2px solid var(--border-color)' }}>
                            <Globe size={40} style={{ color: '#10b981', marginBottom: '1.5rem', margin: '0 auto 1.5rem' }} />
                            <h3 style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: '1rem' }}>Corporate</h3>
                            <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem' }}>Does your team use our tools? Consider a corporate sponsorship.</p>
                            <a href="mailto:contact.uthakkan@gmail.com" className="btn btn-secondary" style={{ width: '100%' }}>Contact Us</a>
                        </div>
                    </div>

                    <div style={{ padding: '4rem', background: 'var(--bg-secondary)', borderRadius: '32px' }}>
                        <h2 style={{ fontSize: '2rem', fontWeight: 900, marginBottom: '2rem', textAlign: 'center' }}>Where does your money go?</h2>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem' }}>
                            <div style={{ display: 'flex', gap: '1rem' }}>
                                <ShieldCheck style={{ color: '#10b981', flexShrink: 0 }} />
                                <div>
                                    <h4 style={{ fontWeight: 800, marginBottom: '0.5rem' }}>Server Costs</h4>
                                    <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>Keeping our high-speed global infrastructure running 24/7.</p>
                                </div>
                            </div>
                            <div style={{ display: 'flex', gap: '1rem' }}>
                                <Zap style={{ color: '#fbbf24', flexShrink: 0 }} />
                                <div>
                                    <h4 style={{ fontWeight: 800, marginBottom: '0.5rem' }}>New Features</h4>
                                    <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>Research and development for more advanced AI-powered tools.</p>
                                </div>
                            </div>
                            <div style={{ display: 'flex', gap: '1rem' }}>
                                <Heart style={{ color: '#ef4444', flexShrink: 0 }} />
                                <div>
                                    <h4 style={{ fontWeight: 800, marginBottom: '0.5rem' }}>Open Source</h4>
                                    <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>Supporting the open-source libraries that make our work possible.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
