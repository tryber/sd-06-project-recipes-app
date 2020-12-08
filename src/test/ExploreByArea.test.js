import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import App from '../App';
import ExploreByArea from '../pages/ExploreByArea';
import meals from '../../cypress/mocks/meals';
import areas from '../../cypress/mocks/areas';

describe('A página de Explorar por área', () => {
  it('A tela renderiza 12 cards de receitas', async () => {
    global.fetch = jest.fn(() => Promise.resolve({
      json: () => Promise.resolve(meals),
    }));
    renderWithRouter(<ExploreByArea />);
    const zero = 0;
    const twelve = 12;
    await screen.findByTestId('0-recipe-card');
    for (let i = zero; i < twelve; i += 1) {
      const card = screen.queryByTestId(`${i}-recipe-card`);
      expect(card).toBeInTheDocument();
    }
    const lastCard = screen.queryByTestId(`${twelve}-recipe-card`);
    expect(lastCard).not.toBeInTheDocument();
  });
  it('O card da comida é clicavel', async () => {
    global.fetch = jest.fn(() => Promise.resolve({
      json: () => Promise.resolve(meals),
    }));
    renderWithRouter(<ExploreByArea />);
    await screen.findByTestId('0-recipe-card');
    const firstRecipe = screen.queryByTestId('0-recipe-card');
    userEvent.click(firstRecipe);
  });
  it('A tela renderiza um dropdown com as opções de culinária', async () => {
    global.fetch = jest.fn(() => Promise.resolve({
      json: () => Promise.resolve(areas),
    }));
    renderWithRouter(<ExploreByArea />);
    await screen.findByTestId('American-option');
    const american = screen.queryByTestId('American-option');
    expect(american).toBeInTheDocument();
  });
  it('A rota /explorar/bebidas/area deve redirecionar para a página Not Found', () => {
    const { history } = renderWithRouter(<App />);
    history.push('explorar/bebidas/area');
    const notFound = screen.getByText('Not Found');
    expect(notFound).toBeInTheDocument();
  });
  it('A tela filtra de acordo com a area selecionada', async () => {
    const two = 2;
    global.fetch = jest.fn(() => Promise.resolve({
      json: () => Promise.resolve(areas),
    }));
    renderWithRouter(<ExploreByArea />);
    await screen.findByTestId('American-option');
    const american = screen.queryByTestId('American-option');
    userEvent.selectOptions(screen.getByTestId('explore-by-area-dropdown'), american);
    expect(global.fetch).toHaveBeenCalledTimes(two);
    expect(global.fetch).toBeCalledWith('https://www.themealdb.com/api/json/v1/1/list.php?a=list');
    expect(global.fetch).toBeCalledWith('https://www.themealdb.com/api/json/v1/1/search.php?s=');
  });
});
