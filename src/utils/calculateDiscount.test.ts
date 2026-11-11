import { describe, it, expect } from 'vitest';

import { calculateDiscount, calculateTotal, emailValidator, getaProduct } from './calculateDiscount';

describe('calculate Discount testers', () => {
  it('should calculate a 20% discount', () => {
    expect(calculateDiscount(100, 0.2)).toBe(80);
  });

  it('should return the original price without discount', () => {
    expect(calculateDiscount(100, 0)).toBe(100);
  });
  it('should return 0 for a 100% discount', () => {
    expect(calculateDiscount(100, 1)).toBe(0);
  });
  it('should throw an error for a negative price', () => {
    expect(() => calculateDiscount(-100, 0.2)).toThrow('Price must be a positive number');
  });
  it('should throw an error for a discount greater than 1', () => {
    expect(() => calculateDiscount(100, 1.1)).toThrow('Discount must be between 0 and 1');
  });
  it('should throw an error for a negative discount', () => {
    expect(() => calculateDiscount(100, -0.1)).toThrow('Discount must be between 0 and 1');
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

describe('emailValidator', () => {
  it('should return true for a valid email', () => {
    expect(emailValidator('k2oYh@example.com')).toBe(true);
  });
  it('should return false for an invalid email without @', () => {
    expect(emailValidator('test')).toBe(false);
  });
  it('should return false for an invalid email without domain', () => {
    expect(emailValidator('test@')).toBe(false);
  });
  it('should return false for an invalid email with empty string', () => {
    expect(emailValidator('')).toBe(false);
  });
});