const mealCategories = {
  meals: [
    { strCategory: 'Beef' },
    { strCategory: 'Breakfast' },
    { strCategory: 'Chicken' },
    { strCategory: 'Dessert' },
    { strCategory: 'Goat' },
    { strCategory: 'Lamb' },
    { strCategory: 'Miscellaneous' },
    { strCategory: 'Pasta' },
    { strCategory: 'Pork' },
    { strCategory: 'Seafood' },
    { strCategory: 'Side' },
    { strCategory: 'Starter' },
    { strCategory: 'Vegan' },
    { strCategory: 'Vegetarian' },
  ],
};

export const categoriesToRender = (
  mealCategories
    .meals
    .map(c => c.strCategory)
    .filter((_, index) => index < 5)
)

export default mealCategories
