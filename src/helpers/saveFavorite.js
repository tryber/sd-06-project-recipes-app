export default function saveFavorite(id, ingredient, action) {
  const storage = JSON.parse(localStorage.getItem('favoriteRecipes'));
  let currentStorage = (storage !== null)
    ? storage
    : null;

  const currentArray = (currentStorage)
    ? [...currentStorage]
    : [];

  if (action === 'add') currentStorage = [...currentArray, ingredient];
  if (action === 'remove') {
    currentStorage = currentArray.filter((item) => (
      item.id !== ingredient.id
    ));
  }
  localStorage.setItem('favoriteRecipes', JSON.stringify(currentStorage));
}
