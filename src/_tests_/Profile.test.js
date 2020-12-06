import React from 'react';
import { fireEvent } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('Testar header da tela de Perfil', () => {
  it('Verificar se possui o botão "Perfil" com data-testid específicos', () => {
    const { getByTestId, history } = renderWithRouter(<App />);
    history.push('/perfil');

    expect(getByTestId('profile-top-btn')).toBeInTheDocument();
  });

  it('Verificar se ao clicar no botão "Perfil" redireciona para url específico', () => {
    const { getByTestId, history } = renderWithRouter(<App />);
    history.push('/perfil');

    fireEvent.click(getByTestId('profile-top-btn'));
    expect(history.location.pathname).toBe('/perfil');
  });

  it('Verificar se existe um título na página e se o título é "Perfil"', () => {
    const { getByText, history } = renderWithRouter(<App />);
    history.push('/perfil');

    const profileTitle = getByText(/Perfil/i);
    expect(profileTitle).toBeInTheDocument();
  });
});

describe('Testar conteúdo da tela de Perfil ', () => {
  it('Verificar se o email aparece na página', () => {
    const { getByTestId, history } = renderWithRouter(<App />);
    history.push('/');
    const inputEmail = getByTestId('email-input');
    const inputPassword = getByTestId('password-input');
    const submitBtn = getByTestId('login-submit-btn');
    fireEvent.change(inputEmail, { target: { value: 'email@email.com' } });
    fireEvent.change(inputPassword, { target: { value: '1234567' } });
    fireEvent.click(submitBtn);

    history.push('/perfil');
    const email = getByTestId('profile-email');
    expect(email).toBeInTheDocument();
    expect(email).toHaveTextContent('email@email.com');
  });

  it(`Verificar se possui os botões "Receitas Feitas", "Receitas 
    Favoritas" e "Sair" com data-testid específicos`, () => {
    const { getByTestId, history } = renderWithRouter(<App />);
    history.push('/perfil');

    expect(getByTestId('profile-done-btn')).toBeInTheDocument();
    expect(getByTestId('profile-favorite-btn')).toBeInTheDocument();
    expect(getByTestId('profile-logout-btn')).toBeInTheDocument();
  });

  it(`Verificar se ao clicar no botão "Receitas Feitas" redireciona 
    para url específica`, () => {
    const { getByTestId, history } = renderWithRouter(<App />);
    history.push('/perfil');

    fireEvent.click(getByTestId('profile-done-btn'));
    expect(history.location.pathname).toBe('/receitas-feitas');
  });

  it(`Verificar se ao clicar  no botão "Receitas Favoritas" 
    redireciona para url específico`, () => {
    const { getByTestId, history } = renderWithRouter(<App />);
    history.push('/perfil');

    fireEvent.click(getByTestId('profile-favorite-btn'));
    expect(history.location.pathname).toBe('/receitas-favoritas');
  });

  it('Verificar se ao clicar nos botões "Sair" redireciona para url específica', () => {
    const { getByTestId, history } = renderWithRouter(<App />);
    history.push('/perfil');

    fireEvent.click(getByTestId('profile-logout-btn'));
    expect(history.location.pathname).toBe('/');
  });
});

describe('Testar footer na tela de Perfil', () => {
  it(`Verificar se possui os botões dos ícones "Bebidas", "Explorar" 
    e "Comidas" com data-testid específicos`, () => {
    const { getByTestId, history } = renderWithRouter(<App />);
    history.push('/perfil');

    expect(getByTestId('drinks-bottom-btn')).toBeInTheDocument();
    expect(getByTestId('explore-bottom-btn')).toBeInTheDocument();
    expect(getByTestId('food-bottom-btn')).toBeInTheDocument();
  });

  it(`Verificar se ao clicar o botão do ícone "Bebidas" redireciona 
    para url específica`, () => {
    const { getByTestId, history } = renderWithRouter(<App />);
    history.push('/perfil');

    fireEvent.click(getByTestId('drinks-bottom-btn'));
    expect(history.location.pathname).toBe('/bebidas');
  });

  it(`Verificar se ao clicar o botão do ícone "Explorar" redireciona
    para url específica`, () => {
    const { getByTestId, history } = renderWithRouter(<App />);
    history.push('/perfil');

    fireEvent.click(getByTestId('explore-bottom-btn'));
    expect(history.location.pathname).toBe('/explorar');
  });

  it(`Verificar se ao clicar o botão do ícone "Comidas" redireciona 
    para url específica`, () => {
    const { getByTestId, history } = renderWithRouter(<App />);
    history.push('/perfil');

    fireEvent.click(getByTestId('food-bottom-btn'));
    expect(history.location.pathname).toBe('/comidas');
  });
});
