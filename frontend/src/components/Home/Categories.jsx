import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const categories = [
  {
    name: 'Men',
    image: 'https://images.unsplash.com/photo-1490114538077-0a7f8cb49891?w=400&h=500&fit=crop',
    link: '/products?category=men',
  },
  {
    name: 'Women',
    image: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=400&h=500&fit=crop',
    link: '/products?category=women',
  },
  {
    name: 'Kids',
    image: 'https://images.unsplash.com/photo-1503944583220-79d8926ad5e2?w=400&h=500&fit=crop',
    link: '/products?category=kids',
  },
  {
    name: 'Accessories',
    image: 'https://images.unsplash.com/photo-1492707892479-7bc8d5a4ee93?w=400&h=500&fit=crop',
    link: '/products?category=accessories',
  },
];

const Categories = () => {
  return (
    <section className="max-w-7xl mx-auto px-4 py-16">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
          Shop by Category
        </h2>
        <p className="text-gray-600 dark:text-gray-400 text-lg">
          Explore our wide range of collections
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {categories.map((category, index) => (
          <motion.div
            key={category.name}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            viewport={{ once: true }}
          >
            <Link
              to={category.link}
              className="group relative block overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              <div className="aspect-[4/5] overflow-hidden">
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
                <h3 className="text-white text-2xl font-bold p-6 w-full text-center">
                  {category.name}
                </h3>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Categories;
