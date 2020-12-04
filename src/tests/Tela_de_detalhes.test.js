import React from 'react';
import { fireEvent, waitForElement } from '@testing-library/react';
import renderWithRouter from '../services/renderWithRouter';
import Foods from '../pages/Foods';
import App from '../App';
import * as API from '../services/index';
import foodsOnRender from './mocks/foodsOnRender';
import mockedFetch from '../../cypress/mocks/fetch';

describe('Testar a tela de detalhes de comidas', () => {
  it('Verifica se ao clicar em uma comida ela redireciona para os detalhes', async () => {
    const { getByTestId, history } = renderWithRouter(<App />);
    jest.spyOn(global, 'fetch').mockImplementation(mockedFetch);
    history.push('/comidas');
    expect(history.location.pathname).toBe('/comidas');
    await waitForElement(() => {
      const element = getByTestId('0-card-img');
      expect(element).toBeInTheDocument();
    });

    // fireEvent.click(element);
    // expect(history.location.pathname).toBe('/comidas/52977');
    // console.log(history.location.pathname);
  });
  // it('Verifica se os elementos de detalhe estão na tela', async () => {
  //   const { getByTestId, history } = renderWithRouter(<App />);
  //   history.push('/comidas/52977');
  //   const imagemComida1 = getByTestId('recipe-photo');
  //   const tituloComida1 = getByTestId('recipe-title');
  //   const categoriaComida1 = getByTestId('recipe-category');
  //   const favoriteButton = getByTestId('favorite-btn');
  //   const shareButton = getByTestId('share-btn');
  //   const firstIngredient = getByTestId('0-ingredient-name-and-measure');
  //   const instructions = getByTestId('instructions');
  //   const video = getByTestId('video');
  //   const firstRecommended = getByTestId('0-recomendation-card');
  //   const startButton = getByTestId('start-recipe-btn');

  //   await waitFor(() => {
  //     expect(imagemComida1).toBeInTheDocument();
  //     expect(tituloComida1).toBeInTheDocument();
  //     expect(categoriaComida1).toBeInTheDocument();
  //     expect(favoriteButton).toBeInTheDocument();
  //     expect(shareButton).toBeInTheDocument();
  //     expect(firstIngredient).toBeInTheDocument();
  //     expect(instructions).toBeInTheDocument();
  //     expect(video).toBeInTheDocument();
  //     expect(firstRecommended).toBeInTheDocument();
  //     expect(startButton).toBeInTheDocument();
  //   });
  // });

  // it('Redireciona ao clicar em iniciar receita para receitas em progresso', () => {
  //   const { getByTestId, history } = renderWithRouter(<App />);
  //   history.push('/comidas/52977');

  //   const startButton = getByTestId('start-recipe-btn');
  //   fireEvent.click(startButton);
  //   expect(history.location.pathname).toBe('/comidas/52977/in-progress');
  // });

  // it('Ao clicar no botão de compartilhar surge o texto "Link copiado!"', () => {
  //   const { getByTestId, history } = renderWithRouter(<App />);
  //   history.push('/comidas/52977');

  //   const shareButton = getByTestId('share-btn');
  //   fireEvent.click(shareButton);
  //   expect('Link copiado!').toBeInTheDocument();
  // });

  // it('Ao clicar no botão de favoritar o ID da receita vai para o localStorage', () => {
  //   const { getByTestId, history } = renderWithRouter(<App />);
  //   history.push('/comidas/52977');
  //   const localStorageKey = 'favoriteRecipes';
  //   const favoriteButton = getByTestId('favorite-btn');
  //   fireEvent.click(favoriteButton);
  //   expect(localStorage.getItem).toBe(localStorageKey);
  // });
});

// describe('Testar a tela de detalhes de bebidas', () => {
//   it('Verifica se ao clicar em uma bebida ela redireciona para os detalhes', async () => {
//     const { getByTestId, history } = renderWithRouter(<App />);
//     history.push('/bebidas');
//     await waitFor(() => {
//       const bebida1 = getByTestId('0-card-img');
//       fireEvent.click(bebida1);
//       expect(history.location.pathname).toBe('/bebidas/15997');
//     });
//   });
// });
