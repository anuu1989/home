import { useState, useEffect } from 'react';
import { database } from '../config/firebase';
import { ref, onValue, runTransaction } from 'firebase/database';

const useVisitorCounter = () => {
  const [visitorCount, setVisitorCount] = useState(3450);
  const [isLoading, setIsLoading] = useState(true);
  const [isNewVisitor, setIsNewVisitor] = useState(false);

  useEffect(() => {
    const initializeVisitorCounter = async () => {
      const lastVisit = localStorage.getItem('portfolio_last_visit');
      const sessionId = localStorage.getItem('portfolio_session_id');
      const today = new Date().toDateString();
      const currentSession = Date.now().toString();
      
      let shouldIncrement = false;

      // Check if this is a new session
      if (!sessionId || !lastVisit) {
        // First time visitor
        shouldIncrement = true;
        localStorage.setItem('portfolio_last_visit', today);
        localStorage.setItem('portfolio_session_id', currentSession);
        setIsNewVisitor(true);
      } else if (lastVisit !== today) {
        // Returning visitor on a new day
        shouldIncrement = true;
        localStorage.setItem('portfolio_last_visit', today);
        localStorage.setItem('portfolio_session_id', currentSession);
      }

      // Try Firebase, fallback to local counter
      if (database) {
        try {
          console.log('🔥 Attempting to connect to Firebase...');
          const visitorRef = ref(database, 'visitorCount');

          // Listen to visitor count changes
          const unsubscribe = onValue(visitorRef, (snapshot) => {
            console.log('✅ Firebase connected! Current count:', snapshot.val());
            const count = snapshot.val() || 3450;
            setVisitorCount(count);
            setIsLoading(false);
          }, (error) => {
            console.error('❌ Firebase read error:', error.code, error.message);
            useFallbackCounter();
          });

          // Increment count if new visitor or new day
          if (shouldIncrement) {
            console.log('📈 Incrementing visitor count...');
            await runTransaction(visitorRef, (currentCount) => {
              if (currentCount === null) {
                console.log('🆕 Initializing count to 3451');
                return 3451; // Initialize with base count + 1
              }
              console.log('➕ Incrementing from', currentCount, 'to', currentCount + 1);
              return currentCount + 1;
            }).catch((error) => {
              console.error('❌ Firebase write error:', error.code, error.message);
            });
          }

          return () => unsubscribe();
        } catch (error) {
          console.error('❌ Firebase error:', error);
          useFallbackCounter();
        }
      } else {
        console.log('⚠️ Firebase not initialized, using fallback counter');
        useFallbackCounter();
      }

      function useFallbackCounter() {
        const baseCount = 3450;
        const daysSinceEpoch = Math.floor(Date.now() / (1000 * 60 * 60 * 24));
        const dailyIncrement = Math.floor((daysSinceEpoch - 19700) * 2.5);
        setVisitorCount(baseCount + dailyIncrement + (shouldIncrement ? 1 : 0));
        setIsLoading(false);
      }
    };

    initializeVisitorCounter();
  }, []);

  // Format number with commas
  const formatCount = (count) => {
    if (typeof count !== 'number' || isNaN(count)) return '3,450';
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
    rawCount: visitorCount,
    isLoading,
    isNewVisitor,
    message: getVisitorMessage()
  };
};

export default useVisitorCounter;