import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Plus, Check, X, Trash2, 
  TrendingUp, Award, Calendar, 
  ChevronRight, ChevronLeft, Zap
} from 'lucide-react'
import Breadcrumbs from '../components/Breadcrumbs'
import SEO from '../components/SEO'
import ToolContent from '../components/ToolContent'
import AdSpace from '../components/AdSpace'
import { PRODUCTIVITY_SEO_CONTENT } from '../data/productivityToolsData'
import { readStoredJson, writeStoredJson } from '../utils/browserStorage'

export default function HabitTracker() {
  const [habits, setHabits] = useState(() => readStoredJson('pt_habit_tracker', []))
  const [newHabitName, setNewHabitName] = useState('')

  useEffect(() => {
    writeStoredJson('pt_habit_tracker', habits)
  }, [habits])

  // Get last 7 days including today
  const getDates = () => {
    const dates = []
    for (let i = 6; i >= 0; i--) {
      const d = new Date()
      d.setDate(d.getDate() - i)
      dates.push(d.toISOString().slice(0, 10))
    }
    return dates
  }

  const dates = getDates()

  const addHabit = () => {
    if (!newHabitName.trim()) return
    const newHabit = {
      id: Date.now().toString(),
      name: newHabitName.trim(),
      history: {}, // { "YYYY-MM-DD": true }
      createdAt: new Date().toISOString()
    }
    setHabits([...habits, newHabit])
    setNewHabitName('')
  }

  const toggleHabitDate = (habitId, date) => {
    setHabits(habits.map(h => {
      if (h.id === habitId) {
        const newHistory = { ...h.history }
        if (newHistory[date]) {
          delete newHistory[date]
        } else {
          newHistory[date] = true
        }
        return { ...h, history: newHistory }
      }
      return h
    }))
  }

  const deleteHabit = (id) => {
    if (confirm('Delete this habit and all its history?')) {
      setHabits(habits.filter(h => h.id !== id))
    }
  }

  const calculateStreak = (history) => {
    let streak = 0
    const today = new Date().toISOString().slice(0, 10)
    let current = new Date()
    
    // Check back from today
    while (true) {
      const dateStr = current.toISOString().slice(0, 10)
      if (history[dateStr]) {
        streak++
        current.setDate(current.getDate() - 1)
      } else {
        // If today is not checked, check yesterday to keep streak alive if today still exists
        if (dateStr === today) {
            current.setDate(current.getDate() - 1)
            continue
        }
        break
      }
    }
    return streak
  }

  return (
    <>
      <SEO 
        {...PRODUCTIVITY_SEO_CONTENT['habit-tracker']}
        path="/productivity-tools/habit-tracker"
        breadcrumbs={[{ name: 'Productivity', item: '/productivity-tools' }, { name: 'Habit Tracker', item: '/productivity-tools/habit-tracker' }]}
      />

      <div className="page-container" style={{ paddingTop: '2rem' }}>
        <Breadcrumbs items={[{ name: 'Productivity', item: '/productivity-tools' }, { name: 'Habit Tracker', item: '/productivity-tools/habit-tracker' }]} />
        <div className="landing-layout">
          <AdSpace type="side" className="desktop-only" />
          <div className="landing-center" style={{ maxWidth: '900px', margin: '0 auto', width: '100%' }}>
            <AdSpace type="top" />
        <div style={{ textAlign: 'center', marginBottom: '2.5rem', paddingTop: '2rem' }}>
          <h1 style={{ fontSize: '2.5rem', fontWeight: 900, letterSpacing: '-0.03em', marginBottom: '0.75rem' }}>
            Habit <span style={{ color: 'var(--accent-primary)' }}>Tracker</span>
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', maxWidth: '500px', margin: '0 auto' }}>
            Build lasting discipline with visual consistency tracking.
          </p>
        </div>

          <div style={{ maxWidth: '900px', margin: '0 auto' }}>
            {/* Input Section */}
            <div style={{ 
              background: 'var(--bg-card)', 
              padding: '1.5rem', 
              borderRadius: '24px', 
              border: '1px solid var(--border-color)',
              marginBottom: '2rem',
              display: 'flex',
              gap: '1rem',
              boxShadow: 'var(--shadow-lg)'
            }}>
              <input
                type="text"
                placeholder="Name your new habit (e.g. Morning Meditation)"
                value={newHabitName}
                onChange={(e) => setNewHabitName(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && addHabit()}
                style={{
                  flex: 1,
                  background: 'var(--bg-secondary)',
                  border: '1px solid var(--border-color)',
                  borderRadius: '12px',
                  padding: '0.75rem 1.25rem',
                  fontSize: '1rem',
                  color: 'var(--text-primary)',
                  outline: 'none'
                }}
              />
              <button 
                onClick={addHabit}
                disabled={!newHabitName.trim()}
                style={{
                  background: 'var(--accent-primary)',
                  color: 'white',
                  border: 'none',
                  borderRadius: '12px',
                  padding: '0 1.5rem',
                  fontWeight: 800,
                  cursor: 'pointer',
                  opacity: newHabitName.trim() ? 1 : 0.6
                }}
              >
                <Plus size={20} />
              </button>
            </div>

            {/* Habit Grid */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <AnimatePresence>
                {habits.length > 0 ? (
                  habits.map(habit => (
                    <motion.div
                      key={habit.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      style={{
                        background: 'var(--bg-card)',
                        padding: '1.5rem',
                        borderRadius: '24px',
                        border: '1px solid var(--border-color)',
                        display: 'grid',
                        gridTemplateColumns: 'minmax(200px, 1fr) auto',
                        gap: '2rem',
                        alignItems: 'center',
                        boxShadow: 'var(--shadow-sm)'
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                         <div style={{ background: 'var(--bg-secondary)', padding: '10px', borderRadius: '12px', color: 'var(--accent-primary)' }}>
                            <Zap size={24} fill={calculateStreak(habit.history) > 0 ? 'var(--accent-primary)' : 'none'} />
                         </div>
                         <div>
                            <h3 style={{ fontSize: '1.2rem', fontWeight: 900, color: 'var(--text-primary)', marginBottom: '0.25rem' }}>{habit.name}</h3>
                            <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                                <span style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--accent-primary)', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                                    <TrendingUp size={14} /> Streak: {calculateStreak(habit.history)} days
                                </span>
                                <button onClick={() => deleteHabit(habit.id)} style={{ background: 'none', border: 'none', color: 'var(--text-muted)', fontSize: '0.75rem', cursor: 'pointer', padding: 0 }}>Delete</button>
                            </div>
                         </div>
                      </div>

                      <div style={{ display: 'flex', gap: '0.5rem' }}>
                        {dates.map((date, idx) => {
                          const isToday = idx === 6
                          const isDone = habit.history[date]
                          const dayName = new Date(date).toLocaleDateString('en-US', { weekday: 'short' }).charAt(0)
                          return (
                            <div key={date} style={{ textAlign: 'center' }}>
                                <div style={{ fontSize: '0.7rem', fontWeight: 900, color: isToday ? 'var(--accent-primary)' : 'var(--text-muted)', marginBottom: '0.5rem', textTransform: 'uppercase' }}>
                                    {dayName}
                                </div>
                                <button
                                    onClick={() => toggleHabitDate(habit.id, date)}
                                    style={{
                                        width: '40px',
                                        height: '40px',
                                        borderRadius: '12px',
                                        border: '2px solid',
                                        borderColor: isDone ? 'var(--accent-emerald)' : 'var(--border-color)',
                                        background: isDone ? 'var(--accent-emerald)' : 'var(--bg-secondary)',
                                        color: 'white',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        cursor: 'pointer',
                                        transition: 'all 0.2s',
                                        transform: isDone ? 'scale(1.05)' : 'scale(1)'
                                    }}
                                >
                                    {isDone && <Check size={20} strokeWidth={4} />}
                                </button>
                            </div>
                          )
                        })}
                      </div>
                    </motion.div>
                  ))
                ) : (
                  <div style={{ textAlign: 'center', padding: '5rem 0', color: 'var(--text-muted)' }}>
                    < Award size={48} style={{ marginBottom: '1.5rem', opacity: 0.5 }} />
                    <h2 style={{ fontSize: '1.5rem', fontWeight: 900 }}>Start Your Journey</h2>
                    <p style={{ opacity: 0.7 }}>Add a daily habit you want to build and track your progress.</p>
                  </div>
                )}
              </AnimatePresence>
            </div>
          </div>

          <AdSpace type="bottom" style={{ marginTop: '4rem' }} />
          <div style={{ marginTop: '6rem' }}>
            <ToolContent {...PRODUCTIVITY_SEO_CONTENT['habit-tracker']} />
          </div>
              </div>
            <AdSpace type="side" className="desktop-only" />
        </div>
      </div>
    </>
  )
}
