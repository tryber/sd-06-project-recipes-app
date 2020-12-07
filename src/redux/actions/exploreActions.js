import fetchIngredients from '../../services/fetchExplore';

export const LOADING_INGREDIENTS = 'LOADING_INGREDIENTS';
export const SUCCESS_INGREDIENTS = 'SUCCESS_INGREDIENTS';
export const ERROR_INGREDIENTS = 'ERROR_INGREDIENTS';
export const RESET_ID = 'RESET_ID';
export const SUCCESS_RANDOM_MEAL = 'SUCCESS_RANDOM_MEAL';

export function successIngredients(data) {
  const processing = data.meals || data.drinks;
  let ingredients = [];
  const zero = 0;

  if (processing) {
    const maxLength = 12;
    const increment = 1;
    const lengthLimit = processing.length > maxLength ? maxLength : processing.length;
    for (let i = zero; i < lengthLimit; i += increment) {
      ingredients.push(processing[i]);
    }
    ingredients = ingredients.map((ingredient) => (
      ingredient.strIngredient || ingredient.strIngredient1
    ));
  } else {
    ingredients = null;
  }

  return {
    type: SUCCESS_INGREDIENTS,
    ingredients,
  };
}

function errorIngredients(error) {
  return {
    type: ERROR_INGREDIENTS,
    error,
  };
}

function successRandomMeal(data) {
  const recipe = data.meals || data.drinks;
  const id = recipe[0].idMeal || recipe[0].idDrink;
  return { type: SUCCESS_RANDOM_MEAL, id };
}

function loadingIngredients() {
  return { type: LOADING_INGREDIENTS };
}

export function resetId() {
  return { type: RESET_ID };
}

export function randomMealThunk(value) {
  return (dispatch) => {
    dispatch(loadingIngredients());

    return fetchIngredients(value).then(
      (r) => dispatch(successRandomMeal(r)),
      (fail) => dispatch(errorIngredients(fail)),
    );
  };
}

export function ingredientsThunk(value) {
  return (dispatch) => {
    dispatch(loadingIngredients());

    return fetchIngredients(value).then(
      (r) => dispatch(successIngredients(r)),
      (fail) => dispatch(errorIngredients(fail)),
    );
  };
}
