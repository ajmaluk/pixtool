import { useState, useRef, useEffect } from 'react'
import { Camera, Copy, ExternalLink, X, Shield, Zap, Lock, CheckCircle2 } from 'lucide-react'
import SEO from '../components/SEO'
import ToolContent from '../components/ToolContent'
import AdSpace from '../components/AdSpace'
import Breadcrumbs from '../components/Breadcrumbs'
import { useRatePopup } from '../hooks/useRatePopup'
import { ALL_TOOLS_MAP } from '../data/tools'
const toolData = ALL_TOOLS_MAP['qr-scanner']
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
              <ToolContent {...toolData} />
            </div>
          </div>

          <AdSpace type="side" className="desktop-only" />
        </div>

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
