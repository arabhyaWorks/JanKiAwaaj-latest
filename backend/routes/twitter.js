const express = require('express');
const axios = require('axios');
const router = express.Router();
const TwitterService = require('../services/twitterService');
const { validateQuery } = require('../middleware/validation');
require('dotenv').config();

const twitterService = new TwitterService();
const API_KEY = process.env.TWITTER_API_KEY;

const headers = {
  'X-API-Key': API_KEY
};
console.log('API_KEY', API_KEY);
// Get political tweets from all leaders
router.get('/political-tweets', async (req, res) => {
  try {
    const { limit = 50, refresh = false } = req.query;
    const tweets = await twitterService.getPoliticalTweets(parseInt(limit), refresh === 'true');
    res.json({
      success: true,
      data: tweets,
      count: tweets.length,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Error fetching political tweets:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch political tweets',
      message: error.message
    });
  }
});

// Search tweets by query
router.get('/search', validateQuery, async (req, res) => {
  try {
    const { q, limit = 20, lang = 'hi' } = req.query;
    const tweets = await twitterService.searchTweets(q, parseInt(limit), lang);
    res.json({
      success: true,
      data: tweets,
      query: q,
      count: tweets.length,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Error searching tweets:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to search tweets',
      message: error.message
    });
  }
});

// Get tweets by specific user
router.get('/user/:username', async (req, res) => {
  try {
    const { username } = req.params;
    const { limit = 20 } = req.query;
    const tweets = await twitterService.getUserTweets(username, parseInt(limit));
    res.json({
      success: true,
      data: tweets,
      username,
      count: tweets.length,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Error fetching user tweets:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch user tweets',
      message: error.message
    });
  }
});

// Get trending hashtags
router.get('/trending-hashtags', async (req, res) => {
  try {
    const { limit = 10 } = req.query;
    const hashtags = await twitterService.getTrendingHashtags(parseInt(limit));
    res.json({
      success: true,
      data: hashtags,
      count: hashtags.length,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Error fetching trending hashtags:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch trending hashtags',
      message: error.message
    });
  }
});

// Get sentiment analysis
router.get('/sentiment-analysis', async (req, res) => {
  try {
    const { timeframe = '24h' } = req.query;
    const analysis = await twitterService.getSentimentAnalysis(timeframe);
    res.json({
      success: true,
      data: analysis,
      timeframe,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Error fetching sentiment analysis:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch sentiment analysis',
      message: error.message
    });
  }
});

// Force refresh cache
router.post('/refresh-cache', async (req, res) => {
  try {
    await twitterService.refreshCache();
    res.json({
      success: true,
      message: 'Cache refreshed successfully',
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Error refreshing cache:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to refresh cache',
      message: error.message
    });
  }
});

// ✅ New: Get latest tweets from specific user list (external API)
router.get('/latest-tweets', async (req, res) => {
  const usernames = [
    'myogiadityanath',
    'brajeshpathakup',
    'kpmaurya1',
    'yadavakhilesh',
    'BhimArmyChief',
    'kashikirai'
  ];

  const tweets = [];
  const failed = [];

  for (const username of usernames) {
    try {
      const response = await axios.get(
        'https://api.twitterapi.io/twitter/user/last_tweets',
        {
          headers,
          params: {
            userName: username,
            includeReplies: false
          }
        }
      );

      const tweetList = response.data.data?.tweets || [];
      const latest = tweetList[0];
      const user = latest?.author;

      if (latest && user) {
        const text = latest.text || '';
        const hashtags = [...text.matchAll(/#\w+/g)].map(m => m[0].toLowerCase());
        const mentions = [...text.matchAll(/@\w+/g)].map(m => m[0].toLowerCase());

        tweets.push({
          id: latest.id,
          platform: 'Twitter', // ✅ Capitalized to match frontend filter
          content: text,
          url: latest.url || `https://twitter.com/${username}/status/${latest.id}`,
          author: user.name || '',
          authorUsername: username,
          authorImage: user.profilePicture || '',
          verified: user.verified || false,
          likes: latest.likeCount || 0,
          shares: latest.retweetCount || 0,
          comments: latest.replyCount || 0,
          sentiment: 'neutral', // TODO: actual sentiment analysis
          time: latest.createdAt,
          created_at: latest.createdAt,
          engagement:
            (latest.likeCount || 0) +
            (latest.retweetCount || 0) +
            (latest.replyCount || 0),
          category: '', // TODO: classify using keywords/NLP
          tags: hashtags,
          mentions,
          lang: latest.lang || 'und'
        });
      } else {
        failed.push({ username, error: 'No tweet found' });
      }
    } catch (err) {
      console.error(`❌ Error for ${username}:`, err.response?.data || err.message);
      failed.push({ username, error: 'Failed to fetch tweets' });
    }
  }

  res.setHeader('Content-Type', 'application/json');
  res.json({
    success: true,
    data: tweets,
    failed,
    count: tweets.length,
    timestamp: new Date().toISOString()
  });
});

module.exports = router;
