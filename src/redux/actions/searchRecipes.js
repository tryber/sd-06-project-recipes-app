import { fetchAPI, getIngredientsFoodEndPoint,
  getIngredientsDrinkEndPoint } from '../../helpers/APIRequests';

export const ADD_AREAS = 'ADD_AREAS';
export const ADD_RECIPE_DETAIL = 'ADD_RECIPE_DETAIL';
export const ADD_RECIPES = 'ADD_RECIPES';
export const CHANGE_FETCH = 'CHANGE_FETCH';
export const CHANGE_FILTER = 'CHANGE_FILTER';
export const CHANGE_ACTIVE_AREA = 'CHANGE_ACTIVE_AREA';
export const SEND_DATA = 'SEND_DATA';
export const ADD_CATEGORIES = 'ADD_CATEGORIES';
export const REQUEST_AREAS = 'REQUEST_AREAS';
export const REQUEST_CATEGORIES = 'REQUEST_CATEGORIES';
export const REQUEST_INGREDIENTS = 'REQUEST_INGREDIENTS';
export const REQUEST_RECIPES = 'REQUEST_RECIPES';
export const GET_FOOD_INGREDIENTS = 'GET_FOOD_INGREDIENTS';
export const GET_FOOD_CATEGORIES = 'GET_CATEGORIES';
export const GET_DRINK_CATEGORIES = 'GET_DRINK_CATEGORIES';
export const GET_DRINK_INGREDIENTS = 'GET_DRINK_INGREDIENTS';

const allFoodRecipesEndPoint = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
const initialFoodCategoriesEndPoint = 'https://www.themealdb.com/api/json/v1/1/list.php?c=list';
const initialDrinkCategoriesEndPoint = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list';
const allDrinkRecipesEndPoint = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
const foodIngredientsEndpoint = 'https://www.themealdb.com/api/json/v1/1/list.php?i=list';
const drinkIngreientsEndpoint = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?i=list';

const zero = 0;
const maxCategoriesLength = 5;
const maxIngredientsLength = 12;

export const addRecipeDetail = (recipeDetail) => ({
  type: ADD_RECIPE_DETAIL,
  recipeDetail,
});

export const addRecipes = (recipes) => ({
  type: ADD_RECIPES,
  recipes,
});

export const addAreas = (areas) => ({
  type: ADD_AREAS,
  areas,
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

export const changeArea = (area) => ({
  type: CHANGE_ACTIVE_AREA,
  area,
});

export const sendData = (data) => ({
  type: SEND_DATA,
  data,
});

const requestAreas = () => ({
  type: REQUEST_AREAS,
});

const requestCategories = () => ({
  type: REQUEST_CATEGORIES,
});

const requestIngredients = () => ({
  type: REQUEST_INGREDIENTS,
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

const getDrinkIngredients = (ingredients) => ({
  type: GET_DRINK_INGREDIENTS,
  ingredients,
});

const getFoodIngredients = (ingredients) => ({
  type: GET_FOOD_INGREDIENTS,
  ingredients,
});

export const addFoodIngredients = () => async (dispatch) => {
  dispatch(requestIngredients());
  const json = await fetchAPI(foodIngredientsEndpoint);
  const meals = json.meals.slice(zero, maxIngredientsLength);
  return dispatch(getFoodIngredients(meals));
};

export const addDrinkIngredients = () => async (dispatch) => {
  dispatch(requestIngredients());
  const json = await fetchAPI(drinkIngreientsEndpoint);
  const drinks = json.drinks.slice(zero, maxIngredientsLength);

  return dispatch(getDrinkIngredients(drinks));
};

export const addFoodCategories = () => async (dispatch) => {
  dispatch(requestCategories());
  const json = await fetchAPI(initialFoodCategoriesEndPoint);
  return dispatch(getFoodCategories(json.meals.slice(zero, maxCategoriesLength)));
};

export const addDrinkCategories = () => async (dispatch) => {
  dispatch(requestCategories());
  const json = await fetchAPI(initialDrinkCategoriesEndPoint);
  return dispatch(getDrinkCategories(json.drinks.slice(zero, maxCategoriesLength)));
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

export const fetchFoodByIngredient = (ingredientName) => async (dispatch) => {
  dispatch(requestRecipes());
  console.log(ingredientName);
  const response = await fetchAPI(getIngredientsFoodEndPoint(ingredientName));
  console.log(response);
  return dispatch(addRecipes({ meals: response.meals }));
};

export const fetchDrinkByIngredient = (ingredientName) => async (dispatch) => {
  dispatch(requestRecipes());
  const response = await fetchAPI(getIngredientsDrinkEndPoint(ingredientName));
  console.log('fetching', response);
  return dispatch(addRecipes({ drinks: response.drinks }));
};

export const fetchAreas = () => async (dispatch) => {
  dispatch(requestAreas());
  const areaEndPoint = 'https://www.themealdb.com/api/json/v1/1/list.php?a=list';
  const response = await fetchAPI(areaEndPoint);
  console.log(response);
  return dispatch(addAreas(response.meals));
};

export const changeFoodByArea = (area) => async (dispatch) => {
  dispatch(requestRecipes());
  console.log('--', area, '--', 'area');
  let foodByAreaEndpoint;
  if (area !== '') {
    foodByAreaEndpoint = `https://www.themealdb.com/api/json/v1/1/filter.php?a=${area}`;
  } else {
    foodByAreaEndpoint = allFoodRecipesEndPoint;
  }

  const response = await fetchAPI(foodByAreaEndpoint);
  console.log(response);
  return dispatch(addRecipes({ meals: response.meals }));
};
