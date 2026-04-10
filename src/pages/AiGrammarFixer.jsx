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
      <div className="sidebar-section">
        <div className="sidebar-section-title">Linguistic Precision</div>
        <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: 1.6, margin: 0 }}>
          Your text will be analyzed for grammatical accuracy, syntactic flow, and stylistic consistency. Correction is applied in real-time through the neural engine.
        </p>
      </div>
    </AiToolTemplate>
  )
}
