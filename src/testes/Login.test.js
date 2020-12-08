import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import App from '../App';

describe('Testes de login', () => {
  it('existe um campo para inserir email', () => {
    const { getByTestId } = render(
      <App />,
    );

    expect(getByTestId('email-input')).toBeInTheDocument();
  });

  it('existe um campo para inserir senha', () => {
    const { getByTestId } = render(
      <App />,
    );

    expect(getByTestId('password-input')).toBeInTheDocument();
  });

  it('botão de envio desativado quando o email e a senha não foram validados', () => {
    const { getByTestId } = render(
      <App />,
    );

    expect(getByTestId('login-submit-btn')).toHaveAttribute('disabled');
  });

  it('o botão de envio está desativado quando apenas o email foi preenchido', () => {
    const { getByTestId } = render(
      <App />,
    );
    const emailInput = getByTestId('email-input');
    fireEvent.change(emailInput, { target: { value: 'abcde@gmail.com' } });
    expect(getByTestId('login-submit-btn')).toHaveAttribute('disabled');
  });

  it('o botão de envio está desativado quando apenas a senha foi preenchido', () => {
    const { getByTestId } = render(
      <App />,
    );
    const passwordInput = getByTestId('password-input');
    fireEvent.change(passwordInput, { target: { value: 'senha012' } });
    expect(getByTestId('login-submit-btn')).toHaveAttribute('disabled');
  });

  it('o botão de envio está ativado quando a senha e o email foram validados', () => {
    const { getByTestId } = render(
      <App />,
    );
    const emailInput = getByTestId('email-input');
    const passwordInput = getByTestId('password-input');
    fireEvent.change(emailInput, { target: { value: 'emaildoteste@gmail.com' } });
    fireEvent.change(passwordInput, { target: { value: '1234567' } });

    expect(getByTestId('login-submit-btn')).toHaveProperty('disabled', false);
  });
});
