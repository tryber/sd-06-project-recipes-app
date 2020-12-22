import React from 'react';
import userEvent from '@testing-library/user-event';
import { fireEvent, screen } from '@testing-library/react';
import App from '../App';
import * as API from '../services/index';
import renderWithRouter from '../services/renderWithRouter';
import oneMeal from '../../cypress/mocks/oneMeal';
import oneDrink from '../../cypress/mocks/oneDrink';
import cocoaDrinks from '../../cypress/mocks/cocoaDrinks';
import chickenMeals from '../../cypress/mocks/chickenMeals';

jest.mock('../services/index');
const mockFoodById = API
  .fetchMealsById.mockImplementation(() => Promise.resolve(oneMeal.meals));
const mockRecomenDrinks = API
  .fetchRecommendedDrinks.mockImplementation(() => Promise.resolve(cocoaDrinks.drinks));

jest.mock('../services/index');
const mockDrinkById = API
  .fetchDrinksById.mockImplementation(() => Promise.resolve(oneDrink.drinks));
const mockRecomenFoods = API
  .fetchRecommendedMeals.mockImplementation(() => Promise.resolve(chickenMeals.meals));

describe('Testa Tela de Receitas Finalizadas', () => {
  const initLength = 0;
  const eightLength = 8;
  const threeLength = 3;

  it('Possui todos os elementos da tela de receitas feitas para comidas', async () => {
    const { history, container } = renderWithRouter(<App />);
    history.push('comidas/52771/in-progress');
    await (() => expect(mockFoodById).toHaveBeenCalled());
    const ingredientes = container.querySelector('.ingredients').childNodes;
    expect(ingredientes.length).toBe(eightLength);
    for (let index = initLength; index < ingredientes.length; index += 1) {
      userEvent.click(screen.getByTestId(`${index}-ingredient-step`));
    }
    const btnFinalizar = screen.getByTestId('finish-recipe-btn');
    expect(btnFinalizar).not.toBeDisabled();
    fireEvent.click(btnFinalizar);
    expect(history.location.pathname).toBe('/receitas-feitas');

    expect(screen.getByText('Receitas Feitas')).toBeInTheDocument();
    expect(screen.getByText('All')).toBeInTheDocument();
    expect(screen.getByText('Food')).toBeInTheDocument();
    expect(screen.getByText('Drinks')).toBeInTheDocument();
    expect(screen.getByText('Spicy Arrabiata Penne'));
    expect(screen.getByText('Pasta'));
    expect(screen.getByText('Curry'));
    expect(screen.getByTestId('0-horizontal-share-btn'));
    expect(screen.getByTestId('0-horizontal-image').src).toBe('https://www.themealdb.com/images/media/meals/ustsqw1468250014.jpg');
  });

  it('Possui todos os elementos da tela de receitas feitas para bebidas', async () => {
    const { history, container } = renderWithRouter(<App />);
    history.push('/bebidas/178319/in-progress');
    await (() => expect(mockDrinkById).toHaveBeenCalled());
    const ingredientes = container.querySelector('.ingredients').childNodes;
    expect(ingredientes.length).toBe(threeLength);
    for (let index = initLength; index < ingredientes.length; index += 1) {
      userEvent.click(screen.getByTestId(`${index}-ingredient-step`));
    }
    const btnFinalizar = screen.getByTestId('finish-recipe-btn');
    expect(btnFinalizar).not.toBeDisabled();
    fireEvent.click(btnFinalizar);
    expect(history.location.pathname).toBe('/receitas-feitas');

    expect(screen.getByText('Receitas Feitas')).toBeInTheDocument();
    expect(screen.getByText('All')).toBeInTheDocument();
    expect(screen.getByText('Food')).toBeInTheDocument();
    expect(screen.getByText('Drinks')).toBeInTheDocument();
    expect(screen.getByText('Aquamarine'));
    expect(screen.getByText('Alcoholic'));
    expect(screen.getByTestId('0-horizontal-share-btn'));
    expect(screen.getByTestId('1-horizontal-image').src).toBe('https://www.thecocktaildb.com/images/media/drink/zvsre31572902738.jpg');
  });

  it('Testa eventos de click em elementos da página da comida', async () => {
    const { history, container } = renderWithRouter(<App />);
    history.push('comidas/52771/in-progress');
    await (() => expect(mockFoodById).toHaveBeenCalled());
    const ingredientes = container.querySelector('.ingredients').childNodes;
    expect(ingredientes.length).toBe(eightLength);
    for (let index = initLength; index < ingredientes.length; index += 1) {
      userEvent.click(screen.getByTestId(`${index}-ingredient-step`));
    }
    const btnFinalizar = screen.getByTestId('finish-recipe-btn');
    fireEvent.click(btnFinalizar);
    fireEvent.click(screen.getByText('Drinks'));
    expect(screen.queryByText('Spicy Arrabiata Penne')).not.toBeInTheDocument();
    fireEvent.click(screen.getByText('Food'));
    fireEvent.click(screen.getByText('Drinks'));
    expect(screen.queryByText('Spicy Arrabiata Penne')).not.toBeInTheDocument();
    fireEvent.click(screen.getByText('All'));
    fireEvent.click(screen.getByTestId('0-horizontal-image'));
    await (() => expect(mockRecomenDrinks).toHaveBeenCalled());
    await (() => expect(mockFoodById).toHaveBeenCalled());
    expect(history.location.pathname).toBe('/comidas/52771');
    history.push('/receitas-feitas');
    expect(history.location.pathname).toBe('/receitas-feitas');
  });

  it('Testa eventos de click em elementos da página da bebida', async () => {
    const { history, container } = renderWithRouter(<App />);
    history.push('/bebidas/178319/in-progress');
    await (() => expect(mockDrinkById).toHaveBeenCalled());
    const ingredientes = container.querySelector('.ingredients').childNodes;
    expect(ingredientes.length).toBe(threeLength);
    for (let index = initLength; index < ingredientes.length; index += 1) {
      userEvent.click(screen.getByTestId(`${index}-ingredient-step`));
    }
    const btnFinalizar = screen.getByTestId('finish-recipe-btn');
    fireEvent.click(btnFinalizar);
    fireEvent.click(screen.getByText('Food'));
    expect(screen.queryByText('Aquamarine')).not.toBeInTheDocument();
    fireEvent.click(screen.getByText('Drinks'));
    fireEvent.click(screen.getByText('Food'));
    expect(screen.queryByText('Aquamarine')).not.toBeInTheDocument();
    fireEvent.click(screen.getByText('All'));
    fireEvent.click(screen.getByTestId('1-horizontal-image'));
    await (() => expect(mockRecomenFoods).toHaveBeenCalled());
    await (() => expect(mockDrinkById).toHaveBeenCalled());
    expect(history.location.pathname).toBe('/bebidas/178319');
    history.push('/receitas-feitas');
    expect(history.location.pathname).toBe('/receitas-feitas');
  });
});
