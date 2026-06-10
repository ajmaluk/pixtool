import { useState } from 'react'
import ToolCard from './ToolCard'
import { motion } from 'framer-motion'

export default function CategorySection({
  icon: IconComponent,
  iconBg = 'rgba(168, 85, 247, 0.08)',
  iconColor = '#a855f7',
  title,
  subtitle,
  tools = [],
  initialCount = 6,
  showMore = false,
  onToggleShowMore,
}) {
  const [localShowMore, setLocalShowMore] = useState(false)
  const isExpanded = onToggleShowMore ? showMore : localShowMore
  const toggle = onToggleShowMore || (() => setLocalShowMore(!localShowMore))
  const visibleTools = isExpanded ? tools : tools.slice(0, initialCount)
  const hasMore = tools.length > initialCount

  return (
    <motion.section
      style={{ marginBottom: '6rem', position: 'relative' }}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
    >
      <div
        style={{
          position: 'sticky',
          top: '80px',
          zIndex: 10,
          background: 'rgba(var(--bg-primary-rgb), 0.7)',
          backdropFilter: 'blur(24px)',
          WebkitBackdropFilter: 'blur(24px)',
          padding: '1.5rem 0',
          marginBottom: '3rem',
          boxShadow: '0 4px 40px rgba(0, 0, 0, 0.05)',
          borderBottom: '1px solid rgba(255,255,255,0.05)',
          display: 'flex',
          alignItems: 'center',
          gap: '1.2rem',
          borderRadius: '0 0 24px 24px'
        }}
      >
        <div style={{ padding: '0.6rem', background: iconBg, borderRadius: '12px', color: iconColor }}>
          {IconComponent && <IconComponent size={24} />}
        </div>
        <div>
          <h2 style={{
            fontSize: '1.8rem',
            fontWeight: 900,
            margin: 0,
            letterSpacing: '-0.02em'
          }}>
            {title}
            {subtitle && (
              <span style={{
                color: 'var(--text-muted)',
                fontSize: '1rem',
                fontWeight: 500,
                marginLeft: '0.5rem'
              }}>
                {subtitle}
              </span>
            )}
          </h2>
        </div>
      </div>

      <motion.div
        className="tools-grid"
        layout
      >
        {visibleTools.map((tool, index) => (
          <ToolCard key={tool.path} tool={tool} index={index} />
        ))}
      </motion.div>

      {hasMore && (
        <div style={{ textAlign: 'center', marginTop: '2rem' }}>
          <motion.button
            onClick={toggle}
            className="btn btn-secondary"
            style={{ minWidth: '120px' }}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
          >
            {isExpanded ? 'Show Less' : `Show ${tools.length - initialCount} More`}
          </motion.button>
        </div>
      )}
    </motion.section>
  )
}
