import { useState } from 'react'
import AiToolTemplate from '../components/AiToolTemplate'
import { Megaphone, Facebook, Globe, Linkedin, Sparkles } from 'lucide-react'

export default function AiAdCopy() {
  const [product, setProduct] = useState('')
  const [platform, setPlatform] = useState('meta')
  const [objective, setObjective] = useState('conversion')

  const platforms = [
    { id: 'meta', name: 'Meta', icon: Facebook },
    { id: 'google', name: 'Google', icon: Globe },
    { id: 'linkedin', name: 'LinkedIn', icon: Linkedin }
  ]

  const objectives = [
    { id: 'conversion', label: 'Conversion', sub: 'Sales & Leads' },
    { id: 'awareness', label: 'Awareness', sub: 'Reach & Views' },
    { id: 'engagement', label: 'Engagement', sub: 'Clicks & Buzz' }
  ]

  const customPromptBuilder = (text) => {
    const selectedPlatform = platforms.find((p) => p.id === platform)
    const selectedObjective = objectives.find((o) => o.id === objective)
    const normalizedProduct = product.trim() || 'the product described by the user'
    const normalizedContext = text.trim() || 'No extra context provided.'

    return `You are a world-class Direct Response Copywriter. 
Generate a high-converting ad copy suite for ${normalizedProduct} specifically architected for ${selectedPlatform?.name || platform}.

CAMPAIGN ARCHITECTURE:
- Product/Service: ${normalizedProduct}
- Platform: ${selectedPlatform?.name || platform}
- Objective: ${selectedObjective?.label || objective}
- Audience & Extra Context: ${normalizedContext}

OUTPUT REQUIREMENTS:
- Provide 3 distinct variations (1: Hook-based / High urgency, 2: Feature & Benefit-based, 3: Storytelling / Social proof).
- For each variation include:
  1. Primary Ad Copy
  2. Attention-Grabbing Headline
  3. Call To Action (CTA)
  4. 3 High-intent Audience Keywords / Hashtags
- Keep copy scannable: short lines, clear value proposition, and frictionless call to action.
- Maintain an authoritative, persuasive tone tailored to ${selectedPlatform?.name || platform}.`
  }

  return (
    <AiToolTemplate 
      title="Marketing Pulse"
      description="Architect high-conversion ad copy across the world's leading advertising ecosystems."
      icon={Megaphone}
      path="/ai-tools/ad-copy-generator"
      buttonText="Launch Campaign Pulse"
      placeholder="Describe your target audience, unique value proposition, key pain points, or discount offers..."
      customPromptBuilder={customPromptBuilder}
      seoKeywords="ai ad copy, meta ads generator, google search ads ai, professional copywriting tools"
    >
      <div className="sidebar-group">
        <label htmlFor="ai-adcopy-product" style={{ display: 'block', fontSize: '0.75rem', fontWeight: 800, color: 'var(--text-muted)', marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
          Product or Service
        </label>
        <input 
          id="ai-adcopy-product"
          name="product"
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
          placeholder="e.g. PixTool AI Productivity Suite"
          value={product}
          onChange={(e) => setProduct(e.target.value)}
        />
      </div>

      <div className="sidebar-group">
        <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 800, color: 'var(--text-muted)', marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
          Advertising Platform
        </label>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.5rem' }}>
          {platforms.map(p => (
            <button
              key={p.id}
              type="button"
              onClick={() => setPlatform(p.id)}
              style={{ 
                padding: '0.75rem 0.4rem', 
                borderRadius: '12px', 
                border: '1.5px solid', 
                borderColor: platform === p.id ? 'var(--accent-purple)' : 'var(--border-color)',
                background: platform === p.id ? 'var(--accent-glow)' : 'var(--bg-secondary)',
                cursor: 'pointer',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '0.35rem',
                transition: 'all 0.2s ease'
              }}
            >
              <p.icon size={18} color={platform === p.id ? 'var(--accent-purple)' : 'var(--text-muted)'} strokeWidth={1.5} />
              <span style={{ fontSize: '0.75rem', fontWeight: 800, color: platform === p.id ? 'var(--text-primary)' : 'var(--text-secondary)' }}>{p.name}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="sidebar-group">
        <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 800, color: 'var(--text-muted)', marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
          Campaign Objective
        </label>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem', background: 'var(--bg-secondary)', padding: '0.4rem', borderRadius: '12px' }}>
          {objectives.map(o => (
            <button
              key={o.id}
              type="button"
              onClick={() => setObjective(o.id)}
              style={{ 
                width: '100%', 
                padding: '0.55rem 0.75rem', 
                borderRadius: '8px', 
                border: 'none', 
                background: objective === o.id ? 'var(--bg-card)' : 'transparent',
                color: objective === o.id ? 'var(--text-primary)' : 'var(--text-muted)',
                fontWeight: 700,
                fontSize: '0.8rem',
                cursor: 'pointer',
                transition: 'all 0.2s',
                boxShadow: objective === o.id ? 'var(--shadow-sm)' : 'none',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}
            >
              <span>{o.label}</span>
              <span style={{ fontSize: '0.68rem', opacity: 0.6, fontWeight: 500 }}>{o.sub}</span>
            </button>
          ))}
        </div>
      </div>
    </AiToolTemplate>
  )
}
