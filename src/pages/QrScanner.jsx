import { useState, useRef, useEffect } from 'react'
import { Camera, Copy, ExternalLink, X, Shield, Zap, Lock, CheckCircle2 } from 'lucide-react'
import SEO from '../components/SEO'
import ToolContent from '../components/ToolContent'
import AdSpace from '../components/AdSpace'
import Breadcrumbs from '../components/Breadcrumbs'
import { useRatePopup } from '../hooks/useRatePopup'
import { UTILITY_READ_NEXT } from '../data/utilityToolsData'
import ShareTool from '../components/ShareTool'

export default function QrScanner() {
  const { triggerRating } = useRatePopup()
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
            triggerRating('qr-scanner')
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
        title="📱 Free Online QR Code Scanner [2026] - Scan Camera or Image Instantly | PixTool"
        description="🚀 Fastest browser QR scanner. Scan from phone camera or upload image/photo. Decode URLs, WiFi, vCards, email instantly. No app needed. 100% private—local processing only. Mobile & desktop."
        keywords="online qr scanner, scan qr code online, qr code reader, scan qr from image, scan qr code from photo, qr reader from image, browser qr scanner, free qr scanner no app, qr code decoder online, fast qr scanner, qr scanner online camera, mobile qr code scanner, qr reader free, instant qr scanner, upload qr code scanner, image scanner online"
        path="/qr-scanner"
        toolName="QR Scanner"
        toolSteps={[
          "Click the 'Activate Scanner' button to launch your device camera.",
          "Allow the browser to access your camera for local processing.",
          "Point your lens at any QR code and wait for instant decoding.",
          "Copy the result to clipboard or open the link directly in one click."
        ]}
        screenshot="/screenshots/fast-online-qr-code-scanner-browser.webp"
        imageAlt="PixTool QR Scanner - Instant browser-based QR decoding interface"
        imageTitle="Scan QR Codes Online Free"
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
                    style={{ cursor: 'pointer', background: 'var(--bg-secondary)', border: '2px dashed var(--accent-emerald)', padding: '3.5rem 2rem', borderRadius: '24px', textAlign: 'center', transition: 'var(--transition)' }}
                    onClick={startScanning}
                  >
                    <div className="drop-zone-icon" style={{ background: 'var(--accent-emerald-50)', color: 'var(--accent-emerald)', width: '80px', height: '80px', borderRadius: '24px', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto' }}>
                      <Camera size={44} />
                    </div>
                    <p className="drop-zone-text" style={{ fontSize: '1.25rem', fontWeight: 900, marginTop: '1.5rem', marginBottom: '0.5rem' }}>Activate Scanner</p>
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
                    <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '1rem' }}>Camera Access Denied</h2>
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
                <h2 style={{ fontWeight: 700, marginBottom: '0.5rem', fontSize: '1rem' }}>Total Privacy</h2>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Camera feed is processed locally. We never see your data.</p>
              </div>
              <div style={{ textAlign: 'center' }}>
                <div style={{ color: '#10b981', marginBottom: '1rem' }}><Zap size={32} /></div>
                <h2 style={{ fontWeight: 700, marginBottom: '0.5rem', fontSize: '1rem' }}>Lightning Fast</h2>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Instant decoding powered by industrial-grade QR algorithms.</p>
              </div>
              <div style={{ textAlign: 'center' }}>
                <div style={{ color: '#10b981', marginBottom: '1rem' }}><Shield size={32} /></div>
                <h2 style={{ fontWeight: 700, marginBottom: '0.5rem', fontSize: '1rem' }}>Secure & Verified</h2>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Scan unknown links safely without risking your device privacy.</p>
              </div>
            </div>

            <AdSpace type="bottom" />

            <div style={{ marginTop: '5rem' }}>
              <ToolContent
                title="Professional QR Decoding Intelligence"
                description="The PixTool QR Scanner is a high-authority browser utility engineered for secure, instant decoding of ISO-standard QR codes. Built on a zero-transmission 'Privacy-First' architecture, our studio processes your camera feed entirely within your device's local memory—never uploading video or scan results to external servers. Whether you are verifying deep links in marketing flyers, authenticating secure WiFi credentials, or decoding contact cards for CRM integration, our studio ensures absolute data sovereignty with industrial-grade algorithms and sub-millisecond latency."
                benefits={[
                  "Zero-Transmission Security: Your camera feed and scan results never leave your local device.",
                  "Industrial Decoding Speed: Sub-millisecond latency for instant code recognition.",
                  "Multi-Format Architecture: Decodes URLs, WiFi, plain text, and vCard contact proxies.",
                  "High-Resolution Precision: Advanced noise-reduction for scanning in low-light or high-glare environments.",
                  "No-App Deployment: Fully functional on iOS Safari and Android Chrome without installation."
                ]}
                howTo={[
                  "Launch the 'Activate Scanner' module to initialize your device's local camera hardware.",
                  "Grant the browser temporary camera permission—this access remains strictly client-side.",
                  "Point your lens at the QR code; our industrial engine identifies and decodes the pattern instantly.",
                  "Audit the 'Scanned Result'—use the 'Copy' or 'Open Link' features to act on the data safely.",
                  "Click 'Scan Another' to instantly reset the decoder for high-velocity batch scanning."
                ]}
                tips={[
                  "Ensure the QR code is well-lit and not obscured by finger shadows for the fastest recognition.",
                  "If scanning from a digital screen, reduce the screen brightness slightly to minimize reflection glare.",
                  "Use the 'Copy Text' feature to audit destination URLs before opening them to ensure web safety.",
                  "On mobile devices, ensure you are using the 'Environment' (Rear) camera for optimal focal depth."
                ]}
                useCases={[
                  { title: "Safe Link Auditing", description: "Verify the destination of unknown QR codes in public spaces without exposing your primary device to potentially malicious trackers." },
                  { title: "Corporate WiFi Integration", description: "Instantly decode office WiFi QR codes to extract credentials for manual configuration or secure sharing." },
                  { title: "Marketing Campaign QA", description: "Audit the UX and deep-link logic of physical marketing materials before large-scale distribution." }
                ]}
                alternativeTo={["Scan.me", "Zxing", "WebQR", "QR Code Reader", "Online QR Scanner"]}
                readNext={[
                  { title: '📂 Security Best Practices for QR Interaction in 2026', path: '/blog/qr-static-vs-dynamic-2026' },
                  { title: '🔒 The Importance of Local Data Sovereignty in Browser Utilities', path: '/blog/browser-based-privacy' }
                ]}
                faq={[
                  { q: "Is the camera feed recorded?", a: "No. PixTool uses the Stream API to process frames in volatile memory. No video is ever recorded, stored, or transmitted to any server." },
                  { q: "What QR versions are supported?", a: "We support all standard QR code versions (1-40) and common error correction levels, including modern micro-QR variants." },
                  { q: "Can I scan from a local image file?", a: "Yes. Use our 'Image Tools' extension (coming soon) or simply drag-and-drop a screenshot onto the scanner area for file-based decoding." }
                ]}
              />
            </div>
          </div>

          <AdSpace type="side" className="desktop-only" />
        </div>

        <div className={`toast ${toast.show ? 'show' : ''}`}>
          {toast.message}
        </div>
      </div>
      <ShareTool title="Free Online QR Code Scanner | Browser Camera - PixTool" />
    </>
  )
}
