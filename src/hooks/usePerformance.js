import { useEffect, useRef, useState, useCallback } from 'react';

/**
 * Custom hook for performance monitoring and optimization
 * @returns {object} Performance metrics and utilities
 */
export const usePerformance = () => {
  const [metrics, setMetrics] = useState({
    renderTime: 0,
    componentMounts: 0,
    memoryUsage: 0,
    fps: 0,
  });

  const renderStartTime = useRef(performance.now());
  const frameCount = useRef(0);
  const lastTime = useRef(performance.now());
  const animationFrame = useRef();

  // Measure render time
  const measureRenderTime = useCallback(() => {
    const renderTime = performance.now() - renderStartTime.current;
    setMetrics(prev => ({ ...prev, renderTime }));
  }, []);

  // Measure FPS
  const measureFPS = useCallback(() => {
    const now = performance.now();
    frameCount.current++;
    
    if (now - lastTime.current >= 1000) {
      const fps = Math.round((frameCount.current * 1000) / (now - lastTime.current));
      setMetrics(prev => ({ ...prev, fps }));
      frameCount.current = 0;
      lastTime.current = now;
    }
    
    animationFrame.current = requestAnimationFrame(measureFPS);
  }, []);

  // Measure memory usage (if available)
  const measureMemory = useCallback(() => {
    if ('memory' in performance) {
      const memoryUsage = Math.round(performance.memory.usedJSHeapSize / 1048576); // MB
      setMetrics(prev => ({ ...prev, memoryUsage }));
    }
  }, []);

  // Performance observer for navigation timing
  useEffect(() => {
    if ('PerformanceObserver' in window) {
      const observer = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        entries.forEach((entry) => {
          if (entry.entryType === 'navigation') {
            console.log('Navigation timing:', {
              domContentLoaded: entry.domContentLoadedEventEnd - entry.domContentLoadedEventStart,
              loadComplete: entry.loadEventEnd - entry.loadEventStart,
              totalTime: entry.loadEventEnd - entry.fetchStart,
            });
          }
        });
      });

      observer.observe({ entryTypes: ['navigation', 'measure'] });

      return () => observer.disconnect();
    }
  }, []);

  // Start FPS monitoring
  useEffect(() => {
    animationFrame.current = requestAnimationFrame(measureFPS);
    return () => {
      if (animationFrame.current) {
        cancelAnimationFrame(animationFrame.current);
      }
    };
  }, [measureFPS]);

  // Measure memory periodically
  useEffect(() => {
    const interval = setInterval(measureMemory, 5000);
    return () => clearInterval(interval);
  }, [measureMemory]);

  // Component mount tracking
  useEffect(() => {
    setMetrics(prev => ({ ...prev, componentMounts: prev.componentMounts + 1 }));
    renderStartTime.current = performance.now();
    
    // Measure render time after component updates
    const timeoutId = setTimeout(measureRenderTime, 0);
    return () => clearTimeout(timeoutId);
  }, [measureRenderTime]);

  // Performance utilities
  const markStart = useCallback((name) => {
    performance.mark(`${name}-start`);
  }, []);

  const markEnd = useCallback((name) => {
    performance.mark(`${name}-end`);
    performance.measure(name, `${name}-start`, `${name}-end`);
  }, []);

  const getPerformanceEntries = useCallback(() => {
    return performance.getEntriesByType('measure');
  }, []);

  const clearPerformanceMarks = useCallback(() => {
    performance.clearMarks();
    performance.clearMeasures();
  }, []);

  // Web Vitals measurement
  const measureWebVitals = useCallback(() => {
    if ('web-vitals' in window) {
      // This would require the web-vitals library
      // import { getCLS, getFID, getFCP, getLCP, getTTFB } from 'web-vitals';
      console.log('Web Vitals measurement would go here');
    }
  }, []);

  return {
    metrics,
    markStart,
    markEnd,
    getPerformanceEntries,
    clearPerformanceMarks,
    measureWebVitals,
  };
};

/**
 * Hook for debouncing values to improve performance
 * @param {any} value - Value to debounce
 * @param {number} delay - Delay in milliseconds
 * @returns {any} Debounced value
 */
export const useDebounce = (value, delay) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
};

/**
 * Hook for throttling function calls
 * @param {Function} callback - Function to throttle
 * @param {number} delay - Delay in milliseconds
 * @returns {Function} Throttled function
 */
export const useThrottle = (callback, delay) => {
  const lastRun = useRef(Date.now());

  return useCallback((...args) => {
    if (Date.now() - lastRun.current >= delay) {
      callback(...args);
      lastRun.current = Date.now();
    }
  }, [callback, delay]);
};

/**
 * Hook for measuring component render performance
 * @param {string} componentName - Name of the component
 * @returns {object} Performance data
 */
export const useRenderPerformance = (componentName) => {
  const renderCount = useRef(0);
  const renderTimes = useRef([]);

  useEffect(() => {
    const startTime = performance.now();
    renderCount.current += 1;

    return () => {
      const endTime = performance.now();
      const renderTime = endTime - startTime;
      renderTimes.current.push(renderTime);

      // Keep only last 10 render times
      if (renderTimes.current.length > 10) {
        renderTimes.current.shift();
      }

      if (process.env.NODE_ENV === 'development') {
        console.log(`${componentName} render #${renderCount.current}: ${renderTime.toFixed(2)}ms`);
      }
    };
  });

  const getAverageRenderTime = useCallback(() => {
    if (renderTimes.current.length === 0) return 0;
    const sum = renderTimes.current.reduce((a, b) => a + b, 0);
    return sum / renderTimes.current.length;
  }, []);

  return {
    renderCount: renderCount.current,
    averageRenderTime: getAverageRenderTime(),
    lastRenderTime: renderTimes.current[renderTimes.current.length - 1] || 0,
  };
};