import React from 'react';
import Navbar from '../components/Navbar';
import { ProductSlider } from '../components/ProductSlider';

const Index = () => {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <ProductSlider />
    </div>
  );
};

export default Index;