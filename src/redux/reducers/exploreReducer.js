import {
  LOADING_INGREDIENTS,
  SUCCESS_INGREDIENTS,
  RESET_ID,
} from '../actions/exploreActions';

const INITIAL_STATE = {
  id: '',
  ingredients: ['Chicken'],
  isLoading: true,
};

function exploreReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
  case LOADING_INGREDIENTS:
    return { ...state, isLoading: true };
  case SUCCESS_INGREDIENTS:
  {
    if (action.ingredients.length === 1) {
      return {
        ...state,
        id: action.ingredients[0].idMeal || action.ingredients[0].idDrink,
        isLoading: false,
      };
    }

    return { id: '', ingredients: action.ingredients, isLoading: false };
  }
  case RESET_ID:
    return { ...state, id: '' };
  default:
    return state;
  }
}

export default exploreReducer;
