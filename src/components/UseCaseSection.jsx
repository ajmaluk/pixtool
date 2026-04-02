 
import { motion } from 'framer-motion'

export default function UseCaseSection() {
  const useCases = [
    {
      title: 'For Remote Professionals',
      description: 'Merge daily reports, compress high-res meeting screenshots for Slack, and protect sensitive contracts with passwords before emailing.',
      icon: '🏠',
      tools: ['Merge PDF', 'Compress Image', 'Protect PDF']
    },
    {
      title: 'For Social Media Creators',
      description: 'Resize photos for Instagram, crop YouTube thumbnails to 1280x720, and convert images to WebP for faster web loading.',
      icon: '📱',
      tools: ['Image Resizer', 'Crop Tool', 'WebP Converter']
    },
    {
      title: 'For Students & Educators',
      description: 'Split lecture PDFs into chapters, add watermarks to original research, and generate QR codes for classroom resources.',
      icon: '🎓',
      tools: ['Split PDF', 'Watermark', 'QR Generator']
    },
    {
      title: 'For Privacy Advocates',
      description: 'Use disposable emails to test new services without spam, scan QR codes safely, and process files 100% offline.',
      icon: '🛡️',
      tools: ['Temp Mail', 'QR Scanner', 'offline Mode']
    },
    {
      title: 'For Web Developers',
      description: 'Optimize assets for PageSpeed insights, convert legacy images to modern formats, and test typing speed for coding productivity.',
      icon: '💻',
      tools: ['Image Optimizer', 'WebP Convert', 'Typing Test']
    },
    {
      title: 'For Small Business Owners',
      description: 'Create WiFi QR codes for customers, keep invoices organized by merging PDFs, and protect brand assets with watermarks.',
      icon: '💼',
      tools: ['WiFi QR', 'Merge PDF', 'Watermark']
    },
    {
      title: 'For Graphic Designers',
      description: 'Convert heavy client assets to optimized formats instantly and watermark your portfolio pieces before sharing them securely.',
      icon: '🎨',
      tools: ['Format Convert', 'Watermark', 'Crop Tool']
    },
    {
      title: 'For Sales Teams',
      description: 'Merge personalized sales decks with confidential pricing sheets instantly, all without uploading prospect data to the cloud.',
      icon: '📈',
      tools: ['Merge PDF', 'Split PDF', 'Protect PDF']
    },
    {
      title: 'For Content Marketers',
      description: 'Forge high-authority blog posts, generate viral social captions, and find high-intent SEO keywords to dominate search rankings.',
      icon: '🚀',
      tools: ['Content Forge', 'Viral Captions', 'SEO Engine']
    },
    {
      title: 'For Software Engineers',
      description: 'Debug complex code blocks, generate terminal-ready scripts, and compare code diffs with senior-level AI intelligence.',
      icon: '🛡️',
      tools: ['Code Intelligence', 'Code Diff', 'JSON Formatter']
    }
  ]

  return (
    <div className="container-pro" style={{ marginTop: '10rem' }}>
      <div style={{ textAlign: 'center', marginBottom: '5rem' }}>
        <h2 style={{ fontSize: 'clamp(2rem, 5vw, 3rem)', fontWeight: 900, marginBottom: '1.5rem', letterSpacing: '-0.03em' }}>
          One Workspace, <span style={{ color: 'var(--accent-primary)' }}>Infinite Use Cases</span>
        </h2>
        <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', maxWidth: '700px', margin: '0 auto' }}>
          Discover how thousands of professionals use PixTool to streamline their daily digital workflow.
        </p>
      </div>

      <div className="use-case-grid">
        {useCases.map((useCase, idx) => (
          <motion.div
            key={idx}
            whileHover={{ y: -5 }}
            style={{
              background: 'var(--bg-glass)',
              padding: '2.5rem',
              borderRadius: '24px',
              border: '1px solid var(--border-color)',
              display: 'flex',
              flexDirection: 'column',
              gap: '1rem'
            }}
          >
            <div style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>{useCase.icon}</div>
            <h3 style={{ fontSize: '1.4rem', fontWeight: 800 }}>{useCase.title}</h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: 1.6 }}>{useCase.description}</p>
            <div style={{ marginTop: 'auto', display: 'flex', flexWrap: 'wrap', gap: '0.5rem', paddingTop: '1.5rem' }}>
              {useCase.tools.map(tool => (
                <span key={tool} style={{ 
                  fontSize: '0.7rem', 
                  fontWeight: 800, 
                  padding: '0.35rem 0.8rem', 
                  background: 'rgba(79, 70, 229, 0.12)', 
                  color: 'var(--accent-primary)', 
                  borderRadius: '100px',
                  letterSpacing: '0.02em',
                  boxShadow: '0 0 0 1px rgba(79, 70, 229, 0.1)' 
                }}>
                  {tool}
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
