import { useState, useEffect } from 'react'
import { Link, useSearchParams, useNavigate } from 'react-router-dom'
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from 'framer-motion'
import SEO from '../components/SEO'
import {
  Image, FileText, Mail, QrCode, Scan,
  Crop, RotateCw, Maximize2, Type,
  FilePlus, SplitSquareHorizontal, FileCheck, FileX,
  Users, Shield, Clock, Wifi, Search, X, Zap, Lock,
  RefreshCw, FlipHorizontal, Palette, ArrowUpDown, FileImage,
  Navigation
} from 'lucide-react'
import ShareTool from '../components/ShareTool'
import ToolCard from '../components/ToolCard'
import { IMAGE_TOOLS, PDF_TOOLS, UTILITY_TOOLS } from '../data/tools'
import { posts } from '../data/posts'

const imageTools = IMAGE_TOOLS.filter(t => !t.status);
const pdfTools = PDF_TOOLS.filter(t => !t.status);
const communicationTools = UTILITY_TOOLS;

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

  const allTools = [...imageTools, ...pdfTools, ...communicationTools]

  const filteredTools = allTools.filter(tool =>
    tool.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    tool.description.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const isSearching = searchTerm.trim().length > 0

  const homeSchema = [
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "name": "PixTool FAQ",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "Is PixTool really free?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes, 100% free. Every tool on PixTool is available without any cost, subscription, or registration. We provide professional-grade productivity tools for everyone."
          }
        },
        {
          "@type": "Question",
          "name": "Are my files safe and private?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Absolutely. PixTool processes your files entirely within your browser. Your images, PDFs, and data are never uploaded to any server, ensuring 100% privacy and security."
          }
        },
        {
          "@type": "Question",
          "name": "What image tools are available?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Our suite includes Resize, Crop, Rotate, Compress, Convert Format (JPEG/PNG/WebP/GIF), Watermark, Flip, and Grayscale effects. All work locally in your browser."
          }
        },
        {
          "@type": "Question",
          "name": "Can I merge, split, and compress PDFs?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes! We offer tools to Merge, Split, Compress, Convert PDF to Image, Password Protect, Watermark, and Reorder PDF pages — all without uploading your files."
          }
        }
      ]
    },

    {
      "@context": "https://schema.org",
      "@type": "ItemList",
      "name": "Free Online Tools",
      "description": "Complete list of free online tools available at PixTool",
      "url": "https://pixtool.toolpix.in/sitemap",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Resize Image", "url": "https://pixtool.toolpix.in/image-tools/resize", "description": "Change image dimensions by pixels or percentage" },
        { "@type": "ListItem", "position": 2, "name": "Crop Image", "url": "https://pixtool.toolpix.in/image-tools/crop", "description": "Crop images to any size or aspect ratio" },
        { "@type": "ListItem", "position": 3, "name": "Rotate Image", "url": "https://pixtool.toolpix.in/image-tools/rotate", "description": "Rotate and flip images" },
        { "@type": "ListItem", "position": 4, "name": "Compress Image", "url": "https://pixtool.toolpix.in/image-tools/compress", "description": "Reduce image file size" },
        { "@type": "ListItem", "position": 5, "name": "Merge PDF", "url": "https://pixtool.toolpix.in/pdf-tools/merge", "description": "Combine multiple PDFs into one" },
        { "@type": "ListItem", "position": 6, "name": "Split PDF", "url": "https://pixtool.toolpix.in/pdf-tools/split", "description": "Extract pages from PDF" },
        { "@type": "ListItem", "position": 7, "name": "Compress PDF", "url": "https://pixtool.toolpix.in/pdf-tools/compress", "description": "Reduce PDF file size" },
        { "@type": "ListItem", "position": 8, "name": "PDF to Image", "url": "https://pixtool.toolpix.in/pdf-tools/convert", "description": "Convert PDF to images" },
        { "@type": "ListItem", "position": 9, "name": "Convert Image Format", "url": "https://pixtool.toolpix.in/image-tools/convert", "description": "Convert between JPEG, PNG, WebP, GIF" },
        { "@type": "ListItem", "position": 10, "name": "Add Watermark", "url": "https://pixtool.toolpix.in/image-tools/watermark", "description": "Add text watermarks to images" },
        { "@type": "ListItem", "position": 11, "name": "Flip Image", "url": "https://pixtool.toolpix.in/image-tools/flip", "description": "Flip images horizontally or vertically" },
        { "@type": "ListItem", "position": 12, "name": "Grayscale Converter", "url": "https://pixtool.toolpix.in/image-tools/grayscale", "description": "Convert to black & white, sepia, or invert" },
        { "@type": "ListItem", "position": 13, "name": "Protect PDF", "url": "https://pixtool.toolpix.in/pdf-tools/protect", "description": "Add password protection to PDF" },
        { "@type": "ListItem", "position": 14, "name": "Watermark PDF", "url": "https://pixtool.toolpix.in/pdf-tools/watermark", "description": "Add text watermarks to PDF pages" },
        { "@type": "ListItem", "position": 15, "name": "Reorder PDF Pages", "url": "https://pixtool.toolpix.in/pdf-tools/reorder", "description": "Rearrange PDF pages" },
        { "@type": "ListItem", "position": 16, "name": "Temporary Email", "url": "https://pixtool.toolpix.in/temp-mail", "description": "Free disposable email address" },
        { "@type": "ListItem", "position": 17, "name": "QR Code Generator", "url": "https://pixtool.toolpix.in/qr-generator", "description": "Create QR codes" },
        { "@type": "ListItem", "position": 18, "name": "QR Scanner", "url": "https://pixtool.toolpix.in/qr-scanner", "description": "Scan QR codes" }
      ].concat([
        { "@type": "ListItem", "position": 19, "name": "10 Minute Mail", "url": "https://pixtool.toolpix.in/temp-mail/10-minute-mail", "description": "Auto-expiring disposable email" },
        { "@type": "ListItem", "position": 20, "name": "Change Temporary Email", "url": "https://pixtool.toolpix.in/temp-mail/change-email", "description": "Generate a new temp email" },
        { "@type": "ListItem", "position": 21, "name": "Typing Test", "url": "https://pixtool.toolpix.in/typing-test", "description": "Online typing speed test (WPM)" }
      ])
    },
    {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      "name": "Free Image Tools Collection",
      "description": "Complete suite of free online image editing tools including resize, crop, rotate, compress, convert, watermark, flip, and grayscale.",
      "url": "https://pixtool.toolpix.in/image-tools",
      "hasPart": imageTools.map(t => ({
        "@type": "SoftwareApplication",
        "name": t.title,
        "description": t.description,
        "url": `https://pixtool.toolpix.in${t.path}`,
        "applicationCategory": "MultimediaApplication"
      }))
    },
    {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      "name": "Free PDF Tools Collection",
      "description": "Complete suite of free online PDF tools including merge, split, compress, convert, protect, watermark, and reorder.",
      "url": "https://pixtool.toolpix.in/pdf-tools",
      "hasPart": pdfTools.map(t => ({
        "@type": "SoftwareApplication",
        "name": t.title,
        "description": t.description,
        "url": `https://pixtool.toolpix.in${t.path}`,
        "applicationCategory": "BusinessApplication"
      }))
    }
  ]

  return (
    <>
      <SEO
        title="PixTool - Free Online Productivity Tools | 100% Client-Side & Private"
        description="PixTool: The ultimate 100% private, browser-based suite for professionals. Free online image resizer, PDF merger, compressor, temporary mail, and QR generator. No file uploads, no storage – your data stays on your device."
        keywords="free online tools, pixtool, image resizer online, crop image free, compress image no quality loss, PDF merge online, split PDF browser, compress PDF sitemap, temp mail, disposable email pro, 10 minute mail serverless, QR code generator wifi, secure typing test, browser-based tools, no upload required, privacy-first tools, professional pdf editor free, online image editor 2026, adobe acrobat alternative, tinypng alternative"
        path="/"
        schema={homeSchema}
        breadcrumbs={[
          { name: 'Professional Tools', item: '/' }
        ]}
      />
      <div className="landing-layout">
        <div className="landing-center">

      <div className="category-hub">
        <div className="hub-hero" style={{ 
          textAlign: 'center', 
          padding: '6rem 2rem', 
          marginBottom: '4rem', 
          background: 'linear-gradient(135deg, var(--accent-glow) 0%, transparent 100%)', 
          borderRadius: '48px',
          position: 'relative',
          overflow: 'hidden'
        }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="status-badge" style={{ margin: '0 auto 2rem' }}>
              <span style={{ marginRight: '8px' }}>🚀</span> 2026 Edition: Private & Fast
            </div>
            <h1 style={{ fontSize: 'clamp(3rem, 8vw, 5rem)', fontWeight: 900, marginBottom: '1.5rem', letterSpacing: '-0.04em', lineHeight: 1.1 }}>
              Pix<span style={{ color: 'var(--accent-primary)' }}>Tool</span>
            </h1>
            <p style={{ fontSize: '1.25rem', color: 'var(--text-secondary)', maxWidth: '800px', margin: '0 auto 3rem', lineHeight: 1.6, fontWeight: 500 }}>
              The ultimate professional suite for image editing, PDF management, and essential web utilities.
              <span style={{ display: 'block', marginTop: '1rem', fontSize: '0.85rem', fontWeight: 800, textTransform: 'uppercase', color: 'var(--accent-primary)', letterSpacing: '0.1em' }}>
                Built for Professionals • Zero Server Uploads • Military-Grade Privacy
              </span>
            </p>

            <div className="search-container" style={{ boxShadow: 'var(--shadow-xl)', border: '1px solid var(--border-color)' }}>
              <div className="search-icon-wrapper">
                <Search size={22} />
              </div>
              <input
                type="text"
                className="search-input"
                placeholder="What tool do you need today?"
                value={searchTerm}
                onChange={handleSearchChange}
                onKeyDown={handleKeyDown}
                onFocus={() => setShowSuggestions(searchTerm.length > 0)}
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

            <div style={{ display: 'flex', justifyContent: 'center', gap: '1.5rem', opacity: 0.7, marginTop: '3rem' }}>
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

      <section className="content-section" style={{ paddingBottom: '10rem' }}>
        <div className="container-pro">
          {isSearching ? (
            <div className="search-results" style={{ minHeight: '60vh' }}>
              <div className="section-header" style={{ marginBottom: '3rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'var(--bg-secondary)', padding: '1.5rem 2rem', borderRadius: '20px', border: '1px solid var(--border-color)' }}>
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
                    Explore All 18 Tools
                  </button>
                </div>
              )}
            </div>
          ) : (
            <>
              <div style={{ marginBottom: '2.5rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <div style={{ padding: '0.6rem', background: 'rgba(168, 85, 247, 0.08)', borderRadius: '12px', color: 'var(--accent-purple)' }}>
                  <Image size={24} />
                </div>
                <h2 style={{ fontSize: '1.8rem', fontWeight: 900, letterSpacing: '-0.02em' }}>Image Mastery</h2>
              </div>
              <div className="tools-grid" style={{ marginBottom: '4rem' }}>
                {imageTools.map((tool) => (
                  <ToolCard key={tool.path} tool={tool} />
                ))}
              </div>

              <div style={{ marginBottom: '2.5rem', display: 'flex', alignItems: 'center', gap: '1rem', marginTop: '6rem' }}>
                <div style={{ padding: '0.6rem', background: 'rgba(59, 130, 246, 0.08)', borderRadius: '12px', color: 'var(--accent-cyan)' }}>
                  <FileText size={24} />
                </div>
                <h2 style={{ fontSize: '1.8rem', fontWeight: 900, letterSpacing: '-0.02em' }}>PDF Powerhouse</h2>
              </div>
              <div className="tools-grid" style={{ marginBottom: '4rem' }}>
                {pdfTools.map((tool) => (
                  <ToolCard key={tool.path} tool={tool} />
                ))}
              </div>

              <div style={{ marginBottom: '2.5rem', display: 'flex', alignItems: 'center', gap: '1rem', marginTop: '6rem' }}>
                <div style={{ padding: '0.6rem', background: 'rgba(16, 185, 129, 0.08)', borderRadius: '12px', color: 'var(--accent-green)' }}>
                  <Wifi size={24} />
                </div>
                <h2 style={{ fontSize: '1.8rem', fontWeight: 900, letterSpacing: '-0.02em' }}>Daily Tools</h2>
              </div>
              <div className="tools-grid">
                {communicationTools.map((tool) => (
                  <ToolCard key={tool.path} tool={tool} />
                ))}
              </div>
            </>
          )}
        </div>

          <div className="container-pro" style={{ marginTop: '8rem', padding: '4rem', background: 'var(--bg-secondary)', borderRadius: '32px', textAlign: 'left' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '4rem' }}>
              <div>
                <h2 style={{ fontSize: '1.8rem', fontWeight: 800, marginBottom: '1.5rem' }}>Why Choose PixTool?</h2>
                <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7 }}>
                  Unlike other platforms that require you to upload your files to their servers,
                  PixTool processes almost everything <b>locally in your browser</b>.
                  This means your sensitive images and PDFs never leave your device, ensuring
                  <b> 100% privacy</b> and extreme speed. Whether you need to resize a photo
                  for social media, merge multiple PDF documents for work, or generate a QR code
                  for an event, PixTool has you covered with professional-grade results.
                </p>
              </div>
              <div>
                <h2 style={{ fontSize: '1.8rem', fontWeight: 800, marginBottom: '1.5rem' }}>100% Free Forever</h2>
                <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7 }}>
                  Our mission is to provide high-quality productivity tools without the high-end
                  subscription costs. There are no hidden fees, no credit cards, and no "Pro"
                  tiers that lock away essential features. Every tool on PixTool is completely
                  free — from our advanced image resizer and cropper to our PDF merger and
                  compressor. We believe essential productivity tools should be accessible to everyone.
                </p>
              </div>
              <div>
                <h2 style={{ fontSize: '1.8rem', fontWeight: 800, marginBottom: '1.5rem' }}>Optimized for Speed</h2>
                <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7 }}>
                  Time is money. Our tools are optimized to be lightweight and fast.
                  Whether you're merging a 100-page PDF or resizing a high-resolution 4K image,
                  you'll get results in seconds, not minutes. No queues, no waiting. Our
                  browser-based processing engine leverages modern Web APIs like Canvas, WebAssembly,
                  and Web Workers to deliver desktop-class performance directly in your browser tab.
                </p>
              </div>
            </div>

            <div style={{ marginTop: '4rem', paddingTop: '4rem', borderTop: '1px solid var(--border-color)', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '2rem' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <h4 style={{ fontWeight: 700 }}>Secure Processing</h4>
                <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>Browser-based logic ensures your data stays on your machine. No server uploads ever.</p>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <h4 style={{ fontWeight: 700 }}>No Registration</h4>
                <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>Start using our tools immediately. No accounts, no emails, no tracking.</p>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <h4 style={{ fontWeight: 700 }}>Cross-Platform</h4>
                <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>Works perfectly on Mac, Windows, Linux, iOS, and Android. Any modern browser.</p>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <h4 style={{ fontWeight: 700 }}>High Resolution</h4>
                <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>We preserve the quality of your files during every operation. No compression artifacts.</p>
              </div>
            </div>
          </div>

          {/* New Use Cases Section */}
          <div className="container-pro" style={{ marginTop: '10rem' }}>
            <div style={{ textAlign: 'center', marginBottom: '5rem' }}>
              <h2 style={{ fontSize: 'clamp(2rem, 5vw, 3rem)', fontWeight: 900, marginBottom: '1.5rem', letterSpacing: '-0.03em' }}>
                One Workspace, <span style={{ color: 'var(--accent-primary)' }}>Infinite Use Cases</span>
              </h2>
              <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', maxWidth: '700px', margin: '0 auto' }}>
                Discover how thousands of professionals use PixTool to streamline their daily digital workflow.
              </p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
              {[
                {
                  title: 'For Remote Professionals',
                  description: 'Merge daily reports, compress high-res meeting screenshots for Slack, and protect sensitive contracts with passwords before emailing.',
                  icon: '🏠',
                  tools: ['Merge PDF', 'Compress Image', 'Protect PDF']
                },
                {
                  title: 'For Social Media Creators',
                  description: 'Resize photos for Instagram, crop YouTube thumbnails to 1280x720, and convert images to WebP for faster web loading.',
                  icon: '📱',
                  tools: ['Image Resizer', 'Crop Tool', 'WebP Converter']
                },
                {
                  title: 'For Students & Educators',
                  description: 'Split lecture PDFs into chapters, add watermarks to original research, and generate QR codes for classroom resources.',
                  icon: '🎓',
                  tools: ['Split PDF', 'Watermark', 'QR Generator']
                },
                {
                  title: 'For Privacy Advocates',
                  description: 'Use disposable emails to test new services without spam, scan QR codes safely, and process files 100% offline.',
                  icon: '🛡️',
                  tools: ['Temp Mail', 'QR Scanner', 'offline Mode']
                },
                {
                  title: 'For Web Developers',
                  description: 'Optimize assets for PageSpeed insights, convert legacy images to modern formats, and test typing speed for coding productivity.',
                  icon: '💻',
                  tools: ['Image Optimizer', 'WebP Convert', 'Typing Test']
                },
                {
                  title: 'For Small Business Owners',
                  description: 'Create WiFi QR codes for customers, keep invoices organized by merging PDFs, and protect brand assets with watermarks.',
                  icon: '💼',
                  tools: ['WiFi QR', 'Merge PDF', 'Watermark']
                }
              ].map((useCase, idx) => (
                <motion.div
                  key={idx}
                  whileHover={{ y: -5 }}
                  style={{
                    background: 'var(--bg-glass)',
                    padding: '2.5rem',
                    borderRadius: '24px',
                    border: '1px solid var(--border-color)',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '1rem'
                  }}
                >
                  <div style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>{useCase.icon}</div>
                  <h3 style={{ fontSize: '1.4rem', fontWeight: 800 }}>{useCase.title}</h3>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: 1.6 }}>{useCase.description}</p>
                  <div style={{ marginTop: 'auto', display: 'flex', flexWrap: 'wrap', gap: '0.5rem', paddingTop: '1.5rem' }}>
                    {useCase.tools.map(tool => (
                      <span key={tool} style={{ fontSize: '0.7rem', fontWeight: 700, padding: '0.3rem 0.7rem', background: 'rgba(99, 102, 241, 0.08)', color: 'var(--accent-primary)', borderRadius: '100px' }}>
                        {tool}
                      </span>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Extended SEO Content — FAQ Section */}
          <div className="container-pro" style={{ marginTop: '6rem', maxWidth: '1000px', margin: '6rem auto 0' }}>
            <h2 style={{ fontSize: '2.5rem', fontWeight: 900, textAlign: 'center', marginBottom: '1rem' }}>Frequently Asked Questions</h2>
            <p style={{ textAlign: 'center', color: 'var(--text-secondary)', marginBottom: '3rem', fontSize: '1.1rem' }}>Everything you need to know about PixTool</p>

            {[
              { q: "Is PixTool really free?", a: "Yes, 100% free. Every tool on PixTool is available without any cost, subscription, or hidden fees. We support the platform through non-intrusive advertising." },
              { q: "Are my files safe and private?", a: "Absolutely. PixTool processes your files entirely within your browser. Your images, PDFs, and documents are never uploaded to any server. Once you close the tab, your data is gone." },
              { q: "What image formats are supported?", a: "Our image tools support all major formats including JPEG, PNG, WebP, GIF, BMP, and TIFF. You can also convert between formats while resizing, cropping, or compressing." },
              { q: "Can I merge more than two PDFs?", a: "Yes! Our PDF merger supports combining as many PDF files as you need into a single document. Simply upload all your files and arrange them in the desired order." },
              { q: "Do I need to install anything?", a: "No installation required. PixTool runs entirely in your web browser. Just visit the site and start using any tool immediately on any device." },
              { q: "What is the maximum file size?", a: "Since processing happens in your browser, the limit depends on your device's available memory. Most modern devices can handle files up to 100MB+ without issues." },
            ].map((faq, i) => (
              <div key={i} style={{ padding: '1.5rem 2rem', background: 'var(--bg-secondary)', borderRadius: '16px', marginBottom: '1rem', border: '1px solid var(--border-color)' }}>
                <h3 style={{ fontWeight: 700, fontSize: '1.1rem', marginBottom: '0.75rem' }}>{faq.q}</h3>
                <p style={{ color: 'var(--text-secondary)', lineHeight: 1.6 }}>{faq.a}</p>
              </div>
            ))}
          </div>

          {/* Additional SEO paragraph - Expanded for Maximum Ranking */}
          <div className="container-pro" style={{ marginTop: '5rem', textAlign: 'center' }}>
            <h2 style={{ fontSize: 'clamp(2.5rem, 5vw, 3.5rem)', fontWeight: 900, marginBottom: '2rem', letterSpacing: '-0.04em', lineHeight: 1.1 }}>
              The Professional All-In-One <br /><span style={{ color: 'var(--accent-primary)' }}>Online Productivity Suite</span>
            </h2>
            <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8, fontSize: '1.2rem', maxWidth: '800px', margin: '0 auto 4rem' }}>
              PixTool is the premier high-performance platform for <b>free online image editing</b>,
              <b>advanced PDF management</b>, and <b>secure web utilities</b> — architected for professionals who demand <b>industry-standard quality</b> without the compromise of server uploads.
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '2rem', marginBottom: '5rem', textAlign: 'left' }}>
              <div style={{ padding: '3rem', background: 'var(--bg-glass)', borderRadius: '32px', border: '1px solid var(--border-color)', backdropFilter: 'blur(20px)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
                  <div style={{ width: '48px', height: '48px', borderRadius: '14px', background: 'rgba(168, 85, 247, 0.1)', color: '#a855f7', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Image size={24} />
                  </div>
                  <h3 style={{ fontSize: '1.5rem', fontWeight: 800 }}>Image Mastery</h3>
                </div>
                <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7, marginBottom: '1.5rem' }}>
                  Looking for <b>free image resize online</b>? Our browser-based engine lets you <Link to="/image-tools/resize" style={{ color: 'inherit', textDecoration: 'underline' }}><b>resize images for Etsy</b></Link>, <Link to="/image-tools/compress" style={{ color: 'inherit', textDecoration: 'underline' }}><b>compress photos for WordPress</b></Link>, and <Link to="/image-tools/convert" style={{ color: 'inherit', textDecoration: 'underline' }}><b>convert to WebP</b></Link> without any quality loss. It's the ultimate <b>Squoosh alternative</b> for batch processing.
                </p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                  {['Lossless Compression', 'Batch Resize', 'Magic Crop', 'Format Conversion'].map(tag => (
                    <span key={tag} style={{ padding: '0.4rem 0.8rem', background: 'var(--bg-primary)', borderRadius: '100px', fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)', border: '1px solid var(--border-color)' }}>{tag}</span>
                  ))}
                </div>
              </div>

              <div style={{ padding: '3rem', background: 'var(--bg-glass)', borderRadius: '32px', border: '1px solid var(--border-color)', backdropFilter: 'blur(20px)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
                  <div style={{ width: '48px', height: '48px', borderRadius: '14px', background: 'rgba(59, 130, 246, 0.1)', color: '#3b82f6', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <FileText size={24} />
                  </div>
                  <h3 style={{ fontSize: '1.5rem', fontWeight: 800 }}>PDF Powerhouse</h3>
                </div>
                <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7, marginBottom: '1.5rem' }}>
                  The <b>best free alternative to Adobe Acrobat Pro</b>. Easily <Link to="/pdf-tools/merge" style={{ color: 'inherit', textDecoration: 'underline' }}><b>merge PDFs without uploading</b></Link>, <Link to="/pdf-tools/compress" style={{ color: 'inherit', textDecoration: 'underline' }}><b>compress PDF online free</b></Link>, and <b>protect documents</b> with military-grade encryption. Perfect for <b>splitting legal documents</b> and <b>merging invoices</b> securely.
                </p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                  {['PDF Merge', 'Secure Split', 'Smart Compress', 'Password Protect'].map(tag => (
                    <span key={tag} style={{ padding: '0.4rem 0.8rem', background: 'var(--bg-primary)', borderRadius: '100px', fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)', border: '1px solid var(--border-color)' }}>{tag}</span>
                  ))}
                </div>
              </div>

              <div style={{ padding: '3rem', background: 'var(--bg-glass)', borderRadius: '32px', border: '1px solid var(--border-color)', backdropFilter: 'blur(20px)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
                  <div style={{ width: '48px', height: '48px', borderRadius: '14px', background: 'rgba(16, 185, 129, 0.1)', color: '#10b981', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Shield size={24} />
                  </div>
                  <h3 style={{ fontSize: '1.5rem', fontWeight: 800 }}>Privacy Utilities</h3>
                </div>
                <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7, marginBottom: '1.5rem' }}>
                  Our <b>free temp mail generator</b> is the leading <b>secure email alternative</b> for privacy advocates. Generate <Link to="/qr-generator" style={{ color: 'inherit', textDecoration: 'underline' }}><b>WiFi QR codes</b></Link>, <Link to="/qr-scanner" style={{ color: 'inherit', textDecoration: 'underline' }}><b>scan codes instantly</b></Link>, or use <Link to="/temp-mail" style={{ color: 'inherit', textDecoration: 'underline' }}><b>disposable email for business</b></Link>. Everything operates 100% <b>offline after initial load</b> for zero-leak privacy.
                </p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                  {['Disposable Mail', 'QR Scanner', 'QR Generator', 'Typing Speed'].map(tag => (
                    <span key={tag} style={{ padding: '0.4rem 0.8rem', background: 'var(--bg-primary)', borderRadius: '100px', fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)', border: '1px solid var(--border-color)' }}>{tag}</span>
                  ))}
                </div>
              </div>
            </div>

            {/* Comparison Table / Benchmarks */}
            <div className="container-pro" style={{ padding: '4rem', background: 'var(--text-primary)', color: 'var(--bg-primary)', borderRadius: '40px', marginBottom: '6rem', textAlign: 'left', position: 'relative', overflow: 'hidden' }}>
              <div style={{ position: 'absolute', top: '-100px', right: '-100px', width: '300px', height: '300px', background: 'var(--accent-primary)', filter: 'blur(150px)', opacity: 0.2 }}></div>
              <div style={{ maxWidth: '800px' }}>
                <h2 style={{ fontSize: '2.5rem', fontWeight: 900, marginBottom: '1.5rem', letterSpacing: '-0.03em' }}>Why Professionals Switch to PixTool</h2>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3rem' }}>
                  <div>
                    <h4 style={{ fontSize: '1.1rem', fontWeight: 800, marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <span style={{ color: '#ef4444' }}>✕</span> Other Online Tools
                    </h4>
                    <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.8rem', opacity: 0.7, fontSize: '0.95rem' }}>
                      <li>Upload files to remote servers</li>
                      <li>Wait for queues and processing</li>
                      <li>Limited file sizes on free tiers</li>
                      <li>Mandatory registration and account</li>
                      <li>Data and privacy at risk</li>
                    </ul>
                  </div>
                  <div style={{ position: 'relative' }}>
                    <h4 style={{ fontSize: '1.1rem', fontWeight: 800, marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <span style={{ color: '#10b981' }}>✓</span> PixTool Edge
                    </h4>
                    <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.8rem', fontWeight: 600, fontSize: '0.95rem' }}>
                      <li>100% Client-side browser processing</li>
                      <li>Sub-second execution speeds</li>
                      <li>Unlimited file size (Device memory)</li>
                      <li>No accounts, no tracking, no logging</li>
                      <li>Military-grade browser privacy</li>
                    </ul>
                  </div>
                </div>
                <div style={{ marginTop: '3rem', display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                  <div style={{ padding: '0.75rem 1.5rem', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', fontSize: '0.9rem' }}><b>Adobe Acrobat</b> Alternative</div>
                  <div style={{ padding: '0.75rem 1.5rem', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', fontSize: '0.9rem' }}><b>TinyPNG</b> Power-User rival</div>
                  <div style={{ padding: '0.75rem 1.5rem', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', fontSize: '0.9rem' }}><b>Guerrilla Mail</b> Pro-Grade upgrade</div>
                </div>
              </div>
            </div>

            {/* SEO Trust Bar */}
            <div className="container-pro" style={{ display: 'flex', justifyContent: 'center', gap: '4rem', padding: '2rem', borderTop: '1px solid var(--border-color)', borderBottom: '1px solid var(--border-color)', opacity: 0.7, flexWrap: 'wrap', marginBottom: '4rem' }}>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '1.8rem', fontWeight: 900, color: 'var(--text-primary)' }}>18+</div>
                <div style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--text-muted)' }}>Free Tools</div>
              </div>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '1.8rem', fontWeight: 900, color: 'var(--text-primary)' }}>0</div>
                <div style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--text-muted)' }}>Files Uploaded</div>
              </div>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '1.8rem', fontWeight: 900, color: 'var(--text-primary)' }}>100%</div>
                <div style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--text-muted)' }}>Browser Based</div>
              </div>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '1.8rem', fontWeight: 900, color: 'var(--text-primary)' }}>∞</div>
                <div style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--text-muted)' }}>Privacy Guaranteed</div>
              </div>
            </div>

            {/* Technical Authority Section - High-Value E-E-A-T Content */}
            <div className="container-pro" style={{ marginTop: '6rem', padding: '4rem 2rem', background: 'var(--bg-secondary)', borderRadius: '40px', border: '1px solid var(--border-color)', textAlign: 'center' }}>
              <div style={{ marginBottom: '3rem' }}>
                <h2 style={{ fontSize: '2.8rem', fontWeight: 900, marginBottom: '1rem', letterSpacing: '-0.02em' }}>Technical <span style={{ color: 'var(--accent-primary)' }}>Authority</span></h2>
                <p style={{ fontSize: '1.1rem', color: 'var(--text-secondary)', maxWidth: '700px', margin: '0 auto' }}>
                  Why thousands of professionals and corporate clients trust PixTool with their most sensitive data.
                </p>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2.5rem', textAlign: 'left' }}>
                <div style={{ padding: '2rem', background: 'var(--bg-primary)', borderRadius: '24px', border: '1px solid var(--border-color)', height: '100%' }}>
                  <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'rgba(16, 185, 129, 0.1)', color: '#10b981', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.5rem' }}>
                    <Shield size={24} />
                  </div>
                  <h3 style={{ fontSize: '1.3rem', fontWeight: 800, marginBottom: '0.75rem' }}>Client-Side Security</h3>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: 1.6, margin: 0 }}>
                    Unlike traditional tools that upload files to a remote server, PixTool uses <b>modern WebAssembly</b> to process everything 100% locally in your browser. <b>Your data never leaves your computer.</b>
                  </p>
                </div>

                <div style={{ padding: '2rem', background: 'var(--bg-primary)', borderRadius: '24px', border: '1px solid var(--border-color)', height: '100%' }}>
                  <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'rgba(59, 130, 246, 0.1)', color: '#3b82f6', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.5rem' }}>
                    <Zap size={24} />
                  </div>
                  <h3 style={{ fontSize: '1.3rem', fontWeight: 800, marginBottom: '0.75rem' }}>Zero Server Latency</h3>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: 1.6, margin: 0 }}>
                    By eliminating large file uploads, we provide near-instant results. Whether you're compressing a 100MB PDF or resizing 50 images, the speed is limited only by your device's local CPU power.
                  </p>
                </div>

                <div style={{ padding: '2rem', background: 'var(--bg-primary)', borderRadius: '24px', border: '1px solid var(--border-color)', height: '100%' }}>
                  <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'rgba(168, 85, 247, 0.1)', color: '#a855f7', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.5rem' }}>
                    <Lock size={24} />
                  </div>
                  <h3 style={{ fontSize: '1.3rem', fontWeight: 800, marginBottom: '0.75rem' }}>GDPR & HIPAA Compliance</h3>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: 1.6, margin: 0 }}>
                    Because we don't store, process, or see your data, our platform is inherently compliant with strict data protection regulations. Ideal for healthcare workers, legal firms, and corporate professionals.
                  </p>
                </div>
              </div>
            </div>

            {/* Latest from Blog Section */}
            <div className="container-pro" style={{ marginTop: '8rem', textAlign: 'center' }}>
              <div style={{ marginBottom: '4rem' }}>
                <h2 style={{ fontSize: '2.8rem', fontWeight: 900, marginBottom: '1rem', letterSpacing: '-0.02em' }}>Professional <span style={{ color: 'var(--accent-primary)' }}>Insights</span></h2>
                <p style={{ fontSize: '1.1rem', color: 'var(--text-secondary)', maxWidth: '700px', margin: '0 auto' }}>
                  Educational guides, technical deep-dives, and productivity hacks from our expert team.
                </p>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2.5rem', textAlign: 'left' }}>
                {posts.slice(0, 3).map((post, idx) => (
                  <motion.div
                    key={post.slug}
                    whileHover={{ y: -10 }}
                    style={{
                      background: 'var(--bg-glass)',
                      borderRadius: '32px',
                      border: '1px solid var(--border-color)',
                      overflow: 'hidden',
                      display: 'flex',
                      flexDirection: 'column',
                      transition: 'all 0.3s ease'
                    }}
                  >
                    <div style={{ height: '200px', overflow: 'hidden' }}>
                      <img src={post.image} alt={post.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    </div>
                    <div style={{ padding: '2rem', display: 'flex', flexDirection: 'column', flex: 1 }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                        <span style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--accent-primary)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{post.category}</span>
                        <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{post.date}</span>
                      </div>
                      <h3 style={{ fontSize: '1.3rem', fontWeight: 800, marginBottom: '1rem', lineHeight: 1.4, color: 'var(--text-primary)' }}>{post.title}</h3>
                      <p style={{ fontSize: '0.95rem', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '2rem', display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                        {post.excerpt}
                      </p>
                      <Link to={`/blog/${post.slug}`} style={{ marginTop: 'auto', display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--accent-primary)', textDecoration: 'none', fontWeight: 700, fontSize: '0.95rem' }}>
                        Read Article <Navigation size={16} style={{ transform: 'rotate(90deg)' }} />
                      </Link>
                    </div>
                  </motion.div>
                ))}
              </div>

              <div style={{ marginTop: '4rem' }}>
                <Link to="/blog" className="btn btn-secondary" style={{ padding: '1rem 3rem', borderRadius: '100px' }}>
                  View All Insights
                </Link>
              </div>
            </div>
          </div>
        </section>
        </div>
      </div>
    </div>
  </>
  )
}
