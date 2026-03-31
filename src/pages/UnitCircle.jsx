import { useState } from 'react'
import { 
  Circle, Zap, Info, Compass, 
  RotateCw, Download, Trash, Activity
} from 'lucide-react'
import SEO from '../components/SEO'
import Breadcrumbs from '../components/Breadcrumbs'
import AdSpace from '../components/AdSpace'
import ToolContent from '../components/ToolContent'
import ShareTool from '../components/ShareTool'

export default function UnitCircle() {
  const [angle, setAngle] = useState(45)

  const radius = 150
  const centerX = 200
  const centerY = 200

  const x = centerX + radius * Math.cos(-angle * Math.PI / 180)
  const y = centerY + radius * Math.sin(-angle * Math.PI / 180)

  const cosVal = Math.cos(angle * Math.PI / 180).toFixed(4)
  const sinVal = Math.sin(angle * Math.PI / 180).toFixed(4)
  const tanVal = Math.tan(angle * Math.PI / 180).toFixed(4)

  return (
    <>
      <SEO 
        title="Interactive Unit Circle Studio - Trigonometry Visualizer | PixTool"
        description="Explore the unit circle interactively. Visualize sines, cosines, and tangents in real-time with our high-authority trigonometry studio."
        path="/math-tools/unit-circle"
        toolName="Unit Circle"
        breadcrumbs={[
            { name: 'Math Suite', item: '/math-tools' },
            { name: 'Unit Circle', item: '/math-tools/unit-circle' }
        ]}
      />

      <div className="page-container" style={{ paddingTop: '2rem' }}>
        <Breadcrumbs items={[
          { name: 'Math Suite', item: '/math-tools' },
          { name: 'Unit Circle', item: '/math-tools/unit-circle' }
        ]} />

        <div className="landing-layout">
          <AdSpace type="side" className="desktop-only" />

          <div className="landing-center">
            <AdSpace type="top" />

            <div className="page-hero">
                <h1 className="page-title">Unit Circle <span style={{ color: 'var(--accent-blue)' }}>Studio</span></h1>
                <p className="page-subtitle">Interactive visual exploration of trigonometric functions and angular rotation.</p>
            </div>

            <div style={{ maxWidth: '1000px', margin: '0 auto 4rem', display: 'grid', gridTemplateColumns: 'minmax(450px, 1fr) 350px', gap: '2.5rem' }} className="circle-stack">
                {/* Visualizer */}
                <div className="circle-card" style={{ 
                    background: 'var(--bg-card)', 
                    borderRadius: '32px', 
                    border: '1px solid var(--border-color)', 
                    padding: '3rem', 
                    display: 'flex', 
                    justifyContent: 'center', 
                    alignItems: 'center',
                    boxShadow: 'var(--shadow-xl)',
                    position: 'relative',
                    overflow: 'hidden'
                }}>
                    <div style={{ position: 'absolute', top: '1.5rem', left: '2rem', zIndex: 10 }}>
                        <div className="math-text-glow" style={{ fontSize: '0.75rem', fontWeight: 900, color: 'var(--accent-blue)', textTransform: 'uppercase', letterSpacing: '0.2em' }}>
                            <Compass size={14} style={{ display: 'inline', marginRight: '6px' }} /> Vector Space
                        </div>
                    </div>
                    <svg width="100%" height="auto" viewBox="0 0 400 400" style={{ filter: 'drop-shadow(0 0 20px rgba(59, 130, 246, 0.15))', maxWidth: '400px' }}>
                        {/* Circle */}
                        <circle cx={centerX} cy={centerY} r={radius} fill="none" stroke="var(--border-color)" strokeWidth="3" strokeDasharray="4 8" />
                        
                        {/* Axes */}
                        <line x1="20" y1={centerY} x2="380" y2={centerY} stroke="var(--border-color)" strokeWidth="2" />
                        <line x1={centerX} y1="20" x2={centerX} y2="380" stroke="var(--border-color)" strokeWidth="2" />
                        
                        {/* Angle Arc */}
                        <path 
                            d={`M ${centerX + 40} ${centerY} A 40 40 0 ${angle > 0 ? 0 : 1} 0 ${centerX + 40 * Math.cos(-angle * Math.PI / 180)} ${centerY + 40 * Math.sin(-angle * Math.PI / 180)}`}
                            fill="rgba(59, 130, 246, 0.1)"
                            stroke="var(--accent-blue)"
                            strokeWidth="3"
                        />

                        {/* Vector */}
                        <line x1={centerX} y1={centerY} x2={x} y2={y} stroke="var(--accent-blue)" strokeWidth="5" strokeLinecap="round" />
                        
                        {/* Moving Point */}
                        <circle cx={x} cy={y} r="8" fill="var(--bg-primary)" stroke="var(--accent-blue)" strokeWidth="4" />
                        <circle cx={x} cy={y} r="20" fill="rgba(59, 130, 246, 0.2)" />
                        
                        {/* Labels */}
                        <text x="365" y={centerY + 6} fill="var(--text-muted)" fontSize="14" fontWeight="900">0°</text>
                        <text x={centerX - 12} y="15" fill="var(--text-muted)" fontSize="14" fontWeight="900">90°</text>
                    </svg>
                </div>

                {/* Controls */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                    <div style={{ background: 'var(--bg-secondary)', borderRadius: '32px', padding: '2.5rem', border: '1px solid var(--border-color)', boxShadow: 'inset 0 4px 20px rgba(0, 0, 0, 0.05)' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                            <div style={{ fontWeight: 900, fontSize: '0.8rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.15em' }}>Rotation</div>
                            <div className="math-text-glow" style={{ fontSize: '1.25rem', fontWeight: 900, color: 'var(--text-primary)', fontFamily: 'monospace' }}>{angle}°</div>
                        </div>
                        <input 
                            type="range" 
                            min="0" 
                            max="360" 
                            value={angle} 
                            onChange={(e) => setAngle(Number(e.target.value))}
                            style={{ width: '100%', accentColor: 'var(--accent-blue)', height: '8px', borderRadius: '4px', appearance: 'none', background: 'var(--border-color)', outline: 'none' }}
                            className="math-slider"
                        />
                    </div>

                    <div className="math-oled-display" style={{ display: 'grid', gap: '1rem', padding: '2rem', borderRadius: '32px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem', background: 'rgba(var(--bg-primary-rgb), 0.5)', borderRadius: '16px' }}>
                            <div style={{ fontSize: '0.8rem', fontWeight: 900, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Cos (x)</div>
                            <div style={{ fontWeight: 900, fontSize: '1.25rem', color: 'var(--text-primary)', fontFamily: 'monospace' }}>{cosVal}</div>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem', background: 'rgba(var(--bg-primary-rgb), 0.5)', borderRadius: '16px' }}>
                            <div style={{ fontSize: '0.8rem', fontWeight: 900, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Sin (y)</div>
                            <div style={{ fontWeight: 900, fontSize: '1.25rem', color: 'var(--text-primary)', fontFamily: 'monospace' }}>{sinVal}</div>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem', background: 'rgba(var(--bg-primary-rgb), 0.5)', borderRadius: '16px' }}>
                            <div style={{ fontSize: '0.8rem', fontWeight: 900, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Tan (y/x)</div>
                            <div style={{ fontWeight: 900, fontSize: '1.25rem', color: 'var(--text-primary)', fontFamily: 'monospace' }}>{isFinite(tanVal) ? tanVal : '∞'}</div>
                        </div>
                    </div>
                </div>
            </div>

            <AdSpace type="bottom" />

            <ShareTool 
                title="Unit Circle Studio"
                url="/math-tools/unit-circle"
                text="Explore trigonometry visually with PixTool's interactive unit circle."
            />

            <ToolContent 
                title="Geometric Mastery Studio"
                description="Our Unit Circle visualizer is built for high-authority educational and technical research. It provides a real-time geometry engine to understand the circular definitions of trigonometric functions."
                benefits={[
                    "Interactive angular rotation control",
                    "Real-time coordinate tracking",
                    "Simultaneous sine, cosine, and tangent display",
                    "High-precision SVG rendering",
                    "Mobile-optimized touch interactions"
                ]}
                useCases={[
                    { title: "Trigonometry Education", description: "Visualize why cos(90) is 0 and sin(90) is 1 through geometric vectors." },
                    { title: "Navigation & Engineering", description: "Calculate projections and vector components based on angular orientation." }
                ]}
            />
          </div>

          <AdSpace type="side" className="desktop-only" />
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        @media (max-width: 800px) {
            .circle-stack { grid-template-columns: 1fr !important; }
        }
        @media (max-width: 640px) {
            .circle-card { padding: 1.5rem !important; }
            .math-oled-display { padding: 1.5rem !important; gap: 0.5rem !important; }
            .math-oled-display > div { padding: 0.75rem !important; }
        }
      `}} />
    </>
  )
}
