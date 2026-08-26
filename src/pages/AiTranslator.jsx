import { useState } from 'react'
import AiToolTemplate from '../components/AiToolTemplate'
import { Globe, ArrowRightLeft } from 'lucide-react'

export default function AiTranslator() {
  const [sourceLang, setSourceLang] = useState('auto')
  const [targetLang, setTargetLang] = useState('spanish')

  const languages = [
    { id: 'auto', name: 'Auto Detect' },
    { id: 'english', name: 'English' },
    { id: 'spanish', name: 'Spanish' },
    { id: 'french', name: 'French' },
    { id: 'german', name: 'German' },
    { id: 'chinese', name: 'Chinese (Mandarin)' },
    { id: 'japanese', name: 'Japanese' },
    { id: 'hindi', name: 'Hindi' },
    { id: 'arabic', name: 'Arabic' },
    { id: 'portuguese', name: 'Portuguese' },
    { id: 'russian', name: 'Russian' },
    { id: 'italian', name: 'Italian' },
    { id: 'korean', name: 'Korean' }
  ]

  const handleSwap = () => {
    if (sourceLang === 'auto') return;
    const tempLang = sourceLang;
    setSourceLang(targetLang);
    setTargetLang(tempLang);
  }

  const customPromptBuilder = (text) => {
    return `You are a world-class polyglot and professional translator. 
Translate the following text FROM ${sourceLang === 'auto' ? 'its original language' : sourceLang} TO ${targetLang}.
Maintain the exact tone, cultural nuances, idioms, and context of the source material.
Output ONLY the translated text without any conversational filler or meta-talk.

SOURCE TEXT:
${text}`
  }

  return (
    <AiToolTemplate
      title="Linguist Intelligence"
      description="Professional-grade neural translation across 100+ languages with cultural nuance preservation."
      icon={Globe}
      path="/ai-tools/translator"
      buttonText="Translate Prose"
      placeholder="Paste the text or manuscript you want to translate..."
      customPromptBuilder={customPromptBuilder}
      seoKeywords="ai translator, context aware translation, professional translator online, neural translation"
    >
      <div className="sidebar-group">
        <label htmlFor="ai-source-lang" style={{ display: 'block', fontSize: '0.75rem', fontWeight: 800, color: 'var(--text-muted)', marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
          Source Language
        </label>
        <select
          id="ai-source-lang"
          value={sourceLang}
          onChange={(e) => setSourceLang(e.target.value)}
          style={{ 
            width: '100%', 
            padding: '0.75rem 1rem', 
            borderRadius: '12px', 
            fontSize: '0.9rem', 
            backgroundColor: 'var(--bg-secondary)', 
            border: '1px solid var(--border-color)', 
            outline: 'none', 
            color: 'var(--text-primary)',
            boxSizing: 'border-box',
            cursor: 'pointer',
            fontWeight: 700
          }}
        >
          {languages.map(l => <option key={l.id} value={l.id}>{l.name}</option>)}
        </select>
      </div>

      <div style={{ display: 'flex', justifyContent: 'center', margin: '0.25rem 0' }}>
        <button
          type="button"
          onClick={handleSwap}
          disabled={sourceLang === 'auto'}
          title={sourceLang === 'auto' ? "Auto-detect cannot be swapped" : "Swap languages"}
          style={{ 
            width: '38px', 
            height: '38px', 
            borderRadius: '50%', 
            padding: 0, 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center',
            background: 'var(--bg-secondary)',
            border: '1px solid var(--border-color)',
            color: 'var(--accent-purple)',
            cursor: sourceLang === 'auto' ? 'not-allowed' : 'pointer',
            opacity: sourceLang === 'auto' ? 0.5 : 1,
            transition: 'all 0.2s'
          }}
        >
          <ArrowRightLeft size={16} />
        </button>
      </div>

      <div className="sidebar-group">
        <label htmlFor="ai-target-lang" style={{ display: 'block', fontSize: '0.75rem', fontWeight: 800, color: 'var(--text-muted)', marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
          Target Language
        </label>
        <select
          id="ai-target-lang"
          value={targetLang}
          onChange={(e) => setTargetLang(e.target.value)}
          style={{ 
            width: '100%', 
            padding: '0.75rem 1rem', 
            borderRadius: '12px', 
            fontSize: '0.9rem', 
            backgroundColor: 'var(--bg-secondary)', 
            border: '1px solid var(--border-color)', 
            outline: 'none', 
            color: 'var(--text-primary)',
            boxSizing: 'border-box',
            cursor: 'pointer',
            fontWeight: 700
          }}
        >
          {languages.filter(l => l.id !== 'auto').map(l => <option key={l.id} value={l.id}>{l.name}</option>)}
        </select>
      </div>
    </AiToolTemplate>
  )
}
