const axios = require('axios');

class TwitterService {
  constructor() {
    this.bearerToken = process.env.TWITTER_BEARER_TOKEN;
    this.apiKey = process.env.TWITTER_API_KEY;
    this.apiSecret = process.env.TWITTER_API_SECRET;
    this.accessToken = process.env.TWITTER_ACCESS_TOKEN;
    this.accessTokenSecret = process.env.TWITTER_ACCESS_TOKEN_SECRET;
    
    this.baseURL = 'https://api.twitter.com/2';
    this.cache = new Map();
    this.cacheTimeout = 5 * 60 * 1000; // 5 minutes
    
    // Political leaders to track
    this.politicalLeaders = {
      'myogiadityanath': 'Yogi Adityanath',
      'yadavakhilesh': 'Akhilesh Yadav',
      'priyankagandhi': 'Priyanka Gandhi',
      'rahulgandhi': 'Rahul Gandhi',
      'amitshah': 'Amit Shah',
      'jpnadda': 'JP Nadda',
      'upgovt': 'UP Government',
      'bjp4up': 'BJP UP',
      'incuttarpradesh': 'INC Uttar Pradesh',
      'samajwadiparty': 'Samajwadi Party'
    };
    
    this.axiosInstance = axios.create({
      baseURL: this.baseURL,
      headers: {
        'Authorization': `Bearer ${this.bearerToken}`,
        'Content-Type': 'application/json'
      },
      timeout: 10000
    });
  }

  // Get cached data or fetch new data
  async getCachedData(key, fetchFunction, forceRefresh = false) {
    if (!forceRefresh && this.cache.has(key)) {
      const cached = this.cache.get(key);
      if (Date.now() - cached.timestamp < this.cacheTimeout) {
        return cached.data;
      }
    }

    try {
      const data = await fetchFunction();
      this.cache.set(key, {
        data,
        timestamp: Date.now()
      });
      return data;
    } catch (error) {
      // Return cached data if available, even if expired
      if (this.cache.has(key)) {
        console.warn(`Using expired cache for ${key} due to error:`, error.message);
        return this.cache.get(key).data;
      }
      throw error;
    }
  }

  // Get user ID by username
  async getUserByUsername(username) {
    try {
      const response = await this.axiosInstance.get(`/users/by/username/${username}`, {
        params: {
          'user.fields': 'id,name,username,verified,profile_image_url,public_metrics'
        }
      });
      return response.data.data;
    } catch (error) {
      console.error(`Error fetching user ${username}:`, error.response?.data || error.message);
      return null;
    }
  }

  // Get tweets by user ID
  async getTweetsByUserId(userId, maxResults = 10) {
    try {
      const response = await this.axiosInstance.get(`/users/${userId}/tweets`, {
        params: {
          max_results: Math.min(maxResults, 100),
          'tweet.fields': 'created_at,public_metrics,context_annotations,entities,lang',
          'user.fields': 'id,name,username,verified,profile_image_url,public_metrics',
          expansions: 'author_id'
        }
      });

      return {
        tweets: response.data.data || [],
        users: response.data.includes?.users || []
      };
    } catch (error) {
      console.error(`Error fetching tweets for user ${userId}:`, error.response?.data || error.message);
      return { tweets: [], users: [] };
    }
  }

  // Search tweets by query
  async searchTweets(query, maxResults = 20, lang = 'hi') {
    try {
      const response = await this.axiosInstance.get('/tweets/search/recent', {
        params: {
          query: `${query} lang:${lang} -is:retweet`,
          max_results: Math.min(maxResults, 100),
          'tweet.fields': 'created_at,public_metrics,context_annotations,entities,lang',
          'user.fields': 'id,name,username,verified,profile_image_url,public_metrics',
          expansions: 'author_id'
        }
      });

      const tweets = response.data.data || [];
      const users = response.data.includes?.users || [];
      
      return this.processTweets(tweets, users);
    } catch (error) {
      console.error('Error searching tweets:', error.response?.data || error.message);
      return [];
    }
  }

