import React from 'react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import Login from '../Pages/Login';
import App from '../App';

describe('Teste página de Login', () => {
  it('Crie os elementos que devem respeitar os atributos descritos no protótipo', () => {
    const { getByTestId } = renderWithRouter(<Login />);
    const emailTest = getByTestId('email-input');
    const passwordTest = getByTestId('password-input');
    const buttonLoginTest = getByTestId('login-submit-btn');

    expect(emailTest).toBeInTheDocument();
    expect(passwordTest).toBeInTheDocument();
    expect(buttonLoginTest).toBeInTheDocument();
  });

  it('o formulário abilitado só após a validação de email e senha', () => {
    const { getByTestId } = renderWithRouter(<Login />);
    const button = getByTestId('login-submit-btn');
    expect(button).toBeDisabled();
    const email = getByTestId('email-input');
    const senha = getByTestId('password-input');
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

  it(' Redirecione para a tela principal de receitas após a submissão do login', () => {
    const { getByTestId, history } = renderWithRouter(<App />);
    const email = getByTestId('email-input');
    const senha = getByTestId('password-input');
    const button = getByTestId('login-submit-btn');
    userEvent.type(email, 'alguem@email.com');
    userEvent.type(senha, '1234567');
    userEvent.click(button);
    const { pathname } = history.location;
    expect(pathname).toBe('/comidas');
  });
});
