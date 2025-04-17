import { createContext, useContext, useState, useEffect, type FC, type ReactNode } from 'react';
import { Product, CartContextType } from '../types/product';

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<Record<string, number>>(() => {
    const savedCart = localStorage.getItem('cart');
    return savedCart ? JSON.parse(savedCart) : {};
  });

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = (variantId: string, quantity: number) => {
    setCart(prev => ({
      ...prev,
      [variantId]: (prev[variantId] || 0) + quantity
    }));
  };

  const removeFromCart = (variantId: string) => {
    setCart(prev => {
      const { [variantId]: _, ...rest } = prev;
      return rest;
    });
  };

  const updateQuantity = (variantId: string, quantity: number) => {
    setCart(prev => ({
      ...prev,
      [variantId]: quantity
    }));
  };

  const getCartQuantity = (variantId: string) => {
    return cart[variantId] || 0;
  };

  const clearCart = () => {
    setCart({});
  };

  return (
    <CartContext.Provider 
      value={{ 
        cart, 
        addToCart, 
        removeFromCart, 
        updateQuantity, 
        getCartQuantity, 
        clearCart 
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
