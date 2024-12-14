export const parsePrice = (priceString: string): number => {
  const match = priceString.match(/\d+/g);
  return match ? parseInt(match.join('')) : 0;
};

export const formatPrice = (price: number): string => {
  return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ') + ' ₽';
};