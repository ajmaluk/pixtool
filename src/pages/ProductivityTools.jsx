import { ListTodo, Layout, Pencil, FileText, Folder, Timer, StickyNote, Activity, Zap } from 'lucide-react'
import ToolCard from '../components/ToolCard'
import SEO from '../components/SEO'
import ToolContent from '../components/ToolContent'
import { SITE_URL } from '../config/app.config'
import { PRODUCTIVITY_TOOLS, ALL_TOOLS_MAP } from '../data/tools'

const tools = PRODUCTIVITY_TOOLS;
const categoryMetadata = ALL_TOOLS_MAP['/productivity-tools'];

export default function ProductivityTools() {
    const productivitySchema = [
        {
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            "name": "Free Web Productivity Tools - PixTool",
            "description": categoryMetadata.seo.description,
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
                title={categoryMetadata.seo.title}
                description={categoryMetadata.seo.description}
                keywords={categoryMetadata.seo.keywords}
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
                        <ToolContent {...categoryMetadata.editorial} />
                    </div>
                </div>
            </div>
        </>
    )
}

