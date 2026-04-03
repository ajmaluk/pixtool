import { useState } from 'react'
import AiToolTemplate from '../components/AiToolTemplate'
import { Hash, Instagram, Twitter, Tv, Search, Users } from 'lucide-react'

export default function AiCaption() {
  const [topic, setTopic] = useState('')
  const [platform, setPlatform] = useState('instagram')
  const [tone, setTone] = useState('creative')

  const platforms = [
    { id: 'instagram', name: 'Instagram', icon: Instagram },
    { id: 'tiktok', name: 'TikTok', icon: Tv },
    { id: 'twitter', name: 'X/Twitter', icon: Twitter }
  ]

  const tones = [
    { id: 'witty', label: 'Witty', sub: 'Playful & sharp' },
    { id: 'creative', label: 'Creative', sub: 'Artistic & deep' },
    { id: 'minimalist', label: 'Minimal', sub: 'Short & clean' }
  ]

  const customPromptBuilder = (text) => {
    return `You are a Social Media Maven and Viral Alchemist. 
Generate an engaging, platform-perfect caption for: "${topic}".

SOCIAL DYNAMICS:
- Platform: ${platform}
- Linguistic Tone: ${tone}
- Visual Context: ${text}

OUTPUT REQUIREMENTS:
- Provide 3 distinct variations optimized for high engagement (Average, Hook-heavy, Minimal).
- Include 5 highly relevant hashtags.
- Use emojis that align with the ${tone} aura.`
  }

  return (
    <AiToolTemplate 
      title="Social Pulse"
      description="Architect viral-ready captions engineered for modern social ecosystems."
      icon={Hash}
      path="/ai-tools/caption-generator"
      buttonText="Generate Social Pulse"
      customPromptBuilder={customPromptBuilder}
      seoKeywords="ai caption generator, instagram captions ai, tiktok caption ideas, social media viral tool"
    >
      <div className="social-workspace" style={{ marginBottom: '1.5rem' }}>
        {/* Visual Topic */}
        <div style={{ marginBottom: '3rem' }}>
          <label htmlFor="ai-caption-topic" style={{ display: 'block', fontSize: '0.75rem', fontWeight: 900, color: '#a1a1aa', marginBottom: '1.25rem', textTransform: 'uppercase', letterSpacing: '0.2em' }}>
            Visual Narrative or Topic
          </label>
          <input 
            id="ai-caption-topic"
            name="topic"
            type="text"
            className="dalam-input-field"
            style={{ width: '100%', padding: '1.5rem 2rem', borderRadius: '24px', fontSize: '1.2rem', backgroundColor: '#fdfdfd', border: '1px solid #f4f4f5', outline: 'none', color: '#1a1a1a' }}
            placeholder="e.g., A panoramic view of the Alps at sunset"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
          />
        </div>

        {/* Platform & Aura Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2.5rem', marginBottom: '1.5rem' }}>
          <div className="platform-grid">
            <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 900, color: '#a1a1aa', marginBottom: '1.25rem', textTransform: 'uppercase', letterSpacing: '0.2em' }}>
              Target Ecosystem
            </label>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '0.75rem' }}>
                {platforms.map(p => (
                    <button
                        key={p.id}
                        onClick={() => setPlatform(p.id)}
                        style={{ 
                            padding: '1.25rem', 
                            borderRadius: '20px', 
                            border: '2px solid', 
                            borderColor: platform === p.id ? '#8b5cf6' : '#f4f4f5',
                            background: platform === p.id ? '#fff' : '#fafafa',
                            cursor: 'pointer',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            gap: '0.5rem',
                            transition: 'all 0.2s'
                        }}
                    >
                        <p.icon size={22} color={platform === p.id ? '#8b5cf6' : '#d4d4d8'} strokeWidth={1.5} />
                        <span style={{ fontSize: '0.8rem', fontWeight: 800, color: platform === p.id ? '#09090b' : '#a1a1aa' }}>{p.name}</span>
                    </button>
                ))}
            </div>
          </div>

          <div className="aura-grid">
            <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 900, color: '#a1a1aa', marginBottom: '1.25rem', textTransform: 'uppercase', letterSpacing: '0.2em' }}>
              Linguistic Aura
            </label>
            <div style={{ display: 'flex', background: '#f4f4f5', padding: '0.5rem', borderRadius: '24px' }}>
                {tones.map(t => (
                    <button
                        key={t.id}
                        onClick={() => setTone(t.id)}
                        style={{ 
                            flex: 1, 
                            padding: '1rem', 
                            borderRadius: '18px', 
                            border: 'none', 
                            background: tone === t.id ? '#fff' : 'transparent',
                            color: tone === t.id ? '#09090b' : '#71717a',
                            fontWeight: 800,
                            fontSize: '0.9rem',
                            cursor: 'pointer',
                            transition: 'all 0.2s',
                            boxShadow: tone === t.id ? '0 5px 15px rgba(0,0,0,0.03)' : 'none'
                        }}
                    >
                        {t.label}
                        <span style={{ display: 'block', fontSize: '0.65rem', opacity: 0.6, fontWeight: 500 }}>{t.sub}</span>
                    </button>
                ))}
            </div>
          </div>
        </div>
      </div>
    </AiToolTemplate>
  )
}
