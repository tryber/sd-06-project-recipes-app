import { SAVE_FOOD_SEARCH, SAVE_DRINK_SEARCH } from '../actions';

const INITIAL_STATE = {
  meals: [],
  drinks: [],
};

function searchReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
  case SAVE_FOOD_SEARCH:
    return { ...state, meals: action.meals };
  case SAVE_DRINK_SEARCH:
    return { ...state, drinks: action.drinks };
  default:
    return state;
  }
}

export default searchReducer;
