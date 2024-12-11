import React from 'react';
import Logo from './Logo';
import { Globe } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import SearchBox from './SearchBox';
import { products } from './ProductGrid';

const Navbar = () => {
  const { language, toggleLanguage } = useLanguage();
  const location = useLocation();

  const content = {
    en: {
      wheels: 'Wheels',
      delivery: 'Delivery'
    },
    ru: {
      wheels: 'Диски',
      delivery: 'Доставка'
    }
  };

  const handleProductSelect = (product: any) => {
    if (location.pathname !== '/catalog') {
      window.location.href = `/catalog#product-${product.id}`;
    } else {
      const element = document.getElementById(`product-${product.id}`);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'center' });
        // Имитация наведения мыши
        const event = new MouseEvent('mouseenter', {
          bubbles: true,
          cancelable: true,
        });
        element.dispatchEvent(event);
      }
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 bg-white/80 backdrop-blur-md z-50 border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <Logo />
              <span className="font-medium text-lg">Japan is nearby</span>
            </Link>
          </div>
          
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/catalog" className="text-gray-900 hover:text-gray-600 transition-colors">
              {content[language].wheels}
            </Link>
            <Link to="/delivery" className="text-gray-900 hover:text-gray-600 transition-colors">
              {content[language].delivery}
            </Link>
          </div>

          <div className="flex items-center space-x-4">
            <SearchBox 
              products={products}
              onProductSelect={handleProductSelect}
              className="w-64"
            />
            <button
              onClick={toggleLanguage}
              className="flex items-center space-x-1 text-gray-500 hover:text-gray-900 transition-colors"
            >
              <Globe className="w-5 h-5" />
              <span className="text-sm font-medium">{language.toUpperCase()}</span>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;