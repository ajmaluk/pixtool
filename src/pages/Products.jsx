import React from 'react';
import SEO from '../components/SEO';
import { ExternalLink, Sparkles, Layout, Mail, Gamepad2, Rocket, Code2, Smartphone, Globe, Shield, Terminal } from 'lucide-react';
import { Link } from 'react-router-dom';

const products = [
    {
        name: "PixTool",
        category: "AI & Productivity Suite",
        description: "Advanced browser-native workspace with 120+ tools for AI generation, PDF manipulation, and image editing with 100% local privacy and zero cloud uploads.",
        url: "https://pixtool.online",
        icon: Sparkles,
        color: "#818cf8",
        badge: "Flagship Suite",
        isInternal: true
    },
    {
        name: "KallanCop",
        category: "Mobile Game (Play Store)",
        description: "Local multiplayer social deduction game published on Google Play Store with thousands of downloads and dynamic party gameplay.",
        url: "https://play.google.com/store/apps/details?id=com.ajmal.kallancop",
        icon: Smartphone,
        color: "#34d399",
        badge: "Google Play Store"
    },
    {
        name: "CodePix",
        category: "Developer Education",
        description: "Interactive coding learning platform concept designed to teach modern computer science concepts with hands-on practice.",
        url: "https://codepix.uthakkan.in",
        icon: Code2,
        color: "#38bdf8",
        badge: "Developer Hub"
    },
    {
        name: "Pixus",
        category: "Digital Web Platform",
        description: "Dynamic digital product platform delivering smart, scalable web solutions with sleek aesthetics.",
        url: "https://pixus.uthakkan.in",
        icon: Globe,
        color: "#a78bfa",
        badge: "Web Platform"
    },
    {
        name: "Climbo",
        category: "Productivity App",
        description: "Interactive web productivity application engineered for modern workflows and digital tasks.",
        url: "https://climbo.uthakkan.in",
        icon: Rocket,
        color: "#f472b6",
        badge: "Productivity"
    },
    {
        name: "Dalam",
        category: "Creative Platform",
        description: "Expressive web platform combining rich visual design with lightning-fast client-side execution.",
        url: "https://dalam.uthakkan.in",
        icon: Layout,
        color: "#fbbf24",
        badge: "Creative Web"
    },
    {
        name: "JoyFul / Joyful Builder",
        category: "AI Website Builder",
        description: "AI-assisted website and web application generation engine that turns text prompts into structured code.",
        icon: Terminal,
        color: "#c084fc",
        badge: "AI Platform"
    },
    {
        name: "Climbo",
        category: "Browser Gaming",
        description: "Web-based physics climbing game project with precision gameplay, dynamic obstacle mechanics, and modern UI.",
        icon: Gamepad2,
        color: "#10b981",
        badge: "Web Game"
    },
    {
        name: "ZyMail",
        category: "Email Productivity",
        description: "Disposable and productivity-focused email tool concept under the UTHAKKAN brand ecosystem.",
        icon: Mail,
        color: "#f87171",
        badge: "Productivity"
    },
    {
        name: "ByteAI",
        category: "AI Developer Assistant",
        description: "AI-powered coding intelligence and assistant tool designed to accelerate software development.",
        icon: Shield,
        color: "#60a5fa",
        badge: "AI Assistant"
    }
];

