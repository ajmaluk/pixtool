import { useState } from 'react'
import AiToolTemplate from '../components/AiToolTemplate'
import { Edit3, ArrowRight, ArrowDown, Trash2 } from 'lucide-react'

export default function AiGrammarFixer() {
  const [inputText, setInputText] = useState('')

  const customPromptBuilder = (text) => {
    return `You are an expert linguist and editor. Review the following text for grammar, spelling, punctuation, and style. Correct all errors and improve clarity while maintaining the original meaning. Output ONLY the corrected text without any conversational filler or meta-talk.\n\nText to Correct:\n${text}`
  }

  return (
    <AiToolTemplate 
      title="Grammar Architect"
      description="Professional-grade linguistic correction and style enhancement for your manuscripts."
      icon={Edit3}
      path="/ai-tools/grammar-fixer"
      buttonText="Fix Grammar & Style"
      customPromptBuilder={customPromptBuilder}
      seoKeywords="ai grammar checker, professional editor ai, fix grammar online, linguistic analysis tool"
    >
      <div className="grammar-workspace" style={{ marginBottom: '1.5rem' }}>
        <div style={{ marginBottom: '3rem' }}>
          <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 900, color: '#a1a1aa', marginBottom: '1.25rem', textTransform: 'uppercase', letterSpacing: '0.2em' }}>
            Source Manuscript
          </label>
          <textarea 
            className="dalam-textarea"
            style={{ width: '100%', minHeight: '300px', padding: '2rem', fontSize: '1.2rem', border: '1px solid #f4f4f5', background: '#fdfdfd', borderRadius: '32px', color: '#1a1a1a', outline: 'none', lineHeight: 1.6 }}
            placeholder="Paste your text here for linguistic architecting..."
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
          />
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .side-by-side {
            grid-template-columns: 1fr !important;
          }
          .hide-on-mobile { display: none !important; }
          .show-on-mobile { display: block !important; }
        }
      `}</style>
    </AiToolTemplate>
  )
}
