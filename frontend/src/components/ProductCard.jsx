import React from 'react';
import { Link } from 'react-router-dom';
import { Star, Heart, ShoppingCart } from 'lucide-react';

const ProductCard = ({ product }) => {
  const {
    _id,
    name,
    price,
    originalPrice,
    images,
    rating,
    reviewCount,
    isNew,
    discount,
    inStock
  } = product;

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 group">
      {/* Product Image */}
      <div className="relative overflow-hidden">
        <Link to={`/products/${_id}`}>
          <img
            src={images[0]}
            alt={name}
            className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </Link>
        
        {/* Badges */}
        <div className="absolute top-2 left-2 flex flex-col space-y-1">
          {isNew && (
            <span className="bg-green-500 text-white px-2 py-1 text-xs rounded">New</span>
          )}
          {discount > 0 && (
            <span className="bg-red-500 text-white px-2 py-1 text-xs rounded">
              -{discount}%
            </span>
          )}
        </div>

        {/* Actions */}
        <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <button className="bg-white p-2 rounded-full shadow-md hover:bg-gray-50 mb-2">
            <Heart size={18} className="text-gray-600" />
          </button>
          <button className="bg-white p-2 rounded-full shadow-md hover:bg-gray-50">
            <ShoppingCart size={18} className="text-gray-600" />
          </button>
        </div>

        {!inStock && (
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <span className="text-white font-semibold">Out of Stock</span>
          </div>
        )}
      </div>

      {/* Product Info */}
      <div className="p-4">
        <Link to={`/products/${_id}`}>
          <h3 className="font-semibold text-gray-800 mb-2 hover:text-primary-500 transition-colors line-clamp-2">
            {name}
          </h3>
        </Link>

        {/* Rating */}
        <div className="flex items-center mb-2">
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                size={14}
                className={`${
                  i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
                }`}
              />
            ))}
          </div>
          <span className="text-sm text-gray-600 ml-1">({reviewCount})</span>
        </div>

        {/* Price */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="text-lg font-bold text-gray-900">${price}</span>
            {originalPrice > price && (
              <span className="text-sm text-gray-500 line-through">${originalPrice}</span>
            )}
          </div>
          
          <button 
            disabled={!inStock}
            className={`p-2 rounded-full ${
              inStock 
                ? 'bg-primary-500 text-white hover:bg-primary-600' 
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            } transition-colors`}
          >
            <ShoppingCart size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;