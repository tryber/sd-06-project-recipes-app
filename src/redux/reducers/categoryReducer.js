import {
  LOADING_CATEGORIES,
  ERROR_CATEGORIES,
  SUCCESS_CATEGORIES,
  NEW_CATEGORY,
} from '../actions/categoryActions';

const INITIAL_STATE = {
  loading: false,
  error: '',
  categories: [],
  currentCategory: 'All',
};

function categoryReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
  case LOADING_CATEGORIES:
    return { ...state, loading: true };
  case ERROR_CATEGORIES:
    return { ...state, error: action.error };
  case SUCCESS_CATEGORIES:
    return { ...state, loading: false, categories: action.categories };
  case NEW_CATEGORY:
    return { ...state, currentCategory: action.category };
  default:
    return state;
  }
}

export default categoryReducer;
