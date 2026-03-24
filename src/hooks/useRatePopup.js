import { useCallback } from 'react';
import { hasRatedToolLocally } from '../services/supabaseService';

const POPUP_SEEN_PREFIX = 'pix_popup_seen_';

/**
 * Hook to trigger the tool rating popup.
 * Uses a custom event to communicate with the global RatingOverlay component.
 */
export const useRatePopup = () => {
  const triggerRating = useCallback((toolSlug) => {
    if (!toolSlug) return;

    // Check if already rated locally
    if (hasRatedToolLocally(toolSlug)) {
      return;
    }

    // Check if popup was already shown for this tool in this session/device
    const seenKey = `${POPUP_SEEN_PREFIX}${toolSlug}`;
    if (localStorage.getItem(seenKey)) {
      return;
    }

    // Dispatch custom event to trigger the overlay
    const event = new CustomEvent('trigger-pix-rating', {
      detail: { toolSlug }
    });
    window.dispatchEvent(event);
    
    // Mark as seen so it doesn't pop again immediately or on every action
    localStorage.setItem(seenKey, 'true');
  }, []);

  return { triggerRating };
};
