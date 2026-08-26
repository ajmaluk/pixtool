import { useState, useEffect, useRef, lazy, Suspense } from 'react'
import { Link, useSearchParams, useNavigate } from 'react-router-dom'
import SEO from '../components/SEO'
import {
  Image as ImageIcon, FileText, Shield, Search, X, Zap,
  Sparkles, Calculator, ArrowRight, Layers, Cpu,
  ChevronLeft, ChevronRight
} from 'lucide-react'
import ToolCard from '../components/ToolCard'
import OverallRatingBadge from '../components/OverallRatingBadge'
import LazyYouTubeEmbed from '../components/LazyYouTubeEmbed'
import { SITE_URL } from '../config/app.config'
import { IMAGE_TOOLS, PDF_TOOLS, UTILITY_TOOLS, AI_TOOLS, MATH_TOOLS, PRODUCTIVITY_TOOLS } from '../data/tools'
import { GLOBAL_FAQS } from '../data/faqs'
import { motion } from 'framer-motion'
import ScrollReveal from '../components/ScrollReveal'
import CategorySection from '../components/CategorySection'
import { SectionSkeleton } from '../components/Skeleton'

// Lazy Load subsections for performance
const BlogSection = lazy(() => import('../components/BlogSection'))
const UseCaseSection = lazy(() => import('../components/UseCaseSection'))
const FAQSection = lazy(() => import('../components/FAQSection'))
const TechnicalAuthority = lazy(() => import('../components/TechnicalAuthority'))

const imageTools = IMAGE_TOOLS.filter(t => !t.status)
const pdfTools = PDF_TOOLS.filter(t => !t.status)
const communicationTools = UTILITY_TOOLS
const aiTools = AI_TOOLS.filter(t => !t.status)
const mathTools = MATH_TOOLS.filter(t => !t.status)
const productivityTools = PRODUCTIVITY_TOOLS

const categoryConfig = [
  {
    key: 'new-trending',
    icon: Sparkles,
    iconBg: 'rgba(168, 85, 247, 0.12)',
    iconColor: '#c084fc',
    title: 'New & Trending',
    subtitle: '(Latest Tools)',
    tools: communicationTools.filter(t => ['json-formatter', 'unit-converter', 'password-generator'].includes(t.id)),
    initialCount: 3,
  },
  {
    key: 'ai',
    icon: Sparkles,
    iconBg: 'rgba(139, 92, 246, 0.12)',
    iconColor: '#a78bfa',
    title: 'Next-Gen AI Studio',
    subtitle: `(${aiTools.length} Tools)`,
    tools: aiTools,
    hasShowMore: true,
  },
  {
    key: 'pdf',
    icon: FileText,
    iconBg: 'rgba(239, 68, 68, 0.12)',
    iconColor: '#f87171',
    title: 'PDF Management Suite',
    subtitle: `(${pdfTools.length} Tools)`,
    tools: pdfTools,
    hasShowMore: true,
  },
  {
    key: 'image',
    icon: ImageIcon,
    iconBg: 'rgba(59, 130, 246, 0.12)',
    iconColor: '#60a5fa',
    title: 'Image Processing Lab',
    subtitle: `(${imageTools.length} Tools)`,
    tools: imageTools,
    hasShowMore: true,
  },
  {
    key: 'utility',
    icon: Zap,
    iconBg: 'rgba(16, 185, 129, 0.12)',
    iconColor: '#34d399',
    title: 'Developer & Daily Utilities',
    subtitle: `(${communicationTools.length} Tools)`,
    tools: communicationTools,
    initialCount: communicationTools.length,
  },
  {
    key: 'math',
    icon: Calculator,
    iconBg: 'rgba(245, 158, 11, 0.12)',
    iconColor: '#fbbf24',
    title: 'Advanced Mathematics',
    subtitle: `(${mathTools.length} Tools)`,
    tools: mathTools,
    initialCount: mathTools.length,
  },
  {
    key: 'productivity',
    icon: Layers,
    iconBg: 'rgba(99, 102, 241, 0.12)',
    iconColor: '#818cf8',
    title: 'Productivity Suite',
    subtitle: `(${productivityTools.length} Tools)`,
    tools: productivityTools,
    initialCount: productivityTools.length,
  },
]

