import React from 'react';
import renderWithRouter from './RenderWithRouter';
import BebidasPorIngredientes from '../pages/BebidasPorIngredientes';

describe('Comidas test', () => {
  it('have the heder', () => {
    const { getByTestId } = renderWithRouter(<BebidasPorIngredientes />);

    expect(getByTestId('header')).toBeInTheDocument();
  });

  it('have the footer', () => {
    const { getByTestId } = renderWithRouter(<BebidasPorIngredientes />);

    expect(getByTestId('footer')).toBeInTheDocument();
  });
});
