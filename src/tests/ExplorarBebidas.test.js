import React from 'react';
import { fireEvent } from '@testing-library/react';
import renderWithRouter from './RenderWithRouter';
import ExplorarBebidas from '../pages/ExplorarBebidas';

describe('Bebida test', () => {
  it('have the heder', async () => {
    const { getByTestId } = renderWithRouter(<ExplorarBebidas />);

    expect(getByTestId('header')).toBeInTheDocument();
  });

  it('have the footer', async () => {
    const { getByTestId } = renderWithRouter(<ExplorarBebidas />);

    expect(getByTestId('footer')).toBeInTheDocument();
  });

  it(`the by ingredients button should redirect 
  to the Explore Ingredients page`, async () => {
    const { getByText, history } = renderWithRouter(<ExplorarBebidas />);

    fireEvent.click(getByText('Por Ingredientes'));

    expect(history.location.pathname).toEqual('/explorar/bebidas/ingredientes');
  });
});
