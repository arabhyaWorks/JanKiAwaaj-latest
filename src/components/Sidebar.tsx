import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  Home, 
  Map, 
  Newspaper, 
  MessageCircle, 
  Users, 
  BarChart3, 
  TrendingUp, 
  UserCheck, 
  Award,
  Settings 
} from 'lucide-react';

const Sidebar: React.FC = () => {
  const navItems = [
    { icon: Home, label: 'Dashboard', path: '/' },
    { icon: Map, label: 'UP Map', path: '/map' },
    { icon: Newspaper, label: 'News Analysis', path: '/news' },
    { icon: MessageCircle, label: 'Social Media', path: '/social-media' },
    { icon: Users, label: 'Opposition', path: '/opposition' },
    { icon: BarChart3, label: 'Survey Data', path: '/surveys' },
    { icon: TrendingUp, label: 'Trends', path: '/trends' },
    { icon: UserCheck, label: 'Leaders', path: '/leaders' },
    { icon: Award, label: 'Schemes', path: '/schemes' },
  ];

  return (
    <div className="w-64 bg-white shadow-lg border-r border-gray-200">
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center space-x-3">
          {/* <img 
            src="https://www.shutterstock.com/image-vector/rajkot-gujarat-india-10-disember-600nw-2400847291.jpg"
            alt="BJP Logo"
            className="w-8 h-8"
          /> */}
          <div>
            <h1 className="text-lg font-bold text-gray-800">Jan Ki Awaaj</h1>
            <p className="text-sm text-gray-500">Uttar Pradesh</p>
          </div>
        </div>
      </div>

      <nav className="mt-6">
        <div className="px-3 space-y-1">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center px-3 py-3 text-sm font-medium rounded-lg transition-colors ${
                  isActive
                    ? 'bg-orange-50 text-orange-600 border-r-2 border-orange-600'
                    : 'text-gray-700 hover:bg-gray-50 hover:text-orange-600'
                }`
              }
            >
              <item.icon className="w-5 h-5 mr-3" />
              {item.label}
            </NavLink>
          ))}
        </div>
      </nav>

      <div className="absolute bottom-0 w-64 p-4 border-t border-gray-200">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center">
            <Settings className="w-4 h-4 text-white" />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-700">Admin User</p>
            <p className="text-xs text-gray-500">BJP UP Team</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;