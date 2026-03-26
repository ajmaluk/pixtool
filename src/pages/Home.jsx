import { useState, useEffect, lazy, Suspense } from 'react'
import { Link, useSearchParams, useNavigate } from 'react-router-dom'
// eslint-disable-next-line no-unused-vars
import { AnimatePresence, motion } from 'framer-motion'
import SEO from '../components/SEO'
import {
  Image, FileText,
  Shield, Wifi, Search, X, Zap, Lock,
  Navigation, Sparkles
} from 'lucide-react'
import ToolCard from '../components/ToolCard'
import OverallRatingBadge from '../components/OverallRatingBadge'
import { IMAGE_TOOLS, PDF_TOOLS, UTILITY_TOOLS, AI_TOOLS, MATH_TOOLS } from '../data/tools'
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
      setSearchTerm(q)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams])

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

  const allTools = [...imageTools, ...pdfTools, ...communicationTools, ...aiTools, ...mathTools]

  // Interleave tools from different categories to mix them one after one
  const mixedTools = [];
  const maxLen = Math.max(imageTools.length, pdfTools.length, communicationTools.length, aiTools.length, mathTools.length);
  for (let i = 0; i < maxLen; i++) {
    if (i < imageTools.length) mixedTools.push({ ...imageTools[i], typeLabel: 'Image Tool' });
    if (i < pdfTools.length) mixedTools.push({ ...pdfTools[i], typeLabel: 'PDF Tool' });
    if (i < communicationTools.length) mixedTools.push({ ...communicationTools[i], typeLabel: 'Utility' });
    if (i < aiTools.length) mixedTools.push({ ...aiTools[i], typeLabel: 'AI Tool' });
    if (i < mathTools.length) mixedTools.push({ ...mathTools[i], typeLabel: 'Math Tool' });
  }
  const filteredTools = allTools.filter(tool =>
    tool.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    tool.description.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const isSearching = searchTerm.trim().length > 0

  const homeFaqs = [
    {
      q: "Is PixTool really free?",
      a: "Yes, 100% free. Every tool on PixTool is available without any cost, subscription, or registration. We provide professional-grade productivity tools for everyone."
    },
    {
      q: "Are my files safe and private?",
      a: "Absolutely. PixTool processes your files entirely within your browser. Your images, PDFs, and data are never uploaded to any server, ensuring 100% privacy and security."
    },
    {
      q: "What image tools are available?",
      a: "Our suite includes Resize, Crop, Rotate, Compress, Convert Format (JPEG/PNG/WebP/GIF), Watermark, Flip, and Grayscale effects. All work locally in your browser."
    },
    {
      q: "Can I merge, split, and compress PDFs?",
      a: "Yes! We offer tools to Merge, Split, Compress, Convert PDF to Image, Password Protect, Watermark, and Reorder PDF pages — all without uploading your files."
    },
    {
      q: "What professional utilities does PixTool offer?",
      a: "Beyond image and PDF tools, we provide a JSON Formatter & Validator, Unit Converter, Password Generator, QR tools, and more — all designed for professional speed and 100% privacy."
    },
    {
      q: "What are the AI tools?",
      a: "Our newest suite includes advanced AI tools: generate entire blogs, rewrite paragraphs, summarize long text, generate marketing ad copies, code faster, and even chat with a powerful AI directly from PixTool."
    },
    {
      q: "What mathematics tools are available?",
      a: "PixTool offers 11 advanced scientific and mathematical tools, including a Scientific Calculator, Graph Visualizer, Matrix Solver, Statistics Visualizer, Financial Architect, and more — all processed locally for privacy."
    }
  ]

  const homeSchema = [
    {
      "@context": "https://schema.org",
      "@type": "ItemList",
      "name": "Free Online Tools",
      "description": "Complete list of free online tools available at PixTool",
      "url": `${import.meta.env.VITE_SITE_URL || 'https://www.pixtool.in'}/sitemap`,
      "itemListElement": mixedTools.map((t, idx) => ({
        "@type": "ListItem",
        "position": idx + 1,
        "name": t.title,
        "url": `${import.meta.env.VITE_SITE_URL || 'https://www.pixtool.in'}${t.path}`,
        "description": t.description
      }))
    }
  ]

  return (
    <>
      <SEO
        title="PixTool - Master Your AI Workflow with Free Online Tools | 100% Private"
        description="Unlock 63+ free online tools. PixTool is the ultimate AI productivity suite for content generation, scientific mathematics, PDF management, and image editing. No upload needed, 100% browser-based security."
        keywords="free online ai suite, secure pdf tools, private image editor, scientific calculator online, academic math tools, ai content writer free, master ai workflow, browser-native productivity, 2026 ai tools"
        path="/"
        schema={homeSchema}
        faqs={homeFaqs}
        breadcrumbs={[
          { name: 'Professional Tools', item: '/' }
        ]}
      />
      <div className="landing-layout" style={{ position: 'relative', overflow: 'hidden' }}>
        {/* Modern Tech Glow Accents */}
        <div style={{
          position: 'absolute',
          top: '-10%',
          left: '-10%',
          width: '50vw',
          height: '50vw',
          background: 'radial-gradient(circle, rgba(168, 85, 247, 0.12) 0%, transparent 60%)',
          borderRadius: '50%',
          filter: 'blur(80px)',
          zIndex: -1,
          pointerEvents: 'none'
        }} />
        <div style={{
          position: 'absolute',
          top: '20%',
          right: '-5%',
          width: '40vw',
          height: '40vw',
          background: 'radial-gradient(circle, rgba(239, 68, 68, 0.08) 0%, transparent 60%)',
          borderRadius: '50%',
          filter: 'blur(80px)',
          zIndex: -1,
          pointerEvents: 'none'
        }} />
        <div className="landing-center">

          <div className="category-hub">
            <div className="hub-hero" style={{
              textAlign: 'center',
              padding: 'clamp(4rem, 10vh, 7rem) 1.5rem clamp(1.5rem, 8vh, 3rem)',
              marginBottom: 'clamp(4rem, 8vw, 6rem)',
              position: 'relative',
              minHeight: '400px'
            }}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                <div className="status-badge" style={{ margin: '0 auto 2rem' }}>
                  <span style={{ marginRight: '8px' }}>🚀</span> 2026 AI Innovation Suite
                </div>
                <h1 style={{ 
                  fontSize: 'clamp(2.5rem, 8vw, 4.8rem)', 
                  fontWeight: 900, 
                  fontFamily: '"Manrope", sans-serif',
                  marginBottom: '1.5rem', 
                  letterSpacing: '-0.06em', 
                  lineHeight: 0.95,
                  position: 'relative',
                  display: 'inline-block'
                }}>
                  Master Your <br/>
                  <span className="text-gradient-hero" style={{ 
                    display: 'inline-block',
                    padding: '0.1em 0',
                    position: 'relative'
                  }}>
                    AI Workflow
                  </span>
                  <motion.div
                    animate={{ 
                      scale: [1, 1.2, 1],
                      opacity: [0.3, 0.6, 0.3],
                    }}
                    transition={{ duration: 4, repeat: Infinity }}
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
                <p style={{ fontSize: '1.15rem', color: 'var(--text-secondary)', maxWidth: '800px', margin: '0 auto 3.5rem', lineHeight: 1.6, fontWeight: 500 }}>
                  The world's most powerful browser-native AI suite. 52+ professional tools for 
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

                <div className="search-container" style={{ 
                  boxShadow: '0 24px 64px rgba(107, 56, 212, 0.15)', 
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  background: 'rgba(255, 255, 255, 0.05)',
                  backdropFilter: 'blur(20px)',
                  WebkitBackdropFilter: 'blur(20px)',
                  borderRadius: '2rem',
                  maxWidth: '700px',
                  margin: '0 auto',
                  height: '72px'
                }}>
                  <div className="search-icon-wrapper" style={{ left: '24px', opacity: 0.7 }}>
                    <Search size={28} />
                  </div>
                  <input
                    type="text"
                    className="search-input"
                    placeholder="Search 63+ professional tools..."
                    value={searchTerm}
                    onChange={handleSearchChange}
                    onKeyDown={handleKeyDown}
                    onFocus={() => setShowSuggestions(searchTerm.length > 0)}
                    style={{ 
                      fontSize: '1.25rem', 
                      height: '100%', 
                      paddingLeft: '4rem',
                      fontFamily: '"Inter", sans-serif',
                      fontWeight: 500
                    }}
                  />
                  {searchTerm && (
                    <button
                      onClick={() => { setSearchTerm(''); setSearchParams({}); setShowSuggestions(false); }}
                      style={{ position: 'absolute', right: '1.5rem', top: '50%', transform: 'translateY(-50%)', border: 'none', background: 'var(--bg-secondary)', color: 'var(--text-muted)', cursor: 'pointer', padding: '0.5rem', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                    >
                      <X size={18} />
                    </button>
                  )}

                  <AnimatePresence>
                    {showSuggestions && filteredTools.length > 0 && (
                      <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.98 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.98 }}
                        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                        style={{
                          position: 'absolute',
                          top: '120%',
                          left: '0',
                          right: '0',
                          background: 'var(--bg-glass)',
                          backdropFilter: 'blur(30px)',
                          WebkitBackdropFilter: 'blur(30px)',
                          borderRadius: '32px',
                          border: '1px solid var(--border-color)',
                          boxShadow: '0 30px 60px rgba(0,0,0,0.15)',
                          overflow: 'hidden',
                          zIndex: 2000,
                          textAlign: 'left',
                          padding: '0.75rem'
                        }}
                      >
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
                              <tool.icon size={20} />
                            </div>
                            <div style={{ flex: 1 }}>
                              <div style={{ fontWeight: 800, fontSize: '1rem', color: 'var(--text-primary)' }}>{tool.title}</div>
                              <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginTop: '2px', opacity: 0.8 }}>{tool.description.substring(0, 60)}...</div>
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
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '1.5rem', opacity: 0.7, marginTop: 'clamp(1.5rem, 5vw, 3rem)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 600, color: 'var(--text-secondary)' }}>
                    <Shield size={18} style={{ color: 'var(--accent-green)' }} /> 100% Private
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 600, color: 'var(--text-secondary)' }}>
                    <Zap size={18} style={{ color: 'var(--accent-orange)' }} /> Instant
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 600, color: 'var(--text-secondary)' }}>
                    <Lock size={18} style={{ color: 'var(--accent-purple)' }} /> Secure
                  </div>
                </div>
              </motion.div>
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
                </>
              )}
            </div>

            <div className="container-pro" style={{ 
                marginTop: 'clamp(4rem, 10vw, 8rem)', 
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
      `}</style>
    </>
  )
}
