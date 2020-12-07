import React from 'react';
import { fireEvent } from '@testing-library/react';
import renderWithRouter from './RenderWithRouter';
import Explorar from '../pages/Explorar';

describe('Comidas test', () => {
  it('have the heder', async () => {
    const { getByTestId } = renderWithRouter(<Explorar />);

    expect(getByTestId('header')).toBeInTheDocument();
  });

  it('have the footer', async () => {
    const { getByTestId } = renderWithRouter(<Explorar />);

    expect(getByTestId('footer')).toBeInTheDocument();
  });

  it('the Explore Foods button should redirect to the Explore Foods page', async () => {
    const { getByText, history } = renderWithRouter(<Explorar />);

    fireEvent.click(getByText('Explorar Comidas'));

    expect(history.location.pathname).toEqual('/explorar/comidas');
  });

  it('the Explore Drinks button should redirect to the Explore Drinks page', async () => {
    const { getByText, history } = renderWithRouter(<Explorar />);

    fireEvent.click(getByText('Explorar Bebidas'));

    expect(history.location.pathname).toEqual('/explorar/bebidas');
  });
});
