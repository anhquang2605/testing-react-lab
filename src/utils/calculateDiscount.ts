export function calculateDiscount(
  price: number,
  discount: number
): number {
 
  if (discount < 0 || discount > 1) {
    throw new Error('Discount must be between 0 and 1');
  }
  if (price < 0 ) {
    throw new Error('Price must be a positive number');
  }
   if (discount === 0) {
    return price;
  }
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

export function emailValidator(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if(!email) {
    return false;
  }
  if(email.length === 0) {
    return false;
  }
  return emailRegex.test(email);
}