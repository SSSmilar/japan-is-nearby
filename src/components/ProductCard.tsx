import React, { useState, useEffect, useRef, useMemo } from 'react';
import { Product } from '../types/product';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Plus, Minus } from 'lucide-react';
import { useCart } from '../contexts/CartContext';
import { useNavigate } from 'react-router-dom';

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const [isHighlighted, setIsHighlighted] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [quantity, setQuantity] = useState(4);
  const cardRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<number>();
  const { addToCart, items } = useCart();
  const navigate = useNavigate();

  // Получаем количество товара в корзине
  const cartQuantity = useMemo(() => {
    const cartItem = items.find(item => item.product.id === product.id);
    return cartItem ? cartItem.quantity : 0;
  }, [items, product.id]);

  // Парсим количество доступного товара из строки
  const availableStock = useMemo(() => {
    const match = product.stock.match(/\d+/);
    return match ? parseInt(match[0]) : 0;
  }, [product.stock]);

  // Оставшееся количество товара с учетом корзины
  const remainingStock = availableStock - cartQuantity;

  const handleIncrement = () => {
    const newQuantity = quantity + 2;
    if (newQuantity <= remainingStock) {
      setQuantity(newQuantity);
    } else {
      // Показываем уведомление о превышении доступного количества
      const notification = document.createElement('div');
      notification.className = 'fixed bottom-4 right-4 bg-red-500 text-white px-4 py-2 rounded-lg shadow-lg z-50';
      notification.textContent = 'Превышено доступное количество товара';
      document.body.appendChild(notification);
      
      setTimeout(() => {
        notification.remove();
      }, 3000);
    }
  };

  const handleDecrement = () => {
    setQuantity(prev => Math.max(4, prev - 2));
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    
    if (quantity <= remainingStock) {
      addToCart(product, quantity);
      
      // Показываем уведомление об успешном добавлении
      const notification = document.createElement('div');
      notification.className = 'fixed bottom-4 right-4 bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg z-50';
      notification.textContent = 'Товар добавлен в корзину';
      document.body.appendChild(notification);
      
      setTimeout(() => {
        notification.remove();
      }, 3000);
    } else {
      // Показываем уведомление о превышении доступного количества
      const notification = document.createElement('div');
      notification.className = 'fixed bottom-4 right-4 bg-red-500 text-white px-4 py-2 rounded-lg shadow-lg z-50';
      notification.textContent = 'Недостаточно товара в наличии';
      document.body.appendChild(notification);
      
      setTimeout(() => {
        notification.remove();
      }, 3000);
    }
  };

  const handleProceedToCheckout = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (quantity <= remainingStock) {
      addToCart(product, quantity);
      navigate('/checkout');
    } else {
      // Показываем уведомление о превышении доступного количества
      const notification = document.createElement('div');
      notification.className = 'fixed bottom-4 right-4 bg-red-500 text-white px-4 py-2 rounded-lg shadow-lg z-50';
      notification.textContent = 'Недостаточно товара в наличии';
      document.body.appendChild(notification);
      
      setTimeout(() => {
        notification.remove();
      }, 3000);
    }
  };

  useEffect(() => {
    const handleProductSelect = (event: CustomEvent) => {
      if (event.detail.productId === product.id) {
        if (timeoutRef.current) {
          window.clearTimeout(timeoutRef.current);
        }

        setIsHighlighted(true);
        
        cardRef.current?.scrollIntoView({ 
          behavior: 'smooth', 
          block: 'center' 
        });

        timeoutRef.current = window.setTimeout(() => {
          setIsHighlighted(false);
        }, 10000);
      }
    };

    window.addEventListener('productSelected' as any, handleProductSelect);

    return () => {
      window.removeEventListener('productSelected' as any, handleProductSelect);
      if (timeoutRef.current) {
        window.clearTimeout(timeoutRef.current);
      }
    };
  }, [product.id]);

  return (
    <motion.div
      ref={cardRef}
      id={`product-${product.id}`}
      className={cn(
        'relative bg-white rounded-lg border p-4 transition-all duration-300',
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
      <div className="aspect-square overflow-hidden rounded-lg bg-gray-100">
        <img
          src={product.image}
          alt={product.name}
          className={cn(
            'h-full w-full object-cover transition-transform duration-300',
            isHighlighted || isHovered ? 'scale-105' : ''
          )}
        />
      </div>
      <div className="mt-4">
        <h3 className="text-sm font-medium text-gray-900">{product.name}</h3>
        <p className="mt-1 text-sm text-gray-500">{product.price}</p>
        <div className="mt-2 flex items-center">
          <div className="flex items-center">
            {[...Array(Math.floor(product.rating))].map((_, i) => (
              <svg
                key={i}
                className="h-4 w-4 text-yellow-400"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M10 15.934l-6.18 3.254 1.18-6.875L.083 7.571l6.9-1.002L10 .333l3.017 6.236 6.9 1.002-4.917 4.742 1.18 6.875L10 15.934z"
                />
              </svg>
            ))}
          </div>
          <p className="ml-2 text-sm text-gray-500">({product.reviews})</p>
        </div>
        <div className="mt-2 flex justify-between items-center">
          <p className="text-sm font-medium text-green-600">{product.stock}</p>
          {cartQuantity > 0 && (
            <p className="text-sm text-gray-500">
              В корзине: {cartQuantity} шт.
            </p>
          )}
        </div>

        {(isHighlighted || isHovered) && (
          <motion.div
            className="absolute left-0 right-0 bottom-0 p-4 bg-gradient-to-t from-white via-white"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
          >
            <div className="flex flex-col space-y-2">
              <div className="flex items-center justify-center space-x-4 mb-2">
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
      </div>
    </motion.div>
  );
};

export default ProductCard;