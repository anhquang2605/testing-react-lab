import { render, screen } from '@testing-library/react';
import { expect, it } from 'vitest';
import Greeting from './greetings';


it('should display Hello World', () => {
  render(<Greeting />);

  expect(
    screen.getByRole('heading', { name: 'Hello, welcome to our website!' })
  ).toBeInTheDocument();
});