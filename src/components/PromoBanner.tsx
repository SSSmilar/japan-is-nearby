import { useEffect, useState, useRef } from 'react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { products } from '../data/products';
import Autoplay from 'embla-carousel-autoplay';
import { motion } from 'framer-motion';
import { cn } from '../lib/utils';
import { useNavigate } from 'react-router-dom';

const PromoBanner = () => {
  const navigate = useNavigate();
  const plugin = useRef(
    Autoplay({ delay: 5000, stopOnInteraction: true })
  );

  const handleProductClick = (productId: string) => {
    navigate(`/product/${productId}`);
  };

  return (
    <section className="relative w-full h-[400px] overflow-hidden">
      <Carousel
        plugins={[plugin.current]}
        className="w-full h-full"
        onMouseEnter={plugin.current.stop}
        onMouseLeave={plugin.current.reset}
      >
        <CarouselContent>
          {products.map((product) => (
            <CarouselItem key={product.id}>
              <div 
                className="relative w-full h-[400px] cursor-pointer"
                onClick={() => handleProductClick(product.id)}
              >
                <img
                  src={product.images[0]}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black/50 to-transparent">
                  <div className="container mx-auto px-4 h-full flex items-center">
                    <div className="max-w-xl text-white">
                      <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="text-4xl font-bold mb-4"
                      >
                        {product.name}
                      </motion.h2>
                      <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="text-lg mb-6"
                      >
                        {product.description}
                      </motion.p>
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.4 }}
                      >
                        <button
                          onClick={() => handleProductClick(product.id)}
                          className="bg-white text-black px-6 py-2 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
                        >
                          Подробнее
                        </button>
                      </motion.div>
                    </div>
                  </div>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </section>
  );
};

export default PromoBanner;