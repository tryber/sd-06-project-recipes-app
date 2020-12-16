import React from 'react';
import { fireEvent } from '@testing-library/react';
import renderWithRouter from '../services/renderWithRouter';
import App from '../App';

describe('Testar o footer de comidas e bebidas', () => {
  it('Possui inputs de comidas, bebidas e explorar', () => {
    const { getByTestId, history } = renderWithRouter(<App />);
    history.push('/comidas');
    const foodsIcon = getByTestId('food-bottom-btn');
    const drinksIcon = getByTestId('drinks-bottom-btn');
    const exploreIcon = getByTestId('explore-bottom-btn');
    expect(foodsIcon).toBeInTheDocument();
    expect(drinksIcon).toBeInTheDocument();
    expect(exploreIcon).toBeInTheDocument();
  });

  it('Redireciona para a página de comidas ao clicar no ícone de comidas', () => {
    const { getByTestId, history } = renderWithRouter(<App />);
    history.push('/bebidas');
    const foodsIcon = getByTestId('food-bottom-btn');
    fireEvent.click(foodsIcon);
    expect(history.location.pathname).toBe('/comidas');
    const h1 = getByTestId('page-title');
    expect(h1).toHaveTextContent('Comidas');
  });

  it('Redireciona para a página de bebidas ao clicar no ícone de bebidas', () => {
    const { getByTestId, history } = renderWithRouter(<App />);
    history.push('/comidas');
    const drinksIcon = getByTestId('drinks-bottom-btn');
    fireEvent.click(drinksIcon);
    expect(history.location.pathname).toBe('/bebidas');
    const h1 = getByTestId('page-title');
    expect(h1).toHaveTextContent('Bebidas');
  });

  it('Redireciona para a página de explorar ao clicar no ícone de explorar', () => {
    const { getByTestId, history } = renderWithRouter(<App />);
    history.push('/comidas');
    const exploreIcon = getByTestId('explore-bottom-btn');
    fireEvent.click(exploreIcon);
    expect(history.location.pathname).toBe('/explorar');
    const h1 = getByTestId('page-title');
    expect(h1).toHaveTextContent('Explorar');
  });
});
