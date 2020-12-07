import React from 'react';
import userEvent from '@testing-library/user-event';
import { fireEvent, waitForElement } from '@testing-library/react';
import renderWithRouter from './RenderWithRouter';
import ComidasPorIngredientes from '../pages/ComidasPorIngredientes';
import App from '../App';

// const nock = require('nock');
// const { requestApiFoodListIngredients } = require('../services/requestFood');

const ingredientes = {
  meals: [
    { strIngredient: 'Chicken' },
    { strIngredient: 'Salmon' },
    { strIngredient: 'Beef' },
    { strIngredient: 'Pork' },
    { strIngredient: 'Avocado' },
    { strIngredient: 'Apple Cider Vinegar' },
    { strIngredient: 'Asparagus' },
    { strIngredient: 'Aubergine' },
    { strIngredient: 'Baby Plum Tomatoes' },
    { strIngredient: 'Bacon' },
    { strIngredient: 'Baking Powder' },
    { strIngredient: 'Balsamic Vinegar' },
  ],
};

const filterAubergine = {
  meals: [
    { strMeal: 'Baingan Bharta' },
    { strMeal: 'Moussaka' },
    { strMeal: 'Ratatouille' },
  ],
};

const filterAppleCiderVinegar = {
  meals: [
    { strMeal: 'Roasted Eggplant With Tahini, Pine Nuts, and Lentils' },
  ],
};

const mockFetch = () => {
  jest.spyOn(global, 'fetch')
    .mockImplementation((url) => {
      if (url === 'https://www.themealdb.com/api/json/v1/1/list.php?i=list') {
        return Promise.resolve({ json: () => Promise.resolve(ingredientes) });
      }
      if (url === 'https://www.themealdb.com/api/json/v1/1/filter.php?i=Aubergine') {
        return Promise.resolve({ json: () => Promise.resolve(filterAubergine) });
      }
      if (url === 'https://www.themealdb.com/api/json/v1/1/filter.php?i=Apple Cider Vinegar') {
        return Promise.resolve({ json: () => Promise.resolve(filterAppleCiderVinegar) });
      }
    });
};

describe('Comidas test', () => {
  beforeEach(mockFetch);
  // const requestApiFoodListIngredients = jest.fn(() => Promise.resolve(ingredientes));
  it('have the heder', () => {
    const { getByTestId } = renderWithRouter(<ComidasPorIngredientes />);

    expect(getByTestId('header')).toBeInTheDocument();
  });

  it('have the footer', () => {
    const { getByTestId } = renderWithRouter(<ComidasPorIngredientes />);

    expect(getByTestId('footer')).toBeInTheDocument();
  });

  it('have the footer', async () => {
    const { getByText, getByTestId } = renderWithRouter(<ComidasPorIngredientes />);

    await waitForElement(() => getByText('Chicken'));

    expect(getByTestId('0-card-name').innerHTML).toEqual('Chicken');

    expect(getByTestId('0-card-img').src).toEqual('https://www.themealdb.com/images/ingredients/Chicken-Small.png');

    expect(getByTestId('1-card-name').innerHTML).toEqual('Salmon');

    expect(getByTestId('1-card-img').src).toEqual('https://www.themealdb.com/images/ingredients/Salmon-Small.png');
  });

  it('aqui o erro', async () => {
    const { getByText, history } = renderWithRouter(<ComidasPorIngredientes />);

    await waitForElement(() => getByText('Chicken'));

    fireEvent.click(getByText('Aubergine'));

    await waitForElement(() => expect(history.location.pathname).toEqual('/comidas'));

    expect(history.location.pathname).toEqual('/comidas');
  });
});
