import { useState, FormEvent } from 'react';
import { X, Star } from 'lucide-react';

interface AddReviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (review: { rating: number; comment: string }) => void;
}

interface OrderInfo {
  model: string;
  name: string;
  date: string;
}

const AddReviewModal = ({ isOpen, onClose, onSubmit }: AddReviewModalProps) => {
  const [orderNumber, setOrderNumber] = useState('');
  const [rating, setRating] = useState(5);
  const [text, setText] = useState('');
  const [orderInfo, setOrderInfo] = useState<OrderInfo | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleOrderNumberSearch = async () => {
    setIsLoading(true);
    setError('');
    
    // Имитация запроса к API
    setTimeout(() => {
      if (orderNumber === '12345') {
        setOrderInfo({
          model: "X'trike",
          name: "X'trike X-136 7x17 PCD5x108 ET33 DIA 60.1",
          date: "15.03.2024"
        });
      } else {
        setError('Заказ не найден');
      }
      setIsLoading(false);
    }, 1000);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!orderInfo) {
      setError('Пожалуйста, укажите номер заказа');
      return;
    }
    if (!text) {
      setError('Пожалуйста, напишите отзыв');
      return;
    }
    onSubmit({
      rating,
      comment: text
    });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-full max-w-lg p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
        >
          <X className="w-6 h-6" />
        </button>

        <h2 className="text-2xl font-bold mb-6">Добавить отзыв</h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Номер заказа
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                value={orderNumber}
                onChange={(e) => setOrderNumber(e.target.value)}
                className="flex-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-200 focus:border-blue-500 transition-colors"
                placeholder="Например: 12345"
              />
              <button
                type="button"
                onClick={handleOrderNumberSearch}
                disabled={isLoading}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:bg-blue-300"
              >
                {isLoading ? 'Поиск...' : 'Найти'}
              </button>
            </div>
          </div>

          {orderInfo && (
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-medium text-gray-900 mb-2">Информация о заказе:</h3>
              <p className="text-sm text-gray-600">Модель: {orderInfo.model}</p>
              <p className="text-sm text-gray-600">Название: {orderInfo.name}</p>
              <p className="text-sm text-gray-600">Дата заказа: {orderInfo.date}</p>
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Оценка
            </label>
            <div className="flex gap-2">
              {[1, 2, 3, 4, 5].map((value) => (
                <button
                  key={value}
                  type="button"
                  onClick={() => setRating(value)}
                  className="focus:outline-none"
                >
                  <Star
                    className={`w-8 h-8 ${
                      value <= rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'
                    }`}
                  />
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Ваш отзыв
            </label>
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg h-32 resize-none focus:ring-2 focus:ring-blue-200 focus:border-blue-500 transition-colors"
              placeholder="Расскажите о вашем опыте использования..."
            />
          </div>

          {error && (
            <p className="text-red-600 text-sm">{error}</p>
          )}

          <div className="flex justify-end gap-4">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2 border rounded-lg hover:bg-gray-50 transition-colors"
            >
              Отмена
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Отправить
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddReviewModal; 