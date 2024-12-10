import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../contexts/LanguageContext';

const Hero = () => {
  const { language } = useLanguage();

  const content = {
    en: {
      title: 'Japan is nearby',
      subtitle: 'Experience the perfect blend of Japanese quality and style with our curated selection of premium wheels.',
      shopNow: 'Shop Now',
      learnMore: 'Learn More'
    },
    ru: {
      title: 'Япония рядом',
      subtitle: 'Почувствуйте идеальное сочетание японского качества и стиля с нашей подборкой премиальных дисков.',
      shopNow: 'Купить сейчас',
      learnMore: 'Узнать больше'
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-white overflow-hidden">
      {/* Фоновый градиент */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-gray-50 to-white"></div>
      </div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Анимированный заголовок */}
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-5xl md:text-7xl font-bold text-gray-900 mb-6"
        >
          {content[language].title}
        </motion.h1>
        
        {/* Анимированный подзаголовок */}
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto"
        >
          {content[language].subtitle}
        </motion.p>
        
        {/* Анимированные кнопки */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="flex justify-center space-x-4"
        >
          <button className="bg-black text-white px-8 py-3 rounded-full hover:bg-gray-900 transition-colors">
            {content[language].shopNow}
          </button>
          <button className="bg-white text-black px-8 py-3 rounded-full border border-black hover:bg-gray-50 transition-colors">
            {content[language].learnMore}
          </button>
        </motion.div>
      </div>
    </div>
  );
};

export default Hero;