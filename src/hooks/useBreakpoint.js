import { useState, useEffect } from 'react';

const QUERIES = {
  desktop: '(min-width: 1024px)',
  tablet: '(min-width: 768px)',
};

export function useBreakpoint() {
  const [bp, setBp] = useState(() => {
    if (typeof window === 'undefined') return 'mobile';
    if (window.matchMedia(QUERIES.desktop).matches) return 'desktop';
    if (window.matchMedia(QUERIES.tablet).matches) return 'tablet';
    return 'mobile';
  });

  useEffect(() => {
    const desktopMql = window.matchMedia(QUERIES.desktop);
    const tabletMql = window.matchMedia(QUERIES.tablet);

    const update = () => {
      if (desktopMql.matches) setBp('desktop');
      else if (tabletMql.matches) setBp('tablet');
      else setBp('mobile');
    };

    desktopMql.addEventListener('change', update);
    tabletMql.addEventListener('change', update);
    return () => {
      desktopMql.removeEventListener('change', update);
      tabletMql.removeEventListener('change', update);
    };
  }, []);

  return bp;
}
