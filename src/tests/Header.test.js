import React from 'react';
import { screen, fireEvent } from '@testing-library/react';
import Comidas from '../pages/Comidas';
import renderWithRouter from './RenderWithRouter';

describe('Footer test', () => {
  it('test button explore in footer.js', () => {
    const { getByTestId } = renderWithRouter(<Comidas />);

    const button = getByTestId('search-top-btn');

    fireEvent.click(button);

    const imput = screen.getByText(/Primeira Letra/i);

    expect(imput).toBeInTheDocument();
  });
});
