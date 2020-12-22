import { USER_INFO } from '../actions';

const INITIAL_STATE = {
  email: 'email@email.com',
  password: 'password123',
};

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
  case USER_INFO:
    return {
      ...state, email: action.email, password: action.password,
    };
  default:
    return state;
  }
}
