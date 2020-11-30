import { fetchAPI } from '../../helpers/APIRequests';

export const ADD_RECIPE_DETAIL = 'ADD_RECIPE_DETAIL';
export const ADD_RECIPES = 'ADD_RECIPES';
export const CHANGE_FETCH = 'CHANGE_FETCH';
export const SEND_DATA = 'SEND_DATA';
export const ADD_CATEGORIES = 'ADD_CATEGORIES';
export const REQUEST_CATEGORIES = 'REQUEST_CATEGORIES';
export const REQUEST_RECIPES = 'REQUEST_RECIPES';
export const GET_FOOD_CATEGORIES = 'GET_CATEGORIES';
export const GET_DRINK_CATEGORIES = 'GET_DRINK_CATEGORIES';
export const CHANGE_FILTER = 'CHANGE_FILTER';

const allFoodRecipesEndPoint = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
const initialFoodCategoriesEndPoint = 'https://www.themealdb.com/api/json/v1/1/list.php?c=list';
const initialDrinkCategoriesEndPoint = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list';
const allDrinkRecipesEndPoint = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';

const zero = 0;
const maxLength = 5;

export const addRecipeDetail = (recipeDetail) => ({
  type: ADD_RECIPE_DETAIL,
  recipeDetail,
});

export const addRecipes = (recipes) => ({
  type: ADD_RECIPES,
  recipes,
});

export const changeIsFetchin = (isFetchin) => ({
  type: CHANGE_FETCH,
  fetch: isFetchin,
});

export const changeFilter = (pageTitle, active) => ({
  type: CHANGE_FILTER,
  pageTitle,
  active,
});

export const sendData = (data) => ({
  type: SEND_DATA,
  data,
});

const requestCategories = () => ({
  type: REQUEST_CATEGORIES,
});

const requestRecipes = () => ({
  type: REQUEST_RECIPES,
});

const getFoodCategories = (categories) => ({
  type: GET_FOOD_CATEGORIES,
  categories,
});

const getDrinkCategories = (categories) => ({
  type: GET_DRINK_CATEGORIES,
  categories,
});

export const addFoodCategories = () => async (dispatch) => {
  dispatch(requestCategories());
  const json = await fetchAPI(initialFoodCategoriesEndPoint);
  return dispatch(getFoodCategories(json.meals.slice(zero, maxLength)));
};

export const addDrinkCategories = () => async (dispatch) => {
  dispatch(requestCategories());
  const json = await fetchAPI(initialDrinkCategoriesEndPoint);
  return dispatch(getDrinkCategories(json.drinks.slice(zero, maxLength)));
};

export const addFoodRecipes = () => async (dispatch) => {
  dispatch(requestRecipes());
  const response = await fetchAPI(allFoodRecipesEndPoint);
  return dispatch(addRecipes({ meals: response.meals }));
};

export const addDrinkRecipes = () => async (dispatch) => {
  dispatch(requestRecipes());
  const response = await fetchAPI(allDrinkRecipesEndPoint);
  return dispatch(addRecipes({ drinks: response.drinks }));
};
