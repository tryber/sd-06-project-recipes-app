import React from 'react';
import userEvent from '@testing-library/user-event';
import { fireEvent, screen } from '@testing-library/react';
import App from '../App';
import renderWithRouter from '../services/renderWithRouter';
import * as API from '../services/index';
import oneMeal from '../../cypress/mocks/oneMeal';
import oneDrink from '../../cypress/mocks/oneDrink';

jest.mock('../services/index');
const mockFetchFoodById = API
  .fetchMealsById.mockImplementation(() => Promise.resolve(oneMeal.meals));

jest.mock('../services/index');
const mockFetchDrinkById = API
  .fetchDrinksById.mockImplementation(() => Promise.resolve(oneDrink.drinks));

describe('Testar a página de receitas em progresso renderiza normalmente', () => {
  const eightLength = 8;
  const initLength = 0;
  it(`items da receita existem, botões share e favorite,
        quantidade de ingredientes, verifica se todos os checkbox marcados 
        habilitam o botão finalizar, e ao clicar no mesmo ocorre mudança de rota`,
  async () => {
    const { history } = renderWithRouter(<App />);
    history.push('/comidas/52771/in-progress');
    await (() => expect(mockFetchFoodById).toHaveBeenCalled());
    expect(screen.getAllByText('Spicy Arrabiata Penne'));
    expect(screen.getAllByText('Vegetarian'));
    expect(screen.getByTestId('share-btn'));
    expect(screen.getByTestId('favorite-btn'));
    const ingredientes = document.querySelector('.ingredients').childNodes;
    expect(ingredientes.length).toBe(eightLength);
    const checkBox = document.querySelectorAll('input[type=checkbox]');
    expect(checkBox.length).toBe(eightLength);
    const btnFinalizar = screen.getByTestId('finish-recipe-btn');
    expect(btnFinalizar).toBeDisabled();
    for (let index = initLength; index < ingredientes.length; index += 1) {
      userEvent.click(screen.getByTestId(`${index}-ingredient-step`));
    }
    expect(btnFinalizar).not.toBeDisabled();
    fireEvent.click(btnFinalizar);
    expect(history.location.pathname).toBe('/receitas-feitas');
  });
});

describe('Testar a página de receitas em progresso renderiza normalmente', () => {
  const threeLength = 3;
  const initLength = 0;
  it(`items da receita existem, botões share e favorite,
        quantidade de ingredientes, verifica se todos os checkbox marcados 
        habilitam o botão finalizar, e ao clicar no mesmo ocorre mudança de rota`,
  async () => {
    const { history } = renderWithRouter(<App />);
    history.push('/bebidas/178319/in-progress');
    await (() => expect(mockFetchDrinkById).toHaveBeenCalled());
    expect(screen.getAllByText('Aquamarine'));
    expect(screen.getAllByText('Cocktail'));
    expect(screen.getByTestId('share-btn'));
    expect(screen.getByTestId('favorite-btn'));
    const ingredientes = document.querySelector('.ingredients').childNodes;
    expect(ingredientes.length).toBe(threeLength);
    const checkBox = document.querySelectorAll('input[type=checkbox]');
    expect(checkBox.length).toBe(threeLength);
    const btnFinalizar = screen.getByTestId('finish-recipe-btn');
    expect(btnFinalizar).toBeDisabled();
    for (let index = initLength; index < ingredientes.length; index += 1) {
      userEvent.click(screen.getByTestId(`${index}-ingredient-step`));
    }
    expect(btnFinalizar).not.toBeDisabled();
    fireEvent.click(btnFinalizar);
    expect(history.location.pathname).toBe('/receitas-feitas');
  });
});
