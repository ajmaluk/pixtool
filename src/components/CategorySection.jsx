import { useState } from 'react'
import ToolCard from './ToolCard'
import { motion } from 'framer-motion'
import { ChevronDown, ChevronUp } from 'lucide-react'

export default function CategorySection({
  icon: IconComponent,
  iconBg = 'rgba(168, 85, 247, 0.12)',
  iconColor = '#c084fc',
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
      style={{ marginBottom: '5rem', position: 'relative' }}
      initial={{ opacity: 0, y: 25 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="category-sticky-header">
        <div className="category-header-left">
          <div 
            className="category-icon-box"
            style={{ background: iconBg, color: iconColor }}
          >
            {IconComponent && <IconComponent size={22} />}
          </div>
          <div>
            <h2 className="category-title">
              <span>{title}</span>
              {subtitle && (
                <span className="category-count-badge">
                  {subtitle}
                </span>
              )}
            </h2>
          </div>
        </div>

        {hasMore && (
          <button
            onClick={toggle}
            className="category-toggle-btn"
          >
            <span>{isExpanded ? 'Collapse' : `View All (${tools.length})`}</span>
            {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
          </button>
        )}
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
        <div style={{ textAlign: 'center', marginTop: '2.5rem' }}>
          <button
            onClick={toggle}
            className="btn btn-secondary"
            style={{ padding: '0.65rem 1.75rem', borderRadius: '100px', fontSize: '0.85rem', display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}
          >
            <span>{isExpanded ? 'Show Less' : `Show ${tools.length - initialCount} More Tools`}</span>
            {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
          </button>
        </div>
      )}
    </motion.section>
  )
}
