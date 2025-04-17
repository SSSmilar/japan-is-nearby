import { useParams } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import { products } from '../data/products';
import { useCart } from '../contexts/CartContext';

const ProductPage = () => {
  const { id } = useParams();
  const { language } = useLanguage();
  const { addToCart } = useCart();
  
  const product = products.find(p => p.id === id);
  
  if (!product) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-4">
          {language === 'ru' ? 'Товар не найден' : 'Product not found'}
        </h1>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Product Images */}
        <div className="space-y-4">
          <div className="aspect-square overflow-hidden rounded-lg">
            <img
              src={product.images[0]}
              alt={product.name}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="grid grid-cols-4 gap-4">
            {product.images.slice(1).map((image, index) => (
              <div key={index} className="aspect-square overflow-hidden rounded-lg">
                <img
                  src={image}
                  alt={`${product.name} view ${index + 2}`}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Product Info */}
        <div className="space-y-6">
          <h1 className="text-3xl font-bold">{product.name}</h1>
          <p className="text-xl font-semibold">
            {product.price.toLocaleString()} ₽
          </p>
          
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">
              {language === 'ru' ? 'Характеристики' : 'Specifications'}
            </h2>
            <div className="space-y-2">
              <p>
                <span className="font-medium">
                  {language === 'ru' ? 'Диаметр: ' : 'Diameter: '}
                </span>
                {Array.isArray(product.specs.diameter) 
                  ? product.specs.diameter.join(', ') 
                  : product.specs.diameter}
              </p>
              <p>
                <span className="font-medium">ET: </span>
                {Array.isArray(product.specs.et) 
                  ? product.specs.et.join(', ') 
                  : product.specs.et}
              </p>
              <p>
                <span className="font-medium">PCD: </span>
                {product.specs.pcd}
              </p>
            </div>
          </div>

          <button
            onClick={() => addToCart(product.id, 1)}
            className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors"
          >
            {language === 'ru' ? 'Добавить в корзину' : 'Add to Cart'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductPage; 