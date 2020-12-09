export default async function fetchApiFood(radioSelected, setData = '', value = '') {
  let endpoint;
  if (radioSelected === '1') {
    endpoint = `https://www.themealdb.com/api/json/v1/1/filter.php?i=${value}`;
  } else if (radioSelected === '2') {
    endpoint = `https://www.themealdb.com/api/json/v1/1/search.php?s=${value}`;
  } else if (radioSelected === '3') {
    endpoint = `https://www.themealdb.com/api/json/v1/1/search.php?f=${value}`;
  } else if (radioSelected === '4') {
    endpoint = 'https://www.themealdb.com/api/json/v1/1/list.php?c=list';
  } else if (radioSelected === '5') {
    endpoint = `https://www.themealdb.com/api/json/v1/1/filter.php?c=${value}`;
  } else if (radioSelected === '6') {
    endpoint = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${value}`;
  } else if (radioSelected === '7') {
    endpoint = 'https://www.themealdb.com/api/json/v1/1/list.php?a=list';
  } else if (radioSelected === '8') {
    endpoint = `https://www.themealdb.com/api/json/v1/1/filter.php?a=${value}`;
  } else if (radioSelected === '9') {
    endpoint = 'https://www.themealdb.com/api/json/v1/1/list.php?i=list';
  } else if (radioSelected === '10') {
    endpoint = 'https://www.themealdb.com/api/json/v1/1/random.php';
  }

  const response = await fetch(endpoint);
  const responseJson = await response.json();
  setData(responseJson.meals);
}
