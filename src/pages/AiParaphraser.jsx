import { useState } from 'react'
import AiToolTemplate from '../components/AiToolTemplate'
import { AlignLeft, Zap, ShieldCheck, Sparkles } from 'lucide-react'

export default function AiParaphraser() {
  const [inputText, setInputText] = useState('')
  const [tone, setTone] = useState('polished') // polished, casual, academic

  const tones = [
    { id: 'polished', label: 'Polished', sub: 'Executive flow' },
    { id: 'creative', label: 'Creative', sub: 'Artistic flair' },
    { id: 'academic', label: 'Academic', sub: 'Rigorous detail' }
  ]

  const customPromptBuilder = (text) => {
    return `You are a Master Linguist and Stylistic Architect. 
Your objective is to paraphrase the following text into a ${tone} masterpiece while preserving 100% of the original semantics.

STYLISTIC CONSTRAINTS:
- Tone: ${tone}
- Flow: Optimized for readability and impact.
- Vocabulary: Sophisticated yet accessible.

SOURCE TEXT:
${text}`
  }

  return (
    <AiToolTemplate 
      title="Nuance Engine"
      description="Refine and re-architect your prose through advanced stylistic transformation."
      icon={AlignLeft}
      path="/ai-tools/paraphraser"
      buttonText="Execute Stylistic Shift"
      customPromptBuilder={customPromptBuilder}
      seoKeywords="ai paraphraser, rewrite text online, professional paraphrasing tool, article rewriter"
    >
      <div className="paraphrase-workspace" style={{ marginBottom: '1.5rem' }}>
        {/* Source Manuscript */}
        <div style={{ marginBottom: '3rem' }}>
          <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 900, color: 'var(--text-muted)', marginBottom: '1.25rem', textTransform: 'uppercase', letterSpacing: '0.2em' }}>
            Source Manuscript
          </label>
          <textarea 
            className="dalam-textarea"
            style={{ width: '100%', minHeight: '280px', padding: '2rem', fontSize: '1.2rem', background: 'var(--bg-primary)', borderRadius: '32px', border: '1px solid var(--border-color)', outline: 'none', color: 'var(--text-primary)', lineHeight: 1.6 }}
            placeholder="Paste your text here for stylistic re-architecture..."
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
          />
        </div>

        {/* Tone Architecture */}
        <div style={{ marginBottom: '1.5rem' }}>
          <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 900, color: 'var(--text-muted)', marginBottom: '1.5rem', textTransform: 'uppercase', letterSpacing: '0.2em' }}>
            Target Tone Architecture
          </label>
          <div style={{ display: 'flex', background: 'var(--bg-secondary)', padding: '0.5rem', borderRadius: '24px', maxWidth: '600px' }}>
              {tones.map(t => (
                  <button
                      key={t.id}
                      onClick={() => setTone(t.id)}
                      style={{ 
                          flex: 1, 
                          padding: '1.25rem 1rem', 
                          borderRadius: '20px', 
                          border: 'none', 
                          background: tone === t.id ? 'var(--bg-primary)' : 'transparent',
                          color: tone === t.id ? 'var(--text-primary)' : 'var(--text-muted)',
                          fontWeight: 800,
                          fontSize: '0.95rem',
                          cursor: 'pointer',
                          transition: 'all 0.2s',
                          boxShadow: tone === t.id ? 'var(--shadow-sm)' : 'none'
                      }}
                  >
                      {t.label}
                      <span style={{ display: 'block', fontSize: '0.7rem', opacity: 0.6, fontWeight: 500 }}>{t.sub}</span>
                  </button>
              ))}
          </div>
        </div>

        <div style={{ marginTop: '3rem', padding: '2rem', background: 'var(--bg-secondary)', borderRadius: '28px', border: '1px solid var(--border-color)', display: 'flex', gap: '1.25rem', alignItems: 'center' }}>
            <div style={{ color: 'var(--accent-purple)' }}><Sparkles size={28} strokeWidth={1.5} /></div>
            <div style={{ fontSize: '1rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>
                Prose refinement in progress. The AI will optimize sentence structure and semantic flow for maximum resonance.
            </div>
        </div>
      </div>
    </AiToolTemplate>
  )
}
