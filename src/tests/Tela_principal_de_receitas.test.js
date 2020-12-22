import React from 'react';
import { screen, fireEvent } from '@testing-library/react';
import App from '../App';
import * as API from '../services/index';
import renderWithRouter from '../services/renderWithRouter';
import meals from '../../cypress/mocks/meals';
import drinks from '../../cypress/mocks/drinks';
import mealCategories from '../../cypress/mocks/mealCategories';
import drinkCategories from '../../cypress/mocks/drinkCategories';
import oneMeal from '../../cypress/mocks/oneMeal';
import oneDrink from '../../cypress/mocks/oneDrink';
// import cocoaDrinks from '../../cypress/mocks/cocoaDrinks';
import cocktailDrinks from '../../cypress/mocks/cocktailDrinks';
import beefMeals from '../../cypress/mocks/beefMeals';

const initLength = 0;
const maxLength = 12;
const sixLength = 6;
const fivLength = 5;
jest.mock('../services/index');

const mockFoods = API.foodsOnRender
  .mockImplementation(() => Promise.resolve(meals.meals.slice(initLength, maxLength)));

const mockDrinks = API.drinksOnRender
  .mockImplementation(() => Promise.resolve(drinks.drinks.slice(initLength, maxLength)));

const mockFoodsCategories = API.foodsCategoriesOnRender
  .mockImplementation(() => Promise
    .resolve(mealCategories.meals.slice(initLength, fivLength)));

const mockDrinksCategories = API.drinksCategoriesOnRender
  .mockImplementation(() => Promise
    .resolve(drinkCategories.drinks.slice(initLength, fivLength)));

const mockFetchFoodsByCategories = API.filterFoodsByCategory
  .mockImplementation(() => Promise
    .resolve(beefMeals.meals.slice(initLength, maxLength)));

const mockFetchDrinksByCategories = API.filterDrinksByCategory
  .mockImplementation(() => Promise
    .resolve(cocktailDrinks.drinks.slice(initLength, maxLength)));

API.fetchMealsById.mockImplementation(() => Promise
  .resolve(oneMeal.meals));
API.fetchRecommendedDrinks.mockImplementation(() => Promise
  .resolve(cocktailDrinks.drinks));

API.fetchDrinksById.mockImplementation(() => Promise
  .resolve(oneDrink.drinks));
API.fetchRecommendedMeals.mockImplementation(() => Promise
  .resolve(beefMeals.meals));

describe('Testar a tela principal de receitas', () => {
  it('existem 12 receitas e 6 botões categorias na tela de comidas;', async () => {
    const { queryByTestId, getByTestId, history } = renderWithRouter(<App />);
    history.push('/comidas');
    await (() => expect(mockFoods).toHaveBeenCalled());
    await (() => expect(mockFoodsCategories).toHaveBeenCalled());
    expect(screen.getByText('Comidas')).toBeInTheDocument();
    for (let index = initLength; index < maxLength; index += 1) {
      expect(getByTestId(`${index}-recipe-card`)).toBeInTheDocument();
    }
    expect(queryByTestId('12-recipe-card')).not.toBeInTheDocument();
    const lista = document.querySelectorAll('.food-filters');
    expect(lista.length).toBe(sixLength);
  });

  it('existem 12 receitas e 6 botões categorias na tela de bebidas;', async () => {
    const { queryByTestId, getByTestId, history } = renderWithRouter(<App />);
    history.push('/bebidas');
    await (() => expect(mockDrinks).toHaveBeenCalled());
    await (() => expect(mockDrinksCategories).toHaveBeenCalled());
    expect(screen.getByText('Bebidas')).toBeInTheDocument();
    for (let index = initLength; index < maxLength; index += 1) {
      expect(getByTestId(`${index}-recipe-card`)).toBeInTheDocument();
    }
    expect(queryByTestId('12-recipe-card')).not.toBeInTheDocument();
    const lista = document.querySelectorAll('.drink-filters');
    expect(lista.length).toBe(sixLength);
  });

  it('requisições a partir dos botões categorias e mudança de rota ao clicar no card',
    async () => {
      const { getByTestId, history } = renderWithRouter(<App />);
      history.push('/comidas');
      await (() => expect(mockFoods).toHaveBeenCalled());
      await (() => expect(mockFoodsCategories).toHaveBeenCalled());
      const btnBeef = getByTestId('Beef-category-filter').querySelector('button');
      fireEvent.click(btnBeef);
      await (() => expect(mockFetchFoodsByCategories).toHaveBeenCalled());
      expect(screen.getByText('Beef and Mustard Pie'));
      const btnAll = getByTestId('All-category-filter');
      fireEvent.click(btnAll);
      await (() => expect(mockFoods).toHaveBeenCalled());
      expect(screen.getByText('Corba'));
      const button = screen.getByTestId('0-card-img');
      fireEvent.click(button);
    });

  it('requisições a partir dos botões categorias e mudança de rota ao clicar no card',
    async () => {
      const { getByTestId, history } = renderWithRouter(<App />);
      history.push('/bebidas');
      await (() => expect(mockDrinks).toHaveBeenCalled());
      await (() => expect(mockDrinksCategories).toHaveBeenCalled());
      const btnCocktail = getByTestId('Cocktail-category-filter').querySelector('button');
      fireEvent.click(btnCocktail);
      await (() => expect(mockFetchDrinksByCategories).toHaveBeenCalled());
      expect(screen.getByText('155 Belmont'));
      const btnAll = getByTestId('All-category-filter');
      fireEvent.click(btnAll);
      await (() => expect(mockDrinks).toHaveBeenCalled());
      expect(screen.getByText('GG'));
      const button = screen.getByTestId('0-card-img');
      fireEvent.click(button);
    });
});
