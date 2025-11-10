import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Youtube } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 dark:bg-black text-gray-300">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <h3 className="text-white text-2xl font-bold mb-4">FashionStore</h3>
            <p className="text-gray-400 mb-4">
              Your one-stop destination for the latest fashion trends and styles.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-primary-500 transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="hover:text-primary-500 transition-colors">
                <Twitter size={20} />
              </a>
              <a href="#" className="hover:text-primary-500 transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" className="hover:text-primary-500 transition-colors">
                <Youtube size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/products" className="hover:text-primary-500 transition-colors">
                  All Products
                </Link>
              </li>
              <li>
                <Link to="/products?category=new" className="hover:text-primary-500 transition-colors">
                  New Arrivals
                </Link>
              </li>
              <li>
                <Link to="/products?category=sale" className="hover:text-primary-500 transition-colors">
                  Sale
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h4 className="text-white font-semibold mb-4">Customer Service</h4>
            <ul className="space-y-2">
              <li>
                <a href="#" className="hover:text-primary-500 transition-colors">
                  Contact Us
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary-500 transition-colors">
                  Shipping Info
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary-500 transition-colors">
                  Returns
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary-500 transition-colors">
                  FAQ
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-semibold mb-4">Contact</h4>
            <ul className="space-y-2 text-gray-400">
              <li>Email: support@fashionstore.com</li>
              <li>Phone: +1 (555) 123-4567</li>
              <li>Address: 123 Fashion St, NY 10001</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; 2024 FashionStore. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
