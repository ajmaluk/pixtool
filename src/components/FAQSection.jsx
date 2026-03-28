import { GLOBAL_FAQS } from '../data/faqs'

export default function FAQSection() {
  const faqs = GLOBAL_FAQS

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
