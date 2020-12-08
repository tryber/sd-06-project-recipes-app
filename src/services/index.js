const baseAPIDrinks = ('https://www.thecocktaildb.com/api/json/v1/1/');
const endPointDrinkIngredient = ('filter.php?i=');
const endPointDrinkName = ('search.php?s=');
const endPointDrinkFirstLetter = ('search.php?f=');

const baseAPIMeal = ('https://www.themealdb.com/api/json/v1/1/');
const endPointMealIngredient = ('filter.php?i=');
const endPointMealName = ('search.php?s=');
const endPointMealFirstLetter = ('search.php?f=');
const endPointCategoryList = ('list.php?c=list');
const endPointRandom = ('random.php');
const endPointCategory = ('filter.php?c=');
const endPointId = ('lookup.php?i=');

export const fetchDrinkAPIByIngredient = async (ingredient) => {
  const response = await fetch(`${baseAPIDrinks}${endPointDrinkIngredient}${ingredient}`);
  const json = await response.json();
  return json.drinks;
};

export const fetchDrinkAPIByName = async (name) => {
  const response = await fetch(`${baseAPIDrinks}${endPointDrinkName}${name}`);
  const json = await response.json();
  return json.drinks;
};

export const fetchDrinkAPIByFirstLetter = async (firstLetter) => {
  const response = await
  fetch(`${baseAPIDrinks}${endPointDrinkFirstLetter}${firstLetter}`);
  const json = await response.json();
  return json.drinks;
};

export const fetchMealAPIByIngredient = async (ingredient) => {
  const response = await fetch(`${baseAPIMeal}${endPointMealIngredient}${ingredient}`);
  const json = await response.json();
  return json.meals;
};

export const fetchMealByName = async (name) => {
  const response = await fetch(`${baseAPIMeal}${endPointMealName}${name}`);
  const json = await response.json();
  return json.meals;
};

export const fetchMealByFirstLetter = async (firstLetter) => {
  const response = await fetch(`${baseAPIMeal}${endPointMealFirstLetter}${firstLetter}`);
  const json = await response.json();
  return json.meals;
};

export const getDrinksStart = async (callback) => {
  const response = await fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=');
  const json = await response.json();
  callback(json.drinks);
};

export const initialRecipes = async (callback) => {
  const response = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=');
  const json = await response.json();
  callback(json.meals);
};

export const fetchMealCategoryList = async () => {
  const response = await fetch(`${baseAPIMeal}${endPointCategoryList}`);
  const json = await response.json();
  return json.meals;
};

export const fetchDrinkCategoryList = async () => {
  const response = await fetch(`${baseAPIDrinks}${endPointCategoryList}`);
  const json = await response.json();
  return json.drinks;
};

export const fetchRandomMealId = async () => {
  const response = await fetch(`${baseAPIMeal}${endPointRandom}`);
  const { meals } = await response.json();
  return meals[0].idMeal;
};

export const fetchRandomDrinkId = async () => {
  const response = await fetch(`${baseAPIDrinks}${endPointRandom}`);
  const { drinks } = await response.json();
  return drinks[0].idDrink;
};

export const fetchMealByCategory = async (category) => {
  const response = await fetch(`${baseAPIMeal}${endPointCategory}${category}`);
  const json = await response.json();
  return json.meals;
};

export const fetchDrinkByCategory = async (category) => {
  const response = await fetch(`${baseAPIDrinks}${endPointCategory}${category}`);
  const json = await response.json();
  return json.drinks;
};

export const fetchMealById = async (id) => {
  const response = await fetch(`${baseAPIMeal}${endPointId}${id}`);
  const json = await response.json();
  return json.meals;
};

export const fetchDrinkById = async (id) => {
  const response = await fetch(`${baseAPIDrinks}${endPointId}${id}`);
  const json = await response.json();
  return json.drinks;
};

export const fetchMealIngredients = async () => {
  const response = await fetch(`${baseAPIMeal}list.php?i=list`);
  const json = await response.json();
  return json;
};

export const fetchDrinkIngredients = async () => {
  const response = await fetch(`${baseAPIDrinks}list.php?i=list`);
  const json = await response.json();
  return json;
};
