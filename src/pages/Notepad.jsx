import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { 
  FileText, Download, Trash2, Copy, Check, 
  Type, AlignLeft, Bold, Italic, List, 
  Eye, Edit3, Save
} from 'lucide-react'
import Breadcrumbs from '../components/Breadcrumbs'
import SEO from '../components/SEO'
import ToolContent from '../components/ToolContent'
import AdSpace from '../components/AdSpace'
import { PRODUCTIVITY_SEO_CONTENT } from '../data/productivityToolsData'
import { readStoredJson, writeStoredJson } from '../utils/browserStorage'

export default function Notepad() {
  const [content, setContent] = useState(() => readStoredJson('pt_notepad_content', ''))
  const [isPreview, setIsPreview] = useState(false)
  const [copied, setCopied] = useState(false)
  const [lastSaved, setLastSaved] = useState(null)
  const textareaRef = useRef(null)

  useEffect(() => {
    writeStoredJson('pt_notepad_content', content)
    setLastSaved(new Date().toLocaleTimeString())
  }, [content])

  const handleDownload = (format) => {
    const element = document.createElement("a");
    const file = new Blob([content], {type: 'text/plain'});
    element.href = URL.createObjectURL(file);
    element.download = `pixtool-note-${new Date().toISOString().slice(0,10)}.${format}`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(content)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const insertText = (before, after = '') => {
    const textarea = textareaRef.current
    const start = textarea.selectionStart
    const end = textarea.selectionEnd
    const text = textarea.value
    const beforeText = text.substring(0, start)
    const afterText = text.substring(end)
    const selectedText = text.substring(start, end)
    
    const newContent = beforeText + before + selectedText + after + afterText
    setContent(newContent)
    
    // Reset focus and selection
    setTimeout(() => {
      textarea.focus()
      textarea.setSelectionRange(start + before.length, end + before.length)
    }, 0)
  }

  const wordCount = content.trim() ? content.trim().split(/\s+/).length : 0
  const charCount = content.length

  return (
    <>
      <SEO 
        {...PRODUCTIVITY_SEO_CONTENT['notepad']}
        path="/productivity-tools/notepad"
        breadcrumbs={[{ name: 'Productivity', item: '/productivity-tools' }, { name: 'NotePad', item: '/productivity-tools/notepad' }]}
      />

      <div className="page-container" style={{ paddingTop: '2rem' }}>
        <Breadcrumbs items={[{ name: 'Productivity', item: '/productivity-tools' }, { name: 'NotePad', item: '/productivity-tools/notepad' }]} />
        <div className="landing-layout">
          <AdSpace type="side" className="desktop-only" />
          <div className="landing-center" style={{ maxWidth: '900px', margin: '0 auto', width: '100%' }}>
            <AdSpace type="top" />
        <div style={{ textAlign: 'center', marginBottom: '2.5rem', paddingTop: '2rem' }}>
          <h1 style={{ fontSize: '2.5rem', fontWeight: 900, letterSpacing: '-0.03em', marginBottom: '0.75rem' }}>
            NotePad <span style={{ color: 'var(--accent-primary)' }}>Pro</span>
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', maxWidth: '500px', margin: '0 auto' }}>
            A private, markdown-ready space for your thoughts.
          </p>
        </div>

          <div style={{ 
            background: 'var(--bg-card)', 
            borderRadius: '28px', 
            border: '1px solid var(--border-color)',
            boxShadow: 'var(--shadow-xl)',
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column',
            minHeight: '70vh'
          }}>
            {/* Toolbar */}
            <div style={{ 
              padding: '1rem 1.5rem', 
              background: 'var(--bg-secondary)', 
              borderBottom: '1px solid var(--border-color)',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: '1rem'
            }}>
              <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                <button 
                  onClick={() => setIsPreview(!isPreview)}
                  className={`btn-toolbar ${isPreview ? 'active' : ''}`}
                  title={isPreview ? "Edit Mode" : "Preview Mode"}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    padding: '0.5rem 1rem',
                    borderRadius: '10px',
                    border: '1px solid var(--border-color)',
                    background: isPreview ? 'var(--accent-primary)' : 'var(--bg-card)',
                    color: isPreview ? 'white' : 'var(--text-primary)',
                    fontSize: '0.85rem',
                    fontWeight: 700,
                    cursor: 'pointer'
                  }}
                >
                  {isPreview ? <Edit3 size={16} /> : <Eye size={16} />}
                  {isPreview ? 'Edit' : 'Preview'}
                </button>
                
                {!isPreview && (
                  <>
                    <div style={{ width: '1px', height: '24px', background: 'var(--border-color)', margin: '0 0.5rem' }} />
                    <button onClick={() => insertText('**', '**')} className="btn-icon" title="Bold"><Bold size={18} /></button>
                    <button onClick={() => insertText('_', '_')} className="btn-icon" title="Italic"><Italic size={18} /></button>
                    <button onClick={() => insertText('# ')} className="btn-icon" title="Heading"><Type size={18} /></button>
                    <button onClick={() => insertText('- ')} className="btn-icon" title="List"><List size={18} /></button>
                  </>
                )}
              </div>

              <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 700, marginRight: '1rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  <Save size={14} /> Auto-saved {lastSaved}
                </div>
                <button onClick={handleCopy} className="btn-toolbar" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.5rem 1rem', borderRadius: '10px', border: '1px solid var(--border-color)', background: 'var(--bg-card)', color: 'var(--text-primary)', fontSize: '0.85rem', fontWeight: 700, cursor: 'pointer' }}>
                  {copied ? <Check size={16} color="var(--accent-emerald)" /> : <Copy size={16} />}
                  {copied ? 'Copied' : 'Copy'}
                </button>
                <div style={{ position: 'relative' }}>
                   <button onClick={() => handleDownload('md')} className="btn btn-primary dense" style={{ borderRadius: '10px', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <Download size={16} /> Export
                  </button>
                </div>
                <button 
                  onClick={() => { if(confirm('Clear all notes?')) setContent('') }}
                  className="btn-toolbar" 
                  style={{ color: 'var(--accent-red)', padding: '0.5rem', borderRadius: '10px', border: 'none', background: 'none', cursor: 'pointer' }}
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </div>

            {/* Editor Area */}
            <div style={{ flex: 1, position: 'relative', display: 'flex' }}>
              {isPreview ? (
                <div className="markdown-preview" style={{ 
                  flex: 1, 
                  padding: '3rem', 
                  overflowY: 'auto', 
                  fontSize: '1.1rem', 
                  lineHeight: 1.8,
                  color: 'var(--text-primary)',
                  whiteSpace: 'pre-wrap'
                }}>
                  {content || <span style={{ color: 'var(--text-muted)', fontStyle: 'italic' }}>Nothing to preview...</span>}
                  {/* Simplistic preview for now, just preserving some whitespace */}
                </div>
              ) : (
                <textarea
                  ref={textareaRef}
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="Start writing your thoughts here..."
                  style={{
                    flex: 1,
                    padding: '2.5rem',
                    border: 'none',
                    outline: 'none',
                    background: 'none',
                    fontSize: '1.1rem',
                    lineHeight: 1.6,
                    color: 'var(--text-primary)',
                    fontFamily: 'var(--font-sans)',
                    resize: 'none',
                    width: '100%'
                  }}
                />
              )}
            </div>

            {/* Footer Status Bar */}
            <div style={{ 
              padding: '0.75rem 1.5rem', 
              background: 'var(--bg-secondary)', 
              borderTop: '1px solid var(--border-color)',
              display: 'flex',
              justifyContent: 'space-between',
              fontSize: '0.8rem',
              color: 'var(--text-muted)',
              fontWeight: 700
            }}>
              <div>
                Words: {wordCount} | Characters: {charCount}
              </div>
              <div>
                Privacy Mode: 100% Local
              </div>
            </div>
          </div>

          <AdSpace type="bottom" style={{ marginTop: '4rem' }} />
          <div style={{ marginTop: '6rem' }}>
            <ToolContent {...PRODUCTIVITY_SEO_CONTENT['notepad']} />
          </div>
              </div>
            <AdSpace type="side" className="desktop-only" />
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .btn-icon {
          background: none;
          border: none;
          color: var(--text-muted);
          padding: 8px;
          border-radius: 8px;
          cursor: pointer;
          transition: var(--transition-base);
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .btn-icon:hover {
          background: var(--border-color);
          color: var(--text-primary);
        }
        .markdown-preview h1 { border-bottom: 2px solid var(--border-color); padding-bottom: 0.5rem; margin-bottom: 1.5rem; }
        .markdown-preview p { margin-bottom: 1rem; }
      `}} />
    </>
  )
}
