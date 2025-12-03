import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';

// Your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDbKe1DCXrbKrVkLzpWQlWl1S3S1uDgmHA",
  authDomain: "anurag-portfolio-9a906.firebaseapp.com",
  databaseURL: "https://anurag-portfolio-9a906-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "anurag-portfolio-9a906",
  storageBucket: "anurag-portfolio-9a906.firebasestorage.app",
  messagingSenderId: "49636189586",
  appId: "1:49636189586:web:3426281709535c81e58d4b",
  measurementId: "G-KZ467MRSBG"
};

let app = null;
let database = null;

try {
  // Initialize Firebase
  app = initializeApp(firebaseConfig);
  
  // Initialize Realtime Database
  database = getDatabase(app);
  
  console.log('✅ Firebase initialized successfully');
} catch (error) {
  console.warn('⚠️ Firebase initialization failed:', error.message);
  console.log('📊 Using fallback visitor counter');
}

export { database };
export default app;
