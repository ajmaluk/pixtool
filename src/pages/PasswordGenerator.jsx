import { useState, useEffect } from 'react'
import { Key, Copy, RefreshCw, Shield, Zap, Lock, Eye, EyeOff, Check, AlertTriangle } from 'lucide-react'
import SEO from '../components/SEO'
import Breadcrumbs from '../components/Breadcrumbs'
import ShareTool from '../components/ShareTool'
import ToolContent from '../components/ToolContent'
import AdSpace from '../components/AdSpace'
import { useRatePopup } from '../hooks/useRatePopup'
import { ALL_TOOLS_MAP } from '../data/tools'

export default function PasswordGenerator() {
  const [length, setLength] = useState(16)
  const [options, setOptions] = useState({
    uppercase: true,
    lowercase: true,
    numbers: true,
    symbols: true
  })
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(true)
  const [copied, setCopied] = useState(false)
  const { triggerRating } = useRatePopup()
  const toolData = ALL_TOOLS_MAP['password-generator']

  const generatePassword = () => {
    const charset = {
      uppercase: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
      lowercase: 'abcdefghijklmnopqrstuvwxyz',
      numbers: '0123456789',
      symbols: '!@#$%^&*()-_=+[]{}|;:,.<>?'
    }

    let characters = ''
    if (options.uppercase) characters += charset.uppercase
    if (options.lowercase) characters += charset.lowercase
    if (options.numbers) characters += charset.numbers
    if (options.symbols) characters += charset.symbols

    if (!characters) {
      setPassword('')
      return
    }

    let newPassword = ''
    const array = new Uint32Array(length)
    window.crypto.getRandomValues(array)

    for (let i = 0; i < length; i++) {
      newPassword += characters.charAt(array[i] % characters.length)
    }

    setPassword(newPassword)
    setCopied(false)
  }

  useEffect(() => {
    generatePassword()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [length, options])

  const copyToClipboard = () => {
    if (!password) return
    navigator.clipboard.writeText(password).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
      triggerRating('password-generator')
    })
  }

  const getStrength = () => {
    if (!password) return { label: 'Empty', color: 'var(--text-muted)', width: '0%' }
    let score = 0
    if (password.length > 8) score++
    if (password.length > 12) score++
    if (password.length > 16) score++
    if (options.uppercase) score++
    if (options.lowercase) score++
    if (options.numbers) score++
    if (options.symbols) score++

    if (score < 4) return { label: 'Weak', color: 'var(--accent-red)', width: '25%' }
    if (score < 6) return { label: 'Medium', color: 'var(--accent-orange)', width: '50%' }
    if (score < 8) return { label: 'Strong', color: 'var(--accent-emerald)', width: '75%' }
    return { label: 'Very Strong', color: 'var(--accent-primary)', width: '100%' }
  }

  const strength = getStrength()

  return (
    <>
      <SEO
        {...toolData.seo}
        path={toolData.path}
        breadcrumbs={[{ name: 'Utility Tools', item: '/utility-tools' }, { name: toolData.title, item: toolData.path }]}
      />

      <div className="page-container">
        <Breadcrumbs items={[
          { name: 'Utility Tools', item: '/utility-tools' },
          { name: toolData.title, item: toolData.path }
        ]} />

        <div className="landing-layout">
          <AdSpace type="side" className="desktop-only" />

          <div className="landing-center">
            <AdSpace type="top" />

            <div className="page-hero">
              <div className="page-hero-content">
                <h1 className="page-title">{toolData.title}</h1>
                <p className="page-subtitle">
                  {toolData.description}
                </p>
              </div>
            </div>

            <div className="tool-panel" style={{ maxWidth: '600px', margin: '0 auto' }}>
              {/* Output Display */}
              <div style={{ position: 'relative', marginBottom: '2rem' }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '1rem',
                  padding: '1.25rem 1.5rem',
                  background: 'var(--bg-secondary)',
                  borderRadius: '20px',
                  border: '2px solid var(--border-color)',
                  minHeight: '72px'
                }}>
                  <Lock size={20} style={{ color: strength.color, flexShrink: 0 }} />
                  <span style={{ 
                    fontSize: '1.5rem', 
                    fontWeight: 900, 
                    fontFamily: 'monospace', 
                    letterSpacing: '0.05em',
                    wordBreak: 'break-all',
                    flex: 1,
                    filter: showPassword ? 'none' : 'blur(8px)',
                    transition: 'filter 0.2s ease',
                    userSelect: showPassword ? 'all' : 'none'
                  }}>
                    {password || 'Select options...'}
                  </span>
                  <div style={{ display: 'flex', gap: '0.5rem' }}>
                    <button 
                      onClick={() => setShowPassword(!showPassword)}
                      style={{ background: 'transparent', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', padding: '4px' }}
                    >
                      {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                    <button 
                      onClick={copyToClipboard}
                      style={{ background: 'transparent', border: 'none', color: copied ? 'var(--accent-emerald)' : 'var(--accent-primary)', cursor: 'pointer', padding: '4px' }}
                    >
                      {copied ? <Check size={20} /> : <Copy size={20} />}
                    </button>
                  </div>
                </div>
                
                {/* Strength Meter */}
                <div style={{ marginTop: '1rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', fontSize: '0.85rem', fontWeight: 800 }}>
                    <span style={{ color: 'var(--text-secondary)' }}>Strength</span>
                    <span style={{ color: strength.color }}>{strength.label}</span>
                  </div>
                  <div style={{ height: '6px', background: 'var(--border-color)', borderRadius: '3px', overflow: 'hidden' }}>
                    <div style={{ height: '100%', width: strength.width, background: strength.color, transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)' }} />
                  </div>
                </div>
              </div>

              {/* Configuration */}
              <div style={{ display: 'grid', gap: '2rem' }}>
                <div style={{ background: 'var(--bg-primary)', padding: '1.5rem', borderRadius: '16px', border: '1px solid var(--border-color)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
                    <label style={{ fontWeight: 800 }}>Length: {length}</label>
                  </div>
                  <input
                    type="range"
                    min="6"
                    max="64"
                    value={length}
                    onChange={(e) => setLength(parseInt(e.target.value))}
                    style={{ width: '100%', accentColor: 'var(--accent-orange)' }}
                  />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '1rem' }}>
                  {Object.keys(options).map(opt => (
                    <label key={opt} style={{ 
                      display: 'flex', 
                      alignItems: 'center', 
                      gap: '0.75rem', 
                      padding: '1rem', 
                      background: 'var(--bg-primary)', 
                      border: '1px solid var(--border-color)', 
                      borderRadius: '12px',
                      cursor: 'pointer',
                      userSelect: 'none',
                      textTransform: 'capitalize',
                      fontWeight: 700,
                      fontSize: '0.9rem'
                    }}>
                      <input
                        type="checkbox"
                        checked={options[opt]}
                        onChange={() => setOptions({ ...options, [opt]: !options[opt] })}
                        style={{ width: '18px', height: '18px', accentColor: 'var(--accent-orange)' }}
                      />
                      {opt}
                    </label>
                  ))}
                </div>

                <button className="btn btn-primary" onClick={generatePassword} style={{ background: 'var(--accent-orange)', borderColor: 'var(--accent-orange)', width: '100%', padding: '1rem' }}>
                  <RefreshCw size={18} /> Generate New Password
                </button>
              </div>
            </div>

            <AdSpace type="bottom" />

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem', marginTop: '4rem', marginBottom: '4rem' }}>
              {[
                { icon: Shield, title: 'Local Privacy', desc: 'Passwords are generated using WebCrypto API strictly in your browser. Nothing is sent to a server.', color: 'var(--accent-orange)' },
                { icon: AlertTriangle, title: 'High Entropy', desc: 'True random generation ensures your passwords cannot be predicted or brute-forced easily.', color: 'var(--accent-red)' },
                { icon: Zap, title: 'No Registration', desc: 'Secure your accounts without creating one on our site. Free, fast, and anonymous.', color: 'var(--accent-primary)' }
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

            <ShareTool title={`${toolData.title} | Random & Strong - PixTool`} />

            <div style={{ marginTop: '5rem' }}>
              <ToolContent {...toolData} />
            </div>
          </div>

          <AdSpace type="side" className="desktop-only" />
        </div>
      </div>
    </>
  )
}
