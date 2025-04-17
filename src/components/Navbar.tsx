import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import Logo from './Logo';
import { products } from '../data/products';
import SearchBox from './SearchBox';
import CartIcon from './CartIcon';
import { Globe } from 'lucide-react';
import { Product } from '../types/product';

const Navbar = () => {
  const location = useLocation();
  const { language, toggleLanguage } = useLanguage();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleProductSelect = (product: Product) => {
    const element = document.getElementById(`product-${product.id}`);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'center' });
      element.classList.add('highlight-product');
      setTimeout(() => {
        element.classList.remove('highlight-product');
      }, 1500);
    }
  };

  const navLinks = [
    { path: '/', label: language === 'ru' ? 'Главная' : 'Home' },
    { path: '/catalog', label: language === 'ru' ? 'Каталог' : 'Catalog' },
    { path: '/delivery', label: language === 'ru' ? 'Доставка' : 'Delivery' },
    { path: '/reviews', label: language === 'ru' ? 'Отзывы' : 'Reviews' },
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-white shadow-md' : 'bg-transparent'}`}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-8">
            <Link to="/" className="flex items-center">
              <Logo />
            </Link>
            <div className="hidden md:flex items-center gap-6">
              {navLinks.map(({ path, label }) => (
                <Link
                  key={path}
                  to={path}
                  className={`text-sm font-medium transition-colors hover:text-gray-900 ${
                    location.pathname === path ? 'text-gray-900' : 'text-gray-600'
                  }`}
                >
                  {label}
                </Link>
              ))}
            </div>
          </div>
          <div className="flex items-center gap-4">
            <SearchBox products={products} onProductSelect={handleProductSelect} />
            <button
              onClick={toggleLanguage}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <Globe className="w-5 h-5 text-gray-600" />
            </button>
            <CartIcon />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;