export const allFoodRecipesEndPoint = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
export const allDrinkRecipesEndPoint = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';

export const fetchAPI = async (endpoint) => {
  let data = null;
  try {
    const response = await fetch(endpoint);
    data = await response.json();
  } catch (err) {
    console.error(err);
    console.warn(err);
  }
  return data;
};

export const getIngredientsFoodEndPoint = (inputText) => (
  `https://www.themealdb.com/api/json/v1/1/filter.php?i=${inputText}`
);

export const getNameFoodEndPoint = (inputText) => (
  `https://www.themealdb.com/api/json/v1/1/search.php?s=${inputText}`
);

export const getFirstLetterFoodEndPoint = (inputText) => (
  `https://www.themealdb.com/api/json/v1/1/search.php?f=${inputText}`
);

export const getFoodRecipeIdEndPoint = (id) => (
  `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
);

export const getIngredientsDrinkEndPoint = (inputText) => (
  `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${inputText}`
);

export const getNameDrinkEndPoint = (inputText) => (
  `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${inputText}`
);

export const getFirstLetterDrinkEndPoint = (inputText) => (
  `https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${inputText}`
);

export const getDrinkRecipeIdEndPoint = (id) => (
  `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`
);

const handleSucessAPIResponse = (recipesData, dispatchRecipes, type) => {
  if (recipesData && recipesData[type] !== null) {
    const recipesResults = recipesData;
    dispatchRecipes(recipesResults);
  }
};

const handleNullAPIResponse = (recipesData, _dispatchRecipes, type) => {
  if (recipesData === null || recipesData[type] === null) {
    alert('Sinto muito, não encontramos nenhuma receita para esses filtros.');
  }
};

export const handleAPIResponse = (recipesData, dispatchRecipes, { type }) => {
  handleNullAPIResponse(recipesData, dispatchRecipes, type);
  handleSucessAPIResponse(recipesData, dispatchRecipes, type);
};
