import React from 'react';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';

/**
 * Fades/slides children into view once they cross the viewport threshold.
 * Pass `stagger` to animate direct children in sequence instead of as one block.
 */
const Reveal = ({ as: Tag = 'div', stagger = false, className = '', children, ...rest }) => {
  const [ref, isVisible] = useIntersectionObserver({ threshold: 0.15, triggerOnce: true });
  const base = stagger ? 'reveal-stagger' : 'reveal';

  return (
    <Tag ref={ref} className={`${base} ${isVisible ? 'in-view' : ''} ${className}`} {...rest}>
      {children}
    </Tag>
  );
};

export default Reveal;
