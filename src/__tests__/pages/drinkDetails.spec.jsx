import React from 'react';
import { Router, Route } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { render, fireEvent, waitForElement } from '@testing-library/react';

import RecipeDetails from '../../pages/RecipeDetails';
import AppProvider from '../../hooks';

import LocalStorageFake from '../../fakes/localStorage';
import mockedFetch from '../../fakes/mocks_copy/fetch';
import oneDrink, { mealIngredientsAndMeasure } from '../../fakes/mocks_copy/oneDrink';
import meals from '../../fakes/mocks_copy/meals';

let screen;
let localStorageFake;
let history;
let fakeFetch;
const drinkRendered = oneDrink.drinks[0];
const recommendationMeals = meals.meals;

describe('food details page structure testing', () => {
  beforeEach(async () => {
    fakeFetch = jest.spyOn(global, 'fetch').mockImplementation(mockedFetch);

    const mealPath = `/bebidas/${drinkRendered.idDrink}`;

    history = createMemoryHistory({
      initialEntries: [mealPath],
    });

    screen = render(
      <Router history={ history }>
        <AppProvider>
          <Route
            path="/bebidas/:id"
            render={ () => <RecipeDetails pageType="bebidas" /> }
          />
        </AppProvider>
      </Router>,
    );

    await waitForElement(() => screen.getByTestId('recipe-title'));
  });

  it('should not have the header', () => {
    expect(screen.queryByTestId('profile-top-btn')).not.toBeInTheDocument();

    const pageTitle = screen.queryByTestId('page-title');
    expect(pageTitle).not.toBeInTheDocument();

    expect(screen.queryByTestId('search-top-btn')).not.toBeInTheDocument();
  });

  it('should NOT have the navBar', () => {
    expect(screen.queryByTestId('drinks-bottom-btn')).not.toBeInTheDocument();
    expect(screen.queryByTestId('food-bottom-btn')).not.toBeInTheDocument();
    expect(screen.queryByTestId('explore-bottom-btn')).not.toBeInTheDocument();
  });
});

