import React from 'react';
import { fireEvent } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import App from '../App';

describe('Test header search bar', () => {
  it('Testing testids', () => {
    const { getByTestId } = renderWithRouter(<App />);
    fireEvent.change(getByTestId('email-input'), { target: { value: 'lili@gmail.com' } });
    fireEvent.change(getByTestId('password-input'), { target: { value: '1234567' } });
    fireEvent.click(getByTestId('login-submit-btn'));
    fireEvent.click(getByTestId('search-top-btn'));
    expect(getByTestId('search-input')).toBeInTheDocument();
    expect(getByTestId('ingredient-search-radio')).toBeInTheDocument();
    expect(getByTestId('name-search-radio')).toBeInTheDocument();
    expect(getByTestId('first-letter-search-radio')).toBeInTheDocument();
    expect(getByTestId('exec-search-btn')).toBeInTheDocument();
  });
});
