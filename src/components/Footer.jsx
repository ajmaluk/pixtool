import { Shield, Zap } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-grid">
        <div className="footer-brand">
          <Link to="/" className="footer-logo">
            <span className="footer-logo-accent">Pix</span>Tool
          </Link>
          <p className="footer-tagline">
            The professional suite of 100% private, browser-based tools. No uploads, no tracking, just pure productivity.
          </p>
          <div className="footer-trust-badges">
            <div className="trust-badge">
              <Shield size={16} /> <span>100% Private</span>
            </div>
            <div className="trust-badge">
              <Zap size={16} /> <span>Edge Processing</span>
            </div>
          </div>
        </div>

        <div className="footer-links-group">
          <h3 className="footer-heading">Image Studio</h3>
          <ul className="footer-links">
            <li><Link to="/image-tools/resize" title="Resize PNG, JPG, WebP images online for free">Resize Image</Link></li>
            <li><Link to="/image-tools/crop" title="Crop images to specific aspect ratios or freehand">Crop & Rotate</Link></li>
            <li><Link to="/image-tools/compress" title="Reduce image file size without losing quality">Compress Photos</Link></li>
            <li><Link to="/image-tools/convert" title="Convert images between JPG, PNG, WebP, and HEIC">Format Converter</Link></li>
            <li><Link to="/image-tools/watermark" title="Add custom text watermarks to your photos">Watermark Tool</Link></li>
          </ul>
        </div>

        <div className="footer-links-group">
          <h3 className="footer-heading">PDF Expert</h3>
          <ul className="footer-links">
            <li><Link to="/pdf-tools/merge" title="Combine multiple PDF files into one document">Merge PDF</Link></li>
            <li><Link to="/pdf-tools/split" title="Extract pages or split PDF into separate files">Split & Extract</Link></li>
            <li><Link to="/pdf-tools/compress" title="Optimize PDF file size for email and web">Compress PDF</Link></li>
            <li><Link to="/pdf-tools/ocr" title="OCR PDF to extract text from scanned documents">PDF OCR</Link></li>
            <li><Link to="/pdf-tools/edit" title="Edit PDF text and images online for free">PDF Editor</Link></li>
            <li><Link to="/pdf-tools/protect" title="Secure PDF documents with AES-256 encryption">Protect & Encrypt</Link></li>
          </ul>
        </div>

        <div className="footer-links-group">
          <h3 className="footer-heading">Utilities</h3>
          <ul className="footer-links">
            <li><Link to="/temp-mail" title="Disposable temporary email for spam protection">Temp Mail</Link></li>
            <li><Link to="/qr-generator" title="Create custom high-resolution QR codes">QR Maker</Link></li>
            <li><Link to="/qr-scanner" title="Scan QR codes instantly using your camera">QR Reader</Link></li>
            <li><Link to="/typing-test" title="Test your typing speed (WPM) and accuracy">Typing Test</Link></li>
            <li><Link to="/temp-mail/10-minute-mail" title="Temporary email that expires in 10 minutes">10 Minute Mail</Link></li>
          </ul>
        </div>

        <div className="footer-links-group">
          <h3 className="footer-heading">Company</h3>
          <ul className="footer-links">
            <li><Link to="/about" title="Learn about the mission and technology of PixTool">About Our Mission</Link></li>
            <li><Link to="/blog" title="Read our latest productivity tutorials and guides">Expert Guides</Link></li>
            <li><Link to="/showcase" title="View screenshots of our professional tool interfaces">Visual Showcase</Link></li>
            <li><Link to="/contact" title="Get in touch for support or feedback">Support Center</Link></li>
            <li><Link to="/sitemap" title="View the comprehensive HTML sitemap for PixTool">HTML Sitemap</Link></li>
          </ul>
        </div>

        <div className="footer-links-group">
          <h3 className="footer-heading">Legal & Privacy</h3>
          <ul className="footer-links">
            <li><Link to="/privacy-policy" title="Read our strict zero-data collection policy">Privacy Policy</Link></li>
            <li><Link to="/terms-of-service" title="View our terms of service and usage guidelines">Terms of Service</Link></li>
            <li><Link to="/cookie-policy" title="Learn how we use minimal cookies for preferences">Cookie Policy</Link></li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <p className="copyright">
          © {new Date().getFullYear()} PixTool by <a href="https://uthakkan.in" target="_blank" rel="noopener noreferrer">UTHAKKAN</a>. All rights reserved.
        </p>
        <div className="footer-meta-links" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <span>Built for Professionals</span>
          <span className="dot-separator">•</span>
          <span>Zero-Upload Technology</span>
          <span className="dot-separator">•</span>
          <span style={{ 
            fontSize: '0.75rem', 
            background: 'var(--bg-secondary)', 
            padding: '2px 8px', 
            borderRadius: '6px', 
            border: '1px solid var(--border-color)',
            fontWeight: 800,
            color: 'var(--accent-primary)'
          }}>v1.1.0</span>
        </div>
      </div>
    </footer>
  )
}
