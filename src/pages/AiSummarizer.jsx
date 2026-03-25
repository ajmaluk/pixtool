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
      <div className="distiller-workspace" style={{ marginBottom: '1.5rem' }}>
        {/* Input Forge */}
        <div style={{ marginBottom: '3rem' }}>
          <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 900, color: '#a1a1aa', marginBottom: '1.25rem', textTransform: 'uppercase', letterSpacing: '0.2em' }}>
            Source Manuscript
          </label>
          <textarea 
            className="dalam-textarea"
            style={{ width: '100%', minHeight: '300px', padding: '2rem', fontSize: '1.2rem', background: '#fdfdfd', borderRadius: '32px', border: '1px solid #f4f4f5', outline: 'none', color: '#1a1a1a', lineHeight: 1.6 }}
            placeholder="Paste your long-form content here for distillation..."
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
          />
        </div>

        {/* Mode & Density Controls */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2.5rem', marginBottom: '1.5rem' }}>
          
          <div className="mode-selector">
            <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 900, color: '#a1a1aa', marginBottom: '1.25rem', textTransform: 'uppercase', letterSpacing: '0.2em' }}>
              Structural Archetype
            </label>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '0.75rem' }}>
                {modes.map(m => (
                    <button
                        key={m.id}
                        onClick={() => setMode(m.id)}
                        style={{ 
                            padding: '1.25rem 0.5rem', 
                            borderRadius: '20px', 
                            border: '2px solid', 
                            borderColor: mode === m.id ? '#8b5cf6' : '#f4f4f5',
                            background: mode === m.id ? '#fff' : '#fafafa',
                            cursor: 'pointer',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            gap: '0.5rem',
                            transition: 'all 0.2s',
                            boxShadow: mode === m.id ? '0 8px 20px rgba(139, 92, 246, 0.05)' : 'none'
                        }}
                    >
                        <m.icon size={22} color={mode === m.id ? '#8b5cf6' : '#d4d4d8'} strokeWidth={1.5} />
                        <span style={{ fontSize: '0.85rem', fontWeight: 800, color: mode === m.id ? '#09090b' : '#a1a1aa' }}>{m.name}</span>
                    </button>
                ))}
            </div>
          </div>

          <div className="density-selector">
            <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 900, color: '#a1a1aa', marginBottom: '1.25rem', textTransform: 'uppercase', letterSpacing: '0.2em' }}>
              Information Density
            </label>
            <div style={{ display: 'flex', background: '#f4f4f5', padding: '0.5rem', borderRadius: '24px' }}>
                {densities.map(d => (
                    <button
                        key={d.id}
                        onClick={() => setDensity(d.id)}
                        style={{ 
                            flex: 1, 
                            padding: '1rem', 
                            borderRadius: '18px', 
                            border: 'none', 
                            background: density === d.id ? '#fff' : 'transparent',
                            color: density === d.id ? '#09090b' : '#71717a',
                            fontWeight: 800,
                            fontSize: '0.9rem',
                            cursor: 'pointer',
                            transition: 'all 0.2s',
                            boxShadow: density === d.id ? '0 5px 15px rgba(0,0,0,0.03)' : 'none'
                        }}
                    >
                        {d.label}
                        <span style={{ display: 'block', fontSize: '0.65rem', opacity: 0.6, fontWeight: 500 }}>{d.sub}</span>
                    </button>
                ))}
            </div>
          </div>

        </div>
      </div>
    </AiToolTemplate>
  )
}
