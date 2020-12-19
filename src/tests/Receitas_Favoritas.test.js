import React from 'react';
import { fireEvent, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../services/renderWithRouter';
import App from '../App';
import * as API from '../services/index';
import oneMeal from '../../cypress/mocks/oneMeal';
import cocoaDrinks from '../../cypress/mocks/cocoaDrinks';

jest.mock('../services/index');
const mockById = API
  .fetchMealsById.mockImplementation(() => Promise.resolve(oneMeal.meals));
const mockRecomenDrinks = API
  .fetchRecommendedDrinks.mockImplementation(() => Promise.resolve(cocoaDrinks.drinks));

describe('Testa a tela de detalhes de receitas favoritas', () => {
  it(`Favorita uma receita na tela de detalhes e verifica
        se a mesma esta na pagina de receitas favoritas`,
  async () => {
    const { history } = renderWithRouter(<App />);
    history.push('/comidas/52771');
    expect(history.location.pathname).toBe('/comidas/52771');
    await (() => expect(mockById).toHaveBeenCalled());
    await (() => expect(mockRecomenDrinks).toHaveBeenCalled());
    const btnFvorite = screen.getByTestId('favorite-btn');
    expect(btnFvorite.src).toBe('whiteHeartIcon.svg');
    fireEvent.click(btnFvorite);
    expect(btnFvorite.src).toBe('blackHeartIcon.svg');
    history.push('/receitas-favoritas');
    const getFavoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
    expect(getFavoriteRecipes).not.toBeNull();
    fireEvent.click(screen.getByText('Food'));
    expect(screen.getByText('Receitas Favoritas')).toBeInTheDocument();
    expect(screen.getByText('All')).toBeInTheDocument();
    expect(screen.getByText('Food')).toBeInTheDocument();
    expect(screen.getByText('Drinks')).toBeInTheDocument();
    expect(screen.getByText('Spicy Arrabiata Penne'));
  });

  it('Testa eventos de click em elementos da página', async () => {
    const { history } = renderWithRouter(<App />);
    history.push('/comidas/52771');
    expect(history.location.pathname).toBe('/comidas/52771');
    await (() => expect(mockById).toHaveBeenCalled());
    await (() => expect(mockRecomenDrinks).toHaveBeenCalled());
    const btnFvorite = screen.getByTestId('favorite-btn');
    fireEvent.click(btnFvorite);
    history.push('/receitas-favoritas');
    fireEvent.click(screen.getByText('Food'));
    expect(screen.getByText('Spicy Arrabiata Penne')).toBeInTheDocument();
    fireEvent.click(screen.getByText('Drinks'));
    fireEvent.click(screen.getByText('All'));
    expect(screen.queryByText('Spicy Arrabiata Penne')).toBeInTheDocument();
    userEvent.click(screen.getByTestId('0-horizontal-favorite-btn'));
    fireEvent.click(screen.getByTestId('0-horizontal-image'));
    expect(history.location.pathname).toBe('/comidas/52771');
    await (() => expect(mockById).toHaveBeenCalled());
    await (() => expect(mockRecomenDrinks).toHaveBeenCalled());
    history.push('/receitas-favoritas');
    fireEvent.click(screen.getByTestId('profile-top-btn'));
    expect(history.location.pathname).toBe('/perfil');
    // await wait(() => expect(screen.queryByText('Spicy Arrabiata Penne')).toBeNull());
    // const getFavoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
    // expect(getFavoriteRecipes.length).toBe(0);
  });
});
