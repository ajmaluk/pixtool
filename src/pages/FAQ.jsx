import React, { useState } from 'react';
import SEO from '../components/SEO';
import { ChevronDown, ChevronUp, Search, HelpCircle } from 'lucide-react';
import { SITE_URL } from '../config/app.config';

const faqData = [
    {
        category: "General",
        questions: [
            { q: "Is PixTool really free?", a: "Yes, 100% free. Every tool on PixTool is available without any cost, subscription, or hidden fees. We support the platform through non-intrusive advertising." },
            { q: "Is my data safe and private?", a: "Absolutely. PixTool processes your files entirely within your browser. Your images, PDFs, and documents are never uploaded to any server. Once you close the tab, your data is gone." },
            { q: "Who is behind UTHAKKAN?", a: "UTHAKKAN is founded by Ajmal U K, a solo developer and MCA student dedicated to building clean, efficient digital tools." },
            { q: "Do I need to create an account?", a: "No account needed! All our tools work immediately without registration or login." },
            { q: "Are there any usage limits?", a: "No limits! Use our tools as much as you want, whenever you want." },
            { q: "Can I use PixTool for commercial purposes?", a: "Yes, absolutely! All processed files are yours to use for any purpose, including commercial." },
            { q: "What makes PixTool different?", a: "Unlike other online tools, we process everything in your browser. Your files never leave your device, ensuring maximum privacy and speed." },
            { q: "Do you offer an API?", a: "Currently we don't offer an API, but contact us if you're interested in custom integrations." }
        ]
    },
    {
        category: "Image Tools",
        questions: [
            { q: "What image formats are supported?", a: "Our image tools support all major formats including JPEG, PNG, WebP, GIF, BMP, and TIFF. You can also convert between formats." },
            { q: "Is there a limit to image size?", a: "Since processing happens locally, the limit depends on your device memory. Most modern browsers handle up to 100MB+ easily." },
            { q: "Can I batch process images?", a: "Yes! You can upload and process multiple images at once for resizing, cropping, rotating, and compressing." },
            { q: "Does image quality degrade after processing?", a: "No, our tools use advanced algorithms to maintain the highest quality possible." },
            { q: "Can I resize images for social media?", a: "Yes! We have preset sizes for Instagram, Facebook, Twitter, YouTube, LinkedIn, and more." },
            { q: "Do you support transparent PNGs?", a: "Yes, transparency is fully preserved when working with PNG files." },
            { q: "Can I compress images for my website?", a: "Absolutely! Our compressor can reduce file sizes by up to 80% while maintaining visual quality." },
            { q: "What resolution can I export?", a: "You can export at any resolution up to your original image's dimensions." }
        ]
    },
    {
        category: "PDF Tools",
        questions: [
            { q: "Can I merge multiple PDFs?", a: "Yes, you can merge as many PDF files as you like into a single high-quality document." },
            { q: "Does splitting a PDF reduce quality?", a: "No, our PDF tools preserve the original quality of the source document during split and merge operations." },
            { q: "Is my data safe during compression?", a: "Absolutely. All PDF compression happens locally in your browser using WebAssembly. Your files are never uploaded." },
            { q: "Can I convert images to PDF?", a: "Yes! Use our 'Image to PDF' tool to combine multiple photos into a single professional PDF document." },
            { q: "What's the maximum file size for PDF compression?", a: "Our local engine can handle PDFs up to several hundred MBs depending on your device's memory." },
            { q: "Can I extract specific pages from a PDF?", a: "Yes! Use our 'Split PDF' tool to extract individual pages or a range of pages instantly." },
            { q: "Is registration required for PDF tools?", a: "No. All PDF tools are 100% free with no registration, no watermarks, and no sign-ups." },
            { q: "Do you support OCR?", a: "Currently, we focus on high-speed manipulation. Advanced OCR (text recognition) is on our roadmap for later in 2026." }
        ]
    },
    {
        category: "Productivity Suite",
        questions: [
            { q: "Where is my Todo List and Kanban data stored?", a: "All productivity data (Tasks, Kanban boards, and Sticky Notes) is stored strictly in your browser's IndexedDB and LocalStorage. It remains available even after you close the tab." },
            { q: "Can I use the productivity tools offline?", a: "Yes! Once you've loaded PixTool, the Todo List, Kanban, and Draw tools work completely offline as all processing and storage are local." },
            { q: "How secure are my Notepad entries?", a: "Maximum security. Since we never upload your data, your private notes are only accessible on your physical device unless you choosing to download or export them." },
            { q: "Is there a limit to how many Sticky Notes I can create?", a: "There are no hard limits. You can fill your virtual board with as many notes as your browser storage allows." },
            { q: "Does the Habit Tracker lose data on refresh?", a: "No. Your progress is persisted in real-time, allowing you to track your streaks over weeks and months perfectly." }
        ]
    },
    {
        category: "Temp Mail",
        questions: [
            { q: "How long does temp email last?", a: "Your temporary email works as long as the tab is open. Close it or generate a new one to reset." },
            { q: "Can I send emails with temp mail?", a: "Currently we support receiving only, not sending. This prevents abuse while covering verification needs." },
            { q: "Are temp emails traceable?", a: "No, they're completely anonymous and leave no trace on your real identity." },
            { q: "What if a website blocks temp email?", a: "Generate a fresh email address. Our service uses multiple domains." }
        ]
    },
    {
        category: "QR Codes",
        questions: [
            { q: "What types of QR codes can I create?", a: "You can create QR codes for URLs, plain text, email addresses, phone numbers, and WiFi credentials." },
            { q: "Can I customize QR code colors?", a: "Yes! You can change the foreground and background colors." },
            { q: "What's the best QR code size?", a: "For printing, use 1000px+. For screens, 300-500px works well." },
            { q: "Will my QR code expire?", a: "No, QR codes generated here don't expire." }
        ]
    },
    {
        category: "Business",
        questions: [
            { q: "Do you offer custom development services?", a: "Yes, we offer custom web and software development, AI solutions, and automation consulting. Visit our Services page for more info." },
            { q: "How can I support UTHAKKAN?", a: "You can support us by using our tools, sharing them with others, or via 'Buy Me a Coffee'." },
            { q: "Do you offer white-label solutions?", a: "Contact us to discuss white-label options for your business." },
            { q: "Can I advertise on PixTool?", a: "Yes, we offer advertising opportunities. Contact us for rates." }
        ]
    }
];

