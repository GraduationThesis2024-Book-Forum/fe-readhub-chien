import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import {
  BarChart2, Flag, Users, BookOpen,
  LogOut, Menu, X, Home, Bell,
  MessageSquare
} from 'lucide-react';
import { images } from '../../../constants';
import HeaderComponent from '../../header/HeaderComponent';

const AdminLayout = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    {
      path: '/admin/dashboard',
      name: 'Dashboard',
      icon: <BarChart2 className="w-5 h-5" />
    },
    {
      path: '/admin/forum-reports',
      name: 'Forum Reports',
      icon: <Flag className="w-5 h-5" />
    },
    {
      name: 'Comment Reports',
      path: '/admin/comment-reports',
      icon: <MessageSquare className="w-5 h-5" />
    },
    {
      path: '/admin/user-management',
      name: 'User Management',
      icon: <Users className="w-5 h-5" />
    },
  ];

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    navigate('/login-account');
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <HeaderComponent
      centerContent= {"Admin"}
      />

      <div
        className={`fixed top-0 left-0 h-full bg-white shadow-lg transition-all duration-300 ${
          isSidebarOpen ? 'w-64' : 'w-20'
        }`}
      >
        <div className="flex items-center justify-between p-4">
          <Link to="/admin/dashboard" className="flex items-center space-x-3">
            <img
              src={images.imgOpenBook}
              alt='ReadHub Logo'
              className='h-8 w-8'
            />
            {isSidebarOpen && <span className="text-xl font-bold">Admin</span>}
          </Link>
        </div>

        <nav className="mt-8">
          {menuItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center px-4 py-3 space-x-3 transition-colors
                ${location.pathname === item.path
                  ? 'bg-blue-50 text-blue-600'
                  : 'text-gray-600 hover:bg-gray-50'}`}
            >
              {item.icon}
              {isSidebarOpen && <span>{item.name}</span>}
            </Link>
          ))}

          <div className="absolute bottom-0 w-full p-4">
            <Link
              to="/"
              className="flex items-center px-4 py-3 space-x-3 text-gray-600 hover:bg-gray-50"
            >
              <Home className="w-5 h-5" />
              {isSidebarOpen && <span>Back to READHUB</span>}
            </Link>
            <button
              onClick={handleLogout}
              className="flex items-center w-full px-4 py-3 space-x-3 text-red-600 hover:bg-red-50"
            >
              <LogOut className="w-5 h-5" />
              {isSidebarOpen && <span>Logout</span>}
            </button>
          </div>
        </nav>
      </div>

      {/* Main Content */}
      <div className={`pt-16 transition-all duration-300 ${isSidebarOpen ? 'ml-64' : 'ml-20'}`}>
        <div className="p-8">
          {children}
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;