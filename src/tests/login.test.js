import React from 'react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import Login from '../pages/Login';
import App from '../App';

describe('Test Login Page', () => {
  it('Test elements on screen', () => {
    const { getByTestId } = renderWithRouter(<Login />);
    const emailInput = getByTestId('email-input');
    const passwordInput = getByTestId('password-input');
    const loginButton = getByTestId('login-submit-btn');
    expect(emailInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    expect(loginButton).toBeInTheDocument();
  });

  it('Test if button turn enable with valid email/password', () => {
    const { getByTestId } = renderWithRouter(<Login />);
    const loginButton = getByTestId('login-submit-btn');
    expect(loginButton).toBeDisabled();
    const emailInput = getByTestId('email-input');
    const passwordInput = getByTestId('password-input');
    userEvent.type(emailInput, 'testing');
    userEvent.type(passwordInput, '123579');
    expect(loginButton).toBeDisabled();
    userEvent.type(emailInput, 'email.com@');
    userEvent.type(passwordInput, '12357911');
    expect(loginButton).toBeDisabled();
    userEvent.type(emailInput, 'test@com@');
    userEvent.type(passwordInput, '123579');
    expect(loginButton).toBeDisabled();
    userEvent.type(emailInput, 'testing@email.com');
    userEvent.type(passwordInput, '123579');
    expect(loginButton).toBeDisabled();
    userEvent.type(emailInput, 'test@email.com');
    userEvent.type(passwordInput, '12357911');
    expect(loginButton).toBeEnabled();
  });

  it('Test if after login, redirect to MainFood Page', () => {
    const { getByTestId, history } = renderWithRouter(<App />);
    const emailInput = getByTestId('email-input');
    const passwordInput = getByTestId('password-input');
    const loginButton = getByTestId('login-submit-btn');
    userEvent.type(emailInput, 'test@email.com');
    userEvent.type(passwordInput, '12357911');
    userEvent.click(loginButton);
    const { pathname } = history.location;
    expect(pathname).toBe('/comidas');
  });
});