  // Get tweets from all political leaders
  async getPoliticalTweets(limit = 50, forceRefresh = false) {
    return this.getCachedData('political_tweets', async () => {
      const allTweets = [];
      const userCache = new Map();

      for (const [username, displayName] of Object.entries(this.politicalLeaders)) {
        try {
          // Get user info
          let user = userCache.get(username);
          if (!user) {
            user = await this.getUserByUsername(username);
            if (user) {
              userCache.set(username, user);
            }
          }

          if (!user) {
            console.warn(`User not found: ${username}`);
            continue;
          }

          // Get user tweets
          const { tweets } = await this.getTweetsByUserId(user.id, 10);
          
          // Process tweets
          const processedTweets = tweets.map(tweet => this.processTweet(tweet, user));
          allTweets.push(...processedTweets);

          // Add delay to avoid rate limiting
          await this.delay(100);
        } catch (error) {
          console.error(`Error fetching tweets for ${username}:`, error.message);
        }
      }

      // Sort by creation date and limit results
      return allTweets
        .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
        .slice(0, limit);
    }, forceRefresh);
  }

  // Get tweets for specific user
  async getUserTweets(username, limit = 20) {
    try {
      const user = await this.getUserByUsername(username);
      if (!user) {
        throw new Error(`User not found: ${username}`);
      }

      const { tweets } = await this.getTweetsByUserId(user.id, limit);
      return tweets.map(tweet => this.processTweet(tweet, user));
    } catch (error) {
      console.error(`Error fetching tweets for ${username}:`, error.message);
      return [];
    }
  }

  // Get trending hashtags
  async getTrendingHashtags(limit = 10) {
    return this.getCachedData('trending_hashtags', async () => {
      try {
        // Search for political hashtags
        const politicalHashtags = [
          '#YogiGovt', '#UPDevelopment', '#BJPFails', '#LawAndOrder',
          '#UPBudget', '#YouthUnemployment', '#SamajwadiParty', '#Congress',
          '#UttarPradesh', '#UPPolitics', '#Modi', '#BJP', '#SP', '#BSP'
        ];

        const hashtagData = [];

        for (const hashtag of politicalHashtags.slice(0, limit)) {
          try {
            const tweets = await this.searchTweets(hashtag, 10);
            const mentions = tweets.length * Math.floor(Math.random() * 100) + 50; // Simulate mention count
            const sentiment = this.calculateHashtagSentiment(tweets);
            
            hashtagData.push({
              hashtag,
              mentions,
              sentiment,
              growth: (Math.random() - 0.5) * 40, // Random growth between -20% and +20%
              tweets: tweets.slice(0, 3) // Sample tweets
            });

            await this.delay(200);
          } catch (error) {
            console.error(`Error fetching data for hashtag ${hashtag}:`, error.message);
          }
        }

        return hashtagData.sort((a, b) => b.mentions - a.mentions);
      } catch (error) {
        console.error('Error fetching trending hashtags:', error.message);
        return [];
      }
    });
  }

  // Get sentiment analysis
  async getSentimentAnalysis(timeframe = '24h') {
    return this.getCachedData(`sentiment_${timeframe}`, async () => {
      try {
        const tweets = await this.getPoliticalTweets(200);
        
        let positive = 0, negative = 0, neutral = 0;
        
        tweets.forEach(tweet => {
          switch (tweet.sentiment) {
            case 'positive': positive++; break;
            case 'negative': negative++; break;
            default: neutral++; break;
          }
        });

        const total = tweets.length;
        
        return {
          positive: Math.round((positive / total) * 100),
          negative: Math.round((negative / total) * 100),
          neutral: Math.round((neutral / total) * 100),
          totalTweets: total,
          timeframe
        };
      } catch (error) {
        console.error('Error calculating sentiment analysis:', error.message);
        return {
          positive: 0,
          negative: 0,
          neutral: 0,
          totalTweets: 0,
          timeframe
        };
      }
    });
  }

  // Process tweets data
  processTweets(tweets, users) {
    const userMap = new Map(users.map(user => [user.id, user]));
    
    return tweets.map(tweet => {
      const author = userMap.get(tweet.author_id);
      return this.processTweet(tweet, author);
    });
  }

  // Process individual tweet
  processTweet(tweet, author) {
    const sentiment = this.analyzeSentiment(tweet.text);
    const category = this.categorizeContent(tweet.text);
    const hashtags = tweet.entities?.hashtags?.map(h => h.tag) || [];

    return {
      id: tweet.id,
      platform: 'Twitter',
      content: tweet.text,
      author: author?.name || 'Unknown',
      authorUsername: author?.username || '',
      authorImage: author?.profile_image_url || '',
      verified: author?.verified || false,
      likes: tweet.public_metrics?.like_count || 0,
      shares: tweet.public_metrics?.retweet_count || 0,
      comments: tweet.public_metrics?.reply_count || 0,
      sentiment: sentiment,
      time: this.formatTime(tweet.created_at),
      created_at: tweet.created_at,
      engagement: this.calculateEngagement(tweet.public_metrics, author?.public_metrics),
      category: category,
      tags: hashtags,
      mentions: tweet.entities?.mentions?.map(m => m.username) || [],
      lang: tweet.lang || 'en'
    };
  }

