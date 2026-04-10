import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus, Trash2, Maximize2, GripVertical, Pin, Palette } from 'lucide-react'
import Breadcrumbs from '../components/Breadcrumbs'
import SEO from '../components/SEO'
import ToolContent from '../components/ToolContent'
import AdSpace from '../components/AdSpace'
import { ALL_TOOLS_MAP } from '../data/tools'
import { readStoredJson, writeStoredJson } from '../utils/browserStorage'

const toolData = ALL_TOOLS_MAP['sticky-notes']

const COLORS = [
  { id: 'yellow', bg: '#fef3c7', text: '#92400e', border: '#fcd34d' },
  { id: 'blue', bg: '#dbeafe', text: '#1e40af', border: '#93c5fd' },
  { id: 'green', bg: '#d1fae5', text: '#065f46', border: '#6ee7b7' },
  { id: 'pink', bg: '#fce7f3', text: '#9d174d', border: '#f9a8d4' },
  { id: 'purple', bg: '#f3e8ff', text: '#6b21a8', border: '#d8b4fe' }
]

export default function StickyNotes() {
  const [notes, setNotes] = useState(() => readStoredJson('pt_sticky_notes', []))

  useEffect(() => {
    writeStoredJson('pt_sticky_notes', notes)
  }, [notes])

  const addNote = () => {
    const newNote = {
      id: Date.now().toString(),
      text: '',
      colorId: 'yellow',
      x: 50 + Math.random() * 100,
      y: 50 + Math.random() * 100,
      rotation: Math.random() * 4 - 2
    }
    setNotes([...notes, newNote])
  }

  const updateNote = (id, text) => {
    setNotes(notes.map(n => n.id === id ? { ...n, text } : n))
  }

  const updateColor = (id, colorId) => {
    setNotes(notes.map(n => n.id === id ? { ...n, colorId } : n))
  }

  const deleteNote = (id) => {
    setNotes(notes.filter(n => n.id !== id))
  }

  return (
    <>
      <SEO 
        {...toolData.seo}
        path={toolData.path}
        breadcrumbs={[{ name: 'Productivity', item: '/productivity-tools' }, { name: toolData.title, item: toolData.path }]}
      />

      <div className="page-container" style={{ paddingTop: '2rem' }}>
        <Breadcrumbs items={[{ name: 'Productivity', item: '/productivity-tools' }, { name: toolData.title, item: toolData.path }]} />
        <div className="landing-layout">
          <AdSpace type="side" className="desktop-only" />
          <div className="landing-center" style={{ maxWidth: '1200px', margin: '0 auto', width: '100%' }}>
            <AdSpace type="top" />
        <div style={{ textAlign: 'center', marginBottom: '2.5rem', paddingTop: '2rem' }}>
          <h1 style={{ fontSize: '2.5rem', fontWeight: 900, letterSpacing: '-0.03em', marginBottom: '0.75rem' }}>
            Sticky <span style={{ color: 'var(--accent-primary)' }}>Notes</span>
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', maxWidth: '500px', margin: '0 auto' }}>
            Color-coded virtual notes for brainstorming and quick reminders.
          </p>
        </div>

        <div style={{ 
          background: 'var(--bg-secondary)', 
          borderRadius: '32px', 
          border: '1px solid var(--border-color)',
          minHeight: '70vh',
          position: 'relative',
          padding: '2rem',
          backgroundImage: 'radial-gradient(var(--border-color) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
          overflow: 'hidden'
        }}>
          {/* Board Actions */}
          <div style={{ position: 'absolute', top: '1.5rem', right: '1.5rem', zIndex: 10 }}>
            <button 
              onClick={addNote}
              className="btn btn-primary" 
              style={{ borderRadius: '100px', display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '1rem 2rem', boxShadow: '0 10px 20px rgba(99, 102, 241, 0.3)' }}
            >
              <Plus size={24} /> New Note
            </button>
          </div>

          {/* Notes Layer */}
          <div style={{ position: 'relative', width: '100%', height: '100%' }}>
            <AnimatePresence>
              {notes.map(note => {
                const color = COLORS.find(c => c.id === note.colorId)
                return (
                  <motion.div
                    key={note.id}
                    drag
                    dragMomentum={false}
                    initial={{ opacity: 0, scale: 0.8, rotate: note.rotation }}
                    animate={{ opacity: 1, scale: 1, rotate: note.rotation }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    style={{
                      position: 'absolute',
                      left: note.x,
                      top: note.y,
                      width: '260px',
                      minHeight: '260px',
                      background: color.bg,
                      color: color.text,
                      padding: '1.5rem',
                      borderRadius: '4px',
                      boxShadow: '0 10px 25px rgba(0,0,0,0.1)',
                      border: `1px solid ${color.border}`,
                      display: 'flex',
                      flexDirection: 'column',
                      zIndex: 1
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem', opacity: 0.6 }}>
                        <GripVertical size={18} className="drag-handle" style={{ cursor: 'grab' }} />
                        <div style={{ display: 'flex', gap: '0.5rem' }}>
                            <button 
                                onClick={() => {
                                    const nextColor = COLORS[(COLORS.findIndex(c => c.id === note.colorId) + 1) % COLORS.length]
                                    updateColor(note.id, nextColor.id)
                                }}
                                style={{ background: 'none', border: 'none', color: 'inherit', padding: 0 }}
                            >
                                <Palette size={16} />
                            </button>
                            <button 
                                onClick={() => deleteNote(note.id)}
                                style={{ background: 'none', border: 'none', color: 'inherit', padding: 0 }}
                            >
                                <Trash2 size={16} />
                            </button>
                        </div>
                    </div>
                    
                    <textarea
                      value={note.text}
                      onChange={(e) => updateNote(note.id, e.target.value)}
                      placeholder="Type something..."
                      style={{
                        flex: 1,
                        background: 'none',
                        border: 'none',
                        outline: 'none',
                        resize: 'none',
                        fontSize: '1.1rem',
                        fontWeight: 700,
                        color: 'inherit',
                        lineHeight: 1.4,
                        fontFamily: 'inherit'
                      }}
                    />
                    
                    <div style={{ textAlign: 'right', opacity: 0.3, marginTop: '0.5rem' }}>
                        <Pin size={14} />
                    </div>
                  </motion.div>
                )
              })}
            </AnimatePresence>

            {notes.length === 0 && (
                <div style={{ 
                    position: 'absolute', 
                    top: '50%', 
                    left: '50%', 
                    transform: 'translate(-50%, -50%)', 
                    textAlign: 'center', 
                    color: 'var(--text-muted)' 
                }}>
                    <Plus size={48} style={{ marginBottom: '1.5rem', opacity: 0.5 }} />
                    <h2 style={{ fontSize: '1.5rem', fontWeight: 900 }}>Create Your First Note</h2>
                    <p style={{ opacity: 0.7 }}>Click the button above to start brainstorming.</p>
                </div>
            )}
          </div>
        </div>

          <AdSpace type="bottom" style={{ marginTop: '4rem' }} />
          <div style={{ marginTop: '6rem' }}>
            <ToolContent {...toolData} />
          </div>
              </div>
            <AdSpace type="side" className="desktop-only" />
        </div>
      </div>
    </>
  )
}
