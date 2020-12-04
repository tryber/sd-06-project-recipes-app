import React from 'react';
import { fireEvent } from '@testing-library/react';
import RecipesProvider from '../provider/RecipesProvider';
import renderWithRouter from '../renderWithRouter';
import Header from '../components/Header';

describe('Teste Header', () => {
  test(' Implemente o header na tela principal de receitas de comidas', async () => {
    const {
      history,
      getByRole,
      getByTestId } = renderWithRouter(<RecipesProvider><Header /></RecipesProvider>);

    const title = getByTestId('page-title');
    const perfil = getByTestId('profile-top-btn');
    if (history.location.pathname === ('/comidas')) {
      const search = getByTestId('search-top-btn');
      const searchIMG = getByRole('img');
      const perfilIMG = getByRole('img');
      expect(searchIMG.src).toBe('src/images/searchIcon.svg');
      expect(perfilIMG.src).toBe('src/images/profileIcon.svg');
      expect(search).toBeInTheDocument();
    }
    expect(title).toBeInTheDocument();
    expect(perfil).toBeInTheDocument();
    fireEvent.click(perfil);
    expect(history.location.pathname).toBe('/perfil');
  });
  test(' Implemente o header na tela principal de receitas de bebidas', () => {
    const {
      history,
      getByRole,
      getByTestId } = renderWithRouter(<RecipesProvider><Header /></RecipesProvider>);

    const title = getByTestId('page-title');
    const perfil = getByTestId('profile-top-btn');
    if (history.location.pathname === ('/bebidas')) {
      const search = getByTestId('search-top-btn');
      const searchIMG = getByRole('img');
      const perfilIMG = getByRole('img');
      expect(searchIMG.src).toBe('src/images/searchIcon.svg');
      expect(perfilIMG.src).toBe('src/images/profileIcon.svg');
      expect(search).toBeInTheDocument();
    }
    expect(title).toBeInTheDocument();
    expect(perfil).toBeInTheDocument();
    fireEvent.click(perfil);
    expect(history.location.pathname).toBe('/perfil');
  });
});
