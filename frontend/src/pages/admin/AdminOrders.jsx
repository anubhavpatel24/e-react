import React from 'react';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import axios from 'axios';
import toast from 'react-hot-toast';

const AdminOrders = () => {
  const queryClient = useQueryClient();

  const { data: orders, isLoading } = useQuery(
    'admin-orders',
    async () => {
      const response = await axios.get('/api/orders');
      return response.data;
    },
    { refetchInterval: 5000 }
  );

  const updateStatusMutation = useMutation(
    ({ id, status }) => axios.put(`/api/orders/${id}/status`, { status }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries('admin-orders');
        toast.success('Order status updated!');
      },
    }
  );

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">Orders Management</h1>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 dark:bg-gray-700">
            <tr>
              <th className="text-left py-4 px-6 text-gray-600 dark:text-gray-300 font-semibold">Order ID</th>
              <th className="text-left py-4 px-6 text-gray-600 dark:text-gray-300 font-semibold">Customer</th>
              <th className="text-left py-4 px-6 text-gray-600 dark:text-gray-300 font-semibold">Amount</th>
              <th className="text-left py-4 px-6 text-gray-600 dark:text-gray-300 font-semibold">Status</th>
              <th className="text-left py-4 px-6 text-gray-600 dark:text-gray-300 font-semibold">Actions</th>
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
                    <select
                      value={order.status}
                      onChange={(e) => updateStatusMutation.mutate({ id: order._id, status: e.target.value })}
                      className="input-field py-1"
                    >
                      <option value="pending">Pending</option>
                      <option value="processing">Processing</option>
                      <option value="shipped">Shipped</option>
                      <option value="delivered">Delivered</option>
                      <option value="cancelled">Cancelled</option>
                    </select>
                  </td>
                  <td className="py-4 px-6">
                    <button className="text-blue-600 hover:underline">View Details</button>
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

export default AdminOrders;
