import {
  SUCCESS_RECOMMENDATIONS,
  ERROR_RECOMMENDATIONS,
  LOADING_RECOMMENDATIONS,
} from '../actions/pageDetailsFetcher';

const INITIAL_STATE = {
  recommendations: [],
  error: '',
  loading: false,
  favRecipes: JSON.parse(localStorage.getItem('favoriteRecipes')),
};

export default function recommendationsReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
  case LOADING_RECOMMENDATIONS:
    return { ...state, loading: action.payload };
  case SUCCESS_RECOMMENDATIONS:
    return { ...state, recommendations: action.payload };
  case ERROR_RECOMMENDATIONS:
    return { ...state, error: action.failed };
  default:
    return state;
  }
}
