import { useState } from 'react'
import AiToolTemplate from '../components/AiToolTemplate'
import { FileText, List, Zap, Layers } from 'lucide-react'

export default function AiSummarizer() {
  const [mode, setMode] = useState('structural')
  const [density, setDensity] = useState('medium')

  const modes = [
    { id: 'structural', name: 'Structured Bullets', icon: List, desc: 'Key takeaways & categorized lists' },
    { id: 'executive', name: 'Executive Summary', icon: Zap, desc: 'High-level synthesis for leadership' },
    { id: 'deep', name: 'Comprehensive Analysis', icon: Layers, desc: 'Deep dive into arguments & data' }
  ]

  const densities = [
    { id: 'low', label: 'Brief / TL;DR', sub: '< 100 words' },
    { id: 'medium', label: 'Standard Balanced', sub: '~250 words' },
    { id: 'high', label: 'Granular Breakdown', sub: '~500 words' }
  ]

  const customPromptBuilder = (text) => {
    return `You are a Senior Intelligence Analyst and Document Distiller. 
Transform the following source material into a ${density} density summary using a ${mode} structural format.

FORMAT INSTRUCTIONS:
- Mode: ${mode === 'structural' ? 'Use categorized bullet points with bold key insight headers.' : mode === 'executive' ? 'Use a single, powerful executive summary followed by 3 core strategic implications.' : 'Provide a granular breakdown of all core arguments, statistics, and conclusions.'}
- Density: ${density === 'low' ? 'Keep it extremely concise and direct.' : density === 'medium' ? 'Provide a balanced, highly informative distillation.' : 'Deliver an exhaustive multi-section breakdown.'}
- Retain all crucial data points, metrics, and actionable conclusions.

SOURCE MATERIAL:
${text}`
  }

  return (
    <AiToolTemplate
      title="Intelligence Distiller"
      description="Condense complex manuscripts and reports into high-density strategic insights."
      icon={FileText}
      path="/ai-tools/summarizer"
      buttonText="Distill Intelligence"
      placeholder="Paste your report, article, meeting notes, research paper, or transcript here..."
      customPromptBuilder={customPromptBuilder}
      seoKeywords="ai summarizer, text distiller, executive summary generator, document tldr"
    >
      <div className="sidebar-group">
        <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 800, color: 'var(--text-muted)', marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
          Summary Archetype
        </label>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
          {modes.map(m => (
            <button
              key={m.id}
              type="button"
              onClick={() => setMode(m.id)}
              style={{ 
                width: '100%', 
                padding: '0.6rem 0.75rem', 
                borderRadius: '10px', 
                border: '1.5px solid', 
                borderColor: mode === m.id ? 'var(--accent-purple)' : 'var(--border-color)', 
                background: mode === m.id ? 'var(--accent-glow)' : 'var(--bg-secondary)',
                textAlign: 'left',
                cursor: 'pointer',
                transition: 'all 0.2s',
                display: 'flex',
                alignItems: 'center',
                gap: '0.6rem'
              }}
            >
              <m.icon size={16} color={mode === m.id ? 'var(--accent-purple)' : 'var(--text-muted)'} strokeWidth={1.5} />
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <span style={{ fontWeight: 800, fontSize: '0.8rem', color: mode === m.id ? 'var(--text-primary)' : 'var(--text-secondary)' }}>{m.name}</span>
                <span style={{ fontSize: '0.65rem', color: 'var(--text-muted)' }}>{m.desc}</span>
              </div>
            </button>
          ))}
        </div>
      </div>

      <div className="sidebar-group">
        <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 800, color: 'var(--text-muted)', marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
          Distillation Density
        </label>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem', background: 'var(--bg-secondary)', padding: '0.35rem', borderRadius: '10px' }}>
          {densities.map(d => (
            <button
              key={d.id}
              type="button"
              onClick={() => setDensity(d.id)}
              style={{
                width: '100%',
                padding: '0.5rem 0.75rem',
                borderRadius: '8px',
                border: 'none',
                background: density === d.id ? 'var(--bg-card)' : 'transparent',
                color: density === d.id ? 'var(--text-primary)' : 'var(--text-muted)',
                fontWeight: 700,
                fontSize: '0.78rem',
                cursor: 'pointer',
                transition: 'all 0.2s',
                boxShadow: density === d.id ? 'var(--shadow-sm)' : 'none',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}
            >
              <span>{d.label}</span>
              <span style={{ fontSize: '0.65rem', opacity: 0.6 }}>{d.sub}</span>
            </button>
          ))}
        </div>
      </div>
    </AiToolTemplate>
  )
}
