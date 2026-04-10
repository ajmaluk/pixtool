import { useState } from 'react'
import AiToolTemplate from '../components/AiToolTemplate'
import { BookOpen, Sparkles, Feather, Scroll } from 'lucide-react'

export default function AiStory() {
  const [premise, setPremise] = useState('')
  const [genre, setGenre] = useState('sci-fi')
  const [arc, setArc] = useState('standard')

  const genres = [
    { id: 'sci-fi', name: 'Sci-Fi', icon: Sparkles },
    { id: 'fantasy', name: 'Fantasy', icon: Feather },
    { id: 'noir', name: 'Noir', icon: Scroll }
  ]

  const arcs = [
    { id: 'standard', label: 'Linear', sub: 'Classic narrative' },
    { id: 'experimental', label: 'Fragmented', sub: 'Non-linear flow' },
    { id: 'minimalist', label: 'Flash', sub: 'High impact brev' }
  ]

  const customPromptBuilder = (text) => {
    return `You are a Bestselling Literary Architect. 
Forge a compelling narrative based on the premise: "${premise}".

NARRATIVE ARCHITECTURE:
- Genre: ${genre}
- Structural Arc: ${arc}
- Imagery/Style: ${text}

OUTPUT REQUIREMENTS:
- Provide a evocative Title.
- Deliver a high-texture opening scene.
- Outline 3 strategic Plot Pivots.
- Maintain a highly sophisticated, cinematic vocabulary.`
  }

  return (
    <AiToolTemplate 
      title="Narrative Forge"
      description="Architect cinematic story arcs and sophisticated fictional landscapes."
      icon={BookOpen}
      path="/ai-tools/story-generator"
      buttonText="Forge Narrative"
      customPromptBuilder={customPromptBuilder}
      seoKeywords="ai story writer, creative writing tool, fiction generator, story plot builder"
      sidebarSettings={
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          <div className="sidebar-section">
            <div className="sidebar-section-title">Narrative Catalyst</div>
            <div className="input-group">
              <label className="input-label">Plot Twist Density</label>
              <div style={{ display: 'flex', gap: '0.5rem', background: 'var(--bg-secondary)', padding: '0.4rem', borderRadius: '12px' }}>
                  {['low', 'medium', 'high'].map(d => (
                      <button 
                          key={d}
                          onClick={() => setDensity(d)}
                          className={`btn ${density === d ? 'btn-primary' : 'btn-secondary'}`}
                          style={{ flex: 1, padding: '0.6rem', fontSize: '0.75rem', borderRadius: '8px' }}
                      >
                          {d.charAt(0).toUpperCase() + d.slice(1)}
                      </button>
                  ))}
              </div>
            </div>
          </div>

          <div className="sidebar-section">
            <div className="sidebar-section-title">Atmosphere</div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
              {genres.map(g => (
                <button
                  key={g.id}
                  onClick={() => setGenre(g.id)}
                  className={`btn ${genre === g.id ? 'btn-primary' : 'btn-secondary'}`}
                  style={{ 
                    padding: '1rem 0.5rem', 
                    fontSize: '0.8rem',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '0.5rem',
                    height: 'auto'
                  }}
                >
                  <g.icon size={18} strokeWidth={1.5} />
                  <span style={{ fontWeight: 800 }}>{g.name}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      }
    >
      <div className="story-workspace" style={{ marginBottom: '1.5rem' }}>
        <div style={{ marginBottom: '3rem' }}>
          <label htmlFor="ai-story-premise" style={{ display: 'block', fontSize: '0.75rem', fontWeight: 900, color: '#a1a1aa', marginBottom: '1.25rem', textTransform: 'uppercase', letterSpacing: '0.2em' }}>
            Core Narrative Premise
          </label>
          <textarea 
            id="ai-story-premise"
            name="premise"
            className="dalam-textarea"
            style={{ width: '100%', minHeight: '220px', padding: '2rem', fontSize: '1.2rem', background: '#fdfdfd', borderRadius: '32px', border: '1px solid #f4f4f5', outline: 'none', color: '#1a1a1a', lineHeight: 1.6 }}
            placeholder="e.g., A civilization living on the rings of a gas giant discovering a signal from a dead planet..."
            value={premise}
            onChange={(e) => setPremise(e.target.value)}
          />
        </div>
      </div>
    </AiToolTemplate>
  )
}
