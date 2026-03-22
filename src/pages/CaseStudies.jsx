import React from 'react';
import SEO from '../components/SEO';
import { Layout, CheckCircle2, TrendingUp, Users } from 'lucide-react';

const cases = [
    {
        title: "Optimizing Creator Workflows with ToolPix",
        client: "Digital Content Studio",
        impact: "40% reduction in image processing time",
        description: "How a leading content studio used ToolPix's bulk processing and AI enhancement to streamline their YouTube thumbnail creation process."
    },
    {
        title: "SaaS Scaling with Custom AI Integration",
        client: "E-commerce Startup",
        impact: "Improved user engagement by 25%",
        description: "UTHAKKAN helped an e-commerce platform integrate custom AI agents to automate customer queries and product descriptions."
    },
    {
        title: "Secure Document Management for Legal Teams",
        client: "Law Firm",
        impact: "100% data privacy compliance",
        description: "Implementing local browser-based PDF tools for a legal team, ensuring sensitive documents never leave their local network."
    }
];

export default function CaseStudies() {
    const caseSchema = [
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
                    "name": "Case Studies",
                    "item": `${import.meta.env.VITE_SITE_URL || 'https://pixtool.in'}/case-studies`
                }
            ]
        }
    ];

    return (
        <div className="case-studies-page">
            <SEO
                title="Case Studies - Real-World Success Stories | PixTool"
                description="Discover how businesses and individuals leverage PixTool and UTHAKKAN's expertise to optimize workflows and drive digital growth through real-world case studies."
                path="/case-studies"
                schema={caseSchema}
            />

            <section className="hero" style={{ padding: '6rem 2rem 4rem' }}>
                <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
                    <div className="status-badge" style={{ margin: '0 auto 1.5rem', width: 'fit-content' }}>
                        PROVEN RESULTS
                    </div>
                    <h1 className="hero-title" style={{ fontSize: '3.5rem', fontWeight: 900, marginBottom: '1.5rem' }}>Case Studies</h1>
                    <p className="hero-subtitle" style={{ fontSize: '1.25rem', color: 'var(--text-secondary)' }}>
                        Exploring the real-world impact of our tools and consulting services.
                    </p>
                </div>
            </section>

            <section style={{ padding: '0 2rem 8rem' }}>
                <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '3rem' }}>
                        {cases.map((cs, i) => (
                            <div key={i} className="tool-card" style={{ padding: '3.5rem', display: 'grid', gridTemplateColumns: '1fr 300px', gap: '3rem', alignItems: 'center' }}>
                                <div>
                                    <div style={{ color: 'var(--accent-primary)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', fontSize: '0.8rem', marginBottom: '1rem' }}>Case Study: {cs.client}</div>
                                    <h2 style={{ fontSize: '2rem', fontWeight: 900, marginBottom: '1.5rem' }}>{cs.title}</h2>
                                    <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', lineHeight: 1.7, marginBottom: '2rem' }}>{cs.description}</p>

                                    <div style={{ display: 'flex', gap: '2rem' }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                            <CheckCircle2 style={{ color: '#10b981' }} size={20} />
                                            <span style={{ fontWeight: 700 }}>{cs.impact}</span>
                                        </div>
                                    </div>
                                </div>
                                <div style={{ background: 'var(--bg-secondary)', padding: '2.5rem', borderRadius: '24px', textAlign: 'center' }}>
                                    <TrendingUp size={48} style={{ color: 'var(--accent-primary)', marginBottom: '1rem', opacity: 0.5 }} />
                                    <div style={{ fontSize: '1.5rem', fontWeight: 900, marginBottom: '0.5rem' }}>40%</div>
                                    <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 700 }}>Efficiency Boost</div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div style={{ marginTop: '8rem', textAlign: 'center' }}>
                        <h2 style={{ fontSize: '2.5rem', fontWeight: 900, marginBottom: '1.5rem' }}>Ready for your own success story?</h2>
                        <p style={{ color: 'var(--text-secondary)', marginBottom: '3rem', fontSize: '1.2rem' }}>Let's talk about how UTHAKKAN can optimize your digital workflow.</p>
                        <a href="/contact" className="btn btn-primary" style={{ padding: '1.25rem 3rem' }}>Start a Consultation</a>
                    </div>
                </div>
            </section>
        </div>
    );
}
