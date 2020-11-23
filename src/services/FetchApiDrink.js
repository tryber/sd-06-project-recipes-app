export default async function fetchApiDrink(radioSelected, setData = '', value = '') {
  let endpoint;
  if (radioSelected === '1') {
    endpoint = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${value}`;
  } else if (radioSelected === '2') {
    endpoint = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${value}`;
  } else if (radioSelected === '3') {
    endpoint = `https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${value}`;
  } else if (radioSelected === '4') {
    endpoint = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list';
  } else if (radioSelected === '5') {
    endpoint = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${value}`;
  }
  const response = await fetch(endpoint);
  const responseJson = await response.json();
  console.log(responseJson.drinks);
  setData(responseJson.drinks);
}
