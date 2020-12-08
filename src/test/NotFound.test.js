import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import NotFound from '../pages/NotFound';

describe('A página de "Not Found":', () => {
  it('Possui um elemento com o texto "Not Found"', () => {
    renderWithRouter(<NotFound />);
    const notFound = screen.getByText('Not Found');
    expect(notFound).toBeInTheDocument();
  });
  it('Possui um elemento com o titulo "Not Found"', () => {
    renderWithRouter(<NotFound />);
    const exploreBtn = screen.getByText('Explorar');
    expect(exploreBtn).toBeEnabled();
  });
});
