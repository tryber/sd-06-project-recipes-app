import React from 'react';
import { screen, fireEvent } from '@testing-library/react';
import App from '../App';
import * as API from '../services/index';
import renderWithRouter from '../services/renderWithRouter';
import meals from '../../cypress/mocks/meals';
import mealCategories from '../../cypress/mocks/mealCategories';
import oneMeal from '../../cypress/mocks/oneMeal';
import cocoaDrinks from '../../cypress/mocks/cocoaDrinks';
import beefMeals from '../../cypress/mocks/beefMeals';

const initLength = 0;
const maxLength = 12;
const sixLength = 6;
const fivLength = 5;
jest.mock('../services/index');

const mockFoods = API.foodsOnRender
  .mockImplementation(() => Promise.resolve(meals.meals.slice(initLength, maxLength)));

const mockCategorie = API.foodsCategoriesOnRender
  .mockImplementation(() => Promise
    .resolve(mealCategories.meals.slice(initLength, fivLength)));

const mockFetchByCategorie = API.filterFoodsByCategory
  .mockImplementation(() => Promise
    .resolve(beefMeals.meals.slice(initLength, maxLength)));

API.fetchMealsById.mockImplementation(() => Promise.resolve(oneMeal.meals));
API.fetchRecommendedDrinks.mockImplementation(() => Promise.resolve(cocoaDrinks.drinks));

describe('Testar a tela principal de receitas', () => {
  it('existem 12 receitas e 6 botões categorias na tela;', async () => {
    const { queryByTestId, getByTestId, history } = renderWithRouter(<App />);
    history.push('/comidas');
    await (() => expect(mockFoods).toHaveBeenCalled());
    await (() => expect(mockCategorie).toHaveBeenCalled());
    expect(screen.getByText('Comidas')).toBeInTheDocument();
    for (let index = initLength; index < maxLength; index += 1) {
      expect(getByTestId(`${index}-recipe-card`)).toBeInTheDocument();
    }
    expect(queryByTestId('12-recipe-card')).not.toBeInTheDocument();
    const lista = document.querySelectorAll('.food-filters');
    expect(lista.length).toBe(sixLength);
  });

  it('requisições a partir dos botões categorias e mudança de rota ao clicar no card',
    async () => {
      const { getByTestId, history } = renderWithRouter(<App />);
      history.push('/comidas');
      await (() => expect(mockFoods).toHaveBeenCalled());
      await (() => expect(mockCategorie).toHaveBeenCalled());
      const btnBeef = getByTestId('Beef-category-filter').querySelector('button');
      fireEvent.click(btnBeef);
      await (() => expect(mockFetchByCategorie).toHaveBeenCalled());
      expect(screen.getByText('Beef and Mustard Pie'));
      const btnAll = getByTestId('All-category-filter');
      fireEvent.click(btnAll);
      await (() => expect(mockFoods).toHaveBeenCalled());
      expect(screen.getByText('Corba'));
      const button = screen.getByTestId('0-card-img');
      fireEvent.click(button);
    });
});
