import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from 'recharts';
import { Users, MapPin, TrendingUp, Award, Calendar, FileText, AlertCircle, CheckCircle, Clock, Phone, Mail, Star, Flag, Building, Zap, Car, Factory, Shield, Home } from 'lucide-react';

const ConstituencyDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [activeTab, setActiveTab] = useState('overview');

  // Sample constituency data
  const constituency = {
    name: 'Lucknow Cantt',
    number: 'AC-157',
    population: 250000,
    voters: 180000,
    bjpStrength: 85,
    currentMLA: 'Suresh Tiwari',
    party: 'BJP',
    margin: 15000,
    lastElection: '2022',
    lokSabhaConstituency: 'Lucknow',
    lokSabhaResult: 'BJP - Won by 2.5 lakh votes',
    totalBooths: 285,
    bjpStrongBooths: 195,
    totalVillages: 45,
    totalWards: 12,
  };

  const demographicData = [
    { name: 'Hindu', value: 70, color: '#f97316' },
    { name: 'Muslim', value: 20, color: '#10b981' },
    { name: 'Others', value: 10, color: '#6b7280' },
  ];

  const casteData = [
    { name: 'General', value: 40, color: '#8b5cf6' },
    { name: 'OBC', value: 35, color: '#f59e0b' },
    { name: 'SC', value: 15, color: '#06b6d4' },
    { name: 'ST', value: 10, color: '#84cc16' },
  ];

  const schemeData = [
    { scheme: 'PM Awas Yojana', beneficiaries: 2000, target: 2500, percentage: 80 },
    { scheme: 'Ujjwala Yojana', beneficiaries: 5000, target: 5500, percentage: 91 },
    { scheme: 'PM Surya Ghar', beneficiaries: 300, target: 500, percentage: 60 },
    { scheme: 'Ayushman Bharat', beneficiaries: 8000, target: 10000, percentage: 80 },
    { scheme: 'Kisan Samman Nidhi', beneficiaries: 1200, target: 1500, percentage: 80 },
  ];

  const electionResults = [
    { year: '2022', bjp: 45000, sp: 30000, congress: 8000, bsp: 12000, others: 5000 },
    { year: '2017', bjp: 42000, sp: 35000, congress: 10000, bsp: 15000, others: 8000 },
  ];

  const issues = [
    { 
      title: 'Traffic Congestion', 
      priority: 'High', 
      description: 'Major traffic jams during peak hours at main intersections',
      status: 'Pending',
      affectedAreas: 'Hazratganj, Aminabad, Charbagh',
      solutions: 'Flyover construction, traffic signal optimization'
    },
    { 
      title: 'Water Supply', 
      priority: 'Medium', 
      description: 'Irregular water supply in some residential areas',
      status: 'In Progress',
      affectedAreas: 'Sector 5, 7, 12',
      solutions: 'New water treatment plant, pipeline upgrades'
    },
    { 
      title: 'Street Lighting', 
      priority: 'Low', 
      description: 'Insufficient street lighting in outer areas',
      status: 'Completed',
      affectedAreas: 'Rural areas, new colonies',
      solutions: 'LED street light installation'
    },
    { 
      title: 'Railway Level Crossing', 
      priority: 'High', 
      description: 'Overbridge promised but not constructed, causing traffic delays',
      status: 'Delayed',
      affectedAreas: 'Near Railway Station',
      solutions: 'Overbridge construction - promised in 2020'
    },
    { 
      title: 'Industrial Development', 
      priority: 'Medium', 
      description: 'Need for new industrial area to boost employment',
      status: 'Planning',
      affectedAreas: 'Outskirts of constituency',
      solutions: 'Industrial park development'
    },
  ];

  const recentNews = [
    { 
      title: 'New Metro Line Announced for Lucknow Cantt', 
      date: '2024-01-15', 
      sentiment: 'positive',
      source: 'Times of India',
      views: 25000,
      tags: ['Infrastructure', 'Metro', 'Yogi Adityanath']
    },
    { 
      title: 'Road Infrastructure Development Project Launched', 
      date: '2024-01-14', 
      sentiment: 'positive',
      source: 'Hindustan Times',
      views: 18000,
      tags: ['Roads', 'Development', 'BJP']
    },
    { 
      title: 'Healthcare Facility Upgrade Completed', 
      date: '2024-01-13', 
      sentiment: 'positive',
      source: 'Indian Express',
      views: 15000,
      tags: ['Healthcare', 'Ayushman Bharat']
    },
    { 
      title: 'Traffic Management Issues Raised by Residents', 
      date: '2024-01-12', 
      sentiment: 'negative',
      source: 'Amar Ujala',
      views: 12000,
      tags: ['Traffic', 'Issues', 'Residents']
    },
    { 
      title: 'Employment Generation Program Launched', 
      date: '2024-01-11', 
      sentiment: 'positive',
      source: 'Dainik Jagran',
      views: 20000,
      tags: ['Employment', 'Skill Development']
    },
  ];

  const socialMediaPosts = [
    {
      platform: 'Twitter',
      content: 'Great progress on road development in Lucknow Cantt! #Development #BJP',
      author: '@SureshTiwariMLA',
      engagement: 1500,
      sentiment: 'positive',
      time: '2 hours ago'
    },
    {
      platform: 'Facebook',
      content: 'Attended public meeting to discuss water supply issues',
      author: 'Suresh Tiwari',
      engagement: 2200,
      sentiment: 'neutral',
      time: '6 hours ago'
    },
    {
      platform: 'Instagram',
      content: 'Inaugurated new health center in the constituency',
      author: '@suresh_tiwari_official',
      engagement: 1800,
      sentiment: 'positive',
      time: '1 day ago'
    },
  ];

  const parties = [
    { name: 'BJP', leader: 'Suresh Tiwari', strength: 85, seats: 1 },
    { name: 'Samajwadi Party', leader: 'Rajesh Kumar', strength: 25, seats: 0 },
    { name: 'Congress', leader: 'Priya Sharma', strength: 15, seats: 0 },
    { name: 'BSP', leader: 'Ramesh Singh', strength: 20, seats: 0 },
  ];

  const topLeaders = [
    {
      name: 'Suresh Tiwari',
      party: 'BJP',
      position: 'Current MLA',
      experience: '15 years',
      education: 'MBA',
      age: 52,
      contact: { phone: '+91-9876543210', email: 'suresh.tiwari@bjp.org' }
    },
    {
      name: 'Rajesh Kumar',
      party: 'SP',
      position: 'Former MLA',
      experience: '12 years',
      education: 'MA Political Science',
      age: 48,
      contact: { phone: '+91-9876543211', email: 'rajesh.kumar@sp.org' }
    },
    {
      name: 'Priya Sharma',
      party: 'Congress',
      position: 'District President',
      experience: '8 years',
      education: 'LLB',
      age: 45,
      contact: { phone: '+91-9876543212', email: 'priya.sharma@inc.org' }
    },
  ];

  const bjpCandidates = [
    {
      name: 'Amit Verma',
      status: 'Active',
      groundWork: 'Excellent',
      positives: ['Strong grassroots connect', 'Clean image', 'Good orator'],
      negatives: ['New to politics', 'Limited resources'],
      criminalCases: 0,
      sentiment: 'Positive',
      voteImpact: 'High'
    },
    {
      name: 'Sunita Gupta',
      status: 'Moderately Active',
      groundWork: 'Good',
      positives: ['Women empowerment work', 'Social service background'],
      negatives: ['Limited political experience', 'Factional issues'],
      criminalCases: 0,
      sentiment: 'Neutral',
      voteImpact: 'Medium'
    },
    {
      name: 'Vikash Singh',
      status: 'Less Active',
      groundWork: 'Average',
      positives: ['Business background', 'Financial resources'],
      negatives: ['Controversial past', 'Limited public appeal'],
      criminalCases: 2,
      sentiment: 'Mixed',
      voteImpact: 'Low'
    },
  ];

  const villages = [
    { name: 'Malihabad', pradhan: 'Ram Singh', party: 'BJP', population: 5000 },
    { name: 'Kakori', pradhan: 'Shyam Lal', party: 'SP', population: 4500 },
    { name: 'Mohanlalganj', pradhan: 'Geeta Devi', party: 'BJP', population: 6000 },
    { name: 'Gosainganj', pradhan: 'Mukesh Kumar', party: 'BJP', population: 3500 },
  ];

  const wards = [
    { number: 1, parshad: 'Anita Singh', party: 'BJP', area: 'Central Area' },
    { number: 2, parshad: 'Rajesh Gupta', party: 'SP', area: 'East Zone' },
    { number: 3, parshad: 'Sunita Sharma', party: 'BJP', area: 'West Zone' },
    { number: 4, parshad: 'Vinod Kumar', party: 'BJP', area: 'North Area' },
  ];

  const oppositionLeaders = [
    {
      name: 'Rajesh Kumar (SP)',
      strength: 'High',
      pullPotential: 'Medium',
      reasons: ['Strong local connect', 'Good track record'],
      challenges: ['Ideological differences', 'Party loyalty']
    },
    {
      name: 'Priya Sharma (Congress)',
      strength: 'Medium',
      pullPotential: 'High',
      reasons: ['Educated background', 'Women representation'],
      challenges: ['Congress decline', 'Local issues']
    },
  ];

  const trendingTopics = [
    { topic: 'Metro Development', mentions: 2500, sentiment: 'positive' },
    { topic: 'Road Infrastructure', mentions: 1800, sentiment: 'positive' },
    { topic: 'Water Supply', mentions: 1200, sentiment: 'negative' },
    { topic: 'Healthcare', mentions: 900, sentiment: 'positive' },
    { topic: 'Employment', mentions: 1500, sentiment: 'neutral' },
  ];

  const tabs = [
    { id: 'overview', label: 'Overview', icon: Home },
    { id: 'demographics', label: 'Demographics', icon: Users },
    { id: 'elections', label: 'Elections', icon: Award },
    { id: 'issues', label: 'Issues', icon: AlertCircle },
    { id: 'schemes', label: 'Schemes', icon: CheckCircle },
    { id: 'leaders', label: 'Leaders', icon: Star },
    { id: 'media', label: 'Media', icon: FileText },
    { id: 'infrastructure', label: 'Infrastructure', icon: Building },
  ];

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-orange-500 to-orange-600 text-white p-6 rounded-xl">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">{constituency.name}</h1>
            <p className="text-orange-100 mt-2">
              {constituency.number} • {constituency.population.toLocaleString()} Population • 
              Lok Sabha: {constituency.lokSabhaConstituency}
            </p>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold">{constituency.bjpStrength}%</div>
            <div className="text-orange-100">BJP Strength</div>
          </div>
        </div>
      </div>

      {/* Basic Info Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="flex items-center space-x-3">
            <Users className="w-8 h-8 text-blue-500" />
            <div>
              <p className="text-sm text-gray-500">Total Voters</p>
              <p className="text-xl font-bold">{constituency.voters.toLocaleString()}</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="flex items-center space-x-3">
            <Award className="w-8 h-8 text-green-500" />
            <div>
              <p className="text-sm text-gray-500">Current MLA</p>
              <p className="text-xl font-bold">{constituency.currentMLA}</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="flex items-center space-x-3">
            <TrendingUp className="w-8 h-8 text-orange-500" />
            <div>
              <p className="text-sm text-gray-500">Victory Margin</p>
              <p className="text-xl font-bold">{constituency.margin.toLocaleString()}</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="flex items-center space-x-3">
            <Calendar className="w-8 h-8 text-purple-500" />
            <div>
              <p className="text-sm text-gray-500">Last Election</p>
              <p className="text-xl font-bold">{constituency.lastElection}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-4 px-2 border-b-2 font-medium text-sm flex items-center space-x-2 ${
                  activeTab === tab.id
                    ? 'border-orange-500 text-orange-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <tab.icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            ))}
          </nav>
        </div>

        <div className="p-6">
          {/* Overview Tab */}
          {activeTab === 'overview' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">Constituency Summary</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Total Booths</span>
                      <span className="font-medium">{constituency.totalBooths}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">BJP Strong Booths</span>
                      <span className="font-medium text-green-600">{constituency.bjpStrongBooths}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Total Villages</span>
                      <span className="font-medium">{constituency.totalVillages}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Total Wards</span>
                      <span className="font-medium">{constituency.totalWards}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Lok Sabha Result</span>
                      <span className="font-medium text-orange-600">{constituency.lokSabhaResult}</span>
                    </div>
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">Top Trending Topics</h3>
                  <div className="space-y-3">
                    {trendingTopics.map((topic, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <span className="font-medium">{topic.topic}</span>
                        <div className="flex items-center space-x-2">
                          <span className="text-sm text-gray-500">{topic.mentions} mentions</span>
                          <span className={`px-2 py-1 text-xs rounded-full ${
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
                </div>
              </div>
            </div>
          )}

          {/* Demographics Tab */}
          {activeTab === 'demographics' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">Religious Demographics</h3>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={demographicData}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={120}
                        paddingAngle={5}
                        dataKey="value"
                      >
                        {demographicData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                  <div className="grid grid-cols-2 gap-4 mt-4">
                    {demographicData.map((item, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <div className="w-4 h-4 rounded-full" style={{ backgroundColor: item.color }}></div>
                        <span className="text-sm text-gray-600">{item.name}: {item.value}%</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">Caste Demographics</h3>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={casteData}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={120}
                        paddingAngle={5}
                        dataKey="value"
                      >
                        {casteData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                  <div className="grid grid-cols-2 gap-4 mt-4">
                    {casteData.map((item, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <div className="w-4 h-4 rounded-full" style={{ backgroundColor: item.color }}></div>
                        <span className="text-sm text-gray-600">{item.name}: {item.value}%</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Village/Ward Details */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">Village Pradhans</h3>
                  <div className="space-y-3">
                    {villages.map((village, index) => (
                      <div key={index} className="p-4 border border-gray-200 rounded-lg">
                        <div className="flex justify-between items-center mb-2">
                          <h4 className="font-medium">{village.name}</h4>
                          <span className={`px-2 py-1 text-xs rounded-full ${
                            village.party === 'BJP' ? 'bg-orange-100 text-orange-800' :
                            village.party === 'SP' ? 'bg-red-100 text-red-800' :
                            'bg-gray-100 text-gray-800'
                          }`}>
                            {village.party}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600">Pradhan: {village.pradhan}</p>
                        <p className="text-sm text-gray-500">Population: {village.population.toLocaleString()}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">Ward Parshads</h3>
                  <div className="space-y-3">
                    {wards.map((ward, index) => (
                      <div key={index} className="p-4 border border-gray-200 rounded-lg">
                        <div className="flex justify-between items-center mb-2">
                          <h4 className="font-medium">Ward {ward.number}</h4>
                          <span className={`px-2 py-1 text-xs rounded-full ${
                            ward.party === 'BJP' ? 'bg-orange-100 text-orange-800' :
                            ward.party === 'SP' ? 'bg-red-100 text-red-800' :
                            'bg-gray-100 text-gray-800'
                          }`}>
                            {ward.party}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600">Parshad: {ward.parshad}</p>
                        <p className="text-sm text-gray-500">Area: {ward.area}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Elections Tab */}
          {activeTab === 'elections' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Last Two Election Results</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={electionResults}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="year" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="bjp" fill="#f97316" name="BJP" />
                    <Bar dataKey="sp" fill="#dc2626" name="SP" />
                    <Bar dataKey="congress" fill="#19a3e1" name="Congress" />
                    <Bar dataKey="bsp" fill="#1e40af" name="BSP" />
                    <Bar dataKey="others" fill="#6b7280" name="Others" />
                  </BarChart>
                </ResponsiveContainer>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Party Presence</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {parties.map((party, index) => (
                    <div key={index} className="p-4 border border-gray-200 rounded-lg">
                      <h4 className="font-medium text-gray-800">{party.name}</h4>
                      <p className="text-sm text-gray-600 mt-1">Leader: {party.leader}</p>
                      <p className="text-sm text-gray-500">Strength: {party.strength}%</p>
                      <p className="text-sm text-gray-500">Seats: {party.seats}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Booth Analysis</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-4 bg-green-50 rounded-lg">
                    <h4 className="font-medium text-green-800">BJP Strong Booths</h4>
                    <p className="text-2xl font-bold text-green-600">{constituency.bjpStrongBooths}</p>
                    <p className="text-sm text-green-600">
                      {((constituency.bjpStrongBooths / constituency.totalBooths) * 100).toFixed(1)}% of total
                    </p>
                  </div>
                  <div className="p-4 bg-yellow-50 rounded-lg">
                    <h4 className="font-medium text-yellow-800">Swing Booths</h4>
                    <p className="text-2xl font-bold text-yellow-600">
                      {constituency.totalBooths - constituency.bjpStrongBooths - 30}
                    </p>
                    <p className="text-sm text-yellow-600">Need attention</p>
                  </div>
                  <div className="p-4 bg-red-50 rounded-lg">
                    <h4 className="font-medium text-red-800">Opposition Strong</h4>
                    <p className="text-2xl font-bold text-red-600">30</p>
                    <p className="text-sm text-red-600">Requires strategy</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Issues Tab */}
          {activeTab === 'issues' && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-800">Constituency Issues</h3>
              <div className="space-y-4">
                {issues.map((issue, index) => (
                  <div key={index} className="p-6 border border-gray-200 rounded-lg">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="text-lg font-medium text-gray-800">{issue.title}</h4>
                      <div className="flex items-center space-x-2">
                        <span className={`px-3 py-1 text-sm font-medium rounded-full ${
                          issue.priority === 'High' ? 'bg-red-100 text-red-800' :
                          issue.priority === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-green-100 text-green-800'
                        }`}>
                          {issue.priority} Priority
                        </span>
                        <span className={`px-3 py-1 text-sm font-medium rounded-full ${
                          issue.status === 'Completed' ? 'bg-green-100 text-green-800' :
                          issue.status === 'In Progress' ? 'bg-blue-100 text-blue-800' :
                          issue.status === 'Delayed' ? 'bg-red-100 text-red-800' :
                          'bg-gray-100 text-gray-800'
                        }`}>
                          {issue.status}
                        </span>
                      </div>
                    </div>
                    <p className="text-gray-600 mb-3">{issue.description}</p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="font-medium text-gray-700">Affected Areas:</span>
                        <p className="text-gray-600">{issue.affectedAreas}</p>
                      </div>
                      <div>
                        <span className="font-medium text-gray-700">Proposed Solutions:</span>
                        <p className="text-gray-600">{issue.solutions}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Schemes Tab */}
          {activeTab === 'schemes' && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-800">Scheme Performance</h3>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={schemeData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="scheme" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="beneficiaries" fill="#f97316" name="Beneficiaries" />
                  <Bar dataKey="target" fill="#fed7aa" name="Target" />
                </BarChart>
              </ResponsiveContainer>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {schemeData.map((scheme, index) => (
                  <div key={index} className="p-4 border border-gray-200 rounded-lg">
                    <h4 className="font-medium text-gray-800 mb-2">{scheme.scheme}</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Beneficiaries:</span>
                        <span className="font-medium">{scheme.beneficiaries.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Target:</span>
                        <span className="font-medium">{scheme.target.toLocaleString()}</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-orange-500 h-2 rounded-full" 
                          style={{ width: `${scheme.percentage}%` }}
                        ></div>
                      </div>
                      <div className="text-sm text-gray-600">{scheme.percentage}% completed</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Leaders Tab */}
          {activeTab === 'leaders' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Top Leaders</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {topLeaders.map((leader, index) => (
                    <div key={index} className="p-4 border border-gray-200 rounded-lg">
                      <h4 className="font-medium text-gray-800">{leader.name}</h4>
                      <p className="text-sm text-gray-600">{leader.party} • {leader.position}</p>
                      <div className="mt-3 space-y-1 text-sm">
                        <p><span className="font-medium">Experience:</span> {leader.experience}</p>
                        <p><span className="font-medium">Education:</span> {leader.education}</p>
                        <p><span className="font-medium">Age:</span> {leader.age}</p>
                        <div className="flex items-center space-x-2 mt-2">
                          <Phone className="w-4 h-4 text-gray-400" />
                          <span className="text-xs">{leader.contact.phone}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Mail className="w-4 h-4 text-gray-400" />
                          <span className="text-xs">{leader.contact.email}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Potential BJP Candidates</h3>
                <div className="space-y-4">
                  {bjpCandidates.map((candidate, index) => (
                    <div key={index} className="p-4 border border-gray-200 rounded-lg">
                      <div className="flex items-center justify-between mb-3">
                        <h4 className="font-medium text-gray-800">{candidate.name}</h4>
                        <div className="flex items-center space-x-2">
                          <span className={`px-2 py-1 text-xs rounded-full ${
                            candidate.status === 'Active' ? 'bg-green-100 text-green-800' :
                            candidate.status === 'Moderately Active' ? 'bg-yellow-100 text-yellow-800' :
                            'bg-red-100 text-red-800'
                          }`}>
                            {candidate.status}
                          </span>
                          <span className={`px-2 py-1 text-xs rounded-full ${
                            candidate.sentiment === 'Positive' ? 'bg-green-100 text-green-800' :
                            candidate.sentiment === 'Neutral' ? 'bg-gray-100 text-gray-800' :
                            'bg-red-100 text-red-800'
                          }`}>
                            {candidate.sentiment}
                          </span>
                        </div>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                        <div>
                          <p className="font-medium text-green-700 mb-1">Positives:</p>
                          <ul className="list-disc list-inside text-gray-600">
                            {candidate.positives.map((positive, idx) => (
                              <li key={idx}>{positive}</li>
                            ))}
                          </ul>
                        </div>
                        <div>
                          <p className="font-medium text-red-700 mb-1">Negatives:</p>
                          <ul className="list-disc list-inside text-gray-600">
                            {candidate.negatives.map((negative, idx) => (
                              <li key={idx}>{negative}</li>
                            ))}
                          </ul>
                        </div>
                      </div>
                      <div className="mt-3 flex items-center justify-between text-sm">
                        <span>Criminal Cases: <span className="font-medium">{candidate.criminalCases}</span></span>
                        <span>Vote Impact: <span className="font-medium">{candidate.voteImpact}</span></span>
                        <span>Ground Work: <span className="font-medium">{candidate.groundWork}</span></span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Opposition Leaders (Pull Potential)</h3>
                <div className="space-y-4">
                  {oppositionLeaders.map((leader, index) => (
                    <div key={index} className="p-4 border border-gray-200 rounded-lg">
                      <div className="flex items-center justify-between mb-3">
                        <h4 className="font-medium text-gray-800">{leader.name}</h4>
                        <div className="flex items-center space-x-2">
                          <span className={`px-2 py-1 text-xs rounded-full ${
                            leader.strength === 'High' ? 'bg-red-100 text-red-800' :
                            'bg-yellow-100 text-yellow-800'
                          }`}>
                            {leader.strength} Strength
                          </span>
                          <span className={`px-2 py-1 text-xs rounded-full ${
                            leader.pullPotential === 'High' ? 'bg-green-100 text-green-800' :
                            'bg-yellow-100 text-yellow-800'
                          }`}>
                            {leader.pullPotential} Pull Potential
                          </span>
                        </div>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                        <div>
                          <p className="font-medium text-green-700 mb-1">Reasons to Pull:</p>
                          <ul className="list-disc list-inside text-gray-600">
                            {leader.reasons.map((reason, idx) => (
                              <li key={idx}>{reason}</li>
                            ))}
                          </ul>
                        </div>
                        <div>
                          <p className="font-medium text-red-700 mb-1">Challenges:</p>
                          <ul className="list-disc list-inside text-gray-600">
                            {leader.challenges.map((challenge, idx) => (
                              <li key={idx}>{challenge}</li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Media Tab */}
          {activeTab === 'media' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Recent News</h3>
                <div className="space-y-4">
                  {recentNews.map((news, index) => (
                    <div key={index} className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50">
                      <div className="flex items-start justify-between mb-2">
                        <h4 className="font-medium text-gray-800 hover:text-orange-600 cursor-pointer">
                          {news.title}
                        </h4>
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                          news.sentiment === 'positive' ? 'bg-green-100 text-green-800' :
                          news.sentiment === 'negative' ? 'bg-red-100 text-red-800' :
                          'bg-gray-100 text-gray-800'
                        }`}>
                          {news.sentiment}
                        </span>
                      </div>
                      <div className="flex items-center space-x-4 text-sm text-gray-500 mb-2">
                        <span>{news.date}</span>
                        <span>{news.source}</span>
                        <span>{news.views.toLocaleString()} views</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        {news.tags.map((tag, tagIndex) => (
                          <span 
                            key={tagIndex}
                            className="px-2 py-1 text-xs bg-orange-100 text-orange-800 rounded-full"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Social Media Activity</h3>
                <div className="space-y-4">
                  {socialMediaPosts.map((post, index) => (
                    <div key={index} className="p-4 border border-gray-200 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center space-x-2">
                          <span className="font-medium">{post.author}</span>
                          <span className="text-sm text-gray-500">• {post.platform}</span>
                          <span className="text-sm text-gray-500">• {post.time}</span>
                        </div>
                        <span className={`px-2 py-1 text-xs rounded-full ${
                          post.sentiment === 'positive' ? 'bg-green-100 text-green-800' :
                          post.sentiment === 'negative' ? 'bg-red-100 text-red-800' :
                          'bg-gray-100 text-gray-800'
                        }`}>
                          {post.sentiment}
                        </span>
                      </div>
                      <p className="text-gray-700 mb-2">{post.content}</p>
                      <div className="text-sm text-gray-500">
                        {post.engagement.toLocaleString()} engagements
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Infrastructure Tab */}
          {activeTab === 'infrastructure' && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Infrastructure Status</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="p-4 border border-gray-200 rounded-lg">
                  <div className="flex items-center space-x-3 mb-3">
                    <Car className="w-6 h-6 text-blue-500" />
                    <h4 className="font-medium">Transportation</h4>
                  </div>
                  <ul className="text-sm space-y-1">
                    <li>• Metro connectivity: Under construction</li>
                    <li>• Bus routes: 15 active routes</li>
                    <li>• Railway station: 2 km away</li>
                    <li>• Airport: 25 km away</li>
                  </ul>
                </div>

                <div className="p-4 border border-gray-200 rounded-lg">
                  <div className="flex items-center space-x-3 mb-3">
                    <Zap className="w-6 h-6 text-yellow-500" />
                    <h4 className="font-medium">Utilities</h4>
                  </div>
                  <ul className="text-sm space-y-1">
                    <li>• Power supply: 18-20 hours</li>
                    <li>• Water supply: 6 hours daily</li>
                    <li>• Internet: 4G coverage 95%</li>
                    <li>• Sewage: 80% coverage</li>
                  </ul>
                </div>

                <div className="p-4 border border-gray-200 rounded-lg">
                  <div className="flex items-center space-x-3 mb-3">
                    <Factory className="w-6 h-6 text-green-500" />
                    <h4 className="font-medium">Economic</h4>
                  </div>
                  <ul className="text-sm space-y-1">
                    <li>• Industrial units: 45</li>
                    <li>• Employment rate: 78%</li>
                    <li>• Banks: 12 branches</li>
                    <li>• Markets: 8 major markets</li>
                  </ul>
                </div>

                <div className="p-4 border border-gray-200 rounded-lg">
                  <div className="flex items-center space-x-3 mb-3">
                    <Shield className="w-6 h-6 text-red-500" />
                    <h4 className="font-medium">Safety & Security</h4>
                  </div>
                  <ul className="text-sm space-y-1">
                    <li>• Police stations: 3</li>
                    <li>• Fire stations: 2</li>
                    <li>• CCTV coverage: 60%</li>
                    <li>• Crime rate: Low</li>
                  </ul>
                </div>

                <div className="p-4 border border-gray-200 rounded-lg">
                  <div className="flex items-center space-x-3 mb-3">
                    <Building className="w-6 h-6 text-purple-500" />
                    <h4 className="font-medium">Healthcare</h4>
                  </div>
                  <ul className="text-sm space-y-1">
                    <li>• Hospitals: 4 major</li>
                    <li>• Primary health centers: 8</li>
                    <li>• Private clinics: 25+</li>
                    <li>• Ambulance services: 24/7</li>
                  </ul>
                </div>

                <div className="p-4 border border-gray-200 rounded-lg">
                  <div className="flex items-center space-x-3 mb-3">
                    <Users className="w-6 h-6 text-indigo-500" />
                    <h4 className="font-medium">Education</h4>
                  </div>
                  <ul className="text-sm space-y-1">
                    <li>• Primary schools: 35</li>
                    <li>• Secondary schools: 15</li>
                    <li>• Colleges: 5</li>
                    <li>• Literacy rate: 82%</li>
                  </ul>
                </div>
              </div>

              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <h4 className="font-medium text-yellow-800 mb-2">Pending Infrastructure Projects</h4>
                <ul className="text-sm text-yellow-700 space-y-1">
                  <li>• Railway overbridge (Promised in 2020, still pending)</li>
                  <li>• New industrial area development</li>
                  <li>• Water treatment plant upgrade</li>
                  <li>• Smart city infrastructure</li>
                </ul>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ConstituencyDetail;