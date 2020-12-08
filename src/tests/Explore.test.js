import React from 'react';
import { fireEvent } from '@testing-library/react';
import renderWithRouter from './services/renderWithRouter';
import Explorar from '../pages/Explorar';

describe('Verifica o botão de Explorar Comidas ', () => {
  it('Deve ter um botão que redireciona para página Explorar Comidas"', () => {
    const { getByRole, history } = renderWithRouter(<Explorar />);
    const exploreBtnFood = getByRole('button', { name: /Explorar Comidas/i });
    const exploreFoodRoute = '/explorar/comidas';
    expect(exploreBtnFood).toBeInTheDocument();
    fireEvent.click(exploreBtnFood);
    expect(history.location.pathname).toBe(exploreFoodRoute);
  });
});

describe('Verifica o botão de Explorar Bebidas ', () => {
  it('Deve ter um botão que redireciona para página Explorar Bebidas"', () => {
    const { getByRole, history } = renderWithRouter(<Explorar />);
    const exploreBtnDrinks = getByRole('button', { name: /Explorar Drinks/i });
    const exploreDrinkRoute = '/explorar/bebidas';
    expect(exploreBtnDrinks).toBeInTheDocument();
    fireEvent.click(exploreBtnDrinks);
    expect(history.location.pathname).toBe(exploreDrinkRoute);
  });
});
