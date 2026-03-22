import React from 'react';
import SEO from '../components/SEO';
import { Database, Info, Settings } from 'lucide-react';

export default function Cookie() {
    const cookieSchema = [
        {
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": [
                {
                    "@type": "ListItem",
                    "position": 1,
                    "name": "Home",
                    "item": `${import.meta.env.VITE_SITE_URL || 'https://www.pixtool.in'}/`
                },
                {
                    "@type": "ListItem",
                    "position": 2,
                    "name": "Cookie Policy",
                    "item": `${import.meta.env.VITE_SITE_URL || 'https://www.pixtool.in'}/cookie-policy`
                }
            ]
        }
    ];

    return (
        <div className="legal-page">
            <SEO
                title="Cookie Policy - How We Use Data | PixTool"
                description="Understand how PixTool uses cookies to enhance your experience while maintaining your privacy and data security."
                path="/cookie-policy"
                schema={cookieSchema}
            />

            <section className="hero" style={{ padding: '6rem 2rem 3rem', background: 'var(--bg-secondary)' }}>
                <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
                    <div style={{ display: 'inline-flex', padding: '12px', background: 'rgba(239, 68, 68, 0.1)', color: '#fbbf24', borderRadius: '50%', marginBottom: '1.5rem' }}>
                        <Database size={32} />
                    </div>
                    <h1 className="hero-title" style={{ fontSize: '3rem', fontWeight: 900, marginBottom: '1rem' }}>Cookie Policy</h1>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem' }}>Last Updated: February 2026</p>
                </div>
            </section>

            <section style={{ padding: '4rem 2rem 8rem' }}>
                <div style={{ maxWidth: '800px', margin: '0 auto' }}>
                    <div className="tool-card" style={{ padding: '3rem', fontSize: '1.05rem', lineHeight: 1.8 }}>
                        <h2 style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
                            <Info size={20} style={{ color: 'var(--accent-primary)' }} /> 1. What are Cookies?
                        </h2>
                        <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem' }}>
                            Cookies are small text files stored on your device that help web applications remember information about your visit. We use them sparingly to enhance your experience.
                        </p>

                        <h2 style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
                            <Settings size={20} style={{ color: 'var(--accent-primary)' }} /> 2. How we use Cookies
                        </h2>
                        <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>
                            UTHAKKAN uses the following types of cookies:
                        </p>
                        <ul style={{ color: 'var(--text-secondary)', marginBottom: '2rem', paddingLeft: '1.5rem' }}>
                            <li><strong>Essential Cookies:</strong> Used to remember your site preferences, such as dark mode or search history within the session.</li>
                            <li><strong>Analytical Cookies:</strong> Helps us understand how many people use our tools and which tools are most popular. This data is anonymized.</li>
                            <li><strong>Advertising Cookies:</strong> Third-party partners like Google AdSense may use cookies to show you more relevant ads.</li>
                        </ul>

                        <h2 style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: '1.5rem' }}>3. Managing Cookies</h2>
                        <p style={{ color: 'var(--text-secondary)' }}>
                            You can control and/or delete cookies as you wish through your browser settings. You can delete all cookies that are already on your computer and you can set most browsers to prevent them from being placed. However, if you do this, you may have to manually adjust some preferences every time you visit a site and some services and functionalities may not work.
                        </p>
                    </div>
                </div>
            </section>
        </div>
    );
}
