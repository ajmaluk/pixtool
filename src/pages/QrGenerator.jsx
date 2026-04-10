import { useState, useEffect } from 'react'
import { QRCodeSVG } from 'qrcode.react'
import { Download, Copy, Link, Text, Mail, Phone, Wifi, Sliders, X, ChevronDown } from 'lucide-react'
import SEO from '../components/SEO'
import ToolContent from '../components/ToolContent'
import AdSpace from '../components/AdSpace'
import Breadcrumbs from '../components/Breadcrumbs'
import { useRatePopup } from '../hooks/useRatePopup'
import ShareTool from '../components/ShareTool'
import { ALL_TOOLS_MAP } from '../data/tools'


const qrTypes = [
  { id: 'url', label: 'URL', icon: Link },
  { id: 'text', label: 'Text', icon: Text },
  { id: 'email', label: 'Email', icon: Mail },
  { id: 'phone', label: 'Phone', icon: Phone },
  { id: 'wifi', label: 'WiFi', icon: Wifi },
]

export default function QrGenerator() {
  const { triggerRating } = useRatePopup()
  const toolData = ALL_TOOLS_MAP['qr-generator']
  const [activeType, setActiveType] = useState('url')
  const [data, setData] = useState({
    url: '',
    text: '',
    email: '',
    phone: '',
    wifi: '',
    wifiPassword: '',
    wifiEncryption: 'WPA'
  })
  const [settings, setSettings] = useState({
    size: 200,
    fgColor: '#000000',
    bgColor: '#ffffff',
    level: 'M'
  })
  const [showMobileSettings, setShowMobileSettings] = useState(false)
  const [toast, setToast] = useState({ show: false, message: '' })

  useEffect(() => {
    document.body.classList.toggle('mobile-overlay-open', showMobileSettings)
    return () => document.body.classList.remove('mobile-overlay-open')
  }, [showMobileSettings])

  const getQrValue = () => {
    switch (activeType) {
      case 'url':
        return data.url || 'https://example.com'
      case 'text':
        return data.text || 'Hello World'
      case 'email':
        return data.email ? `mailto:${data.email}` : 'mailto@example.com'
      case 'phone':
        return data.phone ? `tel:${data.phone}` : '+1234567890'
      case 'wifi':
        return data.wifi
          ? `WIFI:T:${data.wifiEncryption};S:${data.wifi};P:${data.wifiPassword || ''};H:false;;`
          : 'WIFI:T:WPA;S:MyNetwork;P:password123;H:false;;'
      default:
        return data.url || 'https://example.com'
    }
  }

  const downloadQR = () => {
    const svg = document.querySelector('.qr-preview svg')
    if (!svg) return

    const svgData = new XMLSerializer().serializeToString(svg)
    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')
    const img = new Image()

    canvas.width = settings.size
    canvas.height = settings.size

    img.onload = () => {
      ctx.fillStyle = settings.bgColor
      ctx.fillRect(0, 0, canvas.width, canvas.height)
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height)

      const link = document.createElement('a')
      link.download = `qrcode-${Date.now()}.png`
      link.href = canvas.toDataURL('image/png')
      link.click()
      triggerRating('qr-generator')
    }

    img.src = 'data:image/svg+xml;base64,' + btoa(unescape(encodeURIComponent(svgData)))
    setToast({ show: true, message: 'QR Code downloaded!' })
    setTimeout(() => setToast({ show: false, message: '' }), 3000)
  }

  const copyQR = async () => {
    const svg = document.querySelector('.qr-preview svg')
    if (!svg) return

    const svgData = new XMLSerializer().serializeToString(svg)
    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')
    const img = new Image()

    canvas.width = settings.size
    canvas.height = settings.size

    await new Promise(resolve => {
      img.onload = resolve
      img.src = 'data:image/svg+xml;base64,' + btoa(unescape(encodeURIComponent(svgData)))
    })

    ctx.fillStyle = settings.bgColor
    ctx.fillRect(0, 0, canvas.width, canvas.height)
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height)

    canvas.toBlob(async (blob) => {
      try {
        await navigator.clipboard.write([new ClipboardItem({ 'image/png': blob })])
        triggerRating('qr-generator')
        setToast({ show: true, message: 'QR Code copied to clipboard!' })
        setTimeout(() => setToast({ show: false, message: '' }), 3000)
      } catch {
        setToast({ show: true, message: 'Failed to copy' })
        setTimeout(() => setToast({ show: false, message: '' }), 3000)
      }
    })
  }

  const renderSettings = () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <div className="input-group">
        <label className="input-label">Size (px)</label>
        <select
          className="select"
          value={settings.size}
          onChange={(e) => setSettings(s => ({ ...s, size: parseInt(e.target.value) }))}
        >
          <option value={128}>128 × 128</option>
          <option value={200}>200 × 200</option>
          <option value={256}>256 × 256</option>
          <option value={300}>300 × 300</option>
          <option value={400}>400 × 400</option>
        </select>
      </div>
      <div className="input-group">
        <label className="input-label">Error Correction</label>
        <select
          className="select"
          value={settings.level}
          onChange={(e) => setSettings(s => ({ ...s, level: e.target.value }))}
        >
          <option value="L">Low (7%)</option>
          <option value="M">Medium (15%)</option>
          <option value="Q">Quartile (25%)</option>
          <option value="H">High (30%)</option>
        </select>
      </div>
      <div className="input-group">
        <label className="input-label">Foreground Color</label>
        <input
          type="color"
          value={settings.fgColor}
          onChange={(e) => setSettings(s => ({ ...s, fgColor: e.target.value }))}
          style={{ width: '100%', height: '44px', border: '1px solid var(--border-color)', borderRadius: '10px', cursor: 'pointer', padding: '2px' }}
        />
      </div>
      <div className="input-group">
        <label className="input-label">Background Color</label>
        <input
          type="color"
          value={settings.bgColor}
          onChange={(e) => setSettings(s => ({ ...s, bgColor: e.target.value }))}
          style={{ width: '100%', height: '44px', border: '1px solid var(--border-color)', borderRadius: '10px', cursor: 'pointer', padding: '2px' }}
        />
      </div>
    </div>
  )

  const qrGeneratorFaqs = [
    { q: "Is registration required for this free QR code generator?", a: "No, you can generate unlimited QR codes without creating any account. Our service is a professional-grade alternative to paid QR tools, providing high-fidelity results with no signup required." },
    { q: "Do these QR codes expire or have scan limits?", a: "The QR codes we generate are 'static', meaning they encode data directly. They never expire, have no scan limits, and will work forever as long as your destination link or data is active." },
    { q: "What scale of PNG resolution can I download?", a: "We support downloads up to 400x400 pixels, which is perfect for business cards, brochures, posters, and digital displays. Our high-resolution output ensures sharp edges for reliable scanning." },
    { q: "How do I create a WiFi QR code for my business?", a: "Select the 'WiFi' tab, enter your network SSID and password, then download the code. Customers can simply point their phone camera at the code to connect instantly without typing." },
    { q: "Can I customize the QR code colors?", a: "Yes! You can change both the QR dots (foreground) and the background to match your brand colors. Pro tip: Always use a dark foreground on a light background for the best scan reliability." },
    { q: "What is QR Code error correction (ECC)?", a: "ECC allows a QR code to be scanned even if it's slightly damaged or obscured. 'High (30%)' is safest for printed materials that might get scratched, while 'Low (7%)' creates a cleaner-looking code." },
    { q: "Is this QR generator safe for private data?", a: "Yes. Unlike cloud-based generators that log your links and data, PixTool generates everything locally in your browser. Your sensitive URLs and WiFi passwords are never transmitted to our servers." },
    { q: "Can I add my logo to the QR code?", a: "This feature is currently in development. For now, we focus on providing the cleanest, most scannable standard QR codes possible." },
    { q: "Does this work on iPhone and Android?", a: "Absolutely. Our generator is fully responsive, allowing you to create and download QR codes directly on your mobile device." },
    { q: "Can I use these QR codes for commercial purposes?", a: "Yes, 100%. All QR codes generated here are yours to use for any personal or commercial project with no licensing fees or attribution required." }
  ]

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

            <div className="sidebar-layout" style={{ marginBottom: '3rem' }}>
              <div className="tool-panel">
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '1.5rem' }}>
                  {qrTypes.map(type => (
                    <button
                      key={type.id}
                      className={`btn ${activeType === type.id ? 'btn-primary' : 'btn-secondary'}`}
                      onClick={() => setActiveType(type.id)}
                    >
                      <type.icon size={18} />
                      {type.label}
                    </button>
                  ))}
                </div>

                <div className="input-group">
                  {activeType === 'url' && (
                    <div className="input-group">
                      <label className="input-label" htmlFor="qr-url-input">Enter Website URL</label>
                      <input
                        id="qr-url-input"
                        name="url"
                        type="url"
                        className="input"
                        placeholder="https://example.com"
                        value={data.url}
                        onChange={(e) => setData(d => ({ ...d, url: e.target.value }))}
                      />
                    </div>
                  )}
                  {activeType === 'text' && (
                    <div className="input-group">
                      <label className="input-label" htmlFor="qr-text-input">Enter Plain Text</label>
                      <textarea
                        id="qr-text-input"
                        name="text"
                        className="input"
                        placeholder="Enter your text here..."
                        rows={6}
                        value={data.text}
                        onChange={(e) => setData(d => ({ ...d, text: e.target.value }))}
                        style={{ resize: 'vertical' }}
                      />
                    </div>
                  )}
                  {activeType === 'email' && (
                    <div className="input-group">
                      <label className="input-label" htmlFor="qr-email-input">Email Address</label>
                      <input
                        id="qr-email-input"
                        name="email"
                        type="email"
                        className="input"
                        placeholder="email@example.com"
                        value={data.email}
                        onChange={(e) => setData(d => ({ ...d, email: e.target.value }))}
                      />
                    </div>
                  )}
                  {activeType === 'phone' && (
                    <div className="input-group">
                      <label className="input-label" htmlFor="qr-phone-input">Phone Number</label>
                      <input
                        id="qr-phone-input"
                        name="phone"
                        type="tel"
                        className="input"
                        placeholder="+1 234 567 890"
                        value={data.phone}
                        onChange={(e) => setData(d => ({ ...d, phone: e.target.value }))}
                      />
                    </div>
                  )}
                  {activeType === 'wifi' && (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                      <div className="input-group">
                        <label className="input-label">Network Name (SSID)</label>
                        <input
                          type="text"
                          className="input"
                          placeholder="My WiFi Network"
                          value={data.wifi}
                          onChange={(e) => setData(d => ({ ...d, wifi: e.target.value }))}
                        />
                      </div>
                      <div className="input-group">
                        <label className="input-label">WiFi Password</label>
                        <input
                          type="password"
                          className="input"
                          placeholder="Password"
                          value={data.wifiPassword}
                          onChange={(e) => setData(d => ({ ...d, wifiPassword: e.target.value }))}
                        />
                      </div>
                      <div className="input-group">
                        <label className="input-label">Encryption Type</label>
                        <select
                          className="select"
                          value={data.wifiEncryption}
                          onChange={(e) => setData(d => ({ ...d, wifiEncryption: e.target.value }))}
                        >
                          <option value="WPA">WPA/WPA2 (Recommended)</option>
                          <option value="WEP">WEP</option>
                          <option value="nopass">None</option>
                        </select>
                      </div>
                    </div>
                  )}
                </div>

                <div className="desktop-only" style={{ marginTop: '3rem', paddingTop: '2.5rem', borderTop: '1px solid var(--border-color)' }}>
                  <h2 style={{ marginBottom: '1.5rem', fontWeight: 800, fontSize: '1.1rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>QR Aesthetics</h2>
                  {renderSettings()}
                </div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                <div className="tool-panel" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', position: 'sticky', top: '88px' }}>
                  <div className="qr-preview" style={{ padding: '1.5rem', background: settings.bgColor, borderRadius: '16px', boxShadow: 'var(--shadow-lg)', border: '1px solid var(--border-color)' }}>
                    <QRCodeSVG
                      value={getQrValue()}
                      size={settings.size > 280 ? 280 : settings.size}
                      fgColor={settings.fgColor}
                      bgColor={settings.bgColor}
                      level={settings.level}
                      includeMargin={false}
                    />
                  </div>
                  <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '2.5rem' }}>
                    <button className="btn btn-primary" style={{ width: '100%' }} onClick={downloadQR}>
                      <Download size={18} /> Download PNG
                    </button>
                    <button className="btn btn-secondary" style={{ width: '100%' }} onClick={copyQR}>
                      <Copy size={18} /> Copy to Clipboard
                    </button>
                  </div>
                </div>
                <AdSpace type="bottom" style={{ minHeight: '120px' }} />
              </div>
            </div>

            <AdSpace type="bottom" />

            <div className="editorial-container" style={{ marginTop: '6rem', padding: '3rem', background: 'var(--bg-glass)', borderRadius: '32px', border: '1px solid var(--border-color)', position: 'relative', overflow: 'hidden' }}>
              <div style={{ position: 'absolute', top: '-50px', right: '-50px', width: '200px', height: '200px', background: 'var(--accent-glow)', filter: 'blur(100px)', opacity: 0.5, zIndex: 0 }}></div>
              
              <div style={{ position: 'relative', zIndex: 1 }}>
                <h2 style={{ fontSize: '2.25rem', fontWeight: 900, letterSpacing: '-0.03em', marginBottom: '1.5rem', color: 'var(--text-primary)' }}>
                  The Professional Successor to <span style={{ color: 'var(--accent-primary)' }}>Uitly</span>
                </h2>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2.5rem', marginTop: '3rem' }}>
                  <div>
                    <h3 style={{ fontSize: '1.25rem', fontWeight: 800, marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                      <Shield size={22} style={{ color: '#10b981' }} />
                      100% Privacy, Zero Servers
                    </h3>
                    <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7, fontSize: '1.05rem' }}>
                      Unlike other generators that store your URLs on their servers, PixTool works entirely in your browser. Your sensitive data, WiFi passwords, and private links never leave your machine.
                    </p>
                  </div>
                  <div>
                    <h3 style={{ fontSize: '1.25rem', fontWeight: 800, marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                      <Zap size={22} style={{ color: '#fbbf24' }} />
                      Permanent Static Codes
                    </h3>
                    <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7, fontSize: '1.05rem' }}>
                      The biggest pain point with "Free" QR generators is code expiration. PixTool generates pure ISO-standard static codes that encode data directly into the matrix. They will <b>never expire</b>.
                    </p>
                  </div>
                </div>

                <div style={{ marginTop: '4rem', padding: '2rem', background: 'var(--bg-primary)', borderRadius: '24px', border: '1px solid var(--border-color)' }}>
                  <h3 style={{ fontSize: '1.1rem', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '1rem', color: 'var(--accent-primary)' }}>Note for Uitly Users</h3>
                  <p style={{ color: 'var(--text-secondary)', margin: 0, lineHeight: 1.6 }}>
                    If you were a regular user of the original Uitly suite, you'll find everything you loved here—but faster and more secure. We've optimized the encoding algorithms to ensure sub-second scan times even on legacy hardware.
                  </p>
                </div>
              </div>
            </div>

            <div style={{ marginTop: '5rem' }}>
              <ToolContent {...toolData} />
            </div>
          </div>

          <AdSpace type="side" className="desktop-only" />
        </div>

        {/* Mobile Action Bar & Settings Drawer */}
        <div className="mobile-bottom-bar tool-mobile-fixed-bar">
          <button className="btn btn-secondary" onClick={() => setShowMobileSettings(true)}>
            <Sliders size={18} />
            <span className="mobile-action-label mobile-action-label-full">Settings</span>
            <span className="mobile-action-label mobile-action-label-short">Set</span>
          </button>
          <button className="btn btn-primary" onClick={downloadQR}>
            <Download size={18} />
            <span className="mobile-action-label mobile-action-label-full">Download</span>
            <span className="mobile-action-label mobile-action-label-short">Save</span>
          </button>
        </div>

        {/* Mobile Settings Drawer */}
        {showMobileSettings && (
          <div className="settings-drawer-overlay" onClick={() => setShowMobileSettings(false)}>
            <div className="settings-drawer-content" onClick={e => e.stopPropagation()}>
              <div className="drawer-handle" />
              <div className="drawer-header">
                <h3 style={{ margin: 0, fontWeight: 900, fontSize: '1.25rem' }}>QR Aesthetics</h3>
                <button 
                  className="icon-btn" 
                  onClick={() => setShowMobileSettings(false)} 
                  aria-label="Close settings"
                  style={{ background: 'var(--bg-secondary)', border: 'none' }}
                >
                  <X size={20} />
                </button>
              </div>
              {renderSettings()}
            </div>
          </div>
        )}

        <div className={`toast ${toast.show ? 'show' : ''}`}>
          {toast.message}
        </div>
      </div>
      <ShareTool
        title={toolData.title}
        url={toolData.path}
        text={toolData.description}
      />

    </>
  )
}
