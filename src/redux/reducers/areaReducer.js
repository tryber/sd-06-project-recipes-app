import { LOADING_AREAS,
  SUCCESS_AREAS,
  ERROR_AREAS,
  SELECTED_AREA,
  MEAL_BY_AREA,
} from '../actions/areaAction';

const INITIAL_STATE = {
  loading: true,
  error: '',
  areas: [],
  selectedArea: 'All',
  mealByArea: [],
};

function areaReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
  case LOADING_AREAS:
    return { ...state, loading: true };
  case ERROR_AREAS:
    return { ...state, error: action.error };
  case SUCCESS_AREAS:
    return { ...state, loading: false, areas: action.response };
  case SELECTED_AREA:
    return { ...state, selectedArea: action.selectedArea };
  case MEAL_BY_AREA:
    return { ...state, mealByArea: action.mealByArea, loading: false };
  default:
    return state;
  }
}

export default areaReducer;
