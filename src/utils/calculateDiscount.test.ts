import { describe, it, expect } from 'vitest';

import { calculateDiscount, calculateTotal, getaProduct } from './calculateDiscount';

describe('calculate Discount testers', () => {
  it('should calculate a 20% discount', () => {
    expect(calculateDiscount(100, 0.2)).toBe(80);
  });

  it('should return the original price without discount', () => {
    expect(calculateDiscount(100, 0)).toBe(100);
  });
  it('should return a product with price and discount', () => {
    expect(getaProduct(100, 0.2)).toEqual({ price: 100, discount: 0.2 })
  });
});

describe('calculate get total from products', () => {
  it('should calculate the total price of products', () => {
    const products = [
      { price: 10, quantity: 2 },
      { price: 20, quantity: 1 },
      { price: 5, quantity: 4 },
    ];
    expect(calculateTotal(products)).toBe(60);
  });
  it('should return 0 for an empty product list', () => {
    expect(calculateTotal([])).toBe(0);
  });
  it('should calculate the total price of products with 1 quantity and single item in array', () => {
    const products = [
      { price: 15, quantity: 1 },
    ];
    expect(calculateTotal(products)).toBe(15);
  })
  it('should result in 0 for products with 0 quantity', () => {
    const products = [
      { price: 10, quantity: 0 },
      { price: 20, quantity: 0 },
    ];
    expect(calculateTotal(products)).toBe(0);
  });
})