// Mock Twitter API service to avoid CORS issues
// In production, you would need a backend server to proxy Twitter API calls

const POLITICAL_LEADERS = {
  'YogiAdityanath': 'myogiadityanath',
  'AkhileshYadav': 'yadavakhilesh',
  'PriyankaGandhi': 'priyankagandhi',
  'RahulGandhi': 'rahulgandhi',
  'AmitShah': 'amitshah',
  'JPNadda': 'jpnadda',
  'UPGovt': 'upgovt',
  'BJP4UP': 'bjp4up',
  'INCUttarPradesh': 'incuttarpradesh',
  'samajwadiparty': 'samajwadiparty'
};

interface TwitterUser {
  id: string;
  name: string;
  username: string;
  verified?: boolean;
  profile_image_url?: string;
  public_metrics?: {
    followers_count: number;
    following_count: number;
    tweet_count: number;
  };
}

interface TwitterTweet {
  id: string;
  text: string;
  created_at: string;
  author_id: string;
  public_metrics?: {
    retweet_count: number;
    like_count: number;
    reply_count: number;
    quote_count: number;
  };
  context_annotations?: Array<{
    domain: {
      id: string;
      name: string;
      description: string;
    };
    entity: {
      id: string;
      name: string;
      description?: string;
    };
  }>;
  entities?: {
    hashtags?: Array<{
      start: number;
      end: number;
      tag: string;
    }>;
    mentions?: Array<{
      start: number;
      end: number;
      username: string;
      id: string;
    }>;
  };
}

interface TwitterApiResponse {
  data: TwitterTweet[];
  includes?: {
    users: TwitterUser[];
  };
  meta: {
    result_count: number;
    next_token?: string;
  };
}

// Mock data for demonstration
const mockUsers: TwitterUser[] = [
  {
    id: '1',
    name: 'Yogi Adityanath',
    username: 'myogiadityanath',
    verified: true,
    profile_image_url: 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=150',
    public_metrics: {
      followers_count: 2500000,
      following_count: 150,
      tweet_count: 5000
    }
  },
  {
    id: '2',
    name: 'Akhilesh Yadav',
    username: 'yadavakhilesh',
    verified: true,
    profile_image_url: 'https://images.pexels.com/photos/1040880/pexels-photo-1040880.jpeg?auto=compress&cs=tinysrgb&w=150',
    public_metrics: {
      followers_count: 1800000,
      following_count: 200,
      tweet_count: 3500
    }
  },
  {
    id: '3',
    name: 'Priyanka Gandhi',
    username: 'priyankagandhi',
    verified: true,
    profile_image_url: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=150',
    public_metrics: {
      followers_count: 3200000,
      following_count: 100,
      tweet_count: 2800
    }
  }
];

const mockTweets: TwitterTweet[] = [
  {
    id: '1',
    text: 'उत्तर प्रदेश में विकास की नई गाथा लिखी जा रही है। हमारी सरकार की नीतियों से प्रदेश में नया बदलाव आया है। #UPDevelopment #YogiGovt',
    created_at: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    author_id: '1',
    public_metrics: {
      retweet_count: 1250,
      like_count: 8500,
      reply_count: 450,
      quote_count: 200
    },
    entities: {
      hashtags: [
        { start: 85, end: 99, tag: 'UPDevelopment' },
        { start: 100, end: 109, tag: 'YogiGovt' }
      ]
    }
  },
  {
    id: '2',
    text: 'समाजवादी पार्टी जनता के साथ खड़ी है। हम उत्तर प्रदेश की जनता के लिए काम कर रहे हैं। #SamajwadiParty #UPPolitics',
    created_at: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(),
    author_id: '2',
    public_metrics: {
      retweet_count: 890,
      like_count: 5200,
      reply_count: 320,
      quote_count: 150
    },
    entities: {
      hashtags: [
        { start: 75, end: 90, tag: 'SamajwadiParty' },
        { start: 91, end: 102, tag: 'UPPolitics' }
      ]
    }
  },
  {
    id: '3',
    text: 'Congress party stands with the people of Uttar Pradesh. We are committed to bringing positive change and development. #Congress #UttarPradesh',
    created_at: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(),
    author_id: '3',
    public_metrics: {
      retweet_count: 1100,
      like_count: 6800,
      reply_count: 380,
      quote_count: 180
    },
    entities: {
      hashtags: [
        { start: 118, end: 127, tag: 'Congress' },
        { start: 128, end: 141, tag: 'UttarPradesh' }
      ]
    }
  },
  {
    id: '4',
    text: 'आज उत्तर प्रदेश में कानून व्यवस्था की स्थिति बेहतर है। हमारी सरकार ने अपराध पर नियंत्रण पाया है। #LawAndOrder #UPSafety',
    created_at: new Date(Date.now() - 8 * 60 * 60 * 1000).toISOString(),
    author_id: '1',
    public_metrics: {
      retweet_count: 950,
      like_count: 7200,
      reply_count: 290,
      quote_count: 120
    },
    entities: {
      hashtags: [
        { start: 95, end: 107, tag: 'LawAndOrder' },
        { start: 108, end: 117, tag: 'UPSafety' }
      ]
    }
  },
  {
    id: '5',
    text: 'Education sector में हमारी सरकार ने क्रांतिकारी बदलाव किए हैं। नई शिक्षा नीति से बच्चों का भविष्य उज्जवल होगा। #Education #UPEducation',
    created_at: new Date(Date.now() - 12 * 60 * 60 * 1000).toISOString(),
    author_id: '1',
    public_metrics: {
      retweet_count: 780,
      like_count: 4900,
      reply_count: 210,
      quote_count: 95
    },
    entities: {
      hashtags: [
        { start: 115, end: 125, tag: 'Education' },
        { start: 126, end: 137, tag: 'UPEducation' }
      ]
    }
  }
];