  // Analyze sentiment
  analyzeSentiment(text) {
    const positiveWords = [
      'विकास', 'development', 'progress', 'success', 'achievement', 'good', 'great', 'excellent',
      'बेहतर', 'सफलता', 'प्रगति', 'खुशी', 'गर्व', 'proud', 'happy', 'wonderful', 'amazing',
      'उज्जवल', 'क्रांतिकारी', 'positive', 'committed', 'शुभ', 'लाभ', 'फायदा'
    ];
    
    const negativeWords = [
      'fail', 'failure', 'problem', 'issue', 'crisis', 'bad', 'terrible', 'worst',
      'असफल', 'समस्या', 'संकट', 'बुरा', 'गलत', 'विफल', 'दुख', 'चिंता', 'concern', 'worried',
      'भ्रष्टाचार', 'corruption', 'scam', 'घोटाला'
    ];

    const lowerText = text.toLowerCase();
    
    const positiveCount = positiveWords.filter(word => lowerText.includes(word)).length;
    const negativeCount = negativeWords.filter(word => lowerText.includes(word)).length;

    if (positiveCount > negativeCount) return 'positive';
    if (negativeCount > positiveCount) return 'negative';
    return 'neutral';
  }

  // Categorize content
  categorizeContent(text) {
    const categories = {
      governance: ['governance', 'government', 'policy', 'administration', 'सरकार', 'नीति', 'प्रशासन'],
      schemes: ['scheme', 'yojana', 'योजना', 'benefit', 'welfare', 'कल्याण', 'लाभ'],
      infrastructure: ['infrastructure', 'road', 'bridge', 'development', 'बुनियादी', 'सड़क', 'पुल', 'विकास'],
      crime: ['crime', 'police', 'law', 'order', 'security', 'अपराध', 'पुलिस', 'कानून', 'व्यवस्था'],
      opposition: ['opposition', 'congress', 'sp', 'bsp', 'विपक्ष', 'कांग्रेस', 'समाजवादी'],
      election: ['election', 'vote', 'campaign', 'चुनाव', 'वोट', 'प्रचार'],
      education: ['education', 'school', 'college', 'शिक्षा', 'स्कूल', 'कॉलेज']
    };

    const lowerText = text.toLowerCase();
    
    for (const [category, keywords] of Object.entries(categories)) {
      if (keywords.some(keyword => lowerText.includes(keyword))) {
        return category;
      }
    }
    
    return 'general';
  }

  // Calculate engagement rate
  calculateEngagement(tweetMetrics, userMetrics) {
    if (!tweetMetrics || !userMetrics) return 0;
    
    const totalEngagement = (tweetMetrics.like_count || 0) + 
                           (tweetMetrics.retweet_count || 0) + 
                           (tweetMetrics.reply_count || 0) + 
                           (tweetMetrics.quote_count || 0);
    
    const followerCount = userMetrics.followers_count || 1;
    const engagementRate = (totalEngagement / followerCount) * 100;
    
    return Math.min(100, Math.round(engagementRate * 100) / 100);
  }

  // Calculate hashtag sentiment
  calculateHashtagSentiment(tweets) {
    if (tweets.length === 0) return 'neutral';
    
    const sentiments = tweets.map(tweet => tweet.sentiment);
    const positive = sentiments.filter(s => s === 'positive').length;
    const negative = sentiments.filter(s => s === 'negative').length;
    
    if (positive > negative) return 'positive';
    if (negative > positive) return 'negative';
    return 'neutral';
  }

  // Format time for display
  formatTime(dateString) {
    const date = new Date(dateString);
    const now = new Date();
    const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60));

    if (diffInMinutes < 60) {
      return `${diffInMinutes} minutes ago`;
    } else if (diffInMinutes < 1440) {
      return `${Math.floor(diffInMinutes / 60)} hours ago`;
    } else {
      return `${Math.floor(diffInMinutes / 1440)} days ago`;
    }
  }

  // Utility function for delays
  delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  // Clear cache
  refreshCache() {
    this.cache.clear();
    console.log('Cache cleared successfully');
  }
}

module.exports = TwitterService;