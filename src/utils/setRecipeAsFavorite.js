import formatFavToStorage from './formatFavToStorage';

export default function setRecipeAsFavorite(id, recipe, type) {
  const firstLetter = 0;
  const lastLetter = -1;
  const formatedRecipe = { ...recipe, type: type.slice(firstLetter, lastLetter) };
  const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes')) || [];
  const mappedIdRecipes = favoriteRecipes.map((savedRecipe) => savedRecipe.id);
  const isSaved = mappedIdRecipes.includes(id);
  if (isSaved) {
    const newFavoriteRecipes = favoriteRecipes.filter((recipeInStore) => (
      !(recipeInStore.id === id)
    ));
    const favsToStorage = formatFavToStorage(newFavoriteRecipes);
    localStorage.setItem('favoriteRecipes', JSON.stringify(favsToStorage));
  } else {
    favoriteRecipes.push(formatedRecipe);
    const favsToStorage = formatFavToStorage(favoriteRecipes);
    localStorage.setItem('favoriteRecipes', JSON.stringify(favsToStorage));
  }
}
