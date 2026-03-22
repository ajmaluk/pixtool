import React from 'react';
import SEO from '../components/SEO';
import { Github, Linkedin, Code, Cpu, Globe, Award, Sparkles } from 'lucide-react';
import founderImg from '../assets/ajmaluk.png';

export default function Founder() {
    const founderSchema = [
        {
            "@context": "https://schema.org",
            "@type": "Person",
            "name": "Muhammed Ajmal U K",
            "alternateName": "Ajmal U K",
            "url": "https://pixtool.toolpix.in/founder",
            "image": "https://pixtool.toolpix.in/ajmaluk.png",
            "jobTitle": "Founder & Senior Full Stack Developer",
            "address": {
                "@type": "PostalAddress",
                "addressLocality": "Kannur",
                "addressRegion": "Kerala",
                "addressCountry": "India"
            },
            "worksFor": {
                "@type": "Organization",
                "name": "UTHAKKAN",
                "url": "https://uthakkan.in/"
            },
            "sameAs": [
                "https://github.com/ajmal-uk",
                "https://linkedin.com/in/ajmaluk",
                "https://x.com/ajmal_uk_"
            ],
            "description": "Founder of UTHAKKAN and the lead developer behind PixTool. Expert in SaaS architecture, AI-driven productivity solutions, and full-stack engineering based in Kannur, Kerala."
        },
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
                    "name": "Founder",
                    "item": "https://pixtool.toolpix.in/founder"
                }
            ]
        }
    ];

    return (
        <div className="page-container">
            <SEO
                title="Founder - Muhammed Ajmal U K | Visionary Behind PixTool & UTHAKKAN"
                description="Meet Muhammed Ajmal U K, the founder of UTHAKKAN and lead developer of PixTool. Expert in SaaS, AI Tools, and Freelance Web Development based in Kannur, Kerala."
                path="/founder"
                schema={founderSchema}
            />

            <section className="page-hero" style={{ background: 'var(--bg-secondary)' }}>
                <div className="page-hero-content container-wide">
                    <div className="profile-flex" style={{ justifyContent: 'center' }}>
                        <div className="profile-image-wrapper">
                            <div style={{ width: '240px', height: '240px', borderRadius: '48px', border: '8px solid var(--bg-primary)', padding: '2px', background: 'var(--accent-primary)', transform: 'rotate(-2deg)', boxShadow: 'var(--shadow-premium)', overflow: 'hidden' }}>
                                <img
                                    src={founderImg}
                                    alt="Muhammed Ajmal U K"
                                    loading="lazy"
                                    style={{ width: '100%', height: '100%', objectFit: 'cover', transform: 'scale(1.05)' }}
                                />
                            </div>
                        </div>

                        <div style={{ textAlign: 'left' }}>
                            <div className="status-badge" style={{ marginBottom: '1.5rem' }}>
                                <Sparkles size={14} style={{ marginRight: '8px' }} />
                                Founder & Architect
                            </div>
                            <h1 className="page-title" style={{ marginBottom: '0.5rem' }}>Muhammed Ajmal U K</h1>
                            <p style={{ fontSize: '1.75rem', color: 'var(--accent-primary)', fontWeight: 800, marginBottom: '1.5rem' }}>Visionary Behind UTHAKKAN</p>

                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-muted)', marginBottom: '2.5rem', fontSize: '1.1rem', fontWeight: 600 }}>
                                <Globe size={18} />
                                <span>Kannur, Kerala, India</span>
                            </div>

                            <p className="page-subtitle" style={{ margin: '0', maxWidth: '800px' }}>
                                Muhammed Ajmal U K is a visionary software engineer and the driving force behind <a href="https://uthakkan.in/" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--accent-primary)', textDecoration: 'none', fontWeight: 700 }}>UTHAKKAN</a>.
                                Expert in <strong>SaaS development, AI Tools, and high-performance Web Systems</strong>.
                            </p>

                            <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap', marginTop: '3rem' }}>
                                <a href="https://linkedin.com/in/ajmaluk" target="_blank" rel="noopener noreferrer" className="btn btn-primary" style={{ padding: '1rem 2.5rem', borderRadius: '16px' }}>
                                    <Linkedin size={20} style={{ marginRight: '10px' }} /> LinkedIn
                                </a>
                                <a href="https://github.com/ajmal-uk" target="_blank" rel="noopener noreferrer" className="btn btn-secondary" style={{ padding: '1rem 2.5rem', borderRadius: '16px' }}>
                                    <Github size={20} style={{ marginRight: '10px' }} /> GitHub
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="section-padding">
                <div className="container-wide">
                    <div className="page-grid">
                        {/* Expertise */}
                        <div className="info-card">
                            <div className="info-card-icon" style={{ background: 'var(--accent-glow)', color: 'var(--accent-primary)' }}>
                                <Code size={32} />
                            </div>
                            <h2 style={{ fontSize: '1.75rem', fontWeight: 900, marginBottom: '1.5rem', color: 'var(--text-primary)' }}>Core Strategy</h2>
                            <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8, marginBottom: '2rem' }}>
                                Architecting scalable SaaS platforms and AI-driven automation systems with a focus on speed and data security.
                            </p>
                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.8rem' }}>
                                {['SaaS Architecture', 'AI Tool Development', 'Next.js & React Expert', 'Cloud Scalability', 'UI/UX Visual Strategy'].map(skill => (
                                    <span key={skill} style={{ padding: '8px 16px', background: 'var(--bg-secondary)', borderRadius: '12px', fontSize: '0.9rem', fontWeight: 700, border: '1px solid var(--border-color)' }}>
                                        {skill}
                                    </span>
                                ))}
                            </div>
                        </div>

                        {/* Freelancing */}
                        <div className="info-card">
                            <div className="info-card-icon" style={{ background: 'rgba(59, 130, 246, 0.1)', color: '#3b82f6' }}>
                                <Sparkles size={32} />
                            </div>
                            <h2 style={{ fontSize: '1.75rem', fontWeight: 900, marginBottom: '1.5rem', color: 'var(--text-primary)' }}>Freelance Services</h2>
                            <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8, marginBottom: '2rem' }}>
                                Providing premium freelancing for global clients across multiple creative and technical domains.
                            </p>
                            <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                                {[
                                    'Full-Cycle Web Development',
                                    'iOS & Android App Solutions',
                                    'High-Impact Video Creation',
                                    'Logo & Brand Identity Design'
                                ].map(service => (
                                    <li key={service} style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '1rem', color: 'var(--text-secondary)', fontWeight: 600 }}>
                                        <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--accent-primary)' }} />
                                        {service}
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Vision */}
                        <div className="info-card">
                            <div className="info-card-icon" style={{ background: 'rgba(168, 85, 247, 0.1)', color: '#a855f7' }}>
                                <Cpu size={32} />
                            </div>
                            <h2 style={{ fontSize: '1.75rem', fontWeight: 900, marginBottom: '1.5rem', color: 'var(--text-primary)' }}>The Vision</h2>
                            <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8, fontSize: '1.1rem' }}>
                                "I founded UTHAKKAN to bridge the gap between complex technology and everyday simplicity. Absolute quality, local privacy, and global impact."
                            </p>
                            <div style={{ marginTop: '2rem', fontStyle: 'italic', color: 'var(--text-muted)', fontWeight: 600 }}>
                                — Muhammed Ajmal U K
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
