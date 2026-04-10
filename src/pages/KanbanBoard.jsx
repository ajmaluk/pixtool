import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Plus, Trash2, ChevronRight, ChevronLeft
} from 'lucide-react'
import Breadcrumbs from '../components/Breadcrumbs'
import SEO from '../components/SEO'
import ToolContent from '../components/ToolContent'
import AdSpace from '../components/AdSpace'
import { ALL_TOOLS_MAP } from '../data/tools'
import { readStoredJson, writeStoredJson } from '../utils/browserStorage'

const toolData = ALL_TOOLS_MAP['kanban']

const COLUMNS = [
  { id: 'todo', title: 'To Do', color: '#6366f1' },
  { id: 'progress', title: 'In Progress', color: '#f59e0b' },
  { id: 'done', title: 'Done', color: '#10b981' }
]

export default function KanbanBoard() {
  const [cards, setCards] = useState(() => readStoredJson('pt_kanban_cards', []))
  const [isAdding, setIsAdding] = useState(null)
  const [newTitle, setNewTitle] = useState('')

  useEffect(() => {
    writeStoredJson('pt_kanban_cards', cards)
  }, [cards])

  const addCard = (columnId) => {
    if (!newTitle.trim()) return
    const newCard = {
      id: crypto.randomUUID(),
      title: newTitle.trim(),
      columnId,
      createdAt: new Date().toISOString()
    }
    setCards([...cards, newCard])
    setNewTitle('')
    setIsAdding(null)
  }

  const moveCard = (cardId, direction) => {
    const currentCard = cards.find(ca => ca.id === cardId)
    if (!currentCard) return

    const currentIndex = COLUMNS.findIndex(c => c.id === currentCard.columnId)
    const nextIndex = currentIndex + direction
    if (nextIndex >= 0 && nextIndex < COLUMNS.length) {
      setCards(cards.map(c => c.id === cardId ? { ...c, columnId: COLUMNS[nextIndex].id } : c))
    }
  }

  const deleteCard = (id) => {
    setCards(cards.filter(c => c.id !== id))
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
          <div className="landing-center" style={{ maxWidth: '1400px', margin: '0 auto', width: '100%' }}>
            <AdSpace type="top" />
        <div style={{ textAlign: 'center', marginBottom: '2.5rem', paddingTop: '2rem' }}>
          <h1 style={{ fontSize: '2.5rem', fontWeight: 900, letterSpacing: '-0.03em', marginBottom: '0.75rem' }}>
            Kanban <span style={{ color: 'var(--accent-primary)' }}>Board</span>
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', maxWidth: '500px', margin: '0 auto' }}>
            Visual project tracking with priority-focused columns. 100% private.
          </p>
        </div>

        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(3, 1fr)', 
          gap: '1.5rem',
          alignItems: 'start'
        }}>
          {COLUMNS.map(column => (
            <div key={column.id} style={{ 
              background: 'var(--bg-secondary)', 
              borderRadius: '24px', 
              padding: '1.5rem',
              border: '1px solid var(--border-color)',
              minHeight: '500px',
              display: 'flex',
              flexDirection: 'column',
              gap: '1rem'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: column.color }} />
                  <h3 style={{ fontSize: '1rem', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.05em' }}>{column.title}</h3>
                  <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: 800 }}>({cards.filter(c => c.columnId === column.id).length})</span>
                </div>
                <button 
                  onClick={() => setIsAdding(column.id)}
                  style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}
                >
                  <Plus size={20} />
                </button>
              </div>

              {isAdding === column.id && (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  style={{ 
                    background: 'var(--bg-card)', 
                    padding: '1.25rem', 
                    borderRadius: '16px', 
                    border: `1px solid ${column.color}`,
                    boxShadow: 'var(--shadow-md)'
                  }}
                >
                  <input
                    autoFocus
                    placeholder="Card title..."
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && addCard(column.id)}
                    style={{
                      width: '100%',
                      background: 'none',
                      border: 'none',
                      fontSize: '0.95rem',
                      fontWeight: 700,
                      color: 'var(--text-primary)',
                      outline: 'none',
                      marginBottom: '1rem'
                    }}
                  />
                  <div style={{ display: 'flex', gap: '0.5rem' }}>
                    <button 
                      onClick={() => addCard(column.id)}
                      className="btn btn-primary dense" 
                      style={{ padding: '0.4rem 0.8rem', fontSize: '0.75rem', borderRadius: '8px' }}
                    >
                      Add Card
                    </button>
                    <button 
                      onClick={() => setIsAdding(null)}
                      className="btn btn-secondary dense" 
                      style={{ padding: '0.4rem 0.8rem', fontSize: '0.75rem', borderRadius: '8px' }}
                    >
                      Cancel
                    </button>
                  </div>
                </motion.div>
              )}

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', flex: 1 }}>
                <AnimatePresence initial={false}>
                  {cards.filter(c => c.columnId === column.id).map(card => (
                    <motion.div
                      key={card.id}
                      layout
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      whileHover={{ y: -2 }}
                      style={{
                        background: 'var(--bg-card)',
                        padding: '1.25rem',
                        borderRadius: '18px',
                        border: '1px solid var(--border-color)',
                        boxShadow: 'var(--shadow-sm)',
                        position: 'relative'
                      }}
                    >
                      <div style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '1rem', lineHeight: 1.4 }}>
                        {card.title}
                      </div>
                      
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div style={{ display: 'flex', gap: '0.5rem' }}>
                          <button 
                            onClick={() => moveCard(card.id, -1)}
                            disabled={column.id === 'todo'}
                            style={{ 
                              background: 'var(--bg-secondary)', 
                              border: '1px solid var(--border-color)', 
                              borderRadius: '8px', 
                              padding: '4px',
                              color: column.id === 'todo' ? 'transparent' : 'var(--text-muted)',
                              cursor: column.id === 'todo' ? 'default' : 'pointer'
                            }}
                          >
                            <ChevronLeft size={16} />
                          </button>
                          <button 
                            onClick={() => moveCard(card.id, 1)}
                            disabled={column.id === 'done'}
                            style={{ 
                              background: 'var(--bg-secondary)', 
                              border: '1px solid var(--border-color)', 
                              borderRadius: '8px', 
                              padding: '4px',
                              color: column.id === 'done' ? 'transparent' : 'var(--text-muted)',
                              cursor: column.id === 'done' ? 'default' : 'pointer'
                            }}
                          >
                            <ChevronRight size={16} />
                          </button>
                        </div>

                        <button 
                          onClick={() => deleteCard(card.id)}
                          style={{
                            background: 'none',
                            border: 'none',
                            color: 'var(--text-muted)',
                            cursor: 'pointer',
                            padding: '4px'
                          }}
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>

              {cards.filter(c => c.columnId === column.id).length === 0 && !isAdding && (
                <div style={{ 
                  flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: 'var(--text-muted)', fontSize: '0.85rem', opacity: 0.6
                }}>
                  No cards yet
                </div>
              )}
            </div>
          ))}
        </div>

        <style>{`
          @media (max-width: 900px) {
            .page-container [style*="grid-template-columns: repeat(3"] {
              grid-template-columns: 1fr !important;
            }
          }
        `}</style>

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
