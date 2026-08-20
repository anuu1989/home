import { useEffect, useState } from 'react';

/**
 * Keeps a component mounted for `exitDuration` after `isOpen` goes false,
 * so CSS can animate it out instead of the element vanishing instantly.
 * Returns [mounted, animateIn] — render null while !mounted, and toggle an
 * "open" class based on animateIn to drive the enter/exit transition.
 */
export const useMountTransition = (isOpen, exitDuration = 220) => {
  const [mounted, setMounted] = useState(isOpen);
  const [animateIn, setAnimateIn] = useState(false);

  useEffect(() => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (isOpen) {
      setMounted(true);
      const raf = requestAnimationFrame(() => setAnimateIn(true));
      return () => cancelAnimationFrame(raf);
    }

    setAnimateIn(false);
    const timer = setTimeout(() => setMounted(false), reduceMotion ? 0 : exitDuration);
    return () => clearTimeout(timer);
  }, [isOpen, exitDuration]);

  return [mounted, animateIn];
};
