import React from 'react';
import { fireEvent } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import Login from '../pages/Login';
import Explore from '../pages/Explore';
import ExploreByArea from '../pages/ExploreByArea';
import ExploreDrinks from '../pages/ExploreDrinks';
import ExploreFoods from '../pages/ExploreFoods';
import ExploreDrinkIngredients from '../pages/ExploreDrinkIngredients';
import ExploreFoodIngredients from '../pages/ExploreFoodIngredients';
import FavoritesRecipes from '../pages/FavoritesRecipes';
import FinishedRecipes from '../pages/FinishedRecipes';
import Profile from '../pages/Profile';
import Food from '../pages/Food';
import Drink from '../pages/Drink';
import DrinkDetails from '../pages/DrinkDetails';
import FoodDetails from '../pages/FoodDetails';
import FoodInProgress from '../pages/FoodInProgress';
import DrinkInProgress from '../pages/DrinkInProgress';

describe('testando os elementos do header na tela principal de receitas', () => {
  beforeAll(() => {
    const email = 'email@email.com';
    localStorage.user = JSON.stringify({ email });
  });
  it('O header tem os ícones corretos na tela de principal de receitas de comida', () => {
    const { getByTestId } = renderWithRouter(<Food />);
    const profile = getByTestId('profile-top-btn');
    const page = getByTestId('page-title');
    const search = getByTestId('search-top-btn');
    expect(profile).toBeInTheDocument();
    expect(page).toHaveTextContent('Comidas');
    expect(search).toBeInTheDocument();
    expect(page).toBeInTheDocument();
  });
});

