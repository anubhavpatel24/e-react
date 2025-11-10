import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { Trash2, Plus, Minus, ShoppingBag } from 'lucide-react';
import toast from 'react-hot-toast';

const Cart = () => {
  const { cart, updateCartItem, removeFromCart, cartItemsCount } = useCart();
  const navigate = useNavigate();

  const handleQuantityChange = async (itemId, newQuantity) => {
    if (newQuantity < 1) return;
    const result = await updateCartItem(itemId, newQuantity);
    if (!result.success) {
      toast.error(result.error || 'Failed to update quantity');
    }
  };

  const handleRemove = async (itemId) => {
    const result = await removeFromCart(itemId);
    if (result.success) {
      toast.success('Item removed from cart');
    } else {
      toast.error(result.error || 'Failed to remove item');
    }
  };

  const calculateTotal = () => {
    return cart?.items?.reduce((total, item) => {
      const price = item.product?.price || 0;
      const discount = item.product?.discount || 0;
      const discountedPrice = price - (price * discount / 100);
      return total + (discountedPrice * item.quantity);
    }, 0) || 0;
  };

  if (!cart?.items || cart.items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <ShoppingBag size={64} className="mx-auto text-gray-400 mb-4" />
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Your cart is empty
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-8">
            Add some products to get started!
          </p>
          <Link to="/products" className="btn-primary">
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
      <div className="max-w-7xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
          Shopping Cart ({cartItemsCount} items)
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {cart.items.map((item) => (
              <div
                key={item._id}
                className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 flex gap-6"
              >
                <img
                  src={item.product?.images?.[0] || 'https://via.placeholder.com/150'}
                  alt={item.product?.name}
                  className="w-24 h-24 object-cover rounded-lg"
                />
                
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                    {item.product?.name}
                  </h3>
                  {item.size && (
                    <p className="text-sm text-gray-600 dark:text-gray-400">Size: {item.size}</p>
                  )}
                  {item.color && (
                    <p className="text-sm text-gray-600 dark:text-gray-400">Color: {item.color}</p>
                  )}
                  
                  <div className="mt-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => handleQuantityChange(item._id, item.quantity - 1)}
                        className="p-1 rounded-lg bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600"
                      >
                        <Minus size={16} />
                      </button>
                      <span className="text-lg font-semibold text-gray-900 dark:text-white w-8 text-center">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => handleQuantityChange(item._id, item.quantity + 1)}
                        className="p-1 rounded-lg bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600"
                      >
                        <Plus size={16} />
                      </button>
                    </div>

                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <p className="text-xl font-bold text-primary-600 dark:text-primary-400">
                          ${((item.product?.price - (item.product?.price * (item.product?.discount || 0) / 100)) * item.quantity).toFixed(2)}
                        </p>
                        {item.product?.discount > 0 && (
                          <p className="text-sm text-gray-500 line-through">
                            ${(item.product?.price * item.quantity).toFixed(2)}
                          </p>
                        )}
                      </div>
                      <button
                        onClick={() => handleRemove(item._id)}
                        className="text-red-500 hover:text-red-700 p-2"
                      >
                        <Trash2 size={20} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 sticky top-4">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                Order Summary
              </h2>

              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-gray-600 dark:text-gray-400">
                  <span>Subtotal</span>
                  <span>${calculateTotal().toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-600 dark:text-gray-400">
                  <span>Shipping</span>
                  <span>Free</span>
                </div>
                <div className="border-t border-gray-200 dark:border-gray-700 pt-3">
                  <div className="flex justify-between text-xl font-bold text-gray-900 dark:text-white">
                    <span>Total</span>
                    <span>${calculateTotal().toFixed(2)}</span>
                  </div>
                </div>
              </div>

              <button
                onClick={() => navigate('/checkout')}
                className="btn-primary w-full mb-4"
              >
                Proceed to Checkout
              </button>
              
              <Link
                to="/products"
                className="block text-center text-primary-600 dark:text-primary-400 hover:underline"
              >
                Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
