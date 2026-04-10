import { useState, useEffect } from 'react'

export default function CookieConsent() {
  const [visible, setVisible] = useState(false)
  
  useEffect(() => {
    const consent = localStorage.getItem('cookie-consent')
    if (!consent) {
      setTimeout(() => setVisible(true), 2000)
    }
  }, [])
  
  const accept = () => {
    localStorage.setItem('cookie-consent', 'accepted')
    setVisible(false)
  }
  
  if (!visible) return null
  
  return (
    <div style={{
      position: 'fixed',
      bottom: 0,
      left: 0,
      right: 0,
      background: 'var(--bg-card)',
      borderTop: '1px solid var(--border-color)',
      padding: '1rem 2rem',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      gap: '1rem',
      flexWrap: 'wrap',
      zIndex: 9999,
      boxShadow: '0 -4px 20px rgba(0,0,0,0.3)'
    }}>
      <div style={{ flex: 1, minWidth: '280px' }}>
        <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', margin: 0 }}>
          <strong style={{ color: 'var(--text-primary)' }}>We use cookies</strong> to improve your experience. 
          This site uses cookies for analytics and ads. By continuing, you agree to our{' '}
          <a href="/cookie-policy" style={{ color: 'var(--accent-primary)' }}>Cookie Policy</a>.
        </p>
      </div>
      <div style={{ display: 'flex', gap: '0.5rem' }}>
        <button 
          onClick={accept}
          style={{
            padding: '0.5rem 1.5rem',
            background: 'var(--accent-primary)',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
            fontWeight: 600,
            fontSize: '0.85rem'
          }}
        >
          Accept All
        </button>
      </div>
    </div>
  )
}