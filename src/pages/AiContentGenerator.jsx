import { useState } from 'react'
import AiToolTemplate from '../components/AiToolTemplate'
import { PenTool, Layers, MessageSquare, Zap, BookOpen, Target, Hash } from 'lucide-react'

export default function AiContentGenerator() {
  const [topic, setTopic] = useState('')
  const [keywords, setKeywords] = useState('')
  const [tone, setTone] = useState('professional')
  const [length, setLength] = useState('standard')

  const tones = [
    { id: 'professional', name: 'Professional', icon: Target, desc: 'Authoritative and polished' },
    { id: 'conversational', name: 'Conversational', icon: MessageSquare, desc: 'Friendly and engaging' },
    { id: 'viral', name: 'Viral/Social', icon: Zap, desc: 'High-energy and catchy' },
    { id: 'academic', name: 'Academic', icon: BookOpen, desc: 'Detailed and research-based' }
  ]

  const lengths = [
    { id: 'brief', name: 'Brief', label: '~300 words' },
    { id: 'standard', name: 'Standard', label: '~700 words' },
    { id: 'exhaustive', name: 'Exhaustive', label: '1500+ words' }
  ]

  const customPromptBuilder = () => {
    return `You are a world-class content strategist and writer. 
Generate a high-authority ${length} article about: "${topic}".
Primary Keywords to include: ${keywords}
Tone of Voice: ${tone}

Structure:
1. Compelling, SEO-optimized title.
2. Engaging introduction with a clear "hook".
3. Well-organized subheadings (H2, H3).
4. Data-driven or insightful body content.
5. Actionably conclusion.

Output ONLY the formatted content in high-end Markdown.`
  }

  return (
    <AiToolTemplate 
      title="Content Forge"
      description="Architect high-authority blog posts, scripts, and articles with surgical precision."
      icon={PenTool}
      path="/ai-tools/content-generator"
      buttonText="Forge Professional Content"
      customPromptBuilder={customPromptBuilder}
      seoKeywords="ai content generator, seo article writer, professional blog ai, content automation"
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
        {/* Main Inputs */}
        <div className="sidebar-section">
          <div className="sidebar-section-title">Blueprint</div>
          <div className="input-group">
            <label htmlFor="ai-content-topic" className="input-label">
              <PenTool size={14} /> Topic
            </label>
            <input 
              id="ai-content-topic"
              name="topic"
              type="text"
              className="input"
              style={{ padding: '1rem' }}
              placeholder="The Future of AI in 2026"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
            />
          </div>

          <div className="input-group" style={{ marginTop: '1rem' }}>
            <label htmlFor="ai-content-keywords" className="input-label">
              <Hash size={14} /> Keywords
            </label>
            <input 
              id="ai-content-keywords"
              name="keywords"
              type="text"
              className="input"
              style={{ padding: '1rem' }}
              placeholder="AI, productivity, automation"
              value={keywords}
              onChange={(e) => setKeywords(e.target.value)}
            />
          </div>
        </div>

        {/* Tone Selector */}
        <div className="sidebar-section">
          <div className="sidebar-section-title">Atmosphere</div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
            {tones.map(t => (
              <button
                key={t.id}
                onClick={() => setTone(t.id)}
                className={`btn ${tone === t.id ? 'btn-primary' : 'btn-secondary'}`}
                style={{ 
                  padding: '1rem 0.75rem', 
                  fontSize: '0.8rem',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '0.5rem',
                  height: 'auto',
                  borderWidth: '1px'
                }}
              >
                <t.icon size={20} strokeWidth={1.5} />
                <span style={{ fontWeight: 800 }}>{t.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Depth Selector */}
        <div className="sidebar-section">
          <div className="sidebar-section-title">Density</div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '0.5rem', background: 'var(--bg-secondary)', padding: '0.5rem', borderRadius: '12px' }}>
            {lengths.map(l => (
              <button
                key={l.id}
                onClick={() => setLength(l.id)}
                style={{ 
                  padding: '0.75rem', 
                  borderRadius: '10px', 
                  border: 'none', 
                  background: length === l.id ? 'var(--bg-card)' : 'transparent',
                  color: length === l.id ? 'var(--text-primary)' : 'var(--text-muted)',
                  fontWeight: 800,
                  fontSize: '0.85rem',
                  cursor: 'pointer',
                  boxShadow: length === l.id ? 'var(--shadow-sm)' : 'none',
                  textAlign: 'left',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}
              >
                {l.name}
                <span style={{ fontSize: '0.7rem', opacity: 0.6, fontWeight: 500 }}>{l.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </AiToolTemplate>
  )
}
