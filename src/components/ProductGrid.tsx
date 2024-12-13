import React, { useState, useEffect, useRef } from 'react';
import ProductCard from './ProductCard';
import { Product } from '../types/product';

// Список товаров
export const products = [
  {
    id: 1,
    name: "X'trike X-136 7x17 PCD5x108 ET33 DIA 60.1 BKM",
    price: "9 940 ₽",
    rating: 5.0,
    reviews: 4,
    stock: "8 шт. сегодня",
    image: "/lovable-uploads/3989de76-eeec-4dd7-82ad-d0b4fdf668ce.png"
  },
  {
    id: 2,
    name: "X'trike X-136 7x17 PCD5x108 ET40 DIA 54.1 HSB",
    price: "9 940 ₽",
    rating: 5.0,
    reviews: 4,
    stock: "4 шт. сегодня",
    image: "/lovable-uploads/3989de76-eeec-4dd7-82ad-d0b4fdf668ce.png"
  },
  {
    id: 3,
    name: "X'trike X-136 7x17 PCD5x108 ET33 DIA 60.1 BKM",
    price: "9 940 ₽",
    rating: 5.0,
    reviews: 4,
    stock: "8 шт. сегодня",
    image: "/lovable-uploads/3989de76-eeec-4dd7-82ad-d0b4fdf668ce.png"
  },
  {
    id: 4,
    name: "X'trike X-136 7x17 PCD5x108 ET40 DIA 54.1 HSB",
    price: "9 940 ₽",
    rating: 5.0,
    reviews: 4,
    stock: "4 шт. сегодня",
    image: "/lovable-uploads/3989de76-eeec-4dd7-82ad-d0b4fdf668ce.png"
  },
  {
    id: 5,
    name: "СКАД Монако 7x17 PCD5x114.3 ET45 DIA 67.1 Алмаз",
    price: "11 240 ₽",
    rating: 4.8,
    reviews: 6,
    stock: "12 шт. сегодня",
    image: "/lovable-uploads/3989de76-eeec-4dd7-82ad-d0b4fdf668ce.png"
  },
  {
    id: 6,
    name: "СКАД Монако 7x17 PCD5x114.3 ET40 DIA 66.1 Графит",
    price: "11 240 ₽",
    rating: 4.8,
    reviews: 3,
    stock: "6 шт. сегодня",
    image: "/lovable-uploads/3989de76-eeec-4dd7-82ad-d0b4fdf668ce.png"
  },
  {
    id: 7,
    name: "СКАД Венеция 6.5x16 PCD5x114.3 ET45 DIA 67.1 Селена",
    price: "8 940 ₽",
    rating: 4.9,
    reviews: 8,
    stock: "15 шт. сегодня",
    image: "/lovable-uploads/3989de76-eeec-4dd7-82ad-d0b4fdf668ce.png"
  },
  {
    id: 8,
    name: "СКАД Венеция 6.5x16 PCD5x114.3 ET40 DIA 66.1 Черный",
    price: "8 940 ₽",
    rating: 4.9,
    reviews: 5,
    stock: "9 шт. сегодня",
    image: "/lovable-uploads/3989de76-eeec-4dd7-82ad-d0b4fdf668ce.png"
  },
  {
    id: 9,
    name: "X'trike X-130 6.5x16 PCD5x114.3 ET45 DIA 67.1 HSB",
    price: "8 740 ₽",
    rating: 4.7,
    reviews: 7,
    stock: "11 шт. сегодня",
    image: "/lovable-uploads/3989de76-eeec-4dd7-82ad-d0b4fdf668ce.png"
  },
  {
    id: 10,
    name: "X'trike X-130 6.5x16 PCD5x114.3 ET40 DIA 66.1 BKF",
    price: "8 740 ₽",
    rating: 4.7,
    reviews: 4,
    stock: "7 шт. сегодня",
    image: "/lovable-uploads/3989de76-eeec-4dd7-82ad-d0b4fdf668ce.png"
  },
  {
    id: 11,
    name: "СКАД KL-307 6.5x16 PCD5x114.3 ET45 DIA 67.1 Алмаз",
    price: "9 140 ₽",
    rating: 4.8,
    reviews: 6,
    stock: "14 шт. сегодня",
    image: "/lovable-uploads/3989de76-eeec-4dd7-82ad-d0b4fdf668ce.png"
  },
  {
    id: 12,
    name: "СКАД KL-307 6.5x16 PCD5x114.3 ET40 DIA 66.1 Графит",
    price: "9 140 ₽",
    rating: 4.8,
    reviews: 3,
    stock: "8 шт. сегодня",
    image: "/lovable-uploads/3989de76-eeec-4dd7-82ad-d0b4fdf668ce.png"
  }
];

// Группировка товаров по модели
const groupProducts = (products: Product[]) => {
  return products.reduce((acc, product) => {
    const model = product.name.split(' ')[0] + ' ' + product.name.split(' ')[1];
    if (!acc[model]) {
      acc[model] = [];
    }
    acc[model].push(product);
    return acc;
  }, {} as Record<string, Product[]>);
};

const ProductGrid = () => {
  const [selectedProductId, setSelectedProductId] = useState<number | null>(null);
  const productRefs = useRef<Record<number, HTMLDivElement | null>>({});

  // Listen for URL hash changes to highlight product
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash;
      if (hash.startsWith('#product-')) {
        const id = parseInt(hash.replace('#product-', ''));
        setSelectedProductId(id);
      } else {
        setSelectedProductId(null);
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    handleHashChange(); // Check initial hash

    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const groupedProducts = groupProducts(products);

  return (
    <div className="space-y-12">
      {Object.entries(groupedProducts).map(([model, products]) => (
        <div key={model}>
          <h2 className="text-2xl font-bold mb-6">{model}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.map((product) => (
              <div
                key={product.id}
                ref={(el) => (productRefs.current[product.id] = el)}
                id={`product-${product.id}`}
              >
                <ProductCard 
                  product={product}
                  isSelected={product.id === selectedProductId}
                />
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductGrid;