describe('testando um ícone para a tela de perfil', () => {
  it('Não tem header na tela de login;', () => {
    const { queryByTestId } = renderWithRouter(<Login />);
    const profile = queryByTestId('profile-top-btn');
    const page = queryByTestId('page-title');
    const search = queryByTestId('search-top-btn');
    expect(profile).not.toBeInTheDocument();
    expect(search).not.toBeInTheDocument();
    expect(page).not.toBeInTheDocument();
  });

  it('O header tem os ícones corretos na tela;', () => {
    const { queryByTestId } = renderWithRouter(<Drink />);
    const profile = queryByTestId('profile-top-btn');
    const page = queryByTestId('page-title');
    const search = queryByTestId('search-top-btn');
    expect(profile).toBeInTheDocument();
    expect(search).toBeInTheDocument();
    expect(page).toBeInTheDocument();
    expect(page).toHaveTextContent('Bebidas');
  });

  it('Não tem header na tela de detalhes de uma receita de comida;', () => {
    const { queryByTestId } = renderWithRouter(
      <FoodDetails match={ { params: { id: '52977' } } } location={ { pathname: '' } } />,
    );
    const profile = queryByTestId('profile-top-btn');
    const page = queryByTestId('page-title');
    const search = queryByTestId('search-top-btn');
    expect(profile).not.toBeInTheDocument();
    expect(search).not.toBeInTheDocument();
    expect(page).not.toBeInTheDocument();
  });

  it('Não tem header na tela de detalhes de uma receita de bebida;', () => {
    const { queryByTestId } = renderWithRouter(
      <DrinkDetails
        match={ { params: { id: '15997' } } }
        location={ { pathname: '' } }
      />,
    );
    const profile = queryByTestId('profile-top-btn');
    const page = queryByTestId('page-title');
    const search = queryByTestId('search-top-btn');
    expect(profile).not.toBeInTheDocument();
    expect(search).not.toBeInTheDocument();
    expect(page).not.toBeInTheDocument();
  });

  it('Não tem header na tela de receita em processo de comida', () => {
    const { queryByTestId } = renderWithRouter(
      <FoodInProgress
        match={ { params: { id: '52977' } } }
        location={ { pathname: '' } }
      />,
    );
    const profile = queryByTestId('profile-top-btn');
    const page = queryByTestId('page-title');
    const search = queryByTestId('search-top-btn');
    expect(profile).not.toBeInTheDocument();
    expect(search).not.toBeInTheDocument();
    expect(page).not.toBeInTheDocument();
  });

  it('Não tem header na tela de receita em processo de bebida;', () => {
    const { queryByTestId } = renderWithRouter(
      <DrinkInProgress
        match={ { params: { id: '52977' } } }
        location={ { pathname: '' } }
      />,
    );
    const profile = queryByTestId('profile-top-btn');
    const page = queryByTestId('page-title');
    const search = queryByTestId('search-top-btn');
    expect(profile).not.toBeInTheDocument();
    expect(search).not.toBeInTheDocument();
    expect(page).not.toBeInTheDocument();
  });

  it('O header tem os ícones corretos na tela de explorar;', () => {
    const { queryByTestId } = renderWithRouter(<Explore />);
    const profile = queryByTestId('profile-top-btn');
    const page = queryByTestId('page-title');
    const search = queryByTestId('search-top-btn');
    expect(profile).toBeInTheDocument();
    expect(search).not.toBeInTheDocument();
    expect(page).toBeInTheDocument();
    expect(page).toHaveTextContent('Explorar');
  });

  it('O header tem os ícones corretos na tela de explorar comidas;', () => {
    const { queryByTestId } = renderWithRouter(<ExploreFoods />);
    const profile = queryByTestId('profile-top-btn');
    const page = queryByTestId('page-title');
    const search = queryByTestId('search-top-btn');
    expect(profile).toBeInTheDocument();
    expect(search).not.toBeInTheDocument();
    expect(page).toBeInTheDocument();
    expect(page).toHaveTextContent('Explorar Comidas');
  });

  it('O header tem os ícones corretos na tela de explorar bebidas;', () => {
    const { queryByTestId } = renderWithRouter(<ExploreDrinks />);
    const profile = queryByTestId('profile-top-btn');
    const page = queryByTestId('page-title');
    const search = queryByTestId('search-top-btn');
    expect(profile).toBeInTheDocument();
    expect(search).not.toBeInTheDocument();
    expect(page).toBeInTheDocument();
    expect(page).toHaveTextContent('Explorar Bebidas');
  });

  it('O header tem os ícones corretos na tela;', () => {
    const { queryByTestId } = renderWithRouter(<ExploreFoodIngredients />);
    const profile = queryByTestId('profile-top-btn');
    const page = queryByTestId('page-title');
    const search = queryByTestId('search-top-btn');
    expect(profile).toBeInTheDocument();
    expect(search).not.toBeInTheDocument();
    expect(page).toBeInTheDocument();
    expect(page).toHaveTextContent('Explorar Ingredientes');
  });

  it('O header tem os ícones corretos na tela;', () => {
    const { queryByTestId } = renderWithRouter(<ExploreDrinkIngredients />);
    const profile = queryByTestId('profile-top-btn');
    const page = queryByTestId('page-title');
    const search = queryByTestId('search-top-btn');
    expect(profile).toBeInTheDocument();
    expect(search).not.toBeInTheDocument();
    expect(page).toBeInTheDocument();
    expect(page).toHaveTextContent('Explorar Ingredientes');
  });

  it('O header tem os ícones corretos na tela;', () => {
    const { queryByTestId } = renderWithRouter(<ExploreByArea />);
    const profile = queryByTestId('profile-top-btn');
    const page = queryByTestId('page-title');
    const search = queryByTestId('search-top-btn');
    expect(profile).toBeInTheDocument();
    expect(search).toBeInTheDocument();
    expect(page).toBeInTheDocument();
    expect(page).toHaveTextContent('Explorar Origem');
  });

  it('O header tem os ícones corretos na tela de perfil;', () => {
    const { queryByTestId } = renderWithRouter(<Profile />);
    const profile = queryByTestId('profile-top-btn');
    const page = queryByTestId('page-title');
    const search = queryByTestId('search-top-btn');
    expect(profile).toBeInTheDocument();
    expect(search).not.toBeInTheDocument();
    expect(page).toBeInTheDocument();
    expect(page).toHaveTextContent('Perfil');
  });

  it('O header tem os ícones corretos na tela de receitas feitas;', () => {
    const { queryByTestId } = renderWithRouter(<FinishedRecipes />);
    const profile = queryByTestId('profile-top-btn');
    const page = queryByTestId('page-title');
    const search = queryByTestId('search-top-btn');
    expect(profile).toBeInTheDocument();
    expect(search).not.toBeInTheDocument();
    expect(page).toBeInTheDocument();
    expect(page).toHaveTextContent('Receitas Feitas');
  });

  it('O header tem os ícones corretos na tela de receitas favoritas;', () => {
    const { queryByTestId } = renderWithRouter(<FavoritesRecipes />);
    const profile = queryByTestId('profile-top-btn');
    const page = queryByTestId('page-title');
    const search = queryByTestId('search-top-btn');
    expect(profile).toBeInTheDocument();
    expect(search).not.toBeInTheDocument();
    expect(page).toBeInTheDocument();
    expect(page).toHaveTextContent('Receitas Favoritas');
  });
});

describe('testando o botão de busca', () => {
  it('ao ser clicado, a barra de busca deve aparecer', () => {
    const { queryByTestId } = renderWithRouter(<Food />);
    const searchButton = queryByTestId('search-top-btn');
    fireEvent.click(searchButton);
    const input = queryByTestId('search-input');
    expect(input).toBeInTheDocument();
    fireEvent.click(searchButton);
    expect(input).not.toBeInTheDocument();
  });
});
