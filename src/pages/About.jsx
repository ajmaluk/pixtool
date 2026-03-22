import React from 'react';
import SEO from '../components/SEO';
import { motion as Motion } from 'framer-motion';
import { Target, Eye, Rocket, Shield, Zap, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';
import uthakkanLogo from '../assets/uthakkan.png';

export default function About() {
    const aboutSchema = [
        {
            "@context": "https://schema.org",
            "@type": "AboutPage",
            "name": "About Uthakkan & PixTool",
            "description": "Uthakkan is a software development company building fast, uncompromising digital products like PixTool, ToolPix, and Byte AI. Based in Kannur, Kerala.",
            "mainEntity": {
                "@type": "Organization",
                "name": "Uthakkan",
                "url": "https://www.uthakkan.in",
                "logo": `${import.meta.env.VITE_SITE_URL || 'https://www.pixtool.in'}/logo.png`,
                "email": "contact@uthakkan.com",
                "foundingDate": "2025",
                "founder": {
                    "@type": "Person",
                    "name": "Ajmal U K",
                    "jobTitle": "Founder & Lead Engineer",
                    "sameAs": [
                        "https://linkedin.com/in/ajmaluk",
                        "https://github.com/ajmal-uk"
                    ]
                },
                "address": {
                    "@type": "PostalAddress",
                    "addressLocality": "Kannur",
                    "addressRegion": "Kerala",
                    "addressCountry": "India"
                }
            }
        },
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
                    "name": "About",
                    "item": `${import.meta.env.VITE_SITE_URL || 'https://www.pixtool.in'}/about`
                }
            ]
        }
    ];

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.15
            }
        }
    };

    const itemVariants = {
        hidden: { y: 30, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: { duration: 0.6, ease: "easeOut" }
        }
    };

    return (
        <div className="page-container">
            <SEO
                title="About Us - Mission & Privacy | PixTool"
                description="Our mission is to merge creativity with technology. Delivering fast, privacy-first online tools that process your data locally in your browser."
                path="/about"
                schema={aboutSchema}
            />

            <section className="page-hero">
                <Motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8 }}
                    className="page-hero-content container-narrow"
                >
                    <Motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="status-badge"
                    >
                        THE TEAM BEHIND THE TOOLS
                    </Motion.div>
                    <Motion.div
                        initial={{ opacity: 0, rotate: -5 }}
                        animate={{ opacity: 1, rotate: 0 }}
                        transition={{ delay: 0.3, duration: 0.5 }}
                        style={{ marginBottom: '2.5rem' }}
                    >
                        <img src={uthakkanLogo} alt="UTHAKKAN Logo" style={{ height: '100px', width: 'auto' }} />
                    </Motion.div>
                    <h1 className="page-title">
                        Uthakkan
                    </h1>
                    <p className="page-subtitle">
                        We build <span style={{ color: 'var(--text-primary)', fontWeight: 700 }}>fast, uncompromising software</span>. Focused on creating digital products that solve complex problems with elegant architecture.
                    </p>
                    <Motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5 }}
                        style={{ marginTop: '2.5rem' }}
                    >
                        <a href="https://www.uthakkan.in" target="_blank" rel="noopener noreferrer"
                            className="btn btn-secondary">
                            Visit uthakkan.in
                        </a>
                    </Motion.div>
                </Motion.div>
            </section>

            <section className="section-padding">
                <div className="container-wide">
                    <Motion.div
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-100px" }}
                        className="page-grid"
                    >
                        <Motion.div variants={itemVariants} className="info-card">
                            <div className="info-card-icon" style={{ background: 'rgba(59, 130, 246, 0.1)', color: '#3b82f6' }}>
                                <Target size={32} />
                            </div>
                            <h2 style={{ fontSize: '2rem', fontWeight: 850, marginBottom: '1.25rem', letterSpacing: '-0.02em' }}>Our Mission</h2>
                            <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', lineHeight: '1.8' }}>
                                To merge creativity with technology — delivering clean, efficient, and impactful digital products that simplify work, enhance productivity, and inspire innovation.
                            </p>
                        </Motion.div>

                        <Motion.div variants={itemVariants} className="info-card">
                            <div className="info-card-icon" style={{ background: 'rgba(168, 85, 247, 0.1)', color: '#a855f7' }}>
                                <Eye size={32} />
                            </div>
                            <h2 style={{ fontSize: '2rem', fontWeight: 850, marginBottom: '1.25rem', letterSpacing: '-0.02em' }}>Our Vision</h2>
                            <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', lineHeight: '1.8' }}>
                                To innovate across AI, development, and design — shaping technology that inspires creativity and drives meaningful digital growth.
                            </p>
                        </Motion.div>

                        <Motion.div variants={itemVariants} className="info-card">
                            <div className="info-card-icon" style={{ background: 'rgba(16, 185, 129, 0.1)', color: '#10b981' }}>
                                <Rocket size={32} />
                            </div>
                            <h2 style={{ fontSize: '2rem', fontWeight: 850, marginBottom: '1.25rem', letterSpacing: '-0.02em' }}>The Tech</h2>
                            <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', lineHeight: '1.8' }}>
                                Built with <b>React 19, Framer Motion, and WebAssembly</b>. We leverage the full power of your modern browser to deliver sub-second response times for images, PDFs, and secure communications.
                            </p>
                        </Motion.div>
                    </Motion.div>

                    <Motion.div
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        style={{ marginTop: '8rem', padding: '5rem 3rem', background: 'var(--bg-secondary)', borderRadius: '48px', border: '1px solid var(--border-color)' }}
                    >
                        <div className="profile-flex">
                            <div className="profile-image-wrapper">
                                <img src="/ajmaluk.png" alt="Ajmal U K" className="profile-image" style={{ transform: 'rotate(2deg)' }} />
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                                <div className="status-badge" style={{ width: 'fit-content' }}>THE ARCHITECT</div>
                                <h2 style={{ fontSize: '3rem', fontWeight: 950, letterSpacing: '-0.03em' }}>Ajmal U K</h2>
                                <p style={{ fontSize: '1.2rem', color: 'var(--text-secondary)', lineHeight: 1.7 }}>
                                    Ajmal is a full-stack developer and AI enthusiast who builds products at the intersection of complex engineering and clean design. Frustrated by bloated software, he founded <b>Uthakkan</b> to architect tools—like ToolPix and PixTool—that are as powerful under the hood as they are elegant on the surface.
                                </p>
                                <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
                                    <a href="https://linkedin.com/in/ajmaluk" target="_blank" rel="noopener noreferrer" className="btn btn-secondary">LinkedIn</a>
                                    <a href="https://github.com/ajmal-uk" target="_blank" rel="noopener noreferrer" className="btn btn-secondary">GitHub</a>
                                </div>
                            </div>
                        </div>
                    </Motion.div>

                    <Motion.div
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="page-cta"
                        style={{ marginTop: '8rem' }}
                    >
                        <div style={{ position: 'absolute', top: '-100px', left: '-100px', width: '300px', height: '300px', background: 'var(--accent-primary)', filter: 'blur(150px)', opacity: 0.2 }}></div>
                        <h2 className="page-cta-title">Ready to optimize your workflow?</h2>
                        <p className="page-cta-text">
                            Join thousands of professionals using our 100% private, browser-based tools every day. No signups, no fees.
                        </p>
                        <div style={{ display: 'flex', gap: '1.5rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                            <Link to="/image-tools" className="btn btn-primary" style={{ background: '#fff', color: '#000', border: 'none' }}>Image Tools</Link>
                            <Link to="/pdf-tools" className="btn btn-primary" style={{ background: 'rgba(255,255,255,0.1)', color: '#fff', border: '1px solid rgba(255,255,255,0.2)' }}>PDF Tools</Link>
                            <Link to="/utility-tools" className="btn btn-primary" style={{ background: 'rgba(255,255,255,0.1)', color: '#fff', border: '1px solid rgba(255,255,255,0.2)' }}>Utility Tools</Link>
                        </div>
                    </Motion.div>
                </div>
            </section>
        </div>
    );
}
