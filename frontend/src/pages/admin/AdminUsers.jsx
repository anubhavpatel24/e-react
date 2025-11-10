import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import axios from 'axios';
import { Search, Edit, Trash2 } from 'lucide-react';
import toast from 'react-hot-toast';

const AdminUsers = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const queryClient = useQueryClient();

  const { data: users, isLoading } = useQuery(
    ['admin-users', searchQuery],
    async () => {
      const response = await axios.get('/api/users');
      return response.data.filter(user => 
        user.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.email?.toLowerCase().includes(searchQuery.toLowerCase())
      );
    },
    { refetchInterval: 5000 }
  );

  const deleteMutation = useMutation(
    (id) => axios.delete(`/api/users/${id}`),
    {
      onSuccess: () => {
        queryClient.invalidateQueries('admin-users');
        toast.success('User deleted successfully!');
      },
    }
  );

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">Users Management</h1>

      <div className="mb-6">
        <div className="relative">
          <input
            type="text"
            placeholder="Search users..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="input-field pl-10"
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 dark:bg-gray-700">
            <tr>
              <th className="text-left py-4 px-6 text-gray-600 dark:text-gray-300 font-semibold">Name</th>
              <th className="text-left py-4 px-6 text-gray-600 dark:text-gray-300 font-semibold">Email</th>
              <th className="text-left py-4 px-6 text-gray-600 dark:text-gray-300 font-semibold">Role</th>
              <th className="text-left py-4 px-6 text-gray-600 dark:text-gray-300 font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr><td colSpan="4" className="text-center py-8">Loading...</td></tr>
            ) : (
              users?.map((user) => (
                <tr key={user._id} className="border-b border-gray-100 dark:border-gray-700">
                  <td className="py-4 px-6 text-gray-900 dark:text-white">{user.name}</td>
                  <td className="py-4 px-6 text-gray-600 dark:text-gray-400">{user.email}</td>
                  <td className="py-4 px-6">
                    <span className="px-3 py-1 rounded-full text-sm font-semibold bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400">
                      {user.role}
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <button
                      onClick={() => deleteMutation.mutate(user._id)}
                      className="p-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/30 rounded"
                    >
                      <Trash2 size={18} />
                    </button>
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

export default AdminUsers;
