import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "AIzaSyBUp4eQaNFh1zZwt9hBJDssmc-Bdd2FjWk",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "aggregator-backend.firebaseapp.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "aggregator-backend",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "aggregator-backend.appspot.com",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "113222278115049707259",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:1132222781150:web:d25206272ff7e44a30292b"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);
export default app;
