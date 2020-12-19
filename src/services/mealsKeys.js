const BASE_URL = 'https://www.themealdb.com/api/json/v1/1/';

export const SEARCH_ALL_MEALS = `${BASE_URL}search.php?s=`;

export const SEARCH_MEAL_BY_NAME = `${BASE_URL}search.php?s=`;

export const LIST_MEALS_BY_FIRST_LETTER = `${BASE_URL}search.php?f=`;

export const FILTER_MEAL_BY_INGREDIENT = `${BASE_URL}filter.php?i=`;

export const FILTER_MEAL_BY_CATEGORY = `${BASE_URL}filter.php?c=`;

export const FILTER_MEAL_BY_AREA = `${BASE_URL}filter.php?a=`;

export const LIST_ALL_CATEGORIES_MEAL = `${BASE_URL}categories.php`;

export const LIST_ALL_MEAL_CATEGORIES = `${BASE_URL}list.php?c=list`;

export const LIST_ALL_MEAL_AREA = `${BASE_URL}list.php?a=list`;

export const LIST_ALL_MEAL_INGREDIENTS = `${BASE_URL}list.php?i=list`;

export const RANDOM_MEAL = `${BASE_URL}random.php`;
