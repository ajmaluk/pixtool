import { useState, useEffect, useRef } from 'react'
import { NavLink, Link, useNavigate, useLocation } from 'react-router-dom'
import { 
  Menu, X, Moon, Sun, Share2, ChevronDown, ChevronRight,
  Sparkles, BookOpen, Shield, FileText, HelpCircle, 
  Mail, User, Code, DollarSign, Cookie as CookieIcon, 
  MessageSquare, FileCode, Newspaper, Users, 
  ShoppingBag, Star, Zap, Microscope, Rocket, Gift,
  Home, Info, Layers, Activity, Calculator, Image as ImageIcon
} from 'lucide-react'
import { useAlert } from '../context/ConfirmContext'

export default function Navbar() {
  const alert = useAlert()
  const getInitialIsDark = () => {
    if (typeof window === 'undefined') return true
    const savedTheme = localStorage.getItem('theme')
    if (savedTheme) return savedTheme === 'dark'
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
  }

  const [mobileOpen, setMobileOpen] = useState(false)
  const [isDark, setIsDark] = useState(getInitialIsDark)
  const [showMore, setShowMore] = useState(false)
  const navigate = useNavigate()
  const location = useLocation()
  const moreRef = useRef(null)

  const morePaths = [
    '/showcase', '/blog', '/privacy-policy', '/terms-of-service', 
    '/cookie-policy', '/refund-policy', '/faq', '/contact', 
    '/documentation', '/testimonials', '/founder', '/developer', '/status',
    '/services', '/products', '/news', '/case-studies',
    '/support-us', '/promotions', '/hire-me', '/careers', '/thank-you', '/sitemap'
  ]
  const isMoreActive = morePaths.includes(location.pathname) || location.pathname.startsWith('/blog/')

  // Global Cmd+K keyboard shortcut focuses main search
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault()
        const heroInput = document.querySelector('.search-input')
        if (heroInput) {
          heroInput.focus()
        } else {
          navigate('/?focus=search')
        }
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [navigate])

  useEffect(() => {
    const handleClickOutside = (e) => {
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
      document.documentElement.classList.remove('light')
      document.documentElement.setAttribute('data-theme', 'dark')
    } else {
      document.documentElement.classList.remove('dark')
      document.documentElement.classList.add('light')
      document.documentElement.setAttribute('data-theme', 'light')
    }
  }, [isDark])

  const toggleTheme = () => {
    const nextDark = !isDark
    setIsDark(nextDark)
    localStorage.setItem('theme', nextDark ? 'dark' : 'light')
    if (nextDark) {
      document.documentElement.classList.add('dark')
      document.documentElement.classList.remove('light')
      document.documentElement.setAttribute('data-theme', 'dark')
    } else {
      document.documentElement.classList.remove('dark')
      document.documentElement.classList.add('light')
      document.documentElement.setAttribute('data-theme', 'light')
    }
  }

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'PixTool — Free Online AI & Productivity Workspace',
          text: 'Check out 120+ free browser-based tools for PDFs, Images, AI, and Utilities!',
          url: window.location.href,
        })
      } catch {
        // user cancelled share
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
      <nav className="navbar" role="navigation" aria-label="Main Navigation">
        {/* Brand Logo */}
        <Link id="nav-logo" to="/" className="navbar-logo group" title="PixTool Home" aria-label="PixTool Home">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-cyan-400 flex items-center justify-center shadow-lg shadow-indigo-500/25 group-hover:scale-105 transition-all">
            <Sparkles className="w-4 h-4 text-white animate-pulse" />
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-1.5">
              <span className="navbar-logo-text bg-gradient-to-r from-white via-slate-100 to-indigo-200 bg-clip-text text-transparent font-extrabold text-lg tracking-tight">
                Pix<span className="text-indigo-400">Tool</span>
              </span>
              <span className="text-[10px] font-bold px-1.5 py-0.2 rounded-full bg-indigo-500/15 border border-indigo-500/30 text-indigo-300">
                v2.6
              </span>
            </div>
          </div>
        </Link>

        {/* Primary Desktop Nav Links */}
        <div className="navbar-links">
          <NavLink id="nav-link-home" to="/" className="navbar-link" end>
            Home
          </NavLink>
          <NavLink id="nav-link-about" to="/about" className="navbar-link">
            About
          </NavLink>
          <NavLink id="nav-link-products" to="/products" className="navbar-link">
            Products
          </NavLink>
          <NavLink id="nav-link-founder" to="/founder" className="navbar-link">
            Founder
          </NavLink>
          <NavLink id="nav-link-blog" to="/blog" className="navbar-link">
            Blog
          </NavLink>
          <NavLink id="nav-link-showcase" to="/showcase" className="navbar-link">
            Showcase
          </NavLink>
          
          {/* Mega Dropdown */}
          <div className="nav-dropdown" ref={moreRef}>
            <button 
              id="nav-btn-more"
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
                  {/* Tool Suites Column */}
                  <div>
                    <div className="dropdown-section-title">Tool Suites</div>
                    <NavLink to="/ai-tools" className="dropdown-item" onClick={() => setShowMore(false)}>
                      <Sparkles size={15} className="text-purple-400" /> AI Studio (14)
                    </NavLink>
                    <NavLink to="/pdf-tools" className="dropdown-item" onClick={() => setShowMore(false)}>
                      <FileText size={15} className="text-red-400" /> PDF Suite (9)
                    </NavLink>
                    <NavLink to="/image-tools" className="dropdown-item" onClick={() => setShowMore(false)}>
                      <Zap size={15} className="text-blue-400" /> Image Lab (10)
                    </NavLink>
                    <NavLink to="/utility-tools" className="dropdown-item" onClick={() => setShowMore(false)}>
                      <Code size={15} className="text-emerald-400" /> Utilities (16)
                    </NavLink>
                    <NavLink to="/math-tools" className="dropdown-item" onClick={() => setShowMore(false)}>
                      <Star size={15} className="text-amber-400" /> Math Hub (10)
                    </NavLink>
                    <NavLink to="/productivity-tools" className="dropdown-item" onClick={() => setShowMore(false)}>
                      <ShoppingBag size={15} className="text-cyan-400" /> Productivity (8)
                    </NavLink>
                  </div>

                  {/* Resources Column */}
                  <div>
                    <div className="dropdown-section-title">Resources & Info</div>
                    <NavLink to="/documentation" className="dropdown-item" onClick={() => setShowMore(false)}>
                      <FileCode size={15} /> Documentation
                    </NavLink>
                    <NavLink to="/news" className="dropdown-item" onClick={() => setShowMore(false)}>
                      <Newspaper size={15} /> Release News
                    </NavLink>
                    <NavLink to="/status" className="dropdown-item" onClick={() => setShowMore(false)}>
                      <FileText size={15} /> System Status
                    </NavLink>
                    <NavLink to="/case-studies" className="dropdown-item" onClick={() => setShowMore(false)}>
                      <Microscope size={15} /> Case Studies
                    </NavLink>
                    <NavLink to="/developer" className="dropdown-item" onClick={() => setShowMore(false)}>
                      <Code size={15} /> Developer API
                    </NavLink>
                    <NavLink to="/services" className="dropdown-item" onClick={() => setShowMore(false)}>
                      <Zap size={15} /> Pro Services
                    </NavLink>
                  </div>

                  {/* Support & Legal Column */}
                  <div>
                    <div className="dropdown-section-title">Support & Legal</div>
                    <NavLink to="/faq" className="dropdown-item" onClick={() => setShowMore(false)}>
                      <HelpCircle size={15} /> FAQ Hub
                    </NavLink>
                    <NavLink to="/contact" className="dropdown-item" onClick={() => setShowMore(false)}>
                      <Mail size={15} /> Contact Us
                    </NavLink>
                    <NavLink to="/testimonials" className="dropdown-item" onClick={() => setShowMore(false)}>
                      <MessageSquare size={15} /> User Reviews
                    </NavLink>
                    <NavLink to="/privacy-policy" className="dropdown-item" onClick={() => setShowMore(false)}>
                      <Shield size={15} /> Privacy Policy
                    </NavLink>
                    <NavLink to="/terms-of-service" className="dropdown-item" onClick={() => setShowMore(false)}>
                      <FileText size={15} /> Terms of Service
                    </NavLink>
                    <NavLink to="/cookie-policy" className="dropdown-item" onClick={() => setShowMore(false)}>
                      <CookieIcon size={15} /> Cookie Policy
                    </NavLink>
                  </div>
                </div>

                <div style={{ marginTop: '1.25rem', paddingTop: '1rem', borderTop: '1px solid var(--border-color)', display: 'flex', gap: '1.5rem', justifyContent: 'center' }}>
                  <NavLink to="/promotions" className="dropdown-item dense" onClick={() => setShowMore(false)}>
                    <Gift size={14} className="text-pink-400" /> Promotions
                  </NavLink>
                  <NavLink to="/support-us" className="dropdown-item dense" onClick={() => setShowMore(false)}>
                    <Rocket size={14} className="text-indigo-400" /> Support Us
                  </NavLink>
                  <NavLink to="/sitemap" className="dropdown-item dense" onClick={() => setShowMore(false)}>
                    <BookOpen size={14} className="text-emerald-400" /> Sitemap
                  </NavLink>
                  <NavLink to="/hire-me" className="dropdown-item dense" onClick={() => setShowMore(false)}>
                    <Star size={14} className="text-amber-400" /> Hire Team
                  </NavLink>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right Actions: Theme Toggle, Share, Mobile Menu */}
        <div className="navbar-actions">

          {/* Theme Toggle */}
          <button 
            className="icon-btn" 
            aria-label="Toggle Theme" 
            onClick={toggleTheme}
            title={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
          >
            {isDark ? <Sun size={17} className="text-amber-400" aria-hidden="true" /> : <Moon size={17} className="text-indigo-400" aria-hidden="true" />}
          </button>

          {/* Share */}
          <button 
            className="icon-btn" 
            aria-label="Share Tools" 
            onClick={handleShare}
            title="Share PixTool"
          >
            <Share2 size={17} aria-hidden="true" />
          </button>

          {/* Mobile Menu Hamburger */}
          <button
            className="navbar-mobile-toggle"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label={mobileOpen ? "Close Menu" : "Open Menu"}
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </nav>

      {mobileOpen && (
        <div className="mobile-menu-overlay open" onClick={() => setMobileOpen(false)} />
      )}

      {/* Mobile Drawer */}
      <div className={`mobile-menu ${mobileOpen ? 'open' : ''}`}>
        <div className="mobile-menu-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center font-bold text-white shadow-md">
              <Sparkles size={16} />
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <span className="font-extrabold text-base tracking-tight text-white">Pix<span className="text-indigo-400">Tool</span></span>
              <span className="text-[9px] font-bold px-1.5 py-0.2 rounded-full bg-indigo-500/15 border border-indigo-500/30 text-indigo-300">v2.6</span>
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
            <button className="mobile-theme-btn" onClick={toggleTheme} aria-label="Toggle Theme">
              {isDark ? <Sun size={16} className="text-amber-400" /> : <Moon size={16} className="text-slate-300" />}
            </button>
            <button className="mobile-menu-close" onClick={() => setMobileOpen(false)} aria-label="Close Menu">
              <X size={18} />
            </button>
          </div>
        </div>

        <div className="mobile-menu-content">
          <div className="mobile-section-title">Navigation</div>
          <NavLink to="/" className="mobile-nav-item" onClick={() => setMobileOpen(false)} end>
            <div className="mobile-nav-icon"><Home size={16} /></div>
            <span>Home</span>
          </NavLink>
          <NavLink to="/about" className="mobile-nav-item" onClick={() => setMobileOpen(false)}>
            <div className="mobile-nav-icon"><Info size={16} /></div>
            <span>About PixTool</span>
          </NavLink>
          <NavLink to="/products" className="mobile-nav-item" onClick={() => setMobileOpen(false)}>
            <div className="mobile-nav-icon"><Layers size={16} /></div>
            <span>Products & Apps</span>
          </NavLink>
          <NavLink to="/founder" className="mobile-nav-item" onClick={() => setMobileOpen(false)}>
            <div className="mobile-nav-icon"><User size={16} /></div>
            <span>Founder Profile</span>
          </NavLink>
          <NavLink to="/blog" className="mobile-nav-item" onClick={() => setMobileOpen(false)}>
            <div className="mobile-nav-icon"><BookOpen size={16} /></div>
            <span>Blog & Tutorials</span>
          </NavLink>
          <NavLink to="/showcase" className="mobile-nav-item" onClick={() => setMobileOpen(false)}>
            <div className="mobile-nav-icon"><Sparkles size={16} /></div>
            <span>Tool Showcase</span>
          </NavLink>

          <div className="mobile-section-title">Tool Suites (120+)</div>
          <NavLink to="/ai-tools" className="mobile-nav-item" onClick={() => setMobileOpen(false)}>
            <div className="mobile-nav-icon" style={{ background: 'rgba(168, 85, 247, 0.12)', color: '#c084fc' }}><Sparkles size={16} /></div>
            <span style={{ flex: 1 }}>AI Studio</span>
            <span className="mobile-nav-badge">14 Tools</span>
          </NavLink>
          <NavLink to="/pdf-tools" className="mobile-nav-item" onClick={() => setMobileOpen(false)}>
            <div className="mobile-nav-icon" style={{ background: 'rgba(239, 68, 68, 0.12)', color: '#f87171' }}><FileText size={16} /></div>
            <span style={{ flex: 1 }}>PDF Suite</span>
            <span className="mobile-nav-badge">9 Tools</span>
          </NavLink>
          <NavLink to="/image-tools" className="mobile-nav-item" onClick={() => setMobileOpen(false)}>
            <div className="mobile-nav-icon" style={{ background: 'rgba(59, 130, 246, 0.12)', color: '#60a5fa' }}><ImageIcon size={16} /></div>
            <span style={{ flex: 1 }}>Image Lab</span>
            <span className="mobile-nav-badge">10 Tools</span>
          </NavLink>
          <NavLink to="/utility-tools" className="mobile-nav-item" onClick={() => setMobileOpen(false)}>
            <div className="mobile-nav-icon" style={{ background: 'rgba(16, 185, 129, 0.12)', color: '#34d399' }}><Zap size={16} /></div>
            <span style={{ flex: 1 }}>Utilities</span>
            <span className="mobile-nav-badge">16 Tools</span>
          </NavLink>
          <NavLink to="/math-tools" className="mobile-nav-item" onClick={() => setMobileOpen(false)}>
            <div className="mobile-nav-icon" style={{ background: 'rgba(245, 158, 11, 0.12)', color: '#fbbf24' }}><Calculator size={16} /></div>
            <span style={{ flex: 1 }}>Math Hub</span>
            <span className="mobile-nav-badge">10 Tools</span>
          </NavLink>
          <NavLink to="/productivity-tools" className="mobile-nav-item" onClick={() => setMobileOpen(false)}>
            <div className="mobile-nav-icon" style={{ background: 'rgba(99, 102, 241, 0.12)', color: '#818cf8' }}><ShoppingBag size={16} /></div>
            <span style={{ flex: 1 }}>Productivity</span>
            <span className="mobile-nav-badge">8 Tools</span>
          </NavLink>
          
          <div className="mobile-section-title">Resources & Support</div>
          <NavLink to="/documentation" className="mobile-nav-item" onClick={() => setMobileOpen(false)}>
            <div className="mobile-nav-icon"><FileCode size={16} /></div>
            <span>Documentation</span>
          </NavLink>
          <NavLink to="/status" className="mobile-nav-item" onClick={() => setMobileOpen(false)}>
            <div className="mobile-nav-icon"><Activity size={16} /></div>
            <span>System Status</span>
          </NavLink>
          <NavLink to="/faq" className="mobile-nav-item" onClick={() => setMobileOpen(false)}>
            <div className="mobile-nav-icon"><HelpCircle size={16} /></div>
            <span>FAQ Hub</span>
          </NavLink>
          <NavLink to="/contact" className="mobile-nav-item" onClick={() => setMobileOpen(false)}>
            <div className="mobile-nav-icon"><Mail size={16} /></div>
            <span>Contact & Support</span>
          </NavLink>
          <NavLink to="/privacy-policy" className="mobile-nav-item" onClick={() => setMobileOpen(false)}>
            <div className="mobile-nav-icon"><Shield size={16} /></div>
            <span>Privacy Policy</span>
          </NavLink>
        </div>

        <div className="mobile-menu-footer">
          <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', fontWeight: 600 }}>
            © 2026 PixTool • 100% Private
          </div>
          <button className="mobile-share-btn" onClick={handleShare}>
            <Share2 size={13} />
            <span>Share</span>
          </button>
        </div>
      </div>
    </>
  )
}
