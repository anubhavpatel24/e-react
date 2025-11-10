import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from './AuthContext';

const CartContext = createContext();

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within CartProvider');
  }
  return context;
};

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState({ items: [] });
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      fetchCart();
    } else {
      setCart({ items: [] });
    }
  }, [user]);

  const fetchCart = async () => {
    try {
      setLoading(true);
      const response = await axios.get('/api/cart');
      setCart(response.data);
    } catch (error) {
      console.error('Error fetching cart:', error);
    } finally {
      setLoading(false);
    }
  };

  const addToCart = async (productId, quantity = 1, size, color) => {
    try {
      const response = await axios.post('/api/cart/items', {
        productId,
        quantity,
        size,
        color,
      });
      setCart(response.data);
      return { success: true };
    } catch (error) {
      return { success: false, error: error.response?.data?.message || 'Failed to add to cart' };
    }
  };

  const updateCartItem = async (itemId, quantity) => {
    try {
      const response = await axios.put(`/api/cart/items/${itemId}`, { quantity });
      setCart(response.data);
      return { success: true };
    } catch (error) {
      return { success: false, error: error.response?.data?.message || 'Failed to update cart' };
    }
  };

  const removeFromCart = async (itemId) => {
    try {
      const response = await axios.delete(`/api/cart/items/${itemId}`);
      setCart(response.data);
      return { success: true };
    } catch (error) {
      return { success: false, error: error.response?.data?.message || 'Failed to remove from cart' };
    }
  };

  const clearCart = async () => {
    try {
      await axios.delete('/api/cart');
      setCart({ items: [] });
      return { success: true };
    } catch (error) {
      return { success: false, error: error.response?.data?.message || 'Failed to clear cart' };
    }
  };

  const cartItemsCount = cart?.items?.reduce((total, item) => total + item.quantity, 0) || 0;

  return (
    <CartContext.Provider value={{ 
      cart, 
      loading, 
      addToCart, 
      updateCartItem, 
      removeFromCart, 
      clearCart,
      cartItemsCount,
      fetchCart
    }}>
      {children}
    </CartContext.Provider>
  );
};
