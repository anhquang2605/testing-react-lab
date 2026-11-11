export function calculateDiscount(
  price: number,
  discount: number
): number {
  return price - price * discount;
}
export interface Product {
  price: number;
  discount: number;
}
export function getaProduct(price: number, discount: number): Product {
  return {
    price,
    discount,
  };
}