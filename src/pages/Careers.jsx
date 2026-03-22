import React from 'react';
import SEO from '../components/SEO';
import { Heart, Coffee, Globe, ArrowRight } from 'lucide-react';

const positions = [
    {
        title: "Next.js/React Developer",
        type: "Full-time / Remote",
        description: "We're looking for a passionate frontend developer to help build the future of UTHAKKAN's digital ecosystem."
    },
    {
        title: "AI Research Intern",
        type: "Internship / Remote",
        description: "Work on cutting-edge local AI processing models and help us optimize browser-based inference."
    },
    {
        title: "Creative Content Creator",
        type: "Part-time / Hybrid",
        description: "Help us share our story and build a community around productivity and innovation."
    }
];

export default function Careers() {
    const careersSchema = [
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
                    "name": "Careers",
                    "item": "https://pixtool.toolpix.in/careers"
                }
            ]
        }
    ];

    return (
        <div className="careers-page">
            <SEO
                title="Careers - Join the Future of AI Productivity | PixTool"
                description="Explore job opportunities and internships at PixTool. Join our mission to build high-performance, privacy-focused digital utilities."
                path="/careers"
                schema={careersSchema}
            />

            <section className="hero" style={{ padding: '6rem 2rem 4rem' }}>
                <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
                    <div className="status-badge" style={{ margin: '0 auto 1.5rem', width: 'fit-content' }}>
                        WE'RE GROWING (SOON)
                    </div>
                    <h1 className="hero-title" style={{ fontSize: '3.5rem', fontWeight: 900, marginBottom: '1.5rem' }}>Join the Journey</h1>
                    <p className="hero-subtitle" style={{ fontSize: '1.25rem', color: 'var(--text-secondary)' }}>
                        Build tools that impact thousands of users daily. We're looking for creators, builders, and dreamers.
                    </p>
                </div>
            </section>

            <section style={{ padding: '0 2rem 8rem' }}>
                <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem', marginBottom: '6rem' }}>
                        <div className="tool-card" style={{ padding: '2rem', textAlign: 'center' }}>
                            <Globe size={40} style={{ color: 'var(--accent-primary)', marginBottom: '1.5rem', margin: '0 auto 1.5rem' }} />
                            <h3 style={{ fontWeight: 800, marginBottom: '1rem' }}>Remote First</h3>
                            <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>Work from anywhere in the world. We value output over office hours.</p>
                        </div>
                        <div className="tool-card" style={{ padding: '2rem', textAlign: 'center' }}>
                            <Heart size={40} style={{ color: '#ef4444', marginBottom: '1.5rem', margin: '0 auto 1.5rem' }} />
                            <h3 style={{ fontWeight: 800, marginBottom: '1rem' }}>Impact matters</h3>
                            <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>Your code and designs will be used by thousands of people every day.</p>
                        </div>
                        <div className="tool-card" style={{ padding: '2rem', textAlign: 'center' }}>
                            <Coffee size={40} style={{ color: '#f59e0b', marginBottom: '1.5rem', margin: '0 auto 1.5rem' }} />
                            <h3 style={{ fontWeight: 800, marginBottom: '1rem' }}>Growth Mindset</h3>
                            <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>Continuous learning is part of our DNA. We grow together.</p>
                        </div>
                    </div>

                    <h2 style={{ fontSize: '2.5rem', fontWeight: 900, marginBottom: '3rem', textAlign: 'center' }}>Open Positions</h2>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                        {positions.map((job, i) => (
                            <div key={i} className="tool-card" style={{ padding: '2.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', transition: 'all 0.3s ease' }}>
                                <div>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '0.5rem' }}>
                                        <h3 style={{ fontSize: '1.5rem', fontWeight: 800 }}>{job.title}</h3>
                                        <span style={{ padding: '4px 12px', background: 'var(--bg-secondary)', borderRadius: '100px', fontSize: '0.75rem', fontWeight: 700, color: 'var(--accent-primary)' }}>{job.type}</span>
                                    </div>
                                    <p style={{ color: 'var(--text-secondary)', maxWidth: '600px' }}>{job.description}</p>
                                </div>
                                <div style={{ color: 'var(--text-muted)', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 700 }}>
                                    Learn More <ArrowRight size={20} />
                                </div>
                            </div>
                        ))}
                    </div>

                    <div style={{ marginTop: '6rem', textAlign: 'center', padding: '4rem', background: 'var(--accent-gradient)', borderRadius: '32px', color: 'white' }}>
                        <h2 style={{ fontSize: '2rem', fontWeight: 900, marginBottom: '1rem' }}>Don't see a role for you?</h2>
                        <p style={{ opacity: 0.9, marginBottom: '2.5rem' }}>We're always open to meeting talented people. Send us your resume and tell us how you can help UTHAKKAN grow.</p>
                        <a href="mailto:contact.uthakkan@gmail.com" className="btn" style={{ background: 'white', color: 'var(--accent-primary)', padding: '1rem 2.5rem' }}>General Application</a>
                    </div>
                </div>
            </section>
        </div>
    );
}
