export const USER_INFO = 'USER_INFO';
export const DRINKS = 'DRINKS';
export const MEALS = 'MEALS';
export const CURRENT_ID = 'CURRENT_ID';
export const FAVORITE = 'FAVORITE';
export const CONTROL = 'CONTROL';

export const UserInfo = (email, password) => ({
  type: USER_INFO,
  email,
  password,
});

export const comida = (meal) => ({
  type: MEALS,
  meal,
});

export const bebida = (drink) => ({
  type: DRINKS,
  drink,
});

export const currentID = (id) => ({
  type: CURRENT_ID,
  id,
});

export const favRecipe = (fav, id) => ({
  type: FAVORITE,
  fav,
  id,
});

export const controlState = (control) => ({
  type: CONTROL,
  control,
});
