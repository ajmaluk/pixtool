import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';
import { Mail, MessageSquare, MapPin, Send, Github, Linkedin, Twitter } from 'lucide-react';

export default function Contact() {
    const scriptUrl = 'https://script.google.com/macros/s/AKfycbx8wjJ5b6vVe3ZG2O9S_7sNp1BP0poejBcOX3tdHReneMunC7DVt_lR9GfAcZnQktk/exec'

    const [status, setStatus] = useState('idle') // idle, loading, success, error
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: 'General Inquiry',
        message: ''
    })

    const handleSubmit = async (e) => {
        e.preventDefault()
        setStatus('loading')
        try {
            await fetch(scriptUrl, {
                method: 'POST',
                mode: 'no-cors',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            })
            setStatus('success')
            setFormData({ name: '', email: '', subject: 'General Inquiry', message: '' })
        } catch (error) {
            console.error('Submission error:', error)
            setStatus('error')
        }
    }

    const contactSchema = [
        {
            "@context": "https://schema.org",
            "@type": "ContactPage",
            "name": "Contact DailyTools Support & UTHAKKAN",
            "description": "Get in touch with the DailyTools team for technical support, tool suggestions, custom development services, or business inquiries.",
            "url": "https://dailytools.toolpix.in/contact",
            "mainEntity": {
                "@type": "Organization",
                "name": "UTHAKKAN Digital",
                "url": "https://dailytools.toolpix.in",
                "email": "contact.uthakkan@gmail.com",
                "contactPoint": {
                    "@type": "ContactPoint",
                    "email": "contact.uthakkan@gmail.com",
                    "contactType": "customer service",
                    "availableLanguage": "English"
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
                    "item": "https://dailytools.toolpix.in/"
                },
                {
                    "@type": "ListItem",
                    "position": 2,
                    "name": "Contact",
                    "item": "https://dailytools.toolpix.in/contact"
                }
            ]
        }
    ];

    return (
        <div className="page-container">
            <SEO
                title="Contact Us - Support, Feedback & Business Inquiries | DailyTools"
                description="Get in touch with DailyTools for technical support, tool suggestions, custom development services, or business partnerships. We respond to all inquiries within 24 hours."
                path="/contact"
                schema={contactSchema}
            />

            <section className="page-hero">
                <div className="page-hero-content container-narrow">
                    <div className="status-badge">
                        GET IN TOUCH
                    </div>
                    <h1 className="page-title">Let's Connect</h1>
                    <p className="page-subtitle">
                        Have a question, feedback, or a business proposal? We'd love to hear from you.
                    </p>
                </div>
            </section>

            <section className="section-padding">
                <div className="container-wide">
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.5fr', gap: '4rem' }}>
                        {/* Contact Info */}
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                            <div className="info-card" style={{ padding: '2rem' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
                                    <div style={{ background: 'rgba(59, 130, 246, 0.1)', color: 'var(--accent-primary)', padding: '12px', borderRadius: '12px' }}>
                                        <Mail size={24} />
                                    </div>
                                    <div>
                                        <h3 style={{ fontWeight: 700, fontSize: '1.1rem', color: 'var(--text-primary)' }}>Email Us</h3>
                                        <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>contact.uthakkan@gmail.com</p>
                                    </div>
                                </div>
                            </div>

                            <div className="info-card" style={{ padding: '2rem' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
                                    <div style={{ background: 'rgba(16, 185, 129, 0.1)', color: '#10b981', padding: '12px', borderRadius: '12px' }}>
                                        <MessageSquare size={24} />
                                    </div>
                                    <div>
                                        <h3 style={{ fontWeight: 700, fontSize: '1.1rem', color: 'var(--text-primary)' }}>Social Media</h3>
                                        <div style={{ display: 'flex', gap: '12px', marginTop: '8px' }}>
                                            <a href="https://github.com/ajmal-uk" className="icon-btn" style={{ width: '32px', height: '32px' }}><Github size={16} /></a>
                                            <a href="https://linkedin.com/in/ajmaluk" className="icon-btn" style={{ width: '32px', height: '32px' }}><Linkedin size={16} /></a>
                                            <a href="https://x.com/ajmal_uk_" className="icon-btn" style={{ width: '32px', height: '32px' }}><Twitter size={16} /></a>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="info-card" style={{ padding: '2rem' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
                                    <div style={{ background: 'rgba(239, 68, 68, 0.1)', color: '#ef4444', padding: '12px', borderRadius: '12px' }}>
                                        <MapPin size={24} />
                                    </div>
                                    <div>
                                        <h3 style={{ fontWeight: 700, fontSize: '1.1rem', color: 'var(--text-primary)' }}>Location</h3>
                                        <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Kannur, Kerala, India</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Quick Message Form */}
                        <div className="info-card" style={{ padding: '3.5rem' }}>
                            <h2 style={{ fontSize: '1.75rem', fontWeight: 850, marginBottom: '2rem', letterSpacing: '-0.02em', color: 'var(--text-primary)' }}>Send a Message</h2>
                            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                                <div className="input-group">
                                    <label className="input-label">Your Name</label>
                                    <input
                                        type="text"
                                        className="search-input"
                                        style={{ height: '56px', borderRadius: '16px', background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', width: '100%', padding: '0 1.5rem' }}
                                        placeholder="Ajmal"
                                        required
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    />
                                </div>
                                <div className="input-group">
                                    <label className="input-label">Email Address</label>
                                    <input
                                        type="email"
                                        className="search-input"
                                        style={{ height: '56px', borderRadius: '16px', background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', width: '100%', padding: '0 1.5rem' }}
                                        placeholder="ajmal@example.com"
                                        required
                                        value={formData.email}
                                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    />
                                </div>
                                <div className="input-group">
                                    <label className="input-label">Message</label>
                                    <textarea
                                        className="search-input"
                                        style={{ height: 'auto', minHeight: '150px', borderRadius: '16px', background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', width: '100%', padding: '1.5rem', resize: 'vertical' }}
                                        placeholder="How can we help you?"
                                        required
                                        value={formData.message}
                                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                    ></textarea>
                                </div>
                                <button type="submit" className="btn btn-primary" style={{ width: '100%', height: '56px', borderRadius: '16px', gap: '10px' }} disabled={status === 'loading'}>
                                    {status === 'loading' ? 'Sending...' : 'Send Message'} <Send size={18} />
                                </button>
                                {status === 'success' && (
                                    <p style={{ color: '#10b981', fontSize: '1rem', textAlign: 'center', fontWeight: 700 }}>Message sent successfully! We'll get back to you soon.</p>
                                )}
                                {status === 'error' && (
                                    <p style={{ color: '#ef4444', fontSize: '1rem', textAlign: 'center', fontWeight: 700 }}>Something went wrong. Please try again or email us directly.</p>
                                )}
                            </form>
                        </div>
                    </div>

                    <div style={{ marginTop: '10rem', textAlign: 'center' }}>
                        <h2 style={{ fontSize: '2.5rem', fontWeight: 950, marginBottom: '3rem', letterSpacing: '-0.03em', color: 'var(--text-primary)' }}>Quick Navigation</h2>
                        <div className="page-grid">
                            <Link to="/pdf-tools" className="info-card" style={{ padding: '2rem', textAlign: 'center', textDecoration: 'none' }}>
                                <h4 style={{ fontWeight: 800, fontSize: '1.2rem', color: 'var(--text-primary)' }}>PDF Tools</h4>
                            </Link>
                            <Link to="/image-tools" className="info-card" style={{ padding: '2rem', textAlign: 'center', textDecoration: 'none' }}>
                                <h4 style={{ fontWeight: 800, fontSize: '1.2rem', color: 'var(--text-primary)' }}>Image Tools</h4>
                            </Link>
                            <Link to="/temp-mail" className="info-card" style={{ padding: '2rem', textAlign: 'center', textDecoration: 'none' }}>
                                <h4 style={{ fontWeight: 800, fontSize: '1.2rem', color: 'var(--text-primary)' }}>Temp Mail</h4>
                            </Link>
                            <Link to="/qr-generator" className="info-card" style={{ padding: '2rem', textAlign: 'center', textDecoration: 'none' }}>
                                <h4 style={{ fontWeight: 800, fontSize: '1.2rem', color: 'var(--text-primary)' }}>QR Generator</h4>
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