export default function Products() {
    const productsSchema = [
        {
            "@context": "https://schema.org",
            "@type": "ItemList",
            "name": "Products by UTHAKKAN & Ajmal U K",
            "description": "Explore the official portfolio of AI tools, web apps, mobile games, and developer platforms built by UTHAKKAN.",
            "itemListElement": products.map((p, i) => ({
                "@type": "ListItem",
                "position": i + 1,
                "item": {
                    "@type": "SoftwareApplication",
                    "name": p.name,
                    "applicationCategory": p.category,
                    "url": p.url || "https://uthakkan.in",
                    "operatingSystem": "All",
                    "author": {
                        "@type": "Person",
                        "name": "Ajmal U K"
                    },
                    "publisher": {
                        "@type": "Organization",
                        "name": "UTHAKKAN",
                        "url": "https://uthakkan.in"
                    },
                    "offers": {
                        "@type": "Offer",
                        "price": "0",
                        "priceCurrency": "USD"
                    }
                }
            }))
        }
    ];

    return (
        <div className="products-page page-container">
            <SEO
                title="Products Ecosystem — UTHAKKAN & PixTool"
                description="Explore the portfolio of AI tools, mobile games, web platforms, and developer solutions built by UTHAKKAN and Ajmal U K."
                path="/products"
                schema={productsSchema}
            />

            <section className="hero" style={{ padding: 'clamp(5rem, 12vh, 7rem) 1.5rem 4rem', background: 'var(--bg-secondary)', marginBottom: '4rem', textAlign: 'center' }}>
                <div className="container-pro" style={{ maxWidth: '850px', margin: '0 auto' }}>
                    <div className="status-badge" style={{ margin: '0 auto 1.5rem', width: 'fit-content' }}>
                        <Sparkles size={14} style={{ marginRight: '6px' }} />
                        UTHAKKAN PORTFOLIO
                    </div>
                    <h1 className="hero-title" style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontWeight: 900, marginBottom: '1rem', letterSpacing: '-0.03em', color: 'var(--text-primary)' }}>
                        Digital Ecosystem & Products
                    </h1>
                    <p className="hero-subtitle" style={{ fontSize: '1.2rem', color: 'var(--text-secondary)', maxWidth: '680px', margin: '0 auto', lineHeight: 1.6 }}>
                        A portfolio of practical, modern, and user-friendly software products built by <strong>Ajmal U K</strong> under the <strong>UTHAKKAN</strong> brand.
                    </p>
                </div>
            </section>

            <section style={{ padding: '0 1.5rem 8rem', width: '100%' }}>
                <div className="container-pro">
                    <div className="products-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.5rem' }}>
                        {products.map((product, index) => (
                            <div
                                key={index}
                                className="info-card"
                                style={{
                                    padding: '2rem',
                                    background: 'var(--bg-card)',
                                    borderRadius: '24px',
                                    border: '1px solid var(--border-color)',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    justifyContent: 'space-between',
                                    position: 'relative',
                                    overflow: 'hidden'
                                }}
                            >
                                <div>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                                        <div style={{ width: '48px', height: '48px', borderRadius: '14px', background: `${product.color}15`, color: product.color, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                            <product.icon size={24} />
                                        </div>
                                        <span style={{ fontSize: '0.72rem', fontWeight: 700, padding: '0.25rem 0.7rem', borderRadius: '100px', background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', color: 'var(--text-muted)' }}>
                                            {product.badge}
                                        </span>
                                    </div>

                                    <div style={{ fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.08em', color: product.color, marginBottom: '0.35rem' }}>
                                        {product.category}
                                    </div>

                                    <h3 style={{ fontSize: '1.4rem', fontWeight: 900, marginBottom: '0.75rem', color: 'var(--text-primary)' }}>
                                        {product.name}
                                    </h3>

                                    <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.65, margin: 0 }}>
                                        {product.description}
                                    </p>
                                </div>

                                <div style={{ marginTop: '2rem', paddingTop: '1.25rem', borderTop: '1px solid var(--border-color)' }}>
                                    {product.isInternal ? (
                                        <Link to="/" className="btn btn-primary" style={{ width: '100%', justifyContent: 'center', fontSize: '0.88rem' }}>
                                            Open PixTool
                                        </Link>
                                    ) : product.url ? (
                                        <a href={product.url} target="_blank" rel="noopener noreferrer" className="btn btn-secondary" style={{ width: '100%', justifyContent: 'center', fontSize: '0.88rem' }}>
                                            Visit {product.name} <ExternalLink size={14} style={{ marginLeft: '6px' }} />
                                        </a>
                                    ) : (
                                        <div style={{ textAlign: 'center', fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 600 }}>
                                            Internal Ecosystem Project
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
}
