import React, { useState } from 'react';
import { Star, Plus, Minus, Heart } from 'lucide-react';
import { motion } from 'framer-motion';

interface ProductCardProps {
  product: {
    id: number;
    name: string;
    price: string;
    rating: number;
    reviews: number;
    stock: string;
    image: string;
  };
}

const ProductCard = ({ product }: ProductCardProps) => {
  const [quantity, setQuantity] = useState(4); // Changed initial value to 4
  const [isHovered, setIsHovered] = useState(false);

  const handleIncrement = () => setQuantity(prev => prev + 1);
  const handleDecrement = () => setQuantity(prev => Math.max(4, prev - 1)); // Changed minimum to 4

  return (
    <motion.div
      className="relative bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden"
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      initial={false}
      animate={isHovered ? { scale: 1.02 } : { scale: 1 }}
      transition={{ duration: 0.2 }}
    >
      <div className="relative">
        <img src={product.image} alt={product.name} className="w-full h-auto" />
        <button className="absolute top-4 right-4 p-2 rounded-full bg-white/80 hover:bg-white">
          <Heart className="w-5 h-5 text-gray-600" />
        </button>
      </div>

      <div className="p-4">
        <div className="flex items-center mb-2">
          <div className="flex items-center">
            <Star className="w-4 h-4 fill-current text-yellow-400" />
            <span className="ml-1 text-sm font-medium">{product.rating}</span>
          </div>
          <span className="mx-2 text-gray-400">•</span>
          <span className="text-sm text-gray-600">{product.reviews} отзыва</span>
        </div>

        <h3 className="text-sm font-medium text-gray-900 mb-2">{product.name}</h3>
        <div className="text-sm text-green-600 mb-2">{product.stock}</div>
        <div className="text-lg font-bold text-gray-900 mb-4">{product.price}</div>

        {isHovered && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="space-y-3"
          >
            <div className="flex items-center justify-between border rounded-lg p-2">
              <button
                onClick={handleDecrement}
                className="p-1 hover:bg-gray-100 rounded"
              >
                <Minus className="w-4 h-4" />
              </button>
              <span className="font-medium">{quantity}</span>
              <button
                onClick={handleIncrement}
                className="p-1 hover:bg-gray-100 rounded"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
            
            <button className="w-full bg-black text-white py-2 rounded-lg hover:bg-gray-900 transition-colors">
              В корзину
            </button>
            <button className="w-full border border-black text-black py-2 rounded-lg hover:bg-gray-50 transition-colors">
              Забрать в магазине
            </button>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

export default ProductCard;