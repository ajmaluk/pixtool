import { useState } from 'react'
import AiToolTemplate from '../components/AiToolTemplate'
import { PenTool, Target, MessageSquare, Zap, BookOpen, Hash } from 'lucide-react'

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

  const customPromptBuilder = (text) => {
    const normalizedTopic = topic.trim() || text.trim() || 'The Future of AI Technology'
    const extraInstructions = text.trim() && text.trim() !== topic.trim() ? `\nAdditional Context / Outline: ${text.trim()}` : ''

    return `You are a world-class content strategist and master writer. 
Generate a high-authority ${length} article about: "${normalizedTopic}".
Primary Keywords to include: ${keywords || 'relevant industry keywords'}
Tone of Voice: ${tone}
${extraInstructions}

Structure:
1. Compelling, SEO-optimized title.
2. Engaging introduction with a clear "hook".
3. Well-organized subheadings (H2, H3).
4. Data-driven, insightful body content with bullet points and takeaways.
5. Actionable conclusion with Key Takeaways.

Output ONLY the formatted content in high-end Markdown.`
  }

  return (
    <AiToolTemplate 
      title="Content Forge"
      description="Architect high-authority blog posts, scripts, and articles with surgical precision."
      icon={PenTool}
      path="/ai-tools/content-generator"
      buttonText="Forge Professional Content"
      placeholder="Type detailed article outline, specific angles, target reader profile, or key talking points..."
      customPromptBuilder={customPromptBuilder}
      seoKeywords="ai content generator, seo article writer, professional blog ai, content automation"
    >
      <div className="sidebar-group">
        <label htmlFor="ai-content-topic" style={{ display: 'block', fontSize: '0.75rem', fontWeight: 800, color: 'var(--text-muted)', marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
          Topic / Focus
        </label>
        <input 
          id="ai-content-topic"
          name="topic"
          type="text"
          style={{ 
            width: '100%', 
            padding: '0.75rem 1rem', 
            borderRadius: '12px', 
            fontSize: '0.9rem', 
            backgroundColor: 'var(--bg-secondary)', 
            border: '1px solid var(--border-color)', 
            outline: 'none', 
            color: 'var(--text-primary)',
            boxSizing: 'border-box'
          }}
          placeholder="e.g. Future of Cloud AI in 2026"
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
        />
      </div>

      <div className="sidebar-group">
        <label htmlFor="ai-content-keywords" style={{ display: 'block', fontSize: '0.75rem', fontWeight: 800, color: 'var(--text-muted)', marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
          Target Keywords
        </label>
        <input 
          id="ai-content-keywords"
          name="keywords"
          type="text"
          style={{ 
            width: '100%', 
            padding: '0.75rem 1rem', 
            borderRadius: '12px', 
            fontSize: '0.9rem', 
            backgroundColor: 'var(--bg-secondary)', 
            border: '1px solid var(--border-color)', 
            outline: 'none', 
            color: 'var(--text-primary)',
            boxSizing: 'border-box'
          }}
          placeholder="e.g. AI, automation, cloud"
          value={keywords}
          onChange={(e) => setKeywords(e.target.value)}
        />
      </div>

      <div className="sidebar-group">
        <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 800, color: 'var(--text-muted)', marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
          Atmosphere / Tone
        </label>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '0.4rem' }}>
          {tones.map(t => (
            <button
              key={t.id}
              type="button"
              onClick={() => setTone(t.id)}
              style={{
                padding: '0.65rem 0.5rem',
                fontSize: '0.78rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.45rem',
                borderRadius: '10px',
                border: '1.5px solid',
                borderColor: tone === t.id ? 'var(--accent-purple)' : 'var(--border-color)',
                background: tone === t.id ? 'var(--accent-glow)' : 'var(--bg-secondary)',
                cursor: 'pointer',
                color: tone === t.id ? 'var(--text-primary)' : 'var(--text-secondary)',
                fontWeight: 700,
                transition: 'all 0.2s'
              }}
            >
              <t.icon size={15} color={tone === t.id ? 'var(--accent-purple)' : 'var(--text-muted)'} strokeWidth={1.5} />
              <span>{t.name}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="sidebar-group">
        <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 800, color: 'var(--text-muted)', marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
          Length & Density
        </label>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem', background: 'var(--bg-secondary)', padding: '0.35rem', borderRadius: '10px' }}>
          {lengths.map(l => (
            <button
              key={l.id}
              type="button"
              onClick={() => setLength(l.id)}
              style={{
                width: '100%',
                padding: '0.5rem 0.75rem',
                borderRadius: '8px',
                border: 'none',
                background: length === l.id ? 'var(--bg-card)' : 'transparent',
                color: length === l.id ? 'var(--text-primary)' : 'var(--text-muted)',
                fontWeight: 700,
                fontSize: '0.78rem',
                cursor: 'pointer',
                transition: 'all 0.2s',
                boxShadow: length === l.id ? 'var(--shadow-sm)' : 'none',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}
            >
              <span>{l.name}</span>
              <span style={{ fontSize: '0.65rem', opacity: 0.6 }}>{l.label}</span>
            </button>
          ))}
        </div>
      </div>
    </AiToolTemplate>
  )
}
