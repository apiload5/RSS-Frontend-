import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Link, Zap, Shield, Star, Copy, Check, Globe, Settings, Users } from 'lucide-react';

const RSSCreator = () => {
  const { user } = useAuth();
  const [websiteUrl, setWebsiteUrl] = useState('');
  const [rssUrl, setRssUrl] = useState('');
  const [generated, setGenerated] = useState(false);
  const [copied, setCopied] = useState(false);
  const [loading, setLoading] = useState(false);

  // Check if user is premium (demo purpose)
  const isPremium = user?.email?.includes('premium') || false;
  const usedFeeds = 2; // Demo data
  const maxFreeFeeds = 5;

  const generateRSS = async (e) => {
    e.preventDefault();
    if (!isPremium && usedFeeds >= maxFreeFeeds) {
      alert('Free limit reached! Upgrade to premium for unlimited RSS feeds.');
      return;
    }

    setLoading(true);
    
    // Simulate RSS generation
    setTimeout(() => {
      const feedId = Math.random().toString(36).substr(2, 9);
      const generatedRSS = `https://rss-generator-pro.com/feed/${feedId}`;
      setRssUrl(generatedRSS);
      setGenerated(true);
      setLoading(false);
    }, 2000);
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(rssUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const embedCodes = {
    wordpress: `<!-- WordPress Widget -->
<div class="rss-widget">
  <script src="${rssUrl}/embed.js"></script>
</div>`,
    
    html: `<!-- HTML Embed -->
<iframe src="${rssUrl}/embed" width="100%" height="600" frameborder="0"></iframe>`,
    
    javascript: `// JavaScript Embed
fetch('${rssUrl}')
  .then(response => response.json())
  .then(data => {
    // Display your RSS feed
    console.log(data);
  });`
  };

  return (
    <div className="space-y-8">
      {/* User Plan Status */}
      <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl p-6 text-white">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold mb-2">
              {isPremium ? '🌟 Premium Plan' : '🔓 Free Plan'}
            </h2>
            <p className="opacity-90">
              {isPremium 
                ? 'Unlimited RSS feeds • No ads • Premium support' 
                : `${usedFeeds}/${maxFreeFeeds} feeds used • Basic features`
              }
            </p>
          </div>
          {!isPremium && (
            <button className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
              Upgrade to Premium - $9.99/month
            </button>
          )}
        </div>
      </div>

      {/* RSS Generator Form */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Generator Panel */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6">
          <div className="flex items-center space-x-3 mb-6">
            <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
              <Zap className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
              Create RSS Feed
            </h3>
          </div>

          <form onSubmit={generateRSS} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Website URL
              </label>
              <input
                type="url"
                value={websiteUrl}
                onChange={(e) => setWebsiteUrl(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                placeholder="https://example.com"
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white py-3 px-4 rounded-lg font-medium transition-colors duration-200 flex items-center justify-center"
            >
              {loading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                  Generating RSS Feed...
                </>
              ) : (
                <>
                  <Zap className="w-5 h-5 mr-2" />
                  Generate RSS Feed
                </>
              )}
            </button>
          </form>

          {generated && (
            <div className="mt-6 p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
              <div className="flex justify-between items-center mb-3">
                <h4 className="font-semibold text-green-800 dark:text-green-400">
                  ✅ RSS Feed Generated Successfully!
                </h4>
                <button
                  onClick={copyToClipboard}
                  className="flex items-center space-x-1 text-green-600 hover:text-green-700 dark:text-green-400 dark:hover:text-green-300"
                >
                  {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                  <span className="text-sm">{copied ? 'Copied!' : 'Copy'}</span>
                </button>
              </div>
              <div className="bg-white dark:bg-gray-800 p-3 rounded border">
                <code className="text-sm text-gray-800 dark:text-gray-200 break-all">
                  {rssUrl}
                </code>
              </div>
            </div>
          )}
        </div>

        {/* Embed Codes & Features */}
        <div className="space-y-6">
          {/* Embed Codes */}
          {generated && (
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6">
              <h4 className="font-semibold text-gray-900 dark:text-white mb-4">
                Embed Codes
              </h4>
              <div className="space-y-4">
                {Object.entries(embedCodes).map(([platform, code]) => (
                  <div key={platform}>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 capitalize">
                      {platform}
                    </label>
                    <div className="relative">
                      <pre className="bg-gray-100 dark:bg-gray-700 p-3 rounded text-xs overflow-x-auto">
                        <code className="text-gray-800 dark:text-gray-200">
                          {code}
                        </code>
                      </pre>
                      <button
                        onClick={() => navigator.clipboard.writeText(code)}
                        className="absolute top-2 right-2 p-1 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                      >
                        <Copy className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Features */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6">
            <h4 className="font-semibold text-gray-900 dark:text-white mb-4">
              Features
            </h4>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Globe className="w-5 h-5 text-green-500" />
                <span className="text-gray-700 dark:text-gray-300">Any website support</span>
              </div>
              <div className="flex items-center space-x-3">
                <Settings className="w-5 h-5 text-blue-500" />
                <span className="text-gray-700 dark:text-gray-300">Customizable feeds</span>
              </div>
              <div className="flex items-center space-x-3">
                <Shield className="w-5 h-5 text-purple-500" />
                <span className="text-gray-700 dark:text-gray-300">{isPremium ? 'Ad-free' : 'With ads'}</span>
              </div>
              <div className="flex items-center space-x-3">
                <Users className="w-5 h-5 text-orange-500" />
                <span className="text-gray-700 dark:text-gray-300">
                  {isPremium ? 'Unlimited feeds' : `${maxFreeFeeds} feeds limit`}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Premium Features Showcase */}
      {!isPremium && (
        <div className="bg-gradient-to-r from-purple-500 to-pink-600 rounded-2xl p-8 text-white">
          <div className="text-center mb-6">
            <Star className="w-12 h-12 mx-auto mb-4" />
            <h3 className="text-2xl font-bold mb-2">Upgrade to Premium</h3>
            <p className="opacity-90">Get access to all premium features</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-3">
                <Shield className="w-6 h-6" />
              </div>
              <h4 className="font-semibold mb-2">Ad-Free Experience</h4>
              <p className="text-sm opacity-80">No advertisements in your feeds</p>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-3">
                <Zap className="w-6 h-6" />
              </div>
              <h4 className="font-semibold mb-2">Unlimited Feeds</h4>
              <p className="text-sm opacity-80">Create unlimited RSS feeds</p>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-3">
                <Users className="w-6 h-6" />
              </div>
              <h4 className="font-semibold mb-2">Priority Support</h4>
              <p className="text-sm opacity-80">24/7 premium customer support</p>
            </div>
          </div>
          
          <div className="text-center mt-6">
            <button className="bg-white text-purple-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
              Upgrade Now - $9.99/month
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default RSSCreator;
