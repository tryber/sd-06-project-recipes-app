import {
  fetchAPI,
  getIngredientsFoodEndPoint,
  getNameFoodEndPoint,
  getFirstLetterFoodEndPoint,
  getIngredientsDrinkEndPoint,
  getNameDrinkEndPoint,
  getFirstLetterDrinkEndPoint,
  allFoodRecipesEndPoint,
  allDrinkRecipesEndPoint,
  getFoodRecipeIdEndPoint,
  getDrinkRecipeIdEndPoint,
} from '../../helpers/APIRequests';

const initialState = {
  Comidas: {
    ingredients: (inputText) => fetchAPI(getIngredientsFoodEndPoint(inputText)),
    name: (inputText) => fetchAPI(getNameFoodEndPoint(inputText)),
    firstLetter: (inputText) => fetchAPI(getFirstLetterFoodEndPoint(inputText)),
    idFood: (id) => fetchAPI(getFoodRecipeIdEndPoint(id)),
    all: () => fetchAPI(allFoodRecipesEndPoint),

  },
  Bebidas: {
    ingredients: (inputText) => fetchAPI(getIngredientsDrinkEndPoint(inputText)),
    name: (inputText) => fetchAPI(getNameDrinkEndPoint(inputText)),
    firstLetter: (inputText) => fetchAPI(getFirstLetterDrinkEndPoint(inputText)),
    idDrink: (id) => (fetchAPI(getDrinkRecipeIdEndPoint(id))),
    all: () => fetchAPI(allDrinkRecipesEndPoint),
  },
};

function fetchReducer(state = initialState, action) {
  switch (action.type) {
  case 'ADD_FETCHES':
    return {
      ...state, [action.fetchType]: action.fetch,
    };
  default:
    return state;
  }
}

export default fetchReducer;
