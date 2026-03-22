import React from 'react';
import SEO from '../components/SEO';
import { Github, Linkedin, Twitter, Coffee, Code, Layers, Cpu, Globe } from 'lucide-react';
import profileImg from '../assets/ajmaluk.png';

export default function Developer() {
    const devSchema = [
        {
            "@context": "https://schema.org",
            "@type": "Person",
            "name": "Muhammed Ajmal U K",
            "alternateName": "Ajmal U K",
            "url": `${import.meta.env.VITE_SITE_URL || 'https://www.pixtool.in'}/developer`,
            "image": `${import.meta.env.VITE_SITE_URL || 'https://www.pixtool.in'}/ajmaluk.png`,
            "jobTitle": "Full Stack Developer & Founder",
            "worksFor": {
                "@type": "Organization",
                "name": "UTHAKKAN",
                "url": "https://uthakkan.in/"
            },
            "sameAs": [
                "https://github.com/ajmal-uk",
                "https://linkedin.com/in/ajmaluk",
                "https://x.com/ajmal_uk_"
            ]
        },
        {
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": [
                {
                    "@type": "ListItem",
                    "position": 1,
                    "name": "Home",
                    "item": `${import.meta.env.VITE_SITE_URL || 'https://www.pixtool.in'}/`
                },
                {
                    "@type": "ListItem",
                    "position": 2,
                    "name": "Developer",
                    "item": `${import.meta.env.VITE_SITE_URL || 'https://www.pixtool.in'}/developer`
                }
            ]
        }
    ];

    return (
        <div className="page-container">
            <SEO
                title="Muhammed Ajmal U K - Senior Full Stack Developer & AI Specialist"
                description="Muhammed Ajmal U K is the developer behind PixTool and founder of UTHAKKAN. Expertise in SaaS architecture, AI Tools, and privacy-first web systems."
                path="/developer"
                schema={devSchema}
            />

            <section className="page-hero">
                <div className="page-hero-content container-wide">
                    <div className="profile-flex" style={{ justifyContent: 'center' }}>
                        <div className="profile-image-wrapper">
                            <img
                                src={profileImg}
                                alt="Muhammed Ajmal U K"
                                className="profile-image"
                                style={{ borderRadius: '50%' }}
                                onError={(e) => { e.target.src = 'https://ui-avatars.com/api/?name=Ajmal+UK&background=3b82f6&color=fff'; }}
                            />
                            <div style={{ position: 'absolute', bottom: '20px', right: '20px', background: 'var(--accent-primary)', color: 'white', width: '40px', height: '40px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: 'var(--shadow-premium)' }}>
                                <Code size={20} />
                            </div>
                        </div>

                        <div style={{ textAlign: 'left' }}>
                            <div className="status-badge" style={{ marginBottom: '1.5rem' }}>DEVELOPER & ARCHITECT</div>
                            <h1 className="page-title" style={{ marginBottom: '0.5rem' }}>Muhammed Ajmal U K</h1>
                            <p style={{ fontSize: '1.5rem', color: 'var(--accent-primary)', fontWeight: 700, marginBottom: '2rem' }}>Founder & Lead Engineer</p>

                            <p className="page-subtitle" style={{ margin: '0', maxWidth: '600px' }}>
                                Senior Software Engineer and founder of <a href="https://uthakkan.in/" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--text-primary)', fontWeight: 700, textDecoration: 'none' }}>UTHAKKAN</a>.
                                Dedicated to building high-performance <strong>SaaS Solutions, AI Tools</strong>, and privacy-first digital architecture.
                            </p>

                            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginTop: '2.5rem' }}>
                                <a href="https://github.com/ajmal-uk" target="_blank" rel="noopener noreferrer" className="btn btn-secondary" style={{ gap: '10px' }}>
                                    <Github size={20} /> GitHub
                                </a>
                                <a href="https://linkedin.com/in/ajmaluk" target="_blank" rel="noopener noreferrer" className="btn btn-secondary" style={{ gap: '10px' }}>
                                    <Linkedin size={20} /> LinkedIn
                                </a>
                                <a href="https://buymeacoffee.com/ajmal.uk" target="_blank" rel="noopener noreferrer" className="btn btn-primary" style={{ gap: '10px', background: '#FFDD00', color: '#000' }}>
                                    <Coffee size={20} /> Support
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="section-padding">
                <div className="container-wide">
                    <div className="page-grid">
                        {/* Tech Stack */}
                        <div className="info-card">
                            <div className="info-card-icon" style={{ background: 'var(--accent-glow)', color: 'var(--accent-primary)' }}>
                                <Layers size={32} />
                            </div>
                            <h2 style={{ fontSize: '1.75rem', fontWeight: 850, marginBottom: '1.5rem', letterSpacing: '-0.02em', color: 'var(--text-primary)' }}>Tech Stack</h2>
                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem' }}>
                                {['React', 'Node.js', 'Express', 'Python', 'Django', 'Flask', 'MongoDB', 'Tailwind CSS', 'Framer Motion'].map(tech => (
                                    <span key={tech} className="suggestion-category" style={{ padding: '8px 16px', background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: '100px' }}>
                                        {tech}
                                    </span>
                                ))}
                            </div>
                        </div>

                        {/* Expertise */}
                        <div className="info-card">
                            <div className="info-card-icon" style={{ background: 'rgba(16, 185, 129, 0.1)', color: '#10b981' }}>
                                <Cpu size={32} />
                            </div>
                            <h2 style={{ fontSize: '1.75rem', fontWeight: 850, marginBottom: '1.5rem', letterSpacing: '-0.02em', color: 'var(--text-primary)' }}>Expertise</h2>
                            <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                {[
                                    'AI Integration & Automation',
                                    'SaaS Product Development',
                                    'Full Stack MERN Architecture',
                                    'UI/UX Design Thinking'
                                ].map(skill => (
                                    <li key={skill} style={{ display: 'flex', alignItems: 'center', gap: '12px', color: 'var(--text-secondary)', fontWeight: 600 }}>
                                        <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#10b981' }} />
                                        {skill}
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Location */}
                        <div className="info-card">
                            <div className="info-card-icon" style={{ background: 'rgba(239, 68, 68, 0.1)', color: '#ef4444' }}>
                                <Globe size={32} />
                            </div>
                            <h2 style={{ fontSize: '1.75rem', fontWeight: 850, marginBottom: '1.5rem', letterSpacing: '-0.02em', color: 'var(--text-primary)' }}>Location</h2>
                            <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8, fontSize: '1.1rem' }}>
                                Based in <strong>Kannur, Kerala, India</strong>.
                                Open to remote collaboration and global projects that challenge the status quo.
                            </p>
                            <div style={{ marginTop: '2rem', fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                                11.8745° N, 75.3704° E
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
