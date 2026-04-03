import { useState, useEffect, useRef } from 'react'
import { NavLink, Link, useNavigate, useLocation } from 'react-router-dom'
import { 
  Menu, X, Moon, Sun, Share2, Search, ChevronDown, 
  Sparkles, BookOpen, Shield, FileText, HelpCircle, 
  Mail, User, Code, Briefcase, DollarSign, Cookie as CookieIcon, 
  MessageSquare, FileCode, Newspaper, Users, Info, 
  ShoppingBag, Star, Zap, GraduationCap, Microscope, Rocket, Gift
} from 'lucide-react'
import { useAlert } from '../context/ConfirmContext'
import { IMAGE_TOOLS, PDF_TOOLS, UTILITY_TOOLS, AI_TOOLS, MATH_TOOLS, PRODUCTIVITY_TOOLS } from '../data/tools'

const allTools = [
  ...IMAGE_TOOLS.filter(t => !t.status).map(t => ({ path: t.path, title: t.title, category: 'Image', icon: t.icon, color: t.color })),
  ...PDF_TOOLS.filter(t => !t.status).map(t => ({ path: t.path, title: t.title, category: 'PDF', icon: t.icon, color: t.color })),
  ...UTILITY_TOOLS.filter(t => !t.status).map(t => ({ path: t.path, title: t.title, category: 'Utility', icon: t.icon, color: t.color })),
  ...AI_TOOLS.filter(t => !t.status).map(t => ({ path: t.path, title: t.title, category: 'AI', icon: t.icon, color: t.color })),
  ...MATH_TOOLS.filter(t => !t.status).map(t => ({ path: t.path, title: t.title, category: 'Math', icon: t.icon, color: t.color })),
  ...PRODUCTIVITY_TOOLS.filter(t => !t.status).map(t => ({ path: t.path, title: t.title, category: 'Productivity', icon: t.icon, color: t.color })),
]

