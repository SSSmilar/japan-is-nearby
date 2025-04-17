import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../contexts/LanguageContext';
import { products } from '../data/products';
import { useNavigate } from 'react-router-dom';
import Autoplay from 'embla-carousel-autoplay';
import useEmblaCarousel from 'embla-carousel-react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const Hero = () => {
  const { language } = useLanguage();
  const navigate = useNavigate();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [emblaRef, emblaApi] = useEmblaCarousel({ 
    align: 'start',
    loop: true,
    skipSnaps: false,
    slidesToScroll: 1
  }, [Autoplay({ delay: 5000, stopOnInteraction: true })]);

  const [prevBtnEnabled, setPrevBtnEnabled] = useState(false);
  const [nextBtnEnabled, setNextBtnEnabled] = useState(false);

  useEffect(() => {
    if (!emblaApi) return;

    const onSelect = () => {
      setCurrentSlide(emblaApi.selectedScrollSnap());
      setPrevBtnEnabled(emblaApi.canScrollPrev());
      setNextBtnEnabled(emblaApi.canScrollNext());
    };

    emblaApi.on('select', onSelect);
    onSelect();

    return () => {
      emblaApi.off('select', onSelect);
    };
  }, [emblaApi]);

  const handleProductClick = (productId: string) => {
    navigate('/catalog', { state: { highlightedProduct: productId } });
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
      <div className="relative h-[80vh] mt-16">
        <div className="overflow-hidden h-full" ref={emblaRef}>
          <div className="flex h-full">
            {featuredProducts.map((product, index) => (
              <div key={product.id} className="flex-[0_0_100%] relative h-full cursor-pointer" onClick={() => handleProductClick(product.id)}>
                <img 
                  src={product.images[0]} 
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
            ))}
          </div>
        </div>

        {featuredProducts.length > 1 && (
          <>
            <button
              className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center bg-white/10 backdrop-blur-sm rounded-full text-white hover:bg-white/20 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed z-10"
              onClick={() => emblaApi?.scrollPrev()}
              disabled={!prevBtnEnabled}
            >
              <ChevronLeft className="w-8 h-8" />
            </button>

            <button
              className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center bg-white/10 backdrop-blur-sm rounded-full text-white hover:bg-white/20 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed z-10"
              onClick={() => emblaApi?.scrollNext()}
              disabled={!nextBtnEnabled}
            >
              <ChevronRight className="w-8 h-8" />
            </button>

            <div className="absolute bottom-8 right-8 flex gap-2">
              {featuredProducts.map((_, index) => (
                <button
                  key={index}
                  className={`w-2 h-2 rounded-full transition-all duration-200 ${
                    index === currentSlide 
                      ? 'bg-white w-6' 
                      : 'bg-white/50 hover:bg-white/75'
                  }`}
                  onClick={() => emblaApi?.scrollTo(index)}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Hero;