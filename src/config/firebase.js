import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

// TEMPORARY - Hardcoded for immediate deployment
const firebaseConfig = {
  apiKey: "AIzaSyBUp4eQaNFh1zZwt9hBJDssmc-Bdd2FjWk",
  authDomain: "aggregator-backend.firebaseapp.com",
  projectId: "aggregator-backend", 
  storageBucket: "aggregator-backend.firebasestorage.com",
  messagingSenderId: "920485477423",
  appId: "1:920485477423:web:36b0fb2df2d87c04f4dada"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export default app;
