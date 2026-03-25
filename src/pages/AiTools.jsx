import { motion } from 'framer-motion' // eslint-disable-line no-unused-vars
import SEO from '../components/SEO'
import ToolCard from '../components/ToolCard'
import { AI_TOOLS } from '../data/tools'
import { Sparkles, BrainCircuit, Target, Users, Zap, ShieldCheck, Globe } from 'lucide-react'

export default function AiTools() {
  const tools = AI_TOOLS.filter(t => !t.status);

  const categories = [
    {
      title: "Strategic Intelligence",
      icon: BrainCircuit,
      desc: "High-authority reasoning and complex problem solving.",
      toolIds: ['ai-chat', 'ai-coding-chat', 'ai-summarizer', 'ai-translator']
    },
    {
      title: "Editorial Forge",
      icon: Sparkles,
      desc: "Precision-engineered content and linguistic architecture.",
      toolIds: ['ai-content-generator', 'ai-grammar-fixer', 'ai-paraphraser', 'ai-story']
    },
    {
      title: "Market Velocity",
      icon: Target,
      desc: "Algorithmic reach and conversion-optimized narratives.",
      toolIds: ['ai-ad-copy', 'ai-email-writer', 'ai-keyword', 'ai-hashtag']
    },
    {
      title: "Career Architect",
      icon: Users,
      desc: "ATS-optimized documentation and professional workflows.",
      toolIds: ['ai-resume-generator', 'ai-caption']
    }
  ];

  return (
    <>
      <SEO 
        title="Premium AI Productivity Suite - Specialized Intelligence | PixTool"
        description="Access a world-class suite of 14 specialized AI tools. From Deep Mind reasoning to Narrative Forge storytelling, engineered for performance."
        path="/ai-tools"
      />
      
      <div className="ai-hub-container" style={{ paddingBottom: '8rem' }}>
        {/* Hero Section - Editorial Style */}
        <section style={{ paddingTop: '8rem', paddingBottom: '6rem', textAlign: 'center' }}>
          <div className="container-pro">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="status-badge" style={{ margin: '0 auto 2.5rem', background: 'var(--bg-secondary)', color: 'var(--text-muted)', padding: '8px 20px', borderRadius: '100px', fontSize: '0.75rem', fontWeight: 800, letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                <Sparkles size={14} style={{ display: 'inline', marginRight: '8px', verticalAlign: 'middle' }} /> AI Evolution 2026
              </div>
              <h1 style={{ fontSize: 'clamp(3rem, 8vw, 5.5rem)', fontWeight: 900, marginBottom: '2rem', letterSpacing: '-0.05em', lineHeight: 0.9, color: 'var(--text-primary)' }}>
                Specialized <span style={{ color: 'var(--accent-purple)' }}>Intelligence.</span>
              </h1>
              <p style={{ fontSize: '1.4rem', color: 'var(--text-secondary)', maxWidth: '800px', margin: '0 auto', lineHeight: 1.5, fontWeight: 500 }}>
                14 precision-engineered AI tools designed to architect, generate, and evolve your digital workflow with high-authority reasoning.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Feature Grid - The Pillars */}
        <section style={{ marginBottom: '8rem' }}>
          <div className="container-pro">
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
                {[
                    { title: "Zero Latency", desc: "Native streaming generation built for instant high-authority responses.", icon: Zap },
                    { title: "Privacy First", desc: "Context-aware processing without permanent server-side data retention.", icon: ShieldCheck },
                    { title: "Global Context", desc: "Engineered to understand over 50+ linguistic and cultural nuances.", icon: Globe }
                ].map((p, i) => (
                    <div key={i} style={{ padding: '2.5rem', background: 'var(--bg-card)', borderRadius: '32px', border: '1px solid var(--border-color)' }}>
                        <div style={{ color: 'var(--accent-purple)', marginBottom: '1.5rem' }}><p.icon size={28} strokeWidth={1.5} /></div>
                        <h3 style={{ fontSize: '1.25rem', fontWeight: 900, marginBottom: '0.75rem', color: 'var(--text-primary)' }}>{p.title}</h3>
                        <p style={{ color: 'var(--text-secondary)', lineHeight: 1.6, fontSize: '0.95rem' }}>{p.desc}</p>
                    </div>
                ))}
            </div>
          </div>
        </section>

        {/* Categories Section */}
        {categories.map((cat, idx) => (
          <section key={idx} style={{ marginBottom: '6rem' }}>
            <div className="container-pro">
              <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: '3.5rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '2.5rem' }}>
                <div style={{ maxWidth: '600px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', color: 'var(--accent-purple)', marginBottom: '1rem' }}>
                        <cat.icon size={24} strokeWidth={1.5} />
                        <span style={{ fontWeight: 800, fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.2em' }}>Intelligence Cluster 0{idx + 1}</span>
                    </div>
                    <h2 style={{ fontSize: '2.5rem', fontWeight: 900, color: 'var(--text-primary)', marginBottom: '0.75rem', letterSpacing: '-0.03em' }}>{cat.title}</h2>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', fontWeight: 500 }}>{cat.desc}</p>
                </div>
              </div>

              <div className="tools-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '2rem' }}>
                {cat.toolIds.map(id => {
                  const tool = tools.find(t => t.id === id);
                  if (!tool) return null;
                  return <ToolCard key={tool.path} tool={tool} />
                })}
              </div>
            </div>
          </section>
        ))}
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .ai-hub-container {
            background: var(--bg-primary);
            color: var(--text-primary);
        }
        .container-pro {
            max-width: 1400px;
            margin: 0 auto;
            padding: 0 2rem;
        }
        @media (max-width: 768px) {
            .container-pro { padding: 0 1.5rem; }
        }
        @media (max-width: 640px) {
            .tools-grid {
                grid-template-columns: 1fr !important;
            }
            .container-pro h1 { fontSize: 3.5rem !important; }
        }
      `}} />
    </>
  )
}
