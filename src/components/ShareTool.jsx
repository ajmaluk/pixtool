import { useState } from 'react'
import { Share2, Check, Copy, Twitter, Linkedin, Facebook } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

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

    const handleNativeShare = () => {
        if (navigator.share) {
            navigator.share({
                title,
                url,
            }).catch(() => { })
        } else {
            setShowMenu(!showMenu)
        }
    }

    return (
        <div className="share-tool-container" style={{ position: 'relative', display: 'inline-block' }}>
            <button
                className="btn btn-secondary share-btn"
                onClick={handleNativeShare}
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    padding: '0.6rem 1.2rem',
                    borderRadius: '12px',
                    fontWeight: 700,
                    background: 'var(--bg-glass)',
                    border: '1px solid var(--border-color)',
                    backdropFilter: 'blur(10px)',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease'
                }}
            >
                <Share2 size={18} />
                <span>Share Tool</span>
            </button>

            <AnimatePresence>
                {showMenu && (
                    <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        style={{
                            position: 'absolute',
                            top: '120%',
                            right: 0,
                            width: '240px',
                            background: 'var(--bg-card)',
                            border: '1px solid var(--border-color)',
                            borderRadius: '20px',
                            padding: '1rem',
                            boxShadow: 'var(--shadow-lg)',
                            zIndex: 100,
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '0.5rem'
                        }}
                    >
                        <div style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em', padding: '0 0.5rem 0.5rem' }}>
                            Spread the word
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
                )}
            </AnimatePresence>

            <style dangerouslySetInnerHTML={{
                __html: `
        .share-btn:hover {
          background: var(--bg-secondary);
          transform: translateY(-2px);
          border-color: var(--accent-primary);
        }
        .share-option:hover {
          background: var(--bg-secondary);
          transform: translateX(4px);
        }
      `}} />
        </div>
    )
}
