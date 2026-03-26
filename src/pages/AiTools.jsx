import { MessageSquare, Sparkles, BrainCircuit, Target, Users, Zap, ShieldCheck, Globe } from 'lucide-react'
import ToolCard from '../components/ToolCard'
import SEO from '../components/SEO'
import ToolContent from '../components/ToolContent'
import { AI_TOOLS } from '../data/tools'

const tools = AI_TOOLS.filter(t => !t.status);

export default function AiTools() {
    return (
        <>
            <SEO 
                title="Premium AI Productivity Suite - Specialized Intelligence | PixTool"
                description="Access a world-class suite of 14 specialized AI tools. From Deep Mind reasoning to Narrative Forge storytelling, engineered for performance."
                path="/ai-tools"
                breadcrumbs={[
                    { name: 'AI Tools', item: '/ai-tools' }
                ]}
            />
            <div className="landing-layout">
                <div className="landing-center">
                    <div className="page-hero">
                        <div className="page-hero-content">
                            <h1 className="page-title" style={{ fontFamily: '"Manrope", sans-serif', fontWeight: 900, letterSpacing: '-0.04em', lineHeight: 1.1 }}>
                              Next-Gen <br/>
                              <span style={{ 
                                background: 'linear-gradient(135deg, #a855f7 0%, #ec4899 100%)',
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent',
                                backgroundSize: '200% auto',
                                animation: 'gradient-flow 6s linear infinite',
                                display: 'inline-block',
                                padding: '0.1em 0'
                              }}>Artificial Intelligence</span>
                            </h1>
                            <p className="page-subtitle" style={{ fontFamily: '"Inter", sans-serif', fontSize: '1.25rem', opacity: 0.9, marginTop: '1rem', lineHeight: 1.6 }}>
                                14 precision-engineered AI tools designed to architect, generate, and evolve your digital workflow with high-authority reasoning.
                            </p>
                        </div>
                    </div>

                    <div className="tools-grid" style={{ marginBottom: '4rem' }}>
                        {tools.map((tool) => (
                            <ToolCard key={tool.id} tool={tool} />
                        ))}
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '2rem', marginTop: '3rem' }}>
                        {[
                            { icon: Zap, title: 'Zero Latency', desc: 'Native streaming generation built for instant high-authority responses.' },
                            { icon: ShieldCheck, title: 'Privacy First', desc: 'Context-aware processing without permanent server-side data retention.' },
                            { icon: Globe, title: 'Global Context', desc: 'Engineered to understand over 50+ linguistic and cultural nuances.' }
                        ].map((feat, i) => (
                            <div key={i} style={{ textAlign: 'center' }}>
                                <div style={{ color: 'var(--accent-purple)', marginBottom: '1.5rem', display: 'flex', justifyContent: 'center' }}>
                                    <feat.icon size={36} />
                                </div>
                                <h2 style={{ fontWeight: 900, marginBottom: '0.75rem', fontSize: '1.25rem' }}>{feat.title}</h2>
                                <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.6, margin: 0 }}>{feat.desc}</p>
                            </div>
                        ))}
                    </div>

                    <div style={{ marginTop: '5rem' }}>
                        <ToolContent
                            title="AI Productivity Hub"
                            description="Access non-linear intelligence for complex problem-solving, rapid knowledge synthesis, and professional consulting. Build ATS-optimized resumes, viral social media structures, and conversion-ready business copy instantly."
                            benefits={[
                                "High-authority reasoning architecture",
                                "SEO-optimized semantic output",
                                "Multilingual structural generation",
                                "Instant stream-based responses"
                            ]}
                            howTo={[
                                "Select the specialized AI tool for your task",
                                "Provide clear context or parameters",
                                "Watch the intelligence engine stream your result",
                                "Iterate or refine the output dynamically"
                            ]}
                            tips={[
                                "Use 'Deep Mind' for complex logical queries and open-ended exploration.",
                                "Leverage 'Content Forge' for long-form SEO articles to ensure high-ranking structures.",
                                "Ensure you provide specific prompts to 'Resume Architect' for the best ATS matching."
                            ]}
                            useCases={[
                                { title: "Executive Communications", description: "Draft high-conversion professional emails and persuasive follow-ups tailored to enterprise scenarios." },
                                { title: "Automated Marketing", description: "Generate high-performance marketing copy optimized for Google, Meta, and LinkedIn algorithms." }
                            ]}
                            readNext={[]}
                        />
                    </div>
                </div>
            </div>
        </>
    )
}
