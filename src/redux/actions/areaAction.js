import { fetchAreas, fetchFoodByArea } from '../../services/fetchAreas';
import apiDataProcessor from '../../services/apiDataProcessor';

export const LOADING_AREAS = 'LOADING_AREAS';
export const SUCCESS_AREAS = 'SUCCESS_AREAS';
export const ERROR_AREAS = 'ERROR_AREAS';
export const SELECTED_AREA = 'SELECTED_AREA';
export const MEAL_BY_AREA = 'MEAL_BY_AREA';

function loadingAreas() {
  return { type: LOADING_AREAS };
}

function successAreas(data) {
  let response = data.meals.map((meal) => meal.strArea);
  response = ['All', ...response];
  return { type: SUCCESS_AREAS, response };
}

function errorAreas(response) {
  return { type: ERROR_AREAS, response };
}

export function newSelectedArea(selectedArea) {
  return { type: SELECTED_AREA, selectedArea };
}

function mealByAreaSuccess(data) {
  const processing = data.meals || data.drinks;
  let list = [];

  if (processing) {
    const maxLength = 12;
    const increment = 1;
    const zero = 0;
    const lengthLimit = processing.length > maxLength ? maxLength : processing.length;
    for (let i = zero; i < lengthLimit; i += increment) {
      list.push(processing[i]);
    }
    list = list.map((recipe) => (apiDataProcessor(recipe)));
  } else {
    list = null;
  }

  return { type: MEAL_BY_AREA, mealByArea: list };
}

export function fetchAreasThunk() {
  return (dispatch) => {
    dispatch(loadingAreas());

    return fetchAreas()
      .then((response) => dispatch(successAreas(response)),
        (fail) => dispatch(errorAreas(fail)));
  };
}

export function fetchMealByAreaThunk(area) {
  return (dispatch) => {
    dispatch(loadingAreas());

    return fetchFoodByArea(area)
      .then((response) => dispatch(mealByAreaSuccess(response)),
        (fail) => dispatch(errorAreas(fail)));
  };
}
