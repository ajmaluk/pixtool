import { useState } from 'react'
import AiToolTemplate from '../components/AiToolTemplate'
import { Hash, TrendingUp, Target, Globe } from 'lucide-react'

export default function AiHashtag() {
  const [topic, setTopic] = useState('')
  const [density, setDensity] = useState('balanced')

  const densities = [
    { id: 'broad', label: 'Broad', sub: 'High volume tags' },
    { id: 'balanced', label: 'Balanced', sub: 'Optimal reach' },
    { id: 'niche', label: 'Niche', sub: 'Focused community' }
  ]

  const customPromptBuilder = (text) => {
    return `You are a Social Media Growth Architect. 
Generate a precision-engineered hashtag ecosystem for: "${topic}".

ENGINEERING PARAMETERS:
- Density Level: ${density}
- Context: ${text}

OUTPUT REQUIREMENTS:
- Categorize tags into: Primary (High Volume), Strategic (Mid Volume), and Community (Niche).
- Provide a "Viral Density" score for the set.
- Ensure 100% relevance to the core topic to avoid shadow-banning algorithms.`
  }

  return (
    <AiToolTemplate 
      title="Viral Density"
      description="Architect high-resonance hashtag ecosystems to maximize algorithmic reach."
      icon={Hash}
      path="/ai-tools/hashtag-generator"
      buttonText="Calculate Viral Density"
      customPromptBuilder={customPromptBuilder}
      seoKeywords="ai hashtag generator, trending hashtags, instagram tags ai, social media growth tools"
    >
      <div className="hashtag-workspace" style={{ marginBottom: '1.5rem' }}>
        {/* Core Topic */}
        <div style={{ marginBottom: '3rem' }}>
          <label htmlFor="ai-hashtag-topic" style={{ display: 'block', fontSize: '0.75rem', fontWeight: 900, color: 'var(--text-muted)', marginBottom: '1.25rem', textTransform: 'uppercase', letterSpacing: '0.2em' }}>
            Core Topic or Post Description
          </label>
          <input 
            id="ai-hashtag-topic"
            name="topic"
            type="text"
            className="dalam-input-field"
            style={{ width: '100%', padding: '1.5rem 2rem', borderRadius: '24px', fontSize: '1.2rem', backgroundColor: 'var(--bg-primary)', border: '1px solid var(--border-color)', outline: 'none', color: 'var(--text-primary)' }}
            placeholder="e.g., Minimalist sustainable architecture in Scandinavia"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
          />
        </div>

        {/* Density Architecture */}
        <div style={{ marginBottom: '3rem' }}>
          <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 900, color: 'var(--text-muted)', marginBottom: '1.5rem', textTransform: 'uppercase', letterSpacing: '0.2em' }}>
            Density Architecture
          </label>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
              {densities.map(d => (
                  <button
                      key={d.id}
                      onClick={() => setDensity(d.id)}
                      style={{ 
                          padding: '1.75rem', 
                          borderRadius: '28px', 
                          border: '2px solid', 
                          borderColor: density === d.id ? 'var(--accent-purple)' : 'var(--border-color)', 
                          background: density === d.id ? 'var(--bg-primary)' : 'var(--bg-secondary)',
                          textAlign: 'left',
                          cursor: 'pointer',
                          transition: 'all 0.2s',
                          boxShadow: density === d.id ? 'var(--shadow-premium)' : 'none'
                      }}
                  >
                      <div style={{ fontWeight: 800, fontSize: '1.1rem', color: density === d.id ? 'var(--text-primary)' : 'var(--text-secondary)', marginBottom: '0.25rem' }}>{d.label}</div>
                      <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{d.sub}</div>
                  </button>
              ))}
          </div>
        </div>

        <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center', padding: '1.5rem 2rem', background: 'var(--bg-secondary)', borderRadius: '24px', border: '1px solid var(--border-color)' }}>
            <div style={{ color: 'var(--accent-purple)' }}><TrendingUp size={24} /></div>
            <div style={{ fontSize: '0.9rem', color: 'var(--text-muted)', lineHeight: 1.5, fontWeight: 500 }}>
                Synthesizing trending data points & semantic clusters for maximum algorithmic discoverability.
            </div>
        </div>
      </div>
    </AiToolTemplate>
  )
}
