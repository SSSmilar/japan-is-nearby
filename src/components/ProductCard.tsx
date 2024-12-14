import React, { useState, useEffect, useRef, useMemo } from 'react';
import { Product } from '../types/product';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Plus, Minus } from 'lucide-react';
import { useCart } from '../contexts/CartContext';
import { useNavigate } from 'react-router-dom';
import ProductImage from './ProductImage';
import ProductRating from './ProductRating';
import { parsePrice, formatPrice } from '../utils/priceUtils';

export interface ProductCardProps {
  product: Product;
  isSelected?: boolean;
}

const ProductCard = ({ product, isSelected = false }: ProductCardProps) => {
  const [isHighlighted, setIsHighlighted] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [quantity, setQuantity] = useState(4);
  const cardRef = useRef<HTMLDivElement>(null);
  const highlightTimeoutRef = useRef<number | null>(null);
  const { addToCart, items } = useCart();
  const navigate = useNavigate();

  const cartQuantity = useMemo(() => {
    const cartItem = items.find(item => item.product.id === product.id);
    return cartItem ? cartItem.quantity : 0;
  }, [items, product.id]);

  const availableStock = useMemo(() => {
    const match = product.stock.match(/\d+/);
    return match ? parseInt(match[0], 10) : 0;
  }, [product.stock]);

  const remainingStock = availableStock - cartQuantity;

  const basePrice = useMemo(() => parsePrice(product.price), [product.price]);

  const totalPrice = useMemo(() => basePrice * quantity, [basePrice, quantity]);

  const handleIncrement = () => {
    const newQuantity = quantity + 2;
    if (newQuantity <= remainingStock) {
      setQuantity(newQuantity);
    } else {
      showNotification('Превышено доступное количество товара', 'error');
    }
  };

  const handleDecrement = () => {
    setQuantity(prev => Math.max(4, prev - 2));
  };

  const showNotification = (message: string, type: 'success' | 'error') => {
    const notification = document.createElement('div');
    notification.className = `fixed bottom-4 right-4 ${
      type === 'success' ? 'bg-green-500' : 'bg-red-500'
    } text-white px-4 py-2 rounded-lg shadow-lg z-50`;
    notification.textContent = message;
    document.body.appendChild(notification);
    
    setTimeout(() => {
      notification.remove();
    }, 3000);
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    
    if (quantity <= remainingStock) {
      addToCart(product, quantity);
      showNotification('Товар добавлен в корзину', 'success');
    } else {
      showNotification('Недостаточно товара в наличии', 'error');
    }
  };

  const handleProceedToCheckout = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (quantity <= remainingStock) {
      addToCart(product, quantity);
      navigate('/checkout');
    } else {
      showNotification('Недостаточно товара в наличии', 'error');
    }
  };

  useEffect(() => {
    const handleActivateHover = (event: CustomEvent<{ productId: string; duration: number }>) => {
      if (event.detail.productId === product.id.toString()) {
        setIsHighlighted(true);
        
        if (highlightTimeoutRef.current) {
          window.clearTimeout(highlightTimeoutRef.current);
        }
        
        highlightTimeoutRef.current = window.setTimeout(() => {
          setIsHighlighted(false);
        }, event.detail.duration);
      }
    };

    window.addEventListener('activate-product-hover', handleActivateHover as EventListener);
    
    return () => {
      window.removeEventListener('activate-product-hover', handleActivateHover as EventListener);
      if (highlightTimeoutRef.current) {
        window.clearTimeout(highlightTimeoutRef.current);
      }
    };
  }, [product.id]);

  useEffect(() => {
    const handleProductSelect = (event: CustomEvent) => {
      if (event.detail.productId === product.id.toString()) {
        if (highlightTimeoutRef.current) {
          window.clearTimeout(highlightTimeoutRef.current);
        }

        setIsHighlighted(true);
        
        cardRef.current?.scrollIntoView({ 
          behavior: 'smooth', 
          block: 'center' 
        });

        highlightTimeoutRef.current = window.setTimeout(() => {
          setIsHighlighted(false);
        }, 10000);
      }
    };

    window.addEventListener('productSelected' as any, handleProductSelect);

    return () => {
      window.removeEventListener('productSelected' as any, handleProductSelect);
      if (highlightTimeoutRef.current) {
        window.clearTimeout(highlightTimeoutRef.current);
      }
    };
  }, [product.id]);

  return (
    <motion.div
      ref={cardRef}
      id={`product-${product.id}`}
      className={cn(
        'relative bg-white rounded-lg border p-4 transition-all duration-300 h-96',
        isHighlighted || isHovered ? 'shadow-lg scale-[1.02] bg-gray-50 border-gray-900' : 'shadow-sm border-gray-200'
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      initial={false}
      animate={isHighlighted || isHovered ? { scale: 1.02 } : { scale: 1 }}
      transition={{
        duration: 0.3,
        ease: "easeInOut"
      }}
    >
      <ProductImage
        src={product.image}
        alt={product.name}
        isHighlighted={isHighlighted}
        isHovered={isHovered}
      />
      
      <div className="mt-4">
        <h3 className="text-sm font-medium text-gray-900">{product.name}</h3>
        <ProductRating rating={product.rating} reviews={product.reviews} />
        
        <div className="mt-2 flex justify-between items-center">
          <p className="text-sm text-gray-500">{product.price}</p>
          <p className="text-sm font-medium text-green-600">{product.stock}</p>
        </div>

        {(isHighlighted || isHovered) && (
          <motion.div
            className="absolute left-0 right-0 bottom-0 p-4 bg-gradient-to-t from-white via-white to-transparent pt-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
          >
            <div className="flex flex-col space-y-2">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center space-x-4">
                  <button
                    onClick={handleDecrement}
                    className="w-8 h-8 flex items-center justify-center bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                    disabled={quantity <= 4}
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="font-medium text-lg w-8 text-center">{quantity}</span>
                  <button
                    onClick={handleIncrement}
                    className="w-8 h-8 flex items-center justify-center bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                    disabled={quantity + 2 > remainingStock}
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
                <div className="flex flex-col items-end">
                  <div className="flex items-baseline gap-1">
                    <span className="text-sm text-gray-500">Итого:</span>
                    <span className="font-medium text-lg text-gray-900">
                      {formatPrice(totalPrice)}
                    </span>
                  </div>
                  <span className="text-xs text-gray-500">
                    {formatPrice(basePrice)} × {quantity} шт.
                  </span>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <button
                  className={cn(
                    "w-full px-4 py-2 rounded-lg transition-colors",
                    quantity <= remainingStock
                      ? "bg-gray-900 text-white hover:bg-gray-800"
                      : "bg-gray-300 text-gray-500 cursor-not-allowed"
                  )}
                  onClick={handleAddToCart}
                  disabled={quantity > remainingStock}
                >
                  В корзину
                </button>
                <button
                  className={cn(
                    "w-full px-4 py-2 rounded-lg transition-colors",
                    quantity <= remainingStock
                      ? "border border-gray-900 text-gray-900 hover:bg-gray-50"
                      : "border border-gray-300 text-gray-500 cursor-not-allowed"
                  )}
                  onClick={handleProceedToCheckout}
                  disabled={quantity > remainingStock}
                >
                  К оплате
                </button>
              </div>
              {remainingStock < quantity && (
                <p className="text-sm text-red-500 text-center mt-2">
                  Доступно только {remainingStock} шт.
                </p>
              )}
            </div>
          </motion.div>
        )}
        {cartQuantity > 0 && (
          <p className="text-sm text-gray-500 text-center">
            В корзине: {cartQuantity} шт.
          </p>
        )}
      </div>
    </motion.div>
  );
};

export default ProductCard;