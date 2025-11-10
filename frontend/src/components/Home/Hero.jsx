import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const Hero = () => {
  return (
    <div className="relative bg-gradient-to-r from-primary-500 to-pink-500 dark:from-primary-700 dark:to-purple-700 text-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 py-24 sm:py-32">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Discover Your Style
            </h1>
            <p className="text-xl mb-8 text-gray-100">
              Shop the latest trends in fashion with exclusive deals and premium quality products.
            </p>
            <div className="flex gap-4">
              <Link
                to="/products"
                className="bg-white text-primary-600 dark:text-primary-700 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-200"
              >
                Shop Now
              </Link>
              <Link
                to="/products?category=new"
                className="border-2 border-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-primary-600 transition-colors duration-200"
              >
                New Arrivals
              </Link>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="hidden md:block"
          >
            <div className="relative">
              <div className="absolute inset-0 bg-white/20 rounded-full blur-3xl"></div>
              <img
                src="https://images.unsplash.com/photo-1483985988355-763728e1935b?w=600&h=600&fit=crop"
                alt="Fashion"
                className="relative rounded-2xl shadow-2xl"
              />
            </div>
          </motion.div>
        </div>
      </div>
      
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 -mt-20 -mr-20 w-80 h-80 bg-white/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 -mb-20 -ml-20 w-80 h-80 bg-white/10 rounded-full blur-3xl"></div>
    </div>
  );
};

export default Hero;
