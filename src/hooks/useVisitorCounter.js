import { useState, useEffect } from 'react';

const useVisitorCounter = () => {
  const [visitorCount, setVisitorCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [isNewVisitor, setIsNewVisitor] = useState(false);

  useEffect(() => {
    const initializeVisitorCounter = async () => {
      try {
        // Get visitor data from localStorage
        const storedCount = localStorage.getItem('portfolio_visitor_count');
        const lastVisit = localStorage.getItem('portfolio_last_visit');
        const sessionId = localStorage.getItem('portfolio_session_id');
        const today = new Date().toDateString();
        const currentSession = Date.now().toString();

        let currentCount = storedCount ? parseInt(storedCount, 10) : 1247; // Start with a base count
        let newVisitor = false;

        // Check if this is a new session (new visitor or returning after session expires)
        if (!sessionId || !lastVisit) {
          // First time visitor or session expired
          newVisitor = true;
          currentCount += 1;
          localStorage.setItem('portfolio_visitor_count', currentCount.toString());
          localStorage.setItem('portfolio_last_visit', today);
          localStorage.setItem('portfolio_session_id', currentSession);
          setIsNewVisitor(true);
        } else if (lastVisit !== today) {
          // Returning visitor on a new day
          currentCount += 1;
          localStorage.setItem('portfolio_visitor_count', currentCount.toString());
          localStorage.setItem('portfolio_last_visit', today);
          localStorage.setItem('portfolio_session_id', currentSession);
        }

        // Simulate realistic loading time
        setTimeout(() => {
          setVisitorCount(currentCount);
          setIsLoading(false);
        }, 800);

        // Optional: Try to get count from a free counter API
        try {
          const response = await fetch('https://api.countapi.xyz/hit/anuragvaidhya-portfolio/visits');
          if (response.ok) {
            const data = await response.json();
            if (data.value && data.value > currentCount) {
              // Use API count if it's higher (more accurate)
              setVisitorCount(data.value);
              localStorage.setItem('portfolio_visitor_count', data.value.toString());
            }
          }
        } catch (apiError) {
          // Silently fail and use local count
          console.log('Using local visitor count');
        }

      } catch (error) {
        console.error('Error initializing visitor counter:', error);
        // Fallback to a reasonable default
        setVisitorCount(1247);
        setIsLoading(false);
      }
    };

    initializeVisitorCounter();
  }, []);

  // Format number with commas
  const formatCount = (count) => {
    return count.toLocaleString();
  };

  // Generate a motivational message based on visitor count
  const getVisitorMessage = () => {
    if (isNewVisitor) {
      return "Welcome! You're visitor #" + formatCount(visitorCount);
    }
    return "Total visitors: " + formatCount(visitorCount);
  };

  return {
    visitorCount: formatCount(visitorCount),
    isLoading,
    isNewVisitor,
    message: getVisitorMessage()
  };
};

export default useVisitorCounter;