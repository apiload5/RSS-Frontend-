import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

// آپ کی Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBUp4eQaNFh1zZwt9hBJDssmc-Bdd2FjWk",
  authDomain: "aggregator-backend.firebaseapp.com",
  projectId: "aggregator-backend",
  storageBucket: "aggregator-backend.appspot.com",
  messagingSenderId: "113222278115049707259",
  appId: "1:1132222781150:web:d25206272ff7e44a30292b"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication
export const auth = getAuth(app);

// Firebase app export
export default app;
