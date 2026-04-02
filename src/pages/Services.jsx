import React from 'react';
import SEO from '../components/SEO';
import { SITE_URL } from '../config/app.config'
import { Code2, Video, Zap, BarChart3, Youtube, Box, CheckCircle2 } from 'lucide-react';

const services = [
    {
        title: "Website Development",
        description: "High-performance, SEO-optimized websites built with Next.js, React, and modern tech stacks. Specialized in speed and accessibility.",
        icon: Code2,
        color: "#3b82f6",
        features: ["Clean Architecture", "Lightning Speed", "PWA Ready", "SEO Optimized"]
    },
    {
        title: "Mobile App Development",
        description: "Cross-platform iOS and Android applications developed for smooth user experience and native performance.",
        icon: Box,
        color: "#10b981",
        features: ["React Native", "Native UX/UI", "Offline Capabilities", "Fast Deployment"]
    },
    {
        title: "AI Tools & SaaS Solutions",
        description: "Developing intelligent software-as-a-service products and custom AI agents to automate business workflows.",
        icon: Zap,
        color: "#f59e0b",
        features: ["LLM Integration", "Task Automation", "Subscription Systems", "Scalable Dev"]
    },
    {
        title: "Video Creation & Editing",
        description: "Professional video production and editing for tech products, corporate presentations, and social media content.",
        icon: Video,
        color: "#ec4899",
        features: ["Motion Graphics", "Color Grading", "Visual Storytelling", "High Resolution"]
    },
    {
        title: "Logo & Brand Design",
        description: "Crafting unique, memorable brand identities and professional logos that represent your company's core values.",
        icon: BarChart3,
        color: "#8b5cf6",
        features: ["Minimalist Style", "Vector Graphics", "Brand Guidelines", "Visual Identity"]
    },
    {
        title: "YouTube Thumbnail Design",
        description: "High-conversion thumbnail designs powered by psychology to boost your CTR and grow your digital audience.",
        icon: Youtube,
        color: "#ef4444",
        features: ["High CTR Focus", "Visual Hierarchy", "Graphic Accents", "Platform Optimized"]
    }
];

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1
        }
    }
};

const cardVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
        y: 0,
        opacity: 1,
        transition: {
            duration: 0.5,
            ease: "easeOut"
        }
    }
};

