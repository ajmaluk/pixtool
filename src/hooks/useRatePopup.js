import { useCallback } from 'react';
import { hasRatedToolLocally } from '../services/supabaseService';

const POPUP_SEEN_PREFIX = 'pix_popup_seen_';

/**
 * Hook to trigger the tool rating popup.
 * Uses a custom event to communicate with the global RatingOverlay component.
 */
export const useRatePopup = () => {
  const triggerRating = useCallback((toolSlug) => {
    const normalized = toolSlug
      ? String(toolSlug).trim().replace(/[?#].*$/g, '').replace(/^\/+/g, '').replace(/\/{2,}/g, '/').toLowerCase()
      : '';
    if (!normalized) return;

    // Check if already rated locally
    if (hasRatedToolLocally(normalized)) {
      return;
    }

    // GLOBAL CHECK: If they've seen any rating popup in this session, don't show another
    if (sessionStorage.getItem('pix_global_rating_shown')) {
      return;
    }

    // Check if already rated ANY tool locally
    // (This is a more aggressive anti-fatigue measure)
    if (localStorage.getItem('pix_has_rated_any')) {
      return;
    }

    // Dispatch custom event to trigger the overlay
    const event = new CustomEvent('trigger-pix-rating', {
      detail: { toolSlug: normalized }
    });
    window.dispatchEvent(event);
    
    // Mark as seen in session so it doesn't pop again during this visit
    sessionStorage.setItem('pix_global_rating_shown', 'true');
  }, []);

  return { triggerRating };
};
