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
        await user.click(getSubmitButton());
        expect(
            await screen.findByText('Email is required')
        ).toBeInTheDocument();
        expect(
            await screen.findByText('Password is required')
        ).toBeInTheDocument();
        expect(mockOnLogin).not.toHaveBeenCalled();
        //simualatiing someone typing
        await user.type(screen.getByLabelText('Email'), 'invalid-email');
        await user.type(screen.getByLabelText('Password'), '123');
        await user.click(getSubmitButton());
        expect(
          screen.getByText('Please enter a valid email')
        ).toBeInTheDocument();
        expect(
            screen.getByText("Password must be at least 6 characters")
        ).toBeInTheDocument();
    });
    it('should call onLogin with valid input', async () => {
        const user = userEvent.setup();
        renderLoginForm(mockOnLogin);
        await user.type(screen.getByLabelText('Email'), 'tW9Wg@example.com');
        await user.type(screen.getByLabelText('Password'), 'password');
        await user.click(getSubmitButton());
        expect(mockOnLogin).toHaveBeenCalledWith('tW9Wg@example.com', 'password');
    })
    it('should result in invalid email message when email is invalid', async () => {
        const user = userEvent.setup();
        renderLoginForm(mockOnLogin);
        await user.type(screen.getByLabelText('Email'), 'hello');
        await user.click(getSubmitButton());
        expect(
            await screen.findByText('Please enter a valid email')
        ).toBeInTheDocument();
    });
    it('should result in password length message when password is too short', async () => {
        const user = userEvent.setup();
        renderLoginForm(mockOnLogin);
        await user.type(
            screen.getByLabelText('Password'),
            '123'
        );
        await user.click(getSubmitButton());
        expect(
            await screen.findByText("Password must be at least 6 characters")
        ).toBeInTheDocument();
        
    });
});

const renderLoginForm = (mockOnLogin: any) => {
    render(<LoginForm onLogin={mockOnLogin} />);
}
const getSubmitButton = () => {
    return screen.getByRole('button', { name: 'Log In' });
}