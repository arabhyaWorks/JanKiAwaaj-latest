import React from 'react';
import { MapPin, Users, TrendingUp, BarChart3 } from 'lucide-react';

const UPMap: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Uttar Pradesh Electoral Map
          </h1>
          <p className="text-lg text-gray-600">
            Interactive constituency analysis and political insights
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Constituencies</p>
                <p className="text-3xl font-bold text-blue-600">80</p>
              </div>
              <MapPin className="h-12 w-12 text-blue-500" />
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Voters</p>
                <p className="text-3xl font-bold text-green-600">15.9Cr</p>
              </div>
              <Users className="h-12 w-12 text-green-500" />
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Turnout Rate</p>
                <p className="text-3xl font-bold text-purple-600">59.2%</p>
              </div>
              <TrendingUp className="h-12 w-12 text-purple-500" />
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Active Surveys</p>
                <p className="text-3xl font-bold text-orange-600">24</p>
              </div>
              <BarChart3 className="h-12 w-12 text-orange-500" />
            </div>
          </div>
        </div>

        {/* Map Container */}
        <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Vidhan Sabha Constituencies Map
            </h2>
            <p className="text-gray-600">
              Click on any constituency to view detailed analysis and insights
            </p>
          </div>
          
          <div className="p-6">
            <div className="w-full bg-gray-50 rounded-lg border-2 border-dashed border-gray-300 p-4 min-h-[600px]">
              <div className="text-center">
                <img 
                  src="https://upload.wikimedia.org/wikipedia/commons/2/2b/Uttar_Pradesh_Lok_Sabha_election_result_2019.png"
                  alt="Uttar Pradesh Lok Sabha Constituencies"
                  className="w-full h-auto mx-auto rounded-lg shadow-md border border-gray-200"
                  style={{ minHeight: '500px', maxHeight: '600px', objectFit: 'contain' }}
                />
                <p className="mt-4 text-sm text-gray-500">
                  Uttar Pradesh Vidhan Sabha Constituencies Map
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-shadow cursor-pointer">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Constituency Analysis
            </h3>
            <p className="text-gray-600 text-sm">
              Deep dive into individual constituency performance and voter demographics
            </p>
          </div>
          
          <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-shadow cursor-pointer">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Trend Monitoring
            </h3>
            <p className="text-gray-600 text-sm">
              Track political trends and sentiment changes across regions
            </p>
          </div>
          
          <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-shadow cursor-pointer">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Survey Insights
            </h3>
            <p className="text-gray-600 text-sm">
              Access latest polling data and public opinion surveys
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UPMap;