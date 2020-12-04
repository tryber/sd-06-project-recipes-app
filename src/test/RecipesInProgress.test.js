import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
// import FoodInProgress from '../pages/FoodInProgress';
import DrinkInProgress from '../pages/DrinkInProgress';
// import drinks from '../../cypress/mocks/drinks';

describe('Tela de Receita de Comida em progresso:', () => {
  // console.log(drinks.drinks[0]);
  it('Renderiza os items corretos', () => {
    renderWithRouter(
      <DrinkInProgress match={ { params: { id: '52977' } } } />,
    );
    const photo = screen.getByTestId('recipe-photo');
    const title = screen.getByTestId('recipe-title');
    const shareBtn = screen.getByTestId('share-btn');
    const favoriteBtn = screen.getByTestId('favorite-btn');
    const category = screen.getByTestId('recipe-category');
    // const ingredient = screen.getByTestId('0-ingredient-step');
    const instructions = screen.getByTestId('instructions');
    const finishRecipeBtn = screen.getByTestId('finish-recipe-btn');
    expect(photo).toBeInTheDocument();
    expect(title).toBeInTheDocument();
    expect(shareBtn).toBeInTheDocument();
    expect(favoriteBtn).toBeInTheDocument();
    expect(category).toBeInTheDocument();
    // expect(ingredient).toBeInTheDocument();
    expect(instructions).toBeInTheDocument();
    expect(finishRecipeBtn).toBeInTheDocument();
  });
  it('O botão Finalizar Receita é habilitado quando terminam os ingredientes', () => {
    renderWithRouter(
      <DrinkInProgress match={ { params: { id: '178319' } } } />,
    );
    const finishRecipeBtn = screen.getByTestId('finish-recipe-btn');
    expect(finishRecipeBtn).toBeDisabled();
  });
  it('O botão Finalizar Receita redireciona para a tela Receitas Feitas', () => {
    const { history } = renderWithRouter(
      <DrinkInProgress match={ { params: { id: '178319' } } } />,
    );
    const finishRecipeBtn = screen.getByTestId('finish-recipe-btn');
    finishRecipeBtn.disabled = false;
    userEvent.click(finishRecipeBtn);
    const { pathname } = history.location;
    expect(pathname).toBe('/receitas-feitas');
  });
});
