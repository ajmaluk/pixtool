import { useState, useMemo } from 'react'
import { 
  BarChart, PieChart, TrendingUp, Info, 
  Settings, Download, Trash, Activity, 
  BarChart3, PieChart as PieIcon, LineChart as LineIcon
} from 'lucide-react'
import { 
  BarChart as ReBar, Bar, XAxis, YAxis, CartesianGrid, Tooltip, 
  ResponsiveContainer, Cell, PieChart as RePie, Pie, 
  LineChart as ReLine, Line
} from 'recharts'
import { create, all } from 'mathjs'
import SEO from '../components/SEO'
import Breadcrumbs from '../components/Breadcrumbs'
import AdSpace from '../components/AdSpace'
import ToolContent from '../components/ToolContent'
import ShareTool from '../components/ShareTool'

const math = create(all)

export default function StatisticsVisualizer() {
  const [rawData, setRawData] = useState('January: 400, February: 300, March: 600, April: 800, May: 500')
  const [chartType, setChartType] = useState('bar')

  const parsedData = useMemo(() => {
    try {
      return rawData.split(',').map(item => {
        const [label, value] = item.split(':').map(s => s.trim())
        return { name: label, value: parseFloat(value) || 0 }
      })
    } catch {
      return []
    }
  }, [rawData])

  const stats = useMemo(() => {
    const values = parsedData.map(d => d.value).filter(v => !isNaN(v))
    if (values.length === 0) return null
    return {
      mean: math.mean(values).toFixed(2),
      median: math.median(values).toFixed(2),
      stdDev: math.std(values).toFixed(2),
      min: math.min(values),
      max: math.max(values)
    }
  }, [parsedData])

  const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ec4899', '#8b5cf6', '#06b6d4']

  return (
    <>
      <SEO 
        title="Expert Data Visualizer - Statistical Charting Studio | PixTool"
        description="Transform raw data into high-authority charts. Generate bar, pie, and line visualizations with instant statistical analysis. 100% private and professional."
        path="/math-tools/statistics-visualizer"
        toolName="Data Visualizer"
        breadcrumbs={[
            { name: 'Math Suite', item: '/math-tools' },
            { name: 'Data Visualizer', item: '/math-tools/statistics-visualizer' }
        ]}
      />

      <div className="page-container" style={{ paddingTop: '2rem' }}>
        <Breadcrumbs items={[
          { name: 'Math Suite', item: '/math-tools' },
          { name: 'Statistics Visualizer', item: '/math-tools/statistics-visualizer' }
        ]} />

        <div className="landing-layout">
          <AdSpace type="side" className="desktop-only" />

          <div className="landing-center">
            <AdSpace type="top" />

            <div className="page-hero">
                <h1 className="page-title">Data <span style={{ color: 'var(--accent-blue)' }}>Visualizer</span></h1>
                <p className="page-subtitle">Transform datasets into architectural visualizations and statistical intelligence.</p>
            </div>

            <div style={{ maxWidth: '1200px', margin: '0 auto 4rem', display: 'grid', gridTemplateColumns: 'minmax(350px, 1fr) 2fr', gap: '2rem' }} className="stats-stack">
                {/* Input Area */}
                <div className="stats-card" style={{ 
                    background: 'var(--bg-card)', 
                    borderRadius: '32px', 
                    border: '1px solid var(--border-color)', 
                    padding: '3rem', 
                    display: 'flex', 
                    flexDirection: 'column',
                    boxShadow: 'var(--shadow-xl)',
                    position: 'relative',
                    overflow: 'hidden'
                }}>
                    <div style={{ position: 'absolute', top: '1.5rem', left: '2rem', zIndex: 10 }}>
                        <div className="math-text-glow" style={{ fontSize: '0.75rem', fontWeight: 900, color: 'var(--accent-blue)', textTransform: 'uppercase', letterSpacing: '0.2em' }}>
                            <TrendingUp size={14} style={{ display: 'inline', marginRight: '6px' }} /> Data Engine
                        </div>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem', marginTop: '2.5rem', marginBottom: '2rem' }}>
                        <button onClick={() => setChartType('bar')} className="math-btn-glass" style={{ padding: '1rem', background: chartType === 'bar' ? 'rgba(59, 130, 246, 0.2)' : 'rgba(var(--bg-primary-rgb), 0.5)', borderColor: chartType === 'bar' ? 'var(--accent-blue)' : 'transparent', color: chartType === 'bar' ? 'var(--accent-blue)' : 'var(--text-muted)' }}><BarChart3 size={20} style={{ margin: '0 auto' }} /></button>
                        <button onClick={() => setChartType('pie')} className="math-btn-glass" style={{ padding: '1rem', background: chartType === 'pie' ? 'rgba(59, 130, 246, 0.2)' : 'rgba(var(--bg-primary-rgb), 0.5)', borderColor: chartType === 'pie' ? 'var(--accent-blue)' : 'transparent', color: chartType === 'pie' ? 'var(--accent-blue)' : 'var(--text-muted)' }}><PieIcon size={20} style={{ margin: '0 auto' }} /></button>
                        <button onClick={() => setChartType('line')} className="math-btn-glass" style={{ padding: '1rem', background: chartType === 'line' ? 'rgba(59, 130, 246, 0.2)' : 'rgba(var(--bg-primary-rgb), 0.5)', borderColor: chartType === 'line' ? 'var(--accent-blue)' : 'transparent', color: chartType === 'line' ? 'var(--accent-blue)' : 'var(--text-muted)' }}><LineIcon size={20} style={{ margin: '0 auto' }} /></button>
                    </div>

                    <div style={{ fontWeight: 900, fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '1rem', textTransform: 'uppercase', letterSpacing: '0.15em' }}>Dataset Input (Label: Value)</div>
                    <textarea 
                        className="input math-btn-glass"
                        value={rawData}
                        onChange={(e) => setRawData(e.target.value)}
                        placeholder="Label: 10, Label: 20..."
                        style={{ flex: 1, minHeight: '300px', fontSize: '0.95rem', padding: '1.5rem', background: 'rgba(var(--bg-primary-rgb), 0.5)', fontFamily: 'monospace', resize: 'none' }}
                    />
                </div>

                {/* Visualization Area */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                    <div className="math-oled-display" style={{ padding: '2rem', borderRadius: '32px', height: '450px', position: 'relative' }}>
                        <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '4px', background: 'var(--accent-blue)', opacity: 0.5, borderRadius: '32px 32px 0 0' }}></div>
                        <ResponsiveContainer width="100%" height="100%">
                            {chartType === 'bar' ? (
                                <ReBar data={parsedData}>
                                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255, 255, 255, 0.05)" vertical={false} />
                                    <XAxis dataKey="name" stroke="var(--text-muted)" tick={{ fill: 'var(--text-muted)', fontSize: 12, fontWeight: 800 }} axisLine={false} tickLine={false} />
                                    <YAxis stroke="var(--text-muted)" tick={{ fill: 'var(--text-muted)', fontSize: 12, fontWeight: 800 }} axisLine={false} tickLine={false} />
                                    <Tooltip contentStyle={{ background: 'var(--bg-card)', border: '1px solid var(--border-color)', borderRadius: '12px', fontWeight: 800 }} />
                                    <Bar dataKey="value" fill="url(#colorBar)" radius={[8, 8, 0, 0]} />
                                    <defs>
                                        <linearGradient id="colorBar" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="0%" stopColor="var(--accent-blue)" stopOpacity={1}/>
                                            <stop offset="100%" stopColor="var(--accent-blue)" stopOpacity={0.4}/>
                                        </linearGradient>
                                    </defs>
                                </ReBar>
                            ) : chartType === 'pie' ? (
                                <RePie>
                                    <Pie data={parsedData} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius={80} outerRadius={120} stroke="var(--bg-card)" strokeWidth={4}>
                                        {parsedData.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                        ))}
                                    </Pie>
                                    <Tooltip contentStyle={{ background: 'var(--bg-card)', border: '1px solid var(--border-color)', borderRadius: '12px', fontWeight: 800 }} />
                                </RePie>
                            ) : (
                                <ReLine data={parsedData}>
                                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255, 255, 255, 0.05)" vertical={false} />
                                    <XAxis dataKey="name" stroke="var(--text-muted)" tick={{ fill: 'var(--text-muted)', fontSize: 12, fontWeight: 800 }} axisLine={false} tickLine={false} />
                                    <YAxis stroke="var(--text-muted)" tick={{ fill: 'var(--text-muted)', fontSize: 12, fontWeight: 800 }} axisLine={false} tickLine={false} />
                                    <Tooltip contentStyle={{ background: 'var(--bg-card)', border: '1px solid var(--border-color)', borderRadius: '12px', fontWeight: 800 }} />
                                    <Line type="monotone" dataKey="value" stroke="var(--accent-blue)" strokeWidth={4} dot={{ r: 6, fill: 'var(--bg-primary)', strokeWidth: 3 }} activeDot={{ r: 8, strokeWidth: 0, fill: 'var(--accent-blue)' }} />
                                </ReLine>
                            )}
                        </ResponsiveContainer>
                    </div>

                    {stats && (
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '1.5rem' }}>
                            <div style={{ padding: '2rem 1.5rem', background: 'var(--bg-secondary)', borderRadius: '24px', border: '1px solid var(--border-color)', textAlign: 'center', boxShadow: 'inset 0 4px 20px rgba(0, 0, 0, 0.05)' }}>
                                <div style={{ fontSize: '0.75rem', fontWeight: 900, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '0.75rem' }}>Mean (x̄)</div>
                                <div style={{ fontWeight: 900, fontSize: '1.5rem', color: 'var(--accent-blue)', fontFamily: 'monospace' }}>{stats.mean}</div>
                            </div>
                            <div style={{ padding: '2rem 1.5rem', background: 'var(--bg-secondary)', borderRadius: '24px', border: '1px solid var(--border-color)', textAlign: 'center', boxShadow: 'inset 0 4px 20px rgba(0, 0, 0, 0.05)' }}>
                                <div style={{ fontSize: '0.75rem', fontWeight: 900, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '0.75rem' }}>Median</div>
                                <div style={{ fontWeight: 900, fontSize: '1.5rem', color: 'var(--text-primary)', fontFamily: 'monospace' }}>{stats.median}</div>
                            </div>
                            <div style={{ padding: '2rem 1.5rem', background: 'var(--bg-secondary)', borderRadius: '24px', border: '1px solid var(--border-color)', textAlign: 'center', boxShadow: 'inset 0 4px 20px rgba(0, 0, 0, 0.05)' }}>
                                <div style={{ fontSize: '0.75rem', fontWeight: 900, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '0.75rem' }}>Std Dev (σ)</div>
                                <div style={{ fontWeight: 900, fontSize: '1.5rem', color: 'var(--text-primary)', fontFamily: 'monospace' }}>{stats.stdDev}</div>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            <AdSpace type="bottom" />

            <ShareTool 
                title="Statistics Visualizer"
                url="/math-tools/statistics-visualizer"
                text="Transform raw data into high-authority charts instantly with PixTool's professional charting studio."
            />

            <ToolContent 
                title="Architectural Data Intelligence"
                description="Our Statistics Visualizer provides elite-level data synthesis. Built on the Recharts visualization framework, it allows for high-fidelity rendering of statistical distributions and trend analysis directly in your browser."
                benefits={[
                    "Real-time Bar, Pie, and Line chart generation",
                    "Integrated mean, median, and deviation analysis",
                    "Custom label-value mapping logic",
                    "Professional high-contrast color palettes",
                    "Privacy-first native rendering"
                ]}
                useCases={[
                    { title: "Business Metrics", description: "Visualize monthly growth and revenue distributions for executive reporting." },
                    { title: "Academic Research", description: "Plot experimental results and calculate statistical variance for scientific papers." }
                ]}
            />
          </div>

          <AdSpace type="side" className="desktop-only" />
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        @media (max-width: 800px) {
            .stats-stack { grid-template-columns: 1fr !important; }
        }
        @media (max-width: 640px) {
            .stats-card { padding: 1.5rem !important; }
            .math-oled-display { height: 300px !important; padding: 1rem !important; }
        }
      `}} />
    </>
  )
}
