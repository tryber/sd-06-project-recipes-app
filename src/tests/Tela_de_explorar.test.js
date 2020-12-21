import React from 'react';
// import userEvent from '@testing-library/user-event';
import { screen, fireEvent } from '@testing-library/react';
import App from '../App';
import renderWithRouter from '../services/renderWithRouter';
import * as API from '../services/index';
// import oneMeal from '../../cypress/mocks/oneMeal';
import mealIngredients from '../../cypress/mocks/mealIngredients';
import drinkIngredients from '../../cypress/mocks/drinkIngredients';
import areas from '../../cypress/mocks/areas';

// jest.mock('../services/index');
// const mockFetchFoodById = API
//   .fetchMealsById.mockImplementation(() => Promise.resolve(oneMeal.meals));

jest.mock('../services/index');
const mockFetchFoodByIngredients = API
  .foodsIngredientsRender.mockImplementation(() => Promise
    .resolve(mealIngredients.meals));

jest.mock('../services/index');
const mockFetchDrinkByIngredients = API
  .drinksIngredientsRender.mockImplementation(() => Promise
    .resolve(drinkIngredients.drinks));

jest.mock('../services/index');
const mockFetchFoodByArea = API
  .fetchAreas.mockImplementation(() => Promise
    .resolve(areas.meals));

describe('Testar a tela de explorar', () => {
  it('existem 2 botões de explorar Comidas e Bebidas;', () => {
    const { getByTestId, history } = renderWithRouter(<App />);
    history.push('/explorar');
    expect(screen.getByText('Explorar')).toBeInTheDocument();
    expect(getByTestId('explore-food')).toBeInTheDocument();
    expect(getByTestId('explore-drinks')).toBeInTheDocument();
    expect(screen.getByText('Explorar Comidas')).toBeInTheDocument();
    expect(screen.getByText('Explorar Bebidas')).toBeInTheDocument();
  });

  it('testa ao clicar em Explorar Comidas', () => {
    const { getByTestId, history } = renderWithRouter(<App />);
    history.push('/explorar');
    fireEvent.click(getByTestId('explore-food'));
    history.push('/explorar/comidas');
    expect(screen.getByText('Explorar Comidas')).toBeInTheDocument();
    expect(getByTestId('explore-by-ingredient')).toBeInTheDocument();
    expect(getByTestId('explore-by-area')).toBeInTheDocument();
    expect(getByTestId('explore-surprise')).toBeInTheDocument();
    expect(screen.getByText('Por Ingredientes')).toBeInTheDocument();
    expect(screen.getByText('Por Local de Origem')).toBeInTheDocument();
    expect(screen.getByText('Me Surpreenda!')).toBeInTheDocument();
  });

  it('testa ao clicar em Explorar Bebidas', () => {
    const { getByTestId, history } = renderWithRouter(<App />);
    history.push('/explorar');
    fireEvent.click(getByTestId('explore-drinks'));
    history.push('/explorar/bebidas');
    expect(screen.getByText('Explorar Bebidas')).toBeInTheDocument();
    expect(getByTestId('explore-by-ingredient')).toBeInTheDocument();
    expect(getByTestId('explore-surprise')).toBeInTheDocument();
    expect(screen.getByText('Por Ingredientes')).toBeInTheDocument();
    expect(screen.getByText('Me Surpreenda!')).toBeInTheDocument();
  });

  it('testa ao clicar em Explorar Comidas por Ingredientes', async () => {
    const { getByTestId, history } = renderWithRouter(<App />);
    history.push('/explorar/comidas');
    fireEvent.click(getByTestId('explore-by-ingredient'));
    expect(history.location.pathname).toBe('/explorar/comidas/ingredientes');
    expect(screen.getByText('Explorar Ingredientes')).toBeInTheDocument();
    await (() => expect(mockFetchFoodByIngredients).toHaveBeenCalled());
    expect(getByTestId('0-card-img')).toBeInTheDocument();
    expect(screen.getByText('Chicken')).toBeInTheDocument();
  });

  it('testa ao clicar em Explorar Comidas por Local de Origem', async () => {
    const { getByTestId, history } = renderWithRouter(<App />);
    history.push('/explorar/comidas');
    fireEvent.click(getByTestId('explore-by-area'));
    expect(history.location.pathname).toBe('/explorar/comidas/area');
    expect(screen.getByText('Explorar Origem')).toBeInTheDocument();
    await (() => expect(mockFetchFoodByArea).toHaveBeenCalled());
  });

  // it('testa ao clicar Me Supreenda! em comidas', async () => {
  //   const { getByTestId, history } = renderWithRouter(<App />);
  //   history.push('/explorar/comidas');
  //   fireEvent.click(getByTestId('explore-surprise'));
  //   history.push('/comidas/52771');
  //   // await (() => expect(mockFetchFoodById).toHaveBeenCalled());
  //   // expect(screen.getAllByText('Spicy Arrabiata Penne'));
  //   // expect(screen.getAllByText('Vegetarian'));
  // });

  it('testa ao clicar em Explorar Bebidas por Ingredientes', async () => {
    const { getByTestId, history } = renderWithRouter(<App />);
    history.push('/explorar/bebidas');
    fireEvent.click(getByTestId('explore-by-ingredient'));
    expect(history.location.pathname).toBe('/explorar/bebidas/ingredientes');
    expect(screen.getByText('Explorar Ingredientes')).toBeInTheDocument();
    await (() => expect(mockFetchDrinkByIngredients).toHaveBeenCalled());
    expect(getByTestId('0-card-img')).toBeInTheDocument();
    expect(screen.getByText('Light rum')).toBeInTheDocument();
  });

  // it('testa ao clicar Me Supreenda! em bebidas;', async () => {
  //   const { getByTestId, history } = renderWithRouter(<App />);
  //   history.push('/explorar/bebidas');
  //   fireEvent.click(getByTestId('explore-surprise'));
  //   // history.push('/comidas/52771');
  //   // await (() => expect(mockFetchFoodById).toHaveBeenCalled());
  //   // expect(screen.getAllByText('Spicy Arrabiata Penne'));
  //   // expect(screen.getAllByText('Vegetarian'));
  // });
});
