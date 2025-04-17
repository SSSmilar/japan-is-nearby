import { useState, useEffect } from 'react';
import { Product } from '../types/product';
import { products } from '../data/products';
import ProductCard from './ProductCard';
import FilterSection from './FilterSection';
import { useLocation } from 'react-router-dom';

interface FilterOption {
  value: string;
  label: string;
}

interface FilterOptions {
  diameter: FilterOption[];
  width: FilterOption[];
  pcd: FilterOption[];
  et: FilterOption[];
  dia: FilterOption[];
}

interface SelectedFilters {
  diameter: string[];
  width: string[];
  pcd: string[];
  et: string[];
  dia: string[];
}

export function ProductGrid() {
  const location = useLocation();
  const [highlightedProduct, setHighlightedProduct] = useState<string | null>(null);
  const [selectedFilters, setSelectedFilters] = useState<SelectedFilters>({
    diameter: [],
    width: [],
    pcd: [],
    et: [],
    dia: []
  });

  useEffect(() => {
    if (location.state?.highlightedProduct) {
      setHighlightedProduct(location.state.highlightedProduct);
      // Очищаем state, чтобы при обновлении страницы подсветка сбрасывалась
      window.history.replaceState({}, document.title);
      
      // Находим элемент и прокручиваем к нему
      const element = document.getElementById(`product-${location.state.highlightedProduct}`);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }
  }, [location.state]);

  const createFilterOptions = (values: string[]): FilterOption[] => {
    return values.map(value => ({ value, label: value }));
  };

  const filterOptions: FilterOptions = {
    diameter: createFilterOptions(
      Array.from(new Set(products.flatMap(p => Array.isArray(p.specs.diameter) ? p.specs.diameter : [p.specs.diameter])))
        .sort((a, b) => Number(a) - Number(b))
    ),
    width: createFilterOptions(
      Array.from(new Set(products.map(p => p.specs.width)))
        .sort((a, b) => Number(a) - Number(b))
    ),
    pcd: createFilterOptions(
      Array.from(new Set(products.map(p => p.specs.pcd)))
        .sort()
    ),
    et: createFilterOptions(
      Array.from(new Set(products.flatMap(p => Array.isArray(p.specs.et) ? p.specs.et : [p.specs.et])))
        .sort((a, b) => Number(a) - Number(b))
    ),
    dia: createFilterOptions(
      Array.from(new Set(products.map(p => p.specs.dia)))
        .sort((a, b) => Number(a) - Number(b))
    )
  };

  const filteredProducts = products.filter(product => {
    return Object.entries(selectedFilters).every(([key, values]) => {
      if (values.length === 0) return true;
      const spec = product.specs[key as keyof typeof product.specs];
      if (Array.isArray(spec)) {
        return spec.some(s => values.includes(s));
      }
      return values.includes(spec);
    });
  });

  return (
    <div className="container mx-auto px-4">
      <div className="flex flex-col md:flex-row gap-6">
        <div className="w-full md:w-1/4 space-y-4">
          <FilterSection
            title="Диаметр (ø)"
            options={filterOptions.diameter}
            selected={selectedFilters.diameter}
            onChange={(values) => setSelectedFilters(prev => ({ ...prev, diameter: values }))}
          />
          <FilterSection
            title="Сверловка (PCD)"
            options={filterOptions.pcd}
            selected={selectedFilters.pcd}
            onChange={(values) => setSelectedFilters(prev => ({ ...prev, pcd: values }))}
          />
          <FilterSection
            title="Ширина (J)"
            options={filterOptions.width}
            selected={selectedFilters.width}
            onChange={(values) => setSelectedFilters(prev => ({ ...prev, width: values }))}
          />
          <FilterSection
            title="Вылет (ET)"
            options={filterOptions.et}
            selected={selectedFilters.et}
            onChange={(values) => setSelectedFilters(prev => ({ ...prev, et: values }))}
          />
          <FilterSection
            title="DIA"
            options={filterOptions.dia}
            selected={selectedFilters.dia}
            onChange={(values) => setSelectedFilters(prev => ({ ...prev, dia: values }))}
          />
        </div>
        <div className="w-full md:w-3/4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map(product => (
              <div
                key={product.id}
                id={`product-${product.id}`}
                className={`transition-all duration-300 ${
                  highlightedProduct === product.id 
                    ? 'ring-4 ring-blue-500 rounded-lg transform scale-105' 
                    : ''
                }`}
              >
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductGrid;
