import { useNavigate } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import { motion } from 'framer-motion';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const slides = [
  {
    id: '1',
    subtitle: 'ЭКСКЛЮЗИВНОЕ ИЗДАНИЕ',
    title: 'McLaren 765LT',
    price: 'ЦЕНА ОТ 4 999 ₽',
    productId: 'product1',
    image: '/images/mclaren.jpg'
  },
  {
    id: '2',
    subtitle: 'НОВОЕ ПОСТУПЛЕНИЕ',
    title: 'Porsche GT3 RS',
    price: 'ЦЕНА ОТ 2 499 ₽',
    productId: 'product2',
    image: '/lovable-uploads/a5f2788a-9f78-4f08-b8a4-9532530732a4.png'
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

  return (
    <div className="relative w-full h-[600px] bg-gray-900">
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        navigation={{
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        }}
        pagination={{
          clickable: true,
          el: '.swiper-pagination',
          bulletClass: 'swiper-pagination-bullet',
          bulletActiveClass: 'swiper-pagination-bullet-active',
        }}
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        loop={true}
        className="h-full"
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.id}>
            <div 
              className="relative w-full h-full bg-cover bg-center bg-no-repeat"
              style={{ 
                backgroundImage: `url(${slide.image})`,
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-black/50 to-transparent" />
              <motion.div 
                className="absolute top-1/4 left-[10%] text-white max-w-xl"
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
              >
                <h3 className="text-2xl font-light mb-2">{slide.subtitle}</h3>
                <h2 className="text-6xl font-bold mb-4">{slide.title}</h2>
                <p className="text-2xl font-light mb-8">{slide.price}</p>
                <button
                  onClick={() => handleSlideClick(slide.productId)}
                  className="px-8 py-3 border-2 border-white text-white hover:bg-white hover:text-black transition-colors duration-300 text-lg uppercase tracking-wider"
                >
                  Подробнее
                </button>
              </motion.div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      
      <div className="swiper-button-prev !text-white !left-8" />
      <div className="swiper-button-next !text-white !right-8" />
      <div className="swiper-pagination !bottom-8" />
    </div>
  );
};