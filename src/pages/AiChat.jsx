import { useState } from 'react'
import AiToolTemplate from '../components/AiToolTemplate'
import { MessageSquare, Sparkles, Terminal, BrainCircuit, Rocket, Shield } from 'lucide-react'

export default function AiChat() {
  const [mode, setMode] = useState('strategic')

  const modes = [
    { id: 'strategic', name: 'Strategic Oracle', icon: BrainCircuit, desc: 'High-level synthesis & reasoning' },
    { id: 'technical', name: 'Technical Architect', icon: Terminal, desc: 'Engineering & systems design' },
    { id: 'creative', name: 'Creative Dynamo', icon: Sparkles, desc: 'Brainstorming & ideation' },
    { id: 'concise', name: 'Executive Brief', icon: Shield, desc: 'Bullet points & actionable conclusions' }
  ]

  const suggestions = [
    "Architect a resilient micro-frontend design pattern",
    "Synthesize the fundamental economic laws of AI compute",
    "Draft a strategic go-to-market plan for a SaaS product",
    "Explain quantum key distribution in simple analogies"
  ]

  const customPromptBuilder = (text) => {
    const selectedMode = modes.find(m => m.id === mode)

    return `You are Deep Mind, a high-authority General Intelligence Oracle and Senior Strategic Consultant.
Your persona mode is: ${selectedMode?.name || mode} (${selectedMode?.desc || ''}).

QUERY:
${text}

RESPONSE GUIDELINES:
- Provide clear, structured, deeply reasoned insights.
- Use bold subheaders, markdown lists, and concise summaries where applicable.
- Avoid superficial filler; deliver dense, actionable value.`
  }

  return (
    <AiToolTemplate 
      title="Deep Mind"
      description="Access non-linear intelligence for complex problem-solving and rapid knowledge synthesis."
      icon={MessageSquare}
      path="/ai-tools/chat"
      buttonText="Activate Intelligence"
      placeholder="Ask any complex question, request strategic frameworks, or brainstorm ideas..."
      customPromptBuilder={customPromptBuilder}
      seoKeywords="ai chat online, free artificial intelligence, custom gpt assistant, smart ai chat"
    >
      <div className="sidebar-group">
        <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 800, color: 'var(--text-muted)', marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
          Intelligence Persona
        </label>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
          {modes.map(m => (
            <button
              key={m.id}
              type="button"
              onClick={() => setMode(m.id)}
              style={{ 
                width: '100%', 
                padding: '0.6rem 0.75rem', 
                borderRadius: '10px', 
                border: '1.5px solid', 
                borderColor: mode === m.id ? 'var(--accent-purple)' : 'var(--border-color)', 
                background: mode === m.id ? 'var(--accent-glow)' : 'var(--bg-secondary)',
                textAlign: 'left',
                cursor: 'pointer',
                transition: 'all 0.2s',
                display: 'flex',
                alignItems: 'center',
                gap: '0.6rem'
              }}
            >
              <m.icon size={16} color={mode === m.id ? 'var(--accent-purple)' : 'var(--text-muted)'} strokeWidth={1.5} />
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <span style={{ fontWeight: 800, fontSize: '0.8rem', color: mode === m.id ? 'var(--text-primary)' : 'var(--text-secondary)' }}>{m.name}</span>
                <span style={{ fontSize: '0.65rem', color: 'var(--text-muted)' }}>{m.desc}</span>
              </div>
            </button>
          ))}
        </div>
      </div>

      <div className="sidebar-group">
        <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 800, color: 'var(--text-muted)', marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
          Prompt Starters
        </label>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
          {suggestions.map((s, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => {
                const textarea = document.getElementById('ai-studio-prompt')
                if (textarea) {
                  textarea.value = s
                  textarea.dispatchEvent(new Event('input', { bubbles: true }))
                  textarea.focus()
                }
              }}
              style={{ 
                padding: '0.5rem 0.65rem', 
                borderRadius: '8px', 
                border: '1px solid var(--border-color)', 
                background: 'var(--bg-secondary)', 
                textAlign: 'left',
                fontSize: '0.72rem',
                color: 'var(--text-secondary)',
                cursor: 'pointer',
                lineHeight: 1.4,
                transition: 'all 0.15s ease'
              }}
            >
              💡 {s}
            </button>
          ))}
        </div>
      </div>
    </AiToolTemplate>
  )
}
