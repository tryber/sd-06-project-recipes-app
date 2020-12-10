import React from 'react';
import { fireEvent } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import App from '../App';

describe('Test Header', () => {
  it('Test Header on login page', () => {
    const { getByTestId } = renderWithRouter(<App />);
    expect(getByTestId('profile-top-btn')).not.toBeInTheDocument();
  });
  it('Test inputs', () => {
    const { getByTestId } = renderWithRouter(<App />);
    fireEvent.change(getByTestId('email-input'), { target: { value: 'lili@gmail.com' } });
    fireEvent.change(getByTestId('password-input'), { target: { value: '1234567' } });
    fireEvent.click(getByTestId('login-submit-btn'));
    expect(getByTestId('profile-top-btn')).toBeInTheDocument();
    expect(getByTestId('page-title')).toBeInTheDocument();
    expect(getByTestId('search-top-btn')).toBeInTheDocument();
  });
  it('Test routes', () => {
    const { getByTestId, getByText } = renderWithRouter(<App />);
    expect(getByText('Comidas')).toBeInTheDocument();
    fireEvent.click(getByTestId('profile-top-btn'));
    expect(getByText('Perfil')).toBeInTheDocument();
  });
});
