import React, { useState, useEffect, useContext, createContext, Suspense, useCallback } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate, useLocation, useParams } from 'react-router-dom';
import { Rss, Sun, Moon, User, LogOut, Home, Plus, ArrowLeft, AlertTriangle, Loader, Lock, Mail, UserPlus, LogIn } from 'lucide-react';

// Firebase imports - Ab yeh sab App.jsx ke andar hi use honge.
import { initializeApp } from 'firebase/app';
import { getAuth, signInAnonymously, signInWithCustomToken, onAuthStateChanged, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth';

const API_BASE_URL = process.env.REACT_APP_BACKEND_URL || 'https://d8f24516-21d6-4940-8fc5-6f1bf97f7cba-00-oxbrlkzbcc08.sisko.replit.dev';

// Global Firebase variables ko use karne ke liye setup
const appId = typeof __app_id !== 'undefined' ? __app_id : 'default-app-id';
const firebaseConfig = typeof __firebase_config !== 'undefined' ? JSON.parse(__firebase_config) : null;
const initialAuthToken = typeof __initial_auth_token !== 'undefined' ? __initial_auth_token : null;

// ----------------------------------------------------------------------
// 1. CONSOLIDATED AUTH CONTEXT & PROVIDER
// ----------------------------------------------------------------------
const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [authInstance, setAuthInstance] = useState(null);

    // Initial Firebase and Auth setup
    useEffect(() => {
        let auth;
        try {
            const app = initializeApp(firebaseConfig, appId);
            auth = getAuth(app);
            setAuthInstance(auth);
            console.log("Firebase App Initialized.");
        } catch (e) {
            console.error("Firebase initialization failed:", e);
            setLoading(false);
            return;
        }

        const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
            if (currentUser) {
                setUser(currentUser);
                setLoading(false);
            } else {
                // Initial sign-in logic
                try {
                    if (initialAuthToken) {
                        await signInWithCustomToken(auth, initialAuthToken);
                        // onAuthStateChanged will handle setting the user
                    } else {
                        await signInAnonymously(auth);
                        // onAuthStateChanged will handle setting the user
                    }
                } catch (e) {
                    console.error("Initial auth sign-in failed:", e);
                    setLoading(false);
                }
            }
        });

        return () => unsubscribe();
    }, []);

    // Auth functions
    const signup = useCallback(async (email, password) => {
        if (!authInstance) throw new Error("Authentication service not available.");
        setLoading(true);
        try {
            const userCredential = await createUserWithEmailAndPassword(authInstance, email, password);
            setUser(userCredential.user);
        } finally {
            setLoading(false);
        }
    }, [authInstance]);

    const login = useCallback(async (email, password) => {
        if (!authInstance) throw new Error("Authentication service not available.");
        setLoading(true);
        try {
            const userCredential = await signInWithEmailAndPassword(authInstance, email, password);
            setUser(userCredential.user);
        } finally {
            setLoading(false);
        }
    }, [authInstance]);

    const logout = useCallback(async () => {
        if (!authInstance) throw new Error("Authentication service not available.");
        await signOut(authInstance);
        setUser(null);
    }, [authInstance]);

    const value = { user, loading, signup, login, logout, authInstance };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};
// ----------------------------------------------------------------------

