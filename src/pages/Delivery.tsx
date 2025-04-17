import Navbar from '../components/Navbar';
import { FaTelegram, FaVk, FaWhatsapp, FaShieldAlt, FaShippingFast, FaHeadset } from 'react-icons/fa';

const Delivery = () => {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-center mb-12">Доставка дисков из Японии</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <div className="bg-gray-50 p-8 rounded-2xl text-center">
            <FaShieldAlt className="w-12 h-12 mx-auto mb-4 text-blue-600" />
            <h3 className="text-xl font-semibold mb-4">Оригинальные диски</h3>
            <p className="text-gray-600">
              Мы гарантируем подлинность всех дисков. Прямые поставки с аукционов и магазинов Японии.
            </p>
          </div>

          <div className="bg-gray-50 p-8 rounded-2xl text-center">
            <FaShippingFast className="w-12 h-12 mx-auto mb-4 text-green-600" />
            <h3 className="text-xl font-semibold mb-4">Быстрая доставка</h3>
            <p className="text-gray-600">
              Отлаженная логистика позволяет доставлять диски из Японии в кратчайшие сроки.
            </p>
          </div>

          <div className="bg-gray-50 p-8 rounded-2xl text-center">
            <FaHeadset className="w-12 h-12 mx-auto mb-4 text-purple-600" />
            <h3 className="text-xl font-semibold mb-4">Поддержка 24/7</h3>
            <p className="text-gray-600">
              Наши специалисты помогут подобрать диски и ответят на все вопросы по доставке.
            </p>
          </div>
        </div>

        <div className="bg-gray-900 text-white rounded-3xl p-8 mb-16">
          <h2 className="text-2xl font-bold mb-6">Остались вопросы?</h2>
          <p className="mb-6">
            Наши менеджеры готовы проконсультировать вас по подбору дисков и условиям доставки из Японии в любом удобном мессенджере:
          </p>
          <div className="flex flex-wrap gap-6">
            <a
              href="https://t.me/your_telegram"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 transition-colors px-6 py-3 rounded-xl"
            >
              <FaTelegram size={24} />
              <span>Telegram</span>
            </a>
            <a
              href="https://vk.com/your_vk"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 transition-colors px-6 py-3 rounded-xl"
            >
              <FaVk size={24} />
              <span>ВКонтакте</span>
            </a>
            <a
              href="wassap"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 bg-green-600 hover:bg-green-700 transition-colors px-6 py-3 rounded-xl"
            >
              <FaWhatsapp size={24} />
              <span>WhatsApp</span>
            </a>
          </div>
        </div>

        <div className="prose prose-lg max-w-none">
          <h2 className="text-2xl font-bold mb-6">Процесс доставки</h2>
          <ul className="list-disc pl-6 space-y-4 text-gray-600">
            <li>Подбор и заказ дисков на японских аукционах или в магазинах</li>
            <li>Проверка состояния дисков нашими специалистами в Японии</li>
            <li>Отправка морским транспортом (15-20 дней)</li>
            <li>Таможенное оформление (включено в стоимость)</li>
            <li>Доставка до вашего города</li>
          </ul>

          <h2 className="text-2xl font-bold mt-12 mb-6">Наши гарантии</h2>
          <ul className="list-disc pl-6 space-y-4 text-gray-600">
            <li>Гарантия подлинности дисков из Японии</li>
            <li>Предоставление фотографий дисков перед отправкой</li>
            <li>Страховка груза на всём пути следования</li>
            <li>Помощь в подборе дисков под ваш автомобиль</li>
            <li>Возврат средств при обнаружении дефектов</li>
          </ul>

          <h2 className="text-2xl font-bold mt-12 mb-6">Стоимость доставки</h2>
          <ul className="list-disc pl-6 space-y-4 text-gray-600">
            <li>Бесплатная доставка при заказе от 50 000 ₽</li>
            <li>Стоимость доставки рассчитывается индивидуально в зависимости от города</li>
            <li>Возможность объединения нескольких заказов для экономии на доставке</li>
            <li>Специальные условия для оптовых заказов</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Delivery; 