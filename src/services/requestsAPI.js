const url = 'https://www.themealdb.com/api/json/v1/1';
const drinksUrl = 'https://www.thecocktaildb.com/api/json/v1/1';

export async function requestIngredients(info) {
  try {
    const resolve = await fetch(`${url}/filter.php?i=${info}`);
    const result = await resolve.json();
    return result;
  } catch (error) {
    alert('Sinto muito, não encontramos nenhuma receita para esses filtros.');
  }
  return null;
}

export async function requestName(info) {
  const resolve = await fetch(`${url}/search.php?s=${info}`);
  const result = await resolve.json();
  return result;
}

export async function requestFirstLetter(info) {
  const resolve = await fetch(`${url}/search.php?f=${info}`);
  const result = await resolve.json();
  return result;
}

export async function requestDrinksIngredients(info) {
  try {
    const resolve = await fetch(`${drinksUrl}/filter.php?i=${info}`);
    const result = await resolve.json();
    return result;
  } catch (error) {
    alert('Sinto muito, não encontramos nenhuma receita para esses filtros.');
  }
  return null;
}

export async function requestDrinksName(info) {
  try {
    const resolve = await fetch(`${drinksUrl}/search.php?s=${info}`);
    const result = await resolve.json();
    return result;
  } catch (error) {
    alert('Sinto muito, não encontramos nenhuma receita para esses filtros.');
  }
  return null;
}

export async function requestDrinksFirstLetter(info) {
  const resolve = await fetch(`${drinksUrl}/search.php?f=${info}`);
  const result = await resolve.json();
  return result;
}

export async function requestFoods() {
  const resolve = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=');
  const result = await resolve.json();
  return result;
}

export async function requestDrinks() {
  const resolve = await fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=');
  const result = await resolve.json();
  return result;
}

export async function requestCategoryFood() {
  const resolve = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?c=list');
  const result = await resolve.json();
  return result;
}

export async function requestCategoryDrink() {
  const resolve = await fetch('https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list');
  const result = await resolve.json();
  return result;
}

export async function filterCategoryFood(info) {
  const resolve = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${info}`);
  const result = await resolve.json();
  return result;
}

export async function filterCategoryDrinks(info) {
  const resolve = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${info}`);
  const result = await resolve.json();
  return result;
}

export async function requestDetailsFood(info) {
  const resolve = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${info}`);
  const result = await resolve.json();
  return result;
}

export async function requestDetailsDrinks(info) {
  const resolve = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${info}`);
  const result = await resolve.json();
  return result;
}

export async function requestRandomFood() {
  const resolve = await fetch('https://www.themealdb.com/api/json/v1/1/random.php');
  const result = await resolve.json();
  return result.meals[0];
}

export async function requestRandomDrink() {
  const resolve = await fetch('https://www.thecocktaildb.com/api/json/v1/1/random.php');
  const result = await resolve.json();
  return result;
}

export async function requestByIngredients() {
  const resolve = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?i=list');
  const result = await resolve.json();
  return result;
}

export async function requestMealByArea() {
  const resolve = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?a=list');
  const result = await resolve.json();
  return result;
}

export async function requestIngredientImage(info) {
  const resolve = await fetch(`https://www.themealdb.com/images/ingredients/${info}-Small.png`);
  const result = await resolve.json();
  return result;
}