class TwitterApiService {
  // Simulate network delay
  private async delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  // Get user ID by username (mock implementation)
  async getUserByUsername(username: string): Promise<TwitterUser | null> {
    await this.delay(500); // Simulate API delay
    
    const user = mockUsers.find(u => u.username === username);
    return user || null;
  }

  // Get tweets by user ID (mock implementation)
  async getTweetsByUserId(userId: string, maxResults: number = 10): Promise<TwitterTweet[]> {
    await this.delay(800); // Simulate API delay
    
    const userTweets = mockTweets.filter(tweet => tweet.author_id === userId);
    return userTweets.slice(0, maxResults);
  }

  // Search tweets by query (mock implementation)
  async searchTweets(query: string, maxResults: number = 10): Promise<TwitterApiResponse | null> {
    await this.delay(600); // Simulate API delay
    
    // Simple mock search - return tweets that contain query terms
    const searchTerms = query.toLowerCase().split(' ');
    const filteredTweets = mockTweets.filter(tweet => 
      searchTerms.some(term => 
        tweet.text.toLowerCase().includes(term) ||
        tweet.entities?.hashtags?.some(h => h.tag.toLowerCase().includes(term))
      )
    );

    return {
      data: filteredTweets.slice(0, maxResults),
      includes: {
        users: mockUsers
      },
      meta: {
        result_count: filteredTweets.length
      }
    };
  }

  // Get political tweets from all leaders (mock implementation)
  async getPoliticalTweets(): Promise<any[]> {
    await this.delay(1000); // Simulate API delay
    
    try {
      // Return processed mock tweets
      const processedTweets = mockTweets.map(tweet => {
        const author = mockUsers.find(user => user.id === tweet.author_id);
        return this.processTweet(tweet, author);
      });

      return processedTweets
        .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
        .slice(0, 50);

    } catch (error) {
      console.error('Error fetching political tweets:', error);
      return [];
    }
  }

  // Process tweet data for our application
  private processTweet(tweet: TwitterTweet, author?: TwitterUser) {
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
      engagement: this.calculateEngagement(tweet.public_metrics),
      category: category,
      tags: hashtags,
      mentions: tweet.entities?.mentions?.map(m => m.username) || []
    };
  }

  // Simple sentiment analysis based on keywords
  private analyzeSentiment(text: string): 'positive' | 'negative' | 'neutral' {
    const positiveWords = [
      'विकास', 'development', 'progress', 'success', 'achievement', 'good', 'great', 'excellent',
      'बेहतर', 'सफलता', 'प्रगति', 'खुशी', 'गर्व', 'proud', 'happy', 'wonderful', 'amazing',
      'उज्जवल', 'क्रांतिकारी', 'positive', 'committed'
    ];
    
    const negativeWords = [
      'fail', 'failure', 'problem', 'issue', 'crisis', 'bad', 'terrible', 'worst',
      'असफल', 'समस्या', 'संकट', 'बुरा', 'गलत', 'विफल', 'दुख', 'चिंता', 'concern', 'worried'
    ];

    const lowerText = text.toLowerCase();
    
    const positiveCount = positiveWords.filter(word => lowerText.includes(word)).length;
    const negativeCount = negativeWords.filter(word => lowerText.includes(word)).length;

    if (positiveCount > negativeCount) return 'positive';
    if (negativeCount > positiveCount) return 'negative';
    return 'neutral';
  }

  // Categorize content based on keywords
  private categorizeContent(text: string): string {
    const categories = {
      governance: ['governance', 'government', 'policy', 'administration', 'सरकार', 'नीति', 'प्रशासन'],
      schemes: ['scheme', 'yojana', 'योजना', 'benefit', 'welfare', 'कल्याण', 'लाभ'],
      infrastructure: ['infrastructure', 'road', 'bridge', 'development', 'बुनियादी', 'सड़क', 'पुल', 'विकास'],
      crime: ['crime', 'police', 'law', 'order', 'security', 'अपराध', 'पुलिस', 'कानून', 'व्यवस्था'],
      opposition: ['opposition', 'congress', 'sp', 'bsp', 'विपक्ष', 'कांग्रेस', 'समाजवादी'],
      election: ['election', 'vote', 'campaign', 'चुनाव', 'वोट', 'प्रचार'],
      education: ['education', 'school', 'college', 'शिक्षा', 'स्कूल', 'कॉलेज', 'नीति']
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
  private calculateEngagement(metrics?: TwitterTweet['public_metrics']): number {
    if (!metrics) return 0;
    
    const totalEngagement = (metrics.like_count || 0) + 
                           (metrics.retweet_count || 0) + 
                           (metrics.reply_count || 0) + 
                           (metrics.quote_count || 0);
    
    // Simple engagement calculation (in real app, you'd need follower count)
    return Math.min(100, Math.round((totalEngagement / 100) * 10));
  }

  // Format time for display
  private formatTime(dateString: string): string {
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
}

export const twitterApi = new TwitterApiService();
export { POLITICAL_LEADERS };