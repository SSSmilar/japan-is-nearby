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
  const [rating, setRating] = useState(0);
  const [text, setText] = useState('');
  const [error, setError] = useState('');
  const [orderInfo] = useState<OrderInfo | null>(null);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    
    if (rating === 0) {
      setError('Пожалуйста, поставьте оценку');
      return;
    }
    
    if (text.trim().length < 10) {
      setError('Отзыв должен содержать минимум 10 символов');
      return;
    }
    
    onSubmit({ rating, comment: text });
    setRating(0);
    setText('');
    setError('');
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center">
      <div className="bg-surface p-6 rounded-lg w-full max-w-lg mx-4 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-text-secondary hover:text-white transition-colors"
        >
          <X className="w-6 h-6" />
        </button>

        <h2 className="text-xl font-bold text-white mb-6">Написать отзыв</h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          {orderInfo && (
            <div className="bg-surface/50 p-4 rounded-lg border border-primary/20">
              <h3 className="font-medium text-white mb-2">Информация о заказе:</h3>
              <p className="text-sm text-text-secondary">Модель: {orderInfo.model}</p>
              <p className="text-sm text-text-secondary">Название: {orderInfo.name}</p>
              <p className="text-sm text-text-secondary">Дата заказа: {orderInfo.date}</p>
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-text-secondary mb-2">
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
                      value <= rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-400'
                    }`}
                  />
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-text-secondary mb-2">
              Ваш отзыв
            </label>
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              className="w-full px-4 py-2 bg-surface border border-primary/20 rounded-lg h-32 resize-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-colors text-white"
              placeholder="Расскажите о вашем опыте использования..."
            />
          </div>

          {error && (
            <p className="text-red-500 text-sm">{error}</p>
          )}

          <div className="flex justify-end gap-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-text-secondary hover:text-white transition-colors"
            >
              Отмена
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
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