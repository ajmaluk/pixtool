import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Play, Pause, RotateCcw, Coffee, Zap, Moon, Settings, Bell, BellOff } from 'lucide-react'
import Breadcrumbs from '../components/Breadcrumbs'
import SEO from '../components/SEO'
import ToolContent from '../components/ToolContent'
import AdSpace from '../components/AdSpace'
import { PRODUCTIVITY_SEO_CONTENT } from '../data/productivityToolsData'

const MODES = {
  work: { label: 'Deep Work', minutes: 25, color: '#6366f1' },
  short: { label: 'Short Break', minutes: 5, color: '#10b981' },
  long: { label: 'Long Break', minutes: 15, color: '#3b82f6' }
}

export default function PomodoroTimer() {
  const [mode, setMode] = useState('work')
  const [timeLeft, setTimeLeft] = useState(MODES[mode].minutes * 60)
  const [isActive, setIsActive] = useState(false)
  const [soundEnabled, setSoundEnabled] = useState(true)
  const [completionNotified, setCompletionNotified] = useState(false)
  
  const timerRef = useRef(null)

  useEffect(() => {
    clearInterval(timerRef.current)

    if (isActive && timeLeft > 0) {
      timerRef.current = setInterval(() => {
        setTimeLeft((prev) => Math.max(prev - 1, 0))
      }, 1000)
      return () => clearInterval(timerRef.current)
    }

    if (timeLeft === 0 && isActive && !completionNotified) {
      setCompletionNotified(true)
      setIsActive(false)
      if (soundEnabled) {
        alert(`${MODES[mode].label} finished!`)
      }
    }

    return () => clearInterval(timerRef.current)
  }, [isActive, timeLeft, mode, soundEnabled, completionNotified])

  const toggleTimer = () => {
    if (timeLeft > 0) {
      setCompletionNotified(false)
    }
    setIsActive((current) => !current)
  }
  
  const resetTimer = () => {
    setIsActive(false)
    setCompletionNotified(false)
    setTimeLeft(MODES[mode].minutes * 60)
  }

  const switchMode = (newMode) => {
    setMode(newMode)
    setIsActive(false)
    setCompletionNotified(false)
    setTimeLeft(MODES[newMode].minutes * 60)
  }

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`
  }

  const progress = 1 - (timeLeft / (MODES[mode].minutes * 60))

  return (
    <>
      <SEO 
        {...PRODUCTIVITY_SEO_CONTENT['pomodoro']}
        path="/productivity-tools/pomodoro"
        breadcrumbs={[{ name: 'Productivity', item: '/productivity-tools' }, { name: 'Focus Clock', item: '/productivity-tools/pomodoro' }]}
      />

      <div className="page-container" style={{ paddingTop: '2rem' }}>
        <Breadcrumbs items={[{ name: 'Productivity', item: '/productivity-tools' }, { name: 'Focus Clock', item: '/productivity-tools/pomodoro' }]} />
        <div className="landing-layout">
          <AdSpace type="side" className="desktop-only" />
          <div className="landing-center" style={{ maxWidth: '900px', margin: '0 auto', width: '100%' }}>
            <AdSpace type="top" />
        <div style={{ textAlign: 'center', marginBottom: '2.5rem', paddingTop: '2rem' }}>
          <h1 style={{ fontSize: '2.5rem', fontWeight: 900, letterSpacing: '-0.03em', marginBottom: '0.75rem' }}>
            Focus <span style={{ color: 'var(--accent-primary)' }}>Clock</span>
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', maxWidth: '500px', margin: '0 auto' }}>
            Aesthetic Pomodoro timer for deep work intervals.
          </p>
        </div>

          <div className="pomodoro-shell" style={{ 
            width: '100%',
            maxWidth: '500px', 
            margin: '0 auto', 
            background: 'var(--bg-card)', 
            padding: 'clamp(1.5rem, 4vw, 3rem)', 
            borderRadius: '40px', 
            border: '1px solid var(--border-color)',
            boxShadow: 'var(--shadow-2xl)',
            textAlign: 'center'
          }}>
            {/* Mode Switcher */}
            <div className="pomodoro-modes" style={{ 
              display: 'flex', 
              background: 'var(--bg-secondary)', 
              padding: '0.5rem', 
              borderRadius: '20px', 
              marginBottom: '3rem',
              gap: '0.25rem'
            }}>
              {Object.entries(MODES).map(([key, config]) => (
                <button
                  key={key}
                  onClick={() => switchMode(key)}
                  style={{
                    flex: 1,
                    padding: '0.75rem',
                    borderRadius: '16px',
                    border: 'none',
                    background: mode === key ? 'var(--bg-card)' : 'transparent',
                    color: mode === key ? MODES[key].color : 'var(--text-muted)',
                    fontSize: '0.85rem',
                    fontWeight: 800,
                    cursor: 'pointer',
                    transition: 'all 0.3s'
                  }}
                >
                    {config.label}
                </button>
              ))}
            </div>

            {/* Timer Display */}
            <div style={{ position: 'relative', width: 'min(80vw, 280px)', height: 'min(80vw, 280px)', margin: '0 auto 3rem' }}>
              <svg width="280" height="280" viewBox="0 0 280 280" style={{ width: '100%', height: '100%' }}>
                    <circle 
                        cx="140" cy="140" r="130" 
                        fill="none" 
                        stroke="var(--bg-secondary)" 
                        strokeWidth="12" 
                    />
                    <motion.circle 
                        cx="140" cy="140" r="130" 
                        fill="none" 
                        stroke={MODES[mode].color} 
                        strokeWidth="12" 
                        strokeLinecap="round"
                        strokeDasharray="816.8"
                        animate={{ strokeDashoffset: 816.8 * progress }}
                        transition={{ duration: 1, ease: 'linear' }}
                        transform="rotate(-90 140 140)"
                    />
                </svg>
                <div style={{ 
                    position: 'absolute', 
                    top: '50%', 
                    left: '50%', 
                    transform: 'translate(-50%, -50%)',
                }}>
                    <div style={{ fontSize: 'clamp(3rem, 12vw, 4.5rem)', fontWeight: 900, fontFamily: 'monospace', letterSpacing: '-0.02em', color: 'var(--text-primary)' }}>
                        {formatTime(timeLeft)}
                    </div>
                    <div style={{ fontSize: '0.85rem', fontWeight: 800, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.2em' }}>
                        {isActive ? 'Keep going' : 'Paused'}
                    </div>
                </div>
            </div>

            {/* Controls */}
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
              <button 
                onClick={resetTimer}
                style={{ background: 'var(--bg-secondary)', border: 'none', color: 'var(--text-secondary)', padding: '1.1rem', borderRadius: '24px', cursor: 'pointer' }}
              >
                <RotateCcw size={24} />
              </button>
              
              <button 
                onClick={toggleTimer}
                style={{ 
                  background: MODES[mode].color, 
                  color: 'white', 
                  border: 'none', 
                  width: 'clamp(72px, 20vw, 80px)', 
                  height: 'clamp(72px, 20vw, 80px)', 
                  borderRadius: '30px', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center', 
                  cursor: 'pointer',
                  boxShadow: `0 10px 30px ${MODES[mode].color}44`
                }}
              >
                {isActive ? <Pause size={32} fill="white" /> : <Play size={32} fill="white" style={{ marginLeft: '4px' }} />}
              </button>

              <button 
                onClick={() => setSoundEnabled(!soundEnabled)}
                style={{ background: 'var(--bg-secondary)', border: 'none', color: 'var(--text-secondary)', padding: '1.1rem', borderRadius: '24px', cursor: 'pointer' }}
              >
                {soundEnabled ? <Bell size={24} /> : <BellOff size={24} />}
              </button>
            </div>
          </div>

          <AdSpace type="bottom" style={{ marginTop: '4rem' }} />
          <div style={{ marginTop: '6rem' }}>
            <ToolContent {...PRODUCTIVITY_SEO_CONTENT['pomodoro']} />
          </div>
              </div>
            <AdSpace type="side" className="desktop-only" />
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        @media (max-width: 768px) {
          .pomodoro-shell {
            padding: 1.25rem !important;
            border-radius: 28px !important;
          }

          .pomodoro-modes {
            margin-bottom: 1.5rem !important;
          }
        }
      `}} />
    </>
  )
}
