import { useState, useEffect, useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Menu, X, Moon, Sun, Share2, Search } from 'lucide-react'
import { IMAGE_TOOLS, PDF_TOOLS, UTILITY_TOOLS } from '../data/tools'

const allTools = [
  ...IMAGE_TOOLS.map(t => ({ path: t.path, title: t.title, category: 'Image', icon: t.icon, color: t.color })),
  ...PDF_TOOLS.map(t => ({ path: t.path, title: t.title, category: 'PDF', icon: t.icon, color: t.color })),
  ...UTILITY_TOOLS.map(t => ({ path: t.path, title: t.title, category: 'Utility', icon: t.icon, color: t.color })),
]

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [searchValue, setSearchValue] = useState('')
  const [showSuggestions, setShowSuggestions] = useState(false)
  const [isDark, setIsDark] = useState(false)
  const navigate = useNavigate()
  const searchRef = useRef(null)

  const suggestions = searchValue.trim()
    ? allTools.filter(t =>
      t.title.toLowerCase().includes(searchValue.toLowerCase()) ||
      t.category.toLowerCase().includes(searchValue.toLowerCase())
    )
    : allTools

  const handleSearch = (e) => {
    e.preventDefault()
    if (searchValue.trim()) {
      navigate(`/?q=${encodeURIComponent(searchValue.trim())}`)
      setSearchValue('')
      setShowSuggestions(false)
    }
  }

  const handleSelectTool = (path) => {
    navigate(path)
    setSearchValue('')
    setShowSuggestions(false)
  }

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (searchRef.current && !searchRef.current.contains(e.target)) {
        setShowSuggestions(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme')
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setIsDark(true)
      document.documentElement.classList.add('dark')
    }
  }, [])

  const toggleTheme = () => {
    if (isDark) {
      document.documentElement.classList.remove('dark')
      localStorage.setItem('theme', 'light')
      setIsDark(false)
    } else {
      document.documentElement.classList.add('dark')
      localStorage.setItem('theme', 'dark')
      setIsDark(true)
    }
  }

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'DailyTools - Free Online Productivity Suite',
          text: 'Check out these awesome free tools for PDFs, Images, and more!',
          url: window.location.href,
        })
      } catch {
        // Silently ignore share cancellations
      }
    } else {
      navigator.clipboard.writeText(window.location.href)
      alert('Link copied to clipboard!')
    }
  }

  return (
    <>
      <nav className="navbar">
        <Link to="/" className="navbar-logo">
          <img 
            src="/logo.png" 
            alt="DailyTools Logo" 
            className="navbar-logo-img" 
            style={{ height: '32px', width: 'auto' }}
          />
          <span className="navbar-logo-text">DailyTools</span>
        </Link>

        <div className="navbar-links">
          <Link to="/" className="navbar-link" title="DailyTools Home - Free Online Productivity Suite">Home</Link>
          <Link to="/pdf-tools" className="navbar-link" title="Professional PDF Tools - Merge, Split, Compress, Protect">PDF</Link>
          <Link to="/image-tools" className="navbar-link" title="Image Studio - Resize, Crop, Optimize, Convert">Image</Link>
          <Link to="/utility-tools" className="navbar-link" title="Smart Utilities - Temp Mail, QR Scanner, Typing Test">Utility</Link>
          <Link to="/about" className="navbar-link" title="About DailyTools - Mission, Privacy & Security">About</Link>
          <Link to="/showcase" className="navbar-link" title="Visual Showcase - Gallery of All Tool Interfaces">Showcase</Link>
          <Link to="/blog" className="navbar-link" title="DailyTools Blog - In-depth Productivity Guides & Tutorials">Blog</Link>
        </div>

        <div className="navbar-actions">
          <button className="icon-btn" aria-label="Toggle Theme" onClick={toggleTheme}>
            {isDark ? <Sun size={18} /> : <Moon size={18} />}
          </button>
          <button className="icon-btn" aria-label="Share Tools" onClick={handleShare}>
            <Share2 size={18} />
          </button>

          <div ref={searchRef} style={{ position: 'relative' }}>
            <form className="navbar-search" onSubmit={handleSearch} role="search">
              <Search size={14} className="navbar-search-icon" aria-hidden="true" />
              <input
                type="text"
                placeholder="Search tools..."
                aria-label="Search across all 18+ tools"
                value={searchValue}
                onChange={(e) => { setSearchValue(e.target.value); setShowSuggestions(true) }}
                onFocus={() => setShowSuggestions(true)}
              />
            </form>

            {/* Live suggestions dropdown */}
            {showSuggestions && (
              <div className="search-suggestions">
                {suggestions.length > 0 ? suggestions.map(tool => (
                  <button
                    key={tool.path}
                    className="suggestion-item"
                    onClick={() => handleSelectTool(tool.path)}
                  >
                    <div className="suggestion-icon" style={{ background: `${tool.color}15`, color: tool.color }}>
                      <tool.icon size={20} />
                    </div>
                    <div className="suggestion-info">
                      <div className="suggestion-title">{tool.title}</div>
                      <div className="suggestion-category">{tool.category}</div>
                    </div>
                  </button>
                )) : (
                  <div className="no-suggestions">
                    No tools match "{searchValue}"
                  </div>
                )}
              </div>
            )}
          </div>

          <button
            className="navbar-mobile-toggle"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label={mobileOpen ? "Close Navigation Menu" : "Open Navigation Menu"}
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {mobileOpen && (
        <div className="mobile-menu-overlay open" onClick={() => setMobileOpen(false)} />
      )}

      <div className={`mobile-menu ${mobileOpen ? 'open' : ''}`}>
        <button className="mobile-menu-close" onClick={() => setMobileOpen(false)} aria-label="Close Menu">
          <X size={20} />
        </button>
        <Link to="/" className="mobile-menu-link" onClick={() => setMobileOpen(false)}>Home</Link>
        <Link to="/pdf-tools" className="mobile-menu-link" onClick={() => setMobileOpen(false)}>PDF Tools</Link>
        <Link to="/image-tools" className="mobile-menu-link" onClick={() => setMobileOpen(false)}>Image Tools</Link>
        <Link to="/utility-tools" className="mobile-menu-link" onClick={() => setMobileOpen(false)}>Utility Tools</Link>
        <Link to="/showcase" className="mobile-menu-link" onClick={() => setMobileOpen(false)}>Visual Showcase</Link>
        <div style={{ padding: '0.5rem 2rem', fontSize: '0.75rem', fontWeight: 800, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.1em', marginTop: '1rem' }}>Company</div>
        <Link to="/about" className="mobile-menu-link" onClick={() => setMobileOpen(false)}>About Us</Link>
        <Link to="/founder" className="mobile-menu-link" onClick={() => setMobileOpen(false)}>Meet the Founder</Link>
        <Link to="/services" className="mobile-menu-link" onClick={() => setMobileOpen(false)}>Services</Link>
        <Link to="/products" className="mobile-menu-link" onClick={() => setMobileOpen(false)}>Products</Link>
        <Link to="/developer" className="mobile-menu-link" onClick={() => setMobileOpen(false)}>Developer</Link>
        <div style={{ padding: '0.5rem 2rem', fontSize: '0.75rem', fontWeight: 800, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.1em', marginTop: '1rem' }}>Support</div>
        <Link to="/blog" className="mobile-menu-link" onClick={() => setMobileOpen(false)}>Blog</Link>
        <Link to="/faq" className="mobile-menu-link" onClick={() => setMobileOpen(false)}>FAQ</Link>
        <Link to="/contact" className="mobile-menu-link" onClick={() => setMobileOpen(false)}>Contact</Link>
      </div>
    </>
  )
}
