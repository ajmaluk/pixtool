import React from 'react';
import SEO from '../components/SEO';
import { motion as Motion } from 'framer-motion';
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
            "serviceType": "Software Development, Video Editing, AI Automation",
            "provider": {
                "@type": "Organization",
                "name": "UTHAKKAN",
                "url": "https://uthakkan.in/"
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
                    "name": "Services",
                    "item": "https://pixtool.toolpix.in/services"
                }
            ]
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

            <section className="hero" style={{ padding: '8rem 2rem 6rem', position: 'relative' }}>
                <Motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7 }}
                    className="hero-content"
                    style={{ maxWidth: '900px', margin: '0 auto', textAlign: 'center' }}
                >
                    <div className="status-badge" style={{ margin: '0 auto 1.5rem', width: 'fit-content', background: 'rgba(59, 130, 246, 0.1)', color: 'var(--accent-primary)', border: '1px solid rgba(59, 130, 246, 0.2)' }}>
                        OUR EXPERTISE
                    </div>
                    <h1 className="hero-title" style={{ fontSize: 'clamp(3rem, 8vw, 5rem)', fontWeight: 900, marginBottom: '1.5rem', letterSpacing: '-0.04em', lineHeight: 1 }}>
                        Premium Digital <span style={{ color: 'var(--accent-primary)' }}>Solutions</span>
                    </h1>
                    <p className="hero-subtitle" style={{ fontSize: '1.35rem', color: 'var(--text-secondary)', maxWidth: '700px', margin: '0 auto', lineHeight: 1.6 }}>
                        We blend high-end design with cutting-edge technology to create digital experiences that stand out and perform.
                    </p>
                </Motion.div>
            </section>

            <section style={{ padding: '0 2rem 8rem', position: 'relative' }}>
                <Motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    style={{ maxWidth: '1300px', margin: '0 auto' }}
                >
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(380px, 1fr))', gap: '2.5rem' }}>
                        {services.map((service, index) => (
                            <Motion.div
                                key={index}
                                variants={cardVariants}
                                whileHover={{ y: -10, transition: { duration: 0.2 } }}
                                className="tool-card"
                                style={{
                                    padding: '3rem',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    height: '100%',
                                    background: 'var(--bg-glass)',
                                    backdropFilter: 'blur(12px)',
                                    border: '1px solid rgba(255, 255, 255, 0.1)',
                                    boxShadow: '0 10px 40px rgba(0,0,0,0.04)',
                                    borderRadius: '32px'
                                }}
                            >
                                <div style={{
                                    width: '72px',
                                    height: '72px',
                                    borderRadius: '20px',
                                    background: `${service.color}15`,
                                    color: service.color,
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    marginBottom: '2rem',
                                    boxShadow: `0 8px 20px ${service.color}20`
                                }}>
                                    <service.icon size={36} />
                                </div>

                                <h2 style={{ fontSize: '1.75rem', fontWeight: 800, marginBottom: '1.25rem', letterSpacing: '-0.02em' }}>{service.title}</h2>
                                <p style={{ color: 'var(--text-secondary)', fontSize: '1.05rem', lineHeight: 1.7, marginBottom: '2.5rem', flex: 1 }}>
                                    {service.description}
                                </p>

                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginTop: 'auto', padding: '1.5rem', background: 'rgba(0,0,0,0.02)', borderRadius: '20px' }}>
                                    {service.features.map((feature, i) => (
                                        <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.9rem', color: 'var(--text-muted)', fontWeight: 600 }}>
                                            <CheckCircle2 size={16} style={{ color: service.color }} />
                                            {feature}
                                        </div>
                                    ))}
                                </div>
                            </Motion.div>
                        ))}
                    </div>

                    <Motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        style={{
                            marginTop: '8rem',
                            textAlign: 'center',
                            padding: '6rem 2rem',
                            background: 'var(--accent-gradient)',
                            borderRadius: '48px',
                            color: 'white',
                            boxShadow: '0 20px 60px rgba(59, 130, 246, 0.3)',
                            position: 'relative',
                            overflow: 'hidden'
                        }}
                    >
                        {/* Decorative circles in CTA */}
                        <div style={{ position: 'absolute', top: '-10%', left: '-5%', width: '200px', height: '200px', background: 'rgba(255,255,255,0.1)', borderRadius: '50%' }} />
                        <div style={{ position: 'absolute', bottom: '-10%', right: '-5%', width: '300px', height: '300px', background: 'rgba(255,255,255,0.05)', borderRadius: '50%' }} />

                        <div style={{ position: 'relative', zIndex: 1 }}>
                            <h2 style={{ fontSize: '3rem', fontWeight: 900, marginBottom: '1.5rem', letterSpacing: '-0.02em' }}>Ready to start your project?</h2>
                            <p style={{ fontSize: '1.3rem', marginBottom: '3.5rem', opacity: 0.9, maxWidth: '600px', margin: '0 auto 3.5rem' }}>Let's build something amazing together and take your vision to the next level.</p>
                            <Motion.a
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                href="mailto:contact.uthakkan@gmail.com"
                                className="btn"
                                style={{
                                    background: 'white',
                                    color: 'var(--accent-primary)',
                                    padding: '1.5rem 4rem',
                                    fontSize: '1.15rem',
                                    borderRadius: '100px',
                                    fontWeight: 800,
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
