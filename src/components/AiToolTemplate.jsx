import { useState, useEffect, useRef } from 'react'
import SEO from './SEO'
import { Send, Copy, RefreshCw, CheckCircle, Sparkles, Terminal, Trash2, AlertCircle, Zap, RotateCcw } from 'lucide-react'
import { fetchTextResponse } from '../services/aiApi'
import ToolContent from './ToolContent'
import MarkdownRenderer from './MarkdownRenderer'
import AdSpace from './AdSpace'
import { ALL_TOOLS_MAP } from '../data/tools'
import { useRatePopup } from '../hooks/useRatePopup'

export default function AiToolTemplate({ 
  title, 
  description, 
  icon: ToolIcon, 
  path,
  placeholder,
  systemPrompt,
  seoKeywords,
  buttonText = "Generate",
  children,
  customPromptBuilder,
  onGenerate,
  features = [],
  howItWorks = [],
  customWorkspace = null
}) {
  const [prompt, setPrompt] = useState('')
  const [response, setResponse] = useState('')
  const [displayResponse, setDisplayResponse] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [copied, setCopied] = useState(false)
  const [isStreaming, setIsStreaming] = useState(false)
  const timerRef = useRef(null)
  const outputRef = useRef(null)
  const { triggerRating } = useRatePopup()

  // Auto-fetch metadata from global map for SEO enhancement
  const toolMetadata = ALL_TOOLS_MAP[path] || {}
  const displayFeatures = features.length > 0 ? features : (toolMetadata.features || [])
  const displayHowItWorks = howItWorks.length > 0 ? howItWorks : (toolMetadata.howItWorks || [])
  const breadcrumbItems = [
    { name: 'AI Tools', item: '/ai-tools' },
    { name: title, item: path }
  ]

  const handleClear = () => {
    setPrompt('');
    setResponse('');
    setDisplayResponse('');
    setError(null);
  }

  const handleGenerate = async () => {
    if (onGenerate) {
      await onGenerate();
      return;
    }

    if (!prompt.trim() && !children) return;
    setLoading(true);
    setError(null);
    setResponse('');
    setDisplayResponse('');
    setIsStreaming(false);
    
    let finalPrompt = customPromptBuilder ? customPromptBuilder(prompt) : prompt;
    if (systemPrompt && !customPromptBuilder) {
      finalPrompt = `${systemPrompt}\n\nClient Input: ${prompt}`;
    }
    
    try {
      const res = await fetchTextResponse(finalPrompt);
      if (!res) throw new Error("Our neural engine returned an empty response. Please try reframing your prompt.");
      
      setResponse(res);
      setLoading(false);
      
      setIsStreaming(true);
      let index = 0;
      const words = res.split(' ');
      
      if (timerRef.current) clearInterval(timerRef.current);
      
      timerRef.current = setInterval(() => {
        if (index < words.length) {
          setDisplayResponse(prev => prev + (index === 0 ? '' : ' ') + words[index]);
          index++;
          if (outputRef.current) {
            outputRef.current.scrollTop = outputRef.current.scrollHeight;
          }
        } else {
          clearInterval(timerRef.current);
          setIsStreaming(false);
          triggerRating(path.replace(/^\//, ''));
        }
      }, 20);
    } catch (err) {
      console.error('AI Error:', err);
      setError(err.message || "Stability interruption detected. Our AI engine is currently under high load. Please try again in a moment.");
      setLoading(false);
    }
  }

  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    }
  }, [])

  const handleKeyDown = (e) => {
    if ((e.metaKey || e.ctrlKey) && e.key === 'Enter') {
      e.preventDefault();
      if (!loading && !isStreaming && (prompt.trim() || children)) {
        handleGenerate();
      }
    }
  }

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(response);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text', err);
    }
  }

  const wordCount = prompt.trim() ? prompt.trim().split(/\s+/).length : 0;
  const charCount = prompt.length;

  const handleDownload = () => {
    if (!response) return;
    const blob = new Blob([response], { type: 'text/markdown;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${title.toLowerCase().replace(/[^a-z0-9]+/g, '-')}-output.md`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <>
      <SEO 
        title={`${title} - Free AI Powered Tool | PixTool`}
        description={description}
        keywords={seoKeywords}
        path={path}
        toolName={title}
        toolSteps={displayHowItWorks}
        screenshot={toolMetadata.screenshot ? `/screenshots/${toolMetadata.screenshot}` : null}
        imageAlt={toolMetadata.imageAlt}
        imageTitle={toolMetadata.imageTitle}
        breadcrumbs={breadcrumbItems}
      />
      
      <div className="landing-layout" style={{ background: 'var(--bg-secondary)', minHeight: '100vh', padding: '2rem 1rem', width: '100%', maxWidth: '1600px', margin: '0 auto' }}>
        
        <div className="landing-center" style={{ flex: 1, minWidth: 0 }}>

            {/* Compact Tool Header */}
            <header style={{ padding: '0 0 1.75rem', textAlign: 'left' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
                <div 
                  style={{ 
                    display: 'flex', 
                    padding: '0.75rem', 
                    borderRadius: '14px', 
                    background: 'var(--bg-card)', 
                    color: 'var(--accent-primary)', 
                    boxShadow: '0 4px 12px rgba(0,0,0,0.1)', 
                    border: '1px solid var(--border-color)' 
                  }}
                >
                  <ToolIcon size={24} strokeWidth={1.5} />
                </div>
                
                <div>
                  <h1 
                    style={{ fontSize: '1.5rem', fontWeight: 950, margin: 0, letterSpacing: '-0.02em', color: 'var(--text-primary)', lineHeight: 1.1 }}
                  >
                    {title}
                  </h1>
                  <p 
                    style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', margin: '0.2rem 0 0', maxWidth: '600px', opacity: 0.85 }}
                  >
                    {description}
                  </p>
                </div>
              </div>
            </header>

            {/* Top Responsive Ad */}
            <AdSpace type="top" style={{ marginBottom: '1.75rem' }} />

            {/* Custom Full Workspace (for interactive wizards like Resume Generator) */}
            {customWorkspace ? (
              <div className="custom-workspace-container" style={{ width: '100%' }}>
                {customWorkspace}
              </div>
            ) : (
              <div 
                className="ai-studio-grid" 
                style={{ 
                  width: '100%',
                  display: 'grid',
                  gridTemplateColumns: children ? 'clamp(320px, 30%, 380px) 1fr' : '1fr',
                  gap: '2rem',
                  alignItems: 'start'
                }}
              >
                {/* SETTINGS SIDEBAR (when children are provided) */}
                {children && (
                  <aside 
                    className="sidebar-settings" 
                    style={{ 
                      display: 'flex', 
                      flexDirection: 'column', 
                      gap: '1.25rem', 
                      width: '100%', 
                      background: 'var(--bg-card)',
                      padding: '1.5rem',
                      borderRadius: '18px',
                      border: '1px solid var(--border-color)',
                      boxShadow: 'var(--shadow-sm)',
                      position: 'sticky', 
                      top: '90px',
                      height: 'fit-content'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.75rem' }}>
                      <span style={{ fontSize: '0.75rem', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--text-muted)' }}>
                        Studio Parameters
                      </span>
                      <Zap size={14} color="var(--accent-purple)" />
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                      {children}
                    </div>

                    <div style={{ marginTop: '0.5rem', paddingTop: '1rem', borderTop: '1px solid var(--border-color)' }}>
                      <button 
                        className="btn btn-primary"
                        onClick={handleGenerate}
                        disabled={loading || isStreaming || (!children && !prompt.trim())}
                        style={{ 
                          width: '100%', 
                          padding: '0.9rem 1.25rem', 
                          borderRadius: '12px',
                          fontSize: '0.95rem',
                          fontWeight: 800,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          gap: '0.6rem',
                          boxShadow: 'var(--shadow-premium)',
                          background: 'var(--accent-gradient)',
                          cursor: loading || isStreaming ? 'not-allowed' : 'pointer'
                        }}
                      >
                        {loading ? <RefreshCw className="spin" size={18} /> : isStreaming ? <Sparkles className="spin" size={18} /> : <Send size={18} />}
                        {loading ? 'Thinking...' : isStreaming ? 'Synthesizing...' : buttonText}
                      </button>
                    </div>
                  </aside>
                )}

                {/* MAIN INTERACTION & OUTPUT AREA */}
                <section className="preview-main" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', padding: 0, background: 'transparent', border: 'none', width: '100%', minWidth: 0 }}>
                  <div 
                    className="studio-card"
                    style={{ 
                      background: 'var(--bg-glass)', 
                      borderRadius: '20px', 
                      padding: '1.5rem', 
                      boxShadow: 'var(--shadow-md)',
                      border: '1px solid var(--border-color)',
                      flex: 1,
                      display: 'flex',
                      flexDirection: 'column',
                      minHeight: '520px',
                      backdropFilter: 'blur(20px)'
                    }}
                  >
                    <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                      {/* Input Header */}
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                          <label htmlFor="ai-studio-prompt" style={{ fontSize: '0.75rem', fontWeight: 900, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.12em' }}>
                            Prompt & Instructions
                          </label>
                          {wordCount > 0 && (
                            <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', background: 'var(--bg-secondary)', padding: '0.15rem 0.5rem', borderRadius: '6px' }}>
                              {wordCount} words / {charCount} chars
                            </span>
                          )}
                        </div>

                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                          <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', opacity: 0.8 }}>
                            Press <b>⌘+Enter</b>
                          </span>
                          {prompt && (
                            <button 
                              onClick={handleClear}
                              style={{ background: 'transparent', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.3rem', fontSize: '0.75rem', fontWeight: 600 }}
                            >
                              <Trash2 size={12} /> Clear
                            </button>
                          )}
                        </div>
                      </div>

                      {/* Input Textarea */}
                      <div style={{ position: 'relative', marginBottom: '1rem' }}>
                        <textarea 
                          id="ai-studio-prompt"
                          className="dalam-textarea"
                          style={{ 
                            width: '100%', 
                            minHeight: displayResponse ? '140px' : '260px', 
                            padding: '1.25rem', 
                            fontSize: '1rem', 
                            background: 'var(--bg-secondary)', 
                            borderRadius: '16px', 
                            color: 'var(--text-primary)', 
                            outline: 'none', 
                            border: '1px solid var(--border-color)',
                            transition: 'all 0.2s ease',
                            lineHeight: 1.6,
                            fontWeight: 500,
                            boxSizing: 'border-box'
                          }}
                          placeholder={placeholder || "Type your prompt, context, or instructions here... (⌘+Enter to run)"}
                          value={prompt}
                          onChange={(e) => setPrompt(e.target.value)}
                          onKeyDown={handleKeyDown}
                        />

                        {/* Action Bar below prompt */}
                        <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '0.75rem', gap: '0.75rem' }}>
                          <button 
                            className="btn btn-primary"
                            onClick={handleGenerate}
                            disabled={loading || isStreaming || (!children && !prompt.trim())}
                            style={{ 
                              padding: '0.75rem 1.5rem', 
                              borderRadius: '12px',
                              fontSize: '0.9rem',
                              fontWeight: 800,
                              display: 'inline-flex',
                              alignItems: 'center',
                              gap: '0.5rem',
                              boxShadow: 'var(--shadow-sm)',
                              background: 'var(--accent-gradient)',
                              cursor: loading || isStreaming ? 'not-allowed' : 'pointer'
                            }}
                          >
                            {loading ? <RefreshCw className="spin" size={16} /> : isStreaming ? <Sparkles className="spin" size={16} /> : <Send size={16} />}
                            {loading ? 'Synthesizing...' : isStreaming ? 'Generating...' : buttonText}
                          </button>
                        </div>
                      </div>

                      {/* Error Display */}
                      {error && (
                        <div style={{ 
                          background: 'rgba(239, 68, 68, 0.1)', 
                          border: '1px solid rgba(239, 68, 68, 0.3)', 
                          padding: '1rem 1.25rem', 
                          borderRadius: '12px', 
                          color: 'var(--accent-red)', 
                          marginBottom: '1.25rem',
                          display: 'flex',
                          gap: '0.75rem',
                          alignItems: 'center',
                          fontSize: '0.85rem',
                          lineHeight: 1.5
                        }}>
                          <AlertCircle size={18} style={{ flexShrink: 0 }} />
                          <div style={{ flex: 1 }}>{error}</div>
                          <button 
                            onClick={handleGenerate}
                            style={{ background: 'transparent', border: '1px solid currentColor', borderRadius: '8px', color: 'inherit', padding: '0.3rem 0.6rem', fontSize: '0.75rem', fontWeight: 700, cursor: 'pointer' }}
                          >
                            Retry
                          </button>
                        </div>
                      )}

                      {/* Result Output Area */}
                      {displayResponse ? (
                        <div 
                          className="studio-result-area"
                          style={{ 
                            padding: '1.5rem', 
                            background: 'var(--bg-primary)', 
                            borderRadius: '16px', 
                            border: '1px solid var(--border-color)', 
                            position: 'relative',
                            flex: 1,
                            boxShadow: 'inset 0 2px 6px rgba(0,0,0,0.02)',
                            overflow: 'auto',
                            maxHeight: '650px',
                            marginTop: '0.5rem'
                          }}
                          ref={outputRef}
                        >
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem', position: 'sticky', top: 0, background: 'var(--bg-primary)', padding: '0.25rem 0', zIndex: 10, borderBottom: '1px solid var(--border-color)' }}>
                            <div style={{ fontSize: '0.75rem', fontWeight: 900, color: 'var(--accent-primary)', textTransform: 'uppercase', letterSpacing: '0.12em', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                              <Terminal size={14} /> Intelligence Output
                            </div>
                            
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
                              {!isStreaming && (
                                <>
                                  <button 
                                    onClick={handleGenerate}
                                    style={{ background: 'var(--bg-card)', border: '1px solid var(--border-color)', padding: '0.4rem 0.75rem', borderRadius: '8px', fontSize: '0.75rem', fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.35rem', color: 'var(--text-secondary)' }}
                                    title="Regenerate with current settings"
                                  >
                                    <RotateCcw size={12} /> Regenerate
                                  </button>
                                  <button 
                                    onClick={handleDownload}
                                    style={{ background: 'var(--bg-card)', border: '1px solid var(--border-color)', padding: '0.4rem 0.75rem', borderRadius: '8px', fontSize: '0.75rem', fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.35rem', color: 'var(--text-secondary)' }}
                                    title="Download as Markdown"
                                  >
                                    Export .MD
                                  </button>
                                  <button 
                                    onClick={handleCopy}
                                    style={{ background: 'var(--bg-card)', border: '1px solid var(--border-color)', padding: '0.4rem 0.75rem', borderRadius: '8px', fontSize: '0.75rem', fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.35rem', color: 'var(--text-primary)', boxShadow: 'var(--shadow-sm)' }}
                                  >
                                    {copied ? <CheckCircle size={13} color="var(--accent-emerald)" /> : <Copy size={13} />}
                                    {copied ? 'Copied' : 'Copy'}
                                  </button>
                                </>
                              )}
                            </div>
                          </div>

                          <div className="output-rich-content" style={{ fontSize: '0.95rem', lineHeight: 1.7 }}>
                            <MarkdownRenderer content={displayResponse} />
                            {isStreaming && <span className="dalam-cursor" />}
                          </div>
                        </div>
                      ) : !loading && (
                        <div style={{ marginTop: 'auto', paddingTop: '2.5rem', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', opacity: 0.7 }}>
                          <div style={{ width: '48px', height: '48px', borderRadius: '16px', background: 'var(--accent-glow)', color: 'var(--accent-purple)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '0.75rem' }}>
                            <Sparkles size={24} />
                          </div>
                          <div style={{ fontSize: '0.9rem', fontWeight: 800, color: 'var(--text-primary)' }}>Neural Studio Ready</div>
                          <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', maxWidth: '380px', marginTop: '0.2rem' }}>
                            Configure studio parameters on the left, add context, and press <b>⌘+Enter</b> to synthesize intelligence.
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </section>
              </div>
            )}

            {/* Bottom Responsive Ad */}
            <AdSpace type="bottom" style={{ margin: '3rem auto 2rem' }} />

            {/* SEO & Tool Content Area */}
            <div style={{ marginTop: '3rem', paddingBottom: '4rem' }}>
              <ToolContent 
                title={title}
                description={description}
                toolSlug={path.replace(/^\//, '')}
                seoTitle={`${title} - Platinum AI Tool`}
                seoDescription={description}
                seoKeywords={seoKeywords}
                faq={toolMetadata.faq}
                tips={toolMetadata.tips}
                useCases={toolMetadata.useCases}
                alternativeTo={toolMetadata.alternativeTo}
                benefits={displayFeatures}
                howTo={displayHowItWorks}
              />
            </div>
        </div>

      </div>
    </>
  )
}
