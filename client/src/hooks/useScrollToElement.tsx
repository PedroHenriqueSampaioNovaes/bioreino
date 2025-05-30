'use client';

import { useEffect, useRef, useState } from 'react';

export default function useScrollToElement(headerId: string = '') {
  const [onAction, setOnAction] = useState(false);

  const headerHeightRef = useRef(0);
  const allAnchorLinksRef = useRef<HTMLAnchorElement[]>([]);

  // Get the header height
  useEffect(() => {
    function updateHeight() {
      const headerElement = document.getElementById(headerId);
      if (!headerElement) return;

      headerHeightRef.current = headerElement.getBoundingClientRect().height;
    }
    updateHeight();

    window.addEventListener('resize', updateHeight);
    return () => {
      window.removeEventListener('resize', updateHeight);
    };
  }, [headerId]);

  const scrollToId = (anchorLink: HTMLAnchorElement) => {
    const targetElement = document.querySelector(
      anchorLink.getAttribute('href') || ''
    );
    if (!targetElement) return;

    // If it's already rolling, we may not want to trigger another roll
    setOnAction(true);

    // Remove the active class from the previous anchor link
    allAnchorLinksRef.current.forEach((el) => {
      el.classList.remove('active');
    });

    anchorLink.classList.add('active');

    const headerHeight = headerHeightRef.current;

    const targetElementPosition =
      targetElement.getBoundingClientRect().top + window.scrollY;

    const offsetPosition = targetElementPosition - headerHeight;

    // Scroll to the element position minus the header height
    window.scrollTo({
      top: Math.ceil(offsetPosition),
      behavior: 'smooth',
    });
  };

  return { scrollToId, onAction, setOnAction, allAnchorLinksRef };
}
