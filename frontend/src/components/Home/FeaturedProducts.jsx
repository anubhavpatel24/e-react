import React from 'react';
import { useProducts } from '../../hooks/useProducts';
import ProductCard from '../Products/ProductCard';
import { motion } from 'framer-motion';

const FeaturedProducts = () => {
  const { data: products, isLoading } = useProducts({ sortBy: 'newest' });
  const featuredProducts = products?.slice(0, 8) || [];

  return (
    <section className="max-w-7xl mx-auto px-4 py-16 bg-gray-50 dark:bg-gray-900">
      <div className="text-center mb-12">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-4xl font-bold text-gray-900 dark:text-white mb-4"
        >
          Featured Products
        </motion.h2>
        <p className="text-gray-600 dark:text-gray-400 text-lg">
          Check out our handpicked selection
        </p>
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 animate-pulse">
              <div className="bg-gray-300 dark:bg-gray-700 h-64 rounded-lg mb-4"></div>
              <div className="bg-gray-300 dark:bg-gray-700 h-4 rounded mb-2"></div>
              <div className="bg-gray-300 dark:bg-gray-700 h-4 rounded w-2/3"></div>
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {featuredProducts.map((product, index) => (
            <motion.div
              key={product._id}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              viewport={{ once: true }}
            >
              <ProductCard product={product} />
            </motion.div>
          ))}
        </div>
      )}
    </section>
  );
};

export default FeaturedProducts;
