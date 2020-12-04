import React from 'react';
import { fireEvent, screen } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import ExploreFoods from '../pages/ExploreFoods';
import ExploreDrinks from '../pages/ExploreDrinks';

describe('Testando a ExploreFoods', () => {
  it('testando se todos elementos dos requisitos da ExploreFoods estão na tela', () => {
    renderWithRouter(<ExploreFoods />);
    const btnIngredient = screen.getByTestId('explore-by-ingredient');
    const btnArea = screen.getByTestId('explore-by-area');
    const btnSurprise = screen.getByTestId('explore-surprise');
    expect(btnIngredient).toBeInTheDocument();
    expect(btnArea).toBeInTheDocument();
    expect(btnSurprise).toBeInTheDocument();
  });
  it('Botão "Por Ingredientes" ao ser clicado', () => {
    const { history } = renderWithRouter(<ExploreFoods />);
    const btnIngredient = screen.getByTestId('explore-by-ingredient');
    fireEvent.click(btnIngredient);
    const { pathname } = history.location;
    expect(pathname).toBe('/explorar/comidas/ingredientes');
  });
  it('Botão "Por Local de Origem" ao ser clicado', () => {
    const { history } = renderWithRouter(<ExploreFoods />);
    const btnExploreArea = screen.getByTestId('explore-by-area');
    fireEvent.click(btnExploreArea);
    const { pathname } = history.location;
    expect(pathname).toBe('/explorar/comidas/area');
  });
  it('Botão "Por Local de Origem" ao ser clicado', () => {
    renderWithRouter(<ExploreFoods />);
    const btnSurprise = screen.getByTestId('explore-surprise');
    expect(btnSurprise).toBeEnabled();
  });
});

describe('Testando a ExploreDrinks', () => {
  it('testando se todos elementos dos requisitos da ExploreDrinks estão na tela', () => {
    const { getByTestId } = renderWithRouter(<ExploreDrinks />);
    const btnIngredient = getByTestId('explore-by-ingredient');
    const btnSurprise = getByTestId('explore-surprise');
    expect(btnIngredient).toBeInTheDocument();
    expect(btnSurprise).toBeInTheDocument();
  });
  it('Botão "Por Ingredientes" ao ser clicado', () => {
    const { history } = renderWithRouter(<ExploreDrinks />);
    const btnIngredient = screen.getByTestId('explore-by-ingredient');
    fireEvent.click(btnIngredient);
    const { pathname } = history.location;
    expect(pathname).toBe('/explorar/bebidas/ingredientes');
  });
  it('Botão "Por Local de Origem" ao ser clicado', () => {
    renderWithRouter(<ExploreDrinks />);
    const btnSurprise = screen.getByTestId('explore-surprise');
    expect(btnSurprise).toBeEnabled();
  });
});
