import React from 'react';
import { useKeenSlider } from 'keen-slider/react';
import 'keen-slider/keen-slider.min.css';
import { Product } from '../types/product';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';
import { cn } from '../lib/utils';

interface ProductSliderProps {
  products: Product[];
}

const ProductSlider = ({ products }: ProductSliderProps) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [currentSlide, setCurrentSlide] = React.useState(0);
  const [loaded, setLoaded] = React.useState(false);

  const [sliderRef, instanceRef] = useKeenSlider<HTMLDivElement>({
    initial: 0,
    slides: {
      perView: 4,
      spacing: 20,
    },
    slideChanged(slider) {
      setCurrentSlide(slider.track.details.rel);
    },
    created() {
      setLoaded(true);
    },
    breakpoints: {
      '(max-width: 1024px)': {
        slides: { perView: 3, spacing: 15 },
      },
      '(max-width: 768px)': {
        slides: { perView: 2, spacing: 10 },
      },
      '(max-width: 640px)': {
        slides: { perView: 1, spacing: 10 },
      },
    },
  });

  const handleProductClick = (product: Product) => {
    if (location.pathname !== '/catalog') {
      navigate(`/catalog#product-${product.id}`);
    } else {
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
    }
  };

  return (
    <div className="relative">
      <div ref={sliderRef} className="keen-slider">
        {products.map((product) => (
          <div
            key={product.id}
            className="keen-slider__slide cursor-pointer"
            onClick={() => handleProductClick(product)}
          >
            <div className="bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-300 p-4">
              <div className="aspect-square overflow-hidden rounded-lg bg-gray-100">
                <img
                  src={product.image}
                  alt={product.name}
                  className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
                />
              </div>
              <div className="mt-4">
                <h3 className="text-sm font-medium text-gray-900 truncate">
                  {product.name}
                </h3>
                <p className="mt-1 text-sm text-gray-500">{product.price}</p>
                <div className="mt-2 flex items-center">
                  <div className="flex items-center">
                    {[...Array(Math.floor(product.rating))].map((_, i) => (
                      <svg
                        key={i}
                        className="h-4 w-4 text-yellow-400"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 15.934l-6.18 3.254 1.18-6.875L.083 7.571l6.9-1.002L10 .333l3.017 6.236 6.9 1.002-4.917 4.742 1.18 6.875L10 15.934z"
                        />
                      </svg>
                    ))}
                  </div>
                  <p className="ml-2 text-sm text-gray-500">({product.reviews})</p>
                </div>
                <p className="mt-2 text-sm font-medium text-green-600">
                  {product.stock}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {loaded && instanceRef.current && (
        <>
          <button
            onClick={(e) => {
              e.stopPropagation();
              instanceRef.current?.prev();
            }}
            className={cn(
              "absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-white shadow-lg flex items-center justify-center text-gray-600 hover:text-gray-900 transition-colors",
              currentSlide === 0 && "opacity-50 cursor-not-allowed"
            )}
            disabled={currentSlide === 0}
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              instanceRef.current?.next();
            }}
            className={cn(
              "absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 w-10 h-10 rounded-full bg-white shadow-lg flex items-center justify-center text-gray-600 hover:text-gray-900 transition-colors",
              currentSlide === instanceRef.current.track.details.maxIdx && "opacity-50 cursor-not-allowed"
            )}
            disabled={currentSlide === instanceRef.current.track.details.maxIdx}
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </>
      )}
    </div>
  );
};

export default ProductSlider;
