import { Link } from 'react-router-dom'
import SEO from '../components/SEO'
import { FileText, Image as ImageIcon, Mail, QrCode, Shield, Info, User, Briefcase, MessageSquare, Book, Star, Phone, Home } from 'lucide-react'

const sitemapSections = [
    {
        title: "Core Tools",
        icon: Home,
        links: [
            { name: "Home", path: "/", description: "Access all our free online productivity tools from one central hub." }
        ]
    },
    {
        title: "Image Manipulation Tools",
        icon: ImageIcon,
        links: [
            { name: "All Image Tools", path: "/image-tools", description: "Browser-based suite for editing and optimizing photos." },
            { name: "Image Resizer", path: "/image-tools/resize", description: "Resize images by pixels or percentage for social media." },
            { name: "Image Cropper", path: "/image-tools/crop", description: "Crop photos to exact aspect ratios with pixel-perfect accuracy." },
            { name: "Image Compressor", path: "/image-tools/compress", description: "Reduce image file size without visible quality loss." },
            { name: "Format Converter", path: "/image-tools/convert", description: "Convert between JPEG, PNG, WebP, and GIF instantly." },
            { name: "Image Rotator", path: "/image-tools/rotate", description: "Rotate 90, 180 degrees or flip images horizontally/vertically." },
            { name: "Add Watermark", path: "/image-tools/watermark", description: "Protect your photos with custom text watermarks." },
            { name: "Grayscale & Filters", path: "/image-tools/grayscale", description: "Apply black & white, sepia, or invert color effects." },
            { name: "Flip Image", path: "/image-tools/flip", description: "Create mirror effects with horizontal or vertical flips." },
            { name: "Image Background Remover", path: "/image-tools/remove-background", description: "Remove image backgrounds instantly in your browser." },
            { name: "Image Upscaler", path: "/image-tools/upscale", description: "Increase image resolution while maintaining clarity." },
            { name: "Photo Restoration", path: "/image-tools/restore", description: "Restore old, blurry, or low-quality photos using AI." },
            { name: "Image to PDF", path: "/image-tools/image-to-pdf", description: "Convert multiple images into a single professional PDF." }
        ]
    },
    {
        title: "PDF Management Tools",
        icon: FileText,
        links: [
            { name: "All PDF Tools", path: "/pdf-tools", description: "Complete toolset for merging, splitting, and securing PDFs." },
            { name: "Merge PDF", path: "/pdf-tools/merge", description: "Combine multiple PDF documents into a single high-quality file." },
            { name: "Split PDF", path: "/pdf-tools/split", description: "Extract specific pages or ranges from your PDF documents." },
            { name: "Compress PDF", path: "/pdf-tools/compress", description: "Shrink large PDF files for easier emailing and sharing." },
            { name: "PDF to Image", path: "/pdf-tools/convert", description: "Convert PDF pages to high-resolution PNG or JPG images." },
            { name: "Protect PDF", path: "/pdf-tools/protect", description: "Secure your confidential PDFs with professional encryption." },
            { name: "Add PDF Watermark", path: "/pdf-tools/watermark", description: "Embed text stamps on every page of your PDF document." },
            { name: "Reorder PDF Pages", path: "/pdf-tools/reorder", description: "Rearrange pages in your PDF using drag-and-drop." },
            { name: "PDF to Word", path: "/pdf-tools/to-word", description: "Convert PDF documents to editable Microsoft Word files." },
            { name: "PDF to Excel", path: "/pdf-tools/to-excel", description: "Extract tables from PDF to Excel spreadsheets (.xlsx)." },
            { name: "PDF to PPT", path: "/pdf-tools/to-ppt", description: "Transform PDF pages into editable PowerPoint slides." },
            { name: "PDF Unlocker", path: "/pdf-tools/unlock", description: "Remove restrictions and passwords from your PDF files." }
        ]
    },
    {
        title: "Developer & Utility Suite",
        icon: Shield,
        links: [
            { name: "Code Diff Checker", path: "/code-diff", description: "Compare code blocks and generate diff patches instantly." },
            { name: "JSON Formatter", path: "/json-formatter", description: "Format, validate, and minify JSON data with syntax highlighting." },
            { name: "Unit Converter", path: "/unit-converter", description: "Convert between metric and imperial units for length, weight, and more." },
            { name: "Secure Password Generator", path: "/password-generator", description: "Generate strong, random passwords with custom entropy." },
            { name: "QR Code Generator", path: "/qr-generator", description: "Create custom QR codes for WiFi, URLs, and phone numbers." },
            { name: "QR Code Scanner", path: "/qr-scanner", description: "Safely scan and decode QR codes directly in your browser." },
            { name: "Typing Speed Test", path: "/typing-test", description: "Test and improve your typing WPM and accuracy like MonkeyType." }
        ]
    },
    {
        title: "Disposable Email Suite",
        icon: Mail,
        links: [
            { name: "All Temp Mail Tools", path: "/temp-mail", description: "Generate anonymous inbox to avoid spam and trackers." },
            { name: "10 Minute Mail", path: "/temp-mail/10-minute-mail", description: "Disposable email that auto-expires in 10 minutes." },
            { name: "Fake Email Generator", path: "/fake-email", description: "Random fake emails for testing and development." },
            { name: "Disposable Email", path: "/disposable-email", description: "One-time use email to protect your primary identity." },
            { name: "Throwaway Email", path: "/throwaway-email", description: "Burn-after-reading inbox for absolute privacy." }
        ]
    },
    {
        title: "Artificial Intelligence Suite",
        icon: MessageSquare,
        links: [
            { name: "All AI Tools", path: "/ai-tools", description: "Specialized suite of 14 next-gen AI tools for productivity." },
            { name: "Deep Mind", path: "/ai-tools/chat", description: "High-authority AI assistant for complex reasoning." },
            { name: "Content Forge", path: "/ai-tools/content-generator", description: "Architect high-authority blog posts and scripts." },
            { name: "Grammar Architect", path: "/ai-tools/grammar-fixer", description: "Linguistic perfection and professional tone checker." },
            { name: "Resume Architect", path: "/ai-tools/resume-generator", description: "Build career-winning, ATS-friendly resumes." },
            { name: "Code Intelligence", path: "/ai-tools/coding-chat", description: "24/7 senior developer AI for debugging and refactoring." },
            { name: "Professional Correspondence", path: "/ai-tools/email-writer", description: "Draft high-conversion professional business emails." },
            { name: "Marketing Pulse", path: "/ai-tools/ad-copy-generator", description: "Generate high-performance marketing and ad copy." },
            { name: "Social Pulse", path: "/ai-tools/caption-generator", description: "Viral captions for Instagram, TikTok, and X." },
            { name: "Nuance Engine", path: "/ai-tools/paraphraser", description: "Advanced Stylistic Rewriter and content transformer." },
            { name: "Intelligence Distiller", path: "/ai-tools/summarizer", description: "Condense massive documents into high-level summaries." },
            { name: "Linguist Intelligence", path: "/ai-tools/translator", description: "Context-aware global language translation." },
            { name: "SEO Architect", path: "/ai-tools/keyword-generator", description: "Generate high-intent keywords for search dominance." },
            { name: "Viral Density", path: "/ai-tools/hashtag-generator", description: "Find high-velocity tags to expand your digital footprint." },
            { name: "Narrative Forge", path: "/ai-tools/story-generator", description: " साहित्यिक architecture for capturing fictional arcs." }
        ]
    },
    {
        title: "Advanced Mathematics Suite",
        icon: Star,
        links: [
            { name: "All Math Tools", path: "/math-tools", description: "Professional suite for scientific calculation and data visualization." },
            { name: "Scientific Calculator", path: "/math-tools/scientific-calculator", description: "High-precision algebraic engine for complex engineering computations." },
            { name: "Graph Visualizer", path: "/math-tools/graph-visualizer", description: "Interactive functional plotting engine for 2D/3D visualizations." },
            { name: "Matrix Solver", path: "/math-tools/matrix-solver", description: "Linear algebra studio for matrix inversion and determinants." },
            { name: "Data Visualizer", path: "/math-tools/statistics-visualizer", description: "Transform raw data into high-authority statistical charts." },
            { name: "Equation Solver", path: "/math-tools/equation-solver", description: "Instant root finding and algebraic simplification for equations." },
            { name: "Unit Circle Studio", path: "/math-tools/unit-circle", description: "Interactive trigonometry visualizer for sines and cosines." },
            { name: "Finance Architect", path: "/math-tools/financial-calculator", description: "Advanced financial suite for TVM, Loans, and ROI analysis." },
            { name: "Number Theory Forge", path: "/math-tools/number-theory", description: "Analyze prime factorization, GCD, and modular arithmetic." },
            { name: "Fraction Pro", path: "/math-tools/fraction-calculator", description: "Precise fractional arithmetic with simplified step-by-step logic." },
            { name: "Vector Forge", path: "/math-tools/vector-calculator", description: "Calculate dot products and magnitudes with 3D visualization." }
        ]
    },
    {
        title: "Company & Resources",
        icon: Info,
        links: [
            { name: "About Us", path: "/about", description: "Learn about the mission and technology behind PixTool." },
            { name: "The Founder", path: "/founder", description: "Meet the creator of PixTool and the UTHAKKAN team." },
            { name: "Our Services", path: "/services", description: "Explore additional professional services we offer." },
            { name: "Testimonials", path: "/testimonials", description: "What our users say about their experience with PixTool." },
            { name: "Case Studies", path: "/case-studies", description: "In-depth look at how professionals use our tools." },
            { name: "Documentation", path: "/documentation", description: "Comprehensive guides on how to use every tool." },
            { name: "Contact Support", path: "/contact", description: "Get in touch for feedback, support, or collaboration." }
        ]
    },
    {
        title: "Expert Insights & Tutorials",
        icon: Book,
        links: [
            { name: "PixTool Blog", path: "/blog", description: "Main hub for all our technical articles and productivity guides." },
            { name: 'Claude vs ChatGPT vs Gemini 2026', path: '/blog/claude-vs-gpt-vs-gemini-2026', description: 'Comprehensive 2026 AI model comparison and benchmarks.' },
            { name: 'Maximizing AI Productivity', path: '/blog/maximizing-productivity-pixtool-ai', description: 'Pro workflows using the PixTool AI suite.' },
            { name: "Mastering PDF Tools", path: "/blog/ultimate-pdf-toolkit-merge-split-compress", description: "The professional guide to PDF manipulation." },
            { name: "Best Free PDF Tools 2026", path: "/blog/best-free-pdf-tools-online-2026", description: "Review of the top-rated PDF management utilities for this year." },
            { name: "Browser Privacy Guide", path: "/blog/privacy-first-why-pixtool-safest-studio", description: "Why local browser processing is the future of data security." },
            { name: "PDF to Word Tutorial", path: "/blog/how-to-convert-pdf-to-word-free-2026", description: "Step-by-step guide to high-fidelity document conversion." },
            { name: "Image Format Guide", path: "/blog/best-image-format-webp-avif-jpeg-2026", description: "Choosing between WebP, AVIF, and JPEG for optimal performance." },
            { name: "Social Media Resizing", path: "/blog/resize-images-social-media-2026", description: "Perfect dimensions for Instagram, LinkedIn, and Twitter posts." },
            { name: "AI Productivity Future", path: "/blog/future-of-ai-productivity", description: "How local AI models are transforming daily workflows." },
            { name: "PDF Security 101", path: "/blog/pdf-security-101-passwords-encryption-sharing", description: "Essential tips for encrypting and protecting sensitive documents." },
            { name: "QR: Static vs Dynamic", path: "/blog/qr-static-vs-dynamic-2026", description: "Choosing the right QR code type for your use case." },
            { name: "Secure Temp Mail", path: "/blog/secure-temp-mail-business-privacy-2026", description: "Advanced strategies for using disposable inboxes in business." },
            { name: "Advanced QR Marketing", path: "/blog/advanced-qr-code-marketing-2026", description: "Leveraging QR codes for offline-to-online conversion." },
            { name: "Bypass Email Spam", path: "/blog/how-to-bypass-email-spam-2026-guide", description: "The definitive guide to staying anonymous and spam-free." },
            { name: "Browser Privacy Deep-dive", path: "/blog/browser-based-privacy", description: "Technical look at why local processing is safer than cloud uploads." },
            { name: "The ToolPix Journey", path: "/blog/building-toolpix-journey", description: "Developer's story of building an advanced browser-based image engine." },
            { name: "Image Compression 101", path: "/blog/image-compression-lossless-vs-lossy-2026", description: "Everything you need to know about optimizing image file sizes." },
            { name: "Top AI Trends 2026", path: "/blog/top-ai-trends-2026-productivity-tools", description: "Five practical AI trends shaping productivity and search intent in 2026." },
            { name: "GPT-5 vs Gemini 3 vs Claude 4.5", path: "/blog/gpt-5-gemini-3-claude-4-5-model-comparison-2026", description: "Practical model comparison for teams choosing the right AI stack." },
            { name: 'Rise of Agentic AI', path: '/blog/rise-of-agentic-ai-in-software-development-2026', description: 'The transition from assistants to autonomous agents.' },
            { name: 'PixTool Origins', path: '/blog/pixtool-inspired-by-toolpix', description: 'The journey from ToolPix to the new privacy-first suite.' }
        ]
    },
    {
        title: "Legal Information",
        icon: Shield,
        links: [
            { name: "Privacy Policy", path: "/privacy-policy", description: "How we protect your data with 100% browser-based processing." },
            { name: "Terms of Service", path: "/terms-of-service", description: "The rules and guidelines for using our free tool suite." },
            { name: "Cookie Policy", path: "/cookie-policy", description: "Details on how we use local storage for performance." }
        ]
    }
]

