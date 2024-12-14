interface ProductRatingProps {
  rating: number;
  reviews: number;
}

const ProductRating = ({ rating, reviews }: ProductRatingProps) => {
  return (
    <div className="mt-2 flex items-center">
      <div className="flex items-center">
        {[...Array(Math.floor(rating))].map((_, i) => (
          <svg
            key={i}
            className="h-4 w-4 text-yellow-400"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M10 15.934l-6.18 3.254 1.18-6.875L.083 7.571l6.9-1.002L10 .333l3.017 6.236 6.9 1.002-4.917 4.742 1.18 6.875L10 15.934z"
            />
          </svg>
        ))}
      </div>
      <p className="ml-2 text-sm text-gray-500">({reviews})</p>
    </div>
  );
};

export default ProductRating;