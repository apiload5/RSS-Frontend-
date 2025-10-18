// src/context/AuthContext.jsx
import React, { createContext, useContext, useState, useEffect } from 'react';
import { initializeApp } from 'firebase/app';
import { 
    getAuth, 
    onAuthStateChanged, 
    signInWithEmailAndPassword, 
    createUserWithEmailAndPassword, 
    signOut, 
    GoogleAuthProvider, 
    signInWithPopup 
} from 'firebase/auth';

// --- Configuration ---
// Aapka Backend URL (Naya Replit Link)
const BACKEND_URL = 'https://d8f24516-21d6-4940-8fc5-6f1bf97f7cba-00-oxbrlkzbcc08.sisko.replit.dev/'; 

// Aapki Public Firebase Config
const firebaseConfig = {
    apiKey: "AIzaSyBUp4eQaNFh1zZwt9hBJDssmc-Bdd2FjWk", 
    authDomain: "aggregator-backend.firebaseapp.com", 
    projectId: "aggregator-backend", 
    storageBucket: "aggregator-backend.appspot.com", 
    messagingSenderId: "113222278115049707259", 
    appId: "1:1132222781150:web:d25206272ff7e44a30292b"
};

// Firebase initialize karna
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

// Context Banana
const AuthContext = createContext();

export const useAuth = () => {
    return useContext(AuthContext);
};

// Backend se User Data laana (Firebase Token ko verify karwane ke liye)
const fetchUserDataFromBackend = async (idToken) => {
    try {
        const response = await fetch(`${BACKEND_URL}api/users/me`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${idToken}`,
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            // Agar backend se 401/404 aaye (maslan, token theek nahi hai ya user MongoDB mein nahi mila)
            throw new Error('Backend verification failed');
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching user data from backend:', error);
        return null;
    }
};

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null); // Firebase aur MongoDB se mila hua user object
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Firebase Auth state change hone par yeh chalta hai
        const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
            if (firebaseUser) {
                try {
                    // 1. Firebase se token lena
                    const idToken = await firebaseUser.getIdToken();
                    
                    // 2. Token ko backend par verify karwana aur MongoDB data lena
                    const backendData = await fetchUserDataFromBackend(idToken);
                    
                    if (backendData) {
                        // User successfully verified ho gaya
                        setUser({ ...firebaseUser, ...backendData }); // Firebase + MongoDB data combine karna
                    } else {
                        // Agar backend ne fail kar diya, to user ko log out kar dena
                        await signOut(auth);
                        setUser(null);
                    }
                } catch (error) {
                    console.error("Token handling error:", error);
                    setUser(null);
                }
            } else {
                setUser(null);
            }
            setIsLoading(false);
        });

        return unsubscribe; // Cleanup function
    }, []);

    // --- Authentication Functions ---

    // 1. Email aur Password se Register
    const register = async (email, password) => {
        try {
            setIsLoading(true);
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            // onAuthStateChanged hook automatically user ko set kar dega
            return userCredential.user;
        } catch (error) {
            setIsLoading(false);
            throw error;
        }
    };

    // 2. Email aur Password se Login
    const login = async (email, password) => {
        try {
            setIsLoading(true);
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            return userCredential.user;
        } catch (error) {
            setIsLoading(false);
            throw error;
        }
    };

    // 3. Google Sign-In
    const loginWithGoogle = async () => {
        try {
            setIsLoading(true);
            const result = await signInWithPopup(auth, googleProvider);
            return result.user;
        } catch (error) {
            setIsLoading(false);
            throw error;
        }
    };

    // 4. Logout
    const logout = async () => {
        await signOut(auth);
        setUser(null);
    };

    const value = {
        user,
        isLoading,
        register,
        login,
        logout,
        loginWithGoogle,
        // Backend URL bhi provide kar dete hain agar kisi aur API call mein zarurat ho
        BACKEND_URL
    };

    return (
        <AuthContext.Provider value={value}>
            {!isLoading && children}
            {isLoading && <div>Loading Auth...</div>} 
        </AuthContext.Provider>
    );
};
