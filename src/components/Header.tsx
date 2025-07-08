import React, { useState } from 'react';
import { Bell, Search, Filter, Calendar } from 'lucide-react';

const Header: React.FC = () => {
  const [timeFilter, setTimeFilter] = useState('today');

  return (
    <header className="bg-white shadow-sm border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <h2 className="text-2xl font-bold text-gray-800">Political Analysis Dashboard</h2>
          <div className="flex items-center space-x-2 bg-orange-50 px-3 py-1 rounded-full">
            <Calendar className="w-4 h-4 text-orange-600" />
            <span className="text-sm font-medium text-orange-600">Live Updates</span>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          {/* Time Filter */}
          <div className="flex items-center space-x-2">
            <Filter className="w-4 h-4 text-gray-500" />
            <select 
              value={timeFilter} 
              onChange={(e) => setTimeFilter(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
            >
              <option value="today">Today</option>
              <option value="7days">Last 7 Days</option>
              <option value="30days">Last 30 Days</option>
              <option value="90days">Last 90 Days</option>
            </select>
          </div>

          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search constituencies, leaders..."
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
            />
          </div>

          {/* Notifications */}
          <div className="relative">
            <Bell className="w-6 h-6 text-gray-500 cursor-pointer hover:text-orange-600 transition-colors" />
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;