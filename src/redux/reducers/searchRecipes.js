import { ADD_RECIPES,
  ADD_RECIPE_DETAIL,
  CHANGE_FETCH,
  GET_FOOD_CATEGORIES,
  GET_DRINK_CATEGORIES,
  REQUEST_CATEGORIES,
  REQUEST_RECIPES,
  SEND_DATA, CHANGE_FILTER } from '../actions/searchRecipes';

const initialState = {
  recipes: {
    meals: [],
    drinks: [],
  },
  categoriesFilterActive: {
    Comidas: false,
    Bebidas: false,
  },

  isFetchin: false,
  isRecipesFetching: true,
  iscategoriesFetching: true,
  foodCategories: [],
  foodInProgress: [],
  drinkCategories: [],
  data: {
    inputText: '',
    radioSearchSelection: 'ingredients',
  },

};

export default function searchRecipesReducer(state = initialState, action) {
  switch (action.type) {
  case ADD_RECIPES:
    return {
      ...state, recipes: action.recipes, isRecipesFetching: false,
    };

  case ADD_RECIPE_DETAIL:
    return {
      ...state, foodInProgress: [...state.foodInProgress, action.recipeDetail],
    };

  case CHANGE_FETCH:
    return {
      ...state, isFetchin: action.fetch,
    };
  case CHANGE_FILTER:
    return {
      ...state,
      categoriesFilterActive: {
        [action.pageTitle]: action.active,
      },

    };

  case GET_FOOD_CATEGORIES:
    return {
      ...state, foodCategories: [...action.categories], iscategoriesFetching: false,
    };

  case GET_DRINK_CATEGORIES:
    return {
      ...state, drinkCategories: [...action.categories], iscategoriesFetching: false,
    };

  case REQUEST_CATEGORIES:
    console.log(action);
    return {
      ...state, iscategoriesFetching: true,
    };

  case REQUEST_RECIPES:
    return {
      ...state, isRecipesFetching: true,
    };

  case SEND_DATA:
    return {
      ...state, data: action.data,
    };
  default:
    return state;
  }
}
