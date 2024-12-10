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
  // Add more products as needed
];

const ProductGrid = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};

export default ProductGrid;