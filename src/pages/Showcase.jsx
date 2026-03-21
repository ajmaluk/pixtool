import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ExternalLink, Camera, Image, FileText, Settings } from 'lucide-react';
import SEO from '../components/SEO';
import Breadcrumbs from '../components/Breadcrumbs';

const SCREENSHOTS = [
  // Hubs
  { id: 'home', title: 'DailyTools Homepage', category: 'General', path: '/', img: '/screenshots/dailytools-all-in-one-productivity-suite.png' },
  { id: 'image-tools', title: 'Image Studio Hub', category: 'Image', path: '/image-tools', img: '/screenshots/professional-online-image-studio.png' },
  { id: 'pdf-tools', title: 'PDF Expert Hub', category: 'PDF', path: '/pdf-tools', img: '/screenshots/secure-pdf-management-suite.png' },
  { id: 'utility-tools', title: 'Utility Suite Hub', category: 'Utility', path: '/utility-tools', img: '/screenshots/all-in-one-web-utility-toolbox.png' },
  
  // Image Tools
  { id: 'image-resize', title: 'Image Resizer', category: 'Image', path: '/image-tools/resize', img: '/screenshots/best-online-image-resizer-tool.png' },
  { id: 'image-crop', title: 'Image Cropper', category: 'Image', path: '/image-tools/crop', img: '/screenshots/professional-image-cropper-online.png' },
  { id: 'image-rotate', title: 'Image Rotator', category: 'Image', path: '/image-tools/rotate', img: '/screenshots/free-online-image-rotator.png' },
  { id: 'image-compress', title: 'Image Compressor', category: 'Image', path: '/image-tools/compress', img: '/screenshots/high-quality-image-compressor-online.png' },
  { id: 'image-convert', title: 'Format Converter', category: 'Image', path: '/image-tools/convert', img: '/screenshots/online-image-format-converter-webp-png-jpg.png' },
  { id: 'image-watermark', title: 'Watermark Tool', category: 'Image', path: '/image-tools/watermark', img: '/screenshots/add-watermark-to-photos-online-free.png' },
  { id: 'image-flip', title: 'Image Flipper', category: 'Image', path: '/image-tools/flip', img: '/screenshots/flip-and-mirror-images-online-instantly.png' },
  { id: 'image-grayscale', title: 'Grayscale Editor', category: 'Image', path: '/image-tools/grayscale', img: '/screenshots/convert-image-to-grayscale-online.png' },
  
  // PDF Tools
  { id: 'pdf-merge', title: 'Merge PDF', category: 'PDF', path: '/pdf-tools/merge', img: '/screenshots/fast-pdf-merger-no-upload-dailytools.png' },
  { id: 'pdf-split', title: 'Split PDF', category: 'PDF', path: '/pdf-tools/split', img: '/screenshots/split-pdf-pages-online-securely.png' },
  { id: 'pdf-compress', title: 'Compress PDF', category: 'PDF', path: '/pdf-tools/compress', img: '/screenshots/optimize-pdf-file-size-online.png' },
  { id: 'pdf-convert', title: 'PDF to Image', category: 'PDF', path: '/pdf-tools/convert', img: '/screenshots/convert-pdf-to-images-online-high-res.png' },
  { id: 'pdf-protect', title: 'Protect PDF', category: 'PDF', path: '/pdf-tools/protect', img: '/screenshots/secure-pdf-with-password-online.png' },
  { id: 'pdf-watermark', title: 'Watermark PDF', category: 'PDF', path: '/pdf-tools/watermark', img: '/screenshots/add-text-watermark-to-pdf-online.png' },
  { id: 'pdf-reorder', title: 'Reorder PDF', category: 'PDF', path: '/pdf-tools/reorder', img: '/screenshots/reorder-pdf-pages-online-free.png' },
  
  // Utility Tools
  { id: 'temp-mail', title: 'Temp Mail', category: 'Utility', path: '/temp-mail', img: '/screenshots/disposable-temporary-email-generator.png' },
  { id: '10-min-mail', title: '10 Minute Mail', category: 'Utility', path: '/temp-mail/10-minute-mail', img: '/screenshots/10-minute-mail-free-disposable-inbox.png' },
  { id: 'change-email', title: 'Change Email', category: 'Utility', path: '/temp-mail/change-email', img: '/screenshots/change-temporary-email-address-online.png' },
  { id: 'fake-email', title: 'Fake Email', category: 'Utility', path: '/fake-email', img: '/screenshots/generate-fake-email-for-testing.png' },
  { id: 'disposable-email', title: 'Disposable Email', category: 'Utility', path: '/disposable-email', img: '/screenshots/burner-email-address-generator-privacy.png' },
  { id: 'throwaway-email', title: 'Throwaway Email', category: 'Utility', path: '/throwaway-email', img: '/screenshots/throwaway-email-inbox-online-free.png' },
  { id: 'qr-generator', title: 'QR Generator', category: 'Utility', path: '/qr-generator', img: '/screenshots/best-free-qr-code-generator-online.png' },
  { id: 'qr-scanner', title: 'QR Scanner', category: 'Utility', path: '/qr-scanner', img: '/screenshots/fast-online-qr-code-scanner-browser.png' },
  { id: 'typing-test', title: 'Typing Test', category: 'Utility', path: '/typing-test', img: '/screenshots/professional-typing-speed-test-online.png' },
];

export default function Showcase() {
  return (
    <div className="showcase-page">
      <SEO 
        title="Visual Showcase & Tool Previews | DailyTools"
        description="Explore the full visual library of DailyTools. Preview our Image Studio, PDF Expert, and Utility Suite interfaces before you use them. 100% private and professional."
        keywords="dailytools showcase, tool previews, image studio gallery, pdf suite screenshots, utility tool interfaces, web tool visual library"
        path="/showcase"
        toolName="Visual Showcase"
      />

      <div className="container-pro" style={{ padding: '4rem 2rem' }}>
        <Breadcrumbs items={[{ name: 'Showcase', item: '/showcase' }]} />
        
        <header style={{ marginBottom: '4rem', textAlign: 'center' }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="page-hero-content"
          >
            <h1 className="page-title" style={{ fontSize: '3.5rem', marginBottom: '1.5rem' }}>
              Visual <span style={{ color: 'var(--accent-primary)' }}>Showcase</span>
            </h1>
            <p className="page-subtitle" style={{ maxWidth: '800px', margin: '0 auto' }}>
              A comprehensive gallery of our professional tool interfaces. Each tool is designed for maximum efficiency, 
              running 100% locally in your browser for ultimate privacy and speed.
            </p>
          </motion.div>
        </header>

        <div className="showcase-grid" style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))',
          gap: '2.5rem'
        }}>
          {SCREENSHOTS.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.05 }}
              whileHover={{ y: -8 }}
              className="tool-card"
              style={{
                padding: 0,
                overflow: 'hidden',
                background: 'var(--bg-glass)',
                border: '1px solid var(--border-color)',
                borderRadius: '24px',
                display: 'flex',
                flexDirection: 'column'
              }}
            >
              <div style={{
                aspectRatio: '16/9',
                overflow: 'hidden',
                background: 'var(--bg-secondary)',
                position: 'relative'
              }}>
                <img 
                  src={item.img} 
                  alt={`${item.title} interface preview - DailyTools ${item.category} category`} 
                  loading="lazy"
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    transition: 'transform 0.5s ease'
                  }}
                  onMouseEnter={(e) => e.target.style.transform = 'scale(1.05)'}
                  onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
                />
                <div style={{
                  position: 'absolute',
                  top: '1rem',
                  right: '1rem',
                  padding: '0.5rem 1rem',
                  background: 'var(--bg-glass)',
                  backdropFilter: 'blur(12px)',
                  borderRadius: '12px',
                  fontSize: '0.75rem',
                  fontWeight: 800,
                  color: 'var(--accent-primary)',
                  border: '1px solid var(--accent-primary)',
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em'
                }}>
                  {item.category}
                </div>
              </div>
              
              <div style={{ padding: '2rem' }}>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 900, marginBottom: '0.5rem' }}>{item.title}</h3>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: 1.6, marginBottom: '1.5rem' }}>
                  Professional UI preview for the {item.title}. Engineered for speed and 100% browser-based processing.
                </p>
                <Link 
                  to={item.path}
                  className="btn btn-primary"
                  style={{
                    width: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.75rem',
                    textDecoration: 'none'
                  }}
                >
                  <ExternalLink size={18} /> Open Tool
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

        <section style={{ marginTop: '8rem', textAlign: 'center' }}>
          <div style={{
            background: 'linear-gradient(135deg, var(--bg-glass) 0%, rgba(99, 102, 241, 0.05) 100%)',
            padding: '4rem',
            borderRadius: '40px',
            border: '1px solid var(--border-color)',
            maxWidth: '1000px',
            margin: '0 auto'
          }}>
            <h2 style={{ fontSize: '2.5rem', fontWeight: 900, marginBottom: '1.5rem' }}>Professional Quality, Guaranteed</h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', lineHeight: 1.8, marginBottom: '3rem' }}>
              All DailyTools are built with a focus on performance, security, and user experience. 
              Our interfaces are responsive, accessible, and designed to make your daily digital tasks effortless.
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '3rem' }}>
              <div style={{ textAlign: 'center' }}>
                <div style={{ color: 'var(--accent-primary)', marginBottom: '1rem' }}><Camera size={32} /></div>
                <div style={{ fontWeight: 800 }}>High Res</div>
              </div>
              <div style={{ textAlign: 'center' }}>
                <div style={{ color: 'var(--accent-primary)', marginBottom: '1rem' }}><Image size={32} /></div>
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
          </div>
        </section>
      </div>
    </div>
  );
}
