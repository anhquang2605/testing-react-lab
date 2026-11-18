import { describe, it, expect } from 'vitest';

import { render, screen } from '@testing-library/react';

import ProductCard from './ProductCard';

import userEvent from '@testing-library/user-event';
import { vi } from 'vitest';


describe('ProductCard', async () => {
    const user = userEvent.setup();
  it('should render the product information', async () => {
    const product = {
      id: 'product-1',
      name: 'Wireless Gaming Mouse',
      price: 29.99,
      imageUrl: '/mouse.jpg',
      isOnSale: true,
    };

    const mockAddToCart = vi.fn();

    render(
      <ProductCard
        product={product}
        onAddToCart={mockAddToCart}
      />
    );

    expect(
      screen.getByRole('heading', {
        name: 'Wireless Gaming Mouse',
      })
    ).toBeInTheDocument();

    expect(
      screen.getByText('$29.99')
    ).toBeInTheDocument();

    expect(
      screen.getByText('On Sale')
    ).toBeInTheDocument();

    //testing image
      const image = screen.getByRole('img', {
        name: 'Wireless Gaming Mouse',
        });

        expect(image).toHaveAttribute(
            'src',
            '/mouse.jpg'
        );
    //Testing click function
    const button = screen.getByRole('button', {
        name: 'Add to Cart',
    });
    await user.click(button);
    expect(mockAddToCart).toHaveBeenCalledTimes(1);
    expect(mockAddToCart).toHaveBeenCalledTimes(2);
    expect(mockAddToCart).toHaveBeenCalledWith(
        'product-1'
    );
    //testing something to not should have been existed
    expect(
        screen.queryByText('Not on Sale')
    ).not.toBeInTheDocument();
});
});