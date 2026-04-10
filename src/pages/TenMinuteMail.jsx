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
      toolId="10-minute-mail"
      storageNamespace="tenmin-mail"
      rotateTrigger={rotateCount}
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
