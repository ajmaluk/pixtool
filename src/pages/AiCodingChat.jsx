import { useState } from 'react'
import AiToolTemplate from '../components/AiToolTemplate'
import { Code, Bug, Zap, Sparkles, BookOpen } from 'lucide-react'

export default function AiCodingChat() {
  const [language, setLanguage] = useState('javascript')
  const [task, setTask] = useState('refactor')

  const languages = [
    { id: 'javascript', name: 'JavaScript' },
    { id: 'typescript', name: 'TypeScript' },
    { id: 'python', name: 'Python' },
    { id: 'cpp', name: 'C++' },
    { id: 'go', name: 'Go' },
    { id: 'rust', name: 'Rust' },
    { id: 'html', name: 'HTML / CSS' },
    { id: 'sql', name: 'SQL' }
  ]

  const tasks = [
    { id: 'refactor', label: 'Refactor & Clean', sub: 'Best practices & DRY', icon: Sparkles },
    { id: 'debug', label: 'Find Bugs & Fix', sub: 'Security & edge cases', icon: Bug },
    { id: 'optimize', label: 'Boost Performance', sub: 'Time & space complexity', icon: Zap },
    { id: 'explain', label: 'Explain & Document', sub: 'JSDoc / docstrings & walkthrough', icon: BookOpen }
  ]

  const customPromptBuilder = (inputCode) => {
    const selectedTask = tasks.find(t => t.id === task)

    return `You are a Principal Software Architect and Senior Code Reviewer.
Perform a high-level ${selectedTask?.label || task} review on the following ${language} code.

ANALYSIS OBJECTIVE:
- Language: ${language}
- Task Mode: ${selectedTask?.label || task} (${selectedTask?.sub || ''})

OUTPUT REQUIREMENTS:
1. Executive Summary: Quick overview of key issues, patterns, or optimization vectors found.
2. Refactored Production Code: Complete, clean, well-formatted code block.
3. Detailed Changes Breakdown: Bulleted explanations of architectural, performance, and security enhancements.

SOURCE CODE:
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
      placeholder="// Paste your code snippet, function, query, or script here for instant review..."
      customPromptBuilder={customPromptBuilder}
      seoKeywords="ai code analysis, refactor code online, debug assistant, software architect ai"
    >
      <div className="sidebar-group">
        <label htmlFor="ai-code-language" style={{ display: 'block', fontSize: '0.75rem', fontWeight: 800, color: 'var(--text-muted)', marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
          Programming Language
        </label>
        <select 
          id="ai-code-language"
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
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
          {languages.map(lang => (
            <option key={lang.id} value={lang.id}>{lang.name}</option>
          ))}
        </select>
      </div>

      <div className="sidebar-group">
        <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 800, color: 'var(--text-muted)', marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
          Analysis Objective
        </label>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
          {tasks.map(t => (
            <button
              key={t.id}
              type="button"
              onClick={() => setTask(t.id)}
              style={{ 
                width: '100%', 
                padding: '0.6rem 0.75rem', 
                borderRadius: '10px', 
                border: '1.5px solid', 
                borderColor: task === t.id ? 'var(--accent-purple)' : 'var(--border-color)', 
                background: task === t.id ? 'var(--accent-glow)' : 'var(--bg-secondary)',
                textAlign: 'left',
                cursor: 'pointer',
                transition: 'all 0.2s',
                display: 'flex',
                alignItems: 'center',
                gap: '0.6rem'
              }}
            >
              <t.icon size={16} color={task === t.id ? 'var(--accent-purple)' : 'var(--text-muted)'} strokeWidth={1.5} />
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <span style={{ fontWeight: 800, fontSize: '0.8rem', color: task === t.id ? 'var(--text-primary)' : 'var(--text-secondary)' }}>{t.label}</span>
                <span style={{ fontSize: '0.65rem', color: 'var(--text-muted)' }}>{t.sub}</span>
              </div>
            </button>
          ))}
        </div>
      </div>
    </AiToolTemplate>
  )
}
