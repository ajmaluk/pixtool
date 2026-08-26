import { useState } from 'react'
import AiToolTemplate from '../components/AiToolTemplate'
import { AtSign, Briefcase, Zap, Heart, Clock } from 'lucide-react'

export default function AiEmailWriter() {
  const [recipient, setRecipient] = useState('')
  const [subject, setSubject] = useState('')
  const [tone, setTone] = useState('professional')

  const tones = [
    { id: 'professional', name: 'Professional', icon: Briefcase, desc: 'Corporate, authoritative & respectful' },
    { id: 'persuasive', name: 'Persuasive', icon: Zap, desc: 'High-converting sales or proposal pitch' },
    { id: 'friendly', name: 'Friendly', icon: Heart, desc: 'Warm, collaborative, and approachable' },
    { id: 'urgent', name: 'Urgent', icon: Clock, desc: 'Direct, action-driven deadline reminder' }
  ]

  const customPromptBuilder = (text) => {
    const selectedTone = tones.find(t => t.id === tone)
    const normalizedRecipient = recipient.trim() || 'the intended recipient'
    const normalizedSubject = subject.trim() || 'General Business Inquiry'
    const normalizedContext = text.trim() || 'No additional bullet points provided.'

    return `You are an Executive Communications Specialist and Professional Copywriter.
Draft a pristine, high-impact business email based on the following specifications:

EMAIL SPECIFICATIONS:
- Intended Recipient: ${normalizedRecipient}
- Core Subject/Objective: ${normalizedSubject}
- Tone / Persona: ${selectedTone?.name || tone} (${selectedTone?.desc || ''})
- Key Talking Points & Context: ${normalizedContext}

OUTPUT REQUIREMENTS:
- Provide 2 compelling Subject Line options.
- Provide the Full Email Draft (Salutation, Introduction, Value/Action Body, frictionless Call to Action, and Professional Sign-off).
- Keep formatting scannable with concise paragraphs and bullet points where appropriate.
- Maintain impeccable grammar, tone consistency, and professional etiquette.`
  }

  return (
    <AiToolTemplate 
      title="Professional Correspondence"
      description="Architect high-authority business communications with precision-tuned linguistic personas."
      icon={AtSign}
      path="/ai-tools/email-writer"
      buttonText="Draft Correspondence"
      placeholder="Outline your key points, background context, specific meeting requests, or proposal details..."
      customPromptBuilder={customPromptBuilder}
      seoKeywords="ai email writer, professional business email, cold email generator, business communication tools"
    >
      <div className="sidebar-group">
        <label htmlFor="ai-email-recipient" style={{ display: 'block', fontSize: '0.75rem', fontWeight: 800, color: 'var(--text-muted)', marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
          Recipient
        </label>
        <input 
          id="ai-email-recipient"
          name="recipient"
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
          placeholder="e.g. Hiring Manager, Client, Partner"
          value={recipient}
          onChange={(e) => setRecipient(e.target.value)}
        />
      </div>

      <div className="sidebar-group">
        <label htmlFor="ai-email-subject" style={{ display: 'block', fontSize: '0.75rem', fontWeight: 800, color: 'var(--text-muted)', marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
          Subject / Goal
        </label>
        <input 
          id="ai-email-subject"
          name="subject"
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
          placeholder="e.g. Project Proposal & Next Steps"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
        />
      </div>

      <div className="sidebar-group">
        <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 800, color: 'var(--text-muted)', marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
          Linguistic Persona
        </label>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
          {tones.map(t => (
            <button
              key={t.id}
              type="button"
              onClick={() => setTone(t.id)}
              style={{ 
                width: '100%', 
                padding: '0.65rem 0.85rem', 
                borderRadius: '10px', 
                border: '1.5px solid', 
                borderColor: tone === t.id ? 'var(--accent-purple)' : 'var(--border-color)', 
                background: tone === t.id ? 'var(--accent-glow)' : 'var(--bg-secondary)',
                textAlign: 'left',
                cursor: 'pointer',
                transition: 'all 0.2s',
                display: 'flex',
                alignItems: 'center',
                gap: '0.65rem'
              }}
            >
              <t.icon size={16} color={tone === t.id ? 'var(--accent-purple)' : 'var(--text-muted)'} strokeWidth={1.5} />
              <div style={{ display: 'flex', flexDirection: 'column', minWidth: 0 }}>
                <span style={{ fontWeight: 800, fontSize: '0.82rem', color: tone === t.id ? 'var(--text-primary)' : 'var(--text-secondary)' }}>{t.name}</span>
                <span style={{ fontSize: '0.68rem', color: 'var(--text-muted)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{t.desc}</span>
              </div>
            </button>
          ))}
        </div>
      </div>
    </AiToolTemplate>
  )
}
