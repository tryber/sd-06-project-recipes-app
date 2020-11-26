const RANDOM_MEALS_API = 'https://www.themealdb.com/api/json/v1/1/random.php';
const RANDOM_DRINKS_API = 'https://www.thecocktaildb.com/api/json/v1/1/random.php';
const ALL_MEALS_API = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
const ALL_DRINKS_API = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
const INGREDIENT_MEAL_API = 'https://www.themealdb.com/api/json/v1/1/filter.php?i=';
const NAME_MEAL_API = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
const FIRSTLETTER_MEAL_API = 'https://www.themealdb.com/api/json/v1/1/search.php?f=';
const INGREDIENT_DRINK_API = 'https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=';
const NAME_DRINK_API = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
const FIRSTLETTER_DRINK_API = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?f=';
const FOOD_DETAILSAPI = 'https://www.themealdb.com/api/json/v1/1/lookup.php?i=';
const DRINK_DETAILSAPI = 'https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=';
const LIST_INGREDIENTS_MEAL_API = 'https://www.themealdb.com/api/json/v1/1/list.php?i=list';
const LIST_INGREDIENTS_DRINK_API = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?i=list';
const LIST_DRINK_API = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?';
const LIST_MEAL_API = 'https://www.themealdb.com/api/json/v1/1/list.php?';
const FILTER_DRINK_API = 'https://www.thecocktaildb.com/api/json/v1/1/filter.php?';
const FILTER_MEAL_API = 'https://www.themealdb.com/api/json/v1/1/filter.php?';

const fetchData = async (url, endpoint, type) => {
  const data = await (await fetch(`${url}${endpoint}`)).json();
  return data[type];
};

export const getMealsAPI = async (searchText, searchType) => {
  if (!searchType) {
    return fetchData(ALL_MEALS_API, '', 'meals');
  }
  if (searchType === 'ingredient') {
    return fetchData(INGREDIENT_MEAL_API, searchText, 'meals');
  }
  if (searchType === 'name') {
    return fetchData(NAME_MEAL_API, searchText, 'meals');
  }
  if (searchType === 'firstletter') {
    return fetchData(FIRSTLETTER_MEAL_API, searchText, 'meals');
  }
  if (searchType === 'random') {
    return fetchData(RANDOM_MEALS_API, searchText, 'meals');
  }
  if (searchType === 'category') {
    return fetchData(LIST_MEAL_API, searchText, 'meals');
  }
  if (searchType === 'byCategory') {
    return fetchData(FILTER_MEAL_API, searchText, 'meals');
  }
  if (searchType === 'list-all-ingredients') {
    return fetchData(LIST_INGREDIENTS_MEAL_API, searchText, 'meals');
  }
};

export const getDrinksApi = async (searchText, searchType) => {
  if (!searchType) {
    return fetchData(ALL_DRINKS_API, '', 'drinks');
  }
  if (searchType === 'ingredient') {
    return fetchData(INGREDIENT_DRINK_API, searchText, 'drinks');
  }
  if (searchType === 'name') {
    return fetchData(NAME_DRINK_API, searchText, 'drinks');
  }
  if (searchType === 'firstletter') {
    return fetchData(FIRSTLETTER_DRINK_API, searchText, 'drinks');
  }
  if (searchType === 'random') {
    return fetchData(RANDOM_DRINKS_API, searchText, 'drinks');
  }
  if (searchType === 'category') {
    return fetchData(LIST_DRINK_API, searchText, 'drinks');
  }
  if (searchType === 'byCategory') {
    return fetchData(FILTER_DRINK_API, searchText, 'drinks');
  }
  if (searchType === 'list-all-ingredients') {
    return fetchData(LIST_INGREDIENTS_DRINK_API, searchText, 'drinks');
  }
};

export const foodDetails = async (idDetais) => (
  fetchData(FOOD_DETAILSAPI, idDetais, 'meals')
);

export const drinkDetails = async (idDetais) => (
  fetchData(DRINK_DETAILSAPI, idDetais, 'drinks')
);

export default { getMealsAPI, getDrinksApi, foodDetails, drinkDetails };
