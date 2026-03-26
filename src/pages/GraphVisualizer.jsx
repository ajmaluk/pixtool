import { useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import { 
  TrendingUp, Plus, Trash2, Maximize2, 
  Settings, Info, Download, Trash
} from 'lucide-react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { create, all } from 'mathjs'
import SEO from '../components/SEO'
import Breadcrumbs from '../components/Breadcrumbs'
import AdSpace from '../components/AdSpace'
import ToolContent from '../components/ToolContent'
import ShareTool from '../components/ShareTool'

const math = create(all)

export default function GraphVisualizer() {
  const [functions, setFunctions] = useState([{ id: 1, expr: 'sin(x)', color: '#3b82f6' }])
  const [range, setRange] = useState({ min: -10, max: 10, steps: 100 })

  const data = useMemo(() => {
    const points = []
    const stepSize = (range.max - range.min) / range.steps

    for (let x = range.min; x <= range.max; x += stepSize) {
      const point = { x: Number(x.toFixed(2)) }
      functions.forEach(f => {
        try {
          const val = math.evaluate(f.expr, { x })
          if (typeof val === 'number' && isFinite(val)) {
            point[`f${f.id}`] = val
          }
        } catch (e) {
          // Skip invalid evaluation
        }
      })
      points.push(point)
    }
    return points
  }, [functions, range])

  const addFunction = () => {
    const newId = functions.length > 0 ? Math.max(...functions.map(f => f.id)) + 1 : 1
    const colors = ['#3b82f6', '#ec4899', '#10b981', '#f59e0b', '#8b5cf6']
    setFunctions([...functions, { id: newId, expr: 'x^2', color: colors[newId % colors.length] }])
  }

  const removeFunction = (id) => {
    setFunctions(functions.filter(f => f.id !== id))
  }

  return (
    <>
      <SEO 
        title="Interactive Graph Visualizer - 2D Functional Plotting | PixTool"
        description="Visualize mathematical functions instantly. Our high-authority graphing engine supports multi-function plotting, dynamic scaling, and professional exports."
        path="/math-tools/graph-visualizer"
        toolName="Graph Visualizer"
        breadcrumbs={[
            { name: 'Math Suite', item: '/math-tools' },
            { name: 'Graph Visualizer', item: '/math-tools/graph-visualizer' }
        ]}
      />

      <div className="page-container" style={{ paddingTop: '2rem' }}>
        <Breadcrumbs items={[
          { name: 'Math Suite', item: '/math-tools' },
          { name: 'Graph Visualizer', item: '/math-tools/graph-visualizer' }
        ]} />

        <div className="landing-layout">
          <AdSpace type="side" className="desktop-only" />

          <div className="landing-center">
            <AdSpace type="top" />

            <div className="page-hero">
                <h1 className="page-title">Graph <span style={{ color: 'var(--accent-blue)' }}>Visualizer</span></h1>
                <p className="page-subtitle">Interactive functional plotting for advanced mathematical analysis.</p>
            </div>

            <div style={{ 
                display: 'grid', 
                gridTemplateColumns: '1fr 350px', 
                gap: '2rem', 
                marginBottom: '4rem',
                minHeight: '650px'
            }} className="graph-stack">
                {/* Graph Canvas */}
                <div style={{ 
                    background: 'var(--bg-card)', 
                    borderRadius: '24px', 
                    border: '1px solid var(--border-color)',
                    padding: '2rem',
                    boxShadow: 'var(--shadow-lg)',
                    position: 'relative',
                    overflow: 'hidden',
                    height: '500px' // Defined height for ResponsiveContainer
                }}>
                    <div style={{ position: 'absolute', top: '1.5rem', left: '2rem', zIndex: 10 }}>
                        <div className="math-text-glow" style={{ fontSize: '0.75rem', fontWeight: 900, color: 'var(--accent-blue)', textTransform: 'uppercase', letterSpacing: '0.2em' }}>
                            <TrendingUp size={14} style={{ display: 'inline', marginRight: '6px' }} /> Plot Interface
                        </div>
                    </div>
                    <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={data} margin={{ top: 40, right: 30, left: 20, bottom: 20 }}>
                            <CartesianGrid strokeDasharray="3 3" stroke="rgba(128, 128, 128, 0.15)" vertical={true} horizontal={true} />
                            <XAxis dataKey="x" stroke="var(--text-muted)" tick={{ fontSize: 12 }} axisLine={{ stroke: 'var(--border-color)' }} tickLine={false} />
                            <YAxis stroke="var(--text-muted)" tick={{ fontSize: 12 }} axisLine={{ stroke: 'var(--border-color)' }} tickLine={false} />
                            <Tooltip 
                                contentStyle={{ 
                                    background: 'rgba(var(--bg-primary-rgb), 0.9)',
                                    backdropFilter: 'blur(10px)',
                                    border: '1px solid rgba(255, 255, 255, 0.1)',
                                    borderRadius: '16px',
                                    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2)',
                                    color: 'var(--text-primary)',
                                    fontWeight: 600
                                }}
                                itemStyle={{ fontWeight: 800 }}
                            />
                            {functions.map(f => (
                                <Line 
                                    key={f.id}
                                    type="monotone" 
                                    dataKey={`f${f.id}`} 
                                    stroke={f.color} 
                                    dot={false}
                                    strokeWidth={3}
                                    animationDuration={500}
                                    activeDot={{ r: 6, strokeWidth: 0, fill: f.color }}
                                />
                            ))}
                        </LineChart>
                    </ResponsiveContainer>
                </div>

                {/* Sidebar Controls */}
                <div style={{ 
                    background: 'var(--bg-secondary)', 
                    borderRadius: '24px', 
                    border: '1px solid var(--border-color)',
                    padding: '1.5rem',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '2rem',
                    boxShadow: 'inset 0 2px 10px rgba(0, 0, 0, 0.05)'
                }}>
                    <div>
                        <div style={{ fontWeight: 900, fontSize: '0.8rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.15em', marginBottom: '1.5rem' }}>Functions</div>
                        <div style={{ display: 'grid', gap: '1rem' }}>
                            {functions.map((f, i) => (
                                <div key={f.id} style={{ position: 'relative' }}>
                                    <div style={{ 
                                        position: 'absolute', 
                                        left: '-2px', 
                                        top: '0', 
                                        bottom: '0', 
                                        width: '6px', 
                                        background: f.color, 
                                        borderTopLeftRadius: '12px', 
                                        borderBottomLeftRadius: '12px',
                                        zIndex: 2 
                                    }}></div>
                                    <input 
                                        className="input math-btn-glass"
                                        value={f.expr}
                                        onChange={(e) => {
                                            const newFuncs = [...functions]
                                            newFuncs[i].expr = e.target.value
                                            setFunctions(newFuncs)
                                        }}
                                        style={{ 
                                            padding: '1.25rem 3rem 1.25rem 1.5rem', 
                                            borderRadius: '12px',
                                            fontSize: '1rem',
                                            fontWeight: 700,
                                            width: '100%',
                                            fontFamily: 'monospace',
                                            color: 'var(--text-primary)',
                                            background: 'var(--bg-primary)'
                                        }}
                                    />
                                    <button 
                                        onClick={() => removeFunction(f.id)}
                                        style={{ 
                                            position: 'absolute', 
                                            right: '12px', 
                                            top: '50%', 
                                            transform: 'translateY(-50%)',
                                            color: 'var(--text-muted)',
                                            background: 'none',
                                            border: 'none',
                                            cursor: 'pointer',
                                            padding: '4px',
                                            transition: 'color 0.2s'
                                        }}
                                        onMouseOver={(e) => e.currentTarget.style.color = 'var(--accent-red)'}
                                        onMouseOut={(e) => e.currentTarget.style.color = 'var(--text-muted)'}
                                    >
                                        <Trash2 size={18} />
                                    </button>
                                </div>
                            ))}
                        </div>
                        <button className="math-btn-glass" style={{ width: '100%', marginTop: '1rem', padding: '1rem', borderRadius: '12px', color: 'var(--accent-blue)', fontWeight: 800 }} onClick={addFunction}>
                            <Plus size={18} style={{ display: 'inline', marginRight: '8px' }} /> Add Function
                        </button>
                    </div>

                    <hr style={{ border: 'none', borderTop: '1px solid var(--border-color)', margin: '0' }} />

                    <div>
                        <div style={{ fontWeight: 900, fontSize: '0.8rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.15em', marginBottom: '1.5rem' }}>Domain Range</div>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                            <div style={{ position: 'relative' }}>
                                <label style={{ position: 'absolute', left: '12px', top: '12px', fontSize: '0.7rem', fontWeight: 800, color: 'var(--text-muted)', textTransform: 'uppercase' }}>Min X</label>
                                <input 
                                    type="number" 
                                    className="input math-btn-glass" 
                                    value={range.min}
                                    onChange={(e) => setRange({ ...range, min: Number(e.target.value) })}
                                    style={{ padding: '2rem 1rem 0.75rem', fontSize: '1rem', fontWeight: 700, borderRadius: '12px', width: '100%', background: 'var(--bg-primary)' }}
                                />
                            </div>
                            <div style={{ position: 'relative' }}>
                                <label style={{ position: 'absolute', left: '12px', top: '12px', fontSize: '0.7rem', fontWeight: 800, color: 'var(--text-muted)', textTransform: 'uppercase' }}>Max X</label>
                                <input 
                                    type="number" 
                                    className="input math-btn-glass" 
                                    value={range.max}
                                    onChange={(e) => setRange({ ...range, max: Number(e.target.value) })}
                                    style={{ padding: '2rem 1rem 0.75rem', fontSize: '1rem', fontWeight: 700, borderRadius: '12px', width: '100%', background: 'var(--bg-primary)' }}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <AdSpace type="bottom" />

            <ShareTool 
                title="Graph Visualizer"
                url="/math-tools/graph-visualizer"
                text="Visualize complex functions instantly with PixTool's elite graphing engine."
            />

            <ToolContent 
                title="Elite Functional Visualization"
                description="Our Graph Visualizer is architected for speed and clarity. By utilizing a high-performance evaluation engine, it allows researchers and students to visualize complex mathematical relationships in real-time."
                benefits={[
                    "Real-time functional plotting",
                    "Support for multi-variable expressions",
                    "Interactive domain and range control",
                    "High-authority visual fidelity",
                    "Zero server tracking"
                ]}
                useCases={[
                    { title: "Calculus", description: "Visualize derivatives and intersections of trigonometric and algebraic functions." },
                    { title: "Data Analysis", description: "Plot trend lines and mathematical models against theoretical data points." }
                ]}
            />
          </div>

          <AdSpace type="side" className="desktop-only" />
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        @media (max-width: 900px) {
            .graph-stack {
                grid-template-columns: 1fr !important;
                min-height: auto !important;
            }
            .graph-stack > div:first-child {
                min-height: 400px;
            }
        }
        @media (max-width: 640px) {
            .graph-stack > div {
                padding: 1.5rem !important;
            }
        }
      `}} />
    </>
  )
}
