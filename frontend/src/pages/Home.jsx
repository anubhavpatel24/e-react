import React from 'react';
import { Link } from 'react-router-dom';
import Hero from '../components/Home/Hero';
import FeaturedProducts from '../components/Home/FeaturedProducts';
import Categories from '../components/Home/Categories';
import Newsletter from '../components/Home/Newsletter';

const Home = () => {
  return (
    <div>
      <Hero />
      <Categories />
      <FeaturedProducts />
      <Newsletter />
      
      {/* Promotional Banners */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg p-8 text-white">
            <h3 className="text-2xl font-bold mb-4">Summer Collection</h3>
            <p className="mb-6">Get ready for summer with our latest collection</p>
            <Link
              to="/products?category=summer"
              className="bg-white text-purple-600 px-6 py-2 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              Shop Now
            </Link>
          </div>
          
          <div className="bg-gradient-to-r from-blue-500 to-teal-500 rounded-lg p-8 text-white">
            <h3 className="text-2xl font-bold mb-4">Winter Essentials</h3>
            <p className="mb-6">Stay warm and stylish this winter</p>
            <Link
              to="/products?category=winter"
              className="bg-white text-blue-600 px-6 py-2 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              Explore
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;