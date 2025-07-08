import React, { useState } from 'react';
import { User, MapPin, TrendingUp, TrendingDown, MessageCircle, Calendar, Award, Phone, Mail, Users, BarChart3, Eye } from 'lucide-react';

const LeaderProfiles: React.FC = () => {
  const [selectedParty, setSelectedParty] = useState('all');
  const [selectedPosition, setSelectedPosition] = useState('all');
  const [timeFilter, setTimeFilter] = useState('30days');

  const leaders = [
    {
      id: 1,
      name: 'Yogi Adityanath',
      position: 'Chief Minister',
      party: 'BJP',
      constituency: 'Gorakhpur Urban',
      image: 'https://images.pexels.com/photos/8761564/pexels-photo-8761564.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop',
      sentiment: 78,
      socialFollowers: 2500000,
      recentActivity: 'Announced infrastructure projects worth ₹50,000 crores',
      mentions: 45000,
      influence: 95,
      approval: 82,
      constituency_strength: 'Very Strong',
      last_election_margin: 'Won by 1.2 lakh votes',
      contact: {
        phone: '+91-XXXXXXXXXX',
        email: 'cm@up.gov.in'
      },
      recent_statements: [
        { date: '2024-01-20', statement: 'UP leads in development across all sectors', sentiment: 'positive' },
        { date: '2024-01-18', statement: 'Zero tolerance policy on crime continues', sentiment: 'positive' },
        { date: '2024-01-15', statement: 'New employment opportunities created', sentiment: 'positive' }
      ],
      performance_metrics: {
        governance: 85,
        development: 88,
        law_order: 90,
        public_relations: 82
      }
    },
    {
      id: 2,
      name: 'Akhilesh Yadav',
      position: 'SP President & Former CM',
      party: 'Samajwadi Party',
      constituency: 'Kannauj',
      image: 'https://images.pexels.com/photos/8369648/pexels-photo-8369648.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop',
      sentiment: 65,
      socialFollowers: 1800000,
      recentActivity: 'Criticized government employment policies',
      mentions: 32000,
      influence: 78,
      approval: 68,
      constituency_strength: 'Strong',
      last_election_margin: 'Won by 67,000 votes',
      contact: {
        phone: '+91-XXXXXXXXXX',
        email: 'office@samajwadiparty.in'
      },
      recent_statements: [
        { date: '2024-01-19', statement: 'Government fails to provide jobs to youth', sentiment: 'negative' },
        { date: '2024-01-16', statement: 'Demands transparency in budget allocation', sentiment: 'negative' },
        { date: '2024-01-14', statement: 'SP will bring real development', sentiment: 'positive' }
      ],
      performance_metrics: {
        opposition_role: 75,
        public_connect: 80,
        media_presence: 78,
        party_organization: 82
      }
    },
    {
      id: 3,
      name: 'Priyanka Gandhi Vadra',
      position: 'Congress General Secretary',
      party: 'Congress',
      constituency: 'Rae Bareli (Family)',
      image: 'https://images.pexels.com/photos/6802042/pexels-photo-6802042.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop',
      sentiment: 55,
      socialFollowers: 950000,
      recentActivity: 'Visited affected families in rural areas',
      mentions: 18000,
      influence: 65,
      approval: 58,
      constituency_strength: 'Moderate',
      last_election_margin: 'Family stronghold',
      contact: {
        phone: '+91-XXXXXXXXXX',
        email: 'office@inc.in'
      },
      recent_statements: [
        { date: '2024-01-17', statement: 'Congress stands with farmers', sentiment: 'positive' },
        { date: '2024-01-15', statement: 'Government ignores rural issues', sentiment: 'negative' },
        { date: '2024-01-12', statement: 'Women safety still a concern', sentiment: 'negative' }
      ],
      performance_metrics: {
        grassroots_connect: 70,
        media_presence: 75,
        organizational_strength: 45,
        public_appeal: 62
      }
    },
    {
      id: 4,
      name: 'Mayawati',
      position: 'BSP Supremo',
      party: 'BSP',
      constituency: 'State-wide influence',
      image: 'https://images.pexels.com/photos/7688336/pexels-photo-7688336.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop',
      sentiment: 45,
      socialFollowers: 680000,
      recentActivity: 'Announced support for Dalit rights',
      mentions: 12000,
      influence: 58,
      approval: 48,
      constituency_strength: 'Declining',
      last_election_margin: 'Party won 1 seat in 2022',
      contact: {
        phone: '+91-XXXXXXXXXX',
        email: 'office@bspindia.org'
      },
      recent_statements: [
        { date: '2024-01-18', statement: 'BSP will protect Dalit interests', sentiment: 'positive' },
        { date: '2024-01-16', statement: 'Government fails to implement reservations properly', sentiment: 'negative' },
        { date: '2024-01-13', statement: 'Social justice is our priority', sentiment: 'positive' }
      ],
      performance_metrics: {
        community_connect: 75,
        political_relevance: 40,
        organizational_strength: 55,
        media_presence: 50
      }
    },
    {
      id: 5,
      name: 'Keshav Prasad Maurya',
      position: 'Deputy Chief Minister',
      party: 'BJP',
      constituency: 'Sirathu',
      image: 'https://images.pexels.com/photos/8112199/pexels-photo-8112199.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop',
      sentiment: 72,
      socialFollowers: 580000,
      recentActivity: 'Inaugurated skill development centers',
      mentions: 15000,
      influence: 78,
      approval: 75,
      constituency_strength: 'Strong',
      last_election_margin: 'Won by 45,000 votes',
      contact: {
        phone: '+91-XXXXXXXXXX',
        email: 'dycm@up.gov.in'
      },
      recent_statements: [
        { date: '2024-01-19', statement: 'Skill development programs showing results', sentiment: 'positive' },
        { date: '2024-01-17', statement: 'UP becoming employment hub', sentiment: 'positive' },
        { date: '2024-01-14', statement: 'Industrial growth unprecedented', sentiment: 'positive' }
      ],
      performance_metrics: {
        governance: 80,
        development: 82,
        party_organization: 85,
        public_relations: 75
      }
    },
    {
      id: 6,
      name: 'Brajesh Pathak',
      position: 'Deputy Chief Minister',
      party: 'BJP',
      constituency: 'Lucknow Cantt',
      image: 'https://images.pexels.com/photos/7578842/pexels-photo-7578842.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop',
      sentiment: 74,
      socialFollowers: 320000,
      recentActivity: 'Reviewed healthcare infrastructure development',
      mentions: 12500,
      influence: 75,
      approval: 76,
      constituency_strength: 'Very Strong',
      last_election_margin: 'Won by 62,000 votes',
      contact: {
        phone: '+91-XXXXXXXXXX',
        email: 'dcm2@up.gov.in'
      },
      recent_statements: [
        { date: '2024-01-20', statement: 'Healthcare facilities expanded significantly', sentiment: 'positive' },
        { date: '2024-01-18', statement: 'Medical college openings accelerated', sentiment: 'positive' },
        { date: '2024-01-15', statement: 'Ayushman Bharat benefiting millions', sentiment: 'positive' }
      ],
      performance_metrics: {
        healthcare_management: 88,
        administration: 80,
        public_relations: 78,
        constituency_work: 85
      }
    }
  ];

  const parties = [
    { value: 'all', label: 'All Parties' },
    { value: 'BJP', label: 'BJP' },
    { value: 'Samajwadi Party', label: 'Samajwadi Party' },
    { value: 'Congress', label: 'Congress' },
    { value: 'BSP', label: 'BSP' },
  ];

  const positions = [
    { value: 'all', label: 'All Positions' },
    { value: 'Chief Minister', label: 'Chief Minister' },
    { value: 'Deputy Chief Minister', label: 'Deputy Chief Minister' },
    { value: 'Minister', label: 'Minister' },
    { value: 'MLA', label: 'MLA' },
    { value: 'MP', label: 'MP' },
    { value: 'Party President', label: 'Party Leader' },
  ];

  const timeFilters = [
    { value: 'today', label: 'Today' },
    { value: '7days', label: 'Last 7 Days' },
    { value: '30days', label: 'Last 30 Days' },
    { value: '90days', label: 'Last 90 Days' },
  ];

  const filteredLeaders = leaders.filter(leader => {
    const partyMatch = selectedParty === 'all' || leader.party === selectedParty;
    const positionMatch = selectedPosition === 'all' || leader.position.includes(selectedPosition);
    return partyMatch && positionMatch;
  });

  const topInfluencers = [...leaders].sort((a, b) => b.influence - a.influence).slice(0, 5);

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Leader Profiles & Analysis</h2>
          <p className="text-gray-600">Comprehensive tracking of political leaders across UP</p>
        </div>
        <div className="flex items-center space-x-4">
          <select 
            value={timeFilter} 
            onChange={(e) => setTimeFilter(e.target.value)}
            className="border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-orange-500"
          >
            {timeFilters.map(filter => (
              <option key={filter.value} value={filter.value}>
                {filter.label}
              </option>
            ))}
          </select>
          <select 
            value={selectedParty} 
            onChange={(e) => setSelectedParty(e.target.value)}
            className="border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-orange-500"
          >
            {parties.map(party => (
              <option key={party.value} value={party.value}>
                {party.label}
              </option>
            ))}
          </select>
          <select 
            value={selectedPosition} 
            onChange={(e) => setSelectedPosition(e.target.value)}
            className="border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-orange-500"
          >
            {positions.map(position => (
              <option key={position.value} value={position.value}>
                {position.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Total Leaders</p>
              <p className="text-2xl font-bold text-gray-800">{filteredLeaders.length}</p>
            </div>
            <User className="w-8 h-8 text-blue-500" />
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Avg Sentiment</p>
              <p className="text-2xl font-bold text-green-600">
                {(filteredLeaders.reduce((sum, leader) => sum + leader.sentiment, 0) / filteredLeaders.length || 0).toFixed(0)}%
              </p>
            </div>
            <TrendingUp className="w-8 h-8 text-green-500" />
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Total Mentions</p>
              <p className="text-2xl font-bold text-purple-600">
                {filteredLeaders.reduce((sum, leader) => sum + leader.mentions, 0).toLocaleString()}
              </p>
            </div>
            <MessageCircle className="w-8 h-8 text-purple-500" />
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Social Reach</p>
              <p className="text-2xl font-bold text-orange-600">
                {(filteredLeaders.reduce((sum, leader) => sum + leader.socialFollowers, 0) / 1000000).toFixed(1)}M
              </p>
            </div>
            <Users className="w-8 h-8 text-orange-500" />
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Avg Influence</p>
              <p className="text-2xl font-bold text-indigo-600">
                {(filteredLeaders.reduce((sum, leader) => sum + leader.influence, 0) / filteredLeaders.length || 0).toFixed(0)}%
              </p>
            </div>
            <BarChart3 className="w-8 h-8 text-indigo-500" />
          </div>
        </div>
      </div>

      {/* Top Influencers */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Top Influencers</h3>
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          {topInfluencers.map((leader, index) => (
            <div key={leader.id} className="text-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
              <img 
                src={leader.image} 
                alt={leader.name}
                className="w-16 h-16 rounded-full mx-auto mb-3 object-cover"
              />
              <h4 className="font-medium text-gray-800">{leader.name}</h4>
              <p className="text-sm text-gray-500">{leader.party}</p>
              <div className="mt-2">
                <span className="text-lg font-bold text-orange-600">{leader.influence}%</span>
                <p className="text-xs text-gray-400">Influence Score</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Leader Cards Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredLeaders.map((leader) => (
          <div key={leader.id} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="p-6">
              {/* Leader Header */}
              <div className="flex items-start space-x-4 mb-6">
                <img 
                  src={leader.image} 
                  alt={leader.name}
                  className="w-20 h-20 rounded-full object-cover flex-shrink-0"
                />
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-xl font-bold text-gray-800">{leader.name}</h3>
                    <span className={`px-3 py-1 text-sm font-medium rounded-full ${
                      leader.party === 'BJP' ? 'bg-orange-100 text-orange-800' :
                      leader.party === 'Samajwadi Party' ? 'bg-red-100 text-red-800' :
                      leader.party === 'Congress' ? 'bg-blue-100 text-blue-800' :
                      'bg-indigo-100 text-indigo-800'
                    }`}>
                      {leader.party}
                    </span>
                  </div>
                  <p className="text-gray-600 font-medium">{leader.position}</p>
                  <div className="flex items-center text-sm text-gray-500 mt-1">
                    <MapPin className="w-4 h-4 mr-1" />
                    <span>{leader.constituency}</span>
                  </div>
                </div>
              </div>

              {/* Metrics Grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <div className="text-center p-3 bg-gray-50 rounded-lg">
                  <div className="text-lg font-bold text-gray-800">{leader.sentiment}%</div>
                  <div className="text-xs text-gray-500">Sentiment</div>
                </div>
                <div className="text-center p-3 bg-gray-50 rounded-lg">
                  <div className="text-lg font-bold text-gray-800">{leader.influence}%</div>
                  <div className="text-xs text-gray-500">Influence</div>
                </div>
                <div className="text-center p-3 bg-gray-50 rounded-lg">
                  <div className="text-lg font-bold text-gray-800">{(leader.socialFollowers / 1000).toFixed(0)}K</div>
                  <div className="text-xs text-gray-500">Followers</div>
                </div>
                <div className="text-center p-3 bg-gray-50 rounded-lg">
                  <div className="text-lg font-bold text-gray-800">{leader.mentions.toLocaleString()}</div>
                  <div className="text-xs text-gray-500">Mentions</div>
                </div>
              </div>

              {/* Recent Activity */}
              <div className="mb-6">
                <h4 className="font-medium text-gray-800 mb-2">Recent Activity</h4>
                <p className="text-sm text-gray-600 bg-gray-50 p-3 rounded-lg">{leader.recentActivity}</p>
              </div>

              {/* Performance Metrics */}
              <div className="mb-6">
                <h4 className="font-medium text-gray-800 mb-3">Performance Metrics</h4>
                <div className="space-y-2">
                  {Object.entries(leader.performance_metrics).map(([key, value]) => (
                    <div key={key} className="flex items-center justify-between">
                      <span className="text-sm text-gray-600 capitalize">{key.replace('_', ' ')}</span>
                      <div className="flex items-center space-x-2">
                        <div className="w-20 bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-orange-500 h-2 rounded-full" 
                            style={{ width: `${value}%` }}
                          ></div>
                        </div>
                        <span className="text-sm font-medium text-gray-800">{value}%</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Recent Statements */}
              <div className="mb-6">
                <h4 className="font-medium text-gray-800 mb-3">Recent Statements</h4>
                <div className="space-y-2">
                  {leader.recent_statements.slice(0, 2).map((statement, index) => (
                    <div key={index} className="text-sm border-l-4 border-gray-200 pl-3 py-1">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-gray-500">{statement.date}</span>
                        <span className={`px-2 py-1 text-xs rounded-full ${
                          statement.sentiment === 'positive' ? 'bg-green-100 text-green-800' :
                          'bg-red-100 text-red-800'
                        }`}>
                          {statement.sentiment}
                        </span>
                      </div>
                      <p className="text-gray-700">{statement.statement}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Contact & Constituency Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-gray-200">
                <div>
                  <h5 className="font-medium text-gray-800 mb-2">Constituency Status</h5>
                  <div className="space-y-1 text-sm">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Strength</span>
                      <span className={`font-medium ${
                        leader.constituency_strength === 'Very Strong' ? 'text-green-600' :
                        leader.constituency_strength === 'Strong' ? 'text-yellow-600' :
                        'text-red-600'
                      }`}>
                        {leader.constituency_strength}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Approval</span>
                      <span className="font-medium text-gray-800">{leader.approval}%</span>
                    </div>
                  </div>
                </div>
                <div>
                  <h5 className="font-medium text-gray-800 mb-2">Last Election</h5>
                  <p className="text-sm text-gray-600">{leader.last_election_margin}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Detailed Analysis */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Party-wise Performance */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Party-wise Leader Performance</h3>
          <div className="space-y-4">
            {['BJP', 'Samajwadi Party', 'Congress', 'BSP'].map(party => {
              const partyLeaders = leaders.filter(l => l.party === party);
              const avgSentiment = partyLeaders.reduce((sum, l) => sum + l.sentiment, 0) / partyLeaders.length || 0;
              const avgInfluence = partyLeaders.reduce((sum, l) => sum + l.influence, 0) / partyLeaders.length || 0;
              
              return (
                <div key={party} className="p-4 border border-gray-200 rounded-lg">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="font-medium text-gray-800">{party}</h4>
                    <span className="text-sm text-gray-500">{partyLeaders.length} leaders</span>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <span className="text-sm text-gray-600">Avg Sentiment</span>
                      <div className="flex items-center space-x-2">
                        <div className="w-16 bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-green-500 h-2 rounded-full" 
                            style={{ width: `${avgSentiment}%` }}
                          ></div>
                        </div>
                        <span className="text-sm font-medium">{avgSentiment.toFixed(0)}%</span>
                      </div>
                    </div>
                    <div>
                      <span className="text-sm text-gray-600">Avg Influence</span>
                      <div className="flex items-center space-x-2">
                        <div className="w-16 bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-orange-500 h-2 rounded-full" 
                            style={{ width: `${avgInfluence}%` }}
                          ></div>
                        </div>
                        <span className="text-sm font-medium">{avgInfluence.toFixed(0)}%</span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Rising Stars */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Activity Insights</h3>
          <div className="space-y-4">
            <div className="p-4 bg-green-50 rounded-lg">
              <div className="flex items-center space-x-2 mb-2">
                <TrendingUp className="w-5 h-5 text-green-600" />
                <h4 className="font-medium text-green-800">Most Active</h4>
              </div>
              <p className="text-sm text-green-700">Yogi Adityanath leads with 45K mentions this month</p>
            </div>
            <div className="p-4 bg-blue-50 rounded-lg">
              <div className="flex items-center space-x-2 mb-2">
                <MessageCircle className="w-5 h-5 text-blue-600" />
                <h4 className="font-medium text-blue-800">Social Media Leader</h4>
              </div>
              <p className="text-sm text-blue-700">Akhilesh Yadav has highest engagement rate among opposition</p>
            </div>
            <div className="p-4 bg-orange-50 rounded-lg">
              <div className="flex items-center space-x-2 mb-2">
                <Award className="w-5 h-5 text-orange-600" />
                <h4 className="font-medium text-orange-800">Top Performer</h4>
              </div>
              <p className="text-sm text-orange-700">Brajesh Pathak shows highest constituency satisfaction</p>
            </div>
            <div className="p-4 bg-purple-50 rounded-lg">
              <div className="flex items-center space-x-2 mb-2">
                <Eye className="w-5 h-5 text-purple-600" />
                <h4 className="font-medium text-purple-800">Media Focus</h4>
              </div>
              <p className="text-sm text-purple-700">Opposition leaders getting 40% of total political coverage</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeaderProfiles;