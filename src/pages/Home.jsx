import { useState, useEffect, lazy, Suspense } from 'react'
import { Link, useSearchParams, useNavigate } from 'react-router-dom'
import SEO from '../components/SEO'
import {
  Image, FileText,
  Shield, Wifi, Search, X, Zap, Lock,
  Navigation, Sparkles
} from 'lucide-react'
import ToolCard from '../components/ToolCard'
import OverallRatingBadge from '../components/OverallRatingBadge'
import LazyYouTubeEmbed from '../components/LazyYouTubeEmbed'
import { SITE_URL } from '../config/app.config'
import { IMAGE_TOOLS, PDF_TOOLS, UTILITY_TOOLS, AI_TOOLS, MATH_TOOLS, PRODUCTIVITY_TOOLS } from '../data/tools'
import { GLOBAL_FAQS } from '../data/faqs'
import { posts } from '../data/posts'
import { Calculator } from 'lucide-react'

// Lazy Load subsections for performance
const BlogSection = lazy(() => import('../components/BlogSection'))
const UseCaseSection = lazy(() => import('../components/UseCaseSection'))
const FAQSection = lazy(() => import('../components/FAQSection'))
const TechnicalAuthority = lazy(() => import('../components/TechnicalAuthority'))

const imageTools = IMAGE_TOOLS.filter(t => !t.status);
const pdfTools = PDF_TOOLS.filter(t => !t.status);
const communicationTools = UTILITY_TOOLS;
const aiTools = AI_TOOLS.filter(t => !t.status);
const mathTools = MATH_TOOLS.filter(t => !t.status);
const productivityTools = PRODUCTIVITY_TOOLS;

export default function Home() {
  const [searchParams, setSearchParams] = useSearchParams()
  const navigate = useNavigate()
  const initialSearch = searchParams.get('q') || ''
  const [searchTerm, setSearchTerm] = useState(initialSearch)
  const [showSuggestions, setShowSuggestions] = useState(false)
  const [selectedIndex, setSelectedIndex] = useState(-1)

  useEffect(() => {
    const q = searchParams.get('q') || ''
    if (q !== searchTerm) {
      // Sync search input when URL query changes from outside this page.
       
      setSearchTerm(q)
    }
  }, [searchParams, searchTerm])

  const handleSearchChange = (e) => {
    const val = e.target.value
    setSearchTerm(val)
    setShowSuggestions(val.length > 0)
    setSelectedIndex(-1)
    if (val) {
      setSearchParams({ q: val })
    } else {
      setSearchParams({})
    }
  }

  const handleKeyDown = (e) => {
    if (!showSuggestions || filteredTools.length === 0) return

    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setSelectedIndex(prev => (prev < filteredTools.length - 1 ? prev + 1 : prev))
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setSelectedIndex(prev => (prev > 0 ? prev - 1 : 0))
    } else if (e.key === 'Enter' && selectedIndex >= 0) {
      e.preventDefault()
      const tool = filteredTools[selectedIndex]
      navigate(tool.path)
    } else if (e.key === 'Escape') {
      setShowSuggestions(false)
    }
  }

  const allTools = [
    ...imageTools.map(t => ({ ...t, typeLabel: 'Image Studio' })),
    ...pdfTools.map(t => ({ ...t, typeLabel: 'PDF Expert' })),
    ...communicationTools.map(t => ({ ...t, typeLabel: 'Utility' })),
    ...aiTools.map(t => ({ ...t, typeLabel: 'AI Tool' })),
    ...mathTools.map(t => ({ ...t, typeLabel: 'Math Hub' })),
    ...productivityTools.map(t => ({ ...t, typeLabel: 'Productivity' }))
  ]

  // Interleave tools from different categories to mix them one after one
  const mixedTools = [];
  const maxLen = Math.max(imageTools.length, pdfTools.length, communicationTools.length, aiTools.length, mathTools.length, productivityTools.length);
  for (let i = 0; i < maxLen; i++) {
    if (i < imageTools.length) mixedTools.push({ ...imageTools[i], typeLabel: 'Image Tool' });
    if (i < pdfTools.length) mixedTools.push({ ...pdfTools[i], typeLabel: 'PDF Tool' });
    if (i < communicationTools.length) mixedTools.push({ ...communicationTools[i], typeLabel: 'Utility' });
    if (i < aiTools.length) mixedTools.push({ ...aiTools[i], typeLabel: 'AI Tool' });
    if (i < mathTools.length) mixedTools.push({ ...mathTools[i], typeLabel: 'Math Tool' });
    if (i < productivityTools.length) mixedTools.push({ ...productivityTools[i], typeLabel: 'Productivity' });
  }
  const filteredTools = allTools.filter(tool =>
    tool.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    tool.description.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const isSearching = searchTerm.trim().length > 0

  const homeFaqs = GLOBAL_FAQS

  const homeSchema = [
    {
      "@context": "https://schema.org",
      "@type": "ItemList",
      "name": "Free Online Tools",
      "description": "Complete list of free online tools available at PixTool",
      "url": `${SITE_URL}/sitemap`,
      "itemListElement": allTools.map((t, idx) => ({
        "@type": "ListItem",
        "position": idx + 1,
        "name": t.title,
        "url": `${SITE_URL}${t.path}`,
        "description": t.description
      }))
    }
  ]

  return (
    <>
      <SEO
        title="PixTool — 125+ Best Free Online AI & Private Productivity Tools [2026]"
        description="🚀 Access 125+ free online tools: AI writing, PDF editor, image resizer, QR code generator, temp mail & more. 100% browser-based privacy—no data uploads, no account needed. Trusted by 50,000+ professionals worldwide."
        keywords="pixtool, best free online tools, free ai tools, privacy-first productivity suite, browser based tools, offline productivity software, free image editor online, secure pdf editor, free qr generator, temp mail generator, 10 minute mail, ai writing assistant free, kanban board software, drawing app online, calculator online, free coding tools, online productivity suite, all in one tool, web utilities, toolpix"
        path="/"
        schema={homeSchema}
        faqs={homeFaqs}
        breadcrumbs={[
          { name: 'Professional Tools', item: '/' }
        ]}
      />
      <div className="landing-layout" style={{ position: 'relative', overflow: 'hidden' }}>
        {/* Modern Tech Glow Accents */}
        <div className="glow-accent glow-accent-purple" />
        <div className="glow-accent glow-accent-red" />
        <div className="landing-center">

          <div className="category-hub">
            <div className="hero-hub-container">
              <div className="hero-content-wrapper">
                <div className="hero-status-badge">
                  <span style={{ marginRight: '8px' }}>🚀</span> 2026 AI Innovation Suite
                </div>
                <h1 className="hero-main-title">
                  Best Free Online <br/>
                  <span className="text-gradient-hero" style={{ 
                    display: 'inline-block',
                    padding: '0.1em 0',
                    position: 'relative'
                  }}>
                    AI & Privacy Tools
                  </span>
                  <div
                    className="hero-glow-effect"
                    style={{
                      position: 'absolute',
                      top: '50%',
                      left: '50%',
                      transform: 'translate(-50%, -50%)',
                      width: '140%',
                      height: '140%',
                      background: 'radial-gradient(circle, rgba(139, 92, 246, 0.15) 0%, transparent 70%)',
                      zIndex: -1,
                      pointerEvents: 'none'
                    }}
                  />
                </h1>
                <p className="hero-text-description">
                  The world's most powerful browser-native AI suite. 121+ professional tools for 
                  <span style={{ color: 'var(--text-primary)', fontWeight: 700 }}> task management </span>, 
                  <span style={{ color: 'var(--text-primary)', fontWeight: 700 }}> content generation </span>, 
                  <span style={{ color: 'var(--text-primary)', fontWeight: 700 }}> secure PDF management </span>, 
                  <span style={{ color: 'var(--text-primary)', fontWeight: 700 }}> scientific mathematics </span>,
                  and <span style={{ color: 'var(--text-primary)', fontWeight: 700 }}> image studio operations </span>
                  —all with absolute privacy.
                  <span style={{ 
                    display: 'flex', 
                    flexWrap: 'wrap',
                    justifyContent: 'center',
                    gap: '1rem',
                    marginTop: '2rem', 
                    fontSize: '0.85rem', 
                    fontWeight: 900, 
                    textTransform: 'uppercase', 
                    color: 'var(--accent-primary)', 
                    letterSpacing: '0.2em' 
                  }}>
                    <span>✦ Zero-Upload AI</span>
                    <span style={{ opacity: 0.6 }}>|</span>
                    <span>✦ Industry-Standard Security</span>
                    <span style={{ opacity: 0.6 }}>|</span>
                    <span>✦ High-Fidelity Output</span>
                  </span>
                </p>

                <div style={{ marginBottom: '1.25rem' }}>
                  <OverallRatingBadge />
                </div>

                <div className="search-container hero-search-wrapper">
                  <div className="search-icon-wrapper" style={{ left: '24px', opacity: 0.7 }}>
                    <Search size={28} aria-hidden="true" />
                  </div>
                  <input
                    type="text"
                    className="search-input"
                    placeholder="Search 121+ professional tools..."
                    value={searchTerm}
                    onChange={handleSearchChange}
                    onKeyDown={handleKeyDown}
                    onFocus={() => setShowSuggestions(searchTerm.length > 0)}
                    aria-label="Search across all 121+ professional tools"
                  />
                  {searchTerm && (
                    <button
                      onClick={() => { setSearchTerm(''); setSearchParams({}); setShowSuggestions(false); }}
                      style={{ position: 'absolute', right: '1.5rem', top: '50%', transform: 'translateY(-50%)', border: 'none', background: 'var(--bg-secondary)', color: 'var(--text-muted)', cursor: 'pointer', padding: '0.5rem', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                    >
                      <X size={18} />
                    </button>
                  )}

                  {showSuggestions && filteredTools.length > 0 && (
                    <div className="hero-search-suggestions-box">
                      <div style={{ padding: '0.75rem 1.25rem', fontSize: '0.75rem', fontWeight: 800, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                        Suggested Tools
                      </div>
                      {filteredTools.slice(0, 5).map((tool, index) => (
                        <Link
                          key={tool.path}
                          to={tool.path}
                          onClick={() => setShowSuggestions(false)}
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '1.25rem',
                            padding: '1rem 1.25rem',
                            textDecoration: 'none',
                            color: 'var(--text-primary)',
                            transition: 'all 0.3s ease',
                            background: selectedIndex === index ? 'var(--bg-secondary)' : 'transparent',
                            borderRadius: '20px',
                            margin: '2px 0'
                          }}
                          onMouseEnter={() => setSelectedIndex(index)}
                        >
                          <div style={{
                            width: '44px',
                            height: '44px',
                            borderRadius: '12px',
                            background: 'var(--bg-primary)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: 'var(--accent-primary)',
                            boxShadow: 'var(--shadow-sm)'
                          }}>
                            {tool.icon && <tool.icon size={20} />}
                          </div>
                          <div style={{ flex: 1 }}>
                            <div style={{ fontWeight: 800, fontSize: '1rem', color: 'var(--text-primary)' }}>{tool.title}</div>
                            <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginTop: '2px', opacity: 0.8 }}>{tool.description ? `${tool.description.substring(0, 60)}...` : ''}</div>
                          </div>
                          <div style={{
                            opacity: selectedIndex === index ? 1 : 0,
                            transform: selectedIndex === index ? 'translateX(0)' : 'translateX(-10px)',
                            transition: 'all 0.3s ease',
                            color: 'var(--accent-primary)',
                            fontSize: '1.2rem',
                            fontWeight: 900
                          }}>→</div>
                        </Link>
                      ))}
                    </div>
                  )}
                </div>

                <div className="hero-feature-tags">
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 600, color: 'var(--text-secondary)' }} aria-label="100% Private Tool">
                    <Shield size={18} style={{ color: 'var(--accent-green)' }} aria-hidden="true" /> 100% Private
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 600, color: 'var(--text-secondary)' }} aria-label="Instant Browser Processing">
                    <Zap size={18} style={{ color: 'var(--accent-orange)' }} aria-hidden="true" /> Instant
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 600, color: 'var(--text-secondary)' }} aria-label="Secure Data Management">
                    <Lock size={18} style={{ color: 'var(--accent-purple)' }} aria-hidden="true" /> Secure
                  </div>
                </div>
              </div>
            </div>
          </div>

          <section className="content-section" style={{ paddingBottom: 'clamp(4rem, 10vw, 10rem)' }}>
            <div className="container-pro">
              {isSearching ? (
                <div className="search-results" style={{ minHeight: '60vh' }}>
                  <div className="section-header" style={{ marginBottom: '3rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'var(--bg-secondary)', padding: '1.5rem 1.5rem', borderRadius: '20px', border: '1px solid var(--border-color)' }}>
                    <div>
                      <h2 style={{ fontSize: '1.8rem', fontWeight: 900, marginBottom: '0.25rem' }}>Search Results</h2>
                      <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Found {filteredTools.length} professional tools for "{searchTerm}"</p>
                    </div>
                    <button
                      className="btn btn-secondary"
                      onClick={() => { setSearchTerm(''); setSearchParams({}); }}
                      style={{ borderRadius: '12px', padding: '0.6rem 1.2rem' }}
                    >
                      Clear Search
                    </button>
                  </div>
                  {filteredTools.length > 0 ? (
                    <div
                      className="tools-grid"
                    >
                      {filteredTools.map((tool) => (
                        <ToolCard key={tool.path} tool={tool} />
                      ))}
                    </div>
                  ) : (
                    <div className="no-results" style={{ textAlign: 'center', padding: '6rem 2rem', background: 'var(--bg-secondary)', borderRadius: '32px', border: '2px dashed var(--border-color)' }}>
                      <div style={{ marginBottom: '2rem', color: 'var(--text-muted)' }}><Search size={80} style={{ opacity: 0.1 }} /></div>
                      <h3 style={{ fontSize: '2.2rem', fontWeight: 900, marginBottom: '1rem' }}>No tools matched your search</h3>
                      <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', maxWidth: '500px', margin: '0 auto' }}>
                        We couldn't find any tools for <strong>"{searchTerm}"</strong>. Try searching for broader terms like "Image", "PDF", or "Email".
                      </p>
                      <button className="btn btn-primary" style={{ marginTop: '2.5rem', padding: '1rem 2.5rem' }} onClick={() => { setSearchTerm(''); setSearchParams({}); }}>
                        Explore All {allTools.length} Tools
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <>
                  {/* New & Trending Category */}
                  {!isSearching && (
                    <section style={{ marginBottom: '6rem', position: 'relative' }}>
                      <div style={{
                        position: 'sticky',
                        top: '80px',
                        zIndex: 10,
                        background: 'rgba(var(--bg-primary-rgb), 0.7)',
                        backdropFilter: 'blur(24px)',
                        WebkitBackdropFilter: 'blur(24px)',
                        padding: '1.5rem 0',
                        marginBottom: '3rem',
                        boxShadow: '0 4px 40px rgba(0, 0, 0, 0.05)',
                        borderBottom: '1px solid rgba(255,255,255,0.05)',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '1.2rem',
                        borderRadius: '0 0 24px 24px'
                      }}>
                        <div style={{ padding: '0.6rem', background: 'rgba(168, 85, 247, 0.08)', borderRadius: '12px', color: '#a855f7' }}>
                          <Sparkles size={24} />
                        </div>
                        <div>
                          <h2 style={{ fontSize: '1.8rem', fontWeight: 900, fontFamily: '"Manrope", sans-serif', margin: 0, letterSpacing: '-0.02em' }}>New & Trending <span style={{ color: 'var(--text-muted)', fontSize: '1rem', fontWeight: 500, fontFamily: '"Inter", sans-serif', marginLeft: '0.5rem' }}>(Latest Tools)</span></h2>
                        </div>
                      </div>
                      <div className="tools-grid">
                        {communicationTools.filter(t => ['json-formatter', 'unit-converter', 'password-generator'].includes(t.id)).map(tool => (
                          <ToolCard key={tool.path} tool={tool} />
                        ))}
                      </div>
                    </section>
                  )}

                  {/* Math Tools Category */}
                  {!isSearching && (
                    <section style={{ marginBottom: '6rem', position: 'relative' }}>
                      <div style={{
                        position: 'sticky',
                        top: '80px',
                        zIndex: 10,
                        background: 'rgba(var(--bg-primary-rgb), 0.7)',
                        backdropFilter: 'blur(24px)',
                        WebkitBackdropFilter: 'blur(24px)',
                        padding: '1.5rem 0',
                        marginBottom: '3rem',
                        boxShadow: '0 4px 40px rgba(0, 0, 0, 0.05)',
                        borderBottom: '1px solid rgba(255,255,255,0.05)',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '1.2rem',
                        borderRadius: '0 0 24px 24px'
                      }}>
                        <div style={{ padding: '0.6rem', background: 'rgba(59, 130, 246, 0.1)', borderRadius: '12px', color: '#3b82f6' }}>
                          <Calculator size={24} />
                        </div>
                        <div>
                          <h2 style={{ fontSize: '1.8rem', fontWeight: 900, fontFamily: '"Manrope", sans-serif', margin: 0, letterSpacing: '-0.02em' }}>Advanced Mathematics <span style={{ color: 'var(--text-muted)', fontSize: '1rem', fontWeight: 500, fontFamily: '"Inter", sans-serif', marginLeft: '0.5rem' }}>({mathTools.length} Tools)</span></h2>
                        </div>
                      </div>
                      <div className="tools-grid">
                        {mathTools.map((tool) => (
                          <ToolCard
                            key={tool.path}
                            tool={tool}
                          />
                        ))}
                      </div>
                    </section>
                  )}
                  {/* Image Tools Category */}
                  {!isSearching && (
                    <section style={{ marginBottom: '6rem', position: 'relative' }}>
                      <div style={{
                        position: 'sticky',
                        top: '80px',
                        zIndex: 10,
                        background: 'rgba(var(--bg-primary-rgb), 0.7)',
                        backdropFilter: 'blur(24px)',
                        WebkitBackdropFilter: 'blur(24px)',
                        padding: '1.5rem 0',
                        marginBottom: '3rem',
                        boxShadow: '0 4px 40px rgba(0, 0, 0, 0.05)',
                        borderBottom: '1px solid rgba(255,255,255,0.05)',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '1.2rem',
                        borderRadius: '0 0 24px 24px'
                      }}>
                        <div style={{ padding: '0.6rem', background: 'rgba(59, 130, 246, 0.1)', borderRadius: '12px', color: '#3b82f6' }}>
                          <Image size={24} />
                        </div>
                        <div>
                          <h2 style={{ fontSize: '1.8rem', fontWeight: 900, fontFamily: '"Manrope", sans-serif', margin: 0, letterSpacing: '-0.02em' }}>Image Processing <span style={{ color: 'var(--text-muted)', fontSize: '1rem', fontWeight: 500, fontFamily: '"Inter", sans-serif', marginLeft: '0.5rem' }}>({imageTools.length} Tools)</span></h2>
                        </div>
                      </div>
                      <div className="tools-grid">
                        {imageTools.map((tool) => (
                          <ToolCard
                            key={tool.path}
                            tool={tool}
                          />
                        ))}
                      </div>
                    </section>
                  )}

                  {/* PDF Tools Category */}
                  {!isSearching && (
                    <section style={{ marginBottom: '6rem', position: 'relative' }}>
                      <div style={{
                        position: 'sticky',
                        top: '80px',
                        zIndex: 10,
                        background: 'rgba(var(--bg-primary-rgb), 0.7)',
                        backdropFilter: 'blur(24px)',
                        WebkitBackdropFilter: 'blur(24px)',
                        padding: '1.5rem 0',
                        marginBottom: '3rem',
                        boxShadow: '0 4px 40px rgba(0, 0, 0, 0.05)',
                        borderBottom: '1px solid rgba(255,255,255,0.05)',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '1.2rem',
                        borderRadius: '0 0 24px 24px'
                      }}>
                        <div style={{ padding: '0.6rem', background: 'rgba(239, 68, 68, 0.1)', borderRadius: '12px', color: '#ef4444' }}>
                          <FileText size={24} />
                        </div>
                        <div>
                          <h2 style={{ fontSize: '1.8rem', fontWeight: 900, fontFamily: '"Manrope", sans-serif', margin: 0, letterSpacing: '-0.02em' }}>PDF Management <span style={{ color: 'var(--text-muted)', fontSize: '1rem', fontWeight: 500, fontFamily: '"Inter", sans-serif', marginLeft: '0.5rem' }}>({pdfTools.length} Tools)</span></h2>
                        </div>
                      </div>
                      <div className="tools-grid">
                        {pdfTools.map((tool) => (
                          <ToolCard key={tool.path} tool={tool} />
                        ))}
                      </div>
                    </section>
                  )}

                  {/* Utility Tools Category */}
                  {!isSearching && (
                    <section style={{ marginBottom: '6rem', position: 'relative' }}>
                      <div style={{
                        position: 'sticky',
                        top: '80px',
                        zIndex: 10,
                        background: 'rgba(var(--bg-primary-rgb), 0.7)',
                        backdropFilter: 'blur(24px)',
                        WebkitBackdropFilter: 'blur(24px)',
                        padding: '1.5rem 0',
                        marginBottom: '3rem',
                        boxShadow: '0 4px 40px rgba(0, 0, 0, 0.05)',
                        borderBottom: '1px solid rgba(255,255,255,0.05)',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '1.2rem',
                        borderRadius: '0 0 24px 24px'
                      }}>
                        <div style={{ padding: '0.6rem', background: 'rgba(16, 185, 129, 0.1)', borderRadius: '12px', color: '#10b981' }}>
                          <Zap size={24} />
                        </div>
                        <div>
                          <h2 style={{ fontSize: '1.8rem', fontWeight: 900, fontFamily: '"Manrope", sans-serif', margin: 0, letterSpacing: '-0.02em' }}>Professional Utilities <span style={{ color: 'var(--text-muted)', fontSize: '1rem', fontWeight: 500, fontFamily: '"Inter", sans-serif', marginLeft: '0.5rem' }}>({communicationTools.length} Tools)</span></h2>
                        </div>
                      </div>
                      <div className="tools-grid">
                        {communicationTools.map((tool) => (
                          <ToolCard
                            key={tool.path}
                            tool={tool}
                          />
                        ))}
                      </div>
                    </section>
                  )}

                  {/* AI Tools Category */}
                  {!isSearching && (
                    <section style={{ marginBottom: '6rem', position: 'relative' }}>
                      <div style={{
                        position: 'sticky',
                        top: '80px',
                        zIndex: 10,
                        background: 'rgba(var(--bg-primary-rgb), 0.7)',
                        backdropFilter: 'blur(24px)',
                        WebkitBackdropFilter: 'blur(24px)',
                        padding: '1.5rem 0',
                        marginBottom: '3rem',
                        boxShadow: '0 4px 40px rgba(0, 0, 0, 0.05)',
                        borderBottom: '1px solid rgba(255,255,255,0.05)',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '1.2rem',
                        borderRadius: '0 0 24px 24px'
                      }}>
                        <div style={{ padding: '0.6rem', background: 'rgba(139, 92, 246, 0.1)', borderRadius: '12px', color: '#8b5cf6' }}>
                          <Sparkles size={24} />
                        </div>
                        <div>
                          <h2 style={{ fontSize: '1.8rem', fontWeight: 900, fontFamily: '"Manrope", sans-serif', margin: 0, letterSpacing: '-0.02em' }}>Next-Gen AI <span style={{ color: 'var(--text-muted)', fontSize: '1rem', fontWeight: 500, fontFamily: '"Inter", sans-serif', marginLeft: '0.5rem' }}>({aiTools.length} Tools)</span></h2>
                        </div>
                      </div>
                      <div className="tools-grid">
                        {aiTools.map((tool) => (
                          <ToolCard
                            key={tool.path}
                            tool={tool}
                          />
                        ))}
                      </div>
                    </section>
                  )}

                  {/* Productivity Tools Category */}
                  {!isSearching && (
                    <section style={{ marginBottom: '6rem', position: 'relative' }}>
                      <div style={{
                        position: 'sticky',
                        top: '80px',
                        zIndex: 10,
                        background: 'rgba(var(--bg-primary-rgb), 0.7)',
                        backdropFilter: 'blur(24px)',
                        WebkitBackdropFilter: 'blur(24px)',
                        padding: '1.5rem 0',
                        marginBottom: '3rem',
                        boxShadow: '0 4px 40px rgba(0, 0, 0, 0.05)',
                        borderBottom: '1px solid rgba(255,255,255,0.05)',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '1.2rem',
                        borderRadius: '0 0 24px 24px'
                      }}>
                        <div style={{ padding: '0.6rem', background: 'rgba(107, 114, 128, 0.1)', borderRadius: '12px', color: '#6366f1' }}>
                          <FileText size={24} />
                        </div>
                        <div>
                          <h2 style={{ fontSize: '1.8rem', fontWeight: 900, fontFamily: '"Manrope", sans-serif', margin: 0, letterSpacing: '-0.02em' }}>Productivity Suite <span style={{ color: 'var(--text-muted)', fontSize: '1rem', fontWeight: 500, fontFamily: '"Inter", sans-serif', marginLeft: '0.5rem' }}>({productivityTools.length} Tools)</span></h2>
                        </div>
                      </div>
                      <div className="tools-grid">
                        {productivityTools.map((tool) => (
                          <ToolCard
                            key={tool.path}
                            tool={tool}
                          />
                        ))}
                      </div>
                    </section>
                  )}
                </>
              )}
            </div>

            <section className="container-pro" style={{
              marginTop: '4rem',
              marginBottom: '4rem',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              textAlign: 'center'
            }}>
              <h2 style={{ fontSize: '2.5rem', fontWeight: 900, fontFamily: '"Manrope", sans-serif', marginBottom: '1.5rem', letterSpacing: '-0.02em' }}>
                See PixTool in <span style={{ color: 'var(--accent-blue)' }}>Action</span>
              </h2>
              <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', maxWidth: '600px', marginBottom: '3rem' }}>
                Watch our quick 60-second tour showcasing the incredible speed and privacy of our 121+ professional browser tools.
              </p>
              
              <div style={{
                position: 'relative',
                width: '100%',
                maxWidth: '400px',
                borderRadius: '32px',
                overflow: 'hidden',
                boxShadow: '0 20px 80px rgba(139, 92, 246, 0.15)',
                border: '1px solid rgba(255,255,255,0.05)',
                aspectRatio: '9/16',
                background: 'var(--bg-secondary)'
              }}>
                <LazyYouTubeEmbed
                  videoId="fzIhPN-gv_E"
                  title="PixTool Productivity Suite Demo"
                  rounded="32px"
                />
              </div>
            </section>

            <div className="container-pro" style={{ 
                marginTop: 'clamp(2rem, 5vw, 4rem)', 
                padding: 'clamp(3rem, 5vw, 5rem) 2rem', 
                background: 'linear-gradient(180deg, rgba(247, 249, 251, 0.02) 0%, rgba(107, 56, 212, 0.02) 100%)', 
                borderRadius: '40px', 
                border: '1px solid rgba(255,255,255,0.05)',
                textAlign: 'left' 
              }}>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '4rem' }}>
                <div>
                  <h2 style={{ fontSize: '2rem', fontWeight: 900, fontFamily: '"Manrope", sans-serif', marginBottom: '1.5rem', letterSpacing: '-0.02em' }}>
                    <span style={{ color: 'var(--accent-blue)' }}>1.</span> Why Choose PixTool?
                  </h2>
                  <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8, fontSize: '1.05rem', fontFamily: '"Inter", sans-serif' }}>
                    Unlike other platforms that require you to upload your files to their servers,
                    PixTool processes almost everything <b style={{ color: 'var(--text-primary)' }}>locally in your browser</b>.
                    This means your sensitive images and PDFs never leave your device, ensuring
                    <b style={{ color: 'var(--text-primary)' }}> 100% privacy</b> and extreme speed. Whether you need to resize a photo
                    for social media or merge documents, PixTool has you covered with professional-grade results.
                  </p>
                </div>
                <div>
                  <h2 style={{ fontSize: '2rem', fontWeight: 900, fontFamily: '"Manrope", sans-serif', marginBottom: '1.5rem', letterSpacing: '-0.02em' }}>
                    <span style={{ color: '#8b5cf6' }}>2.</span> 100% Free Forever
                  </h2>
                  <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8, fontSize: '1.05rem', fontFamily: '"Inter", sans-serif' }}>
                    Our mission is to provide high-quality productivity tools without the high-end
                    subscription costs. There are no hidden fees, no credit cards, and no "Pro"
                    tiers that lock away essential features. Every tool on PixTool is completely
                    free — from our advanced image resizer to our scientific calculators.
                    Essential logic should be accessible to everyone.
                  </p>
                </div>
                <div>
                  <h2 style={{ fontSize: '2rem', fontWeight: 900, fontFamily: '"Manrope", sans-serif', marginBottom: '1.5rem', letterSpacing: '-0.02em' }}>
                    <span style={{ color: '#10b981' }}>3.</span> Zero Latency Speed
                  </h2>
                  <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8, fontSize: '1.05rem', fontFamily: '"Inter", sans-serif' }}>
                    Time is money. Our tools are optimized to be lightweight and infinitely fast.
                    Whether you're compiling code patterns or resizing a high-resolution 4K image,
                    you'll get results in milliseconds. No server queues. Our
                    browser-based processing engine leverages WebAssembly and Web Workers to deliver desktop-class performance directly in your tab.
                  </p>
                </div>
              </div>

              <div style={{ marginTop: '4rem', paddingTop: '4rem', borderTop: '1px solid var(--border-color)', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '2rem' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  <h3 style={{ fontWeight: 700, fontSize: '1.1rem' }}>Secure Processing</h3>
                  <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>Browser-based logic ensures your data stays on your machine. No server uploads ever.</p>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  <h3 style={{ fontWeight: 700, fontSize: '1.1rem' }}>No Registration</h3>
                  <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>Start using our tools immediately. No accounts, no emails, no tracking.</p>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  <h3 style={{ fontWeight: 700, fontSize: '1.1rem' }}>Cross-Platform</h3>
                  <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>Works perfectly on Mac, Windows, Linux, iOS, and Android. Any modern browser.</p>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  <h3 style={{ fontWeight: 700, fontSize: '1.1rem' }}>High Resolution</h3>
                  <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>We preserve the quality of your files during every operation. No compression artifacts.</p>
                </div>
              </div>
            </div>

            <Suspense fallback={<div style={{ minHeight: '400px', background: 'var(--bg-secondary)', borderRadius: '40px', margin: '2rem 0' }} />}>
              <div style={{ minHeight: '600px' }}><UseCaseSection /></div>
              <div style={{ minHeight: '800px' }}><FAQSection /></div>
              <div style={{ minHeight: '1200px' }}><TechnicalAuthority /></div>
              <div style={{ minHeight: '600px' }}><BlogSection posts={posts} /></div>
            </Suspense>
          </section>
        </div>
      </div>
      <style>{`
        .text-gradient-hero {
          background: linear-gradient(135deg, #6b38d4 0%, #8455ef 50%, #3b82f6 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-size: 200% auto;
          transition: all 0.5s cubic-bezier(0.16, 1, 0.3, 1);
          position: relative;
        }
        .text-gradient-hero::after {
          content: "";
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, transparent 0%, rgba(255, 255, 255, 0.1) 50%, transparent 100%);
          transform: translateX(-100%);
          animation: shim-flow 6s infinite;
          pointer-events: none;
        }
        @keyframes shim-flow {
          0% { transform: translateX(-100%); }
          50% { transform: translateX(100%); }
          100% { transform: translateX(-100%); }
        }
        .text-gradient-hero:hover {
          filter: drop-shadow(0 0 25px rgba(139, 92, 246, 0.5));
          transform: scale(1.03) translateY(-2px);
        }
        .search-input:focus {
          border-color: var(--accent-primary) !important;
          box-shadow: 0 0 0 4px rgba(139, 92, 246, 0.1) !important;
          background: var(--bg-card) !important;
        }
        .hero-search-suggestions-box {
          position: absolute;
          top: 105%;
          left: 0;
          right: 0;
          background: var(--bg-card);
          border: 1px solid var(--border-color);
          border-radius: 24px;
          box-shadow: var(--shadow-premium);
          z-index: 1000;
          padding: 0.75rem;
          max-height: 450px;
          overflow-y: auto;
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
        }
        @media (max-width: 768px) {
          .hero-main-title {
            font-size: 2.8rem !important;
          }
          .search-input {
            padding: 1.25rem 1.5rem 1.25rem 4rem !important;
            font-size: 1rem !important;
          }
          .hero-feature-tags {
            gap: 1rem !important;
            font-size: 0.75rem !important;
          }
        }
      `}</style>
    </>
  )
}
