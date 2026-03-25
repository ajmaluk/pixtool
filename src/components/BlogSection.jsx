/* eslint-disable no-unused-vars */
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Navigation } from 'lucide-react'

export default function BlogSection({ posts }) {
  return (
    <div className="container-pro" style={{ marginTop: '8rem', textAlign: 'center' }}>
      <div style={{ marginBottom: '4rem' }}>
        <h2 style={{ fontSize: '2.8rem', fontWeight: 900, marginBottom: '1rem', letterSpacing: '-0.02em' }}>Professional <span style={{ color: 'var(--accent-primary)' }}>Insights</span></h2>
        <p style={{ fontSize: '1.1rem', color: 'var(--text-secondary)', maxWidth: '700px', margin: '0 auto' }}>
          Educational guides, technical deep-dives, and productivity hacks from our expert team.
        </p>
      </div>

      <div className="blog-grid">
        {posts.slice(0, 4).map((post) => (
          <motion.div
            key={post.slug}
            whileHover={{ y: -10 }}
            className="blog-card"
          >
            <div className="blog-card-img-container">
              <img 
                src={post.image} 
                alt={post.title} 
                width="600"
                height="315"
                loading="lazy"
                style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
              />
            </div>
            <div className="blog-card-content">
              <div className="blog-card-meta">
                <span className="blog-card-category">{post.category}</span>
                <span className="blog-card-date">{post.date}</span>
              </div>
              <h3 className="blog-card-title">{post.title}</h3>
              <p className="blog-card-excerpt">
                {post.excerpt}
              </p>
              <Link to={`/blog/${post.slug}`} className="blog-card-link">
                Read Article <Navigation size={16} style={{ transform: 'rotate(90deg)' }} />
              </Link>
            </div>
          </motion.div>
        ))}
      </div>

      <div style={{ marginTop: '4rem' }}>
        <Link to="/blog" className="btn btn-secondary" style={{ padding: '1rem 3rem', borderRadius: '100px' }}>
          View All Insights
        </Link>
      </div>
    </div>
  )
}
