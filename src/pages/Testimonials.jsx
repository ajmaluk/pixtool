import React from 'react';
import SEO from '../components/SEO';
import { Quote, Star, User } from 'lucide-react';

const testimonials = [
    {
        name: "Alex Johnson",
        role: "Digital Nomad",
        content: "PixTool is a game changer. The fact that I can edit my images without uploading them anywhere gives me so much peace of mind.",
        stars: 5
    },
    {
        name: "Sarah Chen",
        role: "Content Creator",
        content: "ToolPix has become an essential part of my workflow. The AI enhancements are subtle but professional. Highly recommended!",
        stars: 5
    },
    {
        name: "Michael Ross",
        role: "Startup Founder",
        content: "I've been using Zymail for a few months now. It's fast, clean, and just works. Great to see such innovation coming out of India.",
        stars: 5
    },
    {
        name: "Elena Rodriguez",
        role: "Freelance Designer",
        content: "The PDF tools are incredible. Merging and splitting PDFs is so much faster than the paid tools I used to use.",
        stars: 4
    }
];

export default function Testimonials() {
    return (
        <div className="testimonials-page">
            <SEO
                title="Testimonials - Real User Success Stories | PixTool"
                description="Read how creators, developers, and businesses use PixTool and UTHAKKAN products to streamline their digital workflows and protect their privacy."
                path="/testimonials"
            />

            <section className="hero" style={{ padding: '6rem 2rem 4rem' }}>
                <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
                    <div className="status-badge" style={{ margin: '0 auto 1.5rem', width: 'fit-content' }}>
                        USER FEEDBACK
                    </div>
                    <h1 className="hero-title" style={{ fontSize: '3.5rem', fontWeight: 900, marginBottom: '1.5rem' }}>User Stories</h1>
                    <p className="hero-subtitle" style={{ fontSize: '1.25rem', color: 'var(--text-secondary)' }}>
                        Join thousands of satisfied users who trust UTHAKKAN for their daily digital needs.
                    </p>
                </div>
            </section>

            <section style={{ padding: '0 2rem 8rem' }}>
                <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
                        {testimonials.map((t, i) => (
                            <div key={i} className="tool-card" style={{ padding: '2.5rem', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                                <div style={{ display: 'flex', gap: '4px' }}>
                                    {[...Array(t.stars)].map((_, i) => <Star key={i} size={16} fill="#fbbf24" color="#fbbf24" />)}
                                </div>

                                <Quote size={32} style={{ color: 'var(--accent-primary)', opacity: 0.2 }} />

                                <p style={{ fontSize: '1.1rem', color: 'var(--text-primary)', fontStyle: 'italic', lineHeight: 1.6, flex: 1 }}>
                                    "{t.content}"
                                </p>

                                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', borderTop: '1px solid var(--border-color)', paddingTop: '1.5rem' }}>
                                    <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'var(--bg-secondary)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-muted)' }}>
                                        <User size={20} />
                                    </div>
                                    <div>
                                        <h4 style={{ fontWeight: 800, fontSize: '1rem' }}>{t.name}</h4>
                                        <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>{t.role}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div style={{ marginTop: '6rem', textAlign: 'center', background: 'var(--bg-secondary)', padding: '5rem 2rem', borderRadius: '32px' }}>
                        <h2 style={{ fontSize: '2.5rem', fontWeight: 900, marginBottom: '1.5rem' }}>Have feedback for us?</h2>
                        <p style={{ fontSize: '1.2rem', color: 'var(--text-secondary)', marginBottom: '3rem' }}>We're always looking to improve our tools based on user suggestions.</p>
                        <a href="/contact" className="btn btn-primary" style={{ padding: '1.25rem 3rem' }}>Send Us Your Story</a>
                    </div>
                </div>
            </section>
        </div>
    );
}
