import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import UserProfile from './UserProfile';

describe('UserProfile', () => {
  it('should display loading initially', () => {
    render(<UserProfile />);

    expect(screen.getByText('Loading user...')).toBeInTheDocument();
  });

  it('should display the user after loading', async () => {
    render(<UserProfile />);

    expect(
      await screen.findByText('Welcome, Alex!')
    ).toBeInTheDocument();
  });

  it('should remove the loading message after loading', async () => {
    render(<UserProfile />);

    expect(
      await screen.findByText('Welcome, Alex!')
    ).toBeInTheDocument();

    expect(
      screen.queryByText('Loading user...')
    ).not.toBeInTheDocument();
  });
});