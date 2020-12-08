const URL_BASE = 'https://www.thecocktaildb.com/api/json/v1/1/';

// // type { g=glasses , c=categories, i=ingredients a=alcoholic}
export async function getAllDrinkTypesApi(type) {
  const response = await fetch(`${URL_BASE}list.php?${type}=list`);
  const result = await response.json();
  return result.drinks;
}

// Lista de receitas de bebidas filtradas
export async function getFilteredDrinksApi(type, value) {
  if (type === 'ingredients') {
    try {
      const response = await fetch(`${URL_BASE}filter.php?i=${value}`);
      const result = await response.json();
      return result.drinks;
    } catch (error) {
      return null;
    }
  }
  if (type === 'name') {
    try {
      const response = await fetch(`${URL_BASE}search.php?s=${value}`);
      const result = await response.json();
      return result.drinks;
    } catch (error) {
      return null;
    }
  }
  if (type === 'first') {
    try {
      const response = await fetch(`${URL_BASE}search.php?f=${value}`);
      const result = await response.json();
      return result.drinks;
    } catch (error) {
      return null;
    }
  }
  return null;
}

// Lista de receitas de Bebidas
export async function getRecipeDrinksApi() {
  const response = await fetch(`${URL_BASE}search.php?s=`);
  const result = await response.json();
  return result.drinks;
}

// Lista de receitas de Bebidas por categoria
export async function getRecipeDrinksByCategoryApi(category) {
  const response = await fetch(`${URL_BASE}filter.php?c=${category}`);
  const result = await response.json();
  return result.drinks;
}

// Lista de receitas de Bebidas por ID
export async function getRecipeDrinkByIdApi(id) {
  const response = await fetch(`${URL_BASE}lookup.php?i=${id}`);
  const result = await response.json();
  return result.drinks;
}

// Lista uma uma receita aleatória
export async function getRecipeDrinksByRandom() {
  const response = await fetch(`${URL_BASE}random.php`);
  const result = await response.json();
  return result.drinks;
}

// Lista de Ingredientes de Bebidas
export async function getIngredientsDrinks() {
  const response = await fetch(`${URL_BASE}list.php?i=list`);
  const result = await response.json();
  return result.drinks;
}
// Lista todas as bebidas alcoólicas
export async function getDrinksAlcoholic() {
  const response = await fetch(`${URL_BASE}filter.php?a=Alcoholic`);
  const result = await response.json();
  return result.drinks;
}

export default {
  getAllDrinkTypesApi,
  getRecipeDrinksApi,
  getRecipeDrinksByCategoryApi,
  getRecipeDrinkByIdApi,
  getFilteredDrinksApi,
  getRecipeDrinksByRandom,
  getIngredientsDrinks,
  getDrinksAlcoholic,
};
