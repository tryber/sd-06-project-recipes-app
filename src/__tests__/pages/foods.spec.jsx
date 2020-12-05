import React from 'react';
import { Router, MemoryRouter } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { render,
  fireEvent,
  waitForElement,
  wait,
} from '@testing-library/react';

import Recipes from '../../pages/Recipes';
import AppProvider from '../../hooks';

import mockedFetch from '../../fakes/mocks_copy/fetch';
import allAreasMeals from '../../fakes/mocks_copy/meals';
import mealCategories, {
  categoriesToRender,
} from '../../fakes/mocks_copy/mealCategories';
import beefMeals from '../../fakes/mocks_copy/beefMeals';
import breakfastMeals from '../../fakes/mocks_copy/breakfastMeals';
import chickenMeals from '../../fakes/mocks_copy/chickenMeals';
import dessertMeals from '../../fakes/mocks_copy/dessertMeals';
import goatMeals from '../../fakes/mocks_copy/goatMeals';

const mealsByCategory = {
  Beef: beefMeals,
  Breakfast: breakfastMeals,
  Chicken: chickenMeals,
  Dessert: dessertMeals,
  Goat: goatMeals,
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
            <Recipes pageType="comidas" />
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
    expect(pageTitle).toHaveTextContent('Comidas');

    expect(screen.queryByTestId('search-top-btn')).toBeInTheDocument();
  });

  it('should have the correct navBar', () => {
    expect(screen.getByTestId('drinks-bottom-btn')).toBeInTheDocument();
    expect(screen.getByTestId('food-bottom-btn')).toBeInTheDocument();
    expect(screen.getByTestId('explore-bottom-btn')).toBeInTheDocument();
  });

  it('should display the correct number and info of foods on load', () => {
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

  it('should have an \'All\' filter + 5 only available categories', () => {
    expect(fakeFetch).toHaveBeenCalledWith('https://www.themealdb.com/api/json/v1/1/list.php?c=list');

    const allOptionFilter = screen.getByTestId('All-category-filter');
    expect(allOptionFilter).toBeInTheDocument();

    const { meals: categoriesAvailable } = mealCategories;

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

  it('should update current recipes when clicked on the Beef filter', async () => {
    const category = categoriesToRender[0];
    const categoryElement = screen.queryByTestId(`${category}-category-filter`);

    fireEvent.click(categoryElement);

    const correctURL = `https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`;
    await wait(() => expect(fakeFetch).toHaveBeenCalledWith(correctURL));

    // we need to wait the old recipe to be removed

    const { meals: desiredMeals } = mealsByCategory[category];

    desiredMeals.forEach((recipe, index) => {
      const recipeImg = screen.queryByTestId(`${index}-card-img`);
      const recipeName = screen.queryByTestId(`${index}-card-name`);

      const MAX_RECIPES_ALLOWED = 12;

      if (index < MAX_RECIPES_ALLOWED) {
        expect(recipeImg).toBeInTheDocument();
        expect(recipeImg).toHaveAttribute('src', recipe.strMealThumb);

        expect(recipeName).toBeInTheDocument();
        expect(recipeName).toHaveTextContent(recipe.strMeal);
      }
    });
  });

  it('should update current recipes when clicked on the Breakfast filter', async () => {
    const category = categoriesToRender[1];
    const categoryElement = screen.queryByTestId(`${category}-category-filter`);

    fireEvent.click(categoryElement);

    const correctURL = `https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`;
    await wait(() => expect(fakeFetch).toHaveBeenCalledWith(correctURL));

    // we need to wait the old recipe to be removed

    const { meals: desiredMeals } = mealsByCategory[category];

    desiredMeals.forEach((recipe, index) => {
      const recipeImg = screen.queryByTestId(`${index}-card-img`);
      const recipeName = screen.queryByTestId(`${index}-card-name`);

      const MAX_RECIPES_ALLOWED = 12;

      if (index < MAX_RECIPES_ALLOWED) {
        expect(recipeImg).toBeInTheDocument();
        expect(recipeImg).toHaveAttribute('src', recipe.strMealThumb);

        expect(recipeName).toBeInTheDocument();
        expect(recipeName).toHaveTextContent(recipe.strMeal);
      }
    });
  });

  it('should update current recipes when clicked on the Chicken filter', async () => {
    const category = categoriesToRender[2];
    const categoryElement = screen.queryByTestId(`${category}-category-filter`);

    fireEvent.click(categoryElement);

    const correctURL = `https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`;
    await wait(() => expect(fakeFetch).toHaveBeenCalledWith(correctURL));

    // we need to wait the old recipe to be removed

    const { meals: desiredMeals } = mealsByCategory[category];

    desiredMeals.forEach((recipe, index) => {
      const recipeImg = screen.queryByTestId(`${index}-card-img`);
      const recipeName = screen.queryByTestId(`${index}-card-name`);

      const MAX_RECIPES_ALLOWED = 12;

      if (index < MAX_RECIPES_ALLOWED) {
        expect(recipeImg).toBeInTheDocument();
        expect(recipeImg).toHaveAttribute('src', recipe.strMealThumb);

        expect(recipeName).toBeInTheDocument();
        expect(recipeName).toHaveTextContent(recipe.strMeal);
      }
    });
  });

  it('should update current recipes when clicked on the Dessert filter', async () => {
    const category = categoriesToRender[3];
    const categoryElement = screen.queryByTestId(`${category}-category-filter`);

    fireEvent.click(categoryElement);

    const correctURL = `https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`;
    await wait(() => expect(fakeFetch).toHaveBeenCalledWith(correctURL));

    // we need to wait the old recipe to be removed

    const { meals: desiredMeals } = mealsByCategory[category];

    desiredMeals.forEach((recipe, index) => {
      const recipeImg = screen.queryByTestId(`${index}-card-img`);
      const recipeName = screen.queryByTestId(`${index}-card-name`);

      const MAX_RECIPES_ALLOWED = 12;

      if (index < MAX_RECIPES_ALLOWED) {
        expect(recipeImg).toBeInTheDocument();
        expect(recipeImg).toHaveAttribute('src', recipe.strMealThumb);

        expect(recipeName).toBeInTheDocument();
        expect(recipeName).toHaveTextContent(recipe.strMeal);
      }
    });
  });

  it('should update current recipes when clicked on the Goat filter', async () => {
    const category = categoriesToRender[4];
    const categoryElement = screen.queryByTestId(`${category}-category-filter`);

    fireEvent.click(categoryElement);

    const correctURL = `https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`;
    await wait(() => expect(fakeFetch).toHaveBeenCalledWith(correctURL));

    // we need to wait the old recipe to be removed

    const { meals: desiredMeals } = mealsByCategory[category];

    desiredMeals.forEach((recipe, index) => {
      const recipeImg = screen.queryByTestId(`${index}-card-img`);
      const recipeName = screen.queryByTestId(`${index}-card-name`);

      const MAX_RECIPES_ALLOWED = 12;

      if (index < MAX_RECIPES_ALLOWED) {
        expect(recipeImg).toBeInTheDocument();
        expect(recipeImg).toHaveAttribute('src', recipe.strMealThumb);

        expect(recipeName).toBeInTheDocument();
        expect(recipeName).toHaveTextContent(recipe.strMeal);
      }
    });
  });

  it('should remove filter when clicked on filter again', async () => {
    const categoryElement = screen.queryByTestId('Breakfast-category-filter');

    fireEvent.click(categoryElement); // it works, as we have a test for this above

    const filterURL = 'https://www.themealdb.com/api/json/v1/1/filter.php?c=Breakfast';
    await wait(() => expect(fakeFetch).toHaveBeenCalledWith(filterURL));

    fireEvent.click(categoryElement); // should reset meals to inital default

    const allUrl = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
    await wait(() => expect(fakeFetch).toHaveBeenCalledWith(allUrl));

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
      }
    });
  });
});

describe('food details navigation', () => {
  it('should navigate to details page when clicked on recipe link', async () => {
    fakeFetch = jest.spyOn(global, 'fetch').mockImplementation(mockedFetch);

    const initialPath = '/comidas';

    history = createMemoryHistory({
      initialEntries: [initialPath],
    });

    await wait(() => {
      screen = render(
        <Router history={ history }>
          <AppProvider>
            <Recipes pageType="comidas" />
          </AppProvider>
        </Router>,
      );
    });

    await waitForElement(() => screen.getByTestId('0-recipe-card'));

    const { meals: expectedMeals } = allAreasMeals;

    expectedMeals.forEach(async (recipe, index) => {
      const recipeCard = screen.queryByTestId(`${index}-recipe-card`);
      const MAX_RECIPES_ALLOWED = 12;

      if (index < MAX_RECIPES_ALLOWED) {
        fireEvent.click(recipeCard);

        const { pathname } = history.location;
        const expectedPath = `/comidas/${recipe.idMeal}`;
        expect(pathname).toBe(expectedPath);

        history.push('/comidas');
      }
    });
  });
});
