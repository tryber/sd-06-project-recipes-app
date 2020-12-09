import React from 'react';
import userEvent from '@testing-library/user-event';
import renderApp from '../helpers/renderApp';
import App from '../App';

describe('Testes do Header', () => {
  test('Verifica os elementos do Header', () => {
    const { getByTestId } = renderApp(<App />);

    const email = getByTestId('email-input');
    const password = getByTestId('password-input');
    const btn = getByTestId('login-submit-btn');
  
    userEvent.type(email, 'lalala@gmail.com');
    userEvent.type(password, 'kameHameHaaaaaa01');

    expect(btn.disabled).toBe(false);

    userEvent.click(btn);

    const perfil = getByTestId('profile-top-btn');
    const comidas = getByTestId('page-title');
    const search = getByTestId('search-top-btn');

    expect(perfil).toBeInTheDocument();
    expect(comidas).toBeInTheDocument();
    expect(search).toBeInTheDocument();
  });

  test('O texto do Header deve ser igual ao título da página', () => {
    const { getByTestId, history } = renderApp(<App />);

    history.push('/comidas');

    const headerText = getByTestId('page-title');
    const pageTitle = document.title;

    expect(headerText).toHaveTextContent(pageTitle);
  });

  test('Ao clicar no botão perfil do header, o usuário deve ser direcionado para "/perfil', () => {
    const { history } = renderApp(<App />);
    
    history.push('/comidas');

    const perfil = document.getElementsByTagName('a')[0];

    expect(perfil.getAttribute('href')).toBe('/perfil');
  });

  test('Ao clicar no ícone de busca, a barra de busca deve aparecer', () => {
    const { getByTestId, history } = renderApp(<App />);

    history.push('/comidas');

    const searchBtn = getByTestId('search-top-btn');

    userEvent.click(searchBtn);

    const searchInput = getByTestId('search-input');

    expect(searchInput).toBeInTheDocument();
  });
});
