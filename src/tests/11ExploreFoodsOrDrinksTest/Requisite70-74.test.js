import React from 'react';
import { fireEvent } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter/renderWithRouter';
import App from '../../App';

describe('70 - Implemente os elementos da tela de explorar '
  + 'bebidas ou comidas respeitando os atributos descritos '
  + 'no protótipo', () => {
  it('Tem os data-testids corretos para a tela de explorar comidas;', async () => {
    const { findByTestId, history } = renderWithRouter(<App />);
    history.push('explorar/comidas');

    const exploreByIngredientsButton = await findByTestId('explore-by-ingredient');
    const exploreByAreaButton = await findByTestId('explore-by-area');
    const surpriseMebutton = await findByTestId('explore-surprise');

    expect(exploreByIngredientsButton).toBeInTheDocument();
    expect(exploreByAreaButton).toBeInTheDocument();
    expect(surpriseMebutton).toBeInTheDocument();
  });

  it('Tem os data-testids corretos para a tela de explorar bebidas', async () => {
    const { findByTestId, history } = renderWithRouter(<App />);
    history.push('explorar/bebidas');

    const exploreByIngredientsButton = await findByTestId('explore-by-ingredient');
    const surpriseMebutton = await findByTestId('explore-surprise');

    expect(exploreByIngredientsButton).toBeInTheDocument();
    expect(surpriseMebutton).toBeInTheDocument();
  });
});

describe('72 - Redirecione a pessoa usuária ao clicar em "Por Ingredientes", '
  + 'para a tela de explorar por ingredientes', () => {
  it('Ao clicar no botão "Por Ingredientes" da tela de explorar comidas a '
    + 'rota muda para a página de explorar comidas por '
    + 'ingrediente', async () => {
    const { findByTestId, history } = renderWithRouter(<App />);
    history.push('explorar/comidas');

    const exploreByIngredientsButton = await findByTestId('explore-by-ingredient');

    fireEvent.click(exploreByIngredientsButton);

    await expect(history.location.pathname).toBe('/explorar/comidas/ingredientes');
  });

  it('Ao clicar no botão "Por Ingredientes" da tela de explorar bebidas a rota '
    + 'muda para a página de explorar bebidas por ingrediente', async () => {
    const { findByTestId, history } = renderWithRouter(<App />);
    history.push('explorar/bebidas');

    const exploreByIngredientsButton = await findByTestId('explore-by-ingredient');

    fireEvent.click(exploreByIngredientsButton);

    await expect(history.location.pathname).toBe('/explorar/bebidas/ingredientes');
  });
});

test('73 - Redirecione a pessoa usuária ao clicar em "Por Local de Origem", '
  + 'a rota deve mudar para tela de explorar por local de origem', async () => {
  const { findByTestId, history } = renderWithRouter(<App />);
  history.push('explorar/comidas');

  const exploreByAreaButton = await findByTestId('explore-by-area');

  fireEvent.click(exploreByAreaButton);

  await expect(history.location.pathname).toBe('/explorar/comidas/area');
});

describe('74 - Redirecione a pessoa usuária ao clicar em "Me Surpreenda!", '
  + 'a rota deve mudar para a tela de detalhes de uma receita, que deve ser '
  + 'escolhida de forma aleatória através da API', () => {
  it('Ao clicar no botão "Me Surpreenda!" da tela de explorar comidas a rota '
    + 'muda para a página de detalhes de uma comida aleatória obtida através do '
    + 'endpoint https://www.themealdb.com/api/json/v1/1/random.php', async () => {
    const { findByTestId, history } = renderWithRouter(<App />);
    history.push('explorar/comidas');

    const surpriseMebutton = await findByTestId('explore-surprise');

    fireEvent.click(surpriseMebutton);

    const detailedRecipeTitle = await findByTestId('recipe-title');

    await expect(detailedRecipeTitle).toBeInTheDocument();
  });

  it('Ao clicar no botão "Me Surpreenda!" da tela de explorar bebidas a rota '
    + 'muda para a página de detalhes de uma bebida aleatória obtida através do '
    + 'endpoint https://www.thecocktaildb.com/api/json/v1/1/random.php.', async () => {
    const { findByTestId, history } = renderWithRouter(<App />);
    history.push('explorar/bebidas');

    const surpriseMebutton = await findByTestId('explore-surprise');

    fireEvent.click(surpriseMebutton);

    const detailedRecipeTitle = await findByTestId('recipe-title');

    await expect(detailedRecipeTitle).toBeInTheDocument();
  });
});
