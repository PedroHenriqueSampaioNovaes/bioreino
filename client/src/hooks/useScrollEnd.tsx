'use client';

import { useEffect } from "react";

export default function useScrollEnd(callback: () => void, timeout = 100) {
  useEffect(() => {
    let lastScrollY = window.scrollY;
    let ticking = false;
    let timeoutId: NodeJS.Timeout;

    const checkIfScrollStopped = () => {
      if (window.scrollY !== lastScrollY) {
        lastScrollY = window.scrollY;
        timeoutId = setTimeout(checkIfScrollStopped, timeout);
      } else {
        callback(); // Scroll parou
        ticking = false;
      }
    };

    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        timeoutId = setTimeout(checkIfScrollStopped, timeout);
      }
    };

    window.addEventListener('scroll', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      clearTimeout(timeoutId);
    };
  }, [callback, timeout]);
}
