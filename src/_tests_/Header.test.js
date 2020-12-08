import React from 'react';
import { fireEvent } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('O Header deve ter as seguintes caracteristicas:', () => {
  it('Deve ter um título, ícone de perfil e busca em Comidas', () => {
    const { getByTestId, history } = renderWithRouter(<App />);
    history.push('/comidas');

    const profile = getByTestId('profile-top-btn');
    expect(profile).toBeInTheDocument();
    expect(profile).toHaveAttribute('src', 'profileIcon.svg');

    const title = getByTestId('page-title');
    expect(title).toBeInTheDocument();
    expect(title).toHaveTextContent('Comidas');

    const searchBtn = getByTestId('search-top-btn');
    expect(searchBtn).toBeInTheDocument();
    expect(searchBtn).toHaveAttribute('src', 'searchIcon.svg');
  });

  it('Deve ter um título, ícone de perfil e busca em Bebidas', () => {
    const { getByTestId, history } = renderWithRouter(<App />);
    history.push('/bebidas');

    const profile = getByTestId('profile-top-btn');
    expect(profile).toBeInTheDocument();
    expect(profile).toHaveAttribute('src', 'profileIcon.svg');

    const title = getByTestId('page-title');
    expect(title).toBeInTheDocument();
    expect(title).toHaveTextContent('Bebidas');

    const searchBtn = getByTestId('search-top-btn');
    expect(searchBtn).toBeInTheDocument();
    expect(searchBtn).toHaveAttribute('src', 'searchIcon.svg');
  });

  it('Deve ter um título, ícone de perfil e busca em Explorar', () => {
    const { getByTestId, history } = renderWithRouter(<App />);
    history.push('/explorar');

    const profile = getByTestId('profile-top-btn');
    expect(profile).toBeInTheDocument();
    expect(profile).toHaveAttribute('src', 'profileIcon.svg');

    const title = getByTestId('page-title');
    expect(title).toBeInTheDocument();
    expect(title).toHaveTextContent('Explorar');
  });

  it('Deve ter um título, ícone de perfil e busca em Explorar Comidas', () => {
    const { getByTestId, history } = renderWithRouter(<App />);
    history.push('/explorar/comidas');

    const profile = getByTestId('profile-top-btn');
    expect(profile).toBeInTheDocument();
    expect(profile).toHaveAttribute('src', 'profileIcon.svg');

    const title = getByTestId('page-title');
    expect(title).toBeInTheDocument();
    expect(title).toHaveTextContent('Explorar Comidas');
  });

  it('Deve ter um título, ícone de perfil e busca em Explorar Bebidas', () => {
    const { getByTestId, history } = renderWithRouter(<App />);
    history.push('/explorar/bebidas');

    const profile = getByTestId('profile-top-btn');
    expect(profile).toBeInTheDocument();
    expect(profile).toHaveAttribute('src', 'profileIcon.svg');

    const title = getByTestId('page-title');
    expect(title).toBeInTheDocument();
    expect(title).toHaveTextContent('Explorar Bebidas');
  });

  it('Ter um título, ícone de perfil e busca em Explorar Comidas por Ingrediente', () => {
    const { getByTestId, history } = renderWithRouter(<App />);
    history.push('/explorar/comidas/ingredientes');

    const profile = getByTestId('profile-top-btn');
    expect(profile).toBeInTheDocument();
    expect(profile).toHaveAttribute('src', 'profileIcon.svg');

    const title = getByTestId('page-title');
    expect(title).toBeInTheDocument();
    expect(title).toHaveTextContent('Explorar Ingredientes');
  });

  it('Ter um título, ícone de perfil e busca em Explorar Bebidas por Ingrediente', () => {
    const { getByTestId, history } = renderWithRouter(<App />);
    history.push('/explorar/bebidas/ingredientes');

    const profile = getByTestId('profile-top-btn');
    expect(profile).toBeInTheDocument();
    expect(profile).toHaveAttribute('src', 'profileIcon.svg');

    const title = getByTestId('page-title');
    expect(title).toBeInTheDocument();
    expect(title).toHaveTextContent('Explorar Ingredientes');
  });

  it('Ter um título, ícone de perfil e busca em Explorar Comidas por Area', () => {
    const { getByTestId, history } = renderWithRouter(<App />);
    history.push('/explorar/comidas/area');

    const profile = getByTestId('profile-top-btn');
    expect(profile).toBeInTheDocument();
    expect(profile).toHaveAttribute('src', 'profileIcon.svg');

    const title = getByTestId('page-title');
    expect(title).toBeInTheDocument();
    expect(title).toHaveTextContent('Explorar Origem');

    const searchBtn = getByTestId('search-top-btn');
    expect(searchBtn).toBeInTheDocument();
    expect(searchBtn).toHaveAttribute('src', 'searchIcon.svg');
  });

  it('Deve ter um título, ícone de perfil e busca em perfil', () => {
    const { getByTestId, history } = renderWithRouter(<App />);
    history.push('/perfil');

    const profile = getByTestId('profile-top-btn');
    expect(profile).toBeInTheDocument();
    expect(profile).toHaveAttribute('src', 'profileIcon.svg');

    const title = getByTestId('page-title');
    expect(title).toBeInTheDocument();
    expect(title).toHaveTextContent('Perfil');
  });

  it('Deve ter um título, ícone de perfil e busca em Receitas Favoritas', () => {
    const { getByTestId, history } = renderWithRouter(<App />);
    history.push('/receitas-favoritas');

    const profile = getByTestId('profile-top-btn');
    expect(profile).toBeInTheDocument();
    expect(profile).toHaveAttribute('src', 'profileIcon.svg');

    const title = getByTestId('page-title');
    expect(title).toBeInTheDocument();
    expect(title).toHaveTextContent('Receitas Favoritas');
  });

  it('Deve ter um título, ícone de perfil e busca em Receitas Feitas', () => {
    const { getByTestId, history } = renderWithRouter(<App />);
    history.push('/receitas-feitas');

    const profile = getByTestId('profile-top-btn');
    expect(profile).toBeInTheDocument();
    expect(profile).toHaveAttribute('src', 'profileIcon.svg');

    const title = getByTestId('page-title');
    expect(title).toBeInTheDocument();
    expect(title).toHaveTextContent('Receitas Feitas');
  });

  it('Redireciona ao clicar no botão de perfil', () => {
    const { getByTestId, getByText, history } = renderWithRouter(<App />);
    history.push('/comidas');

    const profile = getByTestId('profile-top-btn');
    expect(profile).toBeInTheDocument();

    fireEvent.click(profile);

    const title = getByText(/Perfil/i);
    expect(title).toBeInTheDocument();
  });

  it('Deve aparecer o Search Bar ao clicar e desaparecer ao clicar novamente', () => {
    const { getByTestId, history } = renderWithRouter(<App />);
    history.push('/comidas');

    const searchBtn = getByTestId('search-top-btn');
    expect(searchBtn).toBeInTheDocument();
    fireEvent.click(searchBtn);

    const searchInput = getByTestId('search-input');
    const ingredientRadio = getByTestId('ingredient-search-radio');
    const nameRadio = getByTestId('name-search-radio');
    const firstLetter = getByTestId('first-letter-search-radio');

    expect(searchInput).toBeInTheDocument();
    expect(ingredientRadio).toBeInTheDocument();
    expect(nameRadio).toBeInTheDocument();
    expect(firstLetter).toBeInTheDocument();

    fireEvent.click(searchBtn);

    expect(searchInput).not.toBeInTheDocument();
    expect(ingredientRadio).not.toBeInTheDocument();
    expect(nameRadio).not.toBeInTheDocument();
    expect(firstLetter).not.toBeInTheDocument();
  });
});
