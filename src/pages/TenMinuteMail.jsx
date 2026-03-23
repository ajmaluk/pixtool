import { useEffect, useState, useRef } from 'react'
import { Clock, RefreshCw } from 'lucide-react'
import TempMail from './TempMail'

export default function TenMinuteMail() {
  const [expiresIn, setExpiresIn] = useState(600)
  const timerRef = useRef(null)
  const [rotateCount, setRotateCount] = useState(0)

  useEffect(() => {
    timerRef.current && clearInterval(timerRef.current)
    timerRef.current = setInterval(() => {
      setExpiresIn(prev => {
        const next = prev - 1
        if (next <= 0) {
          setRotateCount(c => c + 1)
          return 600
        }
        return next
      })
    }, 1000)
    return () => clearInterval(timerRef.current)
  }, [])

  const minutes = Math.floor(expiresIn / 60)
  const seconds = expiresIn % 60

  return (
    <TempMail
      seoPath="/temp-mail/10-minute-mail"
      seoTitle="10 Minute Mail - Auto-Expiring Disposable Email | PixTool"
      seoDescription="Free 10 minute mail with auto-expiring disposable inbox. Get verification codes, OTPs, and confirmation emails instantly. No signup needed. Best 10MinuteMail, 10minutemail & Guerrilla Mail alternative."
      seoKeywords="10 minute mail, 10minutemail, 10 minute email, 10 minutes mail, 10 min mail, 5 minute mail, 10min mail, 10 minute mail with password, disposable email 10 minutes, throwaway email, temp mail 10 minutes, one-time email, auto expiring email, timed temporary email"
      storageNamespace="tenmin-mail"
      rotateTrigger={rotateCount}
      breadcrumbs={[
        { name: 'Utility Tools', item: '/utility-tools' },
        { name: '10 Minute Mail', item: '/temp-mail/10-minute-mail' }
      ]}
      heroTitle="10 Minute Mail"
      heroSubtitle="Disposable inbox that auto-expires in 10 minutes"
      heroBadge={
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.5rem 0.75rem', border: '1px solid var(--border-color)', borderRadius: '12px', marginTop: '0.75rem' }}>
          <Clock size={18} style={{ color: 'var(--accent-emerald)' }} />
          <span style={{ fontWeight: 700 }}>{minutes}:{seconds.toString().padStart(2,'0')}</span>
          <RefreshCw size={16} style={{ color: 'var(--text-muted)' }} />
        </div>
      }
    />
  )
}
