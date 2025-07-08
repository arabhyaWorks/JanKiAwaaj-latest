import React, { useState } from 'react';
import { Newspaper, TrendingUp, TrendingDown, Eye, Calendar, Filter } from 'lucide-react';

const NewsAnalysis: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [timeFilter, setTimeFilter] = useState('today');
  const [activeTab, setActiveTab] = useState('all');

  const newsData = [
    {
      id: 1,
      title: 'सीएम योगी ने 50,000 करोड़ रुपये के बुनियादी ढांचा विकास पैकेज की घोषणा की',
      source: 'Times of India',
      time: '2 hours ago',
      sentiment: 'positive',
      views: 25000,
      tags: ['Yogi Adityanath', 'Infrastructure', 'Development'],
      category: 'governance',
      image: 'https://navbharattimes.indiatimes.com/photo/122224641.cms?imgsize=94316&cfs=8JL5MBsDYFNo'
    },
    {
      id: 2,
      title: 'विपक्ष ने रोजगार नीतियों को लेकर सरकार की आलोचना की',
      source: 'Indian Express',
      time: '4 hours ago',
      sentiment: 'negative',
      views: 18000,
      tags: ['Akhilesh Yadav', 'Employment', 'Opposition'],
      category: 'politics',
      image: 'https://navbharattimes.indiatimes.com/photo/122223902.cms?imgsize=216500&cfs=8JL5MBsDYFNo'
    },
    {
      id: 3,
      title: 'UP Government Launches New Digital Initiative for Rural Areas',
      source: 'Hindustan Times',
      time: '6 hours ago',
      sentiment: 'positive',
      views: 32000,
      tags: ['Digital India', 'Rural Development', 'Technology'],
      category: 'schemes',
      image: 'https://navbharattimes.indiatimes.com/photo/122239641.cms?imgsize=111106&cfs=8JL5MBsDYFNo'
    },
    {
      id: 4,
      title: 'Law and Order Situation Improves in Eastern UP Districts',
      source: 'News18',
      time: '8 hours ago',
      sentiment: 'positive',
      views: 15000,
      tags: ['Law & Order', 'Eastern UP', 'Crime'],
      category: 'crime',
      image: 'https://i.ytimg.com/vi/y0hCvfK_JJo/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLAJ4KTzGqYcXUGYx3_DQyO7svNSZw'
    },
    {
      id: 5,
      title: 'Congress Leader Raises Questions on State Budget Allocation',
      source: 'NDTV',
      time: '12 hours ago',
      sentiment: 'negative',
      views: 12000,
      tags: ['Congress', 'Budget', 'Allocation'],
      category: 'politics',
      image: 'https://bsmedia.business-standard.com/_media/bs/img/article/2024-12/13/full/1734081388-5367.jpg?im=FitAndFill=(826,465)'
    },
    {
      id: 6,
      title: 'Record Breaking Participation in PM Awas Yojana Across UP',
      source: 'Economic Times',
      time: '1 day ago',
      sentiment: 'positive',
      views: 28000,
      tags: ['PM Awas Yojana', 'Housing', 'Welfare'],
      category: 'schemes',
      image: 'https://www.livehindustan.com/lh-img/uploadimage/library/2018/03/26/16_9/16_9_1/Pradhan_Mantri_Awas_Yojana_1522033605.jpg'
    }
  ];

  const categories = [
    { value: 'all', label: 'All News' },
    { value: 'governance', label: 'Governance' },
    { value: 'politics', label: 'Politics' },
    { value: 'schemes', label: 'Schemes' },
    { value: 'crime', label: 'Crime' },
  ];

  const newsTabs = [
    { id: 'all', label: 'All News', count: newsData.length },
    { id: 'bjp', label: 'BJP', count: newsData.filter(n => n.tags.some(tag => tag.toLowerCase().includes('bjp') || tag.toLowerCase().includes('yogi'))).length },
    { id: 'opposition', label: 'Opposition', count: newsData.filter(n => n.tags.some(tag => tag.toLowerCase().includes('akhilesh') || tag.toLowerCase().includes('congress') || tag.toLowerCase().includes('sp'))).length },
    { id: 'governance', label: 'Governance', count: newsData.filter(n => n.category === 'governance').length },
    { id: 'schemes', label: 'Schemes', count: newsData.filter(n => n.category === 'schemes').length },
    { id: 'issues', label: 'Issues', count: newsData.filter(n => n.category === 'politics').length },
    { id: 'crime', label: 'Crime', count: newsData.filter(n => n.category === 'crime').length },
  ];

  const filteredNews = newsData.filter(news => 
    (selectedCategory === 'all' || news.category === selectedCategory) &&
    (activeTab === 'all' || 
     (activeTab === 'bjp' && news.tags.some(tag => tag.toLowerCase().includes('bjp') || tag.toLowerCase().includes('yogi'))) ||
     (activeTab === 'opposition' && news.tags.some(tag => tag.toLowerCase().includes('akhilesh') || tag.toLowerCase().includes('congress') || tag.toLowerCase().includes('sp'))) ||
     (activeTab === 'governance' && news.category === 'governance') ||
     (activeTab === 'schemes' && news.category === 'schemes') ||
     (activeTab === 'issues' && news.category === 'politics') ||
     (activeTab === 'crime' && news.category === 'crime'))
  );

  const sentimentStats = {
    positive: filteredNews.filter(n => n.sentiment === 'positive').length,
    negative: filteredNews.filter(n => n.sentiment === 'negative').length,
    neutral: filteredNews.filter(n => n.sentiment === 'neutral').length,
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">News Analysis</h2>
          <p className="text-gray-600">Track media coverage and sentiment analysis</p>
        </div>
        <div className="flex items-center space-x-4">
          <select 
            value={selectedCategory} 
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-orange-500"
          >
            {categories.map(category => (
              <option key={category.value} value={category.value}>
                {category.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Total Articles</p>
              <p className="text-2xl font-bold text-gray-800">{filteredNews.length}</p>
            </div>
            <Newspaper className="w-8 h-8 text-blue-500" />
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Positive</p>
              <p className="text-2xl font-bold text-green-600">{sentimentStats.positive}</p>
            </div>
            <TrendingUp className="w-8 h-8 text-green-500" />
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Negative</p>
              <p className="text-2xl font-bold text-red-600">{sentimentStats.negative}</p>
            </div>
            <TrendingDown className="w-8 h-8 text-red-500" />
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Total Views</p>
              <p className="text-2xl font-bold text-gray-800">
                {filteredNews.reduce((sum, news) => sum + news.views, 0).toLocaleString()}
              </p>
            </div>
            <Eye className="w-8 h-8 text-orange-500" />
          </div>
        </div>
      </div>

      {/* News List */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-800">Latest News Coverage</h3>
          </div>
          
          {/* News Tabs */}
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8">
              {newsTabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`py-3 px-1 border-b-2 font-medium text-sm transition-colors ${
                    activeTab === tab.id
                      ? 'border-orange-500 text-orange-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <span>{tab.label}</span>
                  <span className={`ml-2 px-2 py-1 text-xs rounded-full ${
                    activeTab === tab.id
                      ? 'bg-orange-100 text-orange-800'
                      : 'bg-gray-100 text-gray-600'
                  }`}>
                    {tab.count}
                  </span>
                </button>
              ))}
            </nav>
          </div>
        </div>
        <div className="divide-y divide-gray-200">
          {filteredNews.map((news) => (
            <div key={news.id} className="p-6 hover:bg-gray-50 transition-colors">
              <div className="flex items-start space-x-4">
                <img 
                  src={news.image} 
                  alt={news.title}
                  className="w-24 h-20 object-cover rounded-lg flex-shrink-0"
                />
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="text-lg font-medium text-gray-800 hover:text-orange-600 cursor-pointer">
                      {news.title}
                    </h4>
                    <span className={`px-3 py-1 text-sm font-medium rounded-full ${
                      news.sentiment === 'positive' ? 'bg-green-100 text-green-800' :
                      news.sentiment === 'negative' ? 'bg-red-100 text-red-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {news.sentiment}
                    </span>
                  </div>
                  <div className="flex items-center space-x-4 text-sm text-gray-500 mb-3">
                    <span className="flex items-center">
                      <Calendar className="w-4 h-4 mr-1" />
                      {news.time}
                    </span>
                    <span>{news.source}</span>
                    <span className="flex items-center">
                      <Eye className="w-4 h-4 mr-1" />
                      {news.views.toLocaleString()} views
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    {news.tags.map((tag, index) => (
                      <span 
                        key={index}
                        className="px-2 py-1 text-xs font-medium bg-orange-100 text-orange-800 rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Trending Topics */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Trending Topics</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            { topic: 'Infrastructure Development', mentions: 156, sentiment: 'positive' },
            { topic: 'Employment Policies', mentions: 89, sentiment: 'negative' },
            { topic: 'Rural Development', mentions: 234, sentiment: 'positive' },
            { topic: 'Law & Order', mentions: 145, sentiment: 'positive' },
            { topic: 'Budget Allocation', mentions: 67, sentiment: 'negative' },
            { topic: 'Welfare Schemes', mentions: 198, sentiment: 'positive' },
          ].map((trend, index) => (
            <div key={index} className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-medium text-gray-800">{trend.topic}</h4>
                <span className={`w-3 h-3 rounded-full ${
                  trend.sentiment === 'positive' ? 'bg-green-500' : 'bg-red-500'
                }`}></span>
              </div>
              <p className="text-sm text-gray-600">{trend.mentions} mentions</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NewsAnalysis;