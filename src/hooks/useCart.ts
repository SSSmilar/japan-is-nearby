import { useState, useCallback } from 'react';
import { CartContextType } from '../types/product';

export const useCart = (): CartContextType => {
  const [cart, setCart] = useState<Record<string, number>>({});

  const addToCart = useCallback((variantId: string, quantity: number) => {
    setCart((prevCart) => ({
      ...prevCart,
      [variantId]: (prevCart[variantId] || 0) + quantity,
    }));
  }, []);

  const removeFromCart = useCallback((variantId: string) => {
    setCart((prevCart) => {
      const newCart = { ...prevCart };
      delete newCart[variantId];
      return newCart;
    });
  }, []);

  const updateQuantity = useCallback((variantId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(variantId);
      return;
    }
    setCart((prevCart) => ({
      ...prevCart,
      [variantId]: quantity,
    }));
  }, [removeFromCart]);

  const getCartQuantity = useCallback((variantId: string) => {
    return cart[variantId] || 0;
  }, [cart]);

  const clearCart = useCallback(() => {
    setCart({});
  }, []);

  return {
    cart,
    addToCart,
    removeFromCart,
    updateQuantity,
    getCartQuantity,
    clearCart,
  };
}; 