const baseURL = 'https://www.themealdb.com/api/json/v1';
// const searchBase = 'search.php?';

const NAME_KEY = 'search.php?s'; // search bar
const FIRST_LETTER_KEY = 'search.php?f'; // search bar
const FILTER_INGREDIENTS_KEY = 'filter.php?i'; // search bar
const FILTER_CATEGORIES_KEY = 'filter.php?c';
const FILTER_AREA_KEY = 'filter.php?a';
const RANDOM = 'random.php';

const ID_KEY = 'lookup.php?i';

const CATEGORIES_KEY_VALUE = 'list.php?c=list';
const AREA_KEY_VALUE = 'list.php?a=list';
const INGREDIENTS_KEY_VALUE = 'list.php?i=list';

export const searchOptions = {
  name: NAME_KEY,
  first_letter: FIRST_LETTER_KEY,
  ingredients: FILTER_INGREDIENTS_KEY,
};

export async function fetchMealsSearch({ option, value, token }) {
  const searchKey = searchOptions[option];
  const urlToFetch = `${baseURL}/${token}/${searchKey}=${value}`;

  const data = await fetch(urlToFetch);
  const { meals } = await data.json();

  return meals;
}

export async function fetchFoodRecommendations(token) {
  const urlToFetch = `${baseURL}/${token}/${NAME_KEY}=`;

  const data = await fetch(urlToFetch);
  const { meals } = await data.json();

  return meals;
}

export async function fetchFoodsCategories(token) {
  const urlToFetch = `${baseURL}/${token}/${CATEGORIES_KEY_VALUE}`;

  const data = await fetch(urlToFetch);
  const { meals } = await data.json();

  const CATEGORY_LIMIT = 5;
  const categories = meals
    .filter((_, index) => index < CATEGORY_LIMIT)
    .map((category) => category.strCategory);

  return categories;
}

export async function fetchMealsByCategory(category, token) {
  const urlToFetch = `${baseURL}/${token}/${FILTER_CATEGORIES_KEY}=${category}`;

  const data = await fetch(urlToFetch);
  const { meals } = await data.json();

  return meals;
}

export async function fetchMealDetails(mealID, token) {
  const urlToFetch = `${baseURL}/${token}/${ID_KEY}=${mealID}`;

  const data = await fetch(urlToFetch);
  const { meals } = await data.json();

  const mealDetails = meals[0];

  return mealDetails;
}

export async function fetchRandomMeal(token) {
  const urlToFetch = `${baseURL}/${token}/${RANDOM}`;

  const data = await fetch(urlToFetch);
  const { meals } = await data.json();

  const randomMeal = meals[0];
  const { idMeal } = randomMeal;

  return [idMeal, randomMeal];
}

export async function fetchMealIngredients(token) {
  const urlToFetch = `${baseURL}/${token}/${INGREDIENTS_KEY_VALUE}`;

  const data = await fetch(urlToFetch);
  const { meals: ingredients } = await data.json();

  return ingredients;
}

export async function fetchFoodAreas(token) {
  const urlToFetch = `${baseURL}/${token}/${AREA_KEY_VALUE}`;

  const data = await fetch(urlToFetch);
  const { meals: areas } = await data.json();

  return areas;
}

export async function fetchFoodsByArea(area, token) {
  const urlToFetch = `${baseURL}/${token}/${FILTER_AREA_KEY}=${area}`;

  const data = await fetch(urlToFetch);
  const { meals } = await data.json();

  return meals;
}
