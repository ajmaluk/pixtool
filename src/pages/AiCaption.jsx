import { useState } from 'react'
import AiToolTemplate from '../components/AiToolTemplate'
import { Hash, Instagram, Linkedin, Twitter, Sparkles, Heart, Zap, Smile } from 'lucide-react'

export default function AiCaption() {
  const [topic, setTopic] = useState('')
  const [platform, setPlatform] = useState('instagram')
  const [tone, setTone] = useState('engaging')

  const platforms = [
    { id: 'instagram', name: 'Instagram', icon: Instagram },
    { id: 'linkedin', name: 'LinkedIn', icon: Linkedin },
    { id: 'twitter', name: 'X / Twitter', icon: Twitter }
  ]

  const tones = [
    { id: 'engaging', label: 'Engaging', sub: 'Interactive hook & question', icon: Zap },
    { id: 'aesthetic', label: 'Aesthetic', sub: 'Poetic, minimal & chill', icon: Sparkles },
    { id: 'humorous', label: 'Humorous', sub: 'Witty, punchy & relatable', icon: Smile },
    { id: 'professional', label: 'Thought Leader', sub: 'Insightful & authoritative', icon: Heart }
  ]

  const customPromptBuilder = (text) => {
    const selectedPlatform = platforms.find((p) => p.id === platform)
    const selectedTone = tones.find((t) => t.id === tone)
    const normalizedTopic = topic.trim() || 'the image or video topic'
    const normalizedContext = text.trim() || 'No extra constraints provided.'

    return `You are a Viral Social Media Growth Expert and Creative Copywriter.
Generate an engaging, viral-optimized caption set for: "${normalizedTopic}" on ${selectedPlatform?.name || platform}.

CAMPAIGN PARAMETERS:
- Platform: ${selectedPlatform?.name || platform}
- Tone / Aura: ${selectedTone?.label || tone} (${selectedTone?.sub || ''})
- Scene & Visual Context: ${normalizedContext}

OUTPUT REQUIREMENTS:
- Provide 3 distinct caption variations (1. Short & Punchy, 2. Storytelling / Value Hook, 3. Community Engagement / Conversation Starter).
- For each variation, include:
  - The Headline / Hook
  - The Main Body Caption
  - Call to Action (CTA)
  - 10-15 targeted hashtags categorized by reach.
- Use natural emojis matching the ${selectedPlatform?.name || platform} vibe.`
  }

  return (
    <AiToolTemplate 
      title="Caption Pulse"
      description="Architect viral-ready captions engineered for modern social ecosystems."
      icon={Hash}
      path="/ai-tools/caption-generator"
      buttonText="Generate Social Captions"
      placeholder="Describe the photo/video scene, specific vibes, background story, or mood..."
      customPromptBuilder={customPromptBuilder}
      seoKeywords="ai caption generator, instagram captions ai, tiktok caption ideas, social media viral tool"
    >
      <div className="sidebar-group">
        <label htmlFor="ai-caption-topic" style={{ display: 'block', fontSize: '0.75rem', fontWeight: 800, color: 'var(--text-muted)', marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
          Visual Topic
        </label>
        <input 
          id="ai-caption-topic"
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
          placeholder="e.g. Sunset in Swiss Alps"
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
        />
      </div>

      <div className="sidebar-group">
        <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 800, color: 'var(--text-muted)', marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
          Platform
        </label>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.4rem' }}>
          {platforms.map(p => (
            <button
              key={p.id}
              type="button"
              onClick={() => setPlatform(p.id)}
              style={{ 
                padding: '0.65rem 0.35rem', 
                borderRadius: '10px', 
                border: '1.5px solid', 
                borderColor: platform === p.id ? 'var(--accent-purple)' : 'var(--border-color)',
                background: platform === p.id ? 'var(--accent-glow)' : 'var(--bg-secondary)',
                cursor: 'pointer',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '0.3rem',
                transition: 'all 0.2s'
              }}
            >
              <p.icon size={16} color={platform === p.id ? 'var(--accent-purple)' : 'var(--text-muted)'} strokeWidth={1.5} />
              <span style={{ fontSize: '0.72rem', fontWeight: 800, color: platform === p.id ? 'var(--text-primary)' : 'var(--text-secondary)' }}>{p.name}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="sidebar-group">
        <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 800, color: 'var(--text-muted)', marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
          Linguistic Aura
        </label>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem', background: 'var(--bg-secondary)', padding: '0.35rem', borderRadius: '10px' }}>
          {tones.map(t => (
            <button
              key={t.id}
              type="button"
              onClick={() => setTone(t.id)}
              style={{ 
                width: '100%', 
                padding: '0.5rem 0.75rem', 
                borderRadius: '8px', 
                border: 'none', 
                background: tone === t.id ? 'var(--bg-card)' : 'transparent',
                color: tone === t.id ? 'var(--text-primary)' : 'var(--text-muted)',
                fontWeight: 700,
                fontSize: '0.78rem',
                cursor: 'pointer',
                transition: 'all 0.2s',
                boxShadow: tone === t.id ? 'var(--shadow-sm)' : 'none',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}
            >
              <span>{t.label}</span>
              <span style={{ fontSize: '0.65rem', opacity: 0.6 }}>{t.sub}</span>
            </button>
          ))}
        </div>
      </div>
    </AiToolTemplate>
  )
}