export default function Navbar() {
  const alert = useAlert()
  const getInitialIsDark = () => {
    if (typeof window === 'undefined') return false
    const savedTheme = localStorage.getItem('theme')
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    return savedTheme === 'dark' || (!savedTheme && prefersDark)
  }

  const [mobileOpen, setMobileOpen] = useState(false)
  const [searchValue, setSearchValue] = useState('')
  const [showSuggestions, setShowSuggestions] = useState(false)
  const [isDark, setIsDark] = useState(getInitialIsDark)
  const [showMore, setShowMore] = useState(false)
  const navigate = useNavigate()
  const location = useLocation()
  const searchRef = useRef(null)
  const moreRef = useRef(null)

  const morePaths = [
    '/showcase', '/blog', '/privacy-policy', '/terms-of-service', 
    '/cookie-policy', '/refund-policy', '/faq', '/contact', 
    '/documentation', '/testimonials', '/founder', '/developer', '/status',
    '/services', '/products', '/news', '/case-studies',
    '/support-us', '/promotions', '/hire-me', '/careers', '/thank-you', '/sitemap'
  ]
  const isMoreActive = morePaths.includes(location.pathname) || location.pathname.startsWith('/blog/')

  const [debouncedSearch, setDebouncedSearch] = useState('')

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchValue)
    }, 150) // Technical optimization: 150ms debounce for UI fluidity
    return () => clearTimeout(timer)
  }, [searchValue])

  const suggestions = debouncedSearch.trim()
    ? allTools.filter(t =>
      t.title.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
      t.category.toLowerCase().includes(debouncedSearch.toLowerCase())
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
      if (moreRef.current && !moreRef.current.contains(e.target)) {
        setShowMore(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [isDark])

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
          title: 'PixTool - Free Online Productivity Suite',
          text: 'Check out these awesome free tools for PDFs, Images, and more!',
          url: window.location.href,
        })
      } catch {
        // Silently ignore share cancellations
      }
    } else {
      navigator.clipboard.writeText(window.location.href)
      alert({
        title: 'Link Copied',
        message: 'PixTool link has been copied to your clipboard!',
        type: 'success'
      })
    }
  }

  return (
    <>
      <nav className="navbar">
        <Link to="/" className="navbar-logo" title="PixTool Home - Professional Private Productivity Suite" aria-label="PixTool Home">
          <img 
            src="/logo.webp" 
            alt="PixTool - Secure Private Browser Hub" 
            className="navbar-logo-img navbar-logo-icon" 
            width="56"
            height="56"
            fetchPriority="high"
            loading="eager"
            aria-hidden="true"
          />
          <span className="navbar-logo-text">PixTool</span>
        </Link>

        <div className="navbar-links">
          <NavLink to="/" className="navbar-link" end>Home</NavLink>
          <NavLink to="/pdf-tools" className="navbar-link">PDF</NavLink>
          <NavLink to="/image-tools" className="navbar-link">Image</NavLink>
          <NavLink to="/utility-tools" className="navbar-link">Utility</NavLink>
          <NavLink to="/ai-tools" className="navbar-link">AI</NavLink>
          <NavLink to="/math-tools" className="navbar-link">Math</NavLink>
          <NavLink to="/productivity-tools" className="navbar-link" style={{ position: 'relative' }}>
            Productivity
            <span className="navbar-new-badge">New</span>
          </NavLink>
          
          <div className="nav-dropdown" ref={moreRef}>
            <button 
              className={`nav-dropdown-trigger ${isMoreActive ? 'nav-more-active' : ''}`}
              onClick={() => setShowMore(!showMore)}
              aria-haspopup="true"
              aria-expanded={showMore}
              aria-controls="nav-more-menu"
            >
              More <ChevronDown size={14} style={{ transform: showMore ? 'rotate(180deg)' : 'rotate(0)', transition: 'transform 0.3s ease' }} aria-hidden="true" />
            </button>

            {showMore && (
                <div
                  id="nav-more-menu"
                  className="nav-dropdown-menu expanded"
                  role="menu"
                >
                  <div className="dropdown-grid-3">
                    {/* Resources Column */}
                    <div>
                      <div className="dropdown-section-title">Resources</div>
                      <NavLink to="/showcase" className="dropdown-item" onClick={() => setShowMore(false)}>
                        <Sparkles size={16} /> Showcase
                      </NavLink>
                      <NavLink to="/blog" className="dropdown-item" onClick={() => setShowMore(false)}>
                        <BookOpen size={16} /> Blog
                      </NavLink>
                      <NavLink to="/news" className="dropdown-item" onClick={() => setShowMore(false)}>
                        <Newspaper size={16} /> News
                      </NavLink>
                      <NavLink to="/documentation" className="dropdown-item" onClick={() => setShowMore(false)}>
                        <FileCode size={16} /> Docs
                      </NavLink>
                      <NavLink to="/status" className="dropdown-item" onClick={() => setShowMore(false)}>
                        <FileText size={16} /> Status & Changelog
                      </NavLink>
                      <NavLink to="/case-studies" className="dropdown-item" onClick={() => setShowMore(false)}>
                        <Microscope size={16} /> Case Studies
                      </NavLink>
                    </div>

                    {/* Company Column */}
                    <div>
                      <div className="dropdown-section-title">Company</div>
                      <NavLink to="/about" className="dropdown-item" onClick={() => setShowMore(false)}>
                        <Users size={16} /> About Us
                      </NavLink>
                      <NavLink to="/founder" className="dropdown-item" onClick={() => setShowMore(false)}>
                        <User size={16} /> Founder
                      </NavLink>
                      <NavLink to="/developer" className="dropdown-item" onClick={() => setShowMore(false)}>
                        <Code size={16} /> Developer
                      </NavLink>
                      <NavLink to="/services" className="dropdown-item" onClick={() => setShowMore(false)}>
                        <Zap size={16} /> Services
                      </NavLink>
                      <NavLink to="/products" className="dropdown-item" onClick={() => setShowMore(false)}>
                        <ShoppingBag size={16} /> Products
                      </NavLink>
                      <NavLink to="/careers" className="dropdown-item" onClick={() => setShowMore(false)}>
                        <GraduationCap size={16} /> Careers
                      </NavLink>
                      <NavLink to="/testimonials" className="dropdown-item" onClick={() => setShowMore(false)}>
                        <MessageSquare size={16} /> Reviews
                      </NavLink>
                    </div>

                    {/* Support Column */}
                    <div>
                      <div className="dropdown-section-title">Support & Legal</div>
                      <NavLink to="/faq" className="dropdown-item" onClick={() => setShowMore(false)}>
                        <HelpCircle size={16} /> FAQ
                      </NavLink>
                      <NavLink to="/contact" className="dropdown-item" onClick={() => setShowMore(false)}>
                        <Mail size={16} /> Contact
                      </NavLink>
                      <NavLink to="/privacy-policy" className="dropdown-item" onClick={() => setShowMore(false)}>
                        <Shield size={16} /> Privacy
                      </NavLink>
                      <NavLink to="/terms-of-service" className="dropdown-item" onClick={() => setShowMore(false)}>
                        <FileText size={16} /> Terms
                      </NavLink>
                      <NavLink to="/cookie-policy" className="dropdown-item" onClick={() => setShowMore(false)}>
                        <CookieIcon size={16} /> Cookies
                      </NavLink>
                      <NavLink to="/refund-policy" className="dropdown-item" onClick={() => setShowMore(false)}>
                        <DollarSign size={16} /> Refund
                      </NavLink>
                    </div>
                  </div>

                  <div style={{ marginTop: '1.5rem', paddingTop: '1rem', borderTop: '1px solid var(--border-color)', display: 'flex', gap: '1rem', justifyContent: 'center' }}>
                     <NavLink to="/promotions" className="dropdown-item dense" onClick={() => setShowMore(false)}>
                        <Gift size={15} /> Promotions
                      </NavLink>
                      <NavLink to="/support-us" className="dropdown-item dense" onClick={() => setShowMore(false)}>
                        <Rocket size={15} /> Support Us
                      </NavLink>
                      <NavLink to="/hire-me" className="dropdown-item dense" onClick={() => setShowMore(false)}>
                        <Star size={15} /> Hire Us
                      </NavLink>
                  </div>
                </div>
            )}
          </div>
        </div>

        <div className="navbar-actions">
          <button className="icon-btn" aria-label="Toggle Theme" onClick={toggleTheme}>
            {isDark ? <Sun size={18} aria-hidden="true" /> : <Moon size={18} aria-hidden="true" />}
          </button>
          <button className="icon-btn" aria-label="Share Tools" onClick={handleShare}>
            <Share2 size={18} aria-hidden="true" />
          </button>

          <div ref={searchRef} style={{ position: 'relative' }}>
            <form className="navbar-search" onSubmit={handleSearch} role="search">
              <Search size={14} className="navbar-search-icon" aria-hidden="true" />
              <input
                id="navbar-tool-search"
                name="search"
                type="text"
                placeholder="Search tools..."
                autoComplete="off"
                aria-label="Search across all tools"
                value={searchValue}
                onChange={(e) => { setSearchValue(e.target.value); setShowSuggestions(true) }}
                onFocus={() => setShowSuggestions(true)}
              />
            </form>

            {showSuggestions && (
              <div className="search-suggestions">
                {suggestions.length > 0 ? (
                  suggestions.map(tool => (
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
                  ))
                ) : (
                  <div className="no-suggestions-state">
                    <div className="no-suggestions-icon">🔍</div>
                    <div className="no-suggestions-title">No tools match "{searchValue}"</div>
                    <p className="no-suggestions-text">
                      Try searching for a different keyword or explore our popular categories below.
                    </p>
                    <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                      <Link to="/image-tools" className="btn btn-secondary dense" style={{ borderRadius: '10px' }} onClick={() => setShowSuggestions(false)}>Image Tools</Link>
                      <Link to="/pdf-tools" className="btn btn-secondary dense" style={{ borderRadius: '10px' }} onClick={() => setShowSuggestions(false)}>PDF Tools</Link>
                      <Link to="/utility-tools" className="btn btn-secondary dense" style={{ borderRadius: '10px' }} onClick={() => setShowSuggestions(false)}>Utility</Link>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          <button
            className="navbar-mobile-toggle"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label={mobileOpen ? "Close Menu" : "Open Menu"}
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
        <div className="mobile-menu-content">
          <NavLink to="/" className="mobile-menu-link" onClick={() => setMobileOpen(false)} end>Home</NavLink>
          <NavLink to="/pdf-tools" className="mobile-menu-link" onClick={() => setMobileOpen(false)}>PDF Tools</NavLink>
          <NavLink to="/image-tools" className="mobile-menu-link" onClick={() => setMobileOpen(false)}>Image Tools</NavLink>
          <NavLink to="/utility-tools" className="mobile-menu-link" onClick={() => setMobileOpen(false)}>Utility Tools</NavLink>
          <NavLink to="/ai-tools" className="mobile-menu-link" onClick={() => setMobileOpen(false)}>AI Tools</NavLink>
          <NavLink to="/math-tools" className="mobile-menu-link" onClick={() => setMobileOpen(false)}>Math Tools</NavLink>
          <NavLink to="/productivity-tools" className="mobile-menu-link" onClick={() => setMobileOpen(false)} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            Productivity Tools
            <span className="navbar-new-badge" style={{ position: 'static', transform: 'none' }}>New</span>
          </NavLink>
          
          <div className="mobile-section-title">Resources</div>
          <NavLink to="/showcase" className="mobile-menu-link" onClick={() => setMobileOpen(false)}>Visual Showcase</NavLink>
          <NavLink to="/blog" className="mobile-menu-link" onClick={() => setMobileOpen(false)}>Blog & Tutorials</NavLink>
          <NavLink to="/news" className="mobile-menu-link" onClick={() => setMobileOpen(false)}>Latest News</NavLink>
          <NavLink to="/documentation" className="mobile-menu-link" onClick={() => setMobileOpen(false)}>Documentation</NavLink>
          <NavLink to="/status" className="mobile-menu-link" onClick={() => setMobileOpen(false)}>Status & Changelog</NavLink>
          
          <div className="mobile-section-title">Company</div>
          <NavLink to="/about" className="mobile-menu-link" onClick={() => setMobileOpen(false)}>About Us</NavLink>
          <NavLink to="/founder" className="mobile-menu-link" onClick={() => setMobileOpen(false)}>Meet the Founder</NavLink>
          <NavLink to="/developer" className="mobile-menu-link" onClick={() => setMobileOpen(false)}>Developer</NavLink>
          <NavLink to="/services" className="mobile-menu-link" onClick={() => setMobileOpen(false)}>Services</NavLink>
          <NavLink to="/products" className="mobile-menu-link" onClick={() => setMobileOpen(false)}>Products</NavLink>
          <NavLink to="/careers" className="mobile-menu-link" onClick={() => setMobileOpen(false)}>Careers</NavLink>
          <NavLink to="/testimonials" className="mobile-menu-link" onClick={() => setMobileOpen(false)}>Reviews</NavLink>
          
          <div className="mobile-section-title">Support & Legal</div>
          <NavLink to="/contact" className="mobile-menu-link" onClick={() => setMobileOpen(false)}>Contact Support</NavLink>
          <NavLink to="/faq" className="mobile-menu-link" onClick={() => setMobileOpen(false)}>FAQ</NavLink>
          <NavLink to="/privacy-policy" className="mobile-menu-link" onClick={() => setMobileOpen(false)}>Privacy Policy</NavLink>
          <NavLink to="/terms-of-service" className="mobile-menu-link" onClick={() => setMobileOpen(false)}>Terms of Service</NavLink>
          <NavLink to="/cookie-policy" className="mobile-menu-link" onClick={() => setMobileOpen(false)}>Cookie Policy</NavLink>
          <NavLink to="/refund-policy" className="mobile-menu-link" onClick={() => setMobileOpen(false)}>Refund Policy</NavLink>
        </div>
      </div>

    </>
  )
}
