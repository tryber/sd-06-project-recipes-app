import { fetchMainPage, fetchNewSelectedCategory } from '../../services/fetchMainPage';
import apiDataProcessor from '../../services/apiDataProcessor';

export const LOADING = 'LOADING';
export const SUCCESS = 'SUCCESS';
export const ERROR = 'ERROR';
export const DONT_UPDATE = 'DONT_UPDATE';
export const BY_INGREDIENT = 'BY_INGREDIENT';
export const CLEAR_STATE = 'CLEAR_STATE';
export const MUST_FETCH = 'MUST_FETCH';

function loading() {
  return { type: LOADING };
}

export function resetShouldFetch() {
  return { type: MUST_FETCH };
}

function ingredientExplore(data) {
  console.log(data);
  const processing = data.meals || data.drinks;
  let list = [];
  if (processing) {
    const maxLength = 12;
    const increment = 1;
    const zero = 0;
    const lengthLimit = processing.length > maxLength ? maxLength : processing.length;
    for (let i = zero; i < lengthLimit; i += increment) {
      list.push(processing[i]);
    }
    list = list.map((recipe) => (apiDataProcessor(recipe)));
  } else {
    list = null;
  }
  return { type: BY_INGREDIENT, list };
}

function shouldFetchNewRecipes() {
  return { type: DONT_UPDATE };
}

export function clearState() {
  return { type: CLEAR_STATE };
}

export function success(data) {
  const processing = data.meals || data.drinks;
  let list = [];
  if (processing) {
    const maxLength = 12;
    const increment = 1;
    const zero = 0;
    const lengthLimit = processing.length > maxLength ? maxLength : processing.length;
    for (let i = zero; i < lengthLimit; i += increment) {
      list.push(processing[i]);
    }
    list = list.map((recipe) => (apiDataProcessor(recipe)));
  } else {
    list = null;
  }
  return { type: SUCCESS, list };
}

function error(failed) {
  return { type: ERROR, error: failed };
}

export function fetcherThunk(foodOrDrink) {
  return (dispatch) => {
    dispatch(loading());
    return fetchMainPage(foodOrDrink).then(
      (r) => dispatch(success(r)),
      (fail) => dispatch(error(fail)),
    );
  };
}

export function redirectToIngredientThunk(rawIngredient, pathname) {
  const baseFoodUrl = 'https://www.themealdb.com/api/json/v1/1/filter.php?i=';
  const baseDrinkUrl = 'https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=';
  const foodURL = `${baseFoodUrl}${rawIngredient}`;
  const drinkURL = `${baseDrinkUrl}${rawIngredient}`;
  if (pathname === '/comidas') {
    return (dispatch) => {
      dispatch(loading());
      dispatch(shouldFetchNewRecipes());
      return fetch(foodURL)
        .then((response) => (
          response.json()
        )).then(
          (r) => dispatch(ingredientExplore(r)),
          (fail) => dispatch(error(fail)),
        );
    };
  }
  if (pathname === '/bebidas') {
    return (dispatch) => {
      dispatch(loading());
      return fetch(drinkURL)
        .then((response) => (
          response.json()
        )).then(
          (r) => dispatch(success(r)),
          (fail) => dispatch(error(fail)),
        );
    };
  }
}

export function newCategorySelectedThunk(category, foodOrDrink, currentCategory) {
  return (dispatch) => {
    dispatch(loading());
    return fetchNewSelectedCategory(category, foodOrDrink, currentCategory).then(
      (r) => dispatch(success(r)),
      (fail) => dispatch(error(fail)),
    );
  };
}
