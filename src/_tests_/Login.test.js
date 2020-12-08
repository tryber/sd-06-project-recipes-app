import React from 'react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('Possui uma página inicial de login:', () => {
  it('Possui um logotipo', () => {
    const { getByAltText } = renderWithRouter(<App />);
    const logo = getByAltText('logo');

    expect(logo).toBeInTheDocument();
    expect(logo).toHaveAttribute('src', 'logo.png');
  });

  it('Possui um campo para usuário inserir o email', () => {
    const { getByTestId } = renderWithRouter(<App />);
    const inputEmail = getByTestId('email-input');

    expect(inputEmail).toBeInTheDocument();
    expect(inputEmail.type).toBe('email');
  });

  it('Possui um campo para o usuário inserir o password', () => {
    const { getByTestId } = renderWithRouter(<App />);
    const inputPassword = getByTestId('password-input');

    expect(inputPassword).toBeInTheDocument();
    expect(inputPassword.type).toBe('password');
  });

  it('Possui um botão com o texto entrar', () => {
    const { getByTestId } = renderWithRouter(<App />);
    const loginButton = getByTestId('login-submit-btn');

    expect(loginButton).toBeInTheDocument();
    expect(loginButton.type).toBe('submit');
  });

  it('Deve validar o email e senha do usuário', () => {
    const { getByTestId } = renderWithRouter(<App />);
    const loginButton = getByTestId('login-submit-btn');
    expect(loginButton).toBeDisabled();

    const inputEmail = getByTestId('email-input');
    const inputPassword = getByTestId('password-input');

    userEvent.type(inputEmail, 'email');
    userEvent.type(inputPassword, '1234567');
    expect(loginButton).toBeDisabled();

    userEvent.type(inputEmail, 'email@email');
    userEvent.type(inputPassword, '1234567');
    expect(loginButton).toBeDisabled();

    userEvent.type(inputEmail, 'email@com');
    userEvent.type(inputPassword, '1234567');
    expect(loginButton).toBeDisabled();

    userEvent.type(inputEmail, 'email.com');
    userEvent.type(inputPassword, '1234567');
    expect(loginButton).toBeDisabled();

    userEvent.type(inputEmail, 'email@email.com');
    userEvent.type(inputPassword, '234567');
    expect(loginButton).toBeDisabled();

    userEvent.type(inputEmail, 'email@email.com');
    userEvent.type(inputPassword, '1234567');
    expect(loginButton).toBeEnabled();
  });

  it('Verifica se redireciona para a página principal de receitas', () => {
    const { getByTestId, getByRole, history } = renderWithRouter(<App />);
    const loginButton = getByRole('button');
    const inputEmail = getByTestId('email-input');
    const inputPassword = getByTestId('password-input');
    const { pathname } = history.location;

    userEvent.type(inputEmail, 'email@email.com');
    userEvent.type(inputPassword, '1234567');
    userEvent.click(loginButton);

    expect(pathname).toBe('/comidas');
  });
});
