import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import SEO from './SEO'
import AdSpace from './AdSpace'
import { Send, Copy, RefreshCw, CheckCircle, Sparkles, Terminal, ArrowRight } from 'lucide-react'
import { fetchTextResponse } from '../services/aiApi'
import { useEffect, useRef } from 'react'
import ToolRating from './ToolRating'
import ToolContent from './ToolContent'
import { ALL_TOOLS_MAP } from '../data/tools'

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
  const [copied, setCopied] = useState(false)
  const [isStreaming, setIsStreaming] = useState(false)
  const timerRef = useRef(null)

  // Auto-fetch metadata from global map for SEO enhancement
  const toolMetadata = ALL_TOOLS_MAP[path] || {}
  const displayFeatures = features.length > 0 ? features : (toolMetadata.features || [])
  const displayHowItWorks = howItWorks.length > 0 ? howItWorks : (toolMetadata.howItWorks || [])
  const breadcrumbItems = [
    { name: 'AI Tools', item: '/ai-tools' },
    { name: title, item: path }
  ]

  const handleGenerate = async () => {
    if (onGenerate) {
      await onGenerate();
      return;
    }

    if (!prompt.trim() && !children) return;
    setLoading(true);
    setResponse('');
    setDisplayResponse('');
    setIsStreaming(false);
    
    let finalPrompt = customPromptBuilder ? customPromptBuilder(prompt) : prompt;
    if (systemPrompt && !customPromptBuilder) {
      finalPrompt = `${systemPrompt}\n\nClient Input: ${prompt}`;
    }
    
    try {
      const res = await fetchTextResponse(finalPrompt);
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
        } else {
          clearInterval(timerRef.current);
          setIsStreaming(false);
        }
      }, 25);
    } catch (err) {
      console.error('AI Error:', err);
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
      
      <div className="tool-page-v2" style={{ background: 'var(--bg-secondary)', minHeight: '100vh', display: 'flex', flexDirection: 'column', color: 'var(--text-primary)' }}>
        
        {/* Ad Space: Top Header */}
        <div style={{ background: 'var(--bg-card)', borderBottom: '1px solid var(--border-color)', padding: '0.75rem 0', flexShrink: 0 }}>
            <AdSpace type="top" style={{ maxWidth: '1000px', margin: '0 auto' }} />
        </div>

        {/* Compact Tool Header */}
        <header style={{ padding: '2rem 1.5rem', textAlign: 'center', background: 'var(--bg-card)', borderBottom: '1px solid var(--border-color)', flexShrink: 0 }}>
          <div className="container" style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '2rem' }}>
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              style={{ display: 'flex', padding: '1rem', borderRadius: '24px', background: 'var(--bg-secondary)', color: 'var(--accent-purple)' }}
            >
              <ToolIcon size={32} strokeWidth={1.5} />
            </motion.div>
            
            <div style={{ textAlign: 'left' }}>
              <motion.h1 
                initial={{ x: -10, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                style={{ fontSize: '1.75rem', fontWeight: 950, margin: 0, letterSpacing: '-0.03em', color: 'var(--text-primary)', lineHeight: 1.1 }}
              >
                {title}
              </motion.h1>
              <motion.p 
                initial={{ x: -10, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.1 }}
                style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', margin: '0.25rem 0 0', maxWidth: '500px' }}
              >
                {description}
              </motion.p>
            </div>
          </div>
        </header>

        {/* Floating Studio Workspace - Managed Height */}
        <main style={{ flex: 1, overflow: 'hidden', display: 'flex', flexDirection: 'column', padding: '1.5rem 0' }}>
          <div className="container" style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 1.5rem', width: '100%', height: '100%', display: 'flex', flexDirection: 'column' }}>
            <motion.div 
              className="studio-card"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              style={{ 
                  background: 'var(--bg-card)', 
                  borderRadius: '32px', 
                  padding: '2.5rem',
                  boxShadow: 'var(--shadow-premium)',
                  border: '1px solid var(--border-color)',
                  position: 'relative',
                  flex: 1,
                  display: 'flex',
                  flexDirection: 'column',
                  overflow: 'hidden'
              }}
            >
              <div style={{ flex: 1, overflowY: 'auto', paddingRight: '0.75rem', marginBottom: '1.5rem' }} className="custom-scrollbar">
                {/* Tool Interaction Area */}
                <div style={{ marginBottom: '2rem' }}>
                  {children ? children : (
                    <div className="simple-input">
                      <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 900, color: '#a1a1aa', marginBottom: '1.25rem', textTransform: 'uppercase', letterSpacing: '0.2em' }}>
                        Data Input Forge
                      </label>
                      <textarea 
                        className="dalam-textarea"
                        style={{ width: '100%', minHeight: '220px', padding: '2rem', fontSize: '1.25rem', background: 'var(--bg-secondary)', borderRadius: '28px', color: 'var(--text-primary)', outline: 'none', boxShadow: 'inset 0 0 20px rgba(0,0,0,0.01)', border: '1px solid var(--border-color)' }}
                        placeholder={placeholder}
                        value={prompt}
                        onChange={(e) => setPrompt(e.target.value)}
                      />
                    </div>
                  )}
                </div>

                {/* Result Area - Now inside scrollable zone */}
                <AnimatePresence>
                  {displayResponse && (
                    <motion.div 
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      style={{ marginTop: '2rem', padding: '3.5rem', background: 'var(--bg-secondary)', borderRadius: '40px', border: '1px solid var(--border-color)', position: 'relative' }}
                    >
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2.5rem' }}>
                        <div style={{ fontSize: '0.85rem', fontWeight: 900, color: '#a1a1aa', textTransform: 'uppercase', letterSpacing: '0.25em', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                          <Terminal size={16} /> Result Atmosphere
                        </div>
                        {!isStreaming && (
                             <button 
                                onClick={handleCopy}
                                style={{ background: 'var(--bg-card)', border: '1px solid var(--border-color)', padding: '0.75rem 1.25rem', borderRadius: '16px', fontSize: '0.9rem', fontWeight: 800, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-primary)', boxShadow: 'var(--shadow-sm)' }}
                             >
                                {copied ? <CheckCircle size={18} color="var(--accent-emerald)" /> : <Copy size={18} />}
                                {copied ? 'Copied' : 'Copy'}
                             </button>
                        )}
                      </div>

                      <div className="output-rich-content" style={{ fontSize: '1.2rem', lineHeight: 1.85, color: 'var(--text-primary)', whiteSpace: 'pre-wrap', fontWeight: 500 }}>
                        {displayResponse}
                        {isStreaming && <span className="dalam-cursor" />}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Main Action Button - FIXED AT BOTTOM OF CARD */}
              <div style={{ flexShrink: 0 }}>
                <button 
                  className="dalam-generate-btn"
                  onClick={handleGenerate}
                  disabled={loading || isStreaming || (!children && !prompt.trim())}
                  style={{ 
                      width: '100%', 
                      padding: '1.5rem', 
                      borderRadius: '30px', 
                      background: 'var(--bg-secondary)', 
                      color: 'var(--text-primary)', 
                      fontSize: '1.3rem', 
                      fontWeight: 800, 
                      border: '1px solid var(--border-color)', 
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '0.75rem',
                      boxShadow: 'var(--shadow-sm)',
                      transition: 'all 0.3s ease'
                  }}
                >
                  {loading ? <RefreshCw className="spin" size={24} /> : isStreaming ? <Sparkles className="spin" size={24} /> : <ArrowRight size={24} />}
                  {loading ? 'Thinking...' : isStreaming ? 'Architecting...' : buttonText}
                </button>

                {/* Tool Rating */}
                <div style={{ marginTop: '2rem' }}>
                    <ToolRating toolSlug={path.replace(/^\//, '')} />
                </div>

                {/* Ad Space: Bottom of Interaction */}
                <div style={{ marginTop: '1.5rem' }}>
                    <AdSpace type="bottom" />
                </div>
              </div>
            </motion.div>

            {/* NEW: SEO Rich Content Section */}
            <div style={{ marginTop: '4rem', paddingBottom: '4rem' }}>
                <ToolContent 
                    title={title}
                    description={description}
                    toolId={path.split('/').pop()}
                    path={path}
                    benefits={displayFeatures}
                    howTo={displayHowItWorks}
                />
            </div>
          </div>
        </main>

        {/* Global Styles for the new "Dalam" UI */}
        <style>{`
            .dalam-generate-btn:hover {
                transform: translateY(-2px);
                background: var(--bg-card-hover);
            }
            .dalam-generate-btn:active {
                transform: translateY(0);
            }
            .dalam-generate-btn:disabled {
                opacity: 0.6;
                cursor: not-allowed;
                transform: none;
            }
            .dalam-cursor {
                display: inline-block;
                width: 8px;
                height: 1.3em;
                background: var(--accent-purple);
                margin-left: 6px;
                vertical-align: middle;
                animation: dalam-blink 1s infinite;
                border-radius: 4px;
            }
            @keyframes dalam-blink {
                0%, 100% { opacity: 1; }
                50% { opacity: 0; }
            }
            .dalam-textarea::placeholder {
                color: var(--text-muted);
                font-weight: 500;
            }
        `}</style>
      </div>
    </>
  )
}
