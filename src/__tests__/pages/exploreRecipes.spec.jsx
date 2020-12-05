import React from 'react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { render, fireEvent, wait } from '@testing-library/react';

import ExploreRecipes from '../../pages/ExploreRecipes';
import AppProvider from '../../hooks';

import mockedFetch from '../../fakes/mocks_copy/fetch';
import fakeRandomMeal from '../../fakes/mocks_copy/oneMeal';
import fakeRandomDrink from '../../fakes/mocks_copy/oneDrink';

let screen;
let history;
let fakeFetch;

describe('explore recipes page structure testing', () => {
  beforeEach(async () => {
    fakeFetch = jest.spyOn(global, 'fetch').mockImplementation(mockedFetch);

    history = createMemoryHistory();

    await wait(() => {
      screen = render(
        <Router history={ history }>
          <AppProvider>
            <ExploreRecipes pageType="comidas" />
          </AppProvider>
        </Router>,
      );
    });
  });

  it('should have the correct header', () => {
    expect(screen.getByTestId('profile-top-btn')).toBeInTheDocument();

    const pageTitle = screen.getByTestId('page-title');
    expect(pageTitle).toBeInTheDocument();
    expect(pageTitle).toHaveTextContent('Explorar');

    expect(screen.queryByTestId('search-top-btn')).not.toBeInTheDocument();
  });

  it('should have the correct navBar', () => {
    expect(screen.getByTestId('drinks-bottom-btn')).toBeInTheDocument();
    expect(screen.getByTestId('food-bottom-btn')).toBeInTheDocument();
    expect(screen.getByTestId('explore-bottom-btn')).toBeInTheDocument();
  });

  it('should have the correct food navigation links', () => {
    const exploreIngredients = screen.getByTestId('explore-by-ingredient');
    const exploreIngredientsRef = '/explorar/comidas/ingredientes';
    const exploreArea = screen.getByTestId('explore-by-area');
    const exploreAreaRef = '/explorar/comidas/area';

    expect(exploreIngredients).toBeInTheDocument();
    expect(exploreIngredients).toHaveAttribute('href', exploreIngredientsRef);

    expect(exploreArea).toBeInTheDocument();
    expect(exploreArea).toHaveAttribute('href', exploreAreaRef);
  });

  it('should have a surprise button that redirects to random food recipe', async () => {
    const surpriseBtn = screen.getByTestId('explore-surprise');
    expect(surpriseBtn).toBeInTheDocument();

    fireEvent.click(surpriseBtn);

    const randomFoodUrl = 'https://www.themealdb.com/api/json/v1/1/random.php';
    await wait(() => expect(fakeFetch).toHaveBeenCalledWith(randomFoodUrl));

    const { idMeal } = fakeRandomMeal.meals[0];

    const { pathname } = history.location;
    const expectedPath = `/comidas/${idMeal}`;

    expect(pathname).toBe(expectedPath);
  });

  it('should have the correct drink navigation links', () => {
    screen.rerender(
      <Router history={ history }>
        <AppProvider>
          <ExploreRecipes pageType="bebidas" />
        </AppProvider>
      </Router>,
    );

    const exploreIngredients = screen.getByTestId('explore-by-ingredient');
    const exploreIngredientsRef = '/explorar/bebidas/ingredientes';
    const exploreArea = screen.queryByTestId('explore-by-area');

    expect(exploreIngredients).toBeInTheDocument();
    expect(exploreIngredients).toHaveAttribute('href', exploreIngredientsRef);

    expect(exploreArea).not.toBeInTheDocument();
  });

  it('should have a surprise button that redirects to random drink recipe', async () => {
    screen.rerender(
      <Router history={ history }>
        <AppProvider>
          <ExploreRecipes pageType="bebidas" />
        </AppProvider>
      </Router>,
    );

    const surpriseBtn = screen.getByTestId('explore-surprise');
    expect(surpriseBtn).toBeInTheDocument();

    fireEvent.click(surpriseBtn);

    const randomDrinkURL = 'https://www.thecocktaildb.com/api/json/v1/1/random.php';
    await wait(() => expect(fakeFetch).toHaveBeenCalledWith(randomDrinkURL));

    const { idDrink } = fakeRandomDrink.drinks[0];

    const { pathname } = history.location;
    const expectedPath = `/bebidas/${idDrink}`;

    expect(pathname).toBe(expectedPath);
  });
});
