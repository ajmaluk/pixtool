import { Link } from 'react-router-dom'
import { Mail, QrCode, Smartphone, Type, Sliders } from 'lucide-react'
import SEO from '../components/SEO'
import ToolContent from '../components/ToolContent'
import AdSpace from '../components/AdSpace'
import { UTILITY_TOOLS } from '../data/tools'
import { UTILITY_SEO_CONTENT } from '../data/utilityToolsData'

const tools = UTILITY_TOOLS;

export default function UtilityTools() {
    const seoContentMap = UTILITY_SEO_CONTENT;
    const activeTool = null; // Category hub mode
    const seoContent = activeTool ? seoContentMap[activeTool] : {
        title: "Free Utility Tools | Productivity & Security Suite - DailyTools",
        description: "Handy free online utility tools for daily productivity, security, and communication. Includes temporary email, QR code generator, and QR scanner.",
        keywords: "utility tools, temp mail, qr scanner, qr generator, typing test, online tools free"
    };

    return (
        <>
            <SEO
                title={seoContent.title}
                description={seoContent.description}
                keywords={seoContent.keywords}
                path="/utility-tools"
                breadcrumbs={[
                    { name: 'Utility Tools', item: '/utility-tools' }
                ]}
            />
            <div className="landing-layout">
                <AdSpace type="side" className="desktop-only" />

                <div className="landing-center">
                    <div className="page-hero">
                        <div className="page-hero-content">
                            <h1 className="page-title">Smart <span style={{ color: 'var(--accent-emerald)' }}>Utilities</span></h1>
                            <p className="page-subtitle">
                                Essential productivity and privacy tools for your daily digital life. Generate temp mail, scan QR codes, and practice your typing — 100% private and secure.
                            </p>
                        </div>
                    </div>

                    <div className="tools-grid" style={{ marginBottom: '6rem' }}>
                        {tools.map((tool) => (
                            <Link
                                key={tool.id}
                                to={tool.path}
                                className="tool-card"
                                style={{ border: '1px solid var(--border-color)', height: '100%', textDecoration: 'none', padding: 0, overflow: 'hidden' }}
                            >
                                <div style={{ aspectRatio: '16/9', background: 'var(--bg-secondary)', overflow: 'hidden', borderBottom: '1px solid var(--border-color)' }}>
                                    <img 
                                        src={`/screenshots/${tool.screenshot}`} 
                                        alt={`${tool.title} interface preview - Specialized daily productivity tool by DailyTools`}
                                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                        onError={(e) => {
                                            e.target.style.display = 'none';
                                            e.target.parentElement.style.background = 'rgba(16, 185, 129, 0.05)';
                                            e.target.parentElement.innerHTML = `<div style="height: 100%; display: flex; align-items: center; justify-content: center; color: var(--accent-emerald)"><div style="padding: 1.5rem; background: rgba(16, 185, 129, 0.08); border-radius: 20px;"><svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/></svg></div></div>`;
                                        }}
                                    />
                                </div>
                                <div style={{ padding: '1.5rem' }}>
                                    <div className="tool-card-header">
                                        <div className="tool-card-icon" style={{ background: 'rgba(16, 185, 129, 0.08)', color: 'var(--accent-emerald)' }}>
                                            <tool.icon size={22} />
                                        </div>
                                        <div className="tool-card-title-group">
                                            <h3 className="tool-card-title">{tool.title}</h3>
                                        </div>
                                    </div>
                                    <p className="tool-card-description">{tool.description}</p>
                                </div>
                            </Link>
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
                                <h4 style={{ fontWeight: 900, marginBottom: '0.75rem', fontSize: '1.1rem' }}>{feat.title}</h4>
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
                                { title: 'Mastering Productivity with DailyTools Studio', path: '/blog/future-of-ai-productivity' }
                            ]}
                        />
                    </div>
                </div>

                <AdSpace type="side" className="desktop-only" />
            </div>
        </>
    )
}
