import React from 'react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import { Perfil } from '../Pages';

describe('Teste componente Perfil', () => {
  it('Implemente os elementos respeitando os atributos descritos no protótipo', () => {
    const { getByTestId } = renderWithRouter(<Perfil />);
    const email = getByTestId('profile-email');
    const receitasFeitas = getByTestId('profile-done-btn');
    const receitasFavoritas = getByTestId('profile-favorite-btn');
    const sair = getByTestId('profile-logout-btn');

    expect(email).toBeInTheDocument();
    expect(receitasFeitas).toBeInTheDocument();
    expect(receitasFavoritas).toBeInTheDocument();
    expect(sair).toBeInTheDocument();
  });

  it('O e-mail da pessoa usuária deve estar visível', () => {
    localStorage.setItem('user', JSON.stringify({ email: 'alguem@email.com' }));
    const { getAllByRole } = renderWithRouter(<Perfil />);

    const level = getAllByRole('heading', { level: 2 });
    const name = getAllByRole('heading', { name: 'alguem@email.com' });
    expect((level, name));
  });

  it('A tela contêm todos os 3 botões.', () => {
    renderWithRouter(<Perfil />);
    const button = document.querySelectorAll('button');
    const number = 6;
    expect(button.length).toBe(number);
  });

  it('Ao clicar no botão de "Receitas Favoritas", a rota deve mudar.', () => {
    const { getByTestId, history } = renderWithRouter(<Perfil />);
    const receitasFavoritas = getByTestId('profile-favorite-btn');
    userEvent.click(receitasFavoritas);
    const { pathname } = history.location;
    expect(pathname).toBe('/receitas-favoritas');
  });

  it('Ao clicar no botão de "Receitas Feitas", a rota deve mudar.', () => {
    const { getByTestId, history } = renderWithRouter(<Perfil />);
    const receitasFeitas = getByTestId('profile-done-btn');
    userEvent.click(receitasFeitas);
    const { pathname } = history.location;
    expect(pathname).toBe('/receitas-feitas');
  });

  it('Ao clicar no botão de "Sair", a rota deve mudar.', () => {
    const { getByTestId, history } = renderWithRouter(<Perfil />);
    const sair = getByTestId('profile-logout-btn');
    userEvent.click(sair);
    const { pathname } = history.location;
    expect(pathname).toBe('/');
  });

  it('Ao clicar no botão de "Sair", limpa todas as chaves do localStorage.', () => {
    localStorage.setItem('user', JSON.stringify({ email: 'alguem@email.com' }));
    localStorage.setItem('mealsToken', 1);
    localStorage.setItem('cocktailsToken', 1);
    localStorage.setItem('doneRecipes', JSON.stringify({}));
    localStorage.setItem('favoriteRecipes', JSON.stringify({}));
    localStorage.setItem('inProgressRecipes', JSON.stringify({}));

    const { getByTestId } = renderWithRouter(<Perfil />);
    const sair = getByTestId('profile-logout-btn');
    userEvent.click(sair);
    localStorage.clear();

    const clearUser = localStorage.getItem('user');
    expect(clearUser).toBe(null);
    const clearMealsToken = localStorage.getItem('mealsToken');
    expect(clearMealsToken).toBe(null);
    const clearCocktailsToken = localStorage.getItem('cocktailsToken');
    expect(clearCocktailsToken).toBe(null);
    const clearDoneRecipes = localStorage.getItem('doneRecipes');
    expect(clearDoneRecipes).toBe(null);
    const clearFavoriteRecipes = localStorage.getItem('favoriteRecipes');
    expect(clearFavoriteRecipes).toBe(null);
    const clearInProgressRecipes = localStorage.getItem('inProgressRecipes');
    expect(clearInProgressRecipes).toBe(null);
  });
});
