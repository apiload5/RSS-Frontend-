import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Rss, Sun, Moon, User, LogOut, Home, Plus, ArrowLeft } from 'lucide-react';

const API_BASE_URL = 'https://rss-generator.ahmadraza258042.repl.co';

// Loading Spinner Component
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

// Header Component
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

// Auth Form Component
const AuthForm = ({ isLogin = true, onSubmit, loading, error, success, onSwitchMode }) => {
  const [formData, setFormData] = useState({ username: '', password: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 w-full max-w-md">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-br from-primary-500 to-primary-600 rounded-2xl mx-auto mb-4">
            <Rss className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">
            RSS Aggregator
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            {isLogin ? 'Welcome back' : 'Create your account'}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Username
            </label>
            <input
              type="text"
              value={formData.username}
              onChange={(e) => setFormData({ ...formData, username: e.target.value })}
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-gray-700 dark:text-white transition-colors"
              placeholder="Enter your username"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Password
            </label>
            <input
              type="password"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-gray-700 dark:text-white transition-colors"
              placeholder="Enter your password"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-primary-600 hover:bg-primary-700 disabled:bg-primary-400 text-white py-3 px-4 rounded-lg font-medium transition-colors duration-200"
          >
            {loading ? 'Please wait...' : (isLogin ? 'Sign In' : 'Create Account')}
          </button>
        </form>

        <div className="mt-6 text-center">
          <button
            onClick={onSwitchMode}
            className="text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300 font-medium"
          >
            {isLogin ? "Don't have an account? Sign up" : 'Already have an account? Sign in'}
          </button>
        </div>

        {error && (
          <div className="mt-4 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
            <p className="text-red-700 dark:text-red-400 text-sm">{error}</p>
          </div>
        )}
        {success && (
          <div className="mt-4 p-3 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
            <p className="text-green-700 dark:text-green-400 text-sm">{success}</p>
          </div>
        )}
      </div>
    </div>
  );
};

// Dashboard Component
const Dashboard = ({ username, onLogout, darkMode, toggleDarkMode, token }) => {
  const [feeds, setFeeds] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [newFeed, setNewFeed] = useState({ name: '', url: '' });

  const apiCall = async (endpoint, options = {}) => {
    setLoading(true);
    setError('');

    const config = {
      headers: {
        'Content-Type': 'application/json',
        ...(token && { Authorization: `Bearer ${token}` }),
        ...options.headers,
      },
      ...options,
    };

    if (config.body && typeof config.body === 'object') {
      config.body = JSON.stringify(config.body);
    }

    try {
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

  useEffect(() => {
    fetchFeeds();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Header 
        username={username} 
        onLogout={onLogout}
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
                Your Feeds
              </h2>
              <p className="text-gray-600 dark:text-gray-400 mt-1">
                Manage your RSS feed subscriptions
              </p>
            </div>
            <div className="p-6">
              {loading ? (
                <LoadingSpinner text="Loading feeds..." />
              ) : feeds.length === 0 ? (
                <div className="text-center py-8">
                  <Rss className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-500 dark:text-gray-400">
                    No feeds yet. Add your first RSS feed to get started!
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {feeds.map((feed) => (
                    <div
                      key={feed._id}
                      className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:border-primary-300 dark:hover:border-primary-600 transition-colors cursor-pointer group"
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
                Add New Feed
              </h2>
              <p className="text-gray-600 dark:text-gray-400 mt-1">
                Subscribe to a new RSS feed
              </p>
            </div>
            <div className="p-6">
              <form onSubmit={handleAddFeed} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Feed Name
                  </label>
                  <input
                    type="text"
                    value={newFeed.name}
                    onChange={(e) => setNewFeed({ ...newFeed, name: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-gray-700 dark:text-white transition-colors"
                    placeholder="e.g., Tech News"
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
                    placeholder="e.g., https://example.com/rss"
                    required
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-primary-600 hover:bg-primary-700 disabled:bg-primary-400 text-white py-3 px-4 rounded-lg font-medium transition-colors duration-200 flex items-center justify-center"
                >
                  <Plus className="w-5 h-5 mr-2" />
                  {loading ? 'Adding Feed...' : 'Add Feed'}
                </button>
              </form>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

// Main App Component
const App = () => {
  const [token, setToken] = useState(localStorage.getItem('token') || '');
  const [username, setUsername] = useState(localStorage.getItem('username') || '');
  const [currentView, setCurrentView] = useState('login');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    if (token) {
      setCurrentView('dashboard');
    }
    
    // Check system preference for dark mode
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setDarkMode(true);
    }
  }, [token]);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const apiCall = async (endpoint, options = {}) => {
    setLoading(true);
    setError('');

    const config = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    };

    if (config.body && typeof config.body === 'object') {
      config.body = JSON.stringify(config.body);
    }

    try {
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

  const handleLogin = async (formData) => {
    try {
      const data = await apiCall('/api/users/login', {
        method: 'POST',
        body: formData,
      });

      setToken(data.token);
      setUsername(data.username);
      localStorage.setItem('token', data.token);
      localStorage.setItem('username', data.username);
      setCurrentView('dashboard');
      setSuccess('Login successful!');
    } catch (err) {
      // Error handled in apiCall
    }
  };

  const handleRegister = async (formData) => {
    try {
      const data = await apiCall('/api/users/register', {
        method: 'POST',
        body: formData,
      });

      setToken(data.token);
      setUsername(data.username);
      localStorage.setItem('token', data.token);
      localStorage.setItem('username', data.username);
      setCurrentView('dashboard');
      setSuccess('Registration successful!');
    } catch (err) {
      // Error handled in apiCall
    }
  };

  const handleLogout = () => {
    setToken('');
    setUsername('');
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    setCurrentView('login');
    setSuccess('Logged out successfully');
  };

  const handleSwitchAuthMode = () => {
    setCurrentView(currentView === 'login' ? 'register' : 'login');
    setError('');
  };

  return (
    <Routes>
      <Route path="/" element={
        token ? (
          <Navigate to="/dashboard" replace />
        ) : (
          <Navigate to="/login" replace />
        )
      } />
      
      <Route path="/login" element={
        <AuthForm
          isLogin={true}
          onSubmit={handleLogin}
          loading={loading}
          error={error}
          success={success}
          onSwitchMode={handleSwitchAuthMode}
        />
      } />
      
      <Route path="/register" element={
        <AuthForm
          isLogin={false}
          onSubmit={handleRegister}
          loading={loading}
          error={error}
          success={success}
          onSwitchMode={handleSwitchAuthMode}
        />
      } />
      
      <Route path="/dashboard" element={
        token ? (
          <Dashboard
            username={username}
            onLogout={handleLogout}
            darkMode={darkMode}
            toggleDarkMode={toggleDarkMode}
            token={token}
          />
        ) : (
          <Navigate to="/login" replace />
        )
      } />
    </Routes>
  );
};

export default App;
