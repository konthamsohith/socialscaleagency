import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useLenis } from '@studio-freight/react-lenis';

export const ScrollToTop = () => {
  const { pathname } = useLocation();
  const lenis = useLenis();

  useEffect(() => {
    if (lenis) {
      lenis.scrollTo(0, { immediate: true });
    } else {
      window.scrollTo(0, 0);
    }
  }, [pathname, lenis]);

  return null;
};

