import React from 'react';
import { fireEvent } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import App from '../App';

describe('Test login page', () => {
  it('Test inputs', () => {
    const { getByTestId } = renderWithRouter(<App />);
    expect(getByTestId('email-input')).toBeInTheDocument();
    expect(getByTestId('password-input')).toBeInTheDocument();
    expect(getByTestId('login-submit-btn')).toBeInTheDocument();
    expect(getByTestId('login-submit-btn')).toBeDisabled();
  });
  it('Test disabled button', () => {
    const { getByTestId } = renderWithRouter(<App />);
    fireEvent.change(getByTestId('email-input'), { target: { value: 'lili@gmail.com' } });
    fireEvent.change(getByTestId('password-input'), { target: { value: '1234567' } });
    expect(getByTestId('login-submit-btn')).not.toBeDisabled();
  });
  it('Link route', () => {
    const { getByTestId, getByText } = renderWithRouter(<App />);
    fireEvent.change(getByTestId('email-input'), { target: { value: 'lili@gmail.com' } });
    fireEvent.change(getByTestId('password-input'), { target: { value: '1234567' } });
    fireEvent.click(getByTestId('login-submit-btn'));
    expect(getByText('Comidas')).toBeInTheDocument();
    // const pathName = history.location.pathname;
    // expect(pathName).toBe('/comidas');
  });
});
