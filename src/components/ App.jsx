import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Rss, Sun, Moon, User, LogOut, Home, Plus, ArrowLeft, Star, Check, Zap, Users, Globe, Mail, ArrowRight, Play } from 'lucide-react';

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

// 🆕 NEW: Marketing Header Component
const MarketingHeader = ({ darkMode, toggleDarkMode, onNavigateToApp }) => {
  return (
    <header className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 sticky top-0 z-50">
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
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <button
              onClick={toggleDarkMode}
              className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
            
            <button
              onClick={onNavigateToApp}
              className="bg-primary-600 hover:bg-primary-700 text-white px-6 py-2 rounded-lg font-medium transition-colors"
            >
              Launch App
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

// 🆕 NEW: Hero Section Component
const HeroSection = ({ onGetStarted }) => {
  return (
    <section className="bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <div className="flex justify-center mb-6">
            <div className="flex items-center justify-center w-20 h-20 bg-gradient-to-br from-primary-500 to-primary-600 rounded-2xl">
              <Rss className="w-10 h-10 text-white" />
            </div>
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
            All Your News in
            <span className="text-primary-600"> One Place</span>
          </h1>
          
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto">
            RSS Generator Pro helps you collect, organize, and read all your favorite news feeds 
            in a beautiful, distraction-free interface. Stay updated without the noise.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button
              onClick={onGetStarted}
              className="bg-primary-600 hover:bg-primary-700 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-colors flex items-center"
            >
              Get Started Free
              <ArrowRight className="w-5 h-5 ml-2" />
            </button>
            
            <button className="border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 px-8 py-4 rounded-lg font-semibold text-lg transition-colors flex items-center">
              <Play className="w-5 h-5 mr-2" />
              Watch Demo
            </button>
          </div>

          {/* 🆕 Google AdSense Placeholder */}
          <div className="mt-12 max-w-4xl mx-auto">
            <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-8 text-center border-2 border-dashed border-gray-300 dark:border-gray-700">
              <div className="text-gray-500 dark:text-gray-400 mb-2">Advertisement</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                Google AdSense - Responsive Ad Unit
              </div>
              <div className="text-xs text-gray-500 mt-2">728x90 or 320x100</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// 🆕 NEW: Features Section
const FeaturesSection = () => {
  const features = [
    {
      icon: <Zap className="w-8 h-8" />,
      title: "Lightning Fast",
      description: "Load and read your feeds instantly with our optimized platform."
    },
    {
      icon: <Globe className="w-8 h-8" />,
      title: "Unlimited Feeds", 
      description: "Add as many RSS feeds as you want from any source."
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Multi-User",
      description: "Personal accounts with private feed collections."
    }
  ];

  return (
    <section className="py-20 bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Why Choose RSS Generator Pro?
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            Everything you need to stay informed, organized, and productive
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="bg-gray-50 dark:bg-gray-800 rounded-xl p-8 text-center hover:shadow-lg transition-shadow">
              <div className="flex justify-center mb-4">
                <div className="p-3 bg-primary-100 dark:bg-primary-900/30 rounded-lg text-primary-600 dark:text-primary-400">
                  {feature.icon}
                </div>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                {feature.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        {/* 🆕 Adsterra Ad Placeholder */}
        <div className="mt-16 text-center">
          <div className="bg-orange-50 dark:bg-orange-900/20 rounded-lg p-6 border-2 border-dashed border-orange-300 dark:border-orange-700">
            <div className="text-orange-600 dark:text-orange-400 mb-2">Adsterra Advertisement</div>
            <div className="text-sm text-orange-700 dark:text-orange-300">
              Popunder or Banner Ad - High CPM Rates
            </div>
            <div className="text-xs text-orange-600 mt-2">300x250 or 728x90</div>
          </div>
        </div>
      </div>
    </section>
  );
};

// 🆕 NEW: How It Works Section
const HowItWorksSection = ({ onGetStarted }) => {
  const steps = [
    {
      step: "1",
      title: "Sign Up Free",
      description: "Create your account in 30 seconds"
    },
    {
      step: "2", 
      title: "Add Your Feeds",
      description: "Paste RSS URLs from your favorite sites"
    },
    {
      step: "3",
      title: "Start Reading",
      description: "Enjoy organized, ad-free reading experience"
    }
  ];

  return (
    <section className="py-20 bg-gray-50 dark:bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            How It Works
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            Get started in just 3 simple steps
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          {steps.map((step, index) => (
            <div key={index} className="text-center">
              <div className="w-16 h-16 bg-primary-600 text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
                {step.step}
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                {step.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                {step.description}
              </p>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <button
            onClick={onGetStarted}
            className="bg-primary-600 hover:bg-primary-700 text-white px-12 py-4 rounded-lg font-semibold text-lg transition-colors"
          >
            Start Reading Now
          </button>
        </div>

        {/* 🆕 Google AdSense In-Article Ad */}
        <div className="mt-16 max-w-2xl mx-auto">
          <div className="bg-gray-100 dark:bg-gray-700 rounded-lg p-6 text-center border-2 border-dashed border-gray-300 dark:border-gray-600">
            <div className="text-gray-500 dark:text-gray-400 mb-2">In-Article Advertisement</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">
              Google AdSense - In-Article Ad Unit
            </div>
            <div className="text-xs text-gray-500 mt-2">Responsive 300x250 - 336x280</div>
          </div>
        </div>
      </div>
    </section>
  );
};

// 🆕 NEW: Landing Page Component
const LandingPage = ({ darkMode, toggleDarkMode, onGetStarted }) => {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <MarketingHeader 
        darkMode={darkMode} 
        toggleDarkMode={toggleDarkMode}
        onNavigateToApp={onGetStarted}
      />
      
      <HeroSection onGetStarted={onGetStarted} />
      <FeaturesSection />
      <HowItWorksSection onGetStarted={onGetStarted} />
      
      {/* 🆕 Footer with Ad Placeholder */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="mb-8">
              <div className="bg-gray-800 rounded-lg p-6 text-center border-2 border-dashed border-gray-700">
                <div className="text-gray-400 mb-2">Footer Advertisement</div>
                <div className="text-sm text-gray-300">
                  Adsterra Native Ads or Google Display Ads
                </div>
                <div className="text-xs text-gray-500 mt-2">Responsive 728x90 - 970x250</div>
              </div>
            </div>
            
            <p className="text-gray-400">
              © 2024 RSS Generator Pro. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

// 🆕 NEW: Ad Component for Dashboard
const AdUnit = ({ type = "google", size = "responsive" }) => {
  const getAdStyles = () => {
    if (type === "google") {
      return {
        container: "bg-blue-50 dark:bg-blue-900/20 border-2 border-dashed border-blue-300 dark:border-blue-700",
        text: "text-blue-600 dark:text-blue-400",
        subtext: "text-blue-700 dark:text-blue-300"
      };
    } else {
      return {
        container: "bg-orange-50 dark:bg-orange-900/20 border-2 border-dashed border-orange-300 dark:border-orange-700",
        text: "text-orange-600 dark:text-orange-400", 
        subtext: "text-orange-700 dark:text-orange-300"
      };
    }
  };

  const adConfigs = {
    google: {
      text: "Google AdSense",
      sizes: ["728x90", "300x250", "320x100"]
    },
    adsterra: {
      text: "Adsterra Ads",
      sizes: ["300x250", "728x90", "160x600"]
    }
  };

  const config = adConfigs[type];
  const styles = getAdStyles();

  return (
    <div className={`${styles.container} rounded-lg p-4 text-center my-4`}>
      <div className={`${styles.text} text-sm font-medium mb-1`}>
        {config.text} - Advertisement
      </div>
      <div className={`${styles.subtext} text-xs`}>
        {size === "responsive" ? "Responsive Ad Unit" : `${size} Banner`}
      </div>
      <div className={`${styles.text} text-xs mt-1`}>
        {config.sizes.join(" | ")}
      </div>
    </div>
  );
};

// Existing Header Component (for app)
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
            >
              {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
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

// Auth Form Component (Updated with ads)
const AuthForm = ({ isLogin = true, onSubmit, loading, error, success, onSwitchMode }) => {
  const [formData, setFormData] = useState({ username: '', password: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        {/* 🆕 Ad above auth form */}
        <AdUnit type="google" size="responsive" />
        
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
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

        {/* 🆕 Ad below auth form */}
        <AdUnit type="adsterra" size="300x250" />
      </div>
    </div>
  );
};

// Dashboard Component (Updated with ads)
const Dashboard = ({ username, onLogout, darkMode, toggleDarkMode, token, onViewFeed }) => {
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
      setError('');
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
      setError('');
      setTimeout(() => setSuccess(''), 3000);
      fetchFeeds();
    } catch (err) {
      // Error handled in apiCall
    }
  };

  const handleFeedClick = (feedId, feedName) => {
    onViewFeed(feedId, feedName);
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

        {/* 🆕 Sidebar Ad */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 px-4 sm:px-0">
          {/* Main Content */}
          <div className="lg:col-span-3">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Feed List */}
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
                <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                    Your Feeds
                  </h2>
                  <p className="text-gray-600 dark:text-gray-400 mt-1">
                    Click on a feed to view its items
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

                  {/* 🆕 In-form Ad */}
                  <AdUnit type="google" size="responsive" />
                </div>
              </div>
            </div>
          </div>

          {/* 🆕 Sidebar with Ads */}
          <div className="space-y-6">
            <AdUnit type="adsterra" size="300x250" />
            <AdUnit type="google" size="300x600" />
            <AdUnit type="adsterra" size="160x600" />
          </div>
        </div>
      </main>
    </div>
  );
};

// Feed Items View Component (Updated with ads)
const FeedItemsView = ({ feedId, feedName, onBack, token }) => {
  const [feedItems, setFeedItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

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

  const fetchFeedItems = async () => {
    try {
      const data = await apiCall(`/api/feeds/${feedId}`);
      setFeedItems(data.items || []);
      setError('');
    } catch (err) {
      // Error handled in apiCall
    }
  };

  useEffect(() => {
    fetchFeedItems();
  }, [feedId]);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <header className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <button
                onClick={onBack}
                className="flex items-center space-x-2 text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300 font-medium"
              >
                <ArrowLeft className="w-5 h-5" />
                <span>Back to Dashboard</span>
              </button>
              <h1 className="text-xl font-bold text-gray-900 dark:text-white">
                {feedName}
              </h1>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 px-4 sm:px-0">
          {/* Main Content */}
          <div className="lg:col-span-3">
            {error && (
              <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
                <p className="text-red-700 dark:text-red-400">{error}</p>
              </div>
            )}

            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
              <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                  Latest Items
                </h2>
                <p className="text-gray-600 dark:text-gray-400 mt-1">
                  {feedItems.length} items found
                </p>
              </div>

              <div className="p-6">
                {loading ? (
                  <LoadingSpinner text="Loading feed items..." />
                ) : feedItems.length === 0 ? (
                  <div className="text-center py-8">
                    <Rss className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-500 dark:text-gray-400">
                      No items found in this feed.
                    </p>
                  </div>
                ) : (
                  <div className="space-y-6">
                    {/* 🆕 Ad between articles */}
                    <AdUnit type="google" size="responsive" />
                    
                    {feedItems.map((item, index) => (
                      <div key={index}>
                        <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:border-primary-300 dark:hover:border-primary-600 transition-colors">
                          <h3 className="font-medium text-gray-900 dark:text-white mb-2">
                            {item.title}
                          </h3>
                          <p className="text-gray-600 dark:text-gray-400 text-sm mb-3">
                            {item.description && item.description.substring(0, 200)}...
                          </p>
                          <a
                            href={item.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300 text-sm font-medium"
                          >
                            Read full article
                            <ArrowLeft className="w-4 h-4 ml-1 rotate-180" />
                          </a>
                        </div>

                        {/* 🆕 Ad after every 3rd article */}
                        {(index + 1) % 3 === 0 && (
                          <AdUnit type="adsterra" size="728x90" />
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* 🆕 Sidebar with Ads */}
          <div className="space-y-6">
            <AdUnit type="adsterra" size="300x250" />
            <AdUnit type="google" size="300x600" />
            <AdUnit type="adsterra" size="160x600" />
          </div>
        </div>
      </main>
    </div>
  );
};

// Main App Component
function App() {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [currentView, setCurrentView] = useState('landing'); // 'landing', 'auth', 'dashboard', 'feed'
  const [selectedFeed, setSelectedFeed] = useState(null);
  const [selectedFeedName, setSelectedFeedName] = useState('');
  const [darkMode, setDarkMode] = useState(false);

  // Check for saved authentication on component mount
  useEffect(() => {
    const savedToken = localStorage.getItem('rssToken');
    const savedUser = localStorage.getItem('rssUser');

    if (savedToken && savedUser) {
      setToken(savedToken);
      setUser(JSON.parse(savedUser));
      setCurrentView('dashboard');
    }

    // Check for dark mode preference
    const isDarkMode = localStorage.getItem('darkMode') === 'true';
    setDarkMode(isDarkMode);
  }, []);

  // Apply dark mode class to document
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('darkMode', darkMode.toString());
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const handleAuth = async (formData, isLogin = true) => {
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const endpoint = isLogin ? '/api/auth/login' : '/api/auth/register';
      const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Authentication failed');
      }

      if (isLogin) {
        setToken(data.token);
        setUser(data.user);
        localStorage.setItem('rssToken', data.token);
        localStorage.setItem('rssUser', JSON.stringify(data.user));
        setCurrentView('dashboard');
        setSuccess('Login successful!');
      } else {
        setSuccess('Account created successfully! Please sign in.');
        // Switch to login mode after successful registration
        setTimeout(() => {
          setCurrentView('auth');
          setError('');
        }, 2000);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('rssToken');
    localStorage.removeItem('rssUser');
    setCurrentView('landing');
    setError('');
    setSuccess('');
  };

  const handleViewFeed = (feedId, feedName) => {
    setSelectedFeed(feedId);
    setSelectedFeedName(feedName);
    setCurrentView('feed');
  };

  const handleBackToDashboard = () => {
    setCurrentView('dashboard');
    setSelectedFeed(null);
    setSelectedFeedName('');
  };

  const handleGetStarted = () => {
    setCurrentView('auth');
  };

  const handleBackToLanding = () => {
    setCurrentView('landing');
  };

  // Render different views based on current state
  const renderCurrentView = () => {
    switch (currentView) {
      case 'landing':
        return (
          <LandingPage 
            darkMode={darkMode}
            toggleDarkMode={toggleDarkMode}
            onGetStarted={handleGetStarted}
          />
        );

      case 'auth':
        return (
          <AuthForm
            isLogin={!success || success.includes('Please sign in')}
            onSubmit={(formData) => handleAuth(formData, !success.includes('Please sign in'))}
            loading={loading}
            error={error}
            success={success}
            onSwitchMode={() => {
              setError('');
              setSuccess('');
            }}
          />
        );

      case 'dashboard':
        return (
          <Dashboard
            username={user?.username}
            onLogout={handleLogout}
            darkMode={darkMode}
            toggleDarkMode={toggleDarkMode}
            token={token}
            onViewFeed={handleViewFeed}
          />
        );

      case 'feed':
        return (
          <FeedItemsView
            feedId={selectedFeed}
            feedName={selectedFeedName}
            onBack={handleBackToDashboard}
            token={token}
          />
        );

      default:
        return (
          <LandingPage 
            darkMode={darkMode}
            toggleDarkMode={toggleDarkMode}
            onGetStarted={handleGetStarted}
          />
        );
    }
  };

  return renderCurrentView();
}

export default App;