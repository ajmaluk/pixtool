import { Link } from 'react-router-dom'
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion'

import { ArrowUpRight } from 'lucide-react'

export default function ToolCard({ tool }) {
  // Use category from tool object if available, otherwise infer from path
  const category = tool.category || tool.path?.split('/')[1]?.replace('-', ' ') || 'General'

  return (
    <motion.div
      whileHover={{ y: -8, scale: 1.01, transition: { duration: 0.3, ease: [0.16, 1, 0.3, 1] } }}
      style={{ height: '100%' }}
    >
      <Link
        to={tool.path}
        className="tool-card-premium"
      >
        <div className="tool-card-glow" style={{ background: tool.color || 'var(--accent-primary)' }} />
        
        <div className="tool-card-header">
          <div 
            className="tool-card-icon-wrapper" 
            style={{ 
              background: `${tool.color || 'var(--accent-primary)'}15`, 
              color: tool.color || 'var(--accent-primary)'
            }}
          >
            <tool.icon size={24} strokeWidth={2.5} />
          </div>
          <div className="tool-card-arrow">
            <ArrowUpRight size={20} />
          </div>
        </div>

        <div className="tool-card-body">
          <div className="tool-card-category">{category}</div>
          <h3 className="tool-card-title">{tool.title}</h3>
          <p className="tool-card-description">{tool.description}</p>
        </div>

        <div className="tool-card-footer">
          {tool.typeLabel && <div className="tool-tag type-tag">{tool.typeLabel}</div>}
        </div>
      </Link>
    </motion.div>
  )
}
