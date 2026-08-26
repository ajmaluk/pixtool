import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'

export default function ToolCard({ tool, index = 0 }) {
  const category = tool.category || tool.path?.split('/')[1]?.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ') || 'General'

  return (
    <motion.div
      className="tool-card-container"
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-30px' }}
      transition={{ duration: 0.35, delay: Math.min(index * 0.02, 0.2), ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ y: -4 }}
    >
      <Link
        id={`tool-card-link-${tool.id || tool.path?.split('/').pop()}`}
        to={tool.path}
        className="tool-card-premium"
        title={`Use ${tool.title} - ${tool.description}`}
        aria-label={`Open ${tool.title} tool`}
      >
        <div 
          className="tool-card-glow" 
          style={{ background: tool.color || 'var(--accent-primary)' }} 
        />
        
        <div className="tool-card-header">
          <div
            className="tool-card-icon-wrapper"
            style={{
              background: `${tool.color || 'var(--accent-primary)'}18`,
              color: tool.color || 'var(--accent-primary)',
              border: `1px solid ${tool.color || 'var(--accent-primary)'}30`
            }}
          >
            {tool.icon && <tool.icon size={22} strokeWidth={2.2} />}
          </div>

          <div className="tool-card-arrow">
            <ArrowUpRight size={16} />
          </div>
        </div>

        <div className="tool-card-body">
          <div className="tool-card-category">
            {category}
          </div>
          <h3 className="tool-card-title">
            {tool.title}
          </h3>
          <p className="tool-card-description">
            {tool.description}
          </p>
        </div>
      </Link>
    </motion.div>
  )
}
