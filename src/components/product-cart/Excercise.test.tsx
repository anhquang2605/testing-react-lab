import { describe, it, expect } from 'vitest';

import { render, screen } from '@testing-library/react';

import ProductCard from './ProductCard';

import userEvent from '@testing-library/user-event';
import { vi } from 'vitest';


describe('ProductCard test suite', async () => {
    it('should render the product information', async () => {
        //create a simulated user
        const user = userEvent.setup();
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
        const img = screen.getByRole('img', {
            name: 'Wireless Gaming Mouse',
        });
        expect(img).toBeInTheDocument();
        expect(img).toHaveAttribute('src', '/mouse.jpg');
        const button = screen.getByRole('button', {name: 'Add to Cart'});
        //simulate user clicking
        await user.click(button);
        expect(mockAddToCart).toHaveBeenCalledWith(product.id);
        expect(mockAddToCart).toHaveBeenCalledTimes(1);
        expect(
            screen.getByText('On Sale')
        ).toBeInTheDocument();
        expect(
            screen.queryByText('Not On Sale')
        ).not.toBeInTheDocument();
        expect(
            await screen.findByRole('button', {name: 'Added to Cart'})
        ).toBeInTheDocument();
        
    })
    
    /* //display name
    it('should render the product name', async () => {
        expect(
            screen.getByText('Wireless Gaming Mouse')
        ).toBeInTheDocument();
    })
    it('should render the product price', async () => {
        expect(
            screen.getByText('$29.99')
        ).toBeInTheDocument();
    })
    const img = screen.getByRole('img', {
        name: 'Wireless Gaming Mouse',
    });
    it('should render the product image', async () => {
        expect(img).toBeInTheDocument();
        expect(img).toHaveAttribute('src', '/mouse.jpg');
    })
    it('should render the sale badge if the product is on sale', async () => {
        expect(
            screen.getByText('On Sale')
        ).toBeInTheDocument();
    })
    it('should not render the sale badge if the product is not on sale', async () => expect(screen.queryByText('Not On Sale')).not.toBeInTheDocument());
    const button = screen.getByRole('button', {name: 'Add to Cart'});
    await user.click(button);
    it('should call the onAddToCart function when the button is clicked', async () => {
        expect(mockAddToCart).toHaveBeenCalledTimes(1);
        expect(mockAddToCart).toHaveBeenCalledWith('product-1');
    })      
    it('should change the button text to "Added to Cart" after clicking', async () => {
        expect(
            await screen.findByRole('button', {name: 'Added to Cart'})
        ).toBeInTheDocument();
    }) */
})
