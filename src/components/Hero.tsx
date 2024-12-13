import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../contexts/LanguageContext';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from 'embla-carousel-autoplay';

const Hero = () => {
  const { language } = useLanguage();

  const slides = [
    {
      image: "/lovable-uploads/6c732050-29e8-4a19-9e38-b0bc2bc22180.png",
      title: language === 'ru' ? "НОВЫЙ HAVAL H3" : "NEW HAVAL H3",
      subtitle: language === 'ru' ? "ВЫГОДА ДО 400 000 ₽" : "SAVE UP TO 400 000 ₽",
      buttonText: language === 'ru' ? "ПОДРОБНЕЕ" : "LEARN MORE"
    },
    // Можно добавить больше слайдов по аналогии
  ];

  return (
    <div className="relative min-h-screen">
      <Carousel
        opts={{
          loop: true,
        }}
        plugins={[
          Autoplay({
            delay: 5000,
          }),
        ]}
        className="w-full h-screen"
      >
        <CarouselContent>
          {slides.map((slide, index) => (
            <CarouselItem key={index} className="relative h-screen">
              <div className="absolute inset-0">
                <img 
                  src={slide.image} 
                  alt={slide.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black/30 to-transparent" />
              </div>
              
              <div className="relative h-full flex flex-col justify-center px-8 md:px-16 lg:px-24">
                <motion.div 
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5 }}
                  className="max-w-xl text-white"
                >
                  <h1 className="text-4xl md:text-6xl font-bold mb-4">
                    {slide.title}
                  </h1>
                  <p className="text-xl md:text-2xl mb-8">
                    {slide.subtitle}
                  </p>
                  <button className="bg-transparent border-2 border-white text-white px-8 py-3 hover:bg-white hover:text-black transition-colors">
                    {slide.buttonText}
                  </button>
                </motion.div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="left-4" />
        <CarouselNext className="right-4" />
      </Carousel>
    </div>
  );
};

export default Hero;