import { type FC } from 'react';
import { Link } from 'react-router-dom';
import { FaTelegram, FaVk, FaWhatsapp } from 'react-icons/fa';
import { useLanguage } from '../contexts/LanguageContext';

const Footer: FC = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">О компании</h3>
            <p className="text-gray-400">
              Мы специализируемся на импорте высококачественных дисков из Японии,
              предлагая широкий выбор моделей для вашего автомобиля.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Навигация</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/catalog" className="text-gray-400 hover:text-white transition-colors">
                  Диски
                </Link>
              </li>
              <li>
                <Link to="/delivery" className="text-gray-400 hover:text-white transition-colors">
                  Доставка
                </Link>
              </li>
              <li>
                <Link to="/reviews" className="text-gray-400 hover:text-white transition-colors">
                  Отзывы
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Контакты</h3>
            <ul className="space-y-2 text-gray-400">
              <li>Телефон: +7 (XXX) XXX-XX-XX</li>
              <li>Email: info@example.com</li>
              <li>Адрес: г. Москва, ул. Примерная, д. 1</li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Наши мессенджеры</h3>
            <div className="flex flex-col space-y-3">
              <a
                href="https://t.me/your_telegram"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-colors"
              >
                <FaTelegram className="w-5 h-5 mr-2" />
                <span>Telegram</span>
              </a>
              <a
                href="https://vk.com/your_vk"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-colors"
              >
                <FaVk className="w-5 h-5 mr-2" />
                <span>VKontakte</span>
              </a>
              <a
                href="https://wa.me/your_whatsapp"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-colors"
              >
                <FaWhatsapp className="w-5 h-5 mr-2" />
                <span>WhatsApp</span>
              </a>
            </div>
          </div>
        </div>
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; 2024 Japan is nearby. Все права защищены.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 