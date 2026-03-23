import SEO from '../components/SEO'
import { Link } from 'react-router-dom'
import { AlertCircle } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="page-container" style={{ textAlign: 'center', padding: '6rem 2rem' }}>
      <SEO
        title="404 - Page Not Found | PixTool"
        description="The page you requested could not be found. Explore our free tools for images, PDFs, temp mail, and QR."
        path="/404"
        type="website"
      />
      <div style={{ display: 'inline-flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem', color: 'var(--accent-red)' }}>
        <AlertCircle size={36} />
        <h1 style={{ fontSize: '2rem', fontWeight: 900, margin: 0 }}>Page Not Found</h1>
      </div>
      <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', maxWidth: '600px', margin: '0 auto 2rem' }}>
        Sorry, the page you requested doesn't exist. Try one of our popular tools below.
      </p>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem', maxWidth: '900px', margin: '0 auto 2rem' }}>
        <Link to="/image-tools/resize" className="tool-card" style={{ textDecoration: 'none', color: 'inherit' }}>
          <div className="tool-card-header">
            <div className="tool-card-title-group">
              <h3 className="tool-card-title">Image Resizer</h3>
            </div>
          </div>
          <p className="tool-card-description">Resize photos by pixels or percentage</p>
        </Link>
        <Link to="/pdf-tools/merge" className="tool-card" style={{ textDecoration: 'none', color: 'inherit' }}>
          <div className="tool-card-header">
            <div className="tool-card-title-group">
              <h3 className="tool-card-title">Merge PDF</h3>
            </div>
          </div>
          <p className="tool-card-description">Combine multiple PDFs into one</p>
        </Link>
        <Link to="/temp-mail" className="tool-card" style={{ textDecoration: 'none', color: 'inherit' }}>
          <div className="tool-card-header">
            <div className="tool-card-title-group">
              <h3 className="tool-card-title">Temporary Email</h3>
            </div>
          </div>
          <p className="tool-card-description">Get an anonymous disposable inbox</p>
        </Link>
      </div>
      <Link to="/" className="btn btn-primary" style={{ padding: '0.75rem 1.75rem' }}>
        Go to Home
      </Link>
    </div>
  )
}
