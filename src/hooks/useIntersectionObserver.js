import { useEffect, useRef, useState, useCallback } from 'react';

/**
 * Modern Intersection Observer hook for lazy loading and animations
 * @param {object} options - Intersection Observer options
 * @returns {array} [ref, isIntersecting, entry]
 */
export const useIntersectionObserver = (options = {}) => {
  const [isIntersecting, setIsIntersecting] = useState(false);
  const [entry, setEntry] = useState(null);
  const elementRef = useRef(null);
  const observerRef = useRef(null);

  const {
    threshold = 0.1,
    root = null,
    rootMargin = '0px',
    freezeOnceVisible = false,
    triggerOnce = false,
  } = options;

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    // Don't re-observe if frozen and already visible
    if (freezeOnceVisible && isIntersecting) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        const isElementIntersecting = entry.isIntersecting;
        setIsIntersecting(isElementIntersecting);
        setEntry(entry);

        // Disconnect if triggerOnce and now visible
        if (triggerOnce && isElementIntersecting && observerRef.current) {
          observerRef.current.disconnect();
        }
      },
      {
        threshold,
        root,
        rootMargin,
      }
    );

    observerRef.current = observer;
    observer.observe(element);

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [threshold, root, rootMargin, freezeOnceVisible, triggerOnce, isIntersecting]);

  return [elementRef, isIntersecting, entry];
};

/**
 * Hook for lazy loading images with intersection observer
 * @param {string} src - Image source URL
 * @param {object} options - Options for intersection observer
 * @returns {object} Image loading state and ref
 */
export const useLazyImage = (src, options = {}) => {
  const [imageSrc, setImageSrc] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isError, setIsError] = useState(false);
  const [ref, isIntersecting] = useIntersectionObserver({
    triggerOnce: true,
    ...options,
  });

  useEffect(() => {
    if (isIntersecting && src && !imageSrc) {
      const img = new Image();
      
      img.onload = () => {
        setImageSrc(src);
        setIsLoaded(true);
      };
      
      img.onerror = () => {
        setIsError(true);
      };
      
      img.src = src;
    }
  }, [isIntersecting, src, imageSrc]);

  return {
    ref,
    src: imageSrc,
    isLoaded,
    isError,
    isIntersecting,
  };
};

/**
 * Hook for animating elements when they come into view
 * @param {object} options - Animation and observer options
 * @returns {object} Animation state and ref
 */
export const useScrollAnimation = (options = {}) => {
  const [hasAnimated, setHasAnimated] = useState(false);
  const {
    animationClass = 'fade-in',
    threshold = 0.1,
    triggerOnce = true,
    ...observerOptions
  } = options;

  const [ref, isIntersecting] = useIntersectionObserver({
    threshold,
    triggerOnce,
    ...observerOptions,
  });

  useEffect(() => {
    if (isIntersecting && !hasAnimated) {
      setHasAnimated(true);
    }
  }, [isIntersecting, hasAnimated]);

  return {
    ref,
    isVisible: isIntersecting,
    hasAnimated,
    animationClass: hasAnimated ? animationClass : '',
  };
};

/**
 * Hook for tracking multiple elements with intersection observer
 * @param {object} options - Intersection observer options
 * @returns {object} Tracking utilities
 */
export const useMultipleIntersectionObserver = (options = {}) => {
  const [entries, setEntries] = useState(new Map());
  const observerRef = useRef(null);
  const elementsRef = useRef(new Set());

  const { threshold = 0.1, root = null, rootMargin = '0px' } = options;

  useEffect(() => {
    const observer = new IntersectionObserver(
      (observedEntries) => {
        setEntries(prev => {
          const newEntries = new Map(prev);
          observedEntries.forEach(entry => {
            newEntries.set(entry.target, {
              isIntersecting: entry.isIntersecting,
              intersectionRatio: entry.intersectionRatio,
              boundingClientRect: entry.boundingClientRect,
            });
          });
          return newEntries;
        });
      },
      {
        threshold,
        root,
        rootMargin,
      }
    );

    observerRef.current = observer;

    // Observe all existing elements
    elementsRef.current.forEach(element => {
      observer.observe(element);
    });

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [threshold, root, rootMargin]);

  const observe = useCallback((element) => {
    if (element && !elementsRef.current.has(element)) {
      elementsRef.current.add(element);
      if (observerRef.current) {
        observerRef.current.observe(element);
      }
    }
  }, []);

  const unobserve = useCallback((element) => {
    if (element && elementsRef.current.has(element)) {
      elementsRef.current.delete(element);
      if (observerRef.current) {
        observerRef.current.unobserve(element);
      }
      setEntries(prev => {
        const newEntries = new Map(prev);
        newEntries.delete(element);
        return newEntries;
      });
    }
  }, []);

  const getEntry = useCallback((element) => {
    return entries.get(element);
  }, [entries]);

  const isIntersecting = useCallback((element) => {
    const entry = entries.get(element);
    return entry ? entry.isIntersecting : false;
  }, [entries]);

  return {
    entries,
    observe,
    unobserve,
    getEntry,
    isIntersecting,
  };
};

/**
 * Hook for infinite scrolling with intersection observer
 * @param {Function} loadMore - Function to load more items
 * @param {object} options - Options for intersection observer and loading
 * @returns {object} Infinite scroll utilities
 */
export const useInfiniteScroll = (loadMore, options = {}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const {
    threshold = 1.0,
    rootMargin = '100px',
    enabled = true,
    ...observerOptions
  } = options;

  const [ref, isIntersecting] = useIntersectionObserver({
    threshold,
    rootMargin,
    ...observerOptions,
  });

  useEffect(() => {
    if (isIntersecting && enabled && hasMore && !isLoading) {
      setIsLoading(true);
      
      Promise.resolve(loadMore())
        .then((result) => {
          if (result === false || (result && result.hasMore === false)) {
            setHasMore(false);
          }
        })
        .catch((error) => {
          console.error('Error loading more items:', error);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  }, [isIntersecting, enabled, hasMore, isLoading, loadMore]);

  const reset = useCallback(() => {
    setHasMore(true);
    setIsLoading(false);
  }, []);

  return {
    ref,
    isLoading,
    hasMore,
    reset,
  };
};