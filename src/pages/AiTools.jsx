import { Zap, ShieldCheck, Globe } from 'lucide-react'
import ToolCard from '../components/ToolCard'
import SEO from '../components/SEO'
import ToolContent from '../components/ToolContent'
import { AI_TOOLS } from '../data/tools'

const tools = AI_TOOLS.filter(t => !t.status);

export default function AiTools() {
    return (
        <>
            <SEO 
                title="Premium Free AI Productivity Suite - Specialized Intelligence | PixTool"
                description="🚀 Access 14+ specialized free AI tools: writing, coding, marketing, and storytelling. Powered by high-authority reasoning and privacy-first processing. No account needed."
                keywords="free ai tools, ai productivity suite, ai writing assistant, ai content generator, toolpix ai, ai resume generator, ai coding assistant, best free ai tools 2026, privacy-first ai, ai tools online, no signup ai tools"
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
                            title="PixTool Intelligence Studio"
                            description="The PixTool AI hub is built to offer valuable, task-specific utility rather than thin generic chat output. Each tool has a focused job, clear workflow, and practical output format for professionals in writing, coding, research, and growth. We prioritize transparent behavior, privacy-first operations, and stable tool performance so users can trust the result quality on every session."
                            benefits={[
                                "AI Ethics & Local Metadata: We minimize stored metadata and design for user-controlled sessions.",
                                "Prompt Engineering for Professionals: Structured prompts produce predictable, high-utility outputs.",
                                "Zero-Training Guarantee: User prompts are not used by PixTool to train proprietary models.",
                                "Specialized Workflows: Purpose-built AI tools for coding, writing, SEO, and communication.",
                                "Actionable Output Quality: Built for direct use in production workflows with less manual cleanup."
                            ]}
                            howTo={[
                                "Pick a focused AI tool based on your objective (content, code, SEO, outreach, or analysis).",
                                "Provide concrete context including audience, constraints, tone, and output format.",
                                "Generate a first draft and evaluate against your acceptance criteria.",
                                "Refine with targeted follow-up prompts instead of broad rewrites.",
                                "Publish, test performance, and iterate with measurable feedback."
                            ]}
                            tips={[
                                "For higher ranking potential, prompt with search intent, target entity, and internal-link target before generation.",
                                "Use explicit quality checks: factuality, style compliance, originality, and conversion clarity.",
                                "When drafting ads or outreach, request multiple variants and test by audience segment.",
                                "Keep prompts concise but specific; long vague prompts usually lower output precision."
                            ]}
                            useCases={[
                                { title: "Editorial Operations", description: "Produce blog outlines, FAQ sets, and metadata drafts that are easier to review and publish." },
                                { title: "Technical Documentation", description: "Turn implementation details into structured docs, changelogs, and developer-facing guides." },
                                { title: "Growth Experimentation", description: "Generate campaign variants and iterate quickly with conversion feedback from real traffic." }
                            ]}
                            alternativeTo={["ChatGPT Plus", "Claude Pro", "Jasper AI", "Copy.ai"]}
                            readNext={[
                                { title: '🤖 Claude vs GPT vs Gemini 2026: The Ultimate AI Model Comparison', path: '/blog/claude-vs-gpt-vs-gemini-2026' },
                                { title: '✍️ Maximizing Content Velocity with PixTool AI Forge', path: '/blog/maximizing-productivity-pixtool-ai' },
                                { title: '🚀 The Future of Agentic AI in Professional Workflows', path: '/blog/rise-of-agentic-ai-in-software-development-2026' }
                            ]}
                            faq={[
                                { q: "Does PixTool store my AI prompts?", a: "No. All AI interactions are session-based. We do not retain prompt history or metadata once your session is closed, ensuring maximum security for sensitive data." },
                                { q: "Which model powers PixTool AI?", a: "We use a multi-model routing architecture that selects the most efficient engine (from GPT-4o, Claude 3.5, or Gemini 1.5) based on your specific tool choice." },
                                { q: "Is the AI output safe for commercial use?", a: "Yes. All content generated by PixTool AI is yours to use commercially without attribution, though we recommend a final human review for style and brand alignment." }
                            ]}
                        />
                    </div>
                </div>
            </div>
        </>
    )
}
