import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useProduct } from '../hooks/useProducts';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { Star, ShoppingCart, Heart, Truck, Shield, ArrowLeft } from 'lucide-react';
import toast from 'react-hot-toast';

const ProductDetail = () => {
  const { id } = useParams();
  const { data: product, isLoading, error } = useProduct(id);
  const { addToCart } = useCart();
  const { user } = useAuth();
  
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [quantity, setQuantity] = useState(1);

  const handleAddToCart = async () => {
    if (!user) {
      toast.error('Please login to add items to cart');
      return;
    }

    if (product.sizes?.length > 0 && !selectedSize) {
      toast.error('Please select a size');
      return;
    }

    const result = await addToCart(product._id, quantity, selectedSize, selectedColor);
    if (result.success) {
      toast.success('Added to cart!');
    } else {
      toast.error(result.error || 'Failed to add to cart');
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="animate-pulse grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="bg-gray-300 dark:bg-gray-700 h-96 rounded-lg"></div>
            <div className="space-y-4">
              <div className="bg-gray-300 dark:bg-gray-700 h-8 rounded w-3/4"></div>
              <div className="bg-gray-300 dark:bg-gray-700 h-4 rounded w-1/2"></div>
              <div className="bg-gray-300 dark:bg-gray-700 h-24 rounded"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Product not found</h2>
          <Link to="/products" className="text-primary-600 dark:text-primary-400 hover:underline mt-4 inline-block">
            Back to Products
          </Link>
        </div>
      </div>
    );
  }

  const discountedPrice = product.discount 
    ? product.price - (product.price * product.discount / 100)
    : product.price;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
      <div className="max-w-7xl mx-auto px-4">
        <Link to="/products" className="flex items-center gap-2 text-primary-600 dark:text-primary-400 hover:underline mb-8">
          <ArrowLeft size={20} />
          Back to Products
        </Link>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Images */}
          <div>
            <div className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden mb-4">
              <img
                src={product.images?.[selectedImage] || 'https://via.placeholder.com/600'}
                alt={product.name}
                className="w-full h-96 object-cover"
              />
            </div>
            {product.images?.length > 1 && (
              <div className="grid grid-cols-4 gap-4">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`border-2 rounded-lg overflow-hidden ${
                      selectedImage === index
                        ? 'border-primary-500'
                        : 'border-gray-300 dark:border-gray-600'
                    }`}
                  >
                    <img src={image} alt={`${product.name} ${index + 1}`} className="w-full h-20 object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Details */}
          <div>
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              {product.name}
            </h1>

            <div className="flex items-center gap-4 mb-6">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={20}
                    className={i < Math.floor(product.rating || 0) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}
                  />
                ))}
              </div>
              <span className="text-gray-600 dark:text-gray-400">
                {product.rating || 0} ({product.numReviews || 0} reviews)
              </span>
            </div>

            <div className="mb-6">
              <span className="text-4xl font-bold text-primary-600 dark:text-primary-400">
                ${discountedPrice.toFixed(2)}
              </span>
              {product.discount > 0 && (
                <>
                  <span className="ml-3 text-2xl text-gray-500 line-through">
                    ${product.price.toFixed(2)}
                  </span>
                  <span className="ml-3 bg-primary-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                    {product.discount}% OFF
                  </span>
                </>
              )}
            </div>

            <p className="text-gray-600 dark:text-gray-400 mb-8 text-lg">
              {product.description}
            </p>

            {/* Size Selection */}
            {product.sizes?.length > 0 && (
              <div className="mb-6">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-3">Select Size</h3>
                <div className="flex gap-3">
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`px-6 py-2 rounded-lg border-2 transition-colors ${
                        selectedSize === size
                          ? 'border-primary-500 bg-primary-500 text-white'
                          : 'border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:border-primary-500'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Color Selection */}
            {product.colors?.length > 0 && (
              <div className="mb-6">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-3">Select Color</h3>
                <div className="flex gap-3">
                  {product.colors.map((color) => (
                    <button
                      key={color}
                      onClick={() => setSelectedColor(color)}
                      className={`px-6 py-2 rounded-lg border-2 transition-colors ${
                        selectedColor === color
                          ? 'border-primary-500 bg-primary-500 text-white'
                          : 'border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:border-primary-500'
                      }`}
                    >
                      {color}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity */}
            <div className="mb-8">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-3">Quantity</h3>
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-4 py-2 bg-gray-200 dark:bg-gray-700 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600"
                >
                  -
                </button>
                <span className="text-xl font-semibold text-gray-900 dark:text-white w-12 text-center">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-4 py-2 bg-gray-200 dark:bg-gray-700 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600"
                >
                  +
                </button>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-4 mb-8">
              <button onClick={handleAddToCart} className="btn-primary flex-1 flex items-center justify-center gap-2">
                <ShoppingCart size={20} />
                Add to Cart
              </button>
              <button className="btn-secondary px-6">
                <Heart size={20} />
              </button>
            </div>

            {/* Features */}
            <div className="grid grid-cols-2 gap-4 border-t border-gray-200 dark:border-gray-700 pt-8">
              <div className="flex items-center gap-3">
                <Truck className="text-primary-500" size={24} />
                <div>
                  <p className="font-semibold text-gray-900 dark:text-white">Free Shipping</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">On orders over $50</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Shield className="text-primary-500" size={24} />
                <div>
                  <p className="font-semibold text-gray-900 dark:text-white">Secure Payment</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">100% secure</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
