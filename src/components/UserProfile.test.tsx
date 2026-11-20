import { describe, it, expect } from 'vitest';
import { render, screen, waitForElementToBeRemoved } from '@testing-library/react';
import UserProfile from './UserProfile';

describe('UserProfile', () => {
  it('should display loading initially', () => {
    render(<UserProfile />);

    expect(screen.getByText('Loading user...')).toBeInTheDocument();
  });

  it('should display the user after loading', async () => {
    render(<UserProfile />);

    expect(
      await screen.findByText('Welcome, Alex!', {}, { timeout: 2000 })
    ).toBeInTheDocument();
  });

  it('should remove the loading message after loading', async () => {
    render(<UserProfile />);
    const loadingMessage = screen.getByText('Loading user...');

    await waitForElementToBeRemoved(loadingMessage);
    
    expect(
      await screen.findByText('Welcome, Alex!')
    ).toBeInTheDocument();
  });
});