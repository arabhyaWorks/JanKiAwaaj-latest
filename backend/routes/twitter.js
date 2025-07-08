const express = require('express');
const router = express.Router();
const TwitterService = require('../services/twitterService');
const { validateQuery } = require('../middleware/validation');

const twitterService = new TwitterService();

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
      username: username,
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
      timeframe: timeframe,
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

module.exports = router;