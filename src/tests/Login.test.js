import React from 'react';
import { fireEvent, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './helpers/renderWithRouter';
import App from '../App';

describe('1. Verificar os elementos da tela de login', () => {
  it('1. O input de email deve possuir o atributo data-testid=email-input', () => {
    const { getByTestId } = renderWithRouter(<App />);
    const dataTest = getByTestId('email-input');
    expect(dataTest).toBeInTheDocument();
  });

  it('2. O input de senha deve possuir o atributo data-testid=password-input', () => {
    const { getByTestId } = renderWithRouter(<App />);
    const dataTest = getByTestId('password-input');
    expect(dataTest).toBeInTheDocument();
  });

  it('3. O botão "Entrar" deve possuir o atributo data-testid=login-submit-btn', () => {
    const { getByTestId } = renderWithRouter(<App />);
    const dataTest = getByTestId('login-submit-btn');
    expect(dataTest).toBeInTheDocument();
    expect(dataTest).toBeDisabled();
  });
});

describe('2. Verifica entradas de email', () => {
  it('1. Entrar com email e senha e clicar no botão de login', () => {
    const email = 'test@test.com';
    const password = '1234567';
    const { getByTestId } = renderWithRouter(<App />);
    const inputEmail = getByTestId('email-input');
    fireEvent.change(inputEmail, { target: { value: email } });

    const inputPassword = getByTestId('password-input');
    fireEvent.change(inputPassword, { target: { value: password } });

    const btnLogin = getByTestId('login-submit-btn');
    expect(btnLogin).toBeEnabled();
  });

  it('2. Verifica se a rota mudou', async () => {
    const { history } = renderWithRouter(<App />);
    const email = screen.getByTestId('email-input');
    const senha = screen.getByTestId('password-input');
    const button = screen.getByTestId('login-submit-btn');
    userEvent.type(email, 'alguem@email.com');
    userEvent.type(senha, '1234567');
    userEvent.click(button);
    const { pathname } = history.location;
    await expect(pathname).toBe('/comidas');
  });
});
