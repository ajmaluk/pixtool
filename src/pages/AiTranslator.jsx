import { useState } from 'react'
import AiToolTemplate from '../components/AiToolTemplate'
import { Globe, ArrowRightLeft, Languages, Volume2 } from 'lucide-react'

export default function AiTranslator() {
  const [inputText, setInputText] = useState('')
  const [sourceLang, setSourceLang] = useState('auto')
  const [targetLang, setTargetLang] = useState('spanish')

  const languages = [
    { id: 'auto', name: 'Auto Detect' },
    { id: 'english', name: 'English' },
    { id: 'spanish', name: 'Spanish' },
    { id: 'french', name: 'French' },
    { id: 'german', name: 'German' },
    { id: 'chinese', name: 'Chinese' },
    { id: 'japanese', name: 'Japanese' },
    { id: 'hindi', name: 'Hindi' },
    { id: 'arabic', name: 'Arabic' },
    { id: 'portuguese', name: 'Portuguese' }
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
Maintain the exact tone, cultural nuances, and context of the source material.
Output ONLY the translated text without any conversational filler or meta-talk.

SOURCE TEXT:
${text}`
  }

  return (
    <AiToolTemplate 
      title="Linguist Intelligence"
      description="Professional-grade neural translation across 100+ languages with cultural awareness."
      icon={Globe}
      path="/ai-tools/translator"
      buttonText="Translate Atmosphere"
      customPromptBuilder={customPromptBuilder}
      seoKeywords="ai translator, context aware translation, professional translator online, neural translation"
    >
      <div className="translator-workspace" style={{ marginBottom: '1rem' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr)', gap: '1.5rem' }}>
          
          {/* Source Area */}
          <div style={{ background: '#fff', borderRadius: '32px', border: '1px solid #f4f4f5', boxShadow: '0 10px 30px rgba(0,0,0,0.02)' }}>
            <div style={{ padding: '1rem 2rem', borderBottom: '1px solid #f4f4f5', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <select 
                value={sourceLang} 
                onChange={(e) => setSourceLang(e.target.value)}
                style={{ background: 'transparent', border: 'none', color: '#8b5cf6', fontWeight: 900, fontSize: '0.75rem', cursor: 'pointer', outline: 'none', textTransform: 'uppercase', letterSpacing: '0.1em' }}
              >
                {languages.map(l => <option key={l.id} value={l.id}>{l.name}</option>)}
              </select>
              <Languages size={18} color="#d4d4d8" strokeWidth={1.5} />
            </div>
            <textarea 
              id="ai-translator-input"
              name="text"
              className="dalam-textarea"
              style={{ width: '100%', minHeight: '220px', background: 'transparent', border: 'none', color: '#18181b', padding: '2rem', fontSize: '1.25rem', resize: 'none', outline: 'none', lineHeight: 1.6 }}
              placeholder="Enter text to translate..."
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
            />
          </div>

          {/* Controls / Divider */}
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', margin: '-1.5rem 0', position: 'relative', zIndex: 10 }}>
            <button 
              onClick={handleSwap}
              disabled={sourceLang === 'auto'}
              style={{ width: '52px', height: '52px', borderRadius: '50%', background: '#09090b', border: '6px solid #fff', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: sourceLang === 'auto' ? 'not-allowed' : 'pointer', transition: 'transform 0.4s cubic-bezier(0.4, 0, 0.2, 1)', boxShadow: '0 10px 25px rgba(0,0,0,0.1)' }}
              className="swap-btn-v2"
            >
              <ArrowRightLeft size={20} />
            </button>
          </div>

          {/* Target Area */}
          <div style={{ background: '#fafafa', borderRadius: '32px', border: '1px solid #f4f4f5', position: 'relative' }}>
             <div style={{ padding: '1rem 2rem', borderBottom: '1px solid #f4f4f5', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <select 
                value={targetLang} 
                onChange={(e) => setTargetLang(e.target.value)}
                style={{ background: 'transparent', border: 'none', color: '#8b5cf6', fontWeight: 900, fontSize: '0.75rem', cursor: 'pointer', outline: 'none', textTransform: 'uppercase', letterSpacing: '0.1em' }}
              >
                {languages.filter(l => l.id !== 'auto').map(l => <option key={l.id} value={l.id}>{l.name}</option>)}
              </select>
              <Volume2 size={18} color="#d4d4d8" strokeWidth={1.5} />
            </div>
            <div 
              style={{ width: '100%', minHeight: '220px', padding: '2rem', fontSize: '1.25rem', color: '#71717a', whiteSpace: 'pre-wrap', position: 'relative', lineHeight: 1.6 }}
            >
              {!inputText && <span>Atmospheric translation will appear below after processing...</span>}
            </div>
          </div>

        </div>
      </div>

      <style>{`
        .swap-btn-v2:hover { transform: rotate(180deg) scale(1.1); }
        .swap-btn-v2:disabled { opacity: 0.3; cursor: not-allowed; }
      `}</style>
    </AiToolTemplate>
  )
}
