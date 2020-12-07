import apiDataProcessor from '../services/apiDataProcessor';
import fetchRecipeDetails from '../services/fetchRecipeDetails';
import { processRecipeObject } from './processRecipeObject';

async function recipeDetailsProcessing(id, path, setRecipe) {
  const data = await fetchRecipeDetails(id, path);
  const requestType = data.meals || data.drinks;
  const treatedRecipe = apiDataProcessor(requestType[0]);
  const processedRecipeObject = processRecipeObject(treatedRecipe);
  setRecipe(processedRecipeObject);
}

export default recipeDetailsProcessing;
