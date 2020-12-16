import React from 'react';
import userEvent from '@testing-library/user-event';
import { fireEvent } from '@testing-library/react';
import App from '../App';
import renderWithRouter from '../services/renderWithRouter';

describe('Testar a página de login renderiza normalmente', () => {
  it('Possui input e-mail que faz a validação', () => {
    const { getByTestId, getByPlaceholderText } = renderWithRouter(<App />);
    const inputEmail = getByTestId('email-input');
    const inputNode = getByPlaceholderText('Digite seu Email');
    inputEmail.value = 'teste@email.com';
    const validator = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
    const isValid = validator.test(String(inputEmail.value).toLowerCase());
    expect(isValid).toBe(true);
    expect(inputEmail).toBeInTheDocument();
    expect(inputNode).toBeInTheDocument();
  });

  it('Possui input senha que faz validação', () => {
    const { getByTestId, getByPlaceholderText } = renderWithRouter(<App />);
    const inputPassword = getByTestId('password-input');
    const inputNode = getByPlaceholderText('Digite sua Senha');
    const MIN_LENGTH = 7;
    inputPassword.value = '1234567';
    expect(inputPassword.value).toHaveLength(MIN_LENGTH);
    expect(inputPassword).toBeInTheDocument();
    expect(inputNode).toBeInTheDocument();
  });

  it('Possui botão que é habilitado caso as validações estejam corretas', () => {
    const { getByTestId } = renderWithRouter(<App />);
    const inputEmail = getByTestId('email-input');
    const inputPassword = getByTestId('password-input');
    const submitBtn = getByTestId('login-submit-btn');
    expect(submitBtn).toBeDisabled();
    userEvent.type(inputEmail, 'email@email.com');
    userEvent.type(inputPassword, '1234567');
    expect(submitBtn).not.toBeDisabled();
  });
});

describe('Testar ações após o click do botão', () => {
  it('Redireciona para a página de Comidas', async () => {
    const { getByTestId, history } = renderWithRouter(<App />);
    const inputEmail = getByTestId('email-input');
    const inputPassword = getByTestId('password-input');
    userEvent.type(inputEmail, 'email@email.com');
    userEvent.type(inputPassword, '1234567');
    const submitBtn = getByTestId('login-submit-btn');
    expect(history.location.pathname).toBe('/');
    fireEvent.click(submitBtn);
    expect(history.location.pathname).toBe('/comidas');
  });

  it('Cria as chaves no LocalStorage', () => {
    const { history, getByTestId } = renderWithRouter(<App />);
    const inputEmail = getByTestId('email-input');
    const inputPassword = getByTestId('password-input');
    const submitBtn = getByTestId('login-submit-btn');
    userEvent.type(inputEmail, 'email@email.com');
    userEvent.type(inputPassword, '1234567');
    fireEvent.click(submitBtn);
    expect(history.location.pathname).toBe('/comidas');
    const mealsToken = localStorage.getItem('mealsToken');
    const cocktailsToken = localStorage.getItem('cocktailsToken');
    const user = JSON.parse(localStorage.getItem('user'));
    expect(mealsToken).toBe('1');
    expect(cocktailsToken).toBe('1');
    expect(user.email).toBe(inputEmail.value);
  });
});
