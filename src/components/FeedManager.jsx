import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { Rss, Plus, Trash2, ExternalLink, ArrowLeft } from 'lucide-react';

const FeedManager = () => {
  const { getUserFeeds, addFeed, getFeedItems } = useAuth();
  const [feeds, setFeeds] = useState([]);
  const [selectedFeed, setSelectedFeed] = useState(null);
  const [feedItems, setFeedItems] = useState([]);
  const [newFeed, setNewFeed] = useState({ name: '', url: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Load user feeds
  const loadFeeds = async () => {
    try {
      setLoading(true);
      const userFeeds = await getUserFeeds();
      setFeeds(userFeeds);
    } catch (error) {
      setError('Failed to load feeds');
      console.error('Load feeds error:', error);
    } finally {
      setLoading(false);
    }
  };

  // Add new feed
  const handleAddFeed = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      await addFeed(newFeed);
      setNewFeed({ name: '', url: '' });
      await loadFeeds(); // Reload feeds
    } catch (error) {
      setError('Failed to add feed');
      console.error('Add feed error:', error);
    } finally {
      setLoading(false);
    }
  };

  // View feed items
  const handleViewFeed = async (feed) => {
    try {
      setLoading(true);
      setSelectedFeed(feed);
      const items = await getFeedItems(feed._id);
      setFeedItems(items.items || []);
    } catch (error) {
      setError('Failed to load feed items');
      console.error('View feed error:', error);
    } finally {
      setLoading(false);
    }
  };

  // Back to feeds list
  const handleBackToFeeds = () => {
    setSelectedFeed(null);
    setFeedItems([]);
  };

  useEffect(() => {
    loadFeeds();
  }, []);

  if (selectedFeed) {
    return (
      <div className="space-y-6">
        <button
          onClick={handleBackToFeeds}
          className="flex items-center space-x-2 text-blue-600 hover:text-blue-700 font-medium"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Feeds</span>
        </button>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="p-6 border-b border-gray-200 dark:border-gray-700">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
              {selectedFeed.name}
            </h2>
            <p className="text-gray-600 dark:text-gray-400 text-sm mt-1">
              {feedItems.length} items found
            </p>
          </div>

          <div className="p-6">
            {feedItems.length === 0 ? (
              <div className="text-center py-8">
                <Rss className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500 dark:text-gray-400">No items found in this feed</p>
              </div>
            ) : (
              <div className="space-y-4">
                {feedItems.map((item, index) => (
                  <div key={index} className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:border-blue-300 dark:hover:border-blue-600 transition-colors">
                    <h3 className="font-medium text-gray-900 dark:text-white mb-2">
                      {item.title}
                    </h3>
                    {item.description && (
                      <p className="text-gray-600 dark:text-gray-400 text-sm mb-3 line-clamp-2">
                        {item.description}
                      </p>
                    )}
                    <a
                      href={item.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 text-sm font-medium"
                    >
                      Read full article
                      <ExternalLink className="w-4 h-4 ml-1" />
                    </a>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Add Feed Form */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Add New RSS Feed
        </h3>
        <form onSubmit={handleAddFeed} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Feed Name
            </label>
            <input
              type="text"
              value={newFeed.name}
              onChange={(e) => setNewFeed({ ...newFeed, name: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
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
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
              placeholder="e.g., https://example.com/rss"
              required
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white px-4 py-2 rounded-lg font-medium flex items-center"
          >
            <Plus className="w-4 h-4 mr-2" />
            {loading ? 'Adding...' : 'Add Feed'}
          </button>
        </form>
      </div>

      {/* Feeds List */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            Your RSS Feeds
          </h3>
        </div>
        <div className="p-6">
          {loading ? (
            <div className="text-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
            </div>
          ) : feeds.length === 0 ? (
            <div className="text-center py-8">
              <Rss className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500 dark:text-gray-400">No feeds yet</p>
              <p className="text-sm text-gray-400 mt-2">Add your first RSS feed to get started</p>
            </div>
          ) : (
            <div className="space-y-4">
              {feeds.map((feed) => (
                <div
                  key={feed._id}
                  className="flex justify-between items-center p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:border-blue-300 dark:hover:border-blue-600 transition-colors cursor-pointer"
                  onClick={() => handleViewFeed(feed)}
                >
                  <div>
                    <h4 className="font-medium text-gray-900 dark:text-white">{feed.name}</h4>
                    <p className="text-sm text-gray-500 dark:text-gray-400 truncate">{feed.url}</p>
                  </div>
                  <Rss className="w-5 h-5 text-gray-400" />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {error && (
        <div className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
          <p className="text-red-700 dark:text-red-400 text-sm">{error}</p>
        </div>
      )}
    </div>
  );
};

export default FeedManager;
