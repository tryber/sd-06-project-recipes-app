import { DRINKS, MEALS, CURRENT_ID, FAVORITE, CONTROL } from '../actions';

const INITIAL_STATE = {
  meals: [],
  drinks: [],
  currentID: '',
  favorite: '',
  control: '',
};

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
  case DRINKS:
    return {
      ...state, drinks: action.drink,
    };
  case MEALS:
    return {
      ...state, meals: action.meal,
    };
  case CURRENT_ID:
    return {
      ...state, currentID: action.id,
    };
  case FAVORITE:
    return {
      ...state, favorite: { [action.id]: action.fav },
    };
  case CONTROL:
    return {
      ...state, control: action.control,
    };
  default:
    return state;
  }
}
