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
            name: 'Log In',
        });
        await user.click(submitButton);
        expect(
            await screen.findByText('Email is required')
        ).toBeInTheDocument();
        expect(
            await screen.findByText('Password is required')
        ).toBeInTheDocument();
        expect(mockOnLogin).not.toHaveBeenCalled();
        //simualatiing someone typing
        await user.type(emailInput, 'invalid-email');
        await user.type(passwordInput, '123');
        await user.click(submitButton);
        expect(
            screen.getByText('Please enter a valid email')
        ).toBeInTheDocument();
        expect(
            screen.getByText("Password must be at least 6 characters")
        ).toBeInTheDocument();
    });

});

const renderLoginForm = (mockOnLogin: any) => {
    render(<LoginForm onLogin={mockOnLogin} />);
}