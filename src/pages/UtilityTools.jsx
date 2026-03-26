import { Link } from 'react-router-dom'
import { Mail, QrCode, Smartphone, Type, Sliders } from 'lucide-react'
import ToolCard from '../components/ToolCard'
import SEO from '../components/SEO'
import ToolContent from '../components/ToolContent'
import { UTILITY_TOOLS } from '../data/tools'
import { UTILITY_SEO_CONTENT } from '../data/utilityToolsData'

const tools = UTILITY_TOOLS;

export default function UtilityTools() {
    const seoContentMap = UTILITY_SEO_CONTENT;
    const activeTool = null; // Category hub mode
    const seoContent = activeTool ? seoContentMap[activeTool] : {
        title: "Free Utility Tools | Temp Mail, Typing Test & QR Generator - PixTool",
        description: "Handy free online utility tools for daily productivity and security. Generate temp mail online, take a free typing test online, or use our custom QR code generator.",
        keywords: "free typing test online, temp mail online, qr code generator, online tools free, disposable email, utility tools"
    };

    const utilitySchema = [
        {
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            "name": "Free Web Utility Tools - PixTool",
            "description": seoContent.description,
            "url": `${import.meta.env.VITE_SITE_URL || 'https://www.pixtool.in'}/utility-tools`
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
                    "applicationCategory": "UtilitiesApplication"
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
                path="/utility-tools"
                schema={utilitySchema}
                breadcrumbs={[
                    { name: 'Utility Tools', item: '/utility-tools' }
                ]}
            />
            <div className="landing-layout">

                <div className="landing-center">
                    <div className="page-hero">
                        <div className="page-hero-content">
                            <h1 className="page-title" style={{ fontFamily: '"Manrope", sans-serif', fontSize: 'clamp(3rem, 8vw, 4.5rem)', fontWeight: 900, letterSpacing: '-0.04em', lineHeight: 1.1 }}>
                              Professional <br/>
                              <span style={{ 
                                background: 'linear-gradient(135deg, #10b981 0%, #f59e0b 100%)',
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent',
                                backgroundSize: '200% auto',
                                animation: 'gradient-flow 6s linear infinite',
                                display: 'inline-block',
                                padding: '0.1em 0'
                              }}>Dev Utilities</span>
                            </h1>
                            <p className="page-subtitle" style={{ fontFamily: '"Inter", sans-serif', fontSize: '1.25rem', opacity: 0.9, marginTop: '1rem', lineHeight: 1.6 }}>
                                Essential productivity and privacy tools for your daily digital life. Generate temp mail, scan QR codes, and practice your typing — 100% private and secure.
                            </p>
                        </div>
                    </div>

                    <div className="tools-grid" style={{ marginBottom: '6rem' }}>
                        {tools.map((tool) => (
                            <ToolCard key={tool.id} tool={tool} />
                        ))}
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '2.5rem', marginTop: '5rem' }}>
                        {[
                            { icon: Mail, title: 'Spam Protection', desc: 'Secure temporary email addresses to keep your primary inbox clean and safe.' },
                            { icon: QrCode, title: 'Instant Utilities', desc: 'Generate and scan QR codes directly from your browser camera with ease.' },
                            { icon: Smartphone, title: 'Privacy First', desc: 'All tools run locally. Your data never touches a server, ensuring total privacy.' }
                        ].map((feat, i) => (
                            <div key={i} style={{ textAlign: 'center' }}>
                                <div style={{ color: 'var(--accent-emerald)', marginBottom: '1.5rem', display: 'flex', justifyContent: 'center' }}>
                                    <feat.icon size={36} />
                                </div>
                                <h2 style={{ fontWeight: 900, marginBottom: '0.75rem', fontSize: '1.25rem' }}>{feat.title}</h2>
                                <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.6, margin: 0 }}>{feat.desc}</p>
                            </div>
                        ))}
                    </div>

                    <div style={{ marginTop: '5rem' }}>
                        <ToolContent
                            title="Utility & Privacy Suite"
                            description="Protect your privacy and optimize your workflow with our local-first utility studio. Every tool in this suite runs strictly within your browser's sandboxed environment, meaning your temporary emails, QR scan results, and typing data never touch a database or server. High-speed, high-security, and high-productivity tools at your fingertips."
                            benefits={[
                                "100% Browser-Based — absolute data privacy",
                                "Zero Latency — instant results without server delay",
                                "No Account Required — use everything anonymously",
                                "Expert Grade — built for daily professional use",
                                "Cross-Device Sync — access from any device instantly"
                            ]}
                            howTo={[
                                "Select a primary utility tool from the studio",
                                "Provide your input data or grant necessary permissions",
                                "Fine-tune settings for your specific requirements",
                                "Get your output instantly and securely"
                            ]}
                            tips={[
                                "Bookmark this page to have a quick-access privacy toolkit ready whenever you encounter suspicious websites or apps.",
                                "Use our 'Temp Mail' together with a 'QR Generator' to quickly create one-time contact points for events or marketing experiments.",
                                "Check your typing speed regularly to monitor your productivity levels as a developer or writer.",
                                "Always look for the 'local processing' badge on our tools—it ensures your data never leaves your computer."
                            ]}
                            useCases={[
                                { title: "Secure Account Verifications", description: "Use our utility suite to sign up for trials and forums without risking your primary identity or data." },
                                { title: "Field Marketing & Events", description: "Generate scannable codes and manage temporary communications at trade shows or meetups with ease." },
                                { title: "Student & Developer Practice", description: "Improve your typing efficiency and handle common data tasks like QR generation for project documentation." }
                            ]}
                            readNext={[
                                { title: 'The Ultimate Guide to Digital Privacy 2026', path: '/blog/browser-based-privacy' },
                                { title: 'Why Secure Temp Mail is Essential for Business', path: '/blog/secure-temp-mail-business-privacy-2026' },
                                { title: 'Mastering Productivity with PixTool Studio', path: '/blog/future-of-ai-productivity' }
                            ]}
                        />
                    </div>
                </div>
            </div>
        </>
    )
}
