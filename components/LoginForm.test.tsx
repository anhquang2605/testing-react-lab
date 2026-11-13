import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import LoginForm from './LoginForm';

describe('LoginForm', () => {
    const mockOnLogin = vi.fn();
    it('should render the login form', () => {
        render(<LoginForm onLogin={mockOnLogin} />);
        //label text of form fields
        expect(
            screen.getByLabelText('Email')
        ).toBeInTheDocument();
        expect(
            screen.getByLabelText('Password')
        ).toBeInTheDocument();
    });

});