export function fetchMeal(endPoint, value) {
  let variavel;
  if (endPoint.length < 1) {
    variavel = fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=')
      .then((response) => response.json())
      .then((response) => response.meals);
  } else if (value === 'ingrediente') {
    variavel = fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${endPoint}`)
      .then((response) => response.json())
      .then((response) => response.meals);
  } else if (value === 'nome') {
    variavel = fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${endPoint}`)
      .then((response) => response.json())
      .then((response) => response.meals);
  } else if (value === 'primeira-letra') {
    variavel = fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${endPoint}`)
      .then((response) => response.json())
      .then((response) => response.meals);
  }
  return variavel;
}

export function fetchDrinks(endPoint, value) {
  let variavel;
  const INITIAL_LENGTH = 0;
  const MAX_LENGTH = 12;
  if (endPoint.length < 1) {
    variavel = fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=')
      .then((response) => response.json())
      .then((response) => response.drinks);
  } else if (value === 'ingrediente') {
    variavel = fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${endPoint}`)
      .then((response) => response.json())
      .then((response) => response.drinks)
      .catch(() => {
        alert('item não encontrado');
        return [];
      });
  } else if (value === 'nome') {
    variavel = fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${endPoint}`)
      .then((response) => response.json())
      .then((response) => response.drinks.slice(INITIAL_LENGTH, MAX_LENGTH))
      .catch(() => {
        alert('Sinto muito, não encontramos nenhuma receita para esses filtros.');
        return [];
      });
  } else if (value === 'primeira-letra') {
    variavel = fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${endPoint}`)
      .then((response) => response.json())
      .then((response) => response.drinks.slice(INITIAL_LENGTH, MAX_LENGTH));
  }
  return variavel;
}

export function fetchDrinksById(endPoint) {
  const variavel = fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${endPoint}`)
    .then((response) => response.json())
    .then((response) => response.drinks);
  return variavel;
}

export function fetchRecommendedDrinks() {
  const INITIAL_LENGTH = 0;
  const MAX_LENGTH = 6;
  const variavel = fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=')
    .then((response) => response.json())
    .then((response) => response.drinks.slice(INITIAL_LENGTH, MAX_LENGTH));
  return variavel;
}

export function fetchMealsById(endPoint) {
  const variavel = fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${endPoint}`)
    .then((response) => response.json())
    .then((response) => response.meals);
  return variavel;
}

export function fetchRecommendedMeals() {
  const INITIAL_LENGTH = 0;
  const MAX_LENGTH = 6;
  const variavel = fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=')
    .then((response) => response.json())
    .then((response) => response.meals.slice(INITIAL_LENGTH, MAX_LENGTH));
  return variavel;
}

export function foodsOnRender() {
  const INITIAL_LENGTH = 0;
  const MAX_LENGTH = 12;
  const variavel = fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=')
    .then((response) => response.json())
    .then((response) => response.meals.slice(INITIAL_LENGTH, MAX_LENGTH));
  return variavel;
}

export function drinksOnRender() {
  const INITIAL_LENGTH = 0;
  const MAX_LENGTH = 12;
  const variavel = fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=')
    .then((response) => response.json())
    .then((response) => response.drinks.slice(INITIAL_LENGTH, MAX_LENGTH));
  return variavel;
}

export function foodsCategoriesOnRender() {
  const INITIAL_LENGTH = 0;
  const MAX_LENGTH = 5;
  const variavel = fetch('https://www.themealdb.com/api/json/v1/1/list.php?c=list')
    .then((response) => response.json())
    .then((response) => response.meals.slice(INITIAL_LENGTH, MAX_LENGTH));
  return variavel;
}

export function drinksCategoriesOnRender() {
  const INITIAL_LENGTH = 0;
  const MAX_LENGTH = 5;
  const variavel = fetch('https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list')
    .then((response) => response.json())
    .then((response) => response.drinks.slice(INITIAL_LENGTH, MAX_LENGTH));
  return variavel;
}

export function filterFoodsByCategory(endPoint) {
  const INITIAL_LENGTH = 0;
  const MAX_LENGTH = 12;
  const variavel = fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${endPoint}`)
    .then((response) => response.json())
    .then((response) => response.meals.slice(INITIAL_LENGTH, MAX_LENGTH));
  return variavel;
}

export function filterDrinksByCategory(endPoint) {
  const INITIAL_LENGTH = 0;
  const MAX_LENGTH = 12;
  const variavel = fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${endPoint}`)
    .then((response) => response.json())
    .then((response) => response.drinks.slice(INITIAL_LENGTH, MAX_LENGTH));
  return variavel;
}

export function randomRecipeFoods() {
  const API = fetch('https://www.themealdb.com/api/json/v1/1/random.php')
    .then((response) => response.json())
    .then((response) => response.meals);
  return API;
}

export function randomRecipeDrinks() {
  const API = fetch('https://www.thecocktaildb.com/api/json/v1/1/random.php')
    .then((response) => response.json())
    .then((response) => response.drinks);
  return API;
}

export function foodsIngredientsRender() {
  const INITIAL_LENGTH = 0;
  const MAX_LENGTH = 12;
  const variavel = fetch('https://www.themealdb.com/api/json/v1/1/list.php?i=list')
    .then((response) => response.json())
    .then((response) => response.meals.slice(INITIAL_LENGTH, MAX_LENGTH));
  return variavel;
}

export function drinksIngredientsRender() {
  const INITIAL_LENGTH = 0;
  const MAX_LENGTH = 12;
  const variavel = fetch('https://www.thecocktaildb.com/api/json/v1/1/list.php?i=list')
    .then((response) => response.json())
    .then((response) => response.drinks.slice(INITIAL_LENGTH, MAX_LENGTH));
  return variavel;
}

export function fetchAreas() {
  const API = fetch('https://www.themealdb.com/api/json/v1/1/list.php?a=list')
    .then((response) => response.json())
    .then((response) => response.meals);
  return API;
}

export function filterByArea(endPoint) {
  const INITIAL_LENGTH = 0;
  const MAX_LENGTH = 12;
  if (endPoint === '') {
    const API = fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=')
      .then((response) => response.json())
      .then((response) => response.meals.slice(INITIAL_LENGTH, MAX_LENGTH));
    return API;
  }
  const API = fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${endPoint}`)
    .then((response) => response.json())
    .then((response) => response.meals.slice(INITIAL_LENGTH, MAX_LENGTH));
  return API;
}
