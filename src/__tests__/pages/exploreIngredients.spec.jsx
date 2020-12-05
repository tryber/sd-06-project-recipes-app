import React from 'react';
import { Router, MemoryRouter, Route } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { render,
  fireEvent,
  waitForElement,
} from '@testing-library/react';

import ExploreIngredients from '../../pages/ExploreIngredients';
import App from '../../App';
import AppProvider from '../../hooks';

import mockedFetch from '../../fakes/mocks_copy/fetch';
import mealIngredients from '../../fakes/mocks_copy/mealIngredients';
import drinkIngredients from '../../fakes/mocks_copy/drinkIngredients';

let screen;
let history;
let fakeFetch;

describe('explore ingredients page structure testing', () => {
  beforeEach(async () => {
    fakeFetch = jest.spyOn(global, 'fetch').mockImplementation(mockedFetch);

    screen = render(
      <MemoryRouter>
        <AppProvider>
          <ExploreIngredients pageType="comidas" />
        </AppProvider>
      </MemoryRouter>,
    );

    await waitForElement(() => screen.getByTestId('0-ingredient-card'));
  });

  it('should have the correct header', () => {
    expect(screen.getByTestId('profile-top-btn')).toBeInTheDocument();

    const pageTitle = screen.getByTestId('page-title');
    expect(pageTitle).toBeInTheDocument();
    expect(pageTitle).toHaveTextContent('Explorar Ingredientes');

    expect(screen.queryByTestId('search-top-btn')).not.toBeInTheDocument();
  });

  it('should have the correct navBar', () => {
    expect(screen.getByTestId('drinks-bottom-btn')).toBeInTheDocument();
    expect(screen.getByTestId('food-bottom-btn')).toBeInTheDocument();
    expect(screen.getByTestId('explore-bottom-btn')).toBeInTheDocument();
  });
});

describe('explore by food ingredients specifications', () => {
  beforeEach(async () => {
    fakeFetch = jest.spyOn(global, 'fetch').mockImplementation(mockedFetch);
    const routePath = '/explorar/comidas/ingredientes';

    history = createMemoryHistory({
      initialEntries: [routePath],
    });

    screen = render(
      <Router history={ history }>
        <AppProvider>
          <Route
            path={ routePath }
            exact
            render={ () => <ExploreIngredients pageType="comidas" /> }
          />
        </AppProvider>
      </Router>,
    );

    await waitForElement(() => screen.getByTestId('0-ingredient-card'));
  });

  it('should load on all food ingredients, capped at 12max and correctly linked', () => {
    expect(fakeFetch).toHaveBeenCalledWith('https://www.themealdb.com/api/json/v1/1/list.php?i=list');

    const { meals: expectedIngredients } = mealIngredients;

    expectedIngredients.forEach(({ strIngredient }, index) => {
      const ingredientCard = screen.queryByTestId(`${index}-ingredient-card`);
      const ingredientImg = screen.queryByTestId(`${index}-card-img`);
      const ingredientName = screen.queryByTestId(`${index}-card-name`);

      const MAX_INGREDIENTS_ALLOWED = 12;

      if (index < MAX_INGREDIENTS_ALLOWED) {
        expect(ingredientCard).toBeInTheDocument();
        const expectedLink = '/comidas';
        expect(ingredientCard).toHaveAttribute('href', expectedLink);

        expect(ingredientImg).toBeInTheDocument();
        const expectedImgUrl = `https://www.themealdb.com/images/ingredients/${strIngredient}-Small.png`;
        expect(ingredientImg).toHaveAttribute('src', expectedImgUrl);

        expect(ingredientName).toBeInTheDocument();
        expect(ingredientName).toHaveTextContent(strIngredient);
      } else {
        expect(ingredientCard).not.toBeInTheDocument();
        expect(ingredientImg).not.toBeInTheDocument();
        expect(ingredientName).not.toBeInTheDocument();
      }
    });
  });

  it('navigates to main searching for foods with the ingredient on click', () => {
    const ingredientCard = screen.queryByTestId('0-ingredient-card');
    fireEvent.click(ingredientCard);

    const { pathname } = history.location;
    const expectedPath = '/comidas';
    expect(pathname).toBe(expectedPath);
  });
});

