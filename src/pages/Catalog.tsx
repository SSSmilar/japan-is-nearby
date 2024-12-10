import React from 'react';
import Navbar from '../components/Navbar';
import ProductGrid from '../components/ProductGrid';

const Catalog = () => {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Каталог дисков</h1>
        <ProductGrid />
      </div>
    </div>
  );
};

export default Catalog;