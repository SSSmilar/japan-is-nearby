import { createContext, useContext, useState, type ReactNode } from 'react';
import { Product } from '../types/product';

interface SelectedProductContextType {
  selectedProduct: Product | null;
  setSelectedProduct: (product: Product | null) => void;
}

interface SelectedProductProviderProps {
  children: ReactNode;
}

const SelectedProductContext = createContext<SelectedProductContextType | undefined>(undefined);

export const SelectedProductProvider = ({ children }: SelectedProductProviderProps) => {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

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
