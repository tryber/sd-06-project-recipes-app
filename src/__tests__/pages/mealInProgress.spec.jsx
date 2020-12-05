import React from 'react';
import { Router, Route } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { render, fireEvent, waitForElement } from '@testing-library/react';

import RecipeInProgress from '../../pages/RecipeInProgress';
import AppProvider from '../../hooks';

import LocalStorageFake from '../../fakes/localStorage';
import mockedFetch from '../../fakes/mocks_copy/fetch';
import oneMeal, { mealIngredientsAndMeasure } from '../../fakes/mocks_copy/oneMeal';
import inProgressRecipes from '../../fakes/recipes/inProgress';

let screen;
let localStorageFake;
let history;
let fakeFetch;
const mealRendered = oneMeal.meals[0];

describe('food details page structure testing', () => {
  beforeEach(async () => {
    localStorageFake = new LocalStorageFake();

    localStorageFake.setItem('inProgressRecipes', inProgressRecipes);

    Object.defineProperty(global, 'localStorage', {
      value: localStorageFake,
      writable: true,
    });

    jest.spyOn(JSON, 'parse').mockImplementation((value) => value);
    jest.spyOn(JSON, 'stringify').mockImplementation((value) => value);

    fakeFetch = jest.spyOn(global, 'fetch').mockImplementation(mockedFetch);

    const mealPath = `/comidas/${mealRendered.idMeal}/in-progress`;

    history = createMemoryHistory({
      initialEntries: [mealPath],
    });

    screen = render(
      <Router history={ history }>
        <AppProvider>
          <Route
            path="/comidas/:id/in-progress"
            render={ () => <RecipeInProgress pageType="comidas" /> }
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

  it('should fetch recipe info on load, displaying all the correct information', () => {
    expect(fakeFetch).toHaveBeenCalledWith('https://www.themealdb.com/api/json/v1/1/lookup.php?i=52771');

    const recipeImg = screen.getByTestId('recipe-photo');
    expect(recipeImg).toBeInTheDocument();
    expect(recipeImg).toHaveAttribute('src', mealRendered.strMealThumb);

    const recipeName = screen.getByTestId('recipe-title');
    expect(recipeName).toBeInTheDocument();
    expect(recipeName).toHaveTextContent(mealRendered.strMeal);

    expect(screen.getByTestId('share-btn')).toBeInTheDocument();

    expect(screen.getByTestId('favorite-btn')).toBeInTheDocument();

    mealIngredientsAndMeasure.forEach((ingredient, index) => {
      const ingredientAndMeasure = screen.getByTestId(
        `${index}-ingredient-step`,
      );

      expect(ingredientAndMeasure).toHaveTextContent(ingredient);
    });

    const recipeInstructions = screen.getByTestId('instructions');
    expect(recipeInstructions).toBeInTheDocument();

    const finishRecipeBtn = screen.getByTestId('finish-recipe-btn');
    expect(finishRecipeBtn).toBeInTheDocument();
    expect(finishRecipeBtn).toHaveTextContent('Finalizar Receita');
  });

  it('should correctly load meal progress from local storage', () => {
    const foodProgress = inProgressRecipes.meals[mealRendered.idMeal];

    mealIngredientsAndMeasure.forEach((ingredient, index) => {
      const ingredientShouldBeChecked = foodProgress.includes(`${index}`);

      const checkInput = screen.getByLabelText(ingredient);

      if (ingredientShouldBeChecked) {
        expect(checkInput).toBeChecked();
      } else {
        expect(checkInput).not.toBeChecked();
      }
    });
  });

  it('should correctly save/unsave from favorites', () => {
    const favoriteBtn = screen.getByTestId('favorite-btn');

    const repetitiveTries = Array.from(
      { length: 6 },
      (_, index) => index + 1,
    );

    const currentRecipeIsFavorited = localStorageFake.store.favoriteRecipes.find(
      (recipe) => recipe.id === mealRendered.idMeal,
    );

    expect(currentRecipeIsFavorited).toBeFalsy();

    repetitiveTries.forEach((tryNumber) => {
      fireEvent.click(favoriteBtn);
      const EVEN_DIVISOR = 2;
      const ZERO = 0;

      const oddTry = (tryNumber % EVEN_DIVISOR !== ZERO);

      const recipeIsFavorite = localStorageFake.store.favoriteRecipes.find(
        (recipe) => recipe.id === mealRendered.idMeal,
      );

      if (oddTry) {
        expect(recipeIsFavorite).toBeTruthy();
        expect(recipeIsFavorite.name).toBe(mealRendered.strMeal);
      } else {
        expect(recipeIsFavorite).toBeFalsy();
      }
    });
  });

  it('should correctly update progress we click though, until button enables', () => {
    const foodProgress = inProgressRecipes.meals[mealRendered.idMeal];

    mealIngredientsAndMeasure.forEach((ingredient, index) => {
      const ingredientShouldBeChecked = foodProgress.includes(`${index}`);

      const checkInput = screen.getByLabelText(ingredient);

      let finalizeBtn = screen.getByTestId('finish-recipe-btn');
      expect(finalizeBtn).toBeDisabled();

      if (!ingredientShouldBeChecked) {
        fireEvent.click(checkInput);

        const newProgress = (
          localStorageFake
            .store
            .inProgressRecipes
            .meals[mealRendered.idMeal]
        );

        const ingredientIsNowChecked = newProgress.includes(`${index}`);

        expect(ingredientIsNowChecked).toBeTruthy();
      }

      const lastIndex = mealIngredientsAndMeasure.length - 1;

      if (index === lastIndex) {
        finalizeBtn = screen.getByTestId('finish-recipe-btn');
        expect(finalizeBtn).toBeEnabled();

        fireEvent.click(checkInput);
        finalizeBtn = screen.getByTestId('finish-recipe-btn');
        expect(finalizeBtn).not.toBeEnabled();
      }
    });
  });

  it('should correctly remove progress of one ingredient', () => {
    const indexToRemove = '2';

    const checkInput = screen.getByLabelText(mealIngredientsAndMeasure[indexToRemove]);
    expect(checkInput).toBeChecked();

    fireEvent.click(checkInput);

    expect(checkInput).not.toBeChecked();

    const newProgress = (
      localStorageFake
        .store
        .inProgressRecipes
        .meals[mealRendered.idMeal]
    );

    const ingredientStillPresent = newProgress.includes(indexToRemove);

    expect(ingredientStillPresent).toBeFalsy();
  });

  it('should correctly save recipe and navigate if we finalize it', () => {
    const foodProgress = inProgressRecipes.meals[mealRendered.idMeal];

    mealIngredientsAndMeasure.forEach((ingredient, index) => {
      const ingredientShouldBeChecked = foodProgress.includes(`${index}`);

      const checkInput = screen.getByLabelText(ingredient);

      if (!ingredientShouldBeChecked) {
        fireEvent.click(checkInput);
      }
    });

    const priorFavorites = localStorageFake.store.doneRecipes || [];

    const recipeWasInDoneBefore = priorFavorites.find(
      (recipe) => recipe.id === mealRendered.idMeal,
    );

    expect(recipeWasInDoneBefore).toBeFalsy();

    const finalizeBtn = screen.getByTestId('finish-recipe-btn');

    const fakeNow = 1606254408524;
    jest.spyOn(Date, 'now').mockImplementation(() => fakeNow);

    fireEvent.click(finalizeBtn);

    const updatedFavorites = localStorageFake.store.doneRecipes;

    const recipeSuccessfullySaved = updatedFavorites.find(
      (recipe) => recipe.id === mealRendered.idMeal,
    );

    expect(recipeSuccessfullySaved).toBeTruthy();

    const expectedDate = new Date(fakeNow);

    const expectedTags = mealRendered.strTags.split(',');

    const expectedRecipeFormat = {
      alcoholicOrNot: '',
      area: mealRendered.strArea,
      category: mealRendered.strCategory,
      doneDate: expectedDate,
      id: mealRendered.idMeal,
      image: mealRendered.strMealThumb,
      name: mealRendered.strMeal,
      tags: expectedTags,
      type: 'comida',
    };

    expect(recipeSuccessfullySaved).toStrictEqual(expectedRecipeFormat);

    const { pathname } = history.location;
    const expectedPath = '/receitas-feitas';
    expect(pathname).toBe(expectedPath);
  });
});