export default function Sitemap() {
    // JSON-LD Schema for Sitemap Page
    const sitemapPageSchema = {
        "@context": "https://schema.org",
        "@type": "CollectionPage",
        "name": "Sitemap - All PixTool",
        "description": "Complete directory of all free online tools at PixTool. Find image editors, PDF processors, temp mail, and QR tools in one easy-to-navigate sitemap.",
        "url": `${import.meta.env.VITE_SITE_URL || 'https://www.pixtool.in'}/sitemap`,
        "mainEntity": {
            "@type": "ItemList",
            "name": "All PixTool Pages",
            "description": "Complete list of all pages and tools available on PixTool",
            "itemListElement": [
                { "@type": "ListItem", "position": 1, "name": "Home", "url": `${import.meta.env.VITE_SITE_URL || 'https://www.pixtool.in'}/` },
                { "@type": "ListItem", "position": 2, "name": "Image Tools", "url": `${import.meta.env.VITE_SITE_URL || 'https://www.pixtool.in'}/image-tools` },
                { "@type": "ListItem", "position": 3, "name": "PDF Tools", "url": `${import.meta.env.VITE_SITE_URL || 'https://www.pixtool.in'}/pdf-tools` },
                { "@type": "ListItem", "position": 4, "name": "AI Tools", "url": `${import.meta.env.VITE_SITE_URL || 'https://www.pixtool.in'}/ai-tools` },
                { "@type": "ListItem", "position": 5, "name": "Utility Tools", "url": `${import.meta.env.VITE_SITE_URL || 'https://www.pixtool.in'}/utility-tools` },
                { "@type": "ListItem", "position": 6, "name": "Code Diff", "url": `${import.meta.env.VITE_SITE_URL || 'https://www.pixtool.in'}/code-diff` },
                { "@type": "ListItem", "position": 7, "name": "JSON Formatter", "url": `${import.meta.env.VITE_SITE_URL || 'https://www.pixtool.in'}/json-formatter` },
                { "@type": "ListItem", "position": 8, "name": "Temporary Email", "url": `${import.meta.env.VITE_SITE_URL || 'https://www.pixtool.in'}/temp-mail` },
                { "@type": "ListItem", "position": 9, "name": "10 Minute Mail", "url": `${import.meta.env.VITE_SITE_URL || 'https://www.pixtool.in'}/temp-mail/10-minute-mail` },
                { "@type": "ListItem", "position": 10, "name": "About Us", "url": `${import.meta.env.VITE_SITE_URL || 'https://www.pixtool.in'}/about` },
                { "@type": "ListItem", "position": 11, "name": "Privacy Policy", "url": `${import.meta.env.VITE_SITE_URL || 'https://www.pixtool.in'}/privacy-policy` }
            ]
        }
    }

    return (
        <>
            <SEO
                title="HTML Sitemap | All Tools & Resources - PixTool"
                description="Complete directory of all free online tools at PixTool. Find image editors (resize, crop, compress, convert), PDF processors (merge, split, compress), temp mail, QR codes, and more. Browse our sitemap to find any tool instantly."
                keywords="sitemap, all tools, PixTool directory, free online tools list, image tools sitemap, PDF tools sitemap, utility tools sitemap"
                path="/sitemap"
                schema={sitemapPageSchema}
            />

            <div className="page-container" style={{ maxWidth: '1200px', padding: '4rem 2rem' }}>
                <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
                    <h1 style={{ fontSize: '3.5rem', fontWeight: 900, marginBottom: '1.5rem' }}>Site <span style={{ color: 'var(--accent-emerald)' }}>Map</span></h1>
                    <p style={{ fontSize: '1.25rem', color: 'var(--text-secondary)', maxWidth: '700px', margin: '0 auto' }}>
                        A comprehensive directory of all our free, browser-based tools and resources.
                    </p>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', gap: '2.5rem' }}>
                    {sitemapSections.map((section, idx) => (
                        <div key={idx} style={{ background: 'var(--bg-secondary)', padding: '2.5rem', borderRadius: '24px', border: '1px solid var(--border-color)', height: 'fit-content' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem' }}>
                                <div style={{ padding: '0.75rem', background: 'var(--bg-primary)', borderRadius: '12px', color: 'var(--accent-emerald)' }}>
                                    <section.icon size={24} />
                                </div>
                                <h2 style={{ fontSize: '1.5rem', fontWeight: 800 }}>{section.title}</h2>
                            </div>

                            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                                {section.links.map((link, lIdx) => (
                                    <Link
                                        key={lIdx}
                                        to={link.path}
                                        className="sitemap-link"
                                        style={{ textDecoration: 'none', display: 'block', group: 'true' }}
                                    >
                                        <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.25rem' }}>
                                            {link.name}
                                        </h3>
                                        <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: 1.4 }}>
                                            {link.description}
                                        </p>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>

                <div style={{ marginTop: '5rem', textAlign: 'center', padding: '3rem', background: 'var(--bg-secondary)', borderRadius: '24px', border: '1px dashed var(--border-color)' }}>
                    <h3 style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: '1rem' }}>Missing something?</h3>
                    <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem' }}>
                        We are constantly adding new tools to our suite. If you have a suggestion, we'd love to hear it.
                    </p>
                    <Link to="/contact" className="btn btn-primary" style={{ padding: '1rem 3rem' }}>
                        Suggest a Tool
                    </Link>
                </div>
            </div>

            <style>{`
        .sitemap-link {
          transition: all 0.2s ease;
        }
        .sitemap-link:hover h3 {
          color: var(--accent-emerald) !important;
          transform: translateX(5px);
        }
        .sitemap-link h3 {
          transition: all 0.2s ease;
        }
      `}</style>
        </>
    )
}
