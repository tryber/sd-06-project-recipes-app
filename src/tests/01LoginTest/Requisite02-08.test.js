import React from 'react';
import { fireEvent } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter/renderWithRouter';
import App from '../../App';

describe('2 - Crie todos os elementos que devem respeitar os atributos descritos'
+ 'no protótipo para a tela de login', () => {
  it('O input de email deve possuir o atributo data-testid="email-input"', () => {
    const { getByTestId } = renderWithRouter(<App />);
    const emailInput = getByTestId('email-input');

    expect(emailInput).toBeInTheDocument();
  });

  it('O input de senha deve possuir o atributo data-testid="password-input"', () => {
    const { getByTestId } = renderWithRouter(<App />);
    const passwordInput = getByTestId('password-input');

    expect(passwordInput).toBeInTheDocument();
  });

  it('O botão "Entrar" deve possuir o atributo data-testid="login-submit-btn"', () => {
    const { getByTestId } = renderWithRouter(<App />);
    const loginSubmitButton = getByTestId('login-submit-btn');

    expect(loginSubmitButton).toBeInTheDocument();
  });
});

describe('3 - Desenvolva a tela de maneira que a pessoa deve conseguir escrever'
+ ' seu email no input de email', () => {
  it('Input do email permite digitar email', () => {
    const { getByTestId } = renderWithRouter(<App />);
    const emailInput = getByTestId('email-input');

    fireEvent.change(emailInput, { target: { value: 'teste@teste.com' } });

    expect(emailInput.value).toBe('teste@teste.com');
  });
});

describe('4 - Desenvolva a tela de maneira que a pessoa '
  + 'deve conseguir escrever sua senha no input de senha', () => {
  it('Possível escrever a senha no input senha', () => {
    const { getByTestId } = renderWithRouter(<App />);
    const passwordInput = getByTestId('password-input');

    fireEvent.change(passwordInput, { target: { value: '1234567' } });

    expect(passwordInput.value).toBe('1234567');
  });
});

describe('5 - Desenvolva a tela de maneira que o formulário só seja válido após um'
+ 'email válido e uma senha de mais de 6 caracteres serem preenchidos', () => {
  it('O botão deve estar desativado se o email for inválido;', () => {
    const { getByTestId } = renderWithRouter(<App />);
    const emailInput = getByTestId('email-input');
    const passwordInput = getByTestId('password-input');
    const loginSubmitButton = getByTestId('login-submit-btn');

    fireEvent.change(emailInput, { target: { value: 'teste@teste' } });
    fireEvent.change(passwordInput, { target: { value: '1234567' } });

    expect(loginSubmitButton).toBeDisabled();
  });

  it('O botão deve estar desativado se a senha deve tiver 6 caracteres ou menos;', () => {
    const { getByTestId } = renderWithRouter(<App />);
    const emailInput = getByTestId('email-input');
    const passwordInput = getByTestId('password-input');
    const loginSubmitButton = getByTestId('login-submit-btn');

    fireEvent.change(passwordInput, { target: { value: '12345' } });
    fireEvent.change(emailInput, { target: { value: 'teste@teste.com' } });

    expect(loginSubmitButton).toBeDisabled();
  });

  it('O botão deve estar ativado se o email e a senha forem válidos.', () => {
    const { getByTestId } = renderWithRouter(<App />);
    const emailInput = getByTestId('email-input');
    const passwordInput = getByTestId('password-input');
    const loginSubmitButton = getByTestId('login-submit-btn');

    fireEvent.change(emailInput, { target: { value: 'teste@teste.com' } });
    fireEvent.change(passwordInput, { target: { value: '1234567' } });

    expect(loginSubmitButton).toBeEnabled();
  });

  describe('6 - Salve 2 tokens no localStorage após a submissão, identificados pelas'
   + 'chaves mealsToken e cocktailsToken', () => {
    it('O token de teste é sempre 1.', () => {
      const { getByTestId } = renderWithRouter(<App />);
      const emailInput = getByTestId('email-input');
      const passwordInput = getByTestId('password-input');
      const loginSubmitButton = getByTestId('login-submit-btn');

      fireEvent.change(emailInput, { target: { value: 'teste@teste.com' } });
      fireEvent.change(passwordInput, { target: { value: '1234567' } });
      fireEvent.click(loginSubmitButton);

      const mealsToken = localStorage.getItem('mealsToken');
      const cocktailsToken = localStorage.getItem('cocktailsToken');

      expect(mealsToken).toBe('1');
      expect(cocktailsToken).toBe('1');
    });
    describe('7 - Salve o e-mail da pessoa usuária no '
      + 'localStorage na chave user após na chavea submissão', () => {
      it('Após a submissão, o e-mail de pessoa usuária deve ser salvo em localStorage'
      + 'user no formato { email: email-da-pessoa }.', () => {
        const { getByTestId } = renderWithRouter(<App />);
        const emailInput = getByTestId('email-input');
        const passwordInput = getByTestId('password-input');
        const loginSubmitButton = getByTestId('login-submit-btn');

        fireEvent.change(emailInput, { target: { value: 'teste@teste.com' } });
        fireEvent.change(passwordInput, { target: { value: '1234567' } });
        fireEvent.click(loginSubmitButton);

        const userEmail = localStorage.getItem('user');

        expect(userEmail).toBe('{"email":"teste@teste.com"}');
      });
    });
    describe('8 - Redirecione a pessoa usuária para a tela principal dereceitas de'
    + ' comidas após a submissão e validação com sucesso do login', () => {
      it('A rota muda para a tela principal de receitas de comidas.', () => {
        const { getByTestId, history } = renderWithRouter(<App />);
        const emailInput = getByTestId('email-input');
        const passwordInput = getByTestId('password-input');
        const loginSubmitButton = getByTestId('login-submit-btn');

        fireEvent.change(emailInput, { target: { value: 'teste@teste.com' } });
        fireEvent.change(passwordInput, { target: { value: '1234567' } });
        fireEvent.click(loginSubmitButton);

        const mainPageRoute = history.location.pathname;

        expect(mainPageRoute).toBe('/comidas');
      });
    });
  });
});
