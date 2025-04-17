import { useState, useEffect, useRef, useMemo, useCallback, memo } from 'react';
import { Product, ProductVariant } from '../types/product';
import { motion } from 'framer-motion';
import { cn } from '../lib/utils';
import { Plus, Minus, MessageSquare, ShoppingCart } from 'lucide-react';
import { useCart } from '../contexts/CartContext';
import { useNavigate } from 'react-router-dom';
import ProductImage from './ProductImage';
import ProductRating from './ProductRating';
import { formatPrice } from '../utils/priceUtils';
import { useNotification } from '../hooks/useNotification';
import { Button } from './ui/button';

export interface ProductCardProps {
  product: Product;
  onHighlight?: (productId: string) => void;
  isHighlighted?: boolean;
}

const formatStock = (stock: number) => {
  return `${stock} шт. в наличии`;
};

const ProductCard = memo(({ product, onHighlight, isHighlighted }: ProductCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [selectedVariant, setSelectedVariant] = useState<string | undefined>(
    product.variants?.[0]?.id
  );
  const cardRef = useRef<HTMLDivElement>(null);
  const highlightTimeoutRef = useRef<number | null>(null);
  const imageIntervalRef = useRef<number | null>(null);
  const { addToCart, getCartQuantity } = useCart();
  const { showNotification } = useNotification();
  const navigate = useNavigate();

  const cartQuantity = useMemo(() => {
    const variantId = selectedVariant || product.id;
    return getCartQuantity(variantId);
  }, [selectedVariant, product.id, getCartQuantity]);

  const availableStock = useMemo(() => {
    if (selectedVariant) {
      const variant = product.variants?.find(v => v.id === selectedVariant);
      return variant?.stock || 0;
    }
    return product.variants?.[0]?.stock || 0;
  }, [product.variants, selectedVariant]);

  const remainingStock = useMemo(() => availableStock - cartQuantity, [availableStock, cartQuantity]);

  const totalPrice = useMemo(() => {
    if (selectedVariant) {
      const variant = product.variants?.find(v => v.id === selectedVariant);
      return (variant?.price || product.price) * quantity;
    }
    return product.price * quantity;
  }, [product, selectedVariant, quantity]);

  const handleQuantityChange = (delta: number) => {
    const newQuantity = Math.max(1, Math.min(quantity + delta, availableStock));
    setQuantity(newQuantity);
  };

  const handleAddToCart = () => {
    if (quantity > 0 && quantity <= availableStock) {
      const variantId = selectedVariant || product.id;
      addToCart(variantId, quantity);
      showNotification({
        title: 'Товар добавлен в корзину',
        message: `${product.name} (${quantity} шт.) - ${formatPrice(totalPrice)}`,
        type: 'success'
      });
    }
  };

  const handleProceedToCheckout = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    if (quantity <= remainingStock) {
      const variantId = selectedVariant || product.id;
      addToCart(variantId, quantity);
      navigate('/checkout');
    }
  }, [addToCart, product.id, selectedVariant, quantity, remainingStock, navigate]);

  const handleReviewsClick = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const modelName = product.name.split(' ')[0];
    navigate(`/reviews?model=${encodeURIComponent(modelName)}`);
  }, [product.name, navigate]);

  const handleImageDotClick = (e: React.MouseEvent, index: number) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentImageIndex(index);
  };

  useEffect(() => {
    if (isHighlighted) {
      setIsHovered(true);
      cardRef.current?.scrollIntoView({
        behavior: 'smooth',
        block: 'center'
      });
      highlightTimeoutRef.current = window.setTimeout(() => {
        setIsHovered(false);
      }, 3000);
    }

    if (!isHovered) {
      setCurrentImageIndex(0);
    }

    return () => {
      if (highlightTimeoutRef.current) {
        window.clearTimeout(highlightTimeoutRef.current);
        highlightTimeoutRef.current = null;
      }
      if (imageIntervalRef.current) {
        window.clearInterval(imageIntervalRef.current);
        imageIntervalRef.current = null;
      }
    };
  }, [isHighlighted]);

  return (
    <motion.div
      ref={cardRef}
      id={`product-${product.id}`}
      className={cn(
        'relative bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300',
        isHighlighted && 'ring-2 ring-blue-500 shadow-lg scale-105',
        isHovered && 'shadow-xl'
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      layout
      onClick={() => onHighlight?.(product.id)}
    >
      <div className="relative aspect-square">
        <ProductImage
          images={product.images}
          currentIndex={currentImageIndex}
          onDotClick={handleImageDotClick}
        />
      </div>

      <div className="p-4">
        <h3 className="text-lg font-semibold mb-2 line-clamp-2">{product.name}</h3>
        
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <button
              onClick={handleReviewsClick}
              className="text-gray-500 hover:text-gray-700"
            >
              <MessageSquare className="w-4 h-4" />
            </button>
          </div>
          <span className="text-gray-600 text-sm">{formatStock(remainingStock)}</span>
        </div>

        <div className="grid grid-cols-2 gap-2">
          <button
            onClick={handleAddToCart}
            disabled={availableStock === 0 || cartQuantity >= availableStock}
            className="flex items-center justify-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] group text-sm"
          >
            <ShoppingCart className="w-4 h-4 mr-1.5 transition-transform duration-300 group-hover:scale-110" />
            <span className="font-medium">
              {availableStock === 0 ? 'Нет в наличии' : 'В корзину'}
            </span>
          </button>
          <button
            onClick={handleProceedToCheckout}
            disabled={availableStock === 0 || cartQuantity >= availableStock}
            className="w-full px-4 py-2 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 disabled:border-gray-300 disabled:text-gray-300 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] font-medium text-sm"
          >
            Купить
          </button>
        </div>

        <div className="flex items-center justify-between mt-3">
          <div className="flex items-center space-x-2">
            <button
              onClick={() => handleQuantityChange(-1)}
              disabled={quantity <= 1}
              className="p-1.5 rounded-full hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
            >
              <Minus className="w-4 h-4 text-gray-600" />
            </button>
            <span className="font-medium text-gray-900 min-w-[1.5rem] text-center">{quantity}</span>
            <button
              onClick={() => handleQuantityChange(1)}
              disabled={quantity >= availableStock}
              className="p-1.5 rounded-full hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
            >
              <Plus className="w-4 h-4 text-gray-600" />
            </button>
          </div>
          <div className="text-lg font-bold text-gray-900">
            {formatPrice(totalPrice)}
          </div>
        </div>
      </div>
    </motion.div>
  );
});

ProductCard.displayName = 'ProductCard';

export default ProductCard;