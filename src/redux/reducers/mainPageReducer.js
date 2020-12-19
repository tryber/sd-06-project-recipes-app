import {
  SUCCESS,
  LOADING,
  ERROR,
} from '../actions/mainPageFetcher';

const INITIAL_STATE = {
  loading: false,
  error: '',
  recipeList: [],
  currentCategory: 'All',
};

function mainPageReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
  case LOADING:
    return { ...state, loading: true };
  case ERROR:
    return { ...state, error: action.error };
  case SUCCESS:
    return { ...state, recipeList: action.list, loading: false };
  default:
    return state;
  }
}

export default mainPageReducer;
