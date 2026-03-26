import { useState } from 'react'
import { motion } from 'framer-motion' // eslint-disable-line no-unused-vars
import { Braces, Copy, Trash2, Check, Download, AlertCircle, FileJson, Zap, Shield, ZapOff } from 'lucide-react'
import SEO from '../components/SEO'
import Breadcrumbs from '../components/Breadcrumbs'
import ShareTool from '../components/ShareTool'
import ToolContent from '../components/ToolContent'
import AdSpace from '../components/AdSpace'
import { useRatePopup } from '../hooks/useRatePopup'

export default function JsonFormatter() {
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')
  const [error, setError] = useState(null)
  const [copied, setCopied] = useState(false)
  const { triggerRating } = useRatePopup()

  const formatJson = (space = 2) => {
    try {
      if (!input.trim()) return
      const parsed = JSON.parse(input)
      const formatted = JSON.stringify(parsed, null, space)
      setOutput(formatted)
      setError(null)
    } catch (err) {
      setError(err.message)
      setOutput('')
    }
  }

  const minifyJson = () => {
    try {
      if (!input.trim()) return
      const parsed = JSON.parse(input)
      setOutput(JSON.stringify(parsed))
      setError(null)
    } catch (err) {
      setError(err.message)
      setOutput('')
    }
  }

  const copyToClipboard = () => {
    if (!output) return
    navigator.clipboard.writeText(output).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
      triggerRating('json-formatter')
    })
  }

  const downloadJson = () => {
    if (!output) return
    const blob = new Blob([output], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'formatted.json'
    a.click()
    URL.revokeObjectURL(url)
    triggerRating('json-formatter')
  }

  const clearAll = () => {
    setInput('')
    setOutput('')
    setError(null)
  }

  return (
    <>
      <SEO
        title="Free Online JSON Formatter & Validator | Beauty Print JSON - PixTool"
        description="Format, validate, and minify JSON data instantly with PixTool. Our professional JSON formatter provides clean syntax, error detection, and secure browser-based processing. 100% private."
        keywords="json formatter 2026, pretty print json, online json validator, minify json online, best json editor browser, free developer tools, format json string, json syntax checker, secure json beauty print"
        path="/json-formatter"
        toolName="JSON Formatter"
        toolSteps={[
          'Paste your raw JSON string into the input area.',
          'Click Beautify to format with indentation or Minify to reduce size.',
          'Review validation errors if your JSON is invalid.',
          'Copy the result or download it as a .json file.'
        ]}
        breadcrumbs={[
          { name: 'Utility Tools', item: '/utility-tools' },
          { name: 'JSON Formatter', item: '/json-formatter' }
        ]}
      />

      <motion.div 
        className="page-container"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Breadcrumbs items={[
          { name: 'Utility Tools', item: '/utility-tools' },
          { name: 'JSON Formatter', item: '/json-formatter' }
        ]} />

        <div className="landing-layout">
          <AdSpace type="side" className="desktop-only" />

          <div className="landing-center">
            <AdSpace type="top" />

            <div className="page-hero">
              <div className="page-hero-content">
                <h1 className="page-title">JSON <span style={{ color: 'var(--accent-pink)' }}>Formatter</span></h1>
                <p className="page-subtitle">
                  Professional-grade JSON beautifier and validator. Clean your code, find syntax errors, and minify data instantly.
                </p>
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '1.5rem', marginBottom: '2rem' }}>
              {/* Input Section */}
              <div className="tool-panel">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                  <h3 style={{ margin: 0, fontSize: '1.1rem', fontWeight: 800 }}>Raw JSON</h3>
                  <button className="btn btn-secondary" onClick={clearAll} style={{ padding: '0.4rem 0.8rem', fontSize: '0.8rem' }}>
                    <Trash2 size={14} /> Clear
                  </button>
                </div>
                <textarea
                  className="input"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder='Paste your JSON here (e.g. {"name":"PixTool", "version": 2026})'
                  style={{ minHeight: '400px', fontFamily: 'monospace', fontSize: '0.9rem', lineHeight: 1.5 }}
                />
                <div style={{ display: 'flex', gap: '0.75rem', marginTop: '1rem' }}>
                  <button className="btn btn-primary" onClick={() => formatJson(2)} disabled={!input.trim()} style={{ background: 'var(--accent-pink)', borderColor: 'var(--accent-pink)' }}>
                    Beautify
                  </button>
                  <button className="btn btn-secondary" onClick={minifyJson} disabled={!input.trim()}>
                    Minify
                  </button>
                </div>
              </div>

              {/* Output Section */}
              <div className="tool-panel" style={{ position: 'relative' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                  <h3 style={{ margin: 0, fontSize: '1.1rem', fontWeight: 800 }}>Formatted Result</h3>
                  <div style={{ display: 'flex', gap: '0.5rem' }}>
                    <button className="btn btn-secondary" onClick={copyToClipboard} disabled={!output} style={{ padding: '0.4rem 0.8rem', fontSize: '0.8rem' }}>
                      {copied ? <Check size={14} /> : <Copy size={14} />} {copied ? 'Copied' : 'Copy'}
                    </button>
                    <button className="btn btn-secondary" onClick={downloadJson} disabled={!output} style={{ padding: '0.4rem 0.8rem', fontSize: '0.8rem' }}>
                      <Download size={14} /> Save
                    </button>
                  </div>
                </div>

                {error ? (
                  <div style={{ 
                    background: 'rgba(239, 68, 68, 0.1)', 
                    border: '1px solid var(--accent-red)', 
                    borderRadius: '12px', 
                    padding: '1.5rem',
                    color: 'var(--accent-red)',
                    display: 'flex',
                    gap: '1rem',
                    minHeight: '400px'
                  }}>
                    <AlertCircle size={24} style={{ flexShrink: 0 }} />
                    <div>
                      <h3 style={{ margin: '0 0 0.5rem 0', fontWeight: 800, fontSize: '1.1rem' }}>Invalid JSON</h3>
                      <p style={{ margin: 0, fontSize: '0.9rem', opacity: 0.9, lineHeight: 1.5 }}>{error}</p>
                    </div>
                  </div>
                ) : (
                  <div style={{ position: 'relative' }}>
                    <textarea
                      className="input"
                      value={output}
                      readOnly
                      placeholder="Formatted result will appear here..."
                      style={{ 
                        minHeight: '400px', 
                        fontFamily: 'monospace', 
                        fontSize: '0.9rem', 
                        lineHeight: 1.5,
                        background: output ? 'var(--bg-secondary)' : 'transparent',
                        color: 'var(--accent-emerald)'
                      }}
                    />
                    {!output && !error && (
                      <div style={{ 
                        position: 'absolute', 
                        top: '50%', 
                        left: '50%', 
                        transform: 'translate(-50%, -50%)',
                        textAlign: 'center',
                        opacity: 0.3
                      }}>
                        <FileJson size={48} style={{ marginBottom: '1rem' }} />
                        <p>Waiting for input...</p>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>

            <AdSpace type="bottom" />

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem', marginTop: '4rem', marginBottom: '4rem' }}>
              {[
                { icon: Shield, title: 'Private Processing', desc: 'Your JSON data never leaves your browser. All formatting happens locally.', color: 'var(--accent-pink)' },
                { icon: Zap, title: 'Lightning Fast', desc: 'Beautify or minify even large JSON files instantly with zero latency.', color: 'var(--accent-emerald)' },
                { icon: AlertCircle, title: 'Syntax Validation', desc: 'Identify exactly where your JSON is broken with detailed error messages.', color: 'var(--accent-orange)' }
              ].map((feat, i) => (
                <div key={i} className="tool-card" style={{ textAlign: 'center', padding: '2.5rem 2rem' }}>
                  <div className="tool-card-icon" style={{ background: `${feat.color}15`, color: feat.color, margin: '0 auto' }}>
                    <feat.icon size={26} />
                  </div>
                  <h2 style={{ fontWeight: 900, marginBottom: '0.5rem', fontSize: '1.1rem' }}>{feat.title}</h2>
                  <p className="tool-card-description" style={{ fontSize: '0.9rem' }}>{feat.desc}</p>
                </div>
              ))}
            </div>

            <ShareTool
              title="JSON Formatter"
              url="/json-formatter"
              text="Format and validate JSON data instantly with PixTool's professional developer utility"
            />

            <div style={{ marginTop: '5rem' }}>
              <ToolContent
                title="Why Use PixTool JSON Formatter?"
                description="Our JSON formatter is built for developers who prioritize speed and privacy. Unlike other online tools that send your data to a server, PixTool processes everything locally on your machine. This makes it safe for formatting sensitive configuration files, API responses, and database exports."
                benefits={[
                  "Instant pretty-printing with adjustable indentation",
                  "Validation with real-time error reporting",
                  "One-click minification for production payload reduction",
                  "Dark-mode ready interface for developer comfort",
                  "Zero data collection - 100% private"
                ]}
                useCases={[
                  { title: "API Debugging", description: "Quickly format messy API responses to understand the data structure and find nested keys." },
                  { title: "Config Validation", description: "Validate your package.json, tsconfig.json, or other config files before committing changes." },
                  { title: "Payload Optimization", description: "Minify large JSON payloads before sending them through network requests to save bandwidth." }
                ]}
              />
            </div>
          </div>

          <AdSpace type="side" className="desktop-only" />
        </div>
      </motion.div>
    </>
  )
}
