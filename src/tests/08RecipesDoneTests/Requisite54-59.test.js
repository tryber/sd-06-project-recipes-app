import React from 'react';
import renderWithRouter from '../renderWithRouter/renderWithRouter';
import App from '../../App';

describe('54 - Implemente os elementos da tela de receitas '
  + 'feitas respeitando os atributos descritos no protótipo', () => {
  it('O botão de filtro All deve ter o atributo '
    + 'data-testid="filter-by-all-btn"', async () => {
    const { history, findByTestId } = renderWithRouter((<App />));
    history.push('receitas-favoritas');

    const filterByAllButton = await findByTestId('filter-by-all-btn');
    expect(filterByAllButton).toBeTruthy();
  });

  it('O botão de filtro Food deve ter o atributo '
    + 'data-testid="filter-by-food-btn"', async () => {
    const { history, findByTestId } = renderWithRouter((<App />));
    history.push('receitas-favoritas');

    const filterByFoodButton = await findByTestId('filter-by-food-btn');
    expect(filterByFoodButton).toBeTruthy();
  });

  it('O botão de Drinks deve ter o atributo '
    + 'data-testid="filter-by-drink-btn"', async () => {
    const { history, findByTestId } = renderWithRouter((<App />));
    history.push('receitas-favoritas');

    const filterByDrinkButton = await findByTestId('filter-by-drink-btn');
    expect(filterByDrinkButton).toBeTruthy();
  });
});
