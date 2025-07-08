import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from 'recharts';
import { FileText, TrendingUp, Users, MapPin, Calendar, Filter } from 'lucide-react';

const SurveyData: React.FC = () => {
  const [selectedSurvey, setSelectedSurvey] = useState('all');

  const surveyData = [
    {
      id: 1,
      name: 'India Today-Axis My India',
      date: '2024-01-15',
      sampleSize: 15000,
      type: 'external',
      bjp: 45,
      sp: 32,
      congress: 8,
      bsp: 12,
      others: 3
    },
    {
      id: 2,
      name: 'C-Voter Survey',
      date: '2024-01-10',
      sampleSize: 12000,
      type: 'external',
      bjp: 47,
      sp: 30,
      congress: 9,
      bsp: 11,
      others: 3
    },
    {
      id: 3,
      name: 'ABP-CVoter',
      date: '2024-01-05',
      sampleSize: 18000,
      type: 'external',
      bjp: 46,
      sp: 31,
      congress: 8,
      bsp: 12,
      others: 3
    },
    {
      id: 4,
      name: 'BJP Internal Survey',
      date: '2024-01-20',
      sampleSize: 25000,
      type: 'internal',
      bjp: 52,
      sp: 28,
      congress: 7,
      bsp: 10,
      others: 3
    },
    {
      id: 5,
      name: 'Ground Survey - Eastern UP',
      date: '2024-01-18',
      sampleSize: 8000,
      type: 'ground',
      bjp: 49,
      sp: 29,
      congress: 8,
      bsp: 11,
      others: 3
    }
  ];

  const constituencyWiseData = [
    { constituency: 'Lucknow', bjp: 55, sp: 25, congress: 8, bsp: 10, others: 2 },
    { constituency: 'Varanasi', bjp: 62, sp: 20, congress: 6, bsp: 10, others: 2 },
    { constituency: 'Gorakhpur', bjp: 58, sp: 22, congress: 7, bsp: 11, others: 2 },
    { constituency: 'Agra', bjp: 48, sp: 30, congress: 9, bsp: 11, others: 2 },
    { constituency: 'Kanpur', bjp: 45, sp: 32, congress: 10, bsp: 11, others: 2 },
    { constituency: 'Allahabad', bjp: 50, sp: 28, congress: 9, bsp: 11, others: 2 },
  ];

  const trendData = [
    { month: 'Oct 2023', bjp: 42, sp: 35, congress: 8, bsp: 13 },
    { month: 'Nov 2023', bjp: 44, sp: 33, congress: 8, bsp: 13 },
    { month: 'Dec 2023', bjp: 46, sp: 32, congress: 8, bsp: 12 },
    { month: 'Jan 2024', bjp: 48, sp: 30, congress: 9, bsp: 11 },
  ];

  const surveyTypes = [
    { value: 'all', label: 'All Surveys' },
    { value: 'external', label: 'External Surveys' },
    { value: 'internal', label: 'Internal Surveys' },
    { value: 'ground', label: 'Ground Surveys' },
  ];

  const filteredSurveys = selectedSurvey === 'all' ? surveyData : 
    surveyData.filter(survey => survey.type === selectedSurvey);

  const averageData = {
    bjp: filteredSurveys.reduce((sum, survey) => sum + survey.bjp, 0) / filteredSurveys.length,
    sp: filteredSurveys.reduce((sum, survey) => sum + survey.sp, 0) / filteredSurveys.length,
    congress: filteredSurveys.reduce((sum, survey) => sum + survey.congress, 0) / filteredSurveys.length,
    bsp: filteredSurveys.reduce((sum, survey) => sum + survey.bsp, 0) / filteredSurveys.length,
    others: filteredSurveys.reduce((sum, survey) => sum + survey.others, 0) / filteredSurveys.length,
  };

  const pieData = [
    { name: 'BJP', value: averageData.bjp, color: '#f97316' },
    { name: 'SP', value: averageData.sp, color: '#dc2626' },
    { name: 'Congress', value: averageData.congress, color: '#19a3e1' },
    { name: 'BSP', value: averageData.bsp, color: '#1e40af' },
    { name: 'Others', value: averageData.others, color: '#6b7280' },
  ];

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Survey Data & Analysis</h2>
          <p className="text-gray-600">Comprehensive survey data from multiple sources</p>
        </div>
        <div className="flex items-center space-x-4">
          <select 
            value={selectedSurvey} 
            onChange={(e) => setSelectedSurvey(e.target.value)}
            className="border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-orange-500"
          >
            {surveyTypes.map(type => (
              <option key={type.value} value={type.value}>
                {type.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Total Surveys</p>
              <p className="text-2xl font-bold text-gray-800">{filteredSurveys.length}</p>
            </div>
            <FileText className="w-8 h-8 text-blue-500" />
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">BJP Average</p>
              <p className="text-2xl font-bold text-orange-600">{averageData.bjp.toFixed(1)}%</p>
            </div>
            <TrendingUp className="w-8 h-8 text-orange-500" />
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">SP Average</p>
              <p className="text-2xl font-bold text-red-600">{averageData.sp.toFixed(1)}%</p>
            </div>
            <TrendingUp className="w-8 h-8 text-red-500" />
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Sample Size</p>
              <p className="text-2xl font-bold text-gray-800">
                {filteredSurveys.reduce((sum, survey) => sum + survey.sampleSize, 0).toLocaleString()}
              </p>
            </div>
            <Users className="w-8 h-8 text-purple-500" />
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Latest Survey</p>
              <p className="text-2xl font-bold text-gray-800">
                {new Date(Math.max(...filteredSurveys.map(s => new Date(s.date).getTime()))).toLocaleDateString()}
              </p>
            </div>
            <Calendar className="w-8 h-8 text-green-500" />
          </div>
        </div>
      </div>

      {/* Survey Results */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Average Results Pie Chart */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Average Survey Results</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={120}
                paddingAngle={5}
                dataKey="value"
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
          <div className="grid grid-cols-2 gap-4 mt-4">
            {pieData.map((item, index) => (
              <div key={index} className="flex items-center space-x-2">
                <div className="w-4 h-4 rounded-full" style={{ backgroundColor: item.color }}></div>
                <span className="text-sm text-gray-600">{item.name}: {item.value.toFixed(1)}%</span>
              </div>
            ))}
          </div>
        </div>

        {/* Constituency-wise Results */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Constituency-wise Results</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={constituencyWiseData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="constituency" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="bjp" fill="#f97316" name="BJP" />
              <Bar dataKey="sp" fill="#dc2626" name="SP" />
              <Bar dataKey="congress" fill="#19a3e1" name="Congress" />
              <Bar dataKey="bsp" fill="#1e40af" name="BSP" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Trend Analysis */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Survey Trends Over Time</h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={trendData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="bjp" stroke="#f97316" strokeWidth={3} name="BJP" />
            <Line type="monotone" dataKey="sp" stroke="#dc2626" strokeWidth={3} name="SP" />
            <Line type="monotone" dataKey="congress" stroke="#19a3e1" strokeWidth={3} name="Congress" />
            <Line type="monotone" dataKey="bsp" stroke="#1e40af" strokeWidth={3} name="BSP" />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Survey Details */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-800">Detailed Survey Results</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Survey Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Sample Size</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">BJP</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">SP</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Congress</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">BSP</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredSurveys.map((survey) => (
                <tr key={survey.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{survey.name}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(survey.date).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {survey.sampleSize.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                      survey.type === 'internal' ? 'bg-orange-100 text-orange-800' :
                      survey.type === 'external' ? 'bg-blue-100 text-blue-800' :
                      'bg-green-100 text-green-800'
                    }`}>
                      {survey.type}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-orange-600">
                    {survey.bjp}%
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-red-600">
                    {survey.sp}%
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-blue-600">
                    {survey.congress}%
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-indigo-600">
                    {survey.bsp}%
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default SurveyData;