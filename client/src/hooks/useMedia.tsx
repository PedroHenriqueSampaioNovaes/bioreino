'use client';

import { useEffect, useState } from 'react';

export default function useMedia(media: string) {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    function changeMatch() {
      const { matches } = window.matchMedia(media);
      setMatches(matches);
    };
    changeMatch();

    window.addEventListener('resize', changeMatch);
    return () => window.removeEventListener('resize', changeMatch);
  }, [media]);

  return matches;
}
