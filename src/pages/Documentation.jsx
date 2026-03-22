import React from 'react';
import SEO from '../components/SEO';
import { Book, Code, Terminal, Zap, FileText, Search } from 'lucide-react';

const docSections = [
    {
        title: "Getting Started",
        icon: Book,
        content: "Learn the basics of how PixTool works. Our browser-based architecture ensures that you don't need to install anything. Simply pick a tool and start processing."
    },
    {
        title: "Image Processing",
        icon: Zap,
        content: "Detailed guides on how to use our AI-powered image tools. From resizing for social media to advanced compression techniques."
    },
    {
        title: "PDF Management",
        icon: FileText,
        content: "Master our PDF suite. Learn how to merge multiple documents, extract specific pages, and convert PDFs to high-quality images."
    },
    {
        title: "Developer API",
        icon: Code,
        content: "Coming soon: Programmatic access to our local processing engine. Integrate UTHAKKAN magic directly into your own applications."
    }
];

export default function Documentation() {
    const docsSchema = [
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
                    "name": "Documentation",
                    "item": `${import.meta.env.VITE_SITE_URL || 'https://www.pixtool.in'}/documentation`
                }
            ]
        }
    ];

    return (
        <div className="docs-page">
            <SEO
                title="Documentation - User Guides & API Documentation | PixTool"
                description="Master PixTool with our comprehensive documentation. Detailed guides on image processing, PDF management, and upcoming API features."
                path="/documentation"
                schema={docsSchema}
            />

            <section className="hero" style={{ padding: '6rem 2rem 4rem' }}>
                <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
                    <div style={{ display: 'inline-flex', padding: '12px', background: 'rgba(59, 130, 246, 0.1)', color: 'var(--accent-primary)', borderRadius: '50%', marginBottom: '1.5rem' }}>
                        <Book size={32} />
                    </div>
                    <h1 className="hero-title" style={{ fontSize: '3.5rem', fontWeight: 900, marginBottom: '1.5rem' }}>Full Documentation</h1>

                    <div className="search-container" style={{ maxWidth: '600px', margin: '2rem auto 0' }}>
                        <Search size={20} className="navbar-search-icon" />
                        <input
                            type="text"
                            className="search-input"
                            placeholder="Search documentation..."
                            style={{ width: '100%', padding: '1rem 3rem' }}
                        />
                    </div>
                </div>
            </section>

            <section style={{ padding: '0 2rem 8rem' }}>
                <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem' }}>
                        {docSections.map((section, i) => (
                            <div key={i} className="tool-card" style={{ padding: '2.5rem' }}>
                                <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'var(--bg-secondary)', color: 'var(--accent-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.5rem' }}>
                                    <section.icon size={24} />
                                </div>
                                <h2 style={{ fontSize: '1.25rem', fontWeight: 800, marginBottom: '1rem' }}>{section.title}</h2>
                                <p style={{ color: 'var(--text-secondary)', lineHeight: 1.6, fontSize: '0.95rem' }}>
                                    {section.content}
                                </p>
                                <div style={{ marginTop: '1.5rem', display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--accent-primary)', fontSize: '0.9rem', fontWeight: 700, cursor: 'pointer' }}>
                                    Learn More <Terminal size={14} />
                                </div>
                            </div>
                        ))}
                    </div>

                    <div style={{ marginTop: '6rem', padding: '4rem', background: 'var(--bg-secondary)', borderRadius: '32px' }}>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '4rem', textAlign: 'left' }}>
                            <div>
                                <h3 style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: '1rem' }}>Common Tasks</h3>
                                <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                                    <li style={{ color: 'var(--text-primary)', fontWeight: 600, cursor: 'pointer' }}>• How to resize images for Instagram</li>
                                    <li style={{ color: 'var(--text-primary)', fontWeight: 600, cursor: 'pointer' }}>• Merging multiple school assignments into one PDF</li>
                                    <li style={{ color: 'var(--text-primary)', fontWeight: 600, cursor: 'pointer' }}>• Setting up a temporary email for testing</li>
                                    <li style={{ color: 'var(--text-primary)', fontWeight: 600, cursor: 'pointer' }}>• Generating QR codes for WiFi networks</li>
                                </ul>
                            </div>
                            <div>
                                <h3 style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: '1rem' }}>Local Processing</h3>
                                <p style={{ color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                                    Our unique architecture uses <b>Web Assembly (WASM)</b> and <b>Web Workers</b> to perform heavy computations in your browser thread. This ensures zero latency and maximum privacy.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
