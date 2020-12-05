const baseURL = 'https://www.thecocktaildb.com/api/json/v1';

const NAME_KEY = 'search.php?s'; // search bar
const FIRST_LETTER_KEY = 'search.php?f'; // search bar
const FILTER_INGREDIENTS_KEY = 'filter.php?i'; // search bar
const FILTER_CATEGORIES_KEY = 'filter.php?c';
const RANDOM = 'random.php';

const ID_KEY = 'lookup.php?i';
// const INGREDIENTS_KEY = 'i';
// const AREA_KEY = 'f';

const CATEGORIES_KEY_VALUE = 'list.php?c=list';
// const AREA_KEY_VALUE = 'list.php?a=list';
const INGREDIENTS_KEY_VALUE = 'list.php?i=list';

export const searchOptions = {
  name: NAME_KEY,
  first_letter: FIRST_LETTER_KEY,
  ingredients: FILTER_INGREDIENTS_KEY,
};

export async function fetchDrinksSearch({ option, value, token }) {
  const searchKey = searchOptions[option];
  const urlToFetch = `${baseURL}/${token}/${searchKey}=${value}`;

  const data = await fetch(urlToFetch);
  const { drinks } = await data.json();

  return drinks;
}

export async function fetchDrinkRecommendations(token) {
  const urlToFetch = `${baseURL}/${token}/${NAME_KEY}=`;

  const data = await fetch(urlToFetch);
  const { drinks } = await data.json();

  return drinks;
}

export async function fetchDrinksCategories(token) {
  const urlToFetch = `${baseURL}/${token}/${CATEGORIES_KEY_VALUE}`;

  const data = await fetch(urlToFetch);
  const { drinks } = await data.json();

  const CATEGORY_LIMIT = 5;
  const categories = drinks
    .filter((_, index) => index < CATEGORY_LIMIT)
    .map((category) => category.strCategory);

  return categories;
}

export async function fetchDrinksByCategory(category, token) {
  const urlToFetch = `${baseURL}/${token}/${FILTER_CATEGORIES_KEY}=${category}`;

  const data = await fetch(urlToFetch);
  const { drinks } = await data.json();

  return drinks;
}

export async function fetchDrinkDetails(drinkID, token) {
  const urlToFetch = `${baseURL}/${token}/${ID_KEY}=${drinkID}`;

  const data = await fetch(urlToFetch);
  const { drinks } = await data.json();

  const drinkDetails = drinks[0];

  return drinkDetails;
}

export async function fetchRandomDrink(token) {
  const urlToFetch = `${baseURL}/${token}/${RANDOM}`;

  const data = await fetch(urlToFetch);
  const { drinks } = await data.json();

  const randomDrink = drinks[0];
  const { idDrink } = randomDrink;

  return [idDrink, randomDrink];
}

export async function fetchDrinkIngredients(token) {
  const urlToFetch = `${baseURL}/${token}/${INGREDIENTS_KEY_VALUE}`;

  const data = await fetch(urlToFetch);
  const { drinks: ingredients } = await data.json();

  return ingredients;
}
