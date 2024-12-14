import { useNavigate } from 'react-router-dom';
import Slider from 'react-slick';
import { motion } from 'framer-motion';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

interface SlideContent {
  id: string;
  subtitle: string;
  title: string;
  price: string;
  productId: string;
  imageUrl: string;
  diskIndex: number;
  diskId: string;
}

const slides: SlideContent[] = [
  {
    id: '1',
    subtitle: 'ЭКСКЛЮЗИВНОЕ ИЗДАНИЕ',
    title: 'McLaren 765LT',
    price: 'ЦЕНА ОТ 4 999 ₽',
    imageUrl: '/images/mclaren.jpg',
    productId: 'disk1',
    diskIndex: 0,
    diskId: '1'
  },
  {
    id: '2',
    subtitle: 'СПЕЦИАЛЬНОЕ ИЗДАНИЕ',
    title: 'Porsche GT3 RS',
    price: 'ЦЕНА ОТ 2 499 ₽',
    imageUrl: '/lovable-uploads/a5f2788a-9f78-4f08-b8a4-9532530732a4.png',
    productId: 'disk2',
    diskIndex: 1,
    diskId: '2'
  },
  {
    id: '3',
    subtitle: 'ПРЕМИУМ КОЛЛЕКЦИЯ',
    title: 'Ferrari F8',
    price: 'ЦЕНА ОТ 3 999 ₽',
    imageUrl: '/images/ferrari.jpg',
    productId: 'disk3',
    diskIndex: 2,
    diskId: '3'
  },
  {
    id: '4',
    subtitle: 'ЛИМИТИРОВАННАЯ СЕРИЯ',
    title: 'Lamborghini Huracan',
    price: 'ЦЕНА ОТ 5 499 ₽',
    imageUrl: '/images/lambo.jpg',
    productId: 'disk4',
    diskIndex: 3,
    diskId: '4'
  }
];

export const ProductSlider = () => {
  const navigate = useNavigate();

  const handleSlideClick = (diskIndex: number, diskId: string) => {
    navigate(`/disks?index=${diskIndex}`);
    
    // Активируем эффект наведения на товар
    const event = new CustomEvent('activate-product-hover', {
      detail: { productId: diskId, duration: 10000 }
    });
    window.dispatchEvent(event);
  };

  const settings = {
    dots: true,
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 6000,
    pauseOnHover: true,
    arrows: true,
    fade: true,
    cssEase: 'cubic-bezier(0.4, 0, 0.2, 1)',
    customPaging: () => (
      <div className="w-12 h-1.5 bg-white/20 hover:bg-white/40 transition-all duration-300 transform skew-x-[-20deg] hover:scale-110" />
    ),
  };

  return (
    <div className="relative h-[calc(100vh-64px)] -mx-[calc((100vw-100%)/2)] w-screen overflow-hidden">
      <Slider {...settings} className="h-full">
        {slides.map((slide) => (
          <div key={slide.id} className="relative h-[calc(100vh-64px)]">
            <div className="absolute inset-0">
              <img
                src={slide.imageUrl}
                alt={slide.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/40" />
            </div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="absolute top-[20%] left-[10%] text-white max-w-2xl"
            >
              <h3 className="text-2xl font-light mb-4">{slide.subtitle}</h3>
              <h2 className="text-7xl font-bold mb-6">{slide.title}</h2>
              <p className="text-3xl font-light mb-8">{slide.price}</p>
              <motion.button
                onClick={() => handleSlideClick(slide.diskIndex, slide.diskId)}
                className="px-10 py-4 border-2 border-white text-white text-xl hover:bg-white hover:text-black transition-colors duration-300 uppercase tracking-wider"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Подробнее
              </motion.button>
            </motion.div>
          </div>
        ))}
      </Slider>

      <style jsx global>{`
        .slick-dots {
          bottom: 40px !important;
          z-index: 20;
          display: flex !important;
          justify-content: center;
          gap: 12px;
          padding: 0 20px;
        }
        .slick-dots li {
          width: auto !important;
          height: auto !important;
          margin: 0 !important;
          transition: all 0.3s ease;
        }
        .slick-dots li button {
          padding: 0 !important;
        }
        .slick-dots li button:before {
          display: none;
        }
        .slick-dots li.slick-active div {
          background-color: rgb(255 255 255 / 0.9) !important;
          width: 48px !important;
          transform: skew-x(-20deg) scale(1.1) !important;
          box-shadow: 0 0 10px rgba(255, 255, 255, 0.5);
        }
      `}</style>
    </div>
  );
};