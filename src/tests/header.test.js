import React from 'react';
import { cleanup } from '@testing-library/react';
import renderWithRouter from '../helpers/renderWithRouter';
import App from '../App';
import { Comidas } from '../Pages';
import Provider from '../Context/Provider';

afterEach(cleanup);

describe('9 - Implemente os elementos do header na tela principal de receitas', () => {
  it('Tem os data-testids profile-top-btn, page-title e search-top-btn', () => {
    const { getByTestId } = renderWithRouter(
      <Provider>
        <Comidas />
      </Provider>,
    );

    const profileTopBtn = getByTestId('profile-top-btn');
    const pageTitle = getByTestId('page-title');
    const SearchTopBar = getByTestId('search-top-btn');
    expect(profileTopBtn).toBeInTheDocument();
    expect(pageTitle).toBeInTheDocument();
    expect(SearchTopBar).toBeInTheDocument();
  });
});

describe('10 - Implemente um ícone para a tela de perfil', () => {
  afterEach(cleanup);

  it('não deve ter os botões em Loguin', () => {
    const { queryByTestId } = renderWithRouter(
      <Provider>
        <App />
      </Provider>,
    );

    const profileTopBtn = queryByTestId('profile-top-btn');
    const pageTitle = queryByTestId('page-title');
    const SearchTopBar = queryByTestId('search-top-btn');

    expect(profileTopBtn).toBeNull();
    expect(pageTitle).toBeNull();
    expect(SearchTopBar).toBeNull();
  });

  it('O ícones corretos na tela de principal de receitas de comidas', () => {
    const { queryByTestId } = renderWithRouter(
      <Provider>
        <Comidas />
      </Provider>,
    );

    const profileTopBtn = queryByTestId('profile-top-btn');
    const pageTitle = queryByTestId('page-title');
    const SearchTopBar = queryByTestId('search-top-btn');

    expect(profileTopBtn).toBeInTheDocument();
    expect(pageTitle).toBeInTheDocument();
    expect(SearchTopBar).toBeInTheDocument();
  });

  // it('O header tem os ícones corretos na tela de principal de receitas de bebidas', () => {
  //   const { queryByTestId } = renderWithRouter(
  //     <Provider>
  //       <Bebibas />
  //     </Provider>
  //   );

  //   const profileTopBtn = queryByTestId('profile-top-btn')
  //   const pageTitle = queryByTestId('page-title')
  //   const SearchTopBar = queryByTestId('search-top-btn')

  //   expect(profileTopBtn).toBeInTheDocument();
  //   expect(pageTitle).toBeInTheDocument();
  //   expect(SearchTopBar).toBeInTheDocument();
  // })
});
