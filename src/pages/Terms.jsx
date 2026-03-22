import React from 'react';
import SEO from '../components/SEO';
import { Scale, FileCheck, AlertCircle } from 'lucide-react';

export default function Terms() {
    const termsSchema = [
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
                    "name": "Terms of Service",
                    "item": "https://dailytools.toolpix.in/terms-of-service"
                }
            ]
        }
    ];

    return (
        <div className="legal-page">
            <SEO
                title="Terms of Service - Usage Guidelines | DailyTools"
                description="Read the terms and conditions for using DailyTools. Understand your rights and our commitment to providing free, high-quality digital tools."
                path="/terms-of-service"
                schema={termsSchema}
            />

            <section className="hero" style={{ padding: '6rem 2rem 3rem', background: 'var(--bg-secondary)' }}>
                <div style={{ maxWidth: '100%', margin: '0 auto', textAlign: 'center' }}>
                    <div style={{ display: 'inline-flex', padding: '12px', background: 'rgba(59, 130, 246, 0.1)', color: 'var(--accent-primary)', borderRadius: '50%', marginBottom: '1.5rem' }}>
                        <Scale size={32} />
                    </div>
                    <h1 className="hero-title" style={{ fontSize: '3rem', fontWeight: 900, marginBottom: '1rem' }}>Terms of Service</h1>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem' }}>Effective Date: February 2026</p>
                </div>
            </section>

            <section style={{ padding: '4rem 2rem 8rem' }}>
                <div style={{ maxWidth: '100%', margin: '0 auto' }}>
                    <div className="tool-card" style={{ padding: '3rem', fontSize: '1.05rem', lineHeight: 1.8 }}>
                        <h2 style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: '1.5rem' }}>1. Acceptance of Terms</h2>
                        <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem' }}>
                            By accessing and using the UTHAKKAN website and tools, you agree to comply with and be bound by these Terms of Service. If you do not agree, please do not use our services.
                        </p>

                        <h2 style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: '1.5rem' }}>2. Use of Services</h2>
                        <p style={{ color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                            UTHAKKAN provides free online utility tools. You agree to use these services only for lawful purposes.
                        </p>
                        <div style={{ background: 'var(--bg-secondary)', padding: '1.5rem', borderRadius: '12px', marginBottom: '2rem', border: '1px solid var(--border-color)' }}>
                            <p style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-primary)', fontWeight: 700, marginBottom: '0.5rem' }}>
                                <AlertCircle size={18} style={{ color: '#ef4444' }} /> Prohibited Actions:
                            </p>
                            <ul style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', paddingLeft: '1.25rem' }}>
                                <li>Attempting to bypass security or reverse-engineer the tools.</li>
                                <li>Using our services for automated scraping or mass-processing without permission.</li>
                                <li>Redistributing our tools as your own services.</li>
                            </ul>
                        </div>

                        <h2 style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: '1.5rem' }}>3. Disclaimer of Warranties</h2>
                        <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem' }}>
                            Our tools are provided "as is" without any warranty. While we strive for 100% accuracy and uptime, UTHAKKAN is not responsible for any data loss, errors, or damages resulting from the use of our services.
                        </p>

                        <h2 style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: '1.5rem' }}>4. Intellectual Property</h2>
                        <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem' }}>
                            The design, code, and content of UTHAKKAN tools are the intellectual property of Ajmal U K / UTHAKKAN. All rights reserved.
                        </p>

                        <h2 style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: '1.5rem' }}>5. Modifications</h2>
                        <p style={{ color: 'var(--text-secondary)' }}>
                            We reserve the right to modify these terms or any part of our services at any time. Continued use of the service constitutes acceptance of the updated terms.
                        </p>
                    </div>
                </div>
            </section>
        </div>
    );
}
