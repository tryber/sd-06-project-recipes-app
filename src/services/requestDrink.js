export const urlDrink = 'https://www.thecocktaildb.com/api/json/v1/1/';

async function randomRequestApiDrink(urlParameter = '') {
  const url = `${urlDrink}${urlParameter}`;
  const objDrink = await fetch(url).then((apiDrink) => apiDrink.json());
  const arrayDrink = objDrink.drinks;
  // console.log('arrayDrink', arrayDrink);
  return arrayDrink;
}

export function requestApiDrinkFilterIngredient(ingredient) {
  return randomRequestApiDrink(`filter.php?i=${ingredient}`);
}

export function requestApiDrinkFilterName(name) {
  return randomRequestApiDrink(`search.php?s=${name}`);
}

export function requestApiDrinkFilterFirstLetter(firstLetter) {
  return randomRequestApiDrink(`search.php?f=${firstLetter}`);
}

export function requestApiDrinkDetails(id) {
  return randomRequestApiDrink(`lookup.php?i=${id}`);
}

export function requestApiDrinkListIngredients() {
  return randomRequestApiDrink('list.php?i=list');
}
