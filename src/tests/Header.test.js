import React from 'react';
import { fireEvent } from '@testing-library/react';
import renderWithRouter from '../services/renderWithRouter';
import App from '../App';

describe('Testar os headers de comidas e bebidas', () => {
  it('Possui inputs do profile e search, além do H1 na página de Comidas', () => {
    const { getByTestId, history } = renderWithRouter(<App />);
    history.push('/comidas');

    const h1 = getByTestId('page-title');
    expect(h1).toBeInTheDocument();
    expect(h1).toHaveTextContent('Comidas');

    const searchInput = getByTestId('search-top-btn');
    expect(searchInput).toBeInTheDocument();

    const profileButton = getByTestId('profile-top-btn');
    expect(profileButton).toBeInTheDocument();
  });

  it('Possui inputs do profile e search, além do H1 na página de Bebidas', () => {
    const { getByTestId, history } = renderWithRouter(<App />);
    history.push('/bebidas');

    const h1 = getByTestId('page-title');
    expect(h1).toBeInTheDocument();
    expect(h1).toHaveTextContent('Bebidas');

    const searchInput = getByTestId('search-top-btn');
    expect(searchInput).toBeInTheDocument();

    const profileButton = getByTestId('profile-top-btn');
    expect(profileButton).toBeInTheDocument();
  });

  it('Redireciona para a página de pefil ao clicar no ícone de perfil', () => {
    const { getByTestId, history } = renderWithRouter(<App />);
    history.push('/comidas');

    const profileButton = getByTestId('profile-top-btn');
    expect(profileButton).toBeInTheDocument();

    fireEvent.click(profileButton);
    expect(history.location.pathname).toBe('/perfil');

    const h1 = getByTestId('page-title');
    expect(h1).toHaveTextContent('Perfil');
  });

  it('O input de busca aparece após clicar no ícone de buscar', () => {
    const { getByTestId, history } = renderWithRouter(<App />);
    history.push('/comidas');

    const searchButton = getByTestId('search-top-btn');
    fireEvent.click(searchButton);

    const searchInput = getByTestId('search-input');
    expect(searchInput).toBeInTheDocument();
  });
});
