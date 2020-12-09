export async function fetchDetail(type, recipeId) {
  if (recipeId === '') {
    return undefined;
  }
  const api = (type === 'comidas')
    ? `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${recipeId}`
    : `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${recipeId}`;

  const dataJson = await fetch(api);
  const data = await dataJson.json();

  return data;
}

export async function fetchCategories(type) {
  const api = (type === 'comidas')
    ? 'https://www.themealdb.com/api/json/v1/1/list.php?c=list'
    : 'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list';

  const dataJson = await fetch(api);
  const data = await dataJson.json();

  const firstCategory = 0;
  const maxCategories = 5;

  const slicedResults = (type === 'comidas')
    ? data.meals.slice(firstCategory, maxCategories)
    : data.drinks.slice(firstCategory, maxCategories);

  return slicedResults;
}

export async function fetchRecommendation(type) {
  const api = (type === 'comidas')
    ? 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s='
    : 'https://www.themealdb.com/api/json/v1/1/search.php?s=';

  const dataJson = await fetch(api);
  const data = await dataJson.json();

  const firstCategory = 0;
  const maxCategories = 6;

  const slicedResults = (type === 'comidas')
    ? data.drinks.slice(firstCategory, maxCategories)
    : data.meals.slice(firstCategory, maxCategories);

  return slicedResults;
}

export async function fetchRandom(type) {
  const api = (type === 'comida')
    ? 'https://www.themealdb.com/api/json/v1/1/random.php'
    : 'https://www.thecocktaildb.com/api/json/v1/1/random.php';

  const json = await fetch(api)
    .then((response) => response.json());

  if (type === 'comida') {
    return json.meals[0].idMeal;
  } if (type === 'bebida') {
    return json.drinks[0].idDrink;
  }
}

export async function fetchArea() {
  const api = 'https://www.themealdb.com/api/json/v1/1/list.php?a=list';
  const json = await fetch(api)
    .then((response) => response.json());
  return json.meals;
}

export async function fetchRecipes(type) {
  const min = 0;
  const max = 12;
  if (type !== 'All') {
    const api = `https://www.themealdb.com/api/json/v1/1/filter.php?a=${type}`;
    const json = await fetch(api)
      .then((response) => response.json());

    return json.meals.splice(min, max);
  }
}
