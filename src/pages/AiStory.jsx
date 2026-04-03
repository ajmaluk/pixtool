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
    >
      <div className="story-workspace" style={{ marginBottom: '1.5rem' }}>
        {/* Premise Forge */}
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

        {/* Genre & Arc Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2.5rem', marginBottom: '1.5rem' }}>
          <div className="genre-grid">
            <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 900, color: '#a1a1aa', marginBottom: '1.25rem', textTransform: 'uppercase', letterSpacing: '0.2em' }}>
              Genre Archetype
            </label>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '0.75rem' }}>
                {genres.map(g => (
                    <button
                        key={g.id}
                        onClick={() => setGenre(g.id)}
                        style={{ 
                            padding: '1.25rem', 
                            borderRadius: '20px', 
                            border: '2px solid', 
                            borderColor: genre === g.id ? '#8b5cf6' : '#f4f4f5',
                            background: genre === g.id ? '#fff' : '#fafafa',
                            cursor: 'pointer',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            gap: '0.5rem',
                            transition: 'all 0.2s'
                        }}
                    >
                        <g.icon size={22} color={genre === g.id ? '#8b5cf6' : '#d4d4d8'} strokeWidth={1.5} />
                        <span style={{ fontSize: '0.8rem', fontWeight: 800, color: genre === g.id ? '#09090b' : '#a1a1aa' }}>{g.name}</span>
                    </button>
                ))}
            </div>
          </div>

          <div className="arc-grid">
            <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 900, color: '#a1a1aa', marginBottom: '1.25rem', textTransform: 'uppercase', letterSpacing: '0.2em' }}>
              Structural Arc
            </label>
            <div style={{ display: 'flex', background: '#f4f4f5', padding: '0.5rem', borderRadius: '24px' }}>
                {arcs.map(a => (
                    <button
                        key={a.id}
                        onClick={() => setArc(a.id)}
                        style={{ 
                            flex: 1, 
                            padding: '1rem', 
                            borderRadius: '18px', 
                            border: 'none', 
                            background: arc === a.id ? '#fff' : 'transparent',
                            color: arc === a.id ? '#09090b' : '#71717a',
                            fontWeight: 800,
                            fontSize: '0.9rem',
                            cursor: 'pointer',
                            transition: 'all 0.2s',
                            boxShadow: arc === a.id ? '0 5px 15px rgba(0,0,0,0.03)' : 'none'
                        }}
                    >
                        {a.label}
                        <span style={{ display: 'block', fontSize: '0.65rem', opacity: 0.6, fontWeight: 500 }}>{a.sub}</span>
                    </button>
                ))}
            </div>
          </div>
        </div>
      </div>
    </AiToolTemplate>
  )
}
