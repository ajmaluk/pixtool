import React from 'react';
import SEO from '../components/SEO';
import { RefreshCcw, DollarSign, HelpCircle } from 'lucide-react';

export default function Refund() {
    const refundSchema = [
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
                    "name": "Refund Policy",
                    "item": "https://pixtool.toolpix.in/refund-policy"
                }
            ]
        }
    ];

    return (
        <div className="legal-page">
            <SEO
                title="Refund Policy - Information | PixTool"
                description="Learn about our refund policy for paid services and digital products by PixTool and UTHAKKAN."
                path="/refund-policy"
                schema={refundSchema}
            />

            <section className="hero" style={{ padding: '6rem 2rem 3rem', background: 'var(--bg-secondary)' }}>
                <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
                    <div style={{ display: 'inline-flex', padding: '12px', background: 'rgba(239, 68, 68, 0.1)', color: '#ef4444', borderRadius: '50%', marginBottom: '1.5rem' }}>
                        <RefreshCcw size={32} />
                    </div>
                    <h1 className="hero-title" style={{ fontSize: '3rem', fontWeight: 900, marginBottom: '1rem' }}>Refund Policy</h1>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem' }}>Last Updated: February 2026</p>
                </div>
            </section>

            <section style={{ padding: '4rem 2rem 8rem' }}>
                <div style={{ maxWidth: '800px', margin: '0 auto' }}>
                    <div className="tool-card" style={{ padding: '3rem', fontSize: '1.05rem', lineHeight: 1.8 }}>
                        <h2 style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: '1.5rem' }}>1. Free Tools</h2>
                        <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem' }}>
                            The vast majority of tools on the UTHAKKAN platform (PixTool, ToolPix, etc.) are currently <strong>100% free</strong> to use. Since no payment is required for these tools, no refunds are applicable.
                        </p>

                        <h2 style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
                            <DollarSign size={20} style={{ color: 'var(--accent-primary)' }} /> 2. Paid Services
                        </h2>
                        <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>
                            For custom development services, digital consulting, or any future premium subscriptions:
                        </p>
                        <ul style={{ color: 'var(--text-secondary)', marginBottom: '2rem', paddingLeft: '1.5rem' }}>
                            <li><strong>Project Deposits:</strong> Deposits for custom development projects are typically non-refundable once work has commenced.</li>
                            <li><strong>Digital Products:</strong> Due to the nature of digital goods, refunds are generally not provided after access has been granted, except in cases of technical failure on our end.</li>
                            <li><strong>Subscription Services:</strong> Future subscription models will include a 7-day money-back guarantee, unless otherwise specified.</li>
                        </ul>

                        <h2 style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
                            <HelpCircle size={20} style={{ color: 'var(--accent-primary)' }} /> 3. Contact for Support
                        </h2>
                        <p style={{ color: 'var(--text-secondary)' }}>
                            If you have any issues with a paid service or product, please contact us at <a href="mailto:contact.uthakkan@gmail.com" style={{ color: 'var(--accent-primary)', textDecoration: 'none', fontWeight: 600 }}>contact.uthakkan@gmail.com</a>. We are committed to ensuring our customers are satisfied and will work with you to resolve any concerns.
                        </p>
                    </div>
                </div>
            </section>
        </div>
    );
}
