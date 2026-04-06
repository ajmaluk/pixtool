import { useState } from 'react'
import AiToolTemplate from '../components/AiToolTemplate'
import { MessageSquare, Sparkles, Lightbulb, Zap, Terminal, BrainCircuit, Mic } from 'lucide-react'

export default function AiChat() {
  const [prompt, setPrompt] = useState('')

  const suggestions = [
    { text: "Architect a scalable React application structure", icon: Terminal },
    { text: "Design a high-converting landing page narrative", icon: Lightbulb },
    { text: "Synthesize the core principles of behavioral economics", icon: BrainCircuit }
  ]

  const customPromptBuilder = (text) => {
    return `You are Deep Mind, a high-authority General Intelligence Oracle. 
Your objective is to provide a comprehensive, multidimensional response to the following query.

RESPONSE ARCHITECTURE:
- Clarity: Exceptional.
- Depth: Exhaustive.
- Persona: Intellectual, helpful, and precise.

QUERY:
${text}`
  }

  return (
    <AiToolTemplate 
      title="Deep Mind"
      description="Access non-linear intelligence for complex problem-solving and rapid knowledge synthesis."
      icon={MessageSquare}
      path="/ai-tools/chat"
      buttonText="Activate Intelligence"
      customPromptBuilder={customPromptBuilder}
      seoKeywords="ai chat online, free artificial intelligence, custom gpt assistant, smart ai chat"
    >
      <div className="chat-workspace" style={{ marginBottom: '1.5rem' }}>
        {/* Intelligence Forge */}
        <div style={{ marginBottom: '3.5rem' }}>
          <label htmlFor="ai-chat-prompt" style={{ display: 'block', fontSize: '0.75rem', fontWeight: 900, color: 'var(--text-muted)', marginBottom: '1.25rem', textTransform: 'uppercase', letterSpacing: '0.2em' }}>
            Thought Input Forge
          </label>
          <div style={{ position: 'relative' }}>
            <textarea 
                id="ai-chat-prompt"
                name="prompt"
                className="dalam-textarea"
                style={{ width: '100%', minHeight: '300px', padding: '2.5rem', fontSize: '1.25rem', background: 'var(--bg-card)', borderRadius: '32px', border: '1px solid var(--border-color)', outline: 'none', color: 'var(--text-primary)', lineHeight: 1.7, transition: 'all 0.3s ease' }}
                placeholder="Submit your query to the Deep Mind core..."
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
            />
            <div style={{ position: 'absolute', bottom: '2rem', right: '2rem', color: 'var(--text-muted)' }}>
                <Mic size={24} strokeWidth={1.5} style={{ cursor: 'pointer' }} />
            </div>
          </div>
        </div>

        {/* Suggestion Clusters */}
        <div style={{ marginBottom: '1.5rem' }}>
          <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 900, color: 'var(--text-muted)', marginBottom: '1.5rem', textTransform: 'uppercase', letterSpacing: '0.2em' }}>
            Heuristic Starters
          </label>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.25rem' }}>
            {suggestions.map((s, idx) => (
              <button
                key={idx}
                onClick={() => setPrompt(s.text)}
                style={{ 
                  padding: '1.75rem', 
                  borderRadius: '28px', 
                  border: '1px solid var(--border-color)', 
                  background: 'var(--bg-secondary)',
                  textAlign: 'left',
                  cursor: 'pointer',
                  transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
                  display: 'flex',
                  gap: '1.25rem',
                  alignItems: 'flex-start'
                }}
                onMouseEnter={(e) => {
                    e.currentTarget.style.background = 'var(--bg-card)';
                    e.currentTarget.style.borderColor = 'var(--accent-primary)';
                    e.currentTarget.style.boxShadow = 'var(--shadow-premium)';
                }}
                onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'var(--bg-secondary)';
                    e.currentTarget.style.borderColor = 'var(--border-color)';
                    e.currentTarget.style.boxShadow = 'none';
                }}
              >
                <div style={{ color: 'var(--accent-primary)', marginTop: '0.2rem' }}>
                  <s.icon size={22} strokeWidth={1.5} />
                </div>
                <div style={{ fontWeight: 700, fontSize: '0.95rem', color: 'var(--text-primary)', lineHeight: 1.5 }}>{s.text}</div>
              </button>
            ))}
          </div>
        </div>

        <div style={{ marginTop: '3.5rem', padding: '2rem', background: 'var(--bg-glass)', borderRadius: '32px', border: '1px solid var(--border-color)', display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
            <div style={{ color: 'var(--accent-primary)' }}><Zap size={28} strokeWidth={1.5} /></div>
            <div style={{ fontSize: '1rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                Deep Mind leverages multi-model synthesis to deliver high-authority intelligence for every interaction.
            </div>
        </div>
      </div>
    </AiToolTemplate>
  )
}
