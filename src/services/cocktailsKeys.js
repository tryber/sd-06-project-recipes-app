const BASE_URL = 'https://www.thecocktaildb.com/api/json/v1/1/';

export const SEARCH_ALL_COCKTAILS = `${BASE_URL}search.php?s=`;

export const SEARCH_COCKTAILS_BY_NAME = `${BASE_URL}search.php?s=`;

export const LIST_COCKTAILS_BY_FIRST_NAME = `${BASE_URL}search.php?f=`;

export const LIST_COCKTAILS_BY_INGREDIENT = `${BASE_URL}search.php?i=`;

export const FILTER_COCKTAIL_BY_INGREDIENT = `${BASE_URL}filter.php?i=`;

export const FILTER_COCKTAIL_BY_ALCOHOLIC = `${BASE_URL}filter.php?a=`;

export const FILTER_COCKTAIL_BY_CATEGORY = `${BASE_URL}filter.php?c=`;

export const FILTER_COCKTAIL_BY_GLASS = `${BASE_URL}filter.php?g=`;

export const LIST_ALL_COCKTAIL_CATEGORIES = `${BASE_URL}list.php?c=list`;

export const LIST_ALL_COCKTAIL_GLASSES = `${BASE_URL}list.php?g=list`;

export const LIST_ALL_COCKTAIL_INGREDIENTS = `${BASE_URL}list.php?i=list`;

export const LIST_ALL_COCKTAIL_ALCOHOLIC = `${BASE_URL}list.php?a=list`;

export const RANDOM_COCKTAIL = `${BASE_URL}random.php`;
