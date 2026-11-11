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
export interface OtherProduct {
  price: number;
  quantity: number;
}
export function getaProduct(price: number, discount: number): Product {
  return {
    price,
    discount,
  };
}

export function calculateTotal(products: OtherProduct[]): number {
  let sum = 0;
  for (const product of products) {
    sum += product.price * product.quantity;
  }
  return sum;
}