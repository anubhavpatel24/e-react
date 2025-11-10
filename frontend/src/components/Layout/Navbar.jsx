import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useCart } from '../../context/CartContext';
import { useTheme } from '../../context/ThemeContext';
import { ShoppingCart, User, Search, Menu, X, Moon, Sun } from 'lucide-react';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const { user, logout } = useAuth();
  const { cartItemsCount } = useCart();
  const { isDark, toggleTheme } = useTheme();
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchQuery)}`);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="bg-white dark:bg-gray-800 shadow-lg sticky top-0 z-50 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-primary-500 rounded-full"></div>
            <span className="text-xl font-bold text-gray-800 dark:text-white">FashionStore</span>
          </Link>

          {/* Search Bar */}
          <div className="hidden md:flex flex-1 max-w-lg mx-8">
            <form onSubmit={handleSearch} className="relative w-full">
              <input
                type="text"
                placeholder="Search for products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
              <button
                type="submit"
                className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-primary-500"
              >
                <Search size={20} />
              </button>
            </form>
          </div>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-6">
            <Link to="/products" className="text-gray-700 dark:text-gray-200 hover:text-primary-500 dark:hover:text-primary-400 transition-colors">
              Products
            </Link>
            
            <button
              onClick={toggleTheme}
              className="text-gray-700 dark:text-gray-200 hover:text-primary-500 dark:hover:text-primary-400 transition-colors p-2"
            >
              {isDark ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            
            <Link to="/cart" className="text-gray-700 dark:text-gray-200 hover:text-primary-500 dark:hover:text-primary-400 transition-colors relative">
              <ShoppingCart size={20} />
              {cartItemsCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-primary-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {cartItemsCount}
                </span>
              )}
            </Link>

            {user ? (
              <div className="relative group">
                <button className="flex items-center space-x-1 text-gray-700 dark:text-gray-200 hover:text-primary-500 dark:hover:text-primary-400">
                  <User size={20} />
                  <span>{user.name}</span>
                </button>
                <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
                  {user.role === 'admin' && (
                    <Link to="/admin" className="block px-4 py-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700">
                      Admin Panel
                    </Link>
                  )}
                  {user.role === 'seller' && (
                    <Link to="/seller" className="block px-4 py-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700">
                      Seller Panel
                    </Link>
                  )}
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left px-4 py-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    Logout
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <Link to="/login" className="text-gray-700 dark:text-gray-200 hover:text-primary-500 dark:hover:text-primary-400">
                  Login
                </Link>
                <Link
                  to="/register"
                  className="bg-primary-500 text-white px-4 py-2 rounded-lg hover:bg-primary-600 transition-colors"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden text-gray-700 dark:text-gray-200"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200 dark:border-gray-700">
            <div className="flex flex-col space-y-4">
              <Link to="/products" className="text-gray-700 dark:text-gray-200 hover:text-primary-500 dark:hover:text-primary-400">
                Products
              </Link>
              <Link to="/cart" className="text-gray-700 dark:text-gray-200 hover:text-primary-500 dark:hover:text-primary-400">
                Cart ({cartItemsCount})
              </Link>
              <button
                onClick={toggleTheme}
                className="text-left text-gray-700 dark:text-gray-200 hover:text-primary-500 dark:hover:text-primary-400 flex items-center gap-2"
              >
                {isDark ? <Sun size={20} /> : <Moon size={20} />}
                {isDark ? 'Light Mode' : 'Dark Mode'}
              </button>
              {user ? (
                <>
                  <span className="text-gray-700 dark:text-gray-200">Welcome, {user.name}</span>
                  <button onClick={handleLogout} className="text-left text-gray-700 dark:text-gray-200 hover:text-primary-500 dark:hover:text-primary-400">
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link to="/login" className="text-gray-700 dark:text-gray-200 hover:text-primary-500 dark:hover:text-primary-400">
                    Login
                  </Link>
                  <Link to="/register" className="text-gray-700 dark:text-gray-200 hover:text-primary-500 dark:hover:text-primary-400">
                    Sign Up
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;