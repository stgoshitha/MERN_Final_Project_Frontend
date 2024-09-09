import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { FiMenu, FiUser, FiHome, FiUsers, FiLogOut } from 'react-icons/fi';
import { Logout } from '../redux/AuthSlice';
import toast from 'react-hot-toast';

export default function AdminSidebar() {
  const user = useSelector((state) => state.Auth.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleLogout = async () => {
    try {
      const response = await axios.post('/api/auth/logout'); // Ensure the endpoint is correct and available
      if (response.status === 200) {
        dispatch(Logout());
        toast.success('Logged out successfully!');
        navigate('/login');
      } else {
        toast.error('Failed to log out. Please try again.');
      }
    } catch (error) {
      console.error('Logout error:', error);
      toast.error('An error occurred during logout. Please try again.');
    }
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex md:flex-col bg-gray-800 h-screen">
      <button
        className="text-white p-4 md:hidden"
        onClick={toggleSidebar}
      >
        <FiMenu size={24} />
      </button>

      <div className={`md:w-64 w-16 flex flex-col h-full bg-gray-800 ${isSidebarOpen ? 'block' : 'hidden md:block'}`}>
        <div className="bg-gray-500 p-5 md:block hidden">
          <h1 className="text-white text-xl font-bold">
            Welcome, {user && user.firstName}
          </h1>
        </div>
        <div className="flex flex-col mt-2 space-y-2">
          <Link
            to="/"
            className="text-white text-lg hover:bg-gray-700 p-5 flex items-center space-x-4 rounded-md transition duration-200"
          >
            <FiHome size={24} />
            <span className="hidden md:inline">Dashboard</span>
          </Link>
          <Link
            to="/admin/admindash"
            className="text-white text-lg hover:bg-gray-700 p-5 flex items-center space-x-4 rounded-md transition duration-200"
          >
            <FiUsers size={24} />
            <span className="hidden md:inline">User Management</span>
          </Link>
          <Link
            to="/admin/AdminManage"
            className="text-white text-lg hover:bg-gray-700 p-5 flex items-center space-x-4 rounded-md transition duration-200"
          >
            <FiUser size={24} />
            <span className="hidden md:inline">Admin Management</span>
          </Link>
          <button
            className="text-white text-lg hover:bg-gray-700 p-5 flex items-center space-x-4 rounded-md transition duration-200"
            onClick={handleLogout}
          >
            <FiLogOut size={24} />
            <span className="hidden md:inline">Logout</span>
          </button>
        </div>
      </div>
    </div>
  );
}
