import { cn } from '@/lib/utils';

interface ProductImageProps {
  src: string;
  alt: string;
  isHighlighted: boolean;
  isHovered: boolean;
}

const ProductImage = ({ src, alt, isHighlighted, isHovered }: ProductImageProps) => {
  return (
    <div className="aspect-square overflow-hidden rounded-lg bg-gray-100">
      <img
        src={src}
        alt={alt}
        className={cn(
          'h-full w-full object-cover transition-transform duration-300',
          isHighlighted || isHovered ? 'scale-105' : ''
        )}
      />
    </div>
  );
};

export default ProductImage;