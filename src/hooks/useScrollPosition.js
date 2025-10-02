import { useState, useEffect, useCallback } from "react";

/**
 * Custom hook to track scroll position with throttling for performance
 * @param {number} threshold - Scroll threshold to trigger state change
 * @returns {boolean} - Whether scroll position is above threshold
 */
export const useScrollPosition = (threshold = 200) => {
  const [isAboveThreshold, setIsAboveThreshold] = useState(false);

  const handleScroll = useCallback(() => {
    const scrollTop = window.scrollY > threshold;
    setIsAboveThreshold(scrollTop);
  }, [threshold]);

  useEffect(() => {
    let ticking = false;
    
    const throttledScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    // Initial check
    handleScroll();

    window.addEventListener("scroll", throttledScroll, { passive: true });
    return () => window.removeEventListener("scroll", throttledScroll);
  }, [handleScroll]);

  return isAboveThreshold;
};

/**
 * Custom hook for smooth scrolling to elements
 * @returns {function} - Function to scroll to element by ID
 */
export const useSmoothScroll = () => {
  const scrollToElement = useCallback((elementId, offset = 80) => {
    const element = document.getElementById(elementId);
    if (element) {
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  }, []);

  return scrollToElement;
};