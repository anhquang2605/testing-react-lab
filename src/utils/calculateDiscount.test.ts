import { describe, it, expect } from 'vitest';

import { calculateDiscount, getaProduct } from './calculateDiscount';

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