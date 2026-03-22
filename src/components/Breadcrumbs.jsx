import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';

/**
 * Breadcrumbs Component - Visual only
 * Structured data is handled by the SEO component
 * @param {Object[]} items - Array of { name: string, item: string }
 */
export default function Breadcrumbs({ items = [] }) {
    if (!items || items.length === 0) return null;

    return (
        <nav
            aria-label="Breadcrumb"
            className="breadcrumbs-nav"
            style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '10px',
                padding: '0.75rem 1.25rem',
                fontSize: '0.85rem',
                background: 'var(--bg-glass)',
                backdropFilter: 'blur(12px)',
                borderRadius: '12px',
                border: '1px solid var(--border-color)',
                color: 'var(--text-muted)',
                marginBottom: '2rem',
                boxShadow: '0 4px 12px rgba(0,0,0,0.03)'
            }}
        >
            <Link
                to="/"
                className="breadcrumb-link"
                style={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    color: 'var(--accent-primary)', 
                    textDecoration: 'none', 
                    transition: 'var(--transition-fast)',
                    opacity: 0.8
                }}
                title="DailyTools Home - Free Online Productivity"
            >
                <Home size={14} />
            </Link>

            {items.map((crumb, index) => (
                <React.Fragment key={index}>
                    <ChevronRight size={12} className="breadcrumb-separator" style={{ opacity: 0.3 }} />
                    {index === items.length - 1 ? (
                        <span className="breadcrumb-current" style={{ color: 'var(--text-primary)', fontWeight: 700 }}>
                            {crumb.name}
                        </span>
                    ) : (
                        <Link
                            to={crumb.item}
                            className="breadcrumb-link"
                            style={{ 
                                color: 'inherit', 
                                textDecoration: 'none', 
                                transition: 'var(--transition-fast)', 
                                fontWeight: 600 
                            }}
                            title={`Go back to ${crumb.name}`}
                        >
                            {crumb.name}
                        </Link>
                    ) }
                </React.Fragment>
            ))}
        </nav>
    );
}

