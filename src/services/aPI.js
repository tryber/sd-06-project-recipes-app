export async function searchFood(food, radioButton) {
  const URL = 'https://www.themealdb.com/api/json/v1/1/';
  let endpoint = '';
  if (radioButton === 'ingrediente') endpoint = `filter.php?i=${food}`;
  else if (radioButton === 'nome') endpoint = `search.php?s=${food}`;
  else if (radioButton === 'primeira-letra') endpoint = `search.php?f=${food}`;

  const response = await fetch(`${URL}${endpoint}`);
  const json = response.json();

  return json;
}

export async function searchDrink(drink, radioButton) {
  const URL = 'https://www.thecocktaildb.com/api/json/v1/1/';
  let endpoint = '';
  if (radioButton === 'ingrediente') endpoint = `filter.php?i=${drink}`;
  else if (radioButton === 'nome') endpoint = `search.php?s=${drink}`;
  else if (radioButton === 'primeira-letra') endpoint = `search.php?f=${drink}`;

  const response = await fetch(`${URL}${endpoint}`);
  const json = response.json().catch(() => {
    console.log('Erro');
  });

  return json;
}

export async function showSugestedFoods() {
  const URL = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';

  const response = await fetch(`${URL}`);
  const json = response.json();

  return json;
}

export async function showAllDrinksCategories() {
  const URL = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list';

  const response = await fetch(`${URL}`);
  const json = response.json();

  return json;
}

export async function showAllFoodsCategories() {
  const URL = 'https://www.themealdb.com/api/json/v1/1/list.php?c=list';

  const response = await fetch(`${URL}`);
  const json = response.json();

  return json;
}

export async function selectFoodItensCategories(name) {
  const URL = 'https://www.themealdb.com/api/json/v1/1/filter.php?c=';

  const response = await fetch(`${URL}${name}`);
  const json = response.json();

  return json;
}

export async function selectDrinksItensCategories(name) {
  const URL = 'https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=';

  const response = await fetch(`${URL}${name}`);
  const json = response.json();

  return json;
}

export async function showAllFoodsInCategories() {
  const URL = 'https://www.themealdb.com/api/json/v1/1/categories.php';

  const response = await fetch(`${URL}`);
  const json = response.json();

  return json;
}

export async function showSugestedDrinks() {
  const URL = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';

  const response = await fetch(`${URL}`);
  const json = response.json();

  return json;
}

export async function detailsFoodById(idFood) {
  const URL = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${idFood}`;

  const response = await fetch(`${URL}`);
  const json = response.json();

  return json;
}

export async function detailsDrinkById(idDrink) {
  const URL = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${idDrink}`;

  const response = await fetch(`${URL}`);
  const json = response.json();

  return json;
}

export async function exploreByIngredients() {
  const URL = 'https://www.themealdb.com/api/json/v1/1/list.php?i=list';

  const response = await fetch(`${URL}`);
  const json = response.json();

  return json;
}

export async function exploreDrinksByIngredients() {
  const URL = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?i=list';

  const response = await fetch(`${URL}`);
  const json = response.json();

  return json;
}

export async function ApiExploreByPlaceOfOrigin() {
  const URL = 'https://www.themealdb.com/api/json/v1/1/list.php?a=list';

  const response = await fetch(`${URL}`);
  const json = response.json();

  return json;
}

export async function searchByOrigin(origin) {
  const URL = `https://www.themealdb.com/api/json/v1/1/filter.php?a=${origin}`;

  const response = await fetch(`${URL}`);
  const json = response.json();

  return json;
}
