import { motion } from 'framer-motion'

export function CardSkeleton({ count = 3 }) {
  return (
    <div className="tools-grid">
      {Array.from({ length: count }).map((_, i) => (
        <motion.div
          key={i}
          className="tool-card-container"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.1 }}
        >
          <div
            className="skeleton-card"
            style={{
              background: 'var(--bg-secondary)',
              borderRadius: '24px',
              padding: '1.5rem',
              border: '1px solid var(--border-color)',
              overflow: 'hidden'
            }}
          >
            <div
              className="skeleton-shimmer"
              style={{
                width: '48px',
                height: '48px',
                borderRadius: '14px',
                background: 'var(--bg-primary)',
                marginBottom: '1.25rem',
                position: 'relative',
                overflow: 'hidden'
              }}
            />
            <div
              className="skeleton-shimmer"
              style={{
                width: '60%',
                height: '20px',
                borderRadius: '8px',
                background: 'var(--bg-primary)',
                marginBottom: '0.75rem',
                position: 'relative',
                overflow: 'hidden'
              }}
            />
            <div
              className="skeleton-shimmer"
              style={{
                width: '90%',
                height: '14px',
                borderRadius: '8px',
                background: 'var(--bg-primary)',
                position: 'relative',
                overflow: 'hidden'
              }}
            />
          </div>
        </motion.div>
      ))}
    </div>
  )
}

export function SectionSkeleton({ height = '400px' }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      style={{
        minHeight: height,
        background: 'var(--bg-secondary)',
        borderRadius: '40px',
        margin: '2rem 0',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      <div
        className="skeleton-shimmer"
        style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.03), transparent)',
          backgroundSize: '200% 100%',
          animation: 'skeleton-shimmer 2s infinite',
        }}
      />
    </motion.div>
  )
}
