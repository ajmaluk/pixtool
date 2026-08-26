import { useState } from 'react'
import AiToolTemplate from '../components/AiToolTemplate'
import { Hash, TrendingUp, Target, Sparkles } from 'lucide-react'

export default function AiHashtag() {
  const [topic, setTopic] = useState('')
  const [density, setDensity] = useState('balanced')

  const densities = [
    { id: 'broad', label: 'Broad Reach', sub: 'High volume discovery' },
    { id: 'balanced', label: 'Balanced Matrix', sub: 'Optimal engagement' },
    { id: 'niche', label: 'Niche Community', sub: 'Targeted authority' }
  ]

  const customPromptBuilder = (text) => {
    const normalizedTopic = topic.trim() || text.trim() || 'General Trending Topic'

    return `You are a Social Media Growth Architect. 
Generate a precision-engineered hashtag ecosystem for: "${normalizedTopic}".

ENGINEERING PARAMETERS:
- Density Level: ${density}
- Context & Post Content: ${text || normalizedTopic}

OUTPUT REQUIREMENTS:
- Group 1: High Volume Core Tags (3-5 tags, massive discovery).
- Group 2: Mid-Tier Strategic Tags (10-15 tags, strong competition/engagement balance).
- Group 3: Hyper-Targeted Niche Tags (5-10 tags, community authority).
- One-click copy block of all combined tags.
- Estimated algorithmic discoverability breakdown.`
  }

  return (
    <AiToolTemplate 
      title="Viral Density"
      description="Architect high-resonance hashtag ecosystems to maximize algorithmic reach."
      icon={Hash}
      path="/ai-tools/hashtag-generator"
      buttonText="Calculate Viral Density"
      placeholder="Enter your topic, post theme, image description, or niche keywords..."
      customPromptBuilder={customPromptBuilder}
      seoKeywords="ai hashtag generator, trending hashtags, instagram tags ai, social media growth tools"
    >
      <div className="sidebar-group">
        <label htmlFor="ai-hashtag-topic" style={{ display: 'block', fontSize: '0.75rem', fontWeight: 800, color: 'var(--text-muted)', marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
          Core Topic / Keyword
        </label>
        <input 
          id="ai-hashtag-topic"
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
          placeholder="e.g. Minimalist Architecture"
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
        />
      </div>

      <div className="sidebar-group">
        <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 800, color: 'var(--text-muted)', marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
          Density Architecture
        </label>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem', background: 'var(--bg-secondary)', padding: '0.35rem', borderRadius: '10px' }}>
          {densities.map(d => (
            <button
              key={d.id}
              type="button"
              onClick={() => setDensity(d.id)}
              style={{ 
                width: '100%', 
                padding: '0.55rem 0.75rem', 
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
