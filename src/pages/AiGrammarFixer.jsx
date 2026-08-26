import { useState } from 'react'
import AiToolTemplate from '../components/AiToolTemplate'
import { Edit3, CheckCircle2, Zap, ShieldCheck } from 'lucide-react'

export default function AiGrammarFixer() {
  const [styleMode, setStyleMode] = useState('standard')

  const styleModes = [
    { id: 'standard', label: 'Grammar & Syntax', sub: 'Fix spelling, punctuation & errors', icon: CheckCircle2 },
    { id: 'fluent', label: 'Natural Fluency', sub: 'Native flow, idioms & smooth phrasing', icon: Zap },
    { id: 'formal', label: 'Academic & Formal', sub: 'Elevated vocabulary & formal prose', icon: ShieldCheck }
  ]

  const customPromptBuilder = (text) => {
    return `You are a World-Class Linguist, Editor, and Proofreader. 
Review the following text for grammar, spelling, punctuation, syntax flow, and stylistic precision based on "${styleMode}" mode.

INSTRUCTIONS:
1. Correct all grammatical errors, typos, and awkward phrasing while strictly preserving the author's original intended meaning.
2. Provide the Pristine Corrected Version first in a clean Markdown block.
3. Followed by a concise bulleted "Correction Log" summarizing the major fixes and stylistic enhancements made.
4. Maintain a high-end editorial tone without casual conversational filler.

TEXT TO CORRECT:
${text}`
  }

  return (
    <AiToolTemplate
      title="Grammar Architect"
      description="Professional-grade linguistic correction, syntax polishing, and style enhancement."
      icon={Edit3}
      path="/ai-tools/grammar-fixer"
      buttonText="Fix Grammar & Style"
      placeholder="Paste your paragraph, manuscript, article, email, or essay here to detect and correct errors..."
      customPromptBuilder={customPromptBuilder}
      seoKeywords="ai grammar checker, professional editor ai, fix grammar online, linguistic analysis tool"
    >
      <div className="sidebar-group">
        <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 800, color: 'var(--text-muted)', marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
          Correction Mode
        </label>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
          {styleModes.map(m => (
            <button
              key={m.id}
              type="button"
              onClick={() => setStyleMode(m.id)}
              style={{ 
                width: '100%', 
                padding: '0.6rem 0.75rem', 
                borderRadius: '10px', 
                border: '1.5px solid', 
                borderColor: styleMode === m.id ? 'var(--accent-purple)' : 'var(--border-color)', 
                background: styleMode === m.id ? 'var(--accent-glow)' : 'var(--bg-secondary)',
                textAlign: 'left',
                cursor: 'pointer',
                transition: 'all 0.2s',
                display: 'flex',
                alignItems: 'center',
                gap: '0.6rem'
              }}
            >
              <m.icon size={16} color={styleMode === m.id ? 'var(--accent-purple)' : 'var(--text-muted)'} strokeWidth={1.5} />
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <span style={{ fontWeight: 800, fontSize: '0.8rem', color: styleMode === m.id ? 'var(--text-primary)' : 'var(--text-secondary)' }}>{m.label}</span>
                <span style={{ fontSize: '0.65rem', color: 'var(--text-muted)' }}>{m.sub}</span>
              </div>
            </button>
          ))}
        </div>
      </div>
    </AiToolTemplate>
  )
}
