import React, { useState } from 'react';
 
import { Link } from 'react-router-dom';
import { ExternalLink, Camera, Image as ImageIcon, FileText, Settings, ArrowRight } from 'lucide-react';
import SEO from '../components/SEO';

const SCREENSHOTS = [
  // Hubs
  { id: 'home', title: 'PixTool Homepage', category: 'General', path: '/', img: '/screenshots/pixtool-all-in-one-productivity-suite.webp' },
  { id: 'image-tools', title: 'Image Studio Hub', category: 'Image', path: '/image-tools', img: '/screenshots/professional-online-image-studio.webp' },
  { id: 'pdf-tools', title: 'PDF Expert Hub', category: 'PDF', path: '/pdf-tools', img: '/screenshots/secure-pdf-management-suite.webp' },
  { id: 'utility-tools', title: 'Utility Suite Hub', category: 'Utility', path: '/utility-tools', img: '/screenshots/all-in-one-web-utility-toolbox.webp' },
  
  // Image Tools
  { id: 'image-resize', title: 'Image Resizer', category: 'Image', path: '/image-tools/resize', img: '/screenshots/best-online-image-resizer-tool.webp' },
  { id: 'image-crop', title: 'Image Cropper', category: 'Image', path: '/image-tools/crop', img: '/screenshots/professional-image-cropper-online.webp' },
  { id: 'image-rotate', title: 'Image Rotator', category: 'Image', path: '/image-tools/rotate', img: '/screenshots/free-online-image-rotator.webp' },
  { id: 'image-compress', title: 'Image Compressor', category: 'Image', path: '/image-tools/compress', img: '/screenshots/high-quality-image-compressor-online.webp' },
  { id: 'image-convert', title: 'Format Converter', category: 'Image', path: '/image-tools/convert', img: '/screenshots/online-image-format-converter-webp-png-jpg.webp' },
  { id: 'image-watermark', title: 'Watermark Tool', category: 'Image', path: '/image-tools/watermark', img: '/screenshots/add-watermark-to-photos-online-free.webp' },
  { id: 'image-flip', title: 'Image Flipper', category: 'Image', path: '/image-tools/flip', img: '/screenshots/flip-and-mirror-images-online-instantly.webp' },
  { id: 'image-grayscale', title: 'Grayscale Editor', category: 'Image', path: '/image-tools/grayscale', img: '/screenshots/convert-image-to-grayscale-online.webp' },
  
  // PDF Tools
  { id: 'pdf-merge', title: 'Merge PDF', category: 'PDF', path: '/pdf-tools/merge', img: '/screenshots/fast-pdf-merger-no-upload-pixtool.webp' },
  { id: 'pdf-split', title: 'Split PDF', category: 'PDF', path: '/pdf-tools/split', img: '/screenshots/split-pdf-pages-online-securely.webp' },
  { id: 'pdf-compress', title: 'Compress PDF', category: 'PDF', path: '/pdf-tools/compress', img: '/screenshots/optimize-pdf-file-size-online.webp' },
  { id: 'pdf-convert', title: 'PDF to Image', category: 'PDF', path: '/pdf-tools/convert', img: '/screenshots/convert-pdf-to-images-online-high-res.webp' },
  { id: 'pdf-protect', title: 'Protect PDF', category: 'PDF', path: '/pdf-tools/protect', img: '/screenshots/secure-pdf-with-password-online.webp' },
  { id: 'pdf-watermark', title: 'Watermark PDF', category: 'PDF', path: '/pdf-tools/watermark', img: '/screenshots/add-text-watermark-to-pdf-online.webp' },
  { id: 'pdf-reorder', title: 'Reorder PDF', category: 'PDF', path: '/pdf-tools/reorder', img: '/screenshots/reorder-pdf-pages-online-free.webp' },
  
  // Utility Tools
  { id: 'temp-mail', title: 'Temp Mail', category: 'Utility', path: '/temp-mail', img: '/screenshots/disposable-temporary-email-generator.webp' },
  { id: '10-min-mail', title: '10 Minute Mail', category: 'Utility', path: '/temp-mail/10-minute-mail', img: '/screenshots/10-minute-mail-free-disposable-inbox.webp' },
  { id: 'change-email', title: 'Change Email', category: 'Utility', path: '/temp-mail/change-email', img: '/screenshots/change-temporary-email-address-online.webp' },
  { id: 'fake-email', title: 'Identity Forge', category: 'Utility', path: '/identity-forge', img: '/screenshots/generate-fake-email-for-testing.webp' },
  { id: 'disposable-email', title: 'Burner Inbox', category: 'Utility', path: '/burner-inbox', img: '/screenshots/burner-email-address-generator-privacy.webp' },
  { id: 'throwaway-email', title: 'Ghost Inbox', category: 'Utility', path: '/ghost-inbox', img: '/screenshots/throwaway-email-inbox-online-free.webp' },
  { id: 'qr-generator', title: 'QR Generator', category: 'Utility', path: '/qr-generator', img: '/screenshots/best-free-qr-code-generator-online.webp' },
  { id: 'qr-scanner', title: 'QR Scanner', category: 'Utility', path: '/qr-scanner', img: '/screenshots/fast-online-qr-code-scanner-browser.webp' },
  { id: 'typing-test', title: 'Typing Test', category: 'Utility', path: '/typing-test', img: '/screenshots/professional-typing-speed-test-online.webp' },
];

const ShowcaseCard = ({ item }) => {
  return (
    <div className="showcase-card-container">
      <div style={{ position: 'relative', height: '100%' }}>
        <Link
          to={item.path}
          className="blog-card"
          style={{
            display: 'flex',
            flexDirection: 'column',
            height: '100%',
            textDecoration: 'none',
            color: 'inherit',
            background: 'var(--bg-card)',
            borderRadius: '32px',
            border: '1px solid var(--border-color)',
            overflow: 'hidden',
            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
            boxShadow: 'var(--shadow-sm)'
          }}
        >
          <div style={{ height: '220px', overflow: 'hidden', position: 'relative' }}>
            <img
              src={item.img}
              alt={`User interface preview of ${item.title}`}
              width="400"
              height="220"
              loading="lazy"
              style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s ease' }}
              className="blog-image"
            />
            <div style={{ position: 'absolute', top: '1rem', left: '1rem' }}>
              <span className="blog-card-category" style={{
                background: 'rgba(255, 255, 255, 0.9)',
                backdropFilter: 'blur(10px)',
                color: '#000',
                padding: '4px 12px',
                borderRadius: '100px',
                fontSize: '0.7rem',
                fontWeight: 800,
                textTransform: 'uppercase'
              }}>
                {item.category}
              </span>
            </div>
          </div>
          <div style={{ padding: 'clamp(1rem, 3vw, 2rem)', display: 'flex', flexDirection: 'column', flex: 1 }}>
            <h3 className="blog-card-title" style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '0.75rem', lineHeight: 1.3 }}>{item.title}</h3>
            <p className="blog-card-excerpt" style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: 1.6, marginBottom: '1.5rem', flex: 1 }}>
              Professional UI preview for the {item.title}. Engineered for speed and 100% browser-based local processing.
            </p>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--accent-primary)', fontWeight: 700, fontSize: '0.9rem' }}>
              Launch Tool <ArrowRight size={16} />
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default function Showcase() {
  const [selectedCategory, setSelectedCategory] = useState(null);
  
  const categories = Array.from(new Set(SCREENSHOTS.map(s => s.category)));
  const filtered = selectedCategory 
    ? SCREENSHOTS.filter(s => s.category === selectedCategory) 
    : SCREENSHOTS;

  return (
    <div className="showcase-page">
      <SEO 
        title="Visual Showcase & Tool Previews | PixTool"
        description="Explore the full visual library of PixTool. Preview our Image Studio, PDF Expert, and Utility Suite interfaces before you use them. 100% private and professional."
        path="/showcase"
      />

      <section className="hero" style={{ padding: 'clamp(5rem, 15vh, 8rem) 1.5rem 5rem', background: 'var(--bg-secondary)', marginBottom: '4rem' }}>
        <div style={{ maxWidth: '100%', margin: '0 auto', textAlign: 'center' }}>
          <div>
            <div className="status-badge" style={{ margin: '0 auto 1.5rem', width: 'fit-content', background: 'var(--accent-glow)', color: 'var(--accent-primary)', fontWeight: 700 }}>
              VISUAL GALLERY
            </div>
            <h1 className="hero-title" style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontWeight: 900, marginBottom: '1.5rem', letterSpacing: '-0.02em' }}>Visual Showcase</h1>
            <p className="hero-subtitle" style={{ fontSize: '1.25rem', color: 'var(--text-secondary)', maxWidth: '600px', margin: '0 auto' }}>
              A comprehensive gallery of our professional tool interfaces, engineered for efficiency and privacy.
            </p>
          </div>
        </div>
      </section>

      <section style={{ padding: '0 1.5rem 10rem', width: '100%', overflowX: 'hidden' }}>
        <div style={{ width: '100%' }}>
          <div className="blog-tags-scroll" style={{ display: 'flex', gap: '0.5rem', flexWrap: 'nowrap', overflowX: 'auto', paddingBottom: '1rem', marginBottom: '1.5rem', WebkitOverflowScrolling: 'touch' }}>
            {[null, ...categories].map(cat => (
              <button
                key={cat || 'all'}
                className={`btn ${selectedCategory === cat ? 'btn-primary' : 'btn-secondary'}`}
                style={{ padding: '0.4rem 1.25rem', fontSize: '0.85rem', flexShrink: 0, whiteSpace: 'nowrap', borderRadius: '100px', ...(selectedCategory === cat ? { background: 'var(--accent-primary)', borderColor: 'var(--accent-primary)', color: 'white' } : {}) }}
                onClick={() => setSelectedCategory(cat)}
              >
                {cat || 'All Tools'}
              </button>
            ))}
          </div>

          <div className="blog-grid">
            {filtered.map((item) => (
              <ShowcaseCard key={item.id} item={item} />
            ))}
          </div>

          <section style={{ marginTop: '8rem', textAlign: 'center', padding: '5rem 2rem', background: 'var(--bg-secondary)', borderRadius: '48px', border: '1px solid var(--border-color)' }}>
            <div style={{
              width: '80px',
              height: '80px',
              background: 'var(--bg-card)',
              borderRadius: '24px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 2rem',
              boxShadow: 'var(--shadow-md)'
            }}>
              <ImageIcon size={32} style={{ color: 'var(--accent-primary)' }} />
            </div>
            <h2 style={{ fontSize: '2.5rem', fontWeight: 900, marginBottom: '1.5rem', letterSpacing: '-0.01em' }}>Professional Quality, Guaranteed</h2>
            <p style={{ color: 'var(--text-secondary)', marginBottom: '3rem', maxWidth: '700px', margin: '0 auto 3rem', fontSize: '1.1rem', lineHeight: 1.8 }}>
              All PixTool are built with a focus on performance, security, and user experience. 
              Our interfaces are responsive, accessible, and designed to make your daily digital tasks effortless.
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '3rem' }}>
              <div style={{ textAlign: 'center' }}>
                <div style={{ color: 'var(--accent-primary)', marginBottom: '1rem' }}><Camera size={32} /></div>
                <div style={{ fontWeight: 800 }}>High Res</div>
              </div>
              <div style={{ textAlign: 'center' }}>
                <div style={{ color: 'var(--accent-primary)', marginBottom: '1rem' }}><ImageIcon size={32} /></div>
                <div style={{ fontWeight: 800 }}>Optimized</div>
              </div>
              <div style={{ textAlign: 'center' }}>
                <div style={{ color: 'var(--accent-primary)', marginBottom: '1rem' }}><FileText size={32} /></div>
                <div style={{ fontWeight: 800 }}>Clean UI</div>
              </div>
              <div style={{ textAlign: 'center' }}>
                <div style={{ color: 'var(--accent-primary)', marginBottom: '1rem' }}><Settings size={32} /></div>
                <div style={{ fontWeight: 800 }}>Pro Tools</div>
              </div>
            </div>
          </section>
        </div>
      </section>

      <style dangerouslySetInnerHTML={{
        __html: `
        .blog-card:hover { transform: translateY(-10px); border-color: var(--accent-primary); box-shadow: 0 30px 60px rgba(59, 130, 246, 0.1); }
        .blog-card:hover .blog-image { transform: scale(1.1); }
        .blog-card:hover .read-article { gap: 12px; }
        .blog-card:hover .arrow { transform: translateX(5px); }
        .read-article { transition: all 0.3s ease; }
        .arrow { transition: all 0.3s ease; }
        .blog-tags-scroll::-webkit-scrollbar { display: none; }
        .blog-tags-scroll { -ms-overflow-style: none; scrollbar-width: none; }
        
        .blog-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 1rem; }
        @media (max-width: 1200px) {
            .blog-grid { grid-template-columns: repeat(3, 1fr); gap: 1rem; }
        }
        @media (max-width: 992px) {
            .blog-grid { grid-template-columns: repeat(2, 1fr) !important; gap: 1rem !important; }
        }
        @media (max-width: 768px) {
            .blog-grid { grid-template-columns: repeat(2, 1fr) !important; gap: 0.75rem !important; }
            .blog-card-excerpt { display: none !important; }
            .blog-card-category { font-size: 0.6rem !important; padding: 3px 10px !important; }
            .blog-card-title { font-size: 0.95rem !important; margin-bottom: 0.4rem !important; }
            .read-article { font-size: 0.75rem !important; }
            .blog-card { border-radius: 16px !important; }
            .blog-image { height: 160px !important; }
        }
        @media (max-width: 480px) {
            .blog-grid { grid-template-columns: repeat(2, 1fr) !important; gap: 0.5rem !important; }
            .blog-card-title { font-size: 0.85rem !important; line-height: 1.2 !important; }
        }
      `}} />
    </div>
  );
}
