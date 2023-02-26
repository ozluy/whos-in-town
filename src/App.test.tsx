import React from 'react';
import { render, screen,  } from '@testing-library/react';
import App from './App';

test('renders Search title', () => {
  render(<App />);
  const linkElement = screen.getByText(/Search/i);
  expect(linkElement).toBeInTheDocument();
});
