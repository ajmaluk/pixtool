import { useState } from 'react'
import AiToolTemplate from '../components/AiToolTemplate'
import { Search, Compass, Target, BarChart3, Fingerprint, Zap } from 'lucide-react'

export default function AiKeyword() {
  const [topic, setTopic] = useState('')
  const [intent, setIntent] = useState('informational')
  const [complexity, setComplexity] = useState('balanced')

  const intents = [
    { id: 'informational', name: 'Information', icon: Compass, desc: 'Why & How questions' },
    { id: 'transactional', name: 'Commercial', icon: Target, desc: 'Purchase & intent' },
    { id: 'navigational', name: 'Identity', icon: Fingerprint, desc: 'Brand-focused' }
  ]

  const complexities = [
    { id: 'broad', label: 'Broad', sub: 'High traffic' },
    { id: 'balanced', label: 'Balanced', sub: 'Competitive' },
    { id: 'longtail', label: 'Long-tail', sub: 'Niche focused' }
  ]

  const customPromptBuilder = (text) => {
    return `You are a Senior SEO Strategist and Semantic Search Expert. 
Architect a comprehensive keyword hierarchy for the topic: "${topic}".

STRATEGIC PARAMETERS:
- Search Intent: ${intent}
- Semantic Complexity: ${complexity}
- Context/Objective: ${text}

OUTPUT REQUIREMENTS:
- Provide a Primary Seed Keyword.
- List 10 High-Authority Long-tail Keywords.
- Identify 5 LSI (Latent Semantic Indexing) entities.
- Suggest a "Search Intent" score for each (Informational vs Transactional).
- Propose a content structure (H1, H2s) optimized for these keywords.`
  }

  return (
    <AiToolTemplate 
      title="SEO Architect"
      description="Engineer high-authority semantic keyword hierarchies for modern search ecosystems."
      icon={Search}
      path="/ai-tools/keyword-generator"
      buttonText="Architect SEO Strategy"
      customPromptBuilder={customPromptBuilder}
      seoKeywords="ai keyword research, seo keyword generator, long tail keyword tool, semantic seo strategist"
    >
      <div className="seo-workspace" style={{ marginBottom: '1.5rem' }}>
        {/* Topic Forge */}
        <div style={{ marginBottom: '3rem' }}>
          <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 900, color: 'var(--text-muted)', marginBottom: '1.25rem', textTransform: 'uppercase', letterSpacing: '0.2em' }}>
            Primary Domain or Topic
          </label>
          <input 
            type="text"
            className="dalam-input-field"
            style={{ width: '100%', padding: '1.5rem 2rem', borderRadius: '24px', fontSize: '1.2rem', backgroundColor: 'var(--bg-primary)', border: '1px solid var(--border-color)', outline: 'none', color: 'var(--text-primary)' }}
            placeholder="e.g., Sustainable Green Hydrogen Technology"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
          />
        </div>

        {/* Intent & Complexity Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2.5rem', marginBottom: '1.5rem' }}>
          
          <div className="intent-selector">
            <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 900, color: 'var(--text-muted)', marginBottom: '1.25rem', textTransform: 'uppercase', letterSpacing: '0.2em' }}>
              Strategic Search Intent
            </label>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '0.75rem' }}>
                {intents.map(i => (
                    <button
                        key={i.id}
                        onClick={() => setIntent(i.id)}
                        style={{ 
                            padding: '1.25rem 0.5rem', 
                            borderRadius: '20px', 
                            border: '2px solid', 
                            borderColor: intent === i.id ? 'var(--accent-purple)' : 'var(--border-color)',
                            background: intent === i.id ? 'var(--bg-primary)' : 'var(--bg-secondary)',
                            cursor: 'pointer',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            gap: '0.5rem',
                            transition: 'all 0.2s',
                            boxShadow: intent === i.id ? 'var(--shadow-premium)' : 'none'
                        }}
                    >
                        <i.icon size={22} color={intent === i.id ? 'var(--accent-purple)' : 'var(--text-muted)'} strokeWidth={1.5} />
                        <span style={{ fontSize: '0.85rem', fontWeight: 800, color: intent === i.id ? 'var(--text-primary)' : 'var(--text-muted)' }}>{i.name}</span>
                    </button>
                ))}
            </div>
          </div>

          <div className="complexity-selector">
            <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 900, color: 'var(--text-muted)', marginBottom: '1.25rem', textTransform: 'uppercase', letterSpacing: '0.2em' }}>
              Semantic Complexity
            </label>
            <div style={{ display: 'flex', background: 'var(--bg-secondary)', padding: '0.5rem', borderRadius: '24px' }}>
                {complexities.map(c => (
                    <button
                        key={c.id}
                        onClick={() => setComplexity(c.id)}
                        style={{ 
                            flex: 1, 
                            padding: '1rem', 
                            borderRadius: '18px', 
                            border: 'none', 
                            background: complexity === c.id ? 'var(--bg-primary)' : 'transparent',
                            color: complexity === c.id ? 'var(--text-primary)' : 'var(--text-muted)',
                            fontWeight: 800,
                            fontSize: '0.9rem',
                            cursor: 'pointer',
                            transition: 'all 0.2s',
                            boxShadow: complexity === c.id ? 'var(--shadow-sm)' : 'none'
                        }}
                    >
                        {c.label}
                        <span style={{ display: 'block', fontSize: '0.65rem', opacity: 0.6, fontWeight: 500 }}>{c.sub}</span>
                    </button>
                ))}
            </div>
          </div>

        </div>

        <div style={{ marginTop: '2.5rem', padding: '1.75rem', background: 'var(--bg-secondary)', borderRadius: '28px', border: '1px solid var(--border-color)', display: 'flex', gap: '1.25rem', alignItems: 'center' }}>
            <div style={{ color: 'var(--accent-purple)' }}><Zap size={24} strokeWidth={1.5} /></div>
            <div style={{ fontSize: '0.9rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>
                Our intelligence engine will now reverse-engineer the semantic graph for this topic to ensure maximum rank potential.
            </div>
        </div>
      </div>
    </AiToolTemplate>
  )
}
