import React, { useState, useEffect } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import axios from 'axios';
import { X } from 'lucide-react';
import toast from 'react-hot-toast';

const ProductModal = ({ product, onClose }) => {
  const queryClient = useQueryClient();
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    discount: 0,
    category: '',
    stock: '',
    sizes: [],
    colors: [],
    images: [],
    isActive: true,
  });

  useEffect(() => {
    if (product) {
      setFormData({
        name: product.name || '',
        description: product.description || '',
        price: product.price || '',
        discount: product.discount || 0,
        category: product.category || '',
        stock: product.stock || '',
        sizes: product.sizes || [],
        colors: product.colors || [],
        images: product.images || [],
        isActive: product.isActive !== undefined ? product.isActive : true,
      });
    }
  }, [product]);

  const mutation = useMutation(
    (data) => {
      if (product) {
        return axios.put(`/api/products/${product._id}`, data);
      }
      return axios.post('/api/products', data);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries('admin-products');
        toast.success(product ? 'Product updated!' : 'Product created!');
        onClose();
      },
      onError: (error) => {
        toast.error(error.response?.data?.message || 'Operation failed');
      },
    }
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    mutation.mutate(formData);
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-800 rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 p-6 flex justify-between items-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            {product ? 'Edit Product' : 'Add New Product'}
          </h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700 dark:text-gray-400">
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Product Name *
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="input-field"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Description *
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
              rows="4"
              className="input-field"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Price *
              </label>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                required
                min="0"
                step="0.01"
                className="input-field"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Discount (%)
              </label>
              <input
                type="number"
                name="discount"
                value={formData.discount}
                onChange={handleChange}
                min="0"
                max="100"
                className="input-field"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Category *
              </label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                required
                className="input-field"
              >
                <option value="">Select Category</option>
                <option value="men">Men</option>
                <option value="women">Women</option>
                <option value="kids">Kids</option>
                <option value="accessories">Accessories</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Stock *
              </label>
              <input
                type="number"
                name="stock"
                value={formData.stock}
                onChange={handleChange}
                required
                min="0"
                className="input-field"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Image URL
            </label>
            <input
              type="url"
              placeholder="https://example.com/image.jpg"
              value={formData.images[0] || ''}
              onChange={(e) => setFormData(prev => ({ ...prev, images: [e.target.value] }))}
              className="input-field"
            />
          </div>

          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              name="isActive"
              id="isActive"
              checked={formData.isActive}
              onChange={handleChange}
              className="w-4 h-4 text-primary-600 rounded focus:ring-primary-500"
            />
            <label htmlFor="isActive" className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Active Product
            </label>
          </div>

          <div className="flex gap-4 pt-4">
            <button
              type="submit"
              disabled={mutation.isLoading}
              className="btn-primary flex-1 disabled:opacity-50"
            >
              {mutation.isLoading ? 'Saving...' : product ? 'Update Product' : 'Create Product'}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="btn-secondary flex-1"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProductModal;
