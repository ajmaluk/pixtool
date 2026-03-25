import { useState } from 'react'
import AiToolTemplate from '../components/AiToolTemplate'
import { Code, RotateCcw } from 'lucide-react'

export default function AiCodingChat() {
  const [code, setCode] = useState('')
  const [language, setLanguage] = useState('javascript')

  const languages = [
    { id: 'javascript', name: 'JavaScript' },
    { id: 'python', name: 'Python' },
    { id: 'cpp', name: 'C++' },
    { id: 'go', name: 'Go' },
    { id: 'rust', name: 'Rust' },
    { id: 'html', name: 'HTML/CSS' },
    { id: 'sql', name: 'SQL' }
  ]

  const customPromptBuilder = (inputCode) => {
    return `You are a Senior Software Architect and Clean Code Expert. 
Analyze the following ${language} code for bugs, security vulnerabilities, and performance bottlenecks. 
Provide a refactored, optimized version. 
Explain your changes briefly in a professional, technical tone.
Format all code blocks clearly.

CODE TO ANALYZE:
\`\`\`${language}
${inputCode}
\`\`\``
  }

  return (
    <AiToolTemplate 
      title="Code Intelligence"
      description="Advanced architectural analysis, debugging, and refactoring for professional developers."
      icon={Code}
      path="/ai-tools/coding-chat"
      buttonText="Analyze & Refactor"
      customPromptBuilder={customPromptBuilder}
      seoKeywords="ai code analysis, refactor code online, debug assistant, software architect ai"
    >
      <div className="coding-workspace" style={{ marginBottom: '1.5rem' }}>
        {/* IDE Header */}
        <div style={{ background: '#09090b', padding: '1rem 1.5rem', borderRadius: '32px 32px 0 0', border: '1px solid #18181b', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', gap: '0.6rem' }}>
            <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#ff5f56' }}></div>
            <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#ffbd2e' }}></div>
            <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#27c93f' }}></div>
          </div>
          
          <select 
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            style={{ background: '#18181b', color: '#a1a1aa', border: '1px solid #27272a', borderRadius: '12px', padding: '0.5rem 1rem', fontSize: '0.8rem', fontWeight: 800, cursor: 'pointer', outline: 'none', textTransform: 'uppercase' }}
          >
            {languages.map(lang => (
              <option key={lang.id} value={lang.id}>{lang.name}</option>
            ))}
          </select>
        </div>

        {/* Editor Area */}
        <div style={{ position: 'relative', background: '#09090b', borderRadius: '0 0 32px 32px', border: '1px solid #18181b', borderTop: 'none', display: 'flex', overflow: 'hidden' }}>
          {/* Simulated Line Numbers */}
          <div style={{ padding: '2rem 1rem', color: '#3f3f46', textAlign: 'right', userSelect: 'none', background: '#020617', borderRight: '1px solid #0f172a', fontSize: '0.9rem', minWidth: '50px' }}>
            {Array.from({ length: 15 }).map((_, i) => (
              <div key={i} style={{ height: '1.6rem' }}>{i + 1}</div>
            ))}
          </div>

          <textarea 
            className="code-input"
            style={{ width: '100%', minHeight: '400px', background: 'transparent', border: 'none', color: '#fafafa', padding: '2rem', fontSize: '1.1rem', fontFamily: '"JetBrains Mono", "Fira Code", monospace', resize: 'vertical', outline: 'none', lineHeight: '1.6rem' }}
            placeholder="// Paste your code here for analysis..."
            value={code}
            onChange={(e) => setCode(e.target.value)}
          />

          <button 
            onClick={() => setCode('')}
            style={{ position: 'absolute', bottom: '2rem', right: '2rem', background: 'rgba(255,255,255,0.05)', color: '#52525b', border: 'none', padding: '0.75rem', borderRadius: '14px', cursor: 'pointer', transition: 'all 0.2s' }}
            title="Clear Editor"
          >
            <RotateCcw size={18} />
          </button>
        </div>
      </div>

      <style>{`
        .code-input::placeholder { color: #475569; }
        .code-input:focus { background: rgba(255,255,255,0.02); }
      `}</style>
    </AiToolTemplate>
  )
}
