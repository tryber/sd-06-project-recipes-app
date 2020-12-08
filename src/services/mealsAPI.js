const URL_BASE = 'https://www.themealdb.com/api/json/v1/1/';

// type { a=areas , c=categories, i=ingredients }
export async function getAllRecipeTypesApi(type) {
  const response = await fetch(`${URL_BASE}list.php?${type}=list`);
  const result = await response.json();
  return result.meals;
}

// Lista de receitas de comidas filtradas
export async function getFilteredRecipesApi(type, value) {
  if (type === 'ingredients') {
    try {
      const response = await fetch(`${URL_BASE}filter.php?i=${value}`);
      const result = await response.json();
      return result.meals;
    } catch (error) {
      return null;
    }
  }
  if (type === 'name') {
    try {
      const response = await fetch(`${URL_BASE}search.php?s=${value}`);
      const result = await response.json();
      return result.meals;
    } catch (error) {
      return null;
    }
  }
  if (type === 'first') {
    try {
      const response = await fetch(`${URL_BASE}search.php?f=${value}`);
      const result = await response.json();
      return result.meals;
    } catch (error) {
      return null;
    }
  }
  return null;
}

// Lista de receitas de comidas
export async function getRecipesMealsApi() {
  const response = await fetch(`${URL_BASE}search.php?s=`);
  const result = await response.json();
  return result.meals;
}

// Lista de receitas de comidas por categoria
export async function getRecipesMealsByCategoryApi(category) {
  const response = await fetch(`${URL_BASE}filter.php?c=${category}`);
  const result = await response.json();
  return result.meals;
}

// Lista de receitas de comidas por ID
export async function getRecipeMealByIdApi(id) {
  const response = await fetch(`${URL_BASE}lookup.php?i=${id}`);
  const result = await response.json();
  return result.meals;
}

// Lista de receitas de comidas por igredientes aleatorios
export async function getRecipesMealsByRandomIngredients() {
  const response = await fetch(`${URL_BASE}random.php`);
  const result = await response.json();
  return result.meals;
}

// Lista de ingredientes
export async function getIngredients() {
  const response = await fetch(`${URL_BASE}list.php?i=list`);
  const result = await response.json();
  return result.meals;
}

export default {
  getAllRecipeTypesApi,
  getRecipesMealsApi,
  getRecipesMealsByCategoryApi,
  getRecipeMealByIdApi,
  getFilteredRecipesApi,
  getRecipesMealsByRandomIngredients,
  getIngredients,
};
