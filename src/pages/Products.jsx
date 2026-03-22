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
        },
        {
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": [
                {
                    "@type": "ListItem",
                    "position": 1,
                    "name": "Home",
                    "item": `${import.meta.env.VITE_SITE_URL || 'https://pixtool.in'}/`
                },
                {
                    "@type": "ListItem",
                    "position": 2,
                    "name": "Products",
                    "item": `${import.meta.env.VITE_SITE_URL || 'https://pixtool.in'}/products`
                }
            ]
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

            <section className="hero" style={{ padding: '6rem 2rem 4rem' }}>
                <div className="hero-content" style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
                    <div className="status-badge" style={{ margin: '0 auto 1.5rem', width: 'fit-content' }}>
                        BUILT BY US
                    </div>
                    <h1 className="hero-title" style={{ fontSize: '3.5rem', fontWeight: 900, marginBottom: '1.5rem' }}>Digital Ecosystem</h1>
                    <p className="hero-subtitle" style={{ fontSize: '1.25rem', color: 'var(--text-secondary)' }}>
                        Smart, scalable solutions designed to simplify the digital world.
                    </p>
                </div>
            </section>

            <section style={{ padding: '0 2rem 6rem' }}>
                <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(450px, 1fr))', gap: '2.5rem' }}>
                        {products.map((product, index) => (
                            <div key={index} className="tool-card" style={{ padding: '3rem', position: 'relative', overflow: 'hidden' }}>
                                <div style={{
                                    position: 'absolute',
                                    top: '-20px',
                                    right: '-20px',
                                    width: '150px',
                                    height: '150px',
                                    background: `${product.color}05`,
                                    borderRadius: '50%',
                                    zIndex: 0
                                }}></div>

                                <div style={{ position: 'relative', zIndex: 1 }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '2rem' }}>
                                        <div style={{
                                            width: '64px',
                                            height: '64px',
                                            borderRadius: '16px',
                                            background: `${product.color}15`,
                                            color: product.color,
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center'
                                        }}>
                                            <product.icon size={32} />
                                        </div>
                                        <span style={{ padding: '6px 14px', background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: '100px', fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--text-muted)' }}>
                                            {product.category}
                                        </span>
                                    </div>

                                    <h2 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '1rem', color: 'var(--text-primary)' }}>{product.name}</h2>
                                    <p style={{ color: 'var(--text-secondary)', fontSize: '1.05rem', lineHeight: 1.7, marginBottom: '2.5rem', minHeight: '80px' }}>
                                        {product.description}
                                    </p>

                                    <a href={product.url} target="_blank" rel="noopener noreferrer" className="btn btn-primary" style={{ gap: '10px', width: '100%' }}>
                                        Visit Tool <ExternalLink size={18} />
                                    </a>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div style={{ marginTop: '8rem', textAlign: 'center' }}>
                        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem', color: 'var(--accent-primary)', fontWeight: 700 }}>
                            <Rocket size={24} /> <span>Coming Soon</span>
                        </div>
                        <h2 style={{ fontSize: '2.5rem', fontWeight: 900, marginBottom: '1.5rem' }}>More innovation in the pipeline</h2>
                        <p style={{ color: 'var(--text-secondary)', maxWidth: '600px', margin: '0 auto' }}>
                            We're constantly working on new tools and platforms to help you build, create, and grow faster. Stay tuned for our next big release.
                        </p>
                    </div>
                </div>
            </section>
        </div>
    );
}
