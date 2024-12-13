import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product } from '../types/product';

interface SelectedProductContextType {
  selectedProduct: Product | null;
  setSelectedProduct: (product: Product | null) => void;
}

const SelectedProductContext = createContext<SelectedProductContextType | undefined>(undefined);

export const SelectedProductProvider = ({ children }: { children: React.ReactNode }) => {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  useEffect(() => {
    if (selectedProduct) {
      // Clear selection after 10 seconds
      const timeout = setTimeout(() => {
        setSelectedProduct(null);
      }, 10000);

      return () => clearTimeout(timeout);
    }
  }, [selectedProduct]);

  return (
    <SelectedProductContext.Provider value={{ selectedProduct, setSelectedProduct }}>
      {children}
    </SelectedProductContext.Provider>
  );
};

export const useSelectedProduct = () => {
  const context = useContext(SelectedProductContext);
  if (context === undefined) {
    throw new Error('useSelectedProduct must be used within a SelectedProductProvider');
  }
  return context;
};
