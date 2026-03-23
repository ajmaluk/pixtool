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
    return (
        <div className="docs-page">
            <SEO
                title="Documentation - User Guides & API Documentation | PixTool"
                description="Master PixTool with our comprehensive documentation. Detailed guides on image processing, PDF management, and upcoming API features."
                path="/documentation"
            />

            <section className="hero" style={{ padding: 'clamp(5rem, 15vh, 8rem) 1.5rem 5rem', background: 'var(--bg-secondary)', marginBottom: '4rem' }}>
                <div style={{ maxWidth: '100%', margin: '0 auto', textAlign: 'center' }}>
                    <div style={{ display: 'inline-flex', padding: '12px', background: 'rgba(59, 130, 246, 0.1)', color: 'var(--accent-primary)', borderRadius: '50%', marginBottom: '1.5rem' }}>
                        <Book size={32} />
                    </div>
                    <h1 className="hero-title" style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontWeight: 900, marginBottom: '1.5rem', letterSpacing: '-0.02em' }}>Full Documentation</h1>

                    <div className="search-container" style={{ maxWidth: '600px', margin: '2rem auto 0', position: 'relative' }}>
                        <Search size={20} style={{ position: 'absolute', left: '1.5rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                        <input
                            type="text"
                            className="search-input"
                            placeholder="Search documentation..."
                            style={{ width: '100%', padding: '1.25rem 1.5rem 1.25rem 3.5rem', borderRadius: '100px', background: 'var(--bg-card)', border: '1px solid var(--border-color)', color: 'var(--text-primary)', fontSize: '1rem', outline: 'none' }}
                        />
                    </div>
                </div>
            </section>

            <section style={{ padding: '0 1.5rem 10rem', width: '100%', overflowX: 'hidden' }}>
                <div style={{ width: '100%' }}>
                    <div className="page-grid">
                        {docSections.map((section, i) => (
                            <div key={i} className="info-card" style={{ padding: '2.5rem' }}>
                                <div style={{ width: '52px', height: '52px', borderRadius: '14px', background: 'rgba(59, 130, 246, 0.1)', color: 'var(--accent-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.5rem' }}>
                                    <section.icon size={24} />
                                </div>
                                <h2 style={{ fontSize: '1.35rem', fontWeight: 900, marginBottom: '1rem', color: 'var(--text-primary)' }}>{section.title}</h2>
                                <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7, fontSize: '0.95rem' }}>
                                    {section.content}
                                </p>
                                <div style={{ marginTop: '2rem', display: 'flex', alignItems: 'center', gap: '10px', color: 'var(--accent-primary)', fontSize: '0.95rem', fontWeight: 800, cursor: 'pointer' }}>
                                    Learn More <Terminal size={14} />
                                </div>
                            </div>
                        ))}
                    </div>

                    <div style={{ marginTop: '8rem', padding: '5rem 4rem', background: 'var(--bg-secondary)', borderRadius: '48px', border: '1px solid var(--border-color)' }}>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '5rem', textAlign: 'left' }}>
                            <div>
                                <h3 style={{ fontSize: '1.75rem', fontWeight: 950, marginBottom: '2rem', letterSpacing: '-0.03em' }}>Common Tasks</h3>
                                <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                                    {[
                                        'How to resize images for Instagram',
                                        'Merging school assignments into one PDF',
                                        'Setting up a private temp email',
                                        'Generating secure WiFi QR codes'
                                    ].map((task, idx) => (
                                        <li key={idx} style={{ color: 'var(--text-primary)', fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '12px', transition: 'transform 0.2s' }} className="hover-slide">
                                            <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--accent-primary)' }} />
                                            {task}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div>
                                <h3 style={{ fontSize: '1.75rem', fontWeight: 950, marginBottom: '2rem', letterSpacing: '-0.03em' }}>Local Processing</h3>
                                <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8, fontSize: '1.1rem' }}>
                                    Our unique architecture uses <b>Web Assembly (WASM)</b> and <b>Web Workers</b> to perform heavy computations in your browser thread. This ensures <b>zero latency</b> and <b>maximum privacy</b>—your data never leaves your machine.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
