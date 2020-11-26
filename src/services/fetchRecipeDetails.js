export default function fetchRecipeDetails(id, path) {
  let url = '';
  if (path === 'comidas') {
    url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`;
  } else {
    url = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`;
  }

  return fetch(url)
    .then((response) => response.json())
    .then((data) => data)
    .catch((error) => error);
}
