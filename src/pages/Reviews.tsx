import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { ChevronDown, ThumbsUp, ThumbsDown, Plus } from 'lucide-react';
import Navbar from '../components/Navbar';
import AddReviewModal from '../components/AddReviewModal';

interface Review {
  id: number;
  productId: number;
  author: string;
  rating: number;
  date: string;
  text: string;
  likes: number;
  dislikes: number;
  productModel: string;
}

const mockReviews: Review[] = [
  {
    id: 1,
    productId: 1,
    author: "Александр",
    rating: 5,
    date: "2024-03-15",
    text: "Отличные диски, качество на высоте. Доставка быстрая, упаковка надежная.",
    likes: 12,
    dislikes: 1,
    productModel: "X'trike"
  },
  {
    id: 2,
    productId: 2,
    author: "Михаил",
    rating: 4,
    date: "2024-03-14",
    text: "Хорошие диски, но доставка могла бы быть быстрее. В целом доволен покупкой.",
    likes: 8,
    dislikes: 2,
    productModel: "X'trike"
  },
  {
    id: 3,
    productId: 3,
    author: "Елена",
    rating: 5,
    date: "2024-03-13",
    text: "Прекрасное качество, отличный внешний вид. Рекомендую!",
    likes: 15,
    dislikes: 0,
    productModel: "СКАД"
  },
  {
    id: 4,
    productId: 4,
    author: "Дмитрий",
    rating: 3,
    date: "2024-03-12",
    text: "Нормальные диски за свои деньги. Есть небольшие замечания по качеству покрытия.",
    likes: 5,
    dislikes: 3,
    productModel: "СКАД"
  },
  {
    id: 5,
    productId: 5,
    author: "Сергей",
    rating: 5,
    date: "2024-03-11",
    text: "Второй раз заказываю диски этой модели. Всё отлично!",
    likes: 10,
    dislikes: 1,
    productModel: "X'trike"
  }
];

const AVAILABLE_MODELS = ["X'trike", "СКАД"];

const RANDOM_NAMES = [
  "Александр", "Михаил", "Дмитрий", "Сергей", "Андрей",
  "Елена", "Анна", "Мария", "Ольга", "Татьяна",
  "Игорь", "Владимир", "Николай", "Евгений", "Алексей",
  "Наталья", "Екатерина", "Ирина", "Светлана", "Юлия"
];

const getRandomName = () => {
  const randomIndex = Math.floor(Math.random() * RANDOM_NAMES.length);
  return RANDOM_NAMES[randomIndex];
};

const Reviews = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [sortBy, setSortBy] = useState<'newest' | 'positive' | 'negative'>('newest');
  const [filteredReviews, setFilteredReviews] = useState<Review[]>(mockReviews);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const modelFilter = searchParams.get('model');
  const isTestMode = true; // Флаг тестового режима

  const handleModelChange = (model: string | null) => {
    if (model) {
      setSearchParams({ model });
    } else {
      setSearchParams({});
    }
  };

  useEffect(() => {
    let filtered = [...mockReviews];
    
    if (modelFilter) {
      filtered = filtered.filter(review => review.productModel === modelFilter);
    }

    switch (sortBy) {
      case 'positive':
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      case 'negative':
        filtered.sort((a, b) => a.rating - b.rating);
        break;
      case 'newest':
        filtered.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
        break;
    }

    setFilteredReviews(filtered);
  }, [modelFilter, sortBy]);

  const handleAddReview = (reviewData: { rating: number; comment: string }) => {
    const newReview: Review = {
      id: mockReviews.length + 1,
      productId: mockReviews.length + 1,
      author: isTestMode ? getRandomName() : '',
      rating: reviewData.rating,
      date: new Date().toISOString(),
      text: reviewData.comment,
      likes: 0,
      dislikes: 0,
      productModel: "X'trike" // В тестовом режиме используем фиксированную модель
    };

    mockReviews.unshift(newReview);
    setFilteredReviews([...mockReviews]);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="container mx-auto px-4 py-8 mt-16">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Отзывы</h1>
          <button
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Plus className="w-5 h-5" />
            <span>Добавить отзыв</span>
          </button>
        </div>

        <div className="mb-8 flex flex-wrap gap-4">
          <div className="flex items-center gap-4 min-w-[200px]">
            <select
              value={modelFilter || ''}
              onChange={(e) => handleModelChange(e.target.value || null)}
              className="w-full px-4 py-2 border rounded-lg bg-white hover:border-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-colors [&>*]:border-0"
            >
              <option value="">Все модели</option>
              {AVAILABLE_MODELS.map(model => (
                <option key={model} value={model}>{model}</option>
              ))}
            </select>
          </div>

          <div className="flex items-center gap-4 min-w-[200px]">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as 'newest' | 'positive' | 'negative')}
              className="w-full px-4 py-2 border rounded-lg bg-white hover:border-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-colors cursor-pointer"
            >
              <option value="newest">Сначала новые</option>
              <option value="positive">Сначала положительные</option>
              <option value="negative">Сначала отрицательные</option>
            </select>
          </div>
        </div>

        <div className="space-y-6">
          {filteredReviews.length > 0 ? (
            filteredReviews.map((review) => (
              <div key={review.id} className="bg-white p-6 rounded-lg shadow-sm border">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="font-medium text-lg">{review.author}</h3>
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <span>{new Date(review.date).toLocaleDateString()}</span>
                      <span>•</span>
                      <span>{review.productModel}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-1">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <span
                        key={i}
                        className={`text-lg ${
                          i < review.rating ? 'text-yellow-400' : 'text-gray-300'
                        }`}
                      >
                        ★
                      </span>
                    ))}
                  </div>
                </div>
                
                <p className="text-gray-700 mb-4">{review.text}</p>
                
                <div className="flex items-center gap-4">
                  <button className="flex items-center gap-1 text-gray-500 hover:text-blue-600">
                    <ThumbsUp className="w-4 h-4" />
                    <span>{review.likes}</span>
                  </button>
                  <button className="flex items-center gap-1 text-gray-500 hover:text-red-600">
                    <ThumbsDown className="w-4 h-4" />
                    <span>{review.dislikes}</span>
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-8 text-gray-500">
              Отзывов пока нет
            </div>
          )}
        </div>
      </div>

      <AddReviewModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleAddReview}
      />
    </div>
  );
};

export default Reviews; 