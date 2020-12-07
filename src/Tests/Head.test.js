import React from 'react';
import { fireEvent } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';

import {
  Login,
  Comidas,
  Bebidas,
  ComidasDetails,
  BebidasDetails,
  ComidasInProgress,
  BebidasInProgress,
  Explorar,
  ExplorarComidas,
  ExplorarBebidas,
  ExplorarComidasIngredientes,
  ExplorarBebidasIngredientes,
  ExplorarComidasArea,
  Perfil,
  ReceitasFeitas,
  ReceitasFavoritas,
} from '../Pages';

describe('Crie os elementos que devem respeitar os atributos descritos no protótipo',
  () => {
    it('O header tem os ícones corretos na tela de principal de receitas de comidas',
      () => {
        const { getByTestId } = renderWithRouter(<Comidas />);
        const PROFILE_TOP = getByTestId('profile-top-btn');
        const PAGE_TITLE = getByTestId('page-title');
        const SEARCH_TOP = getByTestId('search-top-btn');

        expect(PROFILE_TOP).toBeInTheDocument();
        expect(PAGE_TITLE).toBeInTheDocument();
        expect(SEARCH_TOP).toBeInTheDocument();
      });

    it('Redirecione a pessoa usuária para a tela de perfil ao clicar no botão de perfil',
      () => {
        const { getByTestId, history } = renderWithRouter(<Comidas />);
        const PROFILE_TOP = getByTestId('profile-top-btn');
        fireEvent.click(PROFILE_TOP);

        const { pathname } = history.location;
        expect(pathname).toBe('/perfil');
      });

    it('O header tem os ícones corretos na tela de principal de receitas de bebidas',
      () => {
        const { getByTestId } = renderWithRouter(<Bebidas />);
        const PROFILE_TOP = getByTestId('profile-top-btn');
        const PAGE_TITLE = getByTestId('page-title');
        const SEARCH_TOP = getByTestId('search-top-btn');

        expect(PROFILE_TOP).toBeInTheDocument();
        expect(PAGE_TITLE).toBeInTheDocument();
        expect(SEARCH_TOP).toBeInTheDocument();
      });

    it('O header tem os ícones corretos na tela de explorar',
      () => {
        const { getByTestId } = renderWithRouter(<Explorar />);
        const PROFILE_TOP = getByTestId('profile-top-btn');
        const PAGE_TITLE = getByTestId('page-title');

        expect(PROFILE_TOP).toBeInTheDocument();
        expect(PAGE_TITLE).toBeInTheDocument();
      });

    it('O header tem os ícones corretos na tela de explorar bebidas ',
      () => {
        const { getByTestId } = renderWithRouter(<ExplorarBebidas />);
        const PROFILE_TOP = getByTestId('profile-top-btn');
        const PAGE_TITLE = getByTestId('page-title');

        expect(PROFILE_TOP).toBeInTheDocument();
        expect(PAGE_TITLE).toBeInTheDocument();
      });

    it('O header tem os ícones corretos na tela de explorar comidas',
      () => {
        const { getByTestId } = renderWithRouter(<ExplorarComidas />);
        const PROFILE_TOP = getByTestId('profile-top-btn');
        const PAGE_TITLE = getByTestId('page-title');

        expect(PROFILE_TOP).toBeInTheDocument();
        expect(PAGE_TITLE).toBeInTheDocument();
      });

    it('O header tem os ícones corretos na tela de perfil',
      () => {
        const { getByTestId } = renderWithRouter(<Perfil />);
        const PROFILE_TOP = getByTestId('profile-top-btn');
        const PAGE_TITLE = getByTestId('page-title');

        expect(PROFILE_TOP).toBeInTheDocument();
        expect(PAGE_TITLE).toBeInTheDocument();
      });

    it('O header tem os ícones corretos na tela de receitas favoritas',
      () => {
        renderWithRouter(<ReceitasFavoritas />);
        const HEADER = document.querySelector('.header');

        expect(HEADER).toBeInTheDocument();
      });

    it('O header tem os ícones corretos na tela de receitas feitas',
      () => {
        const { getByTestId } = renderWithRouter(<ReceitasFeitas />);
        const PROFILE_TOP = getByTestId('profile-top-btn');
        const PAGE_TITLE = getByTestId('page-title');

        expect(PROFILE_TOP).toBeInTheDocument();
        expect(PAGE_TITLE).toBeInTheDocument();
      });

    it('O header tem os ícones corretos na tela de explorar comidas por ingrediente',
      () => {
        const { getByTestId } = renderWithRouter(<ExplorarComidasIngredientes />);
        const PROFILE_TOP = getByTestId('profile-top-btn');
        const PAGE_TITLE = getByTestId('page-title');

        expect(PROFILE_TOP).toBeInTheDocument();
        expect(PAGE_TITLE).toBeInTheDocument();
      });

    it('O header tem os ícones corretos na tela de explorar bebidas por ingrediente',
      () => {
        const { getByTestId } = renderWithRouter(<ExplorarBebidasIngredientes />);
        const PROFILE_TOP = getByTestId('profile-top-btn');
        const PAGE_TITLE = getByTestId('page-title');

        expect(PROFILE_TOP).toBeInTheDocument();
        expect(PAGE_TITLE).toBeInTheDocument();
      });

    it('O header tem os ícones corretos na tela de explorar comidas por local de origem',
      () => {
        const { getByTestId } = renderWithRouter(<ExplorarComidasArea />);
        const PROFILE_TOP = getByTestId('profile-top-btn');
        const PAGE_TITLE = getByTestId('page-title');

        expect(PROFILE_TOP).toBeInTheDocument();
        expect(PAGE_TITLE).toBeInTheDocument();
      });

    it('Não tem header na tela de login',
      () => {
        const { queryByTestId } = renderWithRouter(<Login />);
        const PROFILE_TOP = queryByTestId('profile-top-btn');
        const PAGE_TITLE = queryByTestId('page-title');
        const SEARCH_TOP = queryByTestId('search-top-btn');

        expect(PROFILE_TOP).toBeFalsy();
        expect(PAGE_TITLE).toBeFalsy();
        expect(SEARCH_TOP).toBeFalsy();
      });

    it('Não tem header na tela de detalhes de uma receita de comida',
      () => {
        const { queryByTestId } = renderWithRouter(<ComidasDetails />);
        const PROFILE_TOP = queryByTestId('profile-top-btn');
        const PAGE_TITLE = queryByTestId('page-title');
        const SEARCH_TOP = queryByTestId('search-top-btn');

        expect(PROFILE_TOP).toBeFalsy();
        expect(PAGE_TITLE).toBeFalsy();
        expect(SEARCH_TOP).toBeFalsy();
      });

    it('Não tem header na tela de detalhes de uma receita de bebidas',
      () => {
        const { queryByTestId } = renderWithRouter(<BebidasDetails />);
        const PROFILE_TOP = queryByTestId('profile-top-btn');
        const PAGE_TITLE = queryByTestId('page-title');
        const SEARCH_TOP = queryByTestId('search-top-btn');

        expect(PROFILE_TOP).toBeFalsy();
        expect(PAGE_TITLE).toBeFalsy();
        expect(SEARCH_TOP).toBeFalsy();
      });

    it('Não tem header na tela  de receita em processo de comida',
      () => {
        const { queryByTestId } = renderWithRouter(<ComidasInProgress />);
        const PROFILE_TOP = queryByTestId('profile-top-btn');
        const PAGE_TITLE = queryByTestId('page-title');
        const SEARCH_TOP = queryByTestId('search-top-btn');

        expect(PROFILE_TOP).toBeFalsy();
        expect(PAGE_TITLE).toBeFalsy();
        expect(SEARCH_TOP).toBeFalsy();
      });

    it('Não tem header na tela de  de receita em processo de bebidas',
      () => {
        const { queryByTestId } = renderWithRouter(<BebidasInProgress />);
        const PROFILE_TOP = queryByTestId('profile-top-btn');
        const PAGE_TITLE = queryByTestId('page-title');
        const SEARCH_TOP = queryByTestId('search-top-btn');

        expect(PROFILE_TOP).toBeFalsy();
        expect(PAGE_TITLE).toBeFalsy();
        expect(SEARCH_TOP).toBeFalsy();
      });

    // it('Desenvolva o botão de busca que ao ser clicado, a barra de busca deve aparecer',
    //       const { getByTestId } = renderWithRouter(<Comidas />);
    //       const SEARCH_TOP = getByTestId('search-top-btn');
    //       fireEvent.click(SEARCH_TOP);
    //       expect('search-top-btn').toBeInTheDocument();
    //
    //       const SEARCH_INPUT = document.querySelector('button');
    //       expect(SEARCH_INPUT).toBeInTheDocument();
    //       const SEARCH_TOP = getByTestId('search-top-btn');
    //       userEvent.click(SEARCH_TOP);
    //       const SEARCH_INPUT = getByTestId('search-input');
    //       expect(SEARCH_INPUT).toBeInTheDocument();
    //   });
  });
