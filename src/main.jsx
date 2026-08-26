import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App.jsx'

// Auto-recovery for stale dynamic module imports and new deployments
if (typeof window !== 'undefined') {
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
