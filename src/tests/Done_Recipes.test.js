import React from 'react';
import userEvent from '@testing-library/user-event';
import { fireEvent, screen } from '@testing-library/react';
import App from '../App';
import * as API from '../services/index';
import renderWithRouter from '../services/renderWithRouter';
import oneMeal from '../../cypress/mocks/oneMeal';
import cocoaDrinks from '../../cypress/mocks/cocoaDrinks';

jest.mock('../services/index');
const mockFetchById = API
  .fetchMealsById.mockImplementation(() => Promise.resolve(oneMeal.meals));

const fetchRec = API.fetchRecommendedDrinks
  .mockImplementation(() => Promise.resolve(cocoaDrinks.drinks));

describe('Testa Tela de Receitas Finalizadas', () => {
  const initLength = 0;
  const eightLength = 8;

  it('Possui todos os elementos da tela de receitas feitas', async () => {
    const { history, container } = renderWithRouter(<App />);
    history.push('comidas/52771/in-progress');
    await (() => expect(mockFetchById).toHaveBeenCalled());
    const ingredientes = container.querySelector('.ingredients').childNodes;
    expect(ingredientes.length).toBe(eightLength);
    for (let index = initLength; index < ingredientes.length; index += 1) {
      userEvent.click(screen.getByTestId(`${index}-ingredient-step`));
    }
    const btnFinalizar = screen.getByTestId('finish-recipe-btn');
    expect(btnFinalizar).not.toBeDisabled();
    fireEvent.click(btnFinalizar);
    expect(history.location.pathname).toBe('/receitas-feitas');

    expect(screen.getByText('Receitas Feitas')).toBeInTheDocument();
    expect(screen.getByText('All')).toBeInTheDocument();
    expect(screen.getByText('Food')).toBeInTheDocument();
    expect(screen.getByText('Drinks')).toBeInTheDocument();
    expect(screen.getByText('Spicy Arrabiata Penne'));
    expect(screen.getByText('Pasta'));
    expect(screen.getByText('Curry'));
    expect(screen.getByTestId('0-horizontal-share-btn'));
    expect(screen.getByTestId('0-horizontal-image').src).toBe('https://www.themealdb.com/images/media/meals/ustsqw1468250014.jpg');
  });

  it('Testa eventos de click em elementos da página', async () => {
    const { history, container } = renderWithRouter(<App />);
    history.push('comidas/52771/in-progress');
    await (() => expect(mockFetchById).toHaveBeenCalled());
    const ingredientes = container.querySelector('.ingredients').childNodes;
    expect(ingredientes.length).toBe(eightLength);
    for (let index = initLength; index < ingredientes.length; index += 1) {
      userEvent.click(screen.getByTestId(`${index}-ingredient-step`));
    }
    const btnFinalizar = screen.getByTestId('finish-recipe-btn');
    fireEvent.click(btnFinalizar);
    fireEvent.click(screen.getByText('Drinks'));
    expect(screen.queryByText('Spicy Arrabiata Penne')).not.toBeInTheDocument();
    fireEvent.click(screen.getByText('Food'));
    fireEvent.click(screen.getByText('Drinks'));
    expect(screen.queryByText('Spicy Arrabiata Penne')).not.toBeInTheDocument();
    fireEvent.click(screen.getByText('All'));
    fireEvent.click(screen.getByTestId('0-horizontal-image'));
    await (() => expect(fetchRec).toHaveBeenCalled());
    await (() => expect(mockFetchById).toHaveBeenCalled());
    expect(history.location.pathname).toBe('/comidas/52771');
    history.push('/receitas-feitas');
    expect(history.location.pathname).toBe('/receitas-feitas');
  });
});
