import React from 'react';
import userEvent from '@testing-library/user-event';
import { screen, fireEvent } from '@testing-library/react';
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
  it('test button enable', () => {
    const { history } = renderWithRouter(<App />);
    const { pathname } = history.location;

    expect(pathname).toBe('/');

    const button = screen.getByTestId('login-submit-btn');
    expect(button).toBeDisabled();

    const email = screen.getByTestId('email-input');
    const senha = screen.getByTestId('password-input');

    userEvent.type(email, 'email');
    userEvent.type(senha, '123456');
    expect(button).toBeDisabled();

    userEvent.type(email, 'email@com@');
    userEvent.type(senha, '123456');
    expect(button).toBeDisabled();

    userEvent.type(email, 'emailcom@');
    userEvent.type(senha, '123456');
    expect(button).toBeDisabled();

    userEvent.type(email, 'alguem@email.com');
    userEvent.type(senha, '23456');
    expect(button).toBeDisabled();

    userEvent.type(email, 'alguem@email.');
    userEvent.type(senha, '123456');
    expect(button).toBeDisabled();

    userEvent.type(email, 'alguem@email.com');
    userEvent.type(senha, '1234568');
    expect(button).toBeEnabled();
  });
  it('test if submit and next page will be ok', () => {
    const { history } = renderWithRouter(<App />);
    const { pathname } = history.location;

    expect(pathname).toBe('/');

    const email = screen.getByTestId('email-input');
    const senha = screen.getByTestId('password-input');
    const button = screen.getByTestId('login-submit-btn');

    userEvent.type(email, 'alguem@email.com');
    userEvent.type(senha, '12345678');
    fireEvent.click(button);

    const doisSec = 2000;
    setTimeout(() => {
      expect(history.location.pathname).toBe('/comidas');
    }, doisSec);
  });
});
