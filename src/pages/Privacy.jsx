import React from 'react';
import SEO from '../components/SEO';
import { ShieldCheck, Lock, Eye, FileText } from 'lucide-react';

export default function Privacy() {
    const privacySchema = [
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
                    "name": "Privacy Policy",
                    "item": `${import.meta.env.VITE_SITE_URL || 'https://pixtool.in'}/privacy-policy`
                }
            ]
        }
    ];

    return (
        <div className="legal-page">
            <SEO
                title="Privacy Policy - Your Data Security | PixTool"
                description="Our privacy-first policy: your files never leave your browser. Learn how PixTool and UTHAKKAN protect your data through local processing."
                path="/privacy-policy"
                schema={privacySchema}
            />

            <section className="hero" style={{ padding: '6rem 2rem 3rem', background: 'var(--bg-secondary)' }}>
                <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
                    <div style={{ display: 'inline-flex', padding: '12px', background: 'rgba(16, 185, 129, 0.1)', color: '#10b981', borderRadius: '50%', marginBottom: '1.5rem' }}>
                        <ShieldCheck size={32} />
                    </div>
                    <h1 className="hero-title" style={{ fontSize: '3rem', fontWeight: 900, marginBottom: '1rem' }}>Privacy Policy</h1>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem' }}>Last Updated: February 2026</p>
                </div>
            </section>

            <section style={{ padding: '4rem 2rem 8rem' }}>
                <div style={{ maxWidth: '800px', margin: '0 auto' }}>
                    <div className="tool-card" style={{ padding: '3rem', fontSize: '1.05rem', lineHeight: 1.8 }}>
                        <h2 style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
                            <Lock size={20} style={{ color: 'var(--accent-primary)' }} /> 1. The "Edge-First" Philosophy
                        </h2>
                        <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>
                            At <strong>UTHAKKAN</strong>, we believe that your data is exactly that — <em>yours</em>. Our core architecture is built on the principle of <strong>Local browser-side computation</strong>.
                        </p>
                        <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem' }}>
                            Unlike traditional online tools that require you to upload files to a remote server for processing (where they could be intercepted, stored, or analyzed), PixTool uses <strong>WebAssembly (WASM)</strong> and <strong>modern Canvas APIs</strong> to perform all transformations directly in your browser's memory.
                        </p>

                        <h2 style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
                            <Eye size={20} style={{ color: 'var(--accent-primary)' }} /> 2. Data Zero-Retention Policy
                        </h2>
                        <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>
                            We operate under a strict <strong>Zero-Retention</strong> policy for all user-generated content:
                        </p>
                        <ul style={{ color: 'var(--text-secondary)', marginBottom: '2.5rem', paddingLeft: '1.5rem' }}>
                            <li style={{ marginBottom: '0.75rem' }}><strong>Zero File Uploads:</strong> Your images, PDFs, and documents are never transmitted to our servers. Processing happens in a secure, isolated sandbox within your browser.</li>
                            <li style={{ marginBottom: '0.75rem' }}><strong>No Account Requirements:</strong> We do not require registration or login to use our core tools, eliminating the need to collect names, emails, or personal identifiers.</li>
                            <li style={{ marginBottom: '0.75rem' }}><strong>Temporary Mail Privacy:</strong> Our Temp Mail service uses secure API calls to create volatile mailboxes that are permanently deleted once you close your session.</li>
                            <li style={{ marginBottom: '0.75rem' }}><strong>Local Storage:</strong> Any settings (like theme preference) are stored locally on your device via <code>localStorage</code> and are never synced to a cloud database.</li>
                        </ul>

                        <h2 style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
                            <ShieldCheck size={20} style={{ color: 'var(--accent-primary)' }} /> 3. Security Framework
                        </h2>
                        <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem' }}>
                            PixTool leverages <strong>Content Security Policy (CSP)</strong> and <strong>HTTPS encryption</strong> to ensure that your interaction with our tools remains secure. Our browser-based model is inherently compliant with <strong>GDPR, HIPAA, and CCPA</strong> because the data controller (you) never transfers data to a third-party processor (us).
                        </p>

                        <h2 style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
                            <FileText size={20} style={{ color: 'var(--accent-primary)' }} /> 3. Third-Party Services
                        </h2>
                        <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem' }}>
                            We may use third-party advertising partners (like Google AdSense) to keep our tools free. These partners may use cookies to serve ads based on your interests. You can opt-out of personalized advertising through your browser settings or Google's ad preferences.
                        </p>

                        <h2 style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: '1.5rem' }}>4. Contact</h2>
                        <p style={{ color: 'var(--text-secondary)' }}>
                            If you have any questions about our privacy practices, please contact us at <a href="mailto:contact.uthakkan@gmail.com" style={{ color: 'var(--accent-primary)', textDecoration: 'none', fontWeight: 600 }}>contact.uthakkan@gmail.com</a>.
                        </p>
                    </div>
                </div>
            </section>
        </div>
    );
}
