import React from 'react';

const App = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full text-center">
        <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl mx-auto mb-4 flex items-center justify-center">
          <span className="text-white text-2xl">📰</span>
        </div>
        
        <h1 className="text-3xl font-bold text-gray-800 mb-2">
          RSS Generator Pro
        </h1>
        
        <p className="text-gray-600 mb-6">
          Complete Website Ready! 🚀
        </p>

        <div className="space-y-3">
          <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-lg font-medium">
            Login with Email
          </button>
          
          <button className="w-full bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 py-3 px-4 rounded-lg font-medium">
            Continue with Google
          </button>
        </div>

        <p className="text-sm text-gray-500 mt-6">
          Professional RSS Feed Aggregator
        </p>
      </div>
    </div>
  );
};

export default App;
