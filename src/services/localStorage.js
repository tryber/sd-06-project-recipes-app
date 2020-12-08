export function mealsToken(token) {
  const temp = localStorage.getItem('mealsToken');
  localStorage.setItem('mealsToken', token);
  return temp;
}

export function cocktailsToken(token) {
  const temp = localStorage.getItem('cocktailsToken');
  localStorage.setItem('cocktailsToken', token);
  return temp;
}

export function getValue(key) {
  return JSON.parse(localStorage.getItem(key));
}

export function setValue(value) {
  return localStorage.setItem(JSON.stringify({ user: { email: value } }));
}

export function setValueUser(key, value) {
  return localStorage.setItem(key, JSON.stringify({ email: value }));
}

export function treatRecipe(recipe) {
  let treatedRecipe = {};
  if ('idMeal' in recipe) {
    treatedRecipe = {
      id: recipe.idMeal,
      type: 'comida',
      area: recipe.strArea,
      category: recipe.strCategory,
      name: recipe.strMeal,
      image: recipe.strMealThumb,
      instructions: recipe.strInstructions,
      tags: recipe.strTags,
      video: recipe.strYoutube,
      source: recipe.strSource,
    };
  } else if ('idDrink' in recipe) {
    treatedRecipe = {
      id: recipe.idDrink,
      type: 'bebida',
      category: recipe.strCategory,
      alcoholicOrNot: recipe.strAlcoholic,
      name: recipe.strDrink,
      image: recipe.strDrinkThumb,
      tags: recipe.strTags,
      video: recipe.strVideo,
      glass: recipe.strGlass,
      instructions: recipe.strInstructions,
    };
  }

  return treatedRecipe;
}

export function convertTreatedRecipe(recipe) {
  let convertedRecipe = {};
  if (recipe.type === 'comida') {
    convertedRecipe = {
      idMeal: recipe.id,
      strArea: recipe.area,
      strCategory: recipe.category,
      strMeal: recipe.name,
      strMealThumb: recipe.image,
      strInstructions: recipe.instructions,
      strTags: recipe.tags,
      strYoutube: recipe.strYoutube,
      strSource: recipe.source,
    };
  } else if (recipe.type === 'bebida') {
    convertedRecipe = {
      idDrink: recipe.id,
      strCategory: recipe.category,
      strAlcoholic: recipe.alcoholicOrNot,
      strDrink: recipe.name,
      strDrinkThumb: recipe.image,
      strTags: recipe.tags,
      strVideo: recipe.video,
      strGlass: recipe.glass,
      strInstructions: recipe.instructions,
    };
  }

  return convertedRecipe;
}

function createDoneRecipesDatabase() {
  localStorage.setItem('doneRecipes', JSON.stringify([]));
}

function checkDoneRecipesDatabase() {
  const recipes = JSON.parse(localStorage.getItem('doneRecipes'));
  if (!recipes) createDoneRecipesDatabase();
}

function updateDoneRecipes(recipes) {
  localStorage.setItem('doneRecipes', JSON.stringify(recipes));
}

export function getDoneRecipes() {
  checkDoneRecipesDatabase();
  const recipes = JSON.parse(localStorage.getItem('doneRecipes'));
  return recipes;
}

export function addDoneRecipe(recipe) {
  checkDoneRecipesDatabase();
  const two = 2;
  const today = new Date();
  const day = String(today.getDate()).padStart(two, '0');
  const month = String(today.getMonth() + 1).padStart(two, '0');
  const year = today.getFullYear();
  const date = `${day}/${month}/${year}`;
  if ('idDrink' in recipe) recipe.strCategory = recipe.strAlcoholic;
  recipe = treatRecipe(recipe);
  recipe.doneDate = date;
  if (recipe.tags === null) recipe.tags = '';
  const temp = getDoneRecipes();
  if (!temp.find((item) => item.id === recipe.id)) temp.push(recipe);
  updateDoneRecipes(temp);
}

function createFavoriteRecipesDatabase() {
  const recipes = [];
  localStorage.setItem('favoriteRecipes', JSON.stringify(recipes));
}

function checkFavoriteRecipesDatabase() {
  const recipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
  if (!recipes) createFavoriteRecipesDatabase();
}

function updateFavoriteRecipes(recipes) {
  localStorage.setItem('favoriteRecipes', JSON.stringify(recipes));
}

export function getFavoriteRecipes() {
  checkFavoriteRecipesDatabase();
  const recipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
  return recipes;
}

export function recipeIsFavorite(recipe) {
  checkFavoriteRecipesDatabase();
  const recipes = getFavoriteRecipes();
  if (!('type' in recipe)) recipe = treatRecipe(recipe);
  const match = recipes.find((item) => item.id === recipe.id);
  if (match) return true;
  return false;
}

export function favoriteRecipe(recipe) {
  checkFavoriteRecipesDatabase();
  if ('idMeal' in recipe) {
    recipe = {
      id: recipe.idMeal,
      type: 'comida',
      area: recipe.strArea,
      category: recipe.strCategory,
      alcoholicOrNot: '',
      name: recipe.strMeal,
      image: recipe.strMealThumb,
    };
  } else if ('idDrink' in recipe) {
    recipe = {
      id: recipe.idDrink,
      type: 'bebida',
      area: '',
      category: recipe.strCategory,
      alcoholicOrNot: recipe.strAlcoholic,
      name: recipe.strDrink,
      image: recipe.strDrinkThumb,
    };
  }
  const temp = getFavoriteRecipes();
  let recipeIndex;
  if (!temp.length < 1) recipeIndex = temp.findIndex((item) => item.id === recipe.id);
  const minusOne = -1;
  if (recipeIndex > minusOne) temp.splice(recipeIndex, 1);
  else temp.push(recipe);
  updateFavoriteRecipes(temp);
}

function createRecipesProgressDatabase() {
  const recipes = [];
  localStorage.setItem('inProgressRecipes', JSON.stringify(recipes));
}

function getRecipesProgress() {
  const recipes = JSON.parse(localStorage.getItem('inProgressRecipes'));
  return recipes;
}

function updateRecipesProgress(recipes) {
  localStorage.setItem('inProgressRecipes', JSON.stringify(recipes));
}

export function checkRecipesProgressDatabase() {
  if (!getRecipesProgress()) createRecipesProgressDatabase();
}

export function selectedIngredient(recipeID, ingredient) {
  checkRecipesProgressDatabase();
  const recipes = getRecipesProgress();
  const minusOne = -1;
  const recipeIndex = recipes.findIndex((item) => item.id === recipeID);
  if (recipeIndex > minusOne) {
    const { ingredients } = recipes[recipeIndex];
    const ingredientIndex = ingredients.findIndex((item) => item === ingredient);
    if (ingredientIndex > minusOne) return true;
  }

  return false;
}

export function addRecipeProgress(recipeID, ingredient) {
  checkRecipesProgressDatabase();
  const recipes = getRecipesProgress();
  const recipeIndex = recipes.findIndex((item) => item.id === recipeID);
  const minusOne = -1;
  if (recipeIndex > minusOne) {
    const { ingredients } = recipes[recipeIndex];
    const ingredientIndex = ingredients.findIndex((item) => item === ingredient);
    if (ingredientIndex > minusOne) {
      recipes[recipeIndex].ingredients.splice(ingredientIndex, 1);
    } else recipes[recipeIndex].ingredients.push(ingredient);
  } else {
    const recipeObj = {
      id: recipeID,
      ingredients: [ingredient],
    };
    recipes.push(recipeObj);
  }

  updateRecipesProgress(recipes);
}
