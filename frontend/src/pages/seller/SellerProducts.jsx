import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import axios from 'axios';
import { Plus, Edit, Trash2 } from 'lucide-react';
import toast from 'react-hot-toast';
import ProductModal from '../admin/ProductModal';

const SellerProducts = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const queryClient = useQueryClient();

  const { data: products, isLoading } = useQuery(
    'seller-products',
    async () => {
      const response = await axios.get('/api/products');
      return response.data;
    },
    { refetchInterval: 5000 }
  );

  const deleteMutation = useMutation(
    (id) => axios.delete(`/api/products/${id}`),
    {
      onSuccess: () => {
        queryClient.invalidateQueries('seller-products');
        toast.success('Product deleted!');
      },
    }
  );

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">My Products</h1>
        <button onClick={() => setIsModalOpen(true)} className="btn-primary flex items-center gap-2">
          <Plus size={20} />
          Add Product
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {isLoading ? (
          [...Array(6)].map((_, i) => (
            <div key={i} className="bg-white dark:bg-gray-800 rounded-lg p-4 animate-pulse">
              <div className="bg-gray-300 dark:bg-gray-700 h-48 rounded mb-4"></div>
              <div className="bg-gray-300 dark:bg-gray-700 h-4 rounded mb-2"></div>
            </div>
          ))
        ) : (
          products?.map((product) => (
            <div key={product._id} className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
              <img
                src={product.images?.[0] || 'https://via.placeholder.com/400'}
                alt={product.name}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">{product.name}</h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm mb-3 line-clamp-2">{product.description}</p>
                <div className="flex justify-between items-center mb-4">
                  <span className="text-xl font-bold text-primary-600 dark:text-primary-400">
                    ${product.price.toFixed(2)}
                  </span>
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    Stock: {product.stock}
                  </span>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => {
                      setEditingProduct(product);
                      setIsModalOpen(true);
                    }}
                    className="flex-1 btn-secondary flex items-center justify-center gap-2"
                  >
                    <Edit size={16} />
                    Edit
                  </button>
                  <button
                    onClick={() => deleteMutation.mutate(product._id)}
                    className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

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

export default SellerProducts;
