import { ProductSlider } from '../components/ProductSlider';
import { ProductGrid } from '../components/ProductGrid';

export const Home = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <ProductSlider />
      <div className="container mx-auto px-4 py-12">
        <h2 className="text-3xl font-bold mb-8">Популярные товары</h2>
        <ProductGrid />
      </div>
    </div>
  );
};
