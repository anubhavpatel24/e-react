import React from 'react';
import { useQuery } from 'react-query';
import axios from 'axios';
import { Package, Users, ShoppingBag, DollarSign, TrendingUp } from 'lucide-react';
import { motion } from 'framer-motion';

const AdminOverview = () => {
  const { data: stats, isLoading } = useQuery(
    'admin-stats',
    async () => {
      const [products, users, orders] = await Promise.all([
        axios.get('/api/products'),
        axios.get('/api/users'),
        axios.get('/api/orders'),
      ]);
      
      const totalRevenue = orders.data.reduce((sum, order) => sum + order.totalAmount, 0);
      
      return {
        totalProducts: products.data.length,
        totalUsers: users.data.length,
        totalOrders: orders.data.length,
        totalRevenue,
        recentOrders: orders.data.slice(0, 5),
      };
    },
    {
      refetchInterval: 5000, // Real-time updates every 5 seconds
    }
  );

  const statCards = [
    {
      title: 'Total Revenue',
      value: `$${stats?.totalRevenue?.toFixed(2) || 0}`,
      icon: DollarSign,
      color: 'bg-green-500',
      change: '+12.5%',
    },
    {
      title: 'Total Orders',
      value: stats?.totalOrders || 0,
      icon: ShoppingBag,
      color: 'bg-blue-500',
      change: '+8.2%',
    },
    {
      title: 'Total Products',
      value: stats?.totalProducts || 0,
      icon: Package,
      color: 'bg-purple-500',
      change: '+3.1%',
    },
    {
      title: 'Total Users',
      value: stats?.totalUsers || 0,
      icon: Users,
      color: 'bg-orange-500',
      change: '+15.3%',
    },
  ];

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="bg-white dark:bg-gray-800 rounded-lg p-6 animate-pulse">
            <div className="h-20 bg-gray-300 dark:bg-gray-700 rounded"></div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Dashboard Overview</h1>
        <p className="text-gray-600 dark:text-gray-400 mt-2">Welcome back! Here's what's happening today.</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {statCards.map((stat, index) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md"
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`${stat.color} p-3 rounded-lg`}>
                <stat.icon className="text-white" size={24} />
              </div>
              <div className="flex items-center gap-1 text-green-500 text-sm">
                <TrendingUp size={16} />
                <span>{stat.change}</span>
              </div>
            </div>
            <h3 className="text-gray-600 dark:text-gray-400 text-sm mb-1">{stat.title}</h3>
            <p className="text-3xl font-bold text-gray-900 dark:text-white">{stat.value}</p>
          </motion.div>
        ))}
      </div>

      {/* Recent Orders */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Recent Orders</h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200 dark:border-gray-700">
                <th className="text-left py-3 px-4 text-gray-600 dark:text-gray-400 font-semibold">Order ID</th>
                <th className="text-left py-3 px-4 text-gray-600 dark:text-gray-400 font-semibold">Customer</th>
                <th className="text-left py-3 px-4 text-gray-600 dark:text-gray-400 font-semibold">Amount</th>
                <th className="text-left py-3 px-4 text-gray-600 dark:text-gray-400 font-semibold">Status</th>
              </tr>
            </thead>
            <tbody>
              {stats?.recentOrders?.map((order) => (
                <tr key={order._id} className="border-b border-gray-100 dark:border-gray-700">
                  <td className="py-3 px-4 text-gray-900 dark:text-white">#{order._id.slice(-6)}</td>
                  <td className="py-3 px-4 text-gray-900 dark:text-white">{order.user?.name || 'N/A'}</td>
                  <td className="py-3 px-4 text-gray-900 dark:text-white">${order.totalAmount.toFixed(2)}</td>
                  <td className="py-3 px-4">
                    <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                      order.status === 'delivered' ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400' :
                      order.status === 'processing' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400' :
                      'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400'
                    }`}>
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

export default AdminOverview;
