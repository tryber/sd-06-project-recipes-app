import React from 'react';
import renderWithRouter from './RenderWithRouter';
import ReceitasFeitas from '../pages/ReceitasFeitas';

describe('Comidas test', () => {
  it('have the heder', () => {
    const { getByTestId } = renderWithRouter(<ReceitasFeitas />);

    expect(getByTestId('header')).toBeInTheDocument();
  });
});
