import {
  SUCCESS,
  LOADING,
  ERROR,
  DONT_UPDATE,
  BY_INGREDIENT,
  CLEAR_STATE,
  MUST_FETCH,
} from '../actions/mainPageFetcher';

const INITIAL_STATE = {
  loading: true,
  error: '',
  recipeList: [],
  currentCategory: 'All',
  ingredientBasedRecipes: [],
  shouldFetchBaseRecipes: true,
};

function mainPageReducer(state = INITIAL_STATE, action) {
  console.log(state);
  switch (action.type) {
  case MUST_FETCH:
    console.log(MUST_FETCH);
    return {
      ...state,
      shouldFetchBaseRecipes: true,
      ingredientBasedRecipes: [],
      recipeList: [],
    };
  case BY_INGREDIENT:
    return { ...state, ingredientBasedRecipes: action.list, loading: false };
  case CLEAR_STATE:
    console.log(CLEAR_STATE);
    return {
      ...state,
      ingredientBasedRecipes: [],
      recipeList: [],
      shouldFetchBaseRecipes: false,
    };
  case LOADING:
    return { ...state, loading: true };
  case DONT_UPDATE:
    console.log(DONT_UPDATE);
    return { ...state, shouldFetchBaseRecipes: false };
  case ERROR:
    return { ...state, error: action.error };
  case SUCCESS:
    console.log(SUCCESS);
    return { ...state, recipeList: action.list, loading: false };
  default:
    return state;
  }
}

export default mainPageReducer;
