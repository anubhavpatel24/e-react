import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Heart, Star } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';
import toast from 'react-hot-toast';

const ProductCard = ({ product, viewMode = 'grid' }) => {
  const { addToCart } = useCart();
  const { user } = useAuth();

  const handleAddToCart = async (e) => {
    e.preventDefault();
    if (!user) {
      toast.error('Please login to add items to cart');
      return;
    }
    
    const result = await addToCart(product._id, 1);
    if (result.success) {
      toast.success('Added to cart!');
    } else {
      toast.error(result.error || 'Failed to add to cart');
    }
  };

  const discountedPrice = product.discount 
    ? product.price - (product.price * product.discount / 100)
    : product.price;

  if (viewMode === 'list') {
    return (
      <Link
        to={`/products/${product._id}`}
        className="flex gap-6 bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 p-4"
      >
        <img
          src={product.images?.[0] || 'https://via.placeholder.com/200'}
          alt={product.name}
          className="w-48 h-48 object-cover rounded-lg"
        />
        <div className="flex-1">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
            {product.name}
          </h3>
          <p className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-2">
            {product.description}
          </p>
          <div className="flex items-center gap-2 mb-4">
            <div className="flex items-center">
              <Star size={16} className="fill-yellow-400 text-yellow-400" />
              <span className="ml-1 text-sm text-gray-600 dark:text-gray-400">
                {product.rating || 0} ({product.numReviews || 0} reviews)
              </span>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <span className="text-2xl font-bold text-primary-600 dark:text-primary-400">
                ${discountedPrice.toFixed(2)}
              </span>
              {product.discount > 0 && (
                <span className="ml-2 text-gray-500 line-through">
                  ${product.price.toFixed(2)}
                </span>
              )}
            </div>
            <button
              onClick={handleAddToCart}
              className="btn-primary flex items-center gap-2"
            >
              <ShoppingCart size={20} />
              Add to Cart
            </button>
          </div>
        </div>
      </Link>
    );
  }

  return (
    <Link
      to={`/products/${product._id}`}
      className="group bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden"
    >
      <div className="relative overflow-hidden aspect-square">
        <img
          src={product.images?.[0] || 'https://via.placeholder.com/400'}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        {product.discount > 0 && (
          <div className="absolute top-2 right-2 bg-primary-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
            -{product.discount}%
          </div>
        )}
        <button
          onClick={(e) => {
            e.preventDefault();
            toast.success('Added to wishlist!');
          }}
          className="absolute top-2 left-2 bg-white dark:bg-gray-800 p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-primary-500 hover:text-white"
        >
          <Heart size={20} />
        </button>
      </div>

      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 line-clamp-1">
          {product.name}
        </h3>
        <p className="text-gray-600 dark:text-gray-400 text-sm mb-3 line-clamp-2">
          {product.description}
        </p>

        <div className="flex items-center gap-1 mb-3">
          <Star size={16} className="fill-yellow-400 text-yellow-400" />
          <span className="text-sm text-gray-600 dark:text-gray-400">
            {product.rating || 0} ({product.numReviews || 0})
          </span>
        </div>

        <div className="flex items-center justify-between">
          <div>
            <span className="text-xl font-bold text-primary-600 dark:text-primary-400">
              ${discountedPrice.toFixed(2)}
            </span>
            {product.discount > 0 && (
              <span className="ml-2 text-sm text-gray-500 line-through">
                ${product.price.toFixed(2)}
              </span>
            )}
          </div>
          <button
            onClick={handleAddToCart}
            className="bg-primary-500 text-white p-2 rounded-lg hover:bg-primary-600 transition-colors"
          >
            <ShoppingCart size={20} />
          </button>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
