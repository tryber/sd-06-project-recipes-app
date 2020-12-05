export default function parseRecipeToFavorite(type, recipe) {
  const favorite = {
    id: recipe.idDrink || recipe.idMeal,
    type: (type === 'comidas') ? 'comida' : 'bebida',
    area: recipe.strArea || '',
    category: recipe.strCategory,
    alcoholicOrNot: recipe.strAlcoholic || '',
    name: recipe.strDrink || recipe.strMeal,
    image: recipe.strDrinkThumb || recipe.strMealThumb,
  };

  return favorite;
}
