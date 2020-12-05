import React from 'react';
import { Router, MemoryRouter, Route } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { render,
  fireEvent,
  waitForElement,
} from '@testing-library/react';

import ExploreArea from '../../pages/ExploreArea';
import AppProvider from '../../hooks';

import mockedFetch from '../../fakes/mocks_copy/fetch';
import japaneseMeals from '../../fakes/mocks_copy/japaneseMeals';
import italianMeals from '../../fakes/mocks_copy/italianMeals';
import areas from '../../fakes/mocks_copy/areas';
import allAreasMeals from '../../fakes/mocks_copy/meals';

let screen;
let history;
let fakeFetch;

describe('food by area page structure testing', () => {
  beforeEach(async () => {
    fakeFetch = jest.spyOn(global, 'fetch').mockImplementation(mockedFetch);

    screen = render(
      <MemoryRouter>
        <AppProvider>
          <ExploreArea pageType="comidas" />
        </AppProvider>
      </MemoryRouter>,
    );

    await waitForElement(() => screen.getByTestId('0-recipe-card'));
  });

  it('should have the correct header', () => {
    expect(screen.getByTestId('profile-top-btn')).toBeInTheDocument();

    const pageTitle = screen.getByTestId('page-title');
    expect(pageTitle).toBeInTheDocument();
    expect(pageTitle).toHaveTextContent('Explorar Origem');

    expect(screen.queryByTestId('search-top-btn')).toBeInTheDocument();
  });

  it('should have the correct navBar', () => {
    expect(screen.getByTestId('drinks-bottom-btn')).toBeInTheDocument();
    expect(screen.getByTestId('food-bottom-btn')).toBeInTheDocument();
    expect(screen.getByTestId('explore-bottom-btn')).toBeInTheDocument();
  });
});