describe('food details logic testing', () => {
  beforeEach(async () => {
    localStorageFake = new LocalStorageFake();

    Object.defineProperty(global, 'localStorage', {
      value: localStorageFake,
      writable: true,
    });

    jest.spyOn(JSON, 'parse').mockImplementation((value) => value);
    jest.spyOn(JSON, 'stringify').mockImplementation((value) => value);

    fakeFetch = jest.spyOn(global, 'fetch').mockImplementation(mockedFetch);

    const mealPath = `/bebidas/${drinkRendered.idDrink}`;

    history = createMemoryHistory({
      initialEntries: [mealPath],
    });

    screen = render(
      <Router history={ history }>
        <AppProvider>
          <Route
            path="/bebidas/:id"
            render={ () => <RecipeDetails pageType="bebidas" /> }
          />
        </AppProvider>
      </Router>,
    );

    await waitForElement(() => screen.getByTestId('recipe-title'));
  });

  it('should list all required food info on screen', () => {
    expect(fakeFetch).toHaveBeenCalled();

    const recipeImg = screen.getByTestId('recipe-photo');
    expect(recipeImg).toBeInTheDocument();
    expect(recipeImg).toHaveAttribute('src', drinkRendered.strDrinkThumb);

    const recipeName = screen.getByTestId('recipe-title');
    expect(recipeName).toBeInTheDocument();
    expect(recipeName).toHaveTextContent(drinkRendered.strDrink);

    expect(screen.getByTestId('share-btn')).toBeInTheDocument();

    expect(screen.getByTestId('favorite-btn')).toBeInTheDocument();

    mealIngredientsAndMeasure.forEach((ingredient, index) => {
      const ingredientAndMeasure = screen.getByTestId(
        `${index}-ingredient-name-and-measure`,
      );

      expect(ingredientAndMeasure).toHaveTextContent(ingredient);
    });

    const recipeInstructions = screen.getByTestId('instructions');
    expect(recipeInstructions).toBeInTheDocument();
  });

  it('should list 6 drinks recommendations', () => {
    recommendationMeals.forEach((meal, index) => {
      const mealCard = screen.queryByTestId(`${index}-recomendation-card`);
      const mealImg = screen.queryByTestId(`${index}-recomendation-image`);
      const mealName = screen.queryByTestId(`${index}-recomendation-title`);

      const cutOffIndex = 6;

      if (index < cutOffIndex) {
        expect(mealCard).toBeInTheDocument();

        expect(mealImg).toBeInTheDocument();
        expect(mealImg).toHaveAttribute('src', meal.strMealThumb);

        expect(mealName).toBeInTheDocument();
        expect(mealName).toHaveTextContent(meal.strMeal);
      } else {
        expect(mealCard).not.toBeInTheDocument();
        expect(mealImg).not.toBeInTheDocument();
        expect(mealName).not.toBeInTheDocument();
      }
    });
  });

  it('should have a start button if recipe has not been started to cook yet', () => {
    const startRecipeBtn = screen.queryByTestId('start-recipe-btn');
    expect(startRecipeBtn).toBeInTheDocument();

    const expectedText = 'Iniciar Receita';
    expect(startRecipeBtn).toHaveTextContent(expectedText);
  });

  it('should toggle recipe favorite status as clicked on favorite button', () => {
    const favoriteBtn = screen.getByTestId('favorite-btn');

    const repetitiveTries = Array.from(
      { length: 6 },
      (_, index) => index + 1,
    );

    const currentRecipeIsFavorited = localStorageFake.store.favoriteRecipes.find(
      (recipe) => recipe.id === drinkRendered.idDrink,
    );

    expect(currentRecipeIsFavorited).toBeFalsy();

    repetitiveTries.forEach((tryNumber) => {
      fireEvent.click(favoriteBtn);
      const EVEN_DIVISOR = 2;
      const ZERO = 0;
      const oddTry = (tryNumber % EVEN_DIVISOR !== ZERO);

      const recipeIsFavorite = localStorageFake.store.favoriteRecipes.find(
        (recipe) => recipe.id === drinkRendered.idDrink,
      );

      if (oddTry) {
        expect(recipeIsFavorite).toBeTruthy();
        expect(recipeIsFavorite.name).toBe(drinkRendered.strDrink);
      } else {
        expect(recipeIsFavorite).toBeFalsy();
      }
    });
  });
});

describe('continue recipe test', () => {
  it('should have a continue button if recipe has been started to cook', async () => {
    localStorageFake = new LocalStorageFake();

    const fakeInProgressRecipes = {
      meals: {},
      cocktails: { [drinkRendered.idDrink]: ['0', '1'] },
    };

    localStorageFake.setItem('inProgressRecipes', fakeInProgressRecipes);

    Object.defineProperty(global, 'localStorage', {
      value: localStorageFake,
      writable: true,
    });
    jest.spyOn(JSON, 'parse').mockImplementation((value) => value);
    jest.spyOn(JSON, 'stringify').mockImplementation((value) => value);

    fakeFetch = jest.spyOn(global, 'fetch').mockImplementation(mockedFetch);

    const mealPath = `/bebidas/${drinkRendered.idDrink}`;

    history = createMemoryHistory({
      initialEntries: [mealPath],
    });

    screen = render(
      <Router history={ history }>
        <AppProvider>
          <Route
            path="/bebidas/:id"
            render={ () => <RecipeDetails pageType="bebidas" /> }
          />
        </AppProvider>
      </Router>,
    );

    await waitForElement(() => screen.getByTestId('recipe-title'));

    const continueRecipeBtn = screen.queryByTestId('start-recipe-btn');
    expect(continueRecipeBtn).toBeInTheDocument();

    const expectedText = 'Continuar Receita';
    expect(continueRecipeBtn).toHaveTextContent(expectedText);
  });
});

