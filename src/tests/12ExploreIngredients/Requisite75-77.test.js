import React from 'react';
// import { screen, waitForElementToBeRemoved } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter/renderWithRouter';
import App from '../../App';

describe('75 - Implemente os elementos da tela de '
  + 'explorar ingredientes respeitando os atributos '
  + 'descritos no protótipo', () => {
  it('Tem os data-testids corretos para a tela de '
    + 'explorar comidas por ingredientes', async () => {
    const { findByTestId, history } = renderWithRouter(<App />);
    history.push('/explorar/comidas/ingredientes');

    // waitForElementToBeRemoved(() => screen.queryAllByText(/Loading.../i));

    const ingredientCard = await findByTestId('0-ingredient-card');
    const cardImage = await findByTestId('0-card-img');
    const cardName = await findByTestId('0-card-name');

    expect(ingredientCard).toBeInTheDocument();
    expect(cardImage).toBeInTheDocument();
    expect(cardName).toBeInTheDocument();
  });

  it('Tem os data-testids corretos para a tela de explorar '
    + 'bebidas por ingredientes', async () => {
    const { findByTestId, history } = renderWithRouter(<App />);
    history.push('/explorar/bebidas/ingredientes');

    // waitForElementToBeRemoved(() => screen.queryAllByText(/Loading.../i));

    const ingredientCard = await findByTestId('0-ingredient-card');
    const cardImage = await findByTestId('0-card-img');
    const cardName = await findByTestId('0-card-name');

    expect(ingredientCard).toBeInTheDocument();
    expect(cardImage).toBeInTheDocument();
    expect(cardName).toBeInTheDocument();
  });
});

describe('76 - Desenvolva cards para os 12 primeiros ingredientes, '
  + 'de forma que cada card contenha o nome do ingrediente e uma '
  + 'foto', () => {
  it('Tem o nome e a foto corretos para a tela de explorar comidas '
    + 'por ingredientes', async () => {
    const { findByTestId, history } = renderWithRouter(<App />);
    history.push('/explorar/comidas/ingredientes');

    // waitForElementToBeRemoved(() => screen.queryAllByText(/Loading.../i));

    const cardImage = await findByTestId('0-card-img');
    const cardName = await findByTestId('0-card-name');

    expect(cardImage.src).toBe('https://www.themealdb.com/images/ingredients/Chicken-Small.png');
    expect(cardName.innerHTML).toBe('Chicken');
  });

  it('Tem o nome e a foto corretos para a tela de explorar bebidas por '
    + 'ingredientes', async () => {
    const { findByTestId, history } = renderWithRouter(<App />);
    history.push('/explorar/bebidas/ingredientes');

    // waitForElementToBeRemoved(() => screen.queryAllByText(/Loading.../i));

    const cardImage = await findByTestId('0-card-img');
    const cardName = await findByTestId('0-card-name');

    expect(cardImage.src).toBe('https://www.thecocktaildb.com/images/ingredients/Light%20rum-Small.png');
    expect(cardName.innerHTML).toBe('Light rum');
  });
});
