import { Shield, Zap } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-grid">
        <div className="footer-brand">
          <Link to="/" className="footer-logo" aria-label="PixTool Home">
            <span className="footer-logo-accent">Pix</span>Tool
          </Link>
          <p className="footer-tagline">
            The professional suite of 100% private, browser-based tools. No uploads, no tracking, just pure productivity.
          </p>
          <div className="footer-trust-badges">
            <div className="trust-badge" aria-label="100% Private Tool">
              <Shield size={16} aria-hidden="true" /> <span>100% Private</span>
            </div>
            <div className="trust-badge" aria-label="High-Speed Edge Processing">
              <Zap size={16} aria-hidden="true" /> <span>Edge Processing</span>
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
          <h3 className="footer-heading">AI Intelligence</h3>
          <ul className="footer-links">
            <li><Link to="/ai-tools/chat" title="Deep Mind AI for professional consulting and strategic ideation">Deep Mind AI</Link></li>
            <li><Link to="/ai-tools/content-generator" title="Generate SEO blogs and articles with AI">Content Forge</Link></li>
            <li><Link to="/ai-tools/coding-chat" title="AI programming assistant for 20+ languages">Code Intelligence</Link></li>
            <li><Link to="/ai-tools/summarizer" title="Summarize documents into actionable intelligence">Intel Distiller</Link></li>
            <li><Link to="/ai-tools/keyword-generator" title="Find high-intent SEO keywords with AI">SEO Architect</Link></li>
          </ul>
        </div>

        <div className="footer-links-group">
          <h3 className="footer-heading">Math Engine</h3>
          <ul className="footer-links">
            <li><Link to="/math-tools/scientific-calculator" title="High-precision scientific calculator online">Scientific Calc</Link></li>
            <li><Link to="/math-tools/graph-visualizer" title="Interactive 2D/3D functional plotting">Graph Visualizer</Link></li>
            <li><Link to="/math-tools/equation-solver" title="Solve linear and quadratic equations instantly">Equation Solver</Link></li>
            <li><Link to="/math-tools/statistics-visualizer" title="Generate statistical charts and data analysis">Data Visualizer</Link></li>
            <li><Link to="/math-tools/matrix-solver" title="Solve matrix equations and linear algebra">Matrix Solver</Link></li>
          </ul>
        </div>

        <div className="footer-links-group">
          <h3 className="footer-heading">Productivity</h3>
          <ul className="footer-links">
            <li><Link to="/productivity-tools/todo" title="Manage your daily tasks with our private todo list">Private Todo List</Link></li>
            <li><Link to="/productivity-tools/kanban" title="Visual project management with kanban boards">Kanban Board</Link></li>
            <li><Link to="/productivity-tools/notepad" title="Distraction-free markdown notepad with auto-save">Secure Notepad</Link></li>
            <li><Link to="/productivity-tools/pomodoro" title="Focus timer for deep work sessions">Pomodoro Clock</Link></li>
            <li><Link to="/productivity-tools/file-manager" title="Manage your browser-native local file vault">File Manager</Link></li>
          </ul>
        </div>

        <div className="footer-links-group">
          <h3 className="footer-heading">Company</h3>
          <ul className="footer-links">
            <li><Link to="/about" title="Learn about the mission and technology of PixTool">About Our Mission</Link></li>
            <li><Link to="/blog" title="Read our latest productivity tutorials and guides">Expert Guides</Link></li>
            <li><Link to="/status" title="Review the current PixTool status, changelog, and implementation notes">Status & Changelog</Link></li>
            <li><Link to="/showcase" title="View screenshots of our professional tool interfaces">Visual Showcase</Link></li>
            <li><Link to="/contact" title="Get in touch for support or feedback">Support Center</Link></li>
            <li><Link to="/sitemap" title="View the comprehensive HTML sitemap for PixTool">HTML Sitemap</Link></li>
            <li><a href="/sitemap.xml" title="View the XML sitemap for search engines">XML Sitemap</a></li>
          </ul>
        </div>

        <div className="footer-links-group">
          <h3 className="footer-heading">Site Links</h3>
          <ul className="footer-links">
            <li><Link to="/" title="Go to the PixTool home page">Home</Link></li>
            <li><Link to="/blog" title="Browse the PixTool blog">Blog</Link></li>
            <li><Link to="/about" title="Learn more about PixTool">About</Link></li>
            <li><Link to="/contact" title="Contact PixTool support">Contact</Link></li>
            <li><Link to="/faq" title="Read frequently asked questions">FAQ</Link></li>
            <li><Link to="/status" title="View site status and updates">Status</Link></li>
            <li><Link to="/showcase" title="See product screenshots and demos">Showcase</Link></li>
            <li><Link to="/documentation" title="Read platform documentation">Documentation</Link></li>
            <li><Link to="/news" title="Read PixTool news and updates">News</Link></li>
            <li><Link to="/testimonials" title="See customer testimonials">Testimonials</Link></li>
            <li><Link to="/careers" title="Explore career opportunities">Careers</Link></li>
            <li><Link to="/case-studies" title="Read customer case studies">Case Studies</Link></li>
          </ul>
        </div>

        <div className="footer-links-group">
          <h3 className="footer-heading">Legal & Privacy</h3>
          <ul className="footer-links">
            <li><Link to="/privacy-policy" title="Read our strict zero-data collection policy">Privacy Policy</Link></li>
            <li><Link to="/privacy-policy#advertising" title="Learn how ads are served and how privacy is protected">About Our Ads</Link></li>
            <li><Link to="/terms-of-service" title="View our terms of service and usage guidelines">Terms of Service</Link></li>
            <li><Link to="/cookie-policy" title="Learn how we use minimal cookies for preferences">Cookie Policy</Link></li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom" style={{ flexDirection: 'column', gap: '2rem' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto', textAlign: 'center', opacity: 0.88, fontSize: '0.8rem', lineHeight: 1.6 }}>
          <p style={{ marginBottom: '1rem' }}>
            <strong>Platform Disclaimer:</strong> PixTool (by UTHAKKAN) provides free online utility tools processed locally in your browser. While we strive for absolute accuracy, we provide these tools "as is" without any warranty. We do not store or see your files. By using our tools, you agree to our 
            <Link to="/terms-of-service" style={{ color: 'var(--accent-primary)', textDecoration: 'underline', margin: '0 4px' }}>Terms of Service</Link> and 
            <Link to="/privacy-policy" style={{ color: 'var(--accent-primary)', textDecoration: 'underline', margin: '0 4px' }}>Privacy Policy</Link>.
          </p>
          <p>
            Google, as a third-party vendor, uses cookies to serve ads on this site. You can opt-out of personalized advertising by visiting Google's ad settings.
          </p>
        </div>
        
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%', flexWrap: 'wrap', gap: '1rem', paddingTop: '2rem', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
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
      </div>
    </footer>
  )
}
