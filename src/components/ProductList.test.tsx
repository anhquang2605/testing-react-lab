import { http, HttpResponse } from 'msw';
import { server } from '@/test/server';
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import ProductList from './ProductList';

describe('ProductList', () => {
  it('renders loading state initially', async () => {
    render(<ProductList />);
    expect(
      screen.getByText('Loading products...')
    ).toBeInTheDocument();

    expect(
      await screen.findByText('Wireless Gaming Mouse')
    ).toBeInTheDocument();
    
    expect(
      await screen.queryByText('Loading products...')
    ).not.toBeInTheDocument();
  });
  it('renders error state when fetch fails', async () => {
    server.use(
      http.get('*/api/products', () => {
        return new HttpResponse(null, { status: 500 });
      })
    );
    render(<ProductList />);
    expect(
      await screen.findByRole('alert')
    ).toHaveTextContent('Unable to load products');
  });
  it('renders proper message when empthy list is returned', async () => {
    server.use(
      http.get('*/api/products', () => {
        return HttpResponse.json([]);
      })
    )
    render(<ProductList />);
    expect(
      await screen.findByText('No products available.')
    ).toBeInTheDocument();
  });
});
