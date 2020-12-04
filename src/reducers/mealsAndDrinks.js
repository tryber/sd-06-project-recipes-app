const INITIAL_STATE = {
  meals: [],
  drinks: [],
  mealsCategories: [],
  drinksCategories: [],
};

function mealsAndDrinksReducer(state = INITIAL_STATE, { type, payload }) {
  switch (type) {
  case 'ADD_MEALS':
    return { ...state, meals: [...payload] };
  case 'ADD_DRINKS':
    return { ...state, drinks: [...payload] };
  case 'ADD_MEALS_CATEGORIES':
    return { ...state, mealsCategories: [...payload] };
  case 'ADD_COCKTAIL_CATEGORIES':
    return { ...state, drinksCategories: [...payload] };
  case 'ADD_RECIPES_DONE':
    return { ...state, drinksCategories: [...payload] };
  default:
    return state;
  }
}

export default mealsAndDrinksReducer;
