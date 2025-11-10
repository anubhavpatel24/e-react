import React from 'react';
import { useQuery } from 'react-query';
import axios from 'axios';

const SellerOrders = () => {
  const { data: orders, isLoading } = useQuery(
    'seller-orders',
    async () => {
      const response = await axios.get('/api/orders');
      return response.data;
    },
    { refetchInterval: 5000 }
  );

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">Orders</h1>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 dark:bg-gray-700">
            <tr>
              <th className="text-left py-4 px-6 text-gray-600 dark:text-gray-300">Order ID</th>
              <th className="text-left py-4 px-6 text-gray-600 dark:text-gray-300">Customer</th>
              <th className="text-left py-4 px-6 text-gray-600 dark:text-gray-300">Amount</th>
              <th className="text-left py-4 px-6 text-gray-600 dark:text-gray-300">Status</th>
              <th className="text-left py-4 px-6 text-gray-600 dark:text-gray-300">Date</th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr><td colSpan="5" className="text-center py-8">Loading...</td></tr>
            ) : (
              orders?.map((order) => (
                <tr key={order._id} className="border-b border-gray-100 dark:border-gray-700">
                  <td className="py-4 px-6 text-gray-900 dark:text-white">#{order._id.slice(-6)}</td>
                  <td className="py-4 px-6 text-gray-900 dark:text-white">{order.user?.name}</td>
                  <td className="py-4 px-6 text-gray-900 dark:text-white">${order.totalAmount.toFixed(2)}</td>
                  <td className="py-4 px-6">
                    <span className="px-3 py-1 rounded-full text-sm bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400">
                      {order.status}
                    </span>
                  </td>
                  <td className="py-4 px-6 text-gray-600 dark:text-gray-400">
                    {new Date(order.createdAt).toLocaleDateString()}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SellerOrders;
