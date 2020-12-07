export const SAVE_FOOD_SEARCH = 'SAVE_FOOD_SEARCH';
export const SAVE_DRINK_SEARCH = 'SAVE_DRINK_SEARCH';

export const saveFoodSearch = (payload) => ({
  type: SAVE_FOOD_SEARCH,
  meals: payload.meals,
});

export const saveDrinksSearch = (payload) => ({
  type: SAVE_DRINK_SEARCH,
  drinks: payload.drinks,
});
