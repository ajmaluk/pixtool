import { useState } from 'react'
import AiToolTemplate from '../components/AiToolTemplate'
import { Megaphone, Facebook, Globe, Linkedin, Target, Activity } from 'lucide-react'

export default function AiAdCopy() {
  const [product, setProduct] = useState('')
  const [platform, setPlatform] = useState('meta')
  const [objective, setObjective] = useState('conversion')

  const platforms = [
    { id: 'meta', name: 'Meta', icon: Facebook, desc: 'Instagram & Facebook' },
    { id: 'google', name: 'Google', icon: Globe, desc: 'Search & Display' },
    { id: 'linkedin', name: 'LinkedIn', icon: Linkedin, desc: 'B2B & Professional' }
  ]

  const objectives = [
    { id: 'conversion', label: 'Conversion', sub: 'Direct sales' },
    { id: 'awareness', label: 'Awareness', sub: 'Brand reach' },
    { id: 'engagement', label: 'Engagement', sub: 'Social buzz' }
  ]

  const customPromptBuilder = (text) => {
    return `You are a world-class Direct Response Copywriter. 
Generate a high-converting ad copy suite for ${product} specifically architected for the ${platform} platform.

CAMPAIGN ARCHITECTURE:
- Platform: ${platform}
- Objective: ${objective}
- Additional Context: ${text}

OUTPUT REQUIREMENTS:
- Provide 3 distinct variations (Hook-based, Benefit-based, Story-based).
- Include appropriate ${platform === 'meta' ? 'Emoji and Hashtags' : 'Headline/Sitelink extensions'}.
- Maintain a highly professional yet persuasive authority.`
  }

  return (
    <AiToolTemplate 
      title="Marketing Pulse"
      description="Architect high-conversion ad copy across the world's leading advertising ecosystems."
      icon={Megaphone}
      path="/ai-tools/ad-copy-generator"
      buttonText="Launch Campaign Pulse"
      customPromptBuilder={customPromptBuilder}
      seoKeywords="ai ad copy, meta ads generator, google search ads ai, professional copywriting tools"
    >
      <div className="marketing-workspace" style={{ marginBottom: '1.5rem' }}>
        {/* Core Identity */}
        <div style={{ marginBottom: '3rem' }}>
          <label htmlFor="ai-adcopy-product" style={{ display: 'block', fontSize: '0.75rem', fontWeight: 900, color: '#a1a1aa', marginBottom: '1.25rem', textTransform: 'uppercase', letterSpacing: '0.2em' }}>
            Product or Service Identity
          </label>
          <input 
            id="ai-adcopy-product"
            name="product"
            type="text"
            className="dalam-input-field"
            style={{ width: '100%', padding: '1.5rem 2rem', borderRadius: '24px', fontSize: '1.2rem', backgroundColor: '#fdfdfd', border: '1px solid #f4f4f5', outline: 'none', color: '#1a1a1a' }}
            placeholder="e.g., PixTool AI Productivity Suite"
            value={product}
            onChange={(e) => setProduct(e.target.value)}
          />
        </div>

        {/* Ecosystem & Objective */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2.5rem', marginBottom: '1.5rem' }}>
          
          <div className="platform-selector">
            <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 900, color: '#a1a1aa', marginBottom: '1.25rem', textTransform: 'uppercase', letterSpacing: '0.2em' }}>
              Advertising Ecosystem
            </label>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '0.75rem' }}>
                {platforms.map(p => (
                    <button
                        key={p.id}
                        onClick={() => setPlatform(p.id)}
                        style={{ 
                            padding: '1.25rem 0.5rem', 
                            borderRadius: '20px', 
                            border: '2px solid', 
                            borderColor: platform === p.id ? '#8b5cf6' : '#f4f4f5',
                            background: platform === p.id ? '#fff' : '#fafafa',
                            cursor: 'pointer',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            gap: '0.5rem',
                            transition: 'all 0.2s',
                            boxShadow: platform === p.id ? '0 8px 20px rgba(139, 92, 246, 0.05)' : 'none'
                        }}
                    >
                        <p.icon size={22} color={platform === p.id ? '#8b5cf6' : '#d4d4d8'} strokeWidth={1.5} />
                        <span style={{ fontSize: '0.85rem', fontWeight: 800, color: platform === p.id ? '#09090b' : '#a1a1aa' }}>{p.name}</span>
                    </button>
                ))}
            </div>
          </div>

          <div className="objective-selector">
            <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 900, color: '#a1a1aa', marginBottom: '1.25rem', textTransform: 'uppercase', letterSpacing: '0.2em' }}>
              Campaign Objective
            </label>
            <div style={{ display: 'flex', background: '#f4f4f5', padding: '0.5rem', borderRadius: '24px' }}>
                {objectives.map(o => (
                    <button
                        key={o.id}
                        onClick={() => setObjective(o.id)}
                        style={{ 
                            flex: 1, 
                            padding: '1rem', 
                            borderRadius: '18px', 
                            border: 'none', 
                            background: objective === o.id ? '#fff' : 'transparent',
                            color: objective === o.id ? '#09090b' : '#71717a',
                            fontWeight: 800,
                            fontSize: '0.9rem',
                            cursor: 'pointer',
                            transition: 'all 0.2s',
                            boxShadow: objective === o.id ? '0 5px 15px rgba(0,0,0,0.03)' : 'none'
                        }}
                    >
                        {o.label}
                        <span style={{ display: 'block', fontSize: '0.65rem', opacity: 0.6, fontWeight: 500 }}>{o.sub}</span>
                    </button>
                ))}
            </div>
          </div>

        </div>
      </div>
    </AiToolTemplate>
  )
}
