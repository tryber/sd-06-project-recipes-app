import { LOGIN } from '../actions';

const INITIAL_STATE = {
  email: 'teste@mail.com',
};

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
  case LOGIN:
    return { ...state, email: action.email };
  default:
    return state;
  }
}
