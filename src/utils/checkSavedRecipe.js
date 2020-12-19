export default function checkSavedRecipe({ id }, setdisableButton) {
  let savedRecipes = [];
  savedRecipes = JSON.parse(localStorage.getItem('doneRecipes'));
  if (savedRecipes) {
    savedRecipes.forEach((savedRecipe) => {
      if (savedRecipe.id === id) {
        setdisableButton('hidden');
        return true;
      }
    });
  }
}
