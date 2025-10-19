import React, { useState, useEffect } from 'react';
import { HashRouter as Router, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { Rss, Sun, Moon, User, LogOut, Home, Plus, ArrowLeft, Zap, Users, Globe, ArrowRight, Play } from 'lucide-react';
import { IoLogoGoogle, IoMail, IoLockClosed, IoPerson, IoArrowForward, IoArrowBack } from 'react-icons/io5';

// Loading Spinner Component
const LoadingSpinner = ({ text = 'Loading...' }) => (
  <div className="flex flex-col items-center justify-center min-h-screen space-y-4">
    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
    <p className="text-gray-600">{text}</p>
  </div>
);

// Simple Marketing Header
const MarketingHeader = ({ darkMode, toggleDarkMode, onNavigateToApp }) => (
  <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex justify-between items-center h-16">
        <div className="flex items-center space-x-3">
          <div className="flex items-center justify-center w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg">
            <Rss className="w-6 h-6 text-white" />
          </div>
          <h1 className="text-xl font-bold text-gray-900">RSS Generator Pro</h1>
        </div>
        <div className="flex items-center space-x-4">
          <button
            onClick={toggleDarkMode}
            className="p-2 text-gray-500 hover:text-gray-700 rounded-lg hover:bg-gray-100"
          >
            {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </button>
          <button
            onClick={onNavigateToApp}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium"
          >
            Launch App
          </button>
        </div>
      </div>
    </div>
  </header>
);

// Hero Section
const HeroSection = ({ onGetStarted }) => (
  <section className="bg-gradient-to-br from-blue-50 to-indigo-100 py-20">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center">
        <div className="flex justify-center mb-6">
          <div className="flex items-center justify-center w-20 h-20 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl">
            <Rss className="w-10 h-10 text-white" />
          </div>
        </div>
        <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
          All Your News in
          <span className="text-blue-600"> One Place</span>
        </h1>
        <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
          RSS Generator Pro helps you collect, organize, and read all your favorite news feeds 
          in a beautiful, distraction-free interface.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <button
            onClick={onGetStarted}
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg font-semibold text-lg flex items-center"
          >
            Get Started Free
            <ArrowRight className="w-5 h-5 ml-2" />
          </button>
          <button className="border border-gray-300 text-gray-700 hover:bg-gray-50 px-8 py-4 rounded-lg font-semibold text-lg flex items-center">
            <Play className="w-5 h-5 mr-2" />
            Watch Demo
          </button>
        </div>
      </div>
    </div>
  </section>
);

// Features Section
const FeaturesSection = () => {
  const features = [
    { icon: <Zap className="w-8 h-8" />, title: "Lightning Fast", description: "Load and read your feeds instantly" },
    { icon: <Globe className="w-8 h-8" />, title: "Unlimited Feeds", description: "Add as many RSS feeds as you want" },
    { icon: <Users className="w-8 h-8" />, title: "Multi-User", description: "Personal accounts with private feeds" }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Why Choose RSS Generator Pro?</h2>
          <p className="text-xl text-gray-600">Everything you need to stay informed and organized</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="bg-gray-50 rounded-xl p-8 text-center hover:shadow-lg transition-shadow">
              <div className="flex justify-center mb-4">
                <div className="p-3 bg-blue-100 rounded-lg text-blue-600">{feature.icon}</div>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Landing Page Component
const LandingPage = ({ darkMode, toggleDarkMode, onGetStarted }) => (
  <div className="min-h-screen bg-white">
    <MarketingHeader 
      darkMode={darkMode} 
      toggleDarkMode={toggleDarkMode}
      onNavigateToApp={onGetStarted}
    />
    <HeroSection onGetStarted={onGetStarted} />
    <FeaturesSection />
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <p className="text-gray-400">© 2024 RSS Generator Pro. All rights reserved.</p>
      </div>
    </footer>
  </div>
);

// Login Screen Component
const LoginScreen = ({ onBackToHome }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({ email: '', password: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    // Simulate login
    setTimeout(() => {
      setLoading(false);
      navigate('/dashboard');
    }, 1000);
  };

  const handleGoogleSignIn = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      navigate('/dashboard');
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        <button onClick={onBackToHome} className="flex items-center space-x-2 text-gray-600 hover:text-gray-800 mb-6">
          <IoArrowBack className="w-4 h-4" />
          <span>Back to Home</span>
        </button>

        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="text-center mb-8">
            <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl mx-auto mb-4">
              <IoMail className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-gray-800 mb-2">Welcome Back</h1>
            <p className="text-gray-600">Sign in to your RSS Aggregator account</p>
          </div>

          <button onClick={handleGoogleSignIn} disabled={loading} className="w-full flex items-center justify-center space-x-3 bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 py-3 px-4 rounded-lg font-medium mb-6">
            <IoLogoGoogle className="w-5 h-5 text-red-500" />
            <span>{loading ? 'Signing In...' : 'Continue with Google'}</span>
          </button>

          <div className="relative mb-6">
            <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-gray-300"></div></div>
            <div className="relative flex justify-center text-sm"><span className="px-2 bg-white text-gray-500">Or continue with email</span></div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
              <div className="relative">
                <IoMail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input type="email" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" placeholder="Enter your email" required />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
              <div className="relative">
                <IoLockClosed className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input type="password" value={formData.password} onChange={(e) => setFormData({...formData, password: e.target.value})} className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" placeholder="Enter your password" required />
              </div>
            </div>

            <button type="submit" disabled={loading} className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white py-3 px-4 rounded-lg font-medium flex items-center justify-center">
              {loading ? 'Signing In...' : <><span>Sign In</span><IoArrowForward className="w-5 h-5 ml-2" /></>}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-gray-600">
              Don't have an account?{' '}
              <button onClick={() => navigate('/signup')} className="text-blue-600 hover:text-blue-700 font-medium">Sign up here</button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

// Dashboard Component
const Dashboard = ({ onLogout, darkMode, toggleDarkMode }) => (
  <div className="min-h-screen bg-gray-50">
    <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-3">
            <div className="flex items-center justify-center w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg">
              <Rss className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">RSS Generator Pro</h1>
              <p className="text-xs text-gray-500">Professional Feed Management</p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <button onClick={toggleDarkMode} className="p-2 text-gray-500 hover:text-gray-700 rounded-lg hover:bg-gray-100">
              {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
            <button onClick={onLogout} className="flex items-center space-x-1 px-3 py-2 text-sm text-red-600 hover:text-red-700 font-medium rounded-lg hover:bg-red-50">
              <LogOut className="w-4 h-4" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </div>
    </header>

    <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
      <div className="px-4 sm:px-0">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
          <div className="text-center">
            <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <User className="w-10 h-10 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Welcome to Dashboard!</h2>
            <p className="text-gray-600 mb-6">RSS Generator Pro is working perfectly!</p>
            
            <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4 max-w-2xl mx-auto">
              <div className="bg-blue-50 rounded-lg p-4 text-center">
                <Plus className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                <h4 className="font-medium text-gray-900">Add Feeds</h4>
                <p className="text-sm text-gray-600">Add RSS feeds</p>
              </div>
              <div className="bg-green-50 rounded-lg p-4 text-center">
                <Rss className="w-8 h-8 text-green-600 mx-auto mb-2" />
                <h4 className="font-medium text-gray-900">Manage Feeds</h4>
                <p className="text-sm text-gray-600">Organize your content</p>
              </div>
              <div className="bg-purple-50 rounded-lg p-4 text-center">
                <Globe className="w-8 h-8 text-purple-600 mx-auto mb-2" />
                <h4 className="font-medium text-gray-900">Read News</h4>
                <p className="text-sm text-gray-600">Stay updated</p>
              </div>
            </div>

            <div className="mt-8">
              <button 
                onClick={() => alert('Navigation working!')}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium"
              >
                Test Navigation
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
);

// Main App Component
function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading
    setTimeout(() => setLoading(false), 1000);
  }, []);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const toggleDarkMode = () => setDarkMode(!darkMode);
  const handleLogin = () => setUser({ email: 'user@example.com' });
  const handleLogout = () => {
    setUser(null);
    window.location.hash = '/';
  };

  if (loading) {
    return <LoadingSpinner text="Loading RSS Generator Pro..." />;
  }

  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage darkMode={darkMode} toggleDarkMode={toggleDarkMode} onGetStarted={handleLogin} />} />
        <Route path="/login" element={<LoginScreen onBackToHome={() => window.history.back()} />} />
        <Route path="/signup" element={<LoginScreen onBackToHome={() => window.history.back()} />} />
        <Route path="/dashboard" element={user ? <Dashboard onLogout={handleLogout} darkMode={darkMode} toggleDarkMode={toggleDarkMode} /> : <Navigate to="/login" />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;
