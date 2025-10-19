import React, { createContext, useState, useContext, useEffect } from 'react';
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup,
  updateProfile
} from 'firebase/auth';
import { auth } from '../config/firebase';

// Create Auth Context
const AuthContext = createContext();

// Custom hook to use auth
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

// Auth Provider Component
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Sign up with email and password
  const signUp = async (email, password, displayName = '') => {
    try {
      setError('');
      setLoading(true);
      console.log('Starting sign up process...', { email });
      
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      
      // Update profile with display name if provided
      if (displayName) {
        await updateProfile(user, {
          displayName: displayName
        });
      }
      
      setUser(user);
      setSuccess('Account created successfully!');
      console.log('User signed up successfully:', user.email);
      
      return user;
    } catch (error) {
      console.error('Sign up error:', error);
      let errorMessage = 'Failed to create account';
      
      switch (error.code) {
        case 'auth/email-already-in-use':
          errorMessage = 'This email is already registered. Please sign in instead.';
          break;
        case 'auth/invalid-email':
          errorMessage = 'Please enter a valid email address.';
          break;
        case 'auth/weak-password':
          errorMessage = 'Password should be at least 6 characters long.';
          break;
        case 'auth/network-request-failed':
          errorMessage = 'Network error. Please check your internet connection.';
          break;
        default:
          errorMessage = error.message || 'An unexpected error occurred.';
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
      console.log('Starting sign in process...', { email });
      
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      
      setUser(user);
      setSuccess('Signed in successfully!');
      console.log('User signed in successfully:', user.email);
      
      return user;
    } catch (error) {
      console.error('Sign in error:', error);
      let errorMessage = 'Failed to sign in';
      
      switch (error.code) {
        case 'auth/user-not-found':
          errorMessage = 'No account found with this email. Please sign up first.';
          break;
        case 'auth/wrong-password':
          errorMessage = 'Incorrect password. Please try again.';
          break;
        case 'auth/invalid-email':
          errorMessage = 'Please enter a valid email address.';
          break;
        case 'auth/too-many-requests':
          errorMessage = 'Too many failed attempts. Please try again later.';
          break;
        case 'auth/network-request-failed':
          errorMessage = 'Network error. Please check your internet connection.';
          break;
        case 'auth/user-disabled':
          errorMessage = 'This account has been disabled. Please contact support.';
          break;
        default:
          errorMessage = error.message || 'An unexpected error occurred.';
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
      console.log('Starting Google sign in...');
      
      const provider = new GoogleAuthProvider();
      // Add scopes if needed
      provider.addScope('email');
      provider.addScope('profile');
      
      // Set custom parameters
      provider.setCustomParameters({
        prompt: 'select_account'
      });
      
      const userCredential = await signInWithPopup(auth, provider);
      const user = userCredential.user;
      
      setUser(user);
      setSuccess('Signed in with Google successfully!');
      console.log('Google sign in successful:', user.email);
      
      return user;
    } catch (error) {
      console.error('Google sign in error:', error);
      let errorMessage = 'Failed to sign in with Google';
      
      switch (error.code) {
        case 'auth/popup-closed-by-user':
          errorMessage = 'Sign in was cancelled.';
          break;
        case 'auth/popup-blocked':
          errorMessage = 'Popup was blocked by your browser. Please allow popups for this site.';
          break;
        case 'auth/unauthorized-domain':
          errorMessage = 'This domain is not authorized for Google sign-in.';
          break;
        case 'auth/network-request-failed':
          errorMessage = 'Network error. Please check your internet connection.';
          break;
        default:
          errorMessage = error.message || 'An unexpected error occurred during Google sign-in.';
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
      setLoading(true);
      console.log('Starting logout...');
      
      await signOut(auth);
      setUser(null);
      setSuccess('Signed out successfully!');
      console.log('User signed out successfully');
    } catch (error) {
      console.error('Logout error:', error);
      setError('Failed to sign out. Please try again.');
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Clear messages
  const clearMessages = () => {
    setError('');
    setSuccess('');
  };

  // Auth state listener
  useEffect(() => {
    console.log('Setting up auth state listener...');
    
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      console.log('Auth state changed:', firebaseUser ? firebaseUser.email : 'No user');
      
      if (firebaseUser) {
        setUser(firebaseUser);
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    // Cleanup subscription
    return () => {
      console.log('Cleaning up auth state listener...');
      unsubscribe();
    };
  }, []);

  // Context value
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
