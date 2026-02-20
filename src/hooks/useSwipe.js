import { useRef, useCallback } from "react";

/**
 * Returns onTouchStart / onTouchEnd handlers that call onSwipeLeft or
 * onSwipeRight when the user swipes horizontally (min 50 px).
 */
export default function useSwipe(onSwipeLeft, onSwipeRight) {
  const startX = useRef(0);

  const onTouchStart = useCallback((e) => {
    startX.current = e.touches[0].clientX;
  }, []);

  const onTouchEnd = useCallback(
    (e) => {
      const diff = startX.current - e.changedTouches[0].clientX;
      if (Math.abs(diff) < 50) return; // ignore small movements
      if (diff > 0) onSwipeLeft();      // swiped left → next
      else onSwipeRight();               // swiped right → prev
    },
    [onSwipeLeft, onSwipeRight],
  );

  return { onTouchStart, onTouchEnd };
}
