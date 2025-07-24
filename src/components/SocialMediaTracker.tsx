import React, { useState, useEffect } from 'react';
import { MessageCircle, Heart, Share2, TrendingUp, TrendingDown, Hash, Users, BarChart3, Eye, Calendar, Filter, Twitter, Facebook, Instagram, Globe, RefreshCw, Wifi, WifiOff, AlertCircle } from 'lucide-react';
import SocialMediaPost from './SocialMediaPost';
import { apiService, TwitterTweet, TrendingHashtag, SentimentAnalysis } from '../services/apiService';

 const getAuthorImage = (author: string) => {
    const safeAuthor = author.toLowerCase();
    if (safeAuthor.includes("yogi")) {
      return "https://i.pinimg.com/736x/dd/7e/7f/dd7e7f211cb2f8bdc0a0cbaf662aa4ad.jpg";
    } else if (safeAuthor.includes("akhilesh")) {
      return "https://media.publicvibe.com/community/topic/20240928/640933287_69761_050501801_168x300.jpg";
    } else if (safeAuthor.includes("brajesh")) {
      return "https://pbs.twimg.com/profile_images/1833859315788066816/fWpEomdT_400x400.jpg";
    } else if (safeAuthor.includes("maurya")) {
      return "https://etimg.etb2bimg.com/photo/98679958.cms"
    } else if (safeAuthor.includes("chandra")) {
      return "https://pbs.twimg.com/profile_images/1686588577264922624/4zBmxxTV_400x400.jpg";
    } else if (safeAuthor.includes("kashikirai")) {
      return "https://pbs.twimg.com/profile_images/1871895065892675584/RvnF-B61_400x400.jpg"
    }

    return "https://media.istockphoto.com/id/1495088043/vector/user-profile-icon-avatar-or-person-icon-profile-picture-portrait-symbol-default-portrait.jpg";
  };

