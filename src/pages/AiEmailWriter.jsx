import { useState } from 'react'
import AiToolTemplate from '../components/AiToolTemplate'
import { AtSign, User, ShieldCheck, Clock, Send, Mail } from 'lucide-react'

export default function AiEmailWriter() {
  const [recipient, setRecipient] = useState('')
  const [subject, setSubject] = useState('')
  const [tone, setTone] = useState('executive')

  const tones = [
    { id: 'executive', name: 'Executive', icon: ShieldCheck, desc: 'High-authority & direct' },
    { id: 'collaborative', name: 'Collaborative', icon: User, desc: 'Warm & partnership-focused' },
    { id: 'urgent', name: 'Urgent', icon: Clock, desc: 'Time-sensitive & impactful' }
  ]

  const customPromptBuilder = (text) => {
    return `You are a world-class Business Communications Consultant. 
Draft a professional email to ${recipient} regarding "${subject}".

STRATEGIC PARAMETERS:
- Tone: ${tone}
- Recipient Profile: ${recipient}
- Core Objective: ${subject}
- Context/Key Points: ${text}

OUTPUT REQUIREMENTS:
- Provide a compelling Subject Line.
- Use an appropriate professional greeting and sign-off.
- Ensure the body is concise, polished, and psychologically optimized for the ${tone} tone.`
  }

  return (
    <AiToolTemplate 
      title="Professional Correspondence"
      description="Architect high-authority business communications with precision-tuned linguistic personas."
      icon={AtSign}
      path="/ai-tools/email-writer"
      buttonText="Draft Correspondence"
      customPromptBuilder={customPromptBuilder}
      seoKeywords="ai email writer, professional business email, cold email generator, business communication tools"
    >
      <div className="email-workspace" style={{ marginBottom: '1.5rem' }}>
        {/* Identity Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2.5rem', marginBottom: '3rem' }}>
          <div className="input-group">
            <label htmlFor="ai-email-recipient" style={{ display: 'block', fontSize: '0.75rem', fontWeight: 900, color: '#a1a1aa', marginBottom: '1.25rem', textTransform: 'uppercase', letterSpacing: '0.2em' }}>
              Strategic Recipient
            </label>
            <input 
              id="ai-email-recipient"
              name="recipient"
              type="text"
              className="dalam-input-field"
              style={{ width: '100%', padding: '1.5rem 2rem', borderRadius: '24px', fontSize: '1.2rem', backgroundColor: '#fdfdfd', border: '1px solid #f4f4f5', outline: 'none', color: '#1a1a1a' }}
              placeholder="e.g., Hiring Manager, CEO, Potential Partner"
              value={recipient}
              onChange={(e) => setRecipient(e.target.value)}
            />
          </div>

          <div className="input-group">
            <label htmlFor="ai-email-subject" style={{ display: 'block', fontSize: '0.75rem', fontWeight: 900, color: '#a1a1aa', marginBottom: '1.25rem', textTransform: 'uppercase', letterSpacing: '0.2em' }}>
              Primary Narrative
            </label>
            <input 
              id="ai-email-subject"
              name="subject"
              type="text"
              className="dalam-input-field"
              style={{ width: '100%', padding: '1.5rem 2rem', borderRadius: '24px', fontSize: '1.2rem', backgroundColor: '#fdfdfd', border: '1px solid #f4f4f5', outline: 'none', color: '#1a1a1a' }}
              placeholder="e.g., Collaboration Proposal, Follow-up after meeting"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
            />
          </div>
        </div>

        {/* Persona Selector */}
        <div style={{ marginBottom: '1.5rem' }}>
          <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 900, color: '#a1a1aa', marginBottom: '1.5rem', textTransform: 'uppercase', letterSpacing: '0.2em' }}>
            Linguistic Persona
          </label>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem' }}>
            {tones.map(t => (
              <button
                key={t.id}
                onClick={() => setTone(t.id)}
                style={{ 
                  padding: '1.75rem', 
                  borderRadius: '32px', 
                  border: '2px solid', 
                  borderColor: tone === t.id ? '#8b5cf6' : '#f4f4f5', 
                  background: tone === t.id ? '#fff' : '#fafafa',
                  textAlign: 'left',
                  cursor: 'pointer',
                  transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
                  boxShadow: tone === t.id ? '0 10px 25px rgba(139, 92, 246, 0.05)' : 'none'
                }}
              >
                <div style={{ color: tone === t.id ? '#8b5cf6' : '#d4d4d8', marginBottom: '1rem' }}>
                  <t.icon size={28} strokeWidth={1.5} />
                </div>
                <div style={{ fontWeight: 800, fontSize: '1.1rem', color: tone === t.id ? '#09090b' : '#3f3f46', marginBottom: '0.25rem' }}>{t.name}</div>
                <div style={{ fontSize: '0.8rem', color: '#a1a1aa', lineHeight: 1.4 }}>{t.desc}</div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </AiToolTemplate>
  )
}
