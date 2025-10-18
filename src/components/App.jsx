import React from 'react';

const App = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 max-w-md w-full text-center">
        <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-primary-600 rounded-2xl mx-auto mb-4 flex items-center justify-center">
          <span className="text-white text-2xl">📰</span>
        </div>
        
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">
          RSS Generator Pro
        </h1>
        
        <p className="text-gray-600 dark:text-gray-300 mb-6">
          Professional RSS Feed Aggregator
        </p>

        <div className="space-y-3">
          <button className="w-full bg-primary-600 hover:bg-primary-700 text-white py-3 px-4 rounded-lg font-medium transition-colors">
            Login with Email
          </button>
          
          <button className="w-full bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 py-3 px-4 rounded-lg font-medium transition-colors flex items-center justify-center gap-2">
            <span>🚀</span>
            Continue with Google
          </button>
        </div>

        <p className="text-sm text-gray-500 dark:text-gray-400 mt-6">
          Firebase Authentication • Professional UI • Mobile Responsive
        </p>
      </div>
    </div>
  );
};

export default App;
