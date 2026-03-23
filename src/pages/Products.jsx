import React from 'react';
import SEO from '../components/SEO';
import { ExternalLink, Sparkles, Layout, Mail, Gamepad2, Rocket } from 'lucide-react';

const products = [
    {
        name: "ToolPix",
        category: "AI Tools",
        description: "Advanced image processing tool powered by AI. Resize, crop, compress, and enhance images with professional precision.",
        url: "https://toolpix.pythonanywhere.com",
        icon: Sparkles,
        color: "#a855f7"
    },
    {
        name: "Byte AI",
        category: "Developer Tools",
        description: "Personal AI coding assistant designed to boost developer productivity with intelligent code suggestions and refactoring.",
        url: "https://byteai.pythonanywhere.com",
        icon: Layout,
        color: "#3b82f6"
    },
    {
        name: "Zymail",
        category: "Email Services",
        description: "Fast, secure, and intuitive email service built for modern communication needs.",
        url: "https://zymail.pythonanywhere.com",
        icon: Mail,
        color: "#ec4899"
    },
    {
        name: "Zyrace",
        category: "Gaming Platform",
        description: "A high-octane racing and gaming platform delivering immersive digital entertainment experiences.",
        url: "https://zyrace.pythonanywhere.com",
        icon: Gamepad2,
        color: "#10b981"
    }
];

export default function Products() {
    const productsSchema = [
        {
            "@context": "https://schema.org",
            "@type": "ItemList",
            "name": "Innovation & AI Products by PixTool",
            "description": "Explore our portfolio of AI-powered tools and digital ecosystems, including ToolPix and Byte AI.",
            "itemListElement": products.map((p, i) => ({
                "@type": "ListItem",
                "position": i + 1,
                "item": {
                    "@type": "SoftwareApplication",
                    "name": p.name,
                    "applicationCategory": p.category,
                    "url": p.url,
                    "operatingSystem": "All",
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
        <div className="products-page">
            <SEO
                title="Our Products - Advanced AI Tools & Ecosystem | PixTool"
                description="Innovative digital products including ToolPix AI and Byte AI assistant. Explore the software ecosystem built by UTHAKKAN for maximum productivity."
                path="/products"
                schema={productsSchema}
            />

            <section className="hero" style={{ padding: 'clamp(5rem, 15vh, 8rem) 1.5rem 5rem', background: 'var(--bg-secondary)', marginBottom: '4rem' }}>
                <div className="hero-content" style={{ maxWidth: '100%', margin: '0 auto', textAlign: 'center' }}>
                    <div className="status-badge" style={{ margin: '0 auto 1.5rem', width: 'fit-content', background: 'var(--accent-glow)', color: 'var(--accent-primary)', fontWeight: 700 }}>
                        BUILT BY US
                    </div>
                    <h1 className="hero-title" style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontWeight: 900, marginBottom: '1.5rem', letterSpacing: '-0.02em' }}>Digital Ecosystem</h1>
                    <p className="hero-subtitle" style={{ fontSize: '1.25rem', color: 'var(--text-secondary)', maxWidth: '600px', margin: '0 auto' }}>
                        Smart, scalable solutions designed to simplify the digital world.
                    </p>
                </div>
            </section>

            <section style={{ padding: '0 1.5rem 10rem', width: '100%', overflowX: 'hidden' }}>
                <div style={{ width: '100%' }}>
                    <div className="products-grid">
                        {products.map((product, index) => (
                            <div key={index} className="info-card" style={{ padding: '2rem', position: 'relative', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
                                <div style={{
                                    position: 'absolute',
                                    top: '-15px',
                                    right: '-15px',
                                    width: '120px',
                                    height: '120px',
                                    background: `${product.color}05`,
                                    borderRadius: '50%',
                                    zIndex: 0
                                }}></div>

                                <div style={{ position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', height: '100%' }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.5rem' }}>
                                        <div style={{
                                            width: '52px',
                                            height: '52px',
                                            borderRadius: '14px',
                                            background: `${product.color}15`,
                                            color: product.color,
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            boxShadow: `0 8px 20px ${product.color}20`
                                        }}>
                                            <product.icon size={26} />
                                        </div>
                                        <span style={{ padding: '4px 10px', background: 'var(--accent-glow)', border: '1px solid var(--border-color)', borderRadius: '100px', fontSize: '0.65rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--accent-primary)' }}>
                                            {product.category}
                                        </span>
                                    </div>

                                    <h2 style={{ fontSize: '1.5rem', fontWeight: 950, marginBottom: '0.75rem', color: 'var(--text-primary)', letterSpacing: '-0.03em' }}>{product.name}</h2>
                                    <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: 1.6, marginBottom: '2rem', flex: 1 }}>
                                        {product.description}
                                    </p>

                                    <a href={product.url} target="_blank" rel="noopener noreferrer" className="btn btn-primary" style={{ gap: '10px', width: '100%', padding: '0.85rem', borderRadius: '12px', fontWeight: 800, fontSize: '0.9rem' }}>
                                        Visit Tool <ExternalLink size={16} />
                                    </a>
                                </div>
                            </div>
                        ))}
                    </div>

                    <style>{`
                        .products-grid { 
                            display: grid; 
                            grid-template-columns: repeat(4, 1fr); 
                            gap: 1rem; 
                        }
                        @media (max-width: 1200px) {
                            .products-grid { grid-template-columns: repeat(3, 1fr); }
                        }
                        @media (max-width: 992px) {
                            .products-grid { grid-template-columns: repeat(2, 1fr); }
                        }
                        @media (max-width: 640px) {
                            .products-grid { grid-template-columns: 1fr; }
                        }
                    `}</style>

                    <div style={{ marginTop: '10rem', textAlign: 'center', padding: '6rem 2rem', background: 'var(--bg-secondary)', borderRadius: '48px', border: '1px solid var(--border-color)' }}>
                        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem', color: 'var(--accent-primary)', fontWeight: 800, fontSize: '1.1rem' }}>
                            <Rocket size={28} /> <span>Coming Soon</span>
                        </div>
                        <h2 style={{ fontSize: '3rem', fontWeight: 950, marginBottom: '1.5rem', letterSpacing: '-0.02em' }}>More innovation in the pipeline</h2>
                        <p style={{ color: 'var(--text-secondary)', maxWidth: '650px', margin: '0 auto', fontSize: '1.2rem', lineHeight: 1.6 }}>
                            We're constantly working on new tools and platforms to help you build, create, and grow faster. Stay tuned for our next big release.
                        </p>
                    </div>
                </div>
            </section>
        </div>
    );
}
