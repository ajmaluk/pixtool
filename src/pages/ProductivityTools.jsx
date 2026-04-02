import { ListTodo, Layout, Pencil, FileText, Folder, Timer, StickyNote, Activity, Zap } from 'lucide-react'
import ToolCard from '../components/ToolCard'
import SEO from '../components/SEO'
import ToolContent from '../components/ToolContent'
import AdSpace from '../components/AdSpace'
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
                            title="The Future of Personal Productivity"
                            description="PixTool's Productivity Suite is built on the philosophy of 'Local-First' software. Unlike traditional cloud tools that store your sensitive notes and tasks on external servers, our suite operates entirely within your browser. This means zero latency, 100% offline capability, and absolute privacy for your most important workflows. Whether you're managing a complex project on a Kanban board or sketching a quick wireframe, your data stays where it belongs: with you."
                            benefits={[
                                "Military-Grade Privacy — all data stays on your device",
                                "Zero Latency Workflow — instant responses without server calls",
                                "Offline-Ready Architecture — work from anywhere without internet",
                                "Professional UI/UX — designed for focus and aesthetic pleasure",
                                "IndexedDB Power — handles massive amounts of local data efficiently"
                            ]}
                            howTo={[
                                "Choose a productivity tool from the studio dashboard",
                                "Configure your initial settings or import existing data",
                                "Engage with the tool's interactive features locally",
                                "Export your work as high-quality files whenever needed"
                            ]}
                            tips={[
                                "Use the 'File Vault' as a central staging area for all your local PixTool assets.",
                                "Combine the 'Pomodoro Timer' with our 'Todo List' for maximum focus during deep work sessions.",
                                "Regularly export your databases from the 'File Manager' to maintain cross-browser backups of your local data.",
                                "Try the 'Drawing Board' for quick visual brainstorming during your Kanban planning phases."
                            ]}
                            useCases={[
                                { title: "Personal Project Tracking", description: "Manage your side projects and daily goals without worrying about cloud subscription costs or data privacy." },
                                { title: "Private Note Taking", description: "Draft sensitive documents or personal journals using our Markdown editor with 100% confidence in privacy." },
                                { title: "Creative Brainstorming", description: "Use the Drawing Board and Sticky Notes to map out complex ideas visually and securely." }
                            ]}
                            readNext={[
                                { title: 'The Ultimate Guide to Browser-Based Privacy', path: '/blog/browser-based-privacy' },
                                { title: 'Mastering Productivity with PixTool Studio', path: '/blog/future-of-ai-productivity' },
                                { title: 'Building a Private Digital Workspace in 2026', path: '/blog/building-toolpix-journey' }
                            ]}
                        />
                    </div>
                </div>
            </div>
        </>
    )
}
