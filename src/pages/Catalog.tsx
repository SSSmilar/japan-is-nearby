import ProductGrid from '../components/ProductGrid';

export default function Catalog() {
  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-8 mt-16">
      <h1 className="text-3xl font-bold mb-8">Каталог дисков</h1>
      <ProductGrid />
    </div>
  );
}