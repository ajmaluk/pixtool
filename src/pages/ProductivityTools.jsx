import { ListTodo, Layout, Pencil, FileText, Folder, Timer, StickyNote, Activity, Zap } from 'lucide-react'
import ToolCard from '../components/ToolCard'
import SEO from '../components/SEO'
import ToolContent from '../components/ToolContent'
import { SITE_URL } from '../config/app.config'
import { PRODUCTIVITY_TOOLS } from '../data/tools'
import { PRODUCTIVITY_SEO_CONTENT } from '../data/productivityToolsData'

const tools = PRODUCTIVITY_TOOLS;

export default function ProductivityTools() {
    const seoContentMap = PRODUCTIVITY_SEO_CONTENT;
    const activeTool = null; // Category hub mode
    const seoContent = activeTool ? seoContentMap[activeTool] : {
        title: "Free Online Productivity Tools | Todo, Kanban, Notepad & More - PixTool",
        description: "Professional browser-based productivity suite. Manage tasks with our Todo List, track projects with a Kanban Board, edit Markdown in our Notepad, or sketch ideas on the Drawing Board—100% private and secure.",
        keywords: "productivity tools online 2026, free todo list browser, kanban board free, online notepad markdown, secure file manager, browser-based drawing board"
    };

    const productivitySchema = [
        {
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            "name": "Free Web Productivity Tools - PixTool",
            "description": seoContent.description,
            "url": `${SITE_URL}/productivity-tools`
        },
        {
            "@context": "https://schema.org",
            "@type": "ItemList",
            "itemListElement": tools.map((tool, index) => ({
                "@type": "ListItem",
                "position": index + 1,
                "item": {
                    "@type": "SoftwareApplication",
                    "name": tool.title,
                    "description": tool.description,
                    "applicationCategory": "ProductivityApplication"
                }
            }))
        }
    ];

    return (
        <>
            <SEO
                title={seoContent.title}
                description={seoContent.description}
                keywords={seoContent.keywords}
                path="/productivity-tools"
                schema={productivitySchema}
                breadcrumbs={[
                    { name: 'Productivity Tools', item: '/productivity-tools' }
                ]}
            />
            <div className="landing-layout">
                <div className="landing-center">
                    <div className="page-hero">
                        <div className="page-hero-content">
                            <h1 className="page-title" style={{ fontFamily: '"Manrope", sans-serif', fontWeight: 900, letterSpacing: '-0.04em', lineHeight: 1.1 }}>
                                Premium <br/>
                                <span style={{ 
                                  background: 'linear-gradient(135deg, #6366f1 0%, #a855f7 100%)',
                                  WebkitBackgroundClip: 'text',
                                  WebkitTextFillColor: 'transparent',
                                  backgroundSize: '200% auto',
                                  animation: 'gradient-flow 6s linear infinite',
                                  display: 'inline-block',
                                  padding: '0.1em 0'
                                }}>Productivity Suite</span>
                            </h1>
                            <p className="page-subtitle" style={{ fontFamily: '"Inter", sans-serif', fontSize: '1.25rem', opacity: 0.9, marginTop: '1rem', lineHeight: 1.6 }}>
                                High-performance, private-first utilities for your daily workflow. From complex task management to creative sketching — all powered by your browser.
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
                            { icon: ListTodo, title: 'Task Mastery', desc: 'Powerful task and project tracking tools designed for individual and professional performance.' },
                            { icon: Pencil, title: 'Creative Freedom', desc: 'Full digital canvas and brainstorming boards with zero data logging or server tracking.' },
                            { icon: Folder, title: 'Data Sovereignty', desc: 'Your files, your data. Everything is stored locally in your browser\'s secure sandbox.' }
                        ].map((feat, i) => (
                            <div key={i} style={{ textAlign: 'center' }}>
                                <div style={{ color: 'var(--accent-primary)', marginBottom: '1.5rem', display: 'flex', justifyContent: 'center' }}>
                                    <feat.icon size={36} />
                                </div>
                                <h2 style={{ fontWeight: 900, marginBottom: '0.75rem', fontSize: '1.25rem' }}>{feat.title}</h2>
                                <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.6, margin: 0 }}>{feat.desc}</p>
                            </div>
                        ))}
                    </div>

                    <div style={{ marginTop: '5rem' }}>
                        <ToolContent
                            title="Integrated Productivity Studio"
                            description="The Productivity Studio is designed for practical day-to-day execution: planning, writing, tracking, and focused delivery. Instead of forcing users into one generic workspace, PixTool separates workflows into purpose-built tools with clear output. This improves completion rate, usability, and content value for both people and search engines."
                            benefits={[
                                "Local-First Reliability: Notes and tasks remain available even during network instability.",
                                "Focused Tool Surfaces: Kanban, todo, notes, and timers are optimized for distinct jobs.",
                                "Fast Interaction Loops: Minimal friction from capture to completion.",
                                "Portable Outputs: Export-ready formats simplify team collaboration and backup.",
                                "Privacy-Centered Design: Sensitive planning data stays on user-controlled devices."
                            ]}
                            howTo={[
                                "Select the tool matching your current phase: capture, organize, execute, or review.",
                                "Define a short daily objective and map tasks by priority and effort.",
                                "Track progress in focused time blocks, then update status immediately.",
                                "Review incomplete items and convert carry-over tasks into explicit next actions.",
                                "Export snapshots for reporting, archiving, or cross-device continuity."
                            ]}
                            tips={[
                                "Use a weekly review cadence to clean stale tasks and preserve board quality.",
                                "Break large tasks into outcomes that can be completed in one focus session.",
                                "Capture decisions in notes immediately after meetings to avoid context loss.",
                                "Track only a small set of core habits to improve consistency and signal quality."
                            ]}
                            useCases={[
                                { title: "Confidential Project Planning", description: "Design complex project roadmaps on our Kanban boards with absolute confidence that sensitive milestones remain private." },
                                { title: "Strategic Brainstorming", description: "Map out chaotic ideas using Sticky Notes and Drawing Boards, then export them as professional design assets." },
                                { title: "Deep Work Management", description: "Architect a distraction-free environment using our integrated focus timers and task priority systems." }
                            ]}
                            alternativeTo={["Trello", "Notion", "Todoist", "Excalidraw"]}
                            readNext={[
                                { title: '📂 Building a Private Digital Workspace in 2026', path: '/blog/building-toolpix-journey' },
                                { title: '🧠 The Science of Deep Work and Focus Intervals', path: '/blog/future-of-ai-productivity' },
                                { title: '🔒 Why Local-First is the Future of Professional Software', path: '/blog/browser-based-privacy' }
                            ]}
                            faq={[
                                { q: "Where is my productivity data saved?", a: "Your data is stored strictly in your browser's local storage (IndexedDB). No one else—not even PixTool admins—can access your tasks or notes." },
                                { q: "Can I use these tools on my phone?", a: "Yes. The entire Productivity Studio is responsive and utilizes modern touch-gestures for mobile task management." },
                                { q: "Is there a limit to how many tasks I can create?", a: "The only limit is your device's storage capacity. Our IndexedDB architecture can comfortably handle thousands of tasks and notes locally." }
                            ]}
                        />
                    </div>
                </div>
            </div>
        </>
    )
}
