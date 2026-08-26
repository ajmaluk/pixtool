export default function UseCaseSection() {
  const useCases = [
    {
      title: 'Remote Professionals',
      description: 'Merge daily reports, compress high-res screenshots for Slack, and encrypt confidential contracts before emailing.',
      icon: '🏠',
      tools: ['Merge PDF', 'Compress Image', 'Protect PDF']
    },
    {
      title: 'Software Engineers',
      description: 'Debug code snippets, format complex JSON payloads, and compare code diffs with senior-level AI speed and local privacy.',
      icon: '💻',
      tools: ['Code Diff', 'JSON Formatter', 'Unit Converter']
    },
    {
      title: 'Content Marketers',
      description: 'Forge high-authority blog posts, generate viral social captions, and extract high-intent SEO keywords to dominate search.',
      icon: '🚀',
      tools: ['Content Forge', 'Viral Captions', 'SEO Engine']
    },
    {
      title: 'Students & Academics',
      description: 'Split lecture slide decks, solve scientific math equations, and generate instant QR links for classroom presentations.',
      icon: '🎓',
      tools: ['Split PDF', 'Equation Solver', 'Scientific Calc']
    },
    {
      title: 'Privacy Advocates',
      description: 'Generate temporary disposable emails to block spam, build high-entropy passwords, and scan QR codes with zero tracking.',
      icon: '🛡️',
      tools: ['Temp Mail', 'Password Gen', 'QR Scanner']
    },
    {
      title: 'Designers & Creatives',
      description: 'Remove photo backgrounds with AI in seconds, convert image formats to WebP, and batch-watermark portfolio assets.',
      icon: '🎨',
      tools: ['Remove BG', 'Format Convert', 'Watermark']
    },
    {
      title: 'Small Business Owners',
      description: 'Create custom WiFi QR codes for customers, organize invoices by merging PDFs, and manage tasks with Kanban boards.',
      icon: '💼',
      tools: ['WiFi QR', 'Merge PDF', 'Kanban Board']
    },
    {
      title: 'Legal & Compliance',
      description: 'Perform air-gapped PDF encryption and OCR text extraction that strictly adheres to GDPR, HIPAA, and CCPA standards.',
      icon: '⚖️',
      tools: ['Protect PDF', 'PDF OCR', 'Air-Gapped']
    }
  ]

  return (
    <div className="container-pro" style={{ marginTop: '7rem', marginBottom: '5rem' }}>
      <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
        <span style={{ fontSize: '0.78rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.12em', color: 'var(--accent-primary)', display: 'block', marginBottom: '0.5rem' }}>
          Tailored Workflows
        </span>
        <h2 style={{ fontSize: 'clamp(2rem, 4.5vw, 3rem)', fontWeight: 900, marginBottom: '1rem', letterSpacing: '-0.03em', color: 'var(--text-primary)' }}>
          One Workspace, <span style={{ color: 'var(--accent-primary)' }}>Infinite Use Cases</span>
        </h2>
        <p style={{ color: 'var(--text-secondary)', fontSize: '1.05rem', maxWidth: '650px', margin: '0 auto', lineHeight: 1.6 }}>
          Discover how thousands of professionals use PixTool's local-first tools to accelerate their daily digital workflow.
        </p>
      </div>

      <div className="use-case-grid">
        {useCases.map((useCase, idx) => (
          <div
            key={idx}
            className="use-case-card-square"
          >
            <div>
              <div className="use-case-icon-box">
                <span>{useCase.icon}</span>
              </div>
              <h3 className="use-case-card-title">
                {useCase.title}
              </h3>
              <p className="use-case-card-desc">
                {useCase.description}
              </p>
            </div>
            
            <div className="use-case-tags">
              {useCase.tools.map(tool => (
                <span key={tool} className="use-case-tag">
                  {tool}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
