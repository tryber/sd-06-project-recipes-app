import React from 'react';
import { screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './RenderWithRouter';

describe('Login test', () => {
  it('test about a pathname is /', () => {
    const { history } = renderWithRouter(<App />);
    const { pathname } = history.location;

    expect(pathname).toBe('/');
  });

  it('test if Login words have in screen', () => {
    renderWithRouter(<App />);
    const login = screen.getByText(/Login/i);
    expect(login).toBeInTheDocument();
  });
  it('test if login has 6 characteres', () => {
    renderWithRouter(<App />);

    const email = screen.getByTestId('email-input');
    const senha = screen.getByTestId('password-input');
    const button = screen.getByTestId('login-submit-btn');

    userEvent.type(email, 'email@email.com');
    userEvent.type(senha, '12345');
    expect(button).toBeDisabled();
  });
  it('test button and token', () => {
    const { history } = renderWithRouter(<App />);

    const email = screen.getByTestId('email-input');
    const senha = screen.getByTestId('password-input');
    const button = screen.getByTestId('login-submit-btn');

    userEvent.type(email, 'email@email.com');
    userEvent.type(senha, '1234567');
    expect(button).toBeEnabled();
    fireEvent.click(button);

    const { pathname } = history.location;
    expect(pathname).toEqual('/comidas');
    console.log(pathname);
  });
});
