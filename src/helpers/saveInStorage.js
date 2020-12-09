export default function saveInStorage(id, ingredient, category, action) {
  const storage = JSON.parse(localStorage.getItem('inProgressRecipes'));
  const currentStorage = (storage)
    ? { ...storage }
    : { cocktails: {}, meals: {} };

  const currentArray = (currentStorage[category][id])
    ? [...currentStorage[category][id]]
    : [];

  if (action === 'add') currentStorage[category][id] = [...currentArray, ingredient];
  if (action === 'remove') {
    currentStorage[category][id] = currentArray.filter((item) => (
      item !== ingredient
    ));
  }

  localStorage.setItem('inProgressRecipes', JSON.stringify(currentStorage));
}
