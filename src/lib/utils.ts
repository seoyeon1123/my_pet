export const formatToWon = (price: number | string) => {
  const numericPrice = typeof price === 'string' ? parseFloat(price) : price;
  return `${numericPrice.toLocaleString('ko')} 원`;
};

export const stripTags = (input: string) => {
  return input.replace(/<\/?[^>]+(>|$)/g, '');
};
