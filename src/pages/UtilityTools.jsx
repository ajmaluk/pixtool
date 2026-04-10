import { Link } from 'react-router-dom'
import { Mail, QrCode, Smartphone } from 'lucide-react'
import ToolCard from '../components/ToolCard'
import SEO from '../components/SEO'
import ToolContent from '../components/ToolContent'
import AdSpace from '../components/AdSpace'
import { UTILITY_TOOLS, ALL_TOOLS_MAP } from '../data/tools'
import { SITE_URL } from '../config/app.config'

const tools = UTILITY_TOOLS;
const categoryMetadata = ALL_TOOLS_MAP['/utility-tools'];

export default function UtilityTools() {

    const utilitySchema = [
        {
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            "name": "Free Web Utility Tools - PixTool",
            "description": categoryMetadata.seo.description,
            "url": `${SITE_URL}/utility-tools`
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
                title={categoryMetadata.seo.title}
                description={categoryMetadata.seo.description}
                keywords={categoryMetadata.seo.keywords}
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
                            <h1 className="page-title" style={{ fontFamily: '"Manrope", sans-serif', fontWeight: 900, letterSpacing: '-0.04em', lineHeight: 1.1 }}>
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

                    <div className="tools-grid" style={{ marginBottom: '4rem' }}>
                        {tools.map((tool) => (
                            <ToolCard key={tool.id} tool={tool} />
                        ))}
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '2rem', marginTop: '3rem' }}>
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
                        <ToolContent {...categoryMetadata.editorial} />
                    </div>
                </div>
            </div>
        </>
    )
}
