export default function checkFavoriteRecipe(id) {
  const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
  if (favoriteRecipes) {
    const convertedToArray = favoriteRecipes.map((recipe) => recipe.id.toString());
    const isFavorite = convertedToArray.includes(id);
    return isFavorite;
  }
}
