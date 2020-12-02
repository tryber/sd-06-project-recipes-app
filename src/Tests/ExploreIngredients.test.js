import React from 'react';
import { fireEvent, waitForElement } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import ExplorarBebidasIngredientes from '../Pages/ExplorarBebidasIngredientes';
import ExplorarComidasIngredientes from '../Pages/ExplorarComidasIngredientes';
import mockedFetch from '../../cypress/mocks/fetch';
import * as API from '../services/exploreRequest';

describe('Implemente os elementos da tela de explorar comidas por ingredientes', () => {
  const { getByTestId, history } = renderWithRouter(<ExplorarComidasIngredientes />);
  
  it('Tem os data-testids corretos para a tela de explorar comidas por ingredientes', () => {
    jest.spyOn(global, 'fetch').mockImplementation(mockedFetch);
    await waitForElement(() => expect(getByTestId('0-ingredient-card')).toBeInTheDocument());

    // const ingredientCard = getByTestId('0-ingredient-card');
    // const ingredientImg = getByTestId(`${index}-card-img`);
    // const ingredientName = getByTestId(`${index}-card-name`);

    // expect(ingredientCard).toBeInTheDocument();
    // expect(ingredientImg).toBeInTheDocument();
    // expect(ingredientName).toBeInTheDocument();
  });

  it('Desenvolva cards para os 12 primeiros ingredientes', () => {
    const index = 12;

    const ingredientCard = getByTestId(`${index}-ingredient-card`);
    const ingredientImg = getByTestId(`${index}-card-img`);
    const ingredientName = getByTestId(`${index}-card-name`);

    expect(ingredientCard).toBeFalsy();
    expect(ingredientImg).toBeFalsy();
    expect(ingredientName).toBeFalsy();
  });

  it('Tem o nome e a foto corretos para a tela de explorar comidas por ingredientes', () => {
    const index = 7;

    const ingImg = getByTestId(`${index}-card-img`);
    const ingName = getByTestId(`${index}-card-name`);

    expect(ingImg.src).toBe(`https://www.themealdb.com/images/ingredients/${ingName}-Small.png`);
    expect(ingName).toBe('Aubergine');
  });

  it('Redireciona a pessoa usuária ao clicar no card do ingrediente, comidas', () => {
    const index = 7;
    const ingCard = getByTestId(`${index}-ingredient-card`);

    fireEvent.click(ingCard);
    const { pathname } = history.location;
    expect(pathname).toBe('/comidas');
  });
});

describe('Implemente os elementos da tela de explorar bebidas por ingredientes', () => {
  const { getByTestId, history } = renderWithRouter(<ExplorarBebidasIngredientes />);
  
  it('Tem os data-testids corretos para a tela de explorar bebidas por ingredientes', () => {
    const index = 11;

    const ingredientCard = getByTestId(`${index}-ingredient-card`);
    const ingredientImg = getByTestId(`${index}-card-img`);
    const ingredientName = getByTestId(`${index}-card-name`);

    expect(ingredientCard).toBeInTheDocument();
    expect(ingredientImg).toBeInTheDocument();
    expect(ingredientName).toBeInTheDocument();
  });

  it('Desenvolva cards para os 12 primeiros ingredientes', () => {
    const index = 12;

    const ingredientCard = getByTestId(`${index}-ingredient-card`);
    const ingredientImg = getByTestId(`${index}-card-img`);
    const ingredientName = getByTestId(`${index}-card-name`);

    expect(ingredientCard).toBeFalsy();
    expect(ingredientImg).toBeFalsy();
    expect(ingredientName).toBeFalsy();
  });

  it('Tem o nome e a foto corretos para a tela de explorar comidas por ingredientes', () => {
    const index = 11;

    const ingImg = getByTestId(`${index}-card-img`);
    const ingName = getByTestId(`${index}-card-name`);

    expect(ingImg.src).toBe(`https://www.thecocktaildb.com/images/ingredients/${ingName}-Small.png`);
    expect(ingName).toBe('Aubergine');
  });

  it('Redireciona a pessoa usuária ao clicar no card do ingrediente, bebidas', () => {
    const index = 11;
    const ingCard = getByTestId(`${index}-ingredient-card`);

    fireEvent.click(ingCard);
    const { pathname } = history.location;
    expect(pathname).toBe('/bebidas');
  });
});
