import { useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import { 
  ArrowUpRight, Zap, Info, Layers, 
  RotateCw, Download, Trash, Activity, Box
} from 'lucide-react'
import { create, all } from 'mathjs'
import SEO from '../components/SEO'
import Breadcrumbs from '../components/Breadcrumbs'
import AdSpace from '../components/AdSpace'
import ToolContent from '../components/ToolContent'
import ShareTool from '../components/ShareTool'

const math = create(all)

export default function VectorCalculator() {
  const [v1, setV1] = useState({ x: '1', y: '2', z: '3' })
  const [v2, setV2] = useState({ x: '4', y: '5', z: '6' })

  const results = useMemo(() => {
    try {
      const vec1 = [parseFloat(v1.x) || 0, parseFloat(v1.y) || 0, parseFloat(v1.z) || 0]
      const vec2 = [parseFloat(v2.x) || 0, parseFloat(v2.y) || 0, parseFloat(v2.z) || 0]

      const dot = math.dot(vec1, vec2)
      const cross = math.cross(vec1, vec2)
      const mag1 = math.norm(vec1).toFixed(3)
      const mag2 = math.norm(vec2).toFixed(3)

      return {
          dot,
          cross: `[${cross.join(', ')}]`,
          mag1,
          mag2
      }
    } catch (e) {
      return null
    }
  }, [v1, v2])

  return (
    <>
      <SEO 
        title="Professional Vector Forge - 3D Calculus Studio | PixTool"
        description="Calculate vector dot products, cross products, and magnitudes instantly. Our high-authority 3D vector studio provides expert results for physics and engineering."
        path="/math-tools/vector-calculator"
        toolName="Vector Forge"
        breadcrumbs={[
            { name: 'Math Suite', item: '/math-tools' },
            { name: 'Vector Forge', item: '/math-tools/vector-calculator' }
        ]}
      />

      <div className="page-container" style={{ paddingTop: '2rem' }}>
        <Breadcrumbs items={[
          { name: 'Math Suite', item: '/math-tools' },
          { name: 'Vector Forge', item: '/math-tools/vector-calculator' }
        ]} />

        <div className="landing-layout">
          <AdSpace type="side" className="desktop-only" />

          <div className="landing-center">
            <AdSpace type="top" />

            <div className="page-hero">
                <h1 className="page-title">Vector <span style={{ color: 'var(--accent-blue)' }}>Forge</span></h1>
                <p className="page-subtitle">Expert 3D vector studio for physics, engineering, and spatial analysis.</p>
            </div>

            <div style={{ maxWidth: '1000px', margin: '0 auto 4rem' }}>
                <div style={{ display: 'grid', gridTemplateColumns: 'minmax(400px, 1fr) minmax(400px, 1fr)', gap: '2rem' }} className="vector-stack">
                    {/* Input Vector 1 */}
                    <div className="vector-card" style={{ 
                        background: 'var(--bg-card)', 
                        borderRadius: '32px', 
                        border: '1px solid var(--border-color)', 
                        padding: '3rem', 
                        boxShadow: 'var(--shadow-xl)',
                        position: 'relative',
                        overflow: 'hidden'
                    }}>
                        <div style={{ position: 'absolute', top: '1.5rem', left: '2rem', zIndex: 10 }}>
                            <div className="math-text-glow" style={{ fontSize: '0.75rem', fontWeight: 900, color: 'var(--accent-blue)', textTransform: 'uppercase', letterSpacing: '0.2em' }}>
                                <Box size={14} style={{ display: 'inline', marginRight: '6px' }} /> Vector A
                            </div>
                        </div>
                        <div style={{ display: 'grid', gap: '1.5rem', marginTop: '2.5rem' }}>
                            {['x', 'y', 'z'].map(axis => (
                                <div key={axis} style={{ position: 'relative' }}>
                                    <label style={{ position: 'absolute', left: '16px', top: '12px', fontSize: '0.7rem', fontWeight: 900, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.15em' }}>Component {axis}</label>
                                    <input 
                                        className="input math-btn-glass" 
                                        value={v1[axis]} 
                                        onChange={(e) => setV1({ ...v1, [axis]: e.target.value })} 
                                        style={{ padding: '2.25rem 1.5rem 1rem', fontSize: '1.5rem', fontWeight: 900, borderRadius: '16px', background: 'rgba(var(--bg-primary-rgb), 0.5)', fontFamily: 'monospace' }}
                                    />
                                    <div style={{ position: 'absolute', right: '16px', top: '50%', transform: 'translateY(-50%)', fontWeight: 900, color: 'var(--accent-blue)', fontSize: '1.25rem' }}>{axis}̂</div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Input Vector 2 */}
                    <div className="vector-card" style={{ 
                        background: 'var(--bg-card)', 
                        borderRadius: '32px', 
                        border: '1px solid var(--border-color)', 
                        padding: '3rem', 
                        boxShadow: 'var(--shadow-xl)',
                        position: 'relative',
                        overflow: 'hidden'
                    }}>
                        <div style={{ position: 'absolute', top: '1.5rem', left: '2rem', zIndex: 10 }}>
                            <div className="math-text-glow" style={{ fontSize: '0.75rem', fontWeight: 900, color: 'var(--accent-blue)', textTransform: 'uppercase', letterSpacing: '0.2em' }}>
                                <Box size={14} style={{ display: 'inline', marginRight: '6px' }} /> Vector B
                            </div>
                        </div>
                        <div style={{ display: 'grid', gap: '1.5rem', marginTop: '2.5rem' }}>
                            {['x', 'y', 'z'].map(axis => (
                                <div key={axis} style={{ position: 'relative' }}>
                                    <label style={{ position: 'absolute', left: '16px', top: '12px', fontSize: '0.7rem', fontWeight: 900, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.15em' }}>Component {axis}</label>
                                    <input 
                                        className="input math-btn-glass" 
                                        value={v2[axis]} 
                                        onChange={(e) => setV2({ ...v2, [axis]: e.target.value })} 
                                        style={{ padding: '2.25rem 1.5rem 1rem', fontSize: '1.5rem', fontWeight: 900, borderRadius: '16px', background: 'rgba(var(--bg-primary-rgb), 0.5)', fontFamily: 'monospace' }}
                                    />
                                    <div style={{ position: 'absolute', right: '16px', top: '50%', transform: 'translateY(-50%)', fontWeight: 900, color: 'var(--accent-blue)', fontSize: '1.25rem' }}>{axis}̂</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Results UI */}
                {results && (
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        style={{ marginTop: '3rem', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '2rem' }}
                    >
                        <div className="math-oled-display" style={{ padding: '2.5rem', borderRadius: '32px', textAlign: 'center', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                            <div style={{ fontSize: '0.8rem', fontWeight: 900, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.15em', marginBottom: '1rem' }}>Dot Product (A · B)</div>
                            <div className="math-text-glow" style={{ fontWeight: 900, fontSize: '2.5rem', color: 'var(--accent-blue)', fontFamily: 'monospace' }}>{results.dot}</div>
                        </div>
                        <div style={{ padding: '2.5rem', background: 'var(--bg-secondary)', borderRadius: '32px', border: '1px solid var(--border-color)', textAlign: 'center', display: 'flex', flexDirection: 'column', justifyContent: 'center', boxShadow: 'inset 0 4px 20px rgba(0, 0, 0, 0.05)' }}>
                            <div style={{ fontSize: '0.8rem', fontWeight: 900, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.15em', marginBottom: '1rem' }}>Cross Product (A × B)</div>
                            <div style={{ fontWeight: 900, fontSize: '1.5rem', color: 'var(--text-primary)', fontFamily: 'monospace' }}>{results.cross}</div>
                        </div>
                        <div style={{ display: 'grid', gridTemplateRows: '1fr 1fr', gap: '1rem' }}>
                            <div style={{ padding: '1.5rem', background: 'var(--bg-secondary)', borderRadius: '24px', border: '1px dashed var(--border-color)', textAlign: 'center', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                                <div style={{ fontSize: '0.75rem', fontWeight: 900, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Magnitude |A|</div>
                                <div style={{ fontWeight: 900, fontSize: '1.4rem', color: 'var(--text-primary)', fontFamily: 'monospace' }}>{results.mag1}</div>
                            </div>
                            <div style={{ padding: '1.5rem', background: 'var(--bg-secondary)', borderRadius: '24px', border: '1px dashed var(--border-color)', textAlign: 'center', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                                <div style={{ fontSize: '0.75rem', fontWeight: 900, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Magnitude |B|</div>
                                <div style={{ fontWeight: 900, fontSize: '1.4rem', color: 'var(--text-primary)', fontFamily: 'monospace' }}>{results.mag2}</div>
                            </div>
                        </div>
                    </motion.div>
                )}
            </div>

            <AdSpace type="bottom" />

            <ShareTool 
                title="Vector Forge"
                url="/math-tools/vector-calculator"
                text="Solve complex 3D vector equations instantly with PixTool's professional calculus studio."
            />

            <ToolContent 
                title="Elite Spatial Analysis"
                description="Our Vector Forge provides architectural-grade calculus for spatial modeling. Leveraging native math.js vector kernels, it delivers high-authority results for 3D physics projections and geometric engine analysis."
                benefits={[
                    "High-precision Dot and Cross product engine",
                    "3-Dimensional magnitude and norm analysis",
                    "Real-time transformation modeling",
                    "Professional high-authority UI",
                    "Zero-latency processing"
                ]}
                useCases={[
                    { title: "Physics Modeling", description: "Calculate torque, work, and force vectors for mechanical engineering simulations." },
                    { title: "Game Development", description: "Compute surface normals and directional projections for lighting and collision logic." }
                ]}
            />
          </div>

          <AdSpace type="side" className="desktop-only" />
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        @media (max-width: 800px) {
            .vector-stack { grid-template-columns: 1fr !important; }
        }
        @media (max-width: 640px) {
            .vector-card { padding: 1.5rem !important; }
            .math-oled-display { padding: 1.5rem !important; }
        }
      `}} />
    </>
  )
}
