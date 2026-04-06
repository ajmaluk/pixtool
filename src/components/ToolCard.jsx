import { Link } from 'react-router-dom'
 
import { ArrowUpRight } from 'lucide-react'

export default function ToolCard({ tool }) {
  // Use category from tool object if available, otherwise infer from path
  const category = tool.category || tool.path?.split('/')[1]?.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ') || 'General'

  return (
    <div className="tool-card-container">
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
            {tool.icon && <tool.icon size={24} strokeWidth={2.5} />}
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
      </Link>
    </div>
  )
}
