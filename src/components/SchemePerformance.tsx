import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from 'recharts';
import { Award, TrendingUp, Users, MapPin, Target, CheckCircle, Clock, AlertCircle } from 'lucide-react';

const SchemePerformance: React.FC = () => {
  const [selectedScheme, setSelectedScheme] = useState('all');
  const [timeFilter, setTimeFilter] = useState('30days');

  const schemes = [
    {
      id: 1,
      name: 'PM Awas Yojana',
      category: 'Housing',
      type: 'Central',
      target: 250000,
      achieved: 185000,
      beneficiaries: 185000,
      budget_allocated: 50000,
      budget_utilized: 37000,
      completion_rate: 74,
      satisfaction_score: 85,
      districts_covered: 75,
      complaints: 2400,
      resolved_complaints: 2100,
      status: 'On Track',
      launch_date: '2019-01-01',
      constituencies_performance: [
        { name: 'Lucknow', target: 5000, achieved: 4200 },
        { name: 'Varanasi', target: 4500, achieved: 3800 },
        { name: 'Gorakhpur', target: 4000, achieved: 3400 },
        { name: 'Agra', target: 6000, achieved: 4100 },
        { name: 'Kanpur', target: 5500, achieved: 3900 },
      ]
    },
    {
      id: 2,
      name: 'Ujjwala Yojana',
      category: 'Energy',
      type: 'Central',
      target: 500000,
      achieved: 445000,
      beneficiaries: 445000,
      budget_allocated: 25000,
      budget_utilized: 22250,
      completion_rate: 89,
      satisfaction_score: 92,
      districts_covered: 75,
      complaints: 1200,
      resolved_complaints: 1150,
      status: 'Excellent',
      launch_date: '2016-05-01',
      constituencies_performance: [
        { name: 'Lucknow', target: 8000, achieved: 7600 },
        { name: 'Varanasi', target: 7500, achieved: 7200 },
        { name: 'Gorakhpur', target: 7000, achieved: 6800 },
        { name: 'Agra', target: 9000, achieved: 8100 },
        { name: 'Kanpur', target: 8500, achieved: 7800 },
      ]
    },
    {
      id: 3,
      name: 'PM Surya Ghar Yojana',
      category: 'Energy',
      type: 'Central',
      target: 50000,
      achieved: 18500,
      beneficiaries: 18500,
      budget_allocated: 15000,
      budget_utilized: 5550,
      completion_rate: 37,
      satisfaction_score: 78,
      districts_covered: 45,
      complaints: 850,
      resolved_complaints: 720,
      status: 'Behind Schedule',
      launch_date: '2023-02-01',
      constituencies_performance: [
        { name: 'Lucknow', target: 1200, achieved: 450 },
        { name: 'Varanasi', target: 1000, achieved: 380 },
        { name: 'Gorakhpur', target: 800, achieved: 290 },
        { name: 'Agra', target: 1500, achieved: 520 },
        { name: 'Kanpur', target: 1300, achieved: 480 },
      ]
    },
    {
      id: 4,
      name: 'Ayushman Bharat',
      category: 'Healthcare',
      type: 'Central',
      target: 1000000,
      achieved: 750000,
      beneficiaries: 750000,
      budget_allocated: 80000,
      budget_utilized: 60000,
      completion_rate: 75,
      satisfaction_score: 88,
      districts_covered: 75,
      complaints: 5600,
      resolved_complaints: 4900,
      status: 'On Track',
      launch_date: '2018-09-23',
      constituencies_performance: [
        { name: 'Lucknow', target: 20000, achieved: 16000 },
        { name: 'Varanasi', target: 18000, achieved: 14500 },
        { name: 'Gorakhpur', target: 15000, achieved: 12200 },
        { name: 'Agra', target: 22000, achieved: 16800 },
        { name: 'Kanpur', target: 25000, achieved: 18500 },
      ]
    },
    {
      id: 5,
      name: 'UP Mukhyamantri Kisan Evam Sarvhit Bima Yojana',
      category: 'Agriculture',
      type: 'State',
      target: 200000,
      achieved: 165000,
      beneficiaries: 165000,
      budget_allocated: 12000,
      budget_utilized: 9900,
      completion_rate: 82.5,
      satisfaction_score: 79,
      districts_covered: 70,
      complaints: 1800,
      resolved_complaints: 1620,
      status: 'Good',
      launch_date: '2020-01-15',
      constituencies_performance: [
        { name: 'Lucknow', target: 4000, achieved: 3400 },
        { name: 'Varanasi', target: 3500, achieved: 2950 },
        { name: 'Gorakhpur', target: 4500, achieved: 3800 },
        { name: 'Agra', target: 3000, achieved: 2450 },
        { name: 'Kanpur', target: 3200, achieved: 2680 },
      ]
    },
    {
      id: 6,
      name: 'Kisan Samman Nidhi',
      category: 'Agriculture',
      type: 'Central',
      target: 2200000,
      achieved: 2050000,
      beneficiaries: 2050000,
      budget_allocated: 44000,
      budget_utilized: 41000,
      completion_rate: 93,
      satisfaction_score: 91,
      districts_covered: 75,
      complaints: 8900,
      resolved_complaints: 8200,
      status: 'Excellent',
      launch_date: '2019-02-24',
      constituencies_performance: [
        { name: 'Lucknow', target: 45000, achieved: 42500 },
        { name: 'Varanasi', target: 40000, achieved: 38000 },
        { name: 'Gorakhpur', target: 50000, achieved: 47500 },
        { name: 'Agra', target: 35000, achieved: 32800 },
        { name: 'Kanpur', target: 38000, achieved: 35600 },
      ]
    }
  ];

  const schemeCategories = [
    { value: 'all', label: 'All Schemes' },
    { value: 'Housing', label: 'Housing' },
    { value: 'Energy', label: 'Energy' },
    { value: 'Healthcare', label: 'Healthcare' },
    { value: 'Agriculture', label: 'Agriculture' },
    { value: 'Education', label: 'Education' },
    { value: 'Employment', label: 'Employment' },
  ];

  const timeFilters = [
    { value: 'today', label: 'Today' },
    { value: '7days', label: 'Last 7 Days' },
    { value: '30days', label: 'Last 30 Days' },
    { value: '90days', label: 'Last 90 Days' },
  ];

  const filteredSchemes = selectedScheme === 'all' ? schemes : 
    schemes.filter(scheme => scheme.category === selectedScheme);

  const overallStats = {
    totalSchemes: filteredSchemes.length,
    totalBeneficiaries: filteredSchemes.reduce((sum, scheme) => sum + scheme.beneficiaries, 0),
    totalBudget: filteredSchemes.reduce((sum, scheme) => sum + scheme.budget_allocated, 0),
    totalUtilized: filteredSchemes.reduce((sum, scheme) => sum + scheme.budget_utilized, 0),
    avgCompletion: filteredSchemes.reduce((sum, scheme) => sum + scheme.completion_rate, 0) / filteredSchemes.length || 0,
    avgSatisfaction: filteredSchemes.reduce((sum, scheme) => sum + scheme.satisfaction_score, 0) / filteredSchemes.length || 0,
  };

  const performanceData = filteredSchemes.map(scheme => ({
    name: scheme.name.length > 15 ? scheme.name.substring(0, 15) + '...' : scheme.name,
    completion: scheme.completion_rate,
    satisfaction: scheme.satisfaction_score,
    beneficiaries: scheme.beneficiaries / 1000, // Convert to thousands
  }));

  const statusDistribution = [
    { name: 'Excellent', value: filteredSchemes.filter(s => s.status === 'Excellent').length, color: '#22c55e' },
    { name: 'Good', value: filteredSchemes.filter(s => s.status === 'Good').length, color: '#84cc16' },
    { name: 'On Track', value: filteredSchemes.filter(s => s.status === 'On Track').length, color: '#f59e0b' },
    { name: 'Behind Schedule', value: filteredSchemes.filter(s => s.status === 'Behind Schedule').length, color: '#ef4444' },
  ];

  const monthlyTrends = [
    { month: 'Oct 2023', completion: 68, satisfaction: 82 },
    { month: 'Nov 2023', completion: 71, satisfaction: 84 },
    { month: 'Dec 2023', completion: 74, satisfaction: 85 },
    { month: 'Jan 2024', completion: 77, satisfaction: 86 },
  ];

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Scheme Performance Analysis</h2>
          <p className="text-gray-600">Track implementation and impact of government schemes across UP</p>
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
            value={selectedScheme} 
            onChange={(e) => setSelectedScheme(e.target.value)}
            className="border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-orange-500"
          >
            {schemeCategories.map(category => (
              <option key={category.value} value={category.value}>
                {category.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Overall Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Total Schemes</p>
              <p className="text-2xl font-bold text-gray-800">{overallStats.totalSchemes}</p>
            </div>
            <Award className="w-8 h-8 text-blue-500" />
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Beneficiaries</p>
              <p className="text-2xl font-bold text-green-600">{(overallStats.totalBeneficiaries / 1000000).toFixed(1)}M</p>
            </div>
            <Users className="w-8 h-8 text-green-500" />
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Budget Allocated</p>
              <p className="text-2xl font-bold text-purple-600">₹{overallStats.totalBudget / 1000}K Cr</p>
            </div>
            <Target className="w-8 h-8 text-purple-500" />
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Budget Utilized</p>
              <p className="text-2xl font-bold text-orange-600">₹{overallStats.totalUtilized / 1000}K Cr</p>
            </div>
            <CheckCircle className="w-8 h-8 text-orange-500" />
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Avg Completion</p>
              <p className="text-2xl font-bold text-indigo-600">{overallStats.avgCompletion.toFixed(0)}%</p>
            </div>
            <TrendingUp className="w-8 h-8 text-indigo-500" />
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Avg Satisfaction</p>
              <p className="text-2xl font-bold text-pink-600">{overallStats.avgSatisfaction.toFixed(0)}%</p>
            </div>
            <Award className="w-8 h-8 text-pink-500" />
          </div>
        </div>
      </div>

      {/* Performance Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Completion vs Satisfaction */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Scheme Performance Overview</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={performanceData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="completion" fill="#f97316" name="Completion %" />
              <Bar dataKey="satisfaction" fill="#22c55e" name="Satisfaction %" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Status Distribution */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Scheme Status Distribution</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={statusDistribution}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={120}
                paddingAngle={5}
                dataKey="value"
              >
                {statusDistribution.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
          <div className="grid grid-cols-2 gap-4 mt-4">
            {statusDistribution.map((item, index) => (
              <div key={index} className="flex items-center space-x-2">
                <div className="w-4 h-4 rounded-full" style={{ backgroundColor: item.color }}></div>
                <span className="text-sm text-gray-600">{item.name}: {item.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Trends Analysis */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Performance Trends Over Time</h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={monthlyTrends}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="completion" stroke="#f97316" strokeWidth={3} name="Avg Completion %" />
            <Line type="monotone" dataKey="satisfaction" stroke="#22c55e" strokeWidth={3} name="Avg Satisfaction %" />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Detailed Scheme Cards */}
      <div className="space-y-6">
        <h3 className="text-lg font-semibold text-gray-800">Detailed Scheme Analysis</h3>
        <div className="grid grid-cols-1 gap-6">
          {filteredSchemes.map((scheme) => (
            <div key={scheme.id} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
              <div className="p-6">
                {/* Scheme Header */}
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h4 className="text-xl font-bold text-gray-800">{scheme.name}</h4>
                    <div className="flex items-center space-x-4 mt-2">
                      <span className={`px-3 py-1 text-sm font-medium rounded-full ${
                        scheme.type === 'Central' ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'
                      }`}>
                        {scheme.type} Scheme
                      </span>
                      <span className="px-3 py-1 text-sm font-medium rounded-full bg-gray-100 text-gray-800">
                        {scheme.category}
                      </span>
                      <span className={`px-3 py-1 text-sm font-medium rounded-full ${
                        scheme.status === 'Excellent' ? 'bg-green-100 text-green-800' :
                        scheme.status === 'Good' ? 'bg-yellow-100 text-yellow-800' :
                        scheme.status === 'On Track' ? 'bg-blue-100 text-blue-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {scheme.status}
                      </span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-3xl font-bold text-orange-600">{scheme.completion_rate}%</div>
                    <div className="text-sm text-gray-500">Completion Rate</div>
                  </div>
                </div>

                {/* Key Metrics Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 mb-6">
                  <div className="text-center p-3 bg-gray-50 rounded-lg">
                    <div className="text-lg font-bold text-gray-800">{scheme.beneficiaries.toLocaleString()}</div>
                    <div className="text-xs text-gray-500">Beneficiaries</div>
                  </div>
                  <div className="text-center p-3 bg-gray-50 rounded-lg">
                    <div className="text-lg font-bold text-gray-800">₹{scheme.budget_allocated / 1000}K Cr</div>
                    <div className="text-xs text-gray-500">Budget</div>
                  </div>
                  <div className="text-center p-3 bg-gray-50 rounded-lg">
                    <div className="text-lg font-bold text-gray-800">{scheme.satisfaction_score}%</div>
                    <div className="text-xs text-gray-500">Satisfaction</div>
                  </div>
                  <div className="text-center p-3 bg-gray-50 rounded-lg">
                    <div className="text-lg font-bold text-gray-800">{scheme.districts_covered}</div>
                    <div className="text-xs text-gray-500">Districts</div>
                  </div>
                  <div className="text-center p-3 bg-gray-50 rounded-lg">
                    <div className="text-lg font-bold text-gray-800">{scheme.complaints}</div>
                    <div className="text-xs text-gray-500">Complaints</div>
                  </div>
                  <div className="text-center p-3 bg-gray-50 rounded-lg">
                    <div className="text-lg font-bold text-gray-800">{((scheme.resolved_complaints / scheme.complaints) * 100).toFixed(0)}%</div>
                    <div className="text-xs text-gray-500">Resolved</div>
                  </div>
                </div>

                {/* Progress Bars */}
                <div className="mb-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-gray-600">Target Achievement</span>
                    <span className="text-sm font-medium text-gray-800">{scheme.achieved.toLocaleString()} / {scheme.target.toLocaleString()}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div 
                      className="bg-orange-500 h-3 rounded-full" 
                      style={{ width: `${(scheme.achieved / scheme.target) * 100}%` }}
                    ></div>
                  </div>
                </div>

                <div className="mb-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-gray-600">Budget Utilization</span>
                    <span className="text-sm font-medium text-gray-800">₹{scheme.budget_utilized / 1000}K Cr / ₹{scheme.budget_allocated / 1000}K Cr</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div 
                      className="bg-green-500 h-3 rounded-full" 
                      style={{ width: `${(scheme.budget_utilized / scheme.budget_allocated) * 100}%` }}
                    ></div>
                  </div>
                </div>

                {/* Constituency Performance */}
                <div>
                  <h5 className="font-medium text-gray-800 mb-3">Top Constituency Performance</h5>
                  <ResponsiveContainer width="100%" height={200}>
                    <BarChart data={scheme.constituencies_performance}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="achieved" fill="#f97316" name="Achieved" />
                      <Bar dataKey="target" fill="#fed7aa" name="Target" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recommendations */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Performance Insights & Recommendations</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="p-4 bg-green-50 rounded-lg">
            <div className="flex items-center space-x-2 mb-2">
              <CheckCircle className="w-5 h-5 text-green-600" />
              <h4 className="font-medium text-green-800">High Performers</h4>
            </div>
            <p className="text-sm text-green-700">Ujjwala Yojana and Kisan Samman Nidhi showing excellent results with 89%+ completion rates</p>
          </div>
          <div className="p-4 bg-yellow-50 rounded-lg">
            <div className="flex items-center space-x-2 mb-2">
              <Clock className="w-5 h-5 text-yellow-600" />
              <h4 className="font-medium text-yellow-800">Needs Attention</h4>
            </div>
            <p className="text-sm text-yellow-700">PM Surya Ghar Yojana requires accelerated implementation with only 37% completion</p>
          </div>
          <div className="p-4 bg-blue-50 rounded-lg">
            <div className="flex items-center space-x-2 mb-2">
              <AlertCircle className="w-5 h-5 text-blue-600" />
              <h4 className="font-medium text-blue-800">Opportunity</h4>
            </div>
            <p className="text-sm text-blue-700">High satisfaction scores across schemes indicate strong public acceptance and delivery quality</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SchemePerformance;