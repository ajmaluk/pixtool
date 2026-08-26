import { useState } from 'react'
import AiToolTemplate from '../components/AiToolTemplate'
import { AlignLeft, Sparkles, Feather, GraduationCap, ShieldCheck } from 'lucide-react'

export default function AiParaphraser() {
  const [tone, setTone] = useState('polished')
  const [goal, setGoal] = useState('clarity')

  const tones = [
    { id: 'polished', label: 'Executive Flow', sub: 'Clean, crisp & professional', icon: ShieldCheck },
    { id: 'creative', label: 'Creative Flare', sub: 'Engaging & vivid vocabulary', icon: Feather },
    { id: 'academic', label: 'Academic Rigor', sub: 'Formal, precise & objective', icon: GraduationCap }
  ]

  const goals = [
    { id: 'clarity', label: 'Maximum Clarity', sub: 'Streamline syntax & flow' },
    { id: 'brevity', label: 'Concise & Short', sub: 'Eliminate filler & fluff' },
    { id: 'persuasive', label: 'High Impact', sub: 'Strengthen verbs & rhetoric' }
  ]

  const customPromptBuilder = (text) => {
    const selectedTone = tones.find(t => t.id === tone)
    const selectedGoal = goals.find(g => g.id === goal)

    return `You are a Master Linguist, Stylistic Editor, and Rhetoric Specialist. 
Paraphrase and elevate the following manuscript based on these constraints:

REWRITING CONSTRAINTS:
- Target Tone: ${selectedTone?.label || tone} (${selectedTone?.sub || ''})
- Optimization Goal: ${selectedGoal?.label || goal} (${selectedGoal?.sub || ''})
- Retain 100% of the core factual meaning and technical nuance.
- Output ONLY the polished paraphrased text, followed by a brief bullet list of key stylistic improvements.

SOURCE MANUSCRIPT:
${text}`
  }

  return (
    <AiToolTemplate 
      title="Nuance Engine"
      description="Refine and re-architect your prose through advanced stylistic transformation."
      icon={AlignLeft}
      path="/ai-tools/paraphraser"
      buttonText="Execute Stylistic Shift"
      placeholder="Paste your paragraph, article draft, essay, or email here for stylistic re-architecture..."
      customPromptBuilder={customPromptBuilder}
      seoKeywords="ai paraphraser, rewrite text online, professional paraphrasing tool, article rewriter"
    >
      <div className="sidebar-group">
        <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 800, color: 'var(--text-muted)', marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
          Target Tone
        </label>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
          {tones.map(t => (
            <button
              key={t.id}
              type="button"
              onClick={() => setTone(t.id)}
              style={{ 
                width: '100%', 
                padding: '0.6rem 0.75rem', 
                borderRadius: '10px', 
                border: '1.5px solid', 
                borderColor: tone === t.id ? 'var(--accent-purple)' : 'var(--border-color)', 
                background: tone === t.id ? 'var(--accent-glow)' : 'var(--bg-secondary)',
                textAlign: 'left',
                cursor: 'pointer',
                transition: 'all 0.2s',
                display: 'flex',
                alignItems: 'center',
                gap: '0.6rem'
              }}
            >
              <t.icon size={16} color={tone === t.id ? 'var(--accent-purple)' : 'var(--text-muted)'} strokeWidth={1.5} />
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <span style={{ fontWeight: 800, fontSize: '0.8rem', color: tone === t.id ? 'var(--text-primary)' : 'var(--text-secondary)' }}>{t.label}</span>
                <span style={{ fontSize: '0.65rem', color: 'var(--text-muted)' }}>{t.sub}</span>
              </div>
            </button>
          ))}
        </div>
      </div>

      <div className="sidebar-group">
        <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 800, color: 'var(--text-muted)', marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
          Refinement Goal
        </label>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem', background: 'var(--bg-secondary)', padding: '0.35rem', borderRadius: '10px' }}>
          {goals.map(g => (
            <button
              key={g.id}
              type="button"
              onClick={() => setGoal(g.id)}
              style={{ 
                width: '100%', 
                padding: '0.5rem 0.75rem', 
                borderRadius: '8px', 
                border: 'none', 
                background: goal === g.id ? 'var(--bg-card)' : 'transparent',
                color: goal === g.id ? 'var(--text-primary)' : 'var(--text-muted)',
                fontWeight: 700,
                fontSize: '0.78rem',
                cursor: 'pointer',
                transition: 'all 0.2s',
                boxShadow: goal === g.id ? 'var(--shadow-sm)' : 'none',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}
            >
              <span>{g.label}</span>
              <span style={{ fontSize: '0.65rem', opacity: 0.6 }}>{g.sub}</span>
            </button>
          ))}
        </div>
      </div>
    </AiToolTemplate>
  )
}
