import React from 'react';
import { motion } from 'framer-motion';
import SEO from '../components/SEO';
import { SITE_URL } from '../config/app.config'
import { Target, Eye, Rocket, Shield, Zap, Heart } from 'lucide-react';
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
    hidden: { opacity: 0, y: 8 },
    visible: { opacity: 1, y: 0 }
};

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
                "logo": {
                    "@type": "ImageObject",
                    "url": `${SITE_URL}/logo.webp`
                },
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
        }
    ];

    return (
        <div className="page-container">
            <SEO
                title="About PixTool — The Mission Behind Your Favorite Private Tools"
                description="Our mission is to merge creativity with technology. Delivering fast, privacy-first online tools that process your data locally in your browser."
                path="/about"
                schema={aboutSchema}
            />

            <section className="page-hero">
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8 }}
                    className="page-hero-content container-narrow"
                >
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="status-badge"
                    >
                        THE TEAM BEHIND THE TOOLS
                    </motion.div>
                    <motion.div
                        initial={{ opacity: 0, rotate: -5 }}
                        animate={{ opacity: 1, rotate: 0 }}
                        transition={{ delay: 0.3, duration: 0.5 }}
                        style={{ marginBottom: '2.5rem' }}
                    >
                        <img 
                            src={uthakkanLogo} 
                            alt="Uthakkan - Professional Software Development Studio" 
                            width="200"
                            height="100"
                            style={{ height: '100px', width: 'auto', objectFit: 'contain' }} 
                            onError={(e) => { e.target.src = 'https://ui-avatars.com/api/?name=Uthakkan&background=3b82f6&color=fff'; }}
                        />
                    </motion.div>
                    <h1 className="page-title">
                        Uthakkan
                    </h1>
                    <p className="page-subtitle">
                        We build <span style={{ color: 'var(--text-primary)', fontWeight: 700 }}>fast, uncompromising software</span>. Focused on creating digital products that solve complex problems with elegant architecture.
                    </p>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5 }}
                        style={{ marginTop: '2.5rem' }}
                    >
                        <a href="https://www.uthakkan.in" target="_blank" rel="noopener noreferrer"
                            className="btn btn-secondary">
                            Visit uthakkan.in
                        </a>
                    </motion.div>
                </motion.div>
            </section>

            <section className="section-padding">
                <div className="container-wide">
                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-100px" }}
                        className="page-grid"
                    >
                        <motion.div variants={itemVariants} className="info-card">
                            <div className="info-card-icon" style={{ background: 'rgba(59, 130, 246, 0.1)', color: '#3b82f6' }}>
                                <Target size={32} />
                            </div>
                            <h2 style={{ fontSize: '2rem', fontWeight: 850, marginBottom: '1.25rem', letterSpacing: '-0.02em' }}>Our Mission</h2>
                            <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', lineHeight: '1.8' }}>
                                To merge creativity with technology — delivering clean, efficient, and AI-empowered digital products that simplify work, enhance productivity, and inspire innovation.
                            </p>
                        </motion.div>

                        <motion.div variants={itemVariants} className="info-card">
                            <div className="info-card-icon" style={{ background: 'rgba(168, 85, 247, 0.1)', color: '#a855f7' }}>
                                <Eye size={32} />
                            </div>
                            <h2 style={{ fontSize: '2rem', fontWeight: 850, marginBottom: '1.25rem', letterSpacing: '-0.02em' }}>Our Vision</h2>
                            <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', lineHeight: '1.8' }}>
                                To innovate across AI, development, and design — shaping technology that inspires creativity and drives meaningful digital growth.
                            </p>
                        </motion.div>

                        <motion.div variants={itemVariants} className="info-card">
                            <div className="info-card-icon" style={{ background: 'rgba(16, 185, 129, 0.1)', color: '#10b981' }}>
                                <Rocket size={32} />
                            </div>
                            <h2 style={{ fontSize: '2rem', fontWeight: 850, marginBottom: '1.25rem', letterSpacing: '-0.02em' }}>The Tech</h2>
                            <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', lineHeight: '1.8' }}>
                                Built with <b>React 19, Framer Motion, and WebAssembly</b>. We leverage the full power of your modern browser to deliver sub-second response times for 121+ tools across Productivity, AI, Image, PDF, and Math suites.
                            </p>
                        </motion.div>
                    </motion.div>

                    <section style={{ marginTop: '8rem' }}>
                        <div style={{ marginBottom: '4rem' }}>
                            <h2 style={{ fontSize: '2.5rem', fontWeight: 900, marginBottom: '1rem', letterSpacing: '-0.02em' }}>Platform <span style={{ color: 'var(--accent-primary)' }}>Architecture</span></h2>
                            <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', maxWidth: '600px' }}>
                                Watch our technical overview to understand how PixTool leverages WebAssembly and browser-native processing to keep your data 100% private.
                            </p>
                        </div>
                        <div style={{ position: 'relative', width: '100%', borderRadius: '40px', overflow: 'hidden', aspectRatio: '16/9', boxShadow: 'var(--shadow-premium)', border: '1px solid var(--border-color)' }}>
                            <LazyYouTubeEmbed
                                videoId="fzIhPN-gv_E"
                                title="PixTool Technical Overview"
                                rounded="40px"
                            />
                        </div>
                    </section>

                    <section className="info-card" style={{ marginTop: '6rem', padding: '2.5rem' }}>
                        <h2 style={{ fontSize: '1.9rem', fontWeight: 900, marginBottom: '1rem' }}>Editorial Standards</h2>
                        <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7, marginBottom: '1rem' }}>
                            PixTool content is written to prioritize practical accuracy, transparency, and user benefit. We avoid thin, auto-generated pages and focus on testable tutorials, clear comparisons, and actionable workflows.
                        </p>
                        <ul style={{ color: 'var(--text-secondary)', lineHeight: 1.7, paddingLeft: '1.2rem' }}>
                            <li>Claims are reviewed against current product behavior and documented updates.</li>
                            <li>Posts include concrete steps, examples, and links to relevant tools/pages.</li>
                            <li>Outdated or ambiguous guidance is revised when tools or standards change.</li>
                            <li>We label promotional context clearly and keep user trust above CTR tactics.</li>
                        </ul>
                    </section>

                    <div
                        style={{ marginTop: '8rem', padding: '5rem 3rem', background: 'var(--bg-secondary)', borderRadius: '48px', border: '1px solid var(--border-color)' }}
                    >
                        <div className="profile-flex">
                            <div className="profile-image-wrapper">
                                <img 
                                    src="/ajmaluk.png" 
                                    alt="Ajmal U K - Founder of PixTool & Lead Engineer at Uthakkan" 
                                    className="profile-image" 
                                    width="200"
                                    height="200"
                                    loading="lazy"
                                    style={{ transform: 'rotate(2deg)', objectFit: 'cover' }} 
                                    onError={(e) => { e.target.src = 'https://ui-avatars.com/api/?name=Ajmal+UK&background=3b82f6&color=fff'; }}
                                />
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                                <div className="status-badge" style={{ width: 'fit-content' }}>THE ARCHITECT</div>
                                <h2 style={{ fontSize: '3rem', fontWeight: 950, letterSpacing: '-0.03em' }}>Ajmal U K</h2>
                                <p style={{ fontSize: '1.2rem', color: 'var(--text-secondary)', lineHeight: 1.7 }}>
                                    Ajmal is a full-stack developer and AI architect who builds products at the intersection of complex engineering and high-end design. Frustrated by bloated software, he founded <b>Uthakkan</b> to architect tools—like PixTool—that are as powerful under the hood as they are elegant on the surface.
                                </p>
                                <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
                                    <a href="https://linkedin.com/in/ajmaluk" target="_blank" rel="noopener noreferrer" className="btn btn-secondary">LinkedIn</a>
                                    <a href="https://github.com/ajmal-uk" target="_blank" rel="noopener noreferrer" className="btn btn-secondary">GitHub</a>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div
                        className="page-cta"
                        style={{ marginTop: '8rem' }}
                    >
                        <div style={{ position: 'absolute', top: '-100px', left: '-100px', width: '300px', height: '300px', background: 'var(--accent-primary)', filter: 'blur(150px)', opacity: 0.2 }}></div>
                        <h2 className="page-cta-title">Ready to optimize your workflow?</h2>
                        <p className="page-cta-text">
                            Join thousands of professionals using our 100% private, browser-based tools every day. No signups, no fees.
                        </p>
                        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                            <Link to="/productivity-tools" className="btn btn-primary" style={{ background: '#fff', color: '#000', border: 'none' }}>Productivity Suite</Link>
                            <Link to="/ai-tools" className="btn btn-primary" style={{ background: 'rgba(255,255,255,0.1)', color: '#fff', border: '1px solid rgba(255,255,255,0.2)' }}>AI Tools</Link>
                            <Link to="/image-tools" className="btn btn-primary" style={{ background: 'rgba(255,255,255,0.1)', color: '#fff', border: '1px solid rgba(255,255,255,0.2)' }}>Image Studio</Link>
                            <Link to="/pdf-tools" className="btn btn-primary" style={{ background: 'rgba(255,255,255,0.1)', color: '#fff', border: '1px solid rgba(255,255,255,0.2)' }}>PDF Expert</Link>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
