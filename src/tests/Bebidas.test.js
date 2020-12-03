import React from 'react';
import { fireEvent } from '@testing-library/react';
import renderWithRouter from './RenderWithRouter';
import Bebidas from '../pages/Bebidas';

describe('Bebidas test', () => {
  it('test buttons in bebidas category', async () => {
    const { findByText, getByText } = renderWithRouter(<Bebidas />);

    await findByText('Cocktail');

    expect(getByText('All')).toBeInTheDocument();

    const CocktailBtn = getByText('Cocktail');

    fireEvent.click(CocktailBtn);

    await findByText('155 Belmont');
  });
});
