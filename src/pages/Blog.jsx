import { useState } from 'react';
import { posts } from '../data/posts';
import { PenTool, Calendar, ArrowRight, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import SEO from '../components/SEO';

export default function Blog() {
    const blogSchema = [
        {
            "@context": "https://schema.org",
            "@type": "Blog",
            "name": "PixTool Tech & Productivity Blog",
            "description": "Expert insights, tutorials, and updates on AI, web development, browser-based tools, and digital productivity. Learn how to use free online tools effectively.",
            "url": `${import.meta.env.VITE_SITE_URL || 'https://pixtool.in'}/blog`,
            "publisher": {
                "@type": "Organization",
                "name": "PixTool by UTHAKKAN",
                "logo": {
                    "@type": "ImageObject",
                    "url": `${import.meta.env.VITE_SITE_URL || 'https://pixtool.in'}/logo.png`
                }
            },
            "image": `${import.meta.env.VITE_SITE_URL || 'https://pixtool.in'}/logo.png`,
            "keywords": "productivity, AI tools, web development, online tools, tutorials"
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
                    "name": "Blog",
                    "item": `${import.meta.env.VITE_SITE_URL || 'https://pixtool.in'}/blog`
                }
            ]
        }
    ];

    const allTags = Array.from(new Set(posts.flatMap(p => p.tags || [])));
    const [selectedTag, setSelectedTag] = useState(null);
    const filtered = selectedTag ? posts.filter(p => (p.tags || []).includes(selectedTag)) : posts;
    const [mostRead] = useState(() => {
        try {
            const weekMs = 7 * 24 * 60 * 60 * 1000;
            const now = Date.now();
            const counts = posts.map(p => {
                const raw = localStorage.getItem(`dt_blog_views:${p.slug}`);
                const arr = raw ? JSON.parse(raw) : [];
                const c = arr.filter(ts => {
                    const t = new Date(ts).getTime();
                    return now - t <= weekMs;
                }).length;
                return { slug: p.slug, title: p.title, count: c };
            });
            return counts.filter(c => c.count > 0).sort((a, b) => b.count - a.count).slice(0, 3);
        } catch (e) { void e; return []; }
    });
    const humanizeDate = (d) => {
        try {
            return new Date(d).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
        } catch (e) { void e; return d; }
    };

    return (
        <div className="blog-page">
            <SEO
                title="Blog - Tech Insights, AI & Productivity Tutorials | PixTool"
                description="Explore the PixTool blog for in-depth articles on AI tools, web development best practices, browser-based productivity, and digital workflows. Learn how to use free online tools effectively."
                path="/blog"
                schema={blogSchema}
            />

            <section className="hero" style={{ padding: '8rem 2rem 5rem', background: 'var(--bg-secondary)', marginBottom: '4rem' }}>
                <div style={{ maxWidth: '100%', margin: '0 auto', textAlign: 'center' }}>
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5 }}
                    >
                        <div className="status-badge" style={{ margin: '0 auto 1.5rem', width: 'fit-content', background: 'var(--accent-glow)', color: 'var(--accent-primary)', fontWeight: 700 }}>
                            INSIGHTS & UPDATES
                        </div>
                        <h1 className="hero-title" style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontWeight: 900, marginBottom: '1.5rem', letterSpacing: '-0.02em' }}>Our Blog</h1>
                        <p className="hero-subtitle" style={{ fontSize: '1.25rem', color: 'var(--text-secondary)', maxWidth: '600px', margin: '0 auto' }}>
                            Exploring technology, creativity, and the tools that power the modern digital workflow.
                        </p>
                    </motion.div>
                </div>
            </section>

            <section style={{ padding: '0 2rem 10rem' }}>
                <div style={{ maxWidth: '100%', margin: '0 2rem' }}>
                    <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '2rem' }}>
                        {[null, ...allTags].slice(0, 10).map(tag => (
                            <button
                                key={tag || 'all'}
                                className={`btn ${selectedTag === tag ? 'btn-primary' : 'btn-secondary'}`}
                                style={{ padding: '0.4rem 1rem', fontSize: '0.85rem', ...(selectedTag === tag ? { background: 'var(--accent-primary)', borderColor: 'var(--accent-primary)' } : {}) }}
                                onClick={() => setSelectedTag(tag)}
                            >
                                {tag ? tag : 'All'}
                            </button>
                        ))}
                    </div>
                    <div className="blog-grid" style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))',
                        gap: '3rem'
                    }}>
                        {filtered.map((post, index) => (
                            <motion.div
                                key={post.slug}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1, duration: 0.5 }}
                            >
                                <Link
                                    to={`/blog/${post.slug}`}
                                    className="blog-card"
                                    style={{
                                        display: 'flex',
                                        flexDirection: 'column',
                                        height: '100%',
                                        textDecoration: 'none',
                                        color: 'inherit',
                                        background: 'var(--bg-card)',
                                        borderRadius: '32px',
                                        border: '1px solid var(--border-color)',
                                        overflow: 'hidden',
                                        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                                        boxShadow: 'var(--shadow-sm)'
                                    }}
                                >
                                    <div style={{ height: '240px', overflow: 'hidden', position: 'relative' }}>
                                        <img
                                            src={post.image}
                                            alt={post.title}
                                            style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s ease' }}
                                            className="blog-image"
                                        />
                                        <div style={{ position: 'absolute', top: '1.5rem', left: '1.5rem' }}>
                                            <span style={{
                                                background: 'rgba(255, 255, 255, 0.9)',
                                                backdropFilter: 'blur(10px)',
                                                color: '#000',
                                                padding: '6px 14px',
                                                borderRadius: '100px',
                                                fontSize: '0.75rem',
                                                fontWeight: 800,
                                                textTransform: 'uppercase'
                                            }}>
                                                {post.category}
                                            </span>
                                        </div>
                                    </div>
                                    <div style={{ padding: 'clamp(1.5rem, 4vw, 2.5rem)', display: 'flex', flexDirection: 'column', flex: 1 }}>
                                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem 1rem', fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 600, marginBottom: '1.25rem' }}>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                                                <Calendar size={14} /> {post.date}
                                            </div>
                                            <span style={{ display: 'flex', alignItems: 'center' }}>•</span>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                                                <Clock size={14} /> 5 min read
                                            </div>
                                            <span style={{ display: 'flex', alignItems: 'center' }}>•</span>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                                                Updated {humanizeDate(post.dateISO || post.date)}
                                            </div>
                                        </div>
                                        {!!(post.tags && post.tags.length) && (
                                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '0.75rem' }}>
                                                {post.tags.slice(0, 4).map(tag => (
                                                    <span key={tag} style={{ fontSize: '0.75rem', fontWeight: 700, background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', color: 'var(--text-secondary)', padding: '4px 10px', borderRadius: '100px' }}>
                                                        {tag}
                                                    </span>
                                                ))}
                                            </div>
                                        )}
                                        <h2 style={{ fontSize: 'clamp(1.2rem, 3vw, 1.5rem)', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '1rem', lineHeight: 1.3 }}>{post.title}</h2>
                                        <p style={{ color: 'var(--text-secondary)', fontSize: 'clamp(0.9rem, 2vw, 1rem)', lineHeight: 1.6, marginBottom: '2rem', flex: 1 }}>{post.excerpt}</p>
                                        <div style={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: '8px',
                                            color: 'var(--accent-primary)',
                                            fontWeight: 800,
                                            fontSize: '0.95rem'
                                        }} className="read-article">
                                            Read Article <ArrowRight size={18} className="arrow" />
                                        </div>
                                    </div>
                                </Link>
                            </motion.div>
                        ))}
                    </div>

                    <div style={{ marginTop: '4rem', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
                        <Link to="/temp-mail" style={{ textDecoration: 'none', color: 'inherit' }}>
                            <div style={{ border: '1px solid var(--border-color)', borderRadius: '24px', padding: '1.5rem', background: 'var(--bg-secondary)' }}>
                                <div style={{ fontWeight: 900, marginBottom: '0.5rem' }}>Need a Temporary Email?</div>
                                <p style={{ color: 'var(--text-secondary)' }}>Use Temp Mail to keep signups clean and private. Copy in one tap.</p>
                            </div>
                        </Link>
                        <Link to="/pdf-tools" style={{ textDecoration: 'none', color: 'inherit' }}>
                            <div style={{ border: '1px solid var(--border-color)', borderRadius: '24px', padding: '1.5rem', background: 'var(--bg-secondary)' }}>
                                <div style={{ fontWeight: 900, marginBottom: '0.5rem' }}>Work Faster with PDFs</div>
                                <p style={{ color: 'var(--text-secondary)' }}>Merge, split, compress — all locally in your browser.</p>
                            </div>
                        </Link>
                        <Link to="/image-tools" style={{ textDecoration: 'none', color: 'inherit' }}>
                            <div style={{ border: '1px solid var(--border-color)', borderRadius: '24px', padding: '1.5rem', background: 'var(--bg-secondary)' }}>
                                <div style={{ fontWeight: 900, marginBottom: '0.5rem' }}>Optimize Social Images</div>
                                <p style={{ color: 'var(--text-secondary)' }}>Resize, crop, and compress with precision presets.</p>
                            </div>
                        </Link>
                    </div>

                    {mostRead.length > 0 && (
                        <div style={{ marginTop: '4rem' }}>
                            <h3 style={{ fontSize: '1.5rem', fontWeight: 900, marginBottom: '1rem' }}>Most read this week</h3>
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem' }}>
                                {mostRead.map(item => (
                                    <Link key={item.slug} to={`/blog/${item.slug}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                                        <div style={{ border: '1px solid var(--border-color)', borderRadius: '18px', padding: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                            <div style={{ fontWeight: 700 }}>{item.title}</div>
                                            <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>{item.count} reads</span>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    )}

                    <div style={{ marginTop: '4rem' }}>
                        <h3 style={{ fontSize: '1.5rem', fontWeight: 900, marginBottom: '1rem' }}>Popular posts</h3>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem' }}>
                            {posts.slice(0, 3).map(p => (
                                <Link key={p.slug} to={`/blog/${p.slug}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                                    <div style={{ border: '1px solid var(--border-color)', borderRadius: '18px', padding: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                        <div style={{ fontWeight: 700 }}>{p.title}</div>
                                        <ArrowRight size={18} style={{ color: 'var(--accent-primary)' }} />
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>

                    <div style={{ marginTop: '4rem' }}>
                        <h3 style={{ fontSize: '1.5rem', fontWeight: 900, marginBottom: '1rem' }}>Popular tags</h3>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                            {Object.entries(allTags.reduce((acc, t) => { acc[t] = (acc[t] || 0) + 1; return acc; }, {}))
                                .sort((a, b) => b[1] - a[1])
                                .slice(0, 10)
                                .map(([tag]) => (
                                    <button
                                        key={`popular-${tag}`}
                                        className="btn btn-secondary"
                                        style={{ padding: '0.4rem 0.8rem', fontSize: '0.85rem' }}
                                        onClick={() => setSelectedTag(tag)}
                                    >
                                        {tag}
                                    </button>
                                ))}
                        </div>
                    </div>

                    <div style={{ marginTop: '8rem', textAlign: 'center', padding: '5rem 2rem', background: 'var(--bg-secondary)', borderRadius: '48px', border: '1px solid var(--border-color)' }}>
                        <div style={{
                            width: '80px',
                            height: '80px',
                            background: 'var(--bg-card)',
                            borderRadius: '24px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            margin: '0 auto 2rem',
                            boxShadow: 'var(--shadow-md)'
                        }}>
                            <PenTool size={32} style={{ color: 'var(--accent-primary)' }} />
                        </div>
                        <h3 style={{ fontSize: '2rem', fontWeight: 900, marginBottom: '1rem', letterSpacing: '-0.01em' }}>Want to contribute?</h3>
                        <p style={{ color: 'var(--text-secondary)', marginBottom: '2.5rem', maxWidth: '500px', margin: '0 auto 2.5rem', fontSize: '1.1rem' }}>
                            We're always looking for guest writers who are passionate about tech, productivity, and modern user experience.
                        </p>
                        <a href="mailto:contact.uthakkan@gmail.com" className="btn btn-primary" style={{ padding: '1rem 2.5rem' }}>Get in Touch</a>
                    </div>
                </div>
            </section>

            <style dangerouslySetInnerHTML={{
                __html: `
                .blog-card:hover { transform: translateY(-10px); border-color: var(--accent-primary); box-shadow: 0 30px 60px rgba(59, 130, 246, 0.1); }
                .blog-card:hover .blog-image { transform: scale(1.1); }
                .blog-card:hover .read-article { gap: 12px; }
                .blog-card:hover .arrow { transform: translateX(5px); }
                .read-article { transition: all 0.3s ease; }
                .arrow { transition: all 0.3s ease; }
                @media (max-width: 768px) {
                    .blog-grid { grid-template-columns: 1fr !important; gap: 1.5rem !important; }
                }
            `}} />
        </div>
    );
}
