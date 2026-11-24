import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import CheckoutForm from './CheckoutForm';

const PRICE = 129.99;
describe('CheckoutForm', () => {
  // Write your tests here
  describe('CheckoutForm Initial Render', () => {
    it('should render the form with all input fields and submit button', () => {
        render(<CheckoutForm total={PRICE} />);
        const emailInput = screen.getByLabelText('Email');
        const nameInput = screen.getByLabelText('Customer name');
        const addressInput = screen.getByLabelText('Shipping address');
        const submitButton = screen.getByRole('button', { name: /place order/i });
        expect(emailInput).toBeInTheDocument();
        expect(nameInput).toBeInTheDocument();
        expect(addressInput).toBeInTheDocument();
        expect(submitButton).toBeInTheDocument();
        expect(
            screen.getByText(`Total: $${PRICE.toFixed(2)}`)
        ).toBeInTheDocument();
    })
  })
  describe('CheckoutForm Empty form validation', () => {
    it('should display validation messages when submitting empty form', async () => {
        render(<CheckoutForm total={PRICE} />);
        const submitButton = screen.getByRole('button', { name: /place order/i });
        const user = userEvent.setup();
        await user.click(submitButton);
        expect(screen.getByText('All fields are required.')).toBeInTheDocument();
    })
  })
  describe('CheckoutForm Invalid email validation', () => {
    it('should display validation message when submitting form with invalid email', async () => {
        render(<CheckoutForm total={PRICE} />);
        const user = userEvent.setup();
        const emailInput = screen.getByLabelText('Email');
        const nameInput = screen.getByLabelText('Customer name');
        const addressInput = screen.getByLabelText('Shipping address');
        const submitButton = screen.getByRole('button', { name: /place order/i });
        await user.type(emailInput, 'invalid-email');
        await user.type(nameInput, 'John Doe');
        await user.type(addressInput, '123 Main St');
        await user.click(submitButton);
        expect(screen.getByText('Please enter a valid email.')).toBeInTheDocument();
    })
  })
  describe('Submission is not possible when the form is invalid', () => {
    const mocking = vi.fn();
    //simulate a mock fetch function which is a global function
    vi.stubGlobal('fetch', mocking);
    it('should not call fetch when submitting invalid form', async () => {
      const user = userEvent.setup();
      render(<CheckoutForm total={PRICE} />);
      const submitButton = screen.getByRole(
        'button',
        {
          name: /place order/i
        }
      )
      await user.click(submitButton);
      expect(mocking).not.toHaveBeenCalled();
    })
    
  })
});