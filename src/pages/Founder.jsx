import React from 'react';
import SEO from '../components/SEO';
import { Github, Linkedin, Code, Cpu, Globe, Award, Sparkles, ExternalLink, Instagram, Layers, Flame, BookOpen } from 'lucide-react';
import founderImg from '../assets/ajmaluk.png';
import { SITE_URL } from '../config/app.config';
import { Link } from 'react-router-dom';

export default function Founder() {
    const founderSchema = [
        {
            "@context": "https://schema.org",
            "@type": "Person",
            "name": "Ajmal U K",
            "alternateName": ["Muhammed Ajmal U K", "Ajmal"],
            "url": `${SITE_URL}/founder`,
            "image": `${SITE_URL}/ajmaluk.png`,
            "jobTitle": "Founder, AI Tool Builder & Full-Stack Developer",
            "worksFor": {
                "@type": "Organization",
                "name": "UTHAKKAN",
                "url": "https://uthakkan.in"
            },
            "sameAs": [
                "https://ajmal.uthakkan.in",
                "https://in.linkedin.com/in/ajmaluk",
                "https://github.com/ajmaluk",
                "https://instagram.com/ajmaluk.me",
                "https://uthakkan.in",
                "https://uthakkan.in/about",
                "https://linkedin.com/company/uthakkan",
                "https://instagram.com/uthakkan_"
            ],
            "address": {
                "@type": "PostalAddress",
                "addressLocality": "Kannur",
                "addressRegion": "Kerala",
                "addressCountry": "India"
            },
            "description": "Founder of UTHAKKAN and lead product developer of PixTool. Full-stack developer, AI tool builder, and MCA student creating practical, production-ready software solutions."
        }
    ];

    const skills = [
        'Python & Flask', 'JavaScript & React', 'Firebase & Supabase', 'Flutter & Mobile Apps',
        'AI API Integration', 'WebAssembly (Wasm)', 'SEO Optimization', 'Product Development'
    ];

    const products = [
        { name: 'PixTool', desc: '120+ Browser-native AI & utility tools', link: 'https://pixtool.online' },
        { name: 'KallanCop', desc: 'Local multiplayer game on Google Play Store', link: 'https://play.google.com/store/apps/details?id=com.ajmal.kallancop' },
        { name: 'CodePix', desc: 'Coding education platform', link: 'https://codepix.uthakkan.in' },
        { name: 'Pixus', desc: 'Modern digital web solutions', link: 'https://pixus.uthakkan.in' },
        { name: 'Climbo', desc: 'Interactive productivity application', link: 'https://climbo.uthakkan.in' },
        { name: 'Dalam', desc: 'Creative digital web platform', link: 'https://dalam.uthakkan.in' }
    ];

    return (
        <div className="page-container">
            <SEO
                title="Founder - Ajmal U K | Founder of UTHAKKAN & PixTool"
                description="Meet Ajmal U K, the founder of UTHAKKAN and product developer of PixTool. Full-stack developer, AI tool builder, and MCA student from Kerala, India."
                path="/founder"
                schema={founderSchema}
            />

            <section className="page-hero" style={{ background: 'var(--bg-secondary)', padding: 'clamp(5rem, 12vh, 7rem) 1.5rem 4rem' }}>
                <div className="page-hero-content container-wide">
                    <div className="profile-flex" style={{ justifyContent: 'center', alignItems: 'center' }}>
                        <div className="profile-image-wrapper">
                            <div style={{ width: '220px', height: '220px', borderRadius: '36px', border: '4px solid var(--border-color)', padding: '4px', background: 'var(--bg-card)', boxShadow: 'var(--shadow-premium)', overflow: 'hidden' }}>
                                <img
                                    src={founderImg}
                                    alt="Ajmal U K - Founder of UTHAKKAN & PixTool"
                                    width="220"
                                    height="220"
                                    loading="lazy"
                                    style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '30px' }}
                                    onError={(e) => { e.target.src = 'https://ui-avatars.com/api/?name=Ajmal+UK&background=6366f1&color=fff'; }}
                                />
                            </div>
                        </div>

                        <div style={{ textAlign: 'left' }}>
                            <div className="status-badge" style={{ marginBottom: '1rem' }}>
                                <Sparkles size={14} style={{ marginRight: '6px' }} />
                                FOUNDER & PRODUCT BUILDER
                            </div>
                            <h1 className="page-title" style={{ fontSize: 'clamp(2.5rem, 5vw, 3.8rem)', fontWeight: 900, marginBottom: '0.25rem', letterSpacing: '-0.03em' }}>
                                Ajmal U K
                            </h1>
                            <p style={{ fontSize: '1.4rem', color: 'var(--accent-primary)', fontWeight: 800, marginBottom: '1rem' }}>
                                Founder of <a href="https://uthakkan.in" target="_blank" rel="noopener noreferrer" style={{ color: 'inherit', textDecoration: 'underline' }}>UTHAKKAN</a>
                            </p>

                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-muted)', marginBottom: '1.5rem', fontSize: '1rem', fontWeight: 600 }}>
                                <Globe size={16} />
                                <span>Kerala, India • MCA Student & Full-Stack Engineer</span>
                            </div>

                            <p className="page-subtitle" style={{ margin: '0', maxWidth: '750px', fontSize: '1.05rem', lineHeight: 1.7 }}>
                                Ajmal is a product developer and AI tool builder dedicated to crafting practical, scalable, and user-friendly digital products. From browser utility suites and AI workflows to published mobile games on Google Play, he turns ideas into impactful real-world software.
                            </p>

                            <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', marginTop: '2rem' }}>
                                <a href="https://ajmal.uthakkan.in" target="_blank" rel="noopener noreferrer" className="btn btn-primary" style={{ padding: '0.75rem 1.6rem', borderRadius: '14px', fontSize: '0.88rem' }}>
                                    Portfolio: ajmal.uthakkan.in <ExternalLink size={14} style={{ marginLeft: '6px' }} />
                                </a>
                                <a href="https://in.linkedin.com/in/ajmaluk" target="_blank" rel="noopener noreferrer" className="btn btn-secondary" style={{ padding: '0.75rem 1.4rem', borderRadius: '14px', fontSize: '0.88rem' }}>
                                    <Linkedin size={16} style={{ marginRight: '6px' }} /> LinkedIn
                                </a>
                                <a href="https://github.com/ajmaluk" target="_blank" rel="noopener noreferrer" className="btn btn-secondary" style={{ padding: '0.75rem 1.4rem', borderRadius: '14px', fontSize: '0.88rem' }}>
                                    <Github size={16} style={{ marginRight: '6px' }} /> GitHub
                                </a>
                                <a href="https://instagram.com/ajmaluk.me" target="_blank" rel="noopener noreferrer" className="btn btn-secondary" style={{ padding: '0.75rem 1.4rem', borderRadius: '14px', fontSize: '0.88rem' }}>
                                    <Instagram size={16} style={{ marginRight: '6px' }} /> Instagram
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="section-padding">
                <div className="container-pro">
                    {/* Skills & Core Disciplines */}
                    <div style={{ marginBottom: '6rem' }}>
                        <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
                            <span style={{ fontSize: '0.78rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.12em', color: 'var(--accent-primary)', display: 'block', marginBottom: '0.5rem' }}>
                                Technical Expertise
                            </span>
                            <h2 style={{ fontSize: '2.2rem', fontWeight: 900, letterSpacing: '-0.02em', color: 'var(--text-primary)', margin: 0 }}>
                                Engineering & Product Stack
                            </h2>
                        </div>

                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem', justifyContent: 'center', maxWidth: '900px', margin: '0 auto' }}>
                            {skills.map((skill, i) => (
                                <span
                                    key={i}
                                    style={{
                                        padding: '0.65rem 1.25rem',
                                        borderRadius: '100px',
                                        background: 'var(--bg-card)',
                                        border: '1px solid var(--border-color)',
                                        color: 'var(--text-primary)',
                                        fontWeight: 700,
                                        fontSize: '0.9rem',
                                        boxShadow: 'var(--shadow-sm)'
                                    }}
                                >
                                    {skill}
                                </span>
                            ))}
                        </div>
                    </div>

                    {/* Products Built by Ajmal / UTHAKKAN */}
                    <div style={{ marginBottom: '6rem' }}>
                        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
                            <span style={{ fontSize: '0.78rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.12em', color: 'var(--accent-primary)', display: 'block', marginBottom: '0.5rem' }}>
                                Portfolios & Live Builds
                            </span>
                            <h2 style={{ fontSize: '2.2rem', fontWeight: 900, letterSpacing: '-0.02em', color: 'var(--text-primary)', margin: 0 }}>
                                Products Under UTHAKKAN
                            </h2>
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
                            {products.map((p, i) => (
                                <div key={i} className="info-card" style={{ padding: '1.75rem', background: 'var(--bg-card)', borderRadius: '24px', border: '1px solid var(--border-color)', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                                    <div>
                                        <h3 style={{ fontSize: '1.3rem', fontWeight: 900, color: 'var(--text-primary)', marginBottom: '0.5rem' }}>{p.name}</h3>
                                        <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.6, margin: 0 }}>{p.desc}</p>
                                    </div>
                                    <div style={{ marginTop: '1.5rem', paddingTop: '1rem', borderTop: '1px solid var(--border-color)' }}>
                                        <a href={p.link} target="_blank" rel="noopener noreferrer" className="btn btn-secondary" style={{ width: '100%', justifyContent: 'center', fontSize: '0.85rem' }}>
                                            Visit {p.name} <ExternalLink size={14} style={{ marginLeft: '6px' }} />
                                        </a>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Brand Links Card */}
                    <div style={{ padding: '3rem 2rem', background: 'var(--bg-card)', borderRadius: '32px', border: '1px solid var(--border-color)', textAlign: 'center' }}>
                        <h2 style={{ fontSize: '2rem', fontWeight: 900, marginBottom: '1rem', color: 'var(--text-primary)' }}>
                            Connect with UTHAKKAN
                        </h2>
                        <p style={{ color: 'var(--text-secondary)', maxWidth: '600px', margin: '0 auto 2rem', fontSize: '1rem' }}>
                            Explore company updates, project announcements, and developer collaborations.
                        </p>
                        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                            <a href="https://uthakkan.in" target="_blank" rel="noopener noreferrer" className="btn btn-primary">
                                Official Website: uthakkan.in
                            </a>
                            <a href="https://linkedin.com/company/uthakkan" target="_blank" rel="noopener noreferrer" className="btn btn-secondary">
                                UTHAKKAN LinkedIn
                            </a>
                            <a href="https://instagram.com/uthakkan_" target="_blank" rel="noopener noreferrer" className="btn btn-secondary">
                                UTHAKKAN Instagram
                            </a>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
