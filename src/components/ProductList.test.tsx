import { http, HttpResponse } from 'msw';
import { server } from '@/test/server';
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import ProductList from './ProductList';

describe('ProductList', () => {
  it('should display products after a successful API request', async () => {
    render(<ProductList />);

    expect(
      screen.getByText('Loading products...')
    ).toBeInTheDocument();

    expect(
      await screen.findByRole('heading', {
        name: 'Wireless Gaming Mouse',
      })
    ).toBeInTheDocument();

    expect(
      screen.getByRole('heading', {
        name: 'Mechanical Keyboard',
      })
    ).toBeInTheDocument();

    expect(
      screen.getByText('$29.99')
    ).toBeInTheDocument();
  });
  it('should display an error when the API request fails', async () => {
    server.use(
        http.get('*/api/products', () => {
        return new HttpResponse(null, {
            status: 500,
        });
        })
    );

    render(<ProductList />);

    expect(
        await screen.findByRole('alert')
    ).toHaveTextContent('Unable to load products');
});
});