describe('explore by area specifications', () => {
  beforeEach(async () => {
    fakeFetch = jest.spyOn(global, 'fetch').mockImplementation(mockedFetch);

    screen = render(
      <MemoryRouter>
        <AppProvider>
          <ExploreArea pageType="comidas" />
        </AppProvider>
      </MemoryRouter>,
    );

    await waitForElement(() => screen.getByTestId('0-recipe-card'));
  });

  it('should load on all areas meals, having 12 max recipes and correctly linked', () => {
    expect(fakeFetch).toHaveBeenCalled();

    const { meals: expectedMeals } = allAreasMeals;

    expectedMeals.forEach((recipe, index) => {
      const recipeCard = screen.queryByTestId(`${index}-recipe-card`);
      const recipeImg = screen.queryByTestId(`${index}-card-img`);
      const recipeName = screen.queryByTestId(`${index}-card-name`);

      const MAX_RECIPES_ALLOWED = 12;

      if (index < MAX_RECIPES_ALLOWED) {
        expect(recipeCard).toBeInTheDocument();
        const expectedLink = `/comidas/${recipe.idMeal}`;
        expect(recipeCard).toHaveAttribute('href', expectedLink);

        expect(recipeImg).toBeInTheDocument();
        expect(recipeImg).toHaveAttribute('src', recipe.strMealThumb);

        expect(recipeName).toBeInTheDocument();
        expect(recipeName).toHaveTextContent(recipe.strMeal);
      } else {
        expect(recipeCard).not.toBeInTheDocument();
        expect(recipeImg).not.toBeInTheDocument();
        expect(recipeName).not.toBeInTheDocument();
      }
    });
  });

  it('should have an \'All\' filter + every area available inside select element', () => {
    expect(fakeFetch).toHaveBeenCalledWith('https://www.themealdb.com/api/json/v1/1/list.php?a=list');

    const selectAreas = screen.getByTestId('explore-by-area-dropdown');
    expect(selectAreas).toBeInTheDocument();
    expect(selectAreas.tagName).toBe('SELECT');

    const allOptionFilter = screen.getByTestId('All-option');
    expect(allOptionFilter).toBeInTheDocument();
    expect(allOptionFilter.tagName).toBe('OPTION');

    const { meals: areasAvailable } = areas;

    areasAvailable.forEach((area) => {
      const areaOption = screen.getByTestId(`${area.strArea}-option`);

      expect(areaOption).toBeInTheDocument();
      expect(areaOption.tagName).toBe('OPTION');
      expect(areaOption).toHaveTextContent(area.strArea);
    });
  });

  it('should filter recipes accordingly to filter selected', async () => {
    const selectAreas = screen.getByTestId('explore-by-area-dropdown');

    const areaToFilter1 = 'Italian';
    const areaToFilter2 = 'Japanese';

    fireEvent.change(selectAreas, { target: { value: areaToFilter1 } });

    await waitForElement(() => screen.getByTestId('0-recipe-card'));

    const italianMealsUrl = 'https://www.themealdb.com/api/json/v1/1/filter.php?a=Italian';
    expect(fakeFetch).toHaveBeenCalledWith(italianMealsUrl);

    const { meals: italian } = italianMeals;

    italian.forEach((recipe, index) => {
      const recipeCard = screen.queryByTestId(`${index}-recipe-card`);
      const recipeImg = screen.queryByTestId(`${index}-card-img`);
      const recipeName = screen.queryByTestId(`${index}-card-name`);

      const MAX_RECIPES_ALLOWED = 12;

      if (index < MAX_RECIPES_ALLOWED) {
        expect(recipeCard).toBeInTheDocument();
        const expectedLink = `/comidas/${recipe.idMeal}`;
        expect(recipeCard).toHaveAttribute('href', expectedLink);

        expect(recipeImg).toBeInTheDocument();
        expect(recipeImg).toHaveAttribute('src', recipe.strMealThumb);

        expect(recipeName).toBeInTheDocument();
        expect(recipeName).toHaveTextContent(recipe.strMeal);
      } else {
        expect(recipeCard).not.toBeInTheDocument();
        expect(recipeImg).not.toBeInTheDocument();
        expect(recipeName).not.toBeInTheDocument();
      }
    });

    fireEvent.change(selectAreas, { target: { value: areaToFilter2 } });

    await waitForElement(() => screen.getByTestId('0-recipe-card'));

    const japaneseMealsUrl = 'https://www.themealdb.com/api/json/v1/1/filter.php?a=Japanese';
    expect(fakeFetch).toHaveBeenCalledWith(japaneseMealsUrl);

    const { meals: japanese } = japaneseMeals;

    japanese.forEach((recipe, index) => {
      const recipeCard = screen.queryByTestId(`${index}-recipe-card`);
      const recipeImg = screen.queryByTestId(`${index}-card-img`);
      const recipeName = screen.queryByTestId(`${index}-card-name`);

      const MAX_RECIPES_ALLOWED = 12;

      if (index < MAX_RECIPES_ALLOWED) {
        expect(recipeCard).toBeInTheDocument();
        const expectedLink = `/comidas/${recipe.idMeal}`;
        expect(recipeCard).toHaveAttribute('href', expectedLink);

        expect(recipeImg).toBeInTheDocument();
        expect(recipeImg).toHaveAttribute('src', recipe.strMealThumb);

        expect(recipeName).toBeInTheDocument();
        expect(recipeName).toHaveTextContent(recipe.strMeal);
      } else {
        expect(recipeCard).not.toBeInTheDocument();
        expect(recipeImg).not.toBeInTheDocument();
        expect(recipeName).not.toBeInTheDocument();
      }
    });
  });
});

describe('food details navigation', () => {
  it('should navigate to details page when clicked on start button', async () => {
    fakeFetch = jest.spyOn(global, 'fetch').mockImplementation(mockedFetch);

    const routePath = '/explorar/comidas/area';

    history = createMemoryHistory({
      initialEntries: [routePath],
    });

    screen = render(
      <Router history={ history }>
        <AppProvider>
          <Route
            path="/explorar/comidas/area"
            render={ () => <ExploreArea pageType="comidas" /> }
          />

        </AppProvider>
      </Router>,
    );

    const { meals: expectedMeals } = allAreasMeals;

    expectedMeals.forEach(async (recipe, index) => {
      await waitForElement(() => screen.getByTestId(`${index}-recipe-card`));

      const recipeCard = screen.queryByTestId(`${index}-recipe-card`);
      const MAX_RECIPES_ALLOWED = 12;

      if (index < MAX_RECIPES_ALLOWED) {
        fireEvent.click(recipeCard);

        const { pathname } = history.location;
        const expectedPath = `/comidas/${recipe.idMeal}`;
        expect(pathname).toBe(expectedPath);

        history.push('/explorar/comidas/area');
      }
    });
  });
});
