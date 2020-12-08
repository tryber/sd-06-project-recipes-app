import React from 'react';
// import { fireEvent, getByRole } from '@testing-library/react';
// import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('Possui uma página de Receitas Feitas', () => {
  it('Possui 2 botões de filtrar e 1 para remover filtros', () => {
    const { getByTestId, history } = renderWithRouter(<App />);
    history.push('/receitas-feitas');
    const filterAllBtn = getByTestId('filter-by-all-btn');
    const filterFoodBtn = getByTestId('filter-by-food-btn');
    const filterDrinkBtn = getByTestId('filter-by-drink-btn');

    expect(filterAllBtn).toBeInTheDocument();
    expect(filterFoodBtn).toBeInTheDocument();
    expect(filterDrinkBtn).toBeInTheDocument();
  });

  it('Deve possui o icone de compartilhar', () => {
    // const { getByAltText, getByRole } = renderWithRouter(<App />);
    // history.push('/comidas/52978/in-progress');
    // const doneBtn = getByRole('button');

    // fireEvent.click(doneBtn);
    // const { doneRecipes } = localStorage;
    // const shareIcon = getByAltText(/Compatilhar Receita/i);

    // expect(shareIcon).toBeInTheDocument();
  });
});
