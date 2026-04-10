import { useState } from 'react'
import SEO from './SEO'
import { Send, Copy, RefreshCw, CheckCircle, Sparkles, Terminal, ArrowRight, Trash2, AlertCircle } from 'lucide-react'
import { fetchTextResponse } from '../services/aiApi'
import { useEffect, useRef } from 'react'
import ToolContent from './ToolContent'
import MarkdownRenderer from './MarkdownRenderer'
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
  howItWorks = []
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
          // Scroll output into view as it streams
          if (outputRef.current) {
            outputRef.current.scrollTop = outputRef.current.scrollHeight;
          }
        } else {
          clearInterval(timerRef.current);
          setIsStreaming(false);
          // Trigger rating after successful AI interaction
          triggerRating(path.replace(/^\//, ''));
        }
      }, 25);
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

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(response);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text', err);
    }
  }

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
      
      <div className="landing-layout" style={{ background: 'var(--bg-secondary)', minHeight: '100vh', padding: '2rem 1rem', width: '100%', maxWidth: '1800px', margin: '0 auto' }}>
        


        <div className="landing-center" style={{ flex: 1, minWidth: 0 }}>


            {/* Compact Tool Header */}
            <header style={{ padding: '0 0 2.5rem', textAlign: 'left' }}>
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
                    style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', margin: '0.2rem 0 0', maxWidth: '500px', opacity: 0.8 }}
                  >
                    {description}
                  </p>
                </div>
              </div>
            </header>

            <div className="ai-studio-grid" style={{ width: '100%' }}>
                {/* SETTINGS SIDEBAR */}
                <aside className="sidebar-settings" style={{ 
                  display: 'flex', 
                  flexDirection: 'column', 
                  gap: '1.5rem', 
                  width: '100%', 
                  position: 'sticky', 
                  top: '100px',
                  height: 'fit-content'
                }}>
                    <div className="sidebar-section">
                        <div className="sidebar-section-title">Studio Config</div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                            {children}
                        </div>
                    </div>

                    <div style={{ marginTop: 'auto', paddingTop: '1.5rem', borderTop: '1px solid var(--border-color)' }}>
                        <button 
                            className="btn btn-primary"
                            onClick={handleGenerate}
                            disabled={loading || isStreaming || (!children && !prompt.trim())}
                            style={{ 
                                width: '100%', 
                                padding: '1.25rem', 
                                borderRadius: '14px',
                                fontSize: '1rem',
                                fontWeight: 800,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                gap: '0.75rem',
                                boxShadow: 'var(--shadow-premium)',
                                background: 'var(--accent-gradient)'
                            }}
                        >
                            {loading ? <RefreshCw className="spin" size={20} /> : isStreaming ? <Sparkles className="spin" size={20} /> : <Send size={20} />}
                            {loading ? 'Thinking...' : isStreaming ? 'Synthesizing...' : buttonText}
                        </button>
                    </div>


                </aside>

                {/* MAIN INTERACTION AREA */}
                <main className="preview-main" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', padding: 0, background: 'transparent', border: 'none', width: '100%' }}>
                    <div 
                        className="studio-card"
                        style={{ 
                            background: 'var(--bg-glass)', 
                            borderRadius: '24px', 
                            padding: '2rem',
                            boxShadow: 'var(--shadow-lg)',
                            border: '1px solid var(--border-color)',
                            flex: 1,
                            display: 'flex',
                            flexDirection: 'column',
                            minHeight: '600px',
                            backdropFilter: 'blur(20px)'
                        }}
                    >
                        <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                            {/* Input Area */}
                            <div style={{ marginBottom: '1.5rem', position: 'relative' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                                    <label style={{ fontSize: '0.7rem', fontWeight: 900, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.15em' }}>
                                        Prompt Engineering
                                    </label>
                                    {prompt && (
                                        <button 
                                            onClick={handleClear}
                                            style={{ background: 'transparent', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.75rem', fontWeight: 600 }}
                                        >
                                            <Trash2 size={12} /> Clear Engine
                                        </button>
                                    )}
                                </div>
                                <textarea 
                                    className="dalam-textarea"
                                    style={{ 
                                        width: '100%', 
                                        minHeight: displayResponse ? '150px' : '350px', 
                                        padding: '1.75rem', 
                                        fontSize: '1.05rem', 
                                        background: 'var(--bg-secondary)', 
                                        borderRadius: '20px', 
                                        color: 'var(--text-primary)', 
                                        outline: 'none', 
                                        border: '1px solid var(--border-color)',
                                        transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                                        lineHeight: 1.6,
                                        fontWeight: 500
                                    }}
                                    placeholder={placeholder || "Type your instructions here..."}
                                    value={prompt}
                                    onChange={(e) => setPrompt(e.target.value)}
                                />
                            </div>

                            {/* Error Display */}
                            {error && (
                                <div style={{ 
                                    background: 'var(--accent-red-50)', 
                                    border: '1px solid var(--accent-red)', 
                                    padding: '1.25rem', 
                                    borderRadius: '16px', 
                                    color: 'var(--accent-red)', 
                                    marginBottom: '1.5rem',
                                    display: 'flex',
                                    gap: '0.75rem',
                                    alignItems: 'flex-start',
                                    fontSize: '0.9rem',
                                    lineHeight: 1.5
                                }}>
                                    <AlertCircle size={20} style={{ flexShrink: 0 }} />
                                    <div>{error}</div>
                                </div>
                            )}

                            {/* Result Area */}
                            {displayResponse && (
                                <div 
                                    className="studio-result-area"
                                    style={{ 
                                        padding: '2rem', 
                                        background: 'var(--bg-primary)', 
                                        borderRadius: '24px', 
                                        border: '1px solid var(--border-color)', 
                                        position: 'relative',
                                        flex: 1,
                                        boxShadow: 'inset 0 2px 8px rgba(0,0,0,0.02)',
                                        overflow: 'auto',
                                        maxHeight: '600px'
                                    }}
                                    ref={outputRef}
                                >
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem', position: 'sticky', top: 0, background: 'var(--bg-primary)', padding: '0.5rem 0', zIndex: 10 }}>
                                        <div style={{ fontSize: '0.7rem', fontWeight: 900, color: 'var(--accent-primary)', textTransform: 'uppercase', letterSpacing: '0.15em', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                            <Terminal size={14} /> Output Matrix
                                        </div>
                                        {!isStreaming && (
                                            <button 
                                                onClick={handleCopy}
                                                style={{ background: 'var(--bg-card)', border: '1px solid var(--border-color)', padding: '0.6rem 1.25rem', borderRadius: '12px', fontSize: '0.8rem', fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.6rem', color: 'var(--text-primary)', boxShadow: 'var(--shadow-sm)' }}
                                            >
                                                {copied ? <CheckCircle size={14} color="var(--accent-emerald)" /> : <Copy size={14} />}
                                                {copied ? 'Copied to Clipboard' : 'Copy Output'}
                                            </button>
                                        )}
                                    </div>

                                    <div className="output-rich-content">
                                        <MarkdownRenderer content={displayResponse} />
                                        {isStreaming && <span className="dalam-cursor" />}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </main>
            </div>



            {/* SEO & Tool Content Area */}
            <div style={{ marginTop: '6rem', paddingBottom: '4rem' }}>
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
