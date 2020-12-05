export const fetchFoodByName = async (name) => {
  const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`);
  const results = await response.json();
  return results.meals;
};

export const fetchFoodByFirstLetter = async (letter) => {
  const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${letter}`);
  const results = await response.json();
  return results.meals;
};

export const fetchFoodByIngredients = async (ingredient) => {
  const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`);
  const results = await response.json();
  return results.meals;
};

export const fetchFoodByCategory = async (category) => {
  const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`);
  const results = await response.json();
  return results.meals;
};

export const fetchFoodByArea = async (area) => {
  const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${area}`);
  const results = await response.json();
  return results.meals;
};

export const fetchFoodRandom = async () => {
  const response = await fetch('https://www.themealdb.com/api/json/v1/1/random.php');
  const results = await response.json();
  return results.meals;
};

export const fetchDrinkByName = async (name) => {
  const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${name}`);
  const results = await response.json();
  return results.drinks;
};

export const fetchDrinkByFirstLetter = async (letter) => {
  const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${letter}`);
  const results = await response.json();
  return results.drinks;
};

export const fetchFoodById = async (id) => {
  const response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
  const results = await response.json();
  return results.meals;
};

export const fetchDrinkByIngredients = async (ingredient) => {
  const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${ingredient}`);
  const results = await response.json();
  return results.drinks;
};

export const fetchDrinkRandom = async () => {
  const response = await fetch('https://www.thecocktaildb.com/api/json/v1/1/random.php');
  const results = await response.json();
  return results.drinks;
};

export const fetchDrinkbyId = async (id) => {
  const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`);
  const results = await response.json();
  return results.drinks;
};

export const fetchFoodIngredients = async () => {
  const response = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?i=list');
  const results = await response.json();
  return results.meals;
};

export const fetchDrinkIngredients = async () => {
  const response = await fetch('https://www.thecocktaildb.com/api/json/v1/1/list.php?i=list');
  const results = await response.json();
  return results.drinks;
};

export const fetchMealsByArea = async () => {
  const response = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?a=list');
  const result = await response.json();
  return result.meals;
};

export const fetchDrinkByCategory = async (cat) => {
  const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${cat}`);
  const result = await response.json();
  return result.drinks;
};
