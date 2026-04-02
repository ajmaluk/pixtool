import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Plus, Trash2, CheckCircle, Circle, AlertCircle, 
  Clock, Tag, Filter, ChevronDown, Check, X,
  Briefcase, User, GraduationCap, Zap
} from 'lucide-react'
import Breadcrumbs from '../components/Breadcrumbs'
import SEO from '../components/SEO'
import ToolContent from '../components/ToolContent'
import AdSpace from '../components/AdSpace'
import { PRODUCTIVITY_SEO_CONTENT } from '../data/productivityToolsData'
import { readStoredJson, writeStoredJson } from '../utils/browserStorage'

const CATEGORIES = [
  { id: 'all', name: 'All Tasks', icon: Tag, color: 'var(--text-secondary)' },
  { id: 'work', name: 'Work', icon: Briefcase, color: '#3b82f6' },
  { id: 'personal', name: 'Personal', icon: User, color: '#10b981' },
  { id: 'education', name: 'Education', icon: GraduationCap, color: '#f59e0b' },
  { id: 'urgent', name: 'Urgent', icon: Zap, color: '#ef4444' }
]

const PRIORITIES = [
  { id: 'low', name: 'Low', color: '#10b981', bg: 'rgba(16, 185, 129, 0.1)' },
  { id: 'medium', name: 'Medium', color: '#f59e0b', bg: 'rgba(245, 158, 11, 0.1)' },
  { id: 'high', name: 'High', color: '#ef4444', bg: 'rgba(239, 68, 68, 0.1)' }
]

export default function Todo() {
  const [tasks, setTasks] = useState(() => readStoredJson('pt_todo_tasks', []))
  const [input, setInput] = useState('')
  const [priority, setPriority] = useState('medium')
  const [category, setCategory] = useState('work')
  const [activeFilter, setActiveFilter] = useState('all')

  useEffect(() => {
    writeStoredJson('pt_todo_tasks', tasks)
  }, [tasks])

  const addTask = (e) => {
    e.preventDefault()
    if (!input.trim()) return
    const newTask = {
      id: Date.now().toString(),
      text: input.trim(),
      priority,
      category,
      completed: false,
      createdAt: new Date().toISOString()
    }
    setTasks([newTask, ...tasks])
    setInput('')
  }

  const toggleTask = (id) => {
    setTasks(tasks.map(t => t.id === id ? { ...t, completed: !t.completed } : t))
  }

  const deleteTask = (id) => {
    setTasks(tasks.filter(t => t.id !== id))
  }

  const clearCompleted = () => {
    setTasks(tasks.filter(t => !t.completed))
  }

  const filteredTasks = tasks.filter(t => activeFilter === 'all' || t.category === activeFilter)
  const completedCount = tasks.filter(t => t.completed).length

  return (
    <>
      <SEO 
        {...PRODUCTIVITY_SEO_CONTENT['todo']}
        path="/productivity-tools/todo"
        breadcrumbs={[{ name: 'Productivity', item: '/productivity-tools' }, { name: 'Todo List', item: '/productivity-tools/todo' }]}
      />

      <div className="page-container" style={{ paddingTop: '2rem' }}>
        <Breadcrumbs items={[{ name: 'Productivity', item: '/productivity-tools' }, { name: 'Todo List', item: '/productivity-tools/todo' }]} />
        <div className="landing-layout">
          <AdSpace type="side" className="desktop-only" />
          <div className="landing-center" style={{ maxWidth: '900px', margin: '0 auto', width: '100%' }}>
            <AdSpace type="top" />
        <div style={{ textAlign: 'center', marginBottom: '2.5rem', paddingTop: '2rem' }}>
          <h1 style={{ fontSize: '2.5rem', fontWeight: 900, letterSpacing: '-0.03em', marginBottom: '0.75rem' }}>
            Todo <span style={{ color: 'var(--accent-primary)' }}>List</span>
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', maxWidth: '500px', margin: '0 auto' }}>
            High-performance task management with complete privacy.
          </p>
        </div>

          <div className="todo-container" style={{ maxWidth: '800px', margin: '0 auto' }}>
            {/* Quick Actions Bar */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem', gap: '1rem', flexWrap: 'wrap' }}>
              <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                {CATEGORIES.map(cat => (
                  <button
                    key={cat.id}
                    onClick={() => setActiveFilter(cat.id)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      padding: '0.6rem 1rem',
                      borderRadius: '100px',
                      border: '1px solid var(--border-color)',
                      background: activeFilter === cat.id ? 'var(--accent-primary)' : 'var(--bg-card)',
                      color: activeFilter === cat.id ? 'white' : 'var(--text-secondary)',
                      fontSize: '0.85rem',
                      fontWeight: 700,
                      cursor: 'pointer',
                      transition: 'var(--transition-base)'
                    }}
                  >
                    <cat.icon size={14} /> {cat.name}
                  </button>
                ))}
              </div>
              
              {completedCount > 0 && (
                <button 
                  onClick={clearCompleted}
                  style={{ color: 'var(--accent-red)', background: 'none', border: 'none', fontSize: '0.85rem', fontWeight: 700, cursor: 'pointer' }}
                >
                  Clear Completed ({completedCount})
                </button>
              )}
            </div>

            {/* Input Section */}
            <form onSubmit={addTask} style={{ 
              background: 'var(--bg-card)', 
              padding: '1.5rem', 
              borderRadius: '24px', 
              border: '1px solid var(--border-color)',
              boxShadow: 'var(--shadow-lg)',
              marginBottom: '2rem'
            }}>
              <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.25rem' }}>
                <input
                  type="text"
                  placeholder="What needs to be done?"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  style={{
                    flex: 1,
                    background: 'var(--bg-secondary)',
                    border: '1px solid var(--border-color)',
                    borderRadius: '14px',
                    padding: '1rem 1.25rem',
                    fontSize: '1rem',
                    color: 'var(--text-primary)',
                    outline: 'none'
                  }}
                />
                <button 
                  type="submit"
                  disabled={!input.trim()}
                  style={{
                    background: 'var(--accent-primary)',
                    color: 'white',
                    border: 'none',
                    borderRadius: '14px',
                    padding: '0 1.5rem',
                    fontWeight: 800,
                    cursor: input.trim() ? 'pointer' : 'not-allowed',
                    opacity: input.trim() ? 1 : 0.6
                  }}
                >
                  <Plus size={20} />
                </button>
              </div>

              <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <span style={{ fontSize: '0.8rem', fontWeight: 800, color: 'var(--text-muted)', textTransform: 'uppercase' }}>Priority</span>
                  <div style={{ display: 'flex', gap: '0.5rem' }}>
                    {PRIORITIES.map(p => (
                      <button
                        key={p.id}
                        type="button"
                        onClick={() => setPriority(p.id)}
                        style={{
                          padding: '0.5rem 0.75rem',
                          borderRadius: '8px',
                          border: priority === p.id ? `2px solid ${p.color}` : '1px solid var(--border-color)',
                          background: priority === p.id ? p.bg : 'var(--bg-secondary)',
                          color: p.color,
                          fontSize: '0.75rem',
                          fontWeight: 800,
                          cursor: 'pointer'
                        }}
                      >
                        {p.name}
                      </button>
                    ))}
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <span style={{ fontSize: '0.8rem', fontWeight: 800, color: 'var(--text-muted)', textTransform: 'uppercase' }}>Category</span>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    style={{
                      background: 'var(--bg-secondary)',
                      border: '1px solid var(--border-color)',
                      borderRadius: '8px',
                      padding: '0.4rem 0.75rem',
                      fontSize: '0.85rem',
                      fontWeight: 700,
                      color: 'var(--text-primary)',
                      outline: 'none'
                    }}
                  >
                    {CATEGORIES.filter(c => c.id !== 'all').map(c => (
                      <option key={c.id} value={c.id}>{c.name}</option>
                    ))}
                  </select>
                </div>
              </div>
            </form>

            {/* Task List */}
            <div style={{ display: 'grid', gap: '0.75rem' }}>
              <AnimatePresence initial={false} mode="popLayout">
                {filteredTasks.length > 0 ? (
                  filteredTasks.map(task => (
                    <motion.div
                      key={task.id}
                      layout
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      className={`todo-item ${task.completed ? 'completed' : ''}`}
                      style={{
                        background: 'var(--bg-card)',
                        padding: '1.25rem',
                        borderRadius: '20px',
                        border: '1px solid var(--border-color)',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '1rem',
                        boxShadow: 'var(--shadow-sm)'
                      }}
                    >
                      <button 
                        onClick={() => toggleTask(task.id)}
                        style={{ background: 'none', border: 'none', cursor: 'pointer', color: task.completed ? 'var(--accent-emerald)' : 'var(--border-hover)', padding: 0 }}
                      >
                        {task.completed ? <CheckCircle size={24} /> : <Circle size={24} />}
                      </button>

                      <div style={{ flex: 1 }}>
                        <div style={{ 
                          fontSize: '1.05rem', 
                          fontWeight: 700, 
                          color: task.completed ? 'var(--text-muted)' : 'var(--text-primary)',
                          textDecoration: task.completed ? 'line-through' : 'none',
                          marginBottom: '0.25rem'
                        }}>
                          {task.text}
                        </div>
                        <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
                          <span style={{ 
                            fontSize: '0.7rem', 
                            fontWeight: 800, 
                            padding: '2px 8px', 
                            borderRadius: '6px', 
                            background: PRIORITIES.find(p => p.id === task.priority)?.bg,
                            color: PRIORITIES.find(p => p.id === task.priority)?.color,
                            textTransform: 'uppercase'
                          }}>
                            {task.priority}
                          </span>
                          <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                            <Tag size={12} /> {CATEGORIES.find(c => c.id === task.category)?.name}
                          </span>
                        </div>
                      </div>

                      <button 
                        onClick={() => deleteTask(task.id)}
                        style={{ 
                          background: 'none', 
                          border: 'none', 
                          cursor: 'pointer', 
                          color: 'var(--text-muted)', 
                          padding: '8px',
                          borderRadius: '10px',
                          transition: 'var(--transition-base)'
                        }}
                        className="btn-icon-hover"
                      >
                        <Trash2 size={18} />
                      </button>
                    </motion.div>
                  ))
                ) : (
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    style={{ textAlign: 'center', padding: '4rem 2rem', color: 'var(--text-muted)' }}
                  >
                    <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🎉</div>
                    <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '0.5rem' }}>All Caught Up!</h3>
                    <p style={{ fontSize: '0.9rem' }}>No tasks found in this category. Time to relax or add a new goal.</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          <AdSpace type="bottom" style={{ marginTop: '4rem' }} />
          <div style={{ marginTop: '6rem' }}>
            <ToolContent {...PRODUCTIVITY_SEO_CONTENT['todo']} />
          </div>
              </div>
            <AdSpace type="side" className="desktop-only" />
        </div>
      </div>
    </>
  )
}
