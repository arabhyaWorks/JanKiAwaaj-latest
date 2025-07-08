import React, { useState } from 'react';
import { Users, TrendingUp, TrendingDown, MessageCircle, User, BarChart3 } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';

const OppositionAnalysis: React.FC = () => {
  const [selectedParty, setSelectedParty] = useState('all');

  const oppositionData = [
    {
      party: 'Samajwadi Party',
      leader: 'Akhilesh Yadav',
      logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/Samajwadi_Party_election_symbol_bicycle.svg/200px-Samajwadi_Party_election_symbol_bicycle.svg.png',
      seats: 111,
      voteShare: 32.1,
      sentiment: 65,
      mentions: 8500,
      strongHolds: 45,
      trend: 'down',
      color: '#dc2626'
    },
    {
      party: 'BSP',
      leader: 'Mayawati',
      logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f7/BSP_Flag.png/200px-BSP_Flag.png',
      seats: 1,
      voteShare: 12.9,
      sentiment: 45,
      mentions: 3200,
      strongHolds: 8,
      trend: 'down',
      color: '#1e40af'
    },
    {
      party: 'Congress',
      leader: 'Priyanka Gandhi',
      logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1f/Indian_National_Congress_hand_logo.svg/200px-Indian_National_Congress_hand_logo.svg.png',
      seats: 2,
      voteShare: 2.3,
      sentiment: 50,
      mentions: 1800,
      strongHolds: 2,
      trend: 'up',
      color: '#19a3e1'
    },
    {
      party: 'AIMIM',
      leader: 'Asaduddin Owaisi',
      logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/All_India_Majlis-e-Ittehadul_Muslimeen_Logo.svg/200px-All_India_Majlis-e-Ittehadul_Muslimeen_Logo.svg.png',
      seats: 0,
      voteShare: 0.8,
      sentiment: 55,
      mentions: 950,
      strongHolds: 1,
      trend: 'up',
      color: '#059669'
    }
  ];

  const trendData = [
    { month: 'Jan', SP: 32, BSP: 13, Congress: 2, AIMIM: 1 },
    { month: 'Feb', SP: 31, BSP: 12, Congress: 2.5, AIMIM: 1.2 },
    { month: 'Mar', SP: 30, BSP: 11, Congress: 3, AIMIM: 1.5 },
    { month: 'Apr', SP: 29, BSP: 10, Congress: 3.5, AIMIM: 1.8 },
    { month: 'May', SP: 28, BSP: 9, Congress: 4, AIMIM: 2 },
  ];

  const leaderActivity = [
    {
      name: 'Akhilesh Yadav',
      party: 'SP',
      recentActivity: 'Criticized govt employment policies',
      sentiment: 'negative',
      engagement: 8500,
      time: '2 hours ago'
    },
    {
      name: 'Mayawati',
      party: 'BSP',
      recentActivity: 'Announced support for Dalit rights',
      sentiment: 'positive',
      engagement: 3200,
      time: '6 hours ago'
    },
    {
      name: 'Priyanka Gandhi',
      party: 'Congress',
      recentActivity: 'Visited affected families in Unnao',
      sentiment: 'positive',
      engagement: 1800,
      time: '1 day ago'
    },
    {
      name: 'Asaduddin Owaisi',
      party: 'AIMIM',
      recentActivity: 'Spoke on minority rights issues',
      sentiment: 'positive',
      engagement: 950,
      time: '2 days ago'
    }
  ];

  const filteredData = selectedParty === 'all' ? oppositionData : 
    oppositionData.filter(party => party.party === selectedParty);

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Opposition Analysis</h2>
          <p className="text-gray-600">Monitor opposition parties and their activities</p>
        </div>
        <div className="flex items-center space-x-4">
          <select 
            value={selectedParty} 
            onChange={(e) => setSelectedParty(e.target.value)}
            className="border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-orange-500"
          >
            <option value="all">All Parties</option>
            {oppositionData.map(party => (
              <option key={party.party} value={party.party}>
                {party.party}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Opposition Party Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {oppositionData.map((party, index) => (
          <div key={index} className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <img 
                src={party.logo} 
                alt={party.party}
                className="w-12 h-12 object-contain"
              />
              <div className={`flex items-center space-x-1 ${
                party.trend === 'up' ? 'text-green-600' : 'text-red-600'
              }`}>
                {party.trend === 'up' ? (
                  <TrendingUp className="w-4 h-4" />
                ) : (
                  <TrendingDown className="w-4 h-4" />
                )}
                <span className="text-sm font-medium">{party.trend}</span>
              </div>
            </div>
            <h3 className="text-lg font-semibold text-gray-800 mb-1">{party.party}</h3>
            <p className="text-sm text-gray-600 mb-4">{party.leader}</p>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Seats</span>
                <span className="font-medium">{party.seats}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Vote Share</span>
                <span className="font-medium">{party.voteShare}%</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Sentiment</span>
                <span className="font-medium">{party.sentiment}%</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Mentions</span>
                <span className="font-medium">{party.mentions.toLocaleString()}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Trend Analysis */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Opposition Trends Over Time</h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={trendData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="SP" stroke="#dc2626" strokeWidth={3} name="Samajwadi Party" />
            <Line type="monotone" dataKey="BSP" stroke="#1e40af" strokeWidth={3} name="BSP" />
            <Line type="monotone" dataKey="Congress" stroke="#19a3e1" strokeWidth={3} name="Congress" />
            <Line type="monotone" dataKey="AIMIM" stroke="#059669" strokeWidth={3} name="AIMIM" />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Leader Activity */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Recent Leader Activity</h3>
        <div className="space-y-4">
          {leaderActivity.map((activity, index) => (
            <div key={index} className="flex items-start space-x-4 p-4 hover:bg-gray-50 rounded-lg transition-colors">
              <div className="flex-shrink-0">
                <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                  <User className="w-5 h-5 text-gray-600" />
                </div>
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium text-gray-800">{activity.name}</h4>
                  <div className="flex items-center space-x-2">
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                      activity.sentiment === 'positive' ? 'bg-green-100 text-green-800' :
                      activity.sentiment === 'negative' ? 'bg-red-100 text-red-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {activity.sentiment}
                    </span>
                    <span className="text-sm text-gray-500">{activity.time}</span>
                  </div>
                </div>
                <p className="text-gray-600 mb-2">{activity.recentActivity}</p>
                <div className="flex items-center space-x-4 text-sm text-gray-500">
                  <span className="flex items-center">
                    <MessageCircle className="w-4 h-4 mr-1" />
                    {activity.engagement.toLocaleString()} mentions
                  </span>
                  <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded-full text-xs">
                    {activity.party}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Constituency Analysis */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Opposition Strongholds</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={oppositionData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="party" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="strongHolds" fill="#6366f1" name="Strong Constituencies" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Key Metrics</h3>
          <div className="space-y-4">
            <div className="p-4 bg-red-50 rounded-lg">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-red-800">Total Opposition Seats</span>
                <span className="text-2xl font-bold text-red-600">
                  {oppositionData.reduce((sum, party) => sum + party.seats, 0)}
                </span>
              </div>
            </div>
            <div className="p-4 bg-blue-50 rounded-lg">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-blue-800">Combined Vote Share</span>
                <span className="text-2xl font-bold text-blue-600">
                  {oppositionData.reduce((sum, party) => sum + party.voteShare, 0).toFixed(1)}%
                </span>
              </div>
            </div>
            <div className="p-4 bg-green-50 rounded-lg">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-green-800">Total Strongholds</span>
                <span className="text-2xl font-bold text-green-600">
                  {oppositionData.reduce((sum, party) => sum + party.strongHolds, 0)}
                </span>
              </div>
            </div>
            <div className="p-4 bg-purple-50 rounded-lg">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-purple-800">Social Media Mentions</span>
                <span className="text-2xl font-bold text-purple-600">
                  {oppositionData.reduce((sum, party) => sum + party.mentions, 0).toLocaleString()}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OppositionAnalysis;