import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import Login from '../pages/Login';

describe('Página de Login', () => {
  beforeAll(() => {
    const email = 'email@email.com';
    localStorage.user = JSON.stringify({ email });
  });
  it('Renderiza a home page com o caminho "/"', () => {
    const { history } = renderWithRouter(<Login />);
    const { pathname } = history.location;
    expect(pathname).toBe('/');
  });
  it('Desabilita login para email ou senha inválidos', () => {
    renderWithRouter(<Login />);
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
    userEvent.type(senha, '1234567');
    expect(button).toBeEnabled();
  });
  it('Renderiza a página principal com o caminho "/comidas" no login', () => {
    const { history } = renderWithRouter(<Login />);
    const email = screen.getByTestId('email-input');
    const senha = screen.getByTestId('password-input');
    const button = screen.getByTestId('login-submit-btn');
    userEvent.type(email, 'alguem@email.com');
    userEvent.type(senha, '1234567');
    userEvent.click(button);
    const { pathname } = history.location;
    expect(pathname).toBe('/comidas');
  });
});
