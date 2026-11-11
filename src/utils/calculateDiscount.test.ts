import { describe, it, expect } from 'vitest';

import { calculateDiscount } from './calculateDiscount';

describe('calculate Discount testers', () => {
  it('should calculate a 20% discount', () => {
    expect(calculateDiscount(100, 0.2)).toBe(80);
  });

  it('should return the original price without discount', () => {
    expect(calculateDiscount(100, 0)).toBe(100);
  });
});