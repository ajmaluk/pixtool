import React from 'react';
import { motion } from 'framer-motion';
import SEO from '../components/SEO';
import { SITE_URL } from '../config/app.config';
import { Target, Eye, Rocket, Shield, Zap, Globe, Sparkles, ExternalLink, Code2, Smartphone, Gamepad2, Brain, CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import uthakkanLogo from '../assets/uthakkan.webp';
import LazyYouTubeEmbed from '../components/LazyYouTubeEmbed';

const containerVariants = {
    hidden: {},
    visible: {
        transition: {
            staggerChildren: 0.08
        }
    }
};

const itemVariants = {
    hidden: { opacity: 0, y: 12 },
    visible: { opacity: 1, y: 0 }
};

export default function About() {
    const aboutSchema = [
        {
            "@context": "https://schema.org",
            "@type": "AboutPage",
            "name": "About UTHAKKAN & PixTool",
            "description": "UTHAKKAN is a technology product brand founded by Ajmal U K, focused on building AI tools, web platforms, mobile apps, games, and developer solutions.",
            "url": `${SITE_URL}/about`,
            "mainEntity": {
                "@type": "Organization",
                "name": "UTHAKKAN",
                "alternateName": "UTH AKKAN",
                "url": "https://uthakkan.in",
                "logo": {
                    "@type": "ImageObject",
                    "url": `${SITE_URL}/uthakkan.webp`
                },
                "email": "contact@uthakkan.in",
                "foundingLocation": {
                    "@type": "Place",
                    "name": "Kerala, India"
                },
                "sameAs": [
                    "https://uthakkan.in",
                    "https://uthakkan.in/about",
                    "https://linkedin.com/company/uthakkan",
                    "https://instagram.com/uthakkan_",
                    "https://github.com/ajmaluk",
                    "https://in.linkedin.com/in/ajmaluk"
                ],
                "founder": {
                    "@type": "Person",
                    "name": "Ajmal U K",
                    "alternateName": "Muhammed Ajmal U K",
                    "jobTitle": "Founder & Product Developer",
                    "url": "https://ajmal.uthakkan.in",
                    "sameAs": [
                        "https://in.linkedin.com/in/ajmaluk",
                        "https://github.com/ajmaluk",
                        "https://instagram.com/ajmaluk.me",
                        "https://ajmal.uthakkan.in"
                    ],
                    "address": {
                        "@type": "PostalAddress",
                        "addressLocality": "Kannur",
                        "addressRegion": "Kerala",
                        "addressCountry": "India"
                    }
                }
            }
        }
    ];

    const coreAreas = [
        { title: 'AI Tools & Automation', desc: 'Browser-native intelligence and specialized generative models.', icon: Brain, color: '#818cf8' },
        { title: 'Full-Stack Web Apps', desc: 'Scalable cloud architectures, WebAssembly algorithms, and ultra-fast SPAs.', icon: Code2, color: '#38bdf8' },
        { title: 'Mobile App Development', desc: 'Cross-platform mobile applications published globally on app stores.', icon: Smartphone, color: '#34d399' },
        { title: 'Game Development', desc: 'Social deduction party games and browser-based physics game experiences.', icon: Gamepad2, color: '#fbbf24' }
    ];

    const uthakkanProducts = [
        {
            name: 'PixTool',
            type: 'AI / Productivity Suite',
            desc: 'A comprehensive web platform with 120+ tools for image editing, PDF manipulation, converters, math, and AI creation with 100% local browser privacy.',
            url: 'https://pixtool.online',
            badge: 'Flagship Platform',
            isInternal: true
        },
        {
            name: 'KallanCop',
            type: 'Mobile Game (Play Store)',
            desc: 'A wildly popular local multiplayer social deduction game published on Google Play Store with thousands of active players.',
            url: 'https://play.google.com/store/apps/details?id=com.ajmal.kallancop',
            badge: 'Google Play Store'
        },
        {
            name: 'CodePix',
            type: 'Coding Education Platform',
            desc: 'An interactive developer learning platform designed to accelerate computer science concepts and coding workflows.',
            url: 'https://codepix.uthakkan.in',
            badge: 'Developer Hub'
        },
        {
            name: 'Pixus',
            type: 'Digital Experience Platform',
            desc: 'A modern, dynamic digital product platform delivering smart web solutions under the UTHAKKAN ecosystem.',
            url: 'https://pixus.uthakkan.in',
            badge: 'Web App'
        },
        {
            name: 'Climbo',
            type: 'Interactive Platform',
            desc: 'An engaging web application engineered for modern digital workflows and productivity.',
            url: 'https://climbo.uthakkan.in',
            badge: 'Productivity'
        },
        {
            name: 'Dalam',
            type: 'Creative Web Platform',
            desc: 'An expressive, responsive web application combining rich design aesthetics with seamless performance.',
            url: 'https://dalam.uthakkan.in',
            badge: 'Creative Web'
        },
        {
            name: 'JoyFul / Joyful Builder',
            type: 'AI Website Builder',
            desc: 'An AI-assisted website and app generation engine designed to transform prompts into production-ready web pages.',
            badge: 'AI Innovation'
        },
        {
            name: 'Climbo',
            type: 'Browser Climbing Game',
            desc: 'An immersive physics-based web climbing game project featuring realistic momentum mechanics and responsive controls.',
            badge: 'Web Gaming'
        }
    ];

    return (
        <div className="page-container">
            <SEO
                title="About UTHAKKAN & PixTool — Technology Brand by Ajmal U K"
                description="UTHAKKAN is a technology product brand founded by Ajmal U K, focused on building AI tools, web platforms, mobile apps, games, and developer solutions."
                path="/about"
                schema={aboutSchema}
            />

            {/* Hero Header */}
            <section className="page-hero" style={{ background: 'var(--bg-secondary)', padding: 'clamp(5rem, 12vh, 7rem) 1.5rem 4rem' }}>
                <motion.div
                    initial={{ opacity: 0, scale: 0.96 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6 }}
                    className="page-hero-content container-narrow"
                    style={{ textAlign: 'center' }}
                >
                    <div className="status-badge" style={{ margin: '0 auto 1.5rem', width: 'fit-content' }}>
                        <Sparkles size={14} style={{ marginRight: '6px' }} />
                        BRAND & INNOVATION ECOSYSTEM
                    </div>

                    <div style={{ marginBottom: '2rem' }}>
                        <img
                            src={uthakkanLogo}
                            alt="UTHAKKAN - Technology Brand by Ajmal U K"
                            width="200"
                            height="90"
                            style={{ height: '90px', width: 'auto', objectFit: 'contain', margin: '0 auto' }}
                            onError={(e) => { e.target.src = 'https://ui-avatars.com/api/?name=UTHAKKAN&background=6366f1&color=fff'; }}
                        />
                    </div>

                    <h1 className="page-title" style={{ fontSize: 'clamp(2.5rem, 5vw, 3.8rem)', fontWeight: 900, letterSpacing: '-0.03em', marginBottom: '1rem' }}>
                        UTHAKKAN
                    </h1>

                    <p className="page-subtitle" style={{ fontSize: '1.25rem', color: 'var(--text-secondary)', maxWidth: '780px', margin: '0 auto 2.5rem', lineHeight: 1.6 }}>
                        A technology-driven product brand founded by <strong>Ajmal U K</strong>, focused on creating practical, modern, and user-friendly digital products across AI tools, web platforms, mobile apps, and games.
                    </p>

                    <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                        <a href="https://uthakkan.in" target="_blank" rel="noopener noreferrer" className="btn btn-primary" style={{ padding: '0.85rem 2rem', borderRadius: '14px' }}>
                            Visit uthakkan.in <ExternalLink size={16} style={{ marginLeft: '6px' }} />
                        </a>
                        <a href="https://uthakkan.in/about" target="_blank" rel="noopener noreferrer" className="btn btn-secondary" style={{ padding: '0.85rem 2rem', borderRadius: '14px' }}>
                            About UTHAKKAN
                        </a>
                    </div>
                </motion.div>
            </section>

            <section className="section-padding">
                <div className="container-pro">
                    {/* Mission & Vision Bento */}
                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-50px" }}
                        className="page-grid"
                        style={{ marginBottom: '6rem' }}
                    >
                        <motion.div variants={itemVariants} className="info-card">
                            <div className="info-card-icon" style={{ background: 'rgba(99, 102, 241, 0.12)', color: 'var(--accent-primary)' }}>
                                <Target size={28} />
                            </div>
                            <h2 style={{ fontSize: '1.6rem', fontWeight: 850, marginBottom: '1rem', letterSpacing: '-0.02em', color: 'var(--text-primary)' }}>Our Mission</h2>
                            <p style={{ color: 'var(--text-secondary)', fontSize: '1rem', lineHeight: '1.7', margin: 0 }}>
                                To build <strong>smart, useful, and accessible digital products</strong> using modern technologies, AI, and scalable software architecture that solve real-world problems with clean design.
                            </p>
                        </motion.div>

                        <motion.div variants={itemVariants} className="info-card">
                            <div className="info-card-icon" style={{ background: 'rgba(16, 185, 129, 0.12)', color: 'var(--accent-emerald)' }}>
                                <Eye size={28} />
                            </div>
                            <h2 style={{ fontSize: '1.6rem', fontWeight: 850, marginBottom: '1rem', letterSpacing: '-0.02em', color: 'var(--text-primary)' }}>Our Vision</h2>
                            <p style={{ color: 'var(--text-secondary)', fontSize: '1rem', lineHeight: '1.7', margin: 0 }}>
                                To become a strong independent technology brand that creates reliable AI tools, web platforms, mobile apps, and digital experiences for millions of global users.
                            </p>
                        </motion.div>

                        <motion.div variants={itemVariants} className="info-card">
                            <div className="info-card-icon" style={{ background: 'rgba(56, 189, 248, 0.12)', color: 'var(--accent-blue)' }}>
                                <Rocket size={28} />
                            </div>
                            <h2 style={{ fontSize: '1.6rem', fontWeight: 850, marginBottom: '1rem', letterSpacing: '-0.02em', color: 'var(--text-primary)' }}>Local Privacy</h2>
                            <p style={{ color: 'var(--text-secondary)', fontSize: '1rem', lineHeight: '1.7', margin: 0 }}>
                                Leveraging <b>React 19, Framer Motion, and WebAssembly</b>. PixTool operates 100% locally in your browser memory, guaranteeing zero cloud uploads and instant execution.
                            </p>
                        </motion.div>
                    </motion.div>

                    {/* Core Areas */}
                    <div style={{ marginBottom: '6rem' }}>
                        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
                            <span style={{ fontSize: '0.78rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.12em', color: 'var(--accent-primary)', display: 'block', marginBottom: '0.5rem' }}>
                                Areas of Expertise
                            </span>
                            <h2 style={{ fontSize: '2.4rem', fontWeight: 900, letterSpacing: '-0.02em', color: 'var(--text-primary)', margin: 0 }}>
                                What We Build at <span style={{ color: 'var(--accent-primary)' }}>UTHAKKAN</span>
                            </h2>
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.5rem' }}>
                            {coreAreas.map((area, i) => (
                                <div key={i} className="info-card" style={{ padding: '1.75rem', background: 'var(--bg-card)', borderRadius: '24px', border: '1px solid var(--border-color)' }}>
                                    <div style={{ width: '48px', height: '48px', borderRadius: '14px', background: `${area.color}15`, color: area.color, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.25rem' }}>
                                        <area.icon size={24} />
                                    </div>
                                    <h3 style={{ fontSize: '1.15rem', fontWeight: 800, marginBottom: '0.5rem', color: 'var(--text-primary)' }}>{area.title}</h3>
                                    <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', lineHeight: 1.6, margin: 0 }}>{area.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Products / Projects Ecosystem */}
                    <div style={{ marginBottom: '7rem' }}>
                        <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
                            <span style={{ fontSize: '0.78rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.12em', color: 'var(--accent-primary)', display: 'block', marginBottom: '0.5rem' }}>
                                Production Portfolio
                            </span>
                            <h2 style={{ fontSize: '2.4rem', fontWeight: 900, letterSpacing: '-0.02em', color: 'var(--text-primary)', margin: '0 0 1rem' }}>
                                Products in the <span style={{ color: 'var(--accent-primary)' }}>UTHAKKAN Ecosystem</span>
                            </h2>
                            <p style={{ color: 'var(--text-secondary)', fontSize: '1.05rem', maxWidth: '650px', margin: '0 auto' }}>
                                From browser utility suites and AI assistants to published mobile games and learning platforms.
                            </p>
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
                            {uthakkanProducts.map((prod, i) => (
                                <div
                                    key={i}
                                    className="info-card"
                                    style={{
                                        padding: '2rem',
                                        background: 'var(--bg-card)',
                                        borderRadius: '24px',
                                        border: '1px solid var(--border-color)',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        justifyContent: 'space-between'
                                    }}
                                >
                                    <div>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
                                            <span style={{ fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--accent-primary)' }}>
                                                {prod.type}
                                            </span>
                                            <span style={{ fontSize: '0.7rem', fontWeight: 700, padding: '0.2rem 0.6rem', borderRadius: '100px', background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', color: 'var(--text-muted)' }}>
                                                {prod.badge}
                                            </span>
                                        </div>
                                        <h3 style={{ fontSize: '1.35rem', fontWeight: 900, marginBottom: '0.75rem', color: 'var(--text-primary)' }}>
                                            {prod.name}
                                        </h3>
                                        <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', lineHeight: 1.6, margin: 0 }}>
                                            {prod.desc}
                                        </p>
                                    </div>

                                    {prod.url && (
                                        <div style={{ marginTop: '1.75rem', paddingTop: '1.25rem', borderTop: '1px solid var(--border-color)' }}>
                                            {prod.isInternal ? (
                                                <Link to="/" className="btn btn-secondary" style={{ width: '100%', justifyContent: 'center', fontSize: '0.85rem' }}>
                                                    Open PixTool
                                                </Link>
                                            ) : (
                                                <a href={prod.url} target="_blank" rel="noopener noreferrer" className="btn btn-secondary" style={{ width: '100%', justifyContent: 'center', fontSize: '0.85rem' }}>
                                                    Visit {prod.name} <ExternalLink size={14} style={{ marginLeft: '6px' }} />
                                                </a>
                                            )}
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Founder Profile Box */}
                    <div
                        style={{
                            padding: 'clamp(2.5rem, 5vw, 4rem)',
                            background: 'var(--bg-card)',
                            borderRadius: '32px',
                            border: '1px solid var(--border-color)',
                            boxShadow: 'var(--shadow-sm)',
                            marginBottom: '6rem'
                        }}
                    >
                        <div className="profile-flex" style={{ alignItems: 'center' }}>
                            <div className="profile-image-wrapper">
                                <img
                                    src="/ajmaluk.png"
                                    alt="Ajmal U K - Founder of UTHAKKAN and PixTool"
                                    className="profile-image"
                                    width="200"
                                    height="200"
                                    loading="lazy"
                                    style={{ borderRadius: '28px', border: '4px solid var(--bg-secondary)', objectFit: 'cover' }}
                                    onError={(e) => { e.target.src = 'https://ui-avatars.com/api/?name=Ajmal+UK&background=6366f1&color=fff'; }}
                                />
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', textAlign: 'left' }}>
                                <div className="status-badge" style={{ width: 'fit-content' }}>FOUNDER & LEAD DEVELOPER</div>
                                <h2 style={{ fontSize: 'clamp(2.2rem, 4vw, 3rem)', fontWeight: 950, letterSpacing: '-0.03em', color: 'var(--text-primary)', margin: 0 }}>
                                    Ajmal U K
                                </h2>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--text-muted)', fontSize: '0.95rem' }}>
                                    <Globe size={16} /> <span>Kerala, India • MCA Student, AI/Full-Stack Developer</span>
                                </div>
                                <p style={{ fontSize: '1.05rem', color: 'var(--text-secondary)', lineHeight: 1.7, margin: 0 }}>
                                    Ajmal is the founder of <strong>UTHAKKAN</strong>. He specializes in <strong>Python, Flask, JavaScript, React, Firebase, Supabase, Flutter, and AI integration</strong>. Driven by a vision to turn ideas into production-ready software products, he architects tools that are simple, useful, and built for real-world users.
                                </p>
                                
                                <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', marginTop: '0.5rem' }}>
                                    <a href="https://ajmal.uthakkan.in" target="_blank" rel="noopener noreferrer" className="btn btn-primary" style={{ fontSize: '0.85rem', padding: '0.65rem 1.4rem', borderRadius: '12px' }}>
                                        Portfolio: ajmal.uthakkan.in
                                    </a>
                                    <a href="https://in.linkedin.com/in/ajmaluk" target="_blank" rel="noopener noreferrer" className="btn btn-secondary" style={{ fontSize: '0.85rem', padding: '0.65rem 1.4rem', borderRadius: '12px' }}>
                                        LinkedIn
                                    </a>
                                    <a href="https://github.com/ajmaluk" target="_blank" rel="noopener noreferrer" className="btn btn-secondary" style={{ fontSize: '0.85rem', padding: '0.65rem 1.4rem', borderRadius: '12px' }}>
                                        GitHub
                                    </a>
                                    <a href="https://instagram.com/ajmaluk.me" target="_blank" rel="noopener noreferrer" className="btn btn-secondary" style={{ fontSize: '0.85rem', padding: '0.65rem 1.4rem', borderRadius: '12px' }}>
                                        Instagram
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* CTA Section */}
                    <div className="page-cta">
                        <h2 className="page-cta-title">Explore the PixTool Suite</h2>
                        <p className="page-cta-text">
                            Experience 120+ client-side productivity, AI, and developer tools built by UTHAKKAN.
                        </p>
                        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                            <Link to="/ai-tools" className="btn btn-primary" style={{ background: '#fff', color: '#000', border: 'none' }}>AI Studio</Link>
                            <Link to="/pdf-tools" className="btn btn-primary" style={{ background: 'rgba(255,255,255,0.1)', color: '#fff', border: '1px solid rgba(255,255,255,0.2)' }}>PDF Tools</Link>
                            <Link to="/image-tools" className="btn btn-primary" style={{ background: 'rgba(255,255,255,0.1)', color: '#fff', border: '1px solid rgba(255,255,255,0.2)' }}>Image Lab</Link>
                            <Link to="/utility-tools" className="btn btn-primary" style={{ background: 'rgba(255,255,255,0.1)', color: '#fff', border: '1px solid rgba(255,255,255,0.2)' }}>Utilities</Link>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
