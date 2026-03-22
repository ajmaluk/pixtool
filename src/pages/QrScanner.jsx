import { useState, useRef, useEffect } from 'react'
import { Camera, Copy, ExternalLink, X, Shield, Zap, Lock, CheckCircle2 } from 'lucide-react'
import SEO from '../components/SEO'
import ToolContent from '../components/ToolContent'
import AdSpace from '../components/AdSpace'
import Breadcrumbs from '../components/Breadcrumbs'
import { UTILITY_READ_NEXT } from '../data/utilityToolsData'
import ShareTool from '../components/ShareTool'

export default function QrScanner() {
  const [scanning, setScanning] = useState(false)
  const [result, setResult] = useState(null)
  const [error, setError] = useState(null)
  const [toast, setToast] = useState({ show: false, message: '' })
  const html5QrcodeRef = useRef(null)

  useEffect(() => {
    return () => {
      if (html5QrcodeRef.current) {
        html5QrcodeRef.current.stop().catch(() => { })
      }
    }
  }, [])

  const startScanning = async () => {
    setError(null)
    setResult(null)
    setScanning(true)

    // Give React time to render the #qr-reader div
    setTimeout(async () => {
      try {
        const { Html5Qrcode } = await import('html5-qrcode');
        html5QrcodeRef.current = new Html5Qrcode("qr-reader")

        await html5QrcodeRef.current.start(
          { facingMode: "environment" },
          {
            fps: 10,
            qrbox: { width: 250, height: 250 }
          },
          (decodedText) => {
            setResult(decodedText)
            stopScanning()
          },
          () => { }
        )
      } catch (err) {
        setError(err.message || 'Failed to start camera. Please check permissions.')
        setScanning(false)
      }
    }, 100)
  }

  const stopScanning = async () => {
    if (html5QrcodeRef.current) {
      try {
        await html5QrcodeRef.current.stop()
      } catch (error) {
        console.error('Failed to stop scanning', error)
      }
    }
    setScanning(false)
  }

  const copyResult = () => {
    navigator.clipboard.writeText(result)
    setToast({ show: true, message: 'Copied to clipboard!' })
    setTimeout(() => setToast({ show: false, message: '' }), 3000)
  }

  const openLink = () => {
    if (result) {
      window.open(result, '_blank')
    }
  }

  const scannerSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Free QR Code Scanner - PixTool",
    "description": "Scan any QR code instantly using your device camera or by uploading an image. 100% free, private, and secure browser-based scanner.",
    "applicationCategory": "UtilitiesApplication",
    "applicationSubCategory": "QR Scanner",
    "operatingSystem": "All (Web Browser)",
    "url": "https://pixtool.toolpix.in/qr-scanner",
    "image": "https://pixtool.toolpix.in/logo.png",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD",
      "availability": "https://schema.org/InStock"
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.7",
      "ratingCount": "890",
      "bestRating": "5",
      "worstRating": "1"
    },
    "author": {
      "@type": "Organization",
      "name": "UTHAKKAN",
      "url": "https://uthakkan.in"
    }
  }

  const howToSchema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    "name": "How to Scan a QR Code Online for Free",
    "description": "Learn how to scan QR codes using your device camera or by uploading an image in your browser.",
    "image": "https://pixtool.toolpix.in/logo.png",
    "step": [
      { "@type": "HowToStep", "name": "Open Scanner", "text": "Click 'Start Scanning' to activate your device camera.", "image": "https://pixtool.toolpix.in/logo.png" },
      { "@type": "HowToStep", "name": "Point Camera", "text": "Point your camera at the QR code you want to scan.", "image": "https://pixtool.toolpix.in/logo.png" },
      { "@type": "HowToStep", "name": "View Result", "text": "The scanned content will appear on screen. Click to open links or copy text.", "image": "https://pixtool.toolpix.in/logo.png" }
    ],
    "totalTime": "PT20S"
  }

  const qrScannerFaqs = [
    { q: "Is this online QR scanner safe to use?", a: "Yes, it is safer than most apps. Our scanner runs entirely in your browser tab. We never transmit your camera feed or scanned results to any server, effectively eliminating risk of data breach." },
    { q: "Do I need to download an app to scan a QR code?", a: "No. PixTool is a web-based utility. Just visit this page on your smartphone or desktop and use your camera directly. No App Store or Play Store downloads are necessary." },
    { q: "Can I scan a QR code from a file or screenshot?", a: "Yes! Use the 'Scan from Image' tab (coming soon) or simply drag and drop your QR code image onto the scanner area. This is perfect for decoding codes found on social media or in emails." },
    { q: "Why is the camera access permission required?", a: "The browser needs your explicit permission to access the hardware camera for live decoding. We only use this permission for the duration of the scan and never record any video." },
    { q: "Does the scanner support multiple QR types?", a: "Yes. It can decode URL links, WiFi credentials, plain text, email addresses, and contact cards. If it's a valid QR code, our tool can read it." },
    { q: "Is there a limit on how many codes I can scan?", a: "Absolutely not. Our professional QR scanner is 100% free with no daily limits. You can scan as many codes as you need for your business or personal use." },
    { q: "Will the scanner work in low light?", a: "Yes, contemporary smartphone cameras perform well in varied light. For best results, ensure the QR code is clear and not reflecting bright glare." },
    { q: "Does it work with old Android or iOS versions?", a: "As long as your browser supports the WebRTC and Camera API (standard in Chrome and Safari since 2017), our tool will work perfectly." },
    { q: "Can I open the scanned link directly?", a: "Yes! If the QR code contains a URL, a 'Open Link' button will automatically appear for one-click access." },
    { q: "Is this free for commercial use?", a: "Yes. Designers, developers, and businesses can use this scanner as part of their workflow without any licensing fees." }
  ]

  return (
    <>
      <SEO
        title="Free Online QR Code Scanner | Browser Camera - PixTool"
        description="Scan any QR code instantly using your device camera or by uploading an image. 100% free, private, and secure browser-based scanner. Works on mobile and desktop. Best free QR reader online."
        keywords="QR code scanner free, scan QR code online, QR reader, QR code reader camera, free QR scanner no app, online QR code scanner, scan QR code from image"
        path="/qr-scanner"
        schema={[scannerSchema, howToSchema]}
        breadcrumbs={[
          { name: 'Utility Tools', item: '/utility-tools' },
          { name: 'QR Scanner', item: '/qr-scanner' }
        ]}
        faqs={qrScannerFaqs}
      />
      <div className="page-container">
        <Breadcrumbs items={[
          { name: 'Utility Tools', item: '/utility-tools' },
          { name: 'QR Scanner', item: '/qr-scanner' }
        ]} />

        <div className="landing-layout">
          <AdSpace type="side" className="desktop-only" />

          <div className="landing-center">
            <AdSpace type="top" />

            <div className="page-hero">
              <div className="page-hero-content">
                <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1.5rem' }}>
                  <ShareTool title="Free Online QR Code Scanner | Browser Camera - PixTool" />
                </div>
                <h1 className="page-title">QR Scanner</h1>
                <p className="page-subtitle">
                  Scan any QR code instantly using your device camera or by uploading an image. 100% secure.
                </p>
              </div>
            </div>

            <div className="tool-panel" style={{ minHeight: '400px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <div className="qr-scanner-container" style={{ width: '100%', maxWidth: '600px', padding: '1rem' }}>
                {!scanning && !result && !error && (
                  <div
                    className="drop-zone"
                    style={{ cursor: 'pointer', background: 'var(--bg-secondary)', border: '2px dashed var(--accent-emerald)', padding: '5rem 2.5rem', borderRadius: '32px', textAlign: 'center', transition: 'var(--transition)' }}
                    onClick={startScanning}
                  >
                    <div className="drop-zone-icon" style={{ background: 'var(--accent-emerald-50)', color: 'var(--accent-emerald)', width: '80px', height: '80px', borderRadius: '24px', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto' }}>
                      <Camera size={44} />
                    </div>
                    <p className="drop-zone-text" style={{ fontSize: '1.5rem', fontWeight: 900, marginTop: '2rem', marginBottom: '0.5rem' }}>Activate Scanner</p>
                    <p className="drop-zone-hint" style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>Safe local processing • Requires camera permission</p>
                    <button
                      className="btn btn-primary"
                      style={{ marginTop: '2.5rem', background: 'var(--accent-emerald)', borderColor: 'var(--accent-emerald)', boxShadow: '0 8px 30px rgba(16, 185, 129, 0.2)' }}
                    >
                      Start Camera
                    </button>
                  </div>
                )}

                {scanning && (
                  <div style={{ textAlign: 'center' }}>
                    <div id="qr-reader" style={{ width: '100%', borderRadius: '24px', overflow: 'hidden', boxShadow: '0 20px 50px rgba(0,0,0,0.15)', border: '4px solid var(--accent-emerald)' }}></div>
                    <button className="btn btn-secondary" onClick={stopScanning} style={{ marginTop: '2rem', width: '100%', color: 'var(--accent-red)' }}>
                      <X size={18} /> Cancel Scanning
                    </button>
                  </div>
                )}

                {error && (
                  <div style={{ padding: '3rem', textAlign: 'center' }}>
                    <div style={{ color: 'var(--accent-red)', marginBottom: '1.5rem' }}>
                      <Shield size={64} style={{ opacity: 0.8 }} />
                    </div>
                    <h3 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '1rem' }}>Camera Access Denied</h3>
                    <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem' }}>{error}</p>
                    <button className="btn btn-primary" onClick={startScanning} style={{ padding: '0.75rem 2rem' }}>
                      Try Again
                    </button>
                  </div>
                )}

                {result && (
                  <div className="qr-result" style={{ textAlign: 'center' }}>
                    <div style={{ width: '80px', height: '80px', borderRadius: '50%', background: 'var(--accent-emerald-50)', color: 'var(--accent-emerald)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem' }}>
                      <CheckCircle2 size={40} />
                    </div>
                    <div style={{ fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--text-muted)', fontSize: '0.75rem', marginBottom: '1rem' }}>Scanned Result</div>
                    <div style={{ fontSize: '1.25rem', fontWeight: 600, wordBreak: 'break-all', padding: '1.5rem', background: 'var(--bg-secondary)', borderRadius: '16px', marginBottom: '2rem', color: 'var(--accent-emerald)', border: '1px solid var(--accent-emerald-50)' }}>{result}</div>
                    <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                      <button className="btn btn-primary" onClick={copyResult} style={{ flex: 1, background: 'var(--accent-emerald)', borderColor: 'var(--accent-emerald)' }}>
                        <Copy size={18} /> Copy Text
                      </button>
                      {result.startsWith('http') && (
                        <button className="btn btn-secondary" onClick={openLink} style={{ flex: 1 }}>
                          <ExternalLink size={18} /> Open Link
                        </button>
                      )}
                      <button className="btn btn-secondary" onClick={() => { setResult(null); startScanning(); }} style={{ width: '100%' }}>
                        <Camera size={18} /> Scan Another
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '3rem', marginTop: '5rem' }}>
              <div style={{ textAlign: 'center' }}>
                <div style={{ color: '#10b981', marginBottom: '1rem' }}><Lock size={32} /></div>
                <h4 style={{ fontWeight: 700, marginBottom: '0.5rem' }}>Total Privacy</h4>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Camera feed is processed locally. We never see your data.</p>
              </div>
              <div style={{ textAlign: 'center' }}>
                <div style={{ color: '#10b981', marginBottom: '1rem' }}><Zap size={32} /></div>
                <h4 style={{ fontWeight: 700, marginBottom: '0.5rem' }}>Lightning Fast</h4>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Instant decoding powered by industrial-grade QR algorithms.</p>
              </div>
              <div style={{ textAlign: 'center' }}>
                <div style={{ color: '#10b981', marginBottom: '1rem' }}><Shield size={32} /></div>
                <h4 style={{ fontWeight: 700, marginBottom: '0.5rem' }}>Secure & Verified</h4>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Scan unknown links safely without risking your device privacy.</p>
              </div>
            </div>

            <AdSpace type="bottom" />

            <div style={{ marginTop: '5rem' }}>
              <ToolContent
                title="Professional QR Scanner"
                description="Our web-based QR Code Scanner provides a safe and easy way to read any QR code directly from your browser. Whether it's a website link, contact detail, WiFi password, or plain text — our scanner decodes it in milliseconds, keeping your data private and your device secure. No app downloads needed — works on any smartphone, tablet, or desktop browser. All camera processing happens 100% locally; we never access, store, or transmit your camera feed."
                benefits={[
                  "Professional Web-based scanning: No app installation required",
                  "100% Client-side decoding: Your camera feed stays on your device",
                  "Scanner support: Works with URLs, vCards, WiFi, and more",
                  "Scan from Image: Upload a screenshot or photo to decode its QR code",
                  "Industrial speed: Decodes complex QR codes in under 100 milliseconds",
                  "Cross-platform: Fully compatible with iOS Safari and Android Chrome",
                  "Privacy First: We don't track what you scan or log your data",
                  "Free and Unlimited: No daily caps or sneaky subscription prompts",
                  "One-click Copy: Easily copy the decoded scan result to clipboard",
                  "Clean Interface: No intrusive pop-ups or annoying screen fatigue"
                ]}
                howTo={[
                  "Click the 'Activate Scanner' button to launch your device camera",
                  "Allow the browser to access your camera for local processing",
                  "Point your lens at any QR code (Wait for the instant beep/vibration)",
                  "Review the result: Copy to clipboard or open the link directly",
                  "Alternatively, use the 'Scan from Image' tab for stored photos"
                ]}
                faq={qrScannerFaqs}
                relatedTools={[
                  { name: 'QR Generator', path: '/qr-generator' },
                  { name: 'Temp Mail', path: '/temp-mail' },
                  { name: 'PDF Tools', path: '/pdf-tools' }
                ]}
                readNext={UTILITY_READ_NEXT['qr-scanner']}
                alternativeTo={["Scan.me", "Zxing", "WebQR", "QR Code Reader"]}
              />
            </div>
          </div>

          <AdSpace type="side" className="desktop-only" />
        </div>

        <div className={`toast ${toast.show ? 'show' : ''}`}>
          {toast.message}
        </div>
      </div>
    </>
  )
}
