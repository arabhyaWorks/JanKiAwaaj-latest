import React, { useState } from 'react';
import { TrendingUp, TrendingDown, Hash, MessageCircle, Calendar, Filter, BarChart3 } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';

const TrendsAnalysis: React.FC = () => {
  const [selectedTrend, setSelectedTrend] = useState('sentiment');

  const sentimentTrends = [
    { date: '2024-01-01', positive: 45, negative: 25, neutral: 30 },
    { date: '2024-01-02', positive: 47, negative: 23, neutral: 30 },
    { date: '2024-01-03', positive: 50, negative: 20, neutral: 30 },
    { date: '2024-01-04', positive: 48, negative: 22, neutral: 30 },
    { date: '2024-01-05', positive: 52, negative: 18, neutral: 30 },
    { date: '2024-01-06', positive: 55, negative: 15, neutral: 30 },
    { date: '2024-01-07', positive: 53, negative: 17, neutral: 30 },
  ];

  const partyTrends = [
    { date: '2024-01-01', bjp: 65, sp: 25, congress: 10 },
    { date: '2024-01-02', bjp: 67, sp: 23, congress: 10 },
    { date: '2024-01-03', bjp: 70, sp: 20, congress: 10 },
    { date: '2024-01-04', bjp: 72, sp: 18, congress: 10 },
    { date: '2024-01-05', bjp: 75, sp: 15, congress: 10 },
    { date: '2024-01-06', bjp: 73, sp: 17, congress: 10 },
    { date: '2024-01-07', bjp: 76, sp: 14, congress: 10 },
  ];

  const trendingTopics = [
    {
      topic: 'Infrastructure Development',
      mentions: 15600,
      growth: 23.5,
      sentiment: 'positive',
      trend: 'up',
      description: 'CM announces new road projects'
    },
    {
      topic: 'Employment Generation',
      mentions: 12400,
      growth: -8.2,
      sentiment: 'negative',
      trend: 'down',
      description: 'Opposition questions job creation'
    },
    {
      topic: 'Law & Order',
      mentions: 9800,
      growth: 15.7,
      sentiment: 'positive',
      trend: 'up',
      description: 'Crime rate decreases in major cities'
    },
    {
      topic: 'Healthcare Services',
      mentions: 8900,
      growth: 12.3,
      sentiment: 'positive',
      trend: 'up',
      description: 'New hospitals inaugurated'
    },
    {
      topic: 'Education Policy',
      mentions: 7600,
      growth: -5.4,
      sentiment: 'neutral',
      trend: 'down',
      description: 'Mixed reactions to new policies'
    },
    {
      topic: 'Agricultural Reforms',
      mentions: 6800,
      growth: 18.9,
      sentiment: 'positive',
      trend: 'up',
      description: 'Farmers support new schemes'
    }
  ];

  const issueWiseTrends = [
    { issue: 'Governance', bjp: 78, opposition: 22 },
    { issue: 'Development', bjp: 82, opposition: 18 },
    { issue: 'Law & Order', bjp: 85, opposition: 15 },
    { issue: 'Healthcare', bjp: 70, opposition: 30 },
    { issue: 'Education', bjp: 65, opposition: 35 },
    { issue: 'Agriculture', bjp: 75, opposition: 25 },
  ];

  const hashtagTrends = [
    { hashtag: '#YogiGovt', mentions: 25000, sentiment: 'positive', growth: 15.2 },
    { hashtag: '#UPDevelopment', mentions: 18500, sentiment: 'positive', growth: 22.8 },
    { hashtag: '#BJPFails', mentions: 12000, sentiment: 'negative', growth: -8.5 },
    { hashtag: '#LawAndOrder', mentions: 9600, sentiment: 'positive', growth: 18.3 },
    { hashtag: '#UPBudget', mentions: 7800, sentiment: 'neutral', growth: 5.7 },
    { hashtag: '#YouthUnemployment', mentions: 6900, sentiment: 'negative', growth: -12.4 },
  ];

  const trendOptions = [
    { value: 'sentiment', label: 'Sentiment Trends' },
    { value: 'party', label: 'Party Trends' },
    { value: 'issues', label: 'Issue-wise Trends' },
  ];

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Trends Analysis</h2>
          <p className="text-gray-600">Track political sentiment and trending topics over time</p>
        </div>
        <div className="flex items-center space-x-4">
          <select 
            value={selectedTrend} 
            onChange={(e) => setSelectedTrend(e.target.value)}
            className="border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-orange-500"
          >
            {trendOptions.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Trending Topics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {trendingTopics.slice(0, 6).map((topic, index) => (
          <div key={index} className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-lg font-semibold text-gray-800">{topic.topic}</h3>
              <div className={`flex items-center space-x-1 ${
                topic.trend === 'up' ? 'text-green-600' : 'text-red-600'
              }`}>
                {topic.trend === 'up' ? (
                  <TrendingUp className="w-4 h-4" />
                ) : (
                  <TrendingDown className="w-4 h-4" />
                )}
                <span className="text-sm font-medium">{Math.abs(topic.growth)}%</span>
              </div>
            </div>
            <p className="text-sm text-gray-600 mb-3">{topic.description}</p>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <MessageCircle className="w-4 h-4 text-gray-400" />
                <span className="text-sm text-gray-600">{topic.mentions.toLocaleString()} mentions</span>
              </div>
              <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                topic.sentiment === 'positive' ? 'bg-green-100 text-green-800' :
                topic.sentiment === 'negative' ? 'bg-red-100 text-red-800' :
                'bg-gray-100 text-gray-800'
              }`}>
                {topic.sentiment}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Main Trend Chart */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">
          {selectedTrend === 'sentiment' ? 'Sentiment Trends' :
           selectedTrend === 'party' ? 'Party Performance Trends' :
           'Issue-wise Performance'}
        </h3>
        <ResponsiveContainer width="100%" height={400}>
          {selectedTrend === 'issues' ? (
            <BarChart data={issueWiseTrends}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="issue" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="bjp" fill="#f97316" name="BJP Positive" />
              <Bar dataKey="opposition" fill="#dc2626" name="Opposition Positive" />
            </BarChart>
          ) : (
            <LineChart data={selectedTrend === 'sentiment' ? sentimentTrends : partyTrends}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              {selectedTrend === 'sentiment' ? (
                <>
                  <Line type="monotone" dataKey="positive" stroke="#22c55e" strokeWidth={3} name="Positive" />
                  <Line type="monotone" dataKey="negative" stroke="#ef4444" strokeWidth={3} name="Negative" />
                  <Line type="monotone" dataKey="neutral" stroke="#f59e0b" strokeWidth={3} name="Neutral" />
                </>
              ) : (
                <>
                  <Line type="monotone" dataKey="bjp" stroke="#f97316" strokeWidth={3} name="BJP" />
                  <Line type="monotone" dataKey="sp" stroke="#dc2626" strokeWidth={3} name="SP" />
                  <Line type="monotone" dataKey="congress" stroke="#19a3e1" strokeWidth={3} name="Congress" />
                </>
              )}
            </LineChart>
          )}
        </ResponsiveContainer>
      </div>

      {/* Hashtag Trends */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Trending Hashtags</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {hashtagTrends.map((hashtag, index) => (
            <div key={index} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
              <div className="flex items-center space-x-3">
                <Hash className="w-5 h-5 text-gray-400" />
                <div>
                  <h4 className="font-medium text-gray-800">{hashtag.hashtag}</h4>
                  <p className="text-sm text-gray-500">{hashtag.mentions.toLocaleString()} mentions</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                  hashtag.sentiment === 'positive' ? 'bg-green-100 text-green-800' :
                  hashtag.sentiment === 'negative' ? 'bg-red-100 text-red-800' :
                  'bg-gray-100 text-gray-800'
                }`}>
                  {hashtag.sentiment}
                </span>
                <div className={`flex items-center space-x-1 ${
                  hashtag.growth > 0 ? 'text-green-600' : 'text-red-600'
                }`}>
                  {hashtag.growth > 0 ? (
                    <TrendingUp className="w-4 h-4" />
                  ) : (
                    <TrendingDown className="w-4 h-4" />
                  )}
                  <span className="text-sm font-medium">{Math.abs(hashtag.growth)}%</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Key Insights */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Key Insights</h3>
          <div className="space-y-4">
            <div className="p-4 bg-green-50 rounded-lg">
              <div className="flex items-center space-x-2 mb-2">
                <TrendingUp className="w-5 h-5 text-green-600" />
                <h4 className="font-medium text-green-800">Positive Trend</h4>
              </div>
              <p className="text-sm text-green-700">Infrastructure development mentions increased by 23.5% this week</p>
            </div>
            <div className="p-4 bg-red-50 rounded-lg">
              <div className="flex items-center space-x-2 mb-2">
                <TrendingDown className="w-5 h-5 text-red-600" />
                <h4 className="font-medium text-red-800">Concerning Trend</h4>
              </div>
              <p className="text-sm text-red-700">Employment-related negative sentiment increased by 8.2%</p>
            </div>
            <div className="p-4 bg-blue-50 rounded-lg">
              <div className="flex items-center space-x-2 mb-2">
                <BarChart3 className="w-5 h-5 text-blue-600" />
                <h4 className="font-medium text-blue-800">Performance Metric</h4>
              </div>
              <p className="text-sm text-blue-700">Overall BJP sentiment remains strong at 76% positive mentions</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Recommendations</h3>
          <div className="space-y-4">
            <div className="p-4 border-l-4 border-orange-500 bg-orange-50">
              <h4 className="font-medium text-orange-800 mb-2">Focus Area</h4>
              <p className="text-sm text-orange-700">Increase communication around employment generation initiatives</p>
            </div>
            <div className="p-4 border-l-4 border-green-500 bg-green-50">
              <h4 className="font-medium text-green-800 mb-2">Opportunity</h4>
              <p className="text-sm text-green-700">Leverage positive infrastructure sentiment for upcoming announcements</p>
            </div>
            <div className="p-4 border-l-4 border-blue-500 bg-blue-50">
              <h4 className="font-medium text-blue-800 mb-2">Strategy</h4>
              <p className="text-sm text-blue-700">Maintain momentum on law & order messaging across all platforms</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrendsAnalysis;