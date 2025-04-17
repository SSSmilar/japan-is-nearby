export const parsePrice = (price: string | number): number => {
  if (typeof price === 'number') return price;

  const match = price.match(/\d+/g);
  return match ? parseInt(match.join('')) : 0;
};

export const formatPrice = (price: number): string => {
  return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ') + ' ₽';
};