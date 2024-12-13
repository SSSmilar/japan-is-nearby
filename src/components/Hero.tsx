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
import { Square, SquareDot } from 'lucide-react';

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

  const getProductTitle = (name: string, lang: 'en' | 'ru') => {
    const words = name.split(' ').slice(0, 3).join(' ');
    return words;
  };

  const getProductPromo = (lang: 'en' | 'ru') => {
    return lang === 'ru' ? "ВЫГОДА ДО 400 000 ₽" : "SAVE UP TO 400,000 ₽";
  };

  return (
    <div className="flex flex-col min-h-screen">
      <div className="relative h-[80vh] mt-16"> {/* Added mt-16 to create space below navbar */}
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
          className="w-full h-full"
        >
          <CarouselContent>
            {featuredProducts.map((product, index) => (
              <CarouselItem key={product.id} className="relative h-full">
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
                  
                  <motion.div 
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5 }}
                    className="absolute top-32 left-8 md:left-16 lg:left-24 z-10 text-white max-w-xl"
                  >
                    <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-4 leading-tight">
                      {getProductTitle(product.name, language)}
                    </h1>
                    <p className="text-lg md:text-xl lg:text-2xl mb-8">
                      {getProductPromo(language)}
                    </p>
                  </motion.div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          
          <CarouselPrevious className="left-4" />
          <CarouselNext className="right-4" />

          <div className="absolute bottom-8 right-8 flex gap-3">
            {featuredProducts.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  api?.scrollTo(index);
                }}
                className={cn(
                  "transition-all duration-300 p-1",
                  currentSlide === index 
                    ? "text-white scale-125" 
                    : "text-white/50 hover:text-white/75"
                )}
                aria-label={`Go to slide ${index + 1}`}
              >
                {currentSlide === index ? (
                  <SquareDot className="w-6 h-6" />
                ) : (
                  <Square className="w-6 h-6" />
                )}
              </button>
            ))}
          </div>
        </Carousel>
      </div>
    </div>
  );
};

export default Hero;