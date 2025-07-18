// API service for backend communication
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3001/api';

interface ApiResponse<T> {
  success: boolean;
  data: T;
  count?: number;
  timestamp: string;
  error?: string;
  message?: string;
}

interface TwitterTweet {
  id: string;
  url: string;
  platform: string;
  content: string;
  author: string;
  authorUsername: string;
  authorImage: string;
  verified: boolean;
  likes: number;
  shares: number;
  comments: number;
  sentiment: 'positive' | 'negative' | 'neutral';
  time: string;
  created_at: string;
  engagement: number;
  category: string;
  tags: string[];
  mentions: string[];
  lang: string;
}

interface TrendingHashtag {
  hashtag: string;
  mentions: number;
  sentiment: 'positive' | 'negative' | 'neutral';
  growth: number;
  tweets: TwitterTweet[];
}

interface SentimentAnalysis {
  positive: number;
  negative: number;
  neutral: number;
  totalTweets: number;
  timeframe: string;
}

class ApiService {
  private baseURL: string;

  constructor() {
    this.baseURL = API_BASE_URL;
  }

  private async makeRequest<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    const url = `${this.baseURL}${endpoint}`;
    
    try {
      const response = await fetch(url, {
        headers: {
          'Content-Type': 'application/json',
          ...options.headers,
        },
        ...options,
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || `HTTP ${response.status}: ${response.statusText}`);
      }

      const data: ApiResponse<T> = await response.json();
      
      if (!data.success) {
        throw new Error(data.message || 'API request failed');
      }

      return data.data;
    } catch (error) {
      console.error(`API Error for ${endpoint}:`, error);
      throw error;
    }
  }

  // Get political tweets from all leaders
  // async getPoliticalTweets(limit: number = 50, refresh: boolean = false): Promise<TwitterTweet[]> {
  //   const params = new URLSearchParams({
  //     limit: limit.toString(),
  //     ...(refresh && { refresh: 'true' })
  //   });

  //   return this.makeRequest<TwitterTweet[]>(`/twitter/political-tweets?${params}`);
  // }
  // Get political tweets from custom backend
// Fetch from local Express backend
async getPoliticalTweets(): Promise<any> {
  const response = await fetch('http://localhost:3001/api/twitter/latest-tweets');
  console.log('response', response);
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || `HTTP ${response.status}: ${response.statusText}`);
  }
  const data=await response.json();
  console.log('result',data);
  return  data;// The backend returns TwitterTweet[]
}



  // Search tweets by query
  async searchTweets(query: string, limit: number = 20, lang: string = 'hi'): Promise<TwitterTweet[]> {
    const params = new URLSearchParams({
      q: query,
      limit: limit.toString(),
      lang
    });

    return this.makeRequest<TwitterTweet[]>(`/twitter/search?${params}`);
  }

  // Get tweets by specific user
  async getUserTweets(username: string, limit: number = 20): Promise<TwitterTweet[]> {
    const params = new URLSearchParams({
      limit: limit.toString()
    });

    return this.makeRequest<TwitterTweet[]>(`/twitter/user/${username}?${params}`);
  }

  // Get trending hashtags
  async getTrendingHashtags(limit: number = 10): Promise<TrendingHashtag[]> {
    const params = new URLSearchParams({
      limit: limit.toString()
    });

    return this.makeRequest<TrendingHashtag[]>(`/twitter/trending-hashtags?${params}`);
  }

  // Get sentiment analysis
  async getSentimentAnalysis(timeframe: string = '24h'): Promise<SentimentAnalysis> {
    const params = new URLSearchParams({
      timeframe
    });

    return this.makeRequest<SentimentAnalysis>(`/twitter/sentiment-analysis?${params}`);
  }

  // Force refresh cache
  async refreshCache(): Promise<void> {
    await this.makeRequest<void>('/twitter/refresh-cache', {
      method: 'POST'
    });
  }

  // Check backend health
  async checkHealth(): Promise<{ status: string; timestamp: string; uptime: number }> {
    const response = await fetch(`${this.baseURL.replace('/api', '')}/health`);
    return response.json();
  }
}

export const apiService = new ApiService();
export type { TwitterTweet, TrendingHashtag, SentimentAnalysis };