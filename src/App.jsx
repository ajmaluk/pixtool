import { Suspense, lazy, Component } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Routes, Route, Outlet, useLocation, Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import ScrollToTop from './components/ScrollToTop'
import { ALL_TOOLS_MAP } from './data/tools'

// Lazy load pages
const Home = lazy(() => import('./pages/Home'))
const ImageTools = lazy(() => import('./pages/ImageTools'))
const PdfTools = lazy(() => import('./pages/PdfTools'))
const TempMail = lazy(() => import('./pages/TempMail'))
const QrScanner = lazy(() => import('./pages/QrScanner'))
const QrGenerator = lazy(() => import('./pages/QrGenerator'))
const UtilityTools = lazy(() => import('./pages/UtilityTools'))
const About = lazy(() => import('./pages/About'))
const Founder = lazy(() => import('./pages/Founder'))
const Developer = lazy(() => import('./pages/Developer'))
const Services = lazy(() => import('./pages/Services'))
const Products = lazy(() => import('./pages/Products'))
const Privacy = lazy(() => import('./pages/Privacy'))
const Terms = lazy(() => import('./pages/Terms'))
const Contact = lazy(() => import('./pages/Contact'))
const FAQ = lazy(() => import('./pages/FAQ'))
const Refund = lazy(() => import('./pages/Refund'))
const Cookie = lazy(() => import('./pages/Cookie'))
const Blog = lazy(() => import('./pages/Blog'))
const News = lazy(() => import('./pages/News'))
const Testimonials = lazy(() => import('./pages/Testimonials'))
const Documentation = lazy(() => import('./pages/Documentation'))
const Careers = lazy(() => import('./pages/Careers'))
const CaseStudies = lazy(() => import('./pages/CaseStudies'))
const Sponsor = lazy(() => import('./pages/Sponsor'))
const Promotions = lazy(() => import('./pages/Promotions'))
const HireMe = lazy(() => import('./pages/HireMe'))
const ThankYou = lazy(() => import('./pages/ThankYou'))
const BlogPost = lazy(() => import('./pages/BlogPost'))
const Sitemap = lazy(() => import('./pages/Sitemap'))
const Showcase = lazy(() => import('./pages/Showcase'))
const NotFound = lazy(() => import('./pages/NotFound'))
const TenMinuteMail = lazy(() => import('./pages/TenMinuteMail'))
const ChangeEmail = lazy(() => import('./pages/ChangeEmail'))
const FakeEmail = lazy(() => import('./pages/FakeEmail'))
const DisposableEmail = lazy(() => import('./pages/DisposableEmail'))
const ThrowawayEmail = lazy(() => import('./pages/ThrowawayEmail'))
const TypingTest = lazy(() => import('./pages/TypingTest'))

// Loading component — stays visible inside the layout
const PageLoader = () => (
  <div style={{
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '60vh',
    color: 'var(--accent-primary)',
    flexDirection: 'column',
    gap: '1rem'
  }}>
    <div className="loader" style={{
      width: '40px',
      height: '40px',
      border: '3px solid var(--border-color)',
      borderTop: '3px solid var(--accent-primary)',
      borderRadius: '50%',
      animation: 'spin 0.8s linear infinite'
    }} />
    <span style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Loading...</span>
  </div>
)

// Error Boundary to catch render errors and prevent blank pages
class ErrorBoundary extends Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error }
  }

  componentDidCatch(error, errorInfo) {
    console.error('Page render error:', error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '60vh',
          flexDirection: 'column',
          gap: '1.5rem',
          padding: '2rem',
          textAlign: 'center'
        }}>
          <div style={{
            width: '64px',
            height: '64px',
            borderRadius: '50%',
            background: 'var(--accent-red-50, #fef2f2)',
            color: 'var(--accent-red, #ef4444)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '1.5rem',
            fontWeight: 700
          }}>!</div>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 700 }}>Something went wrong</h2>
          <p style={{ color: 'var(--text-secondary)', maxWidth: '400px', lineHeight: 1.6 }}>
            This page encountered an error. Please try refreshing or go back to the home page.
          </p>
          {this.state.error && (
            <pre style={{ 
              background: 'var(--bg-secondary)', 
              padding: '1rem', 
              borderRadius: '8px', 
              fontSize: '0.8rem', 
              color: 'var(--accent-red)',
              maxWidth: '90%',
              overflow: 'auto',
              textAlign: 'left'
            }}>
              {this.state.error.toString()}
            </pre>
          )}
          <div style={{ display: 'flex', gap: '1rem' }}>
            <button
              onClick={() => window.location.reload()}
              className="btn btn-primary"
              style={{ padding: '0.75rem 1.5rem', borderRadius: '12px' }}
            >
              Refresh Page
            </button>
            <button
              onClick={() => { this.setState({ hasError: false }); window.location.href = '/' }}
              className="btn"
              style={{ padding: '0.75rem 1.5rem', borderRadius: '12px', border: '1px solid var(--border-color)' }}
            >
              Go Home
            </button>
          </div>
        </div>
      )
    }
    return this.props.children
  }
}

