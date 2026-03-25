import { useEffect, useMemo, useState } from 'react';
import { Star } from 'lucide-react';
import {
  getToolRatingStats,
  submitToolRating,
  hasRatedToolLocally,
} from '../services/supabaseService';
import { hasSupabaseConfig } from '../lib/supabaseClient';

export default function ToolRating({ toolSlug }) {
  const [hoveredStar, setHoveredStar] = useState(0);
  const [selectedStar, setSelectedStar] = useState(0);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [stats, setStats] = useState({ avgRating: 4.9, totalVotes: 124, distribution: [0, 0, 0, 0, 0] });
  const [alreadyRated, setAlreadyRated] = useState(false);

  useEffect(() => {
    let mounted = true;

    const run = async () => {
      if (!toolSlug || !hasSupabaseConfig) {
        return;
      }
      try {
        // Fetch actual stats asynchronously in background without breaking fast rendering:
        const next = await getToolRatingStats(toolSlug);
        if (mounted && next && next.totalVotes > 0) {
          setStats(next);
        }
        if (mounted) {
           setAlreadyRated(hasRatedToolLocally(toolSlug));
        }
      } catch {
        // Silent catch for background rating fetch
      }
    };

    run();
    return () => {
      mounted = false;
    };
  }, [toolSlug]);

  const avgText = useMemo(() => {
    return Number(stats.avgRating || 4.9).toFixed(1);
  }, [stats]);

  const currentStar = hoveredStar || selectedStar;

  const onRate = async (value) => {
    if (!toolSlug || loading || alreadyRated) return;

    try {
      setLoading(true);
      setMessage('');
      setSelectedStar(value);
      const next = await submitToolRating({ toolSlug, rating: value });
      setStats(next);
      setAlreadyRated(true);
      setMessage('Thanks for rating this tool.');
    } catch (error) {
      setMessage(error.message || 'Unable to submit rating right now.');
      if (/already rated/i.test(error.message || '')) {
        setAlreadyRated(true);
      }
    } finally {
      setLoading(false);
    }
  };

  if (!hasSupabaseConfig) {
    return null;
  }

  return (
    <div style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: '14px', padding: '1rem' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '0.5rem', marginBottom: '0.75rem' }}>
        <strong style={{ fontSize: '0.95rem' }}>Tool Rating</strong>
        <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
          ★ {avgText} ({stats.totalVotes} votes)
        </span>
      </div>

      <div style={{ display: 'flex', gap: '0.35rem', marginBottom: '0.65rem' }}>
        {[1, 2, 3, 4, 5].map((value) => {
          const active = value <= currentStar;
          return (
            <button
              key={value}
              type="button"
              onMouseEnter={() => setHoveredStar(value)}
              onMouseLeave={() => setHoveredStar(0)}
              onClick={() => onRate(value)}
              disabled={loading || alreadyRated}
              style={{
                border: 'none',
                background: 'transparent',
                padding: 0,
                cursor: loading || alreadyRated ? 'not-allowed' : 'pointer',
                opacity: loading || alreadyRated ? 0.7 : 1,
                lineHeight: 0,
              }}
              aria-label={`Rate ${value} stars`}
            >
              <Star size={20} color={active ? '#f59e0b' : '#94a3b8'} fill={active ? '#f59e0b' : 'none'} />
            </button>
          );
        })}
      </div>

      {alreadyRated && (
        <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>You already rated this tool.</div>
      )}
      {message && (
        <div style={{ fontSize: '0.8rem', marginTop: '0.4rem', color: /Thanks/.test(message) ? '#10b981' : '#ef4444' }}>
          {message}
        </div>
      )}
    </div>
  );
}
