import React, { useState, useRef, useEffect } from 'react';
import { ShoppingCart, X, Trash2 } from 'lucide-react';
import { useCart } from '../contexts/CartContext';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import ConfirmModal from './ConfirmModal';

const CartIcon = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const { items, removeFromCart, clearCart } = useCart();
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Количество разных типов товаров
  const uniqueItemsCount = items.length;

  // Общая сумма
  const total = items.reduce((sum, item) => {
    const price = parseFloat(item.product.price.replace(/[^0-9.-]+/g, ''));
    return sum + price * item.quantity;
  }, 0);

  // Закрытие при клике вне корзины
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleCheckout = () => {
    // Здесь будет логика оплаты
    console.log('Proceeding to checkout...');
  };

  const handleClearCart = () => {
    setIsConfirmOpen(true);
  };

  return (
    <>
      <div className="relative" ref={dropdownRef}>
        <div 
          className="cursor-pointer p-2 hover:bg-gray-100 rounded-full transition-colors"
          onClick={(e) => {
            e.stopPropagation();
            setIsOpen(!isOpen);
          }}
        >
          <ShoppingCart className="w-6 h-6" />
          <AnimatePresence>
            {uniqueItemsCount > 0 && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0 }}
                className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold"
              >
                {uniqueItemsCount}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.2 }}
              className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg border border-gray-200 z-50"
            >
              <div className="p-4">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">Корзина</h3>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setIsOpen(false);
                    }}
                    className="text-gray-400 hover:text-gray-500 transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <div className="space-y-3 max-h-96 overflow-auto">
                  {items.length === 0 ? (
                    <p className="text-gray-500 text-center py-4">Корзина пуста</p>
                  ) : (
                    items.map((item) => (
                      <div
                        key={item.product.id}
                        className="flex items-center justify-between bg-gray-50 p-3 rounded-lg group"
                      >
                        <div className="flex items-center space-x-3">
                          <img
                            src={item.product.image}
                            alt={item.product.name}
                            className="w-12 h-12 object-cover rounded-md"
                          />
                          <div>
                            <h4 className="text-sm font-medium text-gray-900">{item.product.name}</h4>
                            <p className="text-sm text-gray-500">
                              {item.quantity} × {item.product.price}
                            </p>
                          </div>
                        </div>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            removeFromCart(item.product.id);
                          }}
                          className="opacity-0 group-hover:opacity-100 transition-opacity text-gray-400 hover:text-red-500"
                        >
                          <X className="w-5 h-5" />
                        </button>
                      </div>
                    ))
                  )}
                </div>

                {items.length > 0 && (
                  <>
                    <div className="border-t border-gray-200 mt-4 pt-4">
                      <div className="flex justify-between items-center mb-4">
                        <span className="text-sm font-medium text-gray-900">Итого:</span>
                        <span className="text-lg font-semibold text-gray-900">
                          {total.toLocaleString('ru-RU', {
                            style: 'currency',
                            currency: 'RUB'
                          })}
                        </span>
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleCheckout();
                          }}
                          className="w-full px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors"
                        >
                          Оплатить
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleClearCart();
                          }}
                          className="w-full px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors flex items-center justify-center space-x-1"
                        >
                          <Trash2 className="w-4 h-4" />
                          <span>Очистить</span>
                        </button>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <ConfirmModal
        isOpen={isConfirmOpen}
        onClose={() => setIsConfirmOpen(false)}
        onConfirm={clearCart}
        title="Очистить корзину"
        message="Вы уверены, что хотите очистить корзину? Это действие нельзя отменить."
      />
    </>
  );
};

export default CartIcon;
