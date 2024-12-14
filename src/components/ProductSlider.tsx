import { useNavigate } from 'react-router-dom';
import Slider from 'react-slick';
import { motion, AnimatePresence } from 'framer-motion';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

interface SlideContent {
  id: string;
  subtitle: string;
  title: string;
  price: string;
  productId: string;
  imageUrl: string;
}

const slides: SlideContent[] = [
  {
    id: '1',
    subtitle: 'ЭКСКЛЮЗИВНОЕ ИЗДАНИЕ',
    title: 'McLaren 765LT',
    price: 'ЦЕНА ОТ 4 999 ₽',
    imageUrl: 'https://images.unsplash.com/photo-1617814076367-b759c7d7e738',
    productId: 'product1'
  },
  {
    id: '2',
    subtitle: 'СПЕЦИАЛЬНОЕ ИЗДАНИЕ',
    title: 'Ferrari F8',
    price: 'ЦЕНА ОТ 5 999 ₽',
    imageUrl: 'https://images.unsplash.com/photo-1592198084033-aade902d1aae',
    productId: 'product2'
  },
  {
    id: '3',
    subtitle: 'КОЛЛЕКЦИОННЫЙ ВЫПУСК',
    title: 'Lamborghini Aventador',
    price: 'ЦЕНА ОТ 6 999 ₽',
    imageUrl: 'https://images.unsplash.com/photo-1621135802920-133df287f89c',
    productId: 'product3'
  }
];

export const ProductSlider = () => {
  const navigate = useNavigate();

  const handleSlideClick = (productId: string) => {
    navigate(`/catalog/${productId}`);
    const event = new CustomEvent('activate-product-hover', {
      detail: { productId, duration: 10000 }
    });
    window.dispatchEvent(event);
  };

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    pauseOnHover: true,
    arrows: true,
    fade: true,
    cssEase: 'linear',
    customPaging: () => (
      <div className="w-8 h-1 bg-white/30 hover:bg-white/60 transition-colors" />
    ),
  };

  return (
    <div className="relative h-[calc(100vh-64px)] -mx-[calc((100vw-100%)/2)] w-screen overflow-hidden">
      <Slider {...settings} className="h-full">
        {slides.map((slide) => (
          <div key={slide.id} className="relative h-[calc(100vh-64px)]">
            <div 
              className="absolute inset-0"
              style={{ 
                backgroundImage: `url(${slide.imageUrl})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                width: '100vw',
                height: '100%'
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/40 to-transparent" />
            </div>
            
            <AnimatePresence>
              <motion.div 
                className="absolute top-[20%] left-[10%] text-white max-w-2xl z-10"
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 50 }}
                transition={{ duration: 0.8 }}
              >
                <motion.h3 
                  className="text-2xl font-light mb-4"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  {slide.subtitle}
                </motion.h3>
                <motion.h2 
                  className="text-7xl font-bold mb-6"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  {slide.title}
                </motion.h2>
                <motion.p 
                  className="text-3xl font-light mb-10"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                >
                  {slide.price}
                </motion.p>
                <motion.button
                  onClick={() => handleSlideClick(slide.productId)}
                  className="px-10 py-4 border-2 border-white text-white text-xl hover:bg-white hover:text-black transition-colors duration-300 uppercase tracking-wider"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Подробнее
                </motion.button>
              </motion.div>
            </AnimatePresence>
          </div>
        ))}
      </Slider>

      <style jsx global>{`
        .slick-slider {
          position: relative;
          height: 100%;
          width: 100vw;
        }
        .slick-list {
          height: 100%;
          overflow: hidden;
        }
        .slick-track {
          height: 100%;
          display: flex;
        }
        .slick-slide {
          height: 100%;
          width: 100vw !important;
        }
        .slick-slide > div {
          height: 100%;
          width: 100vw;
        }
        .slick-dots {
          bottom: 40px !important;
          z-index: 20;
          display: flex !important;
          justify-content: center;
          gap: 10px;
          padding: 0 20px;
        }
        .slick-dots li {
          width: auto !important;
          height: auto !important;
          margin: 0 !important;
        }
        .slick-dots li button {
          padding: 0 !important;
        }
        .slick-dots li button:before {
          display: none;
        }
        .slick-prev, .slick-next {
          width: 40px !important;
          height: 40px !important;
          z-index: 10 !important;
          background: transparent !important;
          transition: transform 0.3s ease !important;
        }
        .slick-prev:hover, .slick-next:hover {
          transform: scale(1.2) !important;
        }
        .slick-prev {
          left: 30px !important;
        }
        .slick-next {
          right: 30px !important;
        }
        .slick-prev:before {
          content: '❮' !important;
          font-size: 32px !important;
          opacity: 0.5 !important;
          transition: opacity 0.3s ease !important;
        }
        .slick-next:before {
          content: '❯' !important;
          font-size: 32px !important;
          opacity: 0.5 !important;
          transition: opacity 0.3s ease !important;
        }
        .slick-prev:hover:before,
        .slick-next:hover:before {
          opacity: 1 !important;
        }
      `}</style>
    </div>
  );
};
