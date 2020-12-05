import React from 'react';
import { Router, MemoryRouter } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { render,
  fireEvent,
  waitForElement,
  wait,
} from '@testing-library/react';

import RecipeDetails from '../../pages/Recipes';
import AppProvider from '../../hooks';

import mockedFetch from '../../fakes/mocks_copy/fetch';
import allDrinks from '../../fakes/mocks_copy/drinks';
import drinkCategories, {
  categoriesToRender,
} from '../../fakes/mocks_copy/drinkCategories';
import ordinaryDrinks from '../../fakes/mocks_copy/ordinaryDrinks';
import cocktailDrinks from '../../fakes/mocks_copy/cocktailDrinks';
import milkDrinks from '../../fakes/mocks_copy/milkDrinks';
import otherDrinks from '../../fakes/mocks_copy/otherDrinks';
import cocoaDrinks from '../../fakes/mocks_copy/cocoaDrinks';

const drinksByCategories = {
  0: ordinaryDrinks,
  1: cocktailDrinks,
  2: milkDrinks,
  3: otherDrinks,
  4: cocoaDrinks,
};

let screen;
let history;
let fakeFetch;

describe('foods page structure and logic testing', () => {
  beforeEach(async () => {
    fakeFetch = jest.spyOn(global, 'fetch').mockImplementation(mockedFetch);

    await wait(() => {
      screen = render(
        <MemoryRouter>
          <AppProvider>
            <RecipeDetails pageType="bebidas" />
          </AppProvider>
        </MemoryRouter>,
      );
    });

    await waitForElement(() => screen.getByTestId('0-recipe-card'));
  });

  it('should have the correct header', () => {
    expect(screen.getByTestId('profile-top-btn')).toBeInTheDocument();

    const pageTitle = screen.getByTestId('page-title');
    expect(pageTitle).toBeInTheDocument();
    expect(pageTitle).toHaveTextContent('Bebidas');

    expect(screen.queryByTestId('search-top-btn')).toBeInTheDocument();
  });

  it('should have the correct navBar', () => {
    expect(screen.getByTestId('drinks-bottom-btn')).toBeInTheDocument();
    expect(screen.getByTestId('food-bottom-btn')).toBeInTheDocument();
    expect(screen.getByTestId('explore-bottom-btn')).toBeInTheDocument();
  });

  it('should display the correct number and info of drinks on load', () => {
    expect(fakeFetch).toHaveBeenCalled();

    const { drinks: expectedDrinks } = allDrinks;

    expectedDrinks.forEach((recipe, index) => {
      const recipeCard = screen.queryByTestId(`${index}-recipe-card`);
      const recipeImg = screen.queryByTestId(`${index}-card-img`);
      const recipeName = screen.queryByTestId(`${index}-card-name`);

      const MAX_RECIPES_ALLOWED = 12;

      if (index < MAX_RECIPES_ALLOWED) {
        expect(recipeCard).toBeInTheDocument();
        const expectedLink = `/bebidas/${recipe.idDrink}`;
        expect(recipeCard).toHaveAttribute('href', expectedLink);

        expect(recipeImg).toBeInTheDocument();
        expect(recipeImg).toHaveAttribute('src', recipe.strDrinkThumb);

        expect(recipeName).toBeInTheDocument();
        expect(recipeName).toHaveTextContent(recipe.strDrink);
      } else {
        expect(recipeCard).not.toBeInTheDocument();
        expect(recipeImg).not.toBeInTheDocument();
        expect(recipeName).not.toBeInTheDocument();
      }
    });
  });

  it('should have an \'All\' filter + 5 only available categories', () => {
    expect(fakeFetch).toHaveBeenCalledWith('https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list');

    const allOptionFilter = screen.getByTestId('All-category-filter');
    expect(allOptionFilter).toBeInTheDocument();

    const { drinks: categoriesAvailable } = drinkCategories;

    categoriesAvailable.forEach((category, index) => {
      const categoryElement = screen.queryByTestId(
        `${category.strCategory}-category-filter`,
      );

      const CATEGORY_LIMIT = 5;

      if (index < CATEGORY_LIMIT) {
        expect(categoryElement).toBeInTheDocument();
      } else {
        expect(categoryElement).not.toBeInTheDocument();
      }
    });
  });

  it('should update current recipes when clicked on the Ordinary filter', async () => {
    const category = categoriesToRender[0];
    const categoryElement = screen.queryByTestId(`${category}-category-filter`);

    fireEvent.click(categoryElement);

    const correctURL = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${category}`;
    await wait(() => expect(fakeFetch).toHaveBeenCalledWith(correctURL));

    // we need to wait the old recipe to be removed

    const { drinks: desiredDrinks } = drinksByCategories[0];

    desiredDrinks.forEach((recipe, index) => {
      const recipeImg = screen.queryByTestId(`${index}-card-img`);
      const recipeName = screen.queryByTestId(`${index}-card-name`);

      const MAX_RECIPES_ALLOWED = 12;

      if (index < MAX_RECIPES_ALLOWED) {
        expect(recipeImg).toBeInTheDocument();
        expect(recipeImg).toHaveAttribute('src', recipe.strDrinkThumb);

        expect(recipeName).toBeInTheDocument();
        expect(recipeName).toHaveTextContent(recipe.strDrink);
      }
    });
  });

  it('should update current recipes when clicked on the CockTails filter', async () => {
    const category = categoriesToRender[1];
    const categoryElement = screen.queryByTestId(`${category}-category-filter`);

    fireEvent.click(categoryElement);

    const correctURL = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${category}`;
    await wait(() => expect(fakeFetch).toHaveBeenCalledWith(correctURL));

    // we need to wait the old recipe to be removed

    const { drinks: desiredDrinks } = drinksByCategories[1];

    desiredDrinks.forEach((recipe, index) => {
      const recipeImg = screen.queryByTestId(`${index}-card-img`);
      const recipeName = screen.queryByTestId(`${index}-card-name`);

      const MAX_RECIPES_ALLOWED = 12;

      if (index < MAX_RECIPES_ALLOWED) {
        expect(recipeImg).toBeInTheDocument();
        expect(recipeImg).toHaveAttribute('src', recipe.strDrinkThumb);

        expect(recipeName).toBeInTheDocument();
        expect(recipeName).toHaveTextContent(recipe.strDrink);
      }
    });
  });

  it('should update current recipes when clicked on the Milk filter', async () => {
    const category = categoriesToRender[2];
    const categoryElement = screen.queryByTestId(`${category}-category-filter`);

    fireEvent.click(categoryElement);

    const correctURL = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${category}`;
    await wait(() => expect(fakeFetch).toHaveBeenCalledWith(correctURL));

    // we need to wait the old recipe to be removed

    const { drinks: desiredDrinks } = drinksByCategories[2];

    desiredDrinks.forEach((recipe, index) => {
      const recipeImg = screen.queryByTestId(`${index}-card-img`);
      const recipeName = screen.queryByTestId(`${index}-card-name`);

      const MAX_RECIPES_ALLOWED = 12;

      if (index < MAX_RECIPES_ALLOWED) {
        expect(recipeImg).toBeInTheDocument();
        expect(recipeImg).toHaveAttribute('src', recipe.strDrinkThumb);

        expect(recipeName).toBeInTheDocument();
        expect(recipeName).toHaveTextContent(recipe.strDrink);
      }
    });
  });

  it('should update current recipes when clicked on the Other filter', async () => {
    const category = categoriesToRender[3];
    const categoryElement = screen.queryByTestId(`${category}-category-filter`);

    fireEvent.click(categoryElement);

    const correctURL = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${category}`;
    await wait(() => expect(fakeFetch).toHaveBeenCalledWith(correctURL));

    // we need to wait the old recipe to be removed

    const { drinks: desiredDrinks } = drinksByCategories[3];

    desiredDrinks.forEach((recipe, index) => {
      const recipeImg = screen.queryByTestId(`${index}-card-img`);
      const recipeName = screen.queryByTestId(`${index}-card-name`);

      const MAX_RECIPES_ALLOWED = 12;

      if (index < MAX_RECIPES_ALLOWED) {
        expect(recipeImg).toBeInTheDocument();
        expect(recipeImg).toHaveAttribute('src', recipe.strDrinkThumb);

        expect(recipeName).toBeInTheDocument();
        expect(recipeName).toHaveTextContent(recipe.strDrink);
      }
    });
  });

  it('should update current recipes when clicked on the Cocoa filter', async () => {
    const category = categoriesToRender[4];
    const categoryElement = screen.queryByTestId(`${category}-category-filter`);

    fireEvent.click(categoryElement);

    const correctURL = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${category}`;
    await wait(() => expect(fakeFetch).toHaveBeenCalledWith(correctURL));

    // we need to wait the old recipe to be removed

    const { drinks: desiredDrinks } = drinksByCategories[4];

    desiredDrinks.forEach((recipe, index) => {
      const recipeImg = screen.queryByTestId(`${index}-card-img`);
      const recipeName = screen.queryByTestId(`${index}-card-name`);

      const MAX_RECIPES_ALLOWED = 12;

      if (index < MAX_RECIPES_ALLOWED) {
        expect(recipeImg).toBeInTheDocument();
        expect(recipeImg).toHaveAttribute('src', recipe.strDrinkThumb);

        expect(recipeName).toBeInTheDocument();
        expect(recipeName).toHaveTextContent(recipe.strDrink);
      }
    });
  });

  it('should remove filter when clicked on filter again', async () => {
    const categoryElement = screen.queryByTestId('Cocoa-category-filter');

    fireEvent.click(categoryElement); // it works, as we have a test for this above

    const filterURL = 'https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=Cocoa';
    await wait(() => expect(fakeFetch).toHaveBeenCalledWith(filterURL));

    fireEvent.click(categoryElement); // should reset meals to inital default

    const allUrl = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
    await wait(() => expect(fakeFetch).toHaveBeenCalledWith(allUrl));

    const { drinks: expectedDrinks } = allDrinks;

    expectedDrinks.forEach((recipe, index) => {
      const recipeCard = screen.queryByTestId(`${index}-recipe-card`);
      const recipeImg = screen.queryByTestId(`${index}-card-img`);
      const recipeName = screen.queryByTestId(`${index}-card-name`);

      const MAX_RECIPES_ALLOWED = 12;

      if (index < MAX_RECIPES_ALLOWED) {
        expect(recipeCard).toBeInTheDocument();
        const expectedLink = `/bebidas/${recipe.idDrink}`;
        expect(recipeCard).toHaveAttribute('href', expectedLink);

        expect(recipeImg).toBeInTheDocument();
        expect(recipeImg).toHaveAttribute('src', recipe.strDrinkThumb);

        expect(recipeName).toBeInTheDocument();
        expect(recipeName).toHaveTextContent(recipe.strDrink);
      }
    });
  });
});

describe('food details navigation', () => {
  it('should navigate to details page when clicked on recipe link', async () => {
    fakeFetch = jest.spyOn(global, 'fetch').mockImplementation(mockedFetch);

    const initialPath = '/bebidas';

    history = createMemoryHistory({
      initialEntries: [initialPath],
    });

    await wait(() => {
      screen = render(
        <Router history={ history }>
          <AppProvider>
            <RecipeDetails pageType="bebidas" />
          </AppProvider>
        </Router>,
      );
    });

    await waitForElement(() => screen.getByTestId('0-recipe-card'));

    const { drinks: expectedDrinks } = allDrinks;

    expectedDrinks.forEach(async (recipe, index) => {
      const recipeCard = screen.queryByTestId(`${index}-recipe-card`);
      const MAX_RECIPES_ALLOWED = 12;

      if (index < MAX_RECIPES_ALLOWED) {
        fireEvent.click(recipeCard);

        const { pathname } = history.location;
        const expectedPath = `/bebidas/${recipe.idDrink}`;
        expect(pathname).toBe(expectedPath);

        history.push('/bebidas');
      }
    });
  });
});
