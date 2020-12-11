import React from 'react';
import { render, fireEvent, cleanup } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './tests/renderWithRouter';
import App from './App';
import Login from './pages/Login';

// test('Farewell, front-end', () => {
//   const { getByText } = render(<App />);
//   const linkElement = getByText(/TRYBE/i);
//   expect(linkElement).toBeInTheDocument();
// });

afterEach(cleanup);

describe('Tela de Login - todos os elementos devem respeitar os atributos', () => {

  it('O input email deve possuir o atributo data-testid correto', () => {
    const { getByTestId } = render(<App />);
    const email = getByTestId('email-input');
    const password = getByTestId('password-input');
    const button = getByTestId('login-submit-btn');

    expect(email).toBeInTheDocument('');
    expect(password).toBeInTheDocument('');
    expect(button).toBeInTheDocument('');
  });
});

describe('Tela de Login - Formulario só será valido se ambos email e senha sejam validos', () => {

  it('O botão deve estar desativado se o email for invalido', () => {
    const { getByTestId } = render(<App />);
    const email = getByTestId('email-input');
    const password = getByTestId('password-input');
    const button = getByTestId('login-submit-btn');

    userEvent.type(email, 'email@com@');
    userEvent.type(password, 'dhs3u8d');
    expect(button).toBeDisabled();

    userEvent.type(email, 'alguem@email.com');
    userEvent.type(password, 'jdu46cs');
    expect(button).toBeEnabled();
  });

  it('O botão deve estar desativado se a senha tiver 6 ou menos caracteres', () => {
    const { getByTestId } = render(<App />);
    const email = getByTestId('email-input');
    const password = getByTestId('password-input');
    const button = getByTestId('login-submit-btn');

    userEvent.type(email, 'alguem@email.com');
    userEvent.type(password, 'dj3');
    expect(button).toBeDisabled();

    userEvent.type(email, 'alguem@email.com');
    userEvent.type(password, 'jdu46cd');
    expect(button).toBeEnabled();
  });

  it('O botão deve estar desativado se o email for invalido', () => {
    const { getByTestId } = render(<App />);
    const email = getByTestId('email-input');
    const password = getByTestId('password-input');
    const button = getByTestId('login-submit-btn');
    
    userEvent.type(email, 'jaksjdl');
    userEvent.type(password, '1234');
    expect(button).toBeDisabled();

    userEvent.type(email, 'alguem@email.com');
    userEvent.type(password, 'jdu46ac');
    expect(button).toBeEnabled();
  });
});

describe('Tela de Login - Salvar os Tokens no localStorage após o click', () => {

  it('Os tokens mealsToken e cocktailsToken devem ser 1', () => {
    const { getByTestId } = render(<App />);
    const email = getByTestId('email-input');
    const password = getByTestId('password-input');
    const button = getByTestId('login-submit-btn');

    userEvent.type(email, 'requisito6@brabo.com');
    userEvent.type(password, 'CriatividadeEmFalta');
    userEvent.click(button);

    const meal = localStorage.getItem('mealsToken');
    const cocktail = localStorage.getItem('cocktailsToken');

    expect(meal).toBe('1');
    expect(cocktail).toBe('1');
  });
});

describe('Tela de Login - Salvar o email no LocalStorage', () => {

  it('Após a click, o email deve ser salvo na chave user no formato { email: email-da-pessoa }', () => {
    renderWithRouter(<App />);

    const local = localStorage.getItem('user');

    expect(JSON.parse(local)).toMatchObject({email: 'requisito6@brabo.com'});
  });
});

// describe('Tela de Login - Após a validaçao do login, redirecione o usuario para a pagina de receitas', () => {
//   it('A rota deve mudar quando clickar no botão, e o caminho deve ser /comidas', () => {
//     const { getByTestId, history } = renderWithRouter(<App />);

//     const email = getByTestId('email-input');
//     const password = getByTestId('password-input');
//     const button = getByTestId('login-submit-btn');

//     // userEvent.type(email, 'requisito6@brabo.com');
//     // userEvent.type(password, 'CriatividadeEmFalta');
//     userEvent.click(button);

//     expect(history.location.pathname).toBe('/comidas')
//   });
// });
