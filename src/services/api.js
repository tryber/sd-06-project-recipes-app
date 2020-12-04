export async function fetchRecipe(url) {
  const response = await fetch(url);
  const recipe = await response.json();
  return recipe;
}

export async function fetchRecommended(url) {
  const response = await fetch(url);
  const recommended = await response.json();
  return recommended;
}
