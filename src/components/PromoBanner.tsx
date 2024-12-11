import React from 'react';
import { useNavigate } from 'react-router-dom';

const PromoBanner = () => {
  const navigate = useNavigate();
  
  const handlePromoClick = () => {
    // Прокрутка к товару с id 1 (первый товар в списке)
    const element = document.getElementById('product-1');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div 
      className="relative w-full h-[400px] mb-8 cursor-pointer group"
      onClick={handlePromoClick}
    >
      <img 
        src="/lovable-uploads/7f052718-7f20-40c3-b41a-2018ee557a7c.png" 
        alt="Monjaro Promo" 
        className="w-full h-full object-cover rounded-lg"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent rounded-lg" />
      <div className="absolute bottom-8 left-8 text-white">
        <h2 className="text-4xl font-bold mb-2">MONJARO</h2>
        <p className="text-xl mb-4">ЭТО КОСМОС</p>
        <button className="bg-black text-white px-6 py-2 rounded-lg hover:bg-gray-900 transition-colors">
          ПОДРОБНЕЕ
        </button>
      </div>
    </div>
  );
};

export default PromoBanner;