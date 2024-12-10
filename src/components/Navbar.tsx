import React from 'react';
import Logo from './Logo';
import { Search, ShoppingCart } from 'lucide-react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 bg-white/80 backdrop-blur-md z-50 border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <Logo />
              <span className="font-medium text-lg">TireHub</span>
            </Link>
          </div>
          
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/tires" className="text-gray-900 hover:text-gray-600 transition-colors">
              Tires
            </Link>
            <Link to="/wheels" className="text-gray-900 hover:text-gray-600 transition-colors">
              Wheels
            </Link>
            <Link to="/services" className="text-gray-900 hover:text-gray-600 transition-colors">
              Services
            </Link>
          </div>

          <div className="flex items-center space-x-4">
            <div className="relative">
              <Search className="w-5 h-5 text-gray-500" />
            </div>
            <div className="relative">
              <ShoppingCart className="w-5 h-5 text-gray-500" />
              <span className="absolute -top-2 -right-2 bg-black text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                0
              </span>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;