import React from 'react';
import { fireEvent } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter/renderWithRouter';
import MainPage from '../../pages/MainPage';
import Login from '../../pages/Login';
import App from '../../App';

describe('19 - Implemente os elementos do menu inferior '
  + 'respeitando os atributos descritos no protótipo', () => {
  it('O menu inferior deve ter possuir o atributo data-testid="footer"', () => {
    const { getByTestId, history } = renderWithRouter(<App />);
    history.push('/comidas');
    const footer = getByTestId('footer');

    expect(footer).toBeInTheDocument();
  });

  it('O elemento que leva para a página de drinks '
    + 'deve possuir o atributo data-testid="drinks-bottom-btn"', () => {
    const { queryByTestId, history } = renderWithRouter(<App />);
    history.push('/comidas');
    const drinksBottomButton = queryByTestId('drinks-bottom-btn');

    expect(drinksBottomButton).toBeInTheDocument();
  });

  it('O elemento que leva para a página de explorar '
    + 'deve possuir o atributo data-testid="explore-bottom-btn";', () => {
    const { queryByTestId } = renderWithRouter(<MainPage title="Comidas" />);
    const exploreBottomButton = queryByTestId('explore-bottom-btn');

    expect(exploreBottomButton).toBeInTheDocument();
  });

  it('O elemento que leva para a página de comidas '
    + 'deve possuir o atributo data-testid="food-bottom-btn"', () => {
    const { queryByTestId } = renderWithRouter(<MainPage title="Comidas" />);
    const foodBottomButton = queryByTestId('food-bottom-btn');

    expect(foodBottomButton).toBeInTheDocument();
  });
});

describe('20 - Posicione o menu inferior de forma fixa e apresente 3 ícones: '
  + 'um para comidas, um para bebidas e outro para exploração', () => {
  it('Apresenta os ícones corretos (drinkIcon.svg, exploreIcon.svg '
    + 'e mealIcon.svg, disponíveis na pasta src/images/).', () => {
    const { getByTestId } = renderWithRouter(<MainPage title="Comidas" />);

    const drinksBottomButtonSrc = getByTestId('drinks-bottom-btn').src;
    const exploreBottomButtonSrc = getByTestId('explore-bottom-btn').src;
    const foodsBottomButtonSrc = getByTestId('food-bottom-btn').src;

    // console.log(drinksBottomButtonSrc);
    // console.log(exploreBottomButtonSrc);
    // console.log(foodsBottomButtonSrc);

    expect(drinksBottomButtonSrc).toBe('http://localhost/drinkIcon.svg');
    expect(exploreBottomButtonSrc).toBe('http://localhost/exploreIcon.svg');
    expect(foodsBottomButtonSrc).toBe('http://localhost/mealIcon.svg');
  });
});

// eslint-disable-next-line max-len
describe('21 - Exiba o menu inferior apenas nas telas indicadas pelo protótipo', () => {
  it('Não tem footer na tela de login', () => {
    const { queryByTestId } = renderWithRouter(<Login />);

    const footer = queryByTestId('footer');

    expect(footer).not.toBeInTheDocument();
  });

  it('Tem footer na tela de principal de receitas de comidas', () => {
    const { queryByTestId } = renderWithRouter(<MainPage title="Comidas" />);

    const footer = queryByTestId('footer');

    expect(footer).toBeInTheDocument();
  });

  it('Tem footer na tela de principal de receitas de bebidas', () => {
    const { queryByTestId } = renderWithRouter(<MainPage title="Bebidas" />);

    const footer = queryByTestId('footer');

    expect(footer).toBeInTheDocument();
  });

  it('Não tem footer na tela de detalhes de uma receita de comida', () => {
    const { queryByTestId, history } = renderWithRouter(<App />);
    history.push('/comidas/52977');

    const footer = queryByTestId('footer');
    // console.log(footer.outerHTML);
    expect(footer).not.toBeInTheDocument();
  });

  it('Não tem footer na tela de detalhes de uma receita de bebida', () => {
    const { queryByTestId, history } = renderWithRouter(<App />);
    history.push('/bebidas/15997');

    const footer = queryByTestId('footer');

    expect(footer).not.toBeInTheDocument();
  });

  // it('Não tem footer na tela de receita em processo de comida', () => {

  // });

  // it('Não tem footer na tela de detalhes de uma receita de bebida', () => {

  // });

  it('Tem footer na tela de explorar', () => {
    const { queryByTestId, history } = renderWithRouter(<App />);
    history.push('/explorar');

    const footer = queryByTestId('footer');

    expect(footer).toBeInTheDocument();
  });

  it('Tem footer na tela de explorar comidas', () => {
    const { queryByTestId, history } = renderWithRouter(<App />);
    history.push('/explorar/comidas');

    const footer = queryByTestId('footer');

    expect(footer).toBeInTheDocument();
  });

  it('Tem footer na tela de explorar bebidas;', () => {
    const { queryByTestId, history } = renderWithRouter(<App />);
    history.push('/explorar/bebidas');

    const footer = queryByTestId('footer');

    expect(footer).toBeInTheDocument();
  });

  // it('Tem footer na tela de explorar comidas por ingrediente', () => {});

  // it('Tem footer na tela de explorar bebidas por ingrediente;', () => {});

  // it('Tem footer na tela de explorar comidas por local de origem;', () => {});

  it('Tem footer na tela de perfil', () => {
    const { queryByTestId, history } = renderWithRouter(<App />);
    history.push('/perfil');

    const footer = queryByTestId('footer');

    expect(footer).toBeInTheDocument();
  });

  it('Não tem footer na tela de receitas feitas', () => {
    const { queryByTestId, history } = renderWithRouter(<App />);
    history.push('/receitas-feitas');

    const footer = queryByTestId('footer');

    expect(footer).not.toBeInTheDocument();
  });

  it('Não tem footer na tela de receitas favoritas.', () => {
    const { queryByTestId, history } = renderWithRouter(<App />);
    history.push('/receitas-favoritas');

    const footer = queryByTestId('footer');

    expect(footer).not.toBeInTheDocument();
  });
});

test('22 - Redirecione a pessoa usuária para uma lista '
  + 'de cocktails ao clicar no ícone de bebidas', () => {
  const { queryByTestId, history } = renderWithRouter(<App />);
  history.push('/bebidas');

  const drinksBottomButton = queryByTestId('drinks-bottom-btn');
  fireEvent.click(drinksBottomButton);

  const drinksPageTitle = queryByTestId('page-title');
  expect(drinksPageTitle.innerHTML).toBe('Bebidas');
});

test('23 - Redirecione a pessoa usuária para a tela '
  + 'de explorar ao clicar no ícone de exploração', () => {
  const { queryByTestId, history } = renderWithRouter(<App />);
  history.push('/bebidas');

  const exploreBottomButton = queryByTestId('explore-bottom-btn');
  fireEvent.click(exploreBottomButton);

  const explorePageTitle = queryByTestId('page-title');
  expect(explorePageTitle.innerHTML).toBe('Explorar');
});

test('24 - Redirecione a pessoa usuárua para uma lista '
  + 'de comidas ao clicar no ícone de comidas', () => {
  const { queryByTestId, history } = renderWithRouter(<App />);
  history.push('/bebidas');

  const foodBottomButton = queryByTestId('food-bottom-btn');
  fireEvent.click(foodBottomButton);

  const foodPageTitle = queryByTestId('page-title');
  expect(foodPageTitle.innerHTML).toBe('Comidas');
});