// ----------------------------------------------------------------------
// 2. CONSOLIDATED LOGIN SCREEN
// ----------------------------------------------------------------------
const LoginScreen = () => {
    const { login, loading } = useAuth();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        try {
            await login(email, password);
            navigate('/dashboard');
        } catch (err) {
            setError(err.message.includes('auth/invalid-credential') ? 'Invalid email or password.' : err.message);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 p-4">
            <div className="w-full max-w-md bg-white dark:bg-gray-800 rounded-xl shadow-2xl p-8 border-t-4 border-primary-600">
                <div className="flex justify-center mb-6">
                    <LogIn className="w-10 h-10 text-primary-600" />
                </div>
                <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-2">
                    Vaapas Aayen
                </h2>
                <p className="text-center text-gray-500 dark:text-gray-400 mb-8">
                    Apne account mein login karein
                </p>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Email Address
                        </label>
                        <div className="relative">
                            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-gray-700 dark:text-white transition-colors"
                                placeholder="apka@email.com"
                                required
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Password
                        </label>
                        <div className="relative">
                            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-gray-700 dark:text-white transition-colors"
                                placeholder="********"
                                required
                            />
                        </div>
                    </div>

                    {error && (
                        <div className="p-3 bg-red-100 dark:bg-red-900/30 border border-red-300 dark:border-red-700 rounded-lg">
                            <p className="text-red-700 dark:text-red-400 text-sm">{error}</p>
                        </div>
                    )}

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-primary-600 hover:bg-primary-700 disabled:bg-primary-400 text-white py-3 px-4 rounded-lg font-semibold transition-colors duration-200 flex items-center justify-center"
                    >
                        {loading ? <Loader className="w-5 h-5 mr-2 animate-spin" /> : <LogIn className="w-5 h-5 mr-2" />}
                        {loading ? 'Logging In...' : 'Login Karein'}
                    </button>
                </form>

                <div className="mt-8 text-center">
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                        Naye user hain?{' '}
                        <button
                            onClick={() => navigate('/signup')}
                            className="font-medium text-primary-600 hover:text-primary-500 dark:text-primary-400 dark:hover:text-primary-300 transition-colors"
                        >
                            Account Banayein
                        </button>
                    </p>
                </div>
            </div>
        </div>
    );
};
// ----------------------------------------------------------------------

// ----------------------------------------------------------------------
// 3. CONSOLIDATED SIGNUP SCREEN
// ----------------------------------------------------------------------
const SignupScreen = () => {
    const { signup, loading } = useAuth();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        if (password.length < 6) {
            setError("Password must be at least 6 characters long.");
            return;
        }
        try {
            await signup(email, password);
            navigate('/dashboard');
        } catch (err) {
            setError(err.message.includes('auth/email-already-in-use') ? 'This email is already in use.' : err.message);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 p-4">
            <div className="w-full max-w-md bg-white dark:bg-gray-800 rounded-xl shadow-2xl p-8 border-t-4 border-primary-600">
                <div className="flex justify-center mb-6">
                    <UserPlus className="w-10 h-10 text-primary-600" />
                </div>
                <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-2">
                    Naya Account Banayein
                </h2>
                <p className="text-center text-gray-500 dark:text-gray-400 mb-8">
                    RSS Feed Manager mein shamil hon
                </p>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Email Address
                        </label>
                        <div className="relative">
                            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-gray-700 dark:text-white transition-colors"
                                placeholder="apka@email.com"
                                required
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Password (Minimum 6 characters)
                        </label>
                        <div className="relative">
                            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-gray-700 dark:text-white transition-colors"
                                placeholder="********"
                                required
                            />
                        </div>
                    </div>

                    {error && (
                        <div className="p-3 bg-red-100 dark:bg-red-900/30 border border-red-300 dark:border-red-700 rounded-lg">
                            <p className="text-red-700 dark:text-red-400 text-sm">{error}</p>
                        </div>
                    )}

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-primary-600 hover:bg-primary-700 disabled:bg-primary-400 text-white py-3 px-4 rounded-lg font-semibold transition-colors duration-200 flex items-center justify-center"
                    >
                        {loading ? <Loader className="w-5 h-5 mr-2 animate-spin" /> : <UserPlus className="w-5 h-5 mr-2" />}
                        {loading ? 'Creating Account...' : 'Sign Up Karein'}
                    </button>
                </form>

                <div className="mt-8 text-center">
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                        Pehle se account hai?{' '}
                        <button
                            onClick={() => navigate('/login')}
                            className="font-medium text-primary-600 hover:text-primary-500 dark:text-primary-400 dark:hover:text-primary-300 transition-colors"
                        >
                            Login Karein
                        </button>
                    </p>
                </div>
            </div>
        </div>
    );
};
// ----------------------------------------------------------------------

