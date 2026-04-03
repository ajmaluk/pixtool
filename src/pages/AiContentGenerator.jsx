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
      <div className="content-studio" style={{ marginBottom: '1rem' }}>
        {/* Main Inputs */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '2rem', marginBottom: '3rem' }}>
          <div className="input-group">
            <label htmlFor="ai-content-topic" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.25rem', fontWeight: 900, fontSize: '0.8rem', color: '#a1a1aa', textTransform: 'uppercase', letterSpacing: '0.2em' }}>
              <PenTool size={16} /> Main Topic or Blueprint
            </label>
            <input 
              id="ai-content-topic"
              name="topic"
              type="text"
              className="dalam-input-field"
              style={{ width: '100%', padding: '1.5rem 2rem', borderRadius: '24px', fontSize: '1.2rem', backgroundColor: '#fdfdfd', border: '1px solid #f4f4f5', outline: 'none', color: '#1a1a1a' }}
              placeholder="e.g., The Future of Artificial Intelligence in 2026"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
            />
          </div>

          <div className="input-group">
            <label htmlFor="ai-content-keywords" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.25rem', fontWeight: 900, fontSize: '0.8rem', color: '#a1a1aa', textTransform: 'uppercase', letterSpacing: '0.2em' }}>
              <Hash size={16} /> Linguistic Keywords
            </label>
            <input 
              id="ai-content-keywords"
              name="keywords"
              type="text"
              className="dalam-input-field"
              style={{ width: '100%', padding: '1.5rem 2rem', borderRadius: '24px', fontSize: '1.2rem', backgroundColor: '#fdfdfd', border: '1px solid #f4f4f5', outline: 'none', color: '#1a1a1a' }}
              placeholder="e.g., machine learning, productivity, automation"
              value={keywords}
              onChange={(e) => setKeywords(e.target.value)}
            />
          </div>
        </div>

        {/* Tone Selector */}
        <div style={{ marginBottom: '3.5rem' }}>
          <label style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem', fontWeight: 900, fontSize: '0.8rem', color: '#a1a1aa', textTransform: 'uppercase', letterSpacing: '0.2em' }}>
            <Layers size={16} /> Content Atmosphere
          </label>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '1rem' }}>
            {tones.map(t => (
              <button
                key={t.id}
                onClick={() => setTone(t.id)}
                style={{ 
                  padding: '1.5rem', 
                  borderRadius: '28px', 
                  border: '2px solid', 
                  borderColor: tone === t.id ? '#8b5cf6' : '#f4f4f5', 
                  background: tone === t.id ? '#fff' : '#fafafa',
                  textAlign: 'left',
                  cursor: 'pointer',
                  transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
                  boxShadow: tone === t.id ? '0 10px 25px rgba(139, 92, 246, 0.05)' : 'none'
                }}
                className="tone-card-v2"
              >
                <div style={{ color: tone === t.id ? '#8b5cf6' : '#d4d4d8', marginBottom: '1rem' }}>
                  <t.icon size={28} strokeWidth={1.5} />
                </div>
                <div style={{ fontWeight: 800, fontSize: '1.1rem', color: tone === t.id ? '#09090b' : '#3f3f46', marginBottom: '0.25rem' }}>{t.name}</div>
                <div style={{ fontSize: '0.8rem', color: '#a1a1aa', lineHeight: 1.4 }}>{t.desc}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Depth Selector */}
        <div style={{ marginBottom: '1rem' }}>
           <label style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem', fontWeight: 900, fontSize: '0.8rem', color: '#a1a1aa', textTransform: 'uppercase', letterSpacing: '0.2em' }}>
            <Target size={16} /> Information Density
          </label>
          <div style={{ display: 'flex', background: '#f4f4f5', padding: '0.6rem', borderRadius: '24px' }}>
            {lengths.map(l => (
              <button
                key={l.id}
                onClick={() => setLength(l.id)}
                style={{ 
                  flex: 1, 
                  padding: '1.25rem', 
                  borderRadius: '18px', 
                  border: 'none', 
                  background: length === l.id ? '#fff' : 'transparent',
                  color: length === l.id ? '#09090b' : '#71717a',
                  fontWeight: 800,
                  fontSize: '0.95rem',
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                  boxShadow: length === l.id ? '0 4px 12px rgba(0,0,0,0.03)' : 'none'
                }}
              >
                {l.name} <span style={{ fontSize: '0.75rem', opacity: 0.6, display: 'block', fontWeight: 500 }}>{l.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </AiToolTemplate>
  )
}
