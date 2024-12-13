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
import { products } from './ProductGrid';
import { useNavigate } from 'react-router-dom';
import Autoplay from 'embla-carousel-autoplay';
import { cn } from '@/lib/utils';
import type { CarouselApi } from "@/components/ui/carousel";

const Hero = () => {
  const { language } = useLanguage();
  const navigate = useNavigate();
  const [currentSlide, setCurrentSlide] = React.useState(0);
  const [api, setApi] = React.useState<CarouselApi>();

  React.useEffect(() => {
    if (!api) {
      return;
    }

    api.on("select", () => {
      setCurrentSlide(api.selectedScrollSnap());
    });
  }, [api]);

  const handleProductClick = (productId: number) => {
    navigate(`/catalog#product-${productId}`);
  };

  const featuredProducts = products.slice(0, 4);

  return (
    <div className="relative min-h-screen">
      <div className="absolute top-8 left-8 md:left-16 lg:left-24 z-10 text-white">
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-xl"
        >
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            {language === 'ru' ? "НОВЫЙ HAVAL H3" : "NEW HAVAL H3"}
          </h1>
          <p className="text-xl md:text-2xl mb-8">
            {language === 'ru' ? "ВЫГОДА ДО 400 000 ₽" : "SAVE UP TO 400 000 ₽"}
          </p>
        </motion.div>
      </div>

      <Carousel
        opts={{
          loop: true,
        }}
        plugins={[
          Autoplay({
            delay: 5000,
          }),
        ]}
        setApi={setApi}
        className="w-full h-screen"
      >
        <CarouselContent>
          {featuredProducts.map((product, index) => (
            <CarouselItem key={product.id} className="relative h-screen">
              <div 
                className="absolute inset-0 cursor-pointer"
                onClick={() => handleProductClick(product.id)}
              >
                <img 
                  src={product.image} 
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black/50 to-transparent" />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        
        <CarouselPrevious className="left-4" />
        <CarouselNext className="right-4" />

        <div className="absolute bottom-8 right-8 flex gap-2">
          {featuredProducts.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                api?.scrollTo(index);
              }}
              className={cn(
                "w-3 h-3 rounded-full transition-all duration-300",
                currentSlide === index 
                  ? "bg-white scale-125" 
                  : "bg-white/50 hover:bg-white/75"
              )}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </Carousel>
    </div>
  );
};

export default Hero;