import React, { useState, useRef, useEffect } from 'react';
import { Search } from 'lucide-react';
import { Product } from '../types/product';
import { cn } from '../lib/utils';

interface SearchBoxProps {
  products: Product[];
}

const SearchBox = ({ products }: SearchBoxProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const searchRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsExpanded(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const term = e.target.value;
    setSearchTerm(term);

    if (term.trim()) {
      const filtered = products.filter(product =>
        product.name.toLowerCase().includes(term.toLowerCase())
      );
      setFilteredProducts(filtered);
    } else {
      setFilteredProducts([]);
    }
  };

  const handleProductSelect = (product: Product) => {
    const element = document.getElementById(`product-${product.id}`);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'center' });
      
      // Добавляем класс для подсветки
      element.classList.add('highlight-product');
      
      // Убираем класс через 10 секунд
      setTimeout(() => {
        element.classList.remove('highlight-product');
      }, 10000);
    }

    // Сбрасываем состояние поиска
    setSearchTerm('');
    setFilteredProducts([]);
    setIsExpanded(false);
  };

  return (
    <div ref={searchRef} className="relative">
      <div className={cn(
        'flex items-center transition-all duration-300',
        isExpanded ? 'w-64' : 'w-40'
      )}>
        <div className="relative flex-1">
          <input
            type="text"
            value={searchTerm}
            onChange={handleSearchChange}
            onFocus={() => setIsExpanded(true)}
            placeholder="Поиск..."
            className="w-full pl-10 pr-4 py-2 text-sm bg-gray-100 border border-transparent rounded-lg focus:outline-none focus:border-blue-500"
          />
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
        </div>
      </div>

      {isExpanded && searchTerm.trim() && (
        <div className="absolute z-50 w-96 mt-2 bg-white rounded-lg shadow-lg border border-gray-200 max-h-96 overflow-auto">
          {filteredProducts.length > 0 ? (
            filteredProducts.map(product => (
              <div
                key={product.id}
                onClick={() => handleProductSelect(product)}
                className="flex items-center gap-3 px-4 py-2 hover:bg-gray-100 cursor-pointer"
              >
                <div className="w-12 h-12 flex-shrink-0 rounded-md overflow-hidden bg-gray-50">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-medium truncate">{product.name}</div>
                  <div className="text-sm text-gray-500">{product.price}</div>
                </div>
              </div>
            ))
          ) : (
            <div className="px-4 py-2 text-gray-500">Ничего не найдено</div>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchBox;