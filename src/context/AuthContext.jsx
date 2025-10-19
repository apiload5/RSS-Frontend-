import React, { createContext, useState, useContext, useEffect } from 'react';
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup
} from 'firebase/auth';
import { auth } from '../config/firebase';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || 'https://d8f24516-21d6-4940-8fc5-6f1bf97f7cba-00-oxbrlkzbcc08.sisko.replit.dev/';

  // Backend verification function
  const verifyWithBackend = async (firebaseUser) => {
    try {
      const token = await firebaseUser.getIdToken();
      
      const response = await fetch(`${BACKEND_URL}api/users/me`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Backend verification failed');
      }

      const userData = await response.json();
      
      // Combine Firebase user with backend data
      const completeUser = {
        ...firebaseUser,
        backendData: userData
      };
      
      return completeUser;
    } catch (error) {
      console.error('Backend verification error:', error);
      // Return Firebase user even if backend fails
      return firebaseUser;
    }
  };

  // Sign up with email and password
  const signUp = async (email, password) => {
    try {
      setError('');
      setLoading(true);
      
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const completeUser = await verifyWithBackend(userCredential.user);
      
      setUser(completeUser);
      setSuccess('Account created successfully!');
      
      return completeUser;
    } catch (error) {
      let errorMessage = 'Failed to create account';
      
      switch (error.code) {
        case 'auth/email-already-in-use':
          errorMessage = 'Email already in use';
          break;
        case 'auth/invalid-email':
          errorMessage = 'Invalid email address';
          break;
        case 'auth/weak-password':
          errorMessage = 'Password is too weak';
          break;
        default:
          errorMessage = error.message;
      }
      
      setError(errorMessage);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Sign in with email and password
  const signIn = async (email, password) => {
    try {
      setError('');
      setLoading(true);
      
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const completeUser = await verifyWithBackend(userCredential.user);
      
      setUser(completeUser);
      setSuccess('Signed in successfully!');
      
      return completeUser;
    } catch (error) {
      let errorMessage = 'Failed to sign in';
      
      switch (error.code) {
        case 'auth/user-not-found':
          errorMessage = 'User not found';
          break;
        case 'auth/wrong-password':
          errorMessage = 'Invalid password';
          break;
        case 'auth/invalid-email':
          errorMessage = 'Invalid email address';
          break;
        default:
          errorMessage = error.message;
      }
      
      setError(errorMessage);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Sign in with Google
  const signInWithGoogle = async () => {
    try {
      setError('');
      setLoading(true);
      
      const provider = new GoogleAuthProvider();
      const userCredential = await signInWithPopup(auth, provider);
      const completeUser = await verifyWithBackend(userCredential.user);
      
      setUser(completeUser);
      setSuccess('Signed in with Google successfully!');
      
      return completeUser;
    } catch (error) {
      let errorMessage = 'Failed to sign in with Google';
      
      switch (error.code) {
        case 'auth/popup-closed-by-user':
          errorMessage = 'Sign in cancelled';
          break;
        case 'auth/popup-blocked':
          errorMessage = 'Popup was blocked by browser';
          break;
        default:
          errorMessage = error.message;
      }
      
      setError(errorMessage);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Sign out
  const logout = async () => {
    try {
      setError('');
      await signOut(auth);
      setUser(null);
      setSuccess('Signed out successfully!');
    } catch (error) {
      setError('Failed to sign out');
      throw error;
    }
  };

  // Clear messages
  const clearMessages = () => {
    setError('');
    setSuccess('');
  };

  // Auth state listener
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      try {
        if (firebaseUser) {
          const completeUser = await verifyWithBackend(firebaseUser);
          setUser(completeUser);
        } else {
          setUser(null);
        }
      } catch (error) {
        console.error('Auth state change error:', error);
        setUser(firebaseUser); // Still set Firebase user even if backend fails
      } finally {
        setLoading(false);
      }
    });

    return unsubscribe;
  }, []);

  const value = {
    user,
    signUp,
    signIn,
    signInWithGoogle,
    logout,
    loading,
    error,
    success,
    clearMessages
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
