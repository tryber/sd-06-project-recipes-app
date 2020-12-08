import { ADD_EMAIL } from '../actions/LoginActions';

const initialState = {
  email: '',
};

function loginReducer(state = initialState, action) {
  switch (action.type) {
  case ADD_EMAIL:
    return {
      ...state, email: action.email,
    };
  default:
    return state;
  }
}

export default loginReducer;
