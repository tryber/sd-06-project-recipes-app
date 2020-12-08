export default async function FetchApiBebidas(filtro, value) {
  if (filtro === '1') {
    const endpoint = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${value}`;
    const response = await fetch(endpoint);
    const responseJson = await response.json();
    return responseJson.drinks;
  } if (filtro === '2') {
    const endpoint = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${value}`;
    const response = await fetch(endpoint);
    const responseJson = await response.json();
    return responseJson.drinks;
  } if (filtro === '3') {
    const endpoint = `https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${value}`;
    const response = await fetch(endpoint);
    const responseJson = await response.json();
    return responseJson.drinks;
  }
}

export async function fetchApiBebidasCategorias() {
  const endpoint = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list';
  const response = await fetch(endpoint);
  const responseJson = await response.json();
  return responseJson.drinks;
}

export async function fetchApiBebidasByCategory(category) {
  const endpoint = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${category}`;
  const response = await fetch(endpoint);
  const responseJson = await response.json();
  return responseJson.drinks;
}

export async function fetchApiBebidasDetalhes(id) {
  const endpoint = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`;
  const response = await fetch(endpoint);
  const responseJson = await response.json();
  console.log(responseJson.drinks);
  return responseJson.drinks;
}

export async function fetchApiBebidasExplorar() {
  const endpoint = 'https://www.thecocktaildb.com/api/json/v1/1/random.php';
  const response = await fetch(endpoint);
  const responseJson = await response.json();
  return responseJson.drinks;
}
