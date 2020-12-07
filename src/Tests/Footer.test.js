import React from 'react';
import { fireEvent } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import Footer from '../Components/Footer';
import {
  Comidas,
  Bebidas,
  BebidasDetails,
  BebidasInProgress,
  ComidasDetails,
  ComidasInProgress,
  Explorar,
  ExplorarBebidas,
  ExplorarComidas,
  ExplorarComidasArea,
  ExplorarComidasIngredientes,
  Login,
  Perfil,
  ReceitasFavoritas,
  ReceitasFeitas,
  ExplorarBebidasIngredientes,
} from '../Pages';

describe('Teste componente Footer', () => {
  it('Implemente os elementos respeitando os atributos descritos no protótipo', () => {
    const { getByTestId } = renderWithRouter(<Footer />);
    const footerTest = getByTestId('footer');
    const drinksBtnTest = getByTestId('drinks-bottom-btn');
    const exploreBtnTest = getByTestId('explore-bottom-btn');
    const foodBtnTest = getByTestId('food-bottom-btn');

    expect(footerTest).toBeInTheDocument();
    expect(drinksBtnTest).toBeInTheDocument();
    expect(exploreBtnTest).toBeInTheDocument();
    expect(foodBtnTest).toBeInTheDocument();
  });

  it('Redirecione a pessoa usuária para rota correta, bebidas', () => {
    const { getByTestId, history } = renderWithRouter(<Footer />);
    const drinksBtnTest = getByTestId('drinks-bottom-btn');

    fireEvent.click(drinksBtnTest);
    const { pathname } = history.location;
    expect(pathname).toBe('/bebidas');
  });

  it('Redirecione a pessoa usuária para rota correta, comidas', () => {
    const { getByTestId, history } = renderWithRouter(<Footer />);
    const foodBtnTest = getByTestId('food-bottom-btn');

    fireEvent.click(foodBtnTest);
    const { pathname } = history.location;
    expect(pathname).toBe('/comidas');
  });

  it('Redirecione a pessoa usuária para rota correta, explorar', () => {
    const { getByTestId, history } = renderWithRouter(<Footer />);
    const exploreBtnTest = getByTestId('explore-bottom-btn');

    fireEvent.click(exploreBtnTest);
    const { pathname } = history.location;
    expect(pathname).toBe('/explorar');
  });

  it('Não tem footer na tela de login', () => {
    const { queryByTestId } = renderWithRouter(<Login />);

    const FOOTER = queryByTestId('footer');

    expect(FOOTER).toBeFalsy();
  });

  it('Tem footer na tela principal de comidas', () => {
    const { getByTestId } = renderWithRouter(<Comidas />);

    const footer = getByTestId('footer');

    expect(footer).toBeInTheDocument();
  });

  it('Tem footer na tela principal de bebidas', () => {
    const { getByTestId } = renderWithRouter(<Bebidas />);

    const footer = getByTestId('footer');

    expect(footer).toBeInTheDocument();
  });

  it('Não tem footer na tela de detalhes de comida', () => {
    const { queryByTestId } = renderWithRouter(<ComidasDetails />);
    const FOOTER = queryByTestId('footer');

    expect(FOOTER).toBeFalsy();
  });

  it('Não tem footer na tela de detalhes de bebida', () => {
    const { queryByTestId } = renderWithRouter(<BebidasDetails />);
    const FOOTER = queryByTestId('footer');

    expect(FOOTER).toBeFalsy();
  });

  it('Não tem footer na tela de receita em progresso de comida', () => {
    const { queryByTestId } = renderWithRouter(<ComidasInProgress />);
    const FOOTER = queryByTestId('footer');

    expect(FOOTER).toBeFalsy();
  });

  it('Não tem footer na tela de receita em progresso de bebida', () => {
    const { queryByTestId } = renderWithRouter(<BebidasInProgress />);
    const FOOTER = queryByTestId('footer');

    expect(FOOTER).toBeFalsy();
  });

  it('Tem footer na tela de explorar', () => {
    const { getByTestId } = renderWithRouter(<Explorar />);

    const footer = getByTestId('footer');

    expect(footer).toBeInTheDocument();
  });

  it('Tem footer na tela de explorar comidas', () => {
    const { getByTestId } = renderWithRouter(<ExplorarComidas />);

    const footer = getByTestId('footer');

    expect(footer).toBeInTheDocument();
  });

  it('Tem footer na tela de explorar bebidas', () => {
    const { getByTestId } = renderWithRouter(<ExplorarBebidas />);

    const footer = getByTestId('footer');

    expect(footer).toBeInTheDocument();
  });

  it('Tem footer na tela de explorar comidas por ingrediente', () => {
    const { getByTestId } = renderWithRouter(<ExplorarComidasIngredientes />);

    const footer = getByTestId('footer');

    expect(footer).toBeInTheDocument();
  });

  it('Tem footer na tela de explorar bebidas por ingrediente', () => {
    const { getByTestId } = renderWithRouter(<ExplorarBebidasIngredientes />);

    const footer = getByTestId('footer');

    expect(footer).toBeInTheDocument();
  });

  it('Tem footer na tela de explorar comidas por local de origem', () => {
    const { getByTestId } = renderWithRouter(<ExplorarComidasArea />);

    const footer = getByTestId('footer');

    expect(footer).toBeInTheDocument();
  });

  it('Tem footer na tela de perfil', () => {
    const { getByTestId } = renderWithRouter(<Perfil />);

    const footer = getByTestId('footer');

    expect(footer).toBeInTheDocument();
  });

  it('Não tem footer na tela de receitas feitas', () => {
    const { queryByTestId } = renderWithRouter(<ReceitasFeitas />);
    const FOOTER = queryByTestId('footer');

    expect(FOOTER).toBeFalsy();
  });

  it('Não tem footer na tela de receitas favoritas', () => {
    const { queryByTestId } = renderWithRouter(<ReceitasFavoritas />);
    const FOOTER = queryByTestId('footer');

    expect(FOOTER).toBeFalsy();
  });
});
