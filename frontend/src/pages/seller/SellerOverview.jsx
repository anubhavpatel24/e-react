import React from 'react';
import { useQuery } from 'react-query';
import axios from 'axios';
import { Package, ShoppingBag, DollarSign, TrendingUp } from 'lucide-react';
import { motion } from 'framer-motion';

const SellerOverview = () => {
  const { data: stats, isLoading } = useQuery(
    'seller-stats',
    async () => {
      const [products, orders] = await Promise.all([
        axios.get('/api/products'),
        axios.get('/api/orders'),
      ]);
      
      const myProducts = products.data;
      const myOrders = orders.data;
      const totalRevenue = myOrders.reduce((sum, order) => sum + order.totalAmount, 0);
      
      return {
        totalProducts: myProducts.length,
        totalOrders: myOrders.length,
        totalRevenue,
        recentOrders: myOrders.slice(0, 5),
      };
    },
    { refetchInterval: 5000 }
  );

  const statCards = [
    {
      title: 'Total Revenue',
      value: `$${stats?.totalRevenue?.toFixed(2) || 0}`,
      icon: DollarSign,
      color: 'bg-green-500',
    },
    {
      title: 'Total Orders',
      value: stats?.totalOrders || 0,
      icon: ShoppingBag,
      color: 'bg-blue-500',
    },
    {
      title: 'My Products',
      value: stats?.totalProducts || 0,
      icon: Package,
      color: 'bg-purple-500',
    },
  ];

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">Seller Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {statCards.map((stat, index) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md"
          >
            <div className={`${stat.color} p-3 rounded-lg inline-block mb-4`}>
              <stat.icon className="text-white" size={24} />
            </div>
            <h3 className="text-gray-600 dark:text-gray-400 text-sm mb-1">{stat.title}</h3>
            <p className="text-3xl font-bold text-gray-900 dark:text-white">{stat.value}</p>
          </motion.div>
        ))}
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Recent Orders</h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200 dark:border-gray-700">
                <th className="text-left py-3 px-4 text-gray-600 dark:text-gray-400">Order ID</th>
                <th className="text-left py-3 px-4 text-gray-600 dark:text-gray-400">Amount</th>
                <th className="text-left py-3 px-4 text-gray-600 dark:text-gray-400">Status</th>
              </tr>
            </thead>
            <tbody>
              {stats?.recentOrders?.map((order) => (
                <tr key={order._id} className="border-b border-gray-100 dark:border-gray-700">
                  <td className="py-3 px-4 text-gray-900 dark:text-white">#{order._id.slice(-6)}</td>
                  <td className="py-3 px-4 text-gray-900 dark:text-white">${order.totalAmount.toFixed(2)}</td>
                  <td className="py-3 px-4">
                    <span className="px-3 py-1 rounded-full text-sm bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400">
                      {order.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default SellerOverview;
