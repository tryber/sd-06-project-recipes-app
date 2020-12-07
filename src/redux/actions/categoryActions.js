import { fetchCategories } from '../../services/fetchMainPage';

export const LOADING_CATEGORIES = 'LOADING_CATEGORIES';
export const SUCCESS_CATEGORIES = 'SUCCESS_CATEGORIES';
export const ERROR_CATEGORIES = 'ERROR_CATEGORIES';
export const NEW_CATEGORY = 'NEW_CATEGORY';

export function newCategorySelected(category) {
  return { type: NEW_CATEGORY, category };
}

function loadingCategories() {
  return { type: LOADING_CATEGORIES };
}

function successCategories(response) {
  const categoriesApi = response.meals || response.drinks;
  let categories = [];
  const cinco = 5;
  const um = 1;
  const zero = 0;
  for (let i = zero; i < cinco; i += um) {
    categories.push(categoriesApi[i]);
  }
  categories = categories.map((category) => (category.strCategory));
  categories = ['All', ...categories];
  return { type: SUCCESS_CATEGORIES, categories };
}

function errorCategories(error) {
  return { type: ERROR_CATEGORIES, error };
}

export function categoriesThunk(foodOrDrink) {
  return (dispatch) => {
    dispatch(loadingCategories());
    return fetchCategories(foodOrDrink).then(
      (r) => dispatch(successCategories(r)),
      (fail) => dispatch(errorCategories(fail)),
    );
  };
}
