import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ProductFilter, { products  } from './ProductFilter';

describe('ProductFilter', () => {
  // Your tests go here
  describe('ProductFilter Test Suites', () => {
    it('should display the search input', () => {
        render(<ProductFilter />);
        const inputElement = screen.getByLabelText('Search products');
        expect(inputElement).toBeInTheDocument();
    })
    it('should display all products initially', () => {
        render(<ProductFilter />);
        for (const product of products) {
            expect(screen.getByText(`${product.name} - $${product.price.toFixed(2)}`)).toBeInTheDocument();
        }
    })
    it('should filter products based on search input', async () => {
        const user = userEvent.setup();
        render(<ProductFilter />);
        const inputElement = screen.getByLabelText('Search products');
        await user.type(inputElement, 'Mouse');
        expect(await screen.findByText('Wireless Gaming Mouse - $29.99')).toBeInTheDocument();
        expect(screen.queryByText('Mechanical Keyboard - $79.99')).not.toBeInTheDocument();
        expect(screen.queryByText('Gaming Headset - $49.99')).not.toBeInTheDocument();
    })
    it('should display "No products found." when no products match the search', async () => {
        const user = userEvent.setup();
        render(<ProductFilter />);
        const inputElement = screen.getByLabelText('Search products');
        await user.type(inputElement, 'Nonexistent Product');
        expect(screen.getByText('No products found.')).toBeInTheDocument();
        for (const product of products) {
            expect(screen.queryByText(`${product.name} - $${product.price.toFixed(2)}`)).not.toBeInTheDocument();
        }
    })
    it('should be case-insensitive when filtering products', async () => {
        const user = userEvent.setup();
        render(<ProductFilter />);
        const inputElement = screen.getByLabelText('Search products');
        await user.type(inputElement, 'mouSe');
        expect(screen.getByText('Wireless Gaming Mouse - $29.99')).toBeInTheDocument();
    })
  })
});