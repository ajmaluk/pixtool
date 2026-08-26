import { useState } from 'react'
import AiToolTemplate from '../components/AiToolTemplate'
import { BookOpen, Sparkles, Compass, Flame, Skull, Ghost, Rocket } from 'lucide-react'

export default function AiStory() {
  const [genre, setGenre] = useState('scifi')
  const [density, setDensity] = useState('medium')

  const genres = [
    { id: 'scifi', name: 'Sci-Fi', icon: Rocket },
    { id: 'cyberpunk', name: 'Cyberpunk', icon: Sparkles },
    { id: 'fantasy', name: 'Fantasy', icon: Compass },
    { id: 'thriller', name: 'Thriller', icon: Flame },
    { id: 'noir', name: 'Noir Mystery', icon: Ghost },
    { id: 'dystopian', name: 'Dystopian', icon: Skull }
  ]

  const densities = [
    { id: 'low', label: 'Fast & Linear', sub: 'Action-focused pace' },
    { id: 'medium', label: 'Standard Arc', sub: 'Balanced twists & lore' },
    { id: 'high', label: 'Intricate Twists', sub: 'Psychological complexity' }
  ]

  const customPromptBuilder = (text) => {
    const selectedGenre = genres.find(g => g.id === genre)
    const normalizedPremise = text.trim() || 'A lone wanderer discovers an ancient artifact beneath the sands.'

    return `You are an Award-Winning Novelist and Cinematic Screenwriter.
Architect a gripping, immersive story based on the following narrative catalyst:

NARRATIVE SPECIFICATIONS:
- Primary Genre: ${selectedGenre?.name || genre}
- Plot Twist Complexity: ${density}
- Premise & Characters: ${normalizedPremise}

OUTPUT REQUIREMENTS:
1. Title: Catchy, evocative story title.
2. Scene Setup & Atmosphere: Vivid, sensory-rich world-building.
3. Narrative Arc: Divided into Act I (The Catalyst), Act II (The Confrontation/Twist), and Act III (The Climax & Aftermath).
4. Cinematic Prose: Rich dialogue, natural pacing, and memorable closing imagery.`
  }

  return (
    <AiToolTemplate
      title="Narrative Forge"
      description="Architect cinematic story arcs and sophisticated fictional landscapes."
      icon={BookOpen}
      path="/ai-tools/story-generator"
      buttonText="Forge Narrative Arc"
      placeholder="Type your story premise, character concepts, setting, or opening dialogue prompt..."
      customPromptBuilder={customPromptBuilder}
      seoKeywords="ai story writer, creative writing tool, fiction generator, story plot builder"
    >
      <div className="sidebar-group">
        <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 800, color: 'var(--text-muted)', marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
          Atmosphere & Genre
        </label>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '0.4rem' }}>
          {genres.map(g => (
            <button
              key={g.id}
              type="button"
              onClick={() => setGenre(g.id)}
              style={{
                padding: '0.65rem 0.5rem',
                fontSize: '0.78rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.45rem',
                borderRadius: '10px',
                border: '1.5px solid',
                borderColor: genre === g.id ? 'var(--accent-purple)' : 'var(--border-color)',
                background: genre === g.id ? 'var(--accent-glow)' : 'var(--bg-secondary)',
                cursor: 'pointer',
                color: genre === g.id ? 'var(--text-primary)' : 'var(--text-secondary)',
                fontWeight: 700,
                transition: 'all 0.2s'
              }}
            >
              <g.icon size={15} color={genre === g.id ? 'var(--accent-purple)' : 'var(--text-muted)'} strokeWidth={1.5} />
              <span>{g.name}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="sidebar-group">
        <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 800, color: 'var(--text-muted)', marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
          Plot Twist Complexity
        </label>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem', background: 'var(--bg-secondary)', padding: '0.35rem', borderRadius: '10px' }}>
          {densities.map(d => (
            <button
              key={d.id}
              type="button"
              onClick={() => setDensity(d.id)}
              style={{
                width: '100%',
                padding: '0.5rem 0.75rem',
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
