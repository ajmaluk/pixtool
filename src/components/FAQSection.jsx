import { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { GLOBAL_FAQS } from '../data/faqs'

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState(null)
  const faqs = GLOBAL_FAQS

  const toggle = (i) => {
    setOpenIndex(openIndex === i ? null : i)
  }

  return (
    <div className="container-pro faq-section-container">
      <div className="faq-section-header">
        <span className="faq-eyebrow">
          Knowledge Base & Privacy
        </span>
        <h2 className="faq-title">
          Frequently Asked Questions
        </h2>
        <p className="faq-subtitle">
          Everything you need to know about our browser-native processing, privacy guarantees, and free tools.
        </p>
      </div>

      <div className="faq-list">
        {faqs.map((faq, i) => {
          const isOpen = openIndex === i
          return (
            <div
              key={i}
              className="faq-item"
            >
              <button
                onClick={() => toggle(i)}
                className="faq-question-btn"
                aria-expanded={isOpen}
              >
                <span>{faq.q}</span>
                <div className={`faq-chevron-icon ${isOpen ? 'open' : ''}`}>
                  <ChevronDown size={18} />
                </div>
              </button>

              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                    style={{ overflow: 'hidden' }}
                  >
                    <div className="faq-answer-box">
                      {faq.a}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )
        })}
      </div>
    </div>
  )
}
