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
});
