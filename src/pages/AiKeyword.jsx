import { useState } from 'react'
import AiToolTemplate from '../components/AiToolTemplate'
import { Search, Compass, ShoppingCart, Info, TrendingUp } from 'lucide-react'

export default function AiKeyword() {
  const [topic, setTopic] = useState('')
  const [intent, setIntent] = useState('informational')
  const [complexity, setComplexity] = useState('standard')

  const intents = [
    { id: 'informational', name: 'Info', icon: Info, desc: 'Educational & Guides' },
    { id: 'commercial', name: 'Commercial', icon: Compass, desc: 'Comparison & Research' },
    { id: 'transactional', name: 'Buy', icon: ShoppingCart, desc: 'High Intent Purchase' }
  ]

  const complexities = [
    { id: 'standard', label: 'Standard', sub: 'Balanced long-tail' },
    { id: 'deep', label: 'Deep Semantic', sub: 'Comprehensive clusters' }
  ]

  const customPromptBuilder = (text) => {
    const selectedIntent = intents.find((i) => i.id === intent)
    const normalizedTopic = topic.trim() || 'the domain provided by the user'
    const normalizedContext = text.trim() || 'No extra constraints.'

    return `You are a Senior Technical SEO Strategist and Semantic Search Architect.
Generate an actionable, high-authority keyword matrix for: "${normalizedTopic}".

STRATEGIC PARAMETERS:
- Primary Target / Niche: ${normalizedTopic}
- Primary Search Intent: ${selectedIntent?.name || intent} (${selectedIntent?.desc || ''})
- Semantic Depth: ${complexity}
- Context & Seed Ideas: ${normalizedContext}

OUTPUT REQUIREMENTS:
- Primary Focus Keywords (High relevance, search volume targets).
- Long-Tail Keyword Clusters (Question-based queries, comparison terms).
- LSI / Semantic Entities (Related topical terms to boost page authority).
- Search Intent score and Content Architecture recommendation (H1, H2s, and schema recommendations).
- Format in structured, scannable Markdown tables and bullet lists.`
  }

  return (
    <AiToolTemplate 
      title="SEO Architect"
      description="Engineer high-authority semantic keyword hierarchies for modern search ecosystems."
      icon={Search}
      path="/ai-tools/keyword-generator"
      buttonText="Architect SEO Strategy"
      placeholder="Enter seed topics, competitor URLs, specific sub-niches, or target regions..."
      customPromptBuilder={customPromptBuilder}
      seoKeywords="ai keyword research, seo keyword generator, long tail keyword tool, semantic seo strategist"
    >
      <div className="sidebar-group">
        <label htmlFor="ai-keyword-topic" style={{ display: 'block', fontSize: '0.75rem', fontWeight: 800, color: 'var(--text-muted)', marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
          Domain or Niche
        </label>
        <input 
          id="ai-keyword-topic"
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
          placeholder="e.g. Sustainable Solar Tech"
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
        />
      </div>

      <div className="sidebar-group">
        <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 800, color: 'var(--text-muted)', marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
          Search Intent
        </label>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.4rem' }}>
          {intents.map(i => (
            <button
              key={i.id}
              type="button"
              onClick={() => setIntent(i.id)}
              style={{ 
                padding: '0.65rem 0.35rem', 
                borderRadius: '10px', 
                border: '1.5px solid', 
                borderColor: intent === i.id ? 'var(--accent-purple)' : 'var(--border-color)',
                background: intent === i.id ? 'var(--accent-glow)' : 'var(--bg-secondary)',
                cursor: 'pointer',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '0.3rem',
                transition: 'all 0.2s'
              }}
            >
              <i.icon size={16} color={intent === i.id ? 'var(--accent-purple)' : 'var(--text-muted)'} strokeWidth={1.5} />
              <span style={{ fontSize: '0.72rem', fontWeight: 800, color: intent === i.id ? 'var(--text-primary)' : 'var(--text-secondary)' }}>{i.name}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="sidebar-group">
        <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 800, color: 'var(--text-muted)', marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
          Semantic Depth
        </label>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem', background: 'var(--bg-secondary)', padding: '0.35rem', borderRadius: '10px' }}>
          {complexities.map(c => (
            <button
              key={c.id}
              type="button"
              onClick={() => setComplexity(c.id)}
              style={{ 
                width: '100%', 
                padding: '0.5rem 0.75rem', 
                borderRadius: '8px', 
                border: 'none', 
                background: complexity === c.id ? 'var(--bg-card)' : 'transparent',
                color: complexity === c.id ? 'var(--text-primary)' : 'var(--text-muted)',
                fontWeight: 700,
                fontSize: '0.78rem',
                cursor: 'pointer',
                transition: 'all 0.2s',
                boxShadow: complexity === c.id ? 'var(--shadow-sm)' : 'none',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}
            >
              <span>{c.label}</span>
              <span style={{ fontSize: '0.65rem', opacity: 0.6 }}>{c.sub}</span>
            </button>
          ))}
        </div>
      </div>
    </AiToolTemplate>
  )
}
