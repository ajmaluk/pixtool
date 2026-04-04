import { useState } from 'react';
import { posts } from '../data/posts';
import { PenTool, Calendar, ArrowRight, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import SEO from '../components/SEO';
import AdSpace from '../components/AdSpace';
import { SITE_URL } from '../config/app.config';

export default function Blog() {
    const blogSchema = [
        {
            "@context": "https://schema.org",
            "@type": "Blog",
            "name": "PixTool Tech & Productivity Blog",
            "description": "Expert insights, tutorials, and updates on AI, web development, browser-based tools, and digital productivity. Learn how to use free online tools effectively.",
            "url": `${SITE_URL}/blog`,
            "publisher": {
                "@id": `${SITE_URL}/#organization`
            },
            "image": `${SITE_URL}/logo.webp`,
            "keywords": "productivity, AI tools, web development, online tools, tutorials"
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

    const BlogCard = ({ post, index, humanizeDate }) => {
        const [showMoreTags, setShowMoreTags] = useState(false);
        const tags = post.tags || [];

        return (
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
            >
                <div style={{ position: 'relative', height: '100%' }}>
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
                        <div style={{ height: '200px', overflow: 'hidden', position: 'relative' }}>
                            <img
                                src={post.image}
                                alt={post.imageAlt || post.title}
                                width="400"
                                height="200"
                                loading="lazy"
                                style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s ease' }}
                                className="blog-image"
                            />
                            <div style={{ position: 'absolute', top: '1rem', left: '1rem' }}>
                                <span className="blog-card-category" style={{
                                    background: '#ffffff',
                                    color: '#0f172a', /* High contrast text */
                                    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                                    padding: '4px 12px',
                                    borderRadius: '100px',
                                    fontSize: '0.7rem',
                                    fontWeight: 800,
                                    textTransform: 'uppercase'
                                }}>
                                    {post.category}
                                </span>
                            </div>
                        </div>
                        <div style={{ padding: 'clamp(1rem, 3vw, 2rem)', display: 'flex', flexDirection: 'column', flex: 1 }}>
                            <div className="blog-card-meta" style={{ 
                                display: 'flex', 
                                alignItems: 'center', 
                                gap: '0.5rem', 
                                fontSize: '0.75rem', 
                                color: 'var(--text-muted)', 
                                fontWeight: 600, 
                                marginBottom: '1rem',
                                whiteSpace: 'nowrap',
                                overflow: 'hidden'
                            }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '4px', flexShrink: 0 }}>
                                    <Calendar size={12} className="meta-icon" /> {post.date}
                                </div>
                                <span className="meta-dot">•</span>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '4px', flexShrink: 0 }}>
                                    <Clock size={12} className="meta-icon" /> 5m
                                </div>
                                <span className="meta-dot mobile-hide">•</span>
                                <div className="mobile-hide" style={{ display: 'flex', alignItems: 'center', gap: '4px', flexShrink: 0 }}>
                                    Upd: {humanizeDate(post.dateISO || post.date)}
                                </div>
                            </div>

                            {!!tags.length && (
                                <div className="blog-card-tags" style={{ display: 'flex', flexWrap: 'nowrap', alignItems: 'center', gap: '6px', marginBottom: '0.75rem' }}>
                                    <span key={tags[0]} style={{ fontSize: '0.7rem', fontWeight: 700, background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', color: 'var(--text-secondary)', padding: '3px 8px', borderRadius: '100px', whiteSpace: 'nowrap' }}>
                                        {tags[0]}
                                    </span>
                                    {tags.length > 1 && (
                                        <button 
                                            onClick={(e) => {
                                                e.preventDefault();
                                                e.stopPropagation();
                                                setShowMoreTags(!showMoreTags);
                                            }}
                                            style={{ 
                                                fontSize: '0.7rem', 
                                                fontWeight: 800, 
                                                background: 'var(--accent-glow)', 
                                                color: 'var(--accent-primary)', 
                                                padding: '3px 8px', 
                                                borderRadius: '100px', 
                                                border: 'none',
                                                cursor: 'pointer'
                                            }}
                                        >
                                            +{tags.length - 1}
                                        </button>
                                    )}
                                </div>
                            )}

                            {showMoreTags && (
                                <div 
                                    style={{ 
                                        position: 'absolute', 
                                        bottom: '4rem', 
                                        left: '1rem', 
                                        right: '1rem', 
                                        background: 'var(--bg-card)', 
                                        border: '1px solid var(--border-color)', 
                                        borderRadius: '16px', 
                                        padding: '1rem', 
                                        zIndex: 10,
                                        boxShadow: 'var(--shadow-lg)',
                                        display: 'flex',
                                        flexWrap: 'wrap',
                                        gap: '6px'
                                    }}
                                    onClick={(e) => e.stopPropagation()}
                                >
                                    {tags.slice(1).map(tag => (
                                        <span key={tag} style={{ fontSize: '0.7rem', fontWeight: 700, background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', color: 'var(--text-secondary)', padding: '3px 8px', borderRadius: '100px' }}>
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            )}

                            <h2 className="blog-card-title" style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '0.75rem', lineHeight: 1.3 }}>{post.title}</h2>
                            <p className="blog-card-excerpt" style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: 1.6, marginBottom: '1.5rem', flex: 1 }}>{post.excerpt}</p>
                            <div style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '6px',
                                color: 'var(--accent-primary)',
                                fontWeight: 800,
                                fontSize: '0.9rem'
                            }} className="read-article">
                                Read Article <ArrowRight size={16} className="arrow" />
                            </div>
                        </div>
                    </Link>
                </div>
            </motion.div>
        );
    };

    return (
        <div className="blog-page">
            <SEO
                title="🔥 AI & Productivity Blog - Tutorials, Tips & Web Dev Insights | PixTool"
                description="Expert blog on AI tools, web development, browser-based productivity, and free online software. Learn how to use PixTool and master modern digital workflows. 20+ in-depth tutorials on optimization, privacy & automation."
                keywords="ai tutorials, productivity blog, web development guide, browser tools, online productivity, free software tips, ai guide, privacy first tools, workflow automation, developer documentation"
                path="/blog"
                schema={blogSchema}
            />

            <section className="hero" style={{ padding: 'clamp(5rem, 15vh, 8rem) 1.5rem 5rem', background: 'var(--bg-secondary)', marginBottom: '4rem' }}>
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

            <section style={{ padding: '0 1.5rem 10rem', width: '100%', overflowX: 'hidden' }}>
                <div style={{ width: '100%', maxWidth: '1400px', margin: '0 auto' }}>
                    <AdSpace type="top" style={{ marginBottom: '3rem' }} />
                    <div className="blog-tags-scroll" style={{ display: 'flex', gap: '0.5rem', flexWrap: 'nowrap', overflowX: 'auto', paddingBottom: '1rem', marginBottom: '1.5rem', WebkitOverflowScrolling: 'touch' }}>
                        {[null, ...allTags].map(tag => (
                            <button
                                key={tag || 'all'}
                                className={`btn ${selectedTag === tag ? 'btn-primary' : 'btn-secondary'}`}
                                style={{ padding: '0.4rem 1.25rem', fontSize: '0.85rem', flexShrink: 0, whiteSpace: 'nowrap', borderRadius: '100px', ...(selectedTag === tag ? { background: 'var(--accent-primary)', borderColor: 'var(--accent-primary)', color: 'white' } : {}) }}
                                onClick={() => setSelectedTag(tag)}
                            >
                                {tag ? tag : 'All'}
                            </button>
                        ))}
                    </div>
                    
                    <div className="blog-grid">
                        {filtered.map((post, index) => (
                            <BlogCard key={post.slug} post={post} index={index} humanizeDate={humanizeDate} />
                        ))}
                    </div>

                    <div style={{ marginTop: '6rem', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
                        <Link to="/temp-mail" style={{ textDecoration: 'none', color: 'inherit' }}>
                            <div className="info-card" style={{ padding: '2rem', height: '100%' }}>
                                <div style={{ fontWeight: 900, marginBottom: '0.75rem', fontSize: '1.25rem' }}>Need a Temporary Email?</div>
                                <p style={{ color: 'var(--text-secondary)', lineHeight: 1.6 }}>Use Temp Mail to keep signups clean and private. Copy in one tap.</p>
                            </div>
                        </Link>
                        <Link to="/pdf-tools" style={{ textDecoration: 'none', color: 'inherit' }}>
                            <div className="info-card" style={{ padding: '2rem', height: '100%' }}>
                                <div style={{ fontWeight: 900, marginBottom: '0.75rem', fontSize: '1.25rem' }}>Work Faster with PDFs</div>
                                <p style={{ color: 'var(--text-secondary)', lineHeight: 1.6 }}>Merge, split, compress — all locally in your browser.</p>
                            </div>
                        </Link>
                        <Link to="/image-tools" style={{ textDecoration: 'none', color: 'inherit' }}>
                            <div className="info-card" style={{ padding: '2rem', height: '100%' }}>
                                <div style={{ fontWeight: 900, marginBottom: '0.75rem', fontSize: '1.25rem' }}>Optimize Social Images</div>
                                <p style={{ color: 'var(--text-secondary)', lineHeight: 1.6 }}>Resize, crop, and compress with precision presets.</p>
                            </div>
                        </Link>
                    </div>

                    {mostRead.length > 0 && (
                        <div style={{ marginTop: '6rem' }}>
                            <h3 style={{ fontSize: '1.75rem', fontWeight: 900, marginBottom: '1.5rem', letterSpacing: '-0.02em' }}>Most read this week</h3>
                            <div className="page-grid">
                                {mostRead.map(item => (
                                    <Link key={item.slug} to={`/blog/${item.slug}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                                        <div className="info-card" style={{ padding: '1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                            <div style={{ fontWeight: 700 }}>{item.title}</div>
                                            <span style={{ fontSize: '0.8rem', color: 'var(--accent-primary)', fontWeight: 800 }}>{item.count} reads</span>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    )}

                    <div style={{ marginTop: '6rem' }}>
                        <h3 style={{ fontSize: '1.75rem', fontWeight: 900, marginBottom: '1.5rem', letterSpacing: '-0.02em' }}>Popular posts</h3>
                        <div className="page-grid">
                            {posts.slice(0, 3).map(p => (
                                <Link key={p.slug} to={`/blog/${p.slug}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                                    <div className="info-card" style={{ padding: '1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                        <div style={{ fontWeight: 700 }}>{p.title}</div>
                                        <ArrowRight size={18} style={{ color: 'var(--accent-primary)' }} />
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>

                    <div style={{ marginTop: '6rem' }}>
                        <h3 style={{ fontSize: '1.75rem', fontWeight: 900, marginBottom: '1.5rem', letterSpacing: '-0.02em' }}>Popular tags</h3>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                            {Object.entries(allTags.reduce((acc, t) => { acc[t] = (acc[t] || 0) + 1; return acc; }, {}))
                                .sort((a, b) => b[1] - a[1])
                                .slice(0, 15)
                                .map(([tag]) => (
                                    <button
                                        key={`popular-${tag}`}
                                        className="btn btn-secondary"
                                        style={{ padding: '0.5rem 1rem', fontSize: '0.85rem', borderRadius: '100px' }}
                                        onClick={() => setSelectedTag(tag)}
                                    >
                                        {tag}
                                    </button>
                                ))}
                        </div>
                    </div>

                    <AdSpace type="bottom" style={{ marginTop: '5rem' }} />

                    <div style={{ marginTop: '8rem', textAlign: 'center', padding: '5rem 2rem', background: 'var(--bg-secondary)', borderRadius: '48px', border: '1px solid var(--border-color)', position: 'relative', overflow: 'hidden' }}>
                        <div style={{ position: 'relative', zIndex: 1 }}>
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
                            <h3 style={{ fontSize: '2.5rem', fontWeight: 950, marginBottom: '1rem', letterSpacing: '-0.03em' }}>Want to contribute?</h3>
                            <p style={{ color: 'var(--text-secondary)', marginBottom: '3rem', maxWidth: '550px', margin: '0 auto 3rem', fontSize: '1.15rem', lineHeight: 1.6 }}>
                                We're always looking for guest writers who are passionate about tech, productivity, and modern user experience.
                            </p>
                            <a href="mailto:contact@uthakkan.com" className="btn btn-primary" style={{ padding: '1.25rem 3rem', borderRadius: '16px', fontSize: '1.1rem' }}>Get in Touch</a>
                        </div>
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
                .blog-tags-scroll::-webkit-scrollbar { display: none; }
                .blog-tags-scroll { -ms-overflow-style: none; scrollbar-width: none; }
                           .blog-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 1rem; }
                @media (max-width: 1200px) {
                    .blog-grid { grid-template-columns: repeat(3, 1fr); gap: 1rem; }
                }
                @media (max-width: 992px) {
                    .blog-grid { grid-template-columns: repeat(2, 1fr) !important; gap: 1rem !important; }
                }
                @media (max-width: 768px) {
                    .blog-grid { grid-template-columns: repeat(2, 1fr) !important; gap: 0.75rem !important; }
                    .blog-card-excerpt { display: none !important; }
                    .blog-card-category { font-size: 0.6rem !important; padding: 3px 10px !important; }
                    .blog-card-meta { font-size: 0.6rem !important; margin-bottom: 0.5rem !important; gap: 0.3rem !important; flex-wrap: nowrap !important; }
                    .blog-card-title { font-size: 0.95rem !important; margin-bottom: 0.4rem !important; }
                    .blog-card-tags { gap: 4px !important; margin-bottom: 0.4rem !important; }
                    .blog-card-tags span { font-size: 0.6rem !important; padding: 2px 6px !important; }
                    .read-article { font-size: 0.75rem !important; }
                    .blog-card { border-radius: 16px !important; }
                    .meta-icon { width: 10px !important; height: 10px !important; }
                    .blog-image { height: 160px !important; }
                    .mobile-hide { display: none !important; }
                    .meta-dot { font-size: 0.5rem; }
                }
                @media (max-width: 480px) {
                    .blog-grid { grid-template-columns: repeat(2, 1fr) !important; gap: 0.5rem !important; }
                    .blog-card-title { font-size: 0.85rem !important; line-height: 1.2 !important; }
                }
    }
            `}} />
        </div>
    );
}
