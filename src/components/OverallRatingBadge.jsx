import { useEffect, useState } from 'react';
import { Star } from 'lucide-react';
import { getOverallRating } from '../services/supabaseService';
import { hasSupabaseConfig } from '../lib/supabaseClient';

export default function OverallRatingBadge() {
  const [rating, setRating] = useState({ avgRating: 0, totalVotes: 0 });

  useEffect(() => {
    let mounted = true;

    const run = async () => {
      if (!hasSupabaseConfig) return;
      try {
        const next = await getOverallRating();
        if (mounted) setRating(next);
      } catch {
        // Ignore: visual enhancement only.
      }
    };

    run();
    return () => {
      mounted = false;
    };
  }, []);

  if (!hasSupabaseConfig || rating.totalVotes < 1) {
    return null;
  }

  return (
    <div style={{
      display: 'inline-flex',
      alignItems: 'center',
      gap: '0.5rem',
      padding: '0.5rem 0.75rem',
      borderRadius: '999px',
      border: '1px solid var(--border-color)',
      background: 'var(--bg-glass)',
      fontWeight: 700,
      fontSize: '0.85rem',
      color: 'var(--text-primary)',
    }}>
      <Star size={15} color="#f59e0b" fill="#f59e0b" />
      <span>{Number(rating.avgRating || 0).toFixed(1)} overall</span>
      <span style={{ color: 'var(--text-secondary)', fontWeight: 600 }}>({rating.totalVotes} votes)</span>
    </div>
  );
}
