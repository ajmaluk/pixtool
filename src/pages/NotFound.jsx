import SEO from '../components/SEO'
import { Link } from 'react-router-dom'
import { AlertCircle, Search, Home, ChevronRight, Image, FileText, Zap } from 'lucide-react'
import AdSpace from '../components/AdSpace'

export default function NotFound() {
  const suggestedTools = [
    { name: 'AI Summarizer', path: '/ai-tools/summarizer', icon: Zap, color: 'var(--accent-purple)' },
    { name: 'Image Resizer', path: '/image-tools/resize', icon: Image, color: 'var(--accent-blue)' },
    { name: 'PDF Merger', path: '/pdf-tools/merge', icon: FileText, color: 'var(--accent-emerald)' },
    { name: 'Temp Mail', path: '/temp-mail', icon: Zap, color: 'var(--accent-red)' }
  ];

  return (
    <div className="page-container" style={{ background: 'var(--bg-secondary)', minHeight: '100vh' }}>
      <SEO
        title="404 - Page Architecture Not Found | PixTool"
        description="The requested resource is currently offline or unreachable. Explore our high-authority AI and productivity tools to continue your workflow."
        path="/404"
        noIndex={true}
      />

      <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '1rem' }}>
         <AdSpace type="top" />
      </div>

      <main style={{ textAlign: 'center', padding: '6rem 2rem' }}>
        <div style={{ 
          display: 'inline-flex', 
          alignItems: 'center', 
          justifyContent: 'center',
          width: '120px',
          height: '120px',
          borderRadius: '40px',
          background: 'var(--bg-card)',
          boxShadow: 'var(--shadow-premium)',
          color: 'var(--accent-red)',
          marginBottom: '3rem'
        }}>
          <AlertCircle size={52} strokeWidth={1.5} />
        </div>

        <h1 style={{ fontSize: '4rem', fontWeight: 950, margin: '0 0 1rem', letterSpacing: '-0.05em' }}>
          404 <span style={{ color: 'var(--text-muted)', fontWeight: 400 }}>Lost in Logic</span>
        </h1>
        
        <p style={{ color: 'var(--text-secondary)', fontSize: '1.25rem', maxWidth: '600px', margin: '0 auto 4rem', lineHeight: 1.6 }}>
          The tool or resource you are looking for has been moved or is currently processing in another dimension. 
          Use our high-velocity navigation below to find your way back.
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem', maxWidth: '900px', margin: '0 auto 4rem' }}>
          {suggestedTools.map((tool, idx) => (
            <Link 
              key={idx} 
              to={tool.path} 
              className="info-card" 
              style={{ 
                padding: '2rem', 
                textDecoration: 'none', 
                textAlign: 'left',
                display: 'flex',
                alignItems: 'center',
                gap: '1.5rem',
                transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)'
              }}
            >
              <div style={{ 
                width: '56px', 
                height: '56px', 
                borderRadius: '16px', 
                background: 'var(--bg-secondary)', 
                color: tool.color,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0
              }}>
                <tool.icon size={28} />
              </div>
              <div style={{ flex: 1 }}>
                <h3 style={{ margin: 0, fontSize: '1.1rem', fontWeight: 800, color: 'var(--text-primary)' }}>{tool.name}</h3>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', color: 'var(--text-muted)', fontSize: '0.85rem', marginTop: '0.25rem' }}>
                  Explore Tool <ChevronRight size={14} />
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
          <Link to="/" className="btn btn-primary" style={{ padding: '1rem 2.5rem', fontSize: '1.1rem' }}>
            <Home size={20} /> Return to Mission Control
          </Link>
          <Link to="/ai-tools" className="btn btn-secondary" style={{ padding: '1rem 2.5rem', fontSize: '1.1rem' }}>
            <Search size={20} /> Browse All Tools
          </Link>
        </div>
      </main>

      <div style={{ maxWidth: '1000px', margin: '4rem auto', padding: '1rem' }}>
         <AdSpace type="bottom" />
      </div>
    </div>
  )
}
