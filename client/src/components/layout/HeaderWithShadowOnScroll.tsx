'use client';

import { HTMLAttributes, ReactNode, useEffect, useRef } from 'react';

interface IHeaderWithShadowOnScrollProps extends HTMLAttributes<HTMLElement> {
  children: ReactNode;
}

export default function HeaderWithShadowOnScroll({
  children,
  ...props
}: IHeaderWithShadowOnScrollProps) {
  const headerRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    function handleScroll() {
      if (headerRef.current) {
        const scrollTop = window.scrollY;
        headerRef.current.style.boxShadow =
          scrollTop > 0 ? '0 0 6px #00000046' : 'none';
      }
    }
    handleScroll();

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <header ref={headerRef} {...props}>
      {children}
    </header>
  );
}
