import { useState, useEffect } from 'react';

export function useDarkMode() {
  const [dark, setDark] = useState(() => {
    try {
      const stored = localStorage.getItem('lighthouse-dark');
      if (stored !== null) return stored === 'true';
      return window.matchMedia?.('(prefers-color-scheme: dark)').matches || false;
    } catch { return false; }
  });

  useEffect(() => {
    try { localStorage.setItem('lighthouse-dark', String(dark)); } catch {}
  }, [dark]);

  const toggle = () => setDark(d => !d);
  return { dark, toggle };
}
