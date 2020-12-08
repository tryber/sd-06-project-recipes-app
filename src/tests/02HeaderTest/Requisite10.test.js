import React from 'react';
import RevenueContext from '../../context/RevenueContext';
import Login from '../../pages/Login';
import MainPage from '../../pages/MainPage';
import RecipeDetails from '../../pages/RecipeDetails';
import renderWithRouter2 from '../renderWithRouter/renderWithRouter2';

const mockValue = {
  foods: [{
    idMeal: 1,
    strMeal: 'Teste',
    strMealThumb: 'https://www.teste.com/',

    idDrink: 2,
    strDrink: 'Teste',
    strDrinkThumb: 'https://www.teste.com/',
  }],
  searchParam: 'Meal',
  setSearchParam: jest.fn(),
  fetchCategories: jest.fn(),
  fetchApi: jest.fn(),
  setSearchButton: jest.fn(),
  setSearch: jest.fn(),
  fetchRecommendations: jest.fn(),

};

describe('10 - Implemente um ícone para a tela de perfil, '
  + 'um título e um ícone para a busca', () => {
  it('Não tem header na tela de login', () => {
    const { queryByTestId } = renderWithRouter2(
      <RevenueContext.Provider value={ mockValue }>
        <Login title="Título teste" />
      </RevenueContext.Provider>,
    );
    const header = queryByTestId('test-header');
    expect(header).toBeNull();
  });

  it('O header tem os ícones corretos na tela de principal de receitas de comidas',
    () => {
      const { getByTestId } = renderWithRouter2(
        <RevenueContext.Provider value={ mockValue }>
          <MainPage title="Comidas" />
        </RevenueContext.Provider>,
      );
      const header = getByTestId('test-header');
      expect(header).toBeInTheDocument();
      expect(getByTestId('profile-top-btn')).toBeInTheDocument();
      expect(getByTestId('search-top-btn')).toBeInTheDocument();
    });

  it('O header tem os ícones corretos na tela de principal de receitas de bebidas',
    () => {
      const { getByTestId } = renderWithRouter2(
        <RevenueContext.Provider value={ mockValue }>
          <MainPage title="Bebidas" />
        </RevenueContext.Provider>,
      );
      const header = getByTestId('test-header');
      expect(header).toBeInTheDocument();
      expect(getByTestId('profile-top-btn')).toBeInTheDocument();
      expect(getByTestId('search-top-btn')).toBeInTheDocument();
    });

  it('Não tem header na tela de detalhes de uma receita de comida', () => {
    const { queryByTestId } = renderWithRouter2(
      <RevenueContext.Provider value={ mockValue }>
        <RecipeDetails title="Comidas" />
      </RevenueContext.Provider>,
    );
    const header = queryByTestId('test-header');
    expect(header).toBeNull();
  });

  it('Não tem header na tela de detalhes de uma receita de bebidas', () => {
    const { queryByTestId } = renderWithRouter2(
      <RevenueContext.Provider value={ mockValue }>
        <RecipeDetails title="Bebidas" />
      </RevenueContext.Provider>,
    );
    const header = queryByTestId('test-header');
    expect(header).toBeNull();
  });

  it('Não tem header na tela de receita em processo de comida;', () => {
    // ainda nao temos tela de processo de debidas
  });

  it('Não tem header na tela de receita em processo de bebida', () => {
    // ainda nao temos tela de processo de debidas
  });

  it('O header tem os ícones corretos na tela de explorar', () => {
    const { getByTestId } = renderWithRouter2(
      <RevenueContext.Provider value={ mockValue }>
        <MainPage title="Explorar" />
      </RevenueContext.Provider>,
    );
    const header = getByTestId('test-header');
    expect(header).toBeInTheDocument();
    expect(getByTestId('profile-top-btn')).toBeInTheDocument();
  });

  it('O header tem os ícones corretos na tela de explorar comidas', () => {
    const { getByTestId } = renderWithRouter2(
      <RevenueContext.Provider value={ mockValue }>
        <MainPage title="Explorar Comidas" />
      </RevenueContext.Provider>,
    );
    const header = getByTestId('test-header');
    expect(header).toBeInTheDocument();
    expect(getByTestId('profile-top-btn')).toBeInTheDocument();
  });

  it('O header tem os ícones corretos na tela de explorar bebidas', () => {
    const { getByTestId } = renderWithRouter2(
      <RevenueContext.Provider value={ mockValue }>
        <MainPage title="Explorar Bebidas" />
      </RevenueContext.Provider>,
    );
    const header = getByTestId('test-header');
    expect(header).toBeInTheDocument();
    expect(getByTestId('profile-top-btn')).toBeInTheDocument();
  });

  it('O header tem os ícones corretos na tela de explorar comidas por ingrediente',
    () => {
    // ainda nao temos na tela explorar comidas a opção de explorar comidas por ingrediente
    });

  it('O header tem os ícones corretos na tela de explorar bebidas por ingrediente',
    () => {
    // ainda nao temos na tela explorar bebidas a opção de explorar bebidas por ingrediente
    });

  it('O header tem os ícones corretos na tela de explorar comidas por local de origem',
    () => {
    // ainda nao temos na tela explorar bebidas a opção de explorar comidas por local de origem
    });

  it('O header tem os ícones corretos na tela perfil', () => {
    const { getByTestId } = renderWithRouter2(
      <RevenueContext.Provider value={ mockValue }>
        <MainPage title="Perfil" />
      </RevenueContext.Provider>,
    );
    const header = getByTestId('test-header');
    expect(header).toBeInTheDocument();
    expect(getByTestId('profile-top-btn')).toBeInTheDocument();
  });

  it('O header tem os ícones corretos na tela de receitas feitas', () => {
    const { getByTestId } = renderWithRouter2(
      <RevenueContext.Provider value={ mockValue }>
        <MainPage title="Receitas Feitas" />
      </RevenueContext.Provider>,
    );
    const header = getByTestId('test-header');
    expect(header).toBeInTheDocument();
    expect(getByTestId('profile-top-btn')).toBeInTheDocument();
  });

  it('O header tem os ícones corretos na tela de receitas favoritas', () => {
    const { getByTestId } = renderWithRouter2(
      <RevenueContext.Provider value={ mockValue }>
        <MainPage title="Receitas Feitas" />
      </RevenueContext.Provider>,
    );
    const header = getByTestId('test-header');
    expect(header).toBeInTheDocument();
    expect(getByTestId('profile-top-btn')).toBeInTheDocument();
  });
});
