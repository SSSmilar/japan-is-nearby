import { MessageCircle, Phone, Mail, MapPin } from 'lucide-react';

const Footer = () => {
  const contacts = {
    phone: '+7 (XXX) XXX-XX-XX',
    email: 'info@example.com',
    address: 'г. Москва, ул. Примерная, д. 1',
    messengers: {
      telegram: 'Telegram',
      vkontakte: 'VKontakte',
      whatsapp: 'WhatsApp'
    }
  };

  return (
    <footer className="footer mt-auto py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* About */}
          <div>
            <h3 className="text-lg font-medium text-white mb-4">О компании</h3>
            <p className="text-text-secondary">
              Мы специализируемся на импорте высококачественных дисков из Японии, предлагая широкий выбор моделей для вашего автомобиля.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="text-lg font-medium text-white mb-4">Навигация</h3>
            <ul className="space-y-2">
              <li>
                <a href="/catalog" className="text-text-secondary hover:text-primary transition-colors">
                  Каталог
                </a>
              </li>
              <li>
                <a href="/delivery" className="text-text-secondary hover:text-primary transition-colors">
                  Доставка
                </a>
              </li>
              <li>
                <a href="/reviews" className="text-text-secondary hover:text-primary transition-colors">
                  Отзывы
                </a>
              </li>
            </ul>
          </div>

          {/* Contacts */}
          <div>
            <h3 className="text-lg font-medium text-white mb-4">Контакты</h3>
            <ul className="space-y-2">
              <li className="flex items-center gap-2 text-text-secondary">
                <Phone className="w-4 h-4 text-primary" />
                <span>{contacts.phone}</span>
              </li>
              <li className="flex items-center gap-2 text-text-secondary">
                <Mail className="w-4 h-4 text-primary" />
                <span>{contacts.email}</span>
              </li>
              <li className="flex items-center gap-2 text-text-secondary">
                <MapPin className="w-4 h-4 text-primary" />
                <span>{contacts.address}</span>
              </li>
            </ul>
          </div>

          {/* Messengers */}
          <div>
            <h3 className="text-lg font-medium text-white mb-4">Наши мессенджеры</h3>
            <ul className="space-y-2">
              {Object.entries(contacts.messengers).map(([key, value]) => (
                <li key={key}>
                  <a href="#" className="flex items-center gap-2 text-text-secondary hover:text-primary transition-colors">
                    <MessageCircle className="w-4 h-4" />
                    <span>{value}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-primary/20 text-center text-text-secondary">
          <p>© {new Date().getFullYear()} Japan is nearby. Все права защищены.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 