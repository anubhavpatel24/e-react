import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import axios from 'axios';
import { Plus, Edit, Trash2, Search } from 'lucide-react';
import toast from 'react-hot-toast';
import ProductModal from './ProductModal';

const AdminProducts = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const queryClient = useQueryClient();

  const { data: products, isLoading } = useQuery(
    ['admin-products', searchQuery],
    async () => {
      const response = await axios.get(`/api/products?search=${searchQuery}`);
      return response.data;
    },
    {
      refetchInterval: 5000, // Real-time updates
    }
  );

  const deleteMutation = useMutation(
    (id) => axios.delete(`/api/products/${id}`),
    {
      onSuccess: () => {
        queryClient.invalidateQueries('admin-products');
        toast.success('Product deleted successfully!');
      },
      onError: () => {
        toast.error('Failed to delete product');
      },
    }
  );

  const handleEdit = (product) => {
    setEditingProduct(product);
    setIsModalOpen(true);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      deleteMutation.mutate(id);
    }
  };

  const handleAddNew = () => {
    setEditingProduct(null);
    setIsModalOpen(true);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Products Management</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">Manage your product inventory</p>
        </div>
        <button onClick={handleAddNew} className="btn-primary flex items-center gap-2">
          <Plus size={20} />
          Add Product
        </button>
      </div>

      {/* Search */}
      <div className="mb-6">
        <div className="relative">
          <input
            type="text"
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="input-field pl-10"
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
        </div>
      </div>

      {/* Products Table */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th className="text-left py-4 px-6 text-gray-600 dark:text-gray-300 font-semibold">Image</th>
                <th className="text-left py-4 px-6 text-gray-600 dark:text-gray-300 font-semibold">Name</th>
                <th className="text-left py-4 px-6 text-gray-600 dark:text-gray-300 font-semibold">Category</th>
                <th className="text-left py-4 px-6 text-gray-600 dark:text-gray-300 font-semibold">Price</th>
                <th className="text-left py-4 px-6 text-gray-600 dark:text-gray-300 font-semibold">Stock</th>
                <th className="text-left py-4 px-6 text-gray-600 dark:text-gray-300 font-semibold">Status</th>
                <th className="text-left py-4 px-6 text-gray-600 dark:text-gray-300 font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                <tr>
                  <td colSpan="7" className="text-center py-8">
                    <div className="animate-pulse">Loading...</div>
                  </td>
                </tr>
              ) : products?.length === 0 ? (
                <tr>
                  <td colSpan="7" className="text-center py-8 text-gray-500 dark:text-gray-400">
                    No products found
                  </td>
                </tr>
              ) : (
                products?.map((product) => (
                  <tr key={product._id} className="border-b border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50">
                    <td className="py-4 px-6">
                      <img
                        src={product.images?.[0] || 'https://via.placeholder.com/50'}
                        alt={product.name}
                        className="w-12 h-12 object-cover rounded"
                      />
                    </td>
                    <td className="py-4 px-6 text-gray-900 dark:text-white font-medium">{product.name}</td>
                    <td className="py-4 px-6 text-gray-600 dark:text-gray-400">{product.category}</td>
                    <td className="py-4 px-6 text-gray-900 dark:text-white">${product.price.toFixed(2)}</td>
                    <td className="py-4 px-6">
                      <span className={`${product.stock > 10 ? 'text-green-600' : 'text-red-600'} font-semibold`}>
                        {product.stock}
                      </span>
                    </td>
                    <td className="py-4 px-6">
                      <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                        product.isActive
                          ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'
                          : 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400'
                      }`}>
                        {product.isActive ? 'Active' : 'Inactive'}
                      </span>
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleEdit(product)}
                          className="p-2 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/30 rounded"
                        >
                          <Edit size={18} />
                        </button>
                        <button
                          onClick={() => handleDelete(product._id)}
                          className="p-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/30 rounded"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Product Modal */}
      {isModalOpen && (
        <ProductModal
          product={editingProduct}
          onClose={() => {
            setIsModalOpen(false);
            setEditingProduct(null);
          }}
        />
      )}
    </div>
  );
};

export default AdminProducts;