export default function Services() {
    const servicesSchema = [
        {
            "@context": "https://schema.org",
            "@type": "Service",
            "name": "Professional Digital Services",
            "provider": {
                "@id": `${SITE_URL}/#organization`
            },
            "areaServed": "Global",
            "hasOfferCatalog": {
                "@type": "OfferCatalog",
                "name": "PixTool & UTHAKKAN Services",
                "itemListElement": services.map(s => ({
                    "@type": "Offer",
                    "itemOffered": {
                        "@type": "Service",
                        "name": s.title
                    }
                }))
            }
        }
    ];

    return (
        <div className="services-page" style={{ position: 'relative', overflow: 'hidden' }}>
            <SEO
                title="Professional Digital Services - Development & AI | PixTool"
                description="Explore our range of digital services including Software Development, Video Editing, and custom AI Solutions. Built for modern creators and businesses."
                path="/services"
                schema={servicesSchema}
            />

            {/* Animated Mesh Background */}
            <div style={{
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                zIndex: -1,
                opacity: 0.4,
                filter: 'blur(100px)',
                pointerEvents: 'none'
            }}>
                <Motion.div
                    animate={{ x: [0, 50, 0], y: [0, 30, 0] }}
                    transition={{ duration: 15, repeat: Infinity }}
                    style={{ position: 'absolute', top: '10%', left: '10%', width: '40vw', height: '40vw', background: 'var(--accent-primary)', borderRadius: '50%', opacity: 0.2 }}
                />
                <Motion.div
                    animate={{ x: [0, -40, 0], y: [0, 50, 0] }}
                    transition={{ duration: 12, repeat: Infinity, delay: 1 }}
                    style={{ position: 'absolute', bottom: '10%', right: '10%', width: '35vw', height: '35vw', background: 'var(--accent-pink)', borderRadius: '50%', opacity: 0.15 }}
                />
            </div>

            <section className="hero" style={{ padding: 'clamp(5rem, 15vh, 8rem) 1.5rem 5rem', position: 'relative' }}>
                <Motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7 }}
                    className="hero-content"
                    style={{ maxWidth: '100%', margin: '0 auto', textAlign: 'center' }}
                >
                    <div className="status-badge" style={{ margin: '0 auto 1.5rem', width: 'fit-content', background: 'var(--accent-glow)', color: 'var(--accent-primary)', border: '1px solid var(--border-color)', fontWeight: 700 }}>
                        OUR EXPERTISE
                    </div>
                    <h1 className="hero-title" style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontWeight: 950, marginBottom: '1.5rem', letterSpacing: '-0.04em', lineHeight: 1.1 }}>
                        Premium Digital <span style={{ color: 'var(--accent-primary)' }}>Solutions</span>
                    </h1>
                    <p className="hero-subtitle" style={{ fontSize: '1.25rem', color: 'var(--text-secondary)', maxWidth: '700px', margin: '0 auto', lineHeight: 1.6 }}>
                        We blend high-end design with cutting-edge technology to create digital experiences that stand out and perform.
                    </p>
                </Motion.div>
            </section>

            <section style={{ padding: '0 1.5rem 10rem', position: 'relative', width: '100%', overflowX: 'hidden' }}>
                <Motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    style={{ width: '100%' }}
                >
                    <div className="services-grid">
                        {services.map((service, index) => (
                            <Motion.div
                                key={index}
                                variants={cardVariants}
                                whileHover={{ y: -10, transition: { duration: 0.2 } }}
                                className="info-card"
                                style={{
                                    padding: '2rem',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    height: '100%',
                                    borderRadius: '24px'
                                }}
                            >
                                <div style={{
                                    width: '52px',
                                    height: '52px',
                                    borderRadius: '14px',
                                    background: `${service.color}15`,
                                    color: service.color,
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    marginBottom: '1.5rem',
                                    boxShadow: `0 8px 20px ${service.color}20`
                                }}>
                                    <service.icon size={26} />
                                </div>

                                <h2 style={{ fontSize: '1.4rem', fontWeight: 950, marginBottom: '0.75rem', letterSpacing: '-0.02em', color: 'var(--text-primary)' }}>{service.title}</h2>
                                <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: 1.6, marginBottom: '2rem', flex: 1 }}>
                                    {service.description}
                                </p>

                                <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '0.75rem', marginTop: 'auto', padding: '1.25rem', background: 'var(--bg-secondary)', borderRadius: '16px', border: '1px solid var(--border-color)' }}>
                                    {service.features.slice(0, 3).map((feature, i) => (
                                        <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.8rem', color: 'var(--text-primary)', fontWeight: 800 }}>
                                            <CheckCircle2 size={14} style={{ color: service.color }} />
                                            {feature}
                                        </div>
                                    ))}
                                </div>
                            </Motion.div>
                        ))}
                    </div>

                    <style>{`
                        .services-grid { 
                            display: grid; 
                            grid-template-columns: repeat(4, 1fr); 
                            gap: 1rem; 
                        }
                        @media (max-width: 1200px) {
                            .services-grid { grid-template-columns: repeat(3, 1fr); }
                        }
                        @media (max-width: 992px) {
                            .services-grid { grid-template-columns: repeat(2, 1fr); }
                        }
                        @media (max-width: 640px) {
                            .services-grid { grid-template-columns: 1fr; }
                        }
                    `}</style>

                    <Motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        style={{
                            marginTop: '10rem',
                            textAlign: 'center',
                            padding: '6rem 2rem',
                            background: 'var(--accent-gradient)',
                            borderRadius: '48px',
                            color: 'white',
                            boxShadow: '0 25px 60px rgba(59, 130, 246, 0.25)',
                            position: 'relative',
                            overflow: 'hidden'
                        }}
                    >
                        <div style={{ position: 'relative', zIndex: 1 }}>
                            <h2 style={{ fontSize: '3.5rem', fontWeight: 950, marginBottom: '1.5rem', letterSpacing: '-0.02em' }}>Ready to start your project?</h2>
                            <p style={{ fontSize: '1.35rem', marginBottom: '3.5rem', opacity: 0.9, maxWidth: '650px', margin: '0 auto 3.5rem', lineHeight: 1.6 }}>Let's build something amazing together and take your vision to the next level.</p>
                            <Motion.a
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                href="mailto:contact@uthakkan.com"
                                className="btn"
                                style={{
                                    background: 'white',
                                    color: 'var(--accent-primary)',
                                    padding: '1.5rem 4rem',
                                    fontSize: '1.2rem',
                                    borderRadius: '100px',
                                    fontWeight: 900,
                                    boxShadow: '0 10px 30px rgba(0,0,0,0.1)'
                                }}
                            >
                                Contact Us Today
                            </Motion.a>
                        </div>
                    </Motion.div>
                </Motion.div>
            </section>
        </div>
    );
}