describe('explore by drink ingredients specifications', () => {
  beforeEach(async () => {
    fakeFetch = jest.spyOn(global, 'fetch').mockImplementation(mockedFetch);
    const routePath = '/explorar/bebidas/ingredientes';

    history = createMemoryHistory({
      initialEntries: [routePath],
    });

    screen = render(
      <Router history={ history }>
        <AppProvider>
          <Route
            path={ routePath }
            exact
            render={ () => <ExploreIngredients pageType="bebidas" /> }
          />
        </AppProvider>
      </Router>,
    );

    await waitForElement(() => screen.getByTestId('0-ingredient-card'));
  });

  it('should load on all drink ingredients, capped at 12max and correctly linked', () => {
    expect(fakeFetch).toHaveBeenCalledWith('https://www.themealdb.com/api/json/v1/1/list.php?i=list');

    const { drinks: expectedIngredients } = drinkIngredients;

    expectedIngredients.forEach(({ strIngredient1 }, index) => {
      const ingredientCard = screen.queryByTestId(`${index}-ingredient-card`);
      const ingredientImg = screen.queryByTestId(`${index}-card-img`);
      const ingredientName = screen.queryByTestId(`${index}-card-name`);

      const MAX_INGREDIENTS_ALLOWED = 12;

      if (index < MAX_INGREDIENTS_ALLOWED) {
        expect(ingredientCard).toBeInTheDocument();
        const expectedLink = '/bebidas';
        expect(ingredientCard).toHaveAttribute('href', expectedLink);

        expect(ingredientImg).toBeInTheDocument();
        const expectedImgUrl = `https://www.thecocktaildb.com/images/ingredients/${strIngredient1}-Small.png`;
        expect(ingredientImg).toHaveAttribute('src', expectedImgUrl);

        expect(ingredientName).toBeInTheDocument();
        expect(ingredientName).toHaveTextContent(strIngredient1);
      } else {
        expect(ingredientCard).not.toBeInTheDocument();
        expect(ingredientImg).not.toBeInTheDocument();
        expect(ingredientName).not.toBeInTheDocument();
      }
    });
  });

  it('navigates to main searching for drinks with the ingredient on click', () => {
    const ingredientCard = screen.queryByTestId('0-ingredient-card');
    fireEvent.click(ingredientCard);

    const { pathname } = history.location;
    const expectedPath = '/bebidas';
    expect(pathname).toBe(expectedPath);
  });
});

describe('app navigation by food ingredients', () => {
  it('should load recipes by food ingredient', async () => {
    fakeFetch = jest.spyOn(global, 'fetch').mockImplementation(mockedFetch);

    screen = render(
      <App />,
    );

    const validEmail = 'fabio@email.com';
    const validPw = 'fabio123456';

    const emailInput = screen.getByTestId('email-input');
    const passwordInput = screen.getByTestId('password-input');

    fireEvent.change(emailInput, { target: { value: validEmail } });
    fireEvent.change(passwordInput, { target: { value: validPw } });

    const loginBtn = screen.getByTestId('login-submit-btn');

    fireEvent.click(loginBtn);

    await waitForElement(() => screen.getByTestId('0-recipe-card'));

    fireEvent.click(screen.getByTestId('explore-bottom-btn'));
    fireEvent.click(screen.getByTestId('explore-food'));
    fireEvent.click(screen.getByTestId('explore-by-ingredient'));

    await waitForElement(() => screen.getByTestId('0-ingredient-card'));

    const { meals: ingredients } = mealIngredients;
    const toSearchIndex = 0;
    const mockedIngredient = ingredients[toSearchIndex].strIngredient;

    fireEvent.click(screen.getByTestId(`${toSearchIndex}-ingredient-card`));

    await waitForElement(() => screen.getByTestId('0-recipe-card'));

    const urlDesired = `https://www.themealdb.com/api/json/v1/1/filter.php?i=${mockedIngredient}`;
    expect(fakeFetch).toHaveBeenCalledWith(urlDesired);

    fireEvent.click(screen.getByTestId('profile-top-btn'));
    fireEvent.click(screen.getByTestId('profile-logout-btn'));
  });
});

describe('app navigation by drink ingredients', () => {
  it('should load drinks by ingredients', async () => {
    fakeFetch = jest.spyOn(global, 'fetch').mockImplementation(mockedFetch);

    screen = render(
      <App />,
    );

    const validEmail = 'fabio@email.com';
    const validPw = 'fabio123456';

    const emailInput = screen.getByTestId('email-input');
    const passwordInput = screen.getByTestId('password-input');

    fireEvent.change(emailInput, { target: { value: validEmail } });
    fireEvent.change(passwordInput, { target: { value: validPw } });

    const loginBtn = screen.getByTestId('login-submit-btn');

    fireEvent.click(loginBtn);

    await waitForElement(() => screen.getByTestId('0-recipe-card'));

    fireEvent.click(screen.getByTestId('explore-bottom-btn'));
    fireEvent.click(screen.getByTestId('explore-drinks'));
    fireEvent.click(screen.getByTestId('explore-by-ingredient'));

    await waitForElement(() => screen.getByTestId('0-ingredient-card'));

    const { drinks: ingredients } = drinkIngredients;
    const toSearchIndex = 0;
    const mockedIngredient = ingredients[toSearchIndex].strIngredient1;

    fireEvent.click(screen.getByTestId(`${toSearchIndex}-ingredient-card`));

    await waitForElement(() => screen.getByTestId('0-recipe-card'));

    const urlDesired = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${mockedIngredient}`;
    expect(fakeFetch).toHaveBeenCalledWith(urlDesired);
  });
});
