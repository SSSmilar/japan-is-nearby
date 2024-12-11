import React from 'react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { products } from './ProductGrid';
import Autoplay from 'embla-carousel-autoplay';

const PromoBanner = () => {
  const handlePromoClick = (id: number) => {
    const element = document.getElementById(`product-${id}`);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <Carousel
      opts={{
        align: "start",
        loop: true,
      }}
      plugins={[
        Autoplay({
          delay: 3000,
        }),
      ]}
      className="w-full mb-8"
    >
      <CarouselContent>
        {products.slice(0, 4).map((product) => (
          <CarouselItem key={product.id}>
            <div 
              className="relative w-full h-[400px] cursor-pointer"
              onClick={() => handlePromoClick(product.id)}
            >
              <img 
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover rounded-lg"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent rounded-lg" />
              <div className="absolute bottom-8 left-8 text-white">
                <h2 className="text-4xl font-bold mb-2">{product.name}</h2>
                <p className="text-xl mb-4">{product.price}</p>
              </div>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="left-4" />
      <CarouselNext className="right-4" />
    </Carousel>
  );
};

export default PromoBanner;