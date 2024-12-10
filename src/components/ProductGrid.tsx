import React from 'react';
import ProductCard from './ProductCard';

const products = [
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
  }
];

// Group products by model (X'trike X-136 in this case)
const groupedProducts = {
  "X'trike X-136": products
};

const ProductGrid = () => {
  return (
    <div className="space-y-12">
      {Object.entries(groupedProducts).map(([model, products]) => (
        <div key={model}>
          <h2 className="text-2xl font-bold mb-6">{model}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductGrid;