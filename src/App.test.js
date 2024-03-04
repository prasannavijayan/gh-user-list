import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';

describe('App component', () => {
  it('should render with dark theme by default', () => {
    render(<App />);

    const appContainer = document.body;
    expect(appContainer).toHaveStyle('background-color: #121212'); // Dark theme background color
  });

  it('should toggle theme when fab button is clicked', () => {
    render(<App />);

    const fabButton = screen.getByRole('button', { name: 'toggle theme' });

    // Click to toggle to light theme
    fireEvent.click(fabButton);
    let appContainer = document.body
    expect(appContainer).toHaveStyle('background-color: #fff'); // Light theme background color

    // Click again to toggle back to dark theme
    fireEvent.click(fabButton);
    appContainer = document.body
    expect(appContainer).toHaveStyle('background-color: #121212'); // Dark theme background color
  });
});
