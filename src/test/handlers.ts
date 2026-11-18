
import { http, HttpResponse } from 'msw';

export const mockProducts = [
  {
    id: 'product-1',
    name: 'Wireless Gaming Mouse',
    price: 29.99,
  },
  {
    id: 'product-2',
    name: 'Mechanical Keyboard',
    price: 79.99,
  },
];

export const handlers = [
  http.get('*/api/products', () => {
    return HttpResponse.json(mockProducts);
  }),
];
