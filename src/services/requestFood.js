export const urlFood = 'https://www.themealdb.com/api/json/v1/1/';

async function randomRequestApiFood(urlParameter = '') {
  const url = `${urlFood}${urlParameter}`;
  const objFood = await fetch(url).then((apiFood) => apiFood.json());
  const arrayFood = objFood.meals;
  // console.log('arrayFood', arrayFood);
  return arrayFood;
}

export function requestApiFoodFilterIngredient(ingredient) {
  return randomRequestApiFood(`filter.php?i=${ingredient}`);
}

export function requestApiFoodFilterName(name = '') {
  return randomRequestApiFood(`search.php?s=${name}`);
}

export function requestApiFoodFilterFirstLetter(firstLetter) {
  return randomRequestApiFood(`search.php?f=${firstLetter}`);
}

export function requestApiFoodFilterArea(area) {
  return randomRequestApiFood(`filter.php?a=${area}`);
}

export function requestApiFoodFilterCategories(category) {
  return randomRequestApiFood(`filter.php?c=${category}`);
}

export function requestApiFoodDetails(id) {
  return randomRequestApiFood(`lookup.php?i=${id}`);
}

export function requestApiFoodListCategories() {
  return randomRequestApiFood('list.php?c=list');
}

export function requestApiFoodListIngredients() {
  return randomRequestApiFood('list.php?i=list');
}

export function requestApiFoodListArea() {
  return randomRequestApiFood('list.php?a=list');
}

export async function recommendFoodsList() {
  const recomendFoods = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=');
  const response = await recomendFoods.json();
  return response;
}

export function requestApiMealSurprise() {
  return randomRequestApiFood('random.php');
}
