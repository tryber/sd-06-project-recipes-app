import React from 'react';
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

describe('testando os elementos do footer na tela principal de receitas', () => {
  beforeAll(() => {
    const email = 'email@email.com';
    localStorage.user = JSON.stringify({ email });
  });
  it('O footer tem os ícones corretos na tela de principal de receitas de comida', () => {
    const { getByTestId } = renderWithRouter(<Food />);
    const drinks = getByTestId('drinks-bottom-btn');
    const explore = getByTestId('explore-bottom-btn');
    const food = getByTestId('food-bottom-btn');
    expect(drinks).toBeInTheDocument();
    expect(food).toBeInTheDocument();
    expect(explore).toBeInTheDocument();
  });
});
describe('testando um ícone para a tela de perfil', () => {
  it('Não tem footer na tela de login;', () => {
    const { queryByTestId } = renderWithRouter(<Login />);
    const drinks = queryByTestId('drinks-bottom-btn');
    const explore = queryByTestId('explore-bottom-btn');
    const food = queryByTestId('food-bottom-btn');
    expect(drinks).not.toBeInTheDocument();
    expect(food).not.toBeInTheDocument();
    expect(explore).not.toBeInTheDocument();
  });
  it('O footer tem os ícones corretos na tela;', () => {
    const { queryByTestId } = renderWithRouter(<Drink />);
    const drinks = queryByTestId('drinks-bottom-btn');
    const explore = queryByTestId('explore-bottom-btn');
    const food = queryByTestId('food-bottom-btn');
    expect(drinks).toBeInTheDocument();
    expect(food).toBeInTheDocument();
    expect(explore).toBeInTheDocument();
  });
  it('Não tem footer na tela de detalhes de uma receita de comida;', () => {
    const { queryByTestId } = renderWithRouter(
      <FoodDetails
        match={ { params: { id: '52977' } } }
        location={ { pathname: '' } }
      />,
    );
    const drinks = queryByTestId('drinks-bottom-btn');
    const explore = queryByTestId('explore-bottom-btn');
    const food = queryByTestId('food-bottom-btn');
    expect(drinks).not.toBeInTheDocument();
    expect(food).not.toBeInTheDocument();
    expect(explore).not.toBeInTheDocument();
  });
  it('Não tem footer na tela de detalhes de uma receita de bebida;', () => {
    const { queryByTestId } = renderWithRouter(
      <DrinkDetails
        match={ { params: { id: '15997' } } }
        location={ { pathname: '' } }
      />,
    );
    const drinks = queryByTestId('drinks-bottom-btn');
    const explore = queryByTestId('explore-bottom-btn');
    const food = queryByTestId('food-bottom-btn');
    expect(drinks).not.toBeInTheDocument();
    expect(food).not.toBeInTheDocument();
    expect(explore).not.toBeInTheDocument();
  });
  it('Não tem footer na tela de receita em processo de comida', () => {
    const { queryByTestId } = renderWithRouter(
      <FoodInProgress
        match={ { params: { id: '15997' } } }
        location={ { pathname: '' } }
      />,
    );
    const drinks = queryByTestId('drinks-bottom-btn');
    const explore = queryByTestId('explore-bottom-btn');
    const food = queryByTestId('food-bottom-btn');
    expect(drinks).not.toBeInTheDocument();
    expect(food).not.toBeInTheDocument();
    expect(explore).not.toBeInTheDocument();
  });
  it('Não tem footer na tela de receita em processo de bebida;', () => {
    const { queryByTestId } = renderWithRouter(
      <DrinkInProgress
        match={ { params: { id: '15997' } } }
        location={ { pathname: '' } }
      />,
    );
    const drinks = queryByTestId('drinks-bottom-btn');
    const explore = queryByTestId('explore-bottom-btn');
    const food = queryByTestId('food-bottom-btn');
    expect(drinks).not.toBeInTheDocument();
    expect(food).not.toBeInTheDocument();
    expect(explore).not.toBeInTheDocument();
  });
  it('O footer tem os ícones corretos na tela de explorar;', () => {
    const { queryByTestId } = renderWithRouter(<Explore />);
    const drinks = queryByTestId('drinks-bottom-btn');
    const explore = queryByTestId('explore-bottom-btn');
    const food = queryByTestId('food-bottom-btn');
    expect(drinks).toBeInTheDocument();
    expect(food).toBeInTheDocument();
    expect(explore).toBeInTheDocument();
  });
  it('O footer tem os ícones corretos na tela de perfil;', () => {
    const { queryByTestId } = renderWithRouter(<Profile />);
    const drinks = queryByTestId('drinks-bottom-btn');
    const explore = queryByTestId('explore-bottom-btn');
    const food = queryByTestId('food-bottom-btn');
    expect(drinks).toBeInTheDocument();
    expect(food).toBeInTheDocument();
    expect(explore).toBeInTheDocument();
  });
  it('O footer tem os ícones corretos na tela de explorar comidas;', () => {
    const { queryByTestId } = renderWithRouter(<ExploreFoods />);
    const drinks = queryByTestId('drinks-bottom-btn');
    const explore = queryByTestId('explore-bottom-btn');
    const food = queryByTestId('food-bottom-btn');
    expect(drinks).toBeInTheDocument();
    expect(food).toBeInTheDocument();
    expect(explore).toBeInTheDocument();
  });
  it('O footer tem os ícones corretos na tela de explorar bebidas;', () => {
    const { queryByTestId } = renderWithRouter(<ExploreDrinks />);
    const drinks = queryByTestId('drinks-bottom-btn');
    const explore = queryByTestId('explore-bottom-btn');
    const food = queryByTestId('food-bottom-btn');
    expect(drinks).toBeInTheDocument();
    expect(food).toBeInTheDocument();
    expect(explore).toBeInTheDocument();
  });
  it('O footer tem os ícones corretos na tela;', () => {
    const { queryByTestId } = renderWithRouter(<ExploreFoodIngredients />);
    const drinks = queryByTestId('drinks-bottom-btn');
    const explore = queryByTestId('explore-bottom-btn');
    const food = queryByTestId('food-bottom-btn');
    expect(drinks).toBeInTheDocument();
    expect(food).toBeInTheDocument();
    expect(explore).toBeInTheDocument();
  });
  it('O footer tem os ícones corretos na tela;', () => {
    const { queryByTestId } = renderWithRouter(<ExploreDrinkIngredients />);
    const drinks = queryByTestId('drinks-bottom-btn');
    const explore = queryByTestId('explore-bottom-btn');
    const food = queryByTestId('food-bottom-btn');
    expect(drinks).toBeInTheDocument();
    expect(food).toBeInTheDocument();
    expect(explore).toBeInTheDocument();
  });
  it('O footer tem os ícones corretos na tela;', () => {
    const { queryByTestId } = renderWithRouter(<ExploreByArea />);
    const drinks = queryByTestId('drinks-bottom-btn');
    const explore = queryByTestId('explore-bottom-btn');
    const food = queryByTestId('food-bottom-btn');
    expect(drinks).toBeInTheDocument();
    expect(food).toBeInTheDocument();
    expect(explore).toBeInTheDocument();
  });
  it('O footer tem os ícones corretos na tela de perfil;', () => {
    const { queryByTestId } = renderWithRouter(<Profile />);
    const drinks = queryByTestId('drinks-bottom-btn');
    const explore = queryByTestId('explore-bottom-btn');
    const food = queryByTestId('food-bottom-btn');
    expect(drinks).toBeInTheDocument();
    expect(food).toBeInTheDocument();
    expect(explore).toBeInTheDocument();
  });
  it('O footer não tem os ícones na tela de receitas feitas;', () => {
    const { queryByTestId } = renderWithRouter(<FinishedRecipes />);
    const drinks = queryByTestId('drinks-bottom-btn');
    const explore = queryByTestId('explore-bottom-btn');
    const food = queryByTestId('food-bottom-btn');
    expect(drinks).not.toBeInTheDocument();
    expect(food).not.toBeInTheDocument();
    expect(explore).not.toBeInTheDocument();
  });
  it('O footer não tem os ícones na tela de receitas favoritas;', () => {
    const { queryByTestId } = renderWithRouter(<FavoritesRecipes />);
    const drinks = queryByTestId('drinks-bottom-btn');
    const explore = queryByTestId('explore-bottom-btn');
    const food = queryByTestId('food-bottom-btn');
    expect(drinks).not.toBeInTheDocument();
    expect(food).not.toBeInTheDocument();
    expect(explore).not.toBeInTheDocument();
  });
});
