import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import LoginForm from './LoginForm';

describe('LoginForm', () => {
    const mockOnLogin = vi.fn();
    it('should render the login form', () => {
        renderLoginForm(mockOnLogin);
        //label text of form fields
        expect(
            screen.getByLabelText('Email')
        ).toBeInTheDocument();
        expect(
            screen.getByLabelText('Password')
        ).toBeInTheDocument();
    });

    it('should display error messages for invalid input', async () => {
        renderLoginForm(mockOnLogin);
        const user = userEvent.setup();
        const emailInput = screen.getByLabelText('Email');
        const passwordInput = screen.getByLabelText('Password');
        const submitButton = screen.getByRole('button', {
            name: 'Login',
        });
        await user.click(submitButton);
        expect(
            await screen.findByText('Email is required')
        ).toBeInTheDocument();
        expect(
            await screen.findByText('Password is required')
        ).toBeInTheDocument();
    });

});

const renderLoginForm = (mockOnLogin: any) => {
    render(<LoginForm onLogin={mockOnLogin} />);
}