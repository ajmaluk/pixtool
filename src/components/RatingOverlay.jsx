 
import { useState, useEffect } from 'react';
import { submitToolRating } from '../services/supabaseService';
import { hasSupabaseConfig } from '../lib/supabaseClient';

const StarIcon = ({ size = 24, filled = false, active = false }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill={filled ? "var(--accent-primary)" : "none"} 
    stroke={active ? "var(--accent-primary)" : "var(--text-muted)"} 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round"
    style={{ transition: 'all 0.2s ease' }}
  >
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
  </svg>
);

export default function RatingOverlay() {
  const [isVisible, setIsVisible] = useState(false);

  const [toolSlug, setToolSlug] = useState('');
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const handleTrigger = (event) => {
      const { toolSlug: slug } = event.detail;
      if (slug) {
        setToolSlug(slug);
        setIsVisible(true);
        // Reset state for new tool
        setRating(0);
        setIsSuccess(false);
        setError('');
      }
    };

    window.addEventListener('trigger-pix-rating', handleTrigger);
    return () => window.removeEventListener('trigger-pix-rating', handleTrigger);
  }, []);

  const handleRate = async (value) => {
    if (isSubmitting || isSuccess) return;
    
    setRating(value);
    setIsSubmitting(true);
    setError('');

    try {
      await submitToolRating({ toolSlug, rating: value });
      setIsSuccess(true);
      // Auto-close after 3 seconds to let the confetti play
      setTimeout(() => {
        setIsVisible(false);
      }, 3000);
    } catch (err) {
      setError(err.message || 'Failed to submit rating. Please try again.');
      setIsSubmitting(false);
    }
  };

  const closeOverlay = () => {
    setIsVisible(false);
  };

  if (!hasSupabaseConfig) return null;


  return (
      <>
      {isVisible && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 9999,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '1.5rem',
            background: 'rgba(0, 0, 0, 0.4)',
            backdropFilter: 'blur(12px)',
          }}
          onClick={closeOverlay}
        >
          <div
            style={{
              background: 'var(--bg-primary)',
              width: '100%',
              maxWidth: '400px',
              borderRadius: '32px',
              padding: '2.5rem 2rem',
              position: 'relative',
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
              border: '1px solid var(--border-color)',
              textAlign: 'center',
              overflow: 'hidden'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={closeOverlay}
              style={{
                position: 'absolute',
                top: '1.25rem',
                right: '1.25rem',
                background: 'var(--bg-secondary)',
                border: 'none',
                borderRadius: '50%',
                width: '32px',
                height: '32px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                color: 'var(--text-secondary)',
                transition: 'all 0.2s ease',
                zIndex: 10
              }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
            </button>

            <div style={{ marginBottom: '1.5rem', position: 'relative', zIndex: 1 }}>
              <div
                style={{ 
                  width: '64px', 
                  height: '64px', 
                  background: 'var(--accent-glow)', 
                  borderRadius: '20px', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center', 
                  margin: '0 auto 1.5rem',
                  fontSize: '2rem'
                }}
              >
                {isSuccess ? '🎉' : '⭐'}
              </div>
              <h2 style={{ fontSize: '1.5rem', fontWeight: 900, marginBottom: '0.5rem', letterSpacing: '-0.02em' }}>
                {isSuccess ? 'Amazing! Thanks!' : 'Enjoying PixTool?'}
              </h2>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: 1.5 }}>
                {isSuccess 
                  ? "Your rating helps us keep PixTool free and premium for everyone." 
                  : "If you find this tool helpful, please take a moment to rate it. It helps us grow!"}
              </p>
            </div>

            {!isSuccess ? (
              <div style={{ position: 'relative', zIndex: 1 }}>
                <div style={{ display: 'flex', justifyContent: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
                  {[1, 2, 3, 4, 5].map((value) => (
                    <button
                      key={value}
                      onMouseEnter={() => setHoveredRating(value)}
                      onMouseLeave={() => setHoveredRating(0)}
                      onClick={() => handleRate(value)}
                      disabled={isSubmitting}
                      style={{
                        background: 'none',
                        border: 'none',
                        cursor: isSubmitting ? 'default' : 'pointer',
                        padding: '4px',
                        transform: (hoveredRating >= value || rating >= value) ? 'scale(1.2)' : 'scale(1)',
                        transition: 'transform 0.2s ease',
                      }}
                    >
                      <StarIcon 
                        size={36} 
                        filled={hoveredRating >= value || rating >= value} 
                        active={hoveredRating >= value || rating >= value}
                      />
                    </button>
                  ))}
                </div>

                {error && (
                  <p style={{ color: 'var(--accent-red)', fontSize: '0.85rem', marginBottom: '1rem' }}>
                    {error}
                  </p>
                )}

                <button
                  onClick={closeOverlay}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: 'var(--text-muted)',
                    fontSize: '0.9rem',
                    fontWeight: 600,
                    cursor: 'pointer',
                    textDecoration: 'underline',
                    textUnderlineOffset: '4px',
                  }}
                >
                  Maybe later
                </button>
              </div>
            ) : (
              <div
                style={{
                  color: 'var(--accent-primary)',
                  fontWeight: 900,
                  fontSize: '1.25rem',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '1rem',
                  position: 'relative',
                  zIndex: 1
                }}
              >
                <div
                  style={{
                    width: '64px',
                    height: '64px',
                    background: 'var(--accent-primary)',
                    color: 'white',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: '0 10px 20px var(--accent-glow)'
                  }}
                >
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                </div>
                Thank You for Supporting Us!
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
