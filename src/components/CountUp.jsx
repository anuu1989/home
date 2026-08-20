import React, { useEffect, useState } from 'react';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';

/**
 * Animates a number counting up from 0 to `end` once it scrolls into view.
 */
const CountUp = ({ end, duration = 1400, prefix = '', suffix = '', className }) => {
  const [ref, isVisible] = useIntersectionObserver({ threshold: 0.4, triggerOnce: true });
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!isVisible) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setValue(end);
      return;
    }
    let raf;
    let start;
    const step = (ts) => {
      if (start === undefined) start = ts;
      const progress = Math.min((ts - start) / duration, 1);
      setValue(Math.round(progress * end));
      if (progress < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [isVisible, end, duration]);

  // Printing renders the whole page at once — jump straight to the final
  // value so a section the user never scrolled to doesn't print as "0".
  useEffect(() => {
    const handleBeforePrint = () => setValue(end);
    window.addEventListener('beforeprint', handleBeforePrint);
    return () => window.removeEventListener('beforeprint', handleBeforePrint);
  }, [end]);

  return (
    <span ref={ref} className={className}>
      {prefix}{value}{suffix}
    </span>
  );
};

export default CountUp;
