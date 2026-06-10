import React from 'react'
import { AlertCircle, RefreshCw, Home } from 'lucide-react'

/**
 * Error Boundary Component
 * Catches JavaScript errors anywhere in child component tree
 * Provides fallback UI and recovery options
 */
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false, error: null, errorInfo: null }
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error }
  }

  componentDidCatch(error, errorInfo) {
    // Log error to console in development
    if (import.meta.env.DEV) {
      console.error('Error caught by boundary:', error, errorInfo)
    }

    // Check if it's a chunk loading error (common in production during new deployments)
    if (error?.name === 'ChunkLoadError' || /loading.*chunk/i.test(error?.message || '')) {
      this.setState({ isChunkError: true })
    }

    this.setState({ error, errorInfo })
  }

  resetError = () => {
    this.setState({ hasError: false, error: null, errorInfo: null })
  }

  render() {
    if (this.state.hasError) {
      const isDev = import.meta.env.DEV
      const isChunk = this.state.isChunkError || /chunk/i.test(this.state.error?.message || '')

      return (
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: '100vh',
            background: 'var(--bg-secondary)',
            padding: '2rem',
            textAlign: 'center',
            color: 'var(--text-primary)',
          }}
        >
          {isChunk ? (
            <div
              style={{
                width: '64px',
                height: '64px',
                borderRadius: '50%',
                background: 'var(--accent-emerald-50, #ecfdf5)',
                color: 'var(--accent-emerald, #10b981)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '1.5rem',
                fontWeight: 700,
                marginBottom: '1.5rem'
              }}
            >↺</div>
          ) : (
            <AlertCircle size={64} color="#ef4444" style={{ marginBottom: '1.5rem' }} />
          )}

          <h1 style={{ fontSize: '2rem', fontWeight: 900, marginBottom: '0.5rem' }}>
            {isChunk ? 'New Version Available' : 'Something went wrong'}
          </h1>

          <p style={{ fontSize: '1.1rem', color: 'var(--text-secondary)', marginBottom: '2rem', maxWidth: '600px' }}>
            {isChunk
              ? 'We have just updated PixTool. Please refresh your browser to load the latest version.'
              : 'We encountered an unexpected error. Please try refreshing the page or go back home.'}
          </p>

          {isDev && this.state.error && !isChunk && (
            <div
              style={{
                background: 'var(--bg-card)',
                border: '1px solid var(--border-color)',
                borderRadius: '12px',
                padding: '1.5rem',
                marginBottom: '2rem',
                textAlign: 'left',
                maxWidth: '700px',
                overflow: 'auto',
                maxHeight: '300px',
                fontFamily: 'monospace',
                fontSize: '0.85rem',
              }}
            >
              <h3 style={{ marginBottom: '0.5rem', fontWeight: 700 }}>Error Details (Development Only):</h3>
              <pre style={{ margin: 0, whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}>
                {this.state.error.toString()}
                {'\n\n'}
                {this.state.errorInfo?.componentStack || ''}
              </pre>
            </div>
          )}

          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
            <button
              onClick={() => window.location.reload()}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                padding: '0.75rem 1.5rem',
                background: 'var(--accent-blue)',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                fontSize: '1rem',
                fontWeight: 700,
                cursor: 'pointer',
                transition: 'all 0.3s ease',
              }}
              onMouseEnter={(e) => (e.target.style.opacity = '0.9')}
              onMouseLeave={(e) => (e.target.style.opacity = '1')}
            >
              <RefreshCw size={18} />
              {isChunk ? 'Refresh & Reload' : 'Try Again'}
            </button>

            <a
              href="/"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                padding: '0.75rem 1.5rem',
                background: 'var(--bg-card)',
                color: 'var(--text-primary)',
                border: '1px solid var(--border-color)',
                borderRadius: '8px',
                fontSize: '1rem',
                fontWeight: 700,
                cursor: 'pointer',
                textDecoration: 'none',
                transition: 'all 0.3s ease',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.background = 'var(--bg-card-hover)')}
              onMouseLeave={(e) => (e.currentTarget.style.background = 'var(--bg-card)')}
            >
              <Home size={18} />
              Go Home
            </a>
          </div>
        </div>
      )
    }

    return this.props.children
  }
}

export default ErrorBoundary