describe('start/continue hidden test', () => {
  it('start/continue should only appear if recipe hasnt been finished', async () => {
    localStorageFake = new LocalStorageFake();

    const fakeDoneRecipes = [{
      id: drinkRendered.idDrink,
      alcoholicOrNot: drinkRendered.strAlcoholic,
      area: '',
      category: drinkRendered.strCategory,
      doneDate: '2020-11-23T22:32:31.616Z',
      image: drinkRendered.strDrinkThumb,
      name: drinkRendered.strDrink,
      tags: [],
      type: 'bebida',
    }];

    localStorageFake.setItem('doneRecipes', fakeDoneRecipes);

    Object.defineProperty(global, 'localStorage', {
      value: localStorageFake,
      writable: true,
    });

    jest.spyOn(JSON, 'parse').mockImplementation((value) => value);
    jest.spyOn(JSON, 'stringify').mockImplementation((value) => value);

    fakeFetch = jest.spyOn(global, 'fetch').mockImplementation(mockedFetch);

    const mealPath = `/bebidas/${drinkRendered.idDrink}`;

    history = createMemoryHistory({
      initialEntries: [mealPath],
    });

    screen = render(
      <Router history={ history }>
        <AppProvider>
          <Route
            path="/bebidas/:id"
            render={ () => <RecipeDetails pageType="bebidas" /> }
          />
        </AppProvider>
      </Router>,
    );

    await waitForElement(() => screen.getByTestId('recipe-title'));

    const startRecipeBtn = screen.queryByTestId('start-recipe-btn');
    expect(startRecipeBtn).not.toBeInTheDocument();
  });
});

describe('food details navigation', () => {
  it('should navigate to in-progress page when clicked on start button', async () => {
    localStorageFake = new LocalStorageFake();

    Object.defineProperty(global, 'localStorage', {
      value: localStorageFake,
      writable: true,
    });

    jest.spyOn(JSON, 'parse').mockImplementation((value) => value);
    jest.spyOn(JSON, 'stringify').mockImplementation((value) => value);

    fakeFetch = jest.spyOn(global, 'fetch').mockImplementation(mockedFetch);

    const mealPath = `/bebidas/${drinkRendered.idDrink}`;

    history = createMemoryHistory({
      initialEntries: [mealPath],
    });

    screen = render(
      <Router history={ history }>
        <AppProvider>
          <Route
            path="/bebidas/:id"
            render={ () => <RecipeDetails pageType="bebidas" /> }
          />
        </AppProvider>
      </Router>,
    );

    await waitForElement(() => screen.getByTestId('recipe-title'));

    const startRecipeBtn = screen.queryByTestId('start-recipe-btn');

    fireEvent.click(startRecipeBtn);

    const { pathname } = history.location;
    const expectedPath = `/bebidas/${drinkRendered.idDrink}/in-progress`;

    expect(pathname).toBe(expectedPath);
  });

  it('should navigate to in-progress page when clicked on continue button', async () => {
    localStorageFake = new LocalStorageFake();

    const fakeInProgressRecipes = {
      meals: { [drinkRendered.idDrink]: ['0', '1'] },
      cocktails: {},
    };

    localStorageFake.setItem('inProgressRecipes', fakeInProgressRecipes);

    Object.defineProperty(global, 'localStorage', {
      value: localStorageFake,
      writable: true,
    });
    jest.spyOn(JSON, 'parse').mockImplementation((value) => value);
    jest.spyOn(JSON, 'stringify').mockImplementation((value) => value);

    fakeFetch = jest.spyOn(global, 'fetch').mockImplementation(mockedFetch);

    const mealPath = `/bebidas/${drinkRendered.idDrink}`;

    history = createMemoryHistory({
      initialEntries: [mealPath],
    });

    screen = render(
      <Router history={ history }>
        <AppProvider>
          <Route
            path="/bebidas/:id"
            render={ () => <RecipeDetails pageType="bebidas" /> }
          />
        </AppProvider>
      </Router>,
    );

    await waitForElement(() => screen.getByTestId('recipe-title'));

    const continueRecipeBtn = screen.queryByTestId('start-recipe-btn');

    fireEvent.click(continueRecipeBtn);

    const { pathname } = history.location;
    const expectedPath = `/bebidas/${drinkRendered.idDrink}/in-progress`;

    expect(pathname).toBe(expectedPath);
  });
});
