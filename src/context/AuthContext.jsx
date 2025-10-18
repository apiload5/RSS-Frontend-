import React, { createContext, useState, useContext, useEffect } from 'react';

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
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Mock authentication functions
  const signUp = async (email, password) => {
    setLoading(true);
    setError('');
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setUser({
      uid: 'mock-user-123',
      email: email,
      displayName: email.split('@')[0],
      getIdToken: async () => 'mock-firebase-token-12345'
    });
    
    setLoading(false);
  };

  const signIn = async (email, password) => {
    setLoading(true);
    setError('');
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setUser({
      uid: 'mock-user-123',
      email: email,
      displayName: email.split('@')[0],
      getIdToken: async () => 'mock-firebase-token-12345'
    });
    
    setLoading(false);
  };

  const signInWithGoogle = async () => {
    setLoading(true);
    setError('');
    
    // Simulate Google sign in
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setUser({
      uid: 'google-user-123',
      email: 'google@user.com',
      displayName: 'Google User',
      getIdToken: async () => 'mock-google-token-12345'
    });
    
    setLoading(false);
  };

  const logout = async () => {
    setUser(null);
  };

  const clearError = () => setError('');

  const value = {
    user,
    signUp,
    signIn,
    signInWithGoogle,
    logout,
    error,
    clearError,
    loading
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
