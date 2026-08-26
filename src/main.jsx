import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App.jsx'

export const APP_VERSION = '2.2.0'

// Auto-recovery for stale dynamic module imports and version cache bust
if (typeof window !== 'undefined') {
  try {
    const savedVersion = localStorage.getItem('pixtool_app_version')
    if (savedVersion && savedVersion !== APP_VERSION) {
      if ('caches' in window) {
        caches.keys().then((names) => {
          names.forEach((name) => caches.delete(name))
        })
      }
    }
    localStorage.setItem('pixtool_app_version', APP_VERSION)
  } catch {
    // Ignore localStorage access errors in restricted iframe/browser modes
  }

  window.addEventListener('vite:preloadError', (event) => {
    event.preventDefault()
    window.location.reload()
  })

  window.addEventListener('error', (event) => {
    const msg = event?.message || ''
    if (/Failed to load module script|Failed to fetch dynamically imported module|MIME type/i.test(msg)) {
      const retryKey = 'pix_chunk_retry_' + window.location.pathname
      if (!sessionStorage.getItem(retryKey)) {
        sessionStorage.setItem(retryKey, '1')
        window.location.reload()
      }
    }
  })
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
)
