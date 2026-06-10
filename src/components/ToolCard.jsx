import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'

export default function ToolCard({ tool, index = 0 }) {
  const category = tool.category || tool.path?.split('/')[1]?.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ') || 'General'

  return (
    <motion.div
      className="tool-card-container"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.4, delay: index * 0.03, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ y: -4 }}
    >
      <Link
        id={`tool-card-link-${tool.id || tool.path?.split('/').pop()}`}
        to={tool.path}
        className="tool-card-premium"
        title={`Use ${tool.title} - ${tool.description}`}
        aria-label={`Open ${tool.title} tool`}
      >
        <div className="tool-card-glow" style={{ background: tool.color || 'var(--accent-primary)' }} />
        
        <div className="tool-card-header">
          <motion.div
            className="tool-card-icon-wrapper"
            style={{
              background: `${tool.color || 'var(--accent-primary)'}15`,
              color: tool.color || 'var(--accent-primary)'
            }}
            whileHover={{ scale: 1.1, rotate: -5 }}
            transition={{ duration: 0.2 }}
          >
            {tool.icon && <tool.icon size={24} strokeWidth={2.5} />}
          </motion.div>
          <motion.div
            className="tool-card-arrow"
            initial={{ opacity: 0, x: -5 }}
            whileHover={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.2 }}
          >
            <ArrowUpRight size={20} />
          </motion.div>
        </div>

        <div className="tool-card-body">
          <div className="tool-card-category">{category}</div>
          <h3 className="tool-card-title">{tool.title}</h3>
          <p className="tool-card-description">{tool.description}</p>
        </div>
      </Link>
    </motion.div>
  )
}