const SocialMediaTracker: React.FC = () => {
  const [selectedPlatform, setSelectedPlatform] = useState('all');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [socialMediaData, setSocialMediaData] = useState<TwitterTweet[]>([]);
  const [trendingHashtags, setTrendingHashtags] = useState<TrendingHashtag[]>([]);
  const [sentimentData, setSentimentData] = useState<SentimentAnalysis | null>(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date());
  const [connectionStatus, setConnectionStatus] = useState<'connected' | 'disconnected' | 'error'>('connected');
  const [error, setError] = useState<string | null>(null);
  const [autoRefresh, setAutoRefresh] = useState(true);

  // Load data on component mount
  useEffect(() => {
    loadAllData();
    
    // Set up auto-refresh interval
    let interval: NodeJS.Timeout;
    if (autoRefresh) {
      interval = setInterval(() => {
        loadAllData(false);
      }, 5 * 60 * 1000); // Refresh every 5 minutes
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [autoRefresh]);

  // Check backend health
  useEffect(() => {
    checkBackendHealth();
    const healthInterval = setInterval(checkBackendHealth, 30000); // Check every 30 seconds
    
    return () => clearInterval(healthInterval);
  }, []);

  const checkBackendHealth = async () => {
    try {
      await apiService.checkHealth();
      setConnectionStatus('connected');
    } catch (error) {
      setConnectionStatus('disconnected');
      console.error('Backend health check failed:', error);
    }
  };

  const loadAllData = async (showLoading = true) => {
    if (showLoading) setLoading(true);
    if (!showLoading) setRefreshing(true);
    setError(null);

    try {
      // Load all data in parallel
      const [tweets, hashtags, sentiment] = await Promise.all([
        apiService.getPoliticalTweets(),
        apiService.getTrendingHashtags(15),
        apiService.getSentimentAnalysis('24h')
      ]);
      setSocialMediaData(tweets.data);
      setTrendingHashtags(hashtags);
      setSentimentData(sentiment);
      setLastUpdated(new Date());
      setConnectionStatus('connected');
    } catch (error) {
      console.error('Error loading data:', error);
      setError(error instanceof Error ? error.message : 'Failed to load data');
      setConnectionStatus('error');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const handleRefresh = async () => {
    try {
      setRefreshing(true);
      await apiService.refreshCache();
      await loadAllData(false);
    } catch (error) {
      console.error('Error refreshing data:', error);
      setError('Failed to refresh data');
    }
  };

  const platformTabs = [
    { id: 'all', label: 'All Platforms', icon: Globe, count: socialMediaData.length },
    { id: 'Twitter', label: 'Twitter', icon: Twitter, count: socialMediaData.filter(p => p.platform === 'Twitter').length },
    { id: 'Facebook', label: 'Facebook', icon: Facebook, count: socialMediaData.filter(p => p.platform === 'Facebook').length },
    { id: 'Instagram', label: 'Instagram', icon: Instagram, count: socialMediaData.filter(p => p.platform === 'Instagram').length },
  ];

  const categoryTabs = [
    { id: 'all', label: 'All Categories', count: socialMediaData.length },
    { id: 'governance', label: 'Governance', count: socialMediaData.filter(p => p.category === 'governance').length },
    { id: 'opposition', label: 'Opposition', count: socialMediaData.filter(p => p.category === 'opposition').length },
    { id: 'schemes', label: 'Schemes', count: socialMediaData.filter(p => p.category === 'schemes').length },
    { id: 'infrastructure', label: 'Infrastructure', count: socialMediaData.filter(p => p.category === 'infrastructure').length },
    { id: 'crime', label: 'Crime', count: socialMediaData.filter(p => p.category === 'crime').length },
    { id: 'education', label: 'Education', count: socialMediaData.filter(p => p.category === 'education').length },
  ];

  const filteredData: TwitterTweet[] = socialMediaData.filter(post => {
    const platformMatch = selectedPlatform === 'all' || post.platform === selectedPlatform;
    const categoryMatch = selectedCategory === 'all' || post.category === selectedCategory;
    return platformMatch && categoryMatch;
  });

  const engagementStats = {
    totalPosts: filteredData.length,
    totalLikes: filteredData.reduce((sum, post) => sum + post.likes, 0),
    totalShares: filteredData.reduce((sum, post) => sum + post.shares, 0),
    totalComments: filteredData.reduce((sum, post) => sum + post.comments, 0),
    avgEngagement: filteredData.reduce((sum, post) => sum + post.engagement, 0) / filteredData.length || 0,
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <RefreshCw className="w-12 h-12 animate-spin text-blue-500 mx-auto mb-4" />
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">Loading Social Media Data</h2>
          <p className="text-gray-600">Fetching real-time tweets from political leaders...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">Social Media Tracker</h2>
          <p className="text-gray-600 mt-1">Real-time political social media monitoring and analysis</p>
        </div>
        <div className="flex items-center space-x-3">
          {/* Connection Status */}
          <div className={`flex items-center space-x-2 px-3 py-2 rounded-lg border ${
            connectionStatus === 'connected' ? 'bg-green-50 border-green-200' :
            connectionStatus === 'disconnected' ? 'bg-yellow-50 border-yellow-200' :
            'bg-red-50 border-red-200'
          }`}>
            {connectionStatus === 'connected' ? (
              <Wifi className="w-4 h-4 text-green-600" />
            ) : (
              <WifiOff className="w-4 h-4 text-red-600" />
            )}
            <span className={`text-sm font-medium ${
              connectionStatus === 'connected' ? 'text-green-800' :
              connectionStatus === 'disconnected' ? 'text-yellow-800' :
              'text-red-800'
            }`}>
              {connectionStatus === 'connected' ? 'Connected' :
               connectionStatus === 'disconnected' ? 'Disconnected' :
               'Error'}
            </span>
          </div>

          {/* Auto Refresh Toggle */}
          <label className="flex items-center space-x-2 cursor-pointer">
            <input
              type="checkbox"
              checked={autoRefresh}
              onChange={(e) => setAutoRefresh(e.target.checked)}
              className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            <span className="text-sm text-gray-700">Auto-refresh</span>
          </label>

          {/* Refresh Button */}
          <button
            onClick={handleRefresh}
            disabled={refreshing || connectionStatus === 'disconnected'}
            className="flex items-center space-x-2 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <RefreshCw className={`w-4 h-4 ${refreshing ? 'animate-spin' : ''}`} />
            <span>{refreshing ? 'Refreshing...' : 'Refresh'}</span>
          </button>

          {/* Last Updated */}
          <div className="flex items-center space-x-2 bg-white px-3 py-2 rounded-lg border border-gray-200">
            <Calendar className="w-4 h-4 text-gray-500" />
            <span className="text-sm font-medium text-gray-700">
              Updated: {lastUpdated.toLocaleTimeString()}
            </span>
            <div className={`w-2 h-2 rounded-full ${
              connectionStatus === 'connected' ? 'bg-green-500 animate-pulse' : 'bg-red-500'
            }`}></div>
          </div>
        </div>
      </div>

      {/* Error Alert */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <div className="flex items-center space-x-2">
            <AlertCircle className="w-5 h-5 text-red-600" />
            <h3 className="text-red-800 font-medium">Error Loading Data</h3>
          </div>
          <p className="text-red-700 mt-1">{error}</p>
          <button
            onClick={() => loadAllData()}
            className="mt-2 text-red-600 hover:text-red-800 font-medium"
          >
            Try Again
          </button>
        </div>
      )}

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Total Posts</p>
              <p className="text-3xl font-bold text-blue-600">{engagementStats.totalPosts}</p>
              <p className="text-xs text-green-600 mt-1">↗ Live data</p>
            </div>
            <MessageCircle className="w-10 h-10 text-blue-500" />
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Total Likes</p>
              <p className="text-3xl font-bold text-pink-600">{engagementStats.totalLikes.toLocaleString()}</p>
              <p className="text-xs text-green-600 mt-1">↗ Real-time</p>
            </div>
            <Heart className="w-10 h-10 text-pink-500" />
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Total Shares</p>
              <p className="text-3xl font-bold text-green-600">{engagementStats.totalShares.toLocaleString()}</p>
              <p className="text-xs text-green-600 mt-1">↗ Active</p>
            </div>
            <Share2 className="w-10 h-10 text-green-500" />
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Comments</p>
              <p className="text-3xl font-bold text-purple-600">{engagementStats.totalComments.toLocaleString()}</p>
              <p className="text-xs text-green-600 mt-1">↗ Engaged</p>
            </div>
            <MessageCircle className="w-10 h-10 text-purple-500" />
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Avg Engagement</p>
              <p className="text-3xl font-bold text-orange-600">{engagementStats.avgEngagement.toFixed(1)}%</p>
              <p className="text-xs text-green-600 mt-1">↗ Growing</p>
            </div>
            <BarChart3 className="w-10 h-10 text-orange-500" />
          </div>
        </div>
      </div>

      {/* Platform and Category Tabs */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="p-6">
          {/* Platform Tabs */}
          {/* <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Filter by Platform</h3>
            <div className="flex flex-wrap gap-2">
              {platformTabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setSelectedPlatform(tab.id)}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg border transition-all ${
                    selectedPlatform === tab.id
                      ? 'bg-blue-50 border-blue-200 text-blue-700'
                      : 'bg-gray-50 border-gray-200 text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  <tab.icon className="w-4 h-4" />
                  <span className="font-medium">{tab.label}</span>
                  <span className={`px-2 py-1 text-xs rounded-full ${
                    selectedPlatform === tab.id
                      ? 'bg-blue-100 text-blue-800'
                      : 'bg-gray-100 text-gray-600'
                  }`}>
                    {tab.count}
                  </span>
                </button>
              ))}
            </div>
          </div> */}

          {/* Category Tabs */}
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Filter by Category</h3>
            <div className="flex flex-wrap gap-2">
              {categoryTabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setSelectedCategory(tab.id)}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg border transition-all ${
                    selectedCategory === tab.id
                      ? 'bg-orange-50 border-orange-200 text-orange-700'
                      : 'bg-gray-50 border-gray-200 text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  <span className="font-medium">{tab.label}</span>
                  <span className={`px-2 py-1 text-xs rounded-full ${
                    selectedCategory === tab.id
                      ? 'bg-orange-100 text-orange-800'
                      : 'bg-gray-100 text-gray-600'
                  }`}>
                    {tab.count}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Social Media Posts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Posts Feed */}
        <div className="lg:col-span-2 space-y-4">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-gray-800">Live Social Media Feed</h3>
                  <p className="text-sm text-gray-500 mt-1">
                    Real-time posts from political leaders • Showing {filteredData.length} posts
                  </p>
                </div>
                <div className="flex items-center space-x-2">
                  <div className={`w-2 h-2 rounded-full ${
                    connectionStatus === 'connected' ? 'bg-green-500 animate-pulse' : 'bg-red-500'
                  }`}></div>
                  <span className={`text-sm font-medium ${
                    connectionStatus === 'connected' ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {connectionStatus === 'connected' ? 'LIVE' : 'OFFLINE'}
                  </span>
                </div>
              </div>
            </div>
            <div className="p-4 space-y-4  overflow-y-auto">
              {filteredData.length > 0 ? (
                filteredData.map((post) => (
                  <SocialMediaPost
                    key={post.id}
                    author={post.author}
                    content={post.content}
                    likes={post.likes}
                    shares={post.shares}
                    date={post.time}
                    platform={post.platform}
                    tags={post.tags}
                    url={post.url}
                    post={post}
                  />
                ))
              ) : (
                <div className="text-center py-12">
                  <MessageCircle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-500">No posts found for the selected filters</p>
                  <button
                    onClick={() => loadAllData()}
                    className="mt-2 text-blue-600 hover:text-blue-800 font-medium"
                  >
                    Refresh Data
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Trending Hashtags */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200">
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-800">Trending Hashtags</h3>
            </div>
            <div className="p-4 space-y-3">
              {trendingHashtags.slice(0, 6).map((hashtag, index) => (
                <div key={index} className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg transition-colors cursor-pointer">
                  <div className="flex items-center space-x-3">
                    <Hash className="w-4 h-4 text-gray-400" />
                    <div>
                      <h4 className="font-medium text-gray-800">{hashtag.hashtag}</h4>
                      <p className="text-sm text-gray-500">{hashtag.mentions.toLocaleString()} mentions</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className={`w-2 h-2 rounded-full ${
                      hashtag.sentiment === 'positive' ? 'bg-green-500' : 
                      hashtag.sentiment === 'negative' ? 'bg-red-500' : 'bg-gray-500'
                    }`}></span>
                    <div className={`flex items-center space-x-1 ${
                      hashtag.growth > 0 ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {hashtag.growth > 0 ? (
                        <TrendingUp className="w-3 h-3" />
                      ) : (
                        <TrendingDown className="w-3 h-3" />
                      )}
                      <span className="text-xs font-medium">{Math.abs(hashtag.growth).toFixed(1)}%</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Sentiment Analysis */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200">
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-800">Live Sentiment Analysis</h3>
              {sentimentData && (
                <p className="text-sm text-gray-500 mt-1">
                  Based on {sentimentData.totalTweets} tweets in last {sentimentData.timeframe}
                </p>
              )}
            </div>
            <div className="p-4 space-y-4">
              {sentimentData ? (
                <>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Positive</span>
                    <div className="flex items-center space-x-2">
                      <div className="w-20 bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-green-500 h-2 rounded-full transition-all duration-500" 
                          style={{ width: `${sentimentData.positive}%` }}
                        ></div>
                      </div>
                      <span className="text-sm font-medium text-green-600">{sentimentData.positive}%</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Neutral</span>
                    <div className="flex items-center space-x-2">
                      <div className="w-20 bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-yellow-500 h-2 rounded-full transition-all duration-500" 
                          style={{ width: `${sentimentData.neutral}%` }}
                        ></div>
                      </div>
                      <span className="text-sm font-medium text-yellow-600">{sentimentData.neutral}%</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Negative</span>
                    <div className="flex items-center space-x-2">
                      <div className="w-20 bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-red-500 h-2 rounded-full transition-all duration-500" 
                          style={{ width: `${sentimentData.negative}%` }}
                        ></div>
                      </div>
                      <span className="text-sm font-medium text-red-600">{sentimentData.negative}%</span>
                    </div>
                  </div>
                </>
              ) : (
                <div className="text-center py-4">
                  <p className="text-gray-500">Loading sentiment data...</p>
                </div>
              )}
            </div>
          </div>

          {/* Top Influencers */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200">
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-800">Top Influencers</h3>
            </div>
            <div className="p-4 space-y-3">
              {[
                { name: 'Yogi Adityanath', handle: '@myogiadityanath', followers: '2.5M', engagement: '95.2%' },
                { name: 'Akhilesh Yadav', handle: '@yadavakhilesh', followers: '1.8M', engagement: '78.5%' },
                { name: 'Chandra Shekhar', handle: '@BhimArmyChief', followers: '3.2M', engagement: '67.3%' },
              ].map((influencer, index) => (
                <div key={index} className="flex items-center space-x-3 p-3 hover:bg-gray-50 rounded-lg transition-colors">
                  <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold">
                    <img src={getAuthorImage(influencer.name)} alt={influencer.name} className="w-10 h-10 rounded-full object-cover" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-800">{influencer.name}</h4>
                    <p className="text-sm text-gray-500">{influencer.handle}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-gray-800">{influencer.followers}</p>
                    <p className="text-xs text-green-600">{influencer.engagement}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SocialMediaTracker;