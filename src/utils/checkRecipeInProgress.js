export default function checkRecipeInProgress(path, { id }, setWasStarted) {
  const conditionalKey = path === 'comidas' ? 'meals' : 'cocktails';
  const storedRecipes = JSON.parse(localStorage.getItem('inProgressRecipes'));
  if (storedRecipes) {
    const inProgressIds = Object.keys(storedRecipes[conditionalKey]);
    setWasStarted(inProgressIds.includes(id));
  }
}
