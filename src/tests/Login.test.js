import React from 'react';
import { fireEvent, cleanup } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('verifica se existem os elementos na pagina Login', () => {
  afterEach(cleanup);
  test('Possui dois inputs um para email outro para senha', () => {
    const { getByTestId } = renderWithRouter(<App />);
    const loginEmail = getByTestId('email-input');
    const loginPassword = getByTestId('password-input');
    expect(loginEmail).toBeInTheDocument();
    expect(loginPassword).toBeInTheDocument();
  });

  test('Valida formatos de email, senha e disable/enable botão', () => {
    const { getByTestId, getByText } = renderWithRouter(<App />);
    const button = getByText(/Entrar/i);
    expect(button).toBeDisabled();
    const loginEmail = getByTestId('email-input');
    const loginPassword = getByTestId('password-input');

    userEvent.type(loginEmail, 'alguem');
    userEvent.type(loginPassword, '123456');
    expect(button).toBeDisabled();

    userEvent.type(loginEmail, 'alguem@alguem');
    userEvent.type(loginPassword, '1234567');
    expect(button).toBeDisabled();

    userEvent.type(loginEmail, 'alguem@alguem.com');
    userEvent.type(loginPassword, '1234567');
    expect(button).toBeEnabled();
  });

  test('Email do usário salvo no LocalStorage', () => {
    const { getByTestId, getByText } = renderWithRouter(<App />);

    const loginEmail = getByTestId('email-input');
    userEvent.type(loginEmail, 'alguem@alguem.com');

    const loginPassword = getByTestId('password-input');
    userEvent.type(loginPassword, '1234567');

    const button = getByText(/Entrar/i);
    fireEvent.click(button);

    const storage = localStorage.getItem('user', email);
    expect(storage).toEqual(/alguem@alguem.com/i);
  });
});
