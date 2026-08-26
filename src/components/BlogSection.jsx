import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { posts } from '../data/posts'

export default function BlogSection() {
  return (
    <div className="container-pro mt-32 text-center">
      <div className="mb-12">
        <span className="text-xs font-extrabold text-indigo-400 uppercase tracking-widest block mb-2">
          Knowledge & Guides
        </span>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          Professional <span className="text-[var(--accent-primary)]">Insights</span>
        </h2>
        <p className="text-slate-400 text-base max-w-xl mx-auto mt-2">
          Technical deep-dives, privacy tutorials, and workflow optimization from our engineering team.
        </p>
      </div>

      <div className="blog-grid">
        {posts.slice(0, 4).map((post) => (
          <div
            key={post.slug}
            className="blog-card blog-card-animated"
          >
            <div className="blog-card-img-container">
              <picture>
                {post.imageWebp ? <source srcSet={post.imageWebp} type="image/webp" /> : null}
                <img 
                  src={post.image} 
                  alt={post.title} 
                  width="600"
                  height="315"
                  loading="lazy"
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
                  onError={(e) => { e.target.src = '/og-image.webp'; }}
                />
              </picture>
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
              <Link to={`/blog/${post.slug}`} className="blog-card-link inline-flex items-center gap-1.5 font-bold" aria-label={`Read Article: ${post.title}`}>
                <span>Read Article</span>
                <ArrowRight size={14} aria-hidden="true" />
              </Link>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-12">
        <Link to="/blog" className="btn btn-secondary inline-flex items-center gap-2 py-3 px-8 rounded-full text-sm font-bold">
          <span>Explore All Articles</span>
          <ArrowRight size={16} />
        </Link>
      </div>
    </div>
  )
}
