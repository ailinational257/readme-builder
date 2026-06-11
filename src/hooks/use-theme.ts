// ─── useTheme Hook ──────────────────────────────────────────────────────────
// Manages dark/light theme with system preference detection.

import { useEffect } from 'react';
import { useUIStore } from '../store/ui-store';

export function useTheme(): void {
  const theme = useUIStore(s => s.theme);
  const setResolvedTheme = useUIStore(s => s.setResolvedTheme);

  useEffect(() => {
    const root = document.documentElement;
    let resolved: 'light' | 'dark' = 'dark';

    if (theme === 'system') {
      resolved = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    } else {
      resolved = theme;
    }

    root.setAttribute('data-theme', resolved);
    setResolvedTheme(resolved);

    if (theme === 'system') {
      const mq = window.matchMedia('(prefers-color-scheme: dark)');
      const handler = (e: MediaQueryListEvent) => {
        const newTheme = e.matches ? 'dark' : 'light';
        root.setAttribute('data-theme', newTheme);
        setResolvedTheme(newTheme);
      };
      mq.addEventListener('change', handler);
      return () => mq.removeEventListener('change', handler);
    }
  }, [theme, setResolvedTheme]);
}
