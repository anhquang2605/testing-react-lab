import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ProductFilter, { Product } from './ProductFilter';
const products: Product[] = [
  { id: '1', name: 'Wireless Gaming Mouse', price: 29.99 },
  { id: '2', name: 'Mechanical Keyboard', price: 79.99 },
  { id: '3', name: 'Gaming Headset', price: 49.99 },
  { id: '4', name: 'USB Microphone', price: 39.99 },
];
describe('ProductFilter', () => {
  // Your tests go here
});