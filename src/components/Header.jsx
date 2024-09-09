import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { FiMenu, FiX } from 'react-icons/fi';

export default function Header() {
  const user = useSelector((state) => state.Auth.user);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto flex justify-between items-center py-4 px-4 md:px-8">
        <div className="flex items-center">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-600">JOB.LK</h1>
        </div>
        <div className="md:hidden">
          <button onClick={toggleMenu} className="text-gray-600 focus:outline-none">
            {isMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>
        </div>
        <nav className={`flex-col md:flex-row flex-grow md:flex md:items-center ${isMenuOpen ? 'flex' : 'hidden'} md:flex`}>
          <div className="flex flex-col md:flex-row md:ml-auto items-center gap-6">
            <Link to="/home" className="text-gray-700 hover:text-gray-900">Home</Link>
            <Link to="/jobs" className="text-gray-700 hover:text-gray-900">Jobs</Link>
            <Link to="/about" className="text-gray-700 hover:text-gray-900">About Us</Link>
            <Link to="/contact" className="text-gray-700 hover:text-gray-900">Contact Us</Link>
            <div className="flex flex-col md:flex-row items-center">
              {user ? (
                <Link to="/account" className="text-gray-600 hover:text-gray-900">
                  My Account
                </Link>
              ) : (
                <>
                  <Link to="/login" className="text-gray-600 hover:text-gray-900">
                    Login
                  </Link>
                  <span className="mx-2 text-gray-600 hidden md:inline">|</span>
                  <Link to="/register" className="text-gray-600 hover:text-gray-900">
                    Register
                  </Link>
                </>
              )}
            </div>
          </div>
        </nav>
      </div>
    </header>
  );
}
