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
      <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
        {/* Source Language */}
        <div className="sidebar-section">
          <div className="sidebar-section-title">Source Language</div>
          <div className="input-group">
            <select 
              className="input"
              value={sourceLang} 
              onChange={(e) => setSourceLang(e.target.value)}
              style={{ fontWeight: 800, cursor: 'pointer' }}
            >
              {languages.map(l => <option key={l.id} value={l.id}>{l.name}</option>)}
            </select>
          </div>
        </div>

        {/* Swap Control */}
        <div style={{ display: 'flex', justifyContent: 'center', margin: '-1rem 0' }}>
          <button 
            onClick={handleSwap}
            disabled={sourceLang === 'auto'}
            className="btn btn-secondary"
            style={{ width: '48px', height: '48px', borderRadius: '50%', padding: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
          >
            <ArrowRightLeft size={18} />
          </button>
        </div>

        {/* Target Language */}
        <div className="sidebar-section">
          <div className="sidebar-section-title">Target Language</div>
          <div className="input-group">
            <select 
              className="input"
              value={targetLang} 
              onChange={(e) => setTargetLang(e.target.value)}
              style={{ fontWeight: 800, cursor: 'pointer' }}
            >
              {languages.filter(l => l.id !== 'auto').map(l => <option key={l.id} value={l.id}>{l.name}</option>)}
            </select>
          </div>
        </div>
      </div>
    </AiToolTemplate>
  )
}
