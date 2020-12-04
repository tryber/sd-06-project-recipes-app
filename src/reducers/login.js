const INITIAL_STATE = { email: '' };

function userLogin(state = INITIAL_STATE, { type, email }) {
  switch (type) {
  case 'ADD_LOGIN':
    return { ...state, email };
  default:
    return state;
  }
}

export default userLogin;
