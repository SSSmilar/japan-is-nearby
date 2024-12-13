import React from 'react';
import Navbar from '../components/Navbar';
import ProductGrid from '../components/ProductGrid';

const Catalog = () => {
  return (
    <div className="min-h-screen bg-white pt-16">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <ProductGrid />
      </div>
    </div>
  );
};

export default Catalog;