import React, { useState } from 'react';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';

const Newsletter = () => {
  const [email, setEmail] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email) {
      toast.success('Thanks for subscribing!');
      setEmail('');
    }
  };

  return (
    <section className="bg-gradient-to-r from-primary-500 to-pink-500 dark:from-primary-700 dark:to-purple-700 py-16">
      <div className="max-w-4xl mx-auto px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl font-bold text-white mb-4">
            Subscribe to Our Newsletter
          </h2>
          <p className="text-white/90 text-lg mb-8">
            Get the latest updates on new products and exclusive offers!
          </p>

          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
              className="flex-1 px-6 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-white text-gray-900"
            />
            <button
              type="submit"
              className="bg-white text-primary-600 dark:text-primary-700 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-200"
            >
              Subscribe
            </button>
          </form>
        </motion.div>
      </div>
    </section>
  );
};

export default Newsletter;