// Layout wrapper — Suspense is INSIDE the layout so Navbar/Footer stay visible
// Feature-rich Layout with Recent Tools tracking
const MainLayout = () => {
  const location = useLocation()
  const [recentTools, setRecentTools] = useState([])

  // Tools mapping for metadata - now driven by tools.js
  const TOOLS_META = ALL_TOOLS_MAP;

  useEffect(() => {
    try {
      // Track tool visits
      const path = location.pathname
      const rawSaved = localStorage.getItem('dt_recent_tools')
      const saved = rawSaved ? JSON.parse(rawSaved) : []
      
      if (!Array.isArray(saved)) {
        localStorage.setItem('dt_recent_tools', '[]')
        setRecentTools([])
        return
      }

      if (TOOLS_META[path]) {
        // Only store the path in localStorage to avoid issues with stringifying components
        // Also migrate old object-based format to simple path strings
        const filtered = saved.map(p => (p && typeof p === 'object' ? p.path : p)).filter(p => p && p !== path)
        const updated = [path, ...filtered].slice(0, 4)
        localStorage.setItem('dt_recent_tools', JSON.stringify(updated))
        
        // Map paths back to full tool objects for display
        const displayTools = updated.map(p => ({ path: p, ...TOOLS_META[p] })).filter(t => t.name)
        setRecentTools(displayTools)
      } else {
        // Map saved paths back to full tool objects, handling migration
        const displayTools = saved
          .map(p => (p && typeof p === 'object' ? p.path : p))
          .filter(p => p && TOOLS_META[p])
          .map(p => ({ path: p, ...TOOLS_META[p] }))
        setRecentTools(displayTools)
      }
    } catch (err) {
      console.error('Error tracking recent tools:', err)
      localStorage.setItem('dt_recent_tools', '[]')
      setRecentTools([])
    }
  }, [location, TOOLS_META])

  return (
    <div className="app">
      <ScrollToTop />
      <Navbar />
      <main className="main-content">
        <ErrorBoundary>
          <Suspense fallback={<PageLoader />}>
            <Outlet />
          </Suspense>
        </ErrorBoundary>

        <div className="container-pro" style={{ marginTop: '6rem', paddingBottom: '4rem' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
            
            {/* Recent Tools - Dynamic with Layout Animation */}
            <AnimatePresence mode="popLayout">
              {recentTools.length > 0 && (
                <motion.div
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                  style={{
                    background: 'var(--bg-glass)',
                    backdropFilter: 'blur(24px)',
                    border: '1px solid var(--accent-primary)',
                    borderRadius: '32px',
                    padding: '2rem',
                    boxShadow: '0 20px 40px var(--accent-glow)'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
                    <div style={{ padding: '8px', background: 'var(--accent-glow)', borderRadius: '12px' }}>
                      <span style={{ fontSize: '1.2rem' }}>🕒</span>
                    </div>
                    <h3 style={{ fontSize: '1.25rem', fontWeight: 900, letterSpacing: '-0.02em', margin: 0 }}>Recent Tools</h3>
                  </div>
                  <div style={{ display: 'grid', gap: '0.75rem' }}>
                    {recentTools.map(tool => (
                      <Link key={tool.path} to={tool.path} style={{ textDecoration: 'none', color: 'inherit' }}>
                        <motion.div
                          layout
                          whileHover={{ x: 8, background: 'var(--bg-secondary)', borderColor: 'var(--accent-primary)' }}
                          style={{
                            border: '1px solid var(--border-color)',
                            borderRadius: '16px',
                            padding: '0.9rem 1.2rem',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '1rem',
                            background: 'rgba(255,255,255,0.4)',
                            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
                          }}
                        >
                          <span style={{ fontSize: '1.3rem', display: 'flex', alignItems: 'center' }}>
                            {tool.icon ? (typeof tool.icon === 'string' ? tool.icon : (typeof tool.icon === 'function' ? <tool.icon size={20} /> : '🛠️')) : '🛠️'}
                          </span>
                          <span style={{ fontWeight: 700, fontSize: '0.95rem' }}>{tool.name}</span>
                        </motion.div>
                      </Link>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Popular Tools - Static Enhanced */}
            <motion.div
              style={{
                background: 'var(--bg-glass)',
                backdropFilter: 'blur(20px)',
                border: '1px solid var(--border-color)',
                borderRadius: '32px',
                padding: '2rem',
                boxShadow: 'var(--shadow-lg)'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
                <div style={{ padding: '8px', background: 'var(--bg-secondary)', borderRadius: '12px' }}>
                   <span style={{ fontSize: '1.2rem' }}>🔥</span>
                </div>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 900, letterSpacing: '-0.02em', margin: 0 }}>Popular Tools</h3>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '0.75rem' }}>
                {[
                  { name: 'Image Compressor', path: '/image-tools/compress', icon: '🗜️' },
                  { name: 'Merge PDF', path: '/pdf-tools/merge', icon: '📄' },
                  { name: 'Temp Mail', path: '/temp-mail', icon: '📨' },
                  { name: 'QR Generator', path: '/qr-generator', icon: '🎨' },
                  { name: 'Typing Test', path: '/typing-test', icon: '⌨️' }
                ].map(tool => (
                  <Link key={tool.path} to={tool.path} style={{ textDecoration: 'none', color: 'inherit' }}>
                    <motion.div
                      whileHover={{ x: 5, background: 'var(--bg-secondary)' }}
                      style={{
                        border: '1px solid var(--border-color)',
                        borderRadius: '16px',
                        padding: '0.75rem 1rem',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        background: 'var(--bg-primary)',
                        transition: 'var(--transition)'
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                        <span style={{ fontSize: '1.1rem' }}>{tool.icon}</span>
                        <span style={{ fontWeight: 700, fontSize: '0.9rem' }}>{tool.name}</span>
                      </div>
                      <span style={{ color: 'var(--accent-primary)', fontWeight: 900 }}>→</span>
                    </motion.div>
                  </Link>
                ))}
              </div>
            </motion.div>

            {/* Premium Expert Guides */}
            <motion.div
              style={{
                background: 'linear-gradient(135deg, var(--bg-glass) 0%, rgba(99, 102, 241, 0.05) 100%)',
                backdropFilter: 'blur(24px)',
                border: '1px solid var(--border-color)',
                borderRadius: '32px',
                padding: '2rem',
                boxShadow: 'var(--shadow-lg)'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
                <div style={{ padding: '8px', background: 'var(--bg-secondary)', borderRadius: '12px' }}>
                   <span style={{ fontSize: '1.2rem' }}>📚</span>
                </div>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 900, letterSpacing: '-0.02em', margin: 0 }}>Expert Guides</h3>
              </div>
              <div style={{ display: 'grid', gap: '1rem' }}>
                {[
                  { name: 'Social Media Size Guide 2026', path: '/blog/resize-images-social-media-2026' },
                  { name: 'Max Privacy with Temp Mail', path: '/blog/secure-temp-mail-business-privacy-2026' }
                ].map(guide => (
                  <Link key={guide.path} to={guide.path} style={{ textDecoration: 'none', color: 'inherit' }}>
                    <motion.div
                      whileHover={{ scale: 1.02, background: 'var(--bg-primary)', borderColor: 'var(--accent-primary)' }}
                      style={{
                        padding: '1.2rem',
                        background: 'rgba(255,255,255,0.3)',
                        borderRadius: '20px',
                        border: '1px solid var(--border-color)',
                        transition: 'all 0.3s ease'
                      }}
                    >
                      <div style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--accent-primary)', textTransform: 'uppercase', marginBottom: '0.5rem', letterSpacing: '0.05em' }}>TUTORIAL</div>
                      <div style={{ fontWeight: 800, fontSize: '1rem', lineHeight: 1.3 }}>{guide.name}</div>
                    </motion.div>
                  </Link>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}

function App() {
  return (
    <Routes>
      {/* All standard pages wrapped in MainLayout */}
      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/image-tools/:toolId?" element={<ImageTools />} />
        <Route path="/pdf-tools/:toolId?" element={<PdfTools />} />
        <Route path="/temp-mail" element={<TempMail />} />
        <Route path="/temp-mail/10-minute-mail" element={<TenMinuteMail />} />
        <Route path="/temp-mail/change-email" element={<ChangeEmail />} />
        <Route path="/qr-scanner" element={<QrScanner />} />
        <Route path="/qr-generator" element={<QrGenerator />} />
        <Route path="/fake-email" element={<FakeEmail />} />
        <Route path="/disposable-email" element={<DisposableEmail />} />
        <Route path="/throwaway-email" element={<ThrowawayEmail />} />
        <Route path="/typing-test" element={<TypingTest />} />
        <Route path="/utility-tools" element={<UtilityTools />} />
        <Route path="/about" element={<About />} />
        <Route path="/founder" element={<Founder />} />
        <Route path="/developer" element={<Developer />} />
        <Route path="/services" element={<Services />} />
        <Route path="/products" element={<Products />} />
        <Route path="/privacy-policy" element={<Privacy />} />
        <Route path="/terms-of-service" element={<Terms />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/faq" element={<FAQ />} />
        <Route path="/refund-policy" element={<Refund />} />
        <Route path="/cookie-policy" element={<Cookie />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/news" element={<News />} />
        <Route path="/testimonials" element={<Testimonials />} />
        <Route path="/documentation" element={<Documentation />} />
        <Route path="/careers" element={<Careers />} />
        <Route path="/case-studies" element={<CaseStudies />} />
        <Route path="/sponsor" element={<Sponsor />} />
        <Route path="/promotions" element={<Promotions />} />
        <Route path="/hire-me" element={<HireMe />} />
        <Route path="/thank-you" element={<ThankYou />} />
        <Route path="/sitemap" element={<Sitemap />} />
        <Route path="/showcase" element={<Showcase />} />
        <Route path="/blog/:slug" element={<BlogPost />} />
        <Route path="/404" element={<NotFound />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  )
}

export default App
