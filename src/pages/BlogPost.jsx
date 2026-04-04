import React, { useMemo, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { posts } from '../data/posts';
import SEO from '../components/SEO';
import { Calendar, ArrowLeft, Share2, Clock, ArrowRight } from 'lucide-react';
import { useAlert } from '../context/ConfirmContext';
import { motion } from 'framer-motion';
import AdSpace from '../components/AdSpace';
import { SITE_URL } from '../config/app.config';

export default function BlogPost() {
    const alert = useAlert();
    const { slug } = useParams();

    const post = useMemo(() => posts.find(p => p.slug === slug), [slug]);
    const slugify = (s) => s.toLowerCase().replace(/[^a-z0-9\s-]/g, '').trim().replace(/\s+/g, '-');
    const headings = useMemo(() => {
        if (!post?.content) return [];
        const matches = [...post.content.matchAll(/<h2>(.*?)<\/h2>/gi)];
        return matches.map(m => {
            const text = m[1];
            return { text, id: slugify(text) };
        });
    }, [post]);
    const processedContent = useMemo(() => {
        if (!post?.content) return '';
        return post.content.replace(/<h2>(.*?)<\/h2>/gi, (_, t) => `<h2 id="${slugify(t)}">${t}</h2>`);
    }, [post]);
    const humanizeDate = useMemo(() => {
        return (d) => {
            try {
                return new Date(d).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
            } catch {
                return d;
            }
        };
    }, []);
    const faqEntities = useMemo(() => {
        if (!post?.content) return [];
        const faqSection = post.content.match(/<h2>FAQ<\/h2>[\s\S]*?<ul>([\s\S]*?)<\/ul>/i);
        if (!faqSection) return [];
        const list = faqSection[1];
        const items = [...list.matchAll(/<li>\s*<strong>(.*?)<\/strong>\s*(.*?)<\/li>/gi)];
        const strip = (html) => html.replace(/<[^>]*>/g, '').trim();
        return items.map(m => ({
            "@type": "Question",
            "name": strip(m[1]),
            "acceptedAnswer": {
                "@type": "Answer",
                "text": strip(m[2])
            }
        }));
    }, [post]);
    const relatedLinks = useMemo(() => {
        const links = [];
        const tags = (post?.tags || []).map(t => t.toLowerCase());
        const add = (name, path) => { if (!links.find(l => l.path === path)) links.push({ name, path }); };
        const mapping = [
            { tag: 'merge pdf', name: 'Merge PDF', path: '/pdf-tools/merge' },
            { tag: 'compress pdf', name: 'Compress PDF', path: '/pdf-tools/compress' },
            { tag: 'convert pdf', name: 'PDF to Image', path: '/pdf-tools/convert' },
            { tag: 'pdf tools', name: 'PDF Tools', path: '/pdf-tools' },
            { tag: 'resize', name: 'Image Resizer', path: '/image-tools/resize' },
            { tag: 'crop', name: 'Image Cropper', path: '/image-tools/crop' },
            { tag: 'compress', name: 'Image Compressor', path: '/image-tools/compress' },
            { tag: 'image tools', name: 'Image Tools', path: '/image-tools' },
            { tag: 'generator', name: 'QR Generator', path: '/qr-generator' },
            { tag: 'scanner', name: 'QR Scanner', path: '/qr-scanner' },
            { tag: 'qr codes', name: 'QR Tools', path: '/qr-generator' },
            { tag: 'temp mail', name: 'Temp Mail', path: '/temp-mail' },
            { tag: 'privacy', name: 'Privacy Guide', path: '/blog/browser-based-privacy' }
        ];
        mapping.forEach(m => { if (tags.includes(m.tag)) add(m.name, m.path); });
        if (post?.category === 'Comparison' || post?.category === 'Security') add('PDF Tools', '/pdf-tools');
        if (post?.category === 'Tutorial') add('Image Tools', '/image-tools');
        return links.slice(0, 4);
    }, [post]);
    useEffect(() => {
        if (!post) return;
        try {
            const key = `dt_blog_views:${post.slug}`;
            const raw = localStorage.getItem(key);
            const arr = raw ? JSON.parse(raw) : [];
            arr.push(new Date().toISOString());
            if (arr.length > 1000) arr.splice(0, arr.length - 1000);
            localStorage.setItem(key, JSON.stringify(arr));
        } catch (e) { void e; }
    }, [post]);

    

    const howToSchema = useMemo(() => {
        if (post?.category !== 'Tutorial' || headings.length < 2) return null;
        const steps = headings
            .filter(h => h.text.toLowerCase() !== 'faq')
            .map((h, idx) => ({
                "@type": "HowToStep",
                "position": idx + 1,
                "name": h.text
            }));
        return {
            "@context": "https://schema.org",
            "@type": "HowTo",
            "name": post.title,
            "description": post.excerpt,
            "image": post.image,
            "step": steps
        };
    }, [post, headings]);
    const blogPostSchema = useMemo(() => {
        if (!post) return [];
        
        const faqEntitiesList = faqEntities || [];
        const schemaList = [
            {
                "@context": "https://schema.org",
                "@type": "BlogPosting",
                "headline": post.title,
                "description": post.excerpt,
                "image": post.image ? (post.image.startsWith('http') ? post.image : `${import.meta.env.VITE_SITE_URL || 'https://www.pixtool.in'}${post.image}`) : `${import.meta.env.VITE_SITE_URL || 'https://www.pixtool.in'}/logo.webp`,
                "author": {
                    "@type": "Person",
                    "name": post.author || "UTHAKKAN"
                },
                "publisher": {
                    "@id": `${import.meta.env.VITE_SITE_URL || 'https://www.pixtool.in'}/#organization`
                },
                "datePublished": post.dateISO || post.date,
                "dateModified": post.dateISO || post.date,
                "mainEntityOfPage": {
                    "@type": "WebPage",
                    "@id": `${import.meta.env.VITE_SITE_URL || 'https://www.pixtool.in'}/blog/${post.slug}`
                }
            }
        ];

        if (faqEntitiesList.length) {
            schemaList.push({
                "@context": "https://schema.org",
                "@type": "FAQPage",
                "mainEntity": faqEntitiesList
            });
        }

        if (howToSchema) {
            schemaList.push(howToSchema);
        }

        return schemaList;
    }, [post, faqEntities, howToSchema]);

    if (!post) {
        return (
            <div style={{ padding: '10rem 2rem', textAlign: 'center' }}>
                <h1 style={{ fontSize: '3rem', fontWeight: 900, marginBottom: '1.5rem' }}>Post Not Found</h1>
                <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem' }}>The article you are looking for does not exist or has been moved.</p>
                <Link to="/blog" className="btn btn-primary">Back to Blog</Link>
            </div>
        );
    }

    return (
        <div className="blog-post-page">
            <SEO
                title={`${post.title} | PixTool Insights`}
                description={post.excerpt}
                keywords={Array.isArray(post.tags) ? post.tags.join(', ') : undefined}
                path={`/blog/${post.slug}`}
                type="article"
                image={post.image}
                screenshot={post.image}
                imageAlt={post.imageAlt}
                schema={blogPostSchema}
                articlePublishedTime={post.dateISO || post.date}
                articleAuthor={post.author}
                articleSection="Technology"
                articleTags={post.tags}
            />

            {/* Article Hero */}
            <section style={{ padding: '8rem 2rem 4rem', background: 'var(--bg-secondary)', borderBottom: '1px solid var(--border-color)' }}>
                <div style={{ maxWidth: '900px', margin: '0 auto' }}>
                    <Link to="/blog" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', color: 'var(--text-muted)', textDecoration: 'none', marginBottom: '2.5rem', fontWeight: 600, transition: 'color 0.2s' }} className="hover-primary">
                        <ArrowLeft size={18} /> Back to Insights
                    </Link>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <span style={{
                            display: 'inline-block',
                            padding: '6px 16px',
                            background: 'var(--accent-glow)',
                            color: 'var(--accent-primary)',
                            borderRadius: '100px',
                            fontSize: '0.85rem',
                            fontWeight: 700,
                            marginBottom: '1.5rem',
                            textTransform: 'uppercase',
                            letterSpacing: '0.05em'
                        }}>
                            {post.category}
                        </span>
                        {!!(post.tags && post.tags.length) && (
                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '1rem' }}>
                                {post.tags.slice(0, 6).map(tag => (
                                    <span key={tag} style={{ fontSize: '0.75rem', fontWeight: 700, background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', color: 'var(--text-secondary)', padding: '4px 10px', borderRadius: '100px' }}>
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        )}

                        <h1 style={{
                            fontSize: 'clamp(2.5rem, 5vw, 3.5rem)',
                            fontWeight: 900,
                            lineHeight: 1.1,
                            color: 'var(--text-primary)',
                            marginBottom: '2rem',
                            letterSpacing: '-0.02em'
                        }}>
                            {post.title}
                        </h1>

                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '2rem', alignItems: 'center', color: 'var(--text-secondary)', fontWeight: 600 }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'var(--accent-gradient)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 900 }}>
                                    {post.author.charAt(0)}
                                </div>
                                <span>{post.author}</span>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                <Calendar size={18} style={{ color: 'var(--accent-primary)' }} />
                                <span>{humanizeDate(post.dateISO || post.date)}</span>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                <Clock size={18} style={{ color: 'var(--accent-primary)' }} />
                                <span>5 min read</span>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                <span>Updated on</span>
                                <span>{humanizeDate(post.dateISO || post.date)}</span>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Article Content */}
            <section style={{ padding: '4rem 2rem 10rem' }}>
                <div style={{ maxWidth: '900px', margin: '0 auto' }}>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.3, duration: 0.8 }}
                    >
                        {headings.length >= 4 && (
                            <div style={{ marginBottom: '2rem', padding: '1.25rem', background: 'var(--bg-secondary)', borderRadius: '16px', border: '1px solid var(--border-color)' }}>
                                <div style={{ fontWeight: 800, marginBottom: '0.75rem' }}>Table of Contents</div>
                                <ul style={{ margin: 0, paddingLeft: '1.25rem' }}>
                                    {headings.map(h => (
                                        <li key={h.id} style={{ marginBottom: '0.5rem' }}>
                                            <a href={`#${h.id}`} style={{ color: 'var(--text-secondary)', textDecoration: 'none' }}>{h.text}</a>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}
                        <AdSpace type="top" style={{ marginBottom: '3rem' }} />
                        <img
                            src={post.image}
                            alt={post.imageAlt || post.title}
                            width="1200"
                            height="630"
                            loading="lazy"
                            style={{
                                width: '100%',
                                height: 'auto',
                                maxHeight: '500px',
                                objectFit: 'cover',
                                borderRadius: '32px',
                                marginBottom: '4rem',
                                boxShadow: '0 20px 40px rgba(0,0,0,0.1)'
                            }}
                        />

                        <div
                            className="blog-content"
                            style={{
                                fontSize: '1.2rem',
                                lineHeight: 1.8,
                                color: 'var(--text-primary)',
                            }}
                            dangerouslySetInnerHTML={{ __html: processedContent }}
                        />
                        {relatedLinks.length > 0 && (
                            <div style={{ marginTop: '2rem' }}>
                                <div style={{ fontWeight: 800, marginBottom: '0.75rem' }}>Related topics</div>
                                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem' }}>
                                    {relatedLinks.map(l => (
                                        <Link key={l.path} to={l.path} style={{ textDecoration: 'none', color: 'inherit' }}>
                                            <div style={{ border: '1px solid var(--border-color)', borderRadius: '16px', padding: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                                <span style={{ fontWeight: 700 }}>{l.name}</span>
                                                <ArrowRight size={16} className="arrow" style={{ color: 'var(--accent-primary)' }} />
                                            </div>
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        )}

                        <div style={{ marginTop: '2rem', padding: '1.5rem', background: 'var(--bg-secondary)', borderRadius: '16px', border: '1px solid var(--border-color)' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '0.75rem' }}>
                                <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: 'var(--accent-gradient)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 900 }}>
                                    {post.author.charAt(0)}
                                </div>
                                <div>
                                    <div style={{ fontWeight: 800 }}>{post.author}</div>
                                    <div style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Updated on {post.dateISO || post.date}</div>
                                </div>
                            </div>
                            <div style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>
                                Writing about browser-based tools, privacy-first workflows, and practical productivity. Explore more on our <a href="/blog" style={{ color: 'var(--accent-primary)', textDecoration: 'none' }}>Blog</a>.
                            </div>
                        </div>

                        <AdSpace type="bottom" style={{ marginTop: '5rem' }} />

                        <div style={{
                            marginTop: '6rem',
                            padding: '3rem',
                            background: 'var(--bg-secondary)',
                            borderRadius: '24px',
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            flexWrap: 'wrap',
                            gap: '2rem'
                        }}>
                            <div>
                                <h3 style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: '0.5rem' }}>Liked this article?</h3>
                                <p style={{ color: 'var(--text-secondary)' }}>Share it with your network and help others boost their productivity.</p>
                            </div>
                            <button
                                className="btn btn-primary"
                                style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}
                                onClick={() => {
                                    const shareUrl = `${SITE_URL}/blog/${post.slug}`;
                                    if (navigator.share) {
                                        navigator.share({
                                            title: post.title,
                                            text: post.excerpt,
                                            url: shareUrl
                                        }).catch(() => { });
                                    } else {
                                        navigator.clipboard.writeText(shareUrl);
                                        alert({
                                            title: 'Link Copied',
                                            message: 'Article link has been copied to your clipboard!',
                                            type: 'success'
                                        });
                                    }
                                }}
                            >
                                <Share2 size={20} /> Share Article
                            </button>
                        </div>

                        <div style={{ marginTop: '3rem' }}>
                            <h3 style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: '1.5rem' }}>Read next</h3>
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1rem' }}>
                                {(
                                    posts.filter(p => p.slug !== post.slug && p.category === post.category).slice(0, 3).length
                                        ? posts.filter(p => p.slug !== post.slug && p.category === post.category).slice(0, 3)
                                        : posts.filter(p => p.slug !== post.slug).slice(0, 3)
                                ).map(next => (
                                    <Link key={next.slug} to={`/blog/${next.slug}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                                        <div style={{ border: '1px solid var(--border-color)', borderRadius: '18px', padding: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                            <div style={{ fontWeight: 700 }}>{next.title}</div>
                                            <ArrowRight size={18} className="arrow" style={{ color: 'var(--accent-primary)' }} />
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </div>

                        <div style={{ marginTop: '2rem' }}>
                            <h3 style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: '1.5rem' }}>Try our professional tools</h3>
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem' }}>
                                {post.category === 'Tutorial' && post.tags?.some(t => t.includes('image')) ? (
                                    <>
                                        <Link to="/image-tools/resize" style={{ textDecoration: 'none', color: 'inherit' }}>
                                            <div style={{ border: '1px solid var(--border-color)', borderRadius: '16px', padding: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: 'var(--bg-secondary)' }}>
                                                <span style={{ fontWeight: 700 }}>Image Resizer</span>
                                                <ArrowRight size={16} className="arrow" style={{ color: 'var(--accent-primary)' }} />
                                            </div>
                                        </Link>
                                        <Link to="/image-tools/compress" style={{ textDecoration: 'none', color: 'inherit' }}>
                                            <div style={{ border: '1px solid var(--border-color)', borderRadius: '16px', padding: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: 'var(--bg-secondary)' }}>
                                                <span style={{ fontWeight: 700 }}>Image Compressor</span>
                                                <ArrowRight size={16} className="arrow" style={{ color: 'var(--accent-primary)' }} />
                                            </div>
                                        </Link>
                                    </>
                                ) : post.category === 'Tutorial' || post.tags?.some(t => t.includes('pdf')) ? (
                                    <>
                                        <Link to="/pdf-tools/merge" style={{ textDecoration: 'none', color: 'inherit' }}>
                                            <div style={{ border: '1px solid var(--border-color)', borderRadius: '16px', padding: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: 'var(--bg-secondary)' }}>
                                                <span style={{ fontWeight: 700 }}>Merge PDF</span>
                                                <ArrowRight size={16} className="arrow" style={{ color: 'var(--accent-primary)' }} />
                                            </div>
                                        </Link>
                                        <Link to="/pdf-tools/compress" style={{ textDecoration: 'none', color: 'inherit' }}>
                                            <div style={{ border: '1px solid var(--border-color)', borderRadius: '16px', padding: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: 'var(--bg-secondary)' }}>
                                                <span style={{ fontWeight: 700 }}>Compress PDF</span>
                                                <ArrowRight size={16} className="arrow" style={{ color: 'var(--accent-primary)' }} />
                                            </div>
                                        </Link>
                                    </>
                                ) : (
                                    <>
                                        <Link to="/temp-mail" style={{ textDecoration: 'none', color: 'inherit' }}>
                                            <div style={{ border: '1px solid var(--border-color)', borderRadius: '16px', padding: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: 'var(--bg-secondary)' }}>
                                                <span style={{ fontWeight: 700 }}>Temp Mail</span>
                                                <ArrowRight size={16} className="arrow" style={{ color: 'var(--accent-primary)' }} />
                                            </div>
                                        </Link>
                                        <Link to="/qr-generator" style={{ textDecoration: 'none', color: 'inherit' }}>
                                            <div style={{ border: '1px solid var(--border-color)', borderRadius: '16px', padding: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: 'var(--bg-secondary)' }}>
                                                <span style={{ fontWeight: 700 }}>QR Generator</span>
                                                <ArrowRight size={16} className="arrow" style={{ color: 'var(--accent-primary)' }} />
                                            </div>
                                        </Link>
                                    </>
                                )}
                                <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
                                    <div style={{ border: '1px solid var(--border-color)', borderRadius: '16px', padding: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: 'var(--bg-secondary)' }}>
                                        <span style={{ fontWeight: 700 }}>All Tools</span>
                                        <ArrowRight size={16} className="arrow" style={{ color: 'var(--accent-primary)' }} />
                                    </div>
                                </Link>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>

            <style dangerouslySetInnerHTML={{
                __html: `
                .blog-content h2 { margin: 3rem 0 1.5rem; font-size: 2rem; font-weight: 800; }
                .blog-content p { margin-bottom: 1.5rem; }
                .blog-content ul { margin-bottom: 2rem; padding-left: 1.5rem; }
                .blog-content li { margin-bottom: 0.75rem; }
                .blog-content strong { color: var(--accent-primary); }
                .hover-primary:hover { color: var(--accent-primary) !important; }
            `}} />
        </div>
    );
}
