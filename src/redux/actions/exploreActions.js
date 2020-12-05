import fetchIngredients from '../../services/fetchExplore';

export const LOADING_INGREDIENTS = 'LOADING_INGREDIENTS';
export const SUCCESS_INGREDIENTS = 'SUCCESS_INGREDIENTS';
export const ERROR_INGREDIENTS = 'ERROR_INGREDIENTS';
export const RESET_ID = 'RESET_ID';

export function successIngredients(data) {
  const processing = data.meals || data.drinks;
  let ingredients = [];

  if (processing) {
    const maxLength = 12;
    const increment = 1;
    const zero = 0;
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

function loadingIngredients() {
  return { type: LOADING_INGREDIENTS };
}

export function resetId() {
  return { type: RESET_ID };
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
