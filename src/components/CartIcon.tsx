import { useState, useRef, useEffect } from 'react';
import { ShoppingCart, X, Trash2 } from 'lucide-react';
import { useCart } from '../contexts/CartContext';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '../lib/utils';
import ConfirmModal from './ConfirmModal';
import { products } from '../data/products';
import { Product, ProductVariant } from '../types/product';

interface CartItemType {
  variantId: string;
  quantity: number;
  product: Product | undefined;
  variant: ProductVariant | undefined;
  price: number;
}

const CartIcon = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const { cart, removeFromCart, clearCart } = useCart();
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Количество товаров в корзине
  const itemsCount = Object.values(cart).reduce((sum, quantity) => sum + quantity, 0);

  // Получаем информацию о товарах в корзине
  const cartItems: CartItemType[] = Object.entries(cart).map(([variantId, quantity]) => {
    const [productId] = variantId.split('-');
    const product = products.find((p: Product) => p.id === productId);
    const variant = product?.variants?.find((v: ProductVariant) => v.id === variantId);
    
    return {
      variantId,
      quantity,
      product,
      variant,
      price: variant?.price || product?.price || 0
    };
  });

  // Общая сумма
  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

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

  return (
    <>
      <div className="relative" ref={dropdownRef}>
        <button 
          className="relative p-2 hover:bg-gray-100 rounded-full transition-all duration-300 group"
          onClick={() => setIsOpen(!isOpen)}
        >
          <ShoppingCart className="w-6 h-6 text-gray-700 group-hover:text-gray-900 transition-colors" />
          <AnimatePresence>
            {itemsCount > 0 && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0 }}
                className="absolute -top-1 -right-1 bg-blue-600 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold"
              >
                {itemsCount}
              </motion.div>
            )}
          </AnimatePresence>
        </button>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.2 }}
              className="absolute right-0 mt-2 w-96 bg-white rounded-xl shadow-xl border border-gray-200 z-50 overflow-hidden"
            >
              <div className="p-4">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">Корзина</h3>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="p-1 hover:bg-gray-100 rounded-full transition-colors"
                  >
                    <X className="w-5 h-5 text-gray-500" />
                  </button>
                </div>

                <div className="space-y-3 max-h-[60vh] overflow-auto">
                  {cartItems.length === 0 ? (
                    <div className="text-center py-8">
                      <ShoppingCart className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                      <p className="text-gray-500">Корзина пуста</p>
                    </div>
                  ) : (
                    cartItems.map(({ variantId, quantity, product, variant }) => (
                      <div
                        key={variantId}
                        className="flex items-center justify-between p-3 bg-gray-50 rounded-lg group hover:bg-gray-100 transition-colors"
                      >
                        <div className="flex items-center space-x-3">
                          {product?.images && product.images[0] && (
                            <img
                              src={product.images[0]}
                              alt={product.name}
                              className="w-16 h-16 object-cover rounded-md"
                            />
                          )}
                          <div>
                            <h4 className="text-sm font-medium text-gray-900">{product?.name}</h4>
                            <p className="text-sm text-gray-500">
                              {variant ? `ø${variant.diameter}" ET${variant.et}` : ''}
                            </p>
                            <p className="text-sm font-medium text-gray-900">
                              {quantity} × {new Intl.NumberFormat('ru-RU', {
                                style: 'currency',
                                currency: 'RUB',
                                maximumFractionDigits: 0
                              }).format(variant?.price || product?.price || 0)}
                            </p>
                          </div>
                        </div>
                        <button
                          onClick={() => removeFromCart(variantId)}
                          className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-full transition-all duration-300"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    ))
                  )}
                </div>

                {cartItems.length > 0 && (
                  <div className="border-t border-gray-200 mt-4 pt-4 space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium text-gray-900">Итого:</span>
                      <span className="text-lg font-semibold text-gray-900">
                        {new Intl.NumberFormat('ru-RU', {
                          style: 'currency',
                          currency: 'RUB',
                          maximumFractionDigits: 0
                        }).format(total)}
                      </span>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        onClick={() => {
                          setIsOpen(false);
                          // TODO: Добавить переход к оформлению заказа
                        }}
                        className="w-full px-4 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] font-medium"
                      >
                        Оформить заказ
                      </button>
                      <button
                        onClick={() => setIsConfirmOpen(true)}
                        className="w-full px-4 py-2.5 border-2 border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] font-medium flex items-center justify-center space-x-2"
                      >
                        <Trash2 className="w-4 h-4" />
                        <span>Очистить</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <ConfirmModal
        isOpen={isConfirmOpen}
        onClose={() => setIsConfirmOpen(false)}
        onConfirm={() => {
          clearCart();
          setIsConfirmOpen(false);
        }}
        title="Очистить корзину"
        message="Вы уверены, что хотите очистить корзину? Это действие нельзя отменить."
      />
    </>
  );
};

export default CartIcon;