// Loading Spinner Component (Same UI)
const LoadingSpinner = ({ size = 'medium', text = 'Loading...' }) => {
  const sizeClasses = {
    small: 'w-4 h-4',
    medium: 'w-8 h-8',
    large: 'w-12 h-12'
  };

  return (
    <div className="flex flex-col items-center justify-center space-y-3">
      <div className={`animate-spin rounded-full border-b-2 border-primary-600 ${sizeClasses[size]}`}></div>
      {text && <p className="text-gray-500 dark:text-gray-400 text-sm">{text}</p>}
    </div>
  );
};

// Header Component (Same UI)
const Header = ({ username, onLogout, darkMode, toggleDarkMode }) => {
  return (
    <header className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-3">
            <div className="flex items-center justify-center w-10 h-10 bg-gradient-to-br from-primary-500 to-primary-600 rounded-lg">
              <Rss className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900 dark:text-white">
                RSS Generator Pro
              </h1>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Professional Feed Management
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <button
              onClick={toggleDarkMode}
              className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              aria-label="Toggle dark mode"
            >
              {darkMode ? (
                <Sun className="w-5 h-5" />
              ) : (
                <Moon className="w-5 h-5" />
              )}
            </button>

            {username && (
              <div className="flex items-center space-x-3">
                <div className="flex items-center space-x-2 text-sm">
                  <User className="w-4 h-4 text-gray-400" />
                  <span className="text-gray-700 dark:text-gray-300 font-medium">
                    {username}
                  </span>
                </div>
                <button
                  onClick={onLogout}
                  className="flex items-center space-x-1 px-3 py-2 text-sm text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 font-medium rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Logout</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

// Dashboard Component (Same UI with Backend API integration)
const Dashboard = () => {
  const { user, logout } = useAuth();
  const [feeds, setFeeds] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [newFeed, setNewFeed] = useState({ name: '', url: '' });
  const [darkMode, setDarkMode] = useState(false);
  const navigate = useNavigate();

  const apiCall = async (endpoint, options = {}) => {
    setLoading(true);
    setError('');

    try {
      if (!user) {
        throw new Error('Authentication not ready.');
      }
      const token = await user.getIdToken();
    
      const config = {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
          ...options.headers,
        },
        ...options,
      };

      if (config.body && typeof config.body === 'object') {
        config.body = JSON.stringify(config.body);
      }

      const response = await fetch(`${API_BASE_URL}${endpoint}`, config);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Something went wrong');
      }

      return data;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const fetchFeeds = async () => {
    if (!user) return;
    try {
      const data = await apiCall('/api/feeds');
      setFeeds(data);
    } catch (err) {
      // Error handled in apiCall
    }
  };

  const handleAddFeed = async (e) => {
    e.preventDefault();
    try {
      await apiCall('/api/feeds/add', {
        method: 'POST',
        body: newFeed,
      });

      setNewFeed({ name: '', url: '' });
      setSuccess('Feed added successfully!');
      fetchFeeds();
    } catch (err) {
      // Error handled in apiCall
    }
  };

  const handleFeedClick = (feedId, feedName) => {
    navigate(`/feeds/${feedId}`, { state: { feedName } });
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  useEffect(() => {
    if (user) {
      fetchFeeds();
    }
  }, [user]);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  // Get username from Firebase user
  const username = user?.email?.split('@')[0] || user?.displayName || 'User';

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Header 
        username={username} 
        onLogout={logout}
        darkMode={darkMode}
        toggleDarkMode={toggleDarkMode}
      />

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 sm:px-0 mb-6">
          {error && (
            <div className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
              <p className="text-red-700 dark:text-red-400">{error}</p>
            </div>
          )}
          {success && (
            <div className="p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
              <p className="text-green-700 dark:text-green-400">{success}</p>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 px-4 sm:px-0">
          {/* Feed List */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
            <div className="p-6 border-b border-gray-200 dark:border-gray-700">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                Aapke Feeds
              </h2>
              <p className="text-gray-600 dark:text-gray-400 mt-1">
                Feed items dekhne ke liye feed par click karein
              </p>
            </div>
            <div className="p-6">
              {loading ? (
                <LoadingSpinner text="Feeds load ho rahe hain..." />
              ) : feeds.length === 0 ? (
                <div className="text-center py-8">
                  <Rss className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-500 dark:text-gray-400">
                    Abhi koi feeds nahi hain. Shuru karne ke liye pehli RSS feed jodein!
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {feeds.map((feed) => (
                    <div
                      key={feed._id}
                      className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:border-primary-300 dark:hover:border-primary-600 transition-colors cursor-pointer group"
                      onClick={() => handleFeedClick(feed._id, feed.name)}
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-medium text-gray-900 dark:text-white group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                            {feed.name}
                          </h3>
                          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1 truncate">
                            {feed.url}
                          </p>
                        </div>
                        <span className="text-xs text-gray-400 dark:text-gray-500">
                          {new Date(feed.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Add Feed Form */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
            <div className="p-6 border-b border-gray-200 dark:border-gray-700">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                Nayi Feed Jodein
              </h2>
              <p className="text-gray-600 dark:text-gray-400 mt-1">
                Nayi RSS feed subscribe karein
              </p>
            </div>
            <div className="p-6">
              <form onSubmit={handleAddFeed} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Feed Naam
                  </label>
                  <input
                    type="text"
                    value={newFeed.name}
                    onChange={(e) => setNewFeed({ ...newFeed, name: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-gray-700 dark:text-white transition-colors"
                    placeholder="Jaise, Tech Khabrein"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Feed URL
                  </label>
                  <input
                    type="url"
                    value={newFeed.url}
                    onChange={(e) => setNewFeed({ ...newFeed, url: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-gray-700 dark:text-white transition-colors"
                    placeholder="Jaise, https://example.com/rss"
                    required
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-primary-600 hover:bg-primary-700 disabled:bg-primary-400 text-white py-3 px-4 rounded-lg font-medium transition-colors duration-200 flex items-center justify-center"
                >
                  <Plus className="w-5 h-5 mr-2" />
                  {loading ? 'Feed Jod rahe hain...' : 'Feed Jodein'}
                </button>
              </form>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

// Feed Items View Component (Same UI with Backend API and Gemini integration)
const FeedItemsView = () => {
  const { user } = useAuth();
  const [feedItems, setFeedItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  // Gemini State
  const [summaries, setSummaries] = useState({}); // { index: 'summary text' }
  const [summaryLoading, setSummaryLoading] = useState({}); // { index: true/false }

  const navigate = useNavigate();
  const location = useLocation();
  const { feedId } = useParams(); 
  
  const feedName = location.state?.feedName || 'Feed';

  // Gemini API Constants
  const GEMINI_API_KEY = ""; // Canvas will provide this key at runtime
  const GEMINI_API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent?key=${GEMINI_API_KEY}`;


  // Utility for exponential backoff retry logic
  const fetchWithRetry = async (url, options, retries = 3) => {
    for (let i = 0; i < retries; i++) {
      try {
        const response = await fetch(url, options);
        if (response.status === 429 && i < retries - 1) {
          const delay = Math.pow(2, i) * 1000 + Math.random() * 1000;
          await new Promise(resolve => setTimeout(resolve, delay));
          continue;
        }
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error.message || `API call failed with status ${response.status}`);
        }
        return response.json();
      } catch (error) {
        if (i === retries - 1) throw error;
      }
    }
  };

  const apiCall = async (endpoint, options = {}) => {
    setLoading(true);
    setError('');

    try {
      if (!user) {
        throw new Error('Authentication not ready.');
      }
      const token = await user.getIdToken();
    
      const config = {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
          ...options.headers,
        },
        ...options,
      };

      const response = await fetch(`${API_BASE_URL}${endpoint}`, config);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Something went wrong');
      }

      return data;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const fetchFeedItems = async () => {
    if (!user || !feedId) return;
    try {
      const data = await apiCall(`/api/feeds/${feedId}`);
      setFeedItems(data.items || []);
    } catch (err) {
      // Error handled in apiCall
    }
  };

  // -----------------------------------------------------------------
  // ✨ GEMINI FEATURE: Summarize Article Content
  // -----------------------------------------------------------------
  const handleSummarize = async (index, title, link) => {
    // Agar summary pehle se generate ho chuki hai to kuch na karein
    if (summaries[index]) return; 

    setSummaryLoading(prev => ({ ...prev, [index]: true }));
    setSummaries(prev => ({ ...prev, [index]: 'Summary generate ho rahi hai...' }));
    setError('');

    const systemPrompt = "Aap ek mahir news summarizer hain. Aapka kaam hai di gayi news article ya topic ka 2-3 sentence ka sateek, neutral saaransh (summary) dena. Saaransh ko ground karne ke liye diye gaye URL ka upyog karein.";
    const userQuery = `Is article ka saaransh dein jiska title yeh hai: "${title}". Source URL hai: ${link}`;

    const payload = {
        contents: [{ parts: [{ text: userQuery }] }],
        // Google Search Tool ka upyog karein jisse latest content mil sake
        tools: [{ "google_search": {} }],
        systemInstruction: {
            parts: [{ text: systemPrompt }]
        },
    };

    try {
        const data = await fetchWithRetry(GEMINI_API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });

        const generatedText = data.candidates?.[0]?.content?.parts?.[0]?.text;
        
        if (generatedText) {
            setSummaries(prev => ({ ...prev, [index]: generatedText }));
        } else {
            setSummaries(prev => ({ ...prev, [index]: 'Summary generate nahi ho saki.' }));
        }

    } catch (err) {
        console.error("Gemini API Error:", err);
        // Error state ko main UI error se alag rakhein
        setSummaries(prev => ({ ...prev, [index]: `Error: ${err.message}. Please try again.` }));
    } finally {
        setSummaryLoading(prev => ({ ...prev, [index]: false }));
    }
  };
  // -----------------------------------------------------------------


  const handleBackToDashboard = () => {
    navigate('/dashboard');
  };

  useEffect(() => {
    if (user && feedId) {
      fetchFeedItems();
    }
  }, [user, feedId]);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <header className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <button
                onClick={handleBackToDashboard}
                className="flex items-center space-x-2 text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300 font-medium"
              >
                <ArrowLeft className="w-5 h-5" />
                <span>Dashboard Par Vaapas Jaayen</span>
              </button>
              <h1 className="text-xl font-bold text-gray-900 dark:text-white">
                {feedName}
              </h1>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 sm:px-0">
          {error && (
            <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
              <p className="text-red-700 dark:text-red-400">{error}</p>
            </div>
          )}

          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
            <div className="p-6 border-b border-gray-200 dark:border-gray-700">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                Naye Items
              </h2>
              <p className="text-gray-600 dark:text-gray-400 mt-1">
                {feedItems.length} items mile
              </p>
            </div>

            <div className="p-6">
              {loading ? (
                <LoadingSpinner text="Feed items load ho rahe hain..." />
              ) : feedItems.length === 0 ? (
                <div className="text-center py-8">
                  <Rss className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-500 dark:text-gray-400">
                    Is feed mein koi items nahi mile.
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {feedItems.map((item, index) => (
                    <div
                      key={index}
                      className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:border-primary-300 dark:hover:border-primary-600 transition-colors"
                    >
                      <h3 className="font-medium text-gray-900 dark:text-white mb-2">
                        {item.title}
                      </h3>
                      
                      {/* Gemini Summary Section */}
                      {summaries[index] && (
                          <div className="mt-3 p-3 bg-indigo-50 dark:bg-indigo-900/20 rounded-lg border border-indigo-200 dark:border-indigo-700">
                              <p className="text-sm font-semibold text-indigo-700 dark:text-indigo-300 mb-1">
                                  ✨ Gemini Saaransh:
                              </p>
                              <p className="text-sm text-indigo-600 dark:text-indigo-400 whitespace-pre-wrap">
                                  {summaries[index]}
                              </p>
                          </div>
                      )}


                      <div className="flex items-center justify-between mt-3">
                          <a
                              href={item.link}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300 text-sm font-medium"
                          >
                              Poora Article Padhein
                              <ArrowLeft className="w-4 h-4 ml-1 rotate-180" />
                          </a>

                          <button
                              onClick={() => handleSummarize(index, item.title, item.link)}
                              disabled={summaryLoading[index] || summaries[index]}
                              className="flex items-center text-xs px-3 py-1.5 rounded-full bg-indigo-500 hover:bg-indigo-600 disabled:bg-indigo-400 text-white font-semibold transition-colors shadow-md disabled:opacity-70"
                          >
                              {summaryLoading[index] ? 'Saaransh Ban Raha Hai...' : summaries[index] ? 'Saaransh Taiyaar' : '✨ Saaransh Banayein'}
                          </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

// Error Boundary Component for Runtime Debugging
class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false, error: null };
    }

    static getDerivedStateFromError(error) {
        return { hasError: true, error };
    }

    componentDidCatch(error, errorInfo) {
        console.error("Uncaught error:", error, errorInfo);
    }

    render() {
        if (this.state.hasError) {
            return (
                <div className="min-h-screen flex items-center justify-center bg-red-50 dark:bg-red-900/20 p-4">
                    <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-2xl max-w-lg w-full text-center border-t-4 border-red-500">
                        <AlertTriangle className="w-12 h-12 text-red-500 mx-auto mb-4" />
                        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                            Aapki Application Crash Ho Gayi Hai!
                        </h1>
                        <p className="text-gray-600 dark:text-gray-400 mb-4">
                            Component render hote samay koi samasya aayi hai.
                        </p>
                        <details className="text-left bg-gray-100 dark:bg-gray-700 p-4 rounded-lg text-sm text-gray-700 dark:text-gray-300">
                            <summary className="font-semibold cursor-pointer text-red-600 dark:text-red-400">
                                Technical Details Dekhein
                            </summary>
                            <pre className="mt-2 whitespace-pre-wrap break-words overflow-auto">
                                {this.state.error && this.state.error.toString()}
                            </pre>
                        </details>
                    </div>
                </div>
            );
        }

        return this.props.children;
    }
}

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();
  
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <LoadingSpinner text="Authentication Check Ho Rahi Hai..." />
      </div>
    );
  }
  
  return user ? children : <Navigate to="/login" />;
};

// Public Route Component
const PublicRoute = ({ children }) => {
  const { user } = useAuth();
  return user ? <Navigate to="/dashboard" /> : children;
};

// App Content with Routing
const AppContent = () => {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={
        <PublicRoute>
          <Navigate to="/login" replace />
        </PublicRoute>
      } />
      
      {/* Ab yeh components App.jsx ke andar hi define kiye gaye hain, no imports needed */}
      <Route path="/login" element={
        <PublicRoute>
          <LoginScreen />
        </PublicRoute>
      } />
      
      <Route path="/signup" element={
        <PublicRoute>
          <SignupScreen />
        </PublicRoute>
      } />

      {/* Protected Routes */}
      <Route path="/dashboard" element={
        <ProtectedRoute>
          <Dashboard />
        </ProtectedRoute>
      } />
      
      <Route path="/feeds/:feedId" element={
        <ProtectedRoute>
          <FeedItemsView />
        </ProtectedRoute>
      } />

      {/* Catch all route */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

// Main App Component
const App = () => {
  // Check if firebase config is available.
  const isConfigAvailable = firebaseConfig && Object.keys(firebaseConfig).length > 0;

  if (!isConfigAvailable) {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
            <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-xl max-w-md w-full text-center">
                <AlertTriangle className="w-10 h-10 text-yellow-500 mx-auto mb-4" />
                <h1 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                    Configuration Error
                </h1>
                <p className="text-gray-600 dark:text-gray-400">
                    Firebase configuration missing. Application shuru nahi ho sakta.
                </p>
            </div>
        </div>
    );
  }

  return (
    <Router>
      <ErrorBoundary>
        <Suspense fallback={<LoadingSpinner text="Component load ho rahe hain..." />}>
            <AuthProvider>
              <AppContent />
            </AuthProvider>
        </Suspense>
      </ErrorBoundary>
    </Router>
  );
};

export default App;