export default function FAQ() {
    const [searchTerm, setSearchTerm] = useState('');
    const [openIndex, setOpenIndex] = useState(null);

    const filteredFaqs = faqData.map(category => ({
        ...category,
        questions: category.questions.filter(faq =>
            faq.q.toLowerCase().includes(searchTerm.toLowerCase()) ||
            faq.a.toLowerCase().includes(searchTerm.toLowerCase())
        )
    })).filter(category => category.questions.length > 0);

    const toggleFaq = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    const faqSchema = [
        {
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": faqData.flatMap((cat, catIdx) => cat.questions.map((q, qIdx) => ({
                "@type": "Question",
                "name": q.q,
                "url": `${SITE_URL}/faq#q-${catIdx}-${qIdx}`,
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": q.a
                }
            })))
        }
    ];

    return (
        <div className="faq-page">
            <SEO
                title="FAQ - Get Answers to Your Productivity Questions | PixTool"
                description="Frequently asked questions about PixTool, privacy policy, local file processing, and our range of online PDF and image tools."
                path="/faq"
                schema={faqSchema}
            />

            <section className="hero" style={{ padding: '6rem 2rem 4rem' }}>
                <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
                    <div style={{ display: 'inline-flex', padding: '12px', background: 'rgba(245, 158, 11, 0.1)', color: '#f59e0b', borderRadius: '50%', marginBottom: '1.5rem' }}>
                        <HelpCircle size={32} />
                    </div>
                    <h1 className="hero-title" style={{ fontSize: '3.5rem', fontWeight: 900, marginBottom: '1.5rem' }}>Common Questions</h1>

                    <div className="search-container" style={{ maxWidth: '600px', margin: '2rem auto 0' }}>
                        <Search size={20} className="navbar-search-icon" />
                        <input
                            type="text"
                            className="search-input"
                            placeholder="Search for answers..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            style={{ width: '100%', padding: '1rem 3rem' }}
                        />
                    </div>
                </div>
            </section>

            <section style={{ padding: '0 2rem 8rem' }}>
                <div style={{ maxWidth: '800px', margin: '0 auto' }}>
                    {filteredFaqs.length > 0 ? filteredFaqs.map((category, catIdx) => (
                        <div key={catIdx} style={{ marginBottom: '3rem' }}>
                            <h2 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--accent-primary)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '1.5rem' }}>
                                {category.category}
                            </h2>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                {category.questions.map((faq, qIdx) => {
                                    const index = `${catIdx}-${qIdx}`;
                                    const isOpen = openIndex === index;
                                    return (
                                        <div key={qIdx} className="tool-card" style={{ padding: '0', overflow: 'hidden' }}>
                                            <button
                                                onClick={() => toggleFaq(index)}
                                                style={{
                                                    width: '100%',
                                                    padding: '1.5rem 2rem',
                                                    display: 'flex',
                                                    justifyContent: 'space-between',
                                                    alignItems: 'center',
                                                    background: 'none',
                                                    border: 'none',
                                                    cursor: 'pointer',
                                                    textAlign: 'left'
                                                }}
                                            >
                                                <span style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--text-primary)' }}>{faq.q}</span>
                                                {isOpen ? <ChevronUp size={20} style={{ color: 'var(--accent-primary)' }} /> : <ChevronDown size={20} style={{ color: 'var(--text-muted)' }} />}
                                            </button>
                                            {isOpen && (
                                                <div style={{ padding: '0 2rem 1.5rem', color: 'var(--text-secondary)', lineHeight: 1.7 }}>
                                                    <div style={{ paddingTop: '1rem', borderTop: '1px solid var(--border-color)' }}>
                                                        {faq.a}
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    )) : (
                        <div style={{ textAlign: 'center', padding: '4rem', color: 'var(--text-muted)' }}>
                            No categories match your search.
                        </div>
                    )}
                </div>
            </section>
        </div>
    );
}
