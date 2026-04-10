import { useState } from 'react'
import AiToolTemplate from '../components/AiToolTemplate'
import { FileText, List, AlignLeft, Zap, Layers } from 'lucide-react'

export default function AiSummarizer() {
  const [inputText, setInputText] = useState('')
  const [mode, setMode] = useState('structural') // structural, executive, deep
  const [density, setDensity] = useState('medium') // low, medium, high

  const modes = [
    { id: 'structural', name: 'Structural', icon: List, desc: 'Logical bullet points' },
    { id: 'executive', name: 'Executive', icon: Zap, desc: 'Paragraph for leadership' },
    { id: 'deep', name: 'Deep Dive', icon: Layers, desc: 'Detailed node analysis' }
  ]

  const densities = [
    { id: 'low', label: 'Brief', sub: 'High-level' },
    { id: 'medium', label: 'Standard', sub: 'Balanced' },
    { id: 'high', label: 'Granular', sub: 'Comprehensive' }
  ]

  const customPromptBuilder = (text) => {
    return `You are a high-level Intelligence Distiller. 
Your task is to transform the following source material into a ${density} density summary using a ${mode} structural format.

FORMAT INSTRUCTIONS:
- Mode: ${mode === 'structural' ? 'Use categorized bullet points with bold headers.' : mode === 'executive' ? 'Use a single, powerful executive paragraph.' : 'Provide a detailed breakdown of all core arguments and data points.'}
- Density: ${density === 'low' ? 'Keep it under 100 words.' : density === 'medium' ? 'Keep it balanced (approx 250 words).' : 'Provide a comprehensive distillation (approx 500 words).'}

SOURCE MATERIAL:
${text}`
  }

  return (
    <AiToolTemplate 
      title="Intelligence Distiller"
      description="Condense complex manuscripts into high-density strategic insights."
      icon={FileText}
      path="/ai-tools/summarizer"
      buttonText="Distill Intelligence"
      customPromptBuilder={customPromptBuilder}
      seoKeywords="ai summarizer, text distiller, executive summary generator, document tldr"
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
        {/* Mode Selector */}
        <div className="sidebar-section">
          <div className="sidebar-section-title">Archetype</div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '0.75rem' }}>
            {modes.map(m => (
              <button
                key={m.id}
                onClick={() => setMode(m.id)}
                className={`btn ${mode === m.id ? 'btn-primary' : 'btn-secondary'}`}
                style={{ 
                  padding: '1rem', 
                  fontSize: '0.85rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'flex-start',
                  gap: '1rem',
                  height: 'auto',
                  textAlign: 'left'
                }}
              >
                <m.icon size={18} strokeWidth={1.5} />
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <span style={{ fontWeight: 800 }}>{m.name}</span>
                    <span style={{ fontSize: '0.7rem', opacity: 0.7, fontWeight: 500 }}>{m.desc}</span>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Density Selector */}
        <div className="sidebar-section">
          <div className="sidebar-section-title">Distillation Density</div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '0.5rem', background: 'var(--bg-secondary)', padding: '0.5rem', borderRadius: '12px' }}>
            {densities.map(d => (
              <button
                key={d.id}
                onClick={() => setDensity(d.id)}
                style={{ 
                  padding: '0.75rem', 
                  borderRadius: '10px', 
                  border: 'none', 
                  background: density === d.id ? 'var(--bg-card)' : 'transparent',
                  color: density === d.id ? 'var(--text-primary)' : 'var(--text-muted)',
                  fontWeight: 800,
                  fontSize: '0.85rem',
                  cursor: 'pointer',
                  boxShadow: density === d.id ? 'var(--shadow-sm)' : 'none',
                  textAlign: 'left',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}
              >
                {d.label}
                <span style={{ fontSize: '0.7rem', opacity: 0.6, fontWeight: 500 }}>{d.sub}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </AiToolTemplate>
  )
}
