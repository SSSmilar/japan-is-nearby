export interface ProductVariant {
  id: string;
  diameter: string;
  et: string;
  price: number;
  stock: number;
}

export interface ProductSpecs {
  diameter: string | string[];
  width: string;
  pcd: string;
  et: string | string[];
  dia: string;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  images: string[];
  specs: ProductSpecs;
  variants: ProductVariant[];
}

export interface CartContextType {
  cart: Record<string, number>;
  addToCart: (variantId: string, quantity: number) => void;
  removeFromCart: (variantId: string) => void;
  updateQuantity: (variantId: string, quantity: number) => void;
  getCartQuantity: (variantId: string) => number;
  clearCart: () => void;
}

export interface CartItem {
  variantId: string;
  quantity: number;
}