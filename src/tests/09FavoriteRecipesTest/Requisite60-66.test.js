import React from 'react';
import { fireEvent } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter/renderWithRouter';
import App from '../../App';
import renderWithRouter2 from '../renderWithRouter/renderWithRouter2';
import RevenueContext from '../../context/RevenueContext';
import MainPage from '../../pages/MainPage';

test('60 - Implemente os elementos da tela de '
  + 'receitas favoritas (cumulativo com os atributos '
  + 'em comum com a tela de receitas feitas) respeitando '
  + 'os atributos descritos no protótipo', async () => {
  const { findByTestId, history } = renderWithRouter(<App />);
  history.push('receitas-favoritas');

  const allFilterButton = await findByTestId('filter-by-all-btn');
  const foodFilterButton = await findByTestId('filter-by-food-btn');
  const drinksFilterButton = await findByTestId('filter-by-drink-btn');

  expect(allFilterButton).toBeInTheDocument();
  expect(foodFilterButton).toBeInTheDocument();
  expect(drinksFilterButton).toBeInTheDocument();
});

describe('Favorite Recipes', () => {
  beforeEach(() => {
    Object.defineProperty(window, 'localStorage', {
      value: {
        getItem: jest.fn(() => (`[
          { "id": "52771", "type": "Meal", "area": "Italian", "category": "Vegetarian", "alcoholicOrNot": "", "name": "Spicy Arrabiata Penne", "image": "https://www.themealdb.com/images/media/meals/ustsqw1468250014.jpg" },
          { "id": "52772", "type": "Drink", "area": "Rusian", "category": "Test", "alcoholicOrNot": "Yes", "name": "Test", "image": "https://www.themealdb.com/images/media/meals/ustsqw1468250014.jpg" }
        ]`)),
        setItem: jest.fn(() => null),
      },
      writable: true,
    });
  });

  it('', async () => {
    const mockValue = {
      search: 'Teste',
      searchButton: false,
      setSearchButton: jest.fn(),
      setSearch: jest.fn(),
      selectedFilter: 'Meal',
    };

    const { getByTestId, getAllByTestId } = renderWithRouter2(
      <RevenueContext.Provider value={ mockValue }>
        <MainPage title="Receitas Favoritas" />
      </RevenueContext.Provider>,
    );

    const filterByFoodBtn = getByTestId('filter-by-food-btn');
    fireEvent.click(filterByFoodBtn);

    const filterByDrinkBtn = getByTestId('filter-by-drink-btn');
    fireEvent.click(filterByDrinkBtn);

    const filterByAllBtn = getByTestId('filter-by-all-btn');
    fireEvent.click(filterByAllBtn);

    const handleLocalStorageBtn = getAllByTestId('handle-local-storage-btn');
    fireEvent.click(handleLocalStorageBtn[0]);
  });
});
