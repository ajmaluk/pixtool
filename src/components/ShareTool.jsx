import { useState } from 'react'
import { Share2, Check, Copy, Twitter, Linkedin, Facebook, X } from 'lucide-react'
// eslint-disable-next-line no-unused-vars
import { AnimatePresence, motion } from 'framer-motion'

export default function ShareTool({ title, url = window.location.href }) {
    const [showMenu, setShowMenu] = useState(false)
    const [copied, setCopied] = useState(false)

    const handleCopy = () => {
        navigator.clipboard.writeText(url)
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
    }

    const shareOptions = [
        { name: 'X / Twitter', icon: Twitter, color: '#000000', link: `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}` },
        { name: 'LinkedIn', icon: Linkedin, color: '#0077b5', link: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}` },
        { name: 'Facebook', icon: Facebook, color: '#1877f2', link: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}` },
    ]

    const handleToggle = () => {
        if (navigator.share) {
            navigator.share({ title, url }).catch(() => { })
        } else {
            setShowMenu(!showMenu)
        }
    }

    return (
        <>
            {/* Floating Action Button */}
            <button
                className="share-fab"
                onClick={handleToggle}
                aria-label="Share this tool"
                style={{
                    position: 'fixed',
                    bottom: '2rem',
                    left: '2rem',
                    width: '48px',
                    height: '48px',
                    borderRadius: '50%',
                    background: 'var(--accent-primary)',
                    color: 'white',
                    border: 'none',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    zIndex: 900,
                    boxShadow: '0 4px 20px rgba(99, 102, 241, 0.4)',
                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                }}
            >
                <Share2 size={20} />
            </button>

            {/* Share Menu Popup */}
            <AnimatePresence>
                {showMenu && (
                    <>
                        <div
                            style={{
                                position: 'fixed',
                                inset: 0,
                                zIndex: 950,
                            }}
                            onClick={() => setShowMenu(false)}
                        />
                        <motion.div
                            initial={{ opacity: 0, y: 20, scale: 0.9 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 20, scale: 0.9 }}
                            transition={{ duration: 0.2, ease: 'easeOut' }}
                            style={{
                                position: 'fixed',
                                bottom: '5.5rem',
                                left: '2rem',
                                width: '240px',
                                background: 'var(--bg-card)',
                                border: '1px solid var(--border-color)',
                                borderRadius: '20px',
                                padding: '1rem',
                                boxShadow: 'var(--shadow-lg)',
                                zIndex: 1000,
                                display: 'flex',
                                flexDirection: 'column',
                                gap: '0.5rem'
                            }}
                        >
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0 0.5rem 0.5rem' }}>
                                <div style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                                    Spread the word
                                </div>
                                <button
                                    onClick={() => setShowMenu(false)}
                                    style={{
                                        background: 'none',
                                        border: 'none',
                                        cursor: 'pointer',
                                        color: 'var(--text-muted)',
                                        padding: '2px',
                                        display: 'flex',
                                        alignItems: 'center',
                                    }}
                                >
                                    <X size={14} />
                                </button>
                            </div>

                            <button
                                onClick={handleCopy}
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '12px',
                                    width: '100%',
                                    padding: '0.75rem',
                                    border: 'none',
                                    background: copied ? 'rgba(16, 185, 129, 0.1)' : 'transparent',
                                    borderRadius: '12px',
                                    cursor: 'pointer',
                                    color: copied ? '#10b981' : 'var(--text-primary)',
                                    transition: 'all 0.2s ease',
                                    textAlign: 'left'
                                }}
                            >
                                {copied ? <Check size={18} /> : <Copy size={18} />}
                                <span style={{ fontWeight: 600 }}>{copied ? 'Link Copied!' : 'Copy Tool URL'}</span>
                            </button>

                            {shareOptions.map(option => (
                                <a
                                    key={option.name}
                                    href={option.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '12px',
                                        padding: '0.75rem',
                                        borderRadius: '12px',
                                        textDecoration: 'none',
                                        color: 'var(--text-primary)',
                                        transition: 'all 0.2s ease'
                                    }}
                                    className="share-option"
                                >
                                    <option.icon size={18} style={{ color: option.color }} />
                                    <span style={{ fontWeight: 600 }}>Share on {option.name}</span>
                                </a>
                            ))}
                        </motion.div>
                    </>
                )}
            </AnimatePresence>

            <style dangerouslySetInnerHTML={{
                __html: `
        .share-fab:hover {
          transform: scale(1.1);
          box-shadow: 0 6px 28px rgba(99, 102, 241, 0.5);
        }
        .share-fab:active {
          transform: scale(0.95);
        }
        .share-option:hover {
          background: var(--bg-secondary);
          transform: translateX(4px);
        }
        @media (max-width: 768px) {
          .share-fab {
            bottom: 1.25rem !important;
            left: 1.25rem !important;
            width: 44px !important;
            height: 44px !important;
          }
        }
      `}} />
        </>
    )
}
