import { useState, useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import { 
  Pencil, Eraser, Trash2, Download, 
  RotateCcw, Undo2, Square, Circle, 
  Maximize2, MousePointer2, Palette,
  Minus, Plus, Type
} from 'lucide-react'
import Breadcrumbs from '../components/Breadcrumbs'
import SEO from '../components/SEO'
import ToolContent from '../components/ToolContent'
import AdSpace from '../components/AdSpace'
import { PRODUCTIVITY_SEO_CONTENT } from '../data/productivityToolsData'

const COLORS = [
  '#000000', '#ffffff', '#ef4444', '#f59e0b', 
  '#10b981', '#3b82f6', '#6366f1', '#8b5cf6', 
  '#ec4899', '#64748b'
]

export default function DrawingBoard() {
  const canvasRef = useRef(null)
  const contextRef = useRef(null)
  const [isDrawing, setIsDrawing] = useState(false)
  const [color, setColor] = useState('#000000')
  const [brushSize, setBrushSize] = useState(5)
  const [tool, setTool] = useState('pencil') // pencil, eraser

  const setupCanvas = () => {
    const canvas = canvasRef.current
    if (!canvas) return

    const scale = window.devicePixelRatio || 1
    const rect = canvas.getBoundingClientRect()
    canvas.width = Math.max(1, Math.floor(rect.width * scale))
    canvas.height = Math.max(1, Math.floor(rect.height * scale))

    const context = canvas.getContext('2d')
    if (!context) return

    context.setTransform(scale, 0, 0, scale, 0, 0)
    context.lineCap = 'round'
    context.strokeStyle = tool === 'eraser' ? '#ffffff' : color
    context.lineWidth = brushSize
    contextRef.current = context

    // Fill with white background for clear PNG exports
    context.fillStyle = '#ffffff'
    context.fillRect(0, 0, canvas.clientWidth, canvas.clientHeight)
  }

  useEffect(() => {
    setupCanvas()

    const handleResize = () => setupCanvas()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
    // setupCanvas intentionally runs once on mount and window resize.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (contextRef.current) {
      contextRef.current.strokeStyle = tool === 'eraser' ? '#ffffff' : color
      contextRef.current.lineWidth = brushSize
    }
  }, [color, brushSize, tool])

  const getPoint = (event) => {
    const canvas = canvasRef.current
    const rect = canvas.getBoundingClientRect()
    return {
      x: event.clientX - rect.left,
      y: event.clientY - rect.top
    }
  }

  const startDrawing = (event) => {
    if (!contextRef.current) return
    const { x, y } = getPoint(event.nativeEvent)
    contextRef.current.beginPath()
    contextRef.current.moveTo(x, y)
    setIsDrawing(true)
    event.currentTarget.setPointerCapture?.(event.nativeEvent.pointerId)
  }

  const finishDrawing = () => {
    if (!contextRef.current) return
    contextRef.current.closePath()
    setIsDrawing(false)
  }

  const draw = (event) => {
    if (!isDrawing || !contextRef.current) return
    const { x, y } = getPoint(event.nativeEvent)
    contextRef.current.lineTo(x, y)
    contextRef.current.stroke()
  }

  const clearCanvas = () => {
    const canvas = canvasRef.current
    if (!canvas || !contextRef.current) return
    const context = canvas.getContext('2d')
    context.fillStyle = '#ffffff'
    context.fillRect(0, 0, canvas.clientWidth, canvas.clientHeight)
  }

  const handleDownload = () => {
    const canvas = canvasRef.current
    if (!canvas) return
    const link = document.createElement('a')
    link.download = `pixtool-drawing-${Date.now()}.png`
    link.href = canvas.toDataURL()
    link.click()
  }

  return (
    <>
      <SEO 
        {...PRODUCTIVITY_SEO_CONTENT['drawing-board']}
        path="/productivity-tools/drawing-board"
        breadcrumbs={[{ name: 'Productivity', item: '/productivity-tools' }, { name: 'Drawing Board', item: '/productivity-tools/drawing-board' }]}
      />

      <div className="page-container" style={{ paddingTop: '2rem' }}>
        <Breadcrumbs items={[{ name: 'Productivity', item: '/productivity-tools' }, { name: 'Drawing Board', item: '/productivity-tools/drawing-board' }]} />
        <div className="landing-layout">
          <AdSpace type="side" className="desktop-only" />
          <div className="landing-center" style={{ maxWidth: '1200px', margin: '0 auto', width: '100%' }}>
            <AdSpace type="top" />
        <div style={{ textAlign: "center", marginBottom: "2.5rem", paddingTop: "2rem" }}>
          <h1 style={{ fontSize: "2.5rem", fontWeight: 900, letterSpacing: "-0.03em", marginBottom: "0.75rem" }}>Drawing <span style={{ color: "var(--accent-primary)" }}>Board</span></h1>
          <p className="page-subtitle-small">
            Freeform digital canvas for sketches and brainstorming.
          </p>
        </div>

        <div className="drawing-layout" style={{ 
          display: 'grid', 
          gridTemplateColumns: 'minmax(0, 1fr) 300px', 
          gap: '2rem', 
          marginTop: '2rem',
          maxWidth: '1400px',
          margin: '2rem auto 0'
        }}>
          {/* Canvas Section */}
          <div style={{ 
            background: 'var(--bg-card)', 
            borderRadius: '24px', 
            border: '1px solid var(--border-color)',
            boxShadow: 'var(--shadow-xl)',
            overflow: 'hidden',
            position: 'relative',
            cursor: tool === 'pencil' ? 'crosshair' : 'default'
          }}>
            <canvas
              ref={canvasRef}
              onPointerDown={startDrawing}
              onPointerUp={finishDrawing}
              onPointerMove={draw}
              onPointerLeave={finishDrawing}
              onPointerCancel={finishDrawing}
              style={{ 
                width: '100%', 
                height: 'clamp(420px, 65vh, 600px)', 
                display: 'block',
                touchAction: 'none'
              }}
            />
          </div>

          {/* Sidebar Controls */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            {/* Tools */}
            <div className="control-panel">
              <h4 className="panel-title">Tools</h4>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                <button 
                  onClick={() => setTool('pencil')}
                  className={`panel-btn ${tool === 'pencil' ? 'active' : ''}`}
                >
                  <Pencil size={20} /> Sketch
                </button>
                <button 
                  onClick={() => setTool('eraser')}
                  className={`panel-btn ${tool === 'eraser' ? 'active' : ''}`}
                >
                  <Eraser size={20} /> Eraser
                </button>
              </div>
            </div>

            {/* Colors */}
            <div className="control-panel">
              <h4 className="panel-title">Colors</h4>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.6rem' }}>
                {COLORS.map(c => (
                  <button
                    key={c}
                    onClick={() => { setColor(c); setTool('pencil'); }}
                    style={{
                      width: '32px',
                      height: '32px',
                      borderRadius: '8px',
                      background: c,
                      border: color === c && tool === 'pencil' ? '3px solid var(--accent-primary)' : '1px solid var(--border-color)',
                      cursor: 'pointer',
                      transition: 'transform 0.2s'
                    }}
                    className="color-swatch-hover"
                  />
                ))}
                <div style={{ position: 'relative', marginLeft: 'auto' }}>
                  <input 
                    type="color" 
                    value={color}
                    onChange={(e) => { setColor(e.target.value); setTool('pencil'); }}
                    style={{ width: '32px', height: '32px', border: 'none', background: 'none', cursor: 'pointer' }}
                  />
                </div>
              </div>
            </div>

            {/* Brush Size */}
            <div className="control-panel">
              <h4 className="panel-title">Brush Size ({brushSize}px)</h4>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <button onClick={() => setBrushSize(Math.max(1, brushSize - 2))} className="btn-icon"><Minus size={18} /></button>
                <input 
                  type="range" 
                  min="1" 
                  max="50" 
                  value={brushSize} 
                  onChange={(e) => setBrushSize(parseInt(e.target.value))}
                  style={{ flex: 1, accentColor: 'var(--accent-primary)' }}
                />
                <button onClick={() => setBrushSize(Math.min(100, brushSize + 2))} className="btn-icon"><Plus size={18} /></button>
              </div>
            </div>

            {/* Actions */}
            <div className="control-panel" style={{ marginTop: 'auto' }}>
              <button 
                onClick={handleDownload}
                className="btn btn-primary" 
                style={{ width: '100%', borderRadius: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.75rem', marginBottom: '0.75rem' }}
              >
                <Download size={20} /> Export PNG
              </button>
              <button 
                onClick={clearCanvas}
                className="btn btn-secondary" 
                style={{ width: '100%', borderRadius: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.75rem' }}
              >
                <Trash2 size={20} /> Clear All
              </button>
            </div>
          </div>
          </div>

          <AdSpace type="bottom" style={{ marginTop: '4rem' }} />
          <div style={{ marginTop: '6rem' }}>
            <ToolContent {...PRODUCTIVITY_SEO_CONTENT['drawing']} />
          </div>
              </div>
            <AdSpace type="side" className="desktop-only" />
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .control-panel {
          background: var(--bg-card);
          padding: 1.5rem;
          border-radius: 20px;
          border: 1px solid var(--border-color);
          box-shadow: var(--shadow-sm);
        }
        .panel-title {
          font-size: 0.8rem;
          font-weight: 900;
          color: var(--text-muted);
          text-transform: uppercase;
          letter-spacing: 0.1em;
          margin-bottom: 1rem;
        }
        .panel-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          padding: 0.75rem;
          border-radius: 12px;
          border: 1px solid var(--border-color);
          background: var(--bg-secondary);
          color: var(--text-primary);
          font-size: 0.9rem;
          font-weight: 700;
          cursor: pointer;
          transition: all 0.2s;
        }
        .panel-btn.active {
          background: var(--accent-primary);
          color: white;
          border-color: var(--accent-primary);
        }
        .panel-btn:hover:not(.active) {
            border-color: var(--accent-primary-transparent);
            background: var(--accent-glow);
        }
        .color-swatch-hover:hover {
            transform: scale(1.1);
        }
        .btn-icon {
            background: var(--bg-secondary);
            border: 1px solid var(--border-color);
            padding: 8px;
            border-radius: 8px;
            cursor: pointer;
        }

        @media (max-width: 960px) {
          .drawing-layout {
            grid-template-columns: 1fr !important;
          }
        }

        @media (max-width: 768px) {
          .control-panel {
            padding: 1rem;
          }
        }
      `}} />
    </>
  )
}
