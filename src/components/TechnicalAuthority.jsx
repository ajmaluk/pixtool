import { Shield, Zap, Lock, CheckCircle2, XCircle, Terminal, FileCheck, Sparkles } from 'lucide-react'

export default function TechnicalAuthority() {
  return (
    <>
      {/* Deep-Dive Technical Content - High E-E-A-T & Quality Expansion */}
      <div className="container-pro" style={{ marginTop: '7rem', textAlign: 'left' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
            <span style={{ fontSize: '0.78rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.12em', color: 'var(--accent-primary)', display: 'block', marginBottom: '0.5rem' }}>
              Architecture & Security
            </span>
            <h2 style={{ fontSize: 'clamp(2.2rem, 4.5vw, 3.2rem)', fontWeight: 900, letterSpacing: '-0.03em', lineHeight: 1.15, margin: '0 0 1rem' }}>
              The Future of <span style={{ color: 'var(--accent-primary)' }}>Secure Productivity</span>
            </h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '1.05rem', maxWidth: '650px', margin: '0 auto', lineHeight: 1.6 }}>
              How browser-native WebAssembly and local memory processing provide enterprise-grade privacy and zero-latency speed.
            </p>
          </div>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem', marginBottom: '4rem' }}>
            <div style={{ padding: '2rem', background: 'var(--bg-card)', border: '1px solid var(--border-color)', borderRadius: '24px' }}>
              <div style={{ width: '44px', height: '44px', borderRadius: '12px', background: 'rgba(99, 102, 241, 0.12)', color: 'var(--accent-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.25rem' }}>
                <Terminal size={22} />
              </div>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 800, marginBottom: '0.75rem', color: 'var(--text-primary)' }}>1. Client-Side WASM Engine</h3>
              <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7, fontSize: '0.92rem', margin: 0 }}>
                Unlike traditional websites that upload files to cloud servers, PixTool runs compiled WebAssembly and HTML5 Canvas algorithms directly inside your browser tab. Your local CPU and GPU process everything with zero network delay.
              </p>
            </div>

            <div style={{ padding: '2rem', background: 'var(--bg-card)', border: '1px solid var(--border-color)', borderRadius: '24px' }}>
              <div style={{ width: '44px', height: '44px', borderRadius: '12px', background: 'rgba(16, 185, 129, 0.12)', color: 'var(--accent-emerald)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.25rem' }}>
                <Shield size={22} />
              </div>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 800, marginBottom: '0.75rem', color: 'var(--text-primary)' }}>2. Zero-Knowledge Privacy</h3>
              <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7, fontSize: '0.92rem', margin: 0 }}>
                We operate under strict zero-knowledge architecture. No tracking, no logs, and zero telemetry. When you close or refresh your browser tab, all temporary data in memory is permanently destroyed.
              </p>
            </div>

            <div style={{ padding: '2rem', background: 'var(--bg-card)', border: '1px solid var(--border-color)', borderRadius: '24px' }}>
              <div style={{ width: '44px', height: '44px', borderRadius: '12px', background: 'rgba(245, 158, 11, 0.12)', color: 'var(--accent-orange)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.25rem' }}>
                <FileCheck size={22} />
              </div>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 800, marginBottom: '0.75rem', color: 'var(--text-primary)' }}>3. Enterprise Compliance</h3>
              <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7, fontSize: '0.92rem', margin: 0 }}>
                Because your files never touch an external server, our tools inherently comply with <strong>GDPR, HIPAA, and CCPA</strong> regulations. Sensitive medical, legal, and financial documents stay strictly on your device.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Comparison Table / Benchmarks - Dark Glassmorphic Modern Layout */}
      <div className="container-pro" style={{ marginBottom: '5rem', textAlign: 'left' }}>
        <div style={{ 
          maxWidth: '1200px', 
          margin: '0 auto', 
          padding: 'clamp(2rem, 5vw, 3.5rem)', 
          background: 'var(--bg-card)', 
          border: '1px solid var(--border-color)', 
          borderRadius: '32px',
          boxShadow: 'var(--shadow-sm)',
          position: 'relative',
          overflow: 'hidden'
        }}>
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <span style={{ fontSize: '0.78rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.12em', color: 'var(--accent-primary)', display: 'block', marginBottom: '0.5rem' }}>
              Side-by-Side Comparison
            </span>
            <h2 style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.6rem)', fontWeight: 900, color: 'var(--text-primary)', letterSpacing: '-0.03em', margin: 0 }}>
              Why Professionals Switch to PixTool
            </h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem' }}>
            {/* Legacy Cloud Sites */}
            <div style={{ 
              padding: '2rem', 
              background: 'rgba(239, 68, 68, 0.03)', 
              border: '1px solid rgba(239, 68, 68, 0.18)', 
              borderRadius: '24px' 
            }}>
              <h3 style={{ fontSize: '1.2rem', fontWeight: 800, marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.6rem', color: '#f87171' }}>
                <XCircle size={22} /> Legacy Productivity Sites
              </h3>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '1rem', color: 'var(--text-secondary)', fontSize: '0.92rem' }}>
                <li style={{ display: 'flex', alignItems: 'flex-start', gap: '0.6rem' }}>
                  <span style={{ color: '#ef4444', fontWeight: 800 }}>✕</span>
                  <span>Uploads sensitive documents to remote servers</span>
                </li>
                <li style={{ display: 'flex', alignItems: 'flex-start', gap: '0.6rem' }}>
                  <span style={{ color: '#ef4444', fontWeight: 800 }}>✕</span>
                  <span>Paywalled limits, subscription locks, and daily quotas</span>
                </li>
                <li style={{ display: 'flex', alignItems: 'flex-start', gap: '0.6rem' }}>
                  <span style={{ color: '#ef4444', fontWeight: 800 }}>✕</span>
                  <span>Mandatory account registration and email marketing spam</span>
                </li>
                <li style={{ display: 'flex', alignItems: 'flex-start', gap: '0.6rem' }}>
                  <span style={{ color: '#ef4444', fontWeight: 800 }}>✕</span>
                  <span>Data harvesting and tracking for AI model training</span>
                </li>
                <li style={{ display: 'flex', alignItems: 'flex-start', gap: '0.6rem' }}>
                  <span style={{ color: '#ef4444', fontWeight: 800 }}>✕</span>
                  <span>Slow upload and download latency on large files</span>
                </li>
              </ul>
            </div>

            {/* The PixTool Standard */}
            <div style={{ 
              padding: '2rem', 
              background: 'rgba(99, 102, 241, 0.04)', 
              border: '1px solid rgba(99, 102, 241, 0.3)', 
              borderRadius: '24px',
              boxShadow: '0 8px 30px rgba(99, 102, 241, 0.08)'
            }}>
              <h3 style={{ fontSize: '1.2rem', fontWeight: 800, marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.6rem', color: '#818cf8' }}>
                <CheckCircle2 size={22} className="text-indigo-400" /> The PixTool Standard
              </h3>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '1rem', color: 'var(--text-primary)', fontSize: '0.92rem', fontWeight: 600 }}>
                <li style={{ display: 'flex', alignItems: 'flex-start', gap: '0.6rem' }}>
                  <span style={{ color: '#34d399', fontWeight: 900 }}>✓</span>
                  <span>100% In-browser WebAssembly execution</span>
                </li>
                <li style={{ display: 'flex', alignItems: 'flex-start', gap: '0.6rem' }}>
                  <span style={{ color: '#34d399', fontWeight: 900 }}>✓</span>
                  <span>120+ Professional tools with zero usage limits</span>
                </li>
                <li style={{ display: 'flex', alignItems: 'flex-start', gap: '0.6rem' }}>
                  <span style={{ color: '#34d399', fontWeight: 900 }}>✓</span>
                  <span>No login, no account, and zero tracking required</span>
                </li>
                <li style={{ display: 'flex', alignItems: 'flex-start', gap: '0.6rem' }}>
                  <span style={{ color: '#34d399', fontWeight: 900 }}>✓</span>
                  <span>Zero-knowledge RAM wiped clean on tab close</span>
                </li>
                <li style={{ display: 'flex', alignItems: 'flex-start', gap: '0.6rem' }}>
                  <span style={{ color: '#34d399', fontWeight: 900 }}>✓</span>
                  <span>Instant desktop-class performance with zero upload wait</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Trust Metrics Bar */}
      <div className="container-pro" style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        gap: '4rem', 
        padding: '2.5rem 1.5rem', 
        borderTop: '1px solid var(--border-color)', 
        borderBottom: '1px solid var(--border-color)', 
        flexWrap: 'wrap', 
        marginBottom: '5rem',
        background: 'var(--bg-card)',
        borderRadius: '24px'
      }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '2rem', fontWeight: 900, color: 'var(--accent-primary)', letterSpacing: '-0.02em' }}>120+</div>
          <div style={{ fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', color: 'var(--text-muted)', marginTop: '2px' }}>Professional Tools</div>
        </div>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '2rem', fontWeight: 900, color: 'var(--accent-secondary)', letterSpacing: '-0.02em' }}>15</div>
          <div style={{ fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', color: 'var(--text-muted)', marginTop: '2px' }}>Specialized AIs</div>
        </div>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '2rem', fontWeight: 900, color: '#34d399', letterSpacing: '-0.02em' }}>100%</div>
          <div style={{ fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', color: 'var(--text-muted)', marginTop: '2px' }}>Private Context</div>
        </div>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '2rem', fontWeight: 900, color: '#f59e0b', letterSpacing: '-0.02em' }}>0ms</div>
          <div style={{ fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', color: 'var(--text-muted)', marginTop: '2px' }}>Server Latency</div>
        </div>
      </div>
    </>
  )
}
