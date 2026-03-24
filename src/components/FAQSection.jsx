export default function FAQSection() {
  const faqs = [
    { q: "Is PixTool really free?", a: "Yes, 100% free. Every tool on PixTool is available without any cost, subscription, or hidden fees. We support the platform through non-intrusive advertising." },
    { q: "Are my files safe and private?", a: "Absolutely. PixTool processes your files entirely within your browser. Your images, PDFs, and documents are never uploaded to any server. Once you close the tab, your data is gone." },
    { q: "What image formats are supported?", a: "Our image tools support all major formats including JPEG, PNG, WebP, GIF, BMP, and TIFF. You can also convert between formats while resizing, cropping, or compressing." },
    { q: "Can I merge more than two PDFs?", a: "Yes! Our PDF merger supports combining as many PDF files as you need into a single document. Simply upload all your files and arrange them in the desired order." },
    { q: "Do I need to install anything?", a: "No installation required. PixTool runs entirely in your web browser. Just visit the site and start using any tool immediately on any device." },
    { q: "What is the maximum file size?", a: "Since processing happens in your browser, the limit depends on your device's available memory. Most modern devices can handle files up to 100MB+ without issues." },
  ]

  return (
    <div className="container-pro" style={{ marginTop: '6rem', maxWidth: '100%', margin: '6rem auto 0' }}>
      <h2 style={{ fontSize: '2.5rem', fontWeight: 900, textAlign: 'center', marginBottom: '1rem' }}>Frequently Asked Questions</h2>
      <p style={{ textAlign: 'center', color: 'var(--text-secondary)', marginBottom: '3rem', fontSize: '1.1rem' }}>Everything you need to know about PixTool</p>

      {faqs.map((faq, i) => (
        <div key={i} style={{ padding: '1.5rem 2rem', background: 'var(--bg-secondary)', borderRadius: '16px', marginBottom: '1rem', border: '1px solid var(--border-color)' }}>
          <h3 style={{ fontWeight: 700, fontSize: '1.1rem', marginBottom: '0.75rem' }}>{faq.q}</h3>
          <p style={{ color: 'var(--text-secondary)', lineHeight: 1.6 }}>{faq.a}</p>
        </div>
      ))}
    </div>
  )
}