export default function Home() {
  const [searchParams, setSearchParams] = useSearchParams()
  const navigate = useNavigate()
  const initialSearch = searchParams.get('q') || ''
  const [searchTerm, setSearchTerm] = useState(initialSearch)
  const [activeCategoryFilter, setActiveCategoryFilter] = useState('all')
  const [showSuggestions, setShowSuggestions] = useState(false)
  const [selectedIndex, setSelectedIndex] = useState(-1)
  const [showAllImageTools, setShowAllImageTools] = useState(false)
  const [showAllPdfTools, setShowAllPdfTools] = useState(false)
  const [showAllAiTools, setShowAllAiTools] = useState(false)
  const [toolCount, setToolCount] = useState(121)

  const categoryScrollRef = useRef(null)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(true)

  const checkCategoryScroll = () => {
    if (categoryScrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = categoryScrollRef.current
      setCanScrollLeft(scrollLeft > 4)
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 4)
    }
  }

  useEffect(() => {
    if (categoryScrollRef.current) {
      categoryScrollRef.current.scrollLeft = 0
    }
    checkCategoryScroll()
    const el = categoryScrollRef.current
    if (el) {
      el.addEventListener('scroll', checkCategoryScroll)
      window.addEventListener('resize', checkCategoryScroll)
      return () => {
        el.removeEventListener('scroll', checkCategoryScroll)
        window.removeEventListener('resize', checkCategoryScroll)
      }
    }
  }, [])

  const handleScrollCategories = (direction) => {
    if (categoryScrollRef.current) {
      const scrollAmount = direction === 'left' ? -220 : 220
      categoryScrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' })
      setTimeout(checkCategoryScroll, 300)
    }
  }

  useEffect(() => {
    setToolCount(imageTools.length + pdfTools.length + communicationTools.length + aiTools.length + mathTools.length + productivityTools.length)
  }, [])

  useEffect(() => {
    const q = searchParams.get('q') || ''
    if (q !== searchTerm) {
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
    ...aiTools.map(t => ({ ...t, typeLabel: 'AI Studio', categoryTag: 'ai' })),
    ...pdfTools.map(t => ({ ...t, typeLabel: 'PDF Suite', categoryTag: 'pdf' })),
    ...imageTools.map(t => ({ ...t, typeLabel: 'Image Lab', categoryTag: 'image' })),
    ...communicationTools.map(t => ({ ...t, typeLabel: 'Utility', categoryTag: 'utility' })),
    ...mathTools.map(t => ({ ...t, typeLabel: 'Math Hub', categoryTag: 'math' })),
    ...productivityTools.map(t => ({ ...t, typeLabel: 'Productivity', categoryTag: 'productivity' }))
  ]

  const filteredTools = allTools.filter(tool => {
    const matchesSearch = tool.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tool.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCat = activeCategoryFilter === 'all' || tool.categoryTag === activeCategoryFilter
    return matchesSearch && matchesCat
  })

  const isSearching = searchTerm.trim().length > 0

  const homeFaqs = GLOBAL_FAQS

  const homeSchema = [
    {
      "@context": "https://schema.org",
      "@type": "ItemList",
      "name": "Free Online AI & Productivity Tools",
      "description": "Complete list of free online developer and creative tools available at PixTool",
      "url": `${SITE_URL}/`,
      "itemListElement": allTools.map((t, idx) => ({
        "@type": "ListItem",
        "position": idx + 1,
        "name": t.title,
        "url": `${SITE_URL}${t.path}`,
      }))
    }
  ]

  const showMoreMap = {
    'Image Processing Lab': showAllImageTools,
    'PDF Management Suite': showAllPdfTools,
    'Next-Gen AI Studio': showAllAiTools,
  }

  const toggleMap = {
    'Image Processing Lab': () => setShowAllImageTools(!showAllImageTools),
    'PDF Management Suite': () => setShowAllPdfTools(!showAllPdfTools),
    'Next-Gen AI Studio': () => setShowAllAiTools(!showAllAiTools),
  }

  const spotlightFeatures = [
    {
      title: 'AI Creation Studio',
      desc: 'Prompt-to-website, text chat, AI resume builder, and multi-language code generation.',
      path: '/ai-tools',
      badge: 'Next-Gen AI',
      color: '#c084fc',
      icon: Sparkles
    },
    {
      title: 'PDF Master Suite',
      desc: 'Merge, split, compress, watermark, and rotate PDF documents 100% locally in your browser.',
      path: '/pdf-tools',
      badge: 'Zero Uploads',
      color: '#f87171',
      icon: FileText
    },
    {
      title: 'Image Processing Lab',
      desc: 'AI background remover, WebP/PNG converter, lossless compression, and steganography.',
      path: '/image-tools',
      badge: 'Client-Side Canvas',
      color: '#60a5fa',
      icon: ImageIcon
    },
    {
      title: 'Developer Utilities',
      desc: 'Disposable Temp Mail with live inbox, QR Studio, Password Generator, and Kanban Board.',
      path: '/utility-tools',
      badge: 'Instant Tools',
      color: '#34d399',
      icon: Zap
    }
  ]

  return (
    <>
      <SEO
        title="PixTool — 120+ Free Private AI, Image & PDF Tools"
        description="Access 120+ free online tools for AI writing, PDF editing, image processing, and developer utilities. 100% private, browser-based, and zero cloud uploads required."
        keywords="pixtool, free online tools, privacy-first tools, browser based tools, free ai tools, pdf editor online, image resizer, qr code generator, temp mail, 10 minute mail, secure utilities"
        path="/"
        schema={homeSchema}
        faqs={homeFaqs}
        breadcrumbs={[
          { name: 'Professional Tools', item: '/' }
        ]}
      />
      <div className="landing-layout">
        <div className="landing-center">
          <div className="category-hub">
            <div className="hero-hub-container">
              <motion.div
                className="hero-content-wrapper"
                initial={{ opacity: 0, y: 25 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              >
                {/* Status Pill */}
                <motion.div
                  className="hero-status-badge"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, delay: 0.1 }}
                >
                  <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#818cf8', display: 'inline-block', boxShadow: '0 0 8px #818cf8' }} />
                  <span>100% Client-Side Privacy • 120+ Free Tools</span>
                </motion.div>

                {/* Main Headline */}
                <h1 className="hero-main-title">
                  All Your Digital Tools. <br />
                  <span className="text-gradient-hero">
                    Zero Cloud Uploads.
                  </span>
                </h1>

                {/* Subtitle with clean phrasing */}
                <motion.p
                  className="hero-text-description"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  The high-performance, private workspace for PDF manipulation, image processing, AI creation, and developer utilities — executed <strong style={{ color: 'var(--text-primary)', fontWeight: 700 }}>100% locally in your browser memory</strong>.
                </motion.p>

                {/* Trust Badges */}
                <div className="hero-trust-badges">
                  <span className="hero-trust-pill">
                    <Shield size={13} style={{ color: '#34d399' }} />
                    <span>100% On-Device Privacy</span>
                  </span>
                  <span className="hero-trust-pill">
                    <Cpu size={13} style={{ color: '#38bdf8' }} />
                    <span>Zero Cloud Uploads</span>
                  </span>
                  <span className="hero-trust-pill">
                    <Zap size={13} style={{ color: '#fbbf24' }} />
                    <span>Instant WASM Speed</span>
                  </span>
                  <span className="hero-trust-pill">
                    <Sparkles size={13} style={{ color: '#c084fc' }} />
                    <span>Free Forever</span>
                  </span>
                </div>

                {/* Rating Badge */}
                <motion.div
                  style={{ marginTop: '1.5rem', marginBottom: '1.5rem' }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.4, delay: 0.3 }}
                >
                  <OverallRatingBadge />
                </motion.div>

                {/* Interactive Search Bar */}
                <motion.div
                  className="search-container hero-search-wrapper"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.35 }}
                >
                  <div className="search-icon-wrapper">
                    <Search size={20} style={{ color: 'var(--accent-primary)' }} aria-hidden="true" />
                  </div>
                  <input
                    type="text"
                    className="search-input"
                    placeholder={`Search ${toolCount}+ private tools (e.g. 'Merge PDF', 'Background Remover')...`}
                    value={searchTerm}
                    onChange={handleSearchChange}
                    onKeyDown={handleKeyDown}
                    onFocus={() => setShowSuggestions(searchTerm.length > 0)}
                    aria-label="Search across all professional tools"
                  />
                  <div style={{ position: 'absolute', right: '1.25rem', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none', display: 'flex', alignItems: 'center' }}>
                    <kbd style={{ padding: '0.15rem 0.5rem', fontSize: '0.72rem', fontWeight: 800, color: 'var(--text-muted)', background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: '6px', letterSpacing: '0.05em' }}>⌘K</kbd>
                  </div>
                  {searchTerm && (
                    <button
                      onClick={() => { setSearchTerm(''); setSearchParams({}); setShowSuggestions(false); }}
                      style={{ position: 'absolute', right: '3.5rem', top: '50%', transform: 'translateY(-50%)', border: 'none', background: 'rgba(255,255,255,0.1)', color: 'var(--text-muted)', cursor: 'pointer', padding: '0.35rem', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                    >
                      <X size={14} />
                    </button>
                  )}

                  {/* Suggestions dropdown */}
                  {showSuggestions && filteredTools.length > 0 && (
                    <div className="hero-search-suggestions-box">
                      <div style={{ padding: '0.5rem 1rem', fontSize: '0.72rem', fontWeight: 800, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                        Matching Tools ({filteredTools.length})
                      </div>
                      {filteredTools.slice(0, 6).map((tool, index) => (
                        <Link
                          key={tool.path}
                          to={tool.path}
                          onClick={() => setShowSuggestions(false)}
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '1rem',
                            padding: '0.75rem 1rem',
                            textDecoration: 'none',
                            color: 'var(--text-primary)',
                            transition: 'all 0.2s ease',
                            background: selectedIndex === index ? 'rgba(99, 102, 241, 0.12)' : 'transparent',
                            borderRadius: '14px',
                            margin: '2px 0'
                          }}
                          onMouseEnter={() => setSelectedIndex(index)}
                        >
                          <div style={{
                            width: '38px',
                            height: '38px',
                            borderRadius: '10px',
                            background: 'rgba(255, 255, 255, 0.05)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: tool.color || 'var(--accent-primary)',
                          }}>
                            {tool.icon && <tool.icon size={18} />}
                          </div>
                          <div style={{ flex: 1 }}>
                            <div style={{ fontWeight: 700, fontSize: '0.95rem', color: 'var(--text-primary)' }}>{tool.title}</div>
                            <div style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', marginTop: '1px', opacity: 0.8 }}>
                              {tool.description ? `${tool.description.substring(0, 65)}...` : ''}
                            </div>
                          </div>
                          <div style={{ color: 'var(--accent-primary)', fontSize: '1rem', fontWeight: 700 }}>→</div>
                        </Link>
                      ))}
                    </div>
                  )}
                </motion.div>

                {/* Quick Trending Searches */}
                <div className="hero-popular-searches">
                  <span className="hero-popular-label">Popular:</span>
                  {[
                    { label: 'Merge PDF', path: '/pdf-tools/merge' },
                    { label: 'Background Remover', path: '/image-tools/remove-background' },
                    { label: 'Temp Mail', path: '/temp-mail' },
                    { label: 'QR Generator', path: '/qr-generator' },
                    { label: 'AI Chat', path: '/ai-tools/chat' },
                    { label: 'Compress Image', path: '/image-tools/compress' }
                  ].map((p, i, arr) => (
                    <span key={i} style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem' }}>
                      <Link
                        to={p.path}
                        className="hero-popular-link"
                      >
                        {p.label}
                      </Link>
                      {i < arr.length - 1 && <span className="hero-popular-dot">•</span>}
                    </span>
                  ))}
                </div>

                {/* Quick Category Filter Horizontal Carousel with < and > buttons */}
                <div className="hero-category-carousel-wrapper">
                  <button
                    type="button"
                    onClick={() => handleScrollCategories('left')}
                    className={`hero-cat-nav-btn hero-cat-nav-prev ${!canScrollLeft ? 'disabled' : ''}`}
                    aria-label="Previous categories"
                    title="Scroll left"
                  >
                    <ChevronLeft size={16} />
                  </button>

                  <div 
                    ref={categoryScrollRef}
                    className="hero-category-pills"
                  >
                    {[
                      { id: 'all', name: 'All Tools', count: toolCount },
                      { id: 'ai', name: 'AI Studio', count: aiTools.length },
                      { id: 'pdf', name: 'PDF Suite', count: pdfTools.length },
                      { id: 'image', name: 'Image Lab', count: imageTools.length },
                      { id: 'utility', name: 'Utilities', count: communicationTools.length },
                      { id: 'math', name: 'Math', count: mathTools.length },
                      { id: 'productivity', name: 'Productivity', count: productivityTools.length },
                    ].map((cat) => (
                      <button
                        key={cat.id}
                        onClick={() => setActiveCategoryFilter(cat.id)}
                        className={`hero-cat-pill ${activeCategoryFilter === cat.id ? 'active' : ''}`}
                      >
                        <span>{cat.name}</span>
                        <span className="hero-cat-count">{cat.count}</span>
                      </button>
                    ))}
                  </div>

                  <button
                    type="button"
                    onClick={() => handleScrollCategories('right')}
                    className={`hero-cat-nav-btn hero-cat-nav-next ${!canScrollRight ? 'disabled' : ''}`}
                    aria-label="Next categories"
                    title="Scroll right"
                  >
                    <ChevronRight size={16} />
                  </button>
                </div>
              </motion.div>
            </div>
          </div>

          {/* Spotlight Bento Grid */}
          {!isSearching && activeCategoryFilter === 'all' && (
            <div className="container-pro hero-spotlight-section">
              <div className="hero-spotlight-header">
                <span className="hero-spotlight-eyebrow">
                  Core Innovation Hubs
                </span>
                <h2 className="hero-spotlight-title">
                  Premier Creation & Developer Suites
                </h2>
              </div>

              <div className="hero-spotlight-grid">
                {spotlightFeatures.map((feat, i) => (
                  <Link
                    key={i}
                    to={feat.path}
                    className="hero-spotlight-card"
                  >
                    <div>
                      <div className="hero-spotlight-top">
                        <div
                          className="hero-spotlight-icon-box"
                          style={{ background: `${feat.color}18`, color: feat.color }}
                        >
                          <feat.icon size={24} />
                        </div>
                        <span
                          className="hero-spotlight-badge"
                          style={{
                            background: `${feat.color}12`,
                            color: feat.color,
                            borderColor: `${feat.color}35`
                          }}
                        >
                          {feat.badge}
                        </span>
                      </div>
                      <h3 className="hero-spotlight-name">
                        {feat.title}
                      </h3>
                      <p className="hero-spotlight-desc">
                        {feat.desc}
                      </p>
                    </div>

                    <div className="hero-spotlight-cta">
                      <span>Explore Suite</span>
                      <ArrowRight size={14} />
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Tools Grid / Category Sections */}
          <section className="content-section" style={{ paddingBottom: 'clamp(4rem, 8vw, 8rem)' }}>
            <div className="container-pro">
              {isSearching || activeCategoryFilter !== 'all' ? (
                <div className="search-results" style={{ minHeight: '50vh' }}>
                  <div className="section-header" style={{ marginBottom: '2.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'var(--bg-secondary)', padding: '1.25rem 1.5rem', borderRadius: '20px', border: '1px solid var(--border-color)' }}>
                    <div>
                      <h2 style={{ fontSize: '1.6rem', fontWeight: 900, marginBottom: '0.25rem' }}>
                        {isSearching ? `Search Results for "${searchTerm}"` : `Category: ${activeCategoryFilter.toUpperCase()}`}
                      </h2>
                      <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>Showing {filteredTools.length} matching tools</p>
                    </div>
                    <button
                      className="btn btn-secondary"
                      onClick={() => { setSearchTerm(''); setSearchParams({}); setActiveCategoryFilter('all'); }}
                      style={{ borderRadius: '12px', padding: '0.5rem 1.2rem', fontSize: '0.85rem' }}
                    >
                      Reset View
                    </button>
                  </div>
                  {filteredTools.length > 0 ? (
                    <div className="tools-grid">
                      {filteredTools.map((tool, index) => (
                        <ToolCard key={tool.path} tool={tool} index={index} />
                      ))}
                    </div>
                  ) : (
                    <div className="no-results" style={{ textAlign: 'center', padding: '5rem 2rem', background: 'var(--bg-secondary)', borderRadius: '28px', border: '2px dashed var(--border-color)' }}>
                      <div style={{ marginBottom: '1.5rem', color: 'var(--text-muted)' }}><Search size={64} style={{ opacity: 0.2 }} /></div>
                      <h3 style={{ fontSize: '1.8rem', fontWeight: 900, marginBottom: '0.75rem' }}>No tools matched your criteria</h3>
                      <p style={{ color: 'var(--text-secondary)', fontSize: '1rem', maxWidth: '480px', margin: '0 auto' }}>
                        Try searching for a different keyword or reset filters to view all {toolCount} tools.
                      </p>
                      <button className="btn btn-primary" style={{ marginTop: '2rem', padding: '0.85rem 2rem' }} onClick={() => { setSearchTerm(''); setSearchParams({}); setActiveCategoryFilter('all'); }}>
                        Explore All {toolCount} Tools
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <>
                  {categoryConfig.map((cat) => {
                    const sectionShowMore = showMoreMap[cat.title]
                    const sectionToggle = toggleMap[cat.title]
                    return (
                      <CategorySection
                        key={cat.key}
                        icon={cat.icon}
                        iconBg={cat.iconBg}
                        iconColor={cat.iconColor}
                        title={cat.title}
                        subtitle={cat.subtitle}
                        tools={cat.tools}
                        initialCount={cat.initialCount}
                        showMore={sectionShowMore}
                        onToggleShowMore={sectionToggle}
                      />
                    )
                  })}
                </>
              )}
            </div>

            {/* Privacy Mission Statement */}
            <ScrollReveal direction="up" delay={0.1}>
              <section className="mission-block-premium" style={{
                padding: '4rem 0',
                borderBottom: '1px solid var(--border-color)',
                background: 'rgba(255,255,255,0.01)'
              }}>
                <div className="container-pro">
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '4rem', alignItems: 'center' }}>
                    <div>
                      <h2 style={{ fontSize: '2.4rem', fontWeight: 900, marginBottom: '1.5rem', lineHeight: 1.15, letterSpacing: '-0.02em' }}>
                        The <span style={{ color: 'var(--accent-primary)' }}>PixTool</span> Privacy Paradigm
                      </h2>
                      <div style={{ color: 'var(--text-secondary)', fontSize: '1rem', lineHeight: 1.8 }}>
                        <p style={{ marginBottom: '1.25rem' }}>
                          In 2026, data privacy is paramount. Traditional online utilities require you to upload private PDFs, photos, and files to cloud servers.
                        </p>
                        <p style={{ marginBottom: '1.25rem' }}>
                          <strong>PixTool is 100% client-side.</strong> Built with <strong>WebAssembly (WASM)</strong> and HTML5 Canvas, all transformations execute strictly in your local device RAM and CPU.
                        </p>
                        <p>
                          Your files <strong>never leave your machine</strong>, providing zero upload latency, air-gapped security, and complete peace of mind.
                        </p>
                      </div>
                    </div>
                    <div style={{
                      background: 'var(--bg-secondary)',
                      padding: '2.5rem',
                      borderRadius: '28px',
                      border: '1px solid var(--border-color)',
                      boxShadow: 'var(--shadow-premium)'
                    }}>
                      <h3 style={{ fontSize: '1.35rem', fontWeight: 800, marginBottom: '1.25rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <Shield size={22} style={{ color: 'var(--accent-primary)' }} /> Enterprise-Grade Security
                      </h3>
                      <p style={{ color: 'var(--text-secondary)', marginBottom: '1.25rem', fontSize: '0.9rem' }}>
                        Because PixTool never collects or stores user documents, we adhere to the strictest standards:
                      </p>
                      <ul style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem', padding: 0, listStyle: 'none' }}>
                        {[
                          { title: 'GDPR & Privacy Compliant', desc: 'Zero data controller or processor transmission occurs.' },
                          { title: 'HIPAA & Medical Ready', desc: 'Sensitive documents stay strictly on local hardware.' },
                          { title: 'Zero Tracking or Ads', desc: 'No personal data harvested, sold, or logged.' },
                          { title: 'Air-Gapped Offline Ready', desc: 'Tools operate completely without internet after loading.' }
                        ].map((item, i) => (
                          <li key={i} style={{ display: 'flex', gap: '10px' }}>
                            <div style={{ color: 'var(--accent-primary)', fontWeight: 900 }}>✓</div>
                            <div>
                              <div style={{ fontWeight: 800, fontSize: '0.92rem', color: 'var(--text-primary)' }}>{item.title}</div>
                              <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{item.desc}</div>
                            </div>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </section>
            </ScrollReveal>

            {/* Video Demo */}
            <ScrollReveal direction="up">
              <section className="container-pro" style={{
                marginTop: '4rem',
                marginBottom: '4rem',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                textAlign: 'center'
              }}>
                <h2 style={{ fontSize: '2.2rem', fontWeight: 900, marginBottom: '1rem', letterSpacing: '-0.02em' }}>
                  See PixTool in <span style={{ color: 'var(--accent-blue)' }}>Action</span>
                </h2>
                <p style={{ color: 'var(--text-secondary)', fontSize: '1rem', maxWidth: '550px', marginBottom: '2.5rem' }}>
                  Watch a quick tour showcasing the zero-latency speed and privacy of our 120+ browser tools.
                </p>

                <motion.div
                  style={{
                    position: 'relative',
                    width: '100%',
                    maxWidth: '400px',
                    borderRadius: '28px',
                    overflow: 'hidden',
                    boxShadow: '0 20px 80px rgba(139, 92, 246, 0.15)',
                    border: '1px solid rgba(255,255,255,0.08)',
                    aspectRatio: '9/16',
                    background: 'var(--bg-secondary)'
                  }}
                  whileHover={{ scale: 1.02, boxShadow: '0 30px 100px rgba(139, 92, 246, 0.25)' }}
                  transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                >
                  <LazyYouTubeEmbed
                    videoId="fzIhPN-gv_E"
                    title="PixTool Productivity Suite Demo"
                    rounded="28px"
                  />
                </motion.div>
              </section>
            </ScrollReveal>

            {/* Suspense Subsections */}
            <Suspense fallback={<SectionSkeleton height="400px" />}>
              <ScrollReveal direction="up">
                <UseCaseSection />
              </ScrollReveal>
              <ScrollReveal direction="up">
                <FAQSection />
              </ScrollReveal>
              <ScrollReveal direction="up">
                <TechnicalAuthority />
              </ScrollReveal>
              <ScrollReveal direction="up">
                <BlogSection />
              </ScrollReveal>
            </Suspense>
          </section>
        </div>
      </div>
    </>
  )
}
